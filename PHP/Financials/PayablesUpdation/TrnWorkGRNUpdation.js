Ext.onReady(function(){
    Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var partyledcode = 0;
   var fm = Ext.form;
   var chkaup = 0;
   
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




    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "loadlastvouno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });



var LoadTDSDataStore = new Ext.data.Store({
      id: 'LoadTDSDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTDStype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'it_type'
      ]),
    });

var loadTDSdetails = new Ext.data.Store({
      id: 'loadTDSdetails',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ViewTDSDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'it_type','led_code', 'led_name','it_firm', 'it_company', 'it_individual', 'it_ledcode'
      ]),
    });

var LoadLedgerDataStore = new Ext.data.Store({
      id: 'LoadLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGLledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	  'led_code', 'led_name'
      ]),
    });



function calculateTDSValue(){
       var tdsamt = 0;
 
   
       if (txtTDSper.getValue() > 0 && txtTDSfor.getValue() > 0 )  {
           tdsamt = txtTDSfor.getValue() * txtTDSper.getRawValue()/100;   
       }

        txtTDSAmt.setValue(Ext.util.Format.number((tdsamt),'0.00'));
        flxaccupdation();
}




var lblledgers = new Ext.form.Label({
    fieldLabel  : 'SELECT GST LEDGERS',
    id          : 'lblledgers',
    labelStyle : "font-size:12px;font-weight:bold;",
    width       : 200
});

   var txtVouNo = new Ext.form.NumberField({
        fieldLabel  : 'Vou No.',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        width       :  80,
	readOnly : true,
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


   var txtInvNo = new Ext.form.NumberField({
        fieldLabel  : 'Inv No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  140,
	//readOnly : true,
        tabindex : 2
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
        fieldLabel  : 'Amt',
        id          : 'txtCGSTAmt',
        name        : 'txtCGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtSGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtSGSTAmt',
        name        : 'txtSGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtIGSTAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtIGSTAmt',
        name        : 'txtIGSTAmt',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });



   var txtFrtAmt1 = new Ext.form.NumberField({
        fieldLabel  : 'Frt. Amt',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtFrtAmt2 = new Ext.form.NumberField({
        fieldLabel  : 'Frt Amt2',
        id          : 'txtFrtAmt2',
        name        : 'txtFrtAmt2',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtLabour = new Ext.form.NumberField({
        fieldLabel  : 'Labour Charges',
        id          : 'txtLabour',
        name        : 'txtLabour',
        width       :  80,
	readOnly : true,
        tabindex : 2
   });

   var txtCGSTper = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtCGSTper',
        name        : 'txtCGSTper',
        width       :  40,
	readOnly : true,
        tabindex : 2
   });

   var txtSGSTper = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtSGSTper',
        name        : 'txtSGSTper',
        width       :  40,
	readOnly : true,
        tabindex : 2
   });

   var txtIGSTper = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtIGSTper',
        name        : 'txtIGSTper',
        width       :  40,
	readOnly : true,
        tabindex : 2
   });

   var txtValue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtValue',
        name        : 'txtValue',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtDiscount = new Ext.form.NumberField({
        fieldLabel  : 'Discount',
        id          : 'txtDiscount',
        name        : 'txtDiscount',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });
   var txtOthers = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtOthers',
        name        : 'txtOthers',
        width       :  100,
	readOnly : true,
        tabindex : 2
   });

   var txtTDSledname= new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtTDSledname',
        name        : 'txtTDSledname',
        width       :  250,
	readOnly : true,
        tabindex : 2
   });

   var txtTDSledcode= new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTDSledcode',
        name        : 'txtTDSledcode',
        width       :  50,
	readOnly : true,
        tabindex : 2
   });
   var txtTDSper = new Ext.form.NumberField({
        fieldLabel  : 'TDS % ',
        id          : 'txtTDSper',
        name        : 'txtTDSper',
        width       :  50,
        tabindex    : 2,
	enableKeyEvents: true,
	listeners:{
             keyup:function(){
                 calculateTDSValue();
             }
         }
   });

   var txtTDSfor= new Ext.form.NumberField({
        fieldLabel  : 'TDS for',
        id          : 'txtTDSfor',
        name        : 'txtTDSfor',
        width       :  80,
        tabindex    : 2,
	enableKeyEvents: true,
	listeners:{
             keyup:function(){
                 calculateTDSValue();
             }
         }
   });



   var txtTDSAmt = new Ext.form.NumberField({
        fieldLabel  : 'TDS Amt',
        id          : 'txtTDSAmt',
        name        : 'txtTDSAmt',
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

   var txtDescription = new Ext.form.TextField({
        fieldLabel  : 'Description',
        id          : 'txtDescription',
        name        : 'txtDescription',
        width       :  500,
        tabindex    : 2
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

        value: new Date()
   });



function grid_tot(){
        var gst =0;
        var cgst = 0;
        var sgst = 0;
        var igst = 0;	
        var inward = 0;	
        var frt = 0;	

	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            cgst=cgst+Number(sel[i].data.cgstamt);
            sgst=sgst+Number(sel[i].data.sgstamt);
            igst=igst+Number(sel[i].data.igstamt);
            inward=inward+Number(sel[i].data.inwardamt);
            frt=frt+Number(sel[i].data.frtamt);
         }
 
         txtCGSTAmt.setRawValue((Number(cgst*100/100)));
         txtSGSTAmt.setRawValue((Number(sgst*100/100)));
         txtIGSTAmt.setRawValue((Number(igst*100/100)));
         txtInwardAmt.setRawValue((Number(inward*100/100)));     
         txtFrtAmt.setRawValue((Number(frt*100/100)));

//calgst();

//get_pur_ledger()

//flxaccupdation();

}

function grid_tot2(){
        var dr = 0;
        var cr = 0;

	var Row= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            dr=dr+Number((sel[i].data.debit));
            cr=cr+Number((sel[i].data.credit));
         }
 
         txttotDebit.setRawValue(Ext.util.Format.number((dr*100/100),"0"));
         txttotCredit.setRawValue(Ext.util.Format.number((cr*100/100),"0"));
         flxDetail.getSelectionModel().clearSelections();

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
	
	/*var sm = flxDetail.getSelectionModel();
    var selrow = sm.getSelected();
    var selected_rows = flxDetail.getSelectionModel().getSelections();*/

        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : partyledcode,
	      ledname   : txtSupplier.getRawValue(),
	      debit     : "0",
              credit    : txtGRNAmt.getRawValue(),
              billno    : txtInvNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
              ledtype   : "P",
              total1    : txtGRNAmt.getRawValue(),
              }) 
        );

    
        for(var i=0;i<Row;i++)
        {
       	
            /*purlcode =  Number(selrow.get('debitledcode'));// Number(sel[i].data.debitledcode); 
            purlname =  selrow.get('debitledger'); //sel[i].data.debitledger; 
            puramt   =  selrow.get('taxable');//Number(sel[i].data.taxable); 

            cgstlcode     =  Number(selrow.get('cgstledcode'));//Number(sel[i].data.cgstledcode); 
            sgstlcode     =  Number(selrow.get('sgstledcode'));//Number(sel[i].data.sgstledcode); 
            igstlcode     =  Number(selrow.get('igstledcode'));//Number(sel[i].data.igstledcode); 


            cgstlname     =  selrow.get('cgstledger'); //sel[i].data.cgstledger; 
            sgstlname     =  selrow.get('sgstledger'); //sel[i].data.sgstledger; 
            igstlname     =  selrow.get('igstledger'); //sel[i].data.igstledger; 
  


            cgstamt   =  Number(selrow.get('cgstamt'));//Number(sel[i].data.cgstamt);
            sgstamt   =  Number(selrow.get('sgstamt'));//Number(sel[i].data.sgstamt);
            igstamt   =  Number(selrow.get('igstamt'));//Number(sel[i].data.igstamt);

            otheramt    =  Number(selrow.get('otheramt'));//Number(sel[i].data.otheramt);*/
            
            purlcode =   Number(sel[i].data.debitledcode); 
            purlname =  sel[i].data.debitledger; 
            puramt   =  Number(sel[i].data.taxable) +Number(sel[i].data.otheramt)  ; 

            cgstlcode     =  Number(sel[i].data.cgstledcode); 
            sgstlcode     =  Number(sel[i].data.sgstledcode); 
            igstlcode     =  Number(sel[i].data.igstledcode); 


            cgstlname     =  sel[i].data.cgstledger; 
            sgstlname     =  sel[i].data.sgstledger; 
            igstlname     =  sel[i].data.igstledger; 
  


            cgstamt   =  Number(sel[i].data.cgstamt);
            sgstamt   =  Number(sel[i].data.sgstamt);
            igstamt   =  Number(sel[i].data.igstamt);

            otheramt    =  Number(sel[i].data.otheramt);            

            tdslcode =  txtTDSledcode.getValue();
            tdslname =  txtTDSledname.getRawValue(); 
            tdsamt   =  txtTDSAmt.getValue(); 


//-- For Debit / Purchase Ledger
            dbamt = 0;
            k =0;

            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(puramt);
                if (Number(sel1[j].data.ledcode) == purlcode )
                {    
                   dbamt =  puramt + Number(sel1[j].data.debit);
                   sel1[j].set('debit', dbamt);
                   k =1;
                }
            }
            if (k==0 && puramt >0 &&  purlcode > 0 ) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : purlcode,
			      ledname   : purlname,
			      debit     : puramt,
			      credit    : "0",
                              billno    : "",     
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
            if (k==0 && cgstamt >0 &&  cgstlcode > 0  ) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : cgstlcode,
			      ledname   : cgstlname,
			      debit     : cgstamt,
			      credit    : "0",
                              billno    : "",     

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
            if (k==0 && sgstamt >0 &&  sgstlcode > 0 ) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : sgstlcode,
			      ledname   : sgstlname,
			      debit     : sgstamt,
			      credit    : "0",
                              billno    : "",     

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
            if (k==0 && igstamt >0 &&  igstlcode > 0 ) {
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : igstlcode,
			      ledname   : igstlname,
			      debit     : igstamt,
			      credit    : "0",
                              billno    : "",     

                              ledtype   : "G",
                        }) 
                        );
            } 
//--end


            tdslcode =  txtTDSledcode.getValue();
            tdslname =  txtTDSledname.getRawValue(); 
            tdsamt   =  txtTDSAmt.getValue(); 
 

      }  

//alert("wait");
//-- For TDS Ledger
            cramt = 0;
            k =0;



            var tamt1 = 0;
            
            if (tdsamt  > 0 &&  tdslcode > 0 ) {



            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
                if (Number(sel1[j].data.ledcode) == partyledcode )
                {    
                   tamt1 =  Number(sel1[j].data.total1) - tdsamt ;
                   sel1[j].set('total1', tamt1);
                   k =1;
                }
            }






			var RowCnt1 = flxAccounts.getStore().getCount() + 1;
			flxAccounts.getStore().insert(
			  flxAccounts.getStore().getCount(),
			  new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : partyledcode,
			      ledname   : txtSupplier.getRawValue(),
			      debit     : tdsamt,
			      credit    : 0,
                              billno    : txtInvNo.getRawValue(),
                              billdt    : Ext.util.Format.date(dtInvNo.getValue(),"Y-m-d"),
                              ledtype   : "P",
			      }) 
			);
                    var RowCnt1 = flxAccounts.getStore().getCount() + 1;
                    flxAccounts.getStore().insert(
                        flxAccounts.getStore().getCount(),
                        new dgrecord({
			      slno      : RowCnt1,
			      ledcode   : tdslcode,
			      ledname   : tdslname,
			      debit     : 0,
			      credit    : tdsamt,
                              billno    : "",     
                              ledtype   : "G",
                        }) 
                        );
            } 
//--end
 


            flxAccounts.getSelectionModel().selectAll();
            var selrows = flxAccounts.getSelectionModel().getCount();
            var sel1 = flxAccounts.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){
//alert(sel1[j].get('credit'));
                  sel1[j].set('debit',Number(sel1[j].get('debit')*100/100));
                  sel1[j].set('credit',Number(sel1[j].get('credit')*100/100));
            }   
           
            
  
  
            grid_tot2();

//            var diff = 0;
//            diff =  txttotDebit.getRawValue()-txttotCredit.getRawValue(); 
//            flxAccounts.getSelectionModel().selectAll();
//            var sel1 = flxAccounts.getSelectionModel().getSelections();           		
//            sel1[1].set('debit',sel1[1].get('debit')-diff);
  
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
'wogh_date','wogh_dept', 'wogh_sup_code', 'wogh_billno', 'wogh_billdate', 'wogh_wono', 'wogh_wodate','wogh_value', 'wogh_discount',
'wogh_other_amt', 'wogh_less_amt', 'wogh_cgst_amt', 'wogh_sgst_amt', 'wogh_igst_amt', 'wogh_frtamt1', 'wogh_frtamt2', 'wogh_totalamount',
'wogh_credit_days', 'wogh_frt1party','wogh_frt2party', 'woh_truck','wogt_itemcode', 'wogt_rate', 'wogt_qty', 'wogt_value', 'wogt_dis_per', 'wogt_dis_amt', 'wogt_other_amt', 'wogt_cgst_per', 'wogt_cgst_amt', 'wogt_sgst_per', 'wogt_sgst_amt', 'wogt_igst_per', 'wogt_igst_amt', 'wogt_amount', 'wogt_hsncode','sup_code','sup_refname','sup_led_code','dept_name','cgstcode', 'cgstname', 'sgstcode', 'sgstname', 'igstcode', 'igstname'

	

      ]),
    });


var LoadGRNDataStore = new Ext.data.Store({
      id: 'LoadGRNDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWOgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'grnno'
      ]),
    });

var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgerswo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadSGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgerswo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadIGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgerswo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
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


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
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


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
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



var cmbledger = new Ext.form.ComboBox({
        fieldLabel      : 'Debit Ledger',
        width           : 320,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){
alert("Hai");
           }
        } 
});


var cmbTDStype = new Ext.form.ComboBox({
        fieldLabel      : 'TDS Section',
        width           : 80,
        displayField    : 'it_type', 
        valueField      : 'it_type',
        hiddenName      : '',
        id              : 'cmbTDStype',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadTDSDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function(){

                   loadTDSdetails.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewTDSDetails',
                                    tdstype:cmbTDStype.getRawValue()
                                },
                           	callback:function()
				{
                                   txtTDSledname.setRawValue(loadTDSdetails.getAt(0).get('led_name'));
                                   txtTDSledcode.setRawValue(loadTDSdetails.getAt(0).get('led_code'));
                                   txtTDSper.setRawValue(loadTDSdetails.getAt(0).get('it_company'));
                                   calculateTDSValue();

                                }
                   });
           }
        } 
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
                   flxAccounts.getStore().removeAll();
                   flxDetail.getStore().removeAll();
                   loadGRNdetailsStore.load({
				url: 'clsPayableUpdation.php',
				params: {
				    task: 'ViewWOGrnDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    grnno:cmbGRNNo.getValue()
                                },
                           	callback:function()
				{

                                    dtGRNNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('wogh_date'),"d-m-Y"));
                                    txtSupplier.setRawValue(loadGRNdetailsStore.getAt(0).get('sup_refname'));

                                    txtInvNo.setRawValue(loadGRNdetailsStore.getAt(0).get("wogh_billno"));
                                    dtInvNo.setRawValue(Ext.util.Format.date(loadGRNdetailsStore.getAt(0).get('wogh_billdate'),"d-m-Y"));
                                    txtGRNAmt.setRawValue(loadGRNdetailsStore.getAt(0).get('wogh_totalamount'));

                                    partyledcode = loadGRNdetailsStore.getAt(0).get('sup_led_code');
 
// alert(loadGRNdetailsStore.getCount());
                                    var cnt=loadGRNdetailsStore.getCount();
                                    var purledger = 0;
                                    

                                    var taxableamt =0;
                                    var datafind = 0;     
                                    var val = 0;    
                                    if(cnt>0)
				    {                         
                                       for(var j=0; j<cnt; j++)
                                       {
                                                datafind = 0;     
						taxableamt = Number(loadGRNdetailsStore.getAt(j).get('wogt_value'))-Number(loadGRNdetailsStore.getAt(j).get('wogt_dis_amt'));
                                                var cgst = loadGRNdetailsStore.getAt(j).get('wogt_cgst_per');

						flxDetail.getSelectionModel().selectAll();
						var selrows = flxDetail.getSelectionModel().getCount();
						var sel = flxDetail.getSelectionModel().getSelections();
                                                for (i=0;j<selrows;i++){
							if (Number(sel[i].data.cgstper) == cgst)
							{
							    taxableamt = taxableamt + Number(sel[i].data.taxable);
							    sel[i].set('taxable', taxableamt);
							    datafind = 1;
							}
					        } 
                                                if (datafind == 0)
                                            {

		                             flxDetail.getStore().insert(
		                             flxDetail.getStore().getCount(),
                	                     new dgrecord({
						  taxable   : taxableamt,
						  cgstper   : loadGRNdetailsStore.getAt(j).get('wogt_cgst_per'),
						  cgstamt   : loadGRNdetailsStore.getAt(j).get('wogt_cgst_amt'),
						  sgstper   : loadGRNdetailsStore.getAt(j).get('wogt_sgst_per'),
						  sgstamt   : loadGRNdetailsStore.getAt(j).get('wogt_sgst_amt'),
						  igstper   : loadGRNdetailsStore.getAt(j).get('wogt_igst_per'),
						  igstamt   : loadGRNdetailsStore.getAt(j).get('wogt_igst_amt'),
						  otheramt  : loadGRNdetailsStore.getAt(j).get('wogt_other_amt'),
						  totalamt  : loadGRNdetailsStore.getAt(j).get('wogt_amount'),	
                                                  cgstledcode : loadGRNdetailsStore.getAt(j).get('cgstcode'),
                                                  cgstledger  : loadGRNdetailsStore.getAt(j).get('cgstname'),
                                                  sgstledcode : loadGRNdetailsStore.getAt(j).get('sgstcode'),	 	  
                                                  sgstledger  : loadGRNdetailsStore.getAt(j).get('sgstname'),
                                                  igstledcode : loadGRNdetailsStore.getAt(j).get('igstcode'),	 	  	 	  
                                                  igstledger  : loadGRNdetailsStore.getAt(j).get('igstname'),


                                   		})
                                             );
}


                                       }
                                    }  
//                                  GSTupdation();  
				  flxaccupdation();
                                }
                   }); flxDetail.getSelectionModel().clearSelections();

           }
        } 
});

/*
function GSTupdation() {

   var Row= flxDetail.getStore().getCount();
   flxDetail.getSelectionModel().selectAll();
   var sel=flxDetail.getSelectionModel().getSelections();
   for(var i=0;i<Row;i++)
   {
      cgstper =   Number(sel[i].data.cgstper); 
      sgstper =   Number(sel[i].data.sgstper); 
      igstper =   Number(sel[i].data.igstper); 
      alert("cgstper");
      LoadCGSTLedgerDataStore.load({
                url: 'clsPayableUpdation.php',
                params:
                {
                    task: "loadCGSTledgerswo",
                    gstper  : cgstper,
                },
                callback: function(){
                   alert(LoadCGSTLedgerDataStore.getAt(0).get("led_name"));
                   sel[i].set('cgstledcode', LoadCGSTLedgerDataStore.getAt(0).get("led_code"));
                   sel[i].set('cgstledger' , LoadCGSTLedgerDataStore.getAt(0).get("led_name"));
                }
      });

      LoadCGSTLedgerDataStore.load({
                url: 'clsPayableUpdation.php',
                params:
                {
                    task: "loadSGSTledgerswo",
                    gstper  : sgstper,
                },
                callback: function(){
                   alert(LoadCGSTLedgerDataStore.getAt(0).get("led_name"));
                   sel[i].set('sgstledcode', LoadSGSTLedgerDataStore.getAt(0).get("led_code"));
                   sel[i].set('sgstledger' , LoadSGSTLedgerDataStore.getAt(0).get("led_name"));
                }
      });
      LoadCGSTLedgerDataStore.load({
                url: 'clsPayableUpdation.php',
                params:
                {
                    task: "loadIGSTledgerswo",
                    gstper  : igstper,
                },
                callback: function(){
                   alert(LoadCGSTLedgerDataStore.getAt(0).get("led_name"));
                   sel[i].set('igstledcode', LoadIGSTLedgerDataStore.getAt(0).get("led_code"));
                   sel[i].set('igstledger' , LoadIGSTLedgerDataStore.getAt(0).get("led_name"));
                }
      });
        
   }
    
}

*/


var dgrecord = Ext.data.Record.create([]);

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:10,
    height: 120,
    hidden:false,
    width: 800,
    columns:
    [
	{header: "Taxable",   dataIndex: 'taxable',sortable:true,width:60,align:'left'},
	{header: "CGST%",    dataIndex: 'cgstper',sortable:true,width:50,align:'left'},
	{header: "CGST AMT", dataIndex: 'cgstamt',sortable:true,width:80,align:'left'},
	{header: "SGST%",    dataIndex: 'sgstper',sortable:true,width:50,align:'left'},
	{header: "SGST AMT", dataIndex: 'sgstamt',sortable:true,width:80,align:'left'},
	{header: "IGST%",    dataIndex: 'igstper',sortable:true,width:50,align:'left'},
	{header: "IGST AMT", dataIndex: 'igstamt',sortable:true,width:80,align:'left'},
	{header: "OTHER AMT", dataIndex: 'otheramt',sortable:true,width:80,align:'left'},
	{header: "TOTAL AMT", dataIndex: 'totalamt',sortable:true,width:80,align:'left'},
	{header: "Debit Ledger Code", dataIndex: 'debitledcode',sortable:true,width:80,align:'left'},
	{header: "Debit Ledger", dataIndex: 'debitledger',sortable:true,width:250,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: LoadLedgerDataStore,
		displayField: 'led_name',
		valueField: 'led_name',
		hiddenName: 'led_name',
	   	id: 'cmbledger',
	   	typeAhead: true,
	    	mode: 'local',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowblank: true,
	    	listeners: {
	        select: function () {
/*
			var recordIndex = LoadLedgerDataStore.find('led_name', this.getValue());
			flxDetail.getSelectionModel().clearSelections();
			var sel =0;
			sel = flxDetail.getSelectionModel().getSelections();
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var idx = flxDetail.getStore().indexOf(selrow);
			ledcode = LoadLedgerDataStore.getAt(recordIndex).get('led_code');
			sel[idx].set('debitledcode', ledcode);
*///flxDetail.getSelectionModel().clearSelections();
			var recordIndex = LoadLedgerDataStore.find('led_name', this.getValue());
			var sel = flxDetail.getSelectionModel().getSelections();
			ledcode = LoadLedgerDataStore.getAt(recordIndex).get('led_code');
			sel[0].set('debitledcode', ledcode);
	/*var recordIndex = LoadLedgerDataStore.find('led_name', this.getValue());
	var sel = flxDetail.getSelectionModel().getSelections();
//var row =  flxDetail.store.getSelectedRows();
//alert(row);
seccode = LoadLedgerDataStore.getAt(recordIndex).get('led_code');
	sel[row].set('debitledcode', seccode);


alert(selrow.get('taxable'));*/


	                }

	        }
	}),

        },
        {header: "CGST Ledger Code", dataIndex: 'cgstledcode',sortable:true,width:80,align:'left'},
	{header: "CGST.Ledger", dataIndex: 'cgstledger',sortable:true,width:250,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: LoadCGSTLedgerDataStore,
		displayField: 'led_name',
		valueField: 'led_name',
		hiddenName: 'led_name',
	   	id: 'cmbCGSTledger',
	   	typeAhead: true,
	    	mode: 'local',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowblank: true,
	    	listeners: {
	        select: function () {
			      	        LoadLedgerDataStore.removeAll();
           	LoadLedgerDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadGLledgers"
                   },

           	});  
			var recordIndex = LoadCGSTLedgerDataStore.find('led_name', this.getValue());
			var sel = flxDetail.getSelectionModel().getSelections();
			ledcode = LoadCGSTLedgerDataStore.getAt(recordIndex).get('led_code');
			sel[0].set('cgstledcode', ledcode);
	        		   }
	    		}
		}),
        },
         {header: "SGST Ledger Code", dataIndex: 'sgstledcode',sortable:true,width:80,align:'left'},
	{header: "SGST.Ledger", dataIndex: 'sgstledger',sortable:true,width:250,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: LoadSGSTLedgerDataStore,
		displayField: 'led_name',
		valueField: 'led_name',
		hiddenName: 'led_name',
	   	id: 'cmbSGSTledger',
	   	typeAhead: true,
	    	mode: 'local',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowblank: true,
	    	listeners: {
	        select: function () {
			var recordIndex = LoadSGSTLedgerDataStore.find('led_name', this.getValue());
			var sel = flxDetail.getSelectionModel().getSelections();
			ledcode = LoadSGSTLedgerDataStore.getAt(recordIndex).get('led_code');
			sel[0].set('sgstledcode', ledcode);
	        		   }
	    		}
		}),

        },
        {header: "IGST Ledger Code", dataIndex: 'igstledcode',sortable:true,width:80,align:'left'},
	{header: "IGST.Ledger", dataIndex: 'igstledger',sortable:true,width:250,align:'left',  
		editor: new fm.ComboBox({
		allowBlank: false,
		store: LoadIGSTLedgerDataStore,
		displayField: 'led_name',
		valueField: 'led_name',
		hiddenName: 'led_name',
	   	id: 'cmbIGSTledger',
	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowblank: true,
	    	listeners: {
	        select: function () {
			var recordIndex = LoadLedgerDataStore.find('led_name', this.getValue());
			var sel = flxDetail.getSelectionModel().getSelections();
			ledcode = LoadLedgerDataStore.getAt(recordIndex).get('led_code');
			sel[0].set('igstledcode', ledcode);
	        		   }
	    		}
		}),

        },

    ],
    store: [],
    listeners:{	

          click: function(){
          
          
          }
    }

});


var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 150,
    hidden:false,
    width: 700,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:300,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:100,align:'left'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:100,align:'left'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "total1",      dataIndex: 'total1',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:50,align:'left'},
    ],
    store: [],
    listeners:{	
    click : function (){
    flxaccupdation();
    }
    }

});

var tdsyn = "N";

var optTDSyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'TDS',
    fieldLabel: '',
    layout : 'hbox',
    width:160,
    height:55,
    x:10,
    y:10,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optTDSyn',
        items: [
            {boxLabel: 'YES', name: 'optTDSyn', id:'opttdsyes', inputValue: 1,checked:true,
                listeners:{
		    check:function(rb,checked){
		       if(checked==true){
		           gstcalc = "G";
		       }
		    }
                }
            },
            {boxLabel: 'NO', name: 'optTDSyn', id:'opttdsno', inputValue: 2,
                listeners:{
                    check:function(rb,checked){
                        if(checked==true){
                           gstcalc = "P";
                        } 
                   }
                } 
           }
        ]
    }
    ]
});



var TrnWOGPayableUpdationPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PAYABLE UPDATION',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnWOGPayableUpdationPanel',
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
		        //if ( sel1[j].data.ledtype == "P")
		        {    
                            alert('Updation','Party Bill Number cannot be Empty.....');
                            gstSave="false";
		        }
		    }
                    if (cmbGRNNo.getRawValue()==0 || cmbGRNNo.getRawValue()=="")
                    {
                        alert('Updation','Document no connot be Empty.....');
                        gstSave="false";
                    }
                    
           	    else if (flxAccounts.getStore().getCount()==0)
        	            {
        	                alert('Updation','Grid should not be empty..');
        	                gstSave="false";
	                    }
                    else if (txtDescription.getRawValue() == "" )
                    {
                        Ext.Msg.alert('Updation','Enter Descripton.....');
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
                                paymode   :"WG",
                             	compcode  :Gincompcode,
				finyear   :GinFinid,
                             	voutype   :"WG",
                              	voutypedn :"",

				vouno     :txtVouNo.getRawValue(),
				voudate   :Ext.util.Format.date(dtVouNo.getValue(),"Y-m-d"),

				grnno     : cmbGRNNo.getRawValue(),
				grnate    : Ext.util.Format.date(dtGRNNo.getValue(),"Y-m-d"),

				refno     : cmbGRNNo.getRawValue(),
				refdate   : Ext.util.Format.date(dtGRNNo.getValue(),"Y-m-d"),
                                narration : txtDescription.getRawValue(),
                   		grnamount : txtGRNAmt.getValue(),
                                debitamount :0,

                                tdssection: cmbTDStype.getRawValue(),
                                tdsper    : txtTDSper.getValue(),
                                tdsfor    : txtTDSfor.getValue(),
                                tdsamt    : txtTDSAmt.getValue(),

                       
              


				},
                              callback: function(options, success, response)
                              {
//alert("Test");
//alert(Reels);
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Work Order GRN Saved  -" + obj['vno']);
//                                    RefreshData();
                                    TrnWOGPayableUpdationPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Work Order Not Saved- " + obj['vno']);                                                  
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
                    TrnWOGPayableUpdationPanel.getForm().reset();
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
                    TrnWOGPayableUpdationWindow.hide();
                }
            }
        }]
    },
     items: [
              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 1315,
                 height      : 200,
                 x           : 10,
                 y           : 10,
                 border      : true,
                 layout      : 'absolute',
                 items:[

			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 450,
				 height      : 45,
				 x           : 10,
				 y           : 0,
				 border      : true,
				 layout      : 'absolute',
				 items:[
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 80,
				          width       : 200,
				          x           : 0,
				          y           :-10,
				          border      : false,
				          items: [txtVouNo]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 200,
				          x           : 220,
				          y           : -10,
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
                          y           : 40,
                          border      : false,
                          items: [cmbGRNNo]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 50,
                          width       : 200,
                          x           : 250,
                          y           : 40,
                          border      : false,
                          items: [dtGRNNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 500,
                          x           : 0,
                          y           : 70,
                          border      : false,
                          items: [txtSupplier]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 300,
                          x           : 0,
                          y           : 100,
                          border      : false,
                          items: [txtInvNo]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 50,
                          width       : 400,
                          x           : 250,
                          y           : 100,
                          border      : false,
                          items: [dtInvNo]
                       },

                       flxDetail,

                      { 
		          xtype       : 'fieldset',
		          title       : '',
		          labelWidth  : 100,
		          width       : 700,
		          x           : 0,
		          y           : 130,
		          border      : false,
		          items: [txtDescription]
		       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 700,
                          y           : 130,
                          border      : false,
                          items: [txtGRNAmt]
                       },


/*
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 125,
                          border      : false,
                          items: [txtValue]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 155,
                          border      : false,
                          items: [txtDiscount]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 185,
                          border      : false,
                          items: [txtOthers]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 215,
                          border      : false,
                          items: [txtFrtAmt1]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 260,
                          x           : 0,
                          y           : 245,
                          border      : false,
                          items: [txtFrtAmt2]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 300,
                          width       : 180,
                          x           : 300,
                          y           : 250,
                          border      : false,
                          items: [lblledgers]
                       },



                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 180,
                          x           : 0,
                          y           : 275,
                          border      : false,
                          items: [txtCGSTper]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 260,
                          x           : 150,
                          y           : 275,
                          border      : false,
                          items: [txtCGSTAmt]
                       },


                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 400,
                          x           : 250,
                          y           : 275,
                          border      : false,
                          items: [cmbCGSTledger]
                       },
                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 180,
                          x           : 0,
                          y           : 305,
                          border      : false,
                          items: [txtSGSTper]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 260,
                          x           : 150,
                          y           : 305,
                          border      : false,
                          items: [txtSGSTAmt]
                       },
                    { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 400,
                          x           : 250,
                          y           : 305,
                          border      : false,
                          items: [cmbSGSTledger]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 180,
                          x           : 0,
                          y           : 335,
                          border      : false,
                          items: [txtIGSTper]
                       },

                       { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 200,
                          x           : 150,
                          y           : 335,
                          border      : false,
                          items: [txtIGSTAmt]
                       },
                    { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 30,
                          width       : 400,
                          x           : 250,
                          y           : 335,
                          border      : false,
                          items: [cmbIGSTledger]
  
                     },
*/
  
                      ],

              }  ,

              {  xtype       : 'fieldset',
                 title       : '',
                 width       : 680,
                 height      : 290,
                 x           : 300,
                 y           : 220,
                 border      : true,
                 layout      : 'absolute',
                 items:[
			optTDSyn,
		                {  xtype       : 'fieldset',
	 			 title       : 'TDS Details',
				 width       : 470,
				 height      : 100,
				 x           : 180,
				 y           : 0,
				 border      : true,
				 layout      : 'absolute',
				 items:[ 
                     
				      {  xtype       : 'fieldset',
					 title       : '',
                                         labelWidth  : 80,
					 width       : 210,
					 x           : -10,
					 y           : -10,
					 border      : false,
					 items:[cmbTDStype],
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 20,
				          width       : 450,
				          x           : 160,
				          y           : -10,
				          border      : false,
				          items: [txtTDSledname]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 20,
				          width       : 450,
				          x           : 450,
				          y           : 30,
				          border      : false,
				          items: [txtTDSledcode]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 80,
				          width       : 160,
				          x           : -10,
				          y           : 30,
				          border      : false,
				          items: [txtTDSper]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 50,
				          width       : 260,
				          x           : 140,
				          y           : 30,
				          border      : false,
				          items: [txtTDSfor]
				       },
				       { 
				          xtype       : 'fieldset',
				          title       : '',
				          labelWidth  : 60,
				          width       : 260,
				          x           : 280,
				          y           : 30,
				          border      : false,
				          items: [txtTDSAmt]
				       },
                                 ],
                                },  




                     
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 800,
		         x           : 0,
		         y           : 100,
		         border      : false,
		         items:[flxAccounts],
                       },



                ]
             }    ,


	                {  xtype       : 'fieldset',
 			 title       : '',
			 width       : 300,
			 height      : 110,
			 x           : 1000,
			 y           : 300,
			 border      : true,
			 layout      : 'absolute',
			 items:[ 
			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 x           : 0,
				 y           : 0,
				 border      : false,
				 items:[txttotDebit],
		               },
			      {  xtype       : 'fieldset',
				 title       : '',
				 width       : 400,
				 x           : 0,
				 y           : 50,
				 border      : false,
				 items:[txttotCredit],
		               },
                             ] 
                       }, 
 
            ], 
 


});
 	


    function RefreshData() {

                                    TrnWOGPayableUpdationPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    flxAccounts.getStore().removeAll();

                 VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "loadlastvouno",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'WG'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("WG"+VouNodatastore.getAt(0).get('con_value'));

                        }
                    });
    }



    var TrnWOGPayableUpdationWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 28,
        title       : 'WORK ORDER GRN - Accounting Screen',
        items       : TrnWOGPayableUpdationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFFE0"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
             show:function(){

		LoadGRNDataStore.removeAll();
		LoadGRNDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
	                    task: 'loadWOgrnno',
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
		       task: "loadGLledgers"
                   },
		   callback:function()
	          {
                  } 
           	});  
  
      	        LoadTDSDataStore.removeAll();
           	LoadTDSDataStore.load({
                   url: 'clsPayableUpdation.php',
                   params: {
		       task: "loadTDStype"
                   },
		   callback:function()
	          {
                  } 
           	});  
                 VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "loadlastvouno",
                            finyear  : GinFinid,
                            compcode : Gincompcode,
                            voutype  : 'WG'
                        },
                        callback: function(){
                            txtVouNo.setRawValue("WG"+VouNodatastore.getAt(0).get('con_value'));

                        }
                    });
  

             }    
          } 
    });
       TrnWOGPayableUpdationWindow.show();  
});
