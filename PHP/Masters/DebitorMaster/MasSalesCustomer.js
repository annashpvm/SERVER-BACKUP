Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');



var GinUser = localStorage.getItem('gstuser');

var GinUserid = localStorage.getItem('ginuserid');
var GinUserType = localStorage.getItem('ginusertype');


  var printtype='PDF';

var cmbGSTtype = new Ext.form.ComboBox({
        fieldLabel      : 'GST TYPE',
        width           :  150,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbGSTtype',
        typeAhead       : true,
        mode            : 'local',
        store           : [['R','REGISTERED'],['U','UN REGISTERED']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        value           : 'R',
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
});

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
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

var gstStatus = "N";
//var Hdeptname = 'IT DEPARTMENT';
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var saveflag = "Add";
var custcode = 0;
var reprcode = 0;
var custgrp = 0;

var btnDistanceUpdate = new Ext.Button({
    id      : 'btnDistanceUpdate',
    style   : 'text-align:center;',
    text    : " UPDATE",
    tooltip : 'Distance UPDATE',
    width   :  50,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
             if (txtSMSNo.getRawValue() == "")
             {
                 alert("SMS Number is Empty.. ");
             }           
             else
             {
		      Ext.Ajax.request({
		      url: 'MasCustomerDistanceUpdate.php',
		      params :
		      {
		                party    : custcode,
                                roaddist : txtDistance.getValue(),

		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Road Distance -Updated "); 
//                         TrnSalesInvoicePanel.getForm().reset();
//                         RefreshData();

		      }
                      }); 
            }
       }
   }
}); 


var findRepCode = new Ext.data.Store({
      id: 'findRepCode',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findRepCode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'repr_accgrp' 
      ]),
    });


var loadsalcustlistdatastore = new Ext.data.Store({
      id: 'loadsalcustlistdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalcustlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days',  'cust_grace_days',  'cust_repr', 'cust_panno','cust_gstin','cust_dealer','cust_smsno','cust_group','cust_partygroup','cust_distance','area_name','area_code',
'grp_name','grp_code','usr_name' , 'createddate','repr_accgrp'
      ]),
    });
/*
 var loadsalledgerlistdatastore = new Ext.data.Store({
      id: 'loadsalledgerlistdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalledgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'led_code', 'led_comp_code', 'led_name', 'led_addr1', 'led_addr2', 'led_city', 'led_grp_code', 'led_prefix', 'led_create_dept', 'led_status', 'led_duplicate', 'led_TinNo', 'led_gst_no', 'led_pan_no', 'led_type', 'led_custcode'
 
      ]),
    });
*/


 var loadAreaDataStore = new Ext.data.Store({
      id: 'loadAreaDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'area_code','area_name'
 
      ]),
    });


 var loadsalesstatedatastore = new Ext.data.Store({
      id: 'loadsalesstatedatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesstate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'state_code', 'state_name', 'state_codeno'
 
      ]),
    });


 var loadsalescountrydatastore = new Ext.data.Store({
      id: 'loadsalescountrydatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalescountry"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'country_code', 'country_name'
 
      ]),
    });


 var loadDealerdatastore = new Ext.data.Store({
      id: 'loadDealerdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDealer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'dealer_code', 'dealer_name'
 
      ]),
    });


 var loadsalestaxdatastore = new Ext.data.Store({
      id: 'loadsalestaxdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalestax"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_code','tax_name'
 
      ]),
    });

/*
 var loadsalesagentdatastore = new Ext.data.Store({
      id: 'loadsalesagentdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesagent"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code','cust_ref'
 
      ]),
    });
*/


 var loadsalesreprdatastore = new Ext.data.Store({
      id: 'loadsalesreprdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesrepr"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'repr_code', 'repr_name'
 
      ]),
    });


/*
 var loadsalesagentgrpdatastore = new Ext.data.Store({
      id: 'loadsalesagentgrpdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesagentgrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'cust_code', 'cust_ref'
 
      ]),
    });

*/


 var loadACgroupdatastore = new Ext.data.Store({
      id: 'loadACgroupdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"Loadaccountsgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'grp_code','grp_name'
 
      ]),
    });


 var loadCustgroupDatastore = new Ext.data.Store({
      id: 'loadCustgroupDatastore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalespartygrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'cust_partygroup', 'cust_group'
 
      ]),
    });




//var gstGroup;
//OUT SIDE

var btnGO = new Ext.Button({
    style   : 'text-align:center;',
    text    : "WEB SITE",
    width   : 40,
    height  : 25,
    x       : 890,
    y       : 160,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){     
       //    window.location.href=('https://services.gst.gov.in/services/searchtp');      

           window.open('https://services.gst.gov.in/services/searchtp','_blank');      
	}
  }

});





var txtsalrefname = new Ext.form.TextField({
	fieldLabel  : 'REF NAME',
	id          : 'txtsalrefname',
	name        : 'txtsalrefname',
	width       :  350,
	store       : loadsalcustlistdatastore,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'80'},
   	
    	listeners : {

            keyup: function () {
/*                 
			txtsalcustaddress1.setValue('');
			txtsalcustaddress2.setValue('');
			txtsalcustaddress3.setValue('');
			txtsalcustcity.setValue('');
			cmbsalcuststate.setValue('');
			cmbsalcustcountry.setValue('');
			txtsalcustpincode.setValue('');
			txtsalcustphone.setValue('');
			txtsalcustgstno.setValue('');
			txtsalcustpanno.setValue('');
			txtsalcustfax.setValue('');
			txtsalcustemail.setValue('');
			txtsalcustweb.setValue('');
			cmbGST.setValue('');
				txtsalPaymentTerms.setValue('');
				txtsalcustcreditlimit.setValue('');
			txtsalcustgraceday.setValue('');
			cmbsalcustagentname.setValue('');
			cmbSalesRep.setValue('');
			cmbsalcustpartygrp.setValue('');
			txtsalcustcontper.setValue('');
			cmbsalcusttype.setValue('');
			txtsalcustrnino.setValue('');
			cmbsalcustagentgrp.setValue('');
*/

                   flxSalesCustDetail.getStore().filter('cust_ref', txtsalrefname.getValue());    
            }

    		/*keyup : function () {
    		if (txtsalrefname.getValue() == "") {
				 loadsalledgerlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalledgerlist"


                        	 }
				 });  
				 } 		
    			flxSalesCustDetail.getStore().filter('cust_ref', txtsalrefname.getValue());  
    			flxSalesLedgerDetail.getStore().filter('led_name', txtsalrefname.getValue());  
    			
    		}*/
    	}


});
var txtsalcustname = new Ext.form.TextField({
	fieldLabel  : 'CUSTOMER NAME',
	id          : 'txtsalcustname',
	name        : 'txtsalcustname',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
  

});
var txtsalcustgstno = new Ext.form.TextField({
	fieldLabel  : 'GST I.No',
	id          : 'txtsalcustgstno',
	name        : 'txtsalcustgstno',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},
  
	listeners:{
  
        keyup:function(){
//alert(gstno.substring(3);
              txtsalcustpanno.setValue(txtsalcustgstno.getValue().substring(2,12));
   
        },
	}


});
var txtsalcustpanno = new Ext.form.TextField({
	fieldLabel  : 'PAN No',
	id          : 'txtsalcustpanno',
	name        : 'txtsalcustpanno',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtsalcustaddress1 = new Ext.form.TextField({
	fieldLabel  : 'ADDRESS',
	id          : 'txtsalcustaddress1',
	name        : 'txtsalcustaddress1',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
   

});
var txtsalcustaddress2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtsalcustaddress2',
	name        : 'txtsalcustaddress2',
	width       :  220,
	style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
  

});
var txtsalcustaddress3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtsalcustaddress3',
	name        : 'txtsalcustaddress3',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
  

});
var txtsalcustcity = new Ext.form.TextField({
	fieldLabel  : 'CITY',
	id          : 'txtsalcustcity',
	name        : 'txtsalcustcity',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
 
var cmbsalcuststate = new Ext.form.ComboBox({
        fieldLabel      : 'STATE',
        width       :  220,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbsalcuststate',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalesstatedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",  

	listeners:{
        select: function(){



//alert(loadsalesstatedatastore.getAt(0).get('state_code'));

//               if ( loadsalesstatedatastore.getAt(0).get('state_code') == 24)
              if (cmbsalcuststate.getRawValue() == "TAMIL NADU")
               { 
                cmbGST.setValue('2');         
               }
               else
               {
                cmbGST.setValue('1');         
               }     
	},

      blur:function(){
              if (cmbsalcuststate.getRawValue() == "TAMIL NADU")
               { 
                cmbGST.setValue('2');         
               }
               else
               {
                cmbGST.setValue('1');         
               }     
      }  

	}
});  



var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area Group',
        width       :  220,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAreaDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",  

	listeners:{
        select: function(){

  
	}
	}
}); 

var cmbsalcustcountry = new Ext.form.ComboBox({
        fieldLabel      : 'COUNTRY',
        width       :  220,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbsalcustcountry',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalescountrydatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
}); 


var cmbDealer = new Ext.form.ComboBox({
        fieldLabel      : 'DEALER',
        width           :  320,
        displayField    : 'dealer_name', 
        valueField      : 'dealer_code',
        hiddenName      : '',
        id              : 'cmbDealer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDealerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
}); 

var txtsalcustpincode = new Ext.form.NumberField({
	fieldLabel  : 'PIN CODE',
	id          : 'txtsalcustpincode',
	name        : 'txtsalcustpincode',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},

});

var txtDistance = new Ext.form.NumberField({
	fieldLabel  : 'Road Distance',
	id          : 'txtDistance',
	name        : 'txtDistance',
	width       :  60,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},

});

var txtsalcustphone = new Ext.form.TextField({
	fieldLabel  : 'PHONE',
	id          : 'txtsalcustphone',
	name        : 'txtsalcustphone',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtsalcustemail = new Ext.form.TextField({
	fieldLabel  : 'EMAIL ID',
	id          : 'txtsalcustemail',
	name        : 'txtsalcustemail',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtsalcustweb = new Ext.form.TextField({
	fieldLabel  : 'WEB ADDRESS',
	id          : 'txtsalcustweb',
	name        : 'txtsalcustweb',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var cmbGST = new Ext.form.ComboBox({
        fieldLabel      : 'GST TYPE',
        width           :  220,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbGST',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalestaxdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
}); 
var txtsalPaymentTerms = new Ext.form.NumberField({
	fieldLabel  : 'PAYMENT TERMS',
	id          : 'txtsalPaymentTerms',
	name        : 'txtsalPaymentTerms',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 

var txtsalGraceDays = new Ext.form.NumberField({
	fieldLabel  : 'GRACE DAYS',
	id          : 'txtsalGraceDays',
	name        : 'txtsalGraceDays',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 

var txtSMSNo = new Ext.form.NumberField({
	fieldLabel  : 'SMS No',
	id          : 'txtSMSNo',
	name        : 'txtSMSNo',
	width       :  120,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'10'},

});
var cmbCustGroup = new Ext.form.ComboBox({
        fieldLabel      : 'CUSTOMER GROUP',
        width           :  320,
        displayField    : 'cust_group', 
        valueField      : 'cust_partygroup',
        hiddenName      : '',
        id              : 'cmbCustGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadCustgroupDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
	select: function(){
              custgrp = cmbCustGroup.getValue();
	}
        }
}); 

var cmbAccGrp = new Ext.form.ComboBox({
        fieldLabel      : 'A/C GROUP',
        width           :  320,
        displayField    : 'grp_name', 
        valueField      : 'grp_code',
        hiddenName      : '',
        id              : 'cmbAccGrp',
        typeAhead       : true,
        mode            : 'local',
        store           : loadACgroupdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
}); 

/*
var txtsalcustcreditlimit = new Ext.form.NumberField({
	fieldLabel  : 'CREDIT LIMIT',
	id          : 'txtsalcustcreditlimit',
	name        : 'txtsalcustcreditlimit',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
*/

var cmbSalesRep = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbSalesRep',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalesreprdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

                repcode = 0;
                findRepCode.removeAll();
        
                findRepCode.load({
                    url: 'ClsMasSalesCustomer.php', // File to connect to
                    params:
                            {
                                task: "findRepCode",
                                repcode:cmbSalesRep.getValue()
                            },
                    callback: function () {
                        var cnt = findRepCode.getCount(); 
                        if (cnt > 0) {
                           reprcode = findRepCode.getAt(0).get('repr_accgrp');
                        }
                   }  
                });
        

	}
	}
}); 

var txtsalcustcontper = new Ext.form.TextField({
	fieldLabel  : 'CONTACT PERSON',
	id          : 'txtsalcustcontper',
	name        : 'txtsalcustcontper',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
 /*
var cmbsalcustagentgrp = new Ext.form.ComboBox({
        fieldLabel      : 'AGENT GROUP',
        width           : 220,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbsalcustagentgrp',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalesagentgrpdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
});

*/
   var dgrecord = Ext.data.Record.create([]);
   var flxSalesCustDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1230,
        x: 20,
        y: 320,
             
        columns: [    
            {header: "Customer code", Id: 'cust_code', sortable:true,width:50,align:'left', hidden:'true'},       
            {header: "Customer ledger code", Id: 'cust_led_code', sortable:true,width:50,align:'left', hidden:'true'},
            {header: "Ref Name",  Id: 'cust_ref', sortable:true,width:200,align:'left'}, 
            {header: "Customer Name",Id: 'cust_name', sortable:true,width:250,align:'left'},                  
            {header: "Address1",Id: 'cust_add1', sortable:true,width:200,align:'left'},
            {header: "Address2",Id: 'cust_add2', sortable:true,width:200,align:'left'},
            {header: "Address3",Id: 'cust_add3', sortable:true,width:200,align:'left'},
            {header: "City",Id: 'cust_city', sortable:true,width:100,align:'left'},
            {header: "State",Id: 'cust_state', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "Country",Id: 'cust_country', sortable:true,width:80,align:'left', hidden:'true'},
            {header: "Pincode",Id: 'cust_zip', sortable:true,width:70,align:'left'},
            {header: "Phone",Id: 'cust_phone', sortable:true,width:100,align:'left'},
            {header: "Email ID",Id: 'cust_email', sortable:true,width:200,align:'left'},
            {header: "WEB Address",Id: 'cust_web', sortable:true,width:150,align:'left'},
            {header: "Contact Person",Id: 'cust_contact', sortable:true,width:100,align:'left'},          
            {header: "TAX Code",Id: 'cust_taxtag', sortable:true,width:80,align:'left'},
            {header: "Pay Terms",Id: 'cust_cr_days', sortable:true,width:80,align:'left'},   
            {header: "Grace Days",Id: 'cust_grace_days', sortable:true,width:80,align:'left'},
            {header: "Rep.",Id: 'cust_repr', sortable:true,width:100,align:'left'},
            {header: "PAN No",Id: 'cust_panno', sortable:true,width:120,align:'left'},
            {header: "GST No",Id: 'cust_gstin', sortable:true,width:120,align:'left'},
            {header: "Dealer",Id: 'cust_dealer', sortable:true,width:120,align:'left'},
            {header: "SMS No",Id: 'cust_smsno', sortable:true,width:120,align:'left'},
	    {header: "Customer Group",Id: 'cust_group', sortable:true,width:120,align:'left'},
	    {header: "Customer Group Code",Id: 'cust_partygroup', sortable:true,width:120,align:'left'},
	    {header: "Road Dist",Id: 'cust_distance', sortable:true,width:120,align:'left'},
	    {header: "Area Group",Id: 'area_name', sortable:true,width:120,align:'left'},
	    {header: "Area Code",Id: 'area_code', sortable:true,width:120,align:'left'},
	    {header: "A/C Group",Id: 'grp_name', sortable:true,width:120,align:'left'},
	    {header: "A/C grpCode",Id: 'grp_code', sortable:true,width:120,align:'left'},
	    {header: "Created By",Id: 'usr_name', sortable:true,width:120,align:'left'},
	    {header: "Created On",Id: 'createddate', sortable:true,width:120,align:'left'},
	    {header: "repcode",Id: 'repr_accgrp', sortable:true,width:120,align:'left', hidden:'true'},


        ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('cust_ref') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtsalrefname.getValue()) {
    return 'cust_ref'
    }
}
},
store:loadsalcustlistdatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxSalesCustDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
			


                        saveflag = "Edit";
			custcode = selrow.get('cust_code');
			txtsalrefname.setValue(selrow.get('cust_ref'));
			txtsalcustname.setValue(selrow.get('cust_name'));
			txtsalcustaddress1.setValue(selrow.get('cust_add1'));
			txtsalcustaddress2.setValue(selrow.get('cust_add2'));
			txtsalcustaddress3.setValue(selrow.get('cust_add3'));
			txtsalcustcity.setValue(selrow.get('cust_city'));
			cmbsalcuststate.setValue(selrow.get('cust_state'));
			cmbsalcustcountry.setValue(selrow.get('cust_country'));
			txtsalcustpincode.setValue(selrow.get('cust_zip'));
			txtsalcustphone.setValue(selrow.get('cust_phone'));
			txtsalcustgstno.setValue(selrow.get('cust_gstin'));
			txtsalcustpanno.setValue(selrow.get('cust_panno'));
		
			txtsalcustemail.setValue(selrow.get('cust_email'));
			txtsalcustweb.setValue(selrow.get('cust_web'));
			cmbGST.setValue(selrow.get('cust_taxtag'));
			txtsalPaymentTerms.setValue(selrow.get('cust_cr_days'));
			txtsalGraceDays.setValue(selrow.get('cust_grace_days'));
	
          		txtSMSNo.setValue(selrow.get('cust_smsno'));
			cmbSalesRep.setValue(selrow.get('cust_repr'));
                	cmbDealer.setValue(selrow.get('cust_dealer'));
                	cmbCustGroup.setValue(selrow.get('cust_partygroup'));
                	cmbArea.setValue(selrow.get('area_code'));

			txtsalcustcontper.setValue(selrow.get('cust_contact'));
			txtDistance.setValue(selrow.get('cust_distance'));

                        cmbAccGrp.setValue(selrow.get('grp_code'));

                        reprcode = selrow.get('repr_accgrp');
           		var cledcode = selrow.get('cust_led_code');
/*
	loadsalledgerlistdatastore.removeAll();
	loadsalledgerlistdatastore.load({
		url: 'ClsMasSalesCustomer.php', 
		params:
		{
			task:"loadsalledgerlist",
			ledcode: cledcode,
			cusled :"Y"
		},
		callback : function() {
			
		}
	});
*/
			flxSalesCustDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });

var dgrecord = Ext.data.Record.create([]);
/*
var flxSalesLedgerDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 260,
        width: 200,
        x: 1050,
        y: 40,        
        columns: [   
            {header: "LEDGER Code", Id: 'led_code',sortable:true,width:100,align:'left',hidden:'true'},       
            {header: "LEDGER Comp Code", Id: 'led_comp_code',sortable:true,width:200,align:'left',hidden:'true'},
            {header: "LEDGER Name", Id: 'led_name',sortable:true,width:200,align:'left'},
            {header: "Address1", Id: 'led_addr1',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "Address2", Id: 'led_addr2',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "City", Id: 'led_city',sortable:true,width:80,align:'left'},
            {header: "GROUP Code", Id: 'led_grp_code',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Prefix", Id: 'led_prefix',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Create Dept", Id: 'led_create_dept',sortable:true,width:80,align:'left'},
            {header: "Status", Id: 'led_status',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "Duplicate", Id: 'led_duplicate',sortable:true,width:120,align:'left',hidden:'true'},
             {header: "GST No", Id: 'led_gst_no',sortable:true,width:120,align:'left'},
            {header: "PAN No", Id: 'led_pan_no',sortable:true,width:120,align:'left'},
            {header: "TYPE", Id: 'led_type',sortable:true,width:50,align:'left'},
            {header: "Customer Code", Id: 'led_custcode',sortable:true,width:100,align:'left',hidden:'true'},

        ],
store:loadsalledgerlistdatastore,

    

   });
*/
       
var MasSalesCustomerFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 700,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesCustomerFormpanel',
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

                                saveflag = "Add";
				MasSalesCustomerFormpanel.getForm().reset();
				RefreshData();
			
		        }
		    }
		},'-',
		{
		    text: 'Edit',
		    style  : 'text-align:center;',
		    tooltip: 'Modify Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {
                                saveflag = "Edit";
				RefreshData();

		        }
		    }
		},'-',                
		{
//save
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {


                        var gstSave;

                    gstSave="true";

                    if (txtsalrefname.getRawValue()==0 || txtsalrefname.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Customer Reference is Empty.....');
                        gstSave="false";
                    }
                    else if (cmbsalcuststate.getValue()== 24  &&  txtsalcustgstno.getValue().substring(0,2) != "33")
                    {
                        Ext.Msg.alert('Sales','Error in GST No.!.. Pleae Check STATE and GST Number..');
                        gstSave="false";
                    }
                  /*  else if (txtsalcustgstno.getRawValue().length != 15)
                    {
                        Ext.Msg.alert('Sales','Error in GST Number....');
                        gstSave="false";
                    }   */                 

                    else if (cmbsalcuststate.getValue() != 24  &&  txtsalcustgstno.getValue().substring(0,2) == "33")
                    {
                        Ext.Msg.alert('Sales','Error in GST No.!.. Pleae Check STATE and GST Number..');
                        gstSave="false";
                    }                    

                    else if (txtsalcustname.getRawValue()==0 || txtsalcustname.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Cusotmer Name is empty.....');
                        gstSave="false";
                    }

                    else if (txtsalcustaddress1.getRawValue()==0 || txtsalcustaddress1.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Cusotmer Address line 1  is empty.....');
                        gstSave="false";
                    }

                    else if (txtsalcustaddress2.getRawValue()==0 || txtsalcustaddress2.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Cusotmer Address line 2 is empty.....');
                        gstSave="false";
                    }


                    else if (cmbsalcuststate.getValue()==0 || cmbsalcuststate.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Select State .....');
                        gstSave="false";

                    }

                    else if (cmbsalcustcountry.getValue()==0 || cmbsalcustcountry.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Select Country .....');
                        gstSave="false";
                    }

                   else if (cmbArea.getValue()==0 || cmbArea.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Select Customer Area Group .....');
                        gstSave="false";
                    }


                    else if (cmbGST.getValue()==0 || cmbGST.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Select Sales GST....');
                        gstSave="false";
                    }

                    else if (cmbDealer.getValue()==0 || cmbDealer.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Select Dealer Name....');
                        gstSave="false";
                    }
                    else if (txtsalcustphone.getValue()==0 || txtsalcustphone.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Enter Phone Number.....');
                        gstSave="false";
                    }
                    else if (txtSMSNo.getValue()==0 || txtSMSNo.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Enter SMS Number.....');
                        gstSave="false";
                    }
                    else if (txtsalPaymentTerms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales','Enter Credit Days.....');
                        gstSave="false";
                    }
                    else if (reprcode  == 0)
                    {
                        Ext.Msg.alert('Sales','Select Representaive Name.....');
                        gstSave="false";
                    }

                    else if (cmbAccGrp.getValue()==0 || cmbAccGrp.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select Account Group....');
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

                           
//                            var invData = flxDetail.getStore().getRange();                                        
//                            var poupdData = new Array();
//                            Ext.each(invData, function (record) {
//                                poupdData.push(record.data);
//                            });

                            Ext.Ajax.request({
                            url: 'MasSalesCustomerSave.php',

                            params :
                             {
//				griddet: Ext.util.JSON.encode(poupdData),     
//			        cnt: invData.length  ,

//SAVE
                                compcode        : Gincompcode,
                                finid           : GinFinid,

                                savetype    : saveflag,
				custcode    : custcode,
				custref     : txtsalrefname.getValue(),
				custname    : txtsalcustname.getValue(),
				custadd1    : txtsalcustaddress1.getValue(),
				custadd2    : txtsalcustaddress2.getValue(),
				custadd3    : txtsalcustaddress3.getValue(),
				custcity    : txtsalcustcity.getValue(),
				custstate   : cmbsalcuststate.getValue(),
				custcountry : cmbsalcustcountry.getValue(),
				custzip     : txtsalcustpincode.getValue(),
				custphone   : txtsalcustphone.getValue(),
			
				custemail   : txtsalcustemail.getValue(), 
				custweb     : txtsalcustweb.getValue(),
				custcontact : txtsalcustcontper.getValue(),

				custtaxtag  : cmbGST.getValue(),
				custcrdays  : txtsalPaymentTerms.getValue(),
		
                		custgrdays : txtsalGraceDays.getValue(),
		
				custrepr    : cmbSalesRep.getValue(),
                  		custdealer    : cmbDealer.getValue(),
		
           		        cust_gst_type : cmbGSTtype.getValue(),
				custpanno   : txtsalcustpanno.getValue(),

				custgstin   : txtsalcustgstno.getValue(),
                                custsmsno   : txtSMSNo.getValue(),   
                                custgroup   : custgrp, 
                                distance    : txtDistance.getValue(), 
                                addnlwt     : 'N',     
                                accrepgrp   : reprcode,  
                                usercode    : GinUserid,
		                custArea    : cmbArea.getValue(),
		                accgrp     : cmbAccGrp.getValue(),
  
				},
                              callback: function(options, success, response)
                              {
//alert("Test");
//alert(Reels);
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Sales Customer Created  -" + obj['custcode']);
                                    MasSalesCustomerFormpanel.getForm().reset();
                                    RefreshData();
                                  }else
				{
                   			if(obj['cnt']>0)
					{
                                            Ext.MessageBox.alert("Alert","Already Same Name exists.. ");
					}
					else
					{
                                             Ext.MessageBox.alert("Alert","Record Not Saved.. ");
					}                                               
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
	            tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/refresh.png',
	            listeners:{
	                click: function () {
	                    RefreshData();
	                }
	            }
	        },'-',


		{
		    text: 'PRINT ADDRESS',
		    style  : 'text-align:center;',
		    tooltip: 'Print Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {

    		var p1 = "&custcode=" + encodeURIComponent(custcode);
		var param = (p1) ;
                if (printtype  == "PDF")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepCustomerPrint.rptdesign&__format=PDF&' + param, '_blank');
                else
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepCustomerPrint.rptdesign&' + param, '_blank');
     


		        }
		    }
		},'-',   

		{
		    text: 'PRINT ALL ADDRESS',
		    style  : 'text-align:center;',
		    tooltip: 'Print Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {

		var p1 = "&custcode=" + encodeURIComponent(0);
		var param = (p1) ;
                if (printtype  == "PDF")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAllCustomerList.rptdesign&__format=PDF&' + param, '_blank');
                else
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAllCustomerList.rptdesign&' + param, '_blank');


		        }
		    }
		},'-',   

	        {
	            text: 'Exit',
	            style  : 'text-align:center;',
	            tooltip: 'Close...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				MasSalesCustomer.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [

		       
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 500,
                        x           : 10,
                        y           : 0,
                        border      : false,
                        items: [txtsalrefname]
                       },



                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 30,
                        border      : false,
                        items: [txtsalcustname]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 60,
                        border      : false,
                        items: [txtsalcustaddress1]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustaddress2]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustaddress3]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 150,
                        border      : false,
                        items: [txtsalcustcity]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 180,
			 border      : false,
			 items: [cmbsalcuststate]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 210,
			 border      : false,
			 items: [cmbsalcustcountry]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 240,
                        border      : false,
                        items: [txtsalcustpincode]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 270,
                        border      : false,
                        items: [txtsalcustphone]
                       },



		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 300,
			 x           : 345,
			 y           :  30,
			 border      : false,
			 items: [cmbGSTtype]
		        },


                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 60,
                        border      : false,
                        items: [txtsalcustgstno]
                       },

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 610,
                        y           : 30,
                        border      : false,
                        items: [btnGO]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustpanno]
                       },


		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 345,
			 y           : 120,
			 border      : false,
			 items: [cmbGST]
		        },

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 150,
                        border      : false,
                        items: [txtsalcustcontper]
                       }, 

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 180,
                        border      : false,
                        items: [txtsalcustemail]
                       },

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 210,
                        border      : false,
                        items: [txtsalcustweb]
                       }, 

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 180,
                        x           : 345,
                        y           : 240,
                        border      : false,
                        items: [txtsalPaymentTerms]
                       },

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 200,
                        x           : 545,
                        y           : 240,
                        border      : false,
                        items: [txtsalGraceDays]
                       },
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 345,
			 y           : 270,
			 border      : false,
			 items: [cmbSalesRep]
		        }, 

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 680,
                        y           : 30,
                        border      : false,
                        items: [txtSMSNo]
                       }, 
			{ 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 450,
			 x           : 680,
			 y           : 60,
			 border      : false,
			 items: [cmbCustGroup]
		        },

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 450,
			 x           : 680,
			 y           : 90,
			 border      : false,
			 items: [cmbDealer]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 450,
			 x           : 680,
			 y           : 120,
			 border      : false,
			 items: [cmbAccGrp]
		        },

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 350,
			 x           : 680,
			 y           : 150,
			 border      : false,
			 items: [cmbArea]
		        }, 


		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 190,
			 x           : 680,
			 y           : 210,
			 border      : false,
			 items: [txtDistance]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 190,
			 x           : 1080,
			 y           : 5,
			 border      : false,
			 items: [optprinttype]
		        }, 


                         {
                                        xtype       : 'fieldset',
                                        title       : '',
                                        labelWidth  : 1,
                                        width       : 250,
                                        x           : 870,
                                        y           : 210,
                                        border      : false,
                                        items: [btnDistanceUpdate] 
                           },
                       flxSalesCustDetail, // flxSalesLedgerDetail,
          ],       
    });


    function RefreshData()
    {
         saveflag = "Add";
         cmbGSTtype.setValue('R');
         MasSalesCustomerFormpanel.getForm().reset();
	 loadsalcustlistdatastore.load({
		 url: 'ClsMasSalesCustomer.php', 
			 params:
	       		 {
		 	 task:"loadsalcustlist",
			 },
                    callback: function () {
                         cmbGSTtype.setValue('R');
                   }
	 });

    cmbsalcustcountry.setValue(1);
    cmbsalcustcountry.setRawValue("INDIA");


    custgrp = 0;
    }
   
    var MasSalesCustomer = new Ext.Window({
	height      : 615,
        width       : 1300,
        x	     : 20,
        y           : 35,
        title       : 'SALES CUSTOMER MASTER',
        items       : MasSalesCustomerFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){
   saveflag = "Add";

       //  Ext.getCmp('cmbGST').setDisabled(true);  

				 loadsalcustlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalcustlist"


                        	 }
				 });
/*		
				 loadsalledgerlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalledgerlist"


                        	 }
				 });
*/
				 loadsalesstatedatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesstate"


                        	 }
				 });
				 loadsalescountrydatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalescountry"


                        	 }
				 });	
				 loadsalestaxdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalestax"


                        	 }
				 });	

/*
				 loadsalesagentdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesagent"


                        	 }
				 });
				 loadsalesreprdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesrepr"


                        	 }
				 });	
				 loadsalespartygrpdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalespartygrp"


                        	 }
				 });	
				 loadsalesagentgrpdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesagentgrp"


                        	 }
				 });	
*/			 			 			 
				 loadDealerdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadDealer"


                        	 }
				 });	

				 loadCustgroupDatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalespartygrp"


                        	 }
				 });	
				 
				 			 	
	   			 }	
               
		}
    });
    MasSalesCustomer.show(); 
   
    cmbsalcustcountry.setValue(1);
    cmbsalcustcountry.setRawValue("INDIA");
});
