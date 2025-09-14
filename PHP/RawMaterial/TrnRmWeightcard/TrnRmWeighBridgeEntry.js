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
  var first_sec_wt = '';



  function check_password()
   {
      if (txtPassword.getRawValue() == "wbentry")
      {
        Ext.getCmp('save').setDisabled(false);
      }
      else
      {
        Ext.getCmp('save').setDisabled(true);
      }    

   }   


var cmbLoadWtType = new Ext.form.ComboBox({
        fieldLabel      : 'First/Second',
        width           : 110,
        displayField    : 'field2', 
        valueField      : 'field1',

        id              : 'cmbLoadWtType',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','First Weight'],['2','Second Weight']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        labelStyle : "font-size:13px;font-weight:bold;color:#0080ff",
        allowblank      : true,
            listeners:{
                select: function () {
                   if (cmbLoadWtType.getValue() == 1)
                       cmbEmptyWtType.setValue(2);
                   else
                       cmbEmptyWtType.setValue(1);

   
                        
                }
            }
});

var cmbEmptyWtType = new Ext.form.ComboBox({
        fieldLabel      : 'First/Second',
        width           : 110,
        displayField    : 'field2', 
        valueField      : 'field1',
        id              : 'cmbEmptyWtType',
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','First Weight'],['2','Second Weight']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        labelStyle : "font-size:13px;font-weight:bold;color:#0080ff",
        allowblank      : true,
            listeners:{
                select: function () {
    
                      if (cmbEmptyWtType.getValue() == 1)
                       cmbLoadWtType.setValue(2);
                   else
                       cmbLoadWtType.setValue(1);

                        
                }
            }
});



   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  100,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
        //    console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 
    });


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
            baseParams:{task:"loadWighBridgeTicketNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          't_wb_ticketno'
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
            baseParams:{task:"loadWeighBridgeTicketNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
't_wb_year', 't_wb_compcode', 't_wb_ticketno', 't_wb_type', 't_wb_date', 't_wb_vehicle', 't_wb_item', 't_wb_party', 't_wb_area', 't_wb_1st_loadtype', 't_wb_1st_weight', 't_wb_1st_time', 't_wb_2nd_loadtype', 't_wb_2nd_time', 't_wb_2nd_weight', 't_wb_net_weight', 't_wb_upd', 't_wb_cancel_reason'
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
        displayField    : 't_wb_ticketno', 
        valueField      : 't_wb_ticketno',
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
				task: 'loadWeighBridgeTicketNoDetail',
				compcode : Gincompcode,
				finid    : GinFinid,
				ticketno : cmbTicketNo.getValue(),
			},
			callback:function()
			{
				if (loadTicketNodatastore.getCount() > 0) {


txtWbTicketNo.setValue(cmbTicketNo.getValue());
       				txtWBTime.setValue(loadTicketNodatastore.getAt(0).get('t_wb_1st_time'));	
				txtWeighBridgeSupplierName.setValue(loadTicketNodatastore.getAt(0).get('t_wb_party'));
				txtvehicle.setValue(loadTicketNodatastore.getAt(0).get('t_wb_vehicle'));	
				txtItemName.setValue(loadTicketNodatastore.getAt(0).get('t_wb_item'));	

                                if (loadTicketNodatastore.getAt(0).get('t_wb_1st_loadtype') == "L")
                                { 
         			txtLoadWeight.setValue(Number(loadTicketNodatastore.getAt(0).get('t_wb_1st_weight')));	
  				txtEmptyWeight.setValue(loadTicketNodatastore.getAt(0).get('t_wb_2nd_weight'));	
                                first_sec_wt = "L";
                                cmbLoadWtType.setValue(1);
                                }  
                                else
                                { 
         			txtLoadWeight.setValue(Number(loadTicketNodatastore.getAt(0).get('t_wb_2nd_weight')));	
  				txtEmptyWeight.setValue(loadTicketNodatastore.getAt(0).get('t_wb_1st_weight'));	
                                first_sec_wt = "E";
                                cmbLoadWtType.setValue(2);
                                }  

    
				txtNetWeight.setValue(loadTicketNodatastore.getAt(0).get('t_wb_net_weight'));	

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
			        task: "loadWighBridgeTicketNoList",
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
			        task: "loadWighBridgeTicketNoList",
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
			        task: "loadWighBridgeTicketNoList",
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

           if (Number(txtLoadWeight.getValue()) > 0 && Number(txtEmptyWeight.getValue()) > 0)	   
           txtNetWeight.setValue(Number(txtLoadWeight.getValue()) - Number(txtEmptyWeight.getValue()));			
           else
           txtNetWeight.setValue(0);
   
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
//	readOnly : true,
	listeners:{

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
//	readOnly : true,
	listeners:{

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
        Ext.getCmp('save').setDisabled(true);

               Ext.getCmp('txtItemName').setReadOnly(true);

    flxParty.hide();
        optWT="Mill";


			Ext.Ajax.request({
	            	url: 'TrnRmWeightcardImport.php',
	       	        params:
			{
				compcode : Gincompcode,
			},
                        });


	gstFlag = "Add";
	  loadWBTicketDatastore.removeAll();
	   loadWBTicketDatastore.load({
	     url: 'clsRmWtCard.php',
	     params:
		    {
			task: "loadWighBridgeTicketNoList",
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
//                txtPartyLoadWeight.setValue('');
//                txtPartyEmptyWeight.setValue('');   
//                txtPartyNetWeight.setValue('');   
//                txtAcceptedWeight.setValue('');
                txtItemName.setValue('');
                txtItemName.setValue('');
                txtWeighBridgeSupplierName.setValue('');




};

function save_click()
{
        if(txtWeighBridgeSupplierName.getRawValue()=="" )
	{
		alert("Select Supplier");
		cmbsupplier.focus();
	}

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
 
	else if(Number(txtLoadWeight.getValue()) == 0 && Number(txtEmptyWeight.getValue()) == 0  )
	{
		alert("Enter Load Wt / Empty Weight..");
		txtLoadWeight.focus();
	}

	else if(Number(cmbLoadWtType.getValue()) == 0 && Number(cmbEmptyWtType.getValue()) == 0  )
	{
		alert("Select First Wt / Second Weight..");
		cmbLoadWtType.focus();
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
	            	url: 'TrnRmWeighBridgeSave.php',
	       	        params:
			{
				compcode   : Gincompcode,
				finid	   : GinFinid,
				supplier   : txtWeighBridgeSupplierName.getRawValue(),
				ticketno   : cmbTicketNo.getRawValue(),
                                itemname   : txtItemName.getRawValue(),
				vehicleno  : txtvehicle.getRawValue(),
                                loadwt     : txtLoadWeight.getValue(),    
                                emptywt      : txtEmptyWeight.getValue(),   
                                netwt        : txtNetWeight.getValue(), 
                                first_sec_wt : first_sec_wt, 

                                loadwttype   : cmbLoadWtType.getValue(), 
                                emptywttype  : cmbEmptyWtType.getValue(), 
                                

			},
			callback: function (options, success, response)
                	{
                    	var obj = Ext.decode(response.responseText);
                    	if (obj['success'] === "true") 
			{
				Ext.MessageBox.alert("Weigh Bridge Entery Saved : " + obj['wtno']);
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
//				var ticketdate = "&ticketdate=" + encodeURIComponent(dtWeighSlipDate.getValue());
				var entryno = "&ticketno=" + encodeURIComponent(txtWbTicketNo.getValue());

                                var ticketdate = "&ticketdate=" + encodeURIComponent(Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"));	

				var param =(compcode+ticketdate+entryno);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepWeighBridge_Ticket.rptdesign&__format=pdf&' + param, '_blank'); 
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
				        task: "loadWighBridgeTicketNoList",
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
                    id   : 'save',
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
                title   : 'WEIGH BRIGHT SLIP MODIFICATIONS',
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
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 250,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtPassword]
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
  //                              	items: [txtSupplierName]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
  //                              	items: [cmbarea]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 400,
                                	y           : 160,
                                    	border      : false,
 //                               	items: [btnAddArea]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 400,
                                	y           : 195,
                                    	border      : false,
 //                               	items: [btnAddRefresh]
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
//                                	items: [cmbItemName]
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
                                	labelWidth  : 100,
                                	width       : 260,
                                	x           : 250,
                                	y           : 320,
                                    	border      : false,
                                	items: [cmbLoadWtType]
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
                                	labelWidth  : 100,
                                	width       : 260,
                                	x           : 250,
                                	y           : 360,
                                    	border      : false,
                                	items: [cmbEmptyWtType]
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




                            flxParty,



                ]

            },

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
            
        ],
    });
    
   
    var TrnWightcardWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'WEIGH BRIDGE ENTRY MODIFICATIONS',
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



RefreshData();


/*
			loadTicketNodatastore.removeAll();
			loadTicketNodatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadWeighBridgeTicketNoDetail",
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
