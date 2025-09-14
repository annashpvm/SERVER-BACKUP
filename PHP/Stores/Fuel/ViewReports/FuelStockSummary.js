Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode  = localStorage.getItem('gincompcode');
   var GinFinid     = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate   = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var fitemcode = 0;
   var fitemname = "";

    var printtype = "PDF";
 var opening_qty = 0;
 var receipt_qty = 0;
 var issue_qty   = 0;
 var closing_qty = 0;

 var opening_value = 0;
 var receipt_value = 0;
 var issue_value   = 0;
 var closing_value = 0;

 var loadGRNDataStore = new Ext.data.Store({
      id: 'loadGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParty_Item_GRNwise_Arrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_sup_code','rect_item_code'
]),
    });


var lblParty = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty',
        name        : 'lblParty',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

var lblParty2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty2',
        name        : 'lblParty2',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblItem = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblItem',
        name        : 'lblItem',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblQty = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblQty',
        name        : 'lblQty',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblValue = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblValue',
        name        : 'lblValue',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblOpening = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblOpening',
        name        : 'lblOpening',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });




var lblReceipt = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblReceipt',
        name        : 'lblReceipt',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblIssue = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblIssue',
        name        : 'lblIssue',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblClosing = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblClosing',
        name        : 'lblClosing',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



 var loadItemClosingStockDataStore = new Ext.data.Store({
      id: 'loadItemClosingStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemwiseStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['company_name', 'itmh_name', 'itmh_code', 'itmt_opqty', 'itmt_opvalue', 'op_rect_qty', 'op_rect_val', 'op_recret_qty', 'op_recret_val', 'op_is_qty', 'op_is_value', 'op_ir_qty', 'op_ir_value', 'op_sale_qty', 'op_sale_value', 'rect_qty', 'rect_val', 'recret_qty', 'recret_val', 'is_qty', 'is_value', 'ir_qty','ir_value', 'sale_qty', 'sale_value']),
    });


 var loadItem_LedgerDataStore = new Ext.data.Store({
      id: 'loadItem_LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItem_PartywiseArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['trntype', 'docdate', 'docno', 'supname', 'itemname', 'itmh_code', 'qty', 'itemvalue', 'itemrate' , 'costvalue', 'costrate' ]),
    });



function grid_tot(){

        var topwt = 0;
        var topval = 0;

        var trecptwt = 0;
        var trecptval = 0;

        var tissuewt = 0;
        var tissueval = 0;

        var tclosewt = 0;
        var tcloseval = 0;

         txttotOpeningQty.setValue('');
         txttotOpeningValue.setValue('');
         txttotRecptQty.setValue('');
         txttotRecptValue.setValue('');
         txttotIssueQty.setValue('');
         txttotIssueValue.setValue('');
         txttotClosingQty.setValue('');
         txttotClosingValue.setValue('');
        var Row= flxItems.getStore().getCount();
        flxItems.getSelectionModel().selectAll();
        var sel=flxItems.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.cloqty) > 0)
              {
		      topwt =topwt+Number(sel[i].data.opqty);
		      topval=topval+Number(sel[i].data.opvalue);
		      trecptwt =trecptwt+Number(sel[i].data.recptqty);
		      trecptval=trecptval+Number(sel[i].data.recptvalue);
		      tissuewt =tissuewt+Number(sel[i].data.issueqty);
		      tissueval=tissueval+Number(sel[i].data.issuevalue);
		      tclosewt =tclosewt+Number(sel[i].data.cloqty);
		      tcloseval=tcloseval+Number(sel[i].data.clovalue);

              }
         }




         txttotOpeningQty.setValue(topwt);
         txttotOpeningValue.setValue(topval);
         txttotRecptQty.setValue(trecptwt);
         txttotRecptValue.setValue(trecptval);
         txttotIssueQty.setValue(tissuewt);
         txttotIssueValue.setValue(tissueval);

         txttotClosingQty.setValue(tclosewt);
         txttotClosingValue.setValue(tcloseval);



}


function grid_tot2(){

        var twt = 0;
        var tval = 0;




}

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});







   var txttotOpeningQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningQty',
        name        : 'txttotOpeningQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotOpeningValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningValue',
        name        : 'txttotOpeningValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txttotRecptQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptQty',
        name        : 'txttotRecptQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotRecptValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptValue',
        name        : 'txttotRecptValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotIssueQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueQty',
        name        : 'txttotIssueQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotIssueValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueValue',
        name        : 'txttotIssueValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotClosingQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingQty',
        name        : 'txttotClosingQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotClosingValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingValue',
        name        : 'txttotClosingValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txtItemOpeningQty = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtItemOpeningQty',
        name        : 'txtItemOpeningQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemOpeningValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemOpeningValue',
        name        : 'txtItemOpeningValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtItemRecptQty = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txtItemRecptQty',
        name        : 'txtItemRecptQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemRecptValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemRecptValue',
        name        : 'txtItemRecptValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemIssueQty = new Ext.form.NumberField({
        fieldLabel  : 'Issues',
        id          : 'txtItemIssueQty',
        name        : 'txtItemIssueQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemIssueValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemIssueValue',
        name        : 'txtItemIssueValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemClosingQty = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtItemClosingQty',
        name        : 'txtItemClosingQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemClosingValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemClosingValue',
        name        : 'txtItemClosingValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
        width : 110   
    });



function ProcessMainaData()
{

	flxItems.getStore().removeAll();
        flxLedger.getStore().removeAll();
	loadItemClosingStockDataStore.removeAll();
	loadItemClosingStockDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadItemwiseStockSummary',
                compcode:Gincompcode,
                finid:GinFinid,
                finstartdate : Ext.util.Format.date(finstartdate,"Y-m-d"), 
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   var cnt=loadItemClosingStockDataStore.getCount();
                   if(cnt>0)
                   {    
                     for(var j=0; j<cnt; j++)
                     { 
                         opening_qty = Number(loadItemClosingStockDataStore.getAt(j).get('itmt_opqty')) +
Number(loadItemClosingStockDataStore.getAt(j).get('op_rect_qty')) -  
Number(loadItemClosingStockDataStore.getAt(j).get('op_recret_qty')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_is_qty')) + 
Number(loadItemClosingStockDataStore.getAt(j).get('op_ir_qty')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_sale_qty'));

                         opening_value = Number(loadItemClosingStockDataStore.getAt(j).get('itmt_opvalue')) +
Number(loadItemClosingStockDataStore.getAt(j).get('op_rect_val')) -  
Number(loadItemClosingStockDataStore.getAt(j).get('op_recret_val')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_is_value')) + 
Number(loadItemClosingStockDataStore.getAt(j).get('op_ir_value')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_sale_value'));

                         opening_rate = 0;
                         if (Number(opening_value) > 0 &&  Number(opening_qty) > 0)
                             opening_rate = Number(opening_value)/Number(opening_qty);

                         receipt_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('rect_qty')) -
Number(loadItemClosingStockDataStore.getAt(j).get('recret_qty'));

                         receipt_value  = Number(loadItemClosingStockDataStore.getAt(j).get('rect_val')) -
Number(loadItemClosingStockDataStore.getAt(j).get('recret_val'));

                         receipt_rate = 0;
                         if (Number(receipt_value) > 0 &&  Number(receipt_qty) > 0)
                             receipt_rate = Number(receipt_value)/Number(receipt_qty);





                         issue_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('is_qty')) -
Number(loadItemClosingStockDataStore.getAt(j).get('ir_qty'));

                         issue_value  = Number(loadItemClosingStockDataStore.getAt(j).get('is_value')) -
Number(loadItemClosingStockDataStore.getAt(j).get('ir_value'));

                         issue_rate = 0;
                         if (Number(issue_value) > 0 &&  Number(issue_qty) > 0)
                             issue_rate = Number(issue_value)/Number(issue_qty);




                         closing_qty   = Number(opening_qty) + Number(receipt_qty) - Number(issue_qty) ;
                         closing_value = Number(opening_value) + Number(receipt_value) - Number(issue_value) ;

                         closing_rate = 0;
                         if (Number(closing_value ) > 0 &&  Number(closing_qty) > 0)
                             closing_rate = Number(closing_value)/Number(closing_qty);






                        opening_qty  = Ext.util.Format.number(Number(opening_qty),"0.000");
                        receipt_qty  = Ext.util.Format.number(Number(receipt_qty),"0.000");
                        issue_qty    = Ext.util.Format.number(Number(issue_qty),"0.000");
                        closing_qty  = Ext.util.Format.number(Number(closing_qty),"0.000");

                        opening_value = Ext.util.Format.number(Number(opening_value),"0.00");
                        receipt_value = Ext.util.Format.number(Number(receipt_value),"0.00");
                        issue_value   = Ext.util.Format.number(Number(issue_value),"0.00");
                        closing_value = Ext.util.Format.number(Number(closing_value),"0.00");

                        opening_rate = Ext.util.Format.number(Number(opening_rate),"0.00");
                        receipt_rate = Ext.util.Format.number(Number(receipt_rate),"0.00");
                        issue_rate   = Ext.util.Format.number(Number(issue_rate),"0.00");
                        closing_rate = Ext.util.Format.number(Number(closing_rate),"0.00");

                         var RowCnt    = flxItems.getStore().getCount() + 1; 
                         flxItems.getStore().insert(
	                    flxItems.getStore().getCount(),
                            new dgrecord({
                                itmh_name   : loadItemClosingStockDataStore.getAt(j).get('itmh_name'),
                                itmh_code   : loadItemClosingStockDataStore.getAt(j).get('itmh_code'),
                                opqty       : opening_qty,
                                opvalue     : opening_value,
                                oprate      : opening_rate,
                                recptqty    : receipt_qty,
                                recptvalue  : receipt_value,
                                recptrate   : receipt_rate,
                                issueqty    : issue_qty,
                                issuevalue  : issue_value,
                                issuerate   : issue_rate,
                                cloqty      : closing_qty,
                                clovalue    : closing_value,
                                clorate     : closing_rate,
                            })
                        );  

                     }
                   }     
                   grid_tot();
		}
	    });
}


function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 


        var dt_today = new Date();    


/*
 
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(m1);
        find_dates(m1);


     mdays = Ext.util.Format.date(new Date(),"d");
*/

//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;

//        monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

//    alert(monthstartdate);  
//    alert(monthenddate);  
      ProcessMainaData();    

     
}


     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
   //               lblDetail1.setText('');
//                  lblDetail2.setText('');
            loadItem_LedgerDataStore.removeAll();
	    loadGRNDataStore.removeAll();
                  loadItemClosingStockDataStore.removeAll();
                  loadItemClosingStockDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });


var dgrecord = Ext.data.Record.create([]);
var flxItems = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 370,
    hidden:false,
    width: 1350,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Item Name"  ,  dataIndex: 'itmh_name',sortable:false,width:210,align:'left', menuDisabled: true },
        {header: "Item Code"  ,  dataIndex: 'itmh_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "OP Qty"    , dataIndex: 'opqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "OP VALUE" , dataIndex: 'opvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "OP RATE" , dataIndex: 'oprate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "RECPT Qty"    , dataIndex: 'recptqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "RECPT VALUE" , dataIndex: 'recptvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "RECPT RATE" , dataIndex: 'recptrate',sortable:false,width:80,align:'right', menuDisabled: true},


        {header: "ISS Qty"    , dataIndex: 'issueqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "ISS VALUE" , dataIndex: 'issuevalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "ISS RATE" , dataIndex: 'issuerate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "CLO Qty"    , dataIndex: 'cloqty',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "CLO VALUE" , dataIndex: 'clovalue',sortable:false,width:115,align:'right', menuDisabled: true},
        {header: "CLO RATE" , dataIndex: 'clorate',sortable:false,width:80,align:'right', menuDisabled: true},


    ],
    store:[],
    listeners:{	

            'cellDblclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

            fitemcode  = selrow.get('itmh_code');    
            fitemname = selrow.get('itmh_name');
            itemname = selrow.get('itmh_name');

            txtItemOpeningQty.setValue(selrow.get('opqty')); 
            txtItemOpeningValue.setValue(selrow.get('opvalue')); 
            txtItemRecptQty.setValue(selrow.get('recptqty')); 
            txtItemRecptValue.setValue(selrow.get('recptvalue')); 
            txtItemIssueQty.setValue(selrow.get('issueqty')); 
            txtItemIssueValue.setValue(selrow.get('issuevalue')); 
            txtItemClosingQty.setValue(selrow.get('cloqty')); 
            txtItemClosingValue.setValue(selrow.get('clovalue')); 

                
            tabOverall.setActiveTab(1);
//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  : " + itemname);


            flxLedger.getStore().removeAll();

	    loadItem_LedgerDataStore.removeAll();
	    loadItem_LedgerDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadItem_ledger_trans',
		compcode:Gincompcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                itemcode:selrow.get('itmh_code') ,  
		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });

     
    }
 }
});


var flxLedger = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 450,
    hidden:false,
    width: 1000,
 //   id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Type"  ,  dataIndex: 'trntype',sortable:false,width:60,align:'left', menuDisabled: true },
        {header: "Date"  ,  dataIndex: 'docdate',sortable:false,width:70,align:'center', menuDisabled: true},
        {header: "Doc No."    , dataIndex: 'docno',sortable:false,width:65,align:'center', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'supname',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itemname',sortable:false,width:170,align:'left', menuDisabled: true},
        {header: "Item Code" , dataIndex: 'itmh_code',sortable:false,width:85,align:'right', menuDisabled: true,hidden:true},
        {header: "Qty (t)" , dataIndex: 'qty',sortable:false,width:75,align:'right', menuDisabled: true},
        {header: "Item Value " , dataIndex: 'itemvalue',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "Rate"    , dataIndex: 'itemrate',sortable:false,width:70,align:'right', menuDisabled: true},
        {header: "Cost Value" , dataIndex: 'costvalue',sortable:false,width:95,align:'right', menuDisabled: true},
        {header: "Cost Rate"    , dataIndex: 'costrate',sortable:false,width:75,align:'right', menuDisabled: true},

    ],
    store:loadItem_LedgerDataStore,
    listeners:{	

            'cellDblclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

                  var grnno = selrow.get('docno')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var p4 = "&vouno=" + encodeURIComponent(grnno);
		var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));


		var param = (p1+p2+p3+p4+p5+p6) ; 
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 




     
    }
 }
});



var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
               ProcessMainaData(); 
          } 
        }       
});    



    var btnItemwisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Stock List",
        width: 100,
        id: 'btnItemwisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
		var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
		var finid = "&finid=" + encodeURIComponent(GinFinid);
		var fstdate = "&fstdate=" + encodeURIComponent(finstartdate);
		var opdate = "&opdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	        var p1 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p2 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var rtype = "&rtype=" + encodeURIComponent(1);
	    	var param =(compcode+finid+p1+p2);
                var param = (compcode+finid+fstdate+opdate+p1+p2+rtype);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&' + param, '_blank'); 
            }
        }
    });




   var btnItemLedger = new Ext.Button({
        style: 'text-align:center;',
        text: "Ledger Print",
        width: 100,
        id: 'btnItemLedger',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
                var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&itemcode=" + encodeURIComponent(fitemcode);
		var p5 = "&opqty=" + encodeURIComponent(txtItemOpeningQty.getRawValue());
		var p6 = "&opvalue=" + encodeURIComponent(txtItemOpeningValue.getRawValue());

	    	var param =(p1+p2+p3+p4+p5+p6);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&' + param, '_blank'); 
            }
        }
    });




   var txtPartyPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtPartyPurchaseQty',
        name        : 'txtPartyPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtPartyPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtPartyPurchaseValue',
        name        : 'txtPartyPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'ITEM WISE STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{ 
			xtype   : 'fieldset',
//			title   : '',
//			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 300,
			layout  : 'absolute',
			x       : 1000,
			y       : 10,
			items:[optprinttype],
		},


			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 60,
			    border      : false,
			    width       :500,
                             items: [lblItem]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 20,
                	     width   : 350,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 20,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 20,
                       	     width   : 250,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 22,
                             items: [btnProcess]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : -5,
			     y       : 80,
                             items: [flxItems]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 460,
			    border      : false,
			    width       :500,
                             items: [lblOpening]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 370,
			    y           : 460,
			    border      : false,
			    width       :500,
                             items: [lblReceipt]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 460,
			    border      : false,
			    width       :500,
                             items: [lblIssue]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 460,
			    border      : false,
			    width       :500,
                             items: [lblClosing]
                        },



       

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 20,
                       y           : 480,
                       border      : false,
                       items: [txttotOpeningQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 140,
                       y           : 480,
                       border      : false,
                       items: [txttotOpeningValue]
                      },



                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 210,
                       y           : 480,
                       border      : false,
                       items: [txttotRecptQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 470,
                       y           : 480,
                       border      : false,
                       items: [txttotRecptValue]
                      },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 550,
                       y           : 480,
                       border      : false,
                       items: [txttotIssueQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 790,
                       y           : 480,
                       border      : false,
                       items: [txttotIssueValue]
                      },
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 480,
                       border      : false,
                       items: [txttotClosingQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 1010,
                       y           : 480,
                       border      : false,
                       items: [txttotClosingValue]
                      },



		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemwisePrint]
		},



     ]
    } ,

    {    
        xtype: 'panel',
        title: 'LEDGER',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 60,
                     items: [flxLedger]
                },



			{ 
			    xtype       : 'fieldset',
			    x           : 1110,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblQty]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 1220,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblValue]
                        },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningValue]
                      },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptValue]
                     },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueValue]
                     },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingValue]
                     },



		{
		    xtype       : 'fieldset',
		    x           : 1020,
		    y           : 300,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemLedger]
		},


        ],
    }  ,

    ],
    });
    function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 

        cmbMonth.setValue(parseInt(m1));
        find_dates(parseInt(m1));


        monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));

    }  

    var ReppreprintWindow = new Ext.Window({
	height      : 610,
        width       : 1360,
	x	    : 0,
        y           : 30,
  //      title       : '',  //'Itemwise Purchase Details',
        items       : tabOverall,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){

//alert("Test");

                Refreshdata();
                  lblOpening.setText("Opening Qty & Value" );
                  lblReceipt.setText("Receipt Qty & Value" );
                  lblIssue.setText("Issue Qty & Value" );
                  lblClosing.setText("Closing Qty & Value" );
                  lblQty.setText("Qty" );
                  lblValue.setText("Value" );
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
