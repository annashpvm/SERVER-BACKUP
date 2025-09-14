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
   var blinking = true;


    setInterval(function () {
        var el = Ext.get('lblBlink');
        if (el) {
            blinking = !blinking;
            el.setStyle('visibility', blinking ? 'visible' : 'hidden');
        }
    }, 500); 



var lblBlink = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblBlink',
    width       : 120,
   labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
   style: 'color: red; font-weight: bold; font-size: 15px;'

});


   var findorders = 0;
   var txtPriceTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPriceTerms',
        name        : 'txtPriceTerms',
        width       :  50,
        Value       : 30, 
       labelStyle : "font-size:14px;font-weight:bold;color: #ff33a5", 
	style: {
		    'color':' #3346ff',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '16px','font-weight':'bold'
		},
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


   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  50,
        Value       : 30, 
       labelStyle : "font-size:14px;font-weight:bold;color:#ff33a5", 
	style: {
		    'color':'#3346ff ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '16px','font-weight':'bold'
		},
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



   var txtRateDiff = new Ext.form.NumberField({
        fieldLabel  : 'Rate Difference',
        id          : 'txtRateDiff',
        name        : 'txtRateDiff',
        width       :  50,
       labelStyle : "font-size:14px;font-weight:bold;color:#ff33a5", 
	style: {
		    'color':'#3346ff ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '16px','font-weight':'bold'
		},
        tabindex : 2,
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){

		  }  
        }  
    });


var lblrate = new Ext.form.Label({
    fieldLabel  : 'Extra Rs.',
    id          : 'lblrate',
    width       : 120,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",

});





   var txtGSMFrom = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom',
        name        : 'txtGSMfrom',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO  ',
        id          : 'txtGSMTo',
        name        : 'txtGSMTo',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });



   var txtGSMFrom1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom1',
        name        : 'txtGSMfrom1',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO',
        id          : 'txtGSMTo1',
        name        : 'txtGSMTo1',
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
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo2 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo2',
        name        : 'txtGSMTo2',
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
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


  var txtGSMFrom5 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom5',
        name        : 'txtGSMfrom5',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo5 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo5',
        name        : 'txtGSMTo5',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate4 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate4',
        name        : 'txtIncRate4',
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
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


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
                  MasSalesRateMasterApprovalWindow.hide();

            }
        }]);

 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });


var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE ',
        width           : 100,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',

        store           : loadShadeDataStore,
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
     

                }
        }
});


 var loadALLCustomerListDataStore = new Ext.data.Store({
      id: 'loadALLCustomerListDataStore',
    //  autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceMasterListCustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
   'rate_comp_code', 'rate_fincode', 'rate_code', 'rate_appr_date', 'rate_wef', 'rate_area', 'rate_vartype', 'rate_gst_per', 'rate_gsmfrom', 'rate_gsmto', 'rate_rate', 'rate_bitreel', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit', 'rate_bf28_bit', 'rate_bf30_bit', 'rate_bf32_bit', 'rate_gsmfrom2', 'rate_gsmto2', 'rate_extraamt2', 'rate_gsmfrom3', 'rate_gsmto3', 'rate_extraamt3', 'rate_gsmfrom4', 'rate_gsmto4', 'rate_extraamt4', 'rate_othershades', 'rate_sheet_extraamt', 'rate_bf18gsm120', 'rate_bf18gsm100', 'rate_bf18gsm90', 'rate_bf18gsm80', 'rate_bf18gsm70', 'rate_bf18gsm60', 'rate_bf18gsm50', 'rate_bf20gsm120', 'rate_bf20gsm100', 'rate_bf20gsm90', 'rate_bf20gsm80', 'rate_bf20gsm70', 'rate_bf20gsm60', 'rate_bf20gsm50', 'rate_bf22gsm120', 'rate_bf22gsm100', 'rate_bf22gsm90', 'rate_bf22gsm80', 'rate_bf22gsm70', 'rate_bf22gsm60', 'rate_bf22gsm50', 'rate_bf24gsm120', 'rate_bf24gsm100', 'rate_bf24gsm90', 'rate_bf24gsm80', 'rate_bf24gsm70', 'rate_bf24gsm60', 'rate_bf24gsm50', 'rate_bf26gsm120', 'rate_bf26gsm100', 'rate_bf26gsm90', 'rate_bf26gsm80', 'rate_bf26gsm70', 'rate_bf26gsm60', 'rate_bf26gsm50', 'rate_bf28gsm120', 'rate_bf28gsm100', 'rate_bf28gsm90', 'rate_bf28gsm80', 'rate_bf28gsm70', 'rate_bf28gsm60', 'rate_bf28gsm50', 'rate_bf30gsm120', 'rate_bf30gsm100', 'rate_bf30gsm90', 'rate_bf30gsm80', 'rate_bf30gsm70', 'rate_bf30gsm60', 'rate_bf30gsm50', 'rate_bf32gsm120', 'rate_bf32gsm100', 'rate_bf32gsm90', 'rate_bf32gsm80', 'rate_bf32gsm70', 'rate_bf32gsm60', 'rate_bf32gsm50', 'rate_bf34gsm120', 'rate_bf34gsm100', 'rate_bf34gsm90', 'rate_bf34gsm80', 'rate_bf34gsm70', 'rate_bf34gsm60', 'rate_bf34gsm50', 'rate_approved', 'rate_close', 'rate_entered', 'rate_verified', 'rate_code', 'rate_name', 'rate_rategrp', 'vargrp_type_code', 'vargrp_type_name', 'vargrp_type_short_code', 'vargrp_type_hsncode', 'appr_date', 'enteredby', 'verifiedby','rate_areaname','cust_ref'

      ]),
    });

 var loadPassword = new Ext.data.Store({
      id: 'loadPassword',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos', 'pw_password'
      ]),
    });


 var loadAreaRateDataStore = new Ext.data.Store({
      id: 'loadAreaRateDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findCustomerRate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'rate_comp_code', 'rate_fincode', 'rate_code', 'rate_appr_date', 'rate_wef', 'rate_area', 'rate_vartype', 'rate_gst_per', 'rate_gsmfrom', 'rate_gsmto', 'rate_rate', 'rate_bitreel', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit', 'rate_bf28_bit', 'rate_bf30_bit', 'rate_bf32_bit', 'rate2_gsmfrom', 'rate2_gsmto', 'rate2_extraamt', 'rate3_gsmfrom', 'rate3_gsmto', 'rate3_extraamt', 'rate4_gsmfrom', 'rate4_gsmto', 'rate4_extraamt', 'rate5_gsmfrom', 'rate5_gsmto', 'rate5_extraamt', 'rate_othershades', 'rate_sheet_extraamt', 'rate_bf18gsm120', 'rate_bf18gsm100', 'rate_bf18gsm90', 'rate_bf18gsm80', 'rate_bf18gsm70', 'rate_bf18gsm60', 'rate_bf18gsm50', 'rate_bf20gsm120', 'rate_bf20gsm100', 'rate_bf20gsm90', 'rate_bf20gsm80', 'rate_bf20gsm70', 'rate_bf20gsm60', 'rate_bf20gsm50', 'rate_bf22gsm120', 'rate_bf22gsm100', 'rate_bf22gsm90', 'rate_bf22gsm80', 'rate_bf22gsm70', 'rate_bf22gsm60', 'rate_bf22gsm50', 'rate_bf24gsm120', 'rate_bf24gsm100', 'rate_bf24gsm90', 'rate_bf24gsm80', 'rate_bf24gsm70', 'rate_bf24gsm60', 'rate_bf24gsm50', 'rate_bf26gsm120', 'rate_bf26gsm100', 'rate_bf26gsm90', 'rate_bf26gsm80', 'rate_bf26gsm70', 'rate_bf26gsm60', 'rate_bf26gsm50', 'rate_bf28gsm120', 'rate_bf28gsm100', 'rate_bf28gsm90', 'rate_bf28gsm80', 'rate_bf28gsm70', 'rate_bf28gsm60', 'rate_bf28gsm50', 'rate_bf30gsm120', 'rate_bf30gsm100', 'rate_bf30gsm90', 'rate_bf30gsm80', 'rate_bf30gsm70', 'rate_bf30gsm60', 'rate_bf30gsm50', 'rate_bf32gsm120', 'rate_bf32gsm100', 'rate_bf32gsm90', 'rate_bf32gsm80', 'rate_bf32gsm70', 'rate_bf32gsm60', 'rate_bf32gsm50', 'rate_bf34gsm120', 'rate_bf34gsm100', 'rate_bf34gsm90', 'rate_bf34gsm80', 'rate_bf34gsm70', 'rate_bf34gsm60', 'rate_bf34gsm50', 'rate_approved', 'rate_close, rate_areacode', 'rate_areaname', 'vargrp_type_code', 'vargrp_type_name', 'vargrp_type_short_code', 'vargrp_type_hsncode', 'rate_shade' ,'rate_price_terms'  ,'rate_approved', 'rate_bf12_bit' , 'rate_bf12','var_desc','rate_pb_rate','rate_grace_days','rate_rate_difference'
      ]),
    });



 var loadSORaisedDataStore = new Ext.data.Store({
      id: 'loadSORaisedDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSORaised"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ordh_sono'
      ]),
    });

 var loadCustListDataStore = new Ext.data.Store({
      id: 'loadCustListDataStore',
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
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety_for_Customer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAreaPrice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

          'cust_code', 'cust_ref', 'cust_area','rate_rategrp','cust_cr_days','cust_grace_days'

      ]),
    });


function flx_change()
{


	var sm = flxParty.getSelectionModel();
	var selrow = sm.getSelected();
	custcode = 0;
	custledcode = 0;
	areacode    = 0;
	areagrpcode = 0;
	if ((selrow != null)){
		flxParty.hide();
		gridedit = "true";
		editrow = selrow;
		custcode = selrow.get('cust_code');

		custname = selrow.get('cust_ref');
		txtCustomer.setRawValue(selrow.get('cust_ref'));

		                txtEntryNo.setValue('');               
		                txtPriceTerms.setValue('');

		                txtGSMFrom1.setValue('');
		                txtGSMFrom2.setValue('');
		                txtGSMFrom3.setValue('');
		                txtGSMFrom4.setValue('');
		                txtGSMFrom5.setValue('');

		                txtGSMTo1.setValue('');
		                txtGSMTo2.setValue('');
		                txtGSMTo3.setValue('');
		                txtGSMTo4.setValue('');
		                txtGSMTo5.setValue('');

		                txtIncRate1.setValue('');
		                txtIncRate2.setValue('');
		                txtIncRate3.setValue('');
		                txtIncRate4.setValue('');

		                txtothershades.setValue('');
		                txtSheetRate.setValue('');
  		                txtGSMFrom.setValue('');
		                txtGSMTo.setValue('');
		areacode = selrow.get('rate_code');
		areagrpcode = selrow.get('rate_areacode');
		loadProdType.removeAll();
		loadProdType.load({
			url: 'ClsAreaPrice.php',
			params: {
			task: 'loadVariety_for_Customer',
			finid    : GinFinid,
			compcode : Gincompcode,
			custcode : custcode,   
			},
			callback: function () 
			{
                         cmbProductType.focus();              
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
        height: 400,
        width: 350,
        x: 148,
        y: 30,
        id : 'flxParty',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_area',sortable:true,width:60,align:'left'},   
		{header: "", dataIndex: 'rate_rategrp',sortable:true,width:60,align:'left'},  
		{header: "", dataIndex: 'cust_cr_days',sortable:true,width:60,align:'left'}, 
		{header: "", dataIndex: 'cust_grace_days',sortable:true,width:60,align:'left'}, 
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
	                      flx_change();

                        }
                     });
             },
        'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
 
                      flx_change();
		}
 
    
   }
   });


 var btnVerified = new Ext.Button({
	text: 'Verified',
	width: 80,
	height: 40,
	tooltip:'Click To Verify',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',


	    },

	listeners:{
 	click: function(){    
		Ext.Ajax.request({
               	url: 'CustomerPriceApproval.php',
                params:
		{

                       compcode  : Gincompcode,
                       finid     : GinFinid,   
                       usercode  : UserId,
                       apprno    : txtEntryNo.getValue(),
                       product   : cmbProductType.getValue(), 
                },
		callback: function (options, success, response)
                {
                  	var obj = Ext.decode(response.responseText);
                    	if (obj['success'] === "true") 
	                   {
//				Ext.MessageBox.alert("Alert","Price Verified and Saved ");

alert("Price Verified and Saved ");
   //                             MasSalesRatePanel.getForm().reset();
				Refresh();
                           }
                     	else 
                           {
                                  Ext.MessageBox.alert("Alert","Not Saved.. ");
                            
                    	   }
                  }   //loop z end
           });
         }
       }
  });

 var btnReverseVerified = new Ext.Button({
	text: 'Reverse Verified',
	width: 80,
	height: 40,
	tooltip:'Click To Reverse Verify',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',


	    },

	listeners:{
 	click: function(){    
		Ext.Ajax.request({
               	url: 'CustomerPriceApprovalRevese.php',
                params:
		{

                       compcode  : Gincompcode,
                       finid     : GinFinid,   
                       usercode  : UserId,
                       apprno    : txtEntryNo.getValue(),
                       product   : cmbProductType.getValue(), 
                },
		callback: function (options, success, response)
                {
                  	var obj = Ext.decode(response.responseText);
                    	if (obj['success'] === "true") 
	                   {
				Ext.MessageBox.alert("Alert","Price Verified Reversed ");
   //                             MasSalesRatePanel.getForm().reset();
			Refresh();
                           }
                     	else 
                           {
                                  Ext.MessageBox.alert("Alert","Not Reversed.. ");
                            
                    	   }
                  }   //loop z end
           });
         }
       }
  });

 var btnExit = new Ext.Button({
	text: 'Exit',
	width: 80,
	height: 40,
	tooltip:'Click To Exit',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                  MasSalesRateMasterApprovalWindow.hide();            
          }
       }
  })


 var btnRelease = new Ext.Button({
	text: 'R',
	width: 30,
	height: 30,
	tooltip:'Click To Exit',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                   btnVerified.setDisabled(false);  
                   btnReverseVerified.setDisabled(false);                             
          }
       }
  })


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:110,
    y:100,
    height: 280,
    hidden:false,
    width:950,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "SHADE", dataIndex:'shade', width:100,align:'center',sortable:false, menuDisabled: true},
       {header: "BF", dataIndex:'bf', width:50,align:'center',sortable:false, menuDisabled: true},
       {header: "FULL REEL", dataIndex:'fullreel', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BIT  REEL", dataIndex:'bitreel', width:80,align:'center',sortable:false, menuDisabled: true},
    ],
    store: [], //BFDataStore,

});


/*
var flxDetailPB = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:110,
    y:120,
    height: 270,
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

*/

var flxDetailPB = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 120,
    hidden:false,
    width:320,
    id: 'my-grid2',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Quality", dataIndex:'var_desc', width:140,align:'center',sortable:false, menuDisabled: true},
       {header: "Shade", dataIndex:'rate_shade', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "RATE", dataIndex:'rate_pb_rate', width:90,align:'center',sortable:false, menuDisabled: true},

    ],
    store: [], 

});


var dgrecordPB = Ext.data.Record.create([]);


var flxRateDetailKraft = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 250,
 
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:

    [
       {header: "Date", dataIndex:'date', width:90,align:'center',sortable:false, menuDisabled: true},
       {header: "Doc No", dataIndex:'Docno', width:60,align:'center',sortable:false, menuDisabled: true},
       {header: "Entered By", dataIndex:'entered', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Verified By", dataIndex:'verified', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Customer", dataIndex:'customer', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Product", dataIndex:'product', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "GSM FROM", dataIndex:'gsmfrom', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM TO", dataIndex:'gsmto', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR G.RATE", dataIndex:'gsmfrrate', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR G.RATE", dataIndex:'gsmbrrate', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 12BF", dataIndex:'fr12bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 14BF", dataIndex:'fr14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 16BF", dataIndex:'fr16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 18BF", dataIndex:'fr18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 20BF", dataIndex:'fr20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 22BF", dataIndex:'fr22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 24BF", dataIndex:'fr24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 26BF", dataIndex:'fr26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 28BF", dataIndex:'fr28bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 30BF", dataIndex:'fr30bf', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "BR 12BF", dataIndex:'br12bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 14BF", dataIndex:'br14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 16BF", dataIndex:'br16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 18BF", dataIndex:'br18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 20BF", dataIndex:'br20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 22BF", dataIndex:'br22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 24BF", dataIndex:'br24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 26BF", dataIndex:'br26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 28BF", dataIndex:'br28bf', width:80,align:'center',sortable:false, menuDisabled: true},
    ],
    store: [], //BFDataStore,
    listeners:{	
 

            'cellDblclick': function (flxRateDetail, rowIndex, cellIndex, e) {
             Ext.Msg.show({
             title: 'PRICE LIST PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxRateDetailKraft.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxRateDetailKraft.getSelectionModel().clearSelections();

		                cmbProductType.setRawValue(selrow.get('product'));
		                cmbProductType.setValue(selrow.get('prodcode'));



                                if (selrow.get('prodcode') == 14)
                                {
/*                
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
*/
                                }
                                else
                                {
                                gsmfrrate = selrow.get('gsmfrrate');

                                frbf12 = selrow.get('fr12bf');

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
                                brbf12 = selrow.get('br12bf');
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
				models[0].set('bf12', frbf12);
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
				models[1].set('bf12', brbf12);
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
/*
		           var sm = flxRateDetailKraft.getSelectionModel();
		           var selrow = sm.getSelected();
                           flxRateDetailKraft.getStore().remove(selrow);
		           flxRateDetailKraft.getSelectionModel().selectAll();
*/		     
		      }


             } 
        });
   }
   }

});





var flxRateDetailPaperBag = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 250,
 
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Date", dataIndex:'date', width:90,align:'center',sortable:false, menuDisabled: true},
       {header: "Doc No", dataIndex:'Docno', width:60,align:'center',sortable:false, menuDisabled: true},
       {header: "Entered By", dataIndex:'entered', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Verified By", dataIndex:'verified', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Customer", dataIndex:'customer', width:140,align:'left',sortable:false, menuDisabled: true},
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
				var sm = flxRateDetailKraft.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxRateDetailKraft.getSelectionModel().clearSelections();

		                cmbProductType.setRawValue(selrow.get('product'));
		                cmbProductType.setValue(selrow.get('prodcode'));



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
		           var sm = flxRateDetailKraft.getSelectionModel();
		           var selrow = sm.getSelected();
                           flxRateDetailKraft.getStore().remove(selrow);
		           flxRateDetailKraft.getSelectionModel().selectAll();
		     
		      }


             } 
        });
   }
   }

});


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsAreaPrice.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}


    var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType: 'password',
        width       :  150,
        border      : false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: '/SHVPM/clsuser.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'SALES',
		       subject  : 'SALES PRICE VERIFICATIONS',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
                             if (findorders == 0)
                             {
                                btnVerified.setDisabled(false);  
                                btnReverseVerified.setDisabled(false);  
                             }
                             else
                             {
                                btnVerified.setDisabled(true);  
                                btnReverseVerified.setDisabled(true);  
                                btnRelease.show();
                             }
  
                             btnVerified.focus();
                          }
                          else     
                          {   
                             alert("Password is Error. Please check ...");
                             btnVerified.setDisabled(true);   
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                      }           

                    }

                });   


                    }           

             }
          },

        } 
    });

var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        autocomplete :"off",
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();

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
                  if (txtCustomer.getRawValue() != '')
                  {   
                     flxParty.show(); 
                     PartySearch();
                  }    
            }
         }  
    });



   var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry Seq No.',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  70,
        readOnly    : true,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff", 
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

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


                  if (cmbProductType.getValue() != 14)
                  {  

                      flxDetailPB.hide();
                      flxDetail.show();
         //             Ext.getCmp('tabRate').setVisible(false);

                  }
                  else
                  {  
                      flxDetailPB.show();
                      flxDetail.hide();
           //           Ext.getCmp('tabRate').setVisible(true);


                  }


                    loadAreaRateDataStore.removeAll();
                    loadAreaRateDataStore.load({
	            url: 'ClsAreaPrice.php',
                    params: {
		       task: 'findCustomerRate',
		       finid    : GinFinid,
		       compcode : Gincompcode,
                       custcode : custcode, 
                       varcode  : cmbProductType.getValue(),  
                    },
                    callback: function () 
    	           {

                  txtPassword.focus();  


			  flxDetail.getStore().removeAll();
			  flxDetailPB.getStore().removeAll();
                          var cnt = loadAreaRateDataStore.getCount();

                          if (cnt > 0)
                          {           

                  
		                txtEntryNo.setValue(loadAreaRateDataStore.getAt(0).get('rate_code'));               
		                txtPriceTerms.setValue(loadAreaRateDataStore.getAt(0).get('rate_price_terms'));
		                txtGraceDays.setValue(loadAreaRateDataStore.getAt(0).get('rate_grace_days'));
		                txtRateDiff.setValue(loadAreaRateDataStore.getAt(0).get('rate_rate_difference'));
                	        cmbShade.setValue(loadAreaRateDataStore.getAt(0).get('rate_shade'));    

                          if (loadAreaRateDataStore.getAt(0).get('rate_approved') == "Y")
                             alert("Already Verified...")

                          for(var j=0; j<cnt; j++)
                          { 


                         

                         if (loadAreaRateDataStore.getAt(j).get('rate_vartype')  == 1 && loadAreaRateDataStore.getAt(j).get('rate_shade') != "GREY-BRD")
                         { 
 
		                txtGSMFrom1.setValue(loadAreaRateDataStore.getAt(j).get('rate_gsmfrom'));
		                txtGSMFrom2.setValue(loadAreaRateDataStore.getAt(j).get('rate2_gsmfrom'));
		                txtGSMFrom3.setValue(loadAreaRateDataStore.getAt(j).get('rate3_gsmfrom'));
		                txtGSMFrom4.setValue(loadAreaRateDataStore.getAt(j).get('rate4_gsmfrom'));
		                txtGSMFrom5.setValue(loadAreaRateDataStore.getAt(j).get('rate5_gsmfrom'));

		                txtGSMTo1.setValue(loadAreaRateDataStore.getAt(j).get('rate_gsmto'));
		                txtGSMTo2.setValue(loadAreaRateDataStore.getAt(j).get('rate2_gsmto'));
		                txtGSMTo3.setValue(loadAreaRateDataStore.getAt(j).get('rate3_gsmto'));
		                txtGSMTo4.setValue(loadAreaRateDataStore.getAt(j).get('rate4_gsmto'));
		                txtGSMTo5.setValue(loadAreaRateDataStore.getAt(j).get('rate5_gsmto'));

		                txtIncRate1.setValue(loadAreaRateDataStore.getAt(j).get('rate2_extraamt'));
		                txtIncRate2.setValue(loadAreaRateDataStore.getAt(j).get('rate3_extraamt'));
		                txtIncRate3.setValue(loadAreaRateDataStore.getAt(j).get('rate4_extraamt'));
		                txtIncRate4.setValue(loadAreaRateDataStore.getAt(j).get('rate5_extraamt'));

		                txtothershades.setValue(loadAreaRateDataStore.getAt(j).get('rate_othershades'));
		                txtSheetRate.setValue(loadAreaRateDataStore.getAt(j).get('rate_sheet_extraamt'));
                          }
                          else
                          {
txtGSMFrom.label.update(loadAreaRateDataStore.getAt(j).get('rate_shade') + " GSM FROM");
		                txtGSMFrom.setValue(loadAreaRateDataStore.getAt(j).get('rate_gsmfrom'));
		                txtGSMTo.setValue(loadAreaRateDataStore.getAt(j).get('rate_gsmto'));
		                txtSheetRate.setValue(loadAreaRateDataStore.getAt(j).get('rate_sheet_extraamt'));
                          }       

                          flxDetail.getSelectionModel().selectAll();
                          var selrows = flxDetail.getSelectionModel().getCount();
                          var sel = flxDetail.getSelectionModel().getSelections();
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_rate'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bitreel')) > 0 )
            {   

	                  var RowCnt = flxDetail.getStore().getCount() + 1;
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_rate')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bitreel')),
                          }));   
            }
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf12'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf12_bit')) > 0 )
            {   

	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '12', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf12')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf12_bit')),
                          }));   
            }
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf14'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf14_bit')) > 0 )
            {   

	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '14', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf14')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf14_bit')),
                          }));   
            }

            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf16'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf16_bit')) > 0 )
            {   
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
  			   bf         : '16', 
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf16')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf16_bit')),
                          }));   
             }    
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf18'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf18_bit')) > 0 )
            {   
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
  			   bf         : '18', 
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18_bit')),
                          }));
             }

            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf20'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf20_bit')) > 0 )
            {      
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '20', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20_bit')),
                          })); 
             }

            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf22'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf22_bit')) > 0 )
            {   
 
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '22', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22_bit')),
                          }));   
              }   

            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf24'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf24_bit')) > 0 )
            {  

	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '24', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24_bit')),
                          }));   
             }
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf26'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf26_bit')) > 0 )
            {  
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '26', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26_bit')),
                          }));   
             }
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf28'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf28_bit')) > 0 )
            { 

	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),  
  			   bf         : '28', 
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28_bit')),
                          }));   
             }
            if (Number(loadAreaRateDataStore.getAt(j).get('rate_bf30'))+Number(loadAreaRateDataStore.getAt(j).get('rate_bf30_bit')) > 0 )
            {  
	                  flxDetail.getStore().insert(
	                  flxDetail.getStore().getCount(),
	                  new dgrecord({
  			   bf         : '30',
			   shade      : loadAreaRateDataStore.getAt(j).get('rate_shade'),   
			   fullreel   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30')),  
			   bitreel    : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30_bit')),
                          }));   
             }   
//FOR PAPER BAG



	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   var_desc     : loadAreaRateDataStore.getAt(j).get('var_desc'), 
              		   rate_shade   : loadAreaRateDataStore.getAt(j).get('rate_shade'),   
         		   rate_pb_rate : Number(loadAreaRateDataStore.getAt(j).get('rate_pb_rate')), 
                          })); 


 
/*


	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '18', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf18gsm50')),  

                          }));   

	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '20', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf20gsm50')),  

                          }));   

	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '22', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf22gsm50')),  

                          }));   


	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '24', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf24gsm50')),  

                          }));   

	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '26', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf26gsm50')),  

                          }));   



	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '28', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf28gsm50')),  

                          }));   


	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '30', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf30gsm50')),  

                          }));   


	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '32', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf32gsm50')),  

                          }));   


	                  flxDetailPB.getStore().insert(
	                  flxDetailPB.getStore().getCount(),
	                  new dgrecord({
         		   bf      : '34', 
  			   gsm120  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm120')),  
			   gsm100  : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm100')),  
			   gsm90   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm90')),
  			   gsm80   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm80')),  
			   gsm70   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm70')),  
			   gsm60   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm60')),
  			   gsm50   : Number(loadAreaRateDataStore.getAt(j).get('rate_bf34gsm50')),  

                          }));   
*/

                                 }
                                }



                    loadSORaisedDataStore.removeAll();
                    loadSORaisedDataStore.load({
	            url: 'ClsAreaPrice.php',
                    params: {
		       task: 'findSORaised',
		       finid    : GinFinid,
		       compcode : Gincompcode,
                       apprno   : txtEntryNo.getValue(), 

                    },
                    callback: function () 
                    {
                          var cnt = loadSORaisedDataStore.getCount();
lblBlink.setText('');
                          if (cnt > 0)
                          { 
                            if (Number(loadSORaisedDataStore.getAt(0).get('ordh_sono')) > 0)
                            {
                                lblBlink.setText("SO: " + loadSORaisedDataStore.getAt(0).get('ordh_sono') + " Order entries Already made... You can't Reverse");
                                findorders = Number(loadSORaisedDataStore.getAt(0).get('ordh_sono'));
                            }         
                            else
                            {
                                findorders =0;
                                lblBlink.setText("");
                            }   
                          }          

                    }
                    });     



                    }

                });

                 }
        }
 });




var tabRate = new Ext.TabPanel({
    id          : 'tabRate',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 310,
    width       : 920,

        listeners: {
          'tabchange': function(tabPanel, tab) {

        }},
 
         items       : [

           {
            xtype: 'panel',
            title: 'KRAFT & OTHERS',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
              items: [

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 880,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [flxRateDetailKraft]

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
                             y           : 0,
                             border      : false,
                             items: [flxRateDetailPaperBag]
              }  
              ]
    
            },
      ] 
   });

   var MasSalesRatePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 820,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesRatePanel',
        method      : 'POST',
        layout      : 'absolute',
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 555,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 600,
                             x           : 0,
                             y           : 00,
                             border      : false,
                             items: [txtCustomer]

                    }, flxParty,	
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 420,
                             x           : 500,
                             y           : 0,
                             border      : false,
                             items: [txtPassword]

                    },
                    { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 420,
                           x           : 0,
                           y           : 40,
                           border      : false,
                           items: [cmbProductType]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 80,
                           width       : 250,
                           x           : 400,
                           y           : 40,
                           border      : false,
                           items: [cmbShade]
                   },

                    {
			    xtype       : 'fieldset',
			    x           : 600,
			    y           : 40,
                            labelWidth  : 140,
			    border      : false,
			    width       :850,
                            items : [txtPriceTerms]
   
                   },

                    {
			    xtype       : 'fieldset',
			    x           : 600,
			    y           : 70,
                            labelWidth  : 140,
			    border      : false,
			    width       :850,
                            items : [txtGraceDays]
   
                   },

                    {
			    xtype       : 'fieldset',
			    x           : 600,
			    y           : 110,
                            labelWidth  : 140,
			    border      : false,
			    width       :850,
                            items : [txtRateDiff]
   
                   },

                    {
			    xtype       : 'fieldset',
			    x           : 470,
			    y           : 160,
                            labelWidth  : 140,
			    border      : false,
			    width       :850,
                            items : [lblBlink]
   
                   },


                    { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 420,
                           x           : 0,
                           y           : 80,
                           border      : false,
                           items: [txtEntryNo]
                   },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 220,
                             x           : 0,
                             y           : 110,
                             border      : false,      
         
                             items: [txtGSMFrom1]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 70,
                             width       : 210,
                             x           : 210,
                             y           : 110,
                             border      : false,      
         
                             items: [txtGSMTo1]
                      },

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 220,
                           x           : 0,
                           y           : 150,
                           border      : false,
                           items: [txtGSMFrom]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 70,
                           width       : 200,
                           x           : 210,
                           y           : 150,
                           border      : false,
                           items: [txtGSMTo]
                   },

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 350,
                           x           : 10,
                           y           : 200,
                           border      : false,
                           items: [flxDetail]
                   },


                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 350,
                           x           : 10,
                           y           : 200,
                           border      : false,
                           items: [flxDetailPB]
                   },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 490,
                             border      : false,
                             items: [btnVerified]

                    },	
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 100,
                             y           : 490,
                             border      : false,
                             items: [btnReverseVerified]

                    },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 220,
                             y           : 490,
                             border      : false,
                             items: [btnExit]

                    },	



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 1250,
                             y           : 20,
                             border      : false,      
         
                             items: [btnRelease]
                      },


                ],


            } ,
   	     { xtype   : 'fieldset',
                title   : 'FOR KRAFT',
                 width       : 378,
                 height      : 215,
                 x           : 900,
                 y           : 15,
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
                             y           : -10,
                             border      : false,      
         
                             items: [lblrate]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 20,
                             border      : false,      
         
                             items: [txtGSMFrom2]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 20,
                             border      : false,      
         
                             items: [txtGSMTo2]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 20,
                             border      : false,      
         
                             items: [txtIncRate1]
                      },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 45,
                             border      : false,      
         
                             items: [txtGSMFrom3]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 45,
                             border      : false,      
         
                             items: [txtGSMTo3]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 45,
                             border      : false,      
         
                             items: [txtIncRate2]
                      },
	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 70,
                             border      : false,      
         
                             items: [txtGSMFrom4]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 70,
                             border      : false,      
         
                             items: [txtGSMTo4]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 70,
                             border      : false,      
         
                             items: [txtIncRate3]
                      },



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 95,
                             border      : false,      
         
                             items: [txtGSMFrom5]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 95,
                             border      : false,      
         
                             items: [txtGSMTo5]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 95,
                             border      : false,      
         
                             items: [txtIncRate4]
                      },




                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 120,
                             border      : false,      
         
                             items: [txtothershades]
                      },
                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 145,
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
		xtype   : 'fieldset',
               
                layout  : 'hbox',
                border  : true,
                height  : 330,
                width   : 920,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 380,
                y       : 230,
                items:[       
		    {
			                xtype: 'fieldset',
			                title: '',
			                labelWidth: 90,
			                width: 1350,
			                x: 5,
			                y: -10,
			                border: false,
			                items: [tabRate]
		     },

                ]
            }   



 

        ],

  });  





    function Refresh()
    {
         btnVerified.setDisabled(true);    
         btnReverseVerified.setDisabled(true);    
    
        flxParty.hide();
        txtEntryNo.setValue('');
        txtPriceTerms.setValue('');
        txtGraceDays.setValue('');
        cmbProductType.setRawValue('');
        txtCustomer.setValue('');
        txtRateDiff.setValue('');

	flxDetail.getStore().removeAll();
	flxDetailPB.getStore().removeAll();



        loadAreaRateDataStore.removeAll();
        loadProdType.removeAll();

	var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var RowCnt = flxDetail.getStore().getCount() + 1;
        

        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '12', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '14', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '16', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
         flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '18', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '20', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '22', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '24', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );    
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '26', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  

        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '28', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '30', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  
/*

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
*/



     Ext.getCmp('txtCustomer').focus(false, 200);

    }  



    function RefreshData()
    {
         btnVerified.setDisabled(true);    
         btnReverseVerified.setDisabled(true);    
    
        flxParty.hide();
        txtEntryNo.setValue('');
        txtPriceTerms.setValue('');
        cmbProductType.setRawValue('');
        txtCustomer.setValue('');

	flxDetail.getStore().removeAll();
	flxDetailPB.getStore().removeAll();



        loadAreaRateDataStore.removeAll();
        loadProdType.removeAll();

	var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var RowCnt = flxDetail.getStore().getCount() + 1;
        

        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '12', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '14', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '16', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
         flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '18', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        ); 
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '20', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '22', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '24', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );    
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '26', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  

        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '28', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  
        flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
           bf         : '30', 
           fullreel   : 0,  
           bitreel    : 0,
        })
        );  

/*
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

*/


             		loadALLCustomerListDataStore.load({
             		url: 'ClsAreaPrice.php',
			params: {
				    task: 'loadAllPriceMasterListCustomer',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                },
                       	callback:function()
				{

 				  flxRateDetailKraft.getStore().removeAll();
   
                                  var cnt = loadALLCustomerListDataStore.getCount();

                                  if (cnt > 0  )
                                  {                              
  
                                  for(var j=0; j<cnt; j++)
                                  { 
 
                if (loadALLCustomerListDataStore.getAt(j).get('rate_vartype') !=  14)
                {    
                                  flxRateDetailKraft.getSelectionModel().selectAll();
                                  var selrows = flxRateDetailKraft.getSelectionModel().getCount();
                                  var sel = flxRateDetailKraft.getSelectionModel().getSelections();
  
		                  var RowCnt = flxRateDetailKraft.getStore().getCount() + 1;
		                  flxRateDetailKraft.getStore().insert(
		                  flxRateDetailKraft.getStore().getCount(),
		                  new dgrecord({
				           date      : loadALLCustomerListDataStore.getAt(j).get('appr_date'),
					   Docno     : loadALLCustomerListDataStore.getAt(j).get('rate_code'),
				           entered   : loadALLCustomerListDataStore.getAt(j).get('enteredby'),
					   verified  : loadALLCustomerListDataStore.getAt(j).get('verifiedby'),
					   customer  : loadALLCustomerListDataStore.getAt(j).get('cust_ref'),	  
				           product   : loadALLCustomerListDataStore.getAt(j).get('vargrp_type_name'),
					   gsmfrom   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmfrom')), 
					   gsmto     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmto')), 
					   gsmfrrate : Number(loadALLCustomerListDataStore.getAt(j).get('rate_rate')), 
					   gsmbrrate : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bitreel')), 
					   fr14bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf14')), 
					   fr16bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf16')), 
					   fr18bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18')), 
					   fr20bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20')), 
					   fr22bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22')), 
					   fr24bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24')), 
					   fr26bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26')), 
					   fr28bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28')), 
					   fr30bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30')), 
					   br14bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf14_bit')), 
					   br16bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf16_bit')), 
					   br18bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18_bit')), 
					   br20bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20_bit')), 
					   br22bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22_bit')), 
					   br24bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24_bit')), 
					   br26bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26_bit')), 
					   br28bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28_bit')), 
					   br30bf    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30_bit')), 

					   ar1gsmfrom  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmfrom2')), 
					   ar1gsmto    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmto2')), 
					   ar1rate     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_extraamt2')), 
					   ar2gsmfrom  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmfrom3')), 
					   ar2gsmto    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmto3')), 
					   ar2rate     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_extraamt3')), 
					   ar3gsmfrom  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmfrom4')), 
					   ar3gsmto    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_gsmto4')), 
					   ar3rate     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_extraamt4')), 
				           othshade    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_othershades')), 
				           sheet    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_sheet_extraamt')), 

					   bf18_120    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm120')), 
					   bf18_100    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm100')), 
					   bf18_90     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm90')), 
					   bf18_80     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm80')), 
					   bf18_70     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm70')), 
					   bf18_60     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm60')), 
					   bf18_50     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm50')), 

					   bf20_120    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm120')), 
					   bf20_100    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm100')), 
					   bf20_90     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm90')), 
					   bf20_80     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm80')), 
					   bf20_70     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm70')), 
					   bf20_60     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm60')), 
					   bf20_50     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm50')), 
	
					   bf22_120    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm120')), 
					   bf22_100    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm100')),
					   bf22_90     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm90')),
					   bf22_80     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm80')),
					   bf22_70     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm70')),
					   bf22_60     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm60')),
					   bf22_50     : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm50')),


					   bf24_120   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm120')), 
					   bf24_100   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm100')), 
					   bf24_90    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm90')), 
					   bf24_80    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm80')), 
					   bf24_70    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm70')), 
					   bf24_60    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm60')), 
					   bf24_50    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm50')), 

					   bf26_120   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm120')), 
					   bf26_100   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm100')), 
					   bf26_90    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm90')), 
					   bf26_80    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm80')), 
					   bf26_70    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm70')), 
					   bf26_60    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm60')), 
					   bf26_50    : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm50')), 

					   bf28_120  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm120')), 
					   bf28_100  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm100')), 
					   bf28_90   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm90')), 
					   bf28_80   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm80')), 
					   bf28_70   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm70')), 
					   bf28_60   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm60')), 
					   bf28_50   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm50')), 


					   bf30_120  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm120')), 
					   bf30_100  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm100')), 
					   bf30_90   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm90')), 
					   bf30_80   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm80')), 
					   bf30_70   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm70')), 
					   bf30_60   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm60')), 
					   bf30_50   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm50')), 

					   bf32_120  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm120')), 
					   bf32_100  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm100')), 
					   bf32_90   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm90')), 
					   bf32_80   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm80')), 
					   bf32_70   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm70')), 
					   bf32_60   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm60')), 
					   bf32_50   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm50')),

					   bf34_120  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm120')), 
					   bf34_100  : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm100')), 
					   bf34_90   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm90')), 
					   bf34_80   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm80')), 
					   bf34_70   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm70')), 
					   bf34_60   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm60')), 
					   bf34_50   : Number(loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm50')), 

		                     }) 
		                    );
                                  }
                                    
// for Paper Bag       
                                  else
                                  {

/*

				  flxRateDetailPaperBag.getStore().removeAll();
				  var selrows2 = flxRateDetailPaperBag.getSelectionModel().getCount();
			          var sel2 = flxRateDetailPaperBag.getSelectionModel().getSelections();
                                  var RowCnt2 = flxRateDetailPaperBag.getStore().getCount() + 1;

				flxRateDetailPaperBag.getStore().insert(
				flxRateDetailPaperBag.getStore().getCount(),
				   new dgrecord({

	                              date      : loadALLCustomerListDataStore.getAt(j).get('appr_date'),
				      Docno     : loadALLCustomerListDataStore.getAt(j).get('rate_code'),
				      entered   : loadALLCustomerListDataStore.getAt(j).get('enteredby'),
				      verified  : loadALLCustomerListDataStore.getAt(j).get('verifiedby'),
				      customer  : loadALLCustomerListDataStore.getAt(j).get('cust_ref'),  
				      product   : loadALLCustomerListDataStore.getAt(j).get('vargrp_type_name'), 
				      bf18_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm120'),
				      bf18_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm100'),
				      bf18_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm90'),
				      bf18_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm80'),
				      bf18_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm70'),
				      bf18_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm60'),
				      bf18_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf18gsm50'),

				      bf20_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm120'),
				      bf20_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm100'),
				      bf20_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm90'),
				      bf20_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm80'),
				      bf20_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm70'),
				      bf20_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm60'),
				      bf20_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf20gsm50'),
				      bf22_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm120'),
				      bf22_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm100'),
				      bf22_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm90'),
				      bf22_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm80'),
				      bf22_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm70'),
				      bf22_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm60'),
				      bf22_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf22gsm50'),
				      bf24_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm120'),
				      bf24_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm100'),
				      bf24_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm90'),
				      bf24_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm80'),
				      bf24_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm70'),
				      bf24_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm60'),
				      bf24_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf24gsm50'),

				      bf24_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm120'),
				      bf26_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm100'),
				      bf26_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm90'),
				      bf26_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm80'),
				      bf26_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm70'),
				      bf26_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm60'),
				      bf26_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf26gsm50'),
				      bf28_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm120'),
				      bf28_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm100'),
				      bf28_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm90'),
				      bf28_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm80'),
				      bf28_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm70'),
				      bf28_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm60'),
				      bf28_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf28gsm50'),

				      bf30_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm120'),
				      bf30_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm100'),
				      bf30_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm90'),
				      bf30_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm80'),
				      bf30_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm70'),
				      bf30_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm60'),
				      bf30_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf30gsm50'),

				      bf32_120  : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm120'),
				      bf32_100  : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm100'),
				      bf32_90   : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm90'),
				      bf32_80   : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm80'),
				      bf32_70   : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm70'),
				      bf32_60   : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm60'),
				      bf32_50   : loadALLCustomerListDataStore.getAt(j).get('rate_bf32gsm50'),
		
				      bf34_120     : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm120'),
				      bf34_100     : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm100'),
				      bf34_90      : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm90'),
				      bf34_80      : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm80'),
				      bf34_70      : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm70'),
				      bf34_60      : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm60'),
				      bf34_50      : loadALLCustomerListDataStore.getAt(j).get('rate_bf34gsm50'),
				   })
				); 

     */              

                                   }
		                  }


                                  } 


                                  }
                         });


Ext.getCmp('txtCustomer').focus(false, 200);

    }  



    var MasSalesRateMasterApprovalWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//        x           : 50,
        y           : 35,
        title       : 'SALES - CUSTOMR WISE PRICE MASTER - Accounts Verification',
        items       : MasSalesRatePanel,
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
                   flxDetailPB.hide();
                   btnRelease.hide();

                 }


      }
    });
    MasSalesRateMasterApprovalWindow.show();  
});
