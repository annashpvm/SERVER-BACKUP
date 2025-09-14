 

Ext.onReady(function(){
Ext.QuickTips.init();

   var Ginfinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');;




    var fdbl_totalvalue;
    var fdbl_totalqty;

    var editrow = 0;
    var gridedit = "false";


    var gstFlag = "Add";
    var distype = 'N';
    var dctype = 'N';

    var zerovalue = 'N';
    


    function grid_tot() {
        fdbl_totalvalue = 0;
        fdbl_totalqty = 0;
        fdbl_disc =0;
        fdbl_cgst =0;
        fdbl_sgst =0;
        fdbl_igst =0;
        fdbl_other =0;
        fdbl_sumvalue =0;

        var Row = flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel = flxDetail.getSelectionModel().getSelections();
        for (var i = 0; i < Row; i++)
        {
            fdbl_totalvalue = Number(fdbl_totalvalue) + Number(sel[i].data.val);
	    fdbl_totalqty = Number(fdbl_totalqty) + Number(sel[i].data.woqty);
            fdbl_disc = Number(fdbl_disc) + Number(sel[i].data.discountval);
	    fdbl_cgst = Number(fdbl_cgst) + Number(sel[i].data.cgstval);
	    fdbl_sgst = Number(fdbl_sgst) + Number(sel[i].data.sgstval);
	    fdbl_igst = Number(fdbl_igst) + Number(sel[i].data.igstval);

	    fdbl_other = Number(fdbl_other) + Number(sel[i].data.otherval);
	    fdbl_sumvalue = Number(fdbl_sumvalue) + Number(sel[i].data.totalamount);
          
        }

/*
        txtttotalvalue.setValue(fdbl_totalvalue);
        txttotalvalue.setValue(fdbl_totalvalue);
        txtdiscount.setValue(fdbl_disc);
	txtttotalqty.setValue(fdbl_totalqty);
        txtcgsttotal.setValue(fdbl_cgst);      
        txtsgsttotal.setValue(fdbl_sgst);      
        txtigsttotal.setValue(fdbl_igst);      
        txtothertotal.setValue(fdbl_other);      
        txtsubtotal.setValue(fdbl_sumvalue)
	txttotalfinalamt.setValue(fdbl_sumvalue);
*/
        txtttotalvalue.setValue(Ext.util.Format.number(fdbl_totalvalue,'0'));
        txttotalvalue.setValue(Ext.util.Format.number(fdbl_totalvalue,'0'));
        txtdiscount.setValue(Ext.util.Format.number(fdbl_disc,'0'));
	txtttotalqty.setValue(Ext.util.Format.number(fdbl_totalqty,'0'));
        txtcgsttotal.setValue(Ext.util.Format.number(Math.round(fdbl_cgst),'0'));      
        txtsgsttotal.setValue(Ext.util.Format.number(fdbl_sgst,'0'));      
        txtigsttotal.setValue(Ext.util.Format.number(fdbl_igst,'0'));      
        txtothertotal.setValue(Ext.util.Format.number(fdbl_other,'0'));      
        txtsubtotal.setValue(Ext.util.Format.number(fdbl_sumvalue,'0'));
	txttotalfinalamt.setValue(Ext.util.Format.number(fdbl_sumvalue,'0'));

    }

var cgstval;
var sgstval;
var igstval;
var otherval;
var discountval;


    function grid_taxtot() {
/*
        cgstval = 0;
        sgstval = 0;
	igstval = 0;
        otherval = 0;
	discountval = 0;
     
        var Row = flxDetail.getStore().getCount();


        flxDetail.getSelectionModel().selectAll();
        var sel = flxDetail.getSelectionModel().getSelections();
        for (var i = 0; i < Row; i++)
        {
            cgstval = Number(cgstval) + Number(sel[i].data.cgstval);
	    sgstval = Number(sgstval) + Number(sel[i].data.sgstval);
	    igstval = Number(igstval) + Number(sel[i].data.igstval);
            otherval = Number(otherval) + Number(sel[i].data.otherval);
	    discountval = Number(discountval) + Number(sel[i].data.discountval);
          
        }
        txtcgstvalue.setValue(cgstval);
	txtsgstvalue.setValue(sgstval);
	txtigstvalue.setValue(igstval);
 	txtdiscount.setValue(discountval);
	''txtothercharges.setValue(discountval);
	txttotalfinalamt.setValue(fdbl_totalvalue+cgstval+sgstval+igstval+otherval-discountval);
  */    

    }


function calculateItemValue(){
       var net = 0;
       var taxable = 0;
       var value1 = 0;
       var value2 = 0;
       var cgst = 0;
       var sgst = 0;
       var igst = 0;
       var itemvalue=0;
       var sumitemvalue=0;

//       alert(txtrate.getRawValue());
 
//      alert(txtqty.getRawValue());
 

       itemvalue=Ext.util.Format.number(Number(txtrate.getRawValue())*Number(txtqty.getRawValue()),'0.000');
       txtitemvalue.setRawValue(itemvalue);


       if (txtitdiscountper.getRawValue() > 0 && itemvalue > 0 )  {
          txtitdiscountvalue.setRawValue(itemvalue * txtitdiscountper.getRawValue() /100);
       }    

//alert(itemvalue);
//alert(distype);

       if (distype == 'Y')
       {
          taxable = itemvalue - Number(txtitdiscountvalue.getRawValue());
       }
       else
       {
          taxable = itemvalue;
       }



       
       if (txtitcgstper.getRawValue() > 0 && taxable > 0 )  {
           cgst = taxable * txtitcgstper.getRawValue()/100;   
       }
       txtitcgstvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));


       if (txtitsgstper.getRawValue() > 0 && taxable > 0 )  {
           sgst = taxable * txtitsgstper.getRawValue()/100;   
       }
       txtitsgstvalue.setRawValue(Ext.util.Format.number(sgst,'0.00'));


       if (txtitigstper.getRawValue() > 0 && taxable > 0 )  {
           igst = taxable * txtitigstper.getRawValue()/100;   
       }
       txtitigstvalue.setRawValue(Ext.util.Format.number(igst,'0.00'));

      
       value1 = taxable + cgst + sgst+igst + Number(txtitothervalue.getRawValue())

       txtItemValue.setRawValue(Ext.util.Format.number(Math.round(value1),'0.00'));

}


var WorkorderNoList = new Ext.data.Store({
  id: 'WorkorderNoList',
   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwonolist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'woh_no'
  ])
});



var WorkorderNoEditdetails = new Ext.data.Store({
  id: 'WorkorderNoEditdetails',
   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwonodetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[    'woh_seqno','woh_date','woh_dept','woh_type','woh_sup_code','woh_ref','woh_refdate','woh_wocode','woh_value','woh_labour_type','woh_labour_amt',
'woh_discount','woh_trans_rate','woh_trans_amt','woh_other_amt','woh_less_amt','woh_amount','woh_cgst_amt','woh_sgst_amt','woh_igst_amt',
'woh_lab_cgst_per','woh_lab_cgst_amt','woh_lab_sgst_per','woh_lab_sgst_amt','woh_lab_igst_per','woh_lab_igst_amt','woh_price_terms','woh_pay_terms',
'woh_credit_days','woh_remarks','woh_dc_needed','woh_startdate','woh_enddate','wot_slno','wot_itemcode','wot_unit','wot_rate','wot_qty','wot_dcraised','wot_recd',
'wot_value','wot_dis_per','wot_dis_amt','wot_other_amt','wot_vat','wot_cgst_per','wot_cgst_amt','wot_sgst_per','wot_sgst_amt',	
'wot_igst_per','wot_igst_amt','wot_amount','sup_code','sup_refname','item_code','item_name','item_desc','item_uom','item_rate',	
'item_hsncode','wo_no','wo_name','wo_purpose','woh_frt_party1','woh_frt_party2','woh_frt_amt1','woh_frt_amt2'

  ])
});

var loadwonoDataStore= new Ext.data.Store({
  id: 'loadwonoDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwono"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'wono'
  ])
});

var DEPTDataStore = new Ext.data.Store({
  id: 'DEPTDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaddept"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'department_code', type: 'int', mapping: 'department_code'},
    {name: 'department_name', type: 'string', mapping: 'department_name'}

  ])
});

var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaditem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'item_code','item_name'
  ])
});

var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'sup_code','sup_refname'
  ])
});

var WorkorderDataStore = new Ext.data.Store({
  id: 'WorkorderDataStore',
   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'wo_no','wo_name'
  ])
});







var PaytermDataStore = new Ext.data.Store({
  id: 'PaytermDataStore',
   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadpayterm"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'term_code','term_name'
  ])
});

    var txtdiscount = new Ext.form.NumberField({
           width: 90,emptyText:'Discount',style:'text-align:right',name: 'txtdiscount',x: 100,y: 45,  enableKeyEvents: true,readOnly:true,
/*
		listeners:{
			keyup:function()
				{
				
				if(Ext.util.Format.number(Number(txttotalvalue.getRawValue()))== 0)
				{
				Ext.Msg.alert("Work-Ord","Invalid Discount");
				}
				{
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
				}

				}
			   }
*/              
                });
/*
var txtsgstper = new Ext.form.NumberField({

             width: 50,emptyText: 'sgstper',style:'text-align:right',name: 'txtsgstper',x: 730,y: 165, enableKeyEvents: true,
          	listeners:{
			keyup:function()
				{
	txtsgstvalue.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())*Number(txtcgstper.getRawValue())/100),"0.00");
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
				}
			  }
                  
                });

var txtcgstper = new Ext.form.NumberField({
             width: 50,emptyText: 'cgstper',style:'text-align:right',name: 'txtcgstper',x: 730,y: 125, enableKeyEvents: true,
          	listeners:{
			keyup:function()
				{
	txtcgstvalue.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())*Number(txtcgstper.getRawValue())/100),"0.00");
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
				}
			  }
                });

var txtigstper = new Ext.form.NumberField({
              width: 50,emptyText: 'Igstper',style:'text-align:right',name: 'txtigstper',x: 730,y: 205, enableKeyEvents: true,
          	listeners:{
			keyup:function()
				{
	txtigstvalue.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())*Number(txtcgstper.getRawValue())/100),"0.00");
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
				}
			  }
             
               });

var txttrnsvalue = new Ext.form.NumberField({
               width: 100,emptyText: 'Transaction Charge',style:'text-align:right',name: 'txttrnsvalue',x: 480,y: 30
              
                });

*/ 
var txtothercharges = new Ext.form.NumberField({
                width: 100,emptyText: 'Other Charges',style:'text-align:right',name: 'txtothercharges',x: 400,y: 75, enableKeyEvents: true,

/*          	listeners:{
			keyup:function()
				{
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
				}
			}
 */             
                   });

var txtdiscountscrapval = new Ext.form.NumberField({
                fieldLabel  : 'Scrap Exchange',width: 100,name: 'txtdiscountscrapval',emptyText: 'Discount/Scrap',style:'text-align:right',x: 520,y: 110, enableKeyEvents: true,
          	listeners:{
			keyup:function()
				{
                 txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txtsubtotal.getRawValue())+Number(txtFreight1.getValue())+Number(txtFreight2.getValue())-(txtdiscountscrapval.getValue())),"0.00");
				}
			}
                
                    });

var txttotalfinalamt = new Ext.form.NumberField({
                width: 100,emptyText: 'Total Amount',style:'text-align:right',name: 'txttotalfinalamt',x: 520,y: 180
               
                    });

var txtwono = new Ext.form.NumberField({
                width: 100,style:'text-align:left',name: 'additional',x: 560,y: 210,fieldLabel:'WO No',emptyText: 'WO No',border:true,
               
                    });

 var cmbwono = new Ext.form.ComboBox({
        id: 'cmbwono',
        store: WorkorderNoList,
        displayField: 'woh_no',
        valueField: 'woh_no',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'',
        editable:true,
        width: 100,
        listeners:{
                select: function () {
//alert(Ginfinid);
//alert(Gincompcode);
//alert(cmbwono.getValue());
                        flxDetail.getStore().removeAll();
			WorkorderNoEditdetails.removeAll();
			WorkorderNoEditdetails.load({
		                url: 'ClsWo.php',
		                params: {
		                    task: 'loadwonodetails',
					finid:Ginfinid,
					compcode:Gincompcode,
                                	wono:cmbwono.getValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   flxDetail.getStore().removeAll();
                                   var cnt = WorkorderNoEditdetails.getCount();

                                   if(cnt>0)
                  		    {  

//alert(WorkorderNoEditdetails.getAt(0).get('woh_ref'));

                                           dtppodate.setRawValue(Ext.util.Format.date(WorkorderNoEditdetails.getAt(0).get('woh_date'),"d-m-Y"));

                                           txtwono.setValue(cmbwono.getValue());
		                           cmbparty.setValue(WorkorderNoEditdetails.getAt(0).get('woh_sup_code')); 
		                           cmbfrtparty1.setValue(WorkorderNoEditdetails.getAt(0).get('woh_frt_party1')); 
		                           cmbfrtparty2.setValue(WorkorderNoEditdetails.getAt(0).get('woh_frt_party2')); 

		                           cmbDepartment.setValue(WorkorderNoEditdetails.getAt(0).get('woh_dept')); 
		                           cmbWOName.setValue(WorkorderNoEditdetails.getAt(0).get('woh_wocode')); 
		                           cmbPayterm.setValue(WorkorderNoEditdetails.getAt(0).get('woh_pay_terms')); 
                                           txtqorefno.setValue(WorkorderNoEditdetails.getAt(0).get('woh_ref'));
                                           dtprefdate.setRawValue(Ext.util.Format.date(WorkorderNoEditdetails.getAt(0).get('woh_refdate'),"d-m-Y"));
                                           dtpstartdate.setRawValue(Ext.util.Format.date(WorkorderNoEditdetails.getAt(0).get('woh_startdate'),"d-m-Y"));
                                           dtpenddate.setRawValue(Ext.util.Format.date(WorkorderNoEditdetails.getAt(0).get('woh_enddate'),"d-m-Y"));
		                           txttotalvalue.setValue(WorkorderNoEditdetails.getAt(0).get('woh_value')); 
		                           txtdiscount.setValue(WorkorderNoEditdetails.getAt(0).get('woh_discount')); 
		                           txtothertotal.setValue(WorkorderNoEditdetails.getAt(0).get('woh_other_amt')); 
		                           txttotalfinalamt.setValue(WorkorderNoEditdetails.getAt(0).get('woh_amount')); 
		                           txtdiscountscrapval.setValue(WorkorderNoEditdetails.getAt(0).get('woh_less_amt')); 
		                           txtcgsttotal.setValue(WorkorderNoEditdetails.getAt(0).get('woh_cgst_amt')); 
		                           txtsgsttotal.setValue(WorkorderNoEditdetails.getAt(0).get('woh_sgst_amt')); 
		                           txtigsttotal.setValue(WorkorderNoEditdetails.getAt(0).get('woh_igst_amt')); 
		                           txtprice.setValue(WorkorderNoEditdetails.getAt(0).get('woh_price_terms')); 
		                           txtCreditDays.setValue(WorkorderNoEditdetails.getAt(0).get('woh_credit_days')); 
		                           txtremarks.setValue(WorkorderNoEditdetails.getAt(0).get('woh_remarks')); 
			                   txtFreight1.setValue(WorkorderNoEditdetails.getAt(0).get('woh_frt_amt1')); 
			                   txtFreight2.setValue(WorkorderNoEditdetails.getAt(0).get('woh_frt_amt2')); 

		            	           for(var j=0; j<cnt; j++)
				           { 
		                              var sno1          = WorkorderNoEditdetails.getAt(j).get('wot_slno');
		                              var itemname1     = WorkorderNoEditdetails.getAt(j).get('item_name');
		                              var code1         = WorkorderNoEditdetails.getAt(j).get('wot_itemcode');
		                              var woqty1        = WorkorderNoEditdetails.getAt(j).get('wot_qty');
		                              var rate1         = WorkorderNoEditdetails.getAt(j).get('wot_rate');
		                              var val1          = WorkorderNoEditdetails.getAt(j).get('wot_value');
		                              var uom1          = WorkorderNoEditdetails.getAt(j).get('wot_unit');
		                              var discountper1  = WorkorderNoEditdetails.getAt(j).get('wot_dis_per');
		                              var discountval1  = WorkorderNoEditdetails.getAt(j).get('wot_dis_amt');
		                              var cgstper1      = WorkorderNoEditdetails.getAt(j).get('wot_cgst_per');
		                              var cgstval1      = WorkorderNoEditdetails.getAt(j).get('wot_cgst_amt');
		                              var sgstper1      = WorkorderNoEditdetails.getAt(j).get('wot_sgst_per');
		                              var sgstval1      = WorkorderNoEditdetails.getAt(j).get('wot_sgst_amt');
		                              var igstper1      = WorkorderNoEditdetails.getAt(j).get('wot_igst_per');
		                              var igstval1      = WorkorderNoEditdetails.getAt(j).get('wot_igst_amt');
		                              var otherval1     = WorkorderNoEditdetails.getAt(j).get('wot_other_amt');
		                              var totalamount1  = WorkorderNoEditdetails.getAt(j).get('wot_amount');


		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
		                                    slno:sno1,
		                                    itemname:itemname1,
		                               	    itemcode:code1,
		                                    woqty:woqty1,
	 			            	    rate:rate1,
						    uom:uom1,
		         			    cgstper:cgstper1,
				  		    cgstval:cgstval1,	
					 	    sgstper:sgstper1,
		     			            sgstval:sgstval1,	
				 		    igstper:igstper1,
		    				    igstval:igstval1,	
				      		    otherval:otherval1,	
						    discountper:discountper1,
		       				    discountval:discountval1,
		       				    val:val1,
		       				    totalamount:totalamount1,
		
		                                  })
		                              );
                                              grid_tot();flxDetail.getSelectionModel().clearSelections();	
		                           }
                                    }
                                }

			  });
		  
          } }
 

      });


var editbtn = new Ext.Button({
//EDIT

                    text: 'Edit',
                    width: 60,
                    icon:'/WorkOrder/icons/edit.png',
                    tooltip: 'Click To EDIT',
		    listeners:
	            {
                     	click: function(){

//alert(Ginfinid);
//alert(Gincompcode);

                           Ext.getCmp('cmbwono').show();
                           gstFlag = "Edit"
                           WorkorderNoList.removeAll();
                           WorkorderNoList.load({
      		              url: 'ClsWo',
                              params: {
			          task: 'loadwonolist',
			          finid: Ginfinid,
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(WorkorderNoList.getCount());	
                              }
                           });

                        }
                    }
})
    
var exitbtn = new Ext.Button({

                    text: 'Exit',
                    width: 60,
                    icon:'/WorkOrder/icons/exit.png',
                    tooltip: 'Click To EXIT',
		    listeners:
	            {
                     	click: function(){
                            window_form.hide();
                        }
                    }
})

                         


var savebtn = new Ext.Button({

                    text: 'Save',
                    width: 60,
                    icon:'/WorkOrder/icons/save.png',
                    tooltip: 'Click To Save',

            listeners:{
                click:function()
        {
/*
alert(txtwono.getValue());
alert(gstFlag);

alert(txtqorefno.getValue());
alert(dtprefdate.getValue());
alert(cmbWOName.getValue());
alert(txttotalvalue.getRawValue());
alert(txtdiscount.getRawValue());
alert(distype);
alert(txtothertotal.getRawValue());
alert(txttotalfinalamt.getRawValue());
*/


                    var gstSave;
                    gstSave="true";

                    if (cmbparty.getValue() == 0)
                    {
                            Ext.Msg.alert('Work-Order','Select Party Name');
                            gstSave="false";
//                            cmbparty.setfocus();
                    }
                    else if (cmbDepartment.getValue() == 0)
                    {
                            Ext.Msg.alert('Work-Order','Select Department');
                            gstSave="false";
                    }
                    else if (Number(cmbWOName.getValue()) == 0)
                    {
                            Ext.Msg.alert('Work-Order','Select Work Order Name');
                            gstSave="false";
                    }
                    else if (cmbPayterm.getValue() == 0)
                    {
                            Ext.Msg.alert('Work-Order','Select Payment Type');
                            gstSave="false";
                    }
                    else if (Number(txttotalfinalamt.getValue()) == 0)
                    {
                            Ext.Msg.alert('Work-Order','Item & values are Empty');
                            gstSave="false";
                    }

                    else if (txtqorefno.getValue() == '')
                    {
                            Ext.Msg.alert('Work-Order','Refrence is Empty');
                            gstSave="false";
                    }
                    else if (txtprice.getValue() == '')
                    {
                            Ext.Msg.alert('Work-Order','Price Term is Empty');
                            gstSave="false";
                    }
                    else if (txtCreditDays.getValue() == '')
                    {
                            Ext.Msg.alert('Work-Order','Credit Days is Empty');
                            gstSave="false";
                    }
                    else if (txtremarks.getValue() == '')
                    {
                            Ext.Msg.alert('Work-Order','Remarks is Empty');
                            gstSave="false";
                    }    
                    else{
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn){
                            if (btn === 'yes'){

                            if (gstSave === "true")
                            {  

                            flxDetail.getSelectionModel().selectAll();
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });


                            Ext.Ajax.request({
                            url: 'TrnWoSave.php',
                            params :
                             {

		                            wohcompcode  :Gincompcode,
                                            griddet	  : Ext.util.JSON.encode(poupdData),      
				            cnt:poData.length,
                                            savetype   : gstFlag,
			                    wohfincode : Ginfinid,
                                            wohno      : txtwono.getValue(),
				            wohdate  : Ext.util.Format.date(dtppodate.getValue(),"Y-m-d"),
				            wohdept  :cmbDepartment.getValue(),
				            wohtype  :'1',
				            wohsupcode :cmbparty.getValue(),
				            wohref :txtqorefno.getRawValue(),
				            wohrefdate :Ext.util.Format.date(dtprefdate.getValue(),"Y-m-d"),
				            wohwocode :cmbWOName.getValue(),
				            wohvalue :txttotalvalue.getRawValue(),
				            wohlabourtype :'',
				            wohlabouramt :'0.00',
				            wohdiscount :txtdiscount.getRawValue(),
				            wohdiscsttype :distype,
				            wohsertax :'0.00',
				            wohsertaxamt :'0.00',
				            woheduper :'0.00',
				            woheduamt :'0.00',
				            wohsheper :'0.00',
			                    wohsheamt :'0.00',
				            wohtransrate :0,
				            wohtransamt : 0,
				            wohotheramt :txtothertotal.getRawValue(),
				            wohamount  :txttotalfinalamt.getRawValue(),
				            wohlessamt :txtdiscountscrapval.getRawValue(),
				            wohcgstper : 0,
				            wohcgstamt :txtcgsttotal.getRawValue(),
				            wohsgstper :0,
				            wohsgstamt :txtsgsttotal.getRawValue(),
				            wohigstper :0,
				            wohigstamt :txtigsttotal.getRawValue(),
				            wohlabcgstper :'0.00',
				            wohlabcgstamt :'0.00',
					    wohlabsgstper :'0.00',
					    wohlabsgstamt :'0.00',
					    wohlabigstper :'0.00',
					    wohlabigstamt :'0.00',
					    wohpriceterms :txtprice.getRawValue(),
					    wohpayterms :cmbPayterm.getValue(),
					    wohcreditdays :txtCreditDays.getRawValue(),
					    wohremarks :txtremarks.getRawValue(),
					    wohdcneededyes :dctype,
					    wohstartdate : Ext.util.Format.date(dtpstartdate.getValue(),"Y-m-d"),
					    wohenddate   : Ext.util.Format.date(dtpenddate.getValue(),"Y-m-d"),
					    wohfrtamt1   : txtFreight1.getValue(),
					    wohfrtamt2   : txtFreight2.getValue(),
					    wohfrtparty1 : cmbfrtparty1.getValue(),
					    wohfrtparty2 : cmbfrtparty2.getValue(),
					    cancelflag   :'0' 

  
                            },
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Work Order No -" + obj['wono']);
                                    myFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else{
                                  Ext.MessageBox.alert("Work Order Not Completed! Pls Check!- " + obj['wono']);                                                  
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



});



    
    var cmbPayterm = new Ext.form.ComboBox({
        id: 'cmbPayterm',
        store: PaytermDataStore,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : 'term_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Payment Type',
        editable:true,
        emptyText:'Select Payment Period',
        blankText:'Select Payment Period',
        width: 200
 });

	var cmbDepartment = new Ext.form.ComboBox({
        id: 'cmbDepartment',
        store: DEPTDataStore,
        displayField: 'department_name',
        valueField: 'department_code',
        hiddenName : 'department_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Dept ',
        editable:true,
        width: 250
      });

 var cmbWOName = new Ext.form.ComboBox({
        id: 'cmbWOName',
        store: WorkorderDataStore,
        displayField: 'wo_name',
        valueField: 'wo_no',
        hiddenName : 'wo_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'WO Name',
        editable:true,
        width: 300
      });
      
      
      /* ====================== Radio Button =========================*/

var optdiscyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Less Disc for GST Calculation',
//    title: 'Less Disc',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    height:140,
    width: 200,
    x: 700,
    y: 60,
  
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optdiscyn',
        items: [
            {boxLabel: 'Yes' , name: 'optdiscyn', id:'optdiscyes', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			distype = 'Y';                   }
                 }
               }
            },
            {boxLabel: 'No', name: 'optdiscyn', id:'optdiscno', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			distype = 'N';
                   }
                 }
               }
            },

        ]
    },
    ]
});


var optdcyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'DC NEEDED Y/N',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    height: 65,
    width: 150,
    x: 170,  
    y: 440,
 
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optdcyn',
        items: [
            {boxLabel: 'Yes' , name: 'optdcyn', id:'optdcyes', inputValue: 1,width:50,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			dctype = 'Y';                   }
                 }
               }
            },
            {boxLabel: 'No', name: 'optdcyn', id:'optdcno', inputValue: 2,checked:true,width:50,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			dctype = 'N';
                   }
                 }
               }
            },

        ]
    },
    ]
});

var optzerovalueyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'ZERO VALUE Y/N',
    fieldLabel: '',
    border: true,
    height: 62,
    width: 150,
    layout : 'hbox',
    x: 15,  
    y: 440,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optzerovalueyn',
        items: [
            {boxLabel: 'Yes' , name: 'optzerovalueyn', id:'optzerovalueyes', inputValue: 1,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			zerovalue = 'Y';                   }
                 }
               }
            },
            {boxLabel: 'No', name: 'optzerovalueyn', id:'optzerovalueno', inputValue: 2,checked:true,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			zerovalue = 'N';
                   }
                 }
               }
            },

        ]
    },
    ]
});


/*
var lessdiscyes = new Ext.form.Radio({id : 'discyes' ,boxLabel: 'Yes', name: 'rbtag', inputValue: 'b',x:100, y:80,
listeners:
	{
	check:function(rb,checked)
		{
		if(checked==true)
		{
			distype = 'Y';
			
		}
		}
	}
})
var lessdiscno = new Ext.form.Radio({id : 'discno' ,boxLabel: 'NO', name: 'rbtag', inputValue: 'c',x:410,y:160,checked:true,
listeners:
	{
	check:function(rb,checked)
		{
		if(checked==true)
		{
			distype = 'N';
			
		}
		}
	}
})
*/


var normal = new Ext.form.Radio({id : 'n1' ,boxLabel: 'Normal', name: 'rbtag', inputValue: 'b',x:17, y:465
})

var zeroval = new Ext.form.Radio({id : 'z2' ,boxLabel: 'Zero Value', name: 'rbtag', inputValue: 'c',x:85,y:465

})

var dcneededyes = new Ext.form.Radio({id : 'dcyes' ,boxLabel: 'Yes',width :60, name: 'rbtag', inputValue: 'b'})

var dcneededno = new Ext.form.Radio({id : 'dcno' ,boxLabel: 'No', name: 'rbtag', inputValue: 'c'})

      
       var item_combo = new Ext.form.ComboBox({
        id: 'item_combo',
        store: ItemLoadDataStore,
        displayField: 'item_name',
        valueField: 'item_code',
        hiddenName : 'item_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Item',
        editable:true,
        labelWidth:30,
        width: 250
       
      });

 var unit_combo = new Ext.form.ComboBox({
        id: 'unit_combo',
        store: ['NOS','HRS','MTRS','FEET','SQ.FT','DAY'],
        displayField: 'mih_inwno',
        valueField: 'mih_seqno',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Unit Type',
        editable:true,
        width: 70
         
      });

var cmbparty = new Ext.form.ComboBox({
        id: 'cmbparty',
        store: VendorDataStore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
//      allowBlank: false,
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 320
	   
      });

var cmbfrtparty1 = new Ext.form.ComboBox({
        id: 'cmbfrtparty1',
        store: VendorDataStore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
//      allowBlank: false,
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Frt Party 1',
        width: 280
	   
      });

var cmbfrtparty2 = new Ext.form.ComboBox({
        id: 'cmbfrtparty2',
        store: VendorDataStore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
//      allowBlank: false,
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Frt Party 2',
        width: 280
	   
      });


  var dtppodate = new Ext.form.DateField
    ({
       fieldLabel : ' WO Date',
       id         : 'dtppodate',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 100,
       value: new Date(),
        
    });
    
    
  var dtprefdate = new Ext.form.DateField
    ({
       fieldLabel : ' Ref Date',
       name        : 'dtprefdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
    
  var dtpstartdate = new Ext.form.DateField
    ({
       fieldLabel : ' Start Date',
       name        : 'dtpstartdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
      
    });
    
  var dtpenddate = new Ext.form.DateField
    ({
       fieldLabel : 'End Date',
       name        : 'dtpenddate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
       editable    : false
    });
    // End Of Combo Values

 var txtFreight1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight Exp.1',
        id          : 'txtFreight1',
        name        : 'txtFreight1',
	readOnly    :false,
        width       : 100,
        enableKeyEvents: true,
      	listeners:{
             keyup:function()
         	{
                 txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txtsubtotal.getRawValue())+Number(txtFreight1.getValue())+Number(txtFreight2.getValue())-(txtdiscountscrapval.getValue())),"0.00");
		}
        }
    });

 var txtFreight2 = new Ext.form.NumberField({
        fieldLabel  : 'Freight Exp.2',
        id          : 'txtFreight2',
        name        : 'txtFreight2',
	readOnly    :false,
        width       : 100,
        enableKeyEvents: true,
      	listeners:{
             keyup:function()
         	{
                 txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txtsubtotal.getRawValue())+Number(txtFreight1.getValue())+Number(txtFreight2.getValue())-(txtdiscountscrapval.getValue())),"0.00");
		}
        }
    });


 var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        name        : 'txtrate',
	readOnly    :false,
        width       : 80,
        border      : "true",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }
    });
 var txtqty = new Ext.form.NumberField({
        fieldLabel  : 'Quantity',
        id          : 'txtqty',
        name        : 'txtqty',
	readOnly    :false,
        width       : 60,
        border      : "true",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }

    });
 var txtitemvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtitemvalue',
        name        : 'txtitemvalue',
	readOnly    :false,
        width       : 70,
        border      : "true",
        readOnly    : true,
    });


 var txtqorefno = new Ext.form.TextField({
        fieldLabel  : 'Qo Reference No',
        id          : 'txtqorefno',
        name        : 'txtqorefno',
	readOnly    :false,
        width       : 150,
        border      : "false"

    });



 var txtcgsttotal = new Ext.form.NumberField({
        fieldLabel  : 'Tot.cgst.Amt',
        id          : 'txtcgsttotal',
        name        : 'txtcgsttotal',
	readOnly    :false,
        width       : 90,
        border      : false,
        readOnly    : true,
        style:'text-align:right',
	x:100,
	y:75

    });

 var txtsgsttotal = new Ext.form.NumberField({
        fieldLabel  : 'Tot.sgst.Amt',
        id          : 'txtsgsttotal',
        name        : 'txtsgsttotal',
	readOnly    :false,
        width       : 90,
        border      : "true",
        readOnly    : true,
        style:'text-align:right',
	x:100,
	y:100

    });


 var txtigsttotal = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Igst.Amt',
        id          : 'txtigsttotal',
        name        : 'txtigsttotal',
	readOnly    :false,
        width       : 90,
        border      : "true",
        readOnly    : true,
        style:'text-align:right',
	x:100,
	y:125

    });

 var txtothertotal = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Oth.Amt',
        id          : 'txtothertotal',
        name        : 'txtothertotal',
	readOnly    :false,
        width       : 90,
        border      : "true",
        readOnly    : true,
        style:'text-align:right',
	x:100,
	y:150

    });


 var txtsubtotal = new Ext.form.NumberField({
        fieldLabel  : 'Sub. Total',
        id          : 'txtsubtotal',
        name        : 'txtsubtotal',
	readOnly    :false,
        width       : 90,
        border      : "true",
        readOnly    : true,
        style:'text-align:right',
	x:100,
	y:185

    });

 var txtsgstvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsgstvalue',
        name        : 'txtsgstvalue',
	readOnly    :false,
        width       : 70,
        border      : "true",
	x:800,
	y:165

    });

 var txtigstvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtigstvalue',
        name        : 'txtigstvalue',
	readOnly    :false,
        width       : 70,
        border      : "true",
	x:800,
	y:205

    });

 var txtttotalqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtttotalqty',
        name        : 'txtttotalqty',
	readOnly    :false,
        width       : 70,
        border      : "true"
	

    });

 var txtttotalvalue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtttotalvalue',
        name        : 'txtttotalvalue',
	readOnly    :txtttotalvalue,
        width       : 120,
        readOnly    : true,
        border      : "true"
	

    });


 var txtprice = new Ext.form.TextField({
        fieldLabel  : 'Price Terms',
        id          : 'txtprice',
        name        : 'txtprice',
	readOnly    :false,
        width       : 200,
        border      : "true"
	

    });

 var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
	readOnly    :false,
        width       : 70,
        border      : "true"
	

    });

 var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
	readOnly    :false,
        width       : 600,
        border      : "true"
	

    });

 var txtitcgstper = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtitcgstper',
        name        : 'txtitcgstper',
	readOnly    :false,
        width       : 50,
        border      : "false",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }
	

    });
 var txtitcgstvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtitcgstvalue',
        name        : 'txtitcgstvalue',
	readOnly    :false,
        width       : 50,
        border      : "false"
	

    });

 var txtitsgstper = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtitsgstper',
        name        : 'txtitsgstper',
	readOnly    :false,
        width       : 50,
        border      : "false",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }
	

    });
 var txtitsgstvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtitsgstvalue',
        name        : 'txtitsgstvalue',
	readOnly    :false,
        width       : 50,
        border      : "false"
	

    });

 var txtitigstper = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtitigstper',
        name        : 'txtitigstper',
	readOnly    :false,
        width       : 50,
        border      : "false",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }

    });
 var txtitigstvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtitigstvalue',
        name        : 'txtitigstvalue',
	readOnly    :false,
        width       : 50,
        border      : "false"
	

    });
/*
 var txtitotherper = new Ext.form.TextField({
        fieldLabel  : 'OTHER%',
        id          : 'txtitotherper',
        name        : 'txtitotherper',
	readOnly    :false,
        width       : 70,
        border      : "false",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }
	

    });
*/

 var txtitothervalue = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtitothervalue',
        name        : 'txtitothervalue',
	readOnly    :false,
        width       : 50,
        border      : "false"
	

    });

 var txtitdiscountper = new Ext.form.NumberField({
        fieldLabel  : 'Discount%',
        id          : 'txtitdiscountper',
        name        : 'txtitdiscountper',
	readOnly    :false,
        width       : 50,
        border      : "false",
	enableKeyEvents: true,
	listeners:
		{
                   keyup:function(){
                        calculateItemValue();
                   },
                   keydown:function(){ 
                      calculateItemValue();
                   },
                  blur:function(){
                       calculateItemValue();
                  } 
	      }
	

    });
 var txtitdiscountvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtitdiscountvalue',
        name        : 'txtitdiscountvalue',
	readOnly    :false,
        width       : 50,
        border      : "false"
	

    });



/*
 var txttrnsper = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttrnsper',
        name        : 'txttrnsper',
	readOnly    :false,
        width       : 70,
        border      : "true",
	x:400,
	y:30, 
	enableKeyEvents: true,
	listeners:
		{
		keyup:function()
			{
			txttrnsvalue.setRawValue(Number(txtttotalqty.getValue())*Number(this.getValue()))
txttotalfinalamt.setRawValue(Ext.util.Format.number(Number(txttotalvalue.getRawValue())+Number(txtcgstvalue.getValue())+Number(txtsgstvalue.getValue())+Number(txtigstvalue.getValue())+Number(txtttotalqty.getValue())+Number(txttrnsvalue.getValue())+Number(txtothercharges.getValue())-Number(txtdiscountscrapval.getValue())-Number(txtdiscount.getRawValue())),"0.00");
			}
		
		}

    });

*/

 var txtcgstvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcgstvalue',
        name        : 'txtcgstvalue',
	readOnly    :false,
        width       : 70,
        border      : "true",
	x:800,
	y:125

    });




    var fieldset1 = {
        xtype        : 'fieldset',
        title        : '',
        width        :300,
        flex         : 1,
        border       : false,
        labelWidth : 60,
        defaultType : '',
        defaults     : {
        },
        items : [
       txtwono,dtppodate
     
        ]
    }

 
 

var fieldset3 = {
        xtype        : 'fieldset',
        title        : '',
        flex         : 1,
        border       : false,
        labelWidth : 110,
        defaultType : 'field',
        defaults     : {
 
        },
        items : [
      cmbparty,txtqorefno //,dtprefdate
         
    
        ]
    }


var fieldsetContainer = {
        xtype         : 'container',
        layout        : 'hbox',
        height        : 165,
        items : [
        fieldset1,
        fieldset3
        ]
    }

var gridstore2 = new Ext.data.Store({
        
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'gridstore2'
        },[
           'slno','itemname','itemcode','woqty','rate','val','uom','cgstper','sgstper','igstper','discountper','otherper',
     'cgstvalue','sgstvalue','igstvalue','othervalue','discountvalue'

        ])
    });




var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
});


function refresh()
{
			      txtitcgstper.setRawValue("");
			      txtitsgstper.setRawValue("");
			      txtitigstper.setRawValue("");
                              txtitdiscountper.setRawValue("");
		              txtitcgstvalue.setRawValue("");
			      txtitsgstvalue.setRawValue("");
			      txtitigstvalue.setRawValue("");
			      txtitothervalue.setRawValue("");
			      txtitdiscountvalue.setRawValue("");
                   	      txtqty.setValue('');
 		              txtrate.setValue('');

}
var btnsubmit = new Ext.Button({
                text: 'ADD',
                width: 50,
                tooltip:'Click To Add',
                icon:'/WorkOrder/icons/download.gif',
    		listeners:{
        	click: function(){    
                      var gstadd="true";
                      if (Number(txtqty.getValue())===0){
                          Ext.MessageBox.alert("WO ", "Enter quantity..");
                          txtqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtrate.getValue())===0){
                          Ext.MessageBox.alert("WO ", "Enter Rate..");
                          txtrate.focus();
                          gstadd="false";
                       }

                       if(gstadd=="true")
                       {
                           var itemseq = item_combo.getValue();
                           flxDetail.getSelectionModel().selectAll();
                           var selrows = flxDetail.getSelectionModel().getCount();
                           var sel = flxDetail.getSelectionModel().getSelections();
                           var cnt = 0;
                           for (var i=0;i<selrows;i++)
	                   {
                              if (sel[i].data.itemname == item_combo.getRawValue())
	                      {
                                   cnt = cnt + 1;
                              }
                           }
                          if(gridedit === "true")
              	          {
		           	gridedit = "false";
                               	var idx = flxDetail.getStore().indexOf(editrow);
                                var tamt = 0;
                                tamt = Number(txtitemvalue.getRawValue())+Number(txtitcgstvalue.getRawValue())+Number(txtitsgstvalue.getRawValue())
+Number(txtitigstvalue.getRawValue())+Number(txtitothervalue.getRawValue())-Number(txtitdiscountvalue.getRawValue())
            	          	sel[idx].set('itemname'    , item_combo.getRawValue());
        	          	sel[idx].set('itemcode'    , item_combo.getValue());
        	          	sel[idx].set('woqty'       , txtqty.getValue());
        	          	sel[idx].set('rate'        , txtrate.getValue());
            	          	sel[idx].set('val'         , txtitemvalue.getValue());
        	          	sel[idx].set('uom'         , unit_combo.getRawValue());
        	          	sel[idx].set('discountper' , txtitdiscountper.getValue());
        	          	sel[idx].set('discountval' , txtitdiscountvalue.getValue());
            	          	sel[idx].set('cgstper'     , txtitcgstper.getRawValue());
        	          	sel[idx].set('cgstval'     , txtitcgstvalue.getRawValue());
            	          	sel[idx].set('sgstper'     , txtitsgstper.getValue());
        	          	sel[idx].set('sgstval'     , txtitsgstvalue.getValue());
            	          	sel[idx].set('igstper'     , txtitigstper.getValue());
        	          	sel[idx].set('igstval'     , txtitigstvalue.getValue());
           	          	sel[idx].set('otherval'    , txtitothervalue.getValue());
                                sel[idx].set('totalamount' , tamt);  
                           	
                                refresh();
                                grid_tot();
				flxDetail.getSelectionModel().clearSelections();
                           }
             	          else if (cnt > 0) 
                          {
                               Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                          } 
                          else
                          {
                               var RowCnt = flxDetail.getStore().getCount() + 1;
                               flxDetail.getStore().insert(
                                  flxDetail.getStore().getCount(),
                                  new dgrecord({
                                    slno:RowCnt,
                                    itemname:item_combo.getRawValue(),
                            	    itemcode:item_combo.getValue(),
                                    woqty:txtqty.getValue(),
			    	    rate:txtrate.getRawValue(),
				    uom:unit_combo.getRawValue(),
				    cgstper:txtitcgstper.getRawValue(),
				    cgstval:txtitcgstvalue.getRawValue(),	
				    sgstper:txtitsgstper.getRawValue(),
			            sgstval:txtitsgstvalue.getRawValue(),	
				    igstper:txtitigstper.getRawValue(),
				    igstval:txtitigstvalue.getRawValue(),	
				    otherval:txtitothervalue.getRawValue(),	
				    discountper:txtitdiscountper.getRawValue(),
				    discountval:txtitdiscountvalue.getRawValue(),		
				    val:Number(txtqty.getRawValue())*Number(txtrate.getValue()),
				    totalamount:Number(txtitemvalue.getRawValue())+Number(txtitcgstvalue.getRawValue())+Number(txtitsgstvalue.getRawValue())
+Number(txtitigstvalue.getRawValue())+Number(txtitothervalue.getRawValue())-Number(txtitdiscountvalue.getRawValue())
                                 }) 
                              );
                              refresh();
                              grid_tot();
                   }
 
             }
           } }
});

/*-------------------- Second grid panel ---------------------- */
      var dgrecord = Ext.data.Record.create([]);
      var flxDetail = new Ext.grid.EditorGridPanel({
        ddGroup          : 'firstGridDDGroup',
        store            : gridstore2,
        frame            : false,
	sm: new Ext.grid.RowSelectionModel(),
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        height:95,
        width:880,

	x:10,
	y:140,
        sm               : sm,

     /*   tbar:{ xtype: 'toolbar',
                width: 500,
                height: 1,
                item:[
	
        ]},*/
        columns: [
        {id:'sno',header: "S.No",width: 40,align: 'center',sortable: true,hidden: false,dataIndex : 'slno'},
        {id:'itemname',header: "Item Name",width: 285,align: 'center',sortable: true,dataIndex : 'itemname'},
        {id:'code',header: "Code", width: 100,align: 'center',sortable: true,dataIndex : 'itemcode'},
        {id:'woqty',header: " Qty",width: 60,align: 'center',sortable: true,dataIndex : 'woqty'},
        {id:'rate',header: "Rate",width: 60,align: 'center',sortable: true,dataIndex : 'rate'},
        {id:'val',header: "Value",width: 100,align: 'center',sortable: true,dataIndex : 'val'},
        {id:'uom',header: "UOM",width: 60,align: 'center',sortable: true,dataIndex : 'uom'},
	{id:'discountper',header: "Discount%", width: 60,align: 'center',sortable: true, dataIndex : 'discountper'},
	{id:'discountval',header: "Discount Value",width: 60,align: 'center',sortable: true,dataIndex : 'discountval'},
 	{id:'cgstper',header: "Cgst%",width: 60,align: 'center',sortable: true,dataIndex : 'cgstper'},
	{id:'cgstval',header: "Cgst Value",width: 60,align: 'center',sortable: true,dataIndex : 'cgstval'},
	{id:'sgstper',header: "Sgst%", width: 60,align: 'center', sortable: true,  dataIndex : 'sgstper' },
	{id:'sgstval',header: "Sgst Value",width: 60,align: 'center',sortable: true,dataIndex : 'sgstval'},
	{id:'igstper',header: "Igst%",width: 60,align: 'center',sortable: true,dataIndex : 'igstper' },
	{id:'igstval',header: "Igst Value", width: 60,align: 'center', sortable: true,dataIndex : 'igstval'},
	{id:'otherval',header: "Other Value", width: 60,align: 'center',sortable: true,	    dataIndex : 'otherval'},
	{id:'totalamount',header: "Total Value",width: 60,align: 'center',sortable: true,dataIndex : 'totalamount'}
       
        ],
        stripeRows: true,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Work order Preparation',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
              msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){

        	if (btn === 'yes'){
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
//                       	slno:RowCnt,
//                       	item_combo.setRawValue(selrow.get('itemname'));
                      	item_combo.setValue(selrow.get('itemcode'));
//alert(selrow.get('woqty'));
        	    	txtqty.setValue(selrow.get('woqty'));
		    	txtrate.setValue(selrow.get('rate'));

			unit_combo.setRawValue(selrow.get('uom'));
			txtitcgstper.setValue(selrow.get('cgstper'));
			txtitcgstvalue.setValue(selrow.get('cgstval'));	
			txtitsgstper.setValue(selrow.get('sgstper'));
			txtitsgstvalue.setValue(selrow.get('sgstval'));	
			txtitigstper.setValue(selrow.get('igstper'));
			txtitigstvalue.setValue(selrow.get('igstval'));	
			txtitothervalue.setValue(selrow.get('otherval'));	
			txtitdiscountper.setValue(selrow.get('discountper'));
			txtitdiscountvalue.setValue(selrow.get('discountval'));		
                        calculateItemValue()
			flxDetail.getSelectionModel().clearSelections();
			}
                else if (btn === 'no'){
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                }
                calculateItemValue();
                grid_tot();
             }
        });     

    
    }
 }

     });

var txttotalvalue = new Ext.form.TextField({
    width: 90,
    emptyText:'Total Value',
    style:'text-align:right',
    name: 'txttotalvalue',
    readOnly:true,
    x: 100,
    y: 20,	
 
    
})

 

 



var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Work Order Entry',
        style        : 'margin: 5px ',
        height       : 650,
        frame        : false,
        bodyStyle    : 'background: url(/WorkOrder/icons/img1.jpg)',
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
        fieldsetContainer,
      
                 /*    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                   // height: 65,
                    labelWidth:70,
                    width: 200,
                    x: -10,  //10,
                    y: 0,
                    items: [txtwono]
                },
                
              {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                   // height: 65,
                    labelWidth:70,
                    width: 200,
                    x: -10,  //10,
                    y: 28,
                    items: [dtppodate]
                },          */      
         
               {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                   // height: 65,
                    labelWidth:70,
                    width: 200,
                    x: -10,  //10,
                    y: 0,
                    items: [cmbwono]
                },

              {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 65,
                    labelWidth:70,
                    width: 200,
                    x: 590,  //10,
                    y: 28,
                    items: [dtprefdate]
                },

                   {
                    xtype: 'fieldset',
                    title: 'Department & Work Order Name',
                    border: true,
                    height: 65,
                    labelWidth:35,
                    width: 700,
                    x: 5,  //10,
                    y: 65,
                    items: [
                        cmbDepartment

                    ]
                },
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:70,
                    width: 400,
                    x: 300,  //10,
                    y: 75,
                    items: [
                        
                           cmbWOName
                    ]
                },
/*
			{
                xtype: 'fieldset',
                title: '',
                layout      : 'absolute',
               	style       : 'padding:0px',
                height:70,
                width:200,
                x: 700,
                y:10,
              items: [
            		{
                	xtype	: 'radiogroup',
			border  :  false,
                	x       : 10,
                	y       : 10,
                	columns :  1,
                	items: [
                    	{boxLabel: 'Work Order', name: 'opt_select', inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					contflag="C";
					txtitcgstper.setDisabled(true);
					txtitsgstper.setDisabled(true);
					txtitigstper.setDisabled(true);
					txtitotherper.setDisabled(true);
					txtitcgstvalue.setDisabled(true);
					txtitsgstvalue.setDisabled(true);
					txtitigstvalue.setDisabled(true);
					txtitothervalue.setDisabled(true);
					txtitdiscountper.setDisabled(true);
					txtitdiscountvalue.setDisabled(true);


					}
                                    }
                                }},
			{boxLabel: 'Work Order Item & Labor', name: 'opt_select', inputValue: '2',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					contflag="C";
					txtitcgstper.setDisabled(false);
					txtitsgstper.setDisabled(false);
					txtitigstper.setDisabled(false);
					txtitotherper.setDisabled(false);
					txtitcgstvalue.setDisabled(false);
					txtitsgstvalue.setDisabled(false);
					txtitigstvalue.setDisabled(false);
					txtitothervalue.setDisabled(false);
					txtitdiscountper.setDisabled(false);
					txtitdiscountvalue.setDisabled(false);
					}
                                    }
                                }},
		   
		   
		    
                ]
            }
 	  



        ]
            },
                
  */
          {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 300,
            width: 900,
            x: 10,
            y: 135,
            items: [
            {
                xtype: 'panel',
                title: 'Item Details',
                width: 220,
                height: 200,
                layout: 'absolute',
                items: [

                {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 50,
                    width: 875,
                    x: 10,
                    y: 5,
                    labelWidth:35,
                    items: [
                        item_combo
                    ]
                },optdiscyn,	
 		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 55,
                    width: 730,
                    x: 30,
                    y: 230,
                    labelWidth:70,
                    items: [
                        txtttotalqty
                    ]
                },
 		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 55,
                    width: 300,
                    x: 210,
                    y: 230,
                    labelWidth:70,
                    items: [
                        txtttotalvalue
                    ]
                },
                
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:50,
                    width: 150,
                    x: 590,
                    y: 5,
                    items: [txtqty]
                },
		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:30,
                    width: 180,
                    x: 750,
                    y: 5,
                    items: [txtitemvalue
                      
                       
                    ]
                },
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:55,
                    width: 150,
                    x: 450,
                    y: 5,
                    items: [
                      unit_combo
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:25,
                    width: 150,
                    x: 310,
                    y: 5,
                    items: [
                         txtrate
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:25,
                    width: 150,
                    x: 775,
                    y: 100,
                    items: [
                   btnsubmit
                       
                    ]
                },
       		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 76,
                    labelWidth:60,
		  
                    width: 180,
                    x: 125,
                    y: 75,
		  
                    items: [
                   txtitcgstper,txtitcgstvalue
                       
                    ]
                },
		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 76,
                    labelWidth:60,
		 
                    width: 180,
                    x: 250,
                    y: 75,
                    items: [
                   txtitsgstper,txtitsgstvalue
                       
                    ]
                },
		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 76,
                    labelWidth:60,
		   
                    width: 180,
                    x: 380,
                    y: 75,
                    items: [
                   txtitigstper,txtitigstvalue
                       
                    ]
                },
		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 76,
                    labelWidth:60,
                    width: 150,
                    x: 500,
                    y: 100,
                    items: [
                    txtitothervalue
                       
                    ]
                },
	
		{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 76,
                    labelWidth:60,
		   
                    width: 150,
                    x: 0,
                    y: 75,
                    items: [
                   txtitdiscountper,txtitdiscountvalue
                       
                    ]
                },
             
                     flxDetail
                    
                
                ]
            },
            {
                xtype: 'panel',
                title: 'Amount Details',
                width: 383,
                height: 200,
                layout: 'absolute',
                items: [
              		{
		           xtype: 'fieldset',
                           title: 'Values Total',
                           border: true,
                           height: 220,
                           width: 350,
                           x: 5,
                           y: 10
			},
			{
                 	    xtype: 'fieldset',
                            title: 'Other Values',
                            border: true,
                            height: 220,
                            width: 450,
                            x: 380,
                            y: 10,
                            items: [
                         	{
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  labelWidth:100,  
                                  width: 450,
                                  x: 0,
                                  y: 0,
                                  items: [txtFreight1,cmbfrtparty1, txtFreight2,cmbfrtparty2,txtdiscountscrapval]
                               },
                            ]
                         },
   

/*         
			{
		          xtype: 'fieldset',
                          title: 'Labour Charges',
                          border: true,
                          height: 220,
                          width: 270,
	                  x: 620,
                          y: 10
 		},
 
*/

                {xtype: 'label',text: 'Tot. Value',x: 10,y: 30,style:'font-size:11'},
                txttotalvalue,
                {xtype: 'label',text: 'Tot. Discount',x: 10,y: 55,style:'font-size:11'},
                txtdiscount,

                {xtype: 'label',text: 'TOT.CGST.AMT',x: 10,y: 80,style:'font-size:11'},
                txtcgsttotal,

                {xtype: 'label',text: 'TOT.SGST.AMT',x: 10,y: 105,style:'font-size:11'},
                txtsgsttotal,
                {xtype: 'label',text: 'TOT.IGST.AMT',x: 10,y: 130,style:'font-size:11'},
                txtigsttotal,

                {xtype: 'label',text: 'TOT.OTH.AMT',x: 10,y: 155,style:'font-size:11'},
                txtothertotal,

                {xtype: 'label',text: 'Sub Total',x: 10,y: 190,style:'font-size:11'},
                txtsubtotal,
/*
                {xtype: 'label',text: 'CGST % & AMT',x: 630,y: 130,style:'font-size:11'},
                txtsgstper,           txtcgstvalue,
                {xtype: 'label',text: 'SGST % & AMT',x: 630,y: 170,style:'font-size:11'},
                txtcgstper,
                txtsgstvalue,
                {xtype: 'label',text: 'IGST % & AMT',x: 630,y: 210,style:'font-size:11'},
                txtigstper,

                txttrnsper,
                {xtype: 'label',text: 'Trns per Unit',x: 320,y: 30,style:'font-size:11'},

                txttrnsvalue,
// ANNA

                {
                    xtype: 'fieldset',
                    title: 'Less Disc for GST calc',
                    border: true,
                    height:140,
                    width: 100,
                    x: 200,
                    y: 30,
                    labelWidth:0,
                    items: [
                lessdiscyes,lessdiscno,      
                    ]
                },
*/

//                txtigstvalue,
               

//                {xtype: 'label',text: 'Other Charges',x: 320,y: 50,style:'font-size:11'},
//                txtothercharges,


//                {xtype: 'label',text: 'Dis/Scrap Exchange',x: 400,y: 120,style:'font-size:11'},
//                txtdiscountscrapval,
                {xtype: 'label',text: 'Total Amount',x: 400,y: 180,style:'font-size:11'},
                txttotalfinalamt,

                ]
            },

		
            {
                xtype: 'panel',
                title: 'Other Terms',
                width: 200,
                height: 300,
                layout: 'absolute',
                items: [
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 250,
                    width: 800,
                    x: 0,  
                    y: 5,
                    items: [
                         txtprice,cmbPayterm,txtCreditDays,txtremarks                    ]
                }
                 
                ]
            }
            ]
        },
/*
        {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 57,
                    width: 150,
                    layout : 'hbox',
                    x: 15,  
                    y: 446,
                    items: [
                     normal,zeroval,
                    ]
                },
*/
                   optzerovalueyn, optdcyn,
/*                  {

                    xtype: 'fieldset',
                    title: 'DC NEED',
                    border: true,
                    height: 65,
                    width: 150,
                    layout : 'hbox',
                    labelwidth :10,
                    x: 170,  
                    y: 440,
                    items: [
//                     dcneededyes ,dcneededno,
                    ]
                },

  */                {
                    xtype: 'fieldset',
                    title: 'Work Order Period',
                    border: true,
                    height: 65,
                    width: 450,

                    x: 350,  
                    y: 440,
                    items: [
                     dtpstartdate
                    ]
                }
                ,
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 65,
                    width: 250,
                    x: 560,  
                    y: 455,
                    
                    items: [
                     dtpenddate
                    ]
                }
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 30,
            items: [
            editbtn,'-',
            savebtn,'-',
            {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Click To Refresh',
                icon:'/WorkOrder/icons/refresh.gif',
                width: 50,
                handler: function(){
                         myFormPanel.getForm().reset();
                         flxDetail.getStore().removeAll();
                         RefreshData();
               }      

            },'-',

            exitbtn,

           ]
        }
    });

function RefreshData(){
                 gstFlag = "Add"
                         myFormPanel.getForm().reset();
                         flxDetail.getStore().removeAll();

                txtdiscount.setValue('');
                txtcgsttotal.setValue('');
                txtcgsttotal.setValue('');
                txtigsttotal.setValue('');
                txtothertotal.setValue('');
                txtsubtotal.setValue('');
txttotalvalue.setValue('');
txtsgsttotal.setValue('');
txtFreight1.setValue('');
txtFreight2.setValue('');

                txttotalfinalamt.setValue('');
              Ext.getCmp('cmbwono').hide();
			distype = 'N';
			DEPTDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loaddept'
        	        }
        		    });

			ItemLoadDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loaditem'
        	        }
        		    });

			VendorDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadsupplier'
        	        }
        		    });

			PaytermDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadpayterm'
        	        }
        		    });

			WorkorderDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadwo'
        	        }
        		    });

			loadwonoDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadwono',
 		            compcode:Gincompcode,
                            finid:Ginfinid   

        	        },
				callback:function()
				{
				txtwono.setRawValue(loadwonoDataStore.getAt(0).get('wono'));
				}
        		    });
}


var window_form = new Ext.Window({
                         width        : 945,         //1340,
                         height       : 650,
                         items        : myFormPanel,
                         closable:false,
                         resizable:false,
                         draggable:false,
                         x:200,
                         y:35,
			 listeners:
			 {
		          show:function(){
                               RefreshData();
		         	}
			 }


	});
  window_form.show();
  
}); //var cmbparty
