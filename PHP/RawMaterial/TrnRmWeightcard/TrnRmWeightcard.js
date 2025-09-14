Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');
   var gstStatus = "N";
   var gstFlag = "Add";
   var itemgrpcode = 0;
   var edwtno = 0, wtno = 0 ;

  var optWT="Mill";

  var partycode =0;

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);



new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  TrnWightcardWindow.hide();

            }
        }]);



var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'SUPPLIER NAME',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  300,
        labelStyle : "font-size:13px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();


             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
          },
	    keyup: function () {
	        flxParty.getEl().setStyle('z-index','10000');
	        flxParty.show();
                loadSupplierListDatastore.removeAll();
                  if (txtSupplierName.getRawValue() != '')
                     itemSearch();
            }
         }  
    });



var optWeight = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optWeight',
        items: [
		{boxLabel: 'Mill Weight', name: 'optWeight', id:'optmill', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   optWT="Mill";
                                           txtAcceptedWeight.setValue(txtNetWeight.getValue());
					}
				}
			}
		},
		{boxLabel: 'Party Weight', name: 'optWeight', id:'optparty', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   optWT="Party";
                                           txtAcceptedWeight.setValue(txtPartyNetWeight.getValue());

					}
				}
			}
		},

            
        ],
    }



    ]
});

var lblParty = new Ext.form.Label({
    fieldLabel  : 'Party (Wt)',
    id          : 'lblParty',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});



 var loadItemdatastore = new Ext.data.Store({
      id: 'loadItemdatastore',
      autoLoad:true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmh_code', type: 'int',mapping:'itmh_code'},
	{name:'itmh_name', type: 'string',mapping:'itmh_name'}
      ]),
    });


 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
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

 var loadWBTicketDatastore = new Ext.data.Store({
      id: 'loadWBTicketDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWBTicketNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_ticketno'
      ]),
    });


	var loadareadatastore = new Ext.data.Store({
      id: 'loadareadatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'area_code', type: 'int',mapping:'area_code'},
	{name:'area_name', type: 'string',mapping:'area_name'}
      ]),
    });
	
	var loadsupervisordatastore = new Ext.data.Store({
      id: 'loadsupervisordatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'spvr_code', type: 'int',mapping:'spvr_code'},
	{name:'spvr_name', type: 'string',mapping:'spvr_name'}
      ]),
    });

var loadTicketNodatastore = new Ext.data.Store({
      id: 'loadTicketNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTicketNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wc_seqno', 'wc_compcode', 'wc_fincode', 'wc_no', 'wc_date', 'wc_area_code', 'wc_sup_code', 'wc_item', 'wc_supervisor', 'wc_vehicleno', 'wc_transportname', 'wc_wb_no', 'wc_loadwt', 'wc_netwt', 'wc_status', 'wc_usr_code', 'wc_entry_date','wc_loadwt','wc_unloadingtime','wc_item','wc_supplier','wc_time','wc_emptywt',
'wc_partyloadwt', 'wc_partyemptywt', 'wc_partynetwt', 'wc_acceptedwt', 'wc_process', 'wt_type','wc_itemcode','cust_ref'
      ]),
    });

	var txtWeighSlipNo = new Ext.form.NumberField({
        fieldLabel  : 'Weight Sl.No',
        id          : 'txtWeighSlipNo',
        name        : 'txtWeighSlipNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,
	listeners   : {
	blur        : function() {

		if (gstFlag === "Edit" && (txtWeighSlipNo.getValue() > 0 || txtWeighSlipNo.getValue() === "")) {


		}
	}
	}
    });

/*
var btnImport = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "Import Party",
    width   : 30,
    height  : 40,
    x       : 840,
    y       : 10,

    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
			Ext.Ajax.request({
	            	url: 'TrnRmWeightcardImportParty.php',
	       	        params:
			{
			},
                        });
        }
     }
});

*/



var btnRM = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "RM",
    width   : 30,
    height  : 40,
    x       : 1240,
    y       : 10,

    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
           window.location.href=('http://10.0.0.150/SHVPMB/RawMaterial/TrnRmWeightcard/FrmTrnRmWeightcard.php');   
        }
     }
});



var btnQC = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "QC",
    width   : 30,
    height  : 40,
    x       : 1240,
    y       : 50,

    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
            window.location.href=('http://10.0.0.150/SHVPMB/QC/TrnRMQC/FrmTrnRmQC.php');  
        }
     }
});




var btnAddArea = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "Add Area",
    width   : 120,
    height  : 40,
    x       : 880,
    y       : 105,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
             Ext.getCmp('areabox').setVisible(true);
        }
     }
});



var btnAddRefresh = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "R",
    width   : 30,
    height  : 40,
    x       : 880,
    y       : 125,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
               Ext.getCmp('txtItemName').setReadOnly(false);

        }
     }
});


var btnSave =   new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "Save",
    width   : 120,
    height  : 40,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   


		Ext.Ajax.request({
            	url: '/SHVPM/RawMaterial/MasArea/FrmMasAreaSave.php',
       	        params:
		{

			loadingArea : txtAreaName.getRawValue()
		},
		callback: function (options, success, response)
        	{
            	var obj = Ext.decode(response.responseText);
            	if (obj['success'] === "true") 
		{

		Ext.MessageBox.alert("Alert","Saved ");
                Ext.getCmp('areabox').setVisible(false);
 			loadareadatastore.removeAll();
			loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });               

                }
             	else 
		{

			if(obj['cnt']>0)
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
     
var cmbTicketNo = new Ext.form.ComboBox({
        fieldLabel      : 'WB Ticket No.',
        width           : 100,
        displayField    : 'wc_ticketno', 
        valueField      : 'wc_ticketno',
        hiddenName      : '',
        id              : 'cmbTicketNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadWBTicketDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){



			loadTicketNodatastore.removeAll();
			loadTicketNodatastore.load({
			url: 'ClsRmWtCard.php',
			params: {
				task: 'loadTicketNoDetail',
				compcode : Gincompcode,
				finid    : GinFinid,
				wtno     : cmbTicketNo.getValue(),
			},
			callback:function()
			{
				if (loadTicketNodatastore.getCount() > 0) {



				if (loadTicketNodatastore.getAt(0).get('wt_type') == "M")

                                   Ext.getCmp('optWeight').setValue(1);  
                                else
                                   Ext.getCmp('optWeight').setValue(2);  


				dtWeighSlipDate.setRawValue(Ext.util.Format.date(loadTicketNodatastore.getAt(0).get('wc_date'),'d-m-Y'));



                                if (loadTicketNodatastore.getAt(0).get('wc_sup_code') > 0)
                                   txtSupplierName.setRawValue(loadTicketNodatastore.getAt(0).get('cust_ref'));
                                else
                                   txtSupplierName.setValue('');
                                
                                partycode = loadTicketNodatastore.getAt(0).get('wc_sup_code'); 
				cmbarea.setValue(loadTicketNodatastore.getAt(0).get('wc_area_code'));
				txtWBTime.setValue(loadTicketNodatastore.getAt(0).get('wc_time'));	
//				cmbsupervisor.setValue(loadTicketNodatastore.getAt(0).get('wc_supervisor'));
				txtWeighBridgeSupplierName.setValue(loadTicketNodatastore.getAt(0).get('wc_supplier'));
          if (gstFlag == "Add")
                 txtSupplierName.setRawValue(loadTicketNodatastore.getAt(0).get('wc_supplier').substring(0,8));	



				txtvehicle.setValue(loadTicketNodatastore.getAt(0).get('wc_vehicleno'));	
				txtItemName.setValue(loadTicketNodatastore.getAt(0).get('wc_item'));	
				txtEmptyWeight.setValue(loadTicketNodatastore.getAt(0).get('wc_emptywt'));	
				txtNetWeight.setValue(loadTicketNodatastore.getAt(0).get('wc_netwt'));	
				txtLoadWeight.setValue(Number(loadTicketNodatastore.getAt(0).get('wc_loadwt')));	
				txtPartyEmptyWeight.setValue(loadTicketNodatastore.getAt(0).get('wc_partyemptywt'));	
				txtPartyNetWeight.setValue(loadTicketNodatastore.getAt(0).get('wc_partynetwt'));	
				txtPartyLoadWeight.setValue(Number(loadTicketNodatastore.getAt(0).get('wc_partyloadwt')));
                                txtAcceptedWeight.setValue(loadTicketNodatastore.getAt(0).get('wc_acceptedwt'));
                                cmbItemName.setValue(loadTicketNodatastore.getAt(0).get('wc_itemcode'));

                                if (loadTicketNodatastore.getAt(0).get('wc_item') == "WASTE PAPER")
                                   cmbItemName.setValue(0);
                                else
                                   cmbItemName.setRawValue('');
				  if (txtSupplierName.getRawValue() != '')
				     itemSearch();

				}//if cnt > 0
				else if(gstFlag === "Edit" && txtWeighSlipNo.getValue() > 0 ) {
					Ext.MessageBox.alert("Weight Card", "Weight Card Details not found");
				}
			
			}
			});
			
	   }
        }      
   });

 var loadSupplierListDatastore = new Ext.data.Store({
      id: 'loadSupplierListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });


   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 320,
        width: 420,
        x: 80,
        y: 150,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSupplierListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			partycode = selrow.get('cust_code');
                 	txtSupplierName.setRawValue(selrow.get('cust_ref'));

                        flxParty.hide();
                        if (e.getKey() == e.ENTER) {
			partycode = selrow.get('cust_code');
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
			        partycode = selrow.get('cust_code');
	                 	txtSupplierName.setRawValue(selrow.get('cust_ref'));

                                flxParty.hide();     

			}
		}
 
    
   }
   });
function itemSearch()
{

        loadSupplierListDatastore.removeAll();
        loadSupplierListDatastore.load({
		url: 'ClsRmWtCard.php',
		params:
		{
			task:"loadSearchitemlist",
			party    : txtSupplierName.getRawValue(),
		},
        });
}





var dtWeighSlipDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtWeighSlipDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
	enableKeyEvents: true,
    listeners:{
            change:function(){
                  loadWBTicketDatastore.removeAll();
                   loadWBTicketDatastore.load({
		     url: 'clsRmWtCard.php',
		     params:
			    {
			        task: "loadWBTicketNoList",
			        finid: GinFinid,
			        compcode:Gincompcode,
                                entrydate :Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),

			    }
		     });

            },
            keyup:function(){
                  loadWBTicketDatastore.removeAll();
                   loadWBTicketDatastore.load({
		     url: 'clsRmWtCard.php',
		     params:
			    {
			        task: "loadWBTicketNoList",
			        finid: GinFinid,
			        compcode:Gincompcode,
                                entrydate :Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),

			    }
		     });

            },
            blur:function(){
                  loadWBTicketDatastore.removeAll();
                   loadWBTicketDatastore.load({
		     url: 'clsRmWtCard.php',
		     params:
			    {
			        task: "loadWBTicketNoList",
			        finid: GinFinid,
			        compcode:Gincompcode,
                                entrydate :Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),

			    }
		     });

            },
    }
});
/*
var dtUnloading = new Ext.form.DateField({
    fieldLabel : 'Unloading Time',
    id         : 'dtUnloading',
    name       : 'date',
    format     : 'd-m-Y H.i',
    value      : new Date(),
//    anchor     : '100%',
    width : 150,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
    listeners:{
            change:function(){
            }
    }
}); 
*/



var cmbitemgroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 250,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbitemgroup',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','WASTE PAPER'],['2','FUEL'],['3','GENERAL STORES'],['4','OTHERS']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbarea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 250,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbarea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadareadatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false
   });


var cmbItemName = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name',
        width           : 350,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemdatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Supplier',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbsupplier',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loadsupplierdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:
		{
		select:function()
				{
				cmbarea.focus();
				loadareadatastore.removeAll();
				loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });
				}
		
		}
   });

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 250,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadsupervisordatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:
		{
		select:function()
				{
				cmbitemgroup.focus();
				
				}
		
		}
   });


 var txtWBTime = new Ext.form.TextField({
        fieldLabel  : 'WB. Time',
        id          : 'txtWBTime',
        name        : 'txtWBTime',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });
 
 var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

 var txtAreaName = new Ext.form.TextField({
        fieldLabel  : 'Area',
        id          : 'txtAreaName',
        name        : 'txtAreaName',
        width       :  170,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

 var txtWeighBridgeSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Sup. Name(WB)',
        id          : 'txtWeighBridgeSupplierName',
        name        : 'txtWeighBridgeSupplierName',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

 var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
        readOnly : true,
    });


 var txtWbTicketNo = new Ext.form.NumberField({
        fieldLabel  : 'WB Ticket No',
        id          : 'txtWbTicketNo',
        name        : 'txtWbTicketNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

function find_netwt()
{
		if ( Number(txtPartyLoadWeight.getValue()) > 0 && Number(txtPartyEmptyWeight.getValue())>Number(txtPartyLoadWeight.getValue()))
			{
			alert("Empty Weight should be less than Load Weight..");

			txtPartyLoadWeight.focus();
			txtPartyLoadWeight.setValue("");
			}
			txtPartyNetWeight.setValue(Number(txtPartyLoadWeight.getValue()) - Number(txtPartyEmptyWeight.getValue()));

if (optWT == "Mill")
    txtAcceptedWeight.setValue(txtNetWeight.getValue());
else
    txtAcceptedWeight.setValue(txtPartyNetWeight.getValue());

			
}

var txtLoadWeight = new Ext.form.NumberField({
        fieldLabel  : 'Loaded Wt(Kgs)',
        id          : 'txtLoadWeight',
        name        : 'txtLoadWeight',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	readOnly : true,
	listeners:{
/*
	   blur:function()
		{
                     find_netwt();
		},
	    change:function()
		{
                     find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}
*/
}
    });

var txtNetWeight = new Ext.form.NumberField({
        fieldLabel  : 'Net Wt(Kgs)',
        id          : 'txtNetWeight',
        name        : 'txtNetWeight',
        width       :  100,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtAcceptedWeight = new Ext.form.NumberField({
        fieldLabel  : 'Accepted Wt',
        id          : 'txtAcceptedWeight',
        name        : 'txtAcceptedWeight',
        width       :  100,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txtEmptyWeight = new Ext.form.NumberField({
        fieldLabel  : 'Empty Wt(Kgs)',
        id          : 'txtEmptyWeight',
        name        : 'txtEmptyWeight',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	readOnly : true,
	listeners:{
/*
	     blur: function()
		{
                   find_netwt();
		},
	    change: function()
		{
                  find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}
*/
}
    });


var txtPartyLoadWeight = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyLoadWeight',
        name        : 'txtPartyLoadWeight',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,

	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtPartyEmptyWeight.focus();

             }
           },   
	   blur:function()
		{
                     find_netwt();
		},
	    change:function()
		{
                     find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}

}
    });

var txtPartyNetWeight = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyNetWeight',
        name        : 'txtPartyNetWeight',
        width       :  100,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,

    });

var txtPartyEmptyWeight = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPartyEmptyWeight',
        name        : 'txtPartyEmptyWeight',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,

	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtPartyNetWeight.focus();

             }
           },   

	     blur: function()
		{
                   find_netwt();
		},
	    change: function()
		{
                  find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}

}
    });

   function RefreshData(){
        Ext.getCmp('areabox').setVisible(false);
               Ext.getCmp('txtItemName').setReadOnly(true);

    flxParty.hide();
        optWT="Mill";



	gstFlag = "Add";
	  loadWBTicketDatastore.removeAll();
	   loadWBTicketDatastore.load({
	     url: 'clsRmWtCard.php',
	     params:
		    {
			task: "loadWBTicketNoList",
			finid: GinFinid,
			compcode:Gincompcode,
		        entrydate :Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),

		    }
	     });

		cmbTicketNo.setRawValue('');
                cmbsupplier.setValue(0);
                cmbarea.setValue();
                txtvehicle.setRawValue('');
                txtLoadWeight.setValue('');
                txtEmptyWeight.setValue('');   
                txtNetWeight.setValue('');  
                txtPartyLoadWeight.setValue('');
                txtPartyEmptyWeight.setValue('');   
                txtPartyNetWeight.setValue('');   
                txtAcceptedWeight.setValue('');
                txtItemName.setValue('');
                txtItemName.setValue('');
                txtWeighBridgeSupplierName.setValue('');




};

function save_click()
{
        if(txtSupplierName.getRawValue()=="" || partycode ==0)
	{
		alert("Select Supplier");
		cmbsupplier.focus();
	}
	else if(cmbarea.getRawValue()=="" || cmbarea.getValue()==0)
	{
		alert("Select Area");
		cmbarea.focus();
	}

//	else if(cmbItemName.getRawValue() != "WASTE PAPER" || cmbItemName.getValue()==0)
//	{
//		alert("Select Item Name");
//		cmbItemName.focus();
	//}

	else if(txtItemName.getRawValue()==""  )
	{
		alert("Select item Name..");
		txtItemName.focus();
	}


	else if(txtvehicle.getRawValue()=="" || txtvehicle.getRawValue()==0)
	{
		alert("Enter Vehicle No..");
		txtvehicle.focus();
	}
	else if(txtItemName.getRawValue()=="")
	{
		alert("Enter Item Name..");
		txtItemName.focus();
	}

	else if(txtLoadWeight.getValue()=="" || txtLoadWeight.getValue()==0)
	{
		alert("Enter Load Wt..");
		txtLoadWeight.focus();
	}
	else if(txtNetWeight.getValue()=="" || txtNetWeight.getValue()==0)
	{
		alert("Enter Net Wt..");
		txtNetWeight.focus();
	}
	else if(txtEmptyWeight.getValue()=="" || txtEmptyWeight.getValue()==0)
	{
		alert("Enter Empty Wt..");
		txtEmptyWeight.focus();
	}
	else if(txtPartyLoadWeight.getValue()=="" || txtPartyLoadWeight.getValue()==0)
	{
		alert("Enter Party Load Wt..");
		txtPartyLoadWeight.focus();
	}
	else if(txtPartyNetWeight.getValue()=="" || txtPartyNetWeight.getValue()==0)
	{
		alert("Enter Party Net Wt..");
		txtPartyNetWeight.focus();
	}
	else if(txtPartyEmptyWeight.getValue()=="" || txtPartyEmptyWeight.getValue()==0)
	{
		alert("Enter Party Empty Wt..");
		txtPartyEmptyWeight.focus();
	}				
	else
	{
		Ext.MessageBox.show({
	        title: 'Confirmation',
	        icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
    		msg: 'Do u want to save',
    		fn: function(btn)
		{
		if (btn == 'yes')
			{

			Ext.Ajax.request({
	            	url: 'TrnRmWeightcardSave.php',
	       	        params:
			{
				compcode	:Gincompcode,
				finid		:GinFinid,
				ticketno 	:cmbTicketNo.getRawValue(),
				supplier	:partycode,
	            		itemcode	:cmbItemName.getValue(),
                                itemname        :txtItemName.getRawValue(),
				area		:cmbarea.getValue(),
				vehicleno	:txtvehicle.getRawValue(),
                                partyloadwt     : txtPartyLoadWeight.getValue(),    
                                partyemptywt    : txtPartyEmptyWeight.getValue(),   
                                partynetwt      : txtPartyNetWeight.getValue(),   
                                Acceptedwt      : txtAcceptedWeight.getValue(),
                                wttype          : optWT.substring(0,1),        


			},
			callback: function (options, success, response)
                	{
                    	var obj = Ext.decode(response.responseText);
                    	if (obj['success'] === "true") 
			{
				Ext.MessageBox.alert("Weight Card Save. Ticket No Is: " + obj['wtno']);
//			    	TrnWeightcardformpanel.getForm().reset();
				RefreshData();

                        }
                     	else 
			{

                     		Ext.MessageBox.alert("Alert","Not Saved or Already exists.. ");

                    	}
              
		 	}   
			});
    	
 		       }
                    }
                 });
	}
}

   var TrnWeightcardformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WEIGHT CARD ENTRY',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnWeightcardformpanel',
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
//view
				text: 'View',
				style  : 'text-align:center;',
				tooltip: 'View Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
	                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var entryno = "&ticketno=" + encodeURIComponent(txtWbTicketNo.getValue());
				var param =(compcode+fincode+entryno);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMWeighslip.rptdesign&__format=pdf&' + param, '_blank'); 
                                }
				}
			},'-',
			{
//edit
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
						txtWeighSlipNo.hide();
						cmbWeighSlipNo.show();
                           loadWBTicketDatastore.removeAll();
                           loadWBTicketDatastore.load({
			     url: 'clsRmWtCard.php',
			     params:
				    {
				        task: "loadWBTicketNoList",
				        finid: GinFinid,
				        compcode:Gincompcode,
                                        entdate :Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),

				    }
        		     });
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
                              save_click();

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
                            TrnWeightcardformpanel.getForm().reset();
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
                            TrnWightcardWindow.hide();
                        }
                }]
        },
        items: [


            { xtype   : 'fieldset',
                title   : 'WEIGHMENT SLIP ENTRY',
                layout  : 'hbox',
                border  : true,
                height  : 510,
                width   : 570,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
/*
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtWeighSlipNo]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbWeighSlipNo]
                            },
*/
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [dtWeighSlipDate]
                            },

			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbTicketNo]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 250,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtWBTime]
                            },


/*
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbsupervisor]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txttransport]
                            },

*/


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtWeighBridgeSupplierName]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtSupplierName]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbarea]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 400,
                                	y           : 160,
                                    	border      : false,
                                	items: [btnAddArea]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 400,
                                	y           : 195,
                                    	border      : false,
                                	items: [btnAddRefresh]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txtItemName]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [cmbItemName]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtvehicle]
                            },
			

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 260,
                                	x           : 0,
                                	y           : 320,
                                    	border      : false,
                                	items: [txtLoadWeight]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 260,
                                	x           : 0,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtEmptyWeight]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 260,
                                	x           : 00,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtNetWeight]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 260,
                                	x           : 00,
                                	y           : 440,
                                    	border      : false,
                                	items: [txtAcceptedWeight]
                            },
                           {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 275,
                            y           : 300,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblParty]
                        },


{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 20,
                                	width       : 240,
                                	x           : 240,
                                	y           : 320,
                                    	border      : false,
                                	items: [txtPartyLoadWeight]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 20,
                                	width       : 240,
                                	x           : 240,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtPartyEmptyWeight]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 20,
                                	width       : 240,
                                	x           : 240,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtPartyNetWeight]
                            },

				{ 
					xtype   : 'fieldset',
					title   : 'Accepted Weight',
					layout  : 'hbox',
					border  : true,
					height  : 100,
					width   : 150,
					layout  : 'absolute',
					x       : 390,
					y       : 310,
					items:[optWeight],
				},flxParty,



                ]

            },
/*
            { xtype   : 'fieldset',
                title   : 'Supplier Search',
                layout  : 'hbox',
                border  : true,
                height  : 510,
                width   : 420,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 590,
                y       : 10,
                items:[ 
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 10,
                                	y           : -10,
                                    	border      : false,
                              //  	items: [txtSupplierName]
                            }, //flxParty,
                ]
             },
*/
            { xtype   : 'fieldset',
                title   : 'ADD NEW AREA NAME',
     //           layout  : 'hbox',
                border  : false,
                height  : 150,
                width   : 250,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 1030,
                y       : 290,
                id      : 'areabox',
                items:[
              		{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 40,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtAreaName]
                        },
              		{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 40,
                        	width       : 400,
                        	x           : 50,
                        	y           : 50,
                            	border      : false,
                        	items: [btnSave]
                        },

                      ]   
            },
            btnRM,btnQC, //btnImport
            
        ],
    });
    
   
    var TrnWightcardWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'WEIGHT CARD ENTRY',
        items       : TrnWeightcardformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
       Ext.getCmp('areabox').setVisible(false);

			Ext.Ajax.request({
	            	url: 'TrnRmWeightcardImport.php',
	       	        params:
			{
				compcode : Gincompcode,
			},
                        });

			Ext.Ajax.request({
	            	url: 'TrnRmWeightcardImportParty.php',
	       	        params:
			{
			},
                        });

RefreshData();
/*
			loadTicketNodatastore.removeAll();
			loadTicketNodatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadTicketNoDetail",
				 compcode : Gincompcode,
				 finid : GinFinid,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{
				txtWeighSlipNo.setValue(loadTicketNodatastore.getAt(0).get('wc_no'));
				}
				 });
*/
			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			loadareadatastore.removeAll();
			loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });
/*
			loadsupervisordatastore.removeAll();
			loadsupervisordatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadsupervisor"
                        	 }
				 });
*/
//			cmbitemgroup.setValue(1);			
	   			 }

		}
    });
    TrnWightcardWindow.show();  
});
