Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
//var gstGroup;
 var saveFlag = "Add";
 var fuitemcode =0;
 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'itmh_code', 'itmh_name', 'itmh_moisture_ARB', 'itmh_moisture_ADB', 'itmh_ash', 'itmh_volatile', 'itmh_fixedcarbon', 'itmh_fines', 'itmh_sand', 'itmh_iron', 'itmh_gcv_ADB', 'itmh_gcv_ARB', 'itmh_hsncode',
'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc'

      ]),
    });


 var loadpurchaseledgerdatastore = new Ext.data.Store({
      id: 'loadpurchaseledgerdatastore',
	autoLoad: true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpurledger"}, // this parameter asks for listing
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
	
var loaditemgrpDataStore = new Ext.data.Store({
      id: 'loaditemgrpDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemgrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmg_code', type: 'int',mapping:'itmg_code'},
	{name:'itmg_name', type: 'string',mapping:'itmg_name'}
      ]),
    });



	var txtitemname = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtitemname',
        name        : 'txtitemname',
        width       :  300,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2,
        store       : LoadItemDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtTotalMoisture.focus();

             }
         },

            keyup: function () {

                  flxFuelDetail.getStore().filter('itmh_name', txtitemname.getValue());  
            }
        }
    });
/*
	var txtitemname = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtitemname',
        name        : 'txtitemname',
        width       :  250,
        style       :  {textTransform: "uppercase"},
	//	disabled : true,
		
    });
*/

var cmbitemgroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 250,
        displayField    : 'itmg_name', 
        valueField      : 'itmg_code',
        hiddenName      : '',
        id              : 'cmbitemgroup',
        typeAhead       : true,
        mode            : 'remote',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loaditemgrpDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbTNpurledger = new Ext.form.ComboBox({
        fieldLabel      : 'Purchase Ledger Code',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbTNpurledger',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : loadpurchaseledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbOSpurledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Purchase Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbOSpurledger',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : loadpurchaseledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbImppurledger = new Ext.form.ComboBox({
        fieldLabel      : 'IMPORT Purchase Ledger',
        width           : 250,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbImppurledger',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loadpurchaseledgerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

var cmbitemtype = new Ext.form.ComboBox({
        fieldLabel      : 'Item Type',
        width           : 250,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : 'field1',
        id              : 'cmbitemtype',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : [[1,'1.INTRASTATE (TN)'],[2,'2.INTERSTATE (OTHER THAN TN)'],[3,'3.IMPORT']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
   });

 var txtTotalMoisture = new Ext.form.NumberField({
        fieldLabel  : 'Total Moisture(%)-ARB',
        id          : 'txtTotalMoisture',
        name        : 'txtTotalMoisture',
        width       :  80,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtInherentMoisture.focus();

             }
         }
       }
    });

 var txtInherentMoisture = new Ext.form.NumberField({
        fieldLabel  : 'Inherent Moisture(%)-ADB',
        id          : 'txtInherentMoisture',
        name        : 'txtInherentMoisture',
        width       :  80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtAsh.focus();

             }
         }
       }
    });


 
 var txtAsh = new Ext.form.NumberField({
        fieldLabel  : 'Ash (%)-ADB',
        id          : 'txtAsh',
        name        : 'txtAsh',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtVolatileMatter.focus();

             }
         }
       }
    });
 


 var txtVolatileMatter = new Ext.form.NumberField({
        fieldLabel  : 'Volatile Matter (%)-ADB',
        id          : 'txtVolatileMatter',
        name        : 'txtVolatileMatter',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtFixedCarbon.focus();

             }
         }
       }
    });
 
 var txtFixedCarbon = new Ext.form.NumberField({
        fieldLabel  : 'Fixed Carbon (%)-ARB',
        id          : 'txtFixedCarbon',
        name        : 'txtFixedCarbon',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtFines.focus();

             }
         }
       }
    });



 var txtFines = new Ext.form.NumberField({
        fieldLabel  : 'Fines (%)-ARB',
        id          : 'txtFines',
        name        : 'txtFines',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtSand.focus();

             }
         }
       }
    });

 var txtSand = new Ext.form.NumberField({
        fieldLabel  : 'Sand (%)-ARB',
        id          : 'txtSand',
        name        : 'txtSand',
        width       :  80,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtIron.focus();

             }
         }
       }
    });

 var txtIron = new Ext.form.NumberField({
        fieldLabel  : 'Iron (%)-ADB',
        id          : 'txtIron',
        name        : 'txtIron',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtGCVADB.focus();

             }
         }
       }
    });

 var txtGCVADB = new Ext.form.NumberField({
        fieldLabel  : 'GCV(Kcal/KG) (%)-ADB',
        id          : 'txtGCVADB',
        name        : 'txtGCVADB',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtGCVARB.focus();

             }
         }
       }
    });

 var txtGCVARB = new Ext.form.NumberField({
        fieldLabel  : 'GCV(Kcal/KG) (%)-ARB',
        id          : 'txtGCVARB',
        name        : 'txtGCVARB',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txthsncode.focus();

             }
         }
       }
    });

 var txthsncode = new Ext.form.NumberField({
        fieldLabel  : 'HSN Code',
        id          : 'txthsncode',
        name        : 'txthsncode',
        width       :  150,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });



var cmbQualityChk_TM = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_TM',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'Y',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbQualityChk_IM = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_IM',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


var cmbQualityChk_Ash = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_Ash',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbQualityChk_VM = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_VM',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbQualityChk_FC = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_FC',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });

var cmbQualityChk_FI = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_FI',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });

var cmbQualityChk_SA = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_SA',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


var cmbQualityChk_IR = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_IR',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });

var cmbQualityChk_GCV_ADB = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_GCV_ADB',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        value           :'N',
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


var cmbQualityChk_GCV_ARB = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk_GCV_ARB',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        value           :'N',
        allowblank      : true,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });

  /* function RefreshData(){
       txthsncode.setValue("");
txtFixedCarbon.setValue("");
txtVolatileMatter.setValue("");
txtAsh.setValue("");
txtFines.setValue("");
txtInherentMoisture.setValue("");
txtTotalMoisture.setValue("");
txtitemname.setValue("");

cmbitemtype.setValue("");
cmbTNpurledger.setValue("");
cmbitemgroup.setValue("");

};*/
var dgrecord = Ext.data.Record.create([]);

var flxFuelDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 470,
    hidden:false,
    width: 700,
//    font-size:18px,
    columns:
    [

            {header: "code"        , Id: 'itmh_code', sortable:true,width:10,align:'left', menuDisabled: true,hidden : true },       
            {header: "Item Name"   , Id: 'itmh_name', sortable:true,width:250,align:'left', menuDisabled: true},
            {header: "Mois -ARB % "  , Id: 'itmh_moisture_ARB', sortable:true,width:70,align:'left', menuDisabled: true}, 
            {header: "Mois -ADB % "  , Id: 'itmh_moisture_ADB', sortable:true,width:70,align:'left', menuDisabled: true},                  
            {header: "ASH %"   , Id: 'itmh_ash', sortable:true,width:70,align:'left', menuDisabled: true},                  
            {header: "Volatile" , Id: 'itmh_volatile', sortable:true,width:70,align:'left', menuDisabled: true},
            {header: "Fix.Carbon"         , Id: 'itmh_fixedcarbon', sortable:true,width:70,align:'left', menuDisabled: true},
            {header: "Fines", Id: 'itmh_fines', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "Sand"         , Id: 'itmh_sand', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "Iron"   , Id: 'itmh_iron', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "GCV -% ADB"   , Id: 'itmh_gcv_ADB', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "GCV -% ARB"  , Id: 'itmh_gcv_ARB', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "HSN CODE"  , Id: 'itmh_hsncode', sortable:true,width:100,align:'left', menuDisabled: true},  

            {header: "Mois -ARB % "  , Id: 'itmh_moisture_ARB_qc', sortable:true,width:70,align:'left', menuDisabled: true}, 
            {header: "Mois -ADB % "  , Id: 'itmh_moisture_ADB_qc', sortable:true,width:70,align:'left', menuDisabled: true},                  
            {header: "ASH %"   , Id: 'itmh_ash_qc', sortable:true,width:70,align:'left', menuDisabled: true},                  
            {header: "Volatile" , Id: 'itmh_volatile_qc', sortable:true,width:70,align:'left', menuDisabled: true},
            {header: "Fix.Carbon"   , Id: 'itmh_fixedcarbon_qc', sortable:true,width:70,align:'left', menuDisabled: true},
            {header: "Fines", Id: 'itmh_fines_qc', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "Sand"         , Id: 'itmh_sand_qc', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "Iron"   , Id: 'itmh_iron_qc', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "GCV -% ADB"   , Id: 'itmh_gcv_ADB_qc', sortable:true,width:70,align:'left', menuDisabled: true},  
            {header: "GCV -% ARB"  , Id: 'itmh_gcv_ARB_qc', sortable:true,width:70,align:'left', menuDisabled: true},  


    ],
	viewConfig: {
	getRowClass: function(record) {
	    var red = record.get('itmh_name') // shows if a CPE is dead or not (HS = Dead)
	    if (red == txtitemname.getValue()) {
	    return 'itmh_name'
	    }
         }
	},


    store:LoadItemDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxFuelDetail.getSelectionModel();
			var selrow = sm.getSelected();

         		gridedit = "true";
			editrow = selrow;
	

                        saveFlag = "Edit";
	                fuitemcode = selrow.get('itmh_code')
			txtitemname.setValue(selrow.get('itmh_name'));
			txtTotalMoisture.setValue(selrow.get('itmh_moisture_ARB'));
			txtInherentMoisture.setValue(selrow.get('itmh_moisture_ADB')); 
            		txtAsh.setValue(selrow.get('itmh_ash')); 
              		txtVolatileMatter.setValue(selrow.get('itmh_volatile'));
           		txtFixedCarbon.setValue(selrow.get('itmh_fixedcarbon'));
             		txtFines.setValue(selrow.get('itmh_fines'));
              		txtSand.setValue(selrow.get('itmh_sand'));
           		txtIron.setValue(selrow.get('itmh_iron'));
             		txtFines.setValue(selrow.get('itmh_fines'));
			txtGCVADB.setValue(selrow.get('itmh_gcv_ADB'));
			txtGCVARB.setValue(selrow.get('itmh_gcv_ARB'));	
			txthsncode.setValue(selrow.get('itmh_hsncode'));
                        cmbQualityChk_TM.setValue(selrow.get('itmh_moisture_ARB_qc'));
                        cmbQualityChk_IM.setValue(selrow.get('itmh_moisture_ADB_qc'));
                        cmbQualityChk_Ash.setValue(selrow.get('itmh_ash_qc'));
                        cmbQualityChk_VM.setValue(selrow.get('itmh_volatile_qc'));
                        cmbQualityChk_FC.setValue(selrow.get('itmh_fixedcarbon_qc'));
                        cmbQualityChk_FI.setValue(selrow.get('itmh_fines_qc'));
                        cmbQualityChk_SA.setValue(selrow.get('itmh_sand_qc'));
                        cmbQualityChk_IR.setValue(selrow.get('itmh_iron_qc'));
                        cmbQualityChk_GCV_ADB.setValue(selrow.get('itmh_gcv_ADB_qc'));
                        cmbQualityChk_GCV_ARB.setValue(selrow.get('itmh_gcv_ARB_qc'));
    }

   }
});

function RefreshData(){
	saveFlag = "Add";
	txthsncode.setValue("");
	fuitemcode = 0;
	txtFixedCarbon.setValue("");
	txtVolatileMatter.setValue("");
	txtAsh.setValue("");
	txtFines.setValue("");
	txtInherentMoisture.setValue("");
	txtTotalMoisture.setValue("");
	txtitemname.setValue("");

	cmbitemtype.setValue("");
	cmbTNpurledger.setValue("");
	cmbitemgroup.setValue("");
	LoadItemDatastore.removeAll();
	LoadItemDatastore.load({
        	 url:'ClsFuItem.php',
        	 params:
       		 {
         	 task:"loadItemList"
        	 }
		 });


};


   var MasRawItemformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'FUEL ITEM MASTER',
        header      : false,
        width       : 1400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasRawItemformpanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
	
				if(txtitemname.getRawValue()=="" || txtitemname.getValue()==0)
				{
					alert("Enter ItemName");
					txtitemname.setFocus();
				}
				/*else if(txtTotalMoisture.getValue()=="" || txtTotalMoisture.getValue()==0)
				{
					alert("Enter Moisture%");
					txtTotalMoisture.setFocus();
				}
				else if(txtInherentMoisture.getRawValue()=="")
				{
					alert("Enter Tare%");
					txtInherentMoisture.setFocus();
				}
				else if(txtFines.getRawValue()=="")
				{
					alert("Enter Conversion Loss%");
					txtFines.setFocus();
				}
				else if(txtAsh.getRawValue()=="" || txtAsh.getValue()==0)
				{
					alert("Enter Specification");
					txtAsh.setFocus();
				}
				else if(cmbitemtype.getRawValue()=="" || cmbitemtype.getValue()==0)
				{
					alert("Select Itemtype..");
					cmbitemtype.setFocus();
				}
				else if(cmbTNpurledger.getRawValue()=="" || cmbTNpurledger.getValue()==0)
				{
					alert("Select Purchase Ledger..");
					cmbTNpurledger.setFocus();
				}
				else if(cmbOSpurledger.getRawValue()=="" || cmbOSpurledger.getValue()==0)
				{
					alert("Select CST Purchase Ledger..");
					cmbOSpurledger.setFocus();
				}
				else if(cmbImppurledger.getRawValue()=="" || cmbImppurledger.getValue()==0)
				{
					alert("Select Import Purchase Ledger..");
					cmbImppurledger.setFocus();
				}

				else if(txtVolatileMatter.getRawValue()=="" )
				{
					alert("Enter OutThrough%");
					txtVolatileMatter.setFocus();
				}
				else if(txtFixedCarbon.getRawValue()=="")
				{
					alert("Enter Prohibitive%");
					txtFixedCarbon.setFocus();
				}
				else if(txthsncode.getValue()=="")
				{
					alert("Enter HSNCode");
					txthsncode.setFocus();
				}*/
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
		                            	url: 'MasFuItemSave.php',
                		       	        params:
						{
                                                savetype   : saveFlag,
                                                itemseq    : fuitemcode,  
						itemname   : txtitemname.getRawValue(),
						moisARB    : txtTotalMoisture.getValue(),
						moisADB    : txtInherentMoisture.getValue(),
						ash        : txtAsh.getRawValue(),
						volatile   : txtVolatileMatter.getValue(),
						fixedcarbon: txtFixedCarbon.getValue(),
					        fines      : txtFines.getValue(),
						sand       : txtSand.getValue(),
					        iron       : txtIron.getValue(),
						gcvADB     : txtGCVADB.getValue(),
					        gcvARB     : txtGCVARB.getValue(),
						hsncode    : txthsncode.getValue(),
                                         	qcchk_TM   : cmbQualityChk_TM.getValue(),
                                         	qcchk_IM   : cmbQualityChk_IM.getValue(),
                                         	qcchk_Ash  : cmbQualityChk_Ash.getValue(),
                                         	qcchk_VM   : cmbQualityChk_VM.getValue(),
                                         	qcchk_FC   : cmbQualityChk_FC.getValue(),
                                         	qcchk_FI   : cmbQualityChk_FI.getValue(),
                                         	qcchk_SA   : cmbQualityChk_SA.getValue(),
                                         	qcchk_IR   : cmbQualityChk_IR.getValue(),
                                         	qcchk_GCV_ADB : cmbQualityChk_GCV_ADB.getValue(),
                                         	qcchk_GCV_ARB : cmbQualityChk_GCV_ARB.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                              //      msg: 'Item Name Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{*/
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasRawItemformpanel.getForm().reset();
							RefreshData();
							/*}
							}
                                                	});*/
                                                }
                                             	else 
						{
                                              /*  Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Failed Contact MIS',
                                                    fn: function (btn) 
							{
                                                        if (btn === 'ok') 
							{*/
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                       /* }
                                                    	}
                                                	});*/
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
                            MasRawItemWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 500,
                width   : 580,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtitemname]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 350,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtTotalMoisture]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbQualityChk_TM]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 450,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtInherentMoisture]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 70,
                                    	border      : false,
                                	items: [cmbQualityChk_IM]
                            },
                    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 600,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtAsh]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 100,
                                    	border      : false,
                                	items: [cmbQualityChk_Ash]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 450,
                                	x           : 0,
                                	y           : 130,
                                    	border      : false,
                                	items: [txtVolatileMatter]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 130,
                                    	border      : false,
                                	items: [cmbQualityChk_VM]
                            },

                          { 
                                 	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 400,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtFixedCarbon]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbQualityChk_FC]
                            },

			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtFines]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 190,
                                    	border      : false,
                                	items: [cmbQualityChk_FI]
                            },


			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 220,
                                    	border      : false,
                                	items: [txtSand]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 220,
                                    	border      : false,
                                	items: [cmbQualityChk_SA]
                            },


			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 250,
                                    	border      : false,
                                	items: [txtIron]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 250,
                                    	border      : false,
                                	items: [cmbQualityChk_IR]
                            },


			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtGCVADB]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 280,
                                    	border      : false,
                                	items: [cmbQualityChk_GCV_ADB]
                            },


			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 500,
                                	x           : 0,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtGCVARB]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 300,
                                	y           : 310,
                                    	border      : false,
                                	items: [cmbQualityChk_GCV_ARB]
                            },


/*
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 160,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbitemtype]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 160,
                                	width       : 450,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbTNpurledger]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 160,
                                	width       : 450,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmbOSpurledger]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 160,
                                	width       : 450,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [cmbImppurledger]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 320,
                                    	border      : false,
                                	//items: [cmbitemgroup]
                            },
*/

			
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 400,
                                	x           : 0,
                                	y           : 340,
                                    	border      : false,
                                	items: [txthsncode]
                            }
                ]

            },
              { xtype   : 'fieldset',
                title   : ' ',
                layout  : 'hbox',
                border  : true,
                height  : 500,
                width   : 720,
		style:{ border:'1px solid red',color:' #581845 '},
               layout  : 'absolute',
                x       : 600,
                y       : 10,
                items:[flxFuelDetail]
            }   
        ],
    });
    
   
    var MasRawItemWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'FUEL ITEM MASTER',
        items       : MasRawItemformpanel,
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
			txtitemname.focus();
			//txtitemname.setfocus();
			loadpurchaseledgerdatastore.removeAll();
			loadpurchaseledgerdatastore.load({
                        	 url:'ClsFuItem.php',
                        	 params:
                       		 {
                         	 task:"loadpurledger"
                        	 }
				 });

			loaditemgrpDataStore.removeAll();
			loaditemgrpDataStore.load({
                        	 url:'ClsFuItem.php',
                        	 params:
                       		 {
                         	 task:"loaditemgrp"
                        	 }
				 });
			
	   		
			 }
		}
    });
    MasRawItemWindow.show();  
});
