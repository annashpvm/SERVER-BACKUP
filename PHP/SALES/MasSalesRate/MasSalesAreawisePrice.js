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



   var gridedit = "false";
 var custcode = 0;
 var custname = 0;
   var editrow = 0;
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
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             add_btn_click();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  MasSalesRateMasterWindow.hide();

            }
        }]);



   var txtPriceTerms = new Ext.form.NumberField({
        fieldLabel  : 'Price for the Payment Terms',
        id          : 'txtPriceTerms',
        name        : 'txtPriceTerms',
        width       :  50,
        Value       : 30, 
        labelStyle : "font-size:14px;font-weight:bold;color:#0080gg",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2,
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                        cmbProductType.focus();
		     }
		  }  
        }  
    });

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






var lblPrice = new Ext.form.Label({
    fieldLabel  : 'PAYMENT TERMS : 30 DAYS ONLY',
    id          : 'lblPrice',
    width       : 600,
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

});

var lblrate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblrate',
    width       : 120,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
});

   var txtPayTerms45Days = new Ext.form.NumberField({
        fieldLabel  : 'EXTRA If 45 Days ',
        id          : 'txtPayTerms45Days',
        name        : 'txtPayTerms45Days',
        value       : 500,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    })

   var txtPayTerms60Days = new Ext.form.NumberField({
        fieldLabel  : '60 Days ',
        id          : 'txtPayTerms60Days',
        name        : 'txtPayTerms60Days',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    })

   var txtPayTerms75Days = new Ext.form.NumberField({
        fieldLabel  : 'EXTRA If 75 Days ',
        id          : 'txtPayTerms75Days',
        name        : 'txtPayTerms75Days',
        value       : 1500,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    })

   var txtPayTerms90Days = new Ext.form.NumberField({
        fieldLabel  : '90 Days ',
        id          : 'txtPayTerms90Days',
        name        : 'txtPayTerms90Days',
        value       : 2000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    })

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



   var txtSheetRate= new Ext.form.NumberField({
        fieldLabel  : 'Sheet Rate',
        id          : 'txtSheetRate',
        name        : 'txtSheetRate',
        width       :  70,
        value       : 500,
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

  function datecheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_Approval = dtpApproval.getValue();
        var diffdays = (dt_today.getTime()-dt_Approval.getTime());
//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >2)
        {     
             alert("You are Not Allowed to Raise the Price in the date of " +  Ext.util.Format.date(dt_Approval,"d-m-Y"));
             dtpApproval.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             dtpApproval.focus();

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the Price in future date");
             dtpApproval.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }


 }


    var dtpApproval = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpApproval',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
       	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          datecheck();
		     }
		  },
 
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }
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
            'rate_areacode', 'rate_areaname'
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
    'arearate_comp_code','arearate_fincode','arearate_sno','arearate_appr_date','arearate_wef','arearate_area', 'arearate_vartype','arearate_gst_per','arearate_gsmfrom','arearate_gsmto','arearate_gsm_fr_rate','arearate_gsm_br_rate',
'arearate_bf14','arearate_bf16','arearate_bf18','arearate_bf20','arearate_bf22','arearate_bf24','arearate_bf26',
'arearate_bf28','arearate_bf30','arearate_bf32','arearate_bf14_bit','arearate_bf16_bit','arearate_bf18_bit',
'arearate_bf20_bit','arearate_bf22_bit','arearate_bf24_bit','arearate_bf26_bit','arearate_bf28_bit','arearate_bf30_bit',
'arearate_bf32_bit','arearate_gsmfrom2','arearate_gsmto2','arearate_extraamt2','arearate_gsmfrom3','arearate_gsmto3',
'arearate_extraamt3','arearate_gsmfrom4','arearate_gsmto4','arearate_extraamt4','arearate_othershades','arearate_sheet_extraamt','area_bf18gsm120',
'area_bf18gsm100','area_bf18gsm90','area_bf18gsm80','area_bf18gsm70','area_bf18gsm60','area_bf18gsm50','area_bf20gsm120',
'area_bf20gsm100','area_bf20gsm90','area_bf20gsm80','area_bf20gsm70','area_bf20gsm60','area_bf20gsm50','area_bf22gsm120',
'area_bf22gsm100','area_bf22gsm90','area_bf22gsm80','area_bf22gsm70','area_bf22gsm60','area_bf22gsm50','area_bf24gsm120',
'area_bf24gsm100','area_bf24gsm90','area_bf24gsm80','area_bf24gsm70','area_bf24gsm60','area_bf24gsm50','area_bf26gsm120',
'area_bf26gsm100','area_bf26gsm90','area_bf26gsm80','area_bf26gsm70','area_bf26gsm60','area_bf26gsm50','area_bf28gsm120',
'area_bf28gsm100','area_bf28gsm90','area_bf28gsm80','area_bf28gsm70','area_bf28gsm60','area_bf28gsm50','area_bf30gsm120',
'area_bf30gsm100','area_bf30gsm90','area_bf30gsm80','area_bf30gsm70','area_bf30gsm60','area_bf30gsm50','area_bf32gsm120',
'area_bf32gsm100','area_bf32gsm90','area_bf32gsm80','area_bf32gsm70','area_bf32gsm60','area_bf32gsm50','area_bf34gsm120',
'area_bf34gsm100','area_bf34gsm90','area_bf34gsm80','area_bf34gsm70','area_bf34gsm60','area_bf34gsm50','arearate_approved',
'arearate_close','area_code','area_name','vargrp_type_code','vargrp_type_name','vargrp_type_short_code','vargrp_type_hsncode',
'tn_sales_ledcode','os_sales_ledcode','sez_sales_ledcode','arearate_shade','arearate_price_terms' ])
    });

var cmbProductType = new Ext.form.ComboBox({
        fieldLabel      : 'Product Type ',
        width           : 200,
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


                        if (cmbProductType.getValue() == 1)
                           cmbShade.show();
                        else
                           cmbShade.hide();


                        if (cmbProductType.getValue() == 14)
                            tabRate.setActiveTab(1);
                        else    
                             tabRate.setActiveTab(0);
       

             		findProdType.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'findProductType',
                                    ptypecode:cmbProductType.getValue()
                                },
                       	callback:function()
				{


                                }
                         })
                 }
        }
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

 				  flxRateDetail.getStore().removeAll();
   
                                  var cnt = loadeditApprovalNo.getCount();
  
                                  if (cnt > 0)


                                  {                              
                                  txtGSMFrom1.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmfrom'));     
                                  txtGSMTo1.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmto')); 

                                  Ext.getCmp('save').setDisabled(false);
                                  if (loadeditApprovalNo.getAt(0).get('arearate_approved') == "Y")
                                  {
                                      alert("Price Approved. You Can't Modify...");
                                      Ext.getCmp('save').setDisabled(true);
                                  }    

                                  cmbArea.setValue(loadeditApprovalNo.getAt(0).get('arearate_area'));

                                  txtApprovalNo.setValue(cmbApprovalNo.getValue());
                                  txtPriceTerms.setValue(loadeditApprovalNo.getAt(0).get('arearate_price_terms'));             
                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('arearate_vartype'));
                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_appr_date'),"d-m-Y"));     
                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_wef'),"d-m-Y"));              
    
                                  txtGSMFrom2.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmfrom2'));     
                                  txtGSMTo2.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmto2'));     
                                  txtGSMFrom3.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmfrom3'));     
                                  txtGSMTo3.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmto3'));     
                                  txtGSMFrom4.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmfrom4'));     
                                  txtGSMTo4.setValue(loadeditApprovalNo.getAt(0).get('arearate_gsmto4'));     
                                  txtIncRate1.setValue(loadeditApprovalNo.getAt(0).get('arearate_extraamt2'));
                                  txtIncRate2.setValue(loadeditApprovalNo.getAt(0).get('arearate_extraamt3'));

                                  txtIncRate3.setValue(loadeditApprovalNo.getAt(0).get('arearate_extraamt4'));
                                  txtothershades.setValue(loadeditApprovalNo.getAt(0).get('arearate_othershades'));
                                  txtSheetRate.setValue(loadeditApprovalNo.getAt(0).get('arearate_sheet_extraamt'));

                                  txtGSTper.setValue(loadeditApprovalNo.getAt(0).get('arearate_gst_per'));
                                  for(var j=0; j<cnt; j++)
                                  { 
                                  flxRateDetail.getSelectionModel().selectAll();
                                  var selrows = flxRateDetail.getSelectionModel().getCount();
                                  var sel = flxRateDetail.getSelectionModel().getSelections();
  
		                  var RowCnt = flxRateDetail.getStore().getCount() + 1;
		                  flxRateDetail.getStore().insert(
		                  flxRateDetail.getStore().getCount(),
		                  new dgrecord({
	  
				           product   : loadeditApprovalNo.getAt(j).get('vargrp_type_name'),
					   prodcode  : loadeditApprovalNo.getAt(j).get('arearate_vartype'),
					   shade  : loadeditApprovalNo.getAt(j).get('arearate_shade'),
					   gsmfrom   : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmfrom')), 
					   gsmto     : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmto')), 
					   gsmfrrate : Number(loadeditApprovalNo.getAt(j).get('arearate_gsm_fr_rate')), 
					   gsmbrrate : Number(loadeditApprovalNo.getAt(j).get('arearate_gsm_br_rate')), 
					   fr14bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf14')), 
					   fr16bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf16')), 
					   fr18bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf18')), 
					   fr20bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf20')), 
					   fr22bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf22')), 
					   fr24bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf24')), 
					   fr26bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf26')), 
					   fr28bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf28')), 
					   fr30bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf30')), 
					   br14bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf14_bit')), 
					   br16bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf16_bit')), 
					   br18bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf18_bit')), 
					   br20bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf20_bit')), 
					   br22bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf22_bit')), 
					   br24bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf24_bit')), 
					   br26bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf26_bit')), 
					   br28bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf28_bit')), 
					   br30bf    : Number(loadeditApprovalNo.getAt(j).get('arearate_bf30_bit')), 

					   ar1gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmfrom2')), 
					   ar1gsmto    : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmto2')), 
					   ar1rate     : Number(loadeditApprovalNo.getAt(j).get('arearate_extraamt2')), 
					   ar2gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmfrom3')), 
					   ar2gsmto    : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmto3')), 
					   ar2rate     : Number(loadeditApprovalNo.getAt(j).get('arearate_extraamt3')), 
					   ar3gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmfrom4')), 
					   ar3gsmto    : Number(loadeditApprovalNo.getAt(j).get('arearate_gsmto4')), 
					   ar3rate     : Number(loadeditApprovalNo.getAt(j).get('arearate_extraamt4')), 
				           othshade    : Number(loadeditApprovalNo.getAt(j).get('arearate_othershades')), 
				           sheet    : Number(loadeditApprovalNo.getAt(j).get('arearate_sheet_extraamt')), 

					   bf18_120    : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm120')), 
					   bf18_100    : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm100')), 
					   bf18_90     : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm90')), 
					   bf18_80     : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm80')), 
					   bf18_70     : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm70')), 
					   bf18_60     : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm60')), 
					   bf18_50     : Number(loadeditApprovalNo.getAt(j).get('area_bf18gsm50')), 

					   bf20_120    : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm120')), 
					   bf20_100    : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm100')), 
					   bf20_90     : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm90')), 
					   bf20_80     : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm80')), 
					   bf20_70     : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm70')), 
					   bf20_60     : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm60')), 
					   bf20_50     : Number(loadeditApprovalNo.getAt(j).get('area_bf20gsm50')), 
	
					   bf22_120    : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm120')), 
					   bf22_100    : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm100')),
					   bf22_90     : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm90')),
					   bf22_80     : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm80')),
					   bf22_70     : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm70')),
					   bf22_60     : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm60')),
					   bf22_50     : Number(loadeditApprovalNo.getAt(j).get('area_bf22gsm50')),


					   bf24_120   : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm120')), 
					   bf24_100   : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm100')), 
					   bf24_90    : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm90')), 
					   bf24_80    : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm80')), 
					   bf24_70    : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm70')), 
					   bf24_60    : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm60')), 
					   bf24_50    : Number(loadeditApprovalNo.getAt(j).get('area_bf24gsm50')), 

					   bf26_120   : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm120')), 
					   bf26_100   : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm100')), 
					   bf26_90    : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm90')), 
					   bf26_80    : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm80')), 
					   bf26_70    : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm70')), 
					   bf26_60    : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm60')), 
					   bf26_50    : Number(loadeditApprovalNo.getAt(j).get('area_bf26gsm50')), 

					   bf28_120  : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm120')), 
					   bf28_100  : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm100')), 
					   bf28_90   : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm90')), 
					   bf28_80   : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm80')), 
					   bf28_70   : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm70')), 
					   bf28_60   : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm60')), 
					   bf28_50   : Number(loadeditApprovalNo.getAt(j).get('area_bf28gsm50')), 


					   bf30_120  : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm120')), 
					   bf30_100  : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm100')), 
					   bf30_90   : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm90')), 
					   bf30_80   : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm80')), 
					   bf30_70   : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm70')), 
					   bf30_60   : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm60')), 
					   bf30_50   : Number(loadeditApprovalNo.getAt(j).get('area_bf30gsm50')), 

					   bf32_120  : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm120')), 
					   bf32_100  : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm100')), 
					   bf32_90   : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm90')), 
					   bf32_80   : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm80')), 
					   bf32_70   : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm70')), 
					   bf32_60   : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm60')), 
					   bf32_50   : Number(loadeditApprovalNo.getAt(j).get('area_bf32gsm50')),

					   bf34_120  : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm120')), 
					   bf34_100  : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm100')), 
					   bf34_90   : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm90')), 
					   bf34_80   : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm80')), 
					   bf34_70   : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm70')), 
					   bf34_60   : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm60')), 
					   bf34_50   : Number(loadeditApprovalNo.getAt(j).get('area_bf34gsm50')), 

		                     }) 
		                    );
		                  }


                                  } 


                                  }
                         });
			}
                      }    
});



var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'AREA ',
        width           : 200,
        displayField    : 'rate_areaname', 
        valueField      : 'rate_areacode',
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


var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE ',
        width           : 100,

        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
        store           : ['NAT','GREY-BRD'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
        value           : 'NAT' ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
                if (cmbShade.getRawValue() == 'GREY-BRD')
                {
			txtIncRate1.setValue("0");
			txtIncRate2.setValue("0");
			txtIncRate3.setValue("0");
			txtGSMFrom1.setValue("0");
			txtGSMFrom2.setValue("0");
			txtGSMFrom3.setValue("0");
			txtGSMFrom4.setValue("0");
			txtGSMTo1.setValue("0");
			txtGSMTo2.setValue("0");
			txtGSMTo3.setValue("0");
			txtGSMTo4.setValue("0");
			txtothershades.setValue("0");
			txtSheetRate.setValue("0");
                }        
                else 
                {
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
			txtothershades.setValue("1000");
			txtSheetRate.setValue("500");

                }        

                }
        }
});


var dgrecord = Ext.data.Record.create([]);


var flxRateDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 130,
 
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Product", dataIndex:'product', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Product", dataIndex:'prodcode', width:40,align:'center',sortable:false, menuDisabled: true},
       {header: "Shade", dataIndex:'shade', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM FROM", dataIndex:'gsmfrom', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM TO", dataIndex:'gsmto', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR G.RATE", dataIndex:'gsmfrrate', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR G.RATE", dataIndex:'gsmbrrate', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "FR 14BF", dataIndex:'fr14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 16BF", dataIndex:'fr16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 18BF", dataIndex:'fr18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 20BF", dataIndex:'fr20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 22BF", dataIndex:'fr22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 24BF", dataIndex:'fr24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 26BF", dataIndex:'fr26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 28BF", dataIndex:'fr28bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 30BF", dataIndex:'fr30bf', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "BR 14BF", dataIndex:'br14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 16BF", dataIndex:'br16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 18BF", dataIndex:'br18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 20BF", dataIndex:'br20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 22BF", dataIndex:'br22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 24BF", dataIndex:'br24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 26BF", dataIndex:'br26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 28BF", dataIndex:'br28bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 30BF", dataIndex:'br30bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G1.FROM", dataIndex:'ar1gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G1.TO", dataIndex:'ar1gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G1.Rate", dataIndex:'ar1rate', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G2.FROM", dataIndex:'ar2gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G2.TO", dataIndex:'ar2gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G2.Rate", dataIndex:'ar2rate', width:9,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G3.FROM", dataIndex:'ar3gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G3.TO", dataIndex:'ar3gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G3.Rate", dataIndex:'ar3rate', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "O.SHADE", dataIndex:'othshade', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "SHEET +", dataIndex:'sheet', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "18-120GSM", dataIndex:'bf18_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-100GSM", dataIndex:'bf18_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-90GSM", dataIndex:'bf18_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-80GSM", dataIndex:'bf18_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-70GSM", dataIndex:'bf18_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-60GSM", dataIndex:'bf18_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-50GSM", dataIndex:'bf18_50', width:80,align:'center',sortable:false, menuDisabled: true},



       {header: "20-120GSM", dataIndex:'bf20_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-100GSM", dataIndex:'bf20_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-90GSM", dataIndex:'bf20_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-80GSM", dataIndex:'bf20_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-70GSM", dataIndex:'bf20_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-60GSM", dataIndex:'bf20_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-50GSM", dataIndex:'bf20_50', width:80,align:'center',sortable:false, menuDisabled: true},



       {header: "22-120GSM", dataIndex:'bf22_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-100GSM", dataIndex:'bf22_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-90GSM", dataIndex:'bf22_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-80GSM", dataIndex:'bf22_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-70GSM", dataIndex:'bf22_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-60GSM", dataIndex:'bf22_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-50GSM", dataIndex:'bf22_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "24-120GSM", dataIndex:'bf24_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-100GSM", dataIndex:'bf24_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-90GSM", dataIndex:'bf24_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-80GSM", dataIndex:'bf24_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-70GSM", dataIndex:'bf24_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-60GSM", dataIndex:'bf24_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-50GSM", dataIndex:'bf24_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "26-120GSM", dataIndex:'bf26_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-100GSM", dataIndex:'bf26_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-90GSM", dataIndex:'bf26_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-80GSM", dataIndex:'bf26_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-70GSM", dataIndex:'bf26_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-60GSM", dataIndex:'bf26_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-50GSM", dataIndex:'bf26_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "28-120GSM", dataIndex:'bf28_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-100GSM", dataIndex:'bf28_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-90GSM", dataIndex:'bf28_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-80GSM", dataIndex:'bf28_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-70GSM", dataIndex:'bf28_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-60GSM", dataIndex:'bf28_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-50GSM", dataIndex:'bf28_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "30-120GSM", dataIndex:'bf30_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-100GSM", dataIndex:'bf30_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-90GSM", dataIndex:'bf30_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-80GSM", dataIndex:'bf30_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-70GSM", dataIndex:'bf30_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-60GSM", dataIndex:'bf30_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-50GSM", dataIndex:'bf30_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "32-120GSM", dataIndex:'bf32_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-100GSM", dataIndex:'bf32_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-90GSM", dataIndex:'bf32_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-80GSM", dataIndex:'bf32_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-70GSM", dataIndex:'bf32_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-60GSM", dataIndex:'bf32_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-50GSM", dataIndex:'bf32_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "34-120GSM", dataIndex:'bf34_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-100GSM", dataIndex:'bf34_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-90GSM", dataIndex:'bf34_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-80GSM", dataIndex:'bf34_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-70GSM", dataIndex:'bf34_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-60GSM", dataIndex:'bf34_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-50GSM", dataIndex:'bf34_50', width:80,align:'center',sortable:false, menuDisabled: true},
    ],
    store: [], //BFDataStore,
    listeners:{	
 

            'cellDblclick': function (flxRateDetail, rowIndex, cellIndex, e) {
             Ext.Msg.show({
             title: 'PRICE LIST PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxRateDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxRateDetail.getSelectionModel().clearSelections();

		                cmbProductType.setRawValue(selrow.get('product'));
		                cmbProductType.setValue(selrow.get('prodcode'));

              	                cmbShade.setValue(selrow.get('shade'));

                                if (selrow.get('prodcode') == 1)
                                   cmbShade.show();                                 


                                if (selrow.get('prodcode') == 14)
                                {
                
                                bf18120 = selrow.get('bf18_120');
                                bf18100 = selrow.get('bf18_100');
                                bf1890  = selrow.get('bf18_90');
                                bf1880  = selrow.get('bf18_80');
                                bf1870  = selrow.get('bf18_70');
                                bf1860  = selrow.get('bf18_60');
                                bf1850  = selrow.get('bf18_50');
              
                                bf20120 = selrow.get('bf20_120');
                                bf20100 = selrow.get('bf20_100');
                                bf2090  = selrow.get('bf20_90');
                                bf2080  = selrow.get('bf20_80');
                                bf2070  = selrow.get('bf20_70');
                                bf2060  = selrow.get('bf20_60');
                                bf2050  = selrow.get('bf20_50');

                                bf22120 = selrow.get('bf22_120');
                                bf22100 = selrow.get('bf22_100');
                                bf2290  = selrow.get('bf22_90');
                                bf2280  = selrow.get('bf22_80');
                                bf2270  = selrow.get('bf22_70');
                                bf2260  = selrow.get('bf22_60');
                                bf2250  = selrow.get('bf22_50');

        
                                bf24120 = selrow.get('bf24_120');
                                bf24100 = selrow.get('bf24_100');
                                bf2490  = selrow.get('bf24_90');
                                bf2480  = selrow.get('bf24_80');
                                bf2470  = selrow.get('bf24_70');
                                bf2460  = selrow.get('bf24_60');
                                bf2450  = selrow.get('bf24_50');

                                bf26120 = selrow.get('bf26_120');
                                bf26100 = selrow.get('bf26_100');
                                bf2690  = selrow.get('bf26_90');
                                bf2680  = selrow.get('bf26_80');
                                bf2670  = selrow.get('bf26_70');
                                bf2660  = selrow.get('bf26_60');
                                bf2650  = selrow.get('bf26_50');

                                bf28120 = selrow.get('bf28_120');
                                bf28100 = selrow.get('bf28_100');
                                bf2890  = selrow.get('bf28_90');
                                bf2880  = selrow.get('bf28_80');
                                bf2870  = selrow.get('bf28_70');
                                bf2860  = selrow.get('bf28_60');
                                bf2850  = selrow.get('bf28_50');

                                bf30120 = selrow.get('bf30_120');
                                bf30100 = selrow.get('bf30_100');
                                bf3090  = selrow.get('bf30_90');
                                bf3080  = selrow.get('bf30_80');
                                bf3070  = selrow.get('bf30_70');
                                bf3060  = selrow.get('bf30_60');
                                bf3050  = selrow.get('bf30_50');

                                bf32120 = selrow.get('bf32_120');
                                bf32100 = selrow.get('bf32_100');
                                bf3290  = selrow.get('bf32_90');
                                bf3280  = selrow.get('bf32_80');
                                bf3270  = selrow.get('bf32_70');
                                bf3260  = selrow.get('bf32_60');
                                bf3250  = selrow.get('bf32_50');

                                bf34120 = selrow.get('bf34_120');
                                bf34100 = selrow.get('bf34_100');
                                bf3490  = selrow.get('bf34_90');
                                bf3480  = selrow.get('bf34_80');
                                bf3470  = selrow.get('bf34_70');
                                bf3460  = selrow.get('bf34_60');
                                bf3450  = selrow.get('bf34_50');
				var record = flxDetailPB.getSelectionModel().getSelected();
				var models = flxDetailPB.getStore().getRange();
         			models[0].set('gsm120', bf18120);
				models[0].set('gsm100', bf18100);
				models[0].set('gsm90', bf1890);
				models[0].set('gsm80', bf1880);
				models[0].set('gsm70', bf1870);
				models[0].set('gsm60', bf1860);
				models[0].set('gsm50', bf1850);

				models[1].set('gsm120', bf20120);
				models[1].set('gsm100', bf20100);
				models[1].set('gsm90', bf2090);
				models[1].set('gsm80', bf2080);
				models[1].set('gsm70', bf2070);
				models[1].set('gsm60', bf2060);
				models[1].set('gsm50', bf2050);	

				models[2].set('gsm120', bf22120);
				models[2].set('gsm100', bf22100);
				models[2].set('gsm90', bf2290);
				models[2].set('gsm80', bf2280);
				models[2].set('gsm70', bf2270);
				models[2].set('gsm60', bf2260);
				models[2].set('gsm50', bf2250);

				models[3].set('gsm120', bf24120);
				models[3].set('gsm100', bf24100);
				models[3].set('gsm90', bf2490);
				models[3].set('gsm80', bf2480);
				models[3].set('gsm70', bf2470);
				models[3].set('gsm60', bf2460);
				models[3].set('gsm50', bf2450);

				models[4].set('gsm120', bf26120);
				models[4].set('gsm100', bf26100);
				models[4].set('gsm90', bf2690);
				models[4].set('gsm80', bf2680);
				models[4].set('gsm70', bf2670);
				models[4].set('gsm60', bf2660);
				models[4].set('gsm50', bf2650);

				models[5].set('gsm120', bf28120);
				models[5].set('gsm100', bf28100);
				models[5].set('gsm90', bf2890);
				models[5].set('gsm80', bf2880);
				models[5].set('gsm70', bf2870);
				models[5].set('gsm60', bf2860);
				models[5].set('gsm50', bf2850);

        			models[6].set('gsm120', bf30120);
				models[6].set('gsm100', bf30100);
				models[6].set('gsm90', bf3090);
				models[6].set('gsm80', bf3080);
				models[6].set('gsm70', bf3070);
				models[6].set('gsm60', bf3060);
				models[6].set('gsm50', bf3050);

				models[7].set('gsm120', bf32120);
				models[7].set('gsm100', bf32100);
				models[7].set('gsm90', bf3290);
				models[7].set('gsm80', bf3280);
				models[7].set('gsm70', bf3270);
				models[7].set('gsm60', bf3260);
				models[7].set('gsm50', bf3250);

				models[8].set('gsm120', bf34120);
				models[8].set('gsm100', bf34100);
				models[8].set('gsm90', bf3490);
				models[8].set('gsm80', bf3480);
				models[8].set('gsm70', bf3470);
				models[8].set('gsm60', bf3460);
				models[8].set('gsm50', bf3450);

                                }
                                else
                                {
                                gsmfrrate = selrow.get('gsmfrrate');
                                frbf14 = selrow.get('fr14bf');
                                frbf16 = selrow.get('fr16bf');
                                frbf18 = selrow.get('fr18bf');
                                frbf20 = selrow.get('fr20bf');
                                frbf22 = selrow.get('fr22bf');
                                frbf24 = selrow.get('fr24bf');
                                frbf26 = selrow.get('fr26bf');
                                frbf28 = selrow.get('fr28bf');
                                frbf30 = selrow.get('fr30bf');
                                gsmbrrate = selrow.get('gsmbrrate');
                                brbf14 = selrow.get('br14bf');
                                brbf16 = selrow.get('br16bf');
                                brbf18 = selrow.get('br18bf');
                                brbf20 = selrow.get('br20bf');
                                brbf22 = selrow.get('br22bf');
                                brbf24 = selrow.get('br24bf');
                                brbf26 = selrow.get('br26bf');
                                brbf28 = selrow.get('br28bf');
                                brbf30 = selrow.get('br30bf');
        


				var record = flxDetail.getSelectionModel().getSelected();
				var models = flxDetail.getStore().getRange();
				models[0].set('gsmrate', gsmfrrate);
				models[0].set('bf14', frbf14);
				models[0].set('bf16', frbf16);
				models[0].set('bf18', frbf18);
				models[0].set('bf20', frbf20);
				models[0].set('bf22', frbf22);
				models[0].set('bf24', frbf24);
				models[0].set('bf26', frbf26);
				models[0].set('bf28', frbf28);
				models[0].set('bf30', frbf30);


				models[1].set('gsmrate', gsmbrrate);
				models[1].set('bf14', brbf14);
				models[1].set('bf16', brbf16);
				models[1].set('bf18', brbf18);
				models[1].set('bf20', brbf20);
				models[1].set('bf22', brbf22);
				models[1].set('bf24', brbf24);
				models[1].set('bf26', brbf26);
				models[1].set('bf28', brbf28);
				models[1].set('bf30', brbf30);
                                }

	              }
		      else if (btn === 'no')
                      {
		           var sm = flxRateDetail.getSelectionModel();
		           var selrow = sm.getSelected();
                           flxRateDetail.getStore().remove(selrow);
		           flxRateDetail.getSelectionModel().selectAll();
		     
		      }


             } 
        });
   }
   }

});

function add_btn_click()
{


            var dataadd="true";
 


	    if(cmbArea.getRawValue()=="" || cmbArea.getValue()==0)
	    {
		alert("Select Area Name..");
                dataadd="false";
                cmbArea.setFocus();
	    }

	    if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
	    {
		alert("Select Product Type..");
                dataadd="false";
                cmbProductType.setFocus();
	    }

        if ( dataadd === "true")
        {  

       	if(gridedit === "true")
        {


			gridedit = "false";

	var Row= flxDetail.getStore().getCount();
        for(var i=0;i<Row;i++)
        {
            var rec = flxDetail.getStore().getAt(i);
            if (rec.get('reel') == 'Full')
            { 
               frgsmrate = Number(rec.get('gsmrate'));
               frbf14    = Number(rec.get('bf14'));
               frbf16    = Number(rec.get('bf16'));
               frbf18    = Number(rec.get('bf18'));
               frbf20    = Number(rec.get('bf20'));
               frbf22    = Number(rec.get('bf22'));
               frbf24    = Number(rec.get('bf24'));
               frbf26    = Number(rec.get('bf26'));
               frbf28    = Number(rec.get('bf28'));
               frbf30    = Number(rec.get('bf30'));
         }
         else
        {
               brgsmrate = Number(rec.get('gsmrate'));
               brbf14    = Number(rec.get('bf14'));
               brbf16    = Number(rec.get('bf16'));
               brbf18    = Number(rec.get('bf18'));
               brbf20    = Number(rec.get('bf20'));
               brbf22    = Number(rec.get('bf22'));
               brbf24    = Number(rec.get('bf24'));
               brbf26    = Number(rec.get('bf26'));
               brbf28    = Number(rec.get('bf28'));
               brbf30    = Number(rec.get('bf30'));
         }
      }
                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();

        var idx = flxRateDetail.getStore().indexOf(editrow);


	sel[idx].set('product' , cmbProductType.getRawValue());
	sel[idx].set('prodcode' , cmbProductType.getValue());
	sel[idx].set('shade' , cmbShade.getValue());

	sel[idx].set('gsmfrom' , Number(txtGSMFrom1.getRawValue()));
	sel[idx].set('gsmto' , Number(txtGSMTo1.getValue()));
	sel[idx].set('gsmfrrate' , Number(frgsmrate));
	sel[idx].set('gsmbrrate' , Number(brgsmrate));

	sel[idx].set('fr14bf' , Number(frbf14));
	sel[idx].set('fr16bf' , Number(frbf16));
	sel[idx].set('fr18bf' , Number(frbf18));
	sel[idx].set('fr20bf' , Number(frbf20));
	sel[idx].set('fr22bf' , Number(frbf22));
	sel[idx].set('fr24bf' , Number(frbf24));
	sel[idx].set('fr26bf' , Number(frbf26));
	sel[idx].set('fr28bf' , Number(frbf28));
	sel[idx].set('fr30bf' , Number(frbf30));

	sel[idx].set('br14bf' , Number(brbf14));
	sel[idx].set('br16bf' , Number(brbf16));
	sel[idx].set('br18bf' , Number(brbf18));
	sel[idx].set('br20bf' , Number(brbf20));
	sel[idx].set('br22bf' , Number(brbf22));
	sel[idx].set('br24bf' , Number(brbf24));
	sel[idx].set('br26bf' , Number(brbf26));
	sel[idx].set('br28bf' , Number(brbf28));
	sel[idx].set('br30bf' , Number(brbf30));




	sel[idx].set('ar1gsmfrom' , Number(txtGSMFrom2.getValue()));
	sel[idx].set('ar1gsmto' , Number(txtGSMTo2.getValue()));
	sel[idx].set('ar1rate' , Number(txtIncRate1.getValue()));

	sel[idx].set('ar2gsmfrom' , Number(txtGSMFrom3.getValue()));
	sel[idx].set('ar2gsmto' , Number(txtGSMTo3.getValue()));
	sel[idx].set('ar2rate' , Number(txtIncRate2.getValue()));

	sel[idx].set('ar3gsmfrom' , Number(txtGSMFrom4.getValue()));
	sel[idx].set('ar3gsmto' , Number(txtGSMTo4.getValue()));
	sel[idx].set('ar3rate' , Number(txtIncRate3.getValue()));


	sel[idx].set('othshade' , Number(txtothershades.getValue()));
	sel[idx].set('sheet' , Number(txtSheetRate.getValue()));


        }
        else
        {
	var Row= flxDetail.getStore().getCount();
        for(var i=0;i<Row;i++)
        {
            var rec = flxDetail.getStore().getAt(i);
            if (rec.get('reel') == 'Full')
            { 
               frgsmrate = Number(rec.get('gsmrate'));
               frbf14    = Number(rec.get('bf14'));
               frbf16    = Number(rec.get('bf16'));
               frbf18    = Number(rec.get('bf18'));
               frbf20    = Number(rec.get('bf20'));
               frbf22    = Number(rec.get('bf22'));
               frbf24    = Number(rec.get('bf24'));
               frbf26    = Number(rec.get('bf26'));
               frbf28    = Number(rec.get('bf28'));
               frbf30    = Number(rec.get('bf30'));
         }
         else
        {
               brgsmrate = Number(rec.get('gsmrate'));
               brbf14    = Number(rec.get('bf14'));
               brbf16    = Number(rec.get('bf16'));
               brbf18    = Number(rec.get('bf18'));
               brbf20    = Number(rec.get('bf20'));
               brbf22    = Number(rec.get('bf22'));
               brbf24    = Number(rec.get('bf24'));
               brbf26    = Number(rec.get('bf26'));
               brbf28    = Number(rec.get('bf28'));
               brbf30    = Number(rec.get('bf30'));
         }
      }
                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.prodcode === cmbProductType.getValue() && sel[i].data.shade === cmbShade.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
                if (cnt == 0)
                {
                        var RowCnt = flxRateDetail.getStore().getCount() + 1;
                    	flxRateDetail.getStore().insert(
                        flxRateDetail.getStore().getCount(),
                        new dgrecord({
  
                           product   : cmbProductType.getRawValue(),
        		   prodcode  : cmbProductType.getValue(),
                           shade     : cmbShade.getRawValue(),
			   gsmfrom   : Number(txtGSMFrom1.getRawValue()), 
			   gsmto     : Number(txtGSMTo1.getValue()), 
			   gsmfrrate : Number(frgsmrate),
			   gsmbrrate : Number(brgsmrate),
			   fr14bf    : Number(frbf14),
			   fr16bf    : Number(frbf16),
			   fr18bf    : Number(frbf18),
			   fr20bf    : Number(frbf20),
			   fr22bf    : Number(frbf22),
			   fr24bf    : Number(frbf24),
			   fr26bf    : Number(frbf26),
			   fr28bf    : Number(frbf28),
			   fr30bf    : Number(frbf30),
			   br14bf    : Number(brbf14),
			   br16bf    : Number(brbf16),
			   br18bf    : Number(brbf18),
			   br20bf    : Number(brbf20),
			   br22bf    : Number(brbf22),
			   br24bf    : Number(brbf24),
			   br26bf    : Number(brbf26),
			   br28bf    : Number(brbf28),
			   br30bf    : Number(brbf30),

			   ar1gsmfrom  : Number(txtGSMFrom2.getValue()),
			   ar1gsmto    : Number(txtGSMTo2.getValue()),
			   ar1rate     : Number(txtIncRate1.getValue()),
			   ar2gsmfrom  : Number(txtGSMFrom3.getValue()),
			   ar2gsmto    : Number(txtGSMTo3.getValue()),
			   ar2rate     : Number(txtIncRate2.getValue()),
			   ar3gsmfrom  : Number(txtGSMFrom4.getValue()),
			   ar3gsmto    : Number(txtGSMTo4.getValue()),
			   ar3rate     : Number(txtIncRate3.getValue()),
                           othshade    : Number(txtothershades.getValue()),
                           sheet       : Number(txtSheetRate.getValue()),

                        }) 
                    );
               }
               else
               {
                          alert("Already the same product is Entered ...");
               }     
           } 
         }
         flxRateDetail.getSelectionModel().clearSelections();
}


function add_btn_PaperBag_click()
{

            var dataadd="true";
 


	    if(cmbArea.getRawValue()=="" || cmbArea.getValue()==0)
	    {
		alert("Select Area Name..");
                dataadd="false";
                cmbArea.setFocus();
	    }

	    if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
	    {
		alert("Select Product Type..");
                dataadd="false";
                cmbProductType.setFocus();
	    }

        if ( dataadd === "true")
        {  

	var Row= flxDetailPB.getStore().getCount();
        for(var i=0;i<Row;i++)
        {
            var rec = flxDetailPB.getStore().getAt(i);

            if (rec.get('bf') == '18')
            { 
                gsm120_18 = Number(rec.get('gsm120'));
                gsm100_18 = Number(rec.get('gsm100'));
                gsm90_18  = Number(rec.get('gsm90'));
                gsm80_18  = Number(rec.get('gsm80'));
                gsm70_18  = Number(rec.get('gsm70'));
                gsm60_18  = Number(rec.get('gsm60'));
                gsm50_18  = Number(rec.get('gsm50'));
         }
         else if (rec.get('bf') == '20')
         {
                gsm120_20 = Number(rec.get('gsm120'));
                gsm100_20 = Number(rec.get('gsm100'));
                gsm90_20  = Number(rec.get('gsm90'));
                gsm80_20  = Number(rec.get('gsm80'));
                gsm70_20  = Number(rec.get('gsm70'));
                gsm60_20  = Number(rec.get('gsm60'));
                gsm50_20  = Number(rec.get('gsm50'));
         }

         else if (rec.get('bf') == '22')
         {
                gsm120_22 = Number(rec.get('gsm120'));
                gsm100_22 = Number(rec.get('gsm100'));
                gsm90_22  = Number(rec.get('gsm90'));
                gsm80_22  = Number(rec.get('gsm80'));
                gsm70_22  = Number(rec.get('gsm70'));
                gsm60_22  = Number(rec.get('gsm60'));
                gsm50_22  = Number(rec.get('gsm50'));
         }

         else if (rec.get('bf') == '24')
         {
                gsm120_24 = Number(rec.get('gsm120'));
                gsm100_24 = Number(rec.get('gsm100'));
                gsm90_24  = Number(rec.get('gsm90'));
                gsm80_24  = Number(rec.get('gsm80'));
                gsm70_24  = Number(rec.get('gsm70'));
                gsm60_24  = Number(rec.get('gsm60'));
                gsm50_24  = Number(rec.get('gsm50'));
         }


         else if (rec.get('bf') == '26')
         {
                gsm120_26 = Number(rec.get('gsm120'));
                gsm100_26 = Number(rec.get('gsm100'));
                gsm90_26  = Number(rec.get('gsm90'));
                gsm80_26  = Number(rec.get('gsm80'));
                gsm70_26  = Number(rec.get('gsm70'));
                gsm60_26  = Number(rec.get('gsm60'));
                gsm50_26  = Number(rec.get('gsm50'));
         }

         else if (rec.get('bf') == '28')
         {
                gsm120_28 = Number(rec.get('gsm120'));
                gsm100_28 = Number(rec.get('gsm100'));
                gsm90_28  = Number(rec.get('gsm90'));
                gsm80_28  = Number(rec.get('gsm80'));
                gsm70_28  = Number(rec.get('gsm70'));
                gsm60_28  = Number(rec.get('gsm60'));
                gsm50_28  = Number(rec.get('gsm50'));
         }
         else if (rec.get('bf') == '30')
         {
                gsm120_30 = Number(rec.get('gsm120'));
                gsm100_30 = Number(rec.get('gsm100'));
                gsm90_30  = Number(rec.get('gsm90'));
                gsm80_30  = Number(rec.get('gsm80'));
                gsm70_30  = Number(rec.get('gsm70'));
                gsm60_30  = Number(rec.get('gsm60'));
                gsm50_30  = Number(rec.get('gsm50'));
         }

         else if (rec.get('bf') == '32')
         {
                gsm120_32 = Number(rec.get('gsm120'));
                gsm100_32 = Number(rec.get('gsm100'));
                gsm90_32  = Number(rec.get('gsm90'));
                gsm80_32  = Number(rec.get('gsm80'));
                gsm70_32  = Number(rec.get('gsm70'));
                gsm60_32  = Number(rec.get('gsm60'));
                gsm50_32  = Number(rec.get('gsm50'));
         }

         else if (rec.get('bf') == '34')
         {
                gsm120_34 = Number(rec.get('gsm120'));
                gsm100_34 = Number(rec.get('gsm100'));
                gsm90_34  = Number(rec.get('gsm90'));
                gsm80_34  = Number(rec.get('gsm80'));
                gsm70_34  = Number(rec.get('gsm70'));
                gsm60_34  = Number(rec.get('gsm60'));
                gsm50_34  = Number(rec.get('gsm50'));
         }
      }


       	if(gridedit === "true")
        {
                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();
 
                var idx = flxRateDetail.getStore().indexOf(editrow);

	        sel[idx].set('product' , cmbProductType.getRawValue());
         	sel[idx].set('prodcode', cmbProductType.getValue());

         	sel[idx].set('bf18_120', Number(gsm120_18));
         	sel[idx].set('bf18_100', Number(gsm100_18));
         	sel[idx].set('bf18_90' , Number(gsm90_18));
         	sel[idx].set('bf18_80' , Number(gsm80_18));
         	sel[idx].set('bf18_70' , Number(gsm70_18));
         	sel[idx].set('bf18_60' , Number(gsm60_18));
         	sel[idx].set('bf18_50' , Number(gsm50_18));

         	sel[idx].set('bf20_120', Number(gsm120_20));
         	sel[idx].set('bf20_100', Number(gsm100_20));
         	sel[idx].set('bf20_90' , Number(gsm90_20));
         	sel[idx].set('bf20_80' , Number(gsm80_20));
         	sel[idx].set('bf20_70' , Number(gsm70_20));
         	sel[idx].set('bf20_60' , Number(gsm60_20));
         	sel[idx].set('bf20_50' , Number(gsm50_20));


         	sel[idx].set('bf22_120', Number(gsm120_22));
         	sel[idx].set('bf22_100', Number(gsm100_22));
         	sel[idx].set('bf22_90' , Number(gsm90_22));
         	sel[idx].set('bf22_80' , Number(gsm80_22));
         	sel[idx].set('bf22_70' , Number(gsm70_22));
         	sel[idx].set('bf22_60' , Number(gsm60_22));
         	sel[idx].set('bf22_50' , Number(gsm50_22));

         	sel[idx].set('bf24_120', Number(gsm120_24));
         	sel[idx].set('bf24_100', Number(gsm100_24));
         	sel[idx].set('bf24_90' , Number(gsm90_24));
         	sel[idx].set('bf24_80' , Number(gsm80_24));
         	sel[idx].set('bf24_70' , Number(gsm70_24));
         	sel[idx].set('bf24_60' , Number(gsm60_24));
         	sel[idx].set('bf24_50' , Number(gsm50_24));

         	sel[idx].set('bf26_120', Number(gsm120_26));
         	sel[idx].set('bf26_100', Number(gsm100_26));
         	sel[idx].set('bf26_90' , Number(gsm90_26));
         	sel[idx].set('bf26_80' , Number(gsm80_26));
         	sel[idx].set('bf26_70' , Number(gsm70_26));
         	sel[idx].set('bf26_60' , Number(gsm60_26));
         	sel[idx].set('bf26_50' , Number(gsm50_26));

         	sel[idx].set('bf28_120', Number(gsm120_28));
         	sel[idx].set('bf28_100', Number(gsm100_28));
         	sel[idx].set('bf28_90' , Number(gsm90_28));
         	sel[idx].set('bf28_80' , Number(gsm80_28));
         	sel[idx].set('bf28_70' , Number(gsm70_28));
         	sel[idx].set('bf28_60' , Number(gsm60_28));
         	sel[idx].set('bf28_50' , Number(gsm50_28));


         	sel[idx].set('bf30_120', Number(gsm120_30));
         	sel[idx].set('bf30_100', Number(gsm100_30));
         	sel[idx].set('bf30_90' , Number(gsm90_30));
         	sel[idx].set('bf30_80' , Number(gsm80_30));
         	sel[idx].set('bf30_70' , Number(gsm70_30));
         	sel[idx].set('bf30_60' , Number(gsm60_30));
         	sel[idx].set('bf30_50' , Number(gsm50_30));


         	sel[idx].set('bf32_120', Number(gsm120_32));
         	sel[idx].set('bf32_100', Number(gsm100_32));
         	sel[idx].set('bf32_90' , Number(gsm90_32));
         	sel[idx].set('bf32_80' , Number(gsm80_32));
         	sel[idx].set('bf32_70' , Number(gsm70_32));
         	sel[idx].set('bf32_60' , Number(gsm60_32));
         	sel[idx].set('bf32_50' , Number(gsm50_32));

         	sel[idx].set('bf34_120', Number(gsm120_34));
         	sel[idx].set('bf34_100', Number(gsm100_34));
         	sel[idx].set('bf34_90' , Number(gsm90_34));
         	sel[idx].set('bf34_80' , Number(gsm80_34));
         	sel[idx].set('bf34_70' , Number(gsm70_34));
         	sel[idx].set('bf34_60' , Number(gsm60_34));
         	sel[idx].set('bf34_50' , Number(gsm50_34));


        }
        else
        {            
  
                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.prodcode === cmbProductType.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
                if (cnt == 0)
                {
                        var RowCnt = flxRateDetail.getStore().getCount() + 1;
                    	flxRateDetail.getStore().insert(
                        flxRateDetail.getStore().getCount(),
                        new dgrecord({
  
                           product   : cmbProductType.getRawValue(),
        		   prodcode  : cmbProductType.getValue(),

			   bf18_120  : Number(gsm120_18),
			   bf18_100  : Number(gsm100_18),
			   bf18_90   : Number(gsm90_18),
			   bf18_80   : Number(gsm80_18),
			   bf18_70   : Number(gsm70_18),
			   bf18_60   : Number(gsm60_18),
			   bf18_50   : Number(gsm50_18),

			   bf20_120  : Number(gsm120_20),
			   bf20_100  : Number(gsm100_20),
			   bf20_90   : Number(gsm90_20),
			   bf20_80   : Number(gsm80_20),
			   bf20_70   : Number(gsm70_20),
			   bf20_60   : Number(gsm60_20),
			   bf20_50   : Number(gsm50_20),
	
			   bf22_120  : Number(gsm120_22),
			   bf22_100  : Number(gsm100_22),
			   bf22_90   : Number(gsm90_22),
			   bf22_80   : Number(gsm80_22),
			   bf22_70   : Number(gsm70_22),
			   bf22_60   : Number(gsm60_22),
			   bf22_50   : Number(gsm50_22),


			   bf24_120  : Number(gsm120_24),
			   bf24_100  : Number(gsm100_24),
			   bf24_90   : Number(gsm90_24),
			   bf24_80   : Number(gsm80_24),
			   bf24_70   : Number(gsm70_24),
			   bf24_60   : Number(gsm60_24),
			   bf24_50   : Number(gsm50_24),

			   bf26_120  : Number(gsm120_26),
			   bf26_100  : Number(gsm100_26),
			   bf26_90   : Number(gsm90_26),
			   bf26_80   : Number(gsm80_26),
			   bf26_70   : Number(gsm70_26),
			   bf26_60   : Number(gsm60_26),
			   bf26_50   : Number(gsm50_26),

			   bf28_120  : Number(gsm120_28),
			   bf28_100  : Number(gsm100_28),
			   bf28_90   : Number(gsm90_28),
			   bf28_80   : Number(gsm80_28),
			   bf28_70   : Number(gsm70_28),
			   bf28_60   : Number(gsm60_28),
			   bf28_50   : Number(gsm50_28),


			   bf30_120  : Number(gsm120_30),
			   bf30_100  : Number(gsm100_30),
			   bf30_90   : Number(gsm90_30),
			   bf30_80   : Number(gsm80_30),
			   bf30_70   : Number(gsm70_30),
			   bf30_60   : Number(gsm60_30),
			   bf30_50   : Number(gsm50_30),

			   bf32_120  : Number(gsm120_32),
			   bf32_100  : Number(gsm100_32),
			   bf32_90   : Number(gsm90_32),
			   bf32_80   : Number(gsm80_32),
			   bf32_70   : Number(gsm70_32),
			   bf32_60   : Number(gsm60_32),
			   bf32_50   : Number(gsm50_32),

			   bf34_120  : Number(gsm120_34),
			   bf34_100  : Number(gsm100_34),
			   bf34_90   : Number(gsm90_34),
			   bf34_80   : Number(gsm80_34),
			   bf34_70   : Number(gsm70_34),
			   bf34_60   : Number(gsm60_34),
			   bf34_50   : Number(gsm50_34),

                        }) 
                    );
               }
               else
               {
                          alert("Already the same product is Entered ...");
               }     
             }
             }
}

 var btnAddKraft = new Ext.Button({
	text: 'ADD',
	width: 70,
	height: 40,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                 var dataok = 1;
                 if (Number(txtGSMFrom2.getValue()) >  Number(txtGSMTo2.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom2.focus();
                      dataok = 0;
                 }        
                 if (Number(txtGSMFrom3.getValue()) >  Number(txtGSMTo3.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom3.focus();
                      dataok = 0;
                 }        
                 if (Number(txtGSMFrom4.getValue()) >  Number(txtGSMTo4.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom4.focus();
                      dataok = 0;
                 }        
                 if (dataok == 1)                                                   
                     add_btn_click();
          }
       }
  })

 var btnAddPaperBag = new Ext.Button({
	text: 'ADD',
	width: 70,
	height: 40,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                add_btn_PaperBag_click();
          }
       }
  })


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
       {header: "Reel", dataIndex:'reel', width:75,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM RATE", dataIndex:'gsmrate', width:80,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "14", dataIndex:'bf14', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "16", dataIndex:'bf16', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "18", dataIndex:'bf18', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "20", dataIndex:'bf20', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "22", dataIndex:'bf22', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "24", dataIndex:'bf24', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "26", dataIndex:'bf26', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "28", dataIndex:'bf28', width:77,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "30", dataIndex:'bf30', width:77,align:'center',sortable:false, menuDisabled: true,
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



var flxDetailPB = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:100,
    height: 230,
    hidden:false,
    width:950,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "BF", dataIndex:'bf', width:70,align:'center',sortable:false, menuDisabled: true},
       {header: "120 GSM", dataIndex:'gsm120', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "100 GSM", dataIndex:'gsm100', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "90 GSM", dataIndex:'gsm90', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "80 GSM", dataIndex:'gsm80', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "70 GSM", dataIndex:'gsm70', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "60 GSM", dataIndex:'gsm60', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "50 GSM", dataIndex:'gsm50', width:90,align:'center',sortable:false, menuDisabled: true,
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





var tabRate = new Ext.TabPanel({
    id          : 'tabRate',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 245,
    width       : 1350,

        listeners: {
          'tabchange': function(tabPanel, tab) {
//           flxAccounts.getStore().removeAll();
        }},
 
         items       : [

           {
            xtype: 'panel',
            title: 'KRAFT & OTHERS',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [



   	     { xtype   : 'fieldset',
                 title       : ' BF RATE',
                 id          : 'bfrate',
                 width       : 880,
                 height      : 145,
                 x           : 10,
                 y           : 20,
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
                title   : 'ADDITIONAL PRICE INCREASE FOR ',
                 width       : 378,
                 height      : 190,
                 x           : 900,
                 y           : 20,
                 border      : true,
                 layout      : 'absolute',
                 id          : 'addrate',
                items:[


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 280,
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
                             x           : 270,
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
                             x           : 270,
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
                             x           : 270,
                             y           : 60,
                             border      : false,      
         
                             items: [txtIncRate3]
                      },

                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 90,
                             border      : false,      
         
                             items: [txtothershades]
                      },


                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 120,
                             border      : false,      
         
                             items: [txtSheetRate]
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



                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 800,
                           y           : 170,
                           border      : false,
                           items: [btnAddKraft]
                   },


            ]

            },
           {
            xtype: 'panel',
            title: 'PAPER BAG',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [
                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 880,
                           x           : 0,
                           y           : -10,
                           border      : false,
                           items: [flxDetailPB]
                   },

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 880,
                           y           : 180,
                           border      : false,
                           items: [btnAddPaperBag]
                   },
            ]

            },
         ]
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


            var rateData = flxRateDetail.getStore().getRange();                                        
            var rateupData = new Array();
            Ext.each(rateData, function (record) {
                rateupData.push(record.data);
            });




	         //-- loop y Start     
							Ext.Ajax.request({
				                    	url: 'FrmMasSalesAreaRateSave.php',
				                        params:
							{
                                                        savetype:gstFlag,

	                   	cnt          : rateData.length,
                        	griddet      : Ext.util.JSON.encode(rateupData),   
				compcode     : Gincompcode,
				finid        : GinFinid,   
				areacode     : cmbArea.getValue(), 
				GSTper       : Number(txtGSTper.getValue()),
				apprno       : txtApprovalNo.getValue(),                                        
				apprdate     : Ext.util.Format.date(dtpApproval.getValue(),"Y-m-d"),
				wefdate      : Ext.util.Format.date(dtpWEF.getValue(),"Y-m-d"),
                                userid     : UserId,
  	                      priceterm  : Number(txtPriceTerms.getValue()),
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
                            MasSalesRateMasterWindow.hide();
                        }
                } ]
        },
        items: [


            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 1320,
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
			    x           : 830,
			    y           : 0,
                            labelWidth  : 220,
			    border      : false,
			    width       :850,
                            items : [txtPriceTerms]
   
                   },


                    {
			    xtype       : 'fieldset',
			    x           : 830,
			    y           : 30,
                            labelWidth  : 130,
			    border      : false,
			    width       :850,
                            items : [txtPayTerms45Days]
   
                   },

                    {
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 30,
                            labelWidth  : 80,
			    border      : false,
			    width       :850,
                            items : [txtPayTerms60Days]
   
                   },
                    {
			    xtype       : 'fieldset',
			    x           : 830,
			    y           : 55,
                            labelWidth  : 130,
			    border      : false,
			    width       :850,
                            items : [txtPayTerms75Days]
   
                   },
                    {
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 55,
                            labelWidth  : 80,
			    border      : false,
			    width       :850,
                            items : [txtPayTerms90Days]
   
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
                           width       : 320,
                           x           : 350,
                           y           : 60,
                           border      : false,
                           items: [cmbShade]
                   },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 80,
                             width       : 420,
                             x           : 600,
                             y           : 60,
                             border      : false,      
         
                             items: [txtGSTper]
                      },

	    {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 1350,
                                x: 5,
                                y: 85,
                                border: false,
                                items: [tabRate]
             },

                   ]
             },



   	     { xtype   : 'fieldset',
                 title       : '',
                 width       : 1290,
                 height      : 160,
                 x           : 30,
                 y           : 360,
                 border      : true,
                 layout      : 'absolute',
                 items:[
                  { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 1,
                           width       : 1270,
                           x           : 0,
                           y           : -10,
                           border      : false,
                           items: [flxRateDetail]
                   },
                 ]
              }

                  




       ] ,  



 
    });

      function RefreshData(){
          MasSalesRateDiscountPanel.getForm().reset();
          cmbShade.hide();
          gridedit = "false";
    //    Ext.getCmp('bfrate').setDisabled(false);
//        Ext.getCmp('gsmrate').setDisabled(true);
        custcode = 0;
         Ext.getCmp('cmbApprovalNo').hide();
//         Ext.getCmp('othervarty').hide();

        txtPriceTerms.setValue(30);



				  flxRateDetail.getStore().removeAll();
   


				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 
                                   gsmrate      : 0,  
 		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
                                   gsmrate      : 0,
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,
                                })
                                ); 

	flxDetailPB.getStore().removeAll();
	var selrows = flxDetailPB.getSelectionModel().getCount();
        var sel = flxDetailPB.getSelectionModel().getSelections();
        var RowCnt = flxDetailPB.getStore().getCount() + 1;

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '18', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '20', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '22', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '24', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '26', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '28', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '30', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '32', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '34', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
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


   
    var MasSalesRateMasterWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//        x           : 50,
        y           : 35,
        title       : 'SALES -AREA WISE PRICE MASTER ',
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
    MasSalesRateMasterWindow.show();  
});
