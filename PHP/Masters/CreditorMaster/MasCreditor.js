Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');

var GinUserid = localStorage.getItem('ginuserid');
var GinUserType = localStorage.getItem('ginusertype')


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
var supcode = 0;

var ledcode = 0;

  var printtype='PDF';



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
 var loadcrdrlistdatastore = new Ext.data.Store({
      id: 'loadcrdrlistdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_fax', 'cust_email', 'cust_web','cust_taxtag', 'cust_gstin','cust_panno',  'cust_acc_group', 'cust_contact',  'cust_tds_type', 'cust_gst_type' , 'cust_tds_yn', 'cust_tcs_applied','cust_distance','cust_cr_days'
      ]),
    });

/*

 var loadcrdrledgerlistdatastore = new Ext.data.Store({
      id: 'loadcrdrledgerlistdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrledgerlist"}, // this parameter asks for listing
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

 var loadcrdrstatedatastore = new Ext.data.Store({
      id: 'loadcrdrstatedatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrstate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'state_code', 'state_name', 'state_codeno'
 
      ]),
    });


 var loadcrdrcountrydatastore = new Ext.data.Store({
      id: 'loadcrdrcountrydatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrcountry"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'country_code', 'country_name'
 
      ]),
    });

 var loadcrdrareadatastore = new Ext.data.Store({
      id: 'loadcrdrareadatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'area_code', 'area_name', 'area_group'
 
      ]),
    });



 var loadpartygrpdatastore = new Ext.data.Store({
      id: 'loadpartygrpdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrpartygrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'sup_grp_code', 'sup_grp_name'
 
      ]),
    });



 var loadtaxdatastore = new Ext.data.Store({
      id: 'loadtaxdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdrtax"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_code','tax_name'
 
      ]),
    });


 var loadareadtastore = new Ext.data.Store({
      id: 'loadareadtastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
              'area_code', 'area_name'
      ]),
    });

 var loadagentdatastore = new Ext.data.Store({
      id: 'loadagentdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrdragent"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
              'sagt_code','sagt_name'
      ]),
    });



 var loadtdsdatastore = new Ext.data.Store({
      id: 'loadtdsdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcrtds"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tds_code','tds_name'
 
      ]),
    });



 var loadACgroupdatastore = new Ext.data.Store({
      id: 'loadACgroupdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
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


//var gstGroup;
//OUT SIDE

var txtcrrefname = new Ext.form.TextField({
	fieldLabel  : 'REF NAME',
	id          : 'txtcrrefname',
	name        : 'txtcrrefname',
	width       :  350,
	store       : loadcrdrlistdatastore,
	style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
    	listeners : {
    		keyup : function () {
/*
    		if (txtcrrefname.getValue() == "") {

				 loadcrdrledgerlistdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrledgerlist"


                        	 }
				 });  
				 } 
*/		
    			flxCreditorDetail.getStore().filter('cust_ref', txtcrrefname.getValue());  
   // 			flxCreditorLedgerDetail.getStore().filter('led_name', txtcrrefname.getValue());  
    			
    		}
    	}


});

var txtContact = new Ext.form.TextField({
	fieldLabel  : 'CONTACT',
	id          : 'txtContact',
	name        : 'txtContact',
	width       :  280,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtPayTerms = new Ext.form.TextField({
	fieldLabel  : 'Pay Terms',
	id          : 'txtPayTerms',
	name        : 'txtPayTerms',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
});



var txtcrname = new Ext.form.TextField({
	fieldLabel  : 'SUPPLIER NAME',
	id          : 'txtcrname',
	name        : 'txtcrname',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});


var txtcrgstno = new Ext.form.TextField({
	fieldLabel  : 'GST I.No',
	id          : 'txtcrgstno',
	name        : 'txtcrgstno',
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

              txtcrpanno.setValue(txtcrgstno.getValue().substring(2,12));
   
        },
        }  

});
var txtcrpanno = new Ext.form.TextField({
	fieldLabel  : 'PAN No',
	id          : 'txtcrpanno',
	name        : 'txtcrpanno',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcraddress1 = new Ext.form.TextField({
	fieldLabel  : 'ADDRESS',
	id          : 'txtcraddress1',
	name        : 'txtcraddress1',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcraddress2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtcraddress2',
	name        : 'txtcraddress2',
	width       :  220,
	style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcraddress3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtcraddress3',
	name        : 'txtcraddress3',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcrcity = new Ext.form.TextField({
	fieldLabel  : 'CITY',
	id          : 'txtcrcity',
	name        : 'txtcrcity',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtRoadDistance = new Ext.form.NumberField({
	fieldLabel  : 'Road Distance',
	id          : 'txtRoadDistance',
	name        : 'txtRoadDistance',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var cmbTDSYN = new Ext.form.ComboBox({
        fieldLabel      : 'TDS (Y/N)',
        width       :  70,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbTDSYN',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
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


 var cmbTCSYN = new Ext.form.ComboBox({
        fieldLabel      : 'TCS (Y/N)',
        width           :  70,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbTCSYN',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
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


var cmbcrstate = new Ext.form.ComboBox({
        fieldLabel      : 'STATE',
        width       :  220,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbcrstate',
        typeAhead       : true,
        mode            : 'local',
        store           : loadcrdrstatedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                if (cmbcrstate.getValue() == 24)
                {
                   cmbcrcountry.setValue(1);
                   cmbcrtype.setValue(1);
                }   
                else
                {
                   cmbcrtype.setValue(2);
                }   
	}
	}
});  

var cmbcrcountry = new Ext.form.ComboBox({
        fieldLabel      : 'COUNTRY',
        width       :  220,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbcrcountry',
        typeAhead       : true,
        mode            : 'local',
        store           : loadcrdrcountrydatastore,
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

var txtcrpincode = new Ext.form.TextField({
	fieldLabel  : 'PIN CODE',
	id          : 'txtcrpincode',
	name        : 'txtcrpincode',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcrphone = new Ext.form.TextField({
	fieldLabel  : 'PHONE',
	id          : 'txtcrphone',
	name        : 'txtcrphone',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcrfax = new Ext.form.TextField({
	fieldLabel  : 'FAX',
	id          : 'txtcrfax',
	name        : 'txtcrfax',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcremail = new Ext.form.TextField({
	fieldLabel  : 'EMAIL ID',
	id          : 'txtcremail',
	name        : 'txtcremail',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txtcrweb = new Ext.form.TextField({
	fieldLabel  : 'WEB ADDRESS',
	id          : 'txtcrweb',
	name        : 'txtcrweb',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var cmbcrgrp = new Ext.form.ComboBox({
        fieldLabel      : 'SUPPLIER GROUP',
        width           : 220,
        displayField    : 'sup_grp_name', 
        valueField      : 'sup_grp_code',
        hiddenName      : '',
        id              : 'cmbcrgrp',
        typeAhead       : true,
        mode            : 'local',
        store           : loadpartygrpdatastore,
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

var cmbGSTtype = new Ext.form.ComboBox({
        fieldLabel      : 'GST TYPE',
        width           :  150,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbGSTtype',
        typeAhead       : true,
        mode            : 'local',
//        store           : [['N','UNKONWN'],['C','CONSUMER'],['R','REGISTERED'],['U','UN REGISTERED']],
        store           : [['R','REGISTERED'],['U','UN REGISTERED']],

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


var cmbcrtype = new Ext.form.ComboBox({
        fieldLabel      : 'TYPE',
        width           :  200,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbcrtype',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','1.INTRASTATE (TN)'],['2','2.INTERSTATE - OTHER THAN (TN)'],['3','3.IMPORT']],
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


var cmbAccGrp = new Ext.form.ComboBox({
        fieldLabel      : 'A/C GROUP',
        width           :  280,
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

var cmbcrtaxcode = new Ext.form.ComboBox({
        fieldLabel      : 'TAX CODE',
        width           :  280,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbcrtaxcode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadtaxdatastore,
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
var cmbcragent = new Ext.form.ComboBox({
        fieldLabel      : 'AGENT',
        width           :  220,
        displayField    : 'sagt_name', 
        valueField      : 'sagt_code',
        hiddenName      : '',
        id              : 'cmbcragent',
        typeAhead       : true,
        mode            : 'local',
        store           : loadagentdatastore ,
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
var cmbTDSType = new Ext.form.ComboBox({
        fieldLabel      : 'TDS TYPE',
        width           :  220,
        displayField    : 'tds_name', 
        valueField      : 'tds_code',
        hiddenName      : '',
        id              : 'cmbTDSType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadtdsdatastore,
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
var cmbcrareaname = new Ext.form.ComboBox({
        fieldLabel      : 'AREA NAME',
        width           :  220,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbcrareaname',
        typeAhead       : true,
        mode            : 'local',
        store           : loadareadtastore,
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
var txtcrexrcno = new Ext.form.TextField({
	fieldLabel  : 'EXCISE RC. No',
	id          : 'txtcrexrcno',
	name        : 'txtcrexrcno',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 


 var loadSearchListDatastore = new Ext.data.Store({
      id: 'loadSearchListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name'
 

      ]),
    });



function partySearch()
{

        loadcrdrlistdatastore.removeAll();
        loadcrdrlistdatastore.load({
		url: 'ClsMasCreditor.php',
		params:
		{
			task:"loadSearchitemlist",
			party : txtSearch.getRawValue(),
		},
        });
}




var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     partySearch();
            }
         }  
    });



   var dgrecord = Ext.data.Record.create([]);
   var flxCreditorDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1180,
        x: 20,
        y: 320,                                 
        columns: [    
            {header: "Supplier code", Id: 'cust_code', sortable:true,width:50,align:'left'}, //hidden:'true'},//0       
            {header: "Ref Name",  Id: 'cust_ref', sortable:true,width:200,align:'left'},//2                 
            {header: "Supplier Name",Id: 'cust_name', sortable:true,width:250,align:'left'},//1 
            {header: "Address1",Id: 'cust_add1', sortable:true,width:200,align:'left'},//3
            {header: "Address2",Id: 'cust_add2', sortable:true,width:200,align:'left'},//4
            {header: "Address3",Id: 'cust_add3', sortable:true,width:200,align:'left'},//5
            {header: "City",Id: 'cust_city', sortable:true,width:100,align:'left'},//6
            {header: "State",Id: 'cust_state', sortable:true,width:100,align:'left'}, //hidden:'true'},//7
            {header: "Country",Id: 'cust_country', sortable:true,width:80,align:'left'}, //hidden:'true'},//8
            {header: "Pincode",Id: 'cust_zip', sortable:true,width:70,align:'left'},//9
            {header: "Phone",Id: 'cust_phone', sortable:true,width:100,align:'left'},//10
            {header: "FAX",Id: 'cust_fax', sortable:true,width:100,align:'left',hidden:'true'},//11
            {header: "Email ID",Id: 'cust_email', sortable:true,width:200,align:'left'},//12
            {header: "WEB Address",Id: 'cust_web', sortable:true,width:150,align:'left'},//13
            {header: "Supplier Type",Id: 'cust_taxtag', sortable:true,width:100,align:'left'},//16          
            {header: "GST IN",Id: 'cust_gstin', sortable:true,width:120,align:'left'}, //hidden:'true'},//17  
            {header: "PAN No",Id: 'cust_panno', sortable:true,width:120,align:'left'},//26          
            {header: "Supplier Acc Group",Id: 'cust_acc_group', sortable:true,width:80,align:'left'}, //hidden:'true'},//21            
            {header: "Contact",Id: 'cust_contact', sortable:true,width:100,align:'left'}, // hidden:'true'},//24
          
            {header: "TDS Type",Id: 'cust_tds_type', sortable:true,width:100,align:'left'}, // hidden:'true'},//30            
            {header: "GST Type",Id: 'cust_gst_type', sortable:true,width:100,align:'left'}, // hidden:'true'},//30     
            {header: "TDS Y/N",Id: 'cust_tds_yn', sortable:true,width:100,align:'left'}, // hidden:'true'},//30     
            {header: "TCS Y/N",Id: 'cust_tcs_applied', sortable:true,width:100,align:'left'}, // hidden:'true'},//30

            {header: "Road Dist",Id: 'cust_distance', sortable:true,width:100,align:'left'}, //     
            {header: "Paymt Terms",Id: 'cust_cr_days', sortable:true,width:100,align:'left'}, //   
        ],
store:loadcrdrlistdatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

			var sm = flxCreditorDetail.getSelectionModel();
						
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;
					
                        saveflag = "Edit";
			supcode = selrow.get('cust_code');
			


			txtcrrefname.setValue(selrow.get('cust_ref'));//1
			txtcrname.setValue(selrow.get('cust_name'));//2
			txtcraddress1.setValue(selrow.get('cust_add1'));//3
			txtcraddress2.setValue(selrow.get('cust_add2'));//4
			txtcraddress3.setValue(selrow.get('cust_add3'));//5
			txtcrcity.setValue(selrow.get('cust_city'));//6
			cmbcrstate.setValue(selrow.get('cust_state'));//7
			cmbcrcountry.setValue(selrow.get('cust_country'));//8
			txtcrpincode.setValue(selrow.get('cust_zip'));//9
			txtcrphone.setValue(selrow.get('cust_phone'));//10
			txtcrgstno.setValue(selrow.get('cust_gstin'));//11
			txtcrpanno.setValue(selrow.get('cust_panno'));//12
			txtcrfax.setValue(selrow.get('cust_fax'));//13
			txtcremail.setValue(selrow.get('cust_email'));//14
			txtcrweb.setValue(selrow.get('cust_web'));//15
			
			cmbcrgrp.setValue(selrow.get('cust_grp_code'));//16
			
			if (selrow.get('cust_taxtag') > 0){
			cmbcrtype.setValue(selrow.get('cust_taxtag'));}//17
			cmbAccGrp.setValue(selrow.get('cust_acc_group'));//18
			
			cmbcrtaxcode.setValue(selrow.get('cust_taxcode'));//19
			cmbcragent.setValue(selrow.get('cust_agentcode'));//20
			cmbTDSType.setValue(selrow.get('cust_tds_type'));//21
			cmbcrareaname.setValue(selrow.get('cust_area'));//22						
			txtcrexrcno.setValue(selrow.get('cust_excise_rcno'));//23
			txtContact.setRawValue(selrow.get('cust_contact'));//23			
	                ledcode = selrow.get('cust_led_code');
                   	cmbGSTtype.setValue(selrow.get('cust_gst_type'));//21
                   	cmbTDSYN.setValue(selrow.get('cust_tds_yn'));//21
                   	cmbTCSYN.setValue(selrow.get('cust_tcs_applied'));//21
                   	txtRoadDistance.setValue(selrow.get('cust_distance'));//21
                   	txtPayTerms.setValue(selrow.get('cust_cr_days'));//21

		//cmbcrtype.reset();
	loadcrdrledgerlistdatastore.removeAll();
	loadcrdrledgerlistdatastore.load({
		url: 'ClsMasCreditor.php', 
		params:
		{
			task:"loadcrdrledgerlist",
			ledcode: ledcode,
			cusled :"Y"
		},
		callback : function() {
			
		}
	});

			flxCreditorDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });

var dgrecord = Ext.data.Record.create([]);
/*
var flxCreditorLedgerDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 260,
        width: 240,
        x: 1080,
        y: 10,        
        columns: [   
            {header: "LEDGER Code", Id: 'led_code',sortable:true,width:100,align:'left',hidden:'true'},       
            {header: "LEDGER Comp Code", Id: 'led_comp_code',sortable:true,width:200,align:'left',hidden:'true'},
            {header: "LEDGER Name", Id: 'led_name',sortable:true,width:220,align:'left'},
            {header: "Address1", Id: 'led_addr1',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "Address2", Id: 'led_addr2',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "City", Id: 'led_city',sortable:true,width:80,align:'left'},
            {header: "GROUP Code", Id: 'led_grp_code',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Prefix", Id: 'led_prefix',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Create Dept", Id: 'led_create_dept',sortable:true,width:80,align:'left'},
            {header: "Status", Id: 'led_status',sortable:true,width:100,align:'left',hidden:'true'},
            {header: "Duplicate", Id: 'led_duplicate',sortable:true,width:120,align:'left',hidden:'true'},
            {header: "TIN No", Id: 'led_TinNo',sortable:true,width:120,align:'left',hidden:'true'},
            {header: "GST No", Id: 'led_gst_no',sortable:true,width:120,align:'left'},
            {header: "PAN No", Id: 'led_pan_no',sortable:true,width:120,align:'left'},
            {header: "TYPE", Id: 'led_type',sortable:true,width:50,align:'left'},
            {header: "Customer Code", Id: 'led_custcode',sortable:true,width:100,align:'left',hidden:'true'},

        ],
store:loadcrdrledgerlistdatastore,

    

   });

   */

    
var MasCreditorFormpanel = new Ext.FormPanel({
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
        id          : 'MasCreditorFormpanel',
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

				MasCreditorFormpanel.getForm().reset();
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
//SAVE           
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {

                        var gstSave;
                      

                    gstSave="true";
                    if (txtcrrefname.getRawValue()==0 || txtcrrefname.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Supplier Reference is Empty.....');
                        gstSave="false";
                    }
                    
                    else if (txtcrname.getRawValue()==0 || txtcrname.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Supplier Name is empty.....');
                        gstSave="false";
                    }

                    else if (txtcraddress1.getRawValue()==0 || txtcraddress1.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Supplier Address line 1  is empty.....');
                        gstSave="false";
                    }

                    else if (txtcraddress2.getRawValue()==0 || txtcraddress2.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Supplier Address line 2 is empty.....');
                        gstSave="false";
                    }


                    else if (cmbcrstate.getValue()==0 || cmbcrstate.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select State .....');
                        gstSave="false";

                    }

                    else if (cmbcrcountry.getValue()==0 || cmbcrcountry.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select Country .....');
                        gstSave="false";
                    }


                    else if (cmbcrtype.getValue()==0 || cmbcrtype.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select Type....');
                        gstSave="false";
                    }

                    else if (cmbTDSYN.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select TDS Type....');
                        gstSave="false";
                    }

                    else if (cmbTCSYN.getRawValue()=="")
                    {
                        Ext.Msg.alert('Creditor','Select TCS Type....');
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

                            Ext.Ajax.request({
                            url: 'MasCreditorSave.php',

                            params :
                             {
//				griddet: Ext.util.JSON.encode(poupdData),     
//			        cnt: invData.length  ,

                                compcode        : Gincompcode,
                                finid           : GinFinid,
                                savetype        : saveflag,
				sup_code        : supcode,
				sup_refname        : txtcrrefname.getValue(),
				sup_name        : txtcrname.getValue(),
				sup_addr1       : txtcraddress1.getValue(),
				sup_addr2       : txtcraddress2.getValue(),
				sup_addr3       : txtcraddress3.getValue(),
				sup_city        : txtcrcity.getValue(),
				sup_state       : cmbcrstate.getValue(),
				sup_cntry_code  : cmbcrcountry.getValue(),
				sup_zip         : txtcrpincode.getValue(),
				sup_phone       : txtcrphone.getValue(),
				sup_fax         : txtcrfax.getValue(),
				sup_email       : txtcremail.getValue(), 
                  		sup_web         : txtcrweb.getValue(),		                
				sup_grp_code    : cmbcrgrp.getValue(),
				sup_type        : cmbcrtype.getValue(), 
				sup_acc_group   : cmbAccGrp.getValue(),

				sup_contact     :  txtContact.getRawValue(),
		
				sup_panno       : txtcrpanno.getValue(),

				sup_tds_type    : cmbTDSType.getValue(),
				sup_gstin       : txtcrgstno.getValue(),
                                ledcode         : ledcode,
                      		sup_gst_type    : cmbGSTtype.getValue(),
				sup_tds_yn      : cmbTDSYN.getValue(),
				sup_tcs_yn      : cmbTCSYN.getValue(),                         
                                usercode        : GinUserid, 
                                roaddist        : txtRoadDistance.getValue(),
                                payterms        : Number(txtPayTerms.getValue()),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Supplier Name Created  -" + obj['supcode']);
                                    MasCreditorFormpanel.getForm().reset();
//                                    RefreshData();
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
//	                    FrmMasCreditor.RefreshData();
                            MasCreditorFormpanel.getForm().reset();
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

    		var p1 = "&scode=" + encodeURIComponent(supcode);
		var param = (p1) ;
                if (printtype  == "PDF")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSupplierAddress.rptdesign&__format=PDF&' + param, '_blank');
                else
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSupplierAddress.rptdesign&' + param, '_blank');
     


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

    		var p1 = "&scode=" + encodeURIComponent(0);
		var param = (p1) ;
                if (printtype  == "PDF")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSupplierAddressDetailed.rptdesign&__format=PDF&' + param, '_blank');
                else
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepSupplierAddressDetailed.rptdesign&' + param, '_blank');


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
				FrmMasCreditor.hide();
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
                        items: [txtcrrefname]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 500,
                        x           : 600,
                        y           : 0,
                        border      : false,
                        items: [txtSearch]
                       },


                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 30,
                        border      : false,
                        items: [txtcrname]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 60,
                        border      : false,
                        items: [txtcraddress1]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 90,
                        border      : false,
                        items: [txtcraddress2]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 120,
                        border      : false,
                        items: [txtcraddress3]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 150,
                        border      : false,
                        items: [txtcrcity]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 180,
			 border      : false,
			 items: [cmbcrstate]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 210,
			 border      : false,
			 items: [cmbcrcountry]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 330,
                        x           : 10,
                        y           : 240,
                        border      : false,
                        items: [txtcrpincode]
                       }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 300,
			 x           : 345,
			 y           : 30,
			 border      : false,
			 items: [cmbGSTtype]
		        },


                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 60,
                        border      : false,
                        items: [txtcrgstno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 90,
                        border      : false,
                        items: [txtcrpanno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 120,
                        border      : false,
                        items: [txtcrfax]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 150,
                        border      : false,
                        items: [txtcremail]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 180,
                        border      : false,
                        items: [txtcrweb]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 330,
                        x           : 345,
                        y           : 210,
                        border      : false,
                        items: [txtcrphone]
                       },

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 240,
                        border      : false,
                        items: [txtPayTerms]
                       },
/*
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 0,
			 border      : false,
			 items: [cmbcrgrp]
		        }, 
*/
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 400,
			 x           : 660,
			 y           : 30,
			 border      : false,
			 items: [cmbcrtype]
		        },
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 450,
			 x           : 660,
			 y           : 60,
			 border      : false,
			 items: [cmbAccGrp]
		        },
/*                       
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 90,
			 border      : false,
			 items: [cmbcrtaxcode]
		        }, 
*/
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 90,
			 border      : false,
			 items: [txtContact]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 120,
			 border      : false,
			 items: [cmbTDSYN]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 150,
			 border      : false,
			 items: [cmbTCSYN]
		        }, 


		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 180,
			 border      : false,
			 items: [cmbTDSType]
		        }, 


		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 210,
			 border      : false,
			 items: [txtRoadDistance]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 190,
			 x           : 1150,
			 y           : 5,
			 border      : false,
			 items: [optprinttype]
		        }, 
/*
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 180,
			 border      : false,
			 items: [cmbcrareaname]
		        },


*/		        
		        flxCreditorDetail, // flxCreditorLedgerDetail,
          ],       
    });



    function RefreshData()
    {
				 loadcrdrlistdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrlist"


                        	 }
				 });
/*
				 loadcrdrledgerlistdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrledgerlist"


                        	 }
				 });
*/

    }
   
   
    var FrmMasCreditor = new Ext.Window({
	height      : 615,
        width       : 1350,
        x	     : 0,
        y           : 30,
        title       : 'SUPPLIER MASTER',
        items       : MasCreditorFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

                                 RefreshData();
				 loadcrdrstatedatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrstate"


                        	 }
				 });
				 loadcrdrcountrydatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrcountry"


                        	 }
				 });
				 loadcrdrareadatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdrarea"


                        	 }
				 });	

               			 loadpartygrpdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrpartygrp"
                        	 }
				 });	

 			 				 			 	
   
            			 loadareadtastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });	
            			 loadagentdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrdragent"
                        	 }
				 });	
            			 loadtdsdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"loadcrtds"
                        	 }
				 });	
            			 loadACgroupdatastore.load({
                		 url: 'ClsMasCreditor.php', 
                        	 params:
                       		 {
                         	 task:"Loadaccountsgroup"
                        	 }
				 });	



	   			 }	
               
		}
    });
    FrmMasCreditor.show();  
});
