Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var gstStatus = "N";

var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var SaveFlag = "Add";
var LoadItemcodeDataStore = new Ext.data.Store({
      id: 'LoadItemcodeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadscrapitemcode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itemcode'
      ]),
    });

var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadSGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadIGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

var LoadSalesLedgerDataStore = new Ext.data.Store({
      id: 'LoadSalesLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSalesledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code','cust_name'
      ]),
    })

 var loadscrapitemdatastore = new Ext.data.Store({
      id: 'loadscrapitemdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadscrapitem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'salitem_code', 'salitem_name', 'salitem_uom', 'salitem_hsn', 'salitem_cgstper', 'salitem_sgstper', 'salitem_igstper', 'salitem_salesledcode', 'salitem_cgstledcode', 'salitem_sgstledcode', 'salitem_igstledcode', 'uom_short_name', 'salesledcodetn', 'saleslednametn', 'cgstledcode', 'cgstledname', 'sgstledcode', 'sgstledname', 'igstledcode', 'igstledname' ,'salesledcodeos', 'saleslednameos'
 
      ]),
    });

 var loadscrapitemledgerdatastore = new Ext.data.Store({
      id: 'loadscrapitemledgerdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesCustomer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadscrapitemledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code','cust_name', 'led_type', 'led_custcode'
 
      ]),
    });

var loaduomdatastore = new Ext.data.Store({
      id: 'loaduomdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaduom"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'uom_code', 'uom_name', 'uom_short_name'
 
      ]),
    });
    
 var loadhsncodedatastore = new Ext.data.Store({
      id: 'loadhsncodedatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasOtherItems.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsncode"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'hsn_sno', 'hsn_code', 'hsn_type', 'hsn_igst', 'hsn_cgst', 'hsn_sgst'
 
      ]),
    });    
 
//var gstGroup;
//OUT SIDE

var cmbuom = new Ext.form.ComboBox({
        fieldLabel      : 'UOM',
        width      	 :  120,
        displayField    : 'uom_short_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbuom',
        typeAhead       : true,
        mode            : 'local',
        store           : loaduomdatastore,
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

var cmbhsncode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN CODE',
        width      	 :  120,
        displayField    : 'hsn_code', 
        valueField      : 'hsn_sno',
        hiddenName      : '',
        id              : 'cmbhsncode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadhsncodedatastore,
        forceSelection  : false,
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
                if (txtitemcode.getValue() == 0)
                   alert("Please Refresh the screen and Continue...");

	}
	}
});
var lblledgergrp = new Ext.form.Label({
	fieldLabel  : 'LEDGER GROUP',
	id          : 'lblledgergrp',
	name        : 'lblledgergrp',
	width       :  100,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
});

var txtcgst = new Ext.form.NumberField({
	fieldLabel  : 'CGST  %',
	id          : 'txtcgst',
	name        : 'txtcgst',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        listeners   :{
           blur:function(){
                txtsgst.setValue(txtcgst.getValue()); 
                txtigst.setValue(txtcgst.getValue()+txtcgst.getValue()); 
                if (txtitemcode.getValue() == 0)
                   alert("Please Refresh the screen and Continue...");

           },
           keyup:function(){
                txtsgst.setValue(txtcgst.getValue());
                txtigst.setValue(txtcgst.getValue()+txtcgst.getValue());
                if (txtitemcode.getValue() == 0)
                   alert("Please Refresh the screen and Continue...");

           },
        }    

});

var txtitemcode = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtitemcode',
	name        : 'txtitemcode',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtitemname = new Ext.form.TextField({
	fieldLabel  : 'ITEM NAME',
	id          : 'txtitemname',
	name        : 'txtitemname',
	width       :  300,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
   	
	tabindex : 1,
      	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {


                  flxScrapitem.getStore().filter('salitem_name', txtitemname.getValue());  
            }
        }

});

var cmbSalesLedgerTN = new Ext.form.ComboBox({
        fieldLabel      : 'SALES Ledger - GST',
        width           :  320,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSalesLedgerTN',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSalesLedgerDataStore,
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

var cmbSalesLedgerOS = new Ext.form.ComboBox({
        fieldLabel      : 'SALES Ledger - IGST',
        width           :  320,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSalesLedgerOS',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSalesLedgerDataStore,
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
})

var cmbcgstledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  320,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbcgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
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

var txtsgst = new Ext.form.TextField({
	fieldLabel  : 'SGST  %',
	id          : 'txtsgst',
	name        : 'txtsgst',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var cmbsgstledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  320,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbsgstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
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
var txtigst = new Ext.form.TextField({
	fieldLabel  : 'IGST  %',
	id          : 'txtigst',
	name        : 'txtigst',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var cmbigstledger = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  320,
        displayField    : 'cust_name', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbigstledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
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
   var flxScrapitem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 1250,
        x: 20,
        y: 340,
             
        columns: [ 
            {header: "Item code",   dataIndex: 'salitem_code', sortable:true,width:50,align:'left',hidden :true},             
            {header: "Item Name",   dataIndex: 'salitem_name', sortable:true,width:250,align:'left'},
            {header: "Item UOM",    dataIndex: 'salitem_uom', sortable:true,width:50,align:'left',hidden :true},       
            {header: "UOM",         dataIndex: 'uom_short_name', sortable:true,width:50,align:'left'},
            {header: "HSN Code",    dataIndex: 'salitem_hsn', sortable:true,width:80,align:'left'},
            {header: "CGST %",      dataIndex: 'salitem_cgstper', sortable:true,width:80,align:'left'},                  
            {header: "CGST L.Code", dataIndex: 'cgstledcode', sortable:true,width:80,align:'left' ,hidden :true},                  
            {header: "CGST Ledger" ,dataIndex: 'cgstledname', sortable:true,width:200,align:'left'},
            {header: "SGST %",      dataIndex: 'salitem_sgstper', sortable:true,width:80,align:'left'},
            {header: "SGST L.Code", dataIndex: 'sgstledcode', sortable:true,width:80,align:'left',hidden :true},                  
            {header: "SGST Ledger", dataIndex: 'sgstledname', sortable:true,width:200,align:'left'},
            {header: "IGST %",      dataIndex: 'salitem_igstper', sortable:true,width:80,align:'left'},
            {header: "IGST L.Code", dataIndex: 'igstledcode', sortable:true,width:80,align:'left',hidden :true},                  
            {header: "IGST Ledger", dataIndex: 'igstledname', sortable:true,width:200,align:'left'},
            {header: "TN-Sales L.Code",dataIndex: 'salesledcodetn', sortable:true,width:200,align:'left',hidden :true},
            {header: "TNSales Ledger",dataIndex: 'saleslednametn', sortable:true,width:200,align:'left'},
            {header: "OS-Sales L.Code",dataIndex: 'salesledcodeos', sortable:true,width:200,align:'left',hidden :true},
            {header: "OSSales Ledger",dataIndex: 'saleslednameos', sortable:true,width:200,align:'left'},

        ],
       store: loadscrapitemdatastore,
    listeners:{	
       'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

                        SaveFlag = "Edit";

			var sm = flxScrapitem.getSelectionModel();
			var selrow = sm.getSelected();
			 /*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0;*/ 
         		gridedit = "true";
			editrow = selrow;
			
			
                        /*indqty = selrow.get('ordqty');
                        cmbindno.setValue(selrow.get('indentno'));  
                        cmbindno.setRawValue(selrow.get('indentno'));  
			cmbItems.setValue(selrow.get('itemcode'));
			cmbItems.setRawValue(selrow.get('itemname'));*/
			
			txtitemname.setValue(selrow.get('salitem_name'));
			cmbuom.setValue(selrow.get('salitem_uom'));
			cmbhsncode.setValue(selrow.get('salitem_hsn'));
			txtcgst.setValue(selrow.get('salitem_cgstper'));
			cmbcgstledger.setValue(selrow.get('cgstledcode'));
			txtsgst.setValue(selrow.get('salitem_sgstper'));
			cmbsgstledger.setValue(selrow.get('sgstledcode'));
			txtigst.setValue(selrow.get('salitem_igstper'));
			cmbigstledger.setValue(selrow.get('igstledcode'));
		        cmbSalesLedgerTN.setValue(selrow.get('salesledcodetn'));
		        cmbSalesLedgerOS.setValue(selrow.get('salesledcodeos'));
                        txtitemcode.setValue(selrow.get('salitem_code'));
			
			
		var cledcode = selrow.get('cust_led_code');
//		cmbsalcustpartygrp.reset();
	        loadscrapitemdatastore.removeAll();
	        loadscrapitemdatastore.load({
		url: 'ClsMasOtherItems.php', 
		params:
		{
			task:"loadscrapitem",
			//ledcode: cledcode,
			cusled :"Y"
		},
		callback : function() {
			
		}
	});

			flxScrapitem.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   }); 
var MasScrapFormpanel = new Ext.FormPanel({
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
        id          : 'MasScrapFormpanel',
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
				SaveFlag = "Add";
				MasScrapFormpanel.getForm().reset();
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
				SaveFlag = "Edit";

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

                            if (Number(txtitemcode.getValue()) == 0)
                            {
                                  Ext.Msg.alert('Item Master','Item is empty');
                            }

                            else if (Number(cmbcgstledger.getValue()) == 0)
                            {
                                  Ext.Msg.alert('Item Master','Select CGST Ledger');
                                  cmbcgstledger.focus();
                            }
                            else if (Number(cmbsgstledger.getValue()) == 0)
                            {
                                  Ext.Msg.alert('Item Master','Select SGST Ledger');
                                  cmbsgstledger.focus();
                            }
                            else if (Number(cmbigstledger.getValue()) == 0)
                            {
                                  Ext.Msg.alert('Item Master','Select IGST Ledger');
                                  cmbigstledger.focus();
                            }
                            else if (Number(cmbSalesLedgerTN.getValue()) == 0)
                            {
                                  Ext.Msg.alert('Item Master','Select TN SALES Ledger');
                                  cmbSalesLedgerTN.focus();
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
				               url: 'MasOtherItemSave.php',
				               params:
						{			 
 	                                        savetype      : SaveFlag,
						itemcode      : txtitemcode.getValue(),
						itemname      : txtitemname.getRawValue(),
						uom           : cmbuom.getValue(),
						hsn           : cmbhsncode.getRawValue(),
                                                cgst          : txtcgst.getValue(), 
                                                sgst          : txtsgst.getValue(), 
                                                igst          : txtigst.getValue(), 
                                                salesledcodetn  : cmbSalesLedgerTN.getValue(), 
                                                salesledcodeos  : cmbSalesLedgerOS.getValue(), 
                                                cgstledcode   : cmbcgstledger.getValue(), 
                                                sgstledcode   : cmbsgstledger.getValue(), 
                                                igstledcode   : cmbigstledger.getValue(), 
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Item Saved -" + obj['item'] + " Sucessfully");
	                                    MasScrapFormpanel.getForm().reset();
	                                    flxScrapitem.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
	if (obj['cnt'] > 0) 
	 Ext.MessageBox.alert(" Item Already Available! Pls Check! ");                                                  

	else
	  Ext.MessageBox.alert("Item Master Not Saved! Pls Check!- " + obj['item']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start  
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
				FrmMasScrap.hide();
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
			 y           : 10,
			 border      : false,
			 items: [txtitemname]
		        }, 
		       
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 200,
			 x           : 350,
			 y           : 10,
			 border      : false,
			 items: [txtitemcode]
		        },

		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 300,
			 x           : 10,
			 y           : 50,
			 border      : false,
			 items: [cmbuom]
		        }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 100,
			 width       : 300,
			 x           : 10,
			 y           : 90,
			 border      : false,
			 items	     : [cmbhsncode]
		        },
		       { 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 200,
			width       : 130,
			x           : 300,
			y           : 90,
			border      : false,
			items: [lblledgergrp]
		      },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 200,
                        x           : 10,
                        y           : 130,
                        border      : false,
                        items: [txtcgst]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 5,
			 width       : 500,
			 x           : 230,
			 y           : 130,
			 border      : false,
			 items: [cmbcgstledger]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 200,
                        x           : 10,
                        y           : 170,
                        border      : false,
                        items: [txtsgst]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 5,
			 width       : 500,
			 x           : 230,
			 y           : 170,
			 border      : false,
			 items: [cmbsgstledger]
		        },
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 200,
                        x           : 10,
                        y           : 210,
                        border      : false,
                        items: [txtigst]
                       }, 
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 5,
			 width       : 500,
			 x           : 230,
			 y           : 210,
			 border      : false,
			 items: [cmbigstledger]
		        },
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 225,
			 width       : 600,
			 x           : 10,
			 y           : 250,
			 border      : false,
			 items: [cmbSalesLedgerTN]
		        },
		      { 
			 xtype       : 'fieldset',
			 title       : '',
			 labelWidth  : 225,
			 width       : 600,
			 x           : 10,
			 y           : 290,
			 border      : false,
			 items: [cmbSalesLedgerOS]
		        },
                       flxScrapitem,
          ],       
    });

                                function RefreshData(){
				SaveFlag = "Add";
				MasScrapFormpanel.getForm().reset();

              			 loadscrapitemdatastore.load({
                		 url: 'ClsMasOtherItems.php', 
                        	 params:
                       		 {
                         	 task:"loadscrapitem"


                        	 }
				 });
              			 loadscrapitemledgerdatastore.load({
                		 url: 'ClsMasOtherItems.php', 
                        	 params:
                       		 {
                         	 task:"loadscrapitemledger"


                        	 }
				 });


               	        loaduomdatastore.removeAll();
           	        loaduomdatastore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loaduom",
                           },
	          	   callback:function()
	                   {
                           } 
                       }); 

               	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loadCGSTledgers",
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loadSGSTledgers",
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loadIGSTledgers",
                           },
	          	   callback:function()
	                   {
                           } 
                        }); 
               	        LoadSalesLedgerDataStore.removeAll();
           	        LoadSalesLedgerDataStore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loadSalesledgers",
                           },
	          	   callback:function()
	                   {
                           } 
                        }); 
               	        LoadItemcodeDataStore.removeAll();
           	        LoadItemcodeDataStore.load({
                           url: 'ClsMasOtherItems.php',
                           params: {
		                task: "loadscrapitemcode",
                           },
	          	   callback:function()
	                   {
                             txtitemcode.setValue(LoadItemcodeDataStore.getAt(0).get('itemcode'));
                           } 
                        }); 
   };
   
    var FrmMasScrap = new Ext.Window({
	height      : 600,
        width       : 1350,
        x	     :10,
        y           : 35,
        title       : 'OTHER SALES ITEM MASTER',
        items       : MasScrapFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                     txtitemcode.hide(); 
                      RefreshData();

		}
    },
});    
    FrmMasScrap.show();  
});
