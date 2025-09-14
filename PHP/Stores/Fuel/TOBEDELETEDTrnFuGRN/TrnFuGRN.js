Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
  



    var GinUser = localStorage.getItem('ginusername');

    var userid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');

   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
    var gstfinyear = localStorage.getItem('gstyear');

   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));


   var rounding = 0;

   var seqno = 0;
   var poseqno = 0;

   var gstStatus = "N";
   var gstFlag = "Add";
   var gstStatus = "N";
   var itemgrpcode = 0;
   var gridedit = "false";
   var FrePaidby = 0;

   var supcode = 0;
var degrchk = "true"; var editrow = 0; var cessmtval = 0; var dedqty; var lifelessqty; var moistureper; var frttype; var stper = 0;
var scper = 0; var stamt = 0; var scamt = 0; var gridfreqty = 0; var fareacode = 0; var freitem; var freqty; var tonfre = 0; //var gstGroup;
var supplierid = 77; var Validatechk = "true"; 

var pdb_grnqty = 0; var pdb_itemrate = 0; var suptype; var edpono, edfradvvouno, edbillno, edfreightadvance, edsuptype = 0, edacctflag;
var totGRNQty = 0,totGRNValue = 0,cgstval = 0,sgstval = 0,grnrate = 0,totgrndrqty = 0,totgrndrvalue = 0,grndrrate = 0;
var fin_taxtype, fin_vattax =0 , fin_vattaxledger = 0; var lblmoisper = 0, moistol = 0;
var cgstval,sgstval,totbillqty,totbillvalue,totgieno = '',totcbill,pdb_costvalue,pdb_costrate;
var pdb_tot_billval, pdb_totedval, totGRNQty, pdb_tot_millqty, totgrdothrchrg, pdb_freightadvance, tot_billqty, pdb_totgrn_value, pdb_totgrn_value2 = 0, pdb_grn_value, pdb_grn_value2,totgieno = '',valoffreight =0, pdb_unloading =0;



var loadPurchaseLedgerDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseLedgerDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuGrn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurLedgerDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
  ])
})



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
		  

                        }          

			    Ext.Ajax.request({
			    url: 'TrnFUGRNNoChange.php',
			    params :
			     {
		

				gstFlaggrn : gstFlag,                                 
				compcode:Gincompcode,
				finid:GinFinid,
				seqno  : seqno,
				grnno  : cmbGRNNo.getValue(),
                                edgrnno : cmbGRNNo.getRawValue(),

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

                        }          

			    Ext.Ajax.request({
			    url: 'TrnRMGRNDelete.php',
			    params :
			     {

		

				gstFlaggrn : gstFlag,                                 
				compcode:GinCompcode,
				finid:GinFinid,
				seqno  : seqno,
				grnno  : cmbGRNNo.getValue(),
                                edgrnno : cmbGRNNo.getRawValue(),
				ordseqno : poseqno,
				accseqno : accseqno,
		
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

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 90,
    height  : 30,
    x       : 950,
    y       : 18,
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

//alert(Validatechk);		
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

			if(gridedit === "true")
			{
				var itemseq = cmbItemName.getValue();
				//alert(cmbunloadparty.getValue());
				Ext.getCmp('cmbItemName').setDisabled(false);
				var idx = flxDetail.getStore().indexOf(editrow);

				sel[idx].set('itemcode', cmbItemName.getValue());
				sel[idx].set('itemname', cmbItemName.getRawValue());
				sel[idx].set('millqty', txtMillQty.getRawValue());
				sel[idx].set('grnqty', txtGRNQty.getRawValue());
				sel[idx].set('itemrate', txtRate.getRawValue());
				sel[idx].set('itemvalue',txtItemValue.getValue());

                                Refresh();
                                grid_tot();
				//if(fareacode > 0) {  }


				//flxDetail.getSelectionModel().clearSelections();
				gridedit = "false";
				

			}//if(gridedit === "true")var 
			else{
				if (cnt ==0)
				{
				 
//						alert(cmbItemName.getValue());
				            	//alert(cmbItemName.getRawValue());
//						alert(txtMillQty.getRawValue());
						//alert(txtGRNQty.getRawValue());
//						alert(txtRate.getRawValue());
//						alert(txtItemValue.getRawValue());

		           	 	var RowCnt = flxDetail.getStore().getCount() + 1;
		            		flxDetail.getStore().insert(
		                	flxDetail.getStore().getCount(),
		               		new dgrecord({
				            	slno:RowCnt,

						itemcode	:	cmbItemName.getValue(),
				            	itemname	:	cmbItemName.getRawValue(),
          					millqty		:	txtMillQty.getRawValue(),
						grnqty		:	txtGRNQty.getRawValue(),
						itemrate	:	txtRate.getRawValue(),
						itemvalue	:	txtItemValue.getRawValue(),
			                }) 
			                );


//                                        Refresh();
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
                grid_tot();

            }
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


function save_click()
{

    tabgrn.setActiveTab(1);
    tabgrn.setActiveTab(0);
    var gstSave;

    gstSave="true";

      fromdate = "04/01/"+gstfinyear.substring(0,4);
      todate = "03/31/"+gstfinyear.substring(5,9);

        var dtgrn  = dtpGRNDate.getValue();
        var dtbill = dtppartybilldate.getValue();
        var diffdays = dtgrn.getTime()-dtbill.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 



    if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
        gstSave="false";
    }

    if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
        gstSave="false";
    }

    if( diffdays < 0  ){
            Ext.MessageBox.alert("Alert","GRN Date is Greater than Bill Date. Please check");
        gstSave="false";
    }

    if ( supcode ==0 || txtSupplier.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-GRN','Select Supplier Name');
        txtSupplier.focus();
        gstSave="false";
    }
   if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
    {
        Ext.Msg.alert('Fuel-GRN','Select Area Name');
        gstSave="false";
    }
/*
   if (Number(txtBillValue.getValue()) ==0 )
    {

        alert('Enter Party Bill Value');
        txtBillValue.focus();
        gstSave="false";
    }
          
   if (Number(txtBillQty.getValue()) ==0 )
    {
        Ext.Msg.alert('Fuel-GRN','Enter Party Bill Quantity');
        txtBillQty.focus();
        gstSave="false";
    }

   if (Number(txtRate.getValue()) ==0 )
    {
        Ext.Msg.alert('Fuel-GRN','Enter Rate...');
        txtRate.focus();
        gstSave="false";
    }
     
 */    
   if (Number(txtTotGRNValue.getValue()) ==0 )
    {
        Ext.Msg.alert('Fuel-GRN','Grid is Empty . Please check Rate / Qty - Cannot save the Record');
        txtRate.focus();
        gstSave="false";
    }
    	
    else
	{


    if (gstSave === "true")
        {  


		                    var grnData = flxDetail.getStore().getRange();                                        
		                    var grnupdData = new Array();
		                    Ext.each(grnData, function (record) {
		                        grnupdData.push(record.data);
		                    });



Ext.Msg.show({
    title: 'Confirmation',
    icon: Ext.Msg.QUESTION,
    buttons: Ext.MessageBox.YESNO,
    msg: 'Do You Want To Save...',
    fn: function(btn)
	{
    if (btn === 'yes')
	{


    Ext.Ajax.request({
    url: 'TrnFuGRNFirstSave.php',
    params :
     {
        griddet	: Ext.util.JSON.encode(grnupdData),
	cnt		: grnData.length,
		
	gstFlaggrn	: gstFlag,
	compcode	: Gincompcode,
        finid		: GinFinid,
        seqno           : seqno,  
	grnno		: txtGRNNo.getValue(),
	grndate		: Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d"),
        ticketno        : cmbTicketNo.getValue(),
	ticketdate	: Ext.util.Format.date(dtpTicketDate.getValue(),"Y-m-d"),
        lorryno         : txtTruckNo.getRawValue(),
	areacode	: cmbArea.getValue(),

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
                                roundoffNeed	: roundoffNeed,
                                roundoff	: txtroundoff.getValue(),
				totamt		: Ext.util.Format.number(txtGRNAmount.getValue(), "0.00"),




	geno            : txtGENo.getValue(),
	gedate          : Ext.util.Format.date(dtpGEDate.getValue(),"Y-m-d"), 
        supcode 	: supcode,
	ordseqno   	: poseqno,
	billno		: txtPartybillno.getRawValue(),
	billdate	: Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"),
	billqty		: txtBillQty.getValue(),	                                 
	billvalue	: txtBillValue.getValue(),	
        lotcode         : cmbLot.getValue(),

        itemcode        : cmbItemName.getValue(),
        purcode         : cmbPurchaseLedger.getValue(),
        millqty         : txtMillQty.getValue(),
        grnvalue 	: txtTotGRNValue.getValue(),

        grnqty          : txtGRNQty.getValue(),
	usrcode		: userid,
        payterms        : txtPaymentTerms.getValue(), 



   	},
      callback: function(options, success, response)
      {
        var obj = Ext.decode(response.responseText);
         if (obj['success']==="true")
		{                                
            Ext.MessageBox.alert("GRN Saved GRN No.-" + obj['GRNNo']);
//                                    TrnGrnformpanel.getForm().reset();
   

            RefreshData();
          }else
	  {


  if (obj['GRNNo'] == 0)
 Ext.MessageBox.alert("Same GRN Number Already Saved.  Pls Check!-"); 
else
 Ext.MessageBox.alert("GRN Not Save! Pls Check!-" + obj['GRNNo']);                                                 
                                                         

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
	gstFlag = "Edit";
/*
	if (gstFlag === "Edit") {
	Ext.getCmp('Confirm').setDisabled(false);
	}
	else {
	Ext.getCmp('Confirm').setDisabled(true);
	}
*/						

	Ext.getCmp('txtGRNNo').hide();
	Ext.getCmp('cmbGRNNo').setDisabled(false);
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
//								tabgrn.items.each(function(c){c.enable();})
			//cmbGRNNo.setValue(loadgrnnodatastore.getAt(0).get('rech_seqno'));
		}
	});

}



var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:60,
    height: 100,
    hidden:false,
    width: 850,
    id: 'my-grid',  
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:70,align:'center'},
	{header: "Item Code", dataIndex: 'itemcode',sortable:true,width:90,align:'left',hidden:true},//0
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:300,align:'left'},//1
 	{header: "Mill Qty", dataIndex: 'millqty',sortable:true,width:100,align:'right'},//4
	{header: "GRN Qty",  dataIndex:'grnqty',sortable:true,width:100,align:'right'}, //12
 	{header: "Item Rate",dataIndex:'itemrate',sortable:true,width:110,align:'right'}, //13
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:130,align:'right'},//15

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

		//		Ext.getCmp('cmbItemName').setDisabled(true);

				gridedit = "true";
				editrow = selrow;

				cmbItemName.setValue(selrow.get('itemcode'));
				cmbItemName.setRawValue(selrow.get('itemname'));

				txtMillQty.setRawValue(selrow.get('millqty'));

				txtGRNQty.setRawValue(selrow.get('grnqty'));
				txtRate.setRawValue(selrow.get('itemrate'));		
				txtItemValue.setRawValue(selrow.get('itemvalue'));
				txtRemarks.setValue(selrow.get('remarks'));


				
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
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_servicecharge', 'rech_handling_cgstper', 'rech_handling_sgstper', 'rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_frpartycode', 'rech_fradvvouno', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'rech_royality', 'rech_royality_amt', 'rech_dmft', 'rech_dmft_amt', 'rech_nmet', 'rech_nmet_amt', 'rech_acc_seqno',  'sup_type', 'sup_name', 'frt_sup_name', 'handling_sup_name', 'cust_code', 'frt_sup_code', 'sup_led_code', 'sup_taxcode', 'frt_sup_led_code', 'tax_ledcode', 'handling_led_code'
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
	'rect_hdseqno', 'rect_seqno', 'rect_item_code', 'rect_lotno', 'rect_billno', 'rect_lorryno', 'rect_billqty', 'rect_millqty', 'rect_itemrate', 'rect_tareqty', 'rect_moisper', 'rect_moisqty', 'rect_lifelessqty', 'rect_rejper', 'rect_rejqty', 'rect_totdedqty', 'rect_degqty', 'rect_grnqty', 'rect_grnbags', 'rect_rateded', 'rect_partyitemcode', 'rect_edper', 'rect_edamount', 'rect_censtatus', 'rect_freightvalue', 'rect_itemvalue', 'rect_itemvalue2', 'rect_othercharges', 'rect_costrate', 'rect_costvalue', 'rect_status', 'rect_remarks', 'rect_billdate', 'rect_frtadvvouno', 'rect_frtadvamt', 'rect_gcv', 'rect_veh_type', 'rect_geno', 'rect_unloadby', 'rect_unloadmt', 'rect_unloadamount', 'rect_unloadparty', 'rect_lorry_wheels',  'itmh_name', 'lot_refno', 'rect_sandper', 'rect_sandqty', 'rect_finesper', 'rect_finesqty',
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
	autoLoad: true,
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
      },['ordh_seqno','ordh_compcode','ordh_fincode','ordh_no','ordh_from','ordh_sup_code','ordh_date','ordh_terms','ordh_carriagetype',
'ordh_paymode','ordh_creditdays','ordh_overdueintper','ordh_payterms','ordh_remarks','ordh_frttype','ordh_frtparty_code','ordh_stper',
'ordh_scper','ordh_cgstper','ordh_sgstper','ordh_igstper','ordh_handling_mt','ordh_handling_cgstper','ordh_handling_sgstper','ordh_itemvalue','ordh_roundinff','ordh_totalvalue',
'ordh_status','ordh_amndstatus','ordh_amndposeqno','ordh_usr_code','ordh_entry_date','ordh_wef_date','ordh_custduty_mt','ordh_handling_mt',
'ordh_handling_party','ordh_gcv','ordh_gcv_tol','ordh_mois','ordh_mois_tol','ordh_inh_mois','ordh_inh_mois_tol','ordh_ash','ordh_ash_tol',
'ordh_sulpher','ordh_size','ordh_hgi','ordh_tcs','ordh_vol_meter','ordh_cess_pmt','ordh_royality','ordh_dmft','ordh_nmet','cancelflag','sup_type',
'ordt_unit_rate','ordt_purgrp'

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
            baseParams:{task:"loadgrneddt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rech_seqno', 'rech_compcode', 'rech_fincode', 'rech_no', 'rech_sup_code', 'rech_ordhdseqno', 'rech_agent_code', 'rech_date', 'rech_wtcardno', 'rech_area_code', 'rech_freighttype', 'rech_freightadvance', 'rech_itemvalue', 'rech_scper', 'rech_stper', 'rech_scamount', 'rech_stamount', 'rech_cgst_per', 'rech_cgst_amt', 'rech_sgst_per', 'rech_sgst_amt', 'rech_igst_per', 'rech_igst_amt', 'rech_edamount', 'rech_handling_pmt', 'rech_handling_cgstper','rech_handling_sgstper','rech_freight', 'rech_othcharges', 'rech_roundinff', 'rech_totalamount', 'rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_vouno', 'rech_acctflag', 'rech_accdate', 'rech_status', 'rech_usr_code', 'rech_entry_date', 'rech_custduty_mt', 'rech_handling_mt', 'rech_handling_party', 'rech_geno', 'rech_gedate', 'rech_tcs_per', 'rech_tcs_amt', 'rech_cess_pmt', 'rech_cess_amount', 'sup_type', 'ordh_no','ordh_mois_tol','rech_billno', 'rech_billdate', 'rech_billvalue', 'rech_geno', 'rech_gedate', 'rech_wtslipno','rech_ticketdate', 'rech_truckno','rech_crdays','rech_roundneeded','rech_qcseqno','rech_ticketno','cust_ref','rech_purgrp',
'tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state','rech_crdays'

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



var loadFuelItemdatastore = new Ext.data.Store({
      id: 'loadFuelItemdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','itmh_code'
      ]),
    });

var loaditempodatastore = new Ext.data.Store({
      id: 'loaditempodatastore',
//      autoLoad : true,
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
autoLoad: true,
  
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


  var txtGRNAmount = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNAmount',
        name        : 'txtGRNAmount',
        width       :  100,
	readOnly : true,
    	labelStyle : "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
        tabindex : 2
   });

var txtTotGRNQty= new Ext.form.TextField({
        fieldLabel  : 'Total GRN Qty',
        id          : 'txtTotGRNQty',
        name        : 'txtTotGRNQty',
        width       :  100,
        allowBlank  :  false,
	tabindex    : 1,
	readOnly    : true,
        labelStyle : "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
    });

var txtTotGRNValue= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotGRNValue',
        name        : 'txtTotGRNValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
    });


var txtTotMillQty= new Ext.form.TextField({
        fieldLabel  : 'Total Mill Qty',
        id          : 'txtTotMillQty',
        name        : 'txtTotMillQty',
        width       :  100,
        allowBlank  :  false,
	tabindex    : 1,
	readOnly    : true,
        labelStyle : "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
    });



var txtTotGRNQty2= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txtTotGRNQty2',
        name        : 'txtTotGRNQty2',
        width       :  100,
        allowBlank  :  false,
	tabindex    : 1,
	readOnly    : true,
        labelStyle : "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
    });

var txtTotGRNValue2= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotGRNValue2',
        name        : 'txtTotGRNValue2',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });
var lblItemName = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItemName',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblMillQty = new Ext.form.Label({
    fieldLabel  : 'Mill Qty',
    id          : 'lblMillQty',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblGRNQty = new Ext.form.Label({
    fieldLabel  : 'GRN Qty',
    id          : 'lblGRNQty',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});



var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});




var txtPaymentTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPaymentTerms',
        name        : 'txtPaymentTerms',
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


var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Group',
    width           : 200,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,
   // labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
    labelStyle	: "font-size:12px;font-weight:bold;",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
enableKeyEvents: true, 
  listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbItemName.focus();
             }
       },
        select: function () 
        { 
		loadPurchaseLedgerDetailDatasore.removeAll();
		loadPurchaseLedgerDetailDatasore.load({
		url: 'ClsFuGrn.php',
		params:
		{
		    task:"loadPurLedgerDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{



                  txtCGSTPer.setRawValue('');
                  txtSGSTPer.setRawValue('');
                  txtIGSTPer.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';


 
                    var cnt = loadPurchaseLedgerDetailDatasore.getCount();

                    if (cnt >0)
                    {

                          txtCGSTPer.setValue(loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setValue(loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setValue(loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseLedgerDetailDatasore.getAt(0).get('tax_igstledger');



                    } 
  //                  find_value(); 

 //               flxaccupdation(); 


                grid_tot(); 
  
		}
	      });  

      }  


}
});


function calcost(){



}

var freitemcode = 0,totfretnlorry =0, totfretntipper = 0;
var chkitemt = 0, chkiteml = 0 ;
var tongrid = 0, lodgrid =0, tongridtot =0, lodgridtot =0, valoffreight =0;



function Refresh(){

   rounding = 0;
      
	txtGRNQty.setValue('');
	txtMillQty.setValue('');
	txtRate.setValue('');
	txtItemValue.setValue('');
  

/*
	txtSandQty.setValue('');
	txtdegradeqty.setValue('');
	txtTotDedQty.setValue('');
	txtGRNQty.setValue('');
	txtRate.setValue('');
	cmbLot.reset();	

        txtSandPer.setValue('');
        txtRate.setValue('');
        txtRemarks.setRawValue('');
        txtGCV.setRawValue('');
        txtItemValue.setValue('');
*/
  }



function find_item_value()
{
     var ivalue = 0;
     var ivalue2 = 0;


     ivalue = Number(txtGRNQty.getValue()) * Number(txtRate.getValue());


     ivalue2 = Number(txtBillQty.getValue()) * Number(txtRate.getValue());
     txtItemValue.setRawValue(Ext.util.Format.number( ivalue,'0.00'));
//     txtBillValue.setRawValue(Ext.util.Format.number( ivalue2,'0.00'));

}

var roundoffNeed ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 160,
    height:80,
    defaultType : 'textfield',
    x:540,
    y:40,
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
                 roundoffNeed ="Y";
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
                findLandingCost();   
               }
              }
             }} //,txtfreight


        ],
    },

    ],
});




/*
function old_tot(){
			totGRNQty=0;
			totgrnvalue=0;
			cgstval = 0;
			sgstval = 0;
			grnrate = 0;
			totbillqty = 0;
			totbillvalue = 0;
			cessmtval = 0;
			totgrdothrchrg = 0;
			totcbill = 0;
			//totgieno = 0;
			//totgrndrqty=0;
			//totgrndrvalue=0;
			//grndrrate=0;

        		var Row= flxDetail.getStore().getCount();
        		flxDetail.getSelectionModel().selectAll();
			

        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    totGRNQty=(totGRNQty)+(sel[i].data.grnqty);
				    totgrnvalue=Number(totgrnvalue)+Number(sel[i].data.itemvalue);
				    grnrate=Number(grnrate)+Number(sel[i].data.itemrate);
				    totbillqty=(totbillqty)+(sel[i].data.millqty);
				    totcbill=(totcbill)+(sel[i].data.billqty);
				    totbillvalue=Number(totbillvalue)+Number(sel[i].data.billvalue);
				    cessmtval = (cessmtval)+(sel[i].data.billqty * txtCessPerMT.getValue());
				    totgrdothrchrg = (totgrdothrchrg)+(sel[i].data.othrchrg);
				    
        			}
				    txttotitemqty.setValue(Ext.util.Format.number(totGRNQty,"0.000"));
				    txttotitemval.setValue(totgrnvalue);
				    txtCGSTValue.setValue(Number(totgrnvalue)*txtCGSTPer.getValue()/100);
				    txtSGSTValue.setValue(Number(totgrnvalue)*txtSGSTPer.getValue()/100);
				    txtIGSTValue.setValue(Ext.util.Format.number((Number(totgrnvalue)*txtIGSTPer.getValue()/100),"0"));

txttotitemqtybill.setValue(Ext.util.Format.number(totbillqty,"0.000"));
txttotBillValue.setValue(totbillvalue);
cessmtval = Ext.util.Format.number(totcbill,"0.000") * txtCessPerMT.getValue();
txtCessValue.setValue(Ext.util.Format.number(totcbill,"0.000") * txtCessPerMT.getValue());
txttotgrnval.setValue(totgrnvalue + totgrndrvalue + Number(txtCGSTValue.getValue())+Number(txtSGSTValue.getValue()) + Number(txtIGSTValue.getValue())+ Number(txtTCSValue.getValue())  + Number(txtCessValue.getValue()));




txtLandingCost.setValue(Ext.util.Format.number((Number(txttotBillValue.getValue()) + Number(totgrdothrchrg) + Number(cessmtval)),'0.00'));
//txtpartybillTotalValue.setRawValue(Number(txttotitemval.getValue())+Number(txtCGSTValue.getValue())+Number(txtSGSTValue.getValue()));
txtOtherChrges.setRawValue(Ext.util.Format.number(Number(totgrdothrchrg)),"0.000");

calcost();
}


*/


function calculateItemvalue(){



		if (txtMoisPer.getValue() < (Number(moistureper) + Number(moistol)))
		{
			txtMoisQty.setValue(0);
		}
		else
		{
		var totmois = 0;
		totmois = Number(moistureper) + Number(moistol);
			txtMoisQty.setValue(Ext.util.Format.number((txtMillQty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()) * (txtMoisPer.getValue() - totmois) / 100,"0.000"));
			
		}
	if(txtMoisQty.getValue() > 0 ){
		txtRemarks.setRawValue("Ex. Moisture " + Ext.util.Format.number((txtMoisPer.getValue() - totmois), "0.00") + "(%)" + " Qty : " + Ext.util.Format.number(txtMoisQty.getValue(), "0.000") + " MT Deducted" + " ,");

	}
	else{
		txtRemarks.setRawValue("Ex. Moisture NIL");
	}		
    
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
                txtRata.focus();
		Validatechk="false";
	}
/*
	else if (txtPartybillno.getValue()==0 || txtPartybillno.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Bill No to be Entered');
		Validatechk="false";
	}


	else if (txtBillQty.getValue()==0 || txtBillQty.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Qty Should be Greater than Zero');
		Validatechk="false";
		txtBillQty.focus();
	}

*/
	else if (txtTruckNo.getValue()==0 || txtTruckNo.getRawValue()=="" )
	{
		Ext.Msg.alert('Fuel-GRN','Lorry No to be Entered');
		Validatechk="false";
	}

	else if (cmbPurchaseLedger.getValue()==0 || cmbPurchaseLedger.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Purchase Ledger');
		Validatechk="false";
	}


/*
	else if (txtBillValue.getValue()==0 || txtBillValue.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Bill Value Should be Greater than Zero');
		Validatechk="false";
	}
*/
	if (cmbItemName.getValue()==0 || cmbItemName.getRawValue()=="")
	{
		Ext.Msg.alert('Fuel-GRN','Select Item Code');
		Validatechk="false";
	}
}

var txtHandlingcgst = new Ext.form.TextField({
    fieldLabel  : 'H.CGST %',
    id          : 'txtHandlingcgst',
    width       : 100,
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
    width       : 100,
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

var loadFuelTicketNoDetailDatastore = new Ext.data.Store({
      id: 'loadFuelTicketNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelTicketNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'wc_date', 'wc_area_code', 'wc_sup_code', 'wc_item', 'wc_vehicleno', 'wc_acceptedwt', 'wc_process', 'wt_type', 'wt_grn_process', 'cust_ref','area_name','wc_partynetwt','wc_itemcode','wc_netwt','wc_partynetwt','sup_type'

      ]),
    });


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

                loadFuelTicketNoDetailDatastore.removeAll();
		loadFuelTicketNoDetailDatastore.load({
		 	url:'ClsFuGrn.php',
			params:
	   		{
			task:"loadFuelTicketNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        ticketno : cmbTicketNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){
			
                        cmbArea.setValue(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_area_code'));
                        cmbItemName.setValue(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_itemcode'));
			dtpTicketDate.setRawValue(Ext.util.Format.date(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_date'),'d-m-Y'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_date'),'d-m-Y'));


                        supcode = loadFuelTicketNoDetailDatastore.getAt(0).get('wc_sup_code');

                        txtSupplier.setRawValue(loadFuelTicketNoDetailDatastore.getAt(0).get('cust_ref'));
       
                        areacode = loadFuelTicketNoDetailDatastore.getAt(0).get('wc_area_code');

                        txtTruckNo.setRawValue(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_vehicleno'));
       
			txtMillQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_netwt')/1000,"0.000"));
			txtGRNQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_acceptedwt')/1000,"0.000"));
			txtBillQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('wc_partynetwt')/1000,"0.000"));
                        txtBillValue.setValue(0);


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
				}

			    });


                 }    
	        });			
      
	   }
        }      
   });

/*

var cmbTicketNo = new Ext.form.ComboBox({
        fieldLabel      : 'Ticket No.',
        width           : 120,
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
        listeners:{
           select: function(){

                loadFuelTicketNoDetailDatastore.removeAll();
		loadFuelTicketNoDetailDatastore.load({
		 	url:'ClsQC.php',
			params:
	   		{
			task:"loadQCFuelEntryNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        entryno  : cmbTicketNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){
			
                        cmbArea.setValue(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_area'));


                        areacode = loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_area');

                        txtTruckNo.setRawValue(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_truck'));

                        txtTicketNo.setValue(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_ticketno'));
                        cmbItemName.setValue(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_itemcode'));
       
			txtMillQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_ticketwt')/1000,"0.000"));
			txtMoisPer.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff'),"0.00"));
			txtMoisQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_qty')/1000,"0.000"));

			txtSandPer.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff'),"0.00"));
			txtSandQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_sand_qty')/1000,"0.000"));
			txtFinesPer.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff'),"0.00"));
			txtFinesQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty')/1000,"0.000"));

//			txtGCV.setRawValue(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty'));
			txtTotDedQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_tot_ded_qty')/1000,"0.000"));

			txtGRNQty.setRawValue(Ext.util.Format.number(loadFuelTicketNoDetailDatastore.getAt(0).get('qc_fuel_acceptqty')/1000,"0.000"));

         
                 }    
	        });			
      
	   }
        }      
   });

*/

var txtGRNNo = new Ext.form.TextField({
        fieldLabel  : 'GRN No',
        id          : 'txtGRNNo',
        name        : 'txtGRNNo',
        width       :  100,
        maskRe: /^[a-zA-Z0-9]$/,
        style       :  {textTransform: "uppercase"},
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
enableKeyEvents: true, 
  listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
          //        dtpGRNDate.setSelectionRange(0, 0);
        //          dtpGRNDate.focus();
  //                Ext.getCmp('dtpGRNDate').focus(false, 0);

const input = document.getElementById('dtpGRNDate');
const end = input.value.length;
input.setSelectionRange(0,0);
input.focus();


             }
       },
}		
    });



  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtpGRNDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >30)
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
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpGRNDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","GRN Date is not in current finance year. Please check");
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
    enableKeyEvents: true,   
 //   anchor     : '50%',
    width : 100,
 //    hideTrigger: true,

//	disabled:true,    
    //readOnly: true,
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 cmbTicketNo.focus();
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
    fieldLabel : 'Ticket Date',
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
                txtSupplier.focus();
             }
       },
            change:function(){
            }
    }
});


var dtpGEDate = new Ext.form.DateField({
    fieldLabel : 'Gate Entry Date',
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
        fieldLabel      : '',
        width           : 270,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFuelItemdatastore,
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
                  txtRate.focus();
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

    //                    cmbPurchaseLedger.setValue(loaditemqtydatastore.getAt(0).get('ordt_purgrp'));
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
	//			txtpendqty.setValue(Ext.util.Format.number((Number(loaditemqtydatastore.getAt(0).get('ordt_pen_qty')) + (Number(pdb_grnqty))),"0.000"));
//			var toleranceallqty = Ext.util.Format.number((loaditemqtydatastore.getAt(0).get('tol_all_qty')), "0.000");
			
//			txtMoisPer.setValue(Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000"));
//			moistureper = Ext.util.Format.number(loaditemqtydatastore.getAt(0).get('ordt_moisper'), "0.000");
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
				billdate: Ext.util.Format.date(dtppartybilldate.getValue(),"Y-m-d"),
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
    fieldLabel      : 'PO No',
    width           : 130,
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
    enableKeyEvents: true,   

    listeners:{
     specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPartybillno.focus();
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
			},
    			callback : function()
	            	{
	           	        var cnt =loaditempodatastore.getCount();
	                        if (cnt > 0)     
	                        {
	                  	 cmbItemName.setValue(loaditempodatastore.getAt(0).get('itmh_code'));
	                        }
                        }
                     }); 
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

	           	        var cnt =loadgrnpodatastore.getCount();
	                        if (cnt > 0)     
	                        {
                          	txtRate.setValue(loadgrnpodatastore.getAt(0).get('ordt_unit_rate'));
                             	cmbPurchaseLedger.setValue(loadgrnpodatastore.getAt(0).get('ordt_purgrp'));
            			find_item_value();
                                }   					                                      							


			}
				 
			});
find_item_value();												
	}
	}
   });




function flx_party_click()
{
flxParty.hide();
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('cust_code');
				supname = selrow.get('sup_name');
                                txtSupplier.setRawValue(selrow.get('sup_name'));

	



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
			

        	}

            });
	

 			}


}

var dgrecord = Ext.data.Record.create([]);
  
var txtSupplier = new Ext.form.TextField({
    fieldLabel  : 'Supplier Name',
    id          : 'txtSupplier',
    width       : 280,
    name        : 'txtSupplier',
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ", 
    enableKeyEvents: true,
    readOnly : true,
   listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                cmbPONO.focus();
             }
       },
     }
});

/*  
var cmbsupplier = new Ext.form.ComboBox({

	fieldLabel      : 'Party',
	width           : 350,
	displayField    : 'cust_ref',
	valueField      : 'cust_code',
	hiddenName      : 'cust_code',
	id              : 'cmbsupplier',
	typeAhead       : true,
	mode            : 'local',
	store           : loadsupplierdatastore,
	forceSelection  : true,
	triggerAction   : 'all',
	selectOnFocus   : false,
	editable        : true,
	//tabindex	    : 1,
	allowblank      : false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	//lastQuery : '',
	//autoLoad: true,

    listeners:{


  

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPONO.focus();
             }
       },


   select: function(){

            TaxDataStore.removeAll();
            TaxDataStore.load({
                url: 'ClsFuGrn.php',
                params:
                {
                    task:"taxdetails",
                    Vendorcode: cmbsupplier.getValue()
                },
                scope: this,
                callback: function () {
			fin_taxtype = TaxDataStore.getAt(0).get('tax_paidby');
			fin_vattax = TaxDataStore.getAt(0).get('tax_code');
			fin_vattaxledger = TaxDataStore.getAt(0).get('tax_ledcode');
		}
	    });	



	loadordnodatastore.removeAll();
	cmbPONO.reset();
            loadordnodatastore.load({
                url: 'ClsFuGrn.php',
                params:
                {
                    task:"loadordno",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    supcode : cmbsupplier.getValue(),
		    gstFlag : gstFlag
                },
		scope: this,
	        callback: function () 
		{
			

			var cnt;
			cnt =0;
			cnt=loadordnodatastore.getCount();

			if (cnt > 0 )
			{	

		
				//cmbPONO.setValue(loadordnodatastore.getAt(0).get('ordh_no'));
				tabgrn.items.each(function(c){c.enable();})
			}
			else
			{

				tabgrn.items.each(function(c){c.disable();})

				

	
			}
        	}

            });
	
	}
	}
   });


*/

var cmbLot = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 100,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        id              : 'cmbLot',
        typeAhead       : true,
        mode            : 'local',
        store           : loadlotnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabindex	: 0,
        allowblank      : false,

 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",   
enableKeyEvents: true,  
 listeners:{


  

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGCV.focus();
             }
       },
}     
   });


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

        flxDetail.getStore().removeAll();
	loadgrneddtdatastore.removeAll();
	loadgrneddtdatastore.load({
		url:'ClsFuGrn.php',
		params:
		{
		task:"loadgrneddt",
		finid : GinFinid,
		compcode : Gincompcode,
		grnno : cmbGRNNo.getValue()
		},
		callback:function()
		{

			if ((loadgrneddtdatastore.getCount()) == 0){
				Ext.Msg.alert('Fuel-GRN','GRN Details not Found');
			}
			else{


                        if (loadgrneddtdatastore.getAt(0).get('rech_roundneeded') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                        else
                           Ext.getCmp("optRounding").setValue(2);

                          txtCGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setValue(loadgrneddtdatastore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadgrneddtdatastore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadgrneddtdatastore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadgrneddtdatastore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadgrneddtdatastore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadgrneddtdatastore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadgrneddtdatastore.getAt(0).get('tax_igstledger');

			
                        seqno = loadgrneddtdatastore.getAt(0).get('rech_seqno');
                        poseqno= loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
                        cmbTicketNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_ticketno'));

   			cmbArea.setValue(loadgrneddtdatastore.getAt(0).get('rech_area_code'));

			dtpGRNDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_date'),'d-m-Y'));
			dtpTicketDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_ticketdate'),'d-m-Y'));
                        cmbPurchaseLedger.setValue(loadgrneddtdatastore.getAt(0).get('rech_purgrp'));

			supcode = loadgrneddtdatastore.getAt(0).get('rech_sup_code');

			txtSupplier.setValue(loadgrneddtdatastore.getAt(0).get('rech_sup_code'));
			txtPaymentTerms.setValue(loadgrneddtdatastore.getAt(0).get('rech_crdays'));

	        	txtPartybillno.setValue(loadgrneddtdatastore.getAt(0).get('rech_billno'));
			dtppartybilldate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_billdate'),'d-m-Y'));

			edpono = loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno');
			txtBillValue.setValue(loadgrneddtdatastore.getAt(0).get('rech_billvalue'));

                        txtGRNNo.setValue(cmbGRNNo.getRawValue());

                        if (edpono >0)
                        {  
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
				callback : function() {cmbPONO.setValue(loadgrneddtdatastore.getAt(0).get('rech_ordhdseqno')); 
}
			});
                       }
                       else
                       {
                         cmbPONO.setRawValue('Not Applicable');
                       } 

			
//			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));						
//			dtpGEDate.setValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));

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
	
			txtGENo.setValue(loadgrneddtdatastore.getAt(0).get('rech_geno'));
			dtpGEDate.setRawValue(Ext.util.Format.date(loadgrneddtdatastore.getAt(0).get('rech_gedate'),'d-m-Y'));
			txtTruckNo.setValue(loadgrneddtdatastore.getAt(0).get('rech_truckno'));
                        txtSupplier.setRawValue(loadgrneddtdatastore.getAt(0).get('cust_ref'));                         



			
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

			loadgrnitemdetaildatastore.removeAll();//spfu_sel_recitems
			loadgrnitemdetaildatastore.load({
				url: 'ClsFuGrn.php',
				params:
				{
				    task:"loadgrnitemdetail", 
				    compcode: Gincompcode,
				    finid: GinFinid,
				    grnno: cmbGRNNo.getValue(),
				    ordno: edpono
				},
				callback: function()
                                {
		                	var RowCnt = loadgrnitemdetaildatastore.getCount();
					var j = 0;
					totgrndrqty=0;
					totgrndrvalue=0;
					grndrrate=0;


	                for (var i=0;i<RowCnt;i++)
			{
			flxDetail.getStore().insert(
			flxDetail.getStore().getCount(),
			new dgrecord({
				slno:i + 1,
				itemcode  : loadgrnitemdetaildatastore.getAt(i).get('rect_item_code'),
            			itemname  : loadgrnitemdetaildatastore.getAt(i).get('itmh_name'),
				millqty   : loadgrnitemdetaildatastore.getAt(i).get('rect_millqty'),
				grnqty    : loadgrnitemdetaildatastore.getAt(i).get('rect_grnqty'),
				itemrate  : loadgrnitemdetaildatastore.getAt(i).get('rect_itemrate'),
				itemvalue : loadgrnitemdetaildatastore.getAt(i).get('rect_itemvalue'),
				

				}) 
				);   
                  
                        }
                        grid_tot();
                                find_item_value();        






				}//callback function loadgrnitemdetail

			});//loadgrnitemdetail
			}//else

//alert(edacctflag);


			if(edacctflag == "Y"){
				Ext.getCmp('save').setDisabled(true);
//				Ext.getCmp('Confirm').setDisabled(true);
				Ext.Msg.alert('Fuel-GRN','Sorry!!! A/C Updatation has been done.\n U can view the data, Edit Option not Allowed');
				//Ext.getCmp('save').setDisabled(false);Ext.getCmp('Confirm').setDisabled(false);
			}
			else{
				Ext.getCmp('save').setDisabled(false);
			}

		}


	});


    },

    }
   });
 var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No',
        id          : 'txtbillno',
        name        : 'txtbillno',
        width       :  100,

        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	

    });
 var txtPartybillno = new Ext.form.TextField({
        fieldLabel  : 'Party Bill No',
        id          : 'txtPartybillno',
        name        : 'txtPartybillno',
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
                  dtppartybilldate.focus();
             }
       },
    }
       


    });
var dtppartybilldate = new Ext.form.DateField({
    fieldLabel : 'Party Bill Date',
    id         : 'dtppartybilldate',
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
                  txtBillQty.focus();
             }
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
        readOnly    : true,
 enableKeyEvents: true,   
	tabindex : 1,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTicketNo.focus();
             }
       },
    }
	
    });


 var txtSandPer = new Ext.form.NumberField({
        fieldLabel  : 'Sand % ',
        id          : 'txtSandPer',
        name        : 'txtSandPer',
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
           
             }
       },
	keyup : function () {

		
	}
	}
    });


 var txtFinesPer = new Ext.form.NumberField({
        fieldLabel  : 'Fines % ',
        id          : 'txtFinesPer',
        name        : 'txtFinesPer',
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
           
             }
       },
	keyup : function () {

	}
	}
    });

 var txtGCV = new Ext.form.NumberField({
        fieldLabel  : 'GCV',
        id          : 'txtGCV',
        name        : 'txtGCV',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
enableKeyEvents: true,  
 listeners:{


  

       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRemarks.focus();
             }
       },
}     

    });
var txtRemarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
enableKeyEvents: true,  
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnSubmit.focus();
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
        width       :  100,
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

var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 220,
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
                  txtPartybillno.focus();
             }
       },

	   select:function()
		{

			fareacode = cmbArea.getValue();
			txttonnage.setValue('0');

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



var txtarea = new Ext.form.TextField({
        fieldLabel  : 'Area',
        id          : 'txtarea',
        name        : 'txtarea',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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



 var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
       decimalPrecision: 3,
       labelStyle	: "font-size:12px;font-weight:bold;",
      style      : {'border-radius': '5px' , 'text-align': 'right'},	
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
          	findLandingCost();   
		},

	    change:function()
		{
          	findLandingCost();   

		},
	    keyup:function()
		{
          	findLandingCost();   
		}
    }
    });




var txtMillQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMillQty',
        name        : 'txtMillQty',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
       decimalPrecision: 3,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
      labelStyle	: "font-size:12px;font-weight:bold;",
      style      : {'border-radius': '5px' , 'text-align': 'right'},	
    enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRate.focus();
             }
         }
       },
    });



var txtSandQty = new Ext.form.TextField({
        fieldLabel  : 'Sand Qty',
        id          : 'txtSandQty',
        name        : 'txtSandQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbLot.focus();
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtSandQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtSandQty.focus();
			txtSandQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });


var txtFinesQty = new Ext.form.TextField({
        fieldLabel  : 'Fines Qty',
        id          : 'txtFinesQty',
        name        : 'txtFinesQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbLot.focus();
             }
       },
	keyup:function()
		{

       	find_item_value();   
/*

//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			if ((txtSandQty.getValue())>(txtMillQty.getValue()))
			{
			alert("Rej Qty Should Not be Greater than Mill Qty..");
			txtSandQty.focus();
			txtSandQty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue() ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue() ),'0.000'));

//			txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
*/	
		}
	    
}
    });

var txtMoisPer = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtMoisPer',
        name        : 'txtMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
          //        cmbLot.focus();
             }
       },
	keyup:function()
	{
	
          	find_item_value();   
	},

	}
    });

var txtMoisQty = new Ext.form.TextField({
        fieldLabel  : 'Mois Qty',
        id          : 'txtMoisQty',
        name        : 'txtMoisQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSandQty.focus();
             }
       },
}
    });

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
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    	
	listeners:{
	keyup:function()
		{
		
			//txtTotDedQty.setValue(txttareqty.getValue()+txtOtherDedQty.getValue()+txtSandQty.getValue()+txtdegradeqty.getValue());
//txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));			
			if ((txtdegradeqty.getValue())>(txtMillQty.getValue()))
			{
			alert("Degrade Qty Should Not be Greater than Mill Qty..");
			txtdegradeqty.focus();
			txtdegradeqty.setValue("0");
			}
			else
			{
			txtGRNQty.setValue(Ext.util.Format.number(txtMillQty.getValue()-txttareqty.getValue()-txtSandQty.getValue()-txtOtherDedQty.getValue()-txtMoisQty.getValue(),'0.000'));
			txtItemValue.setValue(txtGRNQty.getValue()*(txtRate.getValue()  ));
			lblbillrate = (Ext.util.Format.number(txtBillQty.getValue()*(txtRate.getValue()  ),'0.000'));

			//txtTotDedQty.setValue(Number(txtMoisQty.getValue())+Ext.util.Format.number(Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue())+Number(txtdegradeqty.getValue()),'0.000'));
			txtTotDedQty.setValue(Ext.util.Format.number(Number(txtMoisQty.getValue())+Number(txttareqty.getValue())+Number(txtOtherDedQty.getValue())+Number(txtSandQty.getValue()),"0.000"));
			}
		
		}
	    
}
    });

var txtTotDedQty = new Ext.form.TextField({
        fieldLabel  : 'Tot.Ded.Qty',
        id          : 'txtTotDedQty',
        name        : 'txtTotDedQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txtGRNQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGRNQty',
        name        : 'txtGRNQty',
        width       :  100,
        decimalPrecision: 3,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
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

var txtRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
      style      : {'border-radius': '5px' , 'text-align': 'right'},	
 enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                btnSubmit.focus();
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
},


    });



var txtItemValue = new Ext.form.NumberField({
        fieldLabel  : '',
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
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });


var txttotitemqty= new Ext.form.TextField({
        fieldLabel  : 'Total Qty(MT)',
        id          : 'txttotitemqty',
        name        : 'txttotitemqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });

var txttotitemval= new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotitemval',
        name        : 'txttotitemval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    });



var txttotgrnval= new Ext.form.NumberField({
        fieldLabel  : 'Total GRN Value',
        id          : 'txttotgrnval',
        name        : 'txttotgrnval',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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
      style      : {'border-radius': '5px' , 'text-align': 'right'},	
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

var txtOtherChrges = new Ext.form.TextField({
        fieldLabel  : 'Other Charges',
        id          : 'txtOtherChrges',
        name        : 'txtOtherChrges',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
       	enableKeyEvents: true, 
    style      :"border-radius: 5px; ",	
	listeners : {
		keyup:function(){
	
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
		 
	}
	}
    });


var txtHandlingcgstval = new Ext.form.TextField({
    fieldLabel  : 'H.SGST.Value',
    id          : 'txtHandlingcgstval',
    width       : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",     
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
   
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
      style      : {'border-radius': '5px' , 'text-align': 'right'},	
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurchaseLedger.focus();
             }
       },
 
	keyup:function(){
//		 
	}
	}

    });





var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtCGSTPer',
        name        : 'txtCGSTPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

var txtSGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtSGSTPer',
        name        : 'txtSGSTPer',
        width       :  100,
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });

var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtIGSTPer',
        name        : 'txtIGSTPer',
        width       :  100,
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });



var txtTCSPer = new Ext.form.TextField({
        fieldLabel  : 'TCS%',
        id          : 'txtTCSPer',
        name        : 'txtTCSPer',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	readOnly : true,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });
var txtCessPerMT = new Ext.form.NumberField({
        fieldLabel  : 'Cess / MT ',
        id          : 'txtCessPerMT',
        name        : 'txtCessPerMT',
        width       :  100,
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });


var txtHandlingPMT = new Ext.form.NumberField({
        fieldLabel  : 'Handling	 /MT',
        id          : ' txtHandlingPMT',
        name        : ' txtHandlingPMT',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
//	disabled:true,
//	readOnly : true,
    	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		     'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners:{
	keyup:function(){

          grid_tot();
	},
	blur:function(){
          grid_tot();
	},
	}	
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
	style: {
		     'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    });    

var dgrecord = Ext.data.Record.create([]);

var dgrecord = Ext.data.Record.create([]);

var dgrecord = Ext.data.Record.create([]);



function findLandingCost()
{

        var grncgst = 0;
        var grnsgst = 0;
        var grnigst = 0;
        var grntcs  = 0;
	var tcs_calc =0;
	txtTotGRNValue2.setRawValue(Ext.util.Format.number(totGRNValue),"0.00");
        txtTotGRNQty2.setRawValue(Ext.util.Format.number(totGRNQty,"0.000"));

        grncgst = (txtTotGRNValue.getValue() * txtCGSTPer.getValue()) / 100;
        grncgst = Math.round(grncgst * 100) / 100;
        grnsgst = (txtTotGRNValue.getValue() * txtSGSTPer.getValue()) / 100;
        grnsgst = Math.round(grnsgst * 100) / 100;
        grnigst = (txtTotGRNValue.getValue() * txtIGSTPer.getValue()) / 100;
        grnigst = Math.round(grnigst * 100) / 100;

        txtCGSTValue.setRawValue(Ext.util.Format.number(grncgst, "0.00"));
     	txtSGSTValue.setRawValue(Ext.util.Format.number(grnsgst, "0.00"));
    	txtIGSTValue.setRawValue(Ext.util.Format.number(grnigst, "0.00"));


            handlingval1 = Number(totGRNQty) * Number(txtHandlingPMT.getValue());
            txtHandlingcgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingcgst.getValue()) / 100),

 "0.00" ));

            cessval1 = Number(totGRNQty) * Number(txtCessPerMT.getValue());

            txtHandlingsgstval.setValue(Ext.util.Format.number(((handlingval1 * txtHandlingsgst.getValue()) / 100), "0.00" ));
            txtHandCharges.setValue(handlingval1);
            txtCessValue.setValue(Ext.util.Format.number(cessval1,"0.00"));
		
//if (txtCessPerMT.getValue() > 0)
//{
//   alert(Ext.util.Format.number(txtBillQty.getValue(),"0.000"));
//}

//Modified on 21/06/2024 for TCS calculation
	tcs_calc = Number(totGRNValue) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue();

	tcs_calc = Number(totGRNValue) + txtCGSTValue.getValue() + txtSGSTValue.getValue() + txtIGSTValue.getValue()+ Number(cessval1) + Number(handlingval1)+Number(txtHandlingcgstval.getValue()) +Number(txtHandlingsgstval.getValue());

	txtTCSValue.setRawValue(Ext.util.Format.number((txtTCSPer.getValue() * (tcs_calc / 100) ), "0"));



	pdb_grn_value = Number(totGRNValue) + Number(txtCGSTValue.getValue()) + Number(txtSGSTValue.getValue()) + Number(txtIGSTValue.getValue())+Number(handlingval1)  + Number(txtCessValue.getValue())+Number(txtHandlingcgstval.getValue()) + Number(txtHandlingsgstval.getValue()) +Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());


      pdb_landingcost = Number(totGRNValue) +Number(handlingval1)  + Number(txtCessValue.getValue()) + Number(txtTCSValue.getValue())+Number(txtOtherChrges.getValue())+Number(txtFreight.getValue());

       txtroundoff.setValue(0);
       totgrnvalue = pdb_grn_value

        if (roundoffNeed == "Y")     
        {         

           pdb_grn_value =  pdb_grn_value.toFixed(0) ;
           pdb_landingcost =  pdb_landingcost.toFixed(0) ;
           txtroundoff.setRawValue(Ext.util.Format.number(pdb_grn_value-totgrnvalue,"0.00"));
        }

	txtLandingCost.setRawValue(Ext.util.Format.number((pdb_landingcost), "0.00"));
	txtGRNAmount.setRawValue(Ext.util.Format.number((pdb_grn_value), "0.00"));
//	txtGRNAmount.setValue(pdb_grn_value);



calcost(); 

}


function grid_tot(){




            var chkfrepaidby;
	    totGRNQty = 0;
	    totGRNValue = 0;
	    totMillQty = 0;

	    pdb_totedval = 0;
	    pdb_totqty = 0;
	    totgrdothrchrg = 0;
	    pdb_freightadvance = 0;
	    tot_billqty = 0;
	    pdb_tot_millqty = 0;

	    pdb_tot_billval = 0;
	    totgrdothrchrg = 0;
	    pdb_totgrn_value2 = 0;
	    //txt_gate_entryno.Text = "";
	    pdb_unloading = 0;
	    handlingval1 =0;


            partyvalue = 0;

            var Row= flxDetail.getStore().getCount();
	    flxDetail.getSelectionModel().selectAll();
            var sel=flxDetail.getSelectionModel().getSelections();
	    for(var i=0;i<Row;i++)
	    {


		totGRNValue = Ext.util.Format.number((Number(totGRNValue) + Number(sel[i].data.itemvalue)), "0.00");
		totGRNQty = Ext.util.Format.number(Number(totGRNQty) + Number(sel[i].data.grnqty),"0.000");
		totMillQty = Ext.util.Format.number(Number(totMillQty) + Number(sel[i].data.millqty),"0.000");



 	    }



	    txtTotGRNValue.setRawValue(Ext.util.Format.number(totGRNValue,"0.00"));
            txtTotGRNQty.setRawValue(Ext.util.Format.number(totGRNQty,"0.000"));
            txtTotMillQty.setRawValue(Ext.util.Format.number(totMillQty,"0.000"));


	    txtTotGRNValue2.setRawValue(Ext.util.Format.number(totGRNValue,"0.00"));
            txtTotGRNQty2.setRawValue(Ext.util.Format.number(totGRNQty,"0.000"));
    
          findLandingCost();
    	

}

function RefreshData(){
//    TrnGrnformpanel.getForm().reset();


	txtCGSTPer.setValue('0');
	txtCGSTValue.setValue('0');
	txtSGSTPer.setValue('0');
	txtSGSTValue.setValue('0');
	txtIGSTPer.setValue('0');
	txtIGSTValue.setValue('0');
	txtTCSPer.setValue('0');
	txtTCSValue.setValue('0');
	txtCessPerMT.setValue('0');
	txtHandlingPMT.setValue('0');
	txtHandCharges.setValue('0');
	txtHandlingcgst.setValue('0');
	txtHandlingsgst.setValue('0');
	txtHandlingcgstval.setValue('0');
	txtHandlingsgstval.setValue('0');
        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();
    flxDetail.getStore().removeAll();

    txtTotMillQty.setRawValue('');
    txtTotGRNQty.setRawValue('');
    txtTotGRNValue.setRawValue('');

    cmbTicketNo.clearValue();
    txtTruckNo.setRawValue('');
    txtGENo.setRawValue('');
    txtPartybillno.setRawValue('');
    txtBillQty.setRawValue('');
    txtBillValue.setRawValue('');
    cmbItemName.clearValue();
    cmbPurchaseLedger.clearValue();
    txtMillQty.setRawValue('');
    txtRate.setRawValue('');
    txtItemValue.setRawValue('');
    txtSupplier.setRawValue('');
    cmbArea.clearValue();
   dtpGRNDate.focus();
    InitialData();
};

function InitialData(){

if (userid == 1) {
Ext.getCmp('dtpGRNDate').setDisabled(false);
Ext.getCmp('dtpGRNDate').setReadOnly(false);

}

        btnDelete.hide();
        btnGRNNoChange.hide();
        btnBillNoChange.hide();





                        cmbLot.setValue(1);

gstFlag="Add";

//			cmbPONO.setValue(0);

			Ext.getCmp('txtGRNNo').show();
			Ext.getCmp('cmbGRNNo').hide();
			cmbGRNNo.setDisabled(true);
 dtpGRNDate.focus();
//Ext.getCmp('Confirm').setDisabled(true);			

			//tabgrn.setActiveTab(0);

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
				Ext.getCmp('dtpGRNDate').focus(false, 0);	
				const input = document.getElementById('dtpGRNDate');
				const end = input.value.length;
				input.setSelectionRange(0,0);
				input.focus();
					}
                                });
;


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
	width       : 1250,	
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
		       {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 120,
		            x           : 30,
		            y           : -5,
		            defaultType : 'Label',
		            border      : false,
		            items: [lblItemName]
		        },
		       {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 120,
		            x           : 370,
		            y           : -5,
		            defaultType : 'Label',
		            border      : false,
		            items: [lblMillQty]
		        },

		       {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 120,
		            x           : 520,
		            y           : -5,
		            defaultType : 'Label',
		            border      : false,
		            items: [lblGRNQty]
		        },

		       {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 120,
		            x           : 670,
		            y           : -5,
		            defaultType : 'Label',
		            border      : false,
		            items: [lblRate]
		        },

		       {
		            xtype       : 'fieldset',
		            title       : '',
		            width       : 120,
		            x           : 815,
		            y           : -5,
		            defaultType : 'Label',
		            border      : false,
		            items: [lblValue]
		        },

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 1,
                        	width       : 430,
                        	x           : 20,
                        	y           : 15,
                            	border      : false,
                        	items: [cmbItemName]
                    	},



			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 1,
                        	width       : 320,
                        	x           : 350,
                        	y           : 15,
                            	border      : false,
                        	items: [txtMillQty]
                    	},

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 1,
                        	width       : 320,
                        	x           : 500,
                        	y           : 15,
                            	border      : false,
                        	items: [txtGRNQty]
                    	},

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 1,
                        	width       : 320,
                        	x           : 650,
                        	y           : 15,
                            	border      : false,
                        	items: [txtRate]
                    	},
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 1,
                        	width       : 300,
                        	x           : 800,
                        	y           : 15,
                            	border      : false,
                        	items: [txtItemValue]
                    	},btnSubmit,flxDetail,

					{ 
	                                	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 100,
		                        	y           : 205,
		                            	border      : false,
		                        	items: [txtTotMillQty]
                            		},

					{ 
	                                	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 400,
		                        	y           : 205,
		                            	border      : false,
		                        	items: [txtTotGRNQty]
                            		},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 400,
		                        	x           : 700,
		                        	y           : 205,
		                            	border      : false,
		                        	items: [txtTotGRNValue]
		                    	},

            ]    
        } ,
        			{ 
				xtype   : 'fieldset',
			        title   : 'Value Details',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

					{ 
	                                	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
		                        	width       : 400,
		                        	x           : 0,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNQty2]
                            		},

	
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 90,
		                        	width       : 400,
		                        	x           : 230,
		                        	y           : 5,
		                            	border      : false,
		                        	items: [txtTotGRNValue2]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
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
		                        	x           : 230,
		                        	y           : 40,
		                            	border      : false,
		                        	items: [txtCGSTValue]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
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
		                        	x           : 230,
		                        	y           : 70,
		                            	border      : false,
		                        	items: [txtSGSTValue]
		                    	},
					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
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
		                        	x           : 230,
		                        	y           : 100,
		                            	border      : false,
		                        	items: [txtIGSTValue]
		                    	},
				{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
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
		                        	x           : 230,
		                        	y           : 130,
		                            	border      : false,
						items: [txtCessValue]
		                        	
		                    	},

				{ 
	                        	xtype       : 'fieldset',
	                        	title       : '',
	                        	labelWidth  : 110,
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
	                        	x           : 230,
	                        	y           : 160,
	                            	border      : false,
	                        	items: [txtHandCharges]
	                    	},                           	

				{ 

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
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
                                	x           : 230,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtHandlingcgstval]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
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
                                	x           : 230,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtHandlingsgstval]
                            	},  

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 110,
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
		                        	x           : 230,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtTCSValue]
		                    	},


	
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 450,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtOtherChrges]
                            	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 160,
		                            	border      : false,
		                        	items: [txtFreight]
		                    	},



					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 190,
		                            	border      : false,
		                        	items: [txtroundoff]
		                    	},


					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 220,
		                            	border      : false,
		                        	items: [txtGRNAmount]
		                    	},

					{ 
		                        	xtype       : 'fieldset',
		                        	title       : '',
		                        	labelWidth  : 120,
		                        	width       : 320,
		                        	x           : 450,
		                        	y           : 250,
		                            	border      : false,
		                        	items: [txtLandingCost]
		                    	},

				]//tax
			} ,   //tax

        			{ 
				xtype   : 'fieldset',
			        title   : '',bodyStyle:{"background-color":"#FFFEF2"},
			        layout  : 'hbox',
			        border  : true,
			        height  : 266,
			        width   : 940,
				style:{ border:'1px solid red',color:' #581845 '},
			        layout  : 'absolute',
			        x       : 10,
			        y       : 220,
			        items:[

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 190,
                        	width       : 320,
                        	x           : 50,
                        	y           : 10,
                            	border      : false,
                        	items: [txtNewGRNNo]
                    },

		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 380,
		        y: 10,
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
		        y: 10,
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
		        y: 10,
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
		        y: 10,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnDelete]
		    },


                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 230,
                    width: 500,
                    labelWidth:90,
                    x:50 ,  
                    y:60 ,
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
                        	y           : 100,
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
		        y: 100,
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
        title       : 'Goods Recipt Note (Local)',
        header      : false,
        width       : 1100,	
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
                                               edit_click();
					}
				}
			},'-',
                {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
		    id	:  'save',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                               save_click();

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

                printtype = "PDF";
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(cmbGRNNo.getRawValue());
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 

                           

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
			width       : 1290,
			height      : 150,
			x           : 10,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGRNNo]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbGRNNo]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpGRNDate]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [cmbTicketNo]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [dtpTicketDate]
                            },



                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 500,
                                	x           : 200,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtSupplier]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 350,
                                	x           : 200,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbPONO]
                            },


				{ 
			        	xtype       : 'fieldset',
			        	labelWidth  : 110,
			        	width       : 380,
			        	x           : 200,
			        	y           : 60,
			            	border      : false,
			        	items: [cmbArea]
				 },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 200,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtPaymentTerms]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 350,
                                	x           : 625,
                                	y           : 00,
                                    	border      : false,
                                	items: [txtPartybillno]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 625,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtppartybilldate]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 625,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtBillQty]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 320,
                                	x           : 625,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtBillValue]
                            	},



					{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 280,
                                	x           : 905,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtGENo]
                            	},

               			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 300,
                                	x           : 905,
                                	y           : 25,
                                    	border      : false,
                                	items: [dtpGEDate]
                            	},

	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 700,
                                	x           : 905,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtTruckNo]
                            	},

				 {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 110,
		                    width       : 500,
		                    x           : 905,
		                    y           : 75,
		                    border      : false,
		                    items: [cmbPurchaseLedger]
		                },

                        ]
                },




		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1350,
			height      : 360,
			x           : 10,
			y           : 160,
			border      : true,
			layout      : 'absolute',
			items:[tabgrn] 
		}

          ]
    });
    
   
    var TrnGrnWindow = new Ext.Window({
	height      :  600,
        width       : 1320,
        x	     : 20,
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
	onEsc:function(){
	},
	listeners:{
               show:function(){


			InitialData();

	   			 }
			
		}
    });
    TrnGrnWindow.show();  
});
