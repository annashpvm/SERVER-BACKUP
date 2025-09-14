Ext.onReady(function(){

   var ginFinid = localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var ginCompcode = localStorage.getItem('gincompcode');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');


   var GinUser = localStorage.getItem('ginusername');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    
   var GinYear = localStorage.getItem('gstyear');

   var dngsttype = localStorage.getItem('GSTTYPE');

   var accseqno = 0;
   var dncrseqno = 0;
   var vouseqno = 0;

   var ledcode = 0;
   var supcode = 0;
   var suptype = 'S';

   var cgstledcode = 0;sgstledcode = 0;igstledcode = 0;
   var cgstledger  = '';sgstledger = '';igstledger = '';
    var dntype = '';  
   var roundoff ="Y";
   var gstFlag;
    var billflag;


   var optRounding = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Rounding',

    fieldLabel: '',
    layout : 'hbox',
    width: 160,
    height:90,
    defaultType : 'textfield',

    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optRounding',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Needed', name: 'optRounding', id:'RoundNeed',  inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 roundoff ="Y";
                 find_value();
               }
              }
             }
            },
            {boxLabel: 'Not Needed', name: 'optRounding', id:'RoundNoNeed',  inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                roundoff ="N";
                find_value();
               }
              }
             }}  , //,txtfreight



        ],
    },

    ],
});

    var txtReason = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtReason',
        width: 300,
        name: 'txtReason',
        enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'49'},

        listeners: {
        }
    });

var loadItemDatastore = new Ext.data.Store({
      id: 'loadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','itfmh_code'
      ]),
    });



var loadDNVouNoDatasore = new Ext.data.Store({
  id: 'loadDNVouNoDatasore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuDebitNote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadDNNumber"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['vouno'])
})




var loadPurchaseGroupDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuDebitNote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroup"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname'
  ])
})


var loadPurchaseGroupDetailDatasore = new Ext.data.Store({
  id: 'loadPurchaseGroupDetailDatasore',
//  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuDebitNote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPurGroupDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['tax_purcode','tax_purname','tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
  ])
})


var dgrecord = Ext.data.Record.create([]);
var flxAccounts = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 220,
    hidden:false,
    width: 1000,
    id: 'my-grid',  
scope: this,
    columns:
    [
	{header: "S.No" ,       dataIndex: 'slno',sortable:true,width:60,align:'left'},
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left'},
	{header: "Ledger Name", dataIndex: 'ledname',sortable:true,width:350,align:'left'},
	{header: "Dedit",       dataIndex: 'debit',sortable:true,width:120,align:'right'},
	{header: "Credit",      dataIndex: 'credit',sortable:true,width:120,align:'right'},
	{header: "Bill No",     dataIndex: 'billno',sortable:true,width:100,align:'left'},
	{header: "Bill Dt",     dataIndex: 'billdt',sortable:true,width:100,align:'left'},
	{header: "ledtype",     dataIndex: 'ledtype',sortable:true,width:100,align:'left'},
    ],
    store: [],
    listeners:{	
    }

});
     var txtRounding = new Ext.form.NumberField({
        fieldLabel  : 'Rounding',
        id          : 'txtRounding',
        width       : 60,
        name        : 'txtRounding',
        readOnly    : true,
	enableKeyEvents: true,
        readOnly        : true,
        labelStyle : "font-size:12px;font-weight:bold",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners   :
		{
		}
   }); 


     var txtCGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'CGST (%)',
        id          : 'txtCGSTPer',
        width       : 60,
        name        : 'txtCGSTPer',
        readOnly    : true,
	enableKeyEvents: true,
        readOnly        : true,
        labelStyle : "font-size:12px;font-weight:bold",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners   :
		{
		keyup:function()
			{
                         find_value();

			}

		}
   }); 
   
        var txtSGSTPer = new Ext.form.NumberField({ 	
        fieldLabel  : 'SGST (%)',
        id          : 'txtSGSTPer',
        width       : 60,
        name        : 'txtSGSTPer',
        readOnly    : true,
	enableKeyEvents: true,
        readOnly        : true,
       labelStyle : "font-size:12px;font-weight:bold",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners   :
		{
		keyup:function()
			{
                         find_value();
			}

		}
   }); 

   var txtIGSTPer = new Ext.form.NumberField({
        fieldLabel  : 'IGST (%)',
        id          : 'txtIGSTPer',
        width       : 60,
        name        : 'txtIGSTPer',
        readOnly    : true,
       labelStyle : "font-size:12px;font-weight:bold",
	enableKeyEvents: true,
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners   :
		{
		keyup:function()
			{
                          find_value();
			}

		}
   }); 
   
     var txtCGSTValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCGSTValue',
        width       : 80,
	readOnly    :true,
        name        : 'txtCGSTValue',
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
   }); 
   
        var txtSGSTValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSGSTValue',
        width       : 80,
	readOnly    :true,
        name        : 'txtSGSTValue',
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
   }); 
        var txtIGSTValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIGSTValue',
        width       : 80,
	readOnly    :true,
        name        : 'txtIGSTValue',
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
   }); 
   

   var txttotDebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txttotDebit',
        name        : 'txttotDebit',
        width       :  120,
	readOnly : true,
        tabindex : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},


   });

   var txttotCredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotCredit',
        name        : 'txttotCredit',
        width       :  120,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

   });

var cmbPurchaseLedger = new Ext.form.ComboBox({
    fieldLabel      : 'Purchase Ledger',
    width           : 170,
    displayField    : 'tax_purname',
    valueField      : 'tax_purcode',
    hiddenName      : 'tax_purname',
    id              : 'cmbPurchaseLedger',
    typeAhead       : true,
    mode            : 'local',
    store           : loadPurchaseGroupDatasore,

    labelStyle	: "font-size:12px;font-weight:bold;",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    enableKeyEvents: true, 
    listeners:{
        select: function () 
        { 
		loadPurchaseGroupDetailDatasore.removeAll();
		loadPurchaseGroupDetailDatasore.load({
		url: 'ClsFuDebitNote.php',
		params:
		{
		    task:"loadPurGroupDetail",
		    purcode : cmbPurchaseLedger.getValue(),

		},
		callback:function()
		{

                  txtCGSTPer.setRawValue('');
                  txtSGSTPer.setRawValue('');
                  txtIGSTPer.setRawValue('');
                  cgstledcode = 0;
                  sgstledcode = 0;
                  igstledcode = 0;
                  cgstledger  = '';
                  sgstledger  = '';
                  igstledger  = '';

 
                    var cnt = loadPurchaseGroupDetailDatasore.getCount();
                    if (cnt >0)
                    {
                          txtCGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstper'));
                          txtSGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstper'));
                          txtIGSTPer.setRawValue(loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstper'));
                          cgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledcode');
                          sgstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledcode');
                          igstledcode = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledcode');
                          cgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_cgstledger');
                          sgstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_sgstledger');
                          igstledger  = loadPurchaseGroupDetailDatasore.getAt(0).get('tax_igstledger');



                    } 
                    find_value();  
  
		}
	      });  

      }   
}
});


 var txtTruckNo = new Ext.form.TextField({
        fieldLabel  : 'Lorry No',
        id          : 'txtTruckNo',
        name        : 'txtTruckNo',
        width       :  100,
	border : true,
       // style       :  {border-radius:5},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
 enableKeyEvents: true,   
	tabindex : 1,
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
    }
	
    });


var txtTicketNo = new Ext.form.NumberField({
        fieldLabel  : 'Ticket No.',
        id          : 'txtTicketNo',
        name        : 'txtTicketNo',
        width       :  100,
        allowBlank  :  false,
        readOnly    : true,
	tabindex : 1,
enableKeyEvents: true,  
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",
listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
           //       cmbitem.focus();
             }
       },
    }	
    });


 var txtPartyBillNo = new Ext.form.TextField({
        fieldLabel  : 'Party Bill No',
        id          : 'txtPartyBillNo',
        name        : 'txtPartyBillNo',
        width       :  120,
        
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
	enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpPartyBilldate.focus();
             }
       },
    }
       


    });
var dtpPartyBilldate = new Ext.form.DateField({
    fieldLabel : 'Party Bill Date',
    id         : 'dtpPartyBilldate',
    name       : 'PBilldate',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",    
enableKeyEvents: true,   
	listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBillValue.focus();
             }
       },
    }
       
});

var txtPartyBillValue= new Ext.form.NumberField({
        fieldLabel  : 'Party Bill Value',
        id          : 'txtPartyBillValue',
        name        : 'txtPartyBillValue',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},

    });




 var txtBillQty = new Ext.form.TextField({
        fieldLabel  : 'Bill Qty',
        id          : 'txtBillQty',
        name        : 'txtBillQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},        enableKeyEvents: true,   
	listeners:{

        }
 });


 var txtMillQty = new Ext.form.TextField({
        fieldLabel  : 'Mill Qty',
        id          : 'txtMillQty',
        name        : 'txtMillQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},        enableKeyEvents: true,   
	listeners:{

        }
 });


var txtAcceptedQty = new Ext.form.TextField({
        fieldLabel  : 'Accepted Qty',
        id          : 'txtAcceptedQty',
        name        : 'txtAcceptedQty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
    labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    enableKeyEvents: true,   
	listeners:{
         }
    });

var lblFixed = new Ext.form.Label({
    fieldLabel  : 'Fixed',
    id          : 'lblFixed',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblActual = new Ext.form.Label({
    fieldLabel  : 'Actual',
    id          : 'lblActual',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDiff = new Ext.form.Label({
    fieldLabel  : 'Diff',
    id          : 'lblDiff',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblDedQty = new Ext.form.Label({
    fieldLabel  : 'Ded.Qty(Kgs)',
    id          : 'lblDedQty',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblDNYN = new Ext.form.Label({
    fieldLabel  : 'DN (Y/N)',
    id          : 'lblDNYN',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate/MT',
    id          : 'lblRate',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblDescription = new Ext.form.Label({
    fieldLabel  : 'Description',
    id          : 'lblDescription',
    width       : 70,
    labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",

});
var dnmoisyn = "Y";
var cmbDNMoisYN = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbDNMoisYN',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                  dnmoisyn = cmbDNMoisYN.getValue();
                  find_value();

           }
        }       
   });


var dnfinesyn = "Y";
var cmbDNFinesYN = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbDNFinesYN',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                  dnfinesyn = cmbDNFinesYN.getValue();
                  find_value();
           }
        }       
   });
var dnsandyn = "Y";
var cmbDNSandYN = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbDNSandYN',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                  dnsandyn = cmbDNSandYN.getValue();
                  find_value();
           }
        }       
   });


var txtOtherDedQty = new Ext.form.NumberField({
        fieldLabel  : 'Other Deduction Qty',
        id          : 'txtOtherDedQty',
        name        : 'txtOtherDedQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
        decimalPrecision: 0,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		}, 	
	listeners:{
	    blur:function()
	    {
               find_value();
            },
	    keyup:function()
	    {
               find_value();
            },
}
    });

var txtOthDedRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthDedRate',
        name        : 'txtOthDedRate',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners:{
	    blur:function()
	    {
               find_value();
            },
	    keyup:function()
	    {
               find_value();
            },
       }
}); 

var txtOthDedValue = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOthDedValue',
        name        : 'txtOthDedValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners:{
            specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
   
             }
            },
	    keyup:function()
	    {
            }  
        }
}); 

var txtTotDedQty = new Ext.form.TextField({
        fieldLabel  : 'Total Deduction Qty & Value',
        id          : 'txtTotDedQty',
        name        : 'txtTotDedQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
     //   border   :1,
        labelStyle : "font-size:14px;font-weight:bold;color:#7d0835",
        readOnly        : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
    });







var txtDebitValue = new Ext.form.TextField({
        fieldLabel  : 'Total Debit Value',
        id          : 'txtDebitValue',
        name        : 'txtDebitValue',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
     //   border   :1,
        labelStyle : "font-size:14px;font-weight:bold;color:#7d0835",
        readOnly        : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
    });




function find_value()
{
   var totqty = 0;
   var qtydiffvalue = 0;
   var moisdiffvalue = 0;
   var finesdiffvalue = 0;
   var sanddiffvalue = 0;
   var otherdiffvalue = 0;
   
   var totvalue = 0;
   var cgstamt =0;
   var sgstamt =0;   
   var igstamt =0;
   var totdebitvalue =0;

   qtydiffvalue   =  Number(txtDiffQty.getValue())/1000 * Number(txtDiffRate.getValue());
   if (dnmoisyn == "Y")
      moisdiffvalue  =  Number(txtMoisQty.getValue())/1000 * Number(txtMoisRate.getValue());
   if (dnfinesyn == "Y")
      finesdiffvalue =  Number(txtFinesQty.getValue())/1000 * Number(txtFinesRate.getValue());
   if (dnsandyn == "Y")
      sanddiffvalue  =  Number(txtSandQty.getValue())/1000 * Number(txtSandRate.getValue());
   otherdiffvalue =  Number(txtOtherDedQty.getValue())/1000 * Number(txtOthDedRate.getValue());

   totqty = Number(txtDiffQty.getValue())
         + Number(txtMoisQty.getValue())
         + Number(txtFinesQty.getValue())
         + Number(txtSandQty.getValue())
         + Number(txtOtherDedQty.getValue());


   totvalue = Number(qtydiffvalue)
         + Number(moisdiffvalue)
         + Number(finesdiffvalue)
         + Number(sanddiffvalue)
         + Number(otherdiffvalue);


   qtydiffvalue = Math.round(qtydiffvalue * 100) / 100;
   txtDiffValue.setRawValue(Ext.util.Format.number(qtydiffvalue, "0.00"));

   moisdiffvalue = Math.round(moisdiffvalue * 100) / 100;
   txtMoisValue.setRawValue(Ext.util.Format.number(moisdiffvalue, "0.00"));

   finesdiffvalue = Math.round(finesdiffvalue * 100) / 100;
   txtFinesValue.setRawValue(Ext.util.Format.number(finesdiffvalue, "0.00"));

   sanddiffvalue = Math.round(sanddiffvalue * 100) / 100;
   txtSandValue.setRawValue(Ext.util.Format.number(sanddiffvalue, "0.00"));   

   otherdiffvalue = Math.round(otherdiffvalue * 100) / 100;
   txtOthDedValue.setRawValue(Ext.util.Format.number(otherdiffvalue, "0.00"));
  
   txtTotDedQty.setRawValue(Ext.util.Format.number(totqty, "0.0"));

   txtTotalDedValue.setRawValue(Ext.util.Format.number(totvalue, "0.00"));


   if (Number(txtCGSTPer.getValue()) > 0)
      cgstamt = Number(totvalue) * Number(txtCGSTPer.getValue()) / 100;
   if (Number(txtSGSTPer.getValue()) > 0)
      sgstamt = Number(totvalue) * Number(txtSGSTPer.getValue()) / 100;
   if (Number(txtIGSTPer.getValue()) > 0)
      igstamt = Number(totvalue) * Number(txtIGSTPer.getValue()) / 100;


   cgstamt = Math.round(cgstamt * 100) / 100;
   txtCGSTValue.setRawValue(Ext.util.Format.number(cgstamt, "0.00"));

   sgstamt = Math.round(sgstamt * 100) / 100;
   txtSGSTValue.setRawValue(Ext.util.Format.number(sgstamt, "0.00"));

   igstamt = Math.round(igstamt * 100) / 100;
   txtIGSTValue.setRawValue(Ext.util.Format.number(igstamt, "0.00"));

   totdebitvalue = Number(totvalue) + Number(cgstamt) + Number(sgstamt)  + Number(igstamt)
   if (roundoff == "Y")           
   {     
          txtDebitValue.setRawValue(Ext.util.Format.number(Math.round(totdebitvalue),'0.00'));
          dnround = Number(txtDebitValue.getValue()) - Number(totdebitvalue);
          txtRounding.setRawValue(Ext.util.Format.number(dnround,'0.00'));
          
   }   
   else
   {
	 txtDebitValue.setRawValue(Ext.util.Format.number(totdebitvalue,'0.00'));    
	 txtRounding.setRawValue(0)
   }      

   txtMoisRemarks.setRawValue('');
   txtFinesRemarks.setRawValue('');
   txtSandRemarks.setRawValue('');
   txtDiffRemarks.setRawValue('');
   txtOthDedRemarks.setRawValue('');


   if (Number(txtMoisQty.getValue()) > 0)
   {
      txtMoisRemarks.setRawValue(Ext.util.Format.number(txtMoisQty.getValue(), "0") + " Kgs. Deducted due to Ex.Mois "  +  Ext.util.Format.number(txtDiffMoisPer.getValue(), "0.00") +"%" );
   }

   if (Number(txtFinesQty.getValue()) > 0)
   {
      txtFinesRemarks.setRawValue(Ext.util.Format.number(txtFinesQty.getValue(), "0") + " Kgs. Deducted due to Ex.Fines "  +  Ext.util.Format.number(txtDiffFinesPer.getValue(), "0.00") +"%" );
   }


   if (Number(txtSandQty.getValue()) > 0)
   {
      txtSandRemarks.setRawValue(Ext.util.Format.number(txtSandQty.getValue(), "0") + " Kgs. Deducted due to Ex.Sand "  +  Ext.util.Format.number(txtDiffSandPer.getValue(), "0.00") +"%" );
   }
   if (Number(txtDiffQty.getValue()) > 0)
   {
      txtDiffRemarks.setRawValue("Qty Difference " + Ext.util.Format.number(txtDiffQty.getValue(), "0") + " Kgs.");
   }

   if (Number(txtOtherDedQty.getValue()) > 0)
   {
      txtOthDedRemarks.setRawValue(" Other Deduction Qty " + Ext.util.Format.number(txtOtherDedQty.getValue(), "0") + " Kgs.");
   }




} // function end

var txtDiffQty = new Ext.form.NumberField({
        fieldLabel  : 'Quantity Difference',
        id          : 'txtDiffQty',
        name        : 'txtDiffQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
        decimalPrecision: 0,
	tabindex : 1,
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
    	enableKeyEvents: true,
	listeners:{
	    blur:function()
	    {
               find_value();
            },
	    keyup:function()
	    {
               find_value();
            },

        }
    });




var txtDiffRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffRate',
        name        : 'txtDiffRate',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners:{
	    keyup:function()
	    {
               find_value();
            },
	    change:function()
	    {
               find_value();
            },
        }
}); 

var txtDiffValue = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDiffValue',
        name        : 'txtDiffValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
   	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},
	listeners:{
        }    
 }); 

var txtTotalDedValue = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtTotalDedValue',
        name        : 'txtTotalDedValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
	listeners:{

        }
}); 


var cmbItemName = new Ext.form.ComboBox({
        fieldLabel      : 'Item',
        width           : 290,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,
      enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",        
        listeners:{

        
	}
   });


var txtFixedMoisPer = new Ext.form.TextField({
        fieldLabel  : 'Mois(%)',
        id          : 'txtFixedMoisPer',
        name        : 'txtFixedMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 

        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
       },
	keyup:function()
	{
	
          find_value();   
	},

	}
    });


var txtActualMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtActualMoisPer',
        name        : 'txtActualMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{

	}
    });

var txtDiffMoisPer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDiffMoisPer',
        name        : 'txtDiffMoisPer',
        width       :  80,
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true, 
    labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	}
    });

var txtMoisQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMoisQty',
        name        : 'txtMoisQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
        listeners:{

        }
    });

var txtMoisRemarks = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMoisRemarks',
        name        : 'txtMoisRemarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
        listeners:{
        }     

});

var txtFinesRemarks = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFinesRemarks',
        name        : 'txtFinesRemarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,

        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
        listeners:{
        }     

});

var txtSandRemarks = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSandRemarks',
        name        : 'txtSandRemarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
        listeners:{
        }     

});

var txtOthDedRemarks = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOthDedRemarks',
        name        : 'txtOthDedRemarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
        listeners:{
        }     

});

var txtDiffRemarks = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDiffRemarks',
        name        : 'txtDiffRemarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px; ",	
        listeners:{
        }     

});

 var txtFixedFinesPer = new Ext.form.NumberField({
        fieldLabel  : 'Fines % ',
        id          : 'txtFixedFinesPer',
        name        : 'txtFixedFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{

	}
    });

 var txtActualFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualFinesPer',
        name        : 'txtActualFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }  
    });

 var txtDiffFinesPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffFinesPer',
        name        : 'txtDiffFinesPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
       labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	}
    });



var txtFinesQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtFinesQty',
        name        : 'txtFinesQty',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
      	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	    
         }
    });



 var txtFixedSandPer = new Ext.form.NumberField({
        fieldLabel  : 'Sand % ',
        id          : 'txtFixedSandPer',
        name        : 'txtFixedSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }
    });

 var txtActualSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtActualSandPer',
        name        : 'txtActualSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
    labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }  
    });

 var txtDiffSandPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDiffSandPer',
        name        : 'txtDiffSandPer',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,   
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	}
    });



var txtSandQty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtSandQty',
        name        : 'txtSandQty',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
 
        }
    });


var txtMoisRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisRate',
        name        : 'txtMoisRate',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	    keyup:function()
	    {
               find_value();
            },
	    change:function()
	    {
               find_value();
            },
        }
}); 

var txtMoisValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisValue',
        name        : 'txtMoisValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }
}); 

var txtFinesRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFinesRate',
        name        : 'txtFinesRate',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	    keyup:function()
	    {
               find_value();
            },
	    change:function()
	    {
               find_value();
            },
        }
}); 

var txtFinesValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFinesValue',
        name        : 'txtFinesValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }
}); 

var txtSandRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSandRate',
        name        : 'txtSandRate',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
	    keyup:function()
	    {
               find_value();
            },
	    change:function()
	    {
               find_value();
            },
        }
}); 

var txtSandValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSandValue',
        name        : 'txtSandValue',
        width       :  80,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle	: "font-size:12px;font-weight:bold;",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '12px','font-weight':'bold'
		},	
	listeners:{
        }
});

var LoadDebitNoteVoucherListDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherListDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherListAccounts"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dbcr_vouno'
      ]),
    });

var LoadDebitNoteVoucherDetailDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherDetailDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',     // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'qc_fuel_entryno', 'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_area', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_itemcode', 'qc_fuel_ticketwt', 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_tot_ded_qty', 'qc_fuel_acceptqty', 'qc_fuel_qtydiff_qty', 'qc_fuel_qtydiff_rate', 'qc_fuel_qtydiff_value', 'qc_fuel_qtydiff_remarks', 'qc_fuel_mois_dn_yn', 'qc_fuel_mois_rate', 'qc_fuel_mois_value', 'qc_fuel_mois_remarks', 'qc_fuel_fines_dn_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_fines_remarks', 'qc_fuel_sand_dn_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_sand_remarks', 'qc_fuel_othded_qty', 'qc_fuel_othded_rate', 'qc_fuel_othded_value', 'qc_fuel_otherded_remarks', 'qc_fuel_totded_qty', 'qc_fuel_tot_taxable', 'qc_fuel_cgst_per', 'qc_fuel_sgst_per', 'qc_fuel_igst_per', 'qc_fuel_cgst_value', 'qc_fuel_sgst_value', 'qc_fuel_igst_value', 'qc_fuel_round_need', 'qc_fuel_rounding', 'qc_fuel_debitamount', 'qc_fuel_pur_ledger', 'qc_fuel_debitnote_no', 'qc_fuel_dn_raised', 'qc_fuel_grn_raised', 'itmh_code', 'itmh_name', 'itmh_moisture_ARB', 'itmh_moisture_ADB', 'itmh_ash', 'itmh_volatile', 'itmh_fixedcarbon', 'itmh_fines', 'itmh_sand', 'itmh_iron', 'itmh_gcv_ADB', 'itmh_gcv_ARB', 'itmh_hsncode', 'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc',  'sup_name', 'cust_ref', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web','cust_code', 'sup_grp_code', 'cust_taxtag', 'sup_acc_group', 'sup_contact', 'sup_panno', 'sup_tds_type', 'sup_gstin', 'sup_gst_type', 'sup_tds_yn', 'sup_tcs_yn', 'sup_lock', 'createdby', 'createddate', 'seqno', 'wc_compcode', 'wc_fincode', 'wc_ticketno', 'wc_date', 'wc_time', 'wc_area_code', 'wc_sup_code', 'wc_item', 'wc_vehicleno', 'wc_emptywt', 'wc_loadwt', 'wc_netwt', 'wc_supplier', 'wc_partyloadwt', 'wc_partyemptywt', 'wc_partynetwt', 'wc_acceptedwt', 'wc_process', 'wt_type', 'wt_grn_process', 'wc_itemcode','tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state','qc_fuel_total_ded_qty','qc_fuel_billno','qc_fuel_billdate','qc_fuel_billvalue',
'qc_fuel_billqty','qc_fuel_millqty','qc_fuel_debitnote_date'

      ]),
    });




 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name','qc_fuel_supcode', 'cust_taxtag' 
      ]),
    });




 var LoadQCInsNoListDataStore = new Ext.data.Store({
      id: 'LoadQCInsNoListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entryno'
      ]),
    });



    var txtDNNo = new Ext.form.TextField({
        fieldLabel: 'Debit Note No',
        id: 'txtDNNo',
        width: 100,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: ' Date',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
        }  	
        
    });


 var loadQCFuelEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCFuelEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCFuelEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_ticketwt', 'qc_fuel_itemcode', 
 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mios_arb_rate', 'qc_fuel_mois_arb_value', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_mois_adb_rate', 'qc_fuel_mois_adb_value', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_ash_rate', 'qc_fuel_ash_value', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_volatile_rate', 'qc_fuel_volatile_value', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fixedcarbon_rate', 'qc_fuel_fixedcarbon_value', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_iron_rate', 'qc_fuel_iron_value', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_adb_rate', 'qc_fuel_gcv_adb_value', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_gcv_arb_rate', 'qc_fuel_gcv_arb_value', 'itmh_name',  'cust_code', 'sup_name','cust_ref','qc_fuel_slno', 'wc_area_code','wc_unloadingtime','area_name','qc_fuel_area','qc_fuel_unloadingtime',
'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc','wc_partynetwt',
'qc_fuel_billqty','qc_fuel_millqty','qc_fuel_debitnote_date'

      ]),
    });


var dtEntDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtEntDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
    listeners:{

    }
    
});


var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel: 'QC Ins. No',
        width           : 100,
        displayField    : 'qc_fuel_entryno', 
        valueField      : 'qc_fuel_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadQCInsNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){
            	loadQCFuelEntryNoDetailDatastore.removeAll();
		loadQCFuelEntryNoDetailDatastore.load({
		 	url:'ClsFuDebitNote.php',
			params:
	   		{
			task:"loadQCFuelEntryNoDetail",
			finid    : ginFinid,
			compcode : ginCompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
			},
		callback:function(){

          var Cnt = loadQCFuelEntryNoDetailDatastore.getCount();


			dtEntDate.setRawValue(Ext.util.Format.date(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_entrydate'),'d-m-Y'));
	                txtTruckNo.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_truck'));

                        txtTicketNo.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketno'));

                        cmbItemName.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_itemcode')); 
                        cmbItemName.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_name')); 


                        var acceptedwt =  loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketwt');

                        acceptedwt = Ext.util.Format.number(Number(acceptedwt),"0.0") 
			txtAcceptedQty.setRawValue(acceptedwt);
                        var billwt =  loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_billqty');
                        billwt = Ext.util.Format.number(Number(billwt),"0.0") 
			txtBillQty.setRawValue(billwt);

                        var millwt =  loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_millqty');
                        millwt = Ext.util.Format.number(Number(millwt),"0.0") 
			txtMillQty.setRawValue(millwt);

                        txtFixedMoisPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_fixed'));
                        txtActualMoisPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_actual'));
                        txtDiffMoisPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff'));

                        txtMoisQty.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_qty'));

                        txtFixedFinesPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_fixed'));
                        txtActualFinesPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_actual'));
                        txtDiffFinesPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff'));

                        txtFinesQty.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty'));



                        txtFixedSandPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_fixed'));
                        txtActualSandPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_actual'));
                        txtDiffSandPer.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff'));

                        txtSandQty.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_qty'));


                        find_value();  
	
                 }    
	        });
           }
        }  
    });


   var txtRemarks = new Ext.form.TextField({
        fieldLabel: 'Remarks',
        id: 'txtRemarks',
        width: 800,
        height: 40,
        name: 'txtRemarks',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners: {

        }
    });

var cmbDNNo = new Ext.form.ComboBox({
        fieldLabel: 'Debit Note No',
        width           : 100,
        displayField    : 'dbcr_vouno', 
        valueField      : 'dbcr_vouno',
        hiddenName      : '',
        id              : 'cmbDNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadDebitNoteVoucherListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           select: function(){


		LoadDebitNoteVoucherDetailDataStore.removeAll();
		LoadDebitNoteVoucherDetailDataStore.load({
		url: 'ClsFuDebitNote.php',
		params:
		{
			task:"LoadDebitNoteVoucherDetail",
			fincode : ginFinid,
			compcode: ginCompcode,
                        vouno   : cmbDNNo.getRawValue(),
		},
	        callback: function () {

		      var cnt = LoadDebitNoteVoucherDetailDataStore.getCount();
		      if (cnt>0)
		      {

                        txtDNNo.setRawValue(cmbDNNo.getRawValue());

                        cmbQCEntNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_entryno'));
                        cmbQCEntNo.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_entryno'));
                        txtSupplierName.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('cust_ref'));
             		ledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('cust_code');
                	supcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_supcode');
	         	suptype = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('cust_taxtag');
                        
			dtpVouDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_debitnote_date'),'d-m-Y'));

			dtEntDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_entrydate'),'d-m-Y'));

                        txtPartyBillNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_billno')); 
                        txtPartyBillValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_billvalue')); 
			dtpPartyBilldate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_billdate'),'d-m-Y'));


	                txtTruckNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_truck'));

                        txtTicketNo.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_ticketno'));

                        cmbItemName.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_itemcode')); 
                        cmbItemName.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('itmh_name')); 


                        var acceptedwt =  LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_ticketwt');

                        acceptedwt = Ext.util.Format.number(Number(acceptedwt),"0.0") 
			txtAcceptedQty.setRawValue(acceptedwt);


                        var billwt =  LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_billqty');
                        billwt = Ext.util.Format.number(Number(billwt),"0.0") 
			txtBillQty.setRawValue(billwt);

                        var millwt =  LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_millqty');
                        millwt = Ext.util.Format.number(Number(millwt),"0.0") 
			txtMillQty.setRawValue(millwt);


                        txtFixedMoisPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_arb_fixed'));
                        txtActualMoisPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_arb_actual'));
                        txtDiffMoisPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_arb_diff'));

                        txtMoisQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_arb_qty'));

                        txtFixedFinesPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_fixed'));
                        txtActualFinesPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_actual'));
                        txtDiffFinesPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_diff'));

                        txtFinesQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_qty'));



                        txtFixedSandPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_fixed'));
                        txtActualSandPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_actual'));
                        txtDiffSandPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_diff'));

                        txtSandQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_qty'));


   otherdiffvalue =  Number(txtOtherDedQty.getValue())/1000 * Number(txtOthDedRate.getValue());



                        txtDiffQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_qtydiff_qty'));
                        txtDiffRate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_qtydiff_rate'));
                        txtMoisRate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_rate'));
                        txtFinesRate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_rate'));
                        txtSandRate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_rate'));
                        txtDiffValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_qtydiff_value'));
                        txtMoisValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_value'));
                        txtFinesValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_value'));
                        txtSandValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_value'));   
                       txtOtherDedQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_othded_qty'))
                       txtOthDedRate.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_othded_rate'))
                       txtOthDedValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_othded_value'));
  
                       txtTotDedQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_totded_qty'));

                       txtTotalDedValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_tot_taxable'));

                       txtCGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstper'));
                       txtSGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstper'));
                       txtIGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstper'));
                       cgstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstledcode');
                       sgstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstledcode');
                       igstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstledcode');
                       cgstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstledger');
                       sgstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstledger');
                       igstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstledger');
		       txtCGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_cgst_value'));
	               txtSGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sgst_value'));
		       txtIGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_igst_value'));

			txtDebitValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_debitamount'));
			txtRounding.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_rounding'));


                        if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_round_need') == "Y")
                           Ext.getCmp('optRounding').setValue(1);  
                        else
                           Ext.getCmp('optRounding').setValue(2);  

			txtDiffRemarks.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_qtydiff_remarks'));                    
			txtMoisRemarks.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_mois_remarks'));
			txtFinesRemarks.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_fines_remarks'));
			txtSandRemarks.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_sand_remarks'));
			txtOthDedRemarks.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_otherded_remarks'));
                txtTotDedQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_total_ded_qty'));

		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
                  url: 'ClsFuDebitNote.php',
		  params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                                gsttype  : dngsttype,  

			},
		    callback: function () {
                        cmbPurchaseLedger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_fuel_pur_ledger'));
  
	            }
                        
		});
		      }    

	        }
		});


           }
        }  
    });


function loadqcnolist()
{
        LoadQCInsNoListDataStore.removeAll();
        LoadQCInsNoListDataStore.load({
		url: 'ClsFuDebitNote.php',
		params:
		{
			task:"loadQCNoList",
			suppcode : supcode,
                        compcode : ginCompcode,
		},

        });

}

function grid_tot(){


        var dr = 0;
        var cr = 0;


	var Row2= flxAccounts.getStore().getCount();
        flxAccounts.getSelectionModel().selectAll();
        var sel2=flxAccounts.getSelectionModel().getSelections();
        for(var i=0;i<Row2;i++)
        {
            dr=dr+Number(sel2[i].data.debit);
            cr=cr+Number(sel2[i].data.credit);
         }

         flxAccounts.getSelectionModel().clearSelections();
         txttotDebit.setRawValue(Ext.util.Format.number(dr,'0.00'));
         txttotCredit.setRawValue(Ext.util.Format.number(cr,'0.00'));

}




function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('led_code'));
	if ((selrow != null)){
		ledcode = selrow.get('led_code');
		supcode = selrow.get('qc_fuel_supcode');
		suptype = selrow.get('cust_taxtag');
		txtSupplierName.setValue(selrow.get('led_name'));
		flxLedger.hide();
                cmbQCEntNo.focus();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsFuDebitNote.php',
			params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                                gsttype : dngsttype,  

			},
		});

                loadqcnolist();



             

	}

}



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxLedger,
        x: 15,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'qc_fuel_supcode',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_taxtag',sortable:true,width:50,align:'left'},

        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
   }
   });


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsFuDebitNote.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSupplierName.getRawValue(),
		},
        });
}




var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   cmbQCEntNo.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    });

 


function flxaccupdation() {
        var lcode = 0;
        var lname = "";
        var amt   = 0;    
        var dbamt = 0;
        var cramt = 0;
            txtRemarks.setRawValue("Being Debited to your Account for " +    txtDiffRemarks.getRawValue() + " " + txtMoisRemarks.getRawValue() + " " + txtFinesRemarks.getRawValue() + " " +   txtSandRemarks.getRawValue() + " " + txtOthDedRemarks.getRawValue() + " Against your Bill No." + txtPartyBillNo.getRawValue()+ " Dt. " + Ext.util.Format.date(dtpPartyBilldate.getValue(),"d-m-Y") + " Truck : " + txtTruckNo.getRawValue()  ) ;
        flxAccounts.getStore().removeAll();
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : ledcode,
	      ledname   : txtSupplierName.getRawValue(),
	      debit     : txtDebitValue.getRawValue(),
              credit    : 0,
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
              ledtype   : "P",
              }) 
        );
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : cmbPurchaseLedger.getValue(),
	      ledname   : cmbPurchaseLedger.getRawValue(),
	      debit     : 0,
              credit    : txtTotalDedValue.getRawValue(),
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
              ledtype   : "G",
              }) 
        );


        if (Number(txtCGSTValue.getValue()) > 0)
        {      
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : cgstledcode,
		      ledname   : cgstledger,
		      debit     : 0,
		      credit    : txtCGSTValue.getRawValue(),
		      billno    : txtPartyBillNo.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
        }

        if (Number(txtSGSTValue.getValue()) > 0)
        {      
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : sgstledcode,
		      ledname   : sgstledger,
		      debit     : 0,
		      credit    : txtSGSTValue.getRawValue(),
		      billno    : txtPartyBillNo.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
        }

        if (Number(txtIGSTValue.getValue()) > 0)
        {      
		var RowCnt1 = flxAccounts.getStore().getCount() + 1;
		flxAccounts.getStore().insert(
		  flxAccounts.getStore().getCount(),
		  new dgrecord({
		      slno      : RowCnt1,
		      ledcode   : igstledcode,
		      ledname   : igstledger,
		      debit     : 0,
		      credit    : txtIGSTValue.getRawValue(),
		      billno    : txtPartyBillNo.getRawValue(),
		      billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
		      ledtype   : "G",
		      }) 
		);
        }

//Rounding off

	var dr = 0;
	var cr = 0;
	if (txtRounding.getValue() >0)
	   cr = txtRounding.getValue();
	else
	   dr = txtRounding.getValue()*-1;



        if (txtRounding.getValue() != 0)
        {
        var RowCnt1 = flxAccounts.getStore().getCount() + 1;
        flxAccounts.getStore().insert(
          flxAccounts.getStore().getCount(),
          new dgrecord({
              slno      : RowCnt1,
	      ledcode   : 1859,
	      ledname   : 'ROUNDED OFF',
	      debit     : Ext.util.Format.number(dr,'0.00'),
              credit    : Ext.util.Format.number(cr,'0.00'),
              billno    : txtPartyBillNo.getRawValue(),
              billdt    : Ext.util.Format.date(dtpPartyBilldate.getValue(),"Y-m-d"),
              ledtype   : "G",
              }) 
        );
       }
       grid_tot();

}

    function RefreshData() {
          DebitNoteFormPanel.getForm().reset();
          flxAccounts.getStore().removeAll();
          gstFlag = "Add";
	  cmbDNMoisYN.setValue('Y');
	  cmbDNFinesYN.setValue('Y');
          cmbDNSandYN.setValue('Y');
               LoadDebitNoteVoucherListDataStore.load({
                   url: 'ClsFuDebitNote.php',
	           params: {
			task: 'LoadDebitNoteVoucherListAccounts',
			fincode : ginFinid,
			compcode: ginCompcode,

	          },
		  callback: function () {

	          }
		});
    }


var tabFuelDN = new Ext.TabPanel({
    id          : 'tabFuelDN',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 370,
    width       : 1220,	
 //   x           : 10,
//    y           : 0,
    listeners: {

     'tabchange': function(tabPanel, tab) {
             var activeTab = tabFuelDN.getActiveTab();
             if (activeTab.id == 'tab2' && cmbPurchaseLedger.getValue() > 0 )
             {
                flxaccupdation(); 
                grid_tot();
             }
             else
            {
                if (Number(txtDebitValue.getValue()) > 0 && cmbPurchaseLedger.getValue() == 0)
                   alert("Select Purchase Ledger...");
                tabFuelDN.setActiveTab(0);
                cmbPurchaseLedger.focus(); 

            }
        }
    },
    items  : [
           {
             xtype: 'panel',
             id   : 'tab1', 
             title: 'Qty & Value Details',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 80,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblFixed]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 185,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblActual]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 290,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDiff]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 383,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDedQty]
		                },

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 485,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDNYN]
		                },

		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 592,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblRate]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 700,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblValue]
		                },
		               {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    width       : 120,
		                    x           : 805,
		                    y           : 35,
		                    defaultType : 'Label',
		                    border      : false,
		                    items: [lblDescription]
		                },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 430,
                                	x           : 10,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbItemName]
                            	},

        
				 {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 110,
		                    width       : 500,
		                    x           : 500,
		                    y           : 0,
		                    border      : false,
		                    items: [cmbPurchaseLedger]
		                },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 360,
                                	width       : 600,
                                	x           : 10,
                                	y           : 55,
                                    	border      : false,
                                	items: [txtDiffQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 570,
                                	y           : 55,
                                    	border      : false,
                                	items: [txtDiffRate]
                            	},   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 670,
                                	y           : 55,
                                    	border      : false,
                                	items: [txtDiffValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 450,
                                	x           : 770,
                                	y           : 55,
                                    	border      : false,
                                	items: [txtDiffRemarks]
                            	}, 
                	

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 10,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtFixedMoisPer]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 110,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtActualMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 210,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtDiffMoisPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 170,
                                	x           : 310,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtMoisQty]
                            	},    
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 410,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbDNMoisYN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 570,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtMoisRate]
                            	},   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 670,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtMoisValue]
                            	},  
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 450,
                                	x           : 770,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtMoisRemarks]
                            	},  
  
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 10,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtFixedFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 110,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtActualFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 210,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtDiffFinesPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 170,
                                	x           : 310,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtFinesQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 410,
                                	y           : 105,
                                    	border      : false,
                                	items: [cmbDNFinesYN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 570,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtFinesRate]
                            	},   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 670,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtFinesValue]
                            	},  

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 450,
                                	x           : 770,
                                	y           : 105,
                                    	border      : false,
                                	items: [txtFinesRemarks]
                            	},  
  
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 10,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtFixedSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 110,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtActualSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 210,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtDiffSandPer]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 170,
                                	x           : 310,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtSandQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 220,
                                	x           : 410,
                                	y           : 130,
                                    	border      : false,
                                	items: [cmbDNSandYN]
                            	},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 570,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtSandRate]
                            	},   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 670,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtSandValue]
                            	},  

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 450,
                                	x           : 770,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtSandRemarks]
                            	},  
  

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 360,
                                	width       : 600,
                                	x           : 10,
                                	y           : 155,
                                    	border      : false,
                                	items: [txtOtherDedQty]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 570,
                                	y           : 155,
                                    	border      : false,
                                	items: [txtOthDedRate]
                            	},   
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 120,
                                	x           : 670,
                                	y           : 155,
                                    	border      : false,
                                	items: [txtOthDedValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 450,
                                	x           : 770,
                                	y           : 155,
                                    	border      : false,
                                	items: [txtOthDedRemarks]
                            	},  
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 360,
                                	width       : 600,
                                	x           : 10,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 500,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtTotalDedValue]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 500,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtCGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 500,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtCGSTValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 500,
                                	y           : 245,
                                    	border      : false,
                                	items: [txtSGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 500,
                                	y           : 245,
                                    	border      : false,
                                	items: [txtSGSTValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 500,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtIGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 500,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtIGSTValue]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 500,
                                	x           : 780,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtRounding]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 500,
                                	y           : 300,
                                    	border      : false,
                                	items: [txtDebitValue]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 960,
                                	y           : 200,
                                    	border      : false,
                                	items: [optRounding]
                            	},

            ]
           },
           {
             xtype: 'panel',
             id   : 'tab2', 
             title: 'Ledger Posting Details',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 210,
                    width: 1200,
                    labelWidth:85,
                    x:10 ,  
                    y:30 ,
                    items: [flxAccounts]
                 },

		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 100,
		         y           : 240,
		         border      : false,
                         labelWidth  : 90,
		         items:[txttotDebit],
                       },
		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
		         x           : 400,
		         y           : 240,
		         border      : false,
                         labelWidth  : 90,
		         items:[txttotCredit],
                       },


		      {  xtype       : 'fieldset',
		         title       : '',
		         width       : 900,
		         x           : 50,
		         y           : 280,
		         border      : false,
                         labelWidth  : 90,
		         items:[txtRemarks],
                       },

             ]
           },
    ]     
 });
             

function accupd_click()
{

                            var gstInsert = "true";

                            var fromdate;
                            var todate;
                            var gstRefno;
                            fromdate = "04/01/" + gstfinyear.substring(0, 4);
                            todate = "03/31/" + gstfinyear.substring(5, 9);


                            if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") < Ext.util.Format.date(fromdate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d") > Ext.util.Format.date(todate, "Y-m-d")) {
                                Ext.MessageBox.alert("Alert", "Voucher Date not in current finyear");
                            } else if (supcode == 0) {
                                Ext.MessageBox.alert("Debit Note", "Party Name Should Not be Empty");
                            } 
			    else if (flxAccounts.getStore().getCount()==0)
				    {
					Ext.Msg.alert('Debit Note','Grid should not be empty..');
					gstSave="false";
				    }
                           else {
                                gstInsert = "true";



                                if (gstInsert === "true") {
                                    Ext.Msg.show({
                                        title: 'Debit Note',
                                        icon: Ext.Msg.QUESTION,
                                        buttons: Ext.MessageBox.YESNO,
                                        msg: 'Update This Debit Note in Accounts?',
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                               var accData = flxAccounts.getStore().getRange();
                                               var accupdData = new Array();
                                               Ext.each(accData, function (record) {
                                                  accupdData.push(record.data);
                                               });

                                                Ext.Ajax.request({
                                                    url: 'TrnDebitNoteAccountsSave.php',
                                                    params: {
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        cnt: accData.length,
                                                        savetype: gstFlag,
                                                        finid: ginFinid,
                                                        finyear: gstfinyear,
                                                        compcode: ginCompcode,

                                                        accrefseq : accseqno,
                                                        dncrseqno : dncrseqno,
                                                        conval    : vouseqno,

                                                        vouno: txtDNNo.getRawValue(),
                                                        voudate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        bankname: "",
                                                        refno: "",
                                                        refdate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        narration: txtMoisRemarks.getRawValue(),
                                                        voutype: dntype,
                                                        paymode: "",
                                                        output: 'N',
                                                        payno: "",
                                                        paydate: Ext.util.Format.date(dtpVouDate.getValue(), "Y-m-d"),
                                                        party   : supcode,
                                                        partyledcode : ledcode,
                                                        drcrledger: cmbPurchaseLedger.getValue(),
                                                        tdsper  : 0,
                                                        tdsvalue: 0,
                                                        taxtype: '0',
                                                        cgstper: txtCGSTPer.getValue(),
                                                        cgstval: txtCGSTValue.getRawValue(),
                                                        sgstper: txtSGSTPer.getValue(),
                                                        sgstval: txtSGSTValue.getRawValue(),
                                                        igstper: txtIGSTPer.getValue(),
                                                        igstval: txtIGSTValue.getRawValue(),


                                                        TCSVAL: 0,
                                                        taxable: Number(txtTotalDedValue.getValue()),
                                                        debitvalue: Number(txtDebitValue.getValue()),

                                                        billmode: billflag,
                                             
                                                        cgst  : cgstledcode,
                                                        sgst  : sgstledcode,
                                                        igst  : igstledcode,
//''                                                        cnt: accData.length,
                                                        gltype : suptype,
                                                        invno  :  txtPartyBillNo.getRawValue(),
                                                        invdate :  Ext.util.Format.date(dtpPartyBilldate.getValue(), "Y-m-d"),
                                                        invqty  :  txtBillQty.getRawValue(),
                                                        invamt  :  txtPartyBillValue.getRawValue(),

                                                        rounding : txtRounding.getValue(),
                                                        usercode : GinUserid, 
                                                        reason   : txtRemarks.getRawValue(), 
//-- Additional 
                                                        qtydiff        : txtDiffQty.getValue(),
                                                        qtydiffrate    : txtDiffRate.getValue(),
                                                        qtydiffvalue   : txtDiffValue.getValue(),
                                                        qtydiffremarks : txtDiffRemarks.getRawValue(), 
          
                                                        moisdnyn       : dnmoisyn,
                                                        moisrate       : txtMoisRate.getValue(),
                                                        moisvalue      : txtMoisValue.getValue(),
                                                        moisremarks    : txtMoisRemarks.getRawValue(), 

                                                        finesdnyn       : dnfinesyn,
                                                        finesrate       : txtFinesRate.getValue(),
                                                        finesvalue      : txtFinesValue.getValue(),
                                                        finesremarks    : txtFinesRemarks.getRawValue(), 

                                                        sanddnyn       : dnsandyn,
                                                        sandrate       : txtSandRate.getValue(),
                                                        sandvalue      : txtSandValue.getValue(),
                                                        sandremarks    : txtSandRemarks.getRawValue(), 

                                                        othdedqty      : txtOtherDedQty.getValue(),
                                                        othdedrate     : txtOthDedRate.getValue(),
                                                        othdedvalue    : txtOthDedValue.getValue(),
                                                        othdedremarks  : txtOthDedRemarks.getRawValue(), 

                                                        totaldedqty    : txtTotDedQty.getValue(),
                                                        roundneed      : roundoff,    
                                                        qcentryno      : cmbQCEntNo.getValue(),


                                                    },

                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] === "true") {

							    Ext.MessageBox.alert("Record saved with Voucher No - -" + obj['vouno']);
							    DebitNoteFormPanel.getForm().reset();
							    flxAccounts.getStore().removeAll();
							    RefreshData();


                                                        } else {
                                                            Ext.MessageBox.alert("Alert", "Record not saved - " + obj['vouno']);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
}





    flxLedger.hide(); 
    var DebitNoteFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Debit Note',
        header: false,
//        bodyStyle: {"background-color": "#acbf95"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        width: 450,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'DebitNoteFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
//            bodyStyle: "background: #d7d5fa;",
            height: 40,
  //          style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [

//VIEW
                {
                    text: 'View',
                    id: 'view',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(ginCompcode);
				var fincode = "&fincode=" + encodeURIComponent(ginFinid);
				var vouno = "&vouno=" + encodeURIComponent(cmbDNNo.getRawValue());

                                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-  d"));	
                                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-  d"));	


				var param =(compcode+fincode+vouno+fromdate+todate);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelDebitNote.rptdesign&__format=pdf&' + param, '_blank'); 
                        }
                    }
                }, '-',


                {
//CANCEL
                    text: 'CANCEL',
                    id  : 'doccancel',
                    style: 'text-align:center;',
                    tooltip: 'Cancel Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                              Ext.getCmp('txtPass').show();
                        }
                    }
                }, '-',

//accounts update
                {
                    text: 'ACCOUNTS - UPDATE',
                    id  : 'accupdate',
                    style: 'text-align:center;',
                    tooltip: 'Update in Accounts...',
                    height: 40,
                    fontSize: 30,
                    width: 80,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                                  accupd_click();
                        }
                    }
                }, '-',


                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            TrnDebitNoteWindow.hide();
                        }
                    }
                }]
        },
        items: [

            {
                xtype: 'fieldset',
                title: '',
                width: 500,
                height: 45,
                x: 400,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 450,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtDNNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 130,
                        width: 300,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbDNNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 60,
                        width: 200,
                        x: 280,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpVouDate]
                    },


                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 1250,
                height: 460,
                x: 30,
                y: 60,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 600,
                        x: 10,
                        y: 10,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtSupplierName]
                    }, flxLedger,

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 300,
                        x: 500,
                        y: 10,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTruckNo]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 300,
                        x: 500,
                        y: 40,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTicketNo]
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 600,
                        x: 10,
                        y: 40,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbQCEntNo]
                    },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 290,
                                	y           : 40,
                                    	border      : false,
                                	items: [dtEntDate]
                            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 750,
                        y: -5,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtPartyBillNo]
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 750,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpPartyBilldate]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 750,
                        y: 45,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtBillQty]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 1000,
                        y: -5,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtPartyBillValue]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 1000,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtMillQty]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 600,
                        x: 1000,
                        y: 45,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAcceptedQty]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 1200,
                        x: 10,
                        y: 70,
                        defaultType: 'textfield',
                        border: false,
                        items: [tabFuelDN]
                    },
                ]
            },   


        ] 
    }); 
    var TrnDebitNoteWindow = new Ext.Window({
	height      :  600,
        width       : 1320,
        x	     : 20,
        y           : 35,
        title       : 'Debtie Note (Fuel)',
        items       : DebitNoteFormPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#FFFEF2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
               Ext.getCmp('txtDNNo').setVisible(true);
			RefreshData();

                       Ext.getCmp('accupdate').setDisabled(true);  

	   			 }
			
		}
    });
    TrnDebitNoteWindow.show();  
});
