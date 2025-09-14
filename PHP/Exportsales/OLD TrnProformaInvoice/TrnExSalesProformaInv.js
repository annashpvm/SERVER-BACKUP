Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var txtApprNo = new Ext.form.NumberField({
        fieldLabel  : 'Approval No.',
        id          : 'txtApprNo',
        name        : 'txtApprNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


    var dptApprNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptApprNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

    var txtPINo = new Ext.form.NumberField({
        fieldLabel  : 'Proforma Invoice No.',
        id          : 'txtPINo',
        name        : 'txtPINo',
        width       :  220,
	readOnly : true,
        tabindex : 2
    });


    var dptPINo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptPINo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

    
    var txtContact = new Ext.form.TextField({
        fieldLabel  : 'Contact',
        id          : 'txtContact',
        name        : 'txtContact',
        width       :  180,
	readOnly : false,
        tabindex : 2
    });

    var txtExRate = new Ext.form.NumberField({
        fieldLabel  : 'Ex. Rate',
        id          : 'txtExRate',
        name        : 'txtExRate',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtPriority = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPriority',
        name        : 'txtPriority',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });
   var dptdesp= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dptdesp',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

   var txtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtNoSheets = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Sheets',
        id          : 'txtNoSheets',
        name        : 'txtNoSheets',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtReamWt = new Ext.form.NumberField({
        fieldLabel  : 'Ream.Wt',
        id          : 'txtReamWt',
        name        : 'txtReamWt',
        width       :  40,
	readOnly : false,
        tabindex : 2
    });

   var txtNoReams = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Reams',
        id          : 'txtNoReams',
        name        : 'txtNoReams',
        width       :  40,
	readOnly : false,
        tabindex : 2
    });


    var dptRefNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptRefNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });




    var dptSOCNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSOCNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });


   var txtInvType = new Ext.form.TextField({
        fieldLabel  : 'Invoice Type',
        id          : 'txtInvType',
        name        : 'txtInvType',
        width       :  200,
	readOnly : true,
        tabindex : 2
    });

   var txtTotWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txtTotWt',
        name        : 'txtTotWt',
        width       :  100,
        tabindex : 2
    });


   var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  100,
        tabindex : 2
    });

   var txtTotTaxValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable Value',
        id          : 'txtTotTaxValue',
        name        : 'txtTotTaxValue',
        width       :  140,
        tabindex : 2
    });



   var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
        tabindex : 2
    });
   var txtSgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstPer',
        name        : 'txtSgstPer',
        width       :  50,
        tabindex : 2
    });
   var txtIgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstPer',
        name        : 'txtIgstPer',
        width       :  50,
        tabindex : 2
    });


   var txtCgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCgstAmt',
        name        : 'txtCgstAmt',
        width       :  100,
        tabindex : 2
    });
   var txtSgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstAmt',
        name        : 'txtSgstAmt',
        width       :  100,
        tabindex : 2
    });
   var txtIgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstAmt',
        name        : 'txtIgstAmt',
        width       :  100,
        tabindex : 2
    });

   var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  70,
        tabindex : 2
    });
   var txtFrt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrt',
        name        : 'txtFrt',
        width       :  70,
        tabindex : 2
    });

   var txtInsAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsAmt',
        name        : 'txtInsAmt',
        width       :  100,
        tabindex : 2
    });
   var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
        tabindex : 2
    });

   var txtOthAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthAmt',
        name        : 'txtOthAmt',
        width       :  100,
        tabindex : 2
    });
   var txtNetAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtNetAmt',
        name        : 'txtNetAmt',
        width       :  120,
        tabindex : 2
    });
   var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
        tabindex : 2
    });


   var txtDestination = new Ext.form.TextField({
        fieldLabel  : 'Destination',
        id          : 'txtDestination',
        name        : 'txtDestination',
        width       :  250,
        tabindex : 2
    });

   var txtVechicle = new Ext.form.TextField({
        fieldLabel  : 'Vechicle No',
        id          : 'txtVechicle',
        name        : 'txtVechicle',
        width       :  150,
        tabindex : 2
    });

   var txtLrno = new Ext.form.TextField({
        fieldLabel  : 'LR No.',
        id          : 'txtLrno',
        name        : 'txtLrno',
        width       :  140,
        tabindex : 2
    });

    var dptLrno= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptLrno',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });



   var txtLCno = new Ext.form.TextField({
        fieldLabel  : 'LC No.',
        id          : 'txtLCno',
        name        : 'txtLCno',
        width       :  250,
        tabindex : 2
    });

    var dptLCno= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptLCno',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });



   var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Customer Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  800,
        tabindex : 2
    });

   var txtOurIns = new Ext.form.TextField({
        fieldLabel  : 'Our Ins.',
        id          : 'txtOurIns',
        name        : 'txtOurIns',
        width       :  800,
        tabindex : 2
    });



   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  60,
        tabindex : 2
    });


   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  60,
        tabindex : 2
    });



   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
        tabindex : 2
    });

   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
        tabindex : 2
    });
   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address3.',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  500,
        tabindex : 2
    });

   var txtAddr4 = new Ext.form.TextField({
        fieldLabel  : 'Address4.',
        id          : 'txtAddr4',
        name        : 'txtAddr4',
        width       :  500,
        tabindex : 2
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
        tabindex : 2
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
        tabindex : 2
    });




  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
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




 var loadAllCustomerList = new Ext.data.Store({
      id: 'loadAllCustomerList',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
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



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });


  var loadGSTDataStore = new Ext.data.Store({
        id: 'loadGSTDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadGSTDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_code','tax_name'])
    });
	
var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety ',
        width           : 350,
        displayField    : 'ref_name', 
        valueField      : 'rer_code',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDealer = new Ext.form.ComboBox({
        fieldLabel      : 'Dealer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDealer',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbOrderType = new Ext.form.ComboBox({
        fieldLabel      : 'Order Type ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbOrderType',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['Stock Keeping','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State ',
        width           : 200,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


  var getGSTDataStore = new Ext.data.Store({
        id: 'getGSTDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findGSTDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_cgst_per','tax_sgst_per','tax_igst_per'])
    });


var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size ',
        width           : 250,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadGSTDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function ()                 {
                RefreshData();
                getGSTDataStore.removeAll();
        
                getGSTDataStore.load({
                    url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
                    params:
                            {
        
                                task: "findGSTDetails",
                                taxcode:cmbSize.getValue()
                            },
                    callback: function () {
                        var cnt = getGSTDataStore.getCount(); 
                        if (cnt > 0) {

                                   txtCgstPer.setRawValue(getGSTDataStore.getAt(0).get('tax_cgst_per'));
                                   txtSgstPer.setValue(getGSTDataStore.getAt(0).get('tax_sgst_per'));
                                   txtIgstPer.setValue(getGSTDataStore.getAt(0).get('tax_igst_per'));
                                   
                                    }

                         else {alert('not found');

                       } 
                   }
                });
              }
        }
});


var cmbDocuments = new Ext.form.ComboBox({
        fieldLabel      : 'Documents ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDocuments',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DIRECT','THROUGH BANK','LC'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbBankParty = new Ext.form.ComboBox({
        fieldLabel      : 'Party Bank ',
        width           : 350,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbBankParty',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadLedgerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbBankMill = new Ext.form.ComboBox({
        fieldLabel      : 'Our Bank ',
        width           : 350,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbBankMill',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadLedgerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

  var loadLedgerList = new Ext.data.Store({
        id: 'loadLedgerList',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadLedgers"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code','led_name'])
    });
	



/*
 var loadLedgerList = new Ext.data.Store({
      id: 'loadLedgerList',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLedgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });
*/
var cmbTransport = new Ext.form.ComboBox({
        fieldLabel      : 'Transport ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbTransport',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDespLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Desp.Location ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDespLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});




var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:200,
    height: 130,
    hidden:false,
    width: 850,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:200,align:'left'},
        {header: "Varcode", dataIndex: 'varcode',sortable:true,width:30,align:'left'},
        {header: "GSM", dataIndex:'gsm',sortable:true,width:100,align:'left'},
        {header: "SIZE", dataIndex:'size',sortable:true,width:100,align:'left'},
        {header: "Item Code", dataIndex:'itemcode',sortable:true,width:100,align:'left'},
        {header: "Qty" , dataIndex:'qty',sortable:true,width:100,align:'left'},
        {header: "Ream Wt", dataIndex:'reamwt',sortable:true,width:100,align:'left'},       
        {header: "Reams", dataIndex:'reams',sortable:true,width:100,align:'left'},       
        {header: "Sheets", dataIndex:'sheets',sortable:true,width:100,align:'left'}       

  

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         
    }

   }
});




var opttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Discount Type',
    fieldLabel: '',
    layout : 'hbox',
    width:500,
    height:60,
    x:15,
    y:5,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 4,
        rows : 1,
        id: 'opttype',
        items: [
            {boxLabel: 'Export', name: 'opttype', id:'optexport', inputValue: 1,checked:false,},
            {boxLabel: 'Local', name: 'opttype', id:'optlocal', inputValue: 1,checked:true,},
            {boxLabel: 'With out Order', name: 'opttype', id:'optnoorder', inputValue: 1,checked:false,},
            {boxLabel: 'Agent', name: 'opttype', id:'optagent', inputValue: 2,checked:false,  }

         ]
    }
    ]
});



var lblcrdays = new Ext.form.Label({
    fieldLabel  : 'Credit Days',
    id          : 'lblcrdays',
    width       : 60
});

var lbldisc = new Ext.form.Label({
    fieldLabel  : 'Disc % / Amt',
    id          : 'lbldisc',
    width       : 60
});


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 780,
    y       : 150,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
//                var selrows = flxDetail.getSelectionModel().getCount();
  //              var sel = flxDetail.getSelectionModel().getSelections();
                var RowCnt = flxDetail.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetail.getSelectionModel().getCount();
                   var sel = flxDetail.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
            Ext.MessageBox.alert("Grid","Number " + sel[j].data.number + " Already Entered.");
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
	            if (cnt === 0)
	            {
            //             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
              //      }
                //    else
                  //  {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),
                      new dgrecord({
                            itemname: cmbSize.getRawValue(),
                            itemcode: cmbSize.getValue(),
                            number:i,
                            weight:txtWt.getRawValue(),
                            destag:'',
                            hsncode:''
                           })
                      );
                    }
                }
          }
  }
}
});




var tabSalesMA = new Ext.TabPanel({
    id          : 'Sales Order Acceptance',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 560,
    width       : 900,	
    x           : 0,
    y           : 0,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'ORDER DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                             opttype ,
 
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 80,
                    		       width       : 550,
	                               x           : 0,
          		               y           : 60,
                        	       border      : false,
		                       items: [cmbVariety]
 		                   },

                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 550,
                                       x           : 0,
                                       y           : 120,
                                       border      : false,
                                       items: [cmbOrderType]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 150,
                                       border      : false,
                                       items: [cmbSize]
                                    },

  	           				     
	           	            { 
			               xtype       : 'label',
			               text        : 'Priority',
			               labelWidth  : 100,
			               width       : 90,
			               x           : 455,
			               y           : 140,
                                       border      : false
    				    },
	           	            { 
			               xtype       : 'label',
			               text        : 'Qty(T)',
			               labelWidth  : 100,
			               width       : 90,
			               x           : 555,
			               y           : 140,
                                       border      : false
    				    },
	           	            { 
			               xtype       : 'label',
			               text        : 'Desp.Date',
			               labelWidth  : 100,
			               width       : 90,
			               x           : 650,
			               y           : 140,
                                       border      : false
    				    },

                                    { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 70,
                                           width       : 150,
                                           x           : 375,
                                           y           : 153,
                                           border      : false,
                                           items: [txtPriority]
                                    },
               			        
                                    { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 70,
                                           width       : 200,
                                           x           : 470,
                                           y           : 153,
                                           border      : false,
                                           items: [txtQty]
                                    },
      		                    { 
	                                   xtype       : 'fieldset',
           		                   title       : '',
		                           labelWidth  : 50,
                		           width       : 400,
		                           x           : 580,
                		           y           : 153,
		                           border      : false,
                		           items: [dptdesp]
   		                   },    btnSubmit,
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : 'BUNDLE DETAILS',
                                  width       : 400,
                                  height      : 70,
                                  x           : 450,
                                  y           : 65,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 70,
                                           width       : 200,
                                           x           : 0,
                                           y           : 0,
                                           border      : false,
                                           items: [txtNoSheets]
                                        },
               			        
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 60,
                                           width       : 150,
                                           x           : 145,
                                           y           : 0,
                                           border      : false,
                                           items: [txtReamWt]
                                        },
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 80,
                                           width       : 150,
                                           x           : 255,
                                           y           : 0,
                                           border      : false,
                                           items: [txtNoReams]
                                        },


                                        ]
                             },flxDetail ,
        			        
                     ]
         },


	

     ]


});



var TrnExSalesPIWindow = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES INVOICE ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnExSalesPIWindow',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
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
                    gstFlag = "Add";
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
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                    gstFlag = "Edit";
                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                    var gstSave;
                    gstSave="true";
                    if (txtorderterms.getRawValue()==0 || txtorderterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Order Terms.....');
                        gstSave="false";
                    }
                    else if (txtpaymentterms.getRawValue()==0 || txtpaymentterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Payment Terms..');
                        gstSave="false";
                    }
                    else if (txtcreditdays.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Credit Days..');
                        gstSave="false";
                    }
                    else if (txtservicechrg.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Service Chrage/MT..');
                        gstSave="false";
                    }
                    else if (txtRemarks.getRawValue()==0 || txtRemarks.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Remarks..');
                        gstSave="false";
                    }
                    else if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbcarriage.getValue()==0 || cmbcarriage.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Carriage..');
                        gstSave="false";
                    }
		   else if (cmbfreight.getValue()==0 || cmbfreight.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Type..');
                        gstSave="false";
                    } 
                    else if (cmbfrparty.getValue()==0 || cmbfrparty.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Party..');
                        gstSave="false";
                    }                    
		    else if (flxdeldetail.rows==0)
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Delivery Detail..');
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

                           
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });

						/*var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});*/

                            
                            var deliData = flxdeldetail.getStore().getRange();                                        
                            var deliupdData = new Array();
                            Ext.each(deliData, function (record) {
                                deliupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnPOPreparationSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),                                      
				deligriddet : Ext.util.JSON.encode(deliupdData),                                                
                                po_company_code:Gincompcode,
                                po_finid:GinFinid,
                                po_date :Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                                po_duedate:Ext.util.Format.date(dtpDuedate.getValue(),"Y-m-d"),
                                po_vendor_code :cmbPartyname.getValue(),
				remarks:txtRemarks.getRawValue(),
				cnt: poData.length,
				delicnt : deliData.length,
				ordtype : ordtype,
				orderterms : txtorderterms.getRawValue(),
				po_transport_mode : cmbcarriage.getValue(),
				po_paymode : cmbpaymode.getValue(),
				creditdays : txtcreditdays.getRawValue(),
				po_payterm : txtpaymentterms.getRawValue(),
				po_frighttype : cmbfreight.getValue(),
				po_frparty : cmbfrparty.getValue(),
				tcsper : txttcs.getValue(),
				cgstper :txtCGST.getValue(),
				sgstper :txtSGST.getValue(),
				igstper : txtIGST.getValue(),
				servchrg : txtservicechrg.getRawValue(),
				itemval : 0,
				roundoff : 0,
				totval : 0,
				wefdate : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d")
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				alert(obj['pono']);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono']);
                                    TrnPoFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Purchase Order Not Completed! Pls Check!- " + obj['pono']);                                                  
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
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnExSalesPIWindow.hide();
                }
            }
        }]
    },

     items: [
               {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1000,
                    height      : 150,
                    x           : 10,
                    y           : 10,
                    border      : true,
                    layout      : 'absolute',
                    items:[
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 400,
                                  x           : 0,
                                  y           : 0,
                                  border      : false,
                                  items: [txtApprNo]
                               },
  			       { 
	                          xtype       : 'fieldset',
           		          title       : '',
		                  labelWidth  : 50,
                		  width       : 400,
		                  x           : 400,
                		  y           : 0,
		                  border      : false,
                		  items: [dptApprNo]
   		               },
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 400,
                                  x           : 0,
                                  y           : 30,
                                  border      : false,
                                  items: [txtPINo]
                               },
  			       { 
	                          xtype       : 'fieldset',
           		          title       : '',
		                  labelWidth  : 50,
                		  width       : 400,
		                  x           : 400,
                		  y           : 30,
		                  border      : false,
                                  items: [dptPINo]
   		               },    
                               { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 550,
                                  x           : 0,
                                  y           : 60,
                                  border      : false,
                                  items: [cmbCustomer]
                              },
                               { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 550,
                                  x           : 0,
                                  y           : 90,
                                  border      : false,
                                  items: [cmbDealer]
                              },

                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 300,
                                  x           : 600,
                                  y           : 60,
                                  border      : false,
                                  items: [txtContact]
                               },
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 200,
                                  x           : 600,
                                  y           : 90,
                                  border      : false,
                                  items: [txtExRate]
                               },
                         ] , 
                 },

                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1250,
                    height      : 500,
                    x           : 10,
                    y           : 205,
                    border      : true,
                    layout      : 'absolute',
                    items:[tabSalesMA], 

                 },


            ],
	          
});


    

   function RefreshData(){

   };
   


   
   var loadInvnodatastore = new Ext.data.Store({
      id: 'loadInvnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOrderEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordno'
      ]),
    });




 var TrnExSalesPIWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - EXPORT PROFORMA INVOICE',
        items       : TrnExSalesPIPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false  ,
          
	listeners:{

              show:function(){
			loadInvnodatastore.removeAll();
			loadInvnodatastore.load({
                        	 url:'ClsTrnSalesOrder.php',
                        	 params:
                        	 {
                         	 task:"loadOrderEntryNo"
                        	 },
				callback:function()
	               		{
				txtInvNo.setValue(loadInvnodatastore.getAt(0).get('ordno'));
				}
			  });
                    }

        }
    });
   TrnExSalesPIWindow.show();  


});
