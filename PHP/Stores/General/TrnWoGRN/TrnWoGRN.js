Ext.onReady(function(){
Ext.QuickTips.init();

var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');

var editrow = 0;
var gridedit = "false";
var gstFlag = "Add";

var dntype ="N";
var wno = 0;

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

        fdbl_sumvalue = Number(fdbl_sumvalue) +  Number(txtFreight1.getValue())+Number(txtFreight2.getValue())-(txtscrapsales.getValue());

        if (Number(fdbl_sumvalue) < 0)
        {
            fdbl_sumvalue = 0;
         }

	txttotalfinalamt.setValue(fdbl_sumvalue);

    }
 

 var LoadGrnNoDatastore = new Ext.data.Store({
      id: 'LoadGrnNoDatastore',
      autoLoad :true,
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
	'wogh_no'
      ]),
    });


 var loadWOgrnnolistdatastore = new Ext.data.Store({
      id: 'loadWOgrnnolistdatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwogrnlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wogh_no'
      ]),
    });

      
    var LoadWoNoDatastore = new Ext.data.Store({
      id: 'LoadWoNoDatastore',
      autoLoad :true,
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
	'gent_pono','genh_dept','woh_no','woh_seqno'
      ]),
    });




 var loadWOgrndetaildatastore = new Ext.data.Store({
      id: 'loadWOgrndetaildatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWoGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwogrndetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wogh_date','wogh_dept','wogh_sup_code','wogh_billno', 'wogh_billdate', 'wogh_wono', 'wogh_wodate','wogh_wocode', 'wogh_value', 'wogh_discount', 'wogh_other_amt','wogh_less_amt', 'wogh_cgst_amt', 'wogh_sgst_amt', 'wogh_igst_amt', 'wogh_frtamt1', 'wogh_frtamt2', 'wogh_totalamount', 'wogh_price_terms', 'wogh_credit_days','wogh_pay_terms', 'wogh_carrier', 'wogh_remarks', 'wogh_dnno', 'wogh_dndate', 'wogh_frt1party', 'wogh_frt2party', 'woh_truck','wogh_gate_eno', 'wogh_gate_edate','wogh_accupd','wogh_acc_vouno','wogh_acc_voudate','wogt_slno', 'wogt_itemcode', 'wogt_unit', 'wogt_rate', 'wogt_qty', 'wogt_value', 'wogt_dis_per',
'wogt_dis_amt', 'wogt_other_amt', 'wogt_cgst_per', 'wogt_cgst_amt', 'wogt_sgst_per', 'wogt_sgst_amt', 'wogt_igst_per', 'wogt_igst_amt', 'wogt_amount', 
'wogt_hsncode', 'item_code', 'item_name', 'item_desc', 'item_uom','item_hsncode','wo_no','wo_name','wo_purpose','wogh_frtamt1','wogh_frt1party','wogh_frtamt2','wogh_frt1party'
      ]),
    });

 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      autoLoad :true,
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
      autoLoad :true,
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
      autoLoad :true,
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
	 'item_name','wot_itemcode','woh_date','wo_name','wo_no','dept_name','dept_code','woh_frt_party1','woh_frt_party2','woh_frt_amt1','woh_frt_amt2',
         'woh_price_terms','woh_pay_terms','woh_credit_days'
      ]),
    }); 
    

 var LoadItemDetailDatastore = new Ext.data.Store({
      id: 'LoadItemDetailDatastore',
      autoLoad :true,
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
        selectOnFocus: true,
        fieldLabel:'Payment Terms',
        editable:true,
        emptyText:'Select Payment Terms',
        blankText:'Select Payment Terms',
        width: 250,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : ''    
        
    });

var store3 = new Ext.data.Store({
      
    });
    
   
 var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      autoLoad :true,
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
	'dept_code', 'dept_name'
      ]),
    }); 

var cmbdept= new Ext.form.ComboBox({
        id: 'cmbdept',
        store: LoadDeptDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Dept',
        editable:true,
        width: 250,
        displayField: 'dept_name',
        valueField: 'dept_code',
        hiddenName : 'dept_code',       
      });

 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      autoLoad :true,
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
      autoLoad :true,
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
        fieldLabel:'Del.Note',
        editable:true,
        width: 70,
        displayField: 'genh_no',
        valueField: 'genh_no',
        hiddenName : 'genh_no',
    	listeners:{
        select:function(){

                        txtwoqty.setValue('');
                        txtgrnqty.setValue('');   

//                        if (dntype == "Y") {

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




    var LoadWorkorderItemDetailDatastore = new Ext.data.Store({
      id: 'LoadWorkorderItemDetailDatastore',
      autoLoad :true,
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
					LoadSupplierDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadsupplier'
					}
				    	});
			LoadItemDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loaditem",
                                compcode:Gincompcode,
				finid:GinFinid,
//				dcno:cmbdnno.getRawValue(),
				wono:cmbwono.getRawValue()
                            },
                       callback:function()
                            {     
                                   dtwono.setRawValue(Ext.util.Format.date(LoadItemDatastore.getAt(0).get('woh_date'),"d-m-Y"));
                                   txtwoname.setValue(LoadItemDatastore.getAt(0).get('wo_name'));
                                   txtwocode.setValue(LoadItemDatastore.getAt(0).get('wo_no'));
//alert(LoadItemDatastore.getAt(0).get('woh_price_terms'));
  
                                   cmbdept.setValue(LoadItemDatastore.getAt(0).get('dept_code'));

	                           cmbfrtparty1.setValue(LoadItemDatastore.getAt(0).get('woh_frt_party1')); 
	                           cmbfrtparty2.setValue(LoadItemDatastore.getAt(0).get('woh_frt_party2')); 
		                   txtFreight1.setValue(LoadItemDatastore.getAt(0).get('woh_frt_amt1')); 
		                   txtFreight2.setValue(LoadItemDatastore.getAt(0).get('woh_frt_amt2')); 

                                   txtpriceterms.setValue(LoadItemDatastore.getAt(0).get('woh_price_terms'));
                                   cmbpayterm.setValue(LoadItemDatastore.getAt(0).get('woh_pay_terms'));
                                   txtcrdays.setValue(LoadItemDatastore.getAt(0).get('woh_credit_days'));


                            }
                        });         
        }
    }
});
      

var optdnyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Receipt Based on the Delivery Note ',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    height: 60,
    width: 300,
    x: 50,  
    y: 0,
 
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optdnyn',
        items: [
            {boxLabel: 'Yes' , name: 'optdnyn', id:'optdcyes', inputValue: 1,width:50,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			dntype = 'Y';
                        Ext.getCmp('cmbdnno').show();
                        Ext.getCmp('dtdnno').show();         
                   }
                 }
               }
            },
            {boxLabel: 'No', name: 'optdnyn', id:'optdcno', inputValue: 2,checked:true,width:50,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
			dntype = 'N';
                        Ext.getCmp('cmbdnno').hide();
                        Ext.getCmp('dtdnno').hide();
                   }
                 }
               }
            },

        ]
    },
    ]
});
      
       var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: LoadItemDatastore,
   	displayField: 'item_name',
        valueField: 'wot_itemcode',
        hiddenName : 'item_name'     ,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item',
        editable:false,
        labelWidth:30,
        width: 230,
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

               if (dntype == "Y")
               {
                	LoadDcNoDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loaddcno",
                                compcode:Gincompcode,
				finid:GinFinid,
				supcode:cmbparty.getValue(),
//                                dnote : dntype
                            }
                        });         
               }
  
                        LoadWoNoDatastore.removeAll();
			LoadWoNoDatastore.load({
                        url: 'ClsWoGrn.php',
                        params:
                            {
                                task:"loadwono",
                                compcode:Gincompcode,
				finid:GinFinid,
                                supcode:cmbparty.getValue(),
				dcno:0
                            },
				callback:function(){
				var a = LoadWoNoDatastore.getCount();
                                cmbdept.setValue(LoadWoNoDatastore.getAt(0).get('genh_dept')); 
				
        	        	}
                        });  



          }
  
    }
});

var cmbfrtparty1 = new Ext.form.ComboBox({
        fieldLabel      : 'Frt Party 1',
        width           : 280,
	displayField    : 'sup_refname',
	valueField      : 'sup_code',
        hiddenName      : 'sup_code',
        id              : 'cmbfrtparty1',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSupplierDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,

   
      });

var cmbfrtparty2 = new Ext.form.ComboBox({
        id: 'cmbfrtparty2',
        store: LoadSupplierDatastore,
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


var cmbreceiptno = new Ext.form.ComboBox({
        id: 'cmbreceiptno',
        store: loadWOgrnnolistdatastore,
        displayField: 'wogh_no',
        valueField: 'wogh_no',
        hiddenName : '',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        emptyText:'Receipt Number',
        blankText:'Receipt Number',
        fieldLabel:'Receipt Number',
        width: 80,
    	listeners:{
        select:function(){
         
		flxDetail.getStore().removeAll();
		loadWOgrndetaildatastore.removeAll();
		loadWOgrndetaildatastore.load({
		                url: 'ClsWoGrn.php',
		                params: {
		                    task: 'loadwogrndetail',
					finid:GinFinid,
					compcode:Gincompcode,
                                	wogrnno:cmbreceiptno.getValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadWOgrndetaildatastore.getCount();

                                   if(cnt>0)
                  		    {  

                                       txtreceiptno.setValue(cmbreceiptno.getValue());
                                       dtrecpt.setRawValue(Ext.util.Format.date(loadWOgrndetaildatastore.getAt(0).get('wogh_date'),"d-m-Y"));
				       cmbparty.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_sup_code'));
                                       txtbillno.setRawValue(loadWOgrndetaildatastore.getAt(0).get('wogh_billno')); 
                                       dtbill.setRawValue(Ext.util.Format.date(loadWOgrndetaildatastore.getAt(0).get('wogh_billdate'),"d-m-Y"));
                                       cmbdnno.setRawValue(loadWOgrndetaildatastore.getAt(0).get('wogh_dnno'));
                                       dtdnno.setRawValue(Ext.util.Format.date(loadWOgrndetaildatastore.getAt(0).get('wogh_dndate'),"d-m-Y"));
                                       cmbwono.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_wono'));
                                       wno =loadWOgrndetaildatastore.getAt(0).get('wogh_wono');

	                               cmbfrtparty1.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_frt1party')); 
                                       cmbfrtparty2.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_frt2party')); 

                        		LoadItemDatastore.load({
                                        url: 'ClsWoGrn.php',
                                        params:
                                        { 
                                            task:"loaditem",
                                            compcode:Gincompcode,
                                            finid:GinFinid,
                                            wono: wno 
                                        },
                                       callback:function()
                                        {   
//                                           alert(LoadItemDatastore.getCount());
                                        }
          
                                       }); 

                                       cmbdept.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_dept')); 
                                       dtwono.setRawValue(Ext.util.Format.date(loadWOgrndetaildatastore.getAt(0).get('wogh_wodate'),"d-m-Y"));
                                       txtwoname.setValue(loadWOgrndetaildatastore.getAt(0).get('wo_name'));
                                       txtwocode.setValue(loadWOgrndetaildatastore.getAt(0).get('wo_no'));
                                       cmbcarrier.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_carrier'));
                                       txtpriceterms.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_price_terms'));
                                       cmbpayterm.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_pay_terms'));
                                       txtcrdays.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_credit_days'));
                                       txtremarks.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_remarks'));
				       txttruckno.setValue(loadWOgrndetaildatastore.getAt(0).get('woh_truck'));
                                       txtgateeno.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_gate_eno'));
                                       dtgateentry.setRawValue(Ext.util.Format.date(loadWOgrndetaildatastore.getAt(0).get('wogh_gate_edate'),"d-m-Y"));

                                       txttotalvalue.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_value'));
                                       txtdiscount.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_discount'));
                                       txtothertotal.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_other_amt'));
				       txtscrapsales.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_less_amt'));
				       txtcgsttotal.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_cgst_amt')); 
                                       txtsgsttotal.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_sgst_amt'));
                                       txtigsttotal.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_igst_amt'));
                                       txtFreight1.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_frtamt1'));
                                       txtFreight2.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_frtamt2'));
                                       txttotalfinalamt.setValue(loadWOgrndetaildatastore.getAt(0).get('wogh_totalamount'));
                                       for(var j=0; j<cnt; j++)
				           { 
		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                      sno      :  RowCnt,
                                                      itemname :  loadWOgrndetaildatastore.getAt(j).get('item_name'), 
                                                      itemcode :  loadWOgrndetaildatastore.getAt(j).get('item_code'),            
                                                      unit     :  loadWOgrndetaildatastore.getAt(j).get('wogt_unit'),
                                                      qty      :  loadWOgrndetaildatastore.getAt(j).get('wogt_qty'), 
                                                      rate     :  loadWOgrndetaildatastore.getAt(j).get('wogt_rate'), 
		                                      val1     :  loadWOgrndetaildatastore.getAt(j).get('wogt_value'),
                                                      dis      :  loadWOgrndetaildatastore.getAt(j).get('wogt_dis_per'),
                                                      disval   :  loadWOgrndetaildatastore.getAt(j).get('wogt_dis_amt'),
                                                      cgst     :  loadWOgrndetaildatastore.getAt(j).get('wogt_cgst_per'),
                                                      cgstval  :  loadWOgrndetaildatastore.getAt(j).get('wogt_cgst_amt'),
                                                      sgst     :  loadWOgrndetaildatastore.getAt(j).get('wogt_sgst_per'),
                                                      sgstval  :  loadWOgrndetaildatastore.getAt(j).get('wogt_sgst_amt'),
                                                      igst     :  loadWOgrndetaildatastore.getAt(j).get('wogt_igst_per'),
                                                      igstval  :  loadWOgrndetaildatastore.getAt(j).get('wogt_igst_amt'),
                                                      otherval :  loadWOgrndetaildatastore.getAt(j).get('wogt_other_amt'), 
                                                      itemvalue:  loadWOgrndetaildatastore.getAt(j).get('wogt_amount'), 
                                                      hsn      :  loadWOgrndetaildatastore.getAt(j).get('wogt_hsncode'),
                                                      woqty    :  loadWOgrndetaildatastore.getAt(j).get('wogt_qty'),
		                                  })
		                               );
grid_tot() 
                                           }
                                    }

                                }, // callback end

	


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
       name        : 'dndate',
       id          : 'dtdnno',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
    var dtwono = new Ext.form.DateField
    ({
       fieldLabel : 'WO Dt',
       name        : 'dcdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
 

   var dtgateentry = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtgateentry',
       id          : 'dtgateentry',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 100,
       editable    : true,
       value: new Date().format('d-m-Y')
        
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

   var txtwoname= new Ext.form.TextField({
        fieldLabel  : 'WO NAME',
        id          : 'txtwoname',
        width       : 300,
        name        : 'txtwoname',
        readOnly    : true
   });

   var txtwocode= new Ext.form.TextField({
        fieldLabel  : 'WO CODE',
        id          : 'txtwocode',
        width       : 70,
        name        : 'txtwocode',
        readOnly    : true
   });

   var txtpriceterms = new Ext.form.TextField({
        fieldLabel  : 'Price Terms',
        id          : 'txtpriceterms',
        width       : 250,
        name        : 'txtpriceterms'
   });


   var txtcrdays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtcrdays',
        width       : 70,
        name        : 'txtcrdays'
   });

   var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        width       : 300,
        name        : 'txtremarks'
   });

   var txtgateeno = new Ext.form.NumberField({
        fieldLabel  : 'Gate Ent.No',
        id          : 'txtgateeno',
        width       : 70,
        name        : 'txtgateeno'
   });

   var txttruckno = new Ext.form.TextField({
        fieldLabel  : 'Vechile No',
        id          : 'txttruckno',
        width       : 120,
        name        : 'txttruckno'
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

var txtscrapsales = new Ext.form.NumberField({
                fieldLabel  : 'Scrap Exchange',width: 100,name: 'txtscrapsales',emptyText: 'Discount/Scrap',style:'text-align:right',x: 520,y: 110, enableKeyEvents: true,
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
	x:10,
	y:20,
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
      cmbparty, txtbillno, cmbdnno,cmbdept,txtwoname,txtwocode,dtwono
        ]
    }


var fieldsetContainer = {
        xtype         : 'container',
        layout        : 'hbox',
        height        : 165,
	x:10,
	y:60,
        items : [
        fieldset1,
//        fieldset3
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
    
 var cmbunit = new Ext.form.ComboBox({
        id: 'cmbunit',
        store: ['NOS','HRS','MTRS','FEET','SQ.FT','DAY'],
        displayField: 'mih_inwno',
        valueField: 'mih_seqno',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Unit',
        editable:true,
        width: 70
         
      });

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

//alert(gridedit)
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
        	          	sel[idx].set('itemname'  , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'  , cmbitem.getValue());
        	          	sel[idx].set('unit'      , cmbunit.getRawValue());
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
                                       itemname : cmbitem.getRawValue(), 
                                       itemcode : cmbitem.getValue(),            
                                       unit     : cmbunit.getValue(),
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
                                       hsn      : txthsncode.getRawValue(),
                                       woqty    : txtwoqty.getRawValue(),
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
        {dataIndex:'itemname',header: "Item Description",width: 100,align: 'center',sortable: true},
        {dataIndex:'itemcode',header: "Item Code",width: 60,align: 'center',sortable: true},
        {dataIndex:'unit',header: "unit",width: 60,align: 'center',sortable: true},
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
        height:100,
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

                    	cmbitem.setRawValue(selrow.get('itemname'));	
                      	cmbitem.setValue(selrow.get('itemcode'));
                        cmbunit.setRawValue(selrow.get('unit'));	
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


function RefreshData(){
//refresh
        myFormPanel.getForm().reset();
        flxDetail.getStore().removeAll();
/*alert("1");
alert(GinFinid);
alert(Gincompcode);
*/
                Ext.getCmp('cmbdnno').hide();
                Ext.getCmp('dtdnno').hide();


                Ext.getCmp('cmbreceiptno').hide();
		LoadGrnNoDatastore.load({
					url: 'ClsWoGrn.php',
					params: {
					    task: 'loadgrnno',
					    finid:GinFinid,
					    compcode:Gincompcode
						
					},
					callback:function()
					{
					var a = LoadGrnNoDatastore.getAt(0).get('wogh_no');
//alert(a);
					txtreceiptno.setRawValue(LoadGrnNoDatastore.getAt(0).get('wogh_no'));
					}
				    	});
}

var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Work Order GRN Entry',
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
         optdnyn,
//cmbparty, txtbillno, cmbdnno,cmbdept,txtwoname,txtwocode,dtwono
           
//        fieldsetContainer,
         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:80,
                    width: 500,
                    x: 0,
                    y: 60,
                    items: [txtreceiptno]
           },
         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:80,
                    width: 500,
                    x: 0,
                    y: 60,
                    items: [cmbreceiptno]
           },
        {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:80,
                    width: 500,
                    x: 0,
                    y: 100,
                    items: [dtrecpt]
           },

/*     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    width: 300,
                    labelwidth :1,
                    x: 200,  
                    y: 80,
                    items: [dtgateentry]
                }, */
         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:100,
                    width: 500,
                    x: 200,
                    y: 65,
                    items: [cmbparty]
           },

       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 40,
                    labelWidth:60,
                    width: 500,
                    x: 620,
                    y: 65,
                    items: [cmbdnno]
           },
       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 40,
                    labelWidth:30,
                    width: 500,
                    x: 755,
                    y: 65,
                    items: [dtdnno]
           },

         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:100,
                    width: 500,
                    x: 200,
                    y: 95,
                    items: [cmbwono]
           },
         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    labelWidth:35,
                    width: 450,
                    x: 580,
                    y: 105,
                    items: [cmbdept]
           },
         {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:60,
                    width: 200,
                    x: 400,
                    y: 95,
                    items: [dtwono]
           },

       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:100,
                    width: 500,
                    x: 200,
                    y: 125,
                    items: [txtbillno]
           },

        {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:60,
                    width: 200,
                    x: 400,
                    y: 125,
                    items: [dtbill]
                },


       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:100,
                    width: 500,
                    x: 200,
                    y: 155,
                    items: [txtwoname]
           },

        {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 68,
                    labelWidth:60,
                    width: 200,
                    x: 630,
                    y: 155,
                    items: [txtwocode]
                },
                
            {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 280,
            width: 900,
            x: 10,
            y: 200,
            items: [
            {
                xtype: 'panel',
                title: 'WO & QTY Detail',
                width: 200,
                height: 200,
                layout: 'absolute',
                items: [

/*
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

*/
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:30,
                    width: 300,
                    x: 10,
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
                    labelWidth:30,
                    width: 320,
                    x: 300,
                    y: 5,
                    items: [cmbunit]
                },


                  {

                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:50,
                    width: 145,
                    x: 440,
                    y: 5,
                    items: [txtwoqty]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:25,
                    width: 125,
                    x: 700,
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
                    x: 560,
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
                                  items: [txtFreight1,cmbfrtparty1, txtFreight2,cmbfrtparty2,txtscrapsales,txttotalfinalamt]
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
                   // height: 250,
                    width: 500,
                    x: 0,  
                    y: 5,
                    items: [cmbcarrier]
                },  
            {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                   // height: 250,
                    width: 300,
                    x: 380,  
                    y: 5,
                    items: [txttruckno]
                },  
               {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                   // height: 250,
                    width: 500,
                    x: 0,  
                    y: 35,
                    items: [txtpriceterms]
                },  

               {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                   // height: 250,
                    width: 500,
                    x: 0,  
                    y: 65,
                    items: [cmbpayterm]
                },  

          {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    //height: 250,
                    width: 500,
                    x: 0,  
                    y: 95,
                    items: [txtcrdays]
                }, 

          {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    //height: 250,
                    width: 500,
                    x: 0,  
                    y: 125,
                    items: [txtremarks]
                }, 

          {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    width: 200,
                    x: 0,  
                    y: 165,
                    items: [txtgateeno]
                }, 

          {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    width: 300,
                    labelwidth :1,
                    x: 280,  
                    y: 165,
                    items: [dtgateentry]
                }, 


                 
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
//EDIT
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
                       click: function () {
                           gstFlag = "Edit";

                           Ext.getCmp('cmbreceiptno').show();
                           txtreceiptno.setValue();   
                           viewopt = 1;
                           loadWOgrnnolistdatastore.removeAll();
                           loadWOgrnnolistdatastore.load({
      		              url: 'ClsWoGrn',
                              params: {
			          task: 'loadwogrnlist',
			          finid: GinFinid,
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(loadWOgrnnolistdatastore.getCount());	
                              }
                           });
                           }
                    }
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
            	    listeners:{
                    click:function() {
/*alert(gstFlag);
alert(cmbpayterm.getValue());

alert(txtreceiptno.getRawValue());
alert(Ext.util.Format.date(dtrecpt.getValue(),"Y-m-d"));
alert(cmbdept.getValue());	
alert(cmbparty.getValue());
alert(txtbillno.getRawValue());
alert(Ext.util.Format.date(dtbill.getValue(),"Y-m-d"));
alert(cmbwono.getRawValue());
alert(Ext.util.Format.date(dtwono.getValue(),"Y-m-d"));
alert(txtwocode.getValue());
alert(txttotalvalue.getValue());
(txtdiscount.getValue());
alert(txtothertotal.getValue());
alert(txtscrapsales.getValue());
alert(txtcgsttotal.getValue()); 
alert(txtsgsttotal.getValue());
alert(txtigsttotal.getValue());
alert(txtFreight1.getValue());
alert(txtFreight2.getValue());

alert(txttotalfinalamt.getRawValue());
alert(txtpriceterms.getRawValue());
alert(txtcrdays.getValue());
alert(cmbpayterm.getValue());
alert(cmbcarrier.getValue());
alert(txtremarks.getRawValue());
alert(cmbdnno.getRawValue());
alert(Ext.util.Format.date(dtdnno.getValue(),"Y-m-d"));
alert(txttruckno.getRawValue());
alert(txtgateeno.getValue());
alert(Ext.util.Format.date(dtgateentry.getValue(),"Y-m-d"));
*/
			
                        if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('GRN','Grid should not be empty..');
        	                gstSave="false";
	                    }
                    	
                        else if (cmbparty.getRawValue()==0 || cmbparty.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Select Party Name....');
                                 gstSave="false";
                            }
                        else if (cmbdept.getRawValue()==0 || cmbdept.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Select Department.....');
                                 gstSave="false";
                            }
                    	
                        else if (cmbcarrier.getRawValue()==0 || cmbcarrier.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Select Carrier Name....');
                                 gstSave="false";
                            }

                        else if (txtpriceterms.getRawValue()==0 || txtpriceterms.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Select Payment Terms....');
                                 gstSave="false";
                            }
                       else if (cmbpayterm.getRawValue()==0 || cmbpayterm.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Select Payment Terms....');
                                 gstSave="false";
                           }
                      else if (txtremarks.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Enter Remarks....');
                                 gstSave="false";
                            }
                      else if (txtgateeno.getRawValue()=="")
                            {
                                 Ext.Msg.alert('GRN','Enter Gate Entry Number....');
                                 gstSave="false";
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



                                               alert(txtreceiptno.getRawValue());

                                               Ext.Ajax.request({
				               url: 'TrnWoGRNSave.php',
				               params:
						{       
						griddet: Ext.util.JSON.encode(minupData),                                      
                                		cnt:minDeta.length,

                                         	woghcompcode : Gincompcode,
                                                savetype     : gstFlag,
						woghfincode  : GinFinid,
						woghno       : txtreceiptno.getRawValue(),
						woghdate     : Ext.util.Format.date(dtrecpt.getValue(),"Y-m-d"),
                                          	woghdept     : cmbdept.getValue(),	
						woghsupcode  : cmbparty.getValue(),
                       				woghbillno   : txtbillno.getRawValue(),
						woghbilldate : Ext.util.Format.date(dtbill.getValue(),"Y-m-d"),
						woghwono       : cmbwono.getRawValue(),
						woghwodate     : Ext.util.Format.date(dtwono.getValue(),"Y-m-d"),
                                                woghwocode   : txtwocode.getValue(),
                                                woghvalue    : txttotalvalue.getValue(),
                                                woghdiscount : txtdiscount.getValue(),
						woghotheramt : txtothertotal.getValue(),
                                                woghlessamt  : txtscrapsales.getValue(),
 						woghcgstamt  : txtcgsttotal.getValue(), 
						woghsgstamt  : txtsgsttotal.getValue(),
						woghigstamt  : txtigsttotal.getValue(),
						woghfrtamt1    : txtFreight1.getValue(),
						woghfrtamt2    : txtFreight2.getValue(),
						woghtotalamount : txttotalfinalamt.getRawValue(),
						woghpriceterms :txtpriceterms.getRawValue(),

						woghcreditdays : txtcrdays.getValue(),
						woghpayterms   : cmbpayterm.getValue(),
                                         	woghcarrier    : cmbcarrier.getValue(),
					
						woghremarks    : txtremarks.getRawValue(),
						woghdnno       : cmbdnno.getRawValue(),
						woghdndate     : Ext.util.Format.date(dtdnno.getValue(),"Y-m-d"),
						woghfrt1party  : cmbfrtparty1.getValue(),
						woghfrt2party  : cmbfrtparty2.getValue(),
						woghtruck      : txttruckno.getRawValue(),
						woghgateeno    : txtgateeno.getValue(),
						woghgateedate  : Ext.util.Format.date(dtgateentry.getValue(),"Y-m-d"),
						woghaccupd     :'N',
						woghaccvouno   :'0',
						woghaccvoudate :'0',
						cancelflag : '0'

                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Work GRN Saved -" + obj['wogrn']);
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Work Grn  Not Saved! Pls Check!- " + obj['wogrn']);                                                  
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
                    icon: '../icons/refresh.png',
                    listeners:{
                      click: function () {
                            RefreshData();
                       }
                    }
                    
                },'-',
/*                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',*/
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
			
                                        RefreshData();
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

//dtgateentry.setValue(Ext.util.Format.date(new Date(),"d-m-Y"));
					
					}
				  }


  
});
  window_form.show();
  
});
