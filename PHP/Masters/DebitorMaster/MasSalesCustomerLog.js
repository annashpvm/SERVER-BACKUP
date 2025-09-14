Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');



var GinUser = localStorage.getItem('gstuser');

var GinUserid = localStorage.getItem('ginuserid');
var GinUserType = localStorage.getItem('ginusertype');


    var lblAddress = new Ext.form.Label({
        fieldLabel: 'PREVIOUS ADDRESS DETAILS ',
        id: 'lblAddress',
        width: 300,
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
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
var repcode = 0;


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


var loadCustomerLogDataStore = new Ext.data.Store({
      id: 'loadCustomerLogDataStore',
//      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomerLogs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days',  'cust_cr_limit',  'cust_repr', 'cust_panno','cust_gstin','cust_dealer','cust_smsno','cust_group','cust_partygroup','cust_distance',
'usr_name' , 'createddate'
      ]),
    });


var loadCustomerdatastore = new Ext.data.Store({
      id: 'loadCustomerdatastore',
//      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days',  'cust_cr_limit',  'cust_repr', 'cust_panno','cust_gstin','cust_dealer','cust_smsno','cust_group','cust_partygroup','cust_distance',
'usr_name' , 'createddate'
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

 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/SALES/ClsSalesMain.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSalRefname.getRawValue(),
		},
        });
}



var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 350,
//        header : false,
        x: 122,
        y: 28,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('cust_code'));
                        custcode = 0;
			if ((selrow != null)){
				gridedit = "true";
				editrow = selrow;
				custcode = selrow.get('cust_code');
				custname = selrow.get('cust_ref');
                                txtSalRefname.setRawValue(selrow.get('cust_ref'));
                                flxParty.hide(); 

  
		            loadCustomerdatastore.removeAll();
			    loadCustomerdatastore.load({
				url: 'ClsMasSalesCustomer.php',
				params: {
				    task: 'loadCustomerDetails',
				     custcode:custcode,  
				},
			      	callback:function()
				{
                                   var cnt=loadCustomerdatastore.getCount();

	                           if(cnt>0)
		                   {    
					txtsalcustname.setValue(loadCustomerdatastore.getAt(0).get('cust_name'));
					txtsalcustaddress1.setValue(loadCustomerdatastore.getAt(0).get('cust_add1'));
					txtsalcustaddress2.setValue(loadCustomerdatastore.getAt(0).get('cust_add2'));
					txtsalcustaddress3.setValue(loadCustomerdatastore.getAt(0).get('cust_add3'));
					txtsalcustcity.setValue(loadCustomerdatastore.getAt(0).get('cust_city'));
					cmbsalcuststate.setValue(loadCustomerdatastore.getAt(0).get('cust_state'));
					cmbsalcustcountry.setValue(loadCustomerdatastore.getAt(0).get('cust_country'));
					txtsalcustpincode.setValue(loadCustomerdatastore.getAt(0).get('cust_zip'));
					txtsalcustphone.setValue(loadCustomerdatastore.getAt(0).get('cust_phone'));
					txtsalcustgstno.setValue(loadCustomerdatastore.getAt(0).get('cust_gstin'));
					txtsalcustpanno.setValue(selrow.get('cust_panno'));
		
					txtsalcustemail.setValue(loadCustomerdatastore.getAt(0).get('cust_email'));
					txtsalcustweb.setValue(loadCustomerdatastore.getAt(0).get('cust_web'));
					cmbGST.setValue(loadCustomerdatastore.getAt(0).get('cust_taxtag'));
					txtsalcustcreditday.setValue(loadCustomerdatastore.getAt(0).get('cust_cr_days'));
		//			txtsalcustcreditlimit.setValue(selrow.get('cust_cr_limit'));
	
			  		txtSMSNo.setValue(loadCustomerdatastore.getAt(0).get('cust_smsno'));
					cmbSalesRep.setValue(loadCustomerdatastore.getAt(0).get('cust_repr'));
					cmbDealer.setValue(loadCustomerdatastore.getAt(0).get('cust_dealer'));
					cmbCustGroup.setValue(loadCustomerdatastore.getAt(0).get('cust_partygroup'));
					txtsalcustcontper.setValue(loadCustomerdatastore.getAt(0).get('cust_contact'));
					txtDistance.setValue(loadCustomerdatastore.getAt(0).get('cust_distance'));
                                    }
				}
			    });

		            loadCustomerLogDataStore.removeAll();
			    loadCustomerLogDataStore.load({
				url: 'ClsMasSalesCustomer.php',
				params: {
				    task: 'loadCustomerLogs',
				     custcode:custcode,  
				},
			      	callback:function()
				{
                                }
                             });




                         }
		
         }

}



   });


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





var txtSalRefname = new Ext.form.TextField({
	fieldLabel  : 'REF NAME',
	id          : 'txtSalRefname',
	name        : 'txtSalRefname',
	width       :  350,
	store       : loadCustomerLogDataStore,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'80'},
   	
    	listeners : {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();

             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtSalRefname.getRawValue().length > 0)
                { 
		        flxParty.getEl().setStyle('z-index','10000');
		        flxParty.show();
		        loadSearchPartyListDatastore.removeAll();
             if (txtSalRefname.getRawValue() != '')
                     PartySearch();
                }
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
var cmbCustGroup = new Ext.form.ComboBox({
        fieldLabel      : 'CUSTOMER GROUP',
        width           :  240,
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
                           repcode = findRepCode.getAt(0).get('repr_accgrp');
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
        height: 130,
        width: 1230,
        x: 10,
        y: 390,
             
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
	    {header: "Customer Group",Id: 'cust_group', sortable:true,width:120,align:'left'},
	    {header: "Customer Group Code",Id: 'cust_partygroup', sortable:true,width:120,align:'left'},
	    {header: "Road Dist",Id: 'cust_distance', sortable:true,width:120,align:'left'},
	    {header: "Created By",Id: 'usr_name', sortable:true,width:120,align:'left'},
	    {header: "Created On",Id: 'createddate', sortable:true,width:120,align:'left'},

        ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('cust_ref') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtSalRefname.getValue()) {
    return 'cust_ref'
    }
}
},
store:loadCustomerLogDataStore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxSalesCustDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
			


                        saveflag = "Edit";
			custcode = selrow.get('cust_code');
			txtSalRefname.setValue(selrow.get('cust_ref'));
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
			cmbSalesRep.setValue(selrow.get('cust_repr'));
                	cmbDealer.setValue(selrow.get('cust_dealer'));
                	cmbCustGroup.setValue(selrow.get('cust_partygroup'));
			txtsalcustcontper.setValue(selrow.get('cust_contact'));
			txtDistance.setValue(selrow.get('cust_distance'));

           		var cledcode = selrow.get('cust_led_code');


			flxSalesCustDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });

var dgrecord = Ext.data.Record.create([]);

       
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
//save
	            text: 'LOCK THE CUSTOMER',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
			      Ext.Ajax.request({
			      url: 'MasCustomerLock.php',
			      params :
			      {
				        party    : custcode,

			      },
			      callback: function(options, success, response)
			      {
				 Ext.MessageBox.alert("Customer has been Locked.. "); 
                                 RefreshData();

			      }
		              }); 


	                }
	            } 
	        },'-', 
             
		{
//UNLOCK
	            text: 'UN LOCK THE CUSTOMER',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
			      Ext.Ajax.request({
			      url: 'MasCustomerUnLock.php',
			      params :
			      {
				        party    : custcode,

			      },
			      callback: function(options, success, response)
			      {
				 Ext.MessageBox.alert("Customer has been Un Locked.. "); 
                                 RefreshData();

			      }
		              }); 


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
                        items: [txtSalRefname]
                       },

                             {   
                                  xtype       : 'fieldset',
                                  title       : 'CURRENT ADDRESS DETAILS',
                                  width       : 1200,
                                  height      : 310,
                                  x           : 10,
                                  y           : 40,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[

                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 0,
                        border      : false,
                        items: [txtsalcustname]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 30,
                        border      : false,
                        items: [txtsalcustaddress1]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 60,
                        border      : false,
                        items: [txtsalcustaddress2]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustaddress3]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustcity]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 150,
			 border      : false,
			 items: [cmbsalcuststate]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 10,
			 y           : 180,
			 border      : false,
			 items: [cmbsalcustcountry]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 210,
                        border      : false,
                        items: [txtsalcustpincode]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 10,
                        y           : 240,
                        border      : false,
                        items: [txtsalcustphone]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 0,
                        border      : false,
                        items: [txtsalcustgstno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 680,
                        y           : 0,
                        border      : false,
                        items: [btnGO]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 30,
                        border      : false,
                        items: [txtsalcustpanno]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 60,
                        border      : false,
                        items: [txtsalcustcontper]
                       }, 
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 350,
                        x           : 680,
                        y           : 60,
                        border      : false,
                        items: [txtSMSNo]
                       }, 
			{ 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 80,
			 width       : 350,
			 x           : 680,
			 y           : 100,
			 border      : false,
			 items: [cmbCustGroup]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 90,
                        border      : false,
                        items: [txtsalcustemail]
                       },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 120,
                        border      : false,
                        items: [txtsalcustweb]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 350,
			 x           : 345,
			 y           : 150,
			 border      : false,
			 items: [cmbGST]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 350,
                        x           : 345,
                        y           : 180,
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
			 y           : 210,
			 border      : false,
			 items: [cmbSalesRep]
		        }, 

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 450,
			 x           : 345,
			 y           : 240,
			 border      : false,
			 items: [cmbDealer]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 190,
			 x           : 680,
			 y           : 150,
			 border      : false,
			 items: [txtDistance]
		        }, 

                       ] }, 
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 300,
                                width: 250,
                                x: 10,
                                y: 360,
                                border: false,
                                items: [lblAddress]
                            },
  
                       flxSalesCustDetail,flxParty
          ],       
    });


    function RefreshData()
    {
         saveflag = "Add";

         MasSalesCustomerFormpanel.getForm().reset();

    cmbsalcustcountry.setValue(1);
    cmbsalcustcountry.setRawValue("INDIA");
    }
   
    var MasSalesCustomer = new Ext.Window({
	height      : 615,
        width       : 1300,
        x	    : 20,
        y           : 20,
        title       : 'SALES CUSTOMER MASTER - LOGS',
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
         flxParty.hide();   
         Ext.getCmp('cmbGST').setDisabled(true);  

/*
				 loadsalcustlistdatastore.load({
                		 url: 'ClsMasSalesCustomer.php', 
                        	 params:
                       		 {
                         	 task:"loadsalcustlist"


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
