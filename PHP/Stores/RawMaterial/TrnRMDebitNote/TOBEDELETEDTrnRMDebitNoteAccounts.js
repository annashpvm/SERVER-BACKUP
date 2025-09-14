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
   var remarks = '';
  var cmbQtyYN = new Ext.form.ComboBox({
        fieldLabel      : 'Qty Corrections',
        width           : 80,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQtyYN',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','YES'],['N','NO']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });



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





var loadDNVouNoDatasore = new Ext.data.Store({
  id: 'loadDNVouNoDatasore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRMDebitNote.php',      // File to connect to
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
            url: 'ClsRMDebitNote.php',      // File to connect to
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
            url: 'ClsRMDebitNote.php',      // File to connect to
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
	{header: "Led.Code",    dataIndex: 'ledcode',sortable:true,width:60,align:'left',hidden:true},
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



var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:260,
    height: 165,
    hidden:false,
    width: 1255,
    id: 'my-grid',  
    autoShow: true,
    columns:
    [
        {header: "S.No", dataIndex: 'slno',sortable:true,width:40,align:'left',hidden : true},
        {header: "Ticket", dataIndex: 'ticketno',sortable:true,width:50,align:'left'},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:180,align:'left' },
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:18,align:'left',hidden : true},
        {header: "Party Wt", dataIndex: 'billwt',sortable:true,width:80,align:'right'},
        {header: "Mill Wt", dataIndex: 'millwt',sortable:true,width:80,align:'right'},
        {header: "Accepted", dataIndex: 'ticketwt',sortable:true,width:80,align:'right'},
        {header: "Shortage", dataIndex: 'shortage',sortable:true,width:80,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('shortage')));
                            calculateValue();
                        },
                        blur: function () {
              //              this.setValue(0);
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
        calculateValue();
//                          this.setValue(Number(selrow.get('shortage')));
                        }
                    },

                },

                listeners: {
                    click: function () {
                        calculateValue()
                    },

                },

        },
        {header: "M.Board", dataIndex: 'millboard',sortable:true,width:80,align:'right'},
        {header: "Mois", dataIndex: 'moisqty',sortable:true,width:70,align:'right'},
        {header: "LLess", dataIndex: 'lifelessqty',sortable:true,width:70,align:'right'},
        {header: "Reject", dataIndex: 'rejectqty',sortable:true,width:70,align:'right'},
        {header: "Degrade", dataIndex: 'degradeqty',sortable:true,width:80,align:'right'},
        {header: "DN.Qty", dataIndex: 'totDNqty',sortable:true,width:100,align:'right',

                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        


                        focus: function () {
		                    var sm = flxDetail.getSelectionModel();
		                    var selrow = sm.getSelected();
		                    this.setValue(Number(selrow.get('totDNqty')));
                        },
                        blur: function () {
                 //           this.setValue(0);
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
         //                  this.setValue(Number(selrow.get('totDNqty')));

                        }

                    },



                },

                listeners: {
                    click: function () {
                        calculateValue()
                    },

                },
        },
        {header: "Rate", dataIndex: 'rate',sortable:true,width:70,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('rate')));
                          
                        },
                        blur: function () {
                            this.setValue(0);
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
         //                 this.setValue(Number(selrow.get('rate')));
                        }
                    },

                },

                listeners: {
                    click: function () {
                        calculateValue()
                    },

                },

        },
        {header: "Value", dataIndex: 'value',sortable:true,width:70,align:'right',sortable: false,defaultSortable: false,menuDisabled: true, },
        {header: "Diff Rate", dataIndex: 'ratediff',sortable:true,width:70,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('ratediff')));
                          
                        },
                        blur: function () {
                            this.setValue(0);
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
         //                 this.setValue(Number(selrow.get('rate')));
                        }
                    },

                },

                listeners: {
                    click: function () {
                        calculateValue()
                    },

                },

        },
        {header: "Final Wt", dataIndex: 'acceptqty',sortable:true,width:80,align:'right'},

/*
        {header: "Rate", dataIndex: 'rate2',sortable:true,width:70,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('rate2')));  
                         },
                        blur: function () {
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                        },

                        }
                },
                listeners: {
                    click: function () {
                        calculateValue();
                    }
                }
        },
        {header: "Value", dataIndex: 'value2',sortable:true,width:70,align:'right'},
*/

//        {header: "Tot Value", dataIndex: 'totvalue',sortable:true,width:80,align:'right'},
//        {header: "Tot Ded.Qty", dataIndex: 'totaldeductionqty',sortable:true,width:70,align:'right'},
        {header: "type", dataIndex: 'itemtype',sortable:true,width:100,align:'left'},
        {header: "SeqNo", dataIndex: 'seqno',sortable:true,width:100,align:'left' ,hidden:true },

        {header: "DiffValue", dataIndex: 'valuediff',sortable:true,width:70,align:'right',sortable: false,defaultSortable: false,menuDisabled: true, },


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
		url: 'ClsRMDebitNote.php',
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

                flxaccupdation(); 
                grid_tot(); 
  
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

 function loadqclist()
 {
        LoadQCInsNoListDataStore.removeAll();
        LoadQCInsNoListDataStore.load({
		url: 'ClsRMDebitNote.php',
		params:
		{
			task:"loadQCNoList",
			suppcode : supcode,
                        compcode : ginCompcode,
                        ticket   : txtTicketNo.getValue(),
		},

        });
}

 var txtTicketNo = new Ext.form.TextField({
        fieldLabel  : 'Ticket No',
        id          : 'txtTicketNo',
        name        : 'txtTicketNo',
        width       :  100,
	border : true,
       // style       :  {border-radius:5},
        allowBlank  :  false,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px; ",	
    enableKeyEvents: true,   
    tabindex : 1,
    listeners:{
               blur:function(){
              loadqclist();
           },
           keyup:function(){
              loadqclist();
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



var txtTotAcceptedQty = new Ext.form.TextField({
        fieldLabel  : 'Total Accepted Qty',
        id          : 'txtTotAcceptedQty',
        name        : 'txtTotAcceptedQty',
        width       :  100,
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



var txtTotDedQty = new Ext.form.TextField({
        fieldLabel  : 'Total Deduction Qty',
        id          : 'txtTotDedQty',
        name        : 'txtTotDedQty',
        width       :  100,
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



var txtTotRateDedValue = new Ext.form.TextField({
        fieldLabel  : 'Rate Deduction Value',
        id          : 'txtTotRateDedValue',
        name        : 'txtTotRateDedValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle : "font-size:14px;font-weight:bold;color:#7d0835",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
	listeners:{

        }
}); 


var txtTotQtyDedValue = new Ext.form.TextField({
        fieldLabel  : 'Qty Deduction Value',
        id          : 'txtTotQtyDedValue',
        name        : 'txtTotQtyDedValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle : "font-size:14px;font-weight:bold;color:#7d0835",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
	listeners:{

        }
}); 

var txtTotDedValue = new Ext.form.TextField({
        fieldLabel  : 'Total Deduction Value',
        id          : 'txtTotDedValue',
        name        : 'txtTotDedValue',
        width       :  100,

        allowBlank  :  false,
	tabindex : 1,
	//readOnly : true, 
    	enableKeyEvents: true, 
        labelStyle : "font-size:14px;font-weight:bold;color:#7d0835",
        readOnly        : true,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
	listeners:{

        }
}); 


var txtTotFinalQty = new Ext.form.TextField({
        fieldLabel  : 'Total Final Qty',
        id          : 'txtTotFinalQty',
        name        : 'txtTotFinalQty',
        width       :  100,
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
   var cgstamt = 0;
   var sgstamt = 0;
   var igstamt = 0;

   totvalue =   txtTotDedValue.getValue();


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

   



} // function end

var LoadDebitNoteVoucherListDataStore = new Ext.data.Store({
      id: 'LoadDebitNoteVoucherListDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMDebitNote.php',      // File to connect to
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
                url: 'ClsRMDebitNote.php',     // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadDebitNoteVoucherDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'qc_rm_compcode', 'qc_rm_fincode', 'qc_rm_entryno', 'qc_rm_entrydate', 'qc_rm_ticketdate', 'qc_rm_supcode', 'qc_rm_truck', 'qc_rm_slno', 'qc_rm_ticketno', 'qc_rm_ticketwt', 'qc_rm_itemcode', 'qc_rm_millboard', 'qc_rm_moisper_totalmaterial', 'qc_rm_moisforqty', 'qc_rm_moisper', 'qc_rm_moisqty', 'qc_rm_llessper', 'qc_rm_llessqty', 'qc_rm_rejectper', 'qc_rm_rejectqty', 'qc_rm_degradeqty', 'qc_rm_acceptqty', 'qc_rm_remarks', 'qc_rm_packtype', 'qc_rm_area', 'qc_rm_unloadingtime', 'qc_rm_grn_status', 'qc_rm_grnno', 'qc_rm_remarks2', 'qc_rm_itemtype', 'qc_rm_fsctype', 'qc_rm_billno', 'qc_rm_billdate', 'qc_rm_billqty', 'qc_rm_millqty', 'qc_rm_ded_qty1', 'qc_rm_ded_rate', 'qc_rm_degrade_rate', 'qc_rm_ded_qty', 'qc_rm_taxable', 'qc_rm_pur_ledger', 'qc_rm_cgst_per', 'qc_rm_cgst_value', 'qc_rm_sgst_per', 'qc_rm_sgst_value', 'qc_rm_igst_per', 'qc_rm_igst_value', 'qc_rm_debitvalue', 'qc_rm_dn_raised', 'qc_rm_debitnote_no', 'qc_rm_debitnote_date', 'qc_rm_itemmois', 'qc_rm_round_need', 'qc_rm_rounding', 'qc_rm_debitamount', 'qc_rm_billvalue', 'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_group', 'itmh_outthrough', 'itmh_prohiper', 'itmh_hsncode', 'itmh_cgstper', 'itmh_sgstper', 'itmh_igstper', 'itmh_cgstledcode', 'itmh_sgstledcode', 'itmh_igstledcode', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'sup_acc_group', 'sup_contact', 'sup_panno', 'sup_tds_type', 'sup_gstin', 'sup_gst_type', 'sup_tds_yn', 'sup_tcs_yn', 'sup_lock', 'createdby', 'createddate', 'seqno', 'wc_compcode', 'wc_fincode', 'wc_ticketno', 'wc_date', 'wc_time', 'wc_area_code', 'wc_sup_code', 'wc_item', 'wc_vehicleno', 'wc_emptywt', 'wc_loadwt', 'wc_netwt', 'wc_supplier', 'wc_partyloadwt', 'wc_partyemptywt', 'wc_partynetwt', 'wc_acceptedwt', 'wc_process', 'wt_type', 'wt_grn_process', 'wc_itemcode', 'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode', 'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state','qc_rm_taxable','qc_rm_ded_rate','qc_rm_shortage','qc_rm_ratediff','qc_rm_valuediff'

      ]),
    });




 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name','qc_rm_supcode', 'sup_type' 
      ]),
    });




 var LoadQCInsNoListDataStore = new Ext.data.Store({
      id: 'LoadQCInsNoListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entryno'
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


 var loadQCRMEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCRMEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRMDebitNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCRMEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entrydate', 'qc_rm_ticketdate', 'qc_rm_supcode', 'qc_rm_truck', 'qc_rm_ticketno', 'qc_rm_ticketwt', 'qc_rm_itemcode', 'qc_rm_moisper', 'qc_rm_moisqty', 'qc_rm_llessper', 'qc_rm_llessqty', 'qc_rm_rejectper','qc_rm_moisfor',  'qc_rm_rejectqty', 'qc_rm_degradeqty', 'qc_rm_acceptqty', 'qc_rm_remarks','qc_rm_remarks2', 'qc_rm_packtype', 'itmh_name',  'sup_code','sup_refname','qc_rm_itemmois', 'sup_name','qc_rm_moisper_totalmaterial', 'qc_rm_moisforqty','qc_rm_millboard','qc_rm_billqty','qc_rm_millqty', 'sup_refname','qc_rm_slno','wc_area_code','wc_unloadingtime','area_name','qc_rm_area','qc_rm_unloadingtime','qc_rm_itemtype'

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
        displayField    : 'qc_rm_entryno', 
        valueField      : 'qc_rm_entryno',
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
            	loadQCRMEntryNoDetailDatastore.removeAll();
		loadQCRMEntryNoDetailDatastore.load({
		 	url:'ClsRMDebitNote.php',
			params:
	   		{
			task:"loadQCRMEntryNoDetail",
			finid    : ginFinid,
			compcode : ginCompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
			},
		callback:function(){

                        flxDetail.getStore().removeAll();
                        var Cnt = loadQCRMEntryNoDetailDatastore.getCount();

			dtEntDate.setRawValue(Ext.util.Format.date(loadQCRMEntryNoDetailDatastore.getAt(0).get('qc_rm_entrydate'),'d-m-Y'));
	                txtTruckNo.setRawValue(loadQCRMEntryNoDetailDatastore.getAt(0).get('qc_rm_truck'));

                        var bl ="";
			var RowCnt = loadQCRMEntryNoDetailDatastore.getCount();

			for (var i=0;i<RowCnt;i++)
			{
                                if (loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_packtype') == "B")
                                    bl = "BUNDLE";
                                else 
                                    bl = "LOOSE";
          			flxDetail.getStore().insert(
				flxDetail.getStore().getCount(),
				new dgrecord({
				      	slno        :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_slno'),	
				      	ticketno    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketno'),
					ticketwt    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketwt'),
					itemname    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('itmh_name'),
					itemcode    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_itemcode'),
					millboard   :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_millboard'),

                                        moismatrialqty    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper_totalmaterial'),
                        		moisforqty     :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_moisforqty'),
					moisper     :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper'),
					moisqty     :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_moisqty'),
					lifelessper :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_llessper'),
					lifelessqty :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_llessqty'),
					rejectper   :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectper'),
					rejectqty   :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectqty'),
					degradeqty  :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_degradeqty'),
					acceptqty   :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_acceptqty'),
		           	        packtype    :  bl,
					remarks     :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_remarks'),
					remarks2    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_remarks2'),
                                        itemtype    :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_itemtype'),
                                        billwt      :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_billqty'),
                                        millwt      :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_millqty'),
                                        fixedmois   :  loadQCRMEntryNoDetailDatastore.getAt(i).get('qc_rm_itemmois'),
                                        rate        : 0,
                                        shortage    : 0,
                                        ratediff    : 0,
                                        valuediff   : 0,


				}) 
				); 
                     }    
                     calculateValue();

	
                 }    
	        });
   calculateValue();
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
                remarks = '';
	        flxDetail.getStore().removeAll();
	        flxAccounts.getStore().removeAll();
		LoadDebitNoteVoucherDetailDataStore.removeAll();
		LoadDebitNoteVoucherDetailDataStore.load({
		url: 'ClsRMDebitNote.php',
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

                        cmbQCEntNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_entryno'));
                        cmbQCEntNo.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_entryno'));
                        txtSupplierName.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('sup_refname'));
             		ledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('sup_led_code');
                	supcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_supcode');
	         	suptype = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('sup_type');
                        
			dtpVouDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_debitnote_date'),'d-m-Y'));

			dtEntDate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_entrydate'),'d-m-Y'));

                        txtPartyBillNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_billno')); 
                        txtPartyBillValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_billvalue')); 
			dtpPartyBilldate.setRawValue(Ext.util.Format.date(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_billdate'),'d-m-Y'));


	                txtTruckNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_truck'));


                       txtCGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstper'));
                       txtSGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstper'));
                       txtIGSTPer.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstper'));
                       cgstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstledcode');
                       sgstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstledcode');
                       igstledcode = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstledcode');
                       cgstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_cgstledger');
                       sgstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_sgstledger');
                       igstledger  = LoadDebitNoteVoucherDetailDataStore.getAt(0).get('tax_igstledger');
		       txtCGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_cgst_value'));
	               txtSGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_sgst_value'));
		       txtIGSTValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_igst_value'));

			txtDebitValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_debitamount'));
			txtRounding.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_rounding'));


                        if (LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_round_need') == "Y")
                           Ext.getCmp('optRounding').setValue(1);  
                        else
                           Ext.getCmp('optRounding').setValue(2);  


                txtTotDedQty.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_ded_qty'));



		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
                  url: 'ClsRMDebitNote.php',
		  params:
			{
				task:"loadPurGroup",
				supptype : suptype,
                                gsttype : dngsttype,  

			},
		    callback: function () {
                        cmbPurchaseLedger.setValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_pur_ledger'));
  
	            }
                        
		});

			for (var i=0;i<cnt;i++)
			{

                if (LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_remarks').substring(0,8) != "Accepted")
                 remarks = remarks + " " +  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_remarks');
                                if (LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_packtype') == "B")
                                    bl = "BUNDLE";
                                else 
                                    bl = "LOOSE";
          			flxDetail.getStore().insert(
				flxDetail.getStore().getCount(),
				new dgrecord({
				      	slno        :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_slno'),	
				      	ticketno    :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ticketno'),
					ticketwt    :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ticketwt'),
					itemname    :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('itmh_name'),
					itemcode    :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_itemcode'),
					millboard   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_millboard'),
                                        billwt      :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_billqty'),
                                        millwt      :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_millqty'),
                                        rate       :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ded_rate'),
					moisqty     :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_moisqty'),
					lifelessqty :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_llessqty'),
					rejectqty   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_rejectqty'),
					degradeqty  :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_degradeqty'),
					acceptqty   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_acceptqty'),
                                        itemtype    :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_itemtype'),
                                        billwt      :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_billqty'),
                                        millwt      :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_millqty'),
                                        fixedmois   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_itemmois'),
                                        totDNqty   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ded_qty'),
                                        rate        :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ded_rate'),
                                        value       :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_taxable'),
                                        
                                        shortage   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_shortage'),
                                        ratediff   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_ratediff'),
                                        valuediff   :  LoadDebitNoteVoucherDetailDataStore.getAt(i).get('qc_rm_valuediff'),


				}) 
				); 
                     }   

            calculateValue();


//                        txtPartyBillNo.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_billno')); 
//                        txtPartyBillValue.setRawValue(LoadDebitNoteVoucherDetailDataStore.getAt(0).get('qc_rm_billvalue')); 
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
		url: 'ClsRMDebitNote.php',
		params:
		{
			task:"loadQCNoList",
			suppcode : supcode,
                        compcode : ginCompcode,
                        ticket   : 1,
		},

        });

}

var colname;

function calculateValue(){
        var diffqty = 0;
        var tdedqty = 0;
        var val1 = 0;
        var val2 = 0;
        var tvalue = 0; 
        var finalwt = 0;
        var diffval = 0;
	var Row= flxDetail.getStore().getCount();

	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();

	for(var i=0;i<Row;i++)
	{

/*
          diffqty = Number(sel[i].data.billwt) - Number(sel[i].data.ticketwt);
          if (diffqty < 0)
             diffqty = 0;
          diffqty =  Ext.util.Format.number(diffqty,'0.0');
          sel[i].set('shortage', diffqty);
*/






       if (cmbQtyYN.getValue() == 'N' )// && gstFlag == "Add")
       {  
              tdedqty =Number(sel[i].data.shortage) + Number(sel[i].data.millboard) + Number(sel[i].data.moisqty)  + Number(sel[i].data.lifelessqty)  + Number(sel[i].data.rejectqty) ;


              tdedqty2 =Number(sel[i].data.shortage) + Number(sel[i].data.millboard) + Number(sel[i].data.moisqty)  + Number(sel[i].data.lifelessqty)  + Number(sel[i].data.rejectqty)  + Number(sel[i].data.degradeqty)  ;



	       if (sel[i].data.itemtype == "F")
	       {    
		  tdedqty =  Ext.util.Format.number(tdedqty,'0.0');
		  sel[i].set('totDNqty', tdedqty);           
	       }
	       else
	       {    
	//	  tdedqty =  Ext.util.Format.number(tdedqty,'0.0')
//alert(Number(sel[i].data.degradeqty));
	  sel[i].set('totDNqty', (Number(sel[i].data.ticketwt) - Number(sel[i].data.degradeqty)));  
//alert(tdedqty2);
	       }
      }      

          

          finalwt = Number(sel[i].data.ticketwt) - (Number(sel[i].data.shortage) + Number(sel[i].data.millboard) + Number(sel[i].data.moisqty)  + Number(sel[i].data.lifelessqty)  + Number(sel[i].data.rejectqty) + Number(sel[i].data.degradeqty)) ;

          finalwt =  Ext.util.Format.number(finalwt,'0.0');
          sel[i].set('acceptqty', finalwt);

          if (sel[i].data.itemtype == "F")
              val1 = Number(sel[i].data.totDNqty)/1000 * Number(sel[i].data.rate);
          else
              val1 = Number(sel[i].data.acceptqty)/1000 * Number(sel[i].data.rate);
      
          val1 = val1.toFixed(2);
          sel[i].set('value', val1);


          diffval = Number(sel[i].data.ticketwt)/1000 * Number(sel[i].data.ratediff);
          diffval = diffval.toFixed(2);
          sel[i].set('valuediff', diffval);


//          sel[i].set('value', val1);
        
//  val2 = Number(sel[i].data.degradeqty)/1000 * Number(sel[i].data.rate2);
//          val1 = val1.toFixed(0);
//          val2 = val2.toFixed(0);
//          tvalue = Number(val1)+Number(val2);

//          sel[i].set('value2', val2);
//          sel[i].set('totvalue', tvalue);
//          sel[i].set('totaldeductionqty', Number(sel[i].data.totDNqty) + Number(sel[i].data.degradeqty) );

	} 
        grid_tot_qty();     
}
     

function grid_tot_qty(){

        var totacceptqty  = 0;
        var tdedqty = 0;
        var tfinalqty = 0;
        var tratededvalue = 0;
        var tqtydedvalue = 0;
        var tdedvalue = 0; 
	var Row= flxDetail.getStore().getCount();

	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();

	for(var i=0;i<Row;i++)
	{
          if (sel[i].data.itemtype == "F")
              totacceptqty = Number(totacceptqty) +  Number(sel[i].data.ticketwt);


          tdedqty = Number(tdedqty) +  Number(sel[i].data.totDNqty);
          tfinalqty = Number(tfinalqty) +  Number(sel[i].data.acceptqty);
          tqtydedvalue = Number(tqtydedvalue) +  Number(sel[i].data.value);
          tratededvalue = Number(tratededvalue) +  Number(sel[i].data.valuediff);
	}    

          tdedvalue = Number(tqtydedvalue) + Number(tratededvalue) ;

         txtTotAcceptedQty.setRawValue(Ext.util.Format.number(totacceptqty,'0'));
         txtTotFinalQty.setRawValue(Ext.util.Format.number(tfinalqty,'0'));
         txtTotDedQty.setRawValue(Ext.util.Format.number(tdedqty,'0'));
         txtTotRateDedValue.setRawValue(Ext.util.Format.number(tratededvalue,'0.00'));
         txtTotQtyDedValue.setRawValue(Ext.util.Format.number(tqtydedvalue,'0.00'));
         txtTotDedValue.setRawValue(Ext.util.Format.number(tdedvalue,'0.00'));
         find_value();
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
		supcode = selrow.get('qc_rm_supcode');
		suptype = selrow.get('sup_type');
		txtSupplierName.setValue(selrow.get('led_name'));
		flxLedger.hide();
                cmbQCEntNo.focus();
		loadPurchaseGroupDatasore.removeAll();
		loadPurchaseGroupDatasore.load({
			url: 'ClsRMDebitNote.php',
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
		{header: "", dataIndex: 'qc_rm_supcode',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'sup_type',sortable:true,width:50,align:'left'},

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
		url: 'ClsRMDebitNote.php',
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
            txtRemarks.setRawValue("Being Debited to your Account for " + remarks + " against your bill No." + txtPartyBillNo.getRawValue()+ " Dt. " + Ext.util.Format.date(dtpPartyBilldate.getValue(),"d-m-Y") + " Truck : " + txtTruckNo.getRawValue()  ) ;

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
              credit    : txtTotDedValue.getRawValue(),
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
	    flxDetail.getStore().removeAll();

          cmbQtyYN.setValue('N');
          gstFlag = "Add";

          Ext.getCmp('txtDNNo').setVisible(false);  
               Ext.getCmp('cmbDNNo').setVisible(true);
               gstFlag = 'Edit';
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


/*

        Ext.getCmp('editchk').hide();

        Ext.getCmp('doccancel').hide();
        Ext.getCmp('txtPass').hide();
        Ext.getCmp('save').setDisabled(false);  
  
        billflag = "D";

        
        txtDNNo.setValue('');
        txtTotCredit.setValue('');
        txttcsvalue.setValue('');
        txtDebitValue.setValue('');
//        txtInvDate.setValue('');
//        txtInvValue.setValue('');
        txtNarration.setValue('');


        txttdsper.setValue('');
        txttdsvalue.setValue('');
        txtCgstper.setValue('');
        txtCgstvalue.setRawValue('');
        txtSgstper.setValue('');
        txtSgstvalue.setRawValue('');
        txtIgstper.setValue('');
        txtIgstvalue.setRawValue('');
        txttcsvalue.setRawValue('');
        txtTaxable.setValue('');
        txtPartyDebit.setValue('');
        txtRounding.setValue('');
        txtTotDebit.setValue(''); 
        txtTotCredit.setValue(''); 
        txtRefNo.setValue('');

        flxDetail.getStore().removeAll();












               if (dngsttype == "G")
               { 
                  ControlmasterDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'ControlDebitNo',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                        txtDNNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                  });
                  Ext.getCmp('txtCgstper').setDisabled(false);
                  Ext.getCmp('txtSgstper').setDisabled(false)
                  Ext.getCmp('txtIgstper').setDisabled(false);
                  Ext.getCmp('cmbCGSTledger').setDisabled(false);
                  Ext.getCmp('cmbSGSTledger').setDisabled(false);
                  Ext.getCmp('cmbIGSTledger').setDisabled(false);
                  dntype = 'DNG';
      
                }
                else
                {
                  ControlmasterDataStore.load({
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params: {
                        task: 'ControlDebitNo2',
                        ginfinid: ginfinid,
                        gincompcode: gstfincompcode
                    },
                    callback: function () {
                        txtDNNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                  });
                  Ext.getCmp('txtCgstper').setDisabled(true);
                  Ext.getCmp('txtSgstper').setDisabled(true)
                  Ext.getCmp('txtIgstper').setDisabled(true);
                  Ext.getCmp('cmbCGSTledger').setDisabled(true);
                  Ext.getCmp('cmbSGSTledger').setDisabled(true);
                  Ext.getCmp('cmbIGSTledger').setDisabled(true);
                  dntype = 'DNN';
                }   


       cmbCreditLedger.setValue(0);
        cmbSupplierName.setValue(0);
*/
    }


var tabFuelDN = new Ext.TabPanel({
    id          : 'tabFuelDN',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 370,
    width       : 1280,	
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
		                    labelWidth  : 120,
		                    width       : 500,
		                    x           : 800,
		                    y           : 0,
		                    border      : false,
		                    items: [cmbQtyYN]
		                },

				 {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 1,
		                    width       : 1280,
		                    x           : 5,
		                    y           : 30,
		                    border      : false,
		                    items: [flxDetail]
		                },
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 600,
                                	x           : 10,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtTotAcceptedQty]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 600,
                                	x           : 10,
                                	y           : 250,
                                    	border      : false,
                                	items: [txtTotFinalQty]
                            	},

 
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 270,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtTotDedQty]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 270,
                                	y           : 250,
                                    	border      : false,
                                	items: [txtTotQtyDedValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 270,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtTotRateDedValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 270,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtTotDedValue]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 600,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtCGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 600,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtCGSTValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 600,
                                	y           : 245,
                                    	border      : false,
                                	items: [txtSGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 600,
                                	y           : 245,
                                    	border      : false,
                                	items: [txtSGSTValue]
                            	},
  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 600,
                                	x           : 600,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtIGSTPer]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 600,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtIGSTValue]
                            	},

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 500,
                                	x           : 880,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtRounding]
                            	},

  				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 600,
                                	x           : 600,
                                	y           : 300,
                                    	border      : false,
                                	items: [txtDebitValue]
                            	},


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 170,
                                	width       : 500,
                                	x           : 1060,
                                	y           : 220,
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
			    else if (flxDetail.getStore().getCount()==0)
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
                                        msg: 'Save This Record?',
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                               var accData = flxAccounts.getStore().getRange();
                                               var accupdData = new Array();
                                               Ext.each(accData, function (record) {
                                                  accupdData.push(record.data);
                                               });

                                               var dnData = flxDetail.getStore().getRange();
                                               var dnupdData = new Array();
                                               Ext.each(dnData, function (record) {
                                                  dnupdData.push(record.data);
                                               });


                                                Ext.Ajax.request({
                                                    url: 'FrmTrnDebitNoteAccountsSave.php',
                                                    params: {
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        cnt: accData.length,
                                                        dngriddet: Ext.util.JSON.encode(dnupdData),
                                                        dncnt: dnData.length,

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
                                                        taxable: Number(txtTotDedValue.getValue()),
                                                        debitvalue: Number(txtDebitValue.getValue()),

                                                        billmode: billflag,
                                             
                                                        cgst  : cgstledcode,
                                                        sgst  : sgstledcode,
                                                        igst  : igstledcode,
//''                                                        cnt: accData.length,
                                                        gltype : suptype,
                                                        invno  :  txtPartyBillNo.getRawValue(),
                                                        invdate :  Ext.util.Format.date(dtpPartyBilldate.getValue(), "Y-m-d"),
                                                        invamt  :  txtPartyBillValue.getRawValue(),

                                                        rounding : txtRounding.getValue(),
                                                        usercode : GinUserid, 
                                                        remarks  : txtRemarks.getRawValue(), 
 

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
							    flxDetail.getStore().removeAll();
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
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMDebitNote.rptdesign&__format=pdf&' + param, '_blank'); 
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
                width: 1320,
                height: 460,
                x: 5,
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
                        y: -5,
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
                        y:  -5,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTruckNo]
                    },



                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 600,
                        x: 10,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbQCEntNo]
                    },


                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 600,
                        x: 250,
                        y: 20,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtTicketNo]
                    },

                    { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
                        	width       : 400,
                        	x           : 10,
                        	y           : 45,
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
                        items: [txtPartyBillValue]
                    },

                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 120,
                        width: 1350,
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
        width       : 1350,
//        x	     : 20,
        y           : 35,
        title       : 'Debtie Note (Waste Paper)',
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

			RefreshData();
                       Ext.getCmp('accupdate').setDisabled(true);  
	   			 }
			
		}
    });
    TrnDebitNoteWindow.show();  
});
