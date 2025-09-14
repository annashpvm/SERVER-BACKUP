 Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstFlag;
   var fbo_flg,porate;




   var Ginfinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');;
   var indyear = Ginfinid;


    var GinUser = localStorage.getItem('ginusername');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');


   var inditemcode;
   var statecode = 'T';
   var purheadname = '';
   var itemhsncode;
   var potype='B';
   var dept;

   var disamt =0;
   var pfamt = 0

   var editrow = 0;
   var gridedit = "false";

   var Validatechk = "true";

   var viewpoopt = 0; 
   var indqty = 0;
   var printtype = "PDF";
   var supcode = 0;

   var grnqty = 0; 

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}




var roundoff ="Y";
var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 130,
    height:100,
    defaultType : 'textfield',

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
                 CalculatePOVal();   
                  }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                CalculatePOVal();   
               }
              }
             }},

        ],
    },

    ],
});


 var findIndentSpecdatastore = new Ext.data.Store({
      id: 'findIndentSpecdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIndentSpec"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'ind_remarks'
 
      ]),
    });



 var findPurchaseHeaddatastore = new Ext.data.Store({
      id: 'findPurchaseHeaddatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPurchaseHead"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dept_code', 'dept_name', 'dept_headname' 
 
      ]),
    });




 var findGSTDetaildatastore = new Ext.data.Store({
      id: 'findGSTDetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
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
    });


var loadPONOListDatasore = new Ext.data.Store({
  id: 'loadPONOListDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPONOList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['phd_pono'
  ])
});



function refresh() {

  txtRebate.setValue('');
  cmbItems.setRawValue('');
  txtqty.setRawValue(0);                            
  txtRate.setRawValue(0);
  txtValue.setRawValue(0),
  txtDiscount.setRawValue(0);
  txtDiscountval.setRawValue(0);
  txtpf.setRawValue(0);
  txtpfval.setRawValue(0);
  txtfr1.setRawValue(0);
  txtfr2.setRawValue(0);
 // txtIGST.setRawValue(0);  
  txtIGSTvalue.setRawValue(0);
//  txtSGST.setRawValue(0);
  txtSGSTvalue.setRawValue(0);
//  txtCGST.setRawValue(0);
  txtCGSTvalue.setRawValue(0);
  txtOthers.setRawValue(0);
  txtTCS.setRawValue(0);
  txtTCSvalue.setRawValue(0);
  txtItemValue.setRawValue(0);
  txtItemSpec.setRawValue();
 
/*

                    var RowCnt = flxSpecfications.getStore().getCount() + 1;
                    flxSpecfications.getStore().insert(
                        flxSpecfications.getStore().getCount(),
                        new dgrecord({
                        });

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


       txtValue.setRawValue(itemvalue);

       if (txtSGST.getRawValue() > 0)  {
           txtCGST.setRawValue(txtSGST.getRawValue());   
       }






       txtDiscountval.setRawValue(itemvalue * txtDiscount.getRawValue() /100);

       if (txtpf.getRawValue() > 0)
       {
          txtpfval.setRawValue(value1* txtpf.getRawValue()/100);
       } 

       txtCGSTvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));
       txtSGSTvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));
       txtIGSTvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));
       txtTCSvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));


       itemvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtqty.getRawValue()),'0.000');
       txtValue.setRawValue(itemvalue);


       if (txtDiscount.getRawValue() > 0 && itemvalue > 0 )  {
          txtDiscountval.setRawValue(itemvalue * txtDiscount.getRawValue() /100);
       }    
     
       value1 = itemvalue - Number(txtDiscountval.getRawValue());


       if (txtpf.getRawValue() > 0 && itemvalue > 0 )  {
          txtpfval.setRawValue(value1* txtpf.getRawValue()/100);
       }

       taxable = value1 + Number(txtpfval.getRawValue())+Number(txtfr1.getRawValue())+Number(txtOthers.getRawValue());
       
       if (txtCGST.getRawValue() > 0 && itemvalue > 0 )  {
           cgst = taxable * txtCGST.getRawValue()/100;   
       }
//       txtCGSTvalue.setRawValue(Ext.util.Format.number(cgst,"0.00"));
  
//       txtCGSTvalue.setRawValue(Ext.util.Format.number(Math.round(cgst,'0.00')));
//  txtCGSTvalue.setRawValue(Ext.util.Format.number(Math.round(cgst,2),'0.00'));
       txtCGSTvalue.setRawValue(Ext.util.Format.number(cgst,'0.00'));


       if (txtSGST.getRawValue() > 0 && itemvalue > 0 )  {
           sgst = taxable * txtSGST.getRawValue()/100;   
       }
       txtSGSTvalue.setRawValue(Ext.util.Format.number(sgst,'0.00'));


       if (txtIGST.getRawValue() > 0 && itemvalue > 0 )  {
           igst = taxable * txtIGST.getRawValue()/100;   
       }
       txtIGSTvalue.setRawValue(Ext.util.Format.number(igst,'0.00'));

      
       value2 = taxable + cgst + sgst+igst + Number(txtOthers.getRawValue())

       if (txtTCS.getRawValue() > 0 && value2 > 0 )  {
           txtTCSvalue.setRawValue(Ext.util.Format.number(value2 * txtTCS.getRawValue()/100,'0.00'));   
       }


 

       sumitemvalue = taxable + cgst + sgst+igst +Number(txtfr2.getRawValue())+ Number(txtTCSvalue.getRawValue())- Number(txtRebate.getValue())


       if (sumitemvalue <0)
          sumitemvalue = 0;

//       txtItemValue.setRawValue(Ext.util.Format.number(Math.round(sumitemvalue),'0.00'));
       txtItemValue.setRawValue(Ext.util.Format.number(sumitemvalue,'0.00'));


}

function grid_tot(){
	fdbl_totalvalue=0;

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+sel[i].data.totvalue;
        }
        lblGrandtotal.setText(fdbl_totalvalue);
}



function CalculatePOVal()
{


    
txtGrossval.setValue('');
txtTotIGST.setValue('');
txtTotSGST.setValue('');
txtTotCGST.setValue('');
txtNetval.setValue('');
txttotdisval.setValue('');
txttotothval.setValue('');


var Row= flxDetail.getStore().getCount();

var selrows1 = flxDetail.getSelectionModel().getCount();
var sel1 = flxDetail.getSelectionModel().getSelections();

var gintotgross = 0;
var gindiscountvalue = 0;
var ginpfvalue = 0;
var ginfrt1value = 0;
var ginfrt2value = 0;
var ginigstvalue = 0;
var ginsgstvalue = 0;
var gincgstvalue = 0;
var ginothersvalue = 0;
var gintcsvalue = 0;
var ginnetvalue = 0;

grnqty = 0;
for (var i=0;i<selrows1;i++){
//alert(parseFloat(sel1[i].data.value));
//alert(parseFloat(sel1[i].data.freight));
//alert(parseFloat(sel1[i].data.othervalue));


gintotgross = parseFloat(gintotgross) + parseFloat(sel1[i].data.value);
gindiscountvalue = parseFloat(gindiscountvalue) + parseFloat(sel1[i].data.discvalue);
ginpfvalue = parseFloat(ginpfvalue) + parseFloat(sel1[i].data.pfvalue);
ginfrt1value = parseFloat(ginfrt1value) + parseFloat(sel1[i].data.freight); 
ginfrt2value = parseFloat(ginfrt2value) + parseFloat(sel1[i].data.freight2);
ginigstvalue = parseFloat(ginigstvalue) + parseFloat(sel1[i].data.igstvalue);
ginsgstvalue = parseFloat(ginsgstvalue) + parseFloat(sel1[i].data.sgstvalue);
gincgstvalue = parseFloat(gincgstvalue) + parseFloat(sel1[i].data.cgstvalue);
gintcsvalue = parseFloat(gintcsvalue) + parseFloat(sel1[i].data.tcsvalue);
ginothersvalue = parseFloat(ginothersvalue) + parseFloat(sel1[i].data.othervalue);

ginnetvalue = parseFloat(ginnetvalue) + parseFloat(sel1[i].data.totitemval);
grnqty = parseFloat(grnqty) + parseFloat(sel1[i].data.recdqty);


};


if (roundoff == "N")
{  
   ginnetvalue =  ginnetvalue.toFixed(2);
   txtroundoff.setRawValue(0.00);  
}
else   
{
   var totvalue =  ginnetvalue.toFixed(0);
   txtroundoff.setValue(Ext.util.Format.number(totvalue-ginnetvalue,"0.00"));
   ginnetvalue = totvalue;
}




txtGrossval.setValue(parseFloat(gintotgross));
txttotdisval.setValue(parseFloat(gindiscountvalue));
txttotpfval.setValue(parseFloat(ginpfvalue));

txttotfr1val.setValue(parseFloat(ginfrt1value));
txttotfr2val.setValue(parseFloat(ginfrt2value));

txtTotIGST.setValue(parseFloat(ginigstvalue));
txtTotSGST.setValue(parseFloat(ginsgstvalue));
txtTotCGST.setValue(parseFloat(gincgstvalue));
txttotothval.setValue(parseFloat(ginothersvalue));


txtNetval.setValue(parseFloat(ginnetvalue));





};


var VendoraddDataStore = new Ext.data.Store({
  id: 'vendoradd',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "vendoradd"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['cust_addr1','cust_addr2','cust_addr3','sup_city','cust_taxtag','cust_state'
  ])
});


var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
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




var POdetailsLoadDataStore = new Ext.data.Store({
  id: 'POdetailsLoadDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "Loadpoitemdetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
 
'ptr_podate','ptr_from','ptr_item_code','ptr_slno','ptr_unit_rate','ptr_ord_qty','ptr_rec_qty','ptr_frt_per','ptr_discount','ptr_pf_per','ptr_freight_amt',
'ptr_oth_amt','ptr_reason','ptr_ref_comp_code','ptr_ref_fin_code','ptr_ref_no','ptr_ref_date','ptr_ind_comp_code','ptr_ind_fin_code','ptr_ind_no',
'ptr_status_ref','ptr_catery','ptr_status','ptr_itemdesc','ptr_close_status','ptr_pftype','ptr_disval','ptr_pfval','ptr_sstval','ptr_duty','ptr_educess_per',
'ptr_educessval','ptr_cgst_per','ptr_cgst_amt','ptr_sgst_per','ptr_sgst_amt','ptr_igst_per','ptr_igst_amt','ptr_machine','ptr_tcs_per','ptr_tcs_amt','ptr_frt2',
'cancelflag','item_name','phd_podate','phd_from','phd_sup_code','phd_credit_days','phd_transport','phd_pay_terms','phd_ins_terms','phd_dely_point','phd_dely_sch',
'phd_frt_terms','phd_remarks','phd_advance','phd_adv1','phd_adv2','phd_adv3','phd_adv4','phd_paydate1','phd_paydate2','phd_paydate3','phd_paydate4','phd_redamt',
'phd_redate','phd_bank_guarantee','phd_roundoff','phd_total','phd_amnd_status','phd_cancel_status','phd_cancel_reason','phd_refno','phd_valdays',
'phd_bank','phd_tol','phd_e1sale','phd_ent_date','phd_party_refno','phd_party_refdate','phd_payment_info','phd_iteminfo','phd_urgent','cancelflag',
'cust_ref','cust_addr1','cust_addr2','cust_addr3','sup_city','phd_prepared_by','phd_spl_instruction','ptr_purgroup','cust_name',
'ptr_rebate','ptr_remarks','phd_deliverydate','usr_name','led_name','phd_freight','phd_other_ref','phd_deliverydate','phd_round_needed','phd_dept',
'ptr_uom' , 'uom_short_name','cust_state'

  ])
});


var PonoDetailDataStore = new Ext.data.Store({
  id: 'PonoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "PonoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'pono'
  ])
});

var IndentNoDetailDataStore = new Ext.data.Store({
  id: 'IndentNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "IndnoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ind_no','ind_fin_code' ])
});

var IndentNoqtyDataStore = new Ext.data.Store({
  id: 'IndentNoqtyDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "Indnoqty"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'ind_remarks','ind_machine','ind_qty','uom_short_name','ind_item_code','uom_code'
  ])
});


var POindentnoDataStore = new Ext.data.Store({
  id: 'POindentnoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbpoindentno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['storeind_no','storeind_seqno'])
});

var ItemStockDataStore = new Ext.data.Store({
  id: 'ItemStockDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "itemstock"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itemstock'])
});


var AlreadypoqtyDatastore = new Ext.data.Store({
  id: 'AlreadypoqtyDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "alreadypoqty"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordqty'])
});

var bomqtyDataStore = new Ext.data.Store({
  id: 'bomqtyDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadbomqty"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['bomqty','balqty'])
});

var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'cust_code','cust_ref'
  ])
});

var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadItem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'item_code','item_name','ind_date'
  ])
});

var follDataStore = new Ext.data.Store({
  id: 'follDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbfollower"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'followerseqno','followername'
  ])
});

var DEPTDataStore = new Ext.data.Store({
  id: 'DEPTDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbDepartment"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'dept_code', type: 'int', mapping: 'dept_code'},
    {name: 'dept_name', type: 'string', mapping: 'dept_name'}
  ])
});



var uomDataStore = new Ext.data.Store({
  id: 'uomDataStore',

   autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadUOM"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'uom_code', type: 'int', mapping: 'uom_code'},
    {name: 'uom_short_name', type: 'string', mapping: 'uom_short_name'}
  ])
});


/*var indnoDataStore = new Ext.data.Store({
  id: 'indnoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbindno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'storeind_seqno', type: 'int', mapping: 'storeind_seqno'},
    {name: 'storeind_no', type: 'string', mapping: 'storeind_no'}
  ])
});

var currDataStore = new Ext.data.Store({
  id: 'currDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsPo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbcurrency"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'currency_code', type: 'int', mapping: 'currency_code'},
    {name: 'currency_name', type: 'string', mapping: 'currency_name'}
  ])
});


var logoDataStore = new Ext.data.Store({
id: 'logoDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "cmbemslogo"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
{name: 'logo_code', type: 'int', mapping: 'logo_code'},
{name: 'logo_name', type: 'string', mapping: 'logo_name'}
])
});

*/

var ItemGridDetailDataStore = new Ext.data.Store({
id: 'ItemGridDetailDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "ItemGridDetail"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'qo_no','qo_date','vendor_name','qo_itemrate','qo_taxtype','PONo','PODate',
'PoEdPer','PoTngstPer','PoCstPer','PoDiscountPer','PoIGSTPer','PoSGSTPer','PoCGSTPer'
])
});

var ClickDeptDataStore = new Ext.data.Store({
id: 'ClickDeptDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "ClickDept"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'dept_code','dept_name'
])
});

/*
var ClickFollowerDataStore = new Ext.data.Store({
id: 'ClickFollowerDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "ClickFollower"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'qo_no','qo_seqno'
])
});
*/


var QonoDetailsDataStore = new Ext.data.Store({
id: 'QonoDetailsDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "QonoDetails"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'qo_itemrate','qo_date','qo_qty','qo_item_remarks','qo_cgst_per','qo_sgst_per','qo_igst_per'
])
});

var QodetailsDatastore = new Ext.data.Store({
id: 'QodetailsDatastore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "Qodetails"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'qo_duedate','qo_cgst_per','qo_sgst_per','qo_igst_per','qo_others_per','qo_discount_per',
'qo_freight_flag','qo_guarantee','qo_payterm','qo_others_per','qo_othersval'
])
});



var IndentDetailsDataStore = new Ext.data.Store({
id: 'IndentDetailsDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "IndentDetails"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},[
'pend_qty','unit_id','storeind_remarks','item_code','storeind_date'
])
});

var ItemHSNCodeDataStore = new Ext.data.Store({
id: 'ItemHSNCodeDataStore',
proxy: new Ext.data.HttpProxy({
        url: 'ClsPo.php',      // File to connect to
        method: 'POST'
    }),
    baseParams:{task: "loadhsncode"}, // this parameter asks for listing
reader: new Ext.data.JsonReader({
          // we tell the datastore where to get his data from
root: 'results',
totalProperty: 'total',
id: 'id'
},['itemhsncode'])
});

var loadbuyerpodatastore = new Ext.data.Store({
      id: 'loadbuyerpodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadbuyerpo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pono','poseqno'
      ])
    });

var loadbomitemsDatastore = new Ext.data.Store({
      id: 'loadbomitemsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadbomitems"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itemseqno','itemname'
      ])
    });

var loadqonoDatastore = new Ext.data.Store({
      id: 'loadqonoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadqono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'qo_seqno','qo_no'
      ])
    });

var loadpendingqtyDatastore = new Ext.data.Store({
      id: 'loadpendingqtyDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpendingqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'qo_qty'
      ])
    });


var loadTransportDatasore = new Ext.data.Store({
      id: 'loadTransportDatasore',
       autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcarrtype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'carr_code','carr_name'
      ])
    });

/*
var loadPaymentDatasore = new Ext.data.Store({
      id: 'loadTPaymentDatasore',
       autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpaymode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'term_code','term_name'
      ])
    });

*/
var DepartmentcodeDatastore = new Ext.data.Store({
      id: 'DepartmentcodeDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"departmentcode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'deptcode'
      ])
    });
  var loaddeptdatastore = new Ext.data.Store({
      id: 'loaddeptdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'dept_code', type: 'int',mapping:'dept_code'},
	{name:'dept_name', type: 'string',mapping:'dept_name'}
      ]),
    });

var lblPodate = new Ext.form.Label({
    fieldLabel  : 'PO Date',
    id          : 'lblPodate',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblPono = new Ext.form.Label({
    fieldLabel  : 'PO No',
    id          : 'lblPono',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblIndentYear = new Ext.form.Label({
    fieldLabel  : 'Indent Year',
    id          : 'lblIndentYear',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



  function EntryDateCheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_po = dtpPodate.getValue();
        var diffdays = (dt_today.getDate()-dt_po.getDate());
        var diffdays = (dt_today.getTime()-dt_po.getTime());
//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >5)
        {     
            alert("You are Not Allowed to Raise the PURCHASE ORDER in the date of " +  Ext.util.Format.date(dt_po,"d-m-Y"));
            dtpPodate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
            dtpPodate.focus();

        }
        if (diffdays <= 0)
        {     
            alert("System will not allow to raise the SO in future date");
            dtpPodate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
 }


  function EditDateCheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_po = dtpPodate.getValue();
        var diffdays = (dt_today.getDate()-dt_po.getDate());
        var diffdays = (dt_today.getTime()-dt_po.getTime());
//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays > 5)
        {     
            alert("You are Not Allowed to Modify the PURCHASE ORDER in the date of " +  Ext.util.Format.date(dt_po,"d-m-Y"));
             Ext.getCmp('save').setDisabled(true);    

        }

        if (diffdays <= 0)
        {     
            alert("System will not allow to raise the SO in future date");
            dtpPodate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

 }

var dtpPodate = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly   : true, //'comment for trail 
    anchor     : '100%',
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbDepartment.focus();
                  EntryDateCheck();
             }
           },
           change:function(){
               dateval=dtpPodate.getValue();
                  EntryDateCheck();
            },
           blur:function(){
               dateval=dtpPodate.getValue();
                  EntryDateCheck();
            }, 
            keyup:function(){
               dateval=dtpPodate.getValue();
                  EntryDateCheck();
            },
    } 
});

var lblunit = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblunit',
    width       : 90,

    style:{
         color: 'Red' ,
         backgroundColor:'White'
    }
});


var lblPartyname = new Ext.form.Label({
    fieldLabel  : 'Party Name',
    id          : 'lblPartyname',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var itemcode;

/*
var cmbPartyname = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 350,
    displayField    : 'cust_ref',
    valueField      : 'cust_code',
    hiddenName      : 'cust_code',
    id              : 'cmbPartyname',
    typeAhead       : true,
    mode            : 'local',
    store           : VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyref.focus();
             }
             },
        select: function(){
            //Ext.getCmp('cmbItems').setDisabled(false);            
            //ItemLoadDataStore.removeAll();
            VendoraddDataStore.removeAll();
            VendoraddDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"vendoradd",
                    vendor: cmbPartyname.getValue()
                   
                },
                scope: this,
                callback: function () {
                 var vendorcount;
                   vendorcount=0;
                   vendorcount=VendoraddDataStore.getCount();

                   //Ext.Msg.alert("Alert",vendorcount);
                   if(vendorcount > 0)
                   {
                    //Ext.getCmp('cmbItems').setDisabled(false);
                    txtAddr1.setRawValue(VendoraddDataStore.getAt(0).get('cust_addr1'));
                    txtAddr2.setRawValue(VendoraddDataStore.getAt(0).get('cust_addr2'));
                    txtAddr3.setRawValue(VendoraddDataStore.getAt(0).get('cust_addr3')+","+VendoraddDataStore.getAt(0).get('sup_city'));

                    var statetype=VendoraddDataStore.getAt(0).get('cust_taxtag');
                    txtIGST.setValue('');
                    txtIGSTvalue.setValue('');
                    txtSGST.setValue('');
                    txtSGSTvalue.setValue('');
                    txtCGST.setValue('');
                    txtCGSTvalue.setValue('');

                      if(statetype==='1')
                      {
                         Ext.getCmp('txtIGST').setDisabled(true);                      
                         Ext.getCmp('txtIGSTvalue').setDisabled(true);   
                         Ext.getCmp('txtSGST').setDisabled(false);                      
                         Ext.getCmp('txtSGSTvalue').setDisabled(false);     
                         Ext.getCmp('txtCGST').setDisabled(false);                      
                         Ext.getCmp('txtCGSTvalue').setDisabled(false);

                      }
                      else 
                      {
                         Ext.getCmp('txtIGST').setDisabled(false);                      
                         Ext.getCmp('txtIGSTvalue').setDisabled(false);   
                         Ext.getCmp('txtSGST').setDisabled(true);                      
                         Ext.getCmp('txtSGSTvalue').setDisabled(true);     
                         Ext.getCmp('txtCGST').setDisabled(true);                      
                         Ext.getCmp('txtCGSTvalue').setDisabled(true);

                      }
      

                   else
                       {
                           Ext.getCmp('cmbItems').setDisabled(true);
                           Ext.Msg.alert("Alert",'Vendor Provision and State type not updated');
                           cmbItems.setValue('');
                           txtAddr1.setRawValue('');
                           txtAddr3.setRawValue('');
                           txtAddr2.setRawValue('');
                       }
                }
            });

        }
    }
});

*/

  var cmbDepartment = new Ext.form.ComboBox({
        fieldLabel      : 'Department',
        width           : 220,
        displayField    : 'dept_name',
        valueField      : 'dept_code',
        hiddenName      : 'dept_name',
        id              : 'cmbDepartment',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loaddeptdatastore,     
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurGroup.focus();
             }
             },
        select: function(){
	    IndentNoDetailDataStore.removeAll();
	    IndentNoDetailDataStore.load({
		 	url: 'ClsPo.php',
			params: {
				task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,
                                dept : cmbDepartment.getValue(),
		    		},
	    });

	}
} 
   });
var lblItems = new Ext.form.Label({
    fieldLabel  : 'Item Names',
    id          : 'lblItems',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});
var lblPurGroup = new Ext.form.Label({
    fieldLabel  : 'Pur. Group',
    id          : 'lblPurGroup',
    width       : 150,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});
var lblbuyerpo = new Ext.form.Label({
    fieldLabel  : 'Prod No',
    id          : 'lblbuyerpo',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblOthers = new Ext.form.Label({
    fieldLabel  : 'Other Amt',
    id          : 'lblOthers',
    width       : 80,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var icode,deptcode;


var txtindfinyear = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtindfinyear',
    width       : 70,
    name        : 'txtindfinyear',
    readOnly    : true,
    autoCreate  : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:2},
    listeners:{
        keyup:function(){
                indyear = txtindfinyear.getValue();
		IndentNoDetailDataStore.removeAll();
		IndentNoDetailDataStore.load({
        	  url: 'ClsPo.php',
		  params: {
				task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,
	      	  },

    		});
         },
         change:function(){
 
		IndentNoDetailDataStore.removeAll();
		IndentNoDetailDataStore.load({
		url: 'ClsPo.php',
		        params: {
				task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,
	      		},
    		});
    }
    }
});

/*

var txtindfinyear = new Ext.form.NumberField({
    fieldLabel      : '',
    width           : 50,
    displayField    : '',
    valueField      : '',
    hiddenName      : '',
    id              : 'txtindfinyear',
    typeAhead       : true,
    mode            : 'local',
    store           : [],
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    autoCreate      : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:2},
    enableKeyEvents: true,
    listeners:{
        keyup:function(){
           indyear = txtindfinyear.getValue();

			IndentNoDetailDataStore.removeAll();
			IndentNoDetailDataStore.load({
                	url: 'ClsPo.php',
	                params: {
			        task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,
//		                iyear:indyear
              		},

            		});

        }
    }

});
*/



var cmbItems = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 300,
    displayField    : 'item_name',
    valueField      : 'item_code',
    hiddenName      : 'item_code',
    id              : 'cmbItems',
    typeAhead       : true,
    mode            : 'local',
    store           : ItemLoadDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtqty.focus();
             }
             },
        select:function(){

//alert(cmbindno.getRawValue());
//alert(this.getValue());
                        indqty = 0;
			IndentNoqtyDataStore.load({
                        url: 'ClsPo.php',
                        params:
                            {
                                task:"Indnoqty",
                                itmcode: cmbItems.getValue(),
				finid:indyear,
				compcode:Gincompcode,
				indno:cmbindno.getRawValue()
                            },
                            scope: this,
                            callback: function () 
				{
//alert(IndentNoqtyDataStore.getAt(0).get('uom_short_name'));

                                inditemcode = IndentNoqtyDataStore.getAt(0).get('ind_item_code');  
                                txtqty.setRawValue(IndentNoqtyDataStore.getAt(0).get('ind_qty'));
                                indqty = IndentNoqtyDataStore.getAt(0).get('ind_qty');                             

                                lblunit.setText(IndentNoqtyDataStore.getAt(0).get('uom_short_name'));
                                 cmbUOM.setValue(IndentNoqtyDataStore.getAt(0).get('uom_code'));
                                txtItemSpec.setRawValue(IndentNoqtyDataStore.getAt(0).get('ind_remarks'));
                                alert(txtItemSpec.split('\r\n'));


                            }
                        });



			/* ItemStockDataStore.load({
                        url: 'ClsPo.php',
                        params:
                            {
                                task:"itemstock",
                                itemcode: cmbItems.getValue()
                            },
                            scope: this,
                            callback: function () 
				{
                                txtStock.setValue(ItemStockDataStore.getAt(0).get('itemstock'));
                            }
                        });

			uomDataStore.load({
                	url: 'ClsPo.php',
                	params: 
				{
                    		task: 'cmbUOM',
			    	itemseq:cmbItems.getValue()
                	},
		callback:function()
			{
			cmbUOM.setRawValue(uomDataStore.getAt(0).get('unit_prefix'));
			cmbUOM.setValue(uomDataStore.getAt(0).get('unit_id'));
			}
            		});

			bomqtyDataStore.load({
                	url: 'ClsPo.php',
                	params: 
				{
                    		task: 'loadbomqty',
				poseq:cmbbuyerpo.getValue(),
			    	itemseq:cmbItems.getValue(),
   			 	potype:potype
        	        	},
			callback:function()
			{
			var bomqty = txtbomqty.setRawValue(bomqtyDataStore.getAt(0).get('bomqty'));
			//var balqty = txtPendqty.setRawValue(bomqtyDataStore.getAt(0).get('balqty'));
			txtbomqty.setRawValue(Math.round(Math.abs(bomqtyDataStore.getAt(0).get('bomqty'))),2);
//			txtPendqty.setRawValue(Math.round(Math.abs(bomqtyDataStore.getAt(0).get('balqty'))),2);

			}
            		});*/
                    
	
          /*  ItemHSNCodeDataStore.removeAll();
            ItemHSNCodeDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"loadhsncode",
                   // itemcomcode:Gincompcode,
                    itemcode:cmbItems.getValue()
                },
                scope: this,
                callback: function () {
                    var hsncount;
                    hsncount=ItemHSNCodeDataStore.getCount();
		    //alert(hsncount);
                    if(hsncount > 0)
                    {
                        itemhsncode="";
                        itemhsncode=ItemHSNCodeDataStore.getAt(0).get('itemhsncode');      
                        flx_poDetails.show();
                        flxDetail.hide();
                        icode=this.getValue();
                        ItemStockDataStore.removeAll();
                        ItemGridDetailDataStore.removeAll();
                        POindentnoDataStore.removeAll();
                        ClickDeptDataStore.removeAll();
                        IndentDetailsDataStore.removeAll();
                        ItemGridDetailDataStore.load({
                            url: 'ClsPo.php',
                            params:
                            {
                                task:"ItemGridDetail",
                                itemcode:this.getValue()
                            }                  
                        });

                      }  
                    else
                    {
                      Ext.MessageBox.alert("PUR-Ord",'HSN Code Not updated for this item'); 
                      cmbItems.foucs();
                    }
                    
                }
            }); */
        },
/*           
           blur:function(){
            follDataStore.load({
             url: 'ClsPo.php',
             params: {
                    task: 'cmbfollower',
                     gincompcode:Gincompcode
              }
            });
    }
*/
    }
});



var cmbState = new Ext.form.ComboBox({
    fieldLabel      : 'State',
    width           : 105,
    displayField    : 'general_name',
    valueField      : 'general_code',
    hiddenName      : 'general_code',
    id              : 'cmbState',
    typeAhead       : true,
    mode            : 'local',
    store           : ['LOCAL','INTERSTATE','IMPORT'],
    forceSelection  : false,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    readOnly        : true,
    allowblank      : false,
    listeners:{
        select:function(){
            if(cmbState.getRawValue()=='LOCAL')
                {
                    txtIGST.setValue('0');
                    txtSGST.setValue('0');
                    txtCGST.setValue('0');
                    txtIGST.hide();
                    txtIGSTvalue.hide();
                    txtSGST.show();
                    txtSGSTvalue.show();
                    txtCGST.show();
                    txtCGSTvalue.show();
                }
               else if(cmbState.getRawValue()=='INTERSTATE')
                {
                    txtIGST.setValue('0');
                    txtSGST.setValue('0');
                    txtCGST.setValue('0');
                    txtIGST.show();
                    txtIGSTvalue.show();
                    txtSGST.hide();
                    txtSGSTvalue.hide();
                    txtCGST.hide();
                    txtCGSTvalue.hide();
                }
                else if(cmbState.getRawValue()=='IMPORT')
                {
                    txtIGST.setValue('0');
                    txtSGST.setValue('0');
                    txtCGST.setValue('0');
                    txtIGST.show();
                    txtIGSTvalue.show();
                    txtSGST.hide();
                    txtSGSTvalue.hide();
                    txtCGST.hide();
                    txtCGSTvalue.hide();
                }
            
        }		
    }
});


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_name','cust_state'
 

      ]),
    });



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/General/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplierName.getRawValue(),
		},
        });
}


var txtSupplierName = new Ext.form.TextField({
    fieldLabel  : 'Sup. Name',
    id          : 'txtSupplierName',
    width       : 400,
    name        : 'txtSupplierName',
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyref.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
             },
	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
	        flxParty.getEl().setStyle('z-index','10000');
	        flxParty.show();

		lblItems.hide();
		txtCGST.hide();
		txtSGST.hide();
		lblOthers2.hide();
		txtTCS.hide();
		lblqty.hide();
		lblRebate.hide();

                  if (txtSupplierName.getRawValue() != '')
                     PartySearch();
            }
}
});

function flx_party_click()
{
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('cust_code');
				supname = selrow.get('cust_name');
				suptype = selrow.get('cust_state');

         txtpartyref.focus();
                                txtSupplierName.setRawValue(selrow.get('cust_name'));
				lblItems.show();
				txtCGST.show();
				txtSGST.show();
				lblOthers2.show();
				txtTCS.show();
				lblqty.show();
				lblRebate.show();

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



                            flxParty.hide();
 			    VendoraddDataStore.removeAll();
			    VendoraddDataStore.load({
				url: 'ClsPo.php',
				params:
				{
				    task:"vendoradd",
				    vendor: supcode
				   
				},
				scope: this,
				callback: function () {
				 var vendorcount;
				   vendorcount=0;
				   vendorcount=VendoraddDataStore.getCount();

				   //Ext.Msg.alert("Alert",vendorcount);
				   if(vendorcount > 0)
				   {
				    //Ext.getCmp('cmbItems').setDisabled(false);

				    var statetype=VendoraddDataStore.getAt(0).get('cust_state');
				    txtIGST.setValue('');


				    txtIGSTvalue.setValue('');
				    txtSGST.setValue('');
				    txtSGSTvalue.setValue('');
				    txtCGST.setValue('');
				    txtCGSTvalue.setValue('');

				      if(statetype==='24')
				      {
					 Ext.getCmp('txtIGST').setDisabled(true);                      
					 Ext.getCmp('txtIGSTvalue').setDisabled(true);   
					 Ext.getCmp('txtSGST').setDisabled(false);                      
					 Ext.getCmp('txtSGSTvalue').setDisabled(false);     
					 Ext.getCmp('txtCGST').setDisabled(false);                      
					 Ext.getCmp('txtCGSTvalue').setDisabled(false);
				      }
				      else 
				      {
					 Ext.getCmp('txtIGST').setDisabled(false);                      
					 Ext.getCmp('txtIGSTvalue').setDisabled(false);   
					 Ext.getCmp('txtSGST').setDisabled(true);                      
					 Ext.getCmp('txtSGSTvalue').setDisabled(true);     
					 Ext.getCmp('txtCGST').setDisabled(true);                      
					 Ext.getCmp('txtCGSTvalue').setDisabled(true);

				      }
		      
          			   }
				   else
				       {
					   Ext.getCmp('cmbItems').setDisabled(true);
					   Ext.Msg.alert("Alert",'Vendor Provision and State type not updated');
					   cmbItems.setValue('');

				       }
				}
		
                           });

			}
}

var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 380,
        width: 350,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flx_party_click();
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                flx_party_click();
               }
          }

   });


   var flxSpecification = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 250,
//        header : false,

    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
    //    {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
  	{header: "Specification", dataIndex: 'Specification',sortable:true,width:120,align:'left', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                       focus: function () {
                            var sm = flxSpecification.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('Specification')));
                            
                        },
                        }
                    }
                }, 

        ],
        store:[],

    listeners:{
    }  	
   });

var txtpartyref = new Ext.form.TextField({
    fieldLabel  : 'PARTY REF.NO',
    id          : 'txtpartyref',
    width       : 250,
    name        : 'pono',
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    autoCreate  : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:34},
 listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyrefdate.focus();
             }
             },
}
});

var txtDeliveryDate = new Ext.form.DateField({
    fieldLabel  : 'Delivery Date',
    id          : 'txtDeliveryDate',
    width       : 150,
    name        : 'pono',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
 listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpartyrefdate.focus();
             }
             },
}
});


var txtpartyrefdate = new Ext.form.DateField({
    fieldLabel : 'REF Date',
    id         : 'txtpartyrefdate',
    name       : 'date',
    format     : 'd-m-Y',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
   width :100,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbDepartment.focus();
             }
             },
}
});

/*
var dtpDueDate = new Ext.form.DateField({
    fieldLabel : 'Due Date',
    id         : 'dtpDueDate',
    name       : 'date',
    format     : 'd-m-Y',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
   width :100,
listeners:{

}


});

*/

function POCHANGE()
{




         refresh();
         txtpono.setRawValue(cmbpono.getRawValue());


		POdetailsLoadDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"Loadpoitemdetails",
	            pono:txtpono.getRawValue(),
		    finid:Ginfinid,
        	    compcode:Gincompcode

                },
                callback: function () 
		{
                   flxDetail.getStore().removeAll();

                    var cnt=POdetailsLoadDataStore.getCount();

	            if(cnt>0)
		    {          

//alert(POdetailsLoadDataStore.getAt(0).get('phd_spl_instruction'));
//alert(POdetailsLoadDataStore.getAt(0).get('phd_deliverydate'));

                           supcode = POdetailsLoadDataStore.getAt(0).get('phd_sup_code');     
                           statecode = POdetailsLoadDataStore.getAt(0).get('cust_state');     

                           txtSupplierName.setRawValue(POdetailsLoadDataStore.getAt(0).get('cust_ref'));
//                           txtAddr1.setRawValue(POdetailsLoadDataStore.getAt(0).get('cust_addr1'));
//                           txtAddr2.setRawValue(POdetailsLoadDataStore.getAt(0).get('cust_addr2'));
//                           txtAddr3.setRawValue(POdetailsLoadDataStore.getAt(0).get('cust_addr3')+","+POdetailsLoadDataStore.getAt(0).get('sup_city'));
                           dtpPodate.setRawValue(Ext.util.Format.date(POdetailsLoadDataStore.getAt(0).get('phd_podate'),"d-m-Y"));
                           
                           txtDeliveryDate.setValue(Ext.util.Format.date(POdetailsLoadDataStore.getAt(0).get('phd_deliverydate'),"d-m-Y"));
                           

                           txtPayTerms.setValue(POdetailsLoadDataStore.getAt(0).get('phd_credit_days'));		
                           cmbtransport.setValue(POdetailsLoadDataStore.getAt(0).get('phd_transport'));
	                   cmbpayment.setValue(POdetailsLoadDataStore.getAt(0).get('phd_pay_terms'));
	                   cmbFreight.setValue(POdetailsLoadDataStore.getAt(0).get('phd_freight'));
	                   cmbDepartment.setValue(POdetailsLoadDataStore.getAt(0).get('phd_dept'));

                           txtdelpoint.setValue(POdetailsLoadDataStore.getAt(0).get('phd_dely_point'));
		           txtOtherRef.setValue(POdetailsLoadDataStore.getAt(0).get('phd_other_ref'));
//                           txtItemSpec.setValue(POdetailsLoadDataStore.getAt(0).get('phd_other_ref'));
                           txtadvper.setValue(POdetailsLoadDataStore.getAt(0).get('phd_advance'));
                           txtNetval.setValue(POdetailsLoadDataStore.getAt(0).get('phd_total'));
                           txtbank.setRawValue(POdetailsLoadDataStore.getAt(0).get('phd_bank'));
                           txttolerance.setValue(POdetailsLoadDataStore.getAt(0).get('phd_tol'));
                           txtPOPrepared.setValue(POdetailsLoadDataStore.getAt(0).get('usr_name'));
                           txtOtherInstruction.setValue(POdetailsLoadDataStore.getAt(0).get('phd_spl_instruction'));
                           txtpartyref.setRawValue(POdetailsLoadDataStore.getAt(0).get('phd_party_refno')),
                           txtpartyrefdate.setRawValue(Ext.util.Format.date(POdetailsLoadDataStore.getAt(0).get('phd_party_refdate'),"d-m-Y"));




                      if (POdetailsLoadDataStore.getAt(0).get('phd_round_needed') == "Y")
                           Ext.getCmp("optRounding").setValue(1);
                      else 
                           Ext.getCmp("optRounding").setValue(2);



		           for(var j=0; j<cnt; j++)
		           { 
                               
                               var value1 = (Number(POdetailsLoadDataStore.getAt(j).get('ptr_unit_rate'))* Number(POdetailsLoadDataStore.getAt(j).get('ptr_ord_qty'))) - Number(POdetailsLoadDataStore.getAt(j).get('ptr_disval'));
 
                               var taxable = Number(value1) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_pf_per'))+Number(POdetailsLoadDataStore.getAt(j).get('ptr_freight_amt'));
                               var sumitemvalue = Number(value1) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_pfval'))+Number(POdetailsLoadDataStore.getAt(j).get('ptr_freight_amt')) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_cgst_amt')) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_sgst_amt'))+ Number(POdetailsLoadDataStore.getAt(j).get('ptr_igst_amt')) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_frt2')) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_oth_amt')) + Number(POdetailsLoadDataStore.getAt(j).get('ptr_tcs_amt'))- Number(POdetailsLoadDataStore.getAt(j).get('ptr_rebate'));
    
//                               sumitemvalue = sumitemvalue.toFixed(2); - for rounding

      //                         sumitemvalue = Ext.util.Format.number(Math.round(sumitemvalue),'0.00');
                                 sumitemvalue = Ext.util.Format.number(sumitemvalue,'0.00');

                               var sno        = POdetailsLoadDataStore.getAt(j).get('ptr_slno');
			       var indno      = POdetailsLoadDataStore.getAt(j).get('ptr_ind_no');
                               var itemname   = POdetailsLoadDataStore.getAt(j).get('item_name');
                               var itemcode   = POdetailsLoadDataStore.getAt(j).get('ptr_item_code');

			       var indentyear = POdetailsLoadDataStore.getAt(j).get('ptr_ind_fin_code');
                               var qty        = POdetailsLoadDataStore.getAt(j).get('ptr_ord_qty');
                               var rate       = POdetailsLoadDataStore.getAt(j).get('ptr_unit_rate');
			       var value      = POdetailsLoadDataStore.getAt(j).get('ptr_unit_rate')* POdetailsLoadDataStore.getAt(j).get('ptr_ord_qty');
                               var disper     = POdetailsLoadDataStore.getAt(j).get('ptr_discount');
                               var disval     = POdetailsLoadDataStore.getAt(j).get('ptr_disval');
			       var pfper      = POdetailsLoadDataStore.getAt(j).get('ptr_pf_per');
                               var pfval      = POdetailsLoadDataStore.getAt(j).get('ptr_pfval');
                               var frt1       = POdetailsLoadDataStore.getAt(j).get('ptr_freight_amt');
			       var frt2       = POdetailsLoadDataStore.getAt(j).get('ptr_frt2');
                               var igstper    = POdetailsLoadDataStore.getAt(j).get('ptr_igst_per');
                               var igstamt    = POdetailsLoadDataStore.getAt(j).get('ptr_igst_amt');
			       var sgstper    = POdetailsLoadDataStore.getAt(j).get('ptr_sgst_per');
                               var sgstamt    = POdetailsLoadDataStore.getAt(j).get('ptr_sgst_amt');
                               var cgstper    = POdetailsLoadDataStore.getAt(j).get('ptr_cgst_per');
			       var cgstamt    = POdetailsLoadDataStore.getAt(j).get('ptr_cgst_amt');
                               var othamt     = POdetailsLoadDataStore.getAt(j).get('ptr_oth_amt');
                               var tcsper     = POdetailsLoadDataStore.getAt(j).get('ptr_tcs_per');
			       var tcsamt     = POdetailsLoadDataStore.getAt(j).get('ptr_tcs_amt');
                               var reason     = POdetailsLoadDataStore.getAt(j).get('ptr_remarks');

                


                               var RowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                  new dgrecord({
	                                  slno       : sno ,
			                  indentno   : indno ,
					  itemname   : itemname ,
					  itemcode   : itemcode,
					  indentyear : indentyear,
					  ordqty     : qty,
					  unitrate   : rate,
					  value      : value,
	                                  discper    : disper,
			                  discvalue  : disval,
					  pfper      : pfper,
					  pfvalue    : pfval,
					  freight    : frt1,
					  freight2   : frt2,
					  igstper    : igstper,
					  igstvalue  : igstamt,
	                                  sgstper    : sgstper,
			                  sgstvalue  : sgstamt,
					  cgstper    : cgstper,
					  cgstvalue  : cgstamt,
					  othervalue : othamt,
					  tcsper     : tcsper,
					  tcsvalue   : tcsamt,
					  totitemval : sumitemvalue,
	                                  remarks    : reason ,
                                          rebate     : POdetailsLoadDataStore.getAt(j).get('ptr_rebate') ,
                                          purgrpname : POdetailsLoadDataStore.getAt(j).get('led_name') ,
                                          purgrpcode : POdetailsLoadDataStore.getAt(j).get('ptr_purgroup') ,
                                          recdqty    : POdetailsLoadDataStore.getAt(j).get('ptr_rec_qty'),
                                          uomname    : POdetailsLoadDataStore.getAt(j).get('uom_short_name') ,
                                          uomcode    : POdetailsLoadDataStore.getAt(j).get('ptr_uom') 
                                   })
                                );
	             	     grid_tot();
        		   }     //for end
	             	     grid_tot();
                       CalculatePOVal();

                       EditDateCheck();
			if (grnqty > 0)
			{     
			    alert("Already GRN Made. You are Not Allowed to Modify the PURCHASE ORDER" );
                            Ext.getCmp('save').setDisabled(true);    

			}
                        else   
			{     
                            Ext.getCmp('save').setDisabled(false);    

			}

            
            if ( POdetailsLoadDataStore.getAt(0).get('cust_state') == 24)
                statecode = "T";
 else if (POdetailsLoadDataStore.getAt(0).get('cust_state') == 34 || POdetailsLoadDataStore.getAt(0).get('cust_state')  == 0 )
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
    
                      

                    }  
                    else {  
                          alert("Po Number not found..."); 
                    }    
//if end
                }
                }); 



}


var cmbpono = new Ext.form.ComboBox({
        id: 'cmbpono',
         labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'phd_pono',
        valueField: 'phd_pono',//'ind_fin_code', //'ind_no', //
        hiddenName : 'phd_pono',
        typeAhead: true,
        mode: 'local',
        store: loadPONOListDatasore,
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'',
        editable        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        //labelWidth:30,
        width: 90,
        listeners:{
    select: function () {

            POCHANGE();   
        },
  }
});

var txtpono = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtpono',
    width       : 90,
    name        : 'pono',
  //  readOnly:true,
    enableKeyEvents: true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
    listeners:{

}
});

var txtAddr1 = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtAddr1',
    width       : 400,
    name        : 'addr1',
    readOnly:true,
    disabled:true
});

var txtAddr2 = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtAddr2',
    width       : 400,
    name        : 'addr2',
    readOnly:true,
    disabled:true
});

var txtAddr3 = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtAddr3',
    width       :  400,
    name        : 'txtAddr3',
    readOnly:true,

    disabled:true
});

var txtinddate = new Ext.form.TextField({
    fieldLabel  : 'Ind Dt',
    id          : 'txtinddate',
    width       : 100,
    name        : 'txtinddt',
    readOnly:true, 
});




var lblUOM = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lblUOM',
    width       : 50,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});







var cmbUOM = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 90,
    displayField    : 'uom_short_name',
    valueField      : 'uom_code',
    hiddenName      : 'uom_code',
    id              : 'cmbUOM',
    typeAhead       : true,
    mode            : 'local',
    store           : uomDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
  //  readOnly        :true,
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false
});


var lblStock = new Ext.form.Label({
    fieldLabel  : 'Stock',
    id          : 'lblStock',
    width       : 50,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var txtStock = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtStock',
    width       : 50,
    name        : 'stock',
    readOnly:true,
    listeners:{
        blur:function(){
            cmbindno.focus();	
        }
    }
});


var txtPendqty = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtPendqty',
    width       : 70,
    name        : 'pendingqty',
    readOnly:true,
    listeners:{
    change:function(){
 
    }
    }
});

var txtbomqty = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtbomqty',
    width       : 70,
    name        : 'bomqty',
    readOnly:true,
    listeners:{
    change:function(){

    }
    }
});

var lblindno = new Ext.form.Label({
    fieldLabel  : 'Ind No',
    id          : 'lblindno',
    width       :  120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var qo_itemrate,qodate;
var fdbl_totalvalue,comno;



var cmbtransport = new Ext.form.ComboBox({
    fieldLabel      : 'Transport',
    width           : 300,
    displayField    : 'carr_name',
    valueField      : 'carr_code',
    hiddenName      : 'carr_name',
    id              : 'cmbtransport',
    typeAhead       : true,
    mode            : 'local',
    store           : loadTransportDatasore,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
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
                  cmbpayment.focus();
             }
             },
}
});	



var cmbpayment = new Ext.form.ComboBox({
    fieldLabel      : 'Order Terms',
    width           : 300,
    displayField    : '',
    valueField      : '',
    hiddenName      : '',
    id              : 'cmbpayment',
    typeAhead       : true,
    mode            : 'local',
    store           : [ '100%  PAYMENT EITHER BY RTGS OR NEFT',
'100% ADVANCE',
'100% AFTER COMPLETION OF INSTALLATION',
'50% ADVANCE,50% AGAINST PI',
'90 Days LC',
'AGAINST DESPATCH DOCUMENT',
'AGAINST PROFORMA INVOICE',
'ALONG WITH ORDER',
'BY CASH',
'ON COMPLETION OF WORK',
'ON RECEIPT OF MATERIAL',
'Through NEFT'],
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    forceSelection  : false,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    autoCreate  : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:49},
enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtbank.focus();
             }
             },
}
});

var cmbPurGroup = new Ext.form.ComboBox({
   // fieldLabel      : 'Purchase Group',
    width           : 300,
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
                  cmbindno.focus();
             }
             },
        select: function(){
        findGSTDetaildatastore.removeAll();
        findGSTDetaildatastore.load({
		url: 'ClsPo.php',
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
			txtCGST.setValue(findGSTDetaildatastore.getAt(0).get('tax_cgst_per'));
			txtSGST.setValue(findGSTDetaildatastore.getAt(0).get('tax_sgst_per'));
                        txtIGST.setValue(findGSTDetaildatastore.getAt(0).get('tax_igst_per'));
                        calculateItemValue();
                   }
                }
        });
       }  
}
});

var cmbindno = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 80,
    displayField    : 'ind_no',
    valueField      : 'ind_no',
    hiddenName      : '',
    id              : 'cmbindno',
    typeAhead       : true,
    mode            : 'local',
    store           : IndentNoDetailDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbItems.focus();
             }
             },
        select: function(){

		ItemLoadDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"LoadItem",
	            indno:cmbindno.getValue(),
		    finid:indyear,
        	    compcode:Gincompcode

                },
                callback: function () 
		{
                    txtinddate.setRawValue(ItemLoadDataStore.getAt(0).get('ind_date'));
                }


		});
	}
    }
});

/*var cmbindno = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 100,
    displayField    : 'ind_no',
    valueField      : 'ind_fin_code',
    hiddenName      : '',
    id              : 'cmbindno',
    typeAhead       : false,
    mode            : 'local',
    store           : IndentNoDetailDataStore,
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : true,
    allowblank      : false,
    listeners:{
        select:function(){
		alert(cmbindno.getRawValue());
		//alert(cmbindno.getValue());
		//alert(Ginfinid);
		//alert(Gincompcode);
		ItemLoadDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"LoadItem",
	            indno:this.getRawValue(),
		    finid:Ginfinid,
        	    compcode:Gincompcode

                },
                callback: function () 
		{
                    txtinddate.setRawValue(ItemLoadDataStore.getAt(0).get('ind_date'));
                }


		});
		

        }, change:function(){
		ItemLoadDataStore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"LoadItem",
	            indno:this.getRawValue(),
		    finid:Ginfinid,
        	    compcode:Gincompcode

                },
                callback: function () 
		{
                    txtinddate.setRawValue(ItemLoadDataStore.getAt(0).get('ind_date'));
                }


		});
            }
    }
});*/

var lblPendqty = new Ext.form.Label({
    fieldLabel  : 'Al PoQty',
    id          : 'lblPendqty',
    width       : 70,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblbomqty = new Ext.form.Label({
    fieldLabel  : 'Bom.Qty',
    id          : 'lblbomqty',
    width       : 70,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblqty = new Ext.form.Label({
    fieldLabel  : 'Qty',
    id          : 'lblqty',
    width       : 70,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var txtqty = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtqty',
    width       : 70,
    name        : 'requiredqty',
    enableKeyEvents: true,
    readOnly : false,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    decimalPrecision: 3,
    listeners:{

specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRate.focus();
             }
             },
           change:function(){
                 if (Number(txtqty.getValue()) > indqty)
                 {
                     alert("Order Quantity should not higher then Indent balance Quantity..");
            //         txtqty.setValue(indqty); 
                 }  
            },           
           keyup:function(){
                calculateItemValue();
            },
            keydown:function(){ 
                calculateItemValue();
            },
            blur:function(){
               calculateItemValue();
            }      
//        }  
    }
});



var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 50,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
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
var txtRate = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtRate',
    width       : 80,
    name        : 'qorate',
    enableKeyEvents : true,
    readOnly    : false,
    disabled:false,
    listeners   :{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtValue.focus();
             }
             },
           keyup:function(){
           calculateItemValue();
        }
    }

});


var lblItemSpec = new Ext.form.Label({
    fieldLabel  : 'Item Remark',
    id          : 'lblItemSpec',
    width       : 100,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var txtItemSpec = new Ext.form.TextArea({
    fieldLabel  : '',
    id          : 'txtItemSpec',
    width       : 300,
    name        : 'itemremark',
     height      : 110,  
     style      :{textTransform:"uppercase"},
     autoCreate  : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:498},  
        listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnSubmit.focus();
             }
             },

           change: function(field,newValue,oldValue){
                   field.setValue(newValue.toUpperCase());
             }
        }
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 50,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblcurrency = new Ext.form.Label({
    fieldLabel  : 'Currency',
    id          : 'lblcurrency',
    width       : 50,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var txtValue = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtValue',
    width       : 100,
    name        : 'txtvalue',
    readOnly:true,

   listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDiscount.focus();
             }
             },
}
//    blur:function(){
		//fdbl_totalvalue=0;
		           //fdbl_totalvalue=Ext.util.Format.number((txtRate.getRawValue()*txtqty.getRawValue());
	 //  fdbl_totalvalue=Ext.util.Format.number(Number(txtRate.getRawValue())*Number(txtqty.getRawValue()),'0.000');
        //   txtValue.setRawValue(fdbl_totalvalue);
//    }
//    }
});

var txtitemtotValue = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtitemtotValue',
    width       : 100,
    name        : 'txtitemtotValue',
    readOnly:true,
    listeners:{
    blur:function(){
          // fdbl_totalvalue=parseFloat(txtRate.getRawValue()*txtqty.getRawValue());
    }
    }
});
var igstval;
var igstdiscoval;
var totigval;
function caligstval()
{
igstval=0;
igstdiscoval=0;
totigval=0;

igstval=Ext.util.Format.number(((Number(txtIGST.getRawValue())*(Number(txtValue.getRawValue())-Number(txtDiscountval.getRawValue())))/Number(100)),"0.00");
                   igstdiscoval=Ext.util.Format.number((parseFloat(txtDiscount.getRawValue())*parseFloat(txtValue.getValue()))/Number(100),"0.00");

 txtIGSTvalue.setRawValue(igstval);
                txtDiscountval.setRawValue(igstdiscoval);
                totigval=Ext.util.Format.number(((Number(txtValue.getRawValue())+Number(txtIGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtCGSTvalue.getRawValue()))-Number(txtDiscountval.getRawValue())),"0.00");
                txtitemtotValue.setRawValue(totigval);

}
var txtIGST = new Ext.form.NumberField({
    fieldLabel  : 'IGST %',
    id          : 'txtIGST',
    name        : 'txtIGST',
    width       : 30,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,   
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSGST.focus();
             }
             },
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

var txtIGSTvalue = new Ext.form.NumberField({
    id          : 'txtIGSTvalue',
    name        : 'txtIGSTvalue',
    width       : 70,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var sgstval;
var sgstdiscoval;
var totsgval;
function calsgstval()
{
sgstval=0;
sgstdiscoval=0;
totsgval=0;

sgstval=Ext.util.Format.number(((Number(txtSGST.getRawValue())*(Number(txtValue.getRawValue())-Number(txtDiscountval.getRawValue())))/Number(100)),"0.00");
sgstdiscoval=Ext.util.Format.number((parseFloat(txtDiscount.getRawValue())*parseFloat(txtValue.getValue()))/Number(100),"0.00");
//alert(sgstval);
txtSGSTvalue.setRawValue(sgstval);
                txtDiscountval.setRawValue(sgstdiscoval);
                totsgval=Ext.util.Format.number(((Number(txtValue.getRawValue())+Number(txtIGSTvalue.getRawValue())+Number(txtSGSTvalue.getRawValue())+Number(txtCGSTvalue.getRawValue()))-Number(txtDiscountval.getRawValue())),"0.00");
                txtitemtotValue.setRawValue(totsgval);

}
var txtSGST = new Ext.form.NumberField({
    fieldLabel  : 'SGST %',
    id          : 'txtSGST',
    name        : 'txtSGST',
     width       : 30,
    readOnly: false,        
    allowBlank: true,
//readOnly:true, 
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCGST.focus();
             }
             },
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

var txtSGSTvalue = new Ext.form.NumberField({
    id          : 'txtSGSTvalue',
    name        : 'txtSGSTvalue',
     width       : 70,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});





var txtCGST = new Ext.form.NumberField({
    fieldLabel  : 'CGST %',
    id          : 'txtCGST',
    name        : 'txtCGST',
    width       : 30,
    readOnly: false,
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOthers.focus();
             }
             },
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

var txtCGSTvalue = new Ext.form.NumberField({
    id          : 'txtCGSTvalue',
    name        : 'txtCGSTvalue',
    width       : 70,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true

});



var txtTCS = new Ext.form.NumberField({
    fieldLabel  : 'TCS %',
    id          : 'txtTCS',
    name        : 'txtTCS',
    width       : 30,
    readOnly: false,
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTCSvalue.focus();
             }
             },
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

var txtTCSvalue = new Ext.form.NumberField({
    id          : 'txtTCSvalue',
    name        : 'txtTCSvalue',
    width       : 70,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRebate.focus();
             }
             },
}
});


var txtfr1 = new Ext.form.NumberField({
    id          : 'txtfr1',
    name        : 'txtfr1',
    width       : 50,
    fieldLabel : 'Freight-1',
    border:true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtfr2.focus();
             }
             },
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

var txtfr2 = new Ext.form.NumberField({
    id          : 'txtfr2',
    name        : 'txtfr2',
    width       : 50,
    fieldLabel : 'Freight-2',
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSGST.focus();
             }
             },
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

var txtDiscount = new Ext.form.NumberField({
    fieldLabel  : 'Dis%',
    id          : 'txtDiscount',
    width       : 40,
    name        : 'discount',
    maxLength   : 2,
    maxValue: 90,
    minValue: 0,
    enableKeyEvents: true,	
    listeners : {
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDiscountval.focus();
             }
             },

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
         
var txtDiscountval = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtDiscountval',
    width       : 80,
    name        : 'txtDiscountval',
    maxLength   : 2,
    maxValue: 90,
    minValue: 0,
    enableKeyEvents: true,	
    listeners : {
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpf.focus();
             }
             },
        change:function()
        {
          calculateItemValue();
        }
    }    

});


var txtRebate = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtRebate',
    width       : 90,
    name        : 'txtRebate',
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtItemValue.focus();
             }
             },
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

var txtItemValue = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtItemValue',
    width       : 90,
    readOnly    : true,
    name        : 'txtItemValue',
 listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtItemSpec.focus();
             }
             },
}
});



var txtOthers = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtOthers',
    width       : 60,
    //readOnly    : false,
allowBlank: true,
    name        : 'txtOthers',
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtTCS.focus();
             }
             },
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

var txtpf = new Ext.form.NumberField({
    fieldLabel  : 'PF%',
    id          : 'txtpf',
    width       : 40,
    name        : 'txtpf',
    border      : true	,
    enableKeyEvents: true,
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtpfval.focus();
             }
             },
        keyup:function(){
           if (Number(txtpf.getValue()) == 0)            
              txtpfval.setValue();
           calculateItemValue();
        },
        keydown:function(){ 
            if (Number(txtpf.getValue()) == 0)
                txtpfval.setValue(0);
  
           calculateItemValue();
        },
       blur:function(){
        if (Number(txtpf.getValue()) == 0)
            txtpfval.setValue(0);

           calculateItemValue();
        },
              
    }

});


var txtpfval = new Ext.form.NumberField({
    fieldLabel  : '',
    id          : 'txtpfval',
    width       : 60,
    readOnly    : false,
    enableKeyEvents: true,
    name        : 'txtpfval',
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtfr1.focus();
             }
             },
        keyup:function(){
           calculateItemValue();
        }    
    }
});

var curr="INR";
/*
var cmbCurrency = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 80,
    displayField    : 'currency_name',
    valueField      : 'currency_code',
    hiddenName      : 'currency_code',
    id              : 'cmbCurrency',
    typeAhead       : true,
    store           : currDataStore,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
    listeners:{
        blur:function(){
            if(cmbCurrency.getRawValue()==="RUPEES"){
                 curr="INR";
            }else{
                curr=cmbCurrency.getRawValue();
            }
        },
        Select:function(){
            if(cmbCurrency.getRawValue()==="RUPEES"){
                 curr="INR";
            }else{
                curr=cmbCurrency.getRawValue();
            }
        }
    }
});
*/
var txtCurrency = new Ext.form.TextField({
    fieldLabel  : '',
    id          : 'txtCurrency',
    width       : 80,
    name        : 'currency'
});


function validatechkgrid()
{

	Validatechk="true";
	if (cmbItems.getValue()==0 || cmbItems.getRawValue()=="")
	{
		Ext.Msg.alert('PO','Select Item Name');
		Validatechk="false";
	}
            
        else  if (Number(txtRate.getRawValue())===0){
                Ext.MessageBox.alert("Pur-Ord", "Enter Rate..");
                gstadd="false";
          	Validatechk="false";
            }

	else if (Number(txtqty.getValue()) >  Number(txtqty.getValue()))
	{
		Ext.Msg.alert('Pur-Ord"',' Qty Should be Empty');
		Validatechk="false";
	}

/*	else if (txtmillqty.getValue()==0 || txtmillqty.getRawValue()=="")
	{
		Ext.Msg.alert('GRN','Mill Qty Should be Greater than Zero');
		Validatechk="false";
	}
	else if (Number(txtmillqty.getValue()) >  Number(txtpendqty.getValue()))
	{
		Ext.Msg.alert('GRN','Mill Qty Should be Greater than Order Qty');
		Validatechk="false";
	}
	else if (Number(txtmoisper.getValue()) >  100)
	{
		Ext.Msg.alert('GRN','Moisture % Should not be Greater than 100%');
		Validatechk="false";
	}
	else if (cmblot.getValue()==0 || cmblot.getRawValue()=="" || cmblot.getRawValue() < 0 )
	{
		Ext.Msg.alert('GRN','Lot No Should be Selected ');
		Validatechk="false";
	}
	else if (txtnoofbags.getValue()==0 || txtnoofbags.getRawValue()=="" || Number(txtnoofbags.getRawValue()) < 0 )
	{
		Ext.Msg.alert('GRN','No.of Bags Should be Greater than Zero');
		Validatechk="false";
	}*/
}


var btnIndSpec = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Get Ind.Spec",
    width   : 70,
    height  : 30,
    x       : 900,
    y       : 125,
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
    listeners:{
        click: function(){    
		findIndentSpecdatastore.load({
                url: 'ClsPo.php',
                params:
                {
                    task:"loadIndentSpec",
	            indno:cmbindno.getValue(),
		    finid:indyear,
        	    compcode:Gincompcode,
                    itemcode : inditemcode,

                },
                callback: function () 
		{
                    txtItemSpec.setValue(findIndentSpecdatastore.getAt(0).get('ind_remarks'));
                }


		});

        }
    }
});   


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Submit",
    width   : 70,
    height  : 30,
    x       : 900,
    y       : 125,
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
    listeners:{
        click: function(){              
//alert(txtqty.getValue());
            flxDetail.show();
            flx_poDetails.hide();
            validatechkgrid();
	    var gstadd="true";



            if (Validatechk === "true")
            {
                var ginitemseq = cmbItems.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();



                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemcode === cmbItems.getValue() &&  sel[i].data.indentno  === cmbindno.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }


       //         cnt = 0;




        	if(gridedit === "true")
	          {
			gridedit = "false";
                       	var idx = flxDetail.getStore().indexOf(editrow);

			sel[idx].set('indentno'  , cmbindno.getValue());
			sel[idx].set('itemname'  , cmbItems.getRawValue());
			sel[idx].set('itemcode'  , cmbItems.getValue());
			sel[idx].set('indentyear', indyear);
			sel[idx].set('ordqty'    , txtqty.getValue());
			sel[idx].set('unitrate'  , txtRate.getValue());
			sel[idx].set('value'     , txtValue.getValue());
			sel[idx].set('discper'   , txtDiscount.getValue());
			sel[idx].set('discvalue' , txtDiscountval.getValue());
			sel[idx].set('pfper'     , txtpf.getValue());
			sel[idx].set('pfvalue'   , txtpfval.getValue());
			sel[idx].set('freight'   , txtfr1.getValue());
			sel[idx].set('freight2'  , txtfr2.getValue());
			sel[idx].set('igstper'   , txtIGST.getValue());
			sel[idx].set('igstvalue' , txtIGSTvalue.getValue());

			sel[idx].set('sgstper'   , txtSGST.getValue());
			sel[idx].set('sgstvalue' , txtSGSTvalue.getValue());
			sel[idx].set('cgstper'   , txtCGST.getValue());
			sel[idx].set('cgstvalue' , txtCGSTvalue.getValue());
			sel[idx].set('othervalue', txtOthers.getValue());
			sel[idx].set('tcsper'    , txtTCS.getValue());
			sel[idx].set('rebate'    , txtRebate.getValue());
			sel[idx].set('tcsvalue'  , txtTCSvalue.getValue());
			sel[idx].set('totitemval', txtItemValue.getValue());
	
			sel[idx].set('inddate'   , txtinddate.getRawValue());
//			sel[idx].set('remarks'   , txtItemSpec.getRawValue());
			sel[idx].set('remarks'   , PoPreparationFormPanel.getForm().findField('txtItemSpec').getValue());
			sel[idx].set('purgrpname'   , cmbPurGroup.getRawValue());
			sel[idx].set('purgrpcode'   , cmbPurGroup.getValue());
			sel[idx].set('uomname'   , cmbUOM.getRawValue());
			sel[idx].set('uomcode'   , cmbUOM.getValue());
			flxDetail.getSelectionModel().clearSelections();
                        refresh();
                        grid_tot();
                        CalculatePOVal();
		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Already Data entered for the Same Item and  Indent.");
                } else
                    {
                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    var spec = Ext.getCmp('txtItemSpec').getValue();
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            slno:RowCnt,
                            indentno:cmbindno.getValue(),
                            itemname:cmbItems.getRawValue(),
                            itemcode:cmbItems.getValue(),
                            indentyear:indyear,
                            ordqty:txtqty.getRawValue(),                            
                            unitrate:txtRate.getRawValue(),
                            value:txtValue.getRawValue(),
                            discper:txtDiscount.getRawValue(),
                            discvalue:txtDiscountval.getRawValue(),
                            pfper:txtpf.getValue(),
                            pfvalue:txtpfval.getValue(),
                            freight:txtfr1.getValue(),
                            freight2:txtfr2.getValue(),
                            igstper:txtIGST.getValue(),
                            igstvalue:txtIGSTvalue.getValue(),

                            sgstper:txtSGST.getValue(),
                            sgstvalue:txtSGSTvalue.getValue(),
                            cgstper:txtCGST.getValue(),
                            cgstvalue:txtCGSTvalue.getValue(),
			    othervalue:txtOthers.getValue(),
                            tcsper:txtTCS.getValue(),
                            tcsvalue:txtTCSvalue.getValue(),
                            rebate:txtRebate.getValue(),
                            totitemval:txtItemValue.getValue(),
//                            remarks:txtItemSpec.getRawValue,
                            remarks:spec,
                            purgrpname:cmbPurGroup.getRawValue(),
                            purgrpcode:cmbPurGroup.getValue(),
                            inddate:txtinddate.getRawValue(),
                            uomname:cmbUOM.getRawValue(),
                            uomcode:cmbUOM.getValue(),

                        }) 
                        );
                            refresh();   
                            grid_tot();
                            CalculatePOVal();

                            txtqty.setValue("0.00");
//                            txtPendqty.setValue("0.00");
                            txtRate.setValue("0.00");
                            txtValue.setValue("0.00");
//                            txtIGST.setValue("0.00");
                            txtIGSTvalue.setValue("0.00");
//                            txtSGST.setValue("0.00");
                            txtSGSTvalue.setValue("0.00");
//                            txtCGST.setValue("0.00");
                            txtCGSTvalue.setValue("0.00");
                            txtDiscount.setValue("0.00");
                            txtDiscountval.setValue("0.00");
                            txtitemtotValue.setValue("0.00");
			    txtOthers.setValue("0.00");	
                }
                
            }
        }
    }
});

var txtTotIGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.IGST',
    id          : 'txtTotIGST',
    name        : 'txtTotIGST',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true
    });
    
var txtTotSGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.SGST',
    id          : 'txtTotSGST',
    name        : 'txtTotSGST',
     width       : 100,
    readOnly: true, 
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",       
    allowBlank: true
});

var txtTotCGST = new Ext.form.NumberField({
    fieldLabel  : 'Tot.CGST',
    id          : 'txtTotCGST',
    name        : 'txtTotCGST',
    width       : 100,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    readOnly: true,
    allowBlank: true
});

var txtGrossval = new Ext.form.NumberField({
    fieldLabel  : 'Gross Val',
    id          : 'txtGrossval',
    name        : 'txtGrossval',
    width       : 100,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    readOnly: true,
    allowBlank: true
});

var txtNetval = new Ext.form.NumberField({
    fieldLabel  : 'PO Value',
    id          : 'txtNetval',
    name        : 'txtNetval',
    width       : 100,
    readOnly: true,
    allowBlank: true,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var txttotpfval = new Ext.form.NumberField({
    fieldLabel  : 'Tot PF.',
    id          : 'txttotpfval',
    name        : 'txttotpfval',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var txttotfr1val = new Ext.form.NumberField({
    fieldLabel  : 'Tot Frt1 Val',
    id          : 'txttotfr1val',
    name        : 'txttotfr1val',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var txttotfr2val = new Ext.form.NumberField({
    fieldLabel  : 'Tot Frt2 Val',
    id          : 'txttotfr2val',
    name        : 'txttotfr2val',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true

});

var txttotothval = new Ext.form.NumberField({
    fieldLabel  : 'Tot Oth',
    id          : 'txttotothval',
    name        : 'txttotothval',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var txttotdisval = new Ext.form.NumberField({
    fieldLabel  : 'Tot Dis',
    id          : 'txttotdisval',
    name        : 'txttotdisval',
    width       : 100,
    readOnly: true,
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
    allowBlank: true
});

var lblGrandtotal = new Ext.form.Label({
    fieldLabel  : 'Grd Tot',
    id          : 'lblGrandtotal',
    width       : 90,
    style:{
         color: 'Red' ,
         backgroundColor:'White'
    }
});

var lblPercent = new Ext.form.Label({
    fieldLabel  : '%',
    id          : 'lblpercent',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 30
});

var lblAddValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblAddValue',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 40
});

var lblDiscount = new Ext.form.Label({
    fieldLabel  : 'Discount',
    id          : 'lblDiscount',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});



var lblOthers2 = new Ext.form.Label({
    fieldLabel  : 'Others',
    id          : 'lblOthers2',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 60
});

var lblRebate = new Ext.form.Label({
    fieldLabel  : 'Rebate&Dis ',
    id          : 'lblRebate',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 80
});


var lblitemtotvalue = new Ext.form.Label({
    fieldLabel  : 'Item Value ',
    id          : 'lblitemtotvalue',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    width       : 80
});

/*var txtprice = new Ext.form.TextField({
    fieldLabel  : 'Price Terms',
    id          : 'txtprice',        
    width       : 300,
    name        : 'modeoftransport',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
*/
var txtbank = new Ext.form.TextField({
    fieldLabel  : 'Bank',
    id          : 'txtbank',
    width       : 300,
    name        : 'paymentdays',
     style       :{textTransform:"uppercase"},
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtdelpoint.focus();
             }
             },
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var txtdelpoint = new Ext.form.TextField({
    fieldLabel  : 'Delivery Point',
    id          : 'txtdelpoint',
    width       : 300,
    name        : 'scheduledays',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      :{textTransform:"uppercase"},
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOtherRef.focus();
             }
             },
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});

var cmbFreight = new Ext.form.ComboBox({
        fieldLabel      : 'FREIGHT',
        width           :  220,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbFreight',
        typeAhead       : true,
        mode            : 'local',
        store           : ['EXTRA','NO','INCULDING'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                      
	}
	}
});

var txtOtherRef = new Ext.form.TextField({
    fieldLabel  : 'Other Ref.',
    id          : 'txtOtherRef',
    width       : 300,
    name        : 'point',
    style      :{textTransform:"uppercase"},
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPayTerms.focus();
             }
             },
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});



var txtPayTerms = new Ext.form.NumberField({
    fieldLabel  : 'Payment Terms',
    id          : 'txtPayTerms',
    width       : 50,
    name        : 'compno',
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtadvper.focus();
             }
             },
//       change: function(field,newValue,oldValue){
//               field.setValue(newValue.toUpperCase());
//         }
    }
});

var txtadvper = new Ext.form.NumberField({
    fieldLabel  : 'Advance%',
    id          : 'txtadvper',
    width       : 50,
    name        : 'insurance',

    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txttolerance.focus();
             }
             },
//       change: function(field,newValue,oldValue){
//               field.setValue(newValue.toUpperCase());
//         }
    }
});



/*var txtdays = new Ext.form.TextArea({
    fieldLabel  : 'Days',
    id          : 'txtdays',
    width       : 250,
    height      : 50,
    name        : 'remarks',
     style       :{textTransform:"uppercase"},
    listeners:{
       change: function(field,newValue,oldValue){
               field.setValue(newValue.toUpperCase());
         }
    }
});
*/
var txttolerance = new Ext.form.NumberField({
    fieldLabel  : 'Tolerance(%)',
    id          : 'txttolerance',
    width       : 50,
    name        : 'handling',

    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOtherInstruction.focus();
             }
             },
 //      change: function(field,newValue,oldValue){
//               field.setValue(newValue.toUpperCase());
//         }
    }
});

var txtPOPrepared = new Ext.form.TextField({
    fieldLabel  : 'PO Prepared BY',
    id          : 'txtPOPrepared',
    width       : 800,
    name        : 'txtPOPrepared',
    style       :{textTransform:"uppercase"},
    labelStyle  : "font-size:12px;font-weight:bold;color:#0080ff",
});

var txtOtherInstruction = new Ext.form.TextField({
    fieldLabel  : 'Other Instruction',
    id          : 'txtOtherInstruction',
    width       : 600,
    height      : 50,
    name        : 'txtOtherInstruction',
    style       :{textTransform:"uppercase"},
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    autoCreate  : {tag:'input',type:'text',size:20,autocomplete:'off',maxlength:99},
    listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtPOPrepared.focus();
             }
             },
}
});





var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:160,
    height: 110,
    hidden:false,
    width: 1100,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Indent No", dataIndex: 'indentno',sortable:true,width:100,align:'left'}, //,hidden:true},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:260,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:80,align:'left',hidden:true},
        {header: "UOM", dataIndex: 'uomname',sortable:true,width:70,align:'left'},
        {header: "UOM CODE", dataIndex: 'uomcode',sortable:true,width:80,align:'left',hidden:true},
        {header: "Indent FinYear", dataIndex: 'indentyear',sortable:true,width:100,align:'left' }, //,hidden:true},
        {header: "Order Qty",  dataIndex: 'ordqty',sortable:true,width:90,align:'left'},
        {header: "Unit Rate",dataIndex: 'unitrate',sortable:true,width:90,align:'left'},
        {header: "Value",    dataIndex:'value',sortable:true,width:100,align:'left'},
        {header: "DISC Per", dataIndex: 'discper',sortable:true,width:80,align:'left'},
        {header: "DISC Val", dataIndex: 'discvalue',sortable:true,width:80,align:'left'},
        {header: "PF Per",   dataIndex: 'pfper',sortable:true,width:80,align:'left'},
        {header: "PF Val",   dataIndex: 'pfvalue',sortable:true,width:80,align:'left'},
        {header: "Freight",  dataIndex: 'freight',sortable:true,width:80,align:'left'},
        {header: "Freight2", dataIndex: 'freight2',sortable:true,width:80,align:'left'},
        {header: "IGST Per", dataIndex: 'igstper',sortable:true,width:80,align:'left'},
        {header: "IGST Val", dataIndex: 'igstvalue',sortable:true,width:80,align:'left'},
        {header: "SGST Per", dataIndex: 'sgstper',sortable:true,width:80,align:'left'},
        {header: "SGST Val", dataIndex: 'sgstvalue',sortable:true,width:80,align:'left'},
        {header: "CGST Per", dataIndex: 'cgstper',sortable:true,width:80,align:'left'},
        {header: "CGST Val", dataIndex: 'cgstvalue',sortable:true,width:80,align:'left'},
	{header: "Other Val", dataIndex: 'othervalue',sortable:true,width:80,align:'left'},
        {header: "TCS Per",   dataIndex: 'tcsper',sortable:true,width:80,align:'left'},
        {header: "TCS Val",   dataIndex: 'tcsvalue',sortable:true,width:80,align:'left'},
        {header: "Rebate", dataIndex: 'rebate',sortable:true,width:100,align:'left'},
        {header: "TotItemValue", dataIndex: 'totitemval',sortable:true,width:100,align:'left'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:100,align:'left'},
        {header: "Pur.GrpName", dataIndex: 'purgrpname',sortable:true,width:100,align:'left'},
        {header: "Pur.Grpcode", dataIndex: 'purgrpcode',sortable:true,width:100,align:'left'},
        {header: "Received", dataIndex: 'recdqty',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES PO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete',
             fn: function(btn){
        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
/*			flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */

         		gridedit = "true";
			editrow = selrow;
                        cmbindno.setValue(selrow.get('indentno'));  
                        cmbindno.setRawValue(selrow.get('indentno'));  
			cmbItems.setValue(selrow.get('itemcode'));
			cmbItems.setRawValue(selrow.get('itemname'));
			cmbPurGroup.setRawValue(selrow.get('purgrpname'));
			cmbPurGroup.setValue(selrow.get('purgrpcode'));
			cmbUOM.setValue(selrow.get('uomcode'));
                        inditemcode = selrow.get('itemcode');
                        grnqty  = selrow.get('recdqty');

			txtqty.setValue(selrow.get('ordqty'));
			txtRate.setValue(selrow.get('unitrate'));

			txtValue.setValue(selrow.get('value'));
                        txtindfinyear.setValue(selrow.get('indentyear'));
                        indyear = selrow.get('indentyear');


                     if (indyear == Ginfinid) 
                     {
                         Ext.getCmp('optyear').setValue(1);
                     }
                     else
                     {
                         Ext.getCmp('optyear').setValue(2);
                     }  

                        txtDiscount.setValue(selrow.get('discper'));
  	        	txtDiscountval.setValue(selrow.get('discvalue'));
		
			txtpf.setValue(selrow.get('pfper'));
			txtpfval.setValue(selrow.get('pfvalue'));
			txtfr1.setValue(selrow.get('freight'));
			txtfr2.setValue(selrow.get('freight2'));
			txtIGST.setValue(selrow.get('igstper'));
			txtIGSTvalue.setValue(selrow.get('igstvalue'));
			txtSGST.setValue(selrow.get('sgstper'));
			txtSGSTvalue.setValue(selrow.get('sgstvalue'));
			txtCGST.setRawValue(selrow.get('cgstper'));
			txtCGSTvalue.setValue(selrow.get('cgstvalue'));
			txtOthers.setValue(selrow.get('othervalue'));
			txtTCS.setValue(selrow.get('tcsper'));
			txtTCSvalue.setValue(selrow.get('tcsvalue'));

                	txtRebate.setValue(selrow.get('rebate'));
                  	txtItemSpec.setValue(selrow.get('remarks'));	
                        txtinddate.setValue(selrow.get('inddate'));
                        txtItemValue.setRawValue(selrow.get('totitemval'));

			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                   
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        if (selrow.get('recdqty') == 0)
                        {
                           flxDetail.getStore().remove(selrow);
                           flxDetail.getSelectionModel().selectAll();
                        }
                        else
                        {
                             alert("GRN Alredy Made for this Item.  Can't Delete the item..");
                        }         
                   }
                   CalculatePOVal();
             }
        });         
    }

   }
});

var optyear = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:80,
    border: false,
    x : 10,
    y : 20,       
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optyear',
        items: [
            {boxLabel: 'Current Year' , name: 'optyear', id:'optcurrentyear', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){

                     txtindfinyear.setValue(Ginfinid);
                    indyear =  Ginfinid; 
		    Ext.getCmp('txtindfinyear').setDisabled(true);
			IndentNoDetailDataStore.removeAll();
			IndentNoDetailDataStore.load({
                	url: 'ClsPo.php',
	                params: {
			        task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,

             		},
            		});

                   }
                 }
               }
            },
            {boxLabel: 'Previous Year', name: 'optyear', id:'optpreviousyear', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
//                     indyear ="P";
                        txtindfinyear.setValue(Ginfinid-1); 
                        indyear =  Ginfinid-1; 
			Ext.getCmp('txtindfinyear').setDisabled(false);
			IndentNoDetailDataStore.removeAll();
			IndentNoDetailDataStore.load({
                	url: 'ClsPo.php',
	                params: {
			        task: 'IndnoDetail',
				cmpcode:Gincompcode,
				finid:indyear,

             		},
            		});

                   }
                 }
               }
            },


        ]


    },
    ]



});


var optAllItem = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:300,
    height:80,
    border: false,
    x : 10,
    y : 20,       
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optAllItem',
        items: [
            {boxLabel: 'Indent Items' , name: 'optAllItem', id:'indentItems', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){

                     txtindfinyear.setValue(Ginfinid);
                    indyear =  Ginfinid; 
		    Ext.getCmp('txtindfinyear').setDisabled(true);
			IndentNoDetailDataStore.removeAll();
			IndentNoDetailDataStore.load({
                	url: 'ClsPo.php',
	                params: {
				    task:"LoadItem",
				    indno:cmbindno.getValue(),
				    finid:indyear,
				    compcode:Gincompcode

             		},
            		});

                   }
                 }
               }
            },
            {boxLabel: 'All Item', name: 'optAllItem', id:'allItems', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
//                     indyear ="P";
                        txtindfinyear.setValue(Ginfinid-1); 
                        indyear =  Ginfinid-1; 
			Ext.getCmp('txtindfinyear').setDisabled(false);
			ItemLoadDataStore.removeAll();
			ItemLoadDataStore.load({
                	url: 'ClsPo.php',
	                params: {
				    task:"LoadItem",
				    indno:0,
				    finid:indyear,
				    compcode:Gincompcode

             		},
            		});

                   }
                 }
               }
            },


        ]


    },
    ]



});


var flx_poDetails = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden:true,
    stripeRows : true,
    scrollable: true,
    x:10,
    y:170,
    height: 100,
    width: 800,
    columns:
    [            
        {header: "Qo No", dataIndex: 'qo_no',sortable:true,width:45,align:'left'},
        {header: "Qo Date", dataIndex: 'qo_date',sortable:true,width:80,align:'left'},
        {header: "Vendor Name", dataIndex: 'vendor_name',sortable:true,width:220,align:'left'},
        {header: "Price", dataIndex: 'qo_itemrate',sortable:true,width:80,align:'left'},
        {header: "Tax", dataIndex: 'qo_taxtype',sortable:true,width:30,align:'left'},
        {header: "PoNo", dataIndex: 'PONo',sortable:true,width:50,align:'left'},
        {header: "PoDate", dataIndex: 'PODate',sortable:true,width:80,align:'left'},
        //{header: "PoEd", dataIndex: 'PoEdPer',sortable:true,width:50,align:'left'},
        //{header: "PoTngst", dataIndex: 'PoTngstPer',sortable:true,width:60,align:'left'},
        //{header: "PoCst", dataIndex: 'PoCstPer',sortable:true,width:50,align:'left'},
        {header: "PoDisct", dataIndex: 'PoDiscountPer',sortable:true,width:50,align:'left'},
        {header: "PoIGST", dataIndex: 'PoIGSTPer',sortable:true,width:60,align:'left'},
        {header: "PoCGST", dataIndex: 'PoCGSTPer',sortable:true,width:60,align:'left'},
        {header: "PoSGST", dataIndex: 'PoSGSTPer',sortable:true,width:60,align:'left'}
        
     ],
    store: ItemGridDetailDataStore
});

var tabPurchaseOrder = new Ext.TabPanel({
    id          : 'PurchaseOrder',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#eaeded"},
    activeTab   : 0,
    height      : 560,
    width       : 1350,
    x           : 0,
    y           : 0,
    items       : [
        {
            xtype: 'panel',
            title: 'Po-Preparation',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 160,
                    height      : 120,
                    x           : 10,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 5,
                            labelWidth  : 1,
                            border      : false,
                            items : [txtpono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 5,
                            labelWidth  : 1,
                            border      : false,
                            items : [cmbpono]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : 30,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPodate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : 50,
                            labelWidth  : 1,
                            border      : false,
                            items : [dtpPodate]
                        },

  		

 			{
                            xtype       : 'fieldset',
                            title       : 'Year',
                            width       : 120,
                            x           : 725,
                            y           : 75,
                            defaultType : 'Label',
                            border      : false,
                            //items: [lblbuyerpo]
                        },


                    ]
                },
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 200,
                    height      : 120,
                    x           : 170,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
                 
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 0,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblIndentYear]
                        },

                        optyear,
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 150,
			    labelWidth  : 1,
			    x		: 10,
			    y		: 70,
                            border      : false,
                            items: [txtindfinyear]
                        },

                    ]      
                 } ,    
                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 960,
                    height      : 120,
                    x           : 370,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
/*                 
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 10,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPartyname]
                        },
*/
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 450,
                            x           : 10,
                            y           : -10,
                            border      : false,
                            items: [txtSupplierName]
                        },
/*
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 500,
                            x           : 10,
                            y           : 40,
                            border      : false,
                            items: [optAllItem]
                        },
*/
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 500,
                            x           : 480,
                            y           : 0,
                            border      : false,
                            items: [txtpartyref]
                        }  , 

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 530,
                            x           : 480,
                            y           : 30,
                            border      : false,
                            items: [txtpartyrefdate]
                        }  , 
 			{
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 400,
                        x           : 480,
                        y           : 60,
                        labelWidth  : 100,
                        border      : false,
                        items : [cmbDepartment]
                    },
/*
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 360,
                            x           : 10,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtAddr1]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 360,
                            x           : 10,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtAddr2]
                        },                           
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 360,
                            x           : 10,
                            y           : 70,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtAddr3]
                        }

*/

                    ]      
                 } ,

                {
                    xtype       : 'fieldset',
                    title       : 'Item Detail',
                    width       : 1320,
                    height      : 430,
                    x           : 10,
                    y           : 125,
                    border      : true,
                    layout      : 'absolute',
                    items: [

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 200,
                            labelWidth  : 250,
                            x           : 320,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblindno]
                        },
			

			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 400,
                            x           : -10,
                            y           : 10,
                            border      : false,
                            items: [cmbPurGroup]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 150,
                            x           : 300,
                            y           : 10,
                            border      : false,
                            items: [cmbindno]
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 450,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItems]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 150,
                            x           : 620,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblunit]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 450,
                            x           : 390,
                            y           : 10,
                            border      : false,
                            items: [cmbItems]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 200,
                            x           : 20,
                            y           : -17,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPurGroup]
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 70,
                            x           : 575,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblOthers2]
                       },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 80,
                            labelWidth  : 50,
                            x           : 710,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblUOM]
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 450,
                            x           : 700,
                            y           : 10,
                            border      : false,
                            items: [cmbUOM]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 80,
                            labelWidth  : 50,
                            x           : 810,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblqty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 800,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtqty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 80,
                            labelWidth  : 50,
                            x           : 900,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 880,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRate]
                        }, 


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 80,
                            labelWidth  : 50,
                            x           : 1000,
                            y           : -10,
                            hidden      : false,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 970,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtValue]
                        }, 


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            labelWidth  : 150,
                            x           : 1100,
                            y           : 10,
                            hidden      : false,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItemSpec]
                        },
  

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            labelWidth  : 150,
                            x           : 1200,
                            y           : -15,
                            hidden      : false,
                            defaultType : 'Label',
                            border      : false,
                            items: [btnIndSpec]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 75,
                            width       : 600,
                            x           : 920,
                            y           : 35,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtItemSpec]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 35,
                            width       : 170,
                            x           : 0,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtDiscount]
                        },  
 	                 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 30,
                            width       : 100,
                            x           : 90,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtpf]
                        },  
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 100,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtpfval]
                        }, 


			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 170,
                            x           : 170,
                            y           : 50,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtfr1]
                        }, 
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 170,
                            x           : 170,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtfr2]
                        }, 


                      
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 130,
                            x           : 0,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtDiscountval]
                        }, 
                      

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 130,
                            x           : 285,
                            y           : 50,
                            border      : false,
                            items: [txtIGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 130,
                            x           : 285,
                            y           : 80,
                            border      : false,
                            decimalPrecision:2,
                            items: [txtIGSTvalue] 
                        },
                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 150,
                            x           : 375,
                            y           : 50,
                            border      : false,
                            items: [txtSGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 375,
                            y           : 80,
                            border      : false,
                            items: [txtSGSTvalue] 
                        },
                      
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 180,
                            x           : 465,
                            y           : 50,
                            border      : false,
                            items: [txtCGST] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 465,
                            y           : 80,
                            border      : false,
                            items: [txtCGSTvalue] 
                        },
		       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 570,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                         items: [txtOthers]
                        }, 

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 50,
                            width       : 170,
                            x           : 640,
                            y           : 50,
                            border      : false,
                            items: [txtTCS] 
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 170,
                            x           : 640,
                            y           : 80,
                            border      : false,
                            items: [txtTCSvalue] 
                        },

			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 750,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRebate]
                       },
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 750,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRebate]
                        }, 


			{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 870,
                            y           : 50,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblitemtotvalue]
                       },
 			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 120,
                            x           : 870,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtItemValue]
                        }, 




                       /* {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 180,
                            x           : 640,
                            y           : 105,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtitemtotValue]
                        },*/
                      btnSubmit,

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 40,
                            width       : 200,
                            x           : 10,
                            y           : -15,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtinddate]
                        },

                        /*{
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            labelWidth  : 70,
                            x           : 695,
                            y           : 80,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblGrandtotal]
                        },*/flx_poDetails,flxDetail,
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 0,
                            y           : 270,
                            border      : false,
                            items: [txtGrossval] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 170,
                            y           : 270,
                            border      : false,
                            items: [txtTotIGST] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 340,
                            y           : 270,
                            border      : false,
                            items: [txtTotSGST] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 510,
                            y           : 270,
                            border      : false,
                            items: [txtTotCGST] 
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 200,
                            x           : 850,
                            y           : 280,
                            border      : false,
                            items: [txtroundoff] 
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 70,
                            width       : 200,
                            x           : 850,
                            y           : 310,
                            border      : false,
                            items: [txtNetval] 
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 150,
                            x           : 1140,
                            y           : 250,
                            defaultType : 'textfield',
                            border      : false,
                            items: [optRounding]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 0,
                            y           : 310,
                            border      : false,
                            items: [txttotpfval] 
                        },
			{
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 55,
                            width       : 200,
                            x           : 170,
                            y           : 310,
                            border      : false,
                            items: [txttotfr1val] 
                        },
			{
	                    xtype       : 'fieldset',
	                    title       : '',
	                    labelWidth  : 55,
	                    width       : 200,
	                    x           : 340,
	                    y           : 310,
	                    border      : false,
	                    items: [txttotfr2val] 
	                },
                        {
	                    xtype       : 'fieldset',
	                    title       : '',
	                    labelWidth  : 55,
	                    width       : 200,
	                    x           : 680,
	                    y           : 310,
	                    border      : false,
	                    items: [txttotothval] 
	                },
                        {
	                    xtype       : 'fieldset',
	                    title       : '',
	                    labelWidth  : 55,
	                    width       : 200,
	                    x           : 510,
	                    y           : 310,
	                    border      : false,
	                    items: [txttotdisval] 
	                }
                    ]
                },

                {
                    xtype       : 'fieldset',
                    title       : 'Additional Charges',
                    width       : 440,
                    height      : 200,
                    x           : 900,
                    y           : 450,
                    border      : true,
		    hidden:true,
                    layout      : 'absolute',
                    items: [
/*                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 70,
                            labelWidth  : 40,
                            x           : 0,
                            y           : 20,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblPercent]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 70,
                            labelWidth  : 40,
                            x           : 0,
                            y           : 45,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblAddValue]
                        },
 */
                        { 
                          xtype       : 'fieldset',
                            title       : '',
                            width       : 70,
                            labelWidth  : 40,
                            x           : 50,
                            y           : 0,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDiscount]
                        },
  /*                      
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 110,
                            labelWidth  : 80,
                            x           : 135,
                            y           : 0,
                             hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblExciseduty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 70,
                            x           : 130,
                            y           : 20,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtExciseduty]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 110,
                            labelWidth  : 80,
                            x           : 215,
                            hidden     :true,
                            y           : 0,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSed]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 70,
                            x           : 215,                            
                            y           : 20,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSed]
                        },		            
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 110,
                            labelWidth  : 80,
                            x           : 305,
                            y           : 0,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTnvat]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 70,
                            x           : 300,
                            y           : 20,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTnvat]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 110,
                            labelWidth  : 80,
                            x           : 390,
                            y           : 0,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblCst]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 70,
                            x           : 385,
                            y           : 20,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtCst]
                        },			
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 110,
                            labelWidth  : 80,
                            x           : 475,
                            y           : 0,
                            hidden     :true,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblOthers]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 130,
                            y           : 45,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtExcisedutyval]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 215,
                            y           : 45,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSedval]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 300,
                            y           : 45,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTnvatval]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 385,
                            y           : 45,
                            hidden     :true,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtCstval]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 60,
                            width       : 170,
                            x           : 0,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotDiscount]
                        },                        
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 110,
                            x           : 100,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotDiscountval]
                        }
*/ 
                        
                    ]
                },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 75,
                            width       : 450,
                            x           : 477,
                            y           : 30,
                            border      : false,
                            items: [flxParty]
                        },
            ]
        },



        {
            xtype: 'panel',
            title: 'Po-Other Detail',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
                {
                    xtype       : 'fieldset',
                    title       : 'Other Detail',
                    width       : 850,
                    height      : 505,
                    x           : 5,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [
                      /*  {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 440,
                            x           : 0,
                            y           : 0,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtprice]
                        },*/

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 460,
                            x           : 0,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtOtherRef]
                        },



                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 460,
                            x           : 0,
                            y           : 60,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbtransport]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 440,
                            x           : 0,
                            y           : 90,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtDeliveryDate]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 460,
                            x           : 0,
                            y           : 120,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbpayment]
                        },

/*
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 460,
                            x           : 0,
                            y           : 180,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtbank]
                        },
*/





                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 200,
                            x           : 0,
                            y           : 150,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtPayTerms]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 1000,
                            x           : 0,
                            y           : 180,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtOtherInstruction]
                        },



			{
             		   xtype       : 'fieldset',
               		   title       : '',
           	          labelWidth  : 130,
            	          width       : 500,
            	          x           : 0,
               		  y           : 240,
              	          border      : false,
               		 items: [cmbFreight]
               },



                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 460,
                            x           : 0,
                            y           : 270,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtdelpoint]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 200,
                            x           : 0,
                            y           : 300,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtadvper]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 200,
                            x           : 0,
                            y           : 330,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txttolerance]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 400,
                            x           : 0,
                            y           : 390,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtPOPrepared]
                        },


    
  
                  ]
                },
/*
                {
                    xtype       : 'fieldset',
                    title       : 'Specifications',
                    width       : 300,
                    height      : 505,
                    x           : 890,
                    y           : 5,
                    border      : true,
                    layout      : 'absolute',
                    items: [

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 250,
                            x           : 10,
                            y           : 5,
                            defaultType : 'textfield',
                            border      : false,
                            items: [flxSpecification]
                        },


                    ]
                },*/
          
            ]
        }
    ]
});

var PoPreparationFormPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'Purchase Order Preparation',
    header      : false,
    width       : 847,
    height      : 510,bodyStyle:{"background-color":"#eaeded"},
    x           : 0,
    y           : 15,
    frame       : false,
    id          : 'PoPreparationFormPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
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
                }
            }
        },'-',
        {
//edit
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            enable:false,
            listeners:{
                click: function () {
                    gstFlag = "Edit";
                    cmbpono.show();
                    txtpono.setValue();   



						loadPONOListDatasore.removeAll();
						loadPONOListDatasore.load({
							url:'ClsPo.php',
							params:
							{
								task:"loadPONOList",
								finid : Ginfinid,
								compcode : Gincompcode,
		
							},
							callback:function()
							{
;
							}
						});



                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            id:'save',
            listeners:{
                click:function()
                {
//save
                    var gstSave;
                    gstSave="true";

                   if (cmbItems.getValue()===0)
                    {
                        Ext.Msg.alert('Pur-Ord','Item Is Empty');
                        gstSave="false";
                    }
                    else if (cmbtransport.getValue()==0 || cmbtransport.getRawValue()=='' )
                    {
                        Ext.Msg.alert('Pur-Ord','Transport Name is empty');
                        gstSave="false";
                    }
                    else if (cmbpayment.getRawValue()=='' )
                    {
                        Ext.Msg.alert('Pur-Ord','Payment Mode is empty');
                        gstSave="false";
                    }                    
                    else if (txtPayTerms.getRawValue()=='' )
                    {
                        Ext.Msg.alert('Pur-Ord','Payment Terms is empty');
                        gstSave="false";
                    } 
                    else if (cmbFreight.getRawValue()=='' )
                    {
                        Ext.Msg.alert('Pur-Ord','Freight Type is empty');
                        gstSave="false";
                    } 

                    else if ( Number(txtNetval.getValue()) == 0 )
                    {
                        Ext.Msg.alert('Pur-Ord','PO VALUE shoule not be empty');
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
                                    //var pdbl_netvalue=Number(fdbl_totalvalue)+Number(txtExcisedutyval.getRawValue())+Number(txtSedval.getRawValue())+
                                    //    Number(txtTnvatval.getRawValue())+Number(txtCstval.getRawValue())+Number(txtOthersval.getRawValue())-Number(txtDiscount.getRawValue());
                            
                           // var pdbl_netvalue=Number(fdbl_totalvalue)+Number(txtTotIGST.getRawValue())+
                           //                   Number(txtTotSGST.getRawValue())+Number(txtTotCGST.getRawValue())+
                            //                  Number(txtOthersval.getRawValue())-Number(txtDiscount.getRawValue());    

                            pdbl_netvalue=txtNetval.getRawValue();

                            Ext.getCmp('save').setDisabled(true);   
			   
                            if (gstSave === "true")
                            {  

                            flxDetail.getSelectionModel().selectAll();
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });


//alert(poData.length);       


                            Ext.Ajax.request({
                          url: '/SHVPM/Purchase/General/TrnPurchaseOrder/TrnPOPreparationSave.php',

                            params :
                             {

		
                                griddet: Ext.util.JSON.encode(poupdData),                                      
                                cnt:poData.length,
                                savetype      : gstFlag,
                                phdcompcode   : Gincompcode,
				phdpono       : txtpono.getRawValue(),
				phdpodate     : Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
				phdfincode    : Ginfinid,
                          	phddept       : cmbDepartment.getValue(),
				phdsupcode    : supcode,
				phdcreditdays : txtPayTerms.getRawValue(),
				phdtransport  : cmbtransport.getValue(),
				phdpayterms   : cmbpayment.getRawValue(),
				phdinsterms   : '',  //BlanK
				phddelypoint  : txtdelpoint.getRawValue(),
				otherrefer    : txtOtherRef.getRawValue(),

				phdsplinstruction : txtOtherInstruction.getRawValue(),
				phdadvance    : Number(txtadvper.getRawValue()),
				phdtotal      : txtNetval.getRawValue(),
				phdamndstatus : '',
				phdcancelstatus : '',
				phdcancelreason : '',
				phdrefno        : '',
				phdtol          : Number(txttolerance.getRawValue()),
				phddeliverydate : Ext.util.Format.date(txtDeliveryDate.getValue(),"Y-m-d"),

				phdentdate      : Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),

				phdpartyrefno   : txtpartyref.getRawValue(),
				phdpartyrefdate : Ext.util.Format.date(txtpartyrefdate.getValue(),"Y-m-d"),
				phditeminfo     : '',
                                preparedby      : GinUserid,
				phdfreight      : cmbFreight.getRawValue() ,
		                phdroundoff     : txtroundoff.getValue(),
                                roundneed       : roundoff,
  
                            },
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono'] + " Saved Sucessfully");
                                    PoPreparationFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else{
if (obj['pono'] == 0)
 Ext.MessageBox.alert("This Purchase Order Number Already Saved.  Pls Check!-"); 
else
 Ext.MessageBox.alert("Purchase Order Not Completed! Pls Check!-" + obj['pono']); 

                    Ext.getCmp('save').setDisabled(false);    
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
                    RefreshData();
                }
            }
        },'-',
//VIEW
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
	  
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(Ginfinid);
		var p3 = "&pono=" + encodeURIComponent(txtpono.getValue());
		var p4 = "&purhead=" + encodeURIComponent(purheadname);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 

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
                    PoPreparationWindow.hide();
                }
            }
        }]
    },
    items: [ tabPurchaseOrder ]
});

function RefreshData(){
    cmbpono.hide();
    gstFlag = "Add";
    flxParty.hide();
    dateval=new Date();
    
     Ext.getCmp('optyear').setValue(1);
    txtindfinyear.setValue(Ginfinid);
    indyear = Ginfinid;

    Ext.getCmp('txtIGST').setDisabled(false);                      
    Ext.getCmp('txtIGSTvalue').setDisabled(false);   
    Ext.getCmp('txtSGST').setDisabled(false);                      
    Ext.getCmp('txtSGSTvalue').setDisabled(false);     
    Ext.getCmp('txtCGST').setDisabled(false);                      
    Ext.getCmp('txtCGSTvalue').setDisabled(false);
    txtSupplierName.setValue('');
    flxParty.getStore().removeAll();
    txtIGST.setValue('');
    txtIGSTvalue.setValue('');
    txtRebate.setValue('');
    txtSGST.setValue('');
    txtSGSTvalue.setValue('');
    txtCGST.setValue('');
    txtCGSTvalue.setValue('');
    txtAddr1.setRawValue(''); 
    txtAddr2.setRawValue('');
    txtAddr3.setRawValue('');
    txtPayTerms.setValue('');		
    txtdelpoint.setRawValue('');
    txtOtherRef.setRawValue('');

    txtItemSpec.setRawValue('');
    txtadvper.setValue('');
    txtNetval.setRawValue('');
    txtbank.setRawValue('');
    txttolerance.setRawValue('');
    txtpartyref.setRawValue(''),
    txtOtherInstruction.getRawValue('');

   // txtPOPrepared.setRawValue('');
    txtOtherInstruction.setRawValue('');

    flxDetail.getStore().removeAll();
  //  Ext.getCmp('txtpono').setReadOnly(true);
    Ext.getCmp('save').setDisabled(false);    
    duedateval=new Date();

    dtpPodate.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
    txtDeliveryDate.setRawValue();
    txtpartyrefdate.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
    viewpoopt = 0; 

txtGrossval.setRawValue('');
txtTotIGST.setRawValue('');
txtTotSGST.setRawValue('');
txtTotCGST.setRawValue('');
txtroundoff.setRawValue('');
txtOtherRef.setRawValue('');
txtPOPrepared.setRawValue('');
txtdelpoint.setRawValue('');
txtDeliveryDate.setRawValue('');

    PonoDetailDataStore.load({
       url: 'ClsPo.php',
       params: {
                    task: 'PonoDetail',
 		    cmpcode:Gincompcode,
                    finid:Ginfinid   
               },
      callback:function()
		{
		txtpono.setRawValue(PonoDetailDataStore.getAt(0).get('pono'));
		}
    });




  
}

var dateval,duedateval;
var PoPreparationWindow = new Ext.Window({
    height      : 615,
    width       : 1350,
    y           : 25,
    title       : 'PO Preparation',
    items       : PoPreparationFormPanel,
    bodyStyle:{"background-color":"#eaeded"},
    layout      : 'fit',
    closable    : true,
    minimizable : true,
    //maximized:true,
    resizable   : false,
    border      : false,
    draggable   : false,
    listeners:
    {
        show:function(){

//alert(Gincompcode);
//alert(Ginfinid);

           // txtIGST.hide();
           // txtIGSTvalue.hide();
  cmbpono.hide();
            gstFlag = "Add";
            flxParty.hide();
            txtSGST.show();
            txtSGSTvalue.show();
            txtCGST.show();
            txtCGSTvalue.show();
            cmbState.setValue('LOCAL');
            txtfr1.setValue('0');
	    txtfr2.setValue('0');
            txtIGST.setValue('0');
            txtIGSTvalue.setValue('0');
            txtSGST.setValue('0');
            txtSGSTvalue.setValue('0');
            txtCGST.setValue('0');
            txtCGSTvalue.setValue('0');
            txtDiscount.setValue('0');
            txtDiscountval.setValue('0');
            Ext.getCmp('txtindfinyear').setDisabled(true);

            Ext.getCmp('txtinddate').hide();

            txtindfinyear.setValue(Ginfinid);
            dateval=new Date();
            duedateval=new Date();

            txtPOPrepared.setValue(GinUser);

      //      Ext.getCmp('save').setDisabled(true); 


            VendorDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'loadsupplier'
                }
            });
  	    PonoDetailDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'PonoDetail',
		    cmpcode:Gincompcode,
                    finid:Ginfinid   
                },
		callback:function()
		{
		txtpono.setRawValue(PonoDetailDataStore.getAt(0).get('pono'));
		}
            });

	   loadbuyerpodatastore.load({
                       	url: 'ClsPo.php',
                       	params:
                       		{
                          		task:"loadbuyerpo",
					finid : Ginfinid,
					type:potype
                       		}
                    		});

           // cmbPartyname.focus();
            DEPTDataStore.load({
                url: 'ClsPo.php',
                params: {
                    task: 'cmbDepartment',
                    gincompcode:Gincompcode
                }
            });


            findPurchaseHeaddatastore.load({
             url: 'ClsPo.php',
               params:
                 {
                 task:"loadPurchaseHead"
                 },
		callback:function()
		{
		  purheadname = findPurchaseHeaddatastore.getAt(0).get('dept_headname');


		}
            });


             //   Ext.getCmp('txtinddate').getEl().dom.setAttribute('readOnly', true);
        }
    }
});
PoPreparationWindow.show();
});




