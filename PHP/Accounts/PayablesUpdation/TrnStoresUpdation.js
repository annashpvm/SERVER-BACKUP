Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




   var partyledcode = 0;
   var description = "";

   var grntype = localStorage.getItem('GRNTYPE');

   var purtype = 'PSP';
   var crdays  = 0;

   var rounding = 0;


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


   var txtVouNo = new Ext.form.NumberField({
        fieldLabel  : 'Vou No.',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        width       :  70,
	readOnly : true,
//    	labelStyle : "font-size:10px;font-weight:bold;",
	//style      : "border-radius:5px;",     
        tabindex : 2
   });

   var dtVouNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtVouNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
   });



   var txtSupplier = new Ext.form.NumberField({
        fieldLabel  : 'Supplier Name.',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  360,
	readOnly : true,
        tabindex : 2
   });


   var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  200,
//	readOnly : true,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                flxaccupdation(); 
           }
        }
   });

   var txtGRNAmt = new Ext.form.NumberField({
        fieldLabel  : 'GRN Amount',
        id          : 'txtGRNAmt',
        name        : 'txtGRNAmt',
        width       :  120,
	readOnly : true,
        tabindex : 2
   });


   var txtCGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'CGST Amt',
        id          : 'txtCGSTAmt',
        name        : 'txtCGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtSGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'SGST Amt',
        id          : 'txtSGSTAmt',
        name        : 'txtSGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtIGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'IGST Amt',
        id          : 'txtIGSTAmt',
        name        : 'txtIGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtInwardAmt = new Ext.form.NumberField({
        fieldLabel  : 'Inward Amt',
        id          : 'txtInwardAmt',
        name        : 'txtInwardAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtPFAmt = new Ext.form.NumberField({
        fieldLabel  : 'PF Amt',
        id          : 'txtPFAmt',
        name        : 'txtPFAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : 'Frt. Amt',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtRebate = new Ext.form.NumberField({
        fieldLabel  : 'Rebate',
        id          : 'txtRebate',
        name        : 'txtRebate',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txttotDebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var dtInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtInvNo',
        name: 'Date',
        format: 'd-m-Y',

        value: new Date()
   });

   var dtGRNNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtGRNNo',
        name: 'Date',
        format: 'd-m-Y',
	readOnly : true,
        value: new Date()
   });


function grid_tot(){
        var gst =0;
        var cgst = 0;
        var sgst = 0;
        var igst = 0;	
        var pf  = 0;	
        var frt = 0;	
        var rebate = 0;
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            cgst=cgst+Number(sel[i].data.cgstamt);
            sgst=sgst+Number(sel[i].data.sgstamt);
            igst=igst+Number(sel[i].data.igstamt);
            pf=pf+Number(sel[i].data.pfamt);
            frt=frt+Number(sel[i].data.frtamt);
            rebate=rebate+Number(sel[i].data.rebate);
         }
 
         txtCGSTAmt.setRawValue(Ext.util.Format.number((cgst*100/100),'0.00'));
         txtSGSTAmt.setRawValue(Ext.util.Format.number((sgst*100/100),'0.00'));
         txtIGSTAmt.setRawValue(Ext.util.Format.number((igst*100/100),'0.00'));
         txtPFAmt.setRawValue(Ext.util.Format.number((pf*100/100),'0.00'));     
         txtFrtAmt.setRawValue(Ext.util.Format.number((frt*100/100),'0.00'));
         txtRebate.setRawValue(Ext.util.Format.number(rebate,'0.00'));


calgst();

get_pur_ledger()

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
 
         txttotDebit.setRawValue(Ext.util.Format.number((dr*100/100),'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number((cr*100/100),'0.00'));


         flxDetail.getSelectionModel().clearSelections();
         flxAccounts.getSelectionModel().clearSelections();
}


function calgst() {
/*
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        var gst = 0; 
        var cgstled, sgstled,igstled;  
	
       
        var chkgst = LoadGSTDataStore.getCount(); 
        for(var i=0;i<Row;i++)
        {
	    gst =0;
            gst =  Number(sel[i].data.cgstper,"0.00") + Number(sel[i].data.sgstper,"0.00") + Number(sel[i].data.igstper,"0.00"); 


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
*/
}


function get_pur_ledger() {
/*

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
*/

}


function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt =0;    
        var dbamt = 0;
        var cramt = 0;

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
	      ledcode   : partyledcode,
	      ledname   : txtSupplier.getRawValue(),
	      debit     : "0",
              credit    : txtGRNAmt.getValue(),
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );

    
//-- For PACKING AND FORWARDING CHARGES (P&F)
            dbamt = 0;
            k =0;

              if ( txtPFAmt.getValue() >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : 2309,
			      ledname   : 'PACKING CHARGES -GST',
			      debit     : txtPFAmt.getValue(),
			      billno    : txtInvNo.getRawValue(),
			      billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end


        for(var i=0;i<Row;i++)
        {
            purlcode =  Number(sel[i].data.purledger); 
            purlname =  sel[i].data.purledname; 
            puramt   =  Number(sel[i].data.value); 

            cgstlcode     =  Number(sel[i].data.cgstledger); 
            sgstlcode     =  Number(sel[i].data.sgstledger); 
            igstlcode     =  Number(sel[i].data.igstledger); 
            frtpartylcode =  Number(sel[i].data.frtparty); 
            frtlcode      =  Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  sel[i].data.frtledname; 
            frtlname      =  sel[i].data.frtglledname; 

  

            cgstamt   =  Number(sel[i].data.cgstamt);
            sgstamt   =  Number(sel[i].data.sgstamt);
            igstamt   =  Number(sel[i].data.igstamt);

            inamt    = Number(sel[i].data.inwardamt);
            frtamt   =  Number(sel[i].data.frtamt);
            rebate = Number(sel[i].data.rebate);

//-- For Purchase Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
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
            if (k==0 && puramt >0) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : purlcode,
			      ledname   : purlname,
			      debit     : puramt,
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),                
			      credit    : "0",
                              ledtype   : "G",
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
                   dbamt =  cgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
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
			      debit     : cgstamt,
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),           
			      credit    : "0",
                              ledtype   : "G",

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
                   dbamt =  sgstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
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
			      debit     : sgstamt,
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),        
			      credit    : "0",
                              ledtype   : "G",

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
                   dbamt =  igstamt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
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
			      debit     : igstamt,
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),         
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end

//-- For Inward Ledger - Debit
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
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
			      debit     : inamt,
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),       
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


//-- For Freight Ledger - Debit
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) ==  1604 )
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
//			      ledcode   : '1604',
//			      ledname   : 'INWARD MATERIAL FREIGHT CHARGES',
			      ledcode   : '2020',
			      ledname   : 'FREIGHT INWARD -GST',

			      debit     : frtamt,

              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),      
			      credit    : "0",
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end



//-- For REBATE AND DISCOUNT - Credit

            k =0;

            flxAccounts.getSelectionModel().selectAll();
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

			      debit     : rebate,

              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),      
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

            flxAccounts.getSelectionModel().selectAll();
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
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
			      credit    : inamt,
                              ledtype   : "G",

                        }) 
                        );
            } 
//--end


           frtpartylcode =  Number(sel[i].data.frtparty); 
            frtlcode      =  Number(sel[i].data.frtglledcode); 

            cgstlname     =  sel[i].data.cgstledname; 
            sgstlname     =  sel[i].data.sgstledname; 
            igstlname     =  sel[i].data.igstledname; 
            frtpartylname =  sel[i].data.frtledname;
/*

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
                              billno    : txtInvNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                              ledtype   : "P",

                        }) 
                        );
            } 
//--end
*/
 


 


            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(sel1[j].get('credit'));
                  sel1[j].set('debit',Ext.util.Format.number(Number(sel1[j].get('debit')*100/100),'0.00'));
                  sel1[j].set('credit',Ext.util.Format.number(Number(sel1[j].get('credit')*100/100),'0.00'));
            }   
           
           


var rounddr = 0;
var roundcr = 0;
if (rounding >0)
   rounddr = rounding;
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
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
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




var loadGRNdetailsStore = new Ext.data.Store({
      id: 'loadGRNdetailsStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewStoresGrnDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
'minh_mindate','minh_type','minh_sup_code', 'minh_bill_no', 'minh_bill_date', 'minh_gross_value', 'minh_value', 'minh_acct_status',
'minh_carrier', 'minh_remarks', 'minh_vou_no', 'minh_vou_year', 'minh_vou_type', 'minh_accupd', 'mint_pono', 'mint_podate', 'mint_item_code', 'mint_rcvd_qty', 'mint_unit_rate', 'mint_cost_rate', 'mint_pack_per', 'mint_others', 'mint_frt_val', 'mint_freight','mint_discount', 'mint_qcdev_val', 'mint_value', 
'mint_slno', 'mint_disamt', 'mint_pfamt','mint_cgst_per', 'mint_cgst_amt', 'mint_sgst_per', 'mint_sgst_amt', 'mint_igst_per', 'mint_igst_amt',
'mint_inward_amt', 'mint_tax_freight', 'mint_tax_freight2', 'mint_clr1_cgst_per', 'mint_clr1_sgst_per', 'mint_clr1_igst_per', 'mint_clr1_transport',
'mint_clr2_cgst_per', 'mint_clr2_sgst_per', 'mint_clr2_igst_per', 'mint_clr2_transport', 'mint_machine', 'mint_rcm', 'mint_tcs_per', 
'mint_tcs_amt', 'sup_refname','sup_type','sup_led_code', 'item_group_code', 'item_code', 'item_name', 'item_desc', 'item_uom','frtparty1', 'frtparty2','minh_credit_days',
'grp_code', 'grp_name', 'grp_short_name', 'grp_rep_code', 'grp_tngst_code', 'grp_cst_code', 'grp_imp_code', 'grp_freight_code', 'frtledcode1', 'frtledcode2' ,'mint_purgroup', 'led_name','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst','minh_round_off','mint_accept_qty','mint_rebate'
      ]),
    });



var LoadGRNDataStore = new Ext.data.Store({
      id: 'PackslipnoDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadStoresgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno'
      ]),
    });

var cmbGRNNo = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No. ',
        width           : 100,
        displayField    : 'grnno', 
        valueField      : 'grnno',
        hiddenName      : '',
        id              : 'cmbGRNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadGRNDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){
                   rounding = 0;
                   flxDetail.getStore().removeAll();
                   loadGRNdetailsStore.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewStoresGrnDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    grnno:cmbGRNNo.getValue(),
                                    grntype : purtype,
                                },
                           	callback:function()
				{
                                    crdays = loadGRNdetailsStore.getAt(0).get('minh_credit_days');
                                     


                                     rounding = loadGRNdetailsStore.getAt(0).get('minh_round_off');

//				    txtVouNo.setRawValue('PS'+cmbGRNNo.getRawValue());
	
//                    			  alert(Ext.String.trim(cmbGRNNo.getRawValue()));

//				    txtVouNo.setRawValue('PS'+Ext.String.trim(cmbGRNNo.getRawValue()));
//				    txtVouNo.setRawValue('PS'+cmbGRNNo.getRawValue().trim());
				    txtVouNo.setRawValue(loadGRNdetailsStore.getAt(0).get('minh_vou_no'));

//                                    dtVouNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('minh_mindate'),"d-m-Y"));

                                    dtGRNNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('minh_mindate'),"d-m-Y"));
                                    dtVouNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('minh_mindate'),"d-m-Y"));
        
                                    txtSupplier.setRawValue(loadGRNdetailsStore.getAt(0).get('sup_refname'));

                                    txtInvNo.setRawValue(loadGRNdetailsStore.getAt(0).get('minh_bill_no'));
                                    dtInvNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('minh_bill_date'),"d-m-Y"));
                                    txtGRNAmt.setValue(loadGRNdetailsStore.getAt(0).get('minh_value'));

                                    partyledcode = loadGRNdetailsStore.getAt(0).get('sup_led_code');
 
                                    var cnt=loadGRNdetailsStore.getCount();
                                    var purledger = 0;

                                description ="General Store Purchase From " + txtSupplier.getRawValue().trim() + " For the Bill no. "  + txtInvNo.getRawValue() + " and Bill date " + Ext.util.Format.date(dtVouNo.getValue(),"d-m-Y");

                                    if(cnt>0)
				    {                         
                                       for(var j=0; j<cnt; j++)
                                       {
                                        
                                           purledger   = loadGRNdetailsStore.getAt(j).get('mint_purgroup');




/*

                                           if (loadGRNdetailsStore.getAt(j).get('sup_type') == 1)
                                            {   
                                                 purledger   = loadGRNdetailsStore.getAt(j).get('grp_tngst_code');
                                             }
                                            else if (loadGRNdetailsStore.getAt(j).get('sup_type') == 2)
                                             {   
                                                  purledger   = loadGRNdetailsStore.getAt(j).get('grp_cst_code');
                                              }
                                             else  if (loadGRNdetailsStore.getAt(j).get('sup_type') == 3)
                                             {   
                                                  purledger  =  loadGRNdetailsStore.getAt(j).get('grp_imp_code');
                                             }
                                    

*/
                                  var value1 =  (loadGRNdetailsStore.getAt(j).get('mint_accept_qty') * 
loadGRNdetailsStore.getAt(j).get('mint_unit_rate')) -  loadGRNdetailsStore.getAt(j).get('mint_disamt')
-  loadGRNdetailsStore.getAt(j).get('mint_rebate');
                                  value1 = Ext.util.Format.number(value1.toFixed(2),'0.00');

		                             flxDetail.getStore().insert(
		                             flxDetail.getStore().getCount(),
                	                     new dgrecord({
						  Item      : loadGRNdetailsStore.getAt(j).get('item_name'),
						  cgstper   : loadGRNdetailsStore.getAt(j).get('mint_cgst_per'),
						  cgstamt   : loadGRNdetailsStore.getAt(j).get('mint_cgst_amt'),
						  sgstper   : loadGRNdetailsStore.getAt(j).get('mint_sgst_per'),
						  sgstamt   : loadGRNdetailsStore.getAt(j).get('mint_sgst_amt'),
						  igstper   : loadGRNdetailsStore.getAt(j).get('mint_igst_per'),
						  igstamt   : loadGRNdetailsStore.getAt(j).get('mint_igst_amt'),
//						  inwardamt : loadGRNdetailsStore.getAt(j).get('mint_freight'),
//						  frtparty  : loadGRNdetailsStore.getAt(j).get('frtledcode1'),
                                 		  pfamt     : loadGRNdetailsStore.getAt(j).get('mint_pfamt'),
						  frtamt    : loadGRNdetailsStore.getAt(j).get('mint_freight'),
						  rebate    : loadGRNdetailsStore.getAt(j).get('mint_rebate'),
						  value     : value1,
                                                  purledger :  loadGRNdetailsStore.getAt(j).get('mint_purgroup'),   
                                                  purledname  :  loadGRNdetailsStore.getAt(j).get('led_name'),   
                                                  cgstledger  :  loadGRNdetailsStore.getAt(j).get('tax_cgstledcode'),  
                                                  cgstledname :  loadGRNdetailsStore.getAt(j).get('tax_cgstledger'),  
                                                  sgstledger  :  loadGRNdetailsStore.getAt(j).get('tax_sgstledcode'),   
                                                  sgstledname :  loadGRNdetailsStore.getAt(j).get('tax_sgstledger'), 
                                                  igstledger  :  loadGRNdetailsStore.getAt(j).get('tax_igstledcode'),  
                                                  igstledname :  loadGRNdetailsStore.getAt(j).get('tax_igstledger'), 
                                                  frtglledcode : loadGRNdetailsStore.getAt(j).get('grp_freight_code'),
      
						  
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
    height: 150,
    hidden:false,
    width: 750,
    columns:
    [
	{header: "Item .",   dataIndex: 'Item',sortable:true,width:160,align:'left'},
	{header: "CGST%",    dataIndex: 'cgstper',sortable:true,width:50,align:'left'},
	{header: "CGST AMT", dataIndex: 'cgstamt',sortable:true,width:80,align:'left'},
	{header: "SGST%",    dataIndex: 'sgstper',sortable:true,width:50,align:'left'},
	{header: "SGST AMT", dataIndex: 'sgstamt',sortable:true,width:80,align:'left'},
	{header: "IGST%",    dataIndex: 'igstper',sortable:true,width:50,align:'left'},
	{header: "IGST AMT", dataIndex: 'igstamt',sortable:true,width:80,align:'left'},
	{header: "INWARD AMT", dataIndex: 'inwardamt',sortable:true,width:90,align:'left',visible:false },
	{header: "P &F AMT", dataIndex: 'pfamt',sortable:true,width:90,align:'left',visible:false },
	{header: "Frt.Amt", dataIndex: 'frtamt',sortable:true,width:80,align:'left'},
	{header: "Value", dataIndex: 'value',sortable:true,width:80,align:'left'},
        {header: "rebate", dataIndex: 'rebate',sortable:true,width:80,align:'left'},
	{header: "Pur.Ledger", dataIndex: 'purledger',sortable:true,width:80,align:'left'},
	{header: "CGST.Ledger", dataIndex: 'cgstledger',sortable:true,width:80,align:'left'},
	{header: "SGST.Ledger", dataIndex: 'sgstledger',sortable:true,width:80,align:'left'},
	{header: "IGST.Ledger", dataIndex: 'igstledger',sortable:true,width:80,align:'left'},
	{header: "Frt. Ledger", dataIndex: 'frtparty',sortable:true,width:80,align:'left'},
	{header: "CGST.Ledger", dataIndex: 'cgstledname',sortable:true,width:80,align:'left'},
	{header: "SGST.Ledger", dataIndex: 'sgstledname',sortable:true,width:80,align:'left'},
	{header: "IGST.Ledger", dataIndex: 'igstledname',sortable:true,width:80,align:'left'},
	{header: "PUR. Ledger", dataIndex: 'purledname',sortable:true,width:200,align:'left'},
	{header: "FRT. Ledger", dataIndex: 'frtledname',sortable:true,width:200,align:'left'},
//	{header: "FrtGLLedger", dataIndex: 'frtglledcode',sortable:true,width:80,align:'left'},

	//{header: "FRTGLLedger", dataIndex: 'frtglledname',sortable:true,width:200,align:'left'},

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
    height: 180,
    hidden:false,
    width: 750,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});





var TrnStoresPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnStoresPayableUpdationPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
          {
            text: 'Save',
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


		    flxAccounts.getSelectionModel().selectAll();
		    var selrows = flxAccounts.getSelectionModel().getCount();
		    var sel1 = flxAccounts.getSelectionModel().getSelections();
		    for(var j=0;j<selrows;j++){
		        if ( sel1[j].data.ledtype == "P" && sel1[j].data.billno == "")
		        {    
                            Ext.Msg.alert('Updation','Party Bill Number connot be Empty.....');
                            gstSave="false";
		        }
		    }



                    if (cmbGRNNo.getRawValue()==0 || cmbGRNNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Updation','GRN no connot be Empty.....');
                        gstSave="false";
                    }
                    
                    else if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Updation','Grid should not be empty..');
        	                gstSave="false";
	                    }
          	    else if (flxAccounts.getStore().getCount()==0)
         	            {
        	                Ext.Msg.alert('Updation','Accounts Grid should not be empty..');
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
			        cnt: accData.length  ,
				griddetdn: Ext.util.JSON.encode(poupdData),     
			        cntdn: 0,

//                               savetype:gstFlag,
                                paymode   :"STR",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,
                             	voutype   :purtype,
                           	voutypedn :"", 
				vouno     :txtVouNo.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),
				grnno     :cmbGRNNo.getRawValue(),
				grndate   :Ext.util.Format.date(dtGRNNo.getValue(),"Y-m-d"),
				refno     :txtInvNo.getRawValue(),
				refdate   :Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                                narration : description,
				grnamount :txtGRNAmt.getValue(),
                                debitamount :0, 
                                creditdays : crdays,
  
				},
                              callback: function(options, success, response)
                              {

                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Stores GRN Updated in the Accounts No. " + obj['vno']);

                                    TrnStoresPayableUpdationPanel.getForm().reset();
                                   flxDetail.getStore().removeAll();
			            flxAccounts.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Updation Error- " + obj['vno']);                                                  
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
                    TrnStoresPayableUpdationPanel.getForm().reset();
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
                    TrnStoresPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 500,
                 height      : 240,
                 x           : 10,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[


			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
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
				          x           : 0,
				          y           :-5,
				          border      : false,
				          items: [txtVouNo]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 200,
				          x           : 200,
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
                          y           : 60,
                          border      : false,
                          items: [cmbGRNNo]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 60,
                          width       : 200,
                          x           : 250,
                          y           : 60,
                          border      : false,
                          items: [dtGRNNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 90,
                          border      : false,
                          items: [txtSupplier]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 120,
                          border      : false,
                          items: [txtInvNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 150,
                          border      : false,
                          items: [dtInvNo]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 180,
                          border      : false,
                          items: [txtGRNAmt]
                       },
  
                      ],

              }  ,

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 800,
                 height      : 240,
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
                         labelWidth  : 50, 
		         x           : 0,
		         y           : 170,
		         border      : false,
		         items:[txtCGSTAmt],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 50, 
		         x           : 150,
		         y           : 170,
		         border      : false,
		         items:[txtSGSTAmt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 50, 
		         x           : 300,
		         y           : 170,
		         border      : false,
		         items:[txtIGSTAmt],
		     },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 50, 
		         x           : 450,
		         y           : 170,
		         border      : false,
		         items:[txtPFAmt],
		     },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 50, 
		         x           : 600,
		         y           : 170,
		         border      : false,
		         items:[txtFrtAmt],
		     },
                 ]
              },   


              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 800,
                 height      : 250,
                 x           : 300,
                 y           : 260,
                 border      : true,
                 layout      : 'absolute',
                 items:[
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 800,
		         x           : 0,
		         y           : 0,
		         border      : false,
		         items:[flxAccounts],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 270,
		         y           : 190,
		         border      : false,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 500,
		         y           : 190,
		         border      : false,
		         items:[txttotCredit],
                       },
                ]
             }    
 
            ], 
 


});
 	


    function RefreshData() {
                TrnStoresPayableUpdationPanel.getForm().reset();
                flxDetail.getStore().removeAll();
	        flxAccounts.getStore().removeAll();
   		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadStoresgrnno',
                            compcode:Gincompcode,
                            finid   :GinFinid, 
                            grntype :purtype, 
	                   },
		   callback:function()
	                   {
    			    }
	        });
   

    }



    var TrnStoresPayableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'GENERAL - Purchases Accounting Screen',
        items       : TrnStoresPayableUpdationPanel,
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
//alert(Gincompcode);
//alert(GinFinid);
//alert(grntype);

                if (grntype == "P")
                   purtype = 'PSP';
                else     
                   purtype = 'PSC';
                RefreshData();
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
  
             }    
          } 
    });
       TrnStoresPayableUpdationWindow.show();  
});
