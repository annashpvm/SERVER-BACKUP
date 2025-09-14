Ext.onReady(function(){
Ext.QuickTips.init();
   
   var grnflag="P"; 
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');


    var gstfinyear = localStorage.getItem('gstyear');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var NewDays = localStorage.getItem('newdays');
var EditDays   = localStorage.getItem('editdays');


var itemuom = 0;

var editgrnvalue = 0;

var statecode = "T";
var grnrounding = 0;
var supstate = 0;
   var supcode = 0;
   var  purtype = localStorage.getItem('STRTYPE');


   var grntype = 'P';

   var mtype = 'P';

// GinFinid = 21;
//Gincompcode = 1;


var fitemcode = 0;
var pitemcode = 0;
var pitemname = '';

var rejectqty = 0;

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
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             add_btn_click();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  window_form.hide();

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


     var Load_Invoice_NumberDatasore = new Ext.data.Store({
        id: 'Load_Invoice_NumberDatasore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/clsuser.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "find_Invoice_Number"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['no_of_rec'])
    });

   
     var Load_Invoice_Number_DetailDatasore = new Ext.data.Store({
        id: 'Load_Invoice_Number_DetailDatasore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/clsuser.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "find_Invoice_Number_Detail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_vouno','accref_voudate'])
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
		         Ext.Ajax.request({
			    url: 'TrnGRNNoChange.php',
			    params :
			     {


				gstFlaggrn : gstFlag,                                 
				compcode : Gincompcode,
				finid    : GinFinid,
				grnno    : txtGRNNo.getValue(),
                                edgrnno  : txtGRNNo.getRawValue(),
				accseqno : accseqno,
				newgrnno : txtNewGRNNo.getValue(),
                                          
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
                        } 
                 }); 
             }
          }   
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
				    flxDetail.getStore().removeAll();


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

                               var vouno = txtGRNNo.getValue();
		  
  
			    Ext.Ajax.request({
			    url: 'TrnGRNDelete.php',
			    params :
			     {

						griddet: Ext.util.JSON.encode(minupData),                                      
                                		cnt:minDeta.length,
			     	griddetacc      : Ext.util.JSON.encode(accupdData),                          
				cntacc		: accData.length,


                                                savetype       : gstFlag,
                                                grnflag        : grnflag,   
           
                                                minhcompcode   : Gincompcode,
                                                minhminno      : txtGRNNo.getRawValue(),
			               		minhmindate    : Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d"),	
						minhfincode    : GinFinid,
						minhtype       : mintype,
						minhsupcode    : supcode,
						minhbillno     : Ext.getCmp('txtBillNo').getValue(),
						minhbilldate   : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),	
						minhgrossvalue : txtgrossval.getValue(),
						minhroundoff   : txtroundoff.getValue(),
						minhvalue      : txtGRNValue.getValue(),
						minhacctstatus : 'P',
						minhcarrier    : txtTruck.getRawValue(),
						minhremarks    : txtRemarks.getRawValue(),
						minhentdate    : Ext.util.Format.date(new Date(),"Y-m-d"),
						minhvouno      : vouno,
						minhvouyear    : gstfinyear,
						minhvoutype    : purtype,
	
						minhcreditdays : txtPayTerms.getValue(),

						minhgeno       : cmbgateentryno.getValue(),
						minhgedate     : Ext.util.Format.date(gentrydate.getValue(),"Y-m-d"),
						minhlrno       : txtlrnumber.getValue(),
						minhlrdate     : Ext.util.Format.date(LRdate.getValue(),"Y-m-d"),
						minhaccupd     : 'N',
                                                tcsauto : TCSCalc,      
                                 		minhcgstpm    : txtCGSTPM.getValue(),
                                 		minhsgstpm    : txtSGSTPM.getValue(),
                                 		minhigstpm    : txtIGSTPM.getValue(),
                                 		minhtottcs    : txttottcs.getValue(),     

                                              roundneed : roundoff,
                                              accseqno       : accseqno,

				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("GRN DELETED No.-" + obj['minno']);
		//                                    TrnGrnformpanel.getForm().reset();
				    flxDetail.getStore().removeAll();


				    RefreshData();
		//				    TrnGrnformpanel.getForm().reset();
				  }else
					{
			Ext.MessageBox.alert("GRN Not DELETED! Pls Check!- " + obj['minno']);                                                  
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




 var findGSTDetaildatastore = new Ext.data.Store({
      id: 'findGSTDetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadGSTDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_pur_ledcode', 'tax_pur_ledname', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode', 'tax_cgst_per', 'tax_sgst_per', 'tax_igst_per', 'tax_cgst_ledname', 'tax_sgst_ledname', 'tax_igst_ledname'
 
      ]),
    })


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name','item_usage','item_uom', 'item_qcchk','item_group_code','item_hsncode',
 

      ]),
    });


function grid_chk_flxItem()
{
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();

		var chkitem = (selrow.get('item_code'));
	if ((selrow != null)){

		fitemcode = selrow.get('item_code');
		txtItemName.setValue(selrow.get('item_name'));
	        SaveFlag = "Edit";
		flxItem.hide();
                txtinvqty.focus();
lblInvQty.show();
lblRecdQty.show();
lblAcceptedQty.show();
lblStockQty.show();              
	}
}




function grid_chk_flxItem_Search()
{
	var sm = flxItemSearch.getSelectionModel();
	var selrow = sm.getSelected();

		var chkitem = (selrow.get('item_code'));
	if ((selrow != null)){

		fitemcodeSearch = selrow.get('item_code');
		txtSearchItemName.setValue(selrow.get('item_name'));
	        SaveFlag = "Edit";
		flxItemSearch.hide();
                cmbPONO.focus();
lblInvQty.show();
lblRecdQty.show();
lblAcceptedQty.show();
lblStockQty.show();  



	    	LoadindnoDatastore.removeAll();

		LoadindnoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadpono',
		    compcode:Gincompcode,
		    finid:txtpoindyr.getValue(),
		    supcode:supcode,
		    flag:grnflag,
                    searchedby : 'item',
                    itemcode : fitemcodeSearch,
		},
               callback:function() 
              	 {

                cmbPONO.setRawValue(LoadindnoDatastore.getAt(0).get('ind_no'));

		LoadPOindnoDatastore.removeAll();
		LoadPOindnoDatastore.load({
			url: 'ClsGrn.php',
			params: {
			    task: 'loadindentnos',
			    finid:txtpoindyr.getValue(),
			    compcode:Gincompcode,
			    pono:LoadindnoDatastore.getAt(0).get('ind_no'),
     		 	},
     		 	callback : function (){
                        cmbindno.setValue(LoadPOindnoDatastore.getAt(0).get('indfincode'));
                        cmbindno.setRawValue(LoadPOindnoDatastore.getAt(0).get('indno'));


			dtppo.setRawValue(Ext.util.Format.date(LoadPOindnoDatastore.getAt(0).get('podate'),"d-m-Y"));
                       txtPayTerms.setValue(LoadPOindnoDatastore.getAt(0).get('phd_credit_days'));
                       txttolerance.setValue(LoadPOindnoDatastore.getAt(0).get('phd_tol'));                     	

                 Ext.getCmp('cmbItem').setDisabled(true); 
                 getIndentDetails();	 	
     		 	}
	         });




                 }
	    });

            
	}
}


function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsGrn.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
		},
        });
}


function itemSearch2()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsGrn.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtSearchItemName.getRawValue(),
		},
        });
}



   
   var dgrecord = Ext.data.Record.create([]);

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 460,
        x: 450,
        y: 170,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "UOM", dataIndex: 'item_uom',sortable:true,width:330,align:'left'},
		{header: "hsn", dataIndex: 'item_hsncode',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxItem();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxItem();
             }


 
    
   }
   });


   var flxItemSearch = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 460,
        x: 450,
        y: 170,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "UOM", dataIndex: 'item_uom',sortable:true,width:330,align:'left'},
		{header: "hsn", dataIndex: 'item_hsncode',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxItem_Search();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxItem_Search();
             }


 
    
   }
   });




var txtSearchItemName = new Ext.form.TextField({
	fieldLabel  : 'Search Item Name',
	id          : 'txtSearchItemName',
	name        : 'txtSearchItemName',
	width       :  340,
    	 labelStyle : "font-size:9px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          flxItemSearch.hide();

		     }
             if (e.getKey() == e.DOWN)
             {
 
             flxItemSearch.getSelectionModel().selectRow(0)
             flxItemSearch.focus;
             flxItemSearch.getView().focusRow(0);
             }

	    },
	    keyup: function () {
	        flxItemSearch.getEl().setStyle('z-index','10000');
	        flxItemSearch.show();
                flxItemSearch.removeAll();
                  if (txtSearchItemName.getRawValue() != '')
                     itemSearch2();
            }     

	}
});


var txtItemName = new Ext.form.TextField({
	fieldLabel  : 'Item Name',
	id          : 'txtItemName',
	name        : 'txtItemName',
	width       :  365,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          flxItem.hide();
		          txtinvqty.focus();
		     }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }

	    },
	    keyup: function () {
	        flxItem.getEl().setStyle('z-index','10000');
	        flxItem.show();
                flxItem.removeAll();
                  if (txtItemName.getRawValue() != '')
                     itemSearch();
            }     

	}
	});


var txtItemSpec = new Ext.form.TextField({
	fieldLabel  : 'Specifications',
	id          : 'txtItemSpec',
	name        : 'txtItemSpec',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'100'},
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          flxItem.hide();
		          txtinvqty.focus();
		     }


	    },
	    keyup: function () {

            }     

	}
	});

var TCSCalc ="A";
var optTCSCalc = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'TCS Calculation.',

    fieldLabel: '',
    layout : 'hbox',
    width: 120,
    height:127,
    defaultType : 'textfield',
  //  x:510,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optTCSCalc',
        items: [
            {boxLabel: 'AutoMatic', name: 'optTCSCalc', id:'TCSAuto',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 TCSCalc ="A";
		Ext.getCmp('txttotcgst').setReadOnly(true);
		Ext.getCmp('txttotsgst').setReadOnly(true);
		Ext.getCmp('txttotigst').setReadOnly(true);
                grid_tot();   
               }
              }
             }
            },
            {boxLabel: 'Manual', name: 'optTCSCalc' , id:'TCSManual',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
		Ext.getCmp('txttotcgst').setReadOnly(false);
		Ext.getCmp('txttotsgst').setReadOnly(false);
		Ext.getCmp('txttotigst').setReadOnly(false);
                TCSCalc ="M";
                grid_tot();   
                }
              }
             }} //,txtfreight


        ],
    },

    ],
});


var billnochk = "";

function BillNoChecking()
{
    Load_Invoice_NumberDatasore.load({
	url: '/SHVPM/clsuser.php',
	params:
	{	
	task     : 'find_Invoice_Number',
	fincode  : GinFinid,
	compcode : Gincompcode,
        ledcode  : supcode,  
        billno   : txtBillNo.getValue(),  
	},
	callback: function(){
                    billnochk = "NO"
              var cnt = Load_Invoice_NumberDatasore.getCount();
              if (Load_Invoice_NumberDatasore.getAt(0).get('no_of_rec') > 0)
              {
		    Load_Invoice_Number_DetailDatasore.load({
			url: '/SHVPM/clsuser.php',
			params:
			{	
			task     : 'find_Invoice_Number_Detail',
			fincode  : GinFinid,
			compcode : Gincompcode,
			ledcode  : supcode,  
			billno   : txtBillNo.getValue(),  
			},
			callback: function(){
                             billnochk = "YES";
                             vouno   = Load_Invoice_Number_DetailDatasore.getAt(0).get('accref_vouno');
                             voudate = Ext.util.Format.date(Load_Invoice_Number_DetailDatasore.getAt(0).get('accref_voudate'),'d-m-Y');      
//                             alert("Same Bill Number Already Entered in the voucher No. " + vouno + " dt. " + voudate );
     Ext.Msg.alert('GRN',"Bill Number " + txtBillNo.getValue() +" Already Entered in the voucher No. " + vouno + " dt. " + voudate );
                        }   
                     });
              }  
  

        }   
      });
}

function save_click()
{

     if (gstFlag == "Add")
        BillNoChecking();
     else
         billnochk = "NO";




     if (billnochk == "NO")
     {
	fromdate = "04/01/"+gstfinyear.substring(0,4);
	todate = "03/31/"+gstfinyear.substring(5,9);



        var delreccount = 0;    
	var Row= flxDetail.getStore().getCount();
        for(var i=0;i<Row;i++)
        {

            var rec = flxDetail.getStore().getAt(i);
            if (rec.get('delrecord') == "N")
               delreccount = delreccount + 1;


         }
 


    if ( delreccount == 0)
    {
            Ext.MessageBox.alert("Alert","You cannot delete all the records. Please check");
    }       
    else if( Number(editgrnvalue) != Number(txtGRNValue.getValue()) ){
            Ext.MessageBox.alert("Alert","GRN Amount was Changed. You can't Save. Old GRN Amt " + editgrnvalue + "  New GRN Amt " +txtGRNValue.getValue() + "  Please check");
    }
    else if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }
    else if(Number(txttotDebit.getRawValue())!=Number(txttotCredit.getRawValue())){

        Ext.MessageBox.alert("GRN","The Transaction of Debit and Credit Totals are not  Equal");
    }
                       else if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('GRN','Grid should not be empty..');
        	                gstSave="false";
	                    }
                       else if (myFormPanel.getForm().findField('txtBillNo').getRawValue() == "" && grn_status == 'C')   
                        {
                               Ext.Msg.alert('GRN','Bill Number should not  be Empty.....');
                        }
                        else if (txtTruck.getRawValue() == "")
                        {
                               Ext.Msg.alert('GRN','Truck Number cannot be Empty.....');
                               tabGRN.setActiveTab(1);
                               Ext.getCmp('txtTruck').focus(false, 200);
                        }

                        else if (txtGRNNo.getRawValue() == '')
                        {
                               Ext.Msg.alert('GRN','GRN Number is empty');
                        }
                        else if (Number(txtGRNValue.getRawValue()) == 0)
                        {
                               Ext.Msg.alert('GRN','GRN Amount is empty');
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


                                               var vouno = txtGRNNo.getValue();
                                               

//                                                if (grnflag == "I")
//                                                {
//                                                    mintype = "R";
//                                                } 
//alert(gstFlag);
//                                               alert(minDeta.length);
                                               Ext.Ajax.request({
				               url: 'TrnGRNSave.php',
				               params:
						{       

						griddet: Ext.util.JSON.encode(minupData),                                      
                                		cnt:minDeta.length,
			     	griddetacc      : Ext.util.JSON.encode(accupdData),                          
				cntacc		: accData.length,


                                                savetype       : gstFlag,
                                                grnflag        : grnflag,   
           
                                                minhcompcode   : Gincompcode,
                                                minhminno      : txtGRNNo.getRawValue(),
			               		minhmindate    : Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d"),	
						minhfincode    : GinFinid,
						minhtype       : mintype,
						minhsupcode    : supcode,
						minhbillno     : Ext.getCmp('txtBillNo').getValue(),
						minhbilldate   : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),	
						minhgrossvalue : txtgrossval.getValue(),
						minhroundoff   : txtroundoff.getValue(),
						minhvalue      : txtGRNValue.getValue(),
						minhacctstatus : 'P',
						minhcarrier    : txtTruck.getRawValue(),
						minhremarks    : txtRemarks.getRawValue(),
						minhentdate    : Ext.util.Format.date(new Date(),"Y-m-d"),
						minhvouno      : vouno,
						minhvouyear    : gstfinyear,
						minhvoutype    : purtype,
	
						minhcreditdays : txtPayTerms.getValue(),

						minhgeno       : cmbgateentryno.getValue(),
						minhgedate     : Ext.util.Format.date(gentrydate.getValue(),"Y-m-d"),
						minhlrno       : txtlrnumber.getValue(),
						minhlrdate     : Ext.util.Format.date(LRdate.getValue(),"Y-m-d"),
						minhaccupd     : 'N',
                                                tcsauto        : TCSCalc,      
                                 		minhcgstpm     : txtCGSTPM.getValue(),
                                 		minhsgstpm     : txtSGSTPM.getValue(),
                                 		minhigstpm     : txtIGSTPM.getValue(),
                                 		minhtottcs     : txttottcs.getValue(),     
                                 		minhtottransport : txtTotTransport.getValue(),     
                                                tcsauto        : TCSCalc,      
                                                grnstatus      : grn_status,     
                                                roundneed      : roundoff,
                                                accseqno       : accseqno,
                                                userid         : UserId,   
	//						minhseqno : '0'
                                        	},
	                                        callback: function(options, success, response)
                                                {


                                                 var obj = Ext.decode(response.responseText);
                                                 var grndisp = "Goods Receipt Note - Modified - No."; 
						if (obj['success']==="true")
						{                                
                                                    Ext.MessageBox.alert( grndisp + obj['minno']);
//			                            myFormPanel.getForm().reset();						
                                                    flxDetail.getStore().removeAll();
                                                    RefreshData();
                                              }else
						{

if (obj['minno'] == 0)
 Ext.MessageBox.alert("Same GRN Number Already Saved.  Pls Check!-"); 
else
 Ext.MessageBox.alert("GRN Not Modified! Pls Check!-" + obj['minno']); 

                                     Ext.getCmp('save').setDisabled(false);
		                     Ext.getCmp('save2').setDisabled(true);                                                
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
  }

}
 var accseqno = 0;
 var partyledcode = 0;

 var loadGSTLedgerDatastore = new Ext.data.Store({
      id: 'loadGSTLedgerDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findGSTDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'tax_code', 'tax_name', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst'
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
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

var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 172,
    hidden:false,
    width: 850,
   id:'my-grid3',
scope: this,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'center'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left',hidden:true},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:360,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left',hidden:true},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left',hidden:true},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});

   var txttotDebit = new Ext.form.TextField({
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

   var txttotCredit = new Ext.form.TextField({
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

 var btnsave = new Ext.Button({
                text: 'Save',
                id  : 'save2',
                width: 70,
                height: 50,
                tooltip:'Click To Add',
                icon:'../GRN/icons/download.gif',
		    border: 1,
		    style: {
		      borderColor: 'blue',
		      borderStyle: 'solid',

		    },

    		listeners:{
        		click: function(){  
                             save_click();	
                         }
                }
});   

 var gstFlag = "Add";

 var partycode = 0;
 var frtpartycode = 0;
 var unit;
 var balqty =0;

 var itemcode = 0;
 var itemgrpcode = 0;

 var frtcgst =0;
 var frtsgst =0;
 var frtigst =0;

var mintype = "P";

var indno,indfincode =0;

var editrow = 0;
var gridedit = "false";
 var viewopt = 0; 

var po =0;
var ind=0;



var loadGRNListDatasore = new Ext.data.Store({
  id: 'loadGRNListDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadGRNList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['minh_minno'
  ])
});

var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroup"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[ 'tax_pur_ledcode','tax_pur_ledname'
  ])
});


var cmbPurGroup = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Group',
    width           : 320,
    displayField    : 'tax_pur_ledname',
    valueField      : 'tax_pur_ledcode',
    hiddenName      : 'tax_pur_ledname',
    id              : 'cmbPurGroup',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbtype.focus();
             }
       },
        select: function(){
        findGSTDetaildatastore.removeAll();
        findGSTDetaildatastore.load({
		url: 'ClsGrn.php',
		params:
		{
			task:"LoadGSTDetails",
			ledcode :cmbPurGroup.getValue(),
		},
                callback:function()
                { 
                   var cnt = findGSTDetaildatastore.getCount();
                   if (cnt > 0)
                   {
			taxledcode = findGSTDetaildatastore.getAt(0).get('tax_pur_ledcode');				
			txtCGSTPer.setValue(findGSTDetaildatastore.getAt(0).get('tax_cgst_per'));
			txtSGSTPer.setValue(findGSTDetaildatastore.getAt(0).get('tax_sgst_per'));
                        txtIGSTPer.setValue(findGSTDetaildatastore.getAt(0).get('tax_igst_per'));
                        calculateItemValue();
                   }
                }
        });
       }  
}
});





 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
         'ptr_pono','item_name','uom_short_name','qty','phd_amnd_status','ptr_unit_rate','ptr_ind_comp_code','ptr_ind_fin_code','ptr_ind_no',      'ptr_podate','item_group_code','ptr_item_code','item_qcupd','ptr_discount','ptr_pf_per','ptr_oth_amt','grp_tngst_code','grp_cst_code','grp_imp_code',      
'ptr_freight_amt','ptr_from','phd_redamt','phd_bank_guarantee','ptr_pftype','ptr_ord_qt','grp_code','phd_pono','phd_sup_code','ptr_disval','ptr_pfval',      
'phd_tol','grp_freight_code','ptr_cgst_per','ptr_cgst_amt','ptr_sgst_per','ptr_sgst_amt','ptr_igst_per','ptr_igst_amt','ptr_machine', 'phd_credit_days','ind_date',
	
      ]),
    });


 var GRNdetailsLoadDataStore = new Ext.data.Store({
      id: 'GRNdetailsLoadDataStore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'mint_comp_code', 'mint_minno', 'mint_mindate', 'mint_fin_code', 'mint_pono', 'mint_podate', 'mint_pofrom', 'mint_sup_code', 'mint_item_code', 'mint_inv_qty','mint_rcvd_qty', 'mint_rej_qty', 'mint_unit_rate', 'mint_cost_rate','mint_pack_per', 'mint_others', 'mint_frt_val',
'mint_freight', 'mint_discount', 'mint_qcdev_val', 'mint_value','mint_ind_comp_code', 'mint_ind_fin_code', 'mint_ind_no', 'mint_mod_status', 'mint_qc_status', 
'mint_cr_status', 'mint_pftype', 'mint_slno', 'mint_disamt', 'mint_pfamt', 'mint_expirydate','mint_np_qty', 'mint_others_qty', 'mint_cgst_per',
'mint_cgst_amt', 'mint_sgst_per', 'mint_sgst_amt', 'mint_igst_per', 'mint_igst_amt', 'mint_inward_amt', 'mint_tax_freight', 'mint_tax_freight2', 
'mint_clr1_cgst_per', 'mint_clr1_sgst_per', 'mint_clr1_igst_per', 'mint_clr1_transport', 'mint_clr2_cgst_per', 'mint_clr2_sgst_per', 'mint_clr2_igst_per','minh_roundneeded',
'mint_clr2_transport', 'mint_machine', 'mint_rcm', 'item_code', 'item_name', 'item_group_code', 'item_qcupd', 'uom_short_name', 'grp_tngst_code', 
'grp_cst_code', 'grp_imp_code', 'grp_cen_ledger_code', 'grp_freight_code', 'minh_minno', 'minh_type', 'minh_bill_no', 
'minh_bill_date', 'minh_remarks', 'minh_carrier', 'mint_cr_status', 'minh_acct_status', 'minh_credit_days', 'cust_taxtag', 'grp_educess_code', 'minh_geno',
'minh_gedate', 'minh_lrno', 'minh_lrdate', 'minh_accupd','mint_rebate', 'mint_machine','mint_tcs_per','mint_tcs_amt','mint_accept_qty','mint_otherspm', 'mint_purgroup','cust_name','minh_roundneeded','cust_ref','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger','led_name','minh_value', 'tax_gst','sup_led_code','minh_acc_seqno','cust_state','minh_cgst_pm','minh_sgst_pm','minh_igst_pm','minh_tot_tcs','minh_round_off',
'mint_insurance','acctrail_adj_value','mint_recdqty_bill','mint_item_unit','minh_grn_status','mint_item_spec','mint_transport','mint_value_pm'




      ]),
    });



 var LoadGrnNoDatastore = new Ext.data.Store({
      id: 'LoadGrnNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno'
      ]),
    });


 var LoadPOindnoDatastore = new Ext.data.Store({
      id: 'LoadPOindnoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindentnos"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'podate', 'indno', 'indfincode', 'phd_credit_days','phd_tol'


      ]),
    });


 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
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

 var LoadTransClrNoDatastore = new Ext.data.Store({
      id: 'LoadTransClrNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadtransno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	't_clr_no'
      ]),
    });


 var LoadTransClrNodetailDatastore = new Ext.data.Store({
      id: 'LoadTransClrNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadtransdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','t_clr_frt_party','t_clr_lrno','t_clr_lrdt','frt','othexp','ccgstper','csgstper','cigstper'
      ]),
    });


 var LoadindnoDatastore = new Ext.data.Store({
      id: 'LoadindnoDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ind_no','ind_fin_code'
      ]),
    });



 var loaditemdetailsDatastore = new Ext.data.Store({
      id: 'loaditemdetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ptr_pono','item_name','uom_short_name','ptr_ord_qty','ptr_rec_qty','phd_amnd_status','ptr_unit_rate','ptr_ind_comp_code','ptr_ind_fin_code','ptr_ind_no',      
         'ptr_podate','item_group_code','ptr_item_code','item_qcupd','ptr_discount', 'ptr_pf_per','ptr_oth_amt','grp_tngst_code','grp_cst_code','grp_imp_code',      
'ptr_freight_amt','ptr_from','phd_redamt','phd_bank_guarantee','ptr_pftype','ptr_ord_qt','grp_code','phd_pono','phd_sup_code','ptr_disval','ptr_pfval',      
'phd_tol','grp_freight_code','ptr_cgst_per','ptr_cgst_amt','ptr_sgst_per','ptr_sgst_amt','ptr_igst_per','ptr_igst_amt','ptr_machine', 'ptr_tcs_per' ,          
'ind_comp_code', 'ind_no', 'ind_date', 'ind_fin_code', 'ind_type', 'ind_option', 'ind_dept_code', 'ind_slno', 'ind_item_code', 'ind_qty', 'ind_rate', 'ind_value',
'ind_po_qty', 'ind_rec_qty', 'ind_iss_qty', 'ind_bal_qty', 'ind_remarks', 'ind_due_date', 'ind_approval_status', 'ind_status', 'ind_auth_flag', 
'ind_ent_date', 'ind_remarks1', 'ind_machine', 'ind_purtype', 'ind_projno', 'ind_projgrp', 'ind_hod_auth', 'ind_issue_SHVPM', 'ind_issue_vjpm',
'ind_issue_cogen', 'ind_issue_solvent', 'ind_equip', 'ind_plant', 'ind_prepared_by', 'item_group_code', 'item_code', 'item_name', 'item_desc', 'ptr_rebate',
'item_uom', 'item_qcupd', 'item_potype', 'item_hsncode', 'uom_code', 'uom_name', 'uom_short_name','ptr_purgroup','ptr_remarks', 'ind_remarks'
      ]),
    });




var lblInvQty = new Ext.form.Label({
    fieldLabel  : 'Inv.Qty',
    id          : 'lblInvQty',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});




var lblRecdQty = new Ext.form.Label({
    fieldLabel  : 'Recd.Qty',
    id          : 'lblRecdQty',
    width       : 60,
   
 labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});




var lblAcceptedQty = new Ext.form.Label({
    fieldLabel  : 'Accept.Qty',
    id          : 'lblAcceptedQty',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});





var lblStockQty = new Ext.form.Label({
    fieldLabel  : 'Stock.Qty',
    id          : 'lblStockQty',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



var lblPer = new Ext.form.Label({
    fieldLabel  : '%',
    id          : 'lblPer',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
});

var lblAmt = new Ext.form.Label({
    fieldLabel  : 'Amt',
    id          : 'lblAmt',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
});


var lblDiscount = new Ext.form.Label({
    fieldLabel  : 'Discount',
    id          : 'lblDiscount',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblPF = new Ext.form.Label({
    fieldLabel  : 'P&F',
    id          : 'lblPF',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblFrieght = new Ext.form.Label({
    fieldLabel  : 'Freight',
    id          : 'lblFrieght',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblCGST = new Ext.form.Label({
    fieldLabel  : 'CGST',
    id          : 'lblCGST',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'SGST',
    id          : 'lblSGST',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})


var lblIGST = new Ext.form.Label({
    fieldLabel  : 'IGST',
    id          : 'lblIGST',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})


var lblTCS = new Ext.form.Label({
    fieldLabel  : 'TCS',
    id          : 'lblTCS',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})

var lblFreight = new Ext.form.Label({
    fieldLabel  : 'Freight',
    id          : 'lblFreight',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})

var lblOthers = new Ext.form.Label({
    fieldLabel  : 'Other Charges',
    id          : 'lblOthers',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})

var lblOthersPM  = new Ext.form.Label({
    fieldLabel  : 'Oths(+/-)',
    id          : 'lblOthersPM',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})

var lblValue1 = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue1',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})


var lblValuePM = new Ext.form.Label({
    fieldLabel  : 'Value +/-',
    id          : 'lblValuePM',
    width       : 80,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})



var lblValue = new Ext.form.Label({
    fieldLabel  : 'Item Value',
    id          : 'lblValue',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})


var lblLanding = new Ext.form.Label({
    fieldLabel  : 'Landing Cost',
    id          : 'lblLanding',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
})

var lblTransport = new Ext.form.Label({
    fieldLabel  : 'Transport Exp',
    id          : 'lblTransport',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


function grid_tot2(){
        var dr = 0;
        var cr = 0;

//alert("Annadurai");
	var Row= flxAccounts.getStore().getCount();


        //flxAccounts.getSelectionModel().selectAll();
//        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            var rec = flxAccounts.getStore().getAt(i);
            dr = dr + Number(rec.get('debit'));
            cr = cr + Number(rec.get('credit'));

         }
 

         txttotDebit.setValue(Ext.util.Format.number((dr*100/100),'0.00'));
         txttotCredit.setValue(Ext.util.Format.number((cr*100/100),'0.00'));



}

var remarks = '';
function grid_tot(){
	var value = 0;
	var value2 = 0;
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
        var tcs =0;
        var ins =0;
        var transport =0;

        txtgrossval.setValue(0);
        txttotdisc.setValue(0);
        txtTotPF.setValue(0);
        txttotfreight1.setValue(0);
        txttotothval.setValue(0);
        txtTotInsurance.setValue(0);


        txtTotOthersPM.setValue(0);
        txtTotTransport.setValue(0)

        txtlandvalue.setValue(0);

        txtGRNValue.setValue(0);

        var Row= flxDetail.getStore().getCount();
        remarks = 'Received Material(s) ';
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {


            if (sel[i].data.delrecord == "N")
            { 

            cgst = cgst + Number(sel[i].data.mintcgstamt) + Number(sel[i].data.cgstpm) ;
            sgst = sgst + Number(sel[i].data.mintsgstamt) + Number(sel[i].data.sgstpm) ;
            igst = igst + Number(sel[i].data.mintigstamt) + Number(sel[i].data.igstpm) ;
            ins  = ins  + Number(sel[i].data.insurance)  ;

            transport  = transport  + Number(sel[i].data.transportation)  ;


            value=value+ (Number(sel[i].data.mintinvqty) * Number(sel[i].data.mintunitrate))+Number(sel[i].data.valuepm);
            value2=value2+ (Number(sel[i].data.mintinvqty) * Number(sel[i].data.mintunitrate))+Number(sel[i].data.valuepm);


            value = parseFloat(value.toFixed(2)); 
            value2 = parseFloat(value2.toFixed(2)); 



     //      value  = value.toFixed(2);
 //            value2 = value2.toFixed(2);



//           value  = Number(sel[i].data.mintvalue));
//           value2 = Number(sel[i].data.mintvalue));




      //      value  = value  + Number(sel[i].data.mintvalue) ;
// value2 = value2 + Number(sel[i].data.mintvalue);


            disc = disc + Number(sel[i].data.mintdisamt);
            pf   = pf + Number(sel[i].data.mintpfamt);
            frt = frt + Number(sel[i].data.mintfreight);
            others = others + Number(sel[i].data.mintothers);
            otherpm = otherpm + Number(sel[i].data.mintotherpm);
            rebate = rebate + Number(sel[i].data.mintrebate);
            tcs = Number(tcs) + Number(sel[i].data.minttcsval);
            remarks = remarks + sel[i].data.itemname + ' Qty : ' + sel[i].data.mintacceptqty + ' @ ' + sel[i].data.mintunitrate ;
            }

        }

        value2 = Number(value2) - Number(disc);  

         txtRemarks.setValue(remarks) ;
   
       // landing = value - disc + pf + frt + others + qcdev + inward + taxfrt + taxfrtgst + inward+ taxfrt + taxfrtgst ;


//Modified on 20/06/2024

        landing = value - disc + pf + frt + others + otherpm - rebate + ins + tcs;

        landing = value2;

//alert(value2);

//        totvalue = Ext.util.Format.number(Math.round(value - disc + pf + frt + cgst + sgst + igst + others + otherpm) ,'0.00');

//alert(roundoff);


        if (roundoff == "M")   
        {
           if (gstFlag == "Edit")
           {    
//alert(grnrounding);
     //      txtroundoff.setValue(grnrounding);
           totvalue = value - disc + pf + frt + cgst + sgst + igst + others + otherpm - rebate + Number(txtroundoff.getValue()) + ins + tcs + transport;
            }
            else
            {
           totvalue = value - disc + pf + frt + cgst + sgst + igst + others + otherpm - rebate + Number(txtroundoff.getValue()) + ins + tcs  + transport;

            }      

        }  
        else
        {
           totvalue = value - disc + pf + frt + cgst + sgst + igst + others + otherpm - rebate + ins + tcs+ transport;
        }


        txttotcgst.setValue(cgst.toFixed(2));
        txttotsgst.setValue(sgst.toFixed(2));
        txttotigst.setValue(igst.toFixed(2));
        txtTotInsurance.setValue(ins.toFixed(2));


        value = Math.round(value * 1000) / 1000;
        value = Math.round(value * 100) / 100;


        landing = Math.round(landing * 1000) / 1000;
        landing = Math.round(landing * 100) / 100;


// alert(landing); 
        totvalue = Math.round(totvalue * 1000) / 1000;
        totvalue = Math.round(totvalue * 100) / 100;


        txtgrossval.setValue(value.toFixed(2));
        txttotdisc.setValue(disc.toFixed(2));
        txtTotPF.setValue(pf.toFixed(2));
        txttotfreight1.setValue(frt.toFixed(2));
        txttottcs.setValue(tcs.toFixed(2));

        txttotothval.setValue(others.toFixed(2));

        txtTotOthersPM.setValue(otherpm.toFixed(2));
        txtTotTransport.setValue(transport.toFixed(2));


        txtlandvalue.setValue(Ext.util.Format.number(landing,'0.00'));


         totgrnvalue2 =  totvalue.toFixed(2);

        if (roundoff == "Y")           
        {    

           totgrnvalue =  totvalue.toFixed(0);
           txtroundoff.setValue(Ext.util.Format.number(totgrnvalue-totgrnvalue2,"0.00"));
        
        }
        else if (roundoff == "N")           
        {  

           totgrnvalue =  totvalue.toFixed(2);    
           txtroundoff.setValue(0);
        }   
        else           
        {  

//alert(totvalue);
  //         gstFlag = "Edit";
           totgrnvalue =  totvalue.toFixed(2);    
 //   alert(totgrnvalue);
        }   
          txtGRNValue.setValue(Ext.util.Format.number(totgrnvalue,"0.00"));
        txtGRNValue.setRawValue(Ext.util.Format.number(totgrnvalue,"0.00"));



flxaccupdation();



   //     txtlandvalue.setValue(landing.toFixed(2));

}


function calculateItemValue(){
       var sumitemvalue=0;
       var value = 0;
       var value2 = 0;

       var disvalue = 0;
       var pfvalue = 0;

       var frt  = 0;
       var taxable = 0;

       var cgst = 0;
       var sgst = 0;
       var igst = 0;
       var itemvalue=0;
       var invitemvalue=0;
       var net = 0;
       var taxable = 0;


       value = Number(txtunitrate.getRawValue()) * Number(txtinvqty.getRawValue()) ; 
       value2 = Number(txtunitrate.getRawValue()) * Number(txtinvqty.getRawValue()) ; 

       if (Number(value) >0) 
       {
	       value  = Number(value) + Number(txtValuePM.getValue()); 
	       value2 = Number(value); 
       }

	//       value  = value.toFixed(2); 
	//       value2 = value.toFixed(2);


      txtValue.setRawValue(Ext.util.Format.number(value,'0.00'));
      txtTCSVal.setRawValue(0); 

       disvalue = 0;
       if ( txtdisper.getValue() == 0 && txtdisval.getValue() > 0 && value > 0 )  {
           disvalue = Number(txtdisval.getValue()) ; 
       }
       else
       {      
           disvalue =  Ext.util.Format.number((Number(value) *  Number(txtdisper.getValue()))/100,'0.00'); 
       } 


       txtdisval.setRawValue(disvalue);

       value = Number(value) - Number(txtdisval.getRawValue()); 
       value2 = Number(value2) - Number(txtdisval.getRawValue()); 

/*
       if (txtpfper.getRawValue() == 0 && Number(txtpfval.getRawValue()) > 0 && value > 0 )  {

       if (txtpfper.getRawValue() == 0)  {
           pfvalue = Number(txtpfval.getRawValue()) ; 

       }
       else
       {      
           pfvalue =  Ext.util.Format.number(Number(value) *  Number(txtpfper.getRawValue())/100,'0.00'); 
           txtpfval.setRawValue(pfvalue);
       } 
*/

       if (txtpfper.getRawValue()  > 0)  {
           pfvalue =  Ext.util.Format.number(Number(value) *  Number(txtpfper.getRawValue())/100,'0.00'); 
           txtpfval.setRawValue(pfvalue);
       } 
       else
       {     
           pfvalue = txtpfval.getRawValue();
       } 

//       taxable = Number(value) + Number(pfvalue) + Number(txtothers.getRawValue());


       taxable = Number(value) + Number(pfvalue) + Number(txtfreight.getRawValue())+Number(txtothers.getRawValue()) +Number(txtInsurance.getRawValue()) ;

  //     taxable = Number(value) + Number(pfvalue) + Number(txtfreight.getRawValue());
       taxable = Math.round(taxable * 100) / 100;


	       if (txtCGSTPer.getRawValue() > 0 && value > 0 )  {
		   cgst =  Ext.util.Format.number(taxable *  Number(txtCGSTPer.getRawValue())/100,'0.00'); 
	       } 

	       txtCGSTVal.setRawValue(cgst);

	       if (txtSGSTPer.getRawValue() > 0 && value > 0 )  {
		   sgst =  Ext.util.Format.number(taxable *  Number(txtSGSTPer.getRawValue())/100,'0.00'); 
	       } 
	       txtSGSTVal.setRawValue(sgst);

	       if (txtIGSTPer.getRawValue() > 0 && value > 0 )  {
		   igst =  Ext.util.Format.number(taxable *  Number(txtIGSTPer.getRawValue())/100,'0.00'); 
	       } 
	       txtIGSTVal.setRawValue(igst);
 

//       invitemvalue =  Number(taxable)+Number(cgst)+Number(sgst)+Number(igst)+Number(txtothers.getRawValue())+Number(txtothersPM.getRawValue())+Number(txtinward.getRawValue())+Number(txtclrfreight1.getRawValue());



       invitemvalue =  Number(taxable)+Number(cgst)+Number(sgst)+Number(igst)+Number(txtothersPM.getRawValue())+Number(txtinward.getRawValue())+Number(txtclrfreight1.getRawValue()) +Number(txtTransport.getRawValue()) ;

       if (txtTCSPer.getRawValue() > 0 && invitemvalue > 0 )  {
           txtTCSVal.setRawValue(Ext.util.Format.number(invitemvalue * txtTCSPer.getRawValue()/100,'0.00'));   
       }
        





//       sumitemvalue =  Number(taxable)+Number(txtothersPM.getRawValue())+Number(txtinward.getRawValue())+Number(txtclrfreight1.getRawValue())  +Number(txtothers.getRawValue()) +  Number(txtTCSVal.getRawValue()) -  Number(txtRebate.getValue()) ;

       sumitemvalue =  Number(taxable)+Number(txtothersPM.getRawValue())+Number(txtinward.getRawValue())+Number(txtclrfreight1.getRawValue()) +  Number(txtTCSVal.getRawValue()) -  Number(txtRebate.getValue()) ;


       invitemvalue = Number(invitemvalue) +  Number(txtTCSVal.getRawValue()) -  Number(txtRebate.getValue()); 
//        invitemvalue  = Math.round(invitemvalue * 1000) / 1000;
        invitemvalue  = Math.round(invitemvalue * 100) / 100;


//       txtitemvalue.setRawValue(Ext.util.Format.number(Math.round(sumitemvalue,2),'0.00'));


//        sumitemvalue  = Math.round(sumitemvalue * 1000) / 1000;
//        sumitemvalue  = Math.round(sumitemvalue * 100) / 100;


//Modified on 20/06/2024
       txtitemvalue.setRawValue(value2.toFixed(2));


//       txtiteminvvalue.setRawValue(Ext.util.Format.number(Math.round(invitemvalue),'0.00'));
       txtiteminvvalue.setRawValue(Ext.util.Format.number(invitemvalue,'0.00'));
}



var txtinvqty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtinvqty',
        width       : 75,
        name        : 'txtinvqty',
        enableKeyEvents: true,
        decimalPrecision: 3,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff", 
        readOnly    : true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRcvdQty.focus();
             }
       },
          change:function(){

              if (mtype != "N")
              {  
                  txtRcvdQty.setValue(txtinvqty.getRawValue());
                 txtAcceptQty.setValue(txtinvqty.getRawValue());
              } 
              else
                 txtAcceptQty.setValue(0);
   
             
  

                if (Number(txtAcceptQty.getValue()) > txtordqty.getValue())
                 {
                     alert("Accepted Quantity should not higher then Order balance Quantity..");
            //         txtAcceptQty.setValue(0); 
                     gstadd="false";
                 }
/*
                if (Number(txtAcceptQty.getValue()) > txtinvqty.getValue())
                 {
                     alert("Received Quantity should not higher then Invoice Quantity..");


//                     txtAcceptQty.setValue(0); 


                 } 
*/
              calculateItemValue();
          },
          keyup:function(){
              txtRcvdQty.setValue(txtinvqty.getValue());
              if (mtype == "N")
                 txtAcceptQty.setValue(txtinvqty.getRawValue());
              else
                 txtAcceptQty.setValue(0);

          calculateItemValue();
         }
        } 

   }); 

var txtpoindyr = new Ext.form.NumberField({
        fieldLabel  : 'Year',
        id          : 'txtpoindyr',
        width       : 30,
        name        : 'txtpoindyr',
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
});

var cmbGRNNo = new Ext.form.ComboBox({
    fieldLabel      : 'GRN No',
    width           :  80,
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
                    refresh(); 
                    btnItemRefresh.show();
                    cmbPurGroup.setRawValue('');
                    grnrounding = 0;
                    txtGRNNo.setRawValue(cmbGRNNo.getRawValue());
                    GRNdetailsLoadDataStore.removeAll(); 
                    GRNdetailsLoadDataStore.load({
                       url: 'ClsGrn.php',
                       params:
                       {
                          task:"loadgrndetails",
                          grnno:txtGRNNo.getRawValue(),
//                          finid:txtpoindyr.getValue(),
                          finid:GinFinid,
                          compcode:Gincompcode,
                          purtype :purtype,

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=GRNdetailsLoadDataStore.getCount();
                         rejectqty = 0;
//alert(cnt);
                         if(cnt>0)
		         {  


                             supstate = GRNdetailsLoadDataStore.getAt(0).get('cust_state'); 


            		    if ( supstate == 24)
                               statecode = "T";
			    else if ( statecode == 34 ||statecode == 0 )
                               statecode = "I";
                            else
                               statecode = "O";
  



			    loadPurchaseGroupDatasore.load({
				url: 'ClsPo.php',
                		params: {
                    			task: 'loadPurGroup',
                              	        statecode:statecode, 
                		},
                              callback:function()
                              {
	//	alert(loadtaxlistdatastore.getAt(0).get('tax_state'));		
                              }
		             });


 
                             grntype = GRNdetailsLoadDataStore.getAt(0).get('minh_type');  
                             if (GRNdetailsLoadDataStore.getAt(0).get('minh_type') == 'I')
                             {
                                 Ext.getCmp('opt_select').setValue(1);
                             }
                             else
                             {
                                 Ext.getCmp('opt_select').setValue(2);
                             }  


                             if (GRNdetailsLoadDataStore.getAt(0).get('minh_grn_status') == 'P')
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


if (GRNdetailsLoadDataStore.getAt(0).get('minh_grn_status') == 'P')
{
    alert("Grn is pending ... You can't Modify...")
    Ext.getCmp('save').setDisabled(true);
    Ext.getCmp('save2').setDisabled(true);
}
else
{
    Ext.getCmp('save').setDisabled(false);
    Ext.getCmp('save2').setDisabled(false);
}
                             editgrnvalue = GRNdetailsLoadDataStore.getAt(0).get('minh_value');

                             accseqno  = GRNdetailsLoadDataStore.getAt(0).get('minh_acc_seqno');


                             partycode = GRNdetailsLoadDataStore.getAt(0).get('mint_sup_code');
                             supcode = GRNdetailsLoadDataStore.getAt(0).get('mint_sup_code');

                             partyledcode = GRNdetailsLoadDataStore.getAt(0).get('mint_sup_code');
                             txtSupplierName.setValue(GRNdetailsLoadDataStore.getAt(0).get('cust_ref'));

                             dtpBill.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_date'),"d-m-Y"));
                             dtpgrn.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('mint_mindate'),"d-m-Y"));

                             txtTruck.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_carrier'));
                             txtRemarks.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_remarks'));
                             txtlrnumber.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_lrno'));
                             LRdate.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('minh_lrdate'),"d-m-Y"));
                             cmbgateentryno.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_geno'));
                             gentrydate.setRawValue(Ext.util.Format.date(GRNdetailsLoadDataStore.getAt(0).get('minh_gedate'),"d-m-Y"));
                             txtPayTerms.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_credit_days'));
	    		     myFormPanel.getForm().findField('txtBillNo').setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_bill_no'));

                             cmbPONO.setValue(GRNdetailsLoadDataStore.getAt(0).get('mint_ind_fincode'));  
                             cmbPONO.setRawValue(GRNdetailsLoadDataStore.getAt(0).get('mint_pono'));  

                             indno = GRNdetailsLoadDataStore.getAt(0).get('mint_pono');
                             indfincode = GRNdetailsLoadDataStore.getAt(0).get('mint_ind_fin_code');
                             txtpoindyr.setValue(GRNdetailsLoadDataStore.getAt(0).get('mint_ind_fin_code'));

                        if (GRNdetailsLoadDataStore.getAt(0).get('minh_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else if (GRNdetailsLoadDataStore.getAt(0).get('minh_roundneeded') == "N")
                           Ext.getCmp("optRounding").setValue(2);
                        else
                           Ext.getCmp("optRounding").setValue(3);

                           txtroundoff.setValue(GRNdetailsLoadDataStore.getAt(0).get('minh_round_off'));  
                           grnrounding = GRNdetailsLoadDataStore.getAt(0).get('minh_round_off');  

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
            		       var mintacceptqty1     = GRNdetailsLoadDataStore.getAt(j).get('mint_accept_qty');
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


                               rejectqty = Number(rejectqty) + Number(GRNdetailsLoadDataStore.getAt(j).get('mint_rej_qty'));

//alert(GRNdetailsLoadDataStore.getAt(j).get('mint_item_spec'));

                               mcgstpm  = 0;
                               msgstpm  = 0;
                               migstpm  = 0;
                               if (j == 0)
                               {
                                  mcgstpm  = GRNdetailsLoadDataStore.getAt(j).get('minh_cgst_pm');
                                  msgstpm  = GRNdetailsLoadDataStore.getAt(j).get('minh_sgst_pm');
                                  migstpm  = GRNdetailsLoadDataStore.getAt(j).get('minh_igst_pm');
                               }
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
                                     mintacceptqty     : mintacceptqty1,
			             mintunitrate      : mintunitrate1,
			             mintdiscount      : mintdiscount1,
                                     mintdisamt        : mintdisamt1,
			             mintpfper         : mintpfper1,
                                     mintpfamt         : mintpfamt1,
                                     mintothers        : mintothers1,
                                     mintcgstper       : mintcgstper1,
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
                                     cgstpm            : mcgstpm,
                                     sgstpm            : msgstpm,
                                     igstpm            : migstpm,
                                     insurance         : GRNdetailsLoadDataStore.getAt(j).get('mint_insurance'),
                                     mintrcvdqty       : GRNdetailsLoadDataStore.getAt(j).get('mint_recdqty_bill'),
                                     mintstockqty      : GRNdetailsLoadDataStore.getAt(j).get('mint_rcvd_qty'),
                                     uomcode           : GRNdetailsLoadDataStore.getAt(j).get('mint_item_unit'),
                                     itemspec          : GRNdetailsLoadDataStore.getAt(j).get('mint_item_spec'),
                                     transportation    : GRNdetailsLoadDataStore.getAt(j).get('mint_transport'),
                                     valuepm           : GRNdetailsLoadDataStore.getAt(j).get('mint_value_pm'),
                                     mintrejectqty     : GRNdetailsLoadDataStore.getAt(j).get('mint_rej_qty'),
                                     delrecord         : 'N',
                                   })

                                );
//	             	        grid_tot();

                              

/*

                       	 	LoadItemDatastore.load({
		 		url: 'ClsGrn.php',
				params: {
				    task: 'loaditem',
				    finid: indfincode,
				    compcode:Gincompcode,
				    pono:indno,
				    flag:grnflag,
			            supcode:partycode
			          }
                               });
*/
   

//flxaccupdation();

                             } // for loop end
 grid_tot();
/*
                             if (Number(GRNdetailsLoadDataStore.getAt(0).get('acctrail_adj_value')) > 0)
                             {
		                     alert("Amount Already Adjusted.  You can't Modify..")
		                     Ext.getCmp('save').setDisabled(true);
		                     Ext.getCmp('save2').setDisabled(true);

                         
                             }
                             else {
                                     Ext.getCmp('save').setDisabled(false);
		                     Ext.getCmp('save2').setDisabled(true);

                             }

*/

                             if (Number(rejectqty) > 0)
                             {
		                     alert("Qty Return in the GRN.  You can't Modify..")
		                     Ext.getCmp('save').setDisabled(true);
		                     Ext.getCmp('save2').setDisabled(true);

                             }   
                             editdatecheck();

loadPOINDENTDetials();

grid_tot();
//flxaccupdation();
grid_tot2();

                         }  
                         else {  
                            alert("GRN Number not found..."); 
                         }  // if end
            
                      }  // call back function end
                   });



               }


    }     
});


function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
        var rounding =0;
        var rebate = 0;
        var ins = 0;
        var tcs = 0;

        flxAccounts.getStore().removeAll();
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();



        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : partyledcode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : "0",
//              credit    : txtGRNValue.getValue(),
              credit    :  Ext.util.Format.number(txtGRNValue.getValue(),'0.00'),
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

    


        for(var i=0;i<Row;i++)
        {



            purlcode =  Number(sel[i].data.purgrpcode); 
            purlname =  sel[i].data.purgrpname; 





            cgstlcode     =  Number(sel[i].data.cgstled); 
            sgstlcode     =  Number(sel[i].data.sgstled); 
            igstlcode     =  Number(sel[i].data.igstled);



            ins  = ins  + Number(sel[i].data.insurance)  ;
            tcs  = tcs  + Number(sel[i].data.minttcsval)  ;
 
            frtpartylcode =   0; // Number(sel[i].data.frtparty); 
            frtlcode      =   0; // Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  0; // sel[i].data.frtledname; 
            frtlname      =  0; // sel[i].data.frtglledname; 

            othledname    =  sel[i].data.othledname;    
            othledcode    =  sel[i].data.othledcode; 
            otheramt      =  Number(sel[i].data.mintothers);

            if (sel[i].data.delrecord == "N")
            {
		    puramt    = Number(sel[i].data.mintvalue); 
		    cgstamt   = Number(sel[i].data.mintcgstamt) + Number(sel[i].data.cgstpm) ;
		    sgstamt   = Number(sel[i].data.mintsgstamt) + Number(sel[i].data.sgstpm) ;
		    igstamt   = Number(sel[i].data.mintigstamt) + Number(sel[i].data.igstpm) ;
		    frtamt    = Number(sel[i].data.mintfreight);

		    inamt     = 0;// Number(sel[i].data.inwardamt);
		    frtamt    = 0;//  Number(sel[i].data.frtamt);
		    rebate    = 0;//  Number(sel[i].data.rebate);
		    puramt2     = Number( Number(sel[i].data.mintvalue)) - Number(txtTotPF.getValue()) - Number(otheramt)- Number(frtamt) - Number(ins) ; 
		    puramt2     = Number(sel[i].data.mintvalue)+Number(tcs); 
            }
            else
            {
		    puramt    = 0; 
		    cgstamt   = 0;
		    sgstamt   = 0;
		    igstamt   = 0;
		    frtamt    = 0;

		    inamt     = 0;// Number(sel[i].data.inwardamt);
		    frtamt    = 0;//  Number(sel[i].data.frtamt);
		    rebate    = 0;//  Number(sel[i].data.rebate);
		    puramt2     = 0; 
		    puramt2     = 0; 
            }


puramt2 = Number(puramt2)+ Number(txtTotValuePM.getValue());

//-- For Purchase Ledger
            dbamt = 0;
            k =0;

  //          flxAccounts.getSelectionModel().selectAll();

/*
            var selrows = flxAccounts.getSelectionModel().getCount();

            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){



                if (Number(sel1[j].data.ledcode) == purlcode )
                {    
                   dbamt =  puramt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', Ext.util.Format.number(dbamt,"0.00"));
                   k =1;
                }
            }
*/

        var selrows = flxAccounts.getStore().getCount();
        for (var i1 = 0; i1 < selrows; i1++) {

            var rec = flxAccounts.getStore().getAt(i1);
            if (Number(rec.get('ledcode')) == purlcode )
            {
                dbamt =  puramt + Number(rec.get('debit'));
                k = 1;
                rec.set('debit', Ext.util.Format.number(dbamt,"0.00"));

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
//			      debit     : puramt,
		              debit     : Ext.util.Format.number(puramt2,'0.00'),
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end



//-- For CGST Ledger
            dbamt = 0;
            k =0;

    //        flxAccounts.getSelectionModel().selectAll();

/*
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == cgstled )
                {    
                   dbamt =  cgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
*/

        var selrows = flxAccounts.getStore().getCount();
        for (var i1 = 0; i1 < selrows; i1++) {

            var rec = flxAccounts.getStore().getAt(i1);
            if (Number(rec.get('ledcode')) == cgstlcode )
            {
                dbamt =  cgstamt + Number(rec.get('debit'));
                k = 1;
                rec.set('debit', Ext.util.Format.number(dbamt,"0.00"));

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
//			      debit     : cgstamt,
		              debit     : Ext.util.Format.number(cgstamt,'0.00'),
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),           
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For SGST Ledger
            dbamt = 0;
            k =0;
/*
//            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == sgstlcode )
                {    
                   dbamt =  sgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
*/
        var selrows = flxAccounts.getStore().getCount();
        for (var i1 = 0; i1 < selrows; i1++) {

            var rec = flxAccounts.getStore().getAt(i1);
            if (Number(rec.get('ledcode')) == sgstlcode )
            {
                dbamt =  sgstamt + Number(rec.get('debit'));
                k = 1;
                rec.set('debit', Ext.util.Format.number(dbamt,"0.00"));

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
//			      debit     : sgstamt,
		              debit     : Ext.util.Format.number(sgstamt,'0.00'),
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),        
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

//-- For IGST Ledger
            dbamt = 0;
            k =0;
/*
//            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == igstlcode )
                {    
                   dbamt =  igstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
*/
        var selrows = flxAccounts.getStore().getCount();
        for (var i1 = 0; i1 < selrows; i1++) {

            var rec = flxAccounts.getStore().getAt(i1);
            if (Number(rec.get('ledcode')) == igstlcode )
            {
                dbamt =  igstamt + Number(rec.get('debit'));
                k = 1;
                rec.set('debit', Ext.util.Format.number(dbamt,"0.00"));

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
//			      debit     : igstamt,
		              debit     : Ext.util.Format.number(igstamt,'0.00'),
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),         
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end
/*
//-- For Inward Ledger - Debit
            dbamt = 0;
            k =0;

 //           flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == 1607 )
                {    
                   dbamt =  inamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', Ext.util.Format.number(dbamt,"0.00"));
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
//			      debit     : inamt,
		              debit     : Ext.util.Format.number(inamt,'0.00'),
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),       
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For Freight Ledger - Debit
            dbamt = 0;
            k =0;

if (supstate == 24)
{ 
      //      flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.frtamt) > 0 )
                {    
                   dbamt =  frtamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && frtamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '2020',
			      ledname   : 'FREIGHT INWARD -GST',

	//		      debit     : frtamt,
		              debit     : Ext.util.Format.number(frtamt,'0.00'),

              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
}
else
{ 
      //      flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.frtamt) > 0)
                {    
                   dbamt =  frtamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && frtamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '2522',
			      ledname   : 'FREIGHT INWARD - IGST',
		              debit     : Ext.util.Format.number(frtamt,'0.00'),

              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
}
*/
//--end

//-- For Other Charges
            dbamt = 0;
            k =0;

      //      flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) ==  2019 )
                {    
                   dbamt =  otheramt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && otheramt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '2019',
			      ledname   : 'OTHER CHARGES',
		              debit     : Ext.util.Format.number(otheramt,'0.00'),

              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : "0",
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
                   rebate =  rebate + Number(sel1[j].data.debit);
                   sel1[j].set('debit', rebate);
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

//			      debit     : rebate,
		              debit     : Ext.util.Format.number(rebate,'0.00'),


              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),      
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


/*
//-- For Freight Ledger - Credit
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) ==  frtlcode)
                {    
                   dbamt =  frtamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
                   k =1;
                }
            }
            if (k==0 && frtamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : frtlcode,
			      ledname   :  frtlname,
			      debit     : "0",
			      credit    : frtamt,
                        }) 
                        );
            } 
//--end

*/
//-- For Inward Ledger - Credit
            dbamt = 0;
            k =0;

//            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == 155 )
                {    
                   dbamt =  inamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
                   k =1;
                }
            }
            if (k==0 && inamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : '155',
			      ledname   : 'CASH CONTRA - STORE PURCHASE',
			      debit     : "0",
              billno    : txtBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),
			      credit    : inamt,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

/*
           frtpartylcode =  Number(sel[i].data.frtparty); 
            frtlcode      =  Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  sel[i].data.frtledname;


//-- For Freight Party A/C - Credit
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == frtpartylcode )
                {    
                   dbamt =  inamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
                   k =1;
                }
            }
            if (k==0 && frtamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : frtpartylcode,
			      ledname   : frtpartylname,
			      debit     : "0",
			      credit    : frtamt,
                              billno    : txtBillNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),
                              ledtype   : "P",

                        }) 
                        );
            } 
//--end
*/
 


 


       //     flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(sel1[j].get('credit'));
                  sel1[j].set('debit',Ext.util.Format.number(Number(sel1[j].get('debit')*100/100),'0.00'));
                  sel1[j].set('credit',Ext.util.Format.number(Number(sel1[j].get('credit')*100/100),'0.00'));
            }   
           
           

rounding = Number(txtroundoff.getValue());
var rounddr = 0;
var roundcr = 0;
if (rounding >0)
   rounddr = rounding;
else
   roundcr = Math.abs(rounding);


 
  
        }  

//-- For PACKING AND FORWARDING CHARGES (P&F)

            dbamt = 0;
            k =0;

//alert(supstate);
if (supstate == 24)
{ 
              if ( Number(txtTotPF.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2309,
			      ledname   : 'PACKING CHARGES -GST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotPF.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 

              if ( Number(txttotfreight1.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2020,
			      ledname   : 'FREIGHT INWARD -GST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txttotfreight1.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            }

              if ( Number(txtTotTransport.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 1833,
			      ledname   : 'FREIGHT INWARD RCM GST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotTransport.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            }  
}

else
{ 
              if ( Number(txtTotPF.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2703,
			      ledname   : 'PACKING CHARGES - IGST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotPF.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 

              if ( Number(txttotfreight1.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2522,
			      ledname   : 'FREIGHT INWARD - IGST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txttotfreight1.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 


              if ( Number(txtTotTransport.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2243,
			      ledname   : 'FREIGHT INWARD RCM -IGST',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotTransport.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            }  
}
//--end


              if ( Number(txtTotInsurance.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 1836,
			      ledname   : 'INSURANCE PREMIUM',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotInsurance.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 



              if ( Number(txtTotOthersPM.getValue()) >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2019,
			      ledname   : 'OTHER CHARGES',
	//		      debit     : txtTotPF.getValue(),
			      debit     : Ext.util.Format.number(txtTotOthersPM.getValue(),'0.00'),
 			      billno    : txtBillNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtpBill.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
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
      //      sel1[1].set('debit',sel1[1].get('debit')-diff);
       grid_tot2();



}		 



var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        width       : 80,
        name        : 'txtGRNNo',
        readOnly    : 'ture',
        maskRe: /^[a-zA-Z0-9]$/,
        enableKeyEvents: true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpgrn.focus();
const input = document.getElementById('dtpgrn');
const end = input.value.length;
input.setSelectionRange(0,0);
input.focus();
             }
       },
           keyup:function(){

//alert(txtGRNNo.getValue());
//alert(GinFinid);
//alert(Gincompcode);


               if (Number(txtGRNNo.getValue()) > 0 )  
               {
                    GRNdetailsLoadDataStore.removeAll(); 
                    GRNdetailsLoadDataStore.load({
                       url: 'ClsGrn.php',
                       params:
                       {
                          task:"loadgrndetails",
                          grnno:txtGRNNo.getValue(),
                          finid:txtpoindyr.getValue(),
                          compcode:Gincompcode,
                          purtype :mintype,

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=GRNdetailsLoadDataStore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  
                        alert("GRN Number Already Entered....."); 
                         }  
                         else {  
    
                         }  // if end
            
                      }  // call back function end
                   });
}
           }
        }  

   }); 

 var txtRcvdQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRcvdQty',
        width       : 75,
        name        : 'txtRcvdQty',
        decimalPrecision: 3,
        readOnly    : 'ture',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtAcceptQty.focus();
             }
       },
        change:function(){
              txtAcceptQty.setValue(txtRcvdQty.getValue());
              txtStockQty.setValue(txtRcvdQty.getValue());
        },
        keyup:function(){
              txtAcceptQty.setValue(txtRcvdQty.getValue());
              txtStockQty.setValue(txtRcvdQty.getValue());
        },
      }

   }); 

 var txtAcceptQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAcceptQty',
        width       : 75,
        name        : 'txtAcceptQty',
        decimalPrecision: 3,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        readOnly    : true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtStockQty.focus();
             }
       },
 
        change:function(){
                if (Number(txtAcceptQty.getValue()) > txtordqty.getValue())
                 {
                     alert("Received Quantity should not higher then Order balance Quantity..");
                     gstadd="false";
//                     txtAcceptQty.setValue(0); 
                 }
                if (Number(txtAcceptQty.getValue()) > txtinvqty.getValue())
                 {
                     alert("Received Quantity should not higher then Invoice Quantity..");
                     gstadd="false";
//                     txtAcceptQty.setValue(0); 
                 }    

         calculateItemValue();
        },
        keyup:function(){
         calculateItemValue();
        },
        blur:function(){
         calculateItemValue();
        }
      }

   });  
   

 var txtStockQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtStockQty',
        width       : 75,
        name        : 'txtStockQty',
        decimalPrecision: 3,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : true,
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtValuePM.focus();
             }
       },
      }
});

/*
 var txtValuePM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtValuePM',
        width       : 60,
        name        : 'txtValuePM',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'Text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        minValue: -1.00,
        maxValue    : 1.00,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 cmbPurGroup.focus();
             }
       },

        change: function(field) {
            if (!/^-?(?:1(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/.test(newValue)) {
                field.setValue(null);
                Ext.Msg.alert('Invalid Input', 'Please enter a number between -1.00 and +1.00 with up to 2 decimal places.');
                calculateItemValue();
            } else {
                calculateItemValue();
            }
        },
        blur: function(field) {
            const newValue = field.getValue();
            if (!/^-?(?:1(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/.test(newValue)) {
                field.setValue(null);
                Ext.Msg.alert('Invalid Input', 'Please enter a number between -1.00 and +1.00 with up to 2 decimal places.');
                calculateItemValue();
            } else {
                calculateItemValue();
            }
        },
        keyup: function(field) {
            const newValue = field.getValue();
            if (!/^-?(?:1(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/.test(newValue)) {
                field.setValue('');
                Ext.Msg.alert('Invalid Input', 'Please enter a number between -1.00 and +1.00 with up to 2 decimal places.');
                calculateItemValue();
            } else {
                calculateItemValue();
            }
        },
      }
});

*/


function validateTypingValue(field) {
    const raw = field.getRawValue(); // this keeps partial text like "-"
    const allowedPartial = /^-?$|^-?0?$|^-?0\.?$|^-?0\.\d{0,2}$|^-?1\.?$|^-?1\.0{0,2}$/

    // Don't interrupt user for valid partial input
    if (!allowedPartial.test(raw)) {
        field.setValue(null);
        Ext.Msg.alert('Invalid Input', 'Please enter a number between -1.00 and +1.00 with up to 2 decimal places.');
        calculateItemValue();
    }
}

function validateInput(field) {
    const value = field.getValue();
    const stringValue = value != null ? value.toString() : '';
    const isValid = /^-?(?:1(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/.test(stringValue);

    if (!isValid) {
        field.setValue('');
        Ext.Msg.alert('Invalid Input', 'Please enter a number between -1.00 and +1.00 with up to 2 decimal places.');
    }

    calculateItemValue();
}


 var txtValuePM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtValuePM',
        width       : 60,
        name        : 'txtValuePM',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        minValue: -1.00,
        maxValue    : 1.00,
        readOnly    : true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 cmbPurGroup.focus();
             }
       },

        change: validateInput,
        blur: validateInput,
        keyup: validateTypingValue
      }
});



 var txtValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtValue',
        width       : 90,
        name        : 'txtValue',
        decimalPrecision: 2,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        readOnly   : true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbtype.focus();
             }
       },
      }
});


   var txtunitrate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtunitrate',
        width       : 75,
        name        : 'txtunitrate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        decimalPrecision: 4,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbtype.focus();
             }
       },
        change:function(){
         calculateItemValue();
        },
        keyup:function(){
         calculateItemValue();
        },
        blur:function(){
         calculateItemValue();
        }
      }

   }); 




   var txtBillNo = new Ext.form.TextField({
        fieldLabel  : 'Bill No.',
        id          : 'txtBillNo',
        width       : 100,
        name        : 'txtBillNo',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
      //          Ext.getCmp('dtpBill').focus(false, 0);
/*	
		const input = document.getElementById('dtpBill');
		const end = input.value.length;
		input.setSelectionRange(0,0);
		input.focus();
*/
    setTimeout(() => {
        const input = document.getElementById('dtpBill');
        if (!input) {
            console.warn("Element with ID 'dtpBill' not found.");
            return;
        }

        // Focus the field and move cursor to first character
        input.focus();
        input.setSelectionRange(0, 0);

        // Attach overwrite mode ONCE
        if (!input.dataset.overwriteAttached) {
            input.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;

                e.preventDefault(); // prevent normal input behavior

                const start = input.selectionStart;
                const value = input.value;

                const before = value.slice(0, start);
                const after = value.slice(start + 1); // overwrite next char

                input.value = before + e.key + after;

                // Move cursor forward
                input.setSelectionRange(start + 1, start + 1);
            });

            // Mark it as attached to avoid duplicate listeners
            input.dataset.overwriteAttached = "true";
        }
    }, 100); 
}
            }
       },
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


   var txtuom = new Ext.form.TextField({
        fieldLabel  : 'UOM',
        id          : 'txtuom',
        width       : 50,
        name        : 'txtuom',
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
   }); 

     var txtdisper = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtdisper',
        width       : 75,
        name        : 'txtdisper',
        enableKeyEvents: true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtdisval.focus();
             }
       },
        change:function(){
         txtdisval.setValue(0);
         calculateItemValue();
        },
        keyup:function(){
         txtdisval.setValue(0);
         calculateItemValue();
        },
        blur:function(){
         txtdisval.setValue(0);
         calculateItemValue();
        }
      }
   }); 


     var txtitemvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtitemvalue',
        width       : 85,
        name        : 'txtitemvalue',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnsubmit.focus();
             }
       },
}
   }); 

     var txtiteminvvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtiteminvvalue',
        width       : 85,
        name        : 'txtiteminvvalue',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
   }); 

      var txtpfper = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtpfper',
        width       : 75,
        name        : 'txtpfper',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
       enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpfval.focus();
             }
       },
        change:function(){
         calculateItemValue();
        },
        keyup:function(){
         calculateItemValue();
        },
        blur:function(){
         calculateItemValue();
        }
      }


   }); 
     var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCGSTPer',
        width       : 75,
        name        : 'txtCGSTPer',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
   
     var txtTCSPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSPer',
        width       : 75,
        name        : 'txtTCSPer',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTCSVal.focus();
             }
       },
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
   
        var txtSGSTPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSGSTPer',
        width       : 75,
        name        : 'txtSGSTPer',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
        var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTPer',
        width       : 75,
        name        : 'txtIGSTPer',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
   
        var txtothers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtothers',
        width       : 75,
        name        : 'txtothers',
     labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtothersPM.focus();
             }
       },

          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 


        var txtTransport = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTransport',
        width       : 75,
        name        : 'txtTransport',
     labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtothersPM.focus();
             }
       },

          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 


        var txtRebate = new Ext.form.NumberField({
        fieldLabel  : 'Rebate',
        id          : 'txtRebate',
        width       : 75,
        name        : 'txtRebate',
     labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtInsurance.focus();
             }
       },

          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 


  var txtTCSVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTCSVal',
        width       : 75,
        name        : 'txtTCSVal',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : true,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtfreight.focus();
             }
       },
}
   })

  var txtdisval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtdisval',
        width       : 75,
        name        : 'txtdisval',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpfper.focus();
             }
       },
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
   
      var txtpfval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtpfval',
        width       : 75,
        name        : 'txtpfval',
        decimalPrecision: 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,

        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTCSPer.focus();
             }
       },
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
     var txtCGSTVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCGSTVal',
        width       : 75,
        name        : 'txtCGSTVal',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
   
        var txtSGSTVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSGSTVal',
        width       : 75,
        name        : 'txtSGSTVal',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 
        var txtIGSTVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTVal',
        width       : 75,
        name        : 'txtIGSTVal',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   }); 


function gstValueChange()
{


        var tamt = 0   
        var selrows = flxDetail.getStore().getCount();
        for (var i1 = 0; i1 < 1; i1++) {
            var rec = flxDetail.getStore().getAt(i1);

            rec.set('cgstpm', Ext.util.Format.number(Number(txtCGSTPM.getValue()),"0.00"));
            rec.set('sgstpm', Ext.util.Format.number(Number(txtCGSTPM.getValue()),"0.00"));
            rec.set('igstpm', Ext.util.Format.number(Number(txtIGSTPM.getValue()),"0.00"));
  
        } 

        grid_tot();

}



     var txtTotValuePM = new Ext.form.NumberField({
        fieldLabel  : '+/-',
        id          : 'txtTotValuePM',
        width       : 50,
        minvalue    : 0.01,
        maxvalue    : 0.05,
        name        : 'txtTotValuePM',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        decimalPrecision: 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        listeners:{
          change:function(){

              flxaccupdation();
          },
          keyup:function(){
            flxaccupdation();
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
//alert("!");
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
/*   
   var txtothval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtothv',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtothv'
   });
*/   
   var txtordqty = new Ext.form.NumberField({
        fieldLabel  : 'PO Qty',
        id          : 'txtordqty',
        width       : 60,
        name        : 'txtordqty',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : 'ture',
        decimalPrecision: 3,
   });
   
   var txttolerance = new Ext.form.NumberField({
        fieldLabel  : 'Tolerance',
        id          : 'txtoler',
        width       : 50,
        name        : 'txtoler',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : true  
   });
   

   
    var txtfreight = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtothers.focus();
             }
       },

          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   });
   
    var txtinward = new Ext.form.NumberField({
        fieldLabel  : 'Inward',
        id          : 'txtinw',
        width       : 75,
        name        : 'txtinw',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 
   });
   
   var txtothersPM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtothersPM',
        width       : 75,
        name        : 'txtothersPM',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtitemvalue.focus();
             }
       },

          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 

   });
   
     var txtclrfreight1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtclrfreight1',
        width       : 75,
        name        : 'txtclrfreight1',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
          change:function(){
              calculateItemValue();
          },
          keyup:function(){
          calculateItemValue();
         }
        } 

   });
   
      var txtfreightparty = new Ext.form.TextField({
        fieldLabel  : 'Freight Party',
        id          : 'txtfrep1',
        width       : 205,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtfrep1'
   });
   
   var txtTruck = new Ext.form.TextField({
        fieldLabel  : 'Truck',
        id          : 'txtTruck',
        width       : 100,
        name        : 'txtTruck',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},
 listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRemarks.focus();
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
                  txtPayTerms.focus();
             }
       },
}
   });
   
   
   var txtlrnumber  = new Ext.form.TextField({
        fieldLabel  : 'LR Number',
        id          : 'txtlrnumber',
        width       : 80,
        name        : 'txtlrnumber',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {





    setTimeout(() => {
        const input = document.getElementById('LRdate');
        if (!input) {
            console.warn("Element with ID 'lrdate' not found.");
            return;
        }

        // Focus the field and move cursor to first character
        input.focus();
        input.setSelectionRange(0, 0);

        // Attach overwrite mode ONCE
        if (!input.dataset.overwriteAttached) {
            input.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;

                e.preventDefault(); // prevent normal input behavior

                const start = input.selectionStart;
                const value = input.value;

                const before = value.slice(0, start);
                const after = value.slice(start + 1); // overwrite next char

                input.value = before + e.key + after;

                // Move cursor forward
                input.setSelectionRange(start + 1, start + 1);
            });

            // Mark it as attached to avoid duplicate listeners
            input.dataset.overwriteAttached = "true";
        }
    }, 100);
             }
       },
}
   });
   

     var txtInsurance = new Ext.form.NumberField({
        fieldLabel  : 'Insurance',
        id          : 'txtInsurance',
        width       : 75,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtInsurance',
        enableKeyEvents: true,
        decimalPrecision: 2,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtdisper.focus();
             }
       },
          keyup:function(){
               calculateItemValue();
         },
          change:function(){
               calculateItemValue();
         },
          blur:function(){
               calculateItemValue();
         },
        }     
   }); 
   

     var txtTotInsurance = new Ext.form.NumberField({
        fieldLabel  : 'Insurance',
        id          : 'txtTotInsurance',
        width       : 75,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtInsurance',
        enableKeyEvents: true,
        decimalPrecision: 2,
        listeners:{

        }     
   }); 

     var txtgrossval = new Ext.form.NumberField({
        fieldLabel  : 'Gross Value',
        id          : 'txtgrsval',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtgrsval'
   }); 
   
      var txttotdisc = new Ext.form.NumberField({
        fieldLabel  : 'Discount',
        id          : 'txttotdisc',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotdisc'
   }); 
     var txtTotPF = new Ext.form.NumberField({
        fieldLabel  : 'PF',
        id          : 'txtTotPF',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotPF'
   }); 
   
        var txttotfreight1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txttotfreight1',
        width       : 75,
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
   
   
     var txttotcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txttotcgst',
        width       : 75,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotcgst',
        id          : 'txttotcgst',
        enableKeyEvents: true,
        listeners:{
          change:function(){
            txttotsgst.setValue(txttotcgst.getValue());
            grid_tot();
            flxaccupdation();
          },
          keyup:function(){

            grid_tot();
            flxaccupdation();
         }
        } 

   }); 
   
      var txttotsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txttotsgst',
        width       : 75,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotsgst',
        id          : 'txttotsgst',

   }); 
     var txttotigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txttotigst',
        width       : 75,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotigst',
        id          : 'txttotigst',
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
   
     var txttottcs = new Ext.form.NumberField({
        fieldLabel  : 'TCS',
        id          : 'txttottcs',
        width       : 75,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttottcs',
        id          : 'txttottcs',
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
        var txtTotOthersPM = new Ext.form.NumberField({
        fieldLabel  : 'OTH+/-',
        id          : 'txtTotOthersPM',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotOthersPM'
   }); 


        var txtTotTransport = new Ext.form.NumberField({
        fieldLabel  : 'TRANSPORT',
        id          : 'txtTotTransport',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotOthersPM'
   }); 



        var txttotinward = new Ext.form.NumberField({
        fieldLabel  : 'Inward Charges',
        id          : 'txttotinward',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttotinward'
   }); 
   
     var txttottaxfrt1 = new Ext.form.NumberField({
        fieldLabel  : 'CLR Freight 1',
        id          : 'txttottaxfrt1 ',
        width       : 75,
        readOnly    : true,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txttottaxfrt1'
   }); 
     var txttottaxgst1  = new Ext.form.NumberField({
        fieldLabel  : 'GST for CLR Freight1',
        id          : 'txtgstfre1',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtgstfre1'
   }); 
   
        var txttaxfri3 = new Ext.form.NumberField({
        fieldLabel  : 'CLR Freight 2',
        id          : 'txtaxfre3',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtaxfre3'
   }); 
        var txtaxgst2 = new Ext.form.NumberField({
        fieldLabel  : 'GST for CLR Freight 2',
        id          : 'txtgstfre2',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtgstfre2'
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
        name        : 'txtlanval',

   }); 
   
      var txtGRNValue = new Ext.form.NumberField({
        fieldLabel  : 'GRN/Inv Value',
        id          : 'txtGRNValue',
        width       : 75,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtGRNValue'
   }); 
   

      var txtPayTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPayTerms',
        width       : 75,
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtPayTerms',
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbgateentryno.focus();
             }
       },
}

   }); 
  
 
 
var store = new Ext.data.Store({
     
    });


     var cmbrcm = new Ext.form.ComboBox({
        id: 'cmbrcm',
        store: store,
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'RCM (Y /N)',
        editable:false,
        store: [['Y','YES'],['N','NO']],
        
        width: 80
        
    });
    
       var cmbgateentryno = new Ext.form.ComboBox({
        id: 'cmbgateentryno',
        store: store,
      labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,

        fieldLabel:'Gate Entry No',
        editable:true,
        
        width: 80,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                //  txtlrnumber.focus();

    setTimeout(() => {
        const input = document.getElementById('gentrydate');
        if (!input) {
            console.warn("Element with ID 'gentrydate' not found.");
            return;
        }

        // Focus the field and move cursor to first character
        input.focus();
        input.setSelectionRange(0, 0);

        // Attach overwrite mode ONCE
        if (!input.dataset.overwriteAttached) {
            input.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;

                e.preventDefault(); // prevent normal input behavior

                const start = input.selectionStart;
                const value = input.value;

                const before = value.slice(0, start);
                const after = value.slice(start + 1); // overwrite next char

                input.value = before + e.key + after;

                // Move cursor forward
                input.setSelectionRange(start + 1, start + 1);
            });

            // Mark it as attached to avoid duplicate listeners
            input.dataset.overwriteAttached = "true";
        }
    }, 100);
             }
       },
}
        
    });

var store3 = new Ext.data.Store({
      
    });
    
var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 140,
    height:127,
    defaultType : 'textfield',
    x:740,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 calculateItemValue();   
                 grid_tot();
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                calculateItemValue();   
                grid_tot();
               }
              }
             }},

            {boxLabel: 'Manual', name: 'optRounding',  inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="M";

                calculateItemValue();   
               grid_tot();
               }
              }
             }} //,txtfreight



        ],
    },

    ],
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
                txtBillNo.focus();
                txtAcceptQty.show();
		txtunitrate.show();
		cmbtype.show();
		lblIGST.show();
		lblTCS.show();
		lblFreight.show();
		lblOthers.show();
		lblOthersPM.show();
lblInvQty.show();
lblRecdQty.show();
lblAcceptedQty.show();
lblStockQty.show();



			    if (selrow.get('cust_state') == 24)
                               statecode = "T";
			    else if (selrow.get('cust_state') == 34 || selrow.get('cust_state') == 0 )
                               statecode = "I";
                            else
                               statecode = "O";
  



			    loadPurchaseGroupDatasore.load({
				url: 'ClsPo.php',
                		params: {
                    			task: 'loadPurGroup',
                              	        statecode:statecode, 
                		},
                              callback:function()
                              {
	//	alert(loadtaxlistdatastore.getAt(0).get('tax_state'));		
                              }
		             });





	//	txtuom.show();
		LoadTransClrNoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadtransno',
		    finid:txtpoindyr.getValue(),
		    compcode:Gincompcode,
		    supcode:supcode,
		}
	    });
	    
	    	LoadindnoDatastore.removeAll();

		LoadindnoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadpono',
		    compcode:Gincompcode,
		    finid:txtpoindyr.getValue(),
		    supcode:supcode,
		    flag:grnflag,
                    searchedby : 'supplier'
		},
               callback:function() 
              	 {

                cmbPONO.setRawValue(LoadindnoDatastore.getAt(0).get('ind_no'));

		LoadPOindnoDatastore.removeAll();
		LoadPOindnoDatastore.load({
			url: 'ClsGrn.php',
			params: {
			    task: 'loadindentnos',
			    finid:txtpoindyr.getValue(),
			    compcode:Gincompcode,
			    pono:LoadindnoDatastore.getAt(0).get('ind_no'),
     		 	},
     		 	callback : function (){
                        cmbindno.setValue(LoadPOindnoDatastore.getAt(0).get('indfincode'));
                        cmbindno.setRawValue(LoadPOindnoDatastore.getAt(0).get('indno'));


			dtppo.setRawValue(Ext.util.Format.date(LoadPOindnoDatastore.getAt(0).get('podate'),"d-m-Y"));
                       txtPayTerms.setValue(LoadPOindnoDatastore.getAt(0).get('phd_credit_days'));
                       txttolerance.setValue(LoadPOindnoDatastore.getAt(0).get('phd_tol'));                     	

                 Ext.getCmp('cmbItem').setDisabled(true); 
                 getIndentDetails();	 	
     		 	}
	         });




                 }
	    });









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
        fieldLabel  : '',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  330,
        readOnly    : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   txtBillNo.focus();

lblInvQty.show();
lblRecdQty.show();
lblAcceptedQty.show();
lblStockQty.show();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

		txtAcceptQty.hide();
		txtunitrate.hide();
		cmbtype.hide();
		lblIGST.hide();
		lblTCS.hide();
		lblFreight.hide();
		lblOthers.hide();
		lblOthersPM.hide();
	//	txtuom.hide();

		lblInvQty.hide();
		lblRecdQty.hide();
		lblAcceptedQty.hide();
		lblStockQty.hide();


	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    }); 
   



var roundno1 = new Ext.form.Radio({id : 'r12' ,boxLabel: 'NO', name: 'rbtag', inputValue: 'c',x:580,y:370
});



var withchk = new Ext.form.Checkbox({id : 'qcchk' ,boxLabel: 'NEEDED or NOT', name: 'rbtagchk', inputValue: 'C',x:5,y:10
});



var poindno = 0;


function getIndentDetails()
{

                     Ext.getCmp('cmbItem').setDisabled(false);    

                     if (grnflag == "I")
                     {
                         poindno = cmbindno.getRawValue();
                     }   
                     else
                     {
                         poindno = cmbPONO.getRawValue();
                     }

                                cmbItem.reset()
				LoadItemDatastore.removeAll();
				LoadItemDatastore.load({
				url: 'ClsGrn.php',
				params: {
				    task: 'loaditem',
				    finid:GinFinid,
				    finid:txtpoindyr.getValue(),
				    compcode:Gincompcode,
				    pono:cmbPONO.getRawValue(),
				    indno:cmbindno.getRawValue(),
                           
				    flag:grnflag,
				    supcode:supcode
				},


					callback:function()
					{

                                  
//                                         alert(LoadItemDatastore.getCount());

                                            if (mintype == "P")
                                            {                                 
                                                 indfincode = LoadItemDatastore.getAt(0).get('ptr_ind_fin_code'); 
//alert(indfincode);

                                             }
                                            else
                                            {
//                                                indfincode = LoadItemDatastore.getAt(0).get('ptr_ind_fin_code'); 
                             			dtppo.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('ind_date'),"d-m-Y"));
                                            }       

					}


			    });	
}

      var cmbindno = new Ext.form.ComboBox({
        id: 'cmbindno',        
        displayField: 'indno',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        valueField: 'indno', //'indfincode',
        hiddenName : 'indno',
        typeAhead: true,
        mode: 'local',
        store: LoadPOindnoDatastore,
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'I.No',
        editable        : true,
        readOnly    : true,
        //labelWidth:30,
        width: 70,
            listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbItem.focus();
             }
       },
                select: function () {
                            getIndentDetails();
			
			   }
		     }
       
      });



function loadPOINDENTDetials()
{

//alert(cmbPONO.getRawValue());


                if (grnflag == "P") {
             
                		LoadPOindnoDatastore.removeAll();
				LoadPOindnoDatastore.load({
					url: 'ClsGrn.php',
					params: {
					    task: 'loadindentnos',
					    finid:txtpoindyr.getValue(),
					    compcode:Gincompcode,
					    pono:cmbPONO.getRawValue(),
                     		 	},
                     		 	callback : function (){
//annadurai

                                        cmbindno.clearValue();
					dtppo.setRawValue(Ext.util.Format.date(LoadPOindnoDatastore.getAt(0).get('podate'),"d-m-Y"));
		                       txtPayTerms.setValue(LoadPOindnoDatastore.getAt(0).get('phd_credit_days'));
		                       txttolerance.setValue(LoadPOindnoDatastore.getAt(0).get('phd_tol'));                     		 	
                     		 	}
			         });
                                 Ext.getCmp('cmbItem').setDisabled(true); 

		}      
		else if (grnflag == "I") {
			cmbItem.reset();
			LoadItemDatastore.removeAll();
			LoadItemDatastore.load({
				url: 'ClsGrn.php',
				params: {
				    task: 'loaditem',
				    finid:txtpoindyr.getValue(),
				    compcode:Gincompcode,
				    pono:cmbPONO.getRawValue(),
		 		    indno:cmbPONO.getRawValue(),
				    flag:grnflag,
				    supcode:supcode
				},
				callback:function(){
					dtppo.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('ind_date'),"d-m-Y"));	
			                       			
				}
			}); Ext.getCmp('cmbItem').setDisabled(false); 
		
		} 
}

      var cmbPONO = new Ext.form.ComboBox({
        id: 'cmbPONO',
           labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'ind_no',
        valueField: 'ind_no',//'ind_fin_code', //'ind_no', //
        hiddenName : 'ind_no',
        typeAhead: true,
        mode: 'local',
        store: LoadindnoDatastore,
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'PO No',
        readOnly    : true,
        editable        : true,
        //labelWidth:30,
        width: 70,
        listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbindno.focus();
             }
       },

            select: function () {
                // find_pono_indno();
                if (grnflag == "P") {
             
                		LoadPOindnoDatastore.removeAll();
				LoadPOindnoDatastore.load({
					url: 'ClsGrn.php',
					params: {
					    task: 'loadindentnos',
					    finid:txtpoindyr.getValue(),
					    compcode:Gincompcode,
					    pono:cmbPONO.getRawValue(),
                     		 	},
                     		 	callback : function (){
//annadurai
                                        cmbindno.clearValue();
					dtppo.setRawValue(Ext.util.Format.date(LoadPOindnoDatastore.getAt(0).get('podate'),"d-m-Y"));
		                       txtPayTerms.setValue(LoadPOindnoDatastore.getAt(0).get('phd_credit_days'));
		                       txttolerance.setValue(LoadPOindnoDatastore.getAt(0).get('phd_tol'));                     		 	
                     		 	}
			         });
                                 Ext.getCmp('cmbItem').setDisabled(true); 

		}      
		else if (grnflag == "I") {
			cmbItem.reset();
			LoadItemDatastore.removeAll();
			LoadItemDatastore.load({
				url: 'ClsGrn.php',
				params: {
				    task: 'loaditem',
				    finid:txtpoindyr.getValue(),
				    compcode:Gincompcode,
				    pono:cmbPONO.getRawValue(),
		 		    indno:cmbPONO.getRawValue(),
				    flag:grnflag,
				    supcode:supcode
				},
				callback:function(){
					dtppo.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('ind_date'),"d-m-Y"));	
			                       			
				}
			}); Ext.getCmp('cmbItem').setDisabled(false); 
		
		}         
	   }
	  }
       
      });



 function find_pono_indno()
 {

            for (var i=0;i<LoadindnoDatastore.getCount();i++) {
  		if (cmbPONO.getRawValue() == LoadindnoDatastore.getAt(i).get('ind_no')) {
				LoadItemDatastore.removeAll();
				LoadItemDatastore.load({
				url: 'ClsGrn.php',
				params: {
				    task: 'loaditem',
				    finid:txtpoindyr.getValue(),
				    compcode:Gincompcode,
				    pono:cmbPONO.getRawValue(),
                 		    indno:cmbPONO.getRawValue(),
				    flag:grnflag,
				    supcode:supcode
				},

					callback:function()
					{
                                            if (grnflag == "P")
                                            {                                 
                                               dtppo.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('ptr_podate'),"d-m-Y"));
                                               txtPayTerms.setValue(LoadItemDatastore.getAt(0).get('phd_credit_days'));
                                               txttolerance.setValue(LoadItemDatastore.getAt(0).get('phd_tol'));
                                            }
                                            else
                                            {
                             			dtppo.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('ind_date'),"d-m-Y"));
                                            }       
					}
			    });		
                            if (grnflag == "P")
                            {     
				LoadPOindnoDatastore.removeAll();
				LoadPOindnoDatastore.load({
					url: 'ClsGrn.php',
					params: {
					    task: 'loadindentnos',
					    finid:txtpoindyr.getValue(),
					    compcode:Gincompcode,
					    pono:cmbPONO.getRawValue(),
                     		 	},
			         });
                                 Ext.getCmp('cmbItem').setDisabled(true);                             
                            }
                            else {
                                 Ext.getCmp('cmbItem').setDisabled(false);                             
                            }
                           
		
		}
	     }

 
 }


  
       var cmbItem = new Ext.form.ComboBox({
        id: 'cmbItem',
        store: LoadItemDatastore,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'item_name',
        valueField:   'ptr_item_code',
        hiddenName : '',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Item',
        editable:true,
        labelWidth:30,
        width: 310,
            listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtItemSpec.focus();
             }
       },

                select: function () {


                                if (mintype == "P") {
                                   po  = cmbPONO.getRawValue();   
                                   ind = cmbindno.getRawValue();                              
                                }
                                else
                                {
                                   po  = cmbPONO.getRawValue();   
                                   ind = cmbPONO.getRawValue();   
                                                             

                                }

				loaditemdetailsDatastore.removeAll();
				loaditemdetailsDatastore.load({
				url: 'ClsGrn.php',
				params: {
				    task: 'loaditemdetails',
				    finid:txtpoindyr.getValue(),
				    compcode:Gincompcode,
				    pono  :po,
                                    indno :ind,
				    flag:grnflag,
				    itemcode:cmbItem.getValue(),                                       
				    supcode:supcode
				},
     				callback:function()
				{
                                    if (grnflag == "P")
                                    {                           
                                            refresh();
//alert(loaditemdetailsDatastore.getAt(0).get('uom_short_name'));
                           
                                            txtuom.setRawValue(loaditemdetailsDatastore.getAt(0).get('uom_short_name'));   
                                            itemuom = loaditemdetailsDatastore.getAt(0).get('uom_code'); 
                                            txtordqty.setValue(loaditemdetailsDatastore.getAt(0).get('ptr_ord_qty')-loaditemdetailsDatastore.getAt(0).get('ptr_rec_qty'));
                                            txtunitrate.setValue(loaditemdetailsDatastore.getAt(0).get('ptr_unit_rate'));      
                                            if (loaditemdetailsDatastore.getAt(0).get('ptr_discount') > 0) {
                                               txtdisper.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_discount'));
                                            }
                                            else{
                                               txtdisval.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_disval'));     
                                            }   
                                           disval = loaditemdetailsDatastore.getAt(0).get('ptr_disval');
                                            if (loaditemdetailsDatastore.getAt(0).get('ptr_pf_per') > 0) {
                                               txtpfper.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_pf_per'));
                                            }
                                            else{
                                               txtpfval.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_pfval'));     
                                            }   
                                          pfval = loaditemdetailsDatastore.getAt(0).get('ptr_pfval');
                                          txtRebate.setValue(loaditemdetailsDatastore.getAt(0).get('ptr_rebate'));
                                          txtCGSTPer.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_cgst_per'));
                                          txtSGSTPer.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_sgst_per'));
                                          txtIGSTPer.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_igst_per'));
                                          txtothers.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_oth_amt'));
					  txtTCSPer.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_tcs_per'));
                                          unit = loaditemdetailsDatastore.getAt(0).get('uom_short_name'); 
                                          balqty = loaditemdetailsDatastore.getAt(0).get('qty'); 
                                          itemcode = loaditemdetailsDatastore.getAt(0).get('ptr_item_code'); 
                                          itemgrpcode = loaditemdetailsDatastore.getAt(0).get('item_group_code');

                                          txtfreight.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_freight_amt'));
                                          indfincode  = loaditemdetailsDatastore.getAt(0).get('ptr_ind_fin_code');
                                          indno = loaditemdetailsDatastore.getAt(0).get('ptr_ind_no');
                                          cmbPurGroup.setValue(loaditemdetailsDatastore.getAt(0).get('ptr_purgroup'));                          
                                          txtItemSpec.setRawValue(loaditemdetailsDatastore.getAt(0).get('ptr_remarks'));



                                     }
                                     else
                                     { 
//alert( loaditemdetailsDatastore.getCount());       

txtuom.setValue('');
dtppo.setRawValue('');
                 
                                          itemuom = loaditemdetailsDatastore.getAt(0).get('uom_code'); 
                                          txtuom.setValue(loaditemdetailsDatastore.getAt(0).get('uom_short_name'));      
                                          txtordqty.setValue(loaditemdetailsDatastore.getAt(0).get('ind_qty')-loaditemdetailsDatastore.getAt(0).get('ind_rec_qty'));                              
                                          dtppo.setRawValue(Ext.util.Format.date(loaditemdetailsDatastore.getAt(0).get('ind_date'),"d-m-Y"));
                                          indfincode  = loaditemdetailsDatastore.getAt(0).get('ind_fin_code');
                                          indno = loaditemdetailsDatastore.getAt(0).get('ind_no');


//alert(indno);
//alert(indfincode);



                                     }
              			}
                                  
			    });

				
			   }
		     }
       
      });

      
        var cmbtype = new Ext.form.ComboBox({
        id: 'cmbtype',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [['C','CAPITAL'],['R','REVENUE']],
        displayField: 'field2',
        valueField: 'field1',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Type',
        editable:false,
        labelWidth:30,
        width: 75,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRebate.focus();
             }
       },
 
    }   
      });




var store6 = new Ext.data.Store({
       
    });

var partyname = new Ext.form.ComboBox({
        id: 'taxvalueCombo',
        store: store6,
        displayField: 'taxty_val',
        valueField: 'taxty_val',
        hiddenName : 'tax_value',
        typeAhead: true,
        mode: 'remote',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
//      allowBlank: false,
        editable:false,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 250
           
      });


  function datecheck()
  {

        var dt_today = new Date();
        var dtgrn = dtpgrn.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays > NewDays)
        {     
             alert("You are Not Allowed to Raise the GRN in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             if (gstFlag == "Add")
                dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             else
             {    
		     Ext.getCmp('save').setDisabled(true);         
		     Ext.getCmp('save2').setDisabled(true);             
             } 

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the GRN in Future date");
             dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

 }

function editdatecheck()
  {

        var dt_today = new Date();
        var dtgrn = dtpgrn.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 


        if (diffdays > EditDays)
        {     
             alert("You are Not Allowed to Modify the GRN in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             if (gstFlag == "Add")
                dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             else
             {    
		     Ext.getCmp('save').setDisabled(true);         
		     Ext.getCmp('save2').setDisabled(true);             
             } 

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the GRN in Future date");
             dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpgrn.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

 }


  var dtpgrn = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       id          : 'dtpgrn',
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
           change:function(){
              if (gstFlag == "Add")
                  datecheck();
              else
                  editdatecheck();

           },
           blur:function(){
              if (gstFlag == "Add")
                 datecheck();
              else
                  editdatecheck();

           } ,
           keyup:function(){
               if (gstFlag == "Add")
                  datecheck();
              else
                  editdatecheck();

            }
}
        
    });
    
    
  var dtpBill = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       id          : 'dtpBill',
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
                  cmbPONO.focus();
             }
       },
}   
    });
    
    
  var dtppo = new Ext.form.DateField
    ({
       fieldLabel : '',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 80,
       readOnly    : true,
       editable    : false,
       value: new Date().format('d-m-Y'),
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
 enableKeyEvents: true,
      listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbindno.focus();
             }
       },
}   
      
    });
    
  var expirydate = new Ext.form.DateField
    ({
       fieldLabel : 'Expiry Date',
       name        : 'fdateex',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
       editable    : false
    });
    
    
    var gentrydate = new Ext.form.DateField
    ({
       fieldLabel : 'G-Entry Date',
       id          : 'gentrydate',
       name        : 'fdatee',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
//       editable    : false,
       value: new Date().format('d-m-Y'),
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtlrnumber.focus();

             }
       },
}
      
    });
    
  var LRdate = new Ext.form.DateField
    ({
       fieldLabel : 'LR Date',
       name        : 'lrdate',
       id          : 'LRdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
//       editable    : false
    });
    
    
    
    
    // End Of Combo Values

    var fieldset1 = {
        xtype        : 'fieldset',
        title        : '',
        width        :300,
        flex         : 1,
        border       : false,
        labelWidth : 60,
        defaultType : 'field',
        defaults     : {
           

        },
        items : [
        {
            xtype : 'textfield',
            fieldLabel : 'No',
            name       : 'wrw',
            readOnly   : false,
            width : 75
        },dtpgrn
     
        ]
    }

 
 

var fieldset3 = {
        xtype        : 'fieldset',
        title        : '',
        flex         : 1,
        border       : false,
        labelWidth : 90,
        defaultType : 'field',
        defaults     : {
 
        },
        items : [
      partyname,
        {
            xtype : 'textfield',
            fieldLabel : 'Quote Ref',
            name       : 'indent',
            readOnly   : true,
            width : 200
        },dtpBill
         
    
        ]
    }


function RefreshData(){
        cmbGRNNo.show();
        txtGRNNo.hide();
         flxItem.hide();
         flxItemSearch.hide();

        txtItemName.hide();
        btnItemRefresh.hide();
        cmbtype.setValue('R');
        rejectqty = 0;
//        myFormPanel.getForm().reset();
        flxDetail.getStore().removeAll();
        flxAccounts.getStore().removeAll();
        flxLedger.hide();
        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();

        gstFlag = "Add";
        identflag="P";
         Ext.getCmp('save').setDisabled(false);
         Ext.getCmp('save2').setDisabled(false);

	txtpoindyr.setValue(GinFinid);
//	txtpoindyr.setRawValue(GinFinid);

 //       Ext.getCmp('txtGRNNo').setReadOnly(true);
        Ext.getCmp('txtSupplierName').setReadOnly(false);
                                        Ext.getCmp('txtdisper').setDisabled(false);                      
                                        Ext.getCmp('txtdisval').setDisabled(false);   
                                        Ext.getCmp('txtpfper').setDisabled(false);                      
                                        Ext.getCmp('txtpfval').setDisabled(false);   

                                        Ext.getCmp('txtCGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtCGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtSGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtSGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtIGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtunitrate').setDisabled(true);



        Ext.getCmp('opt_year').setValue(1);
        Ext.getCmp('opt_select').setValue(2);
        txtTruck.setRawValue('');
        txtRemarks.setRawValue('');
        txtlrnumber.setValue('');

        cmbgateentryno.setValue('');
        txtPayTerms.setValue('');

        txtRebate.setValue('');
        txtroundoff.setValue('');
        txtGRNValue.setValue('');
        txttotcgst.setValue('');
        txttotsgst.setValue('');
        txttotigst.setValue('');
        txtgrossval.setValue('');
        txttotdisc.setValue('');
        txtTotPF.setValue('');
        txttotfreight1.setValue('');
        txttotothval.setValue('');
        txtTotOthersPM.setValue('');
        txttotinward.setValue('');
        txttottaxfrt1.setValue('');
        txttottaxgst1.setValue('');
        txtlandvalue.setValue('');
        txtAcceptQty.setValue('');
	txtdisval.setValue('');
	txtpfval.setValue('');
	txtCGSTVal.setValue('');
	txtSGSTVal.setValue('');
	txtIGSTVal.setValue('');
	txtCGSTPM.setValue('');
	txtSGSTPM.setValue('');
	txtIGSTPM.setValue('');
	txtTCSVal.setValue('');
	txtfreight.setValue('');
	txtothers.setValue('');
	txtothersPM.setValue('');
	txtiteminvvalue.setValue('');
	txtitemvalue.setValue('');
        txtBillNo.setValue('');
        txtSupplierName.setValue('');
        cmbPONO.setValue('');
        txtInsurance.setValue('');
        txtStockQty.setValue('');
	txtpoindyr.setValue(GinFinid);

        txtroundoff.setValue('');

        viewopt = 0;
        dtpBill.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
        dtpgrn.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
        LRdate.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
        gentrydate.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));



        txtGRNValue.setValue('');
        txttotcgst.setValue('');
        txttotsgst.setValue('');
        txttotigst.setValue('');
        txtgrossval.setValue('');
        txttotdisc.setValue('');
        txtTotPF.setValue('');
        txttotfreight1.setValue('');
        txttotothval.setValue('');
        txtTotOthersPM.setValue('');
        txttotinward.setValue('');
        txttottaxfrt1.setValue('');
        txttottaxgst1.setValue('');
        txtlandvalue.setValue('');
        txtTruck.setRawValue('');
        txtRemarks.setRawValue('');
        txtlrnumber.setValue('');

        cmbgateentryno.setValue('');
        txtPayTerms.setValue('');


       Ext.getCmp('dtpgrn').focus(false, 0);

                           gstFlag = "Edit";
                           txtGRNNo.hide();
                           cmbGRNNo.show();
                           Ext.getCmp('txtSupplierName').setReadOnly(true);
						loadGRNListDatasore.removeAll();
						loadGRNListDatasore.load({
							url:'Clsrn.php',
							params:
							{
								task:"loadGRNList",
								finid : GinFinid,
								compcode : Gincompcode,
								purtype : purtype
							},
							callback:function()
							{
;                     cmbGRNNo.setRawValue('GS');
							}
						});



                           txtGRNNo.setValue();   
                           viewopt = 1;

//const input = document.getElementById('dtpgrn');
//const end = input.value.length;
//input.setSelectionRange(0,0);
//input.focus();
//dtpgrn.focus();
}


function refresh() {
  txtValue.setRawValue('');      
  txtValuePM.setRawValue('');                               
  txtRcvdQty.setRawValue('');                               
  txtinvqty.setRawValue('');                              
  txtAcceptQty.setRawValue('');                            
  txtStockQty.setRawValue('');
  txtunitrate.setRawValue('');                            
  txtordqty.setRawValue('');
  txtdisper.setRawValue('');
  txtdisval.setRawValue('');
  txtpfper.setRawValue('');
  txtpfval.setRawValue('');
//  txtIGSTPer.setRawValue('');  
  txtIGSTVal.setRawValue('');
//  txtSGSTPer.setRawValue('');
  txtSGSTVal.setRawValue('');
//  txtCGSTPer.setRawValue('');
  txtCGSTVal.setRawValue('');
  txtothers.setRawValue('');
  txtRebate.setValue('');
  txtfreight.setRawValue('');
  txtinward.setRawValue('');
  txtothersPM.setRawValue('');
  txtclrfreight1.getRawValue(''),
  txtfreightparty.setRawValue('');
  txtitemvalue.setRawValue('');
  txtiteminvvalue.setRawValue('');

  txtclrfreight1.setRawValue('');

  txtTCSPer.setValue('');
  txtTCSVal.setValue('');
	txtCGSTPM.setValue('');
	txtSGSTPM.setValue('');
	txtIGSTPM.setValue('');
	txtTransport.setValue('');

}

    

var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})
/*-------------------- Second grid panel ---------------------- */


var cgstledcode = 0;
var sgstledcode = 0;
var igstledcode = 0;
var cgstledname = '';
var sgstledname = '';
var igstledname = '';



 var btnPORefresh = new Ext.Button({
        id  :'btnPORefresh',
	text: 'R',
	width: 3,
	height: 3,

	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){ 
                 	    
	    	LoadindnoDatastore.removeAll();

		LoadindnoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadpono',
		    compcode:Gincompcode,
		    finid:txtpoindyr.getValue(),
		    supcode:supcode,
		    flag:grnflag,
                    searchedby : 'supplier'
		},
               callback:function() 
              	 {

                cmbPONO.setRawValue(LoadindnoDatastore.getAt(0).get('ind_no'));

		LoadPOindnoDatastore.removeAll();
		LoadPOindnoDatastore.load({
			url: 'ClsGrn.php',
			params: {
			    task: 'loadindentnos',
			    finid:txtpoindyr.getValue(),
			    compcode:Gincompcode,
			    pono:LoadindnoDatastore.getAt(0).get('ind_no'),
     		 	},
     		 	callback : function (){
                        cmbindno.setValue(LoadPOindnoDatastore.getAt(0).get('indfincode'));
                        cmbindno.setRawValue(LoadPOindnoDatastore.getAt(0).get('indno'));


			dtppo.setRawValue(Ext.util.Format.date(LoadPOindnoDatastore.getAt(0).get('podate'),"d-m-Y"));
                       txtPayTerms.setValue(LoadPOindnoDatastore.getAt(0).get('phd_credit_days'));
                       txttolerance.setValue(LoadPOindnoDatastore.getAt(0).get('phd_tol'));                     	

                 Ext.getCmp('cmbItem').setDisabled(true); 
                 getIndentDetails();	 	
     		 	}
	         });




                 }
	    });

                }
        }
});


 var btnItemRefresh = new Ext.Button({
        id  :'btnItemRefresh',
	text: 'R',
	width: 6,
	height: 6,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){ 
                     getIndentDetails(); 
                }
        }
});  

function add_btn_click()
{



         if (mtype == "N")
         {
             pitemname = txtItemName.getValue();
             pitemcode = fitemcode;
         }       
         else
         {
             pitemname = cmbItem.getRawValue();
             pitemcode = cmbItem.getValue();
         }       
  
		var tax =   Number(txtCGSTPer.getValue()) +Number(txtSGSTPer.getValue())+Number(txtIGSTPer.getValue());  
                 loadGSTLedgerDatastore.removeAll(); 
                 loadGSTLedgerDatastore.load({
                   url: 'ClsGrn.php',
                  params:
                  {
                          task:"findGSTDetails",
                          gst :Number(tax),


                   },  
                       callback: function () 
		       {

		cgstledcode = loadGSTLedgerDatastore.getAt(0).get('tax_cgstledcode');
		sgstledcode = loadGSTLedgerDatastore.getAt(0).get('tax_sgstledcode');
		igstledcode = loadGSTLedgerDatastore.getAt(0).get('tax_igstledcode');
		cgstledname = loadGSTLedgerDatastore.getAt(0).get('tax_cgstledger');
		sgstledname = loadGSTLedgerDatastore.getAt(0).get('tax_sgstledger');
		igstledname = loadGSTLedgerDatastore.getAt(0).get('tax_igstledger');


	    var gstadd="true";
            
	    if (mintype == "I")
            {  
               indno = cmbPONO.getRawValue();
               indfincode = txtpoindyr.getValue();
            }
            else
           {
                indno = cmbindno.getRawValue();
         //       indfincode = cmbindno.getValue();
            } 

            if (mtype != "N" && mintype == "P" && cmbindno.getRawValue() == ''){
                Ext.MessageBox.alert("GRN ", "Select Indent No.");
                gstadd="false";               

           }
 
            if (mtype != "N")
            {  
//01052025 modified
/* 
            if (Number(txtAcceptQty.getValue())===0 || Number(txtRcvdQty.getValue())===0 ){
                Ext.MessageBox.alert("GRN ", "Enter Recevied / Accepted quantity..");
                txtAcceptQty.focus();
                gstadd="false";
            }
*/
            }
     
            if ( Number(txtRcvdQty.getValue()) > 0  && Number(txtStockQty.getValue())===0  ){
                Ext.MessageBox.alert("GRN ", "Enter Stock quantity..");
                txtStockQty.focus();
                gstadd="false";
            }

            if (cmbtype.getValue() ==0 || cmbtype.getRawValue() == '' ){
                Ext.MessageBox.alert("GRN ", "Select Capital / Revenue..");
                cmbtype.focus();
                gstadd="false";
            }


            if (cmbPurGroup.getValue() == 0 || cmbPurGroup.getRawValue() == '' ){
                Ext.MessageBox.alert("GRN ", "Select Purchase Group..");
                cmbPurGroup.focus();
                gstadd="false";
            }



            if(gstadd=="true")
            {
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemname === cmbItem.getRawValue() && sel[i].data.mintindentno === cmbindno.getRawValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
                cnt = 0;
        	if(gridedit === "true")
	          {
//alert(cmbItem.getRawValue());
//alert(txtItemSpec.getValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
                        var qc = "";
                        var rcm = "";

			sel[idx].set('pono'        , cmbPONO.getRawValue());
			sel[idx].set('podate'      , Ext.util.Format.date(dtppo.getValue(),"Y-m-d"));
			sel[idx].set('itemname'    , pitemname);
			sel[idx].set('uom'         , txtuom.getRawValue());
			sel[idx].set('mintinvqty'  , Number(txtinvqty.getRawValue()));
			sel[idx].set('mintrcvdqty' , Number(txtRcvdQty.getValue()));
			sel[idx].set('mintacceptqty' , Number(txtAcceptQty.getValue()));
			sel[idx].set('mintunitrate', Number(txtunitrate.getValue()));
			sel[idx].set('mintdiscount', Number(txtdisper.getValue()));
			sel[idx].set('mintdisamt'  , Number(txtdisval.getValue()));
			sel[idx].set('mintpfper'   , Number(txtpfper.getValue()));
			sel[idx].set('mintpfamt'   , Number(txtpfval.getValue()));
			sel[idx].set('mintothers'  , Number(txtothers.getValue()));
			sel[idx].set('mintcgstper' , Number(txtCGSTPer.getValue()));
			sel[idx].set('mintsgstper' , Number(txtSGSTPer.getValue()));
			sel[idx].set('mintigstper' , Number(txtIGSTPer.getValue()));
			sel[idx].set('mintsgstamt' , Number(txtSGSTVal.getValue()));
			sel[idx].set('mintcgstamt' , Number(txtCGSTVal.getValue()));
			sel[idx].set('mintigstamt' , Number(txtIGSTVal.getValue()));
			sel[idx].set('mintfreight' , Number(txtfreight.getRawValue()));
			sel[idx].set('mintotherpm' , Number(txtothersPM.getValue()));
			sel[idx].set('mintcrstatus'  , cmbtype.getValue());
			sel[idx].set('mintvalue', Number(txtitemvalue.getValue()));
			sel[idx].set('mintCostvalue', Number(txtitemvalue.getValue()));
			sel[idx].set('minttcsper', Number(txtTCSPer.getValue()));
			sel[idx].set('minttcsval', Number(txtTCSVal.getValue()));
              		sel[idx].set('mintrebate', Number(txtRebate.getValue()));
			sel[idx].set('mintindentno', indno);
			sel[idx].set('mintfincode', indfincode);
			sel[idx].set('tol', Number(txttolerance.getValue()));
			sel[idx].set('purgrpname'   , cmbPurGroup.getRawValue());
			sel[idx].set('purgrpcode'   , cmbPurGroup.getValue());

			sel[idx].set('cgstled'   , cgstledcode);
			sel[idx].set('sgstled'   , sgstledcode);
			sel[idx].set('igstled'   , igstledcode);
			sel[idx].set('cgstledname'   , cgstledname);
			sel[idx].set('sgstledname'   , sgstledname);			
			sel[idx].set('igstledname'   , igstledname);
			sel[idx].set('othledname'   , 'OTHER CHARGES');
			sel[idx].set('othledcode'   , '2019');
			sel[idx].set('cgstpm'   , '0');
			sel[idx].set('sgstpm'   , '0');
			sel[idx].set('igstpm'   , '0');
                 	sel[idx].set('mintitemcode'   , pitemcode);
                  	sel[idx].set('insurance', Number(txtInsurance.getValue()));
                  	sel[idx].set('mintstockqty', Number(txtStockQty.getValue()));
                       	sel[idx].set('uomcode', Number(itemuom));
                  	sel[idx].set('itemspec', txtItemSpec.getValue());
                  	sel[idx].set('transportation', Number(txtTransport.getValue()));
                  	sel[idx].set('valuepm', Number(txtValuePM.getValue()));


			flxDetail.getSelectionModel().clearSelections();

                      refresh(); 
                      grid_tot();     


		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                } else

                {
//alert(indno);
//alert(txtItemSpec.getValue());

                        var RowCnt = flxDetail.getStore().getCount() + 1;
                    	flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                           sno:RowCnt,
                           pono:cmbPONO.getRawValue(),
                           podate: Ext.util.Format.date(dtppo.getValue(),"Y-m-d"),
			   itemname:pitemname,
			   uom:  txtuom.getRawValue(), 
			   pobalqty: Number(txtordqty.getValue()), 
			   mintinvqty: Number(txtinvqty.getRawValue()),
			   mintrcvdqty   :Number(txtRcvdQty.getValue()),
		           mintacceptqty :Number(txtAcceptQty.getValue()),
			   mintunitrate:Number(txtunitrate.getRawValue()),
			   mintdiscount:Number(txtdisper.getRawValue()),
			   mintdisamt:Number(txtdisval.getRawValue()),
			   mintpfper:Number(txtpfper.getRawValue()),
	 		   mintpfamt:Number(txtpfval.getRawValue()),
                           mintothers:Number(txtothers.getRawValue()),

			   mintcgstper:Number(txtCGSTPer.getRawValue()),
			   mintsgstper:Number(txtSGSTPer.getRawValue()),
			   mintigstper:Number(txtIGSTPer.getRawValue()),
			   mintsgstamt:Number(txtCGSTVal.getRawValue()),
			   mintcgstamt:Number(txtSGSTVal.getRawValue()),
			   mintigstamt:Number(txtIGSTVal.getRawValue()),
			   mintfreight:Number(txtfreight.getRawValue()),
	                   mintotherpm:Number(txtothersPM.getValue()),
                           mintcrstatus:cmbtype.getRawValue(),  	
                           mintvalue: Number(txtitemvalue.getValue()),
                           mintCostvalue: Number(txtitemvalue.getValue()),

                           tol: Number(txttolerance.getValue()),
                           mintrebate:Number(txtRebate.getValue()),

                           mintitemcode : pitemcode,//  itemcode,
                           mintgrpcode :  itemgrpcode,
			   ledcode:'0',
 	
                           mintindentno : indno,
                           mintfincode :indfincode,

			   stock:'0',	
			   tot:'0',
			   totqty:'0',
                 	   itc:'N',
                           oldgrnqty : '0',
                           oldgrnval : '0',
			   minttcsper: Number(txtTCSPer.getValue()),
			   minttcsval: Number(txtTCSVal.getValue()),

                            purgrpname:cmbPurGroup.getRawValue(),
                            purgrpcode:cmbPurGroup.getValue(),

                            cgstled       : cgstledcode,
                            sgstled       : sgstledcode,
                            igstled       : igstledcode,
                            cgstledname   : cgstledname,
                            sgstledname   : sgstledname,
                            igstledname   : igstledname,
                            othledname    : 'OTHER CHARGES',
                            othledcode    : '2019',
                            cgstpm        : '0',
                            sgstpm        : '0',
                            igstpm        : '0',
                            insurance     : Number(txtInsurance.getValue()),
                            mintstockqty  : Number(txtStockQty.getValue()),
                            uomcode       : Number(itemuom),
                            itemspec      : txtItemSpec.getValue(),
                            delrecord     : 'N',
                            transportation : Number(txtTransport.getValue()),
                            valuepm : Number(txtValuePM.getValue()),
                        }) 
                    );
                    grid_tot();     
                }

                      refresh(); 
                      grid_tot();     
            }
           }
      })

}


 var btnsubmit = new Ext.Button({
	text: 'ADD',
	width: 70,
	height: 50,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                add_btn_click();
          }
       }
  })

 var gridstore2 = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'gridstore2'
        }, [
            'sno', 'itemname', 'uom', 'balqty', 'mintinvqty', 'mintrcvdqty', 'mintunitrate', 'mintothers', 'mintqcdevval', 'mintdiscount', 'mintdisamt','pfper','mintpfamt','mintcgstper','mintsgstamt','mintigstamt','mintsgstamt','mintcgstamt','mintigstamt',
'itc','freight','stock','tot','totqty','vatstatus','expirydate','npqty','otherqty','machine','cgstled','sgstled','igstled','inward','mintfreight',
'minttaxfreight2','mintclr1cgstper','mintclr1sgstper','mintclr1igstper','mintclr1transport','mintclr2cgstper','mintclr2sgstper','mintclr2igstper','mintclr2transport','rcm'
        ])
    });
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden:false,
    stripeRows : true,
    scrollable: true,
    x:10,
    y:345,
    height: 140,
    width: 1295,
    columns:
    [            
            	{dataIndex:'sno',header: "S.no",width: 40,align: 'center',sortable: true,hidden: false},
            	{dataIndex:'pono',header: "PO.no",width: 40,align: 'center',sortable: true,hidden: false},
            	{dataIndex:'podate',header: "PO.Date",width: 90,align: 'center',sortable: true,hidden: false},
         	{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'uom',header: "UOM",width: 100,align: 'center',sortable: true},
		{dataIndex:'pobalqty',header: " Pend.Qty",width: 60,align: 'center',sortable: true},
		{dataIndex:'mintinvqty',header: "Invo. Qty", width: 60, align: 'center',sortable: true},
		{dataIndex:'mintrcvdqty',header: "Recd. Qty", width: 100, align: 'center',sortable: true},
		{dataIndex:'mintacceptqty',header: "Accept. Qty", width: 100, align: 'center',sortable: true},
		{dataIndex:'mintstockqty',header: "Stock. Qty", width: 100, align: 'center',sortable: true},
		{dataIndex:'mintunitrate',header: "Unit rate", width: 60, align: 'center',sortable: true},
		{dataIndex:'mintdiscount', header: "Dis (%)",width: 60,align: 'center',sortable: true},
		{dataIndex:'mintdisamt', header: "Dis Value",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'mintpfper', header: "PF (%)",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'mintpfamt', header: "PF Value",width: 60,align: 'center',sortable: true},
           	{dataIndex:'mintothers',header: "Others(+)",width: 60,align: 'center',sortable: true },
	 	{dataIndex:'mintcgstper', header: "CGST %",width: 60,align: 'center',sortable: true},
	 	{dataIndex:'mintcgstamt', header: "CGST Value",width: 60,align: 'center',sortable: true},
		{dataIndex:'mintsgstper', header: "SGST %",width: 60,align: 'center',sortable: true},
 		{dataIndex:'mintsgstamt', header: "SGST Value",width: 60,align: 'center',sortable: true},
		{dataIndex:'mintigstper', header: "IGST %",width: 60,align: 'center',sortable: true},
 		{dataIndex:'mintigstamt', header: "IGST Value",width: 60,align: 'center',sortable: true},
 		{dataIndex:'mintfreight', header: "Freight",width: 60,align: 'center',sortable: true},
//		{dataIndex:'mintqcreq', header: "QC Req",width: 60,align: 'center',sortable: true},
	//	{dataIndex:'mintinward', header: "Inward",width: 60,align: 'center',sortable: true},
                {dataIndex:'mintotherpm',header: "Others +/-)",width: 60,align: 'center',sortable: true},
 		{dataIndex:'mintvalue', header: "Value",width: 70,align: 'center',sortable: true},
 		{dataIndex:'mintCostvalue', header: "Cost Value",width: 70,align: 'center',sortable: true},
		{dataIndex:'minttcsper', header: "TCS PER",width: 50,align: 'center',sortable: true},
		{dataIndex:'minttcsval', header: "TCS AMT",width: 50,align: 'center',sortable: true},   
		{dataIndex:'mintrebate', header: "Rebate",width: 50,align: 'center',sortable: true},   
//		{dataIndex:'mintclrfreight1', header: " CLR1 Freight",width: 60,align: 'center',sortable: true},
//		{dataIndex:'mintclr1cgstper', header: "CLR1 CGST",width: 60,align: 'center',sortable: true},
//		{dataIndex:'mintclr1sgstper', header: "CLR1 SGST",width: 60,align: 'center',sortable: true},
//		{dataIndex:'mintclr1igstper', header: "CLR1 IGST",width: 60,align: 'center',sortable: true},
//		{dataIndex:'mintclr1transport', header: "CLR1 Part",width: 60,align: 'center',sortable: true},

//		{dataIndex:'mintclrfreight2', header: "CLR2 Freight2",width: 60,align: 'center',sortable: true},
//                {dataIndex:'mintclr2cgstper', header: "CLR2 CGST",width: 6,align: 'center',sortable: true},
//	{dataIndex:'mintclr2sgstper', header: "CLR2 SGST",width: 6,align: 'center',sortable: true},
//	        /{dataIndex:'mintclr2igstper', header: "CLR2 IGST",width: 6,align: 'center',sortable: true},
//		{dataIndex:'mintclr2transport', header: "CLR2 PART",width: 6,align: 'center',sortable: true},

		{dataIndex:'mintcrstatus', header: "C/R Status",width: 60,align: 'center',sortable: true},
		{dataIndex:'cgstled', header: "CGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'sgstled', header: "SGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'igstled', header: "IGST LED",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintitemcode', header: "Item Code",width: 60,align: 'center',sortable: true,hidden:true},
	        {dataIndex:'mintgrpcode', header: "Group Code",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'ledcode', header: "Led Code",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'mintindentno', header: "Indent No",width: 60,align: 'center',sortable: true},
		{dataIndex:'mintfincode', header: "I.FinCode",width: 60,align: 'center',sortable: true},
		{dataIndex:'stock', header: "Stock",width: 60,align: 'center',sortable: true},
		{dataIndex:'tol', header: "Tol %",width: 60,align: 'center',sortable: true},
		{dataIndex:'totqty', header: "Tot Qty",width: 60,align: 'center',sortable: true},
		{dataIndex:'itc', header: "ITC",width: 0,align: 'center',sortable: true,hidden:true},
		{dataIndex:'oldgrnqty', header: "OLD.GRNQTY",width: 50,align: 'center',sortable: true},
	 	{dataIndex:'oldgrnval', header: "OLD.GRNVAL",width: 50,align: 'center',sortable: true} ,
                {header: "Pur.GrpName", dataIndex: 'purgrpname',sortable:true,width:100,align:'left',hidden:true},
                {header: "Pur.Grpcode", dataIndex: 'purgrpcode',sortable:true,width:100,align:'left',hidden:true},
		{dataIndex:'cgstledname', header: "CGST LEDNAME",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'sgstledname', header: "SGST LEDNAME",width: 60,align: 'center',sortable: true,hidden:true},
		{dataIndex:'igstledname', header: "IGST LEDNAME",width: 60,align: 'center',sortable: true,hidden:true},
                {header: "Other LedName", dataIndex: 'othledname',sortable:true,width:100,align:'left',hidden:true},
                {header: "Other Ledcode", dataIndex: 'othledcode',sortable:true,width:100,align:'left',hidden:true}, 
		{dataIndex:'cgstpm', header: "CGST PM",width: 60,align: 'center',sortable: true},
		{dataIndex:'sgstpm', header: "SGST PM",width: 60,align: 'center',sortable: true},
		{dataIndex:'igstpm', header: "IGST PM",width: 60,align: 'center',sortable: true},       
		{dataIndex:'insurance', header: "insurance",width: 60,align: 'center',sortable: true},  
		{dataIndex:'uomcode', header: "UOM",width: 60,align: 'center',sortable: true}, 
		{dataIndex:'transportation', header: "transportation",width: 60,align: 'center',sortable: true}, 
		{dataIndex:'itemspec', header: "Specifications",width: 300,align: 'left',sortable: true}, 
		{dataIndex:'valuepm', header: "VALUE +/",width: 80,align: 'left',sortable: true}, 
		{dataIndex:'delrecord', header: "Delete",width: 100,align: 'center',sortable: true},
		{dataIndex:'mintrejectqty', header: "RejectQty",width: 50,align: 'center',sortable: true},    
     ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){

var col = 0;

                if (cellIndex == 59)
                {    
                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{

				if (selected_rows[i].data.delrecord == '')
                                    flag = 'Y';
                                else                                   
                                    flag = selected_rows[i].data.delrecord;
                                
                                col = i;

          
				if (flag == 'N')
				{
                                    colname = 'delrecord';
 //            			    selected_rows[i].set(colname, 'Y');

				    Ext.Msg.show({
					title: 'STORES GRN PREPARATION',
					icon: Ext.Msg.QUESTION,
				 	buttons: Ext.MessageBox.YESNO,
					msg: 'Are you Sure Want to Delete the Record - YES to Delete -  NO to EXIT',
                                        fn: function(btn){
                   			if (btn === 'yes')
                                        {
                   			    selected_rows[col].set(colname, 'Y');
                                            grid_tot(); 
                                        }
                                        else 
               				    selected_rows[col].set(colname, 'N');
                                            grid_tot(); 
                                        }

                                    });  

				} else 
				{
				   selected_rows[i].set(colname, 'N');
                                   grid_tot();
				}
                       }   
         
                }
        },
        'cellDblclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES GRN PREPARATION',
             icon: Ext.Msg.QUESTION,
//             if (viewopt == 0)
//             { 
//                 buttons: Ext.MessageBox.YESNOCANCEL,
//                 msg: 'Press YES to Modify   - CANCEL to EXIT',
//             }
//             else
//             {
//                 buttons: Ext.MessageBox.YESNOCANCEL,
//                 msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
//             }   

                 buttons: Ext.MessageBox.YESNOCANCEL,
                 msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',

                   
 
             fn: function(btn){

        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
//alert(selrow.get('mintfincode'));



                        cmbPONO.setValue(selrow.get('pono'));
                        dtppo.setValue(Ext.util.Format.date(selrow.get('podate'),"Y-m-d"));
                        cmbItem.setValue(selrow.get('mintitemcode'));
                        cmbItem.setRawValue(selrow.get('itemname'));

                        txtuom.setValue(selrow.get('uom'));
			txtinvqty.setValue(selrow.get('mintinvqty'));
                        txtRcvdQty.setValue(selrow.get('mintrcvdqty'));
                        txtAcceptQty.setValue(selrow.get('mintacceptqty'));
                        txtStockQty.setValue(selrow.get('mintstockqty'));
                       if (selrow.get('pobalqty') > 0)
                        {  
                           txtordqty.setValue(selrow.get('pobalqty'));
                        }
                        else
                        {  
                           txtordqty.setValue(selrow.get('mintinvqty'));
                        }

	                itemuom  = selrow.get('uomcode');


             		txtunitrate.setValue(selrow.get('mintunitrate'));
		        txtdisper.setValue(selrow.get('mintdiscount'));
		        txtdisval.setValue(selrow.get('mintdisamt'));
			txtpfper.setValue(selrow.get('mintpfper'));
	 		txtpfval.setValue(selrow.get('mintpfamt'));
                        txtothers.setValue(selrow.get('mintothers'));
                        txtCGSTPer.setValue(selrow.get('mintcgstper'));
		        txtSGSTPer.setValue(selrow.get('mintsgstper'));
			txtIGSTPer.setValue(selrow.get('mintigstper'));
                        txtCGSTVal.setValue(selrow.get('mintsgstamt'));
			txtSGSTVal.setValue(selrow.get('mintcgstamt'));
			txtIGSTVal.setValue(selrow.get('mintigstamt'));
			txtfreight.setValue(selrow.get('mintfreight'));
//			txtinward.setValue(selrow.get('mintinward'));
                        txtothersPM.setValue(selrow.get('mintotherpm'));
//			txtclrfreight1.setValue(selrow.get('mintclrfreight1'));

                        cmbtype.setValue(selrow.get('mintcrstatus'));
//			expirydate.setValue(Ext.util.Format.date(selrow.get('mintexpirydate'),"Y-m-d"));
//                        cmbrcm.setValue(selrow.get('mintrcm'));                      
  	
                        txtitemvalue.setValue(selrow.get('mintvalue'));
                        txtInsurance.setValue(selrow.get('insurance'));
                        txtTCSPer.setValue(selrow.get('minttcsper'));
			txtTCSVal.setValue(selrow.get('mintcsamt')); 
			txtRebate.setValue(selrow.get('mintrebate')); 
//			cmbPurGroup.setRawValue(selrow.get('purgrpname'));
			cmbPurGroup.setValue(selrow.get('purgrpcode'));    


//                        frtpartycode = selrow.get('mintclr1transport');
//                        frtcgst = selrow.get('mintclr1cgstper');
//                        frtsgst = selrow.get('mintclr1sgstper');
//                        frtigst = selrow.get('mintclr1igstper');

                        cmbindno.setValue(selrow.get('mintindentno'));

			txtItemSpec.setValue(selrow.get('itemspec'));
			txtTransport.setValue(selrow.get('transportation'));
            		txtValuePM.setValue(selrow.get('valuepm'));



			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
//Modified on 25/02/2024
                        if (gstFlag === 'Add') //if (viewopt == 0)
                        { 
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                        }  
                        else
                        {
                            alert("In GRN EDIT option - you cannot delete the Row..");
                        }   
             
                   }
                   calculateItemValue();
                   grid_tot();
             }
        });         
    }
 }

});

var opt_select = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Receipt By',
    fieldLabel: '',
    layout : 'vbox',
defaultType : 'textfield',
    width:130,
    height:100,
    x:30,
    y:40,
    border: true,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  true,
                	x       : 80,          
                	y       : -10,
                       // border: true,
			//layout : 'hbox',
                	columns :  1,
                        id      : 'opt_select',
                	items: [

                        {boxLabel: 'PO', name: 'opt_select', inputValue: '2',checked : true, listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
					grnflag ="P";
                                        mintype = "P";
                                        mtype = "P";
                                        txtItemName.hide();
                                        cmbItem.show();
				//        flxDetail.getStore().removeAll();
                                        Ext.getCmp('txtdisper').setDisabled(false);                      
                                        Ext.getCmp('txtdisval').setDisabled(false);   
                                        Ext.getCmp('txtpfper').setDisabled(false);                      
                                        Ext.getCmp('txtpfval').setDisabled(false);   
                                        Ext.getCmp('txtCGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtCGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtSGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtSGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtIGSTPer').setDisabled(true);                      
                                        Ext.getCmp('txtIGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtunitrate').setDisabled(true);  
                 //                       Ext.getCmp('cmbindno').setDisabled(false);  
                                        cmbindno.setValue('');
                                        cmbindno.setRawValue('');
      
                                        cmbPONO.label.update('PO No');

	    	LoadindnoDatastore.removeAll();

		LoadindnoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadpono',
		    compcode:Gincompcode,
		    finid:txtpoindyr.getValue(),
		    supcode:supcode,
		    flag:'P',
                    searchedby : 'supplier'
		},
               callback:function() 
              	 {
                 }
               })
			         }
                            }
                         }},
                    	{boxLabel: 'Indent', name: 'opt_select',inputValue: '1',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					grnflag="I";
                                        mintype = "I";
                                        mtype = "I";
                                        txtItemName.hide();
                                        cmbItem.show();

		//		        flxDetail.getStore().removeAll();
                                        Ext.getCmp('txtdisper').setDisabled(false);                      
                                        Ext.getCmp('txtdisval').setDisabled(false);   
                                        Ext.getCmp('txtpfper').setDisabled(false);                      
                                        Ext.getCmp('txtpfval').setDisabled(false);   
                                        Ext.getCmp('txtCGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtCGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtSGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtSGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtIGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtIGSTVal').setDisabled(true);   
                                        Ext.getCmp('txtunitrate').setDisabled(false);   
                     //                   Ext.getCmp('cmbindno').setDisabled(true);  
                                        cmbindno.setValue('');
                                        cmbindno.setRawValue('');

                                       cmbPONO.label.update('Ind No.');

	    	LoadindnoDatastore.removeAll();

		LoadindnoDatastore.load({
		url: 'ClsGrn.php',
		params: {
		    task: 'loadpono',
		    compcode:Gincompcode,
		    finid:txtpoindyr.getValue(),
		    supcode:supcode,
		    flag:'I',
                    searchedby : 'supplier'
		},
               callback:function() 
              	 {
                 }
               });

                      		}
                        }
                        }},
                    	{boxLabel: 'Without PO', name: 'opt_select',inputValue: '3',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){

                                        mintype = "N";
                                        mtype = "N";
                                        txtItemName.show();
                                        cmbItem.hide();
                                        Ext.getCmp('txtdisper').setDisabled(false);                      
                                        Ext.getCmp('txtdisval').setDisabled(false);   
                                        Ext.getCmp('txtpfper').setDisabled(false);                      
                                        Ext.getCmp('txtpfval').setDisabled(false);   
                                        Ext.getCmp('txtCGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtCGSTVal').setDisabled(false);   
                                        Ext.getCmp('txtSGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtSGSTVal').setDisabled(false);   
                                        Ext.getCmp('txtIGSTPer').setDisabled(false);                      
                                        Ext.getCmp('txtIGSTVal').setDisabled(false);   
                                        Ext.getCmp('txtunitrate').setDisabled(false);   
                                        Ext.getCmp('cmbindno').setDisabled(false);  
                                        Ext.getCmp('cmbPONO').setDisabled(false); 

                                        Ext.getCmp('txtTCSPer').setDisabled(false);  
                                        Ext.getCmp('txtfreight').setDisabled(false);  
                                        Ext.getCmp('txtothers').setDisabled(false);  
                                        Ext.getCmp('txtothersPM').setDisabled(false);  
                                        Ext.getCmp('txtInsurance').setDisabled(false);  
                                        Ext.getCmp('txtRebate').setDisabled(true);  
                                        Ext.getCmp('txtunitrate').setDisabled(false);          
  


                                        cmbindno.setValue('');
                                        cmbindno.setRawValue('');
                                        cmbPONO.setValue('');
                                        cmbPONO.setRawValue('');
                                        cmbPONO.label.update('PO No');                          

                      		}
                        }
                        }},
                        ]
                  }
           ]
});

var opt_year = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'PO/Ind Year',
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
                       // border: true,
			//layout : 'hbox',
                	columns :  1,
                        id      : 'opt_year',
                	items: [
                    	{boxLabel: 'Cur.Yr', name: 'opt_year',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                          	       	txtpoindyr.setValue(GinFinid);
                      		}
                        }
                        }},
                        {boxLabel: 'Pre.Yr', name: 'opt_year', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  txtpoindyr.setValue(GinFinid-1);

			         }
                            }
                         }},txtpoindyr
                        ],
                  }
           ]

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
var myFormPanel = new Ext.form.FormPanel({
        width        :  1320, 
        title        : 'Goods Receipt Note',
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
        items        : [
        
            {
            xtype: 'tabpanel',
            activeTab: 0,
            id : 'tabGRN',
            height: 520,
            width: 1320,
            x: 0,
            y: 5,
		listeners: {
/*
		    'tabchange': function(tabPanel, tab) {
		     var activeTab = tabGRN.getActiveTab();
		     if (activeTab.id == 'tab2')
		     {
		        flxaccupdation(); 
		     }
		    }
*/
		},

            items: [
            {
                xtype: 'panel',
                title: 'GRN - Item Details',
                width: 200,
                id : 'tab1',
                height: 300,
                layout: 'absolute',
                items: [
                    {
                    xtype: 'fieldset',
                    title: 'GRN Details',
                    border: true,
                    height:  99,
                    width: 210,
                   layout: 'absolute',
            //        labelWidth:80,
                    x: 0,  
                    y: 0,
                    items: [
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : 0,
                            y           : -5,
                            border      : false,
                            items: [txtGRNNo]
                        },  
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : 0,
                            y           : -5,
                            border      : false,
                            items: [cmbGRNNo]
                        },  
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 200,
                            x           : 0,
                            y           : 30,
                            border      : false,
                            items: [dtpgrn]
                        },                         
// txtGRNNo,dtpgrn
                    ]

                    },
//anna
                    {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : '',
                            width       : 350,
                            x           : 200,
                            y           : -11,
                            defaultType : 'textfield',
                            border      : false,
                            items: [opt_select]
                     },
                    {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : '',
                            width       : 400,
                            x           : 330,
                            y           : -11,
                            defaultType : 'textfield',
                            border      : false,
                            items: [opt_year]
                     },

                     {
                    xtype: 'fieldset',
                    title: 'Supplier',
                    border: true,
                    height: 57,
                    width: 450,
                    labelWidth:60,
                    x: 480,  
                    y: 0,
	               items: [txtSupplierName]
                    }, 


                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 45,
                    width: 450,
                    labelWidth:60,
                    x: 480,  
                    y: 50,
	               items: [txtSearchItemName]
                    }, 


                    {
                    xtype: 'fieldset',
                    title: 'Bill Details',
                    border: true,
                    height: 99,
                    width: 230,
                    labelWidth:80,
                    x: 930,  
                    y: 0,
                    items: [
                      txtBillNo, dtpBill
                    ]
                    },


                    {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : '',
                            width       : 400,
                            x           : 1170,
                            y           : -11,
                            defaultType : 'textfield',
                            border      : false,
                            items: [opt_GRN_Status]
                     },



                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 235,
                    width: 1310,
                    labelWidth:50,
                    layout: 'absolute',
                    x: 0,  
                    y: 98,
                    items: [
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : -10,
                            y           : -5,
                            border      : false,
                            items: [cmbPONO]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 60,
                            x           : -10,
                            y           : 17,
                            border      : false,
 //                           items: [btnPORefresh]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 150,
                            x           : 130,
                            y           : -5,
                            border      : false,
                            items: [dtppo]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 40,
                            width       : 380,
                            x           : 245,
                            y           : -5,
                            border      : false,
                            items: [cmbindno]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 90,
                            width       : 500,
                            x           : 380,
                            y           : -5,
                            border      : false,
                            items: [cmbItem]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 90,
                            width       : 500,
                            x           : 380,
                            y           : -5,
                            border      : false,
                            items: [txtItemName]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
             //               width       : 420,
                            x           : 850,
                            y           : -5,
                            border      : false,
                            items: [btnItemRefresh]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 40,
                            width       : 300,
                            x           : 910,
                            y           : -5,
                            border      : false,
                            items: [txtuom]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : 1020,
                            y           : -5,
                            border      : false,
                            items: [txtordqty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 380,
                            x           : 1150,
                            y           : -5,
                            border      : false,
                            items: [txttolerance]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 120,
                            width       : 600,
                            x           : -10,
                            y           : 40,
                            border      : false,
                            items: [txtItemSpec]
                        },


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 500,
                            y           : 25,
                            border      : false,
                            items: [lblInvQty]
                        },


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 610,
                            y           : 25,
                            border      : false,
                            items: [lblRecdQty]
                        },


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 720,
                            y           : 25,
                            border      : false,
                            items: [lblAcceptedQty]
                        },


			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 830,
                            y           : 25,
                            border      : false,
                            items: [lblStockQty]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 940,
                            y           : 25,
                            border      : false,
                            items: [lblRate]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 150,
                            x           : 1050,
                            y           : 25,
                            border      : false,
                            items: [lblValuePM]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 1160,
                            y           : 25,
                            border      : false,
                            items: [lblValue1]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 490,
                            y           : 45,
                            border      : false,
                            items: [txtinvqty]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 600,
                            y           : 45,
                            border      : false,
                            items: [txtRcvdQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 710,
                            y           : 45,
                            border      : false,
                            items: [txtAcceptQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 820,
                            y           : 45,
                            border      : false,
                            items: [txtStockQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 930,
                            y           : 45,
                            border      : false,
                            items: [txtunitrate]
                        },



                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 1055,
                            y           : 45,
                            border      : false,
                            items: [txtValuePM]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 200,
                            x           : 1150,
                            y           : 45,
                            border      : false,
                            items: [txtValue]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 120,
                            width       : 500,
                            x           : -10,
                            y           : 85,
                            border      : false,
                            items: [cmbPurGroup]
                        },


                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : 750,
                            y           : 85,
                            border      : false,
                            items: [cmbtype]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 380,
                            x           : 910,
                            y           : 85,
                            border      : false,
                            items: [txtRebate]
                        },

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 500,
                            x           : 1080,
                            y           : 85,
                            border      : false,
                            items: [txtInsurance]
                        },

    			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : 140,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPer]
                        },

  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblAmt]
                        },

  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 70,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiscount]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 60,
                            y           : 140,
                            border      : false,
                            items: [txtdisper]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 60,
                            y           : 170,
                            border      : false,
                            items: [txtdisval]
                        },


  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 160,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPF]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 145,
                            y           : 140,
                            border      : false,
                            items: [txtpfper]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 145,
                            y           : 170,
                            border      : false,
                            items: [txtpfval]
                        },

  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 240,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCGST]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 230,
                            y           : 140,
                            border      : false,
                            items: [txtCGSTPer]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 230,
                            y           : 170,
                            border      : false,
                            items: [txtCGSTVal]
                        },


  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 335,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSGST]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 320,
                            y           : 140,
                            border      : false,
                            items: [txtSGSTPer]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 320,
                            y           : 170,
                            border      : false,
                            items: [txtSGSTVal]
                        },


  			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 420,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIGST]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 410,
                            y           : 140,
                            border      : false,
                            items: [txtIGSTPer]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 410,
                            y           : 170,
                            border      : false,
                            items: [txtIGSTVal]
                        },


			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 510,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTCS]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 500,
                            y           : 140,
                            border      : false,
                            items: [txtTCSPer]
                        },




                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 500,
                            y           : 170,
                            border      : false,
                            items: [txtTCSVal]
                        },


			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 595,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblFreight]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 590,
                            y           : 170,
                            border      : false,
                            items: [txtfreight]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 690,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblOthers]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 680,
                            y           : 170,
                            border      : false,
                            items: [txtothers]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 770,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblOthersPM]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 765,
                            y           : 170,
                            border      : false,
                            items: [txtothersPM]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 855,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTransport]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 850,
                            y           : 170,
                            border      : false,
                            items: [txtTransport]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 955,
                            y           : 110,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 950,
                            y           : 170,
                            border      : false,
                            items: [txtiteminvvalue]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 1055,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblLanding]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 1050,
                            y           : 170,
                            border      : false,
                            items: [txtitemvalue]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 380,
                            x           : 1200,
                            y           : 155,
                            border      : false,
                            items: [btnsubmit]
                        },

        

                    ],
                    },

 

                     {
                    xtype: 'fieldset',
                    title: 'Freight (Bill Raised / Tax Paid)',
                    id   : 'frtexp',
                    border: true,
                    height: 10,
                    width: 30,
                    labelWidth:75,
                    layout      : 'absolute',
                    x:640,  
                    y:140,
                    items: [
                           {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 150,
                            x           : 5,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtclrfreight1]
                          },
                           {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 150,
                            x           : 140,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtinward]
                          },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 250,
                            x           : 5,
                            y           : 17,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbrcm]
                          },   
                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 350,
                            x           : 5,
                            y           : 40,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtfreightparty]
                          },
//                      txtclrfreight1,txtinward,txtfreightparty,cmbrcm
                    ]
                    },

                    flxDetail,
                flxItem,flxItemSearch,

                     {
                    xtype: 'fieldset',
                    border: false,
                    width: 465,
                    labelWidth:60,
                    x: 500,  
                    y: 50,
	               items: [flxLedger]
                    },
                            

                ]
            },
            {
                xtype: 'panel',
                title: 'General / Overall Details',
                width: 383,
                height: 200,
                id : 'tab2',
                layout: 'absolute',


                items: [


                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 250,
                    labelWidth:120,
                    x:0 ,  
                    y:0 ,
                    items: [txtTruck]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 250,
                    labelWidth:110,
                    x:250,  
                    y:0 ,
                    items: [cmbgateentryno]
                 },

                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 250,
                    labelWidth:110,
                    x:460,  
                    y:0 ,
                    items: [gentrydate]
                 },


//txtRemarks,txtPayTerms
                                  
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 500,
                    labelWidth:90,
                    x:700 ,  
                    y:0 ,
                    items: [txtlrnumber]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 300,
                    labelWidth:90,
                    x:880 ,  
                    y:0 ,
                    items: [LRdate]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 250,
                    labelWidth:120,
                    x:0 ,  
                    y:40 ,
                    items: [txtPayTerms]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
//                    height: 80,
                    width: 900,
                    labelWidth:110,
                    x:250,  
                    y:40 ,
                    items: [txtRemarks]
                 },


                   {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 180	,
                    width: 1225,
                    labelWidth:90,
                    x:0 ,  
                    y:95 ,
                    items: [
                    txtTotInsurance,txtgrossval,txttotdisc,txtTotPF,txttotfreight1,txttotothval
                    ]
                 },


                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false	,
                    height: 80	,
                    width: 150,
                    labelWidth:50,
                    x:190 ,  
                    y:119 ,
                    items: [
                    txtTotValuePM
                    ]
                 },

 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 180,
                    width: 855,
                    labelWidth:90,
                    x:350 ,  
                    y:95 ,
                    items: [
                   txttotcgst,txttotsgst,txttotigst,txttottcs,txtTotOthersPM,txtTotTransport
//,txttotinward
                    ]
                 },


 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:25,
                    x:525 ,  
                    y:95 ,
                    items: [
                    txtCGSTPM,txtSGSTPM,txtIGSTPM
//,txttotinward
                    ]
                 },
/*

                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:400 ,  
                    y:150 ,
                    items: [
                   txttottaxfrt1,txttottaxgst1 ,txttaxfri3,txtaxgst2
                    ]
                 },
*/

                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:680 ,  
                    y:120 ,
                    items: [
                   txtroundoff,txtlandvalue,txtGRNValue
                    ]
                 },

                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:905 ,  
                    y:120 ,
                    items: [optTCSCalc]
                 },
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 200,
                    labelWidth:1,
                    x:1050 ,  
                    y:120 ,
                    items: [
                   optRounding
                    ]
                 },
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:1220 ,  
                    y:200 ,
                    items: [btnsave]
                 },


                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: true,
                    height: 192,
                    width: 1100,
                    labelWidth:85,
                    x:10 ,  
                    y:285 ,
                    items: [flxAccounts]
                 },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 880,
		         y           : 300,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 880,
		         y           : 350,
		         border      : false,
		         items:[txttotCredit],
                       },

/*
                 {
                    xtype: 'fieldset',
                    title: 'Tax Rounding Off',
                    border: true,
                    height: 45,
                    width: 200,
                    x:550 ,  
                    y:350 ,
                    items: [
                   
                    ]
                 },roundno1  //,roundyes1
*/


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
        } ,
    
             
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 40,
            items: [


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
		  var p3 = "&minno=" + encodeURIComponent(cmbGRNNo.getRawValue());
         //   	  var p4 = "&purtype=" + encodeURIComponent(purtype);
                  var param = (p1+p2+p3) ;  
		  //window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
if (grntype == "P")
		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param);                                       
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

var window_form = new Ext.Window({
                         width        : 1340,         //1340,
                         height       : 605,
                         items        : myFormPanel,
			 layout      : 'fit',
                         closable:false,
                         resizable:false,
                         draggable:false,
                        //0 x:150,
                         y:35,
 onEsc:function(){
},
			listeners:{
			       		show:function(){
                                	RefreshData();	




//alert( "New Days : " + NewDays + "   Edit Days :  " + EditDays );
/*
                                        if (purtype == "PSC")
                                            Ext.getCmp('myFormPanel').setTitle('Goods Receipt Note - for POWER PLANT');
                                        else
                                            Ext.getCmp('myFormPanel').setTitle('Goods Receipt Note - for PAPER MACHINE');
*/
                                          Ext.getCmp('myFormPanel').setTitle('Goods Receipt Note-for STORES');
                                        Ext.getCmp('frtexp').setVisible(false);


					LoadSupplierDatastore.load({
					url: 'ClsGrn.php',
					params: {
					    task: 'loadsupplier'
					},
					callback:function()
					{
/*
//				Ext.getCmp('dtpgrn').focus(false, 0);	

				const input = document.getElementById('dtpgrn');
				const end = input.value.length;

				input.setSelectionRange(0,0);
				input.focus();

*/

    // Delay to ensure DOM is fully available
    setTimeout(() => {
        const input = document.getElementById('dtpgrn');
        if (!input) {
            console.warn("Element with ID 'dtpgrn' not found.");
            return;
        }

        // Focus the field and move cursor to first character
        input.focus();
        input.setSelectionRange(0, 0);

        // Attach overwrite mode ONCE
        if (!input.dataset.overwriteAttached) {
            input.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;

                e.preventDefault(); // prevent normal input behavior

                const start = input.selectionStart;
                const value = input.value;

                const before = value.slice(0, start);
                const after = value.slice(start + 1); // overwrite next char

                input.value = before + e.key + after;

                // Move cursor forward
                input.setSelectionRange(start + 1, start + 1);
            });

            // Mark it as attached to avoid duplicate listeners
            input.dataset.overwriteAttached = "true";
        }
    }, 100); 




				}
				  });

}}
  
});
  window_form.show();
});
