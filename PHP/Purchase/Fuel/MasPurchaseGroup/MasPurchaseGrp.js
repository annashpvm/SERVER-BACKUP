Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var saveFlag = "Add";
var taxledcode = 0;

var ledgercode = 0;
var gstledgercode = 0;


 var loadtaxlistdatastore = new Ext.data.Store({
      id: 'loadtaxlistdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadTaxList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 
            'tax_purcode', 'tax_purname', 'tax_cgstper', 'tax_sgstper', 'tax_igstper', 'tax_cgstledcode', 'tax_sgstledcode', 'tax_igstledcode',
            'tax_cgstledger', 'tax_sgstledger', 'tax_igstledger', 'tax_gst', 'tax_purtype', 'tax_state'
      ]),
    });



 var findGSTDetaildatastore = new Ext.data.Store({
      id: 'findGSTDetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadGSTDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'tax_pur_ledcode', 'tax_pur_ledname', 'tax_cgst_ledcode', 'tax_sgst_ledcode', 'tax_igst_ledcode', 'tax_cgst_per', 'tax_sgst_per', 'tax_igst_per', 'tax_cgst_ledname', 'tax_sgst_ledname', 'tax_igst_ledname'
 
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_type'
      ]),
    });


function LedgerSearch()
{
        ledgercode = 0;
        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsPurchaseGroup.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtNewPurchaseLedger.getRawValue(),
		},
        });
}





 var loadSearchGSTListDatastore = new Ext.data.Store({
      id: 'loadSearchGSTListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchGSTLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'tax_pur_ledcode', 'tax_pur_ledname'
      ]),
    });


function LedgerGSTLedgerSearch()
{
        gstledgercode = 0;
        loadSearchGSTListDatastore.removeAll();
        loadSearchGSTListDatastore.load({
		url: 'ClsPurchaseGroup.php',
		params:
		{
			task:"loadSearchGSTLedgerlist",
			ledger : txtGSTLedger.getRawValue(),
		},
        });
}



function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		ledgercode = selrow.get('cust_code');
		ledtype    = selrow.get('cust_type');

//				cmbAccountName.setValue(selrow.get('cust_code'));
		txtNewPurchaseLedger.setValue(selrow.get('cust_name'));
                flxLedger.hide();   


	}

}


function grid_chk_flxGST()
{

	var sm = flxLedgerGST.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('tax_pur_ledcode'));
	if ((selrow != null)){

           	gstledgercode = selrow.get('tax_pur_ledcode');
		txtGSTLedger.setValue(selrow.get('tax_pur_ledname'));
                flxLedgerGST.hide();   

        findGSTDetaildatastore.removeAll();
        findGSTDetaildatastore.load({
		url: 'ClsPurchaseGroup.php',
		params:
		{
			task:"LoadGSTDetails",
			ledcode :gstledgercode,
		},
                callback:function()
                { 
                   var cnt = findGSTDetaildatastore.getCount();
                   if (cnt > 0)
                   {
			taxledcode = findGSTDetaildatastore.getAt(0).get('tax_pur_ledcode');				
			txtGSTLedger.setValue(findGSTDetaildatastore.getAt(0).get('tax_pur_ledname'));
			txtcgstper.setValue(findGSTDetaildatastore.getAt(0).get('tax_cgst_per'));
			txtsgstper.setValue(findGSTDetaildatastore.getAt(0).get('tax_sgst_per'));
                        txtigstper.setValue(findGSTDetaildatastore.getAt(0).get('tax_igst_per'));
                        cmbcgstledger.setValue(findGSTDetaildatastore.getAt(0).get('tax_cgst_ledcode'));  
                        cmbcgstledger.setRawValue(findGSTDetaildatastore.getAt(0).get('tax_cgst_ledname')); 
                        cmbsgstledger.setValue(findGSTDetaildatastore.getAt(0).get('tax_sgst_ledcode'));  
                        cmbsgstledger.setRawValue(findGSTDetaildatastore.getAt(0).get('tax_sgst_ledname'));
                        cmbigstledger.setValue(findGSTDetaildatastore.getAt(0).get('tax_igst_ledcode'));  
                        cmbigstledger.setRawValue(findGSTDetaildatastore.getAt(0).get('tax_igst_ledname')); 
                        cmbState.setValue(findGSTDetaildatastore.getAt(0).get('tax_state'));  
 
                   }
                }
        });



	}

}

   var flxLedgerGST = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 500,
        id : flxLedgerGST,
        x: 300,
        y: 110,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'tax_pur_ledcode',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'tax_pur_ledname',sortable:true,width:330,align:'left'},

        ],
        store:loadSearchGSTListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxGST();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxGST();
             }
     
   }
   });

   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 500,
        id : flxLedger,
        x: 300,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:330,align:'left'},

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


 var txtGSTLedger = new Ext.form.TextField({
        fieldLabel  : 'PURCHASE LEDGER ',
        id          : 'txtGSTLedger',
        name        : 'txtGSTLedger',
        width       :  400,
        style       :  {textTransform: "uppercase"},
	tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 if (gsttledgercode == 0)
                 {    
                    alert("Select Ledger Name ...");
                    txtGSTLedger.focus();
                 }
                 else
                 {    
                   flxLedgerGST.hide();

                 }     
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedgerGST.getSelectionModel().selectRow(0)
             flxLedgerGST.focus;
             flxLedgerGST.getView().focusRow(0);
             }
          },
	    keyup: function () {

                if (txtGSTLedger.getRawValue().length > 0)
                { 
		        flxLedgerGST.getEl().setStyle('z-index','10000');
		        flxLedgerGST.show();
		        loadSearchGSTListDatastore.removeAll();
		          if (txtGSTLedger.getRawValue() != '')
		             LedgerGSTLedgerSearch();
                }
            }
         }    
  });



 var txtNewPurchaseLedger = new Ext.form.TextField({
        fieldLabel  : 'ADD NEW PURCHASE LEDGER ',
        id          : 'txtNewPurchaseLedger',
        name        : 'txtNewPurchaseLedger',
        width       :  400,
        style       :  {textTransform: "uppercase"},
	tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 if (ledgercode == 0)
                 {    
                    alert("Select Purchase  Ledger Name ...");
                    txtNewPurchaseLedger.focus();
                 }
                 else
                 {    
                   flxLedger.hide();

                 }     
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
                if (txtNewPurchaseLedger.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtNewPurchaseLedger.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }    
  });


 var LoadCgstLedgerStore = new Ext.data.Store({
      id: 'LoadCgstLedgerStore',
 //     autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_name', type: 'string',mapping:'cust_name'}
      ]),
    });

 var LoadSgstLedgerStore = new Ext.data.Store({
      id: 'LoadSgstLedgerStore',
//      autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_name', type: 'string',mapping:'cust_name'}
      ]),
    });

 var LoadIgstLedgerStore = new Ext.data.Store({
      id: 'LoadgstLedgerStore',
  //    autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadgstLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_name', type: 'string',mapping:'cust_name'}
      ]),
    });

   var txtcgstper = new Ext.form.NumberField({
        fieldLabel  : 'CGST %',
        id          : 'txtcgstper',
        name        : 'txtcgstper',
        width       :  60,
        enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            keyup:function(){
            	LoadCgstLedgerStore.removeAll();
		LoadCgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'CGST',   
                     gst :  txtcgstper.getValue()
                },
                callback:function()
                {
                    var cnt=LoadCgstLedgerStore.getCount();
	            if(cnt>0)
		    {      
                        txtsgstper.setValue(txtcgstper.getValue());
                        cmbcgstledger.setValue(LoadCgstLedgerStore.getAt(0).get('tax_cgst_ledcode'));  
                        cmbcgstledger.setRawValue(LoadCgstLedgerStore.getAt(0).get('tax_cgst_ledname'));  
		    	LoadSgstLedgerStore.removeAll();
			LoadSgstLedgerStore.load({
		        url: 'ClsPurchaseGroup.php',
		        params: {
			     task: 'LoadgstLedger',
		             gsttype :'SGST',   
		             gst :  txtsgstper.getValue()
		        },
                        callback:function()
                        {
                         }

		        });
                    }  
                }
        
             });
            }  
        } 
        
    });
	
  var txtsgstper = new Ext.form.NumberField({
        fieldLabel  : 'SGST %',
        id          : 'txtsgstper',
        name        : 'txtsgstper',
        width       :  60,
        allowBlank  :  true,
	tabindex : 1,
        enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            keyup:function(){
            	LoadSgstLedgerStore.removeAll();
		LoadSgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'SGST',   
                     gst :  txtsgstper.getValue()
                },
                callback:function()
                {
                }
             });
            }  
        } 
    });
  var txtigstper = new Ext.form.NumberField({
        fieldLabel  : 'IGST %',
        id          : 'txtigstper',
        name        : 'txtigstper',
        width       :  60,
        allowBlank  :  true,
        enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            keyup:function(){
            	LoadIgstLedgerStore.removeAll();
		LoadIgstLedgerStore.load({
                url: 'ClsPurchaseGroup.php',
                params: {
		     task: 'LoadgstLedger',
                     gsttype :'IGST',   
                     gst :  txtigstper.getValue()
                },
                callback:function()
                {
                }
             });
            }  
        } 

    });

  var LoadInvtypeStore = new Ext.data.Store({
        id: 'LoadInvtypeStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsPurchaseGroup.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadInvtype"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['type_code','type_name'])
    });


var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State',
        width           :  220,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','TAMIL NADU'],['2','OTHER STATES'],['2','IMPORT'] ],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(combo){

            var state = combo.getValue();

            if(state == '1'){ // TAMIL NADU

                txtcgstper.enable();
                txtsgstper.enable();
                cmbcgstledger.enable();
                cmbsgstledger.enable();
                txtigstper.setValue(0);
                cmbigstledger.setValue('');
                txtigstper.disable();
                cmbigstledger.disable();

            }else{ // OTHER STATES / IMPORT

                txtcgstper.disable();
                txtsgstper.disable();
                cmbcgstledger.disable();
                cmbsgstledger.disable();
                txtcgstper.setValue(0);
                txtsgstper.setValue(0);
                cmbcgstledger.setValue('');
                cmbsgstledger.setValue('');
                txtigstper.enable();
                cmbigstledger.enable();

            }            
                      
	}
	}
});

var cmbcgstledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger',
        width           : 350,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbcgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        
        listeners: {
            select: function () {
             
              }
        } 
   });

var cmbsgstledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger',
        width           : 350,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbsgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        
        listeners: {
            select: function ()                 {
        } 
  }
   });


var cmbigstledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger',
        width           : 350,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbigstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIgstLedgerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
                labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function ()                 {
              }
        } 
   });



   function RefreshData(){
       flxLedger.hide();
       flxLedgerGST.hide();
	txtcgstper.setRawValue("");
	txtsgstper.setRawValue("");
        txtigstper.setRawValue("");
        SaveFlag = "Edit";
        Ext.getCmp('txtNewPurchaseLedger').setDisabled(true);
        Ext.getCmp('txtGSTLedger').setDisabled(false);


			loadtaxlistdatastore.load({
				url: 'ClsPurchaseGroup.php',
                		params: {
                    			task: 'LoadTaxList'
                		},
                callback:function()
                {
	//	alert(loadtaxlistdatastore.getAt(0).get('tax_state'));		
                }
			});



};



   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1200,
        x: 0,
        y: 0,
        columns: [   

            {header: "Tax Code", dataIndex: 'tax_purcode',sortable:true,width:50,align:'left'},
            {header: "Tax Name", dataIndex: 'tax_purname',sortable:true,width:220,align:'left'},
            {header: "SGST %", dataIndex: 'tax_sgstper',sortable:true,width:60,align:'left'}, 
            {header: "CGST %", dataIndex: 'tax_cgstper',sortable:true,width:60,align:'left'}, 
            {header: "IGST %", dataIndex: 'tax_igstper',sortable:true,width:60,align:'left'}, 
            {header: "CGST Ledger", dataIndex: 'tax_cgstledcode',sortable:true,width:60,align:'left'},
            {header: "SGST Ledger", dataIndex: 'tax_sgstledcode',sortable:true,width:60,align:'right'},
            {header: "IGST Ledger", dataIndex: 'tax_igstledcode',sortable:true,width:60,align:'left'},
            {header: "CGST Ledger", dataIndex: 'tax_cgstledger',sortable:true,width:200,align:'left'},
            {header: "SGST Ledger", dataIndex: 'tax_sgstledger',sortable:true,width:200,align:'right'},
            {header: "IGST Ledger", dataIndex: 'tax_igstledger',sortable:true,width:200,align:'left'},
            {header: "State",     dataIndex: 'tax_state',sortable:true,width:200,align:'left'},


        ],
        store:loadtaxlistdatastore,

    listeners:{	

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
         Ext.Msg.show({
             title: 'Purchase GST Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){
		SaveFlag = "Edit";
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('tax_pur_ledcode'));
                                SaveFlag = "Edit";
				gridedit = "true";
				editrow = selrow;
				taxledcode = selrow.get('tax_purcode');	
                ledgercode = selrow.get('tax_purcode');						
				txtGSTLedger.setRawValue(selrow.get('tax_purname'));
				txtcgstper.setValue(selrow.get('tax_cgstper'));
				txtsgstper.setValue(selrow.get('tax_sgstper'));
				txtigstper.setValue(selrow.get('tax_igstper'));

                                cmbcgstledger.setValue(selrow.get('tax_cgstledcode'));
                                cmbsgstledger.setValue(selrow.get('tax_sgstledcode'));
                                cmbigstledger.setValue(selrow.get('tax_igstledcode'));

                                cmbcgstledger.setRawValue(selrow.get('tax_cgstledger'));
                                cmbsgstledger.setRawValue(selrow.get('tax_sgstledger'));
                                cmbigstledger.setRawValue(selrow.get('tax_igstledger'));

		                cmbState.setValue(selrow.get('tax_state'));		

				flxDetail.getSelectionModel().clearSelections();

		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
   }

   });

   var MasPurchaseTaxPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasPurchaseTaxPanel',
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
                    text: 'New',
                    id  : 'new',
                    style  : 'text-align:center;',
                    tooltip: 'NEW Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                         Ext.getCmp('txtNewPurchaseLedger').setDisabled(false);
                         Ext.getCmp('txtGSTLedger').setDisabled(true);
                         SaveFlag = "Add";
                         txtNewPurchaseLedger.focus();
                        }
                     }    
                },'-',   
                
                {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                               var ledname ='';    
                               if (SaveFlag == "Add")
                                  ledname =  txtNewPurchaseLedger.getRawValue();
                               else
                                  ledname =  txtGSTLedger.getRawValue();
    


                                if (SaveFlag == "Add" && (txtNewPurchaseLedger.getRawValue()=="" || txtNewPurchaseLedger.getValue()==0))
				{
					alert("Enter Tax Name..");
					txtGSTLedger.setFocus();
				}
                                else if (SaveFlag == "Edit" && (txtGSTLedger.getRawValue()=="" || txtGSTLedger.getValue()==0))
				{
					alert("Enter Tax Name..");
					txtNewPurchaseLedger.setFocus();
				}

				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You Want to save the Record',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmMasPurTaxSave.php',
		                                params:
						{
                            saveflag        : SaveFlag,
                            taxledcode      : ledgercode,
							taxname         : ledname, 
							taxsgst_ledger  : cmbsgstledger.getRawValue(), 
							taxcgst_ledger  : cmbcgstledger.getRawValue(), 
							taxigst_ledger  : cmbigstledger.getRawValue(),  
							taxsgst_ledcode : cmbsgstledger.getValue(), 
							taxcgst_ledcode : cmbcgstledger.getValue(), 
							taxigst_ledcode : cmbigstledger.getValue(),  
							taxsgst         : txtsgstper.getValue(),   
							taxcgst         : txtcgstper.getValue(), 				
                            taxigst         : txtigstper.getValue(), 
						    statecode       : cmbState.getValue(), 

 

       
 	
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasPurchaseTaxPanel.getForm().reset();
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
                                      
					 	}   
			        		});
			    	
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
                    handler: function(){	
                            MasPurchaseTaxWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 260,
                width   : 940,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 90,
                y       : 10,	
                items:[

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 160,
                             width       : 700,
                             x           : 0,
                             y           : 10,
                             border      : false,
                             items: [txtNewPurchaseLedger]   	
                           },


                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 160,
                             width       : 700,
                             x           : 0,
                             y           : 60,
                             border      : false,
                             items: [txtGSTLedger]   	
                           },

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 80,
                             width       : 500,
                             x           : 600,
                             y           : 60,
                             border      : false,
                             items: [cmbState]   	
                           },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 160,
                              width       : 400,
                              x           : 0,
                              y           : 110,
                              border      : false,
                              items: [txtcgstper]
                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 100,
                              width       : 600,
                              x           : 300,
                              y           : 110,
                              border      : false,
                              items: [cmbcgstledger]

                             },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 160,
                              width       : 300,
                              x           : 0,
                              y           : 150,
                              border      : false,
                              items: [txtsgstper]
                            } ,   
		
  
                           { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 600,
                             x           : 300,
                             y           : 150,
                             border      : false,
                             items: [cmbsgstledger]


                            },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 160,
                              width       : 400,
                              x           : 0,
                              y           : 190,
                              border      : false,
                              items: [txtigstper]
                            } ,

  
                             { 
                               xtype       : 'fieldset',
                               title       : '',
                               labelWidth  : 100,
                               width       : 600,
                               x           : 300,
                               y           : 190,
                               border      : false,
                               items: [cmbigstledger]

                             },
                ]
            },
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 250,
                width   : 1120,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 270,
                items:[flxDetail]
            },   flxLedger ,  flxLedgerGST

        ],
    });
    
   
    var MasPurchaseTaxWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
        y           : 35,
        title       : 'PURCHASE GST MASTER',
        items       : MasPurchaseTaxPanel,
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
		}
        } 
    });
    MasPurchaseTaxWindow.show();  
});
