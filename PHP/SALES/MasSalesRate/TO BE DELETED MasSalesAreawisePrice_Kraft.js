Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');

   var sotype = localStorage.getItem('PRICETYPE');

   var gstFlag = "Add";
   var ratebf14,ratebf16,ratebf18,ratebf20,ratebf22,ratebf24,ratebf26,ratebf28,ratebf30,ratebf32 = 0;
   var colname;




 var custcode = 0;
 var custname = 0;


 var loadOldPriceListDatastore = new Ext.data.Store({
      id: 'loadOldPriceListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'arearate_sno', 'arearate_appr_date', 'arearate_wef', 'arearate_cust', 'arearate_vartype', 'arearate_bf14', 'arearate_bf16', 'arearate_bf18', 'arearate_bf20', 'arearate_bf22', 'arearate_bf24', 'arearate_bf26', 'arearate_bf28', 'arearate_bf30', 'arearate_bf32', 'arearate_rate',

      ]),
    });


 var loadPriceListDetailDatastore = new Ext.data.Store({
      id: 'loadPriceListDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'arearate_sno', 'arearate_appr_date', 'arearate_wef', 'arearate_cust', 'arearate_vartype', 'arearate_bf14', 'arearate_bf16', 'arearate_bf18', 'arearate_bf20', 'arearate_bf22', 'arearate_bf24', 'arearate_bf26', 'arearate_bf28', 'arearate_bf30', 'arearate_bf32', 'arearate_rate',

      ]),
    });






var lblrate = new Ext.form.Label({
    fieldLabel  : 'Extra Rs.',
    id          : 'lblrate',
    width       : 120,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
});


   var txtApprovalNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtApprovalNo',
        name        : 'txtApprovalNo',
        width       :  100,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2 /* ,
        listeners:{
                  select:function(){
                         url: MasSalesRate.php',
                         callback: function () 
		           {
                                txtApprovalNo.setValue(ItemDetailsDataStore.getAt(0).get('rateseq'));
                            }
                         };         
        }  */
    });

   var txtFullReelRate = new Ext.form.NumberField({
        fieldLabel  : 'Full Reel Rate',
        id          : 'txtFullReelRate',
        name        : 'txtFullReelRate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBitReelRate = new Ext.form.NumberField({
        fieldLabel  : 'Bit Reel Rate',
        id          : 'txtBitReelRate',
        name        : 'txtBitReelRate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });




   var txtGSMFrom1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom1',
        name        : 'txtGSMfrom1',
        value       : 110,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO  ',
        id          : 'txtGSMTo1',
        name        : 'txtGSMTo1',
        value       : 180,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });


   var txtGSMFrom1_gsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMFrom1_gsm',
        name        : 'txtGSMFrom1_gsm',
        value       : 110,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo1_gsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO  ',
        id          : 'txtGSMTo1_gsm',
        name        : 'txtGSMTo1_gsm',
        value       : 180,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMFrom2 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom2',
        name        : 'txtGSMfrom2',
        value       : 181,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo2 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo2',
        name        : 'txtGSMTo2',
        value       : 200,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate1',
        name        : 'txtIncRate1',
        value       : 500,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtGSMFrom3 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom3',
        name        : 'txtGSMfrom3',
        value       : 201,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo3 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo3',
        name        : 'txtGSMTo3',
        value       : 250,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate2',
        name        : 'txtIncRate2',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });



   var txtGSMFrom4 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom4',
        name        : 'txtGSMfrom4',
        value       : 100,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo4 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo4',
        name        : 'txtGSMTo4',
        value       : 100,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate3 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate3',
        name        : 'txtIncRate3',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtothershades= new Ext.form.NumberField({
        fieldLabel  : 'OTHER SHADES',
        id          : 'txtothershades',
        name        : 'txtothershades',
        width       :  70,
        value       : 1000,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtGSTper= new Ext.form.NumberField({
        fieldLabel  : 'GST % ',
        id          : 'txtGSTper',
        name        : 'txtGSTper',
        width       :  70,
        value       : 12,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,	

    });



    var dtpApproval = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpApproval',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });





    var dtpWEF = new Ext.form.DateField({
        fieldLabel: 'W.E.F Date',
        id: 'dtpWEF',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });



 var loadAllCustomerList = new Ext.data.Store({
      id: 'loadAllCustomerList',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
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



 var BFDataStore = new Ext.data.Store({
      id: 'BFDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBF"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'bf14', 'bf16', 'bf18', 'bf20', 'bf22', 'bf24', 'bf26', 'bf28,'
      ]),
    });



 var loadAreaListDataStore = new Ext.data.Store({
      id: 'loadAreaListDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'area_code', 'area_name'
      ]),
    });




 var loadProdType = new Ext.data.Store({
      id: 'loadProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMainVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });

 var findProdType = new Ext.data.Store({
      id: 'findProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findProductType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });



  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetailsOfVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetailsOfVariety"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });


  var loadapprovallistStore = new Ext.data.Store({
        id: 'loadapprovallistStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadAreaRateList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['arearate_sno'])
    });


  var loadeditApprovalNo = new Ext.data.Store({
        id: 'loadeditApprovalNo',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "EditAreaApprovalNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
 'arearate_appr_date','arearate_wef', 'arearate_type','arearate_area', 'arearate_vartype', 'arearate_bf14', 'arearate_bf16', 'arearate_bf18', 'arearate_bf20', 'arearate_bf22', 'arearate_bf24', 'arearate_bf26', 'arearate_bf28', 'arearate_bf30', 'arearate_bf32',  'arearate_othershades', 'arearate_rate', 'arearate_crdays', 'arearate_cashdisc_per', 'arearate_cashdisc_days', 'arearate_close','cust_ref',  'vargrp_type_name','cust_code', 'vargrp_type_short_code','arearate_gst_per','arearate1_gsmfrom', 'arearate1_gsmto', 'arearate2_gsmfrom', 'arearate2_gsmto', 'arearate2_extraamt', 'arearate3_gsmfrom', 'arearate3_gsmto', 'arearate3_extraamt', 'arearate4_gsmfrom', 'arearate4_gsmto', 'arearate4_extraamt','arearate_bitreel',
'arearate_bf14_bit', 'arearate_bf16_bit', 'arearate_bf18_bit', 'arearate_bf20_bit', 'arearate_bf22_bit', 'arearate_bf24_bit', 'arearate_bf26_bit', 'arearate_bf28_bit', 'arearate_bf30_bit', 'arearate_bf32_bit',
'arearate_payterm_30days_cdamt','arearate_payterm_60days_cdamt1','arearate_payterm_60days_cdamt2' ])
    });



var cmbApprovalNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No.',
        width           : 100,
        displayField    : 'arearate_sno', 
        valueField      : 'arearate_sno',
        hiddenName      : '',
        id              : 'cmbApprovalNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadapprovallistStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        hidden          : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
            listeners:{
                select: function () {
             		loadeditApprovalNo.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'EditAreaApprovalNo',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    apprno:cmbApprovalNo.getValue()
                                },
                       	callback:function()
				{

   
  
//alert(loadeditApprovalNo.getCount());

//alert(loadeditApprovalNo.getAt(0).get('arearate_type')); 



				  if (loadeditApprovalNo.getAt(0).get('arearate_type') == 'B')
				  { 
//				      Ext.getCmp('bfrate').setDisabled(false);
//				      Ext.getCmp('gsmrate').setDisabled(true);
//                                      Ext.getCmp('addrate').setDisabled(false);
                                  txtGSMFrom1.setValue(loadeditApprovalNo.getAt(0).get('arearate1_gsmfrom'));     
                                  txtGSMTo1.setValue(loadeditApprovalNo.getAt(0).get('arearate1_gsmto')); 
				  }
				  else
				  { 
//				      Ext.getCmp('bfrate').setDisabled(true);
//				      Ext.getCmp('gsmrate').setDisabled(false);
//                                      Ext.getCmp('addrate').setDisabled(true);
                                  txtGSMFrom1_gsm.setValue(loadeditApprovalNo.getAt(0).get('arearate1_gsmfrom'));     
                                  txtGSMTo1_gsm.setValue(loadeditApprovalNo.getAt(0).get('arearate1_gsmto')); 
                                  txtFullReelRate.setValue(loadeditApprovalNo.getAt(0).get('arearate_rate')); 
                                  txtBitReelRate.setValue(loadeditApprovalNo.getAt(0).get('arearate_bitreel')); 
				  }
     



                                  cmbArea.setValue(loadeditApprovalNo.getAt(0).get('arearate_area'));

                                  txtApprovalNo.setValue(cmbApprovalNo.getValue());
             
                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('arearate_vartype'));
                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_appr_date'),"d-m-Y"));     
                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_wef'),"d-m-Y"));              
    
                                  txtGSMFrom2.setValue(loadeditApprovalNo.getAt(0).get('arearate2_gsmfrom'));     
                                  txtGSMTo2.setValue(loadeditApprovalNo.getAt(0).get('arearate2_gsmto'));     
                                  txtGSMFrom3.setValue(loadeditApprovalNo.getAt(0).get('arearate3_gsmfrom'));     
                                  txtGSMTo3.setValue(loadeditApprovalNo.getAt(0).get('arearate3_gsmto'));     
                                  txtGSMFrom4.setValue(loadeditApprovalNo.getAt(0).get('arearate4_gsmfrom'));     
                                  txtGSMTo4.setValue(loadeditApprovalNo.getAt(0).get('arearate4_gsmto'));     
                                  txtIncRate1.setValue(loadeditApprovalNo.getAt(0).get('arearate2_extraamt'));
                                  txtIncRate2.setValue(loadeditApprovalNo.getAt(0).get('arearate3_extraamt'));

                                  txtIncRate3.setValue(loadeditApprovalNo.getAt(0).get('arearate4_extraamt'));


                                  txtothershades.setValue(loadeditApprovalNo.getAt(0).get('arearate_othershades'));
                                  txtGSTper.setValue(loadeditApprovalNo.getAt(0).get('arearate_gst_per'));

				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full',
		                   bf14         : loadeditApprovalNo.getAt(0).get('arearate_bf14'),
		                   bf16         : loadeditApprovalNo.getAt(0).get('arearate_bf16'),
		                   bf18         : loadeditApprovalNo.getAt(0).get('arearate_bf18'),
		                   bf20         : loadeditApprovalNo.getAt(0).get('arearate_bf20'),
		                   bf22         : loadeditApprovalNo.getAt(0).get('arearate_bf22'),
		                   bf24         : loadeditApprovalNo.getAt(0).get('arearate_bf24'),
		                   bf26         : loadeditApprovalNo.getAt(0).get('arearate_bf26'),
		                   bf28         : loadeditApprovalNo.getAt(0).get('arearate_bf28'),
		                   bf30         : loadeditApprovalNo.getAt(0).get('arearate_bf30'),
                                })
                                ); 
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit',
		                   bf14         : loadeditApprovalNo.getAt(0).get('arearate_bf14_bit'),
		                   bf16         : loadeditApprovalNo.getAt(0).get('arearate_bf16_bit'),
		                   bf18         : loadeditApprovalNo.getAt(0).get('arearate_bf18_bit'),
		                   bf20         : loadeditApprovalNo.getAt(0).get('arearate_bf20_bit'),
		                   bf22         : loadeditApprovalNo.getAt(0).get('arearate_bf22_bit'),
		                   bf24         : loadeditApprovalNo.getAt(0).get('arearate_bf24_bit'),
		                   bf26         : loadeditApprovalNo.getAt(0).get('arearate_bf26_bit'),
		                   bf28         : loadeditApprovalNo.getAt(0).get('arearate_bf28_bit'),
		                   bf30         : loadeditApprovalNo.getAt(0).get('arearate_bf30_bit'),
                                })
                                ); 
      				} 
                         });
			}
                      }    
});



var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'AREA ',
        width           : 250,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAreaListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {



                }
        }
});

var cmbProductType = new Ext.form.ComboBox({
        fieldLabel      : 'Product Type ',
        width           : 250,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : 'vargrp_type_code',
        id              : 'cmbProductType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdType,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
             		findProdType.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'findProductType',
                                    ptypecode:cmbProductType.getValue()
                                },
                       	callback:function()
				{
/*

                                  if (findProdType.getAt(0).get('vargrp_type_code') == 1)
                                  {
                                       Ext.getCmp('othervarty').hide();
                                       Ext.getCmp('bfrate').setDisabled(false);
                                  }
                                  else
                                  {
                                       Ext.getCmp('othervarty').show();
                                       Ext.getCmp('bfrate').setDisabled(true);
                                  }
*/

                                }
                         })
                 }
        }
 });
/*
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 100,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
   });
*/


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:100,
    height: 90,
    hidden:false,
    width:950,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Reel", dataIndex:'reel', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "14", dataIndex:'bf14', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "16", dataIndex:'bf16', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "18", dataIndex:'bf18', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "20", dataIndex:'bf20', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "22", dataIndex:'bf22', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "24", dataIndex:'bf24', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "26", dataIndex:'bf26', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "28", dataIndex:'bf28', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "30", dataIndex:'bf30', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
    ],
    store: [], //BFDataStore,

});


   var MasSalesRateDiscountPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesRateDiscountPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
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
                                    RefreshData();
				}
			    }
		   },'-',
//edit data
		   {
			    text: 'Edit',
			    style  : 'text-align:center;',
			    tooltip: 'Modify Details...',
			    height: 40,
			    fontSize:20,
			    width:50,
			    icon: '/Pictures/edit.png',
			    listeners:{
				click: function () {

//alert(Gincompcode);
//alert(GinFinid);
				    gstFlag = "Edit";
//alert(gstFlag);


                                    Ext.getCmp('cmbApprovalNo').show();

                                    loadapprovallistStore.load({
		                    url: 'ClsMasSalesRate.php',
                                    params: {
				       task: 'loadAreaRateList',
			               finid: GinFinid,
				       compcode:Gincompcode,
                                       ratetype :  sotype,   
                                    },
                                    callback: function () 
	            	           {

//                                    alert(loadapprovallistStore.getCount());


                                    }


                                    });  

				}
			    }
		   },'-',

                   {
                    text: 'Save',
                    id: 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                       listeners:{
		                click: function () {   //loop v start 
//alert(Gincompcode);
//alert(chkallsize.getValue());
//alert(Ext.getCmp("chkallsize").checked)
//save





           

		                       if(cmbArea.getRawValue()=="" )
					{
						alert("Select Area Name..");
					
					}
	
		                 	else if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
					{
						alert("Select Production Variety..");
						cmbProductType.setFocus();
					}
					else
					{            //loop w start   
						Ext.MessageBox.show({
				                title: 'Confirmation',
				                icon: Ext.Msg.QUESTION,
		        			buttons: Ext.MessageBox.YESNO,
		                    		msg: 'Do You Want to save the Record',
		                    		fn: function(btn)
						{          //loop x start   
						if (btn == 'yes')
						   {       //loop y start


            var rateData = flxDetail.getStore().getRange();                                        
            var rateupData = new Array();
            Ext.each(rateData, function (record) {
                rateupData.push(record.data);
            });


                                                        txtGSMFrom1.setValue(txtGSMFrom1_gsm.getValue());	
                                                        txtGSMTo1.setValue(txtGSMTo1_gsm.getValue());

	         //-- loop y Start     
							Ext.Ajax.request({
				                    	url: 'FrmMasSalesAreaRateKraftSave.php',
				                        params:
							{
                                                        savetype:gstFlag,

		cnt: rateData.length,
               	griddet: Ext.util.JSON.encode(rateupData),   

                                                        compcode:Gincompcode,
                                                        finid:GinFinid,   
                                                        sotype       : sotype,
                                                        areacode     : cmbArea.getValue(), 
		                                        vartypecode  : cmbProductType.getValue(), 

                                                        rate         : Number(txtFullReelRate.getValue()),
                                                        bitreelrate  : Number(txtBitReelRate.getValue()),

			                                gsmfrom1     : Number(txtGSMFrom1.getValue()),	
                                                        gsmto1       : Number(txtGSMTo1.getValue()),	
			                                gsmfrom2     : Number(txtGSMFrom2.getValue()),	
                                                        gsmto2       : Number(txtGSMTo2.getValue()),	
			                                gsmfrom3     : Number(txtGSMFrom3.getValue()),	
                                                        gsmto3       : Number(txtGSMTo3.getValue()),	
			                                gsmfrom4     : Number(txtGSMFrom4.getValue()),	
                                                        gsmto4       : Number(txtGSMTo4.getValue()),	

							rate2_examt  : Number(txtIncRate1.getValue()),		
							rate3_examt  : Number(txtIncRate2.getValue()),
						        rate4_examt  : Number(txtIncRate3.getValue()),		
                       	othershades:Number(txtothershades.getValue()),						
							GSTper       : Number(txtGSTper.getValue()),
	

                                      apprno     : txtApprovalNo.getValue(),                                        
                                      apprdate   : Ext.util.Format.date(dtpApproval.getValue(),"Y-m-d"),
	 	                      wefdate    : Ext.util.Format.date(dtpWEF.getValue(),"Y-m-d"),

							},
							callback: function (options, success, response)
		         //-- loop Z Start                       
                                                      	{     //loop z start
		                                    	var obj = Ext.decode(response.responseText);
							var obj2 = Ext.decode(response.responseText);
		                                    	if (obj['success'] === "true") 
					                   {
	          						Ext.MessageBox.alert("Alert","Saved ");
                          
		                                                MasSalesRateDiscountPanel.getForm().reset();




								RefreshData();
		                                           }
		                                     	else 
                                                           {
	                                                        if (obj['cnt']>0)
								{
		                                                  Ext.MessageBox.alert("Alert","Already exists.. ");
								}
								else
								{
		                                                  Ext.MessageBox.alert("Alert","Not Saved.. ");
								}
		                                             
		                                    	   }
		                                         }   //loop z end
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
            },
               {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                           RefreshData();
                        }
                    }
                },

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasSalesRateDiscountWindow.hide();
                        }
                } ]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 980,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 0,	
                items:[
                       
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [txtApprovalNo]

                    },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [cmbApprovalNo]

                    },	




                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 300,
                            y           : 0,
                            labelWidth  : 40,
                            border      : false,
                            items : [dtpApproval]
   
                   },

                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 550,
                            y           : 0,
                            labelWidth  : 80,
                            border      : false,
                            items : [dtpWEF]
   
                   },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 30,
                             border      : false,
                             items: [cmbArea]

                    },	


                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 420,
                           x           : 0,
                           y           : 60,
                           border      : false,
                           items: [cmbProductType]
                   },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 80,
                             width       : 420,
                             x           : 700,
                             y           : 60,
                             border      : false,      
         
                             items: [txtGSTper]
                      },


                   ]
       },



   	     { xtype   : 'fieldset',
                 title       : ' BF RATE',
                 id          : 'bfrate',
                 width       : 880,
                 height      : 145,
                 x           : 30,
                 y           : 105,
                 border      : true,
                 layout      : 'absolute',
                items:[

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 0,
                           y           : -10,
                           border      : false,
                           items: [txtGSMFrom1]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 80,
                           width       : 200,
                           x           : 200,
                           y           : -10,
                           border      : false,
                           items: [txtGSMTo1]
                   },

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 880,
                           x           : 0,
                           y           : 25,
                           border      : false,
                           items: [flxDetail]
                   },
                ] 
         },


   	     { xtype   : 'fieldset',
                 title       : 'GSM RATE',
                 id          : 'gsmrate',
                 width       : 880,
                 height      : 80,
                 x           : 30,
                 y           : 250,
                 border      : true,
                 layout      : 'absolute',
                items:[

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 0,
                           y           : -10,
                           border      : false,
                           items: [txtGSMFrom1_gsm]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 80,
                           width       : 200,
                           x           : 200,
                           y           : -10,
                           border      : false,
                           items: [txtGSMTo1_gsm]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 390,
                           y           : -10,
                           border      : false,
                           items: [txtFullReelRate]
                   },
                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 600,
                           y           : -10,
                           border      : false,
                           items: [txtBitReelRate]
                   },


                ] 
         },

	
   	     { xtype   : 'fieldset',
                title   : 'ADDITIONAL PRICE INCREASE FOR ',
                 width       : 430,
                 height      : 180,
                 x           : 30,
                 y           : 340,
                 border      : true,
                 layout      : 'absolute',
                 id          : 'addrate',
                items:[


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 320,
                             y           : -16,
                             border      : false,      
         
                             items: [lblrate]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 0,
                             border      : false,      
         
                             items: [txtGSMFrom2]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 0,
                             border      : false,      
         
                             items: [txtGSMTo2]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 300,
                             y           : 0,
                             border      : false,      
         
                             items: [txtIncRate1]
                      },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 30,
                             border      : false,      
         
                             items: [txtGSMFrom3]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 30,
                             border      : false,      
         
                             items: [txtGSMTo3]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 300,
                             y           : 30,
                             border      : false,      
         
                             items: [txtIncRate2]
                      },
	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 60,
                             border      : false,      
         
                             items: [txtGSMFrom4]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 60,
                             border      : false,      
         
                             items: [txtGSMTo4]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 300,
                             y           : 60,
                             border      : false,      
         
                             items: [txtIncRate3]
                      },

                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 300,
                             width       : 420,
                             x           : 0,
                             y           : 90,
                             border      : false,      
         
                             items: [txtothershades]
                      },


/*
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 200,
                             y           : 110,
                             border      : false,      
         
                             items: [txtCashDiscdays]
                      },
*/

                ] 
         },





       ] ,  
    });

      function RefreshData(){

    //    Ext.getCmp('bfrate').setDisabled(false);
//        Ext.getCmp('gsmrate').setDisabled(true);
        custcode = 0;
         Ext.getCmp('cmbApprovalNo').hide();
//         Ext.getCmp('othervarty').hide();


   


				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,

                                })
                                ); 


        txtIncRate1.setValue("500");
        txtIncRate2.setValue("1000");
        txtIncRate3.setValue("1000");
        txtGSMFrom1.setValue("110");
	txtGSMFrom2.setValue("181");
	txtGSMFrom3.setValue("201");
	txtGSMFrom4.setValue("100");
        txtGSMTo1.setValue("180");
	txtGSMTo2.setValue("200");
	txtGSMTo3.setValue("250");
	txtGSMTo4.setValue("100");


	loadAreaRateEntryNodatastore.removeAll();
	loadAreaRateEntryNodatastore.load({
	 url: 'ClsMasSalesRate.php',
		params: {
	    	   task: 'findAreaRateEntryNo',
		   compcode:Gincompcode,
		   finid:GinFinid   
		 },
		 callback:function()
		   {
		       txtApprovalNo.setValue(loadAreaRateEntryNodatastore.getAt(0).get('rateno'));
		   } 
         });


   };


   var loadAreaRateEntryNodatastore = new Ext.data.Store({
      id: 'loadAreaRateEntryNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findAreaRateEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rateno'
      ]),
    });
   
    var MasSalesRateDiscountWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//        x           : 50,
        y           : 35,
        title       : 'SALES - PRICE MASTER - for KRAFT /OTHERS',
        items       : MasSalesRateDiscountPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDRD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
           show:function(){
                   RefreshData();

                 }

      }
    });
    MasSalesRateDiscountWindow.show();  
});
