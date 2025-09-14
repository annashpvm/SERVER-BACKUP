Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var partyledcode = 0;


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

var LoadGSTDataStore = new Ext.data.Store({
      id: 'LoadGSTDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgstledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'tax_gstcode', 'tax_gst_per', 'tax_gst_cgst_ledcode', 'tax_gst_sgst_ledcode', 'tax_gst_igst_ledcode','cgst_ledname','sgst_ledname','igst_ledname'
      ]),
    });

var LoadLedgerDataStore = new Ext.data.Store({
      id: 'LoadLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	  'led_code', 'led_name'
      ]),
    });


   var txtSupplier = new Ext.form.NumberField({
        fieldLabel  : 'Buyer Name.',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  360,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });


   var txtGSTNo = new Ext.form.NumberField({
        fieldLabel  : 'GSTI No.',
        id          : 'txtGSTNo',
        name        : 'txtGSTNo',
        width       :  200,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });

   var txtSALAmt = new Ext.form.NumberField({
        fieldLabel  : 'SALES Amount',
        id          : 'txtSALAmt',
        name        : 'txtSALAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
   });


   var txtVouNo = new Ext.form.NumberField({
        fieldLabel  : 'Vou No.',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        width       :  70,
	readOnly : true,
//    	labelStyle : "font-size:10px;font-weight:bold;",
	//style      : "border-radius:5px;",     
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });

   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });



   var txtDescription = new Ext.form.TextField({
        fieldLabel  : 'Description',
        id          : 'txtDescription',
        name        : 'txtDescription',
        width       :  340,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });

   var txtCGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'CGST Amt',
        id          : 'txtCGSTAmt',
        name        : 'txtCGSTAmt',
        width       :  80,
	readOnly : true,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
        tabindex : 2
   });

   var txtSGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'SGST Amt',
        id          : 'txtSGSTAmt',
        name        : 'txtSGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
   });

   var txtIGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'IGST Amt',
        id          : 'txtIGSTAmt',
        name        : 'txtIGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
   });

      var txtRoff = new Ext.form.NumberField({
        fieldLabel  : 'R.Off',
        id          : 'txtRoff',
        width       : 50,
        name        : 'txtRoff',
        readOnly    : true,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
   });


   var txtTaxableAmt = new Ext.form.NumberField({
        fieldLabel  : 'Taxable Amt',
        id          : 'txtTaxableAmt',
        name        : 'txtTaxableAmt',
        width       :  70,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:12px;font-weight:bold;color:#0080ff",
   });

;


   var txttotDebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
   });



   var dtDOCNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtDOCNo',
        name: 'Date',

        format: 'd-m-Y',
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()
   });


function grid_tot(){
        var gst =0;
        var cgst = 0;
        var sgst = 0;
        var igst = 0;	
        var taxable1 = 0;	
        var totamt1 = 0;
        var round1 =0;

	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            cgst=cgst+Number(sel[i].data.cgstamt);
            sgst=sgst+Number(sel[i].data.sgstamt);
            igst=igst+Number(sel[i].data.igstamt);

            taxable1=taxable1+Number(sel[i].data.taxable);
            totamt1=totamt1+Number(sel[i].data.totamt);
            round1 =round1+Number(sel[i].data.rounding);

         }
/* 
         txtCGSTAmt.setRawValue(Ext.util.Format.number(Math.round(cgst*100/100),'0.00'));
         txtSGSTAmt.setRawValue(Ext.util.Format.number(Math.round(sgst*100/100),'0.00'));
         txtIGSTAmt.setRawValue(Ext.util.Format.number(Math.round(igst*100/100),'0.00'));
         txtTaxableAmt.setRawValue(Ext.util.Format.number(Math.round(taxable1*100/100),'0.00'));     
*/
         txtCGSTAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
         txtSGSTAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));
         txtIGSTAmt.setRawValue(Ext.util.Format.number(igst,'0.00'));
         txtTaxableAmt.setRawValue(Ext.util.Format.number(taxable1,'0.00')); 
         txtRoff.setRawValue(Ext.util.Format.number(round1,'0.00')); 

         //txtSALAmt.setRawValue(Ext.util.Format.number(Math.round(totamt1*100/100),'0.00'));
         txtSALAmt.setRawValue(Ext.util.Format.number(totamt1,'0.00'));          

//calgst();

//get_pur_ledger()

flxaccupdation();

}

function grid_tot2(){
        var dr = 0;
        var cr = 0;

	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number(sel[i].data.debit);
            cr=cr+Number(sel[i].data.credit);
         }
 
         txttotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));

}


/*
function calgst() {
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        var gst = 0; 
        var cgstled, sgstled,igstled;  
	
       
        var chkgst = LoadGSTDataStore.getCount(); 
        for(var i=0;i<Row;i++)
        {
	    gst =0;
            gst =  Number(sel[i].data.cgstper) + Number(sel[i].data.sgstper) + Number(sel[i].data.igstper); 


		for(var j=0;j<chkgst;j++){
			if(LoadGSTDataStore.getAt(j).get('tax_gst_per') === Ext.util.Format.number(gst,"0.00")) {

				sel[i].set('cgstledger', LoadGSTDataStore.getAt(j).get('tax_gst_cgst_ledcode'));
				sel[i].set('sgstledger', LoadGSTDataStore.getAt(j).get('tax_gst_sgst_ledcode'));
				sel[i].set('igstledger', LoadGSTDataStore.getAt(j).get('tax_gst_igst_ledcode'));
				sel[i].set('cgstledname', LoadGSTDataStore.getAt(j).get('cgst_ledname'));
				sel[i].set('sgstledname', LoadGSTDataStore.getAt(j).get('sgst_ledname'));
				sel[i].set('igstledname', LoadGSTDataStore.getAt(j).get('igst_ledname'));
			
			}
		}	
               
        }

}


function get_pur_ledger() {
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        var chkgst = LoadLedgerDataStore.getCount(); 
        var ledcode = 0; 
        for(var i=0;i<Row;i++)
        {
		ledcode = 0; 
            ledcode  =  Number(sel[i].data.purledger); 
            frtcode  =  Number(sel[i].data.frtparty); 
            frtglcode  =  Number(sel[i].data.frtglledcode); 

            for(var j=0;j<chkgst;j++){
 		if(LoadLedgerDataStore.getAt(j).get('led_code') === Ext.util.Format.number(ledcode,"0")) {
                    sel[i].set('purledname', LoadLedgerDataStore.getAt(j).get('led_name'));			
		}
 		if(LoadLedgerDataStore.getAt(j).get('led_code') === Ext.util.Format.number(frtcode,"0")) {
                    sel[i].set('frtledname', LoadLedgerDataStore.getAt(j).get('led_name'));			
		}
 		if(LoadLedgerDataStore.getAt(j).get('led_code') === Ext.util.Format.number(frtglcode,"0")) {
                    sel[i].set('frtglledname', LoadLedgerDataStore.getAt(j).get('led_name'));			
		}
            }	
        }

}
*/

function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;
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
	      ledname   : txtSupplier.getRawValue(),
	      debit     : txtSALAmt.getRawValue(),
              credit    : 0,
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

    
        for(var i=0;i<Row;i++)
        {

            if (cmbInvNo.getRawValue().substring(0,2) == "TN")
            {
            sallcode =  Number(sel[i].data.tn_salesledcode); 
            sallname =  sel[i].data.tn_salesledname; 
            } 
            else 
            {
            sallcode =  Number(sel[i].data.os_salesledcode); 
            sallname =  sel[i].data.os_salesledname; 
            } 

            salamt   =  Number(sel[i].data.taxable); 

            cgstlcode     =  Number(sel[i].data.cgstledcode); 
            sgstlcode     =  Number(sel[i].data.sgstledcode); 
            igstlcode     =  Number(sel[i].data.igstledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 


            cgstamt   =  Number(sel[i].data.cgstamt);
            sgstamt   =  Number(sel[i].data.sgstamt);
            igstamt   =  Number(sel[i].data.igstamt);

//-- For Sales Ledger
            cramt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == sallcode )
                {    
                   cramt =  salamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', cramt);
                   k =1;
                }
            }
            if (k==0 && salamt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : sallcode,
			      ledname   : sallname,
			      debit     : 0,
			      credit    : salamt,
                              ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end


//-- For CGST Ledger
            dbamt = 0;
            k =0;



            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == cgstlcode )
                {    
                   dbamt =  cgstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
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
			      debit     : 0,
			      credit    : cgstamt,
                              ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end

//-- For SGST Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == sgstlcode )
                {    
                   dbamt =  sgstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
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
			      debit     : 0,
			      credit    : sgstamt,
                              ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end

//-- For IGST Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == igstlcode )
                {    
                   dbamt =  igstamt + Number(sel1[j].data.credit);
                   sel1[j].set('credit', dbamt);
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
			      debit     : 0,
			      credit    : igstamt,
                              ledtype   : "G",
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),

                        }) 
                        );
            } 
//--end

var dr = 0;
var cr = 0;
if (txtRoff.getValue() >0)
   cr = txtRoff.getValue();
else
   dr = Math.abs(txtRoff.getValue());


//Rounding off
if (txtRoff.getValue() != 0)
{
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : 1859,
	      ledname   : 'ROUNDED OFF',
	      debit     : Ext.util.Format.number(dr,'0.00'),
              credit    : Ext.util.Format.number(cr,'0.00'),
              billno    : cmbInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),
              ledtype   : "G",
              }) 
        );
}



 


            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){

//                  sel1[j].set('debit',Ext.util.Format.number(Math.round(sel1[j].get('debit')*100/100),'0.00'));
//                  sel1[j].set('credit',Ext.util.Format.number(Math.round(sel1[j].get('credit')*100/100),'0.00'));
                  sel1[j].set('debit',Ext.util.Format.number(sel1[j].get('debit'),'0.00'));
                  sel1[j].set('credit',Ext.util.Format.number(sel1[j].get('credit'),'0.00'));


            }   
           
            
  
        }  
            grid_tot2();
//            var diff = 0;
//         
//   diff =  txttotDebit.getRawValue()-txttotCredit.getRawValue(); 
//            var sel1 = flxAccounts.getSelectionModel().getSelections();           		
//            sel1[1].set('debit',sel1[1].get('debit')-diff);
       grid_tot2();



}		 




var loadGRNdetailsStore = new Ext.data.Store({
      id: 'loadGRNdetailsStore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewothersalesDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'os_docno', 'os_date', 'os_custcode', 'os_item', 'os_rate', 'os_qty', 'os_value', 'os_others', 'os_taxable', 'os_cgstper', 'os_cgst', 'os_sgstper', 'os_sgst',
'os_igstper', 'os_igst', 'os_netamt', 'os_paymode', 'os_transport', 'os_vehno', 'os_remarks', 'os_ourref', 'os_partyref', 'os_accupd', 'os_acvou_no', 'os_acvou_date','salitem_code', 'salitem_name', 'salitem_uom', 'salitem_hsn', 'uom_short_name','sup_code', 'sup_refname','sup_gstin','sup_led_code',
'tn_salledcode', 'tn_salledname','os_salledcode', 'os_salledname', 'cgstledcode', 'cgstledname','sgstledcode', 'sgstledname', 'igstledcode', 'igstledname','os_rounding'	

      ]),
    });


var LoadGRNDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
    //  autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadosno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'os_invno'
      ]),
    });

var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'DOC No. ',
        width           : 120,
        displayField    : 'os_invno', 
        valueField      : 'os_invno',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadGRNDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle   : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){
                   flxDetail.getStore().removeAll();
                   loadGRNdetailsStore.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewothersalesDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    invno:cmbInvNo.getRawValue()
                                },
                           	callback:function()
				{

                                    dtVouNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('os_date'),"d-m-Y"));
                                    dtDOCNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('os_date'),"d-m-Y"));
                                    txtSupplier.setRawValue(loadGRNdetailsStore.getAt(0).get('sup_refname'));

                                    txtGSTNo.setRawValue(loadGRNdetailsStore.getAt(0).get('sup_gstin'));
                                    //txtSALAmt.setRawValue(loadGRNdetailsStore.getAt(0).get('os_netamt'));
                                    txtDescription.setRawValue(loadGRNdetailsStore.getAt(0).get('os_remarks'));
                                    partyledcode = loadGRNdetailsStore.getAt(0).get('sup_led_code');
 
//alert(partyledcode);
                                    var cnt=loadGRNdetailsStore.getCount();
                                    var purledger = 0;


                                    if(cnt>0)
				    {                         
                                       for(var j=0; j<cnt; j++)
                                       {
                                        



		                             flxDetail.getStore().insert(
		                             flxDetail.getStore().getCount(),
                	                     new dgrecord({
						  itemname  : loadGRNdetailsStore.getAt(j).get('salitem_name'),
						  itemcode  : loadGRNdetailsStore.getAt(j).get('salitem_code'),
						  uom       : loadGRNdetailsStore.getAt(j).get('uom_name'),
						  rate      : loadGRNdetailsStore.getAt(j).get('os_rate'),
						  qty       : loadGRNdetailsStore.getAt(j).get('os_qty'),
						  value     : loadGRNdetailsStore.getAt(j).get('os_value'),
						  others    : loadGRNdetailsStore.getAt(j).get('os_others'),
                                                  taxable   : loadGRNdetailsStore.getAt(j).get('os_taxable'),


						  cgstper   : loadGRNdetailsStore.getAt(j).get('os_cgstper'),						  
						  cgstamt   : loadGRNdetailsStore.getAt(j).get('os_cgst'),
						  sgstper   : loadGRNdetailsStore.getAt(j).get('os_sgstper'),
						  sgstamt   : loadGRNdetailsStore.getAt(j).get('os_sgst'),
						  igstper   : loadGRNdetailsStore.getAt(j).get('os_igstper'),
						  igstamt   : loadGRNdetailsStore.getAt(j).get('os_igst'),
						  totamt    : loadGRNdetailsStore.getAt(j).get('os_netamt'),
						  cgstledcode  : loadGRNdetailsStore.getAt(j).get('cgstledcode'),
					          cgstledname  : loadGRNdetailsStore.getAt(j).get('cgstledname'),
						  sgstledcode  : loadGRNdetailsStore.getAt(j).get('sgstledcode'),
						  sgstledname  : loadGRNdetailsStore.getAt(j).get('sgstledname'),
						  igstledcode  : loadGRNdetailsStore.getAt(j).get('igstledcode'),
						  igstledname  : loadGRNdetailsStore.getAt(j).get('igstledname'),
						  tn_salesledcode : loadGRNdetailsStore.getAt(j).get('tn_salledcode'),
						  tn_salesledname : loadGRNdetailsStore.getAt(j).get('tn_salledname'),
						  os_salesledcode : loadGRNdetailsStore.getAt(j).get('os_salledcode'),
						  os_salesledname : loadGRNdetailsStore.getAt(j).get('os_salledname'),
                                                  rounding : loadGRNdetailsStore.getAt(j).get('os_rounding'),
						  
                                   		})
                                             );

                                       }
                                    }  
                                    grid_tot();
                                }
                   }); 

           }
        } 
});


var dgrecord = Ext.data.Record.create([]);

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 140,
    hidden:false,
    width: 750,
    id: 'my-grid',  
    columns:
    [
	{header: "Item Name",   dataIndex: 'itemname',sortable:true,width:160,align:'left'},
	{header: "Item Code",   dataIndex: 'itemcode',sortable:true,width:50,align:'left'},
	{header: "UOM"      ,   dataIndex: 'uom',sortable:true,width:50,align:'left'},
	{header: "Unit Rate",   dataIndex: 'rate',sortable:true,width:60,align:'left'},
	{header: "Quantity" ,   dataIndex: 'qty',sortable:true,width:60,align:'left'},
	{header: "Value"    ,   dataIndex: 'value',sortable:true,width:60,align:'left'},
	{header: "Others"   ,   dataIndex: 'others',sortable:true,width:50,align:'left'},
	{header: "Taxable"  ,   dataIndex: 'taxable',sortable:true,width:60,align:'left'},
	{header: "CGST%",    dataIndex: 'cgstper',sortable:true,width:50,align:'left'},
	{header: "CGST AMT", dataIndex: 'cgstamt',sortable:true,width:80,align:'left'},
	{header: "SGST%",    dataIndex: 'sgstper',sortable:true,width:50,align:'left'},
	{header: "SGST AMT", dataIndex: 'sgstamt',sortable:true,width:80,align:'left'},
	{header: "IGST%",    dataIndex: 'igstper',sortable:true,width:50,align:'left'},
	{header: "IGST AMT", dataIndex: 'igstamt',sortable:true,width:80,align:'left'},
	{header: "TOTAL AMT",dataIndex: 'totamt',sortable:true,width:80,align:'left'},
	{header: "CGST LCODE",dataIndex: 'cgstledcode',sortable:true,width:50,align:'left'},
	{header: "CGST NAME", dataIndex: 'cgstledname',sortable:true,width:80,align:'left'},
	{header: "SGST LCODE",dataIndex: 'sgstledcode',sortable:true,width:50,align:'left'},
	{header: "SGST NAME", dataIndex: 'sgstledname',sortable:true,width:80,align:'left'},
	{header: "IGST LCODE",dataIndex: 'igstledcode',sortable:true,width:50,align:'left'},
	{header: "IGST NAME", dataIndex: 'igstledname',sortable:true,width:80,align:'left'},
	{header: "SALE LCODE",dataIndex: 'tn_salesledcode',sortable:true,width:50,align:'left'},
	{header: "SALE NAME", dataIndex: 'tn_salesledname',sortable:true,width:80,align:'left'},
	{header: "SALE LCODE",dataIndex: 'os_salesledcode',sortable:true,width:50,align:'left'},
	{header: "SALE NAME", dataIndex: 'os_salesledname',sortable:true,width:80,align:'left'},
	{header: "Round", dataIndex: 'rounding',sortable:true,width:80,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});


var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 190,
    hidden:false,
    width: 950,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});


    function RefreshData() {
                 TrnOSReceivableUpdationPanel.getForm().reset();
                 flxAccounts.getStore().removeAll();
                  VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'OSI'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("OSI"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadosno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      	        LoadGSTDataStore.removeAll();
           	LoadGSTDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadgstledger"
		     // gstper : gst 
                   },
		   callback:function()
	          {
                  } 
           	});  			

    }




var TrnOSReceivableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnOSReceivableUpdationPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
        {
            text: 'Save',
//save
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {

	   	 var gstSave;
                    gstSave="true";
                    if (cmbInvNo.getRawValue()==0 || cmbInvNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Updation','Document no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxAccounts.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Updation','Grid should not be empty..');
        	                gstSave="false";
	                    }
                    else if (txtDescription.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Description....');
                        txtDescription.focus();
                        gstSave="false";
                    }

                    else if (txttotDebit.getValue() != txttotCredit.getValue())
                    {
                        Ext.Msg.alert('Updation','Total Debit and Credit is Not Tally......');
                        gstSave="false";
                    }


                    else{



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

                           
                            var accData = flxAccounts.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(accData, function (record) {
                                poupdData.push(record.data);
                            });


                   
                            Ext.Ajax.request({
                            url: 'FrmPayableDataSave.php',

                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: accData.length,
				griddetdn: Ext.util.JSON.encode(poupdData),     
			        cntdn: 0,

//                                savetype:gstFlag,
                                paymode   :"OSI",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,
                             	voutype   :"OSI",
                              	voutypedn :"",

				vouno     :txtVouNo.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				grnno     : cmbInvNo.getRawValue(),
				grnate    : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),

				refno     : cmbInvNo.getRawValue(),
				refdate   : Ext.util.Format.date(dtDOCNo.getValue(),"Y-m-d"),
                                narration : txtDescription.getRawValue(),
                   		grnamount : txtSALAmt.getValue(),
                                debitamount :0,
                                creditdays  : 0,
  
				},
                              callback: function(options, success, response)
                              {

                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Other Sales Details Updated - " + obj['vno']);

                                    TrnOSReceivableUpdationPanel.getForm().reset();
                                   
			            flxAccounts.getStore().removeAll();

                                    RefreshData();
                                  }else
					{Ext.MessageBox.alert("Updation Error- " + obj['vno']);                                                  
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
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    TrnOSReceivableUpdationPanel.getForm().reset();
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnOSReceivableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 500,
                 height      : 230,
                 x           : 10,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[
		      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 450,
				 height      : 50,
				 x           : 10,
				 y           : 0,
				 border      : true,
				 layout      : 'absolute',
				 items:[
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 70,
				          width       : 200,
				          x           : 10,
				          y           :-5,
				          border      : false,
				          items: [txtVouNo]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 200,
				          x           : 230,
				          y           : -5,
				          border      : false,
				          items: [dtVouNo]
				       },
				     ],
				},



                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 50,
                          border      : false,
                          items: [cmbInvNo]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 200,
                          x           : 250,
                          y           : 50,
                          border      : false,
                          items: [dtDOCNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 80,
                          border      : false,
                          items: [txtSupplier]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 110,
                          border      : false,
                          items: [txtGSTNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 140,
                          border      : false,
                          items: [txtSALAmt]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 470,
                          x           : 0,
                          y           : 170,
                          border      : false,
                          items: [txtDescription]
                       },
  
                      ],

              }  ,

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 800,
                 height      : 230,
                 x           : 520,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 800,
		         x           : 0,
		         y           : 0,
		         border      : false,
		         items:[flxDetail],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 90, 
		         x           : 0,
		         y           : 160,
		         border      : false,
		         items:[txtTaxableAmt],
		     },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 65, 
		         x           : 165,
		         y           : 160,
		         border      : false,
		         items:[txtCGSTAmt],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 65, 
		         x           : 330,
		         y           : 160,
		         border      : false,
		         items:[txtSGSTAmt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 65, 
		         x           : 500,
		         y           : 160,
		         border      : false,
		         items:[txtIGSTAmt],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 40, 
		         x           : 660,
		         y           : 160,
		         border      : false,
		         items:[txtRoff],
		     },

                 ]
              },   


              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 1000,
                 height      : 260,
                 x           : 10,
                 y           : 250,
                 border      : true,
                 layout      : 'absolute',
                 items:[
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 1000,
		         x           : 0,
		         y           : 0,
		         border      : false,
		         items:[flxAccounts],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 270,
		         y           : 200,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 500,
		         y           : 200,
		         border      : false,
		         items:[txttotCredit],
                       },
                ]
             }    
 
            ], 
 


});
 	

    var TrnOSReceivableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'OTHER SALES - Accounting Screen',
        items       : TrnOSReceivableUpdationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFFE0"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

onEsc:function(){
},
	listeners:{
             show:function(){
		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadosno',
                            compcode:Gincompcode,
                            finid:GinFinid  
	                   },
		   callback:function()
	                   {
    			    }
	        });
      	        LoadGSTDataStore.removeAll();
           	LoadGSTDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadgstledger"
		     // gstper : gst 
                   },
		   callback:function()
	          {
                  } 
           	});  			

      	        LoadLedgerDataStore.removeAll();
           	LoadLedgerDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadledgers"
                   },
		   callback:function()
	          {
                  } 
           	});  
                      VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'OSI'
                        },
                        callback: function()
                        {
                            var cnt=VouNodatastore.getCount();
                            if(cnt>0)
                            txtVouNo.setRawValue("OSI"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    }); 
  
             }    
          } 
    });
       TrnOSReceivableUpdationWindow.show();  
});
