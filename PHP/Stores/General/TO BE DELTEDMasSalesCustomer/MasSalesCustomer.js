Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
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
            'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days',  'cust_cr_limit',  'cust_repr', 'cust_panno','cust_gstin','cust_dealer','cust_smsno'
 
      ]),
    });

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


 var loadsalespartygrpdatastore = new Ext.data.Store({
      id: 'loadsalespartygrpdatastore',
      autoLoad : true,
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
           'grp_code', 'grp_name', 'grp_agent'
 
      ]),
    });

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


//var gstGroup;
//OUT SIDE

var btnGO = new Ext.Button({
    style   : 'text-align:center;',
    text    : "WEB SITE",
    width   : 40,
    height  : 30,
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
				txtsalcustcreditday.setValue('');
				txtsalcustcreditlimit.setValue('');
			txtsalcustgraceday.setValue('');
			cmbsalcustagentname.setValue('');
			cmbsalcustrepre.setValue('');
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
                cmbGST.setValue('4');         
               }
               else
               {
                cmbGST.setValue('3');         
               }     
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
        width           :  220,
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

var txtsalcustpincode = new Ext.form.TextField({
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
var txtsalcustcreditday = new Ext.form.NumberField({
	fieldLabel  : 'CREDIT DAYS',
	id          : 'txtsalcustcreditday',
	name        : 'txtsalcustcreditday',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 

var txtSMSNo = new Ext.form.TextField({
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

var cmbsalcustrepre = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbsalcustrepre',
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

   var dgrecord = Ext.data.Record.create([]);
   var flxSalesCustDetail = new Ext.grid.EditorGridPanel({
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
            {header: "Credit Days",Id: 'cust_cr_days', sortable:true,width:80,align:'left'},   
            {header: "Credit Limits",Id: 'cust_cr_limit', sortable:true,width:0,align:'left'},
            {header: "Rep.",Id: 'cust_repr', sortable:true,width:100,align:'left'},
            {header: "PAN No",Id: 'cust_panno', sortable:true,width:120,align:'left'},
            {header: "GST No",Id: 'cust_gstin', sortable:true,width:120,align:'left'},
            {header: "Dealer",Id: 'cust_dealer', sortable:true,width:120,align:'left'},
            {header: "SMS No",Id: 'cust_smsno', sortable:true,width:120,align:'left'},
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
			txtsalcustcreditday.setValue(selrow.get('cust_cr_days'));
//			txtsalcustcreditlimit.setValue(selrow.get('cust_cr_limit'));
	
          		txtSMSNo.setValue(selrow.get('cust_smsno'));
			cmbsalcustrepre.setValue(selrow.get('cust_repr'));
                	cmbDealer.setValue(selrow.get('cust_dealer'));
			txtsalcustcontper.setValue(selrow.get('cust_contact'));

           		var cledcode = selrow.get('cust_led_code');

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

			flxSalesCustDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });

var dgrecord = Ext.data.Record.create([]);
var flxSalesLedgerDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 260,
        width: 200,
        x: 900,
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
                        Ext.Msg.alert('Sales','Error in GST....');
                        gstSave="false";
                    }
                  /*  else if (txtsalcustgstno.getRawValue().length != 15)
                    {
                        Ext.Msg.alert('Sales','Error in GST Number....');
                        gstSave="false";
                    }   */                 

                    else if (cmbsalcuststate.getValue() != 24  &&  txtsalcustgstno.getValue().substring(0,2) == "33")
                    {
                        Ext.Msg.alert('Sales','Error in GST....');
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
				custcrdays  : txtsalcustcreditday.getValue(),
		
                		custcrlimit : 0,
		
				custrepr    : cmbsalcustrepre.getValue(),
                  		custdealer    : cmbDealer.getValue(),
		

				custpanno   : txtsalcustpanno.getValue(),

				custgstin   : txtsalcustgstno.getValue(),
                                custsmsno   : txtSMSNo.getValue(),    
  
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
                                    Ext.MessageBox.alert("Sales Customer Creation failed " + obj['custcode']);                                                  
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
                        width       : 350,
                        x           : 345,
                        y           : 30,
                        border      : false,
                        items: [txtsalcustgstno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 680,
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
                        y           : 60,
                        border      : false,
                        items: [txtsalcustpanno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustcontper]
                       }, 
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 200,
                        x           : 680,
                        y           : 90,
                        border      : false,
                        items: [txtSMSNo]
                       }, 
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustemail]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 150,
                        border      : false,
                        items: [txtsalcustweb]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 345,
			 y           : 180,
			 border      : false,
			 items: [cmbGST]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 210,
                        border      : false,
                        items: [txtsalcustcreditday]
                       },
/*
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 240,
                        border      : false,
                        items: [txtsalcustcreditlimit]
                       },
*/

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 345,
			 y           : 240,
			 border      : false,
			 items: [cmbsalcustrepre]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 450,
			 x           : 345,
			 y           : 270,
			 border      : false,
			 items: [cmbDealer]
		        }, 

                       flxSalesCustDetail,flxSalesLedgerDetail,
          ],       
    });


    function RefreshData()
    {
         saveflag = "Add";

         MasSalesCustomerFormpanel.getForm().reset();
	 loadsalcustlistdatastore.load({
		 url: 'ClsMasSalesCustomer.php', 
			 params:
	       		 {
		 	 task:"loadsalcustlist",
			 }
	 });
    cmbsalcustcountry.setValue(1);
    cmbsalcustcountry.setRawValue("INDIA");
    }
   
    var MasSalesCustomer = new Ext.Window({
	height      : 615,
        width       : 1230,
        x	     : 50,
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
	listeners:{
               show:function(){
   saveflag = "Add";

//         Ext.getCmp('cmbGST').setDisabled(true);  

				 loadsalcustlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalcustlist"


                        	 }
				 });		
				 loadsalledgerlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalledgerlist"


                        	 }
				 });
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
				 loadDealerdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadDealer"


                        	 }
				 });					 
				 			 	
	   			 }	
               
		}
    });
    MasSalesCustomer.show(); 
   
    cmbsalcustcountry.setValue(1);
    cmbsalcustcountry.setRawValue("INDIA");
});
