Ext.onReady(function(){
Ext.QuickTips.init();


var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');


var editrow = 0;
var gridedit = "false";
var gstFlag = "Add";


var ivalue=0,idisamt=0,icgstamt=0,isgstamt=0,iigstamt=0,totitemvalue =0;

var totalqty,cgstval,sgstval,igstval,totalgstval,totalval,finaltotval;

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

            fdbl_totalvalue = Number(fdbl_totalvalue) + Number(sel[i].data.val1);
	    fdbl_totalqty = Number(fdbl_totalqty) + Number(sel[i].data.qty);
            fdbl_disc = Number(fdbl_disc) + Number(sel[i].data.disval);
	    fdbl_cgst = Number(fdbl_cgst) + Number(sel[i].data.cgstval);
	    fdbl_sgst = Number(fdbl_sgst) + Number(sel[i].data.sgstval);
	    fdbl_igst = Number(fdbl_igst) + Number(sel[i].data.igstval);
	    fdbl_other = Number(fdbl_other) + Number(sel[i].data.otherval);
	    fdbl_sumvalue = Number(fdbl_sumvalue) + Number(sel[i].data.itemvalue);
          
        }
//        txtttotalvalue.setValue(fdbl_totalvalue);
        txttotalvalue.setValue(fdbl_totalvalue);
        txtdiscount.setValue(fdbl_disc);
//	txtttotalqty.setValue(fdbl_totalqty);
        txttotalqty.setValue(fdbl_totalqty);
        txtcgsttotal.setValue(fdbl_cgst);      
        txtsgsttotal.setValue(fdbl_sgst);      
        txtigsttotal.setValue(fdbl_igst);      
        txtothertotal.setValue(fdbl_other);      
        txtsubtotal.setValue(fdbl_sumvalue)

        fdbl_sumvalue = Number(fdbl_sumvalue) +  Number(txtFreight1.getValue())+Number(txtFreight2.getValue())-(txtdiscountscrapval.getValue());

        if (Number(fdbl_sumvalue) < 0)
        {
            fdbl_sumvalue = 0;
         }

	txttotalfinalamt.setValue(fdbl_sumvalue);

    }
 

 var LoadGrnNoDatastore = new Ext.data.Store({
      id: 'LoadGrnNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
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

 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'sup_refname','sup_code'
      ]),
    });
 
 var LoadPaytermDatastore = new Ext.data.Store({
      id: 'LoadPaytermDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpayterms"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'term_name','term_code'
      ]),
    }); 

 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','gent_item_code'
      ]),
    }); 
    

 var LoadItemDetailDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'balqty'
      ]),
    });
    var cmbpayterm = new Ext.form.ComboBox({
        id: 'cmbpayterm',
        store: LoadPaytermDatastore, 
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Payment Terms',
        editable:false,
        emptyText:'Select Payment Terms',
        blankText:'Select Payment Terms',
        width: 250,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : 'term_code'    
        
    });

var store3 = new Ext.data.Store({
      
    });
    
   
 var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dept_name','dept_code'
      ]),
    }); 

var cmbdept= new Ext.form.ComboBox({
        id: 'cmbdept',
        store: LoadDeptDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:false,
        width: 250,
        displayField: 'dept_name',
        valueField: 'dept_code',
        hiddenName : 'dept_code'       
      });

 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcarrier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'carr_name','carr_code'
      ]),
    });



 var cmbcarrier = new Ext.form.ComboBox({
        id: 'cmbcarrier',
        store: LoadCarrierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Carrier',
        editable:true,
        width: 250,
        displayField: 'carr_name',
        valueField: 'carr_code',
        hiddenName : 'carr_code'
     
      });
      
 var LoadDcNoDatastore = new Ext.data.Store({
      id: 'LoadDcNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddcno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'genh_no'
      ]),
    });

 var cmbdnno = new Ext.form.ComboBox({
        id: 'cmbdnno',
        store: LoadDcNoDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'DN NO',
        editable:true,
        width: 80,
        displayField: 'genh_no',
        valueField: 'genh_no',
        hiddenName : 'genh_no',
    	listeners:{
        select:function(){

                        txtwoqty.setValue('');
                        txtgrnqty.setValue('');   


                        LoadWoNoDatastore.removeAll();
			LoadWoNoDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loadwono",
                                compcode:Gincompcode,
				finid:GinFinid,
				dcno:cmbdnno.getRawValue()
                            },
				callback:function(){
				var a = LoadWoNoDatastore.getCount();
                                cmbdept.setValue(LoadWoNoDatastore.getAt(0).get('genh_dept')); 
				
        	        	}
                        });         
        }
    }
});

       var woname_combo = new Ext.form.ComboBox({
        id: 'woname_combo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'WO Name',
        editable:false,
        width: 250
     
      });
      
    var LoadWoNoDatastore = new Ext.data.Store({
      id: 'LoadWoNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'gent_pono','genh_dept'
      ]),
    });





    var LoadWorkorderItemDetailDatastore = new Ext.data.Store({
      id: 'LoadWorkorderItemDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwoitemdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'woh_seqno', 'woh_date', 'woh_dept', 'woh_type','woh_price_terms', 'woh_pay_terms', 'woh_credit_days', 'woh_remarks', 'wot_itemcode','wot_unit',
'wot_rate', 'wot_qty', 'wot_recd', 'wot_value', 'wot_dis_per', 'wot_dis_amt', 'wot_tax_amt', 'wot_other_amt', 'wot_cgst_per', 'wot_cgst_amt', 
'wot_sgst_per', 'wot_sgst_amt', 'wot_igst_per', 'wot_igst_amt' 

      ]),
    });



     var cmbwono = new Ext.form.ComboBox({
        id: 'cmbwono',
        store: LoadWoNoDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'WO No',
        editable:false,
        width: 75,
        displayField: 'gent_pono',
        valueField: 'gent_pono',
        hiddenName : 'gent_pono',
    	listeners:{
        select:function(){
			LoadItemDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loaditem",
                                compcode:Gincompcode,
				finid:GinFinid,
				dcno:cmbdnno.getRawValue(),
				wono:this.getRawValue()
                            }
  
                        });         
        }
    }
	

 
      });
      

      
       var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: LoadItemDatastore,
   	displayField: 'item_name',
        valueField: 'gent_item_code',
        hiddenName : 'item_name'     ,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item',
        editable:false,
        labelWidth:30,
        width: 200,
    	listeners:{
        select:function(){
/*
			LoadItemDetailDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loaditemdetail",
                                compcode:Gincompcode,
				finid:GinFinid,
				dcno:cmbdnno.getRawValue(),
				wono:cmbwono.getRawValue(),
                                item:cmbitem.getValue()    
                            },
                         callback:function()
                            {   
                               var cnt = LoadItemDetailDatastore.getCount();
                               txtwoqty.setValue(LoadItemDetailDatastore.getAt(0).get('balqty'));
  
                            }  
                      });     

*/
			LoadWorkorderItemDetailDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loadwoitemdetail",
                                compcode:Gincompcode,
				finid:GinFinid,
				dcno:cmbdnno.getRawValue(),
				wono:cmbwono.getRawValue(),
                                item:cmbitem.getValue()    
                            },
                         callback:function()
                            {   
                               var cnt = LoadWorkorderItemDetailDatastore.getCount();
                               txtwoqty.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_qty')-LoadWorkorderItemDetailDatastore.getAt(0).get('wot_recd'));
                               txtrate.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_rate'));
                               txtdisper.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_dis_per'));
                               txtcgstper.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_cgst_per'));
                               txtsgstper.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_sgst_per'));
                               txtigstper.setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_igst_per'));
                               txtothers .setValue(LoadWorkorderItemDetailDatastore.getAt(0).get('wot_other_amt')); 


                            }  
                      });     

    
           }
          }
       
      });

 

 


var store6 = new Ext.data.Store({
       
    });

var cmbparty = new Ext.form.ComboBox({
        id: 'cmbparty',
        store: LoadSupplierDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_code',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 300,
    	listeners:{
        select:function(){

			LoadDcNoDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loaddcno",
                                compcode:Gincompcode,
				finid:GinFinid,
				supcode:cmbparty.getValue()
                            }
                        });         
        }
    }
});


  var dtrecpt = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
//       id          :  'dtrecpt',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
    
    
  var dtbill = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'billdate',
//       id          : 'dtbill',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
   var dtdnno = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dcdate',
//       id          :  'dtdnno',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
 
 
  var dtgateentry = new Ext.form.DateField
    ({
       
       name        : 'gatedate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       x:200,
       y:185,
       value: new Date().format('d-m-Y'),
       editable    : false
    });
 
   var txtreceiptno = new Ext.form.NumberField({
        fieldLabel  : 'Receipt Number',
        id          : 'txtreceiptno',
        width       : 80,
        name        : 'txtreceiptno'
   });

   var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill Number',
        id          : 'txtbillno',
        width       : 80,
        name        : 'txtbillno'
   });

/*var cmbdnno = new Ext.form.ComboBox({
        id: 'cmbdnno',
        store: LoadDcNoDatastore,
        displayField: 'genh_no',
        valueField: 'genh_no',
        hiddenName : 'genh_no',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable:true,
        emptyText:'Select No',
        blankText:'Select No',
        fieldLabel:'DC No',
        width: 70,
    	listeners:{
        select:function(){

			   
        }
    }
});*/

  var txtwoqty = new Ext.form.NumberField({
        fieldLabel  : 'Wo Qty',
        id          : 'txtwoqty',
        width       : 60,
        name        : 'txtwoqty'
   });

  var txtgrnqty = new Ext.form.NumberField({
        fieldLabel  : 'GRN Qty',
        id          : 'txtgrnqty',
        width       : 60,
        name        : 'txtgrnqty',
        enableKeyEvents: true,
        listeners:{
            keyup:function(){
                if (Number(txtgrnqty.getValue()) > txtwoqty.getValue())
                 {
                     alert("GRN Quantity should not higher then WO Quantity..");
                     txtgrnqty.setValue(0);                
                 }  
                calculateItemValue();
            },
        }  
   });



  var txtrate = new Ext.form.NumberField({
        fieldLabel  : 'Rate',
        id          : 'txtrate',
        width       : 60,
        name        : 'txtrate',
        readOnly    : 'ture',
	enableKeyEvents: true,
	listeners:{

                   keyup:function(){
                        calculateItemValue();
                  
                }
         }
  
 });


  var txtdisper = new Ext.form.NumberField({
        fieldLabel  : 'Dis %',
        id          : 'txtdisper',
        width       : 60,
        name        : 'txtdisper',
        readOnly    : 'ture'
   });

  var txtcgstper = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtcgstper',
        width       : 60,
        name        : 'txtcgstper',
        readOnly    : 'ture'
   });

  var txtsgstper = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtsgstper',
        width       : 60,
        name        : 'txtsgstper',
        readOnly    : 'ture'
   });

  var txtigstper = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtigstper',
        width       : 60,
        name        : 'txtigstper',
        readOnly    : 'ture'
   });


  var txtothers = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtothers',
        width       : 60,
        name        : 'txtothers',
	enableKeyEvents: true,
	listeners:{

                   keyup:function(){
                        calculateItemValue();
                  
                }
         }

   });

  var txthsncode = new Ext.form.NumberField({
        fieldLabel  : 'HSN Code',
        id          : 'txthsncode',
        width       : 60,
        name        : 'txthsncode'
   });

  var txttotalqty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txttotalqty',
        width       : 70,
        name        : 'txttotalqty',
        readOnly    : 'ture'
   });



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
                    grid_tot();
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
                    grid_tot();
		}
        }
    });

var txtdiscountscrapval = new Ext.form.NumberField({
                fieldLabel  : 'Scrap Exchange',width: 100,name: 'txtdiscountscrapval',emptyText: 'Discount/Scrap',style:'text-align:right',x: 520,y: 110, enableKeyEvents: true,
          	listeners:{
			keyup:function()
				{
                                grid_tot();
				}
			}
                
                    });

var txttotalfinalamt = new Ext.form.NumberField({
              fieldLabel  : 'Final Amount',readOnly :true,  width: 100,emptyText: 'Total Amount',style:'text-align:right',name: 'txttotalfinalamt',x: 520,y: 180
               
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



   var txtdiscount = new Ext.form.NumberField({
           width: 90,emptyText:'Discount',style:'text-align:right',name: 'txtdiscount',x: 100,y: 45,  enableKeyEvents: true,readOnly:true,
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


    var fieldset1 = {
        xtype        : 'fieldset',
        title        : '',
        width        :300,
        flex         : 1,
        border       : false,
        labelWidth : 75,
        defaultType : 'field',
        defaults     : {
           

        },
        items : [
       txtreceiptno,dtrecpt
     
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
      cmbparty, txtbillno, cmbdnno,cmbdept
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

    var gridstore2 = new Ext.data.JsonStore({
       
    });

function refresh() {

  txtwoqty.setRawValue('');                              
  txtgrnqty.setRawValue('');                            
  txtrate.setRawValue('');                            
  txtdisper.setRawValue('');
  txtcgstper.setRawValue('');
  txtsgstper.setRawValue('');
  txtigstper.setRawValue('');
  txtothers.setRawValue('');  
  txthsncode.setRawValue('');
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


       ivalue = 0;
       idisamt = 0;
       icgstamt = 0;
       isgstamt = 0;
       iigstamt =0;
       totitemvalue = 0;
 

       itemvalue=Ext.util.Format.number(Number(txtrate.getRawValue())*Number(txtgrnqty.getRawValue()),'0.00');
       ivalue = itemvalue;
       if (txtdisper.getRawValue() > 0 && itemvalue > 0 )  {
          idisamt =  Ext.util.Format.number(Math.round(itemvalue * txtdisper.getRawValue() /100));
       }    


       taxable = ivalue - idisamt;

       
       if (txtcgstper.getRawValue() > 0 && taxable > 0 )  {
           cgst = taxable * txtcgstper.getRawValue()/100;   
       }
       icgstamt = Ext.util.Format.number(cgst,'0.00');


       
       if (txtsgstper.getRawValue() > 0 && taxable > 0 )  {
           sgst = taxable * txtsgstper.getRawValue()/100;   
       }
       isgstamt = Ext.util.Format.number(sgst,'0.00');


       if (txtigstper.getRawValue() > 0 && taxable > 0 )  {
           igst = taxable * txtigstper.getRawValue()/100;   
       }
       iigstamt = Ext.util.Format.number(igst,'0.00');

       value1 = taxable + cgst + sgst+igst + Number(txtothers.getRawValue());

       totitemvalue = Ext.util.Format.number(Math.round(value1),'0.00');


}



var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})

var btnsubmit = new Ext.Button({
                text: 'ADD',
                width: 50,
                tooltip:'Click To Add',
                icon:'/WorkOrder/icons/download.gif',
    		listeners:{
        	click: function(){    

alert(gridedit)
                      var gstadd="true";
                      if (Number(txtgrnqty.getValue())===0){
                          Ext.MessageBox.alert("WO GRN ", "Enter quantity..");
                          txtgrnqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtrate.getValue())===0){
                          Ext.MessageBox.alert("WO GRN ", "Enter Rate..");
                          txtrate.focus();
                          gstadd="false";
                       }

                       if(gstadd=="true")
                       {
                           flxDetail.getSelectionModel().selectAll();
                           var selrows = flxDetail.getSelectionModel().getCount();
                           var sel = flxDetail.getSelectionModel().getSelections();
                           var cnt = 0;
                           for (var i=0;i<selrows;i++)
	                   {
                              if (sel[i].data.itemname == cmbitem.getRawValue())
	                      {
                                   cnt = cnt + 1;
                              }
                           }
                          if(gridedit === "true")
              	          {
		           	gridedit = "false";
                           	var idx = flxDetail.getStore().indexOf(editrow);
            	          	sel[idx].set('wono'      , cmbwono.getRawValue());
        	          	sel[idx].set('itemname'  , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'  , cmbitem.getValue());
        	          	sel[idx].set('qty'       , txtgrnqty.getValue());
               	          	sel[idx].set('rate'      , txtrate.getValue());
            	          	sel[idx].set('val1'      , Number(txtrate.getRawValue())*Number(txtgrnqty.getRawValue()));
        	          	sel[idx].set('dis'       , txtdisper.getRawValue());
        	          	sel[idx].set('disval'    , idisamt);
            	          	sel[idx].set('cgst'      , txtcgstper.getValue());
        	          	sel[idx].set('cgstval'   , icgstamt);
            	          	sel[idx].set('sgstper'   , txtsgstper.getValue());
        	          	sel[idx].set('sgstval'   , isgstamt);
            	          	sel[idx].set('igst'      , txtigstper.getValue());
        	          	sel[idx].set('igstval'   , iigstamt);
           	          	sel[idx].set('otherval'  , txtothers.getValue());
           	          	sel[idx].set('itemvalue' , totitemvalue);
           	          	sel[idx].set('hsn'       , txthsncode.getRawValue());
                                sel[idx].set('woqty'     , txtwoqty.getRawValue());
                           	flxDetail.getSelectionModel().clearSelections();
                                refresh();
                                grid_tot();
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
                                       sno      : RowCnt,
			               wono     : cmbwono.getRawValue(),
                                       itemname : cmbitem.getRawValue(), 
                                       itemcode : cmbitem.getValue(),
                                       qty      : txtgrnqty.getRawValue(), 
                                       rate     : txtrate.getRawValue(), 
		                       val1     : Number(txtrate.getRawValue())*Number(txtgrnqty.getRawValue()),
                                       dis      : txtdisper.getValue(),
                                       disval   : idisamt,
                                       cgst     : txtcgstper.getValue(),
                                       cgstval  : icgstamt,
                                       sgst     : txtsgstper.getValue(),
                                       sgstval  : isgstamt,
                                       igst     : txtigstper.getValue(),
                                       igstval  : iigstamt,
                                       otherval : txtothers.getValue(), 
                                       itemvalue: totitemvalue, 
			               wodt     : '0',
                                       hsn      : txthsncode.getRawValue(),
                                       woqty   : txtwoqty.getRawValue(),
                                  }) 
                              );
                              refresh();
                              grid_tot();
                   }
 
             }
           } }
});


/*
 var gridstore2 = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'gridstore2'
        }, [
            'sno', 'wono', 'itemdes', 'itemcode', 'qty', 'rate',  'val1', 'wodt', 'hrs', 'hsn'
        ])
    });

*/


/*-------------------- Second grid panel ---------------------- */
       var dgrecord = Ext.data.Record.create([]);
       var flxDetail = new Ext.grid.EditorGridPanel({
	sm: new Ext.grid.RowSelectionModel(),
        store            : [],// gridstore2,
        frame            : false,
        title            : '',
//        autoShow         : true,
//        loadMask         : true,
//        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        scrollable: true,
        columns: [
        {dataIndex:'sno',header: "S.No",width: 40,align: 'center',sortable: true,hidden: true},
        {dataIndex:'wono',header: "WO No.",width: 40,align: 'center',sortable: true},
        {dataIndex:'wodt',header: "Wo.Date",width: 60,align: 'center',sortable: true},
        {dataIndex:'itemname',header: "Item Description",width: 100,align: 'center',sortable: true},
        {dataIndex:'itemcode',header: "Item Code",width: 60,align: 'center',sortable: true},
        {dataIndex:'qty',header: "Qty",width: 60,align: 'center',sortable: true},
        {dataIndex:'rate',header: "Rate",width: 100,align: 'center',sortable: true},
        {dataIndex:'val1',header: "Value",width: 60,align: 'center',sortable: true},
        {dataIndex:'dis',header: "Dis %",width: 60,align: 'center',sortable: true},
        {dataIndex:'disval',header: "Dis Val",width: 60,align: 'center',sortable: true},
        {dataIndex:'cgst',header: "CGST %",width: 60,align: 'center',sortable: true},
        {dataIndex:'cgstval',header: "CGST Val",width: 60,align: 'center',sortable: true},
        {dataIndex:'sgst',header: "SGST %",width: 60,align: 'center',sortable: true},
        {dataIndex:'sgstval',header: "SGST Val",width: 60,align: 'center',sortable: true},
        {dataIndex:'igst',header: "IGST %",width: 60,align: 'center',sortable: true},
        {dataIndex:'igstval',header: "IGST Val",width: 60,align: 'center',sortable: true},
        {dataIndex:'otherval',header: "Other Val",width: 60,align: 'center',sortable: true},
        {dataIndex:'itemvalue',header: "Tot Value",width: 60,align: 'center',sortable: true},
        {dataIndex:'hsn',header: "HSN",width: 60,align: 'center',sortable: true},
        {dataIndex:'woqty',header: "WOQty",width: 60,align: 'center',sortable: true},
        {dataIndex:'oldqty',header: "OldQty",width: 60,align: 'center',sortable: true},

        ],
        stripeRows: true,
        height:160,
        width:720,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Work order GRN Preparation',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
              msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){

        	if (btn === 'yes'){
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;

                       	cmbwono.setRawValue(selrow.get('wono'));
                    	cmbitem.setRawValue(selrow.get('itemname'));	
                      	cmbitem.setValue(selrow.get('itemcode'));

        	    	txtgrnqty.setValue(selrow.get('qty'));
		    	txtrate.setValue(selrow.get('rate'));
		
                        txtdisper.setValue(selrow.get('dis'));
			txtcgstper.setValue(selrow.get('cgst'));
			txtsgstper.setValue(selrow.get('sgst'));
			txtigstper.setValue(selrow.get('igst'));
			txtothers.setValue(selrow.get('otherval'));	
			txthsncode.setValue(selrow.get('hsn'));	

			txtwoqty.setValue(selrow.get('woqty'));	

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
/*
 
 var cgstamt = new Ext.form.NumberField({id : 'cgstamt1' ,x:200, y:42,width:60
})
 var txttotalval = new Ext.form.NumberField({id : 'txttotalval', fieldLabel  : 'Total Value',x:200, y:42,width:60
})

 var txttransportunit = new Ext.form.NumberField({id : 'txttransportunit', fieldLabel  : 'Transport/Unit',x:200, y:42,width:60
})
 var txtdiscount = new Ext.form.NumberField({id : 'txtdiscount', fieldLabel  : 'Discount',x:200, y:42,width:60,
		listeners:
		{
		change:function()
			{
			alert("Test");
			grid_tot();
			}
		}
})
 var sgstamt = new Ext.form.NumberField({id : 'sgstamt1' ,x:200, y:68,width:60
})
 var igstamt = new Ext.form.NumberField({id : 'igstamt1' ,x:200, y:94,width:60
})

 var transamt = new Ext.form.NumberField({id : 'tranamt1' ,x:210, y:120,width:80
})

 var totalfinalamount = new Ext.form.NumberField({id : 'totalfinalamount' ,fieldLabel  : 'Total Amount',x:210, y:120,width:80
})

 var txtlabourcharge = new Ext.form.NumberField({id : 'txtlabourcharge' ,fieldLabel  : 'Labour Charge',x:210, y:120,width:80,
		listeners:
		{
		change:function()
			{
			alert("Test");
			grid_tot();
			}
		}
})

*/
var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Work Order General',
        style        : 'margin: 5px ',
        height       : 580,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
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
        {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:45,
                    width: 160,
                    x: 490,
                    y: 26,
                    items: [
                        dtbill,dtdnno
                    ]
                },
                  
                
            {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 325,
            width: 900,
            x: 10,
            y: 160,
            items: [
            {
                xtype: 'panel',
                title: 'WO & QTY Detail',
                width: 200,
                height: 200,
                layout: 'absolute',
                items: [

                {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 90,
                    width: 850,
                    x: 0,
                    y: 5,
                    labelWidth:45,
                    items: [
                       cmbwono
                    ]
                }
                ,
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:30,
                    width: 280,
                    x: 160,
                    y: 5,
                    items: [
                         cmbitem
                       
                    ]
                },
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:50,
                    width: 145,
                    x: 410,
                    y: 5,
                    items: [
                        txtwoqty
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:25,
                    width: 125,
                    x: 690,
                    y: 5,
                    items: [
                        txtrate
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:60,
                    width: 145,
                    x: 550,
                    y: 5,
                    
                    items: [
                         txtgrnqty
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:40,
                    width: 150,
                    x: 0,
                    y: 45,
                    items: [
                         txtdisper
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 110,
                    y: 45,
                    items: [
                        txtcgstper
                    ]
                },
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 240,
                    y: 45,
                    items: [
                          txtsgstper
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 370,
                    y: 45,
                    items: [
                          txtigstper
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:40,
                    width: 125,
                    x: 500,
                    y: 45,
                    items: [
                         txtothers
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:70,
                    width: 155,
                    x: 615,
                    y: 45,
                    items: [
                        txthsncode
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:25,
                    width: 70,
                    x: 770,
                    y: 35,
                    items: [
                   btnsubmit
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 185,
                    width: 750,
                    x: 1,  
                    y: 95,
                    items: [
                     flxDetail
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:100,
                    width: 200,
                    x: 400,
                    y: 260,
                    items: [
                         txttotalqty
                    ]
                },
                ]
            },

            {
                xtype: 'panel',
                title: 'Value Detail',
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
                            width: 400,
                            x: 380,
                            y: 10,
                            items: [
                         	{
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  labelWidth:100,  
                                  width: 250,
                                  x: 0,
                                  y: 0,
                                  items: [txtFreight1,txtFreight2,txtdiscountscrapval,txttotalfinalamt]
                               },
                            ]
                         },

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
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 190,
                    labelWidth:130,
                    width: 310,
                    x: 0,
                    y: 5,
                    items: [
                        
                     txttotalval,
                         {
                          xtype: 'textfield',
                          fieldLabel: 'CGST % & Amount',
                          width:50,
                          name: 'txtcgst3',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'SGST % & Amount',
                          width:50,
                          name: 'txtsgst3',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'IGST % & Amount',
                          width:50,
                          name: 'txtigst3',
                         },
                       txttransportunit
                    ]
                },cgstamt,sgstamt,igstamt,transamt,
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 190,
                    labelWidth:100,
                    width: 240,
                    x: 308,
                    y: 5,
                    items: [
                     txtdiscount,
                        txtlabourcharge,
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Other Amount',
                    width:100,
                    name: 'numothamt',
                    },
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Discount /Scrap Exchange',
                    width:100,
                    name: 'numdisscr',
                    },
                         totalfinalamount
                    
                    ]
                }
*/
                ]
            },
            {
                xtype: 'panel',
                title: 'Other Detail',
                width: 200,
                height: 300,
                layout: 'absolute',
                items: [
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 250,
                    width: 500,
                    x: 0,  
                    y: 5,
                    items: [cmbcarrier,
                          {
                    xtype: 'textfield',
                    fieldLabel: 'Price',
                    width:150,
                    name: 'txtprice',
                    
                },cmbpayterm,
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Credit Days',
                    width:50,
                    name: 'credidays',
                    
                },
                 {
                    xtype: 'textarea',
                    fieldLabel: 'Remarks',
                    width:300,
                    name: 'woremarks',
                    
                },
                 {
                    xtype: 'textfield',
                    fieldLabel: 'Gate Entry no',
                    width:80,
                    name: 'gtentry',
                    
                },
                    ]
                },dtgateentry
                 
                ]
            }
            ]
        }
       
          
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 45,
            items: [
                {
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png'
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
            	    listeners:{
                    click:function() {
			
                   	if(GinFinid ==0 || GinFinid == '')
			{
				alert("MIN Fin ID Not Empty..");
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



                                               alert(minDeta.length);
                                               Ext.Ajax.request({
				               url: 'TrnWoGRNSave.php',
				               params:
						{       
						griddet: Ext.util.JSON.encode(minupData),                                      
                                		cnt:minDeta.length,
	                                     	genhcompcode : Gincompcode,
						genhfincode  : GinFinid,
						genhno       : txtreceiptno.getRawValue(),
						genhdate     : Ext.util.Format.date(dtrecpt.getValue(),"Y-m-d"),	
						genhparty    : cmbparty.getValue(),
						genhtag      : 'W',
						genhtype  :'R',
						genhdept  :cmbdept.getValue(),
						genhretype :'N',
						genhtotqty :txttotalqty.getRawValue(),
						genhtotval :txttotalfinalamt.getRawValue(),
						genhcarrier :cmbcarrier.getRawValue(),
						genhfreight :'0',
						genhdays    :'0',   //credit days
						genhremarks :'0',  // remarks
						genhrefno :cmbdnno.getRawValue(), 
						genhrefdate :Ext.util.Format.date(dtdnno.getValue(),"Y-m-d"),
						genhfrtamt :'0',
						genhvalue :txttotalvalue.getValue(),
						genhdiscount :txtdiscount.getValue(),
						genhsertaxper :'0',
						genhsertaxamt :'0',
						genheduper :'0',
						genheduamt :'0',
						genhsheper :'0',
						genhsheamt :'0',
						genhtransunitrate :'0',
						genhtransamt :'0',
						genhotheramt :txtothertotal.getValue(),
						genhlabouramt :'0',
						genhcgstper :txtcgstper.getRawValue(),
						genhcgstamt :'0',
						genhsgstper :txtsgstper.getRawValue(),
						genhsgstamt :'0',
						genhigstper :txtigstper.getRawValue(),
						genhigstamt :'0',
						genhlessamt :'0',
						genhbillno :txtbillno.getRawValue(),
						genhbilldate :Ext.util.Format.date(dtbill.getValue(),"Y-m-d"),
						genhgateeno :'0', //get
						genhgateedate :Ext.util.Format.date(dtgateentry.getValue(),"Y-m-d"),
						genhtruckno :'0',
						genhaccupd :'0',
						genhaccvouno :'0',
						genhaccvoudate :'0',
						cancelflag : '0'
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Min Saved -" + obj['minno']);
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Min  Not Saved! Pls Check!- " + obj['minno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
                    
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png'
                    
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',
                {
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
                         width        : 945,         //1340,
                         height       : 590,
                         items        : myFormPanel,
                         closable:false,
                         resizable:false,
                         draggable:false,
                         x:150,
                         y:35,
			listeners:{
		
			       		show:function()
					{
					LoadGrnNoDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadgrnno',
					    finid:GinFinid,
					    compcode:Gincompcode
						
					},
					callback:function()
					{
					var a = LoadGrnNoDatastore.getAt(0).get('grnno');
					
					txtreceiptno.setRawValue(LoadGrnNoDatastore.getAt(0).get('grnno'));
					}
				    	});

					LoadSupplierDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadsupplier'
					}
				    	});

					LoadCarrierDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadcarrier'
					}
				    	});

					LoadPaytermDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadpayterms'
					}
				    	});

					LoadDeptDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loaddept'
					}
				    	});
					
					}
				  }


  
});
  window_form.show();
  
});
