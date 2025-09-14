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
            'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_fax', 'cust_email', 'cust_web', 'cust_cont', 'cust_tngst', 'cust_tngstdt', 'cust_cst', 'cust_cstdate', 'cust_taxtag', 'cust_cr_days', 'cust_gr_days', 'cust_cr_limit', 'cust_agent', 'cust_repr', 'cust_group', 'cust_dest', 'cust_rep', 'cust_range', 'cust_division', 'cust_eccno', 'cust_type', 'cust_rnino', 'cust_agtgrp', 'cust_panno','cust_tinno', 'cust_shortname', 'cust_gstin'
 
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

var txtsalrefname = new Ext.form.TextField({
	fieldLabel  : 'REF NAME',
	id          : 'txtsalrefname',
	name        : 'txtsalrefname',
	width       :  220,
	store       : loadsalcustlistdatastore,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
    	listeners : {
    		keyup : function () {
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
    			
    		}
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
var txtsalcustfax = new Ext.form.TextField({
	fieldLabel  : 'FAX',
	id          : 'txtsalcustfax',
	name        : 'txtsalcustfax',
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
var cmbsalcusttaxcode = new Ext.form.ComboBox({
        fieldLabel      : 'TAX CODE',
        width           :  220,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbsalcusttaxcode',
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
var txtsalcustcreditday = new Ext.form.TextField({
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
var txtsalcustcreditlimit = new Ext.form.TextField({
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
var txtsalcustgraceday = new Ext.form.TextField({
	fieldLabel  : 'GRACE DAYS',
	id          : 'txtsalcustgraceday',
	name        : 'txtsalcustgraceday',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var cmbsalcustagentname = new Ext.form.ComboBox({
        fieldLabel      : 'AGENT NAME',
        width           :  220,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbsalcustagentname',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalesagentdatastore,
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
var cmbsalcustpartygrp = new Ext.form.ComboBox({
        fieldLabel      : 'PARTY GROUP',
        width           :  220,
        displayField    : 'grp_name', 
        valueField      : 'grp_code',
        hiddenName      : '',
        id              : 'cmbsalcustpartygrp',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalespartygrpdatastore,
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
var cmbsalcusttype = new Ext.form.ComboBox({
        fieldLabel      : 'TYPE',
        width           :  220,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbsalcusttype',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','1.Agent'],['2','2.Customer'],['3','3.Depot'],['4','4.Mills']],
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
var txtsalcustrnino = new Ext.form.TextField({
	fieldLabel  : 'RNI No',
	id          : 'txtsalcustrnino',
	name        : 'txtsalcustrnino',
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
            {header: "FAX",Id: 'cust_fax', sortable:true,width:100,align:'left'},
            {header: "Email ID",Id: 'cust_email', sortable:true,width:200,align:'left'},
            {header: "WEB Address",Id: 'cust_web', sortable:true,width:150,align:'left'},
            {header: "Contact Person",Id: 'cust_cont', sortable:true,width:100,align:'left'},          
            {header: "TNGST No",Id: 'cust_tngst', sortable:true,width:120,align:'left', hidden:'true'},            
            {header: "TNGST Dt",Id: 'cust_tngstdt', sortable:true,width:120,align:'left', hidden:'true'},
            {header: "CST No",Id: 'cust_cst', sortable:true,width:120,align:'left', hidden:'true'},
            {header: "CST Dt",Id: 'cust_cstdate', sortable:true,width:120,align:'left', hidden:'true'},            
            {header: "TAX Code",Id: 'cust_taxtag', sortable:true,width:80,align:'left', hidden:'true'},
            {header: "Credit Days",Id: 'cust_cr_days', sortable:true,width:80,align:'left'},
            {header: "Grace Days",Id: 'cust_gr_days', sortable:true,width:80,align:'left'},
            {header: "Credit Limits",Id: 'cust_cr_limit', sortable:true,width:80,align:'left'},
            {header: "Agent Name",Id: 'cust_agent', sortable:true,width:200,align:'left', hidden:'true'},
            {header: "Representative",Id: 'cust_rep', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "CUSTOMER Group",Id: 'cust_group', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "DESTINATION",Id: 'cust_dest', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "CUSTOMER Represent",Id: 'cust_repr', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "RANGE",Id: 'cust_range', sortable:true,width:100,align:'left', hidden:'true'},  
            {header: "DIVISION",Id: 'cust_division', sortable:true,width:100,align:'left'},
            {header: "ECC No",Id: 'cust_eccno', sortable:true,width:100,align:'left'},                                             
            {header: "Type",Id: 'cust_type', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "RNI No",Id: 'cust_rnino', sortable:true,width:100,align:'left'},
            {header: "Agent Group",Id: 'cust_agtgrp', sortable:true,width:100,align:'left', hidden:'true'},
            {header: "PAN No",Id: 'cust_panno', sortable:true,width:120,align:'left'},
            {header: "TIN No",Id: 'cust_tinno', sortable:true,width:120,align:'left'},
            {header: "Short Name",Id: 'cust_shortname', sortable:true,width:100,align:'left', hidden:'true'},            
            {header: "GST No",Id: 'cust_gstin', sortable:true,width:120,align:'left'},

        ],
store:loadsalcustlistdatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxSalesCustDetail.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;
			
			
                        /*indqty = selrow.get('ordqty');
                        cmbindno.setValue(selrow.get('indentno'));  
                        cmbindno.setRawValue(selrow.get('indentno'));  
			cmbItems.setValue(selrow.get('itemcode'));
			cmbItems.setRawValue(selrow.get('itemname'));*/
			
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
			txtsalcustfax.setValue(selrow.get('cust_fax'));
			txtsalcustemail.setValue(selrow.get('cust_email'));
			txtsalcustweb.setValue(selrow.get('cust_web'));
			cmbsalcusttaxcode.setValue(selrow.get('cust_taxtag'));
			txtsalcustcreditday.setValue(selrow.get('cust_cr_days'));
			txtsalcustcreditlimit.setValue(selrow.get('cust_cr_limit'));
			txtsalcustgraceday.setValue(selrow.get('cust_gr_days'));
			cmbsalcustagentname.setValue(selrow.get('cust_agent'));
			cmbsalcustrepre.setValue(selrow.get('cust_repr'));
			if (selrow.get('cust_group') > 0){
			cmbsalcustpartygrp.setValue(selrow.get('cust_group'));}
			txtsalcustcontper.setValue(selrow.get('cust_cont'));
			cmbsalcusttype.setValue(selrow.get('cust_type'));
			txtsalcustrnino.setValue(selrow.get('cust_rnino'));
			cmbsalcustagentgrp.setValue(selrow.get('cust_agtgrp'));
		var cledcode = selrow.get('cust_led_code');
		cmbsalcustpartygrp.reset();
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
        x: 1000,
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
            {header: "TIN No", Id: 'led_TinNo',sortable:true,width:120,align:'left',hidden:'true'},
            {header: "GST No", Id: 'led_gst_no',sortable:true,width:120,align:'left'},
            {header: "PAN No", Id: 'led_pan_no',sortable:true,width:120,align:'left'},
            {header: "TYPE", Id: 'led_type',sortable:true,width:50,align:'left'},
            {header: "Customer Code", Id: 'led_custcode',sortable:true,width:100,align:'left',hidden:'true'},

        ],
store:loadsalledgerlistdatastore,
   });

       
var MasSupplierFormpanel = new Ext.FormPanel({
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
        id          : 'MasSupplierFormpanel',
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
				AEDFlag = "Add";
				MasSupplierFormpanel.getForm().reset();
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
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
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
                        width       : 350,
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
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 30,
                        border      : false,
                        items: [txtsalcustgstno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 60,
                        border      : false,
                        items: [txtsalcustpanno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustfax]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustemail]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 150,
                        border      : false,
                        items: [txtsalcustweb]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 350,
			 x           : 345,
			 y           : 180,
			 border      : false,
			 items: [cmbsalcusttaxcode]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 210,
                        border      : false,
                        items: [txtsalcustcreditday]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 240,
                        border      : false,
                        items: [txtsalcustcreditlimit]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 350,
                        x           : 345,
                        y           : 270,
                        border      : false,
                        items: [txtsalcustgraceday]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 30,
			 border      : false,
			 items: [cmbsalcustagentname]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 60,
			 border      : false,
			 items: [cmbsalcustrepre]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 90,
			 border      : false,
			 items: [cmbsalcustpartygrp]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 660,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustcontper]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 150,
			 border      : false,
			 items: [cmbsalcusttype]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 660,
                        y           : 180,
                        border      : false,
                        items: [txtsalcustrnino]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 660,
			 y           : 210,
			 border      : false,
			 items: [cmbsalcustagentgrp]
		        },flxSalesCustDetail,flxSalesLedgerDetail,
          ],       
    });

   
    var FrmMasSupplier = new Ext.Window({
	height      : 615,
        width       : 1230,
        x	     : 50,
        y           : 35,
        title       : 'SUPPLIER MASTER',
        items       : MasSupplierFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

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
				 				 			 	
	   			 }	
               
		}
    });
    MasSalesCustomer.show();  
});
