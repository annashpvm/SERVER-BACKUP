Ext.onReady(function(){
Ext.QuickTips.init();
   var yearfin  = localStorage.getItem('gstyear'); 
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var pino = "";
   var Datafrm = "DPM";

 var loadconsigneestore = new Ext.data.Store({
      id: 'loadconsigneestore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnExportInv.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadconsignee"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','cust_code'
      ]),
    });


 var loadvarietystore = new Ext.data.Store({
      id: 'loadvarietystore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnExportInv.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_grpname', 'var_grpcode'
      ]),
    });
    
 var loadarea1store = new Ext.data.Store({
      id: 'loadarea1store',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnExportInv.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea1"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pckh_are1no'
      ]),
    });    
 var loadpinostore = new Ext.data.Store({
      id: 'loadpinostore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnExportInv.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpino"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ei_our_ref'
      ]),
    });     

var txtInvNo = new Ext.form.NumberField({
	fieldLabel  : 'Invoice No.',
	id          : 'txtInvNo',
	name        : 'txtInvNo',
	width       :  100,
});

var dptInv= new Ext.form.DateField({
	fieldLabel: 'Invoice Date',
	id: 'dptInv',
	name: 'Date',
	format: 'd-m-Y',
	value: new Date()
});

var cmbConsName = new Ext.form.ComboBox({
        fieldLabel      : 'Consignee Name',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbConsName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadconsigneestore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners : {
        select : function () {
        		loadarea1store.removeAll();
			loadarea1store.load({
				url:'ClsTrnExportInv.php',
				params:
				{
				task:"loadarea1",
				compcode : Gincompcode,
				finid : GinFinid,
				consignee : cmbConsName.getRawValue(),
				dataf : Datafrm,
				},
			callback:function(){

			}
			});
			loadpinostore.removeAll();
			loadpinostore.load({
                        	 url:'ClsTrnExportInv.php',
                        	 params:
                        	 {
                         	 task:"loadpino",
                         	 finid : GinFinid,
                         	 compcode : Gincompcode,
                         	 consignee : cmbConsName.getValue(),
                        	 },
				callback:function()
	               		{
				
				}
			  });			
        }
        }
});

var txtByrOtr1 = new Ext.form.TextField({
	fieldLabel  : 'Buyer (If other than Consignee)',
	id          : 'txtByrOtr1',
	name        : 'txtByrOtr1',
	width       :  300,
	tabindex : 2
});

var txtByrOtr2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtByrOtr2',
	name        : 'txtByrOtr2',
	width       :  300,
	tabindex : 2
});

var txtByrOtr3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtByrOtr3',
	name        : 'txtByrOtr3',
	width       :  300,
	tabindex : 2
});

var txtByrOtr4 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtByrOtr4',
	name        : 'txtByrOtr4',
	width       :  300,
	tabindex : 2
});

var cmbProfoInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Proformat Inv. No',
        width           : 300,
        displayField    : 'ei_our_ref', 
        valueField      : 'ei_our_ref',
        hiddenName      : '',
        id              : 'cmbProfoInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadpinostore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbChpHd = new Ext.form.ComboBox({
        fieldLabel      : 'Chapter Heading',
        width           : 300,
        displayField    : 'ChrHd_name', 
        valueField      : 'ChrHd_code',
        hiddenName      : '',
        id              : 'cmbChpHd',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true
});

var cmbARENo = new Ext.form.ComboBox({
        fieldLabel      : 'A.R.E.1 No',
        width           : 300,
        displayField    : 'pckh_are1no', 
        valueField      : 'pckh_are1no',
        hiddenName      : '',
        id              : 'cmbARENo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadarea1store,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true
});

var Datafrmopt = new Ext.form.FieldSet({
	xtype: 'fieldset',
	title: 'Data From',
	fieldLabel: '',
	layout : 'hbox',
	width:95,
	height:120,
	x:850,
	y:10,
	border: true,
	items: [
		{
			xtype: 'radiogroup',
			columns: 1,
			rows : 4,
			id: 'Datafrmopt',
			items: [
			{boxLabel: 'DPM', name: 'Datafrmopt', id:'DatafrmoptD', inputValue: 1,checked:true,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							Datafrm="DPM";
							

						}
					}
				}
			},
			{boxLabel: 'SLPB', name: 'Datafrmopt', id:'DatafrmoptS', inputValue: 2,
				isteners:{
					check:function(rb,checked){
						if(checked==true){
							Datafrm="SLPB";
							
						}
					}
				}
			},
			{boxLabel: 'VJPM', name: 'Datafrmopt', id:'DatafrmoptV', inputValue: 3,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							Datafrm="VJPM";
						}
					}
				}
			},
			{boxLabel: 'SELF', name: 'Datafrmopt', id:'DatafrmoptSF', inputValue: 4,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							Datafrm="SELF";
						}
					}
				}
			},
			]
		}
	]
});

var RBopt = new Ext.form.FieldSet({
	xtype: 'fieldset',
	title: '',
	fieldLabel: '',
	layout : 'hbox',
	width:150,
	height:40,
	x:410,
	y:75,
	border: false,
	items: [
		{
			xtype: 'radiogroup',
			columns: 2,
			rows : 1,
			id: 'RBopt',
			items: [
			{boxLabel: 'Reel', name: 'RBopt', id:'RBoptR', inputValue: 1,checked:true,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							RB="R";

						}
					}
				}
			},
			{boxLabel: 'Bundle', name: 'RBopt', id:'RBoptB', inputValue: 2,
				isteners:{
					check:function(rb,checked){
						if(checked==true){
							RB="B";
						}
					}
				}
			},
			]
		}
	]
});

var txtByrOrdNo = new Ext.form.NumberField({
	fieldLabel  : 'Buyer Order No.',
	id          : 'txtByrOrdNo',
	name        : 'txtByrOrdNo',
	width       :  300,
});

var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 300,
        displayField    : 'var_grpname', 
        valueField      : 'var_grpcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadvarietystore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true
});

var cmbT2Variety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 300,
        displayField    : 'var_grpname', 
        valueField      : 'var_grpcode',
        hiddenName      : '',
        id              : 'cmbT2Variety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadvarietystore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 130,
        displayField    : 'size_name', 
        valueField      : 'size_code',
        hiddenName      : '',
        id              : 'cmbSize',
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

var cmbReemB = new Ext.form.ComboBox({
        fieldLabel      : 'Reem / Bundle',
        width           : 300,
        displayField    : 'reemb_name', 
        valueField      : 'reemb_code',
        hiddenName      : '',
        id              : 'cmbReemB',
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

var txtStBNo = new Ext.form.NumberField({
	fieldLabel  : 'Start Bundle No',
	id          : 'txtStBNo',
	name        : 'txtStBNo',
	width       :  70,
	
	tabindex : 2
});

var txtEdBNo = new Ext.form.NumberField({
	fieldLabel  : 'End Bundle No',
	id          : 'txtEdBNo',
	name        : 'txtEdBNo',
	width       :  70,
	
	tabindex : 2
});

var txtNOB = new Ext.form.NumberField({
	fieldLabel  : 'No of Bundles',
	id          : 'txtNOB',
	name        : 'txtNOB',
	width       :  70,
	
	tabindex : 2
});

var txtTotB = new Ext.form.NumberField({
	fieldLabel  : 'Total Bundle',
	id          : 'txtTotB',
	name        : 'txtTotB',
	width       :  100,
	
	tabindex : 2
});

var txtTotNtWt = new Ext.form.NumberField({
	fieldLabel  : 'Total Net WT',
	id          : 'txtTotNtWt',
	name        : 'txtTotNtWt',
	width       :  100,
	
	tabindex : 2
});

var txtTotGrWt = new Ext.form.NumberField({
	fieldLabel  : 'Total Gross WT',
	id          : 'txtTotGrWt',
	name        : 'txtTotGrWt',
	width       :  100,
	
	tabindex : 2
});

var txtSzPrint = new Ext.form.TextField({
	fieldLabel  : 'Size to be printed',
	id          : 'txtSzPrint',
	name        : 'txtSzPrint',
	width       :  250,
	tabindex : 2
});

var txtNOR = new Ext.form.NumberField({
	fieldLabel  : 'No of Reels',
	id          : 'txtNOR',
	name        : 'txtNOR',
	width       :  70,
	
	tabindex : 2
});

var txtT2TotNtWt = new Ext.form.NumberField({
	fieldLabel  : 'Total Net WT',
	id          : 'txtT2TotNtWt',
	name        : 'txtT2TotNtWt',
	width       :  100,
	
	tabindex : 2
});

var txtT2TotGrWt = new Ext.form.NumberField({
	fieldLabel  : 'Total Gross WT',
	id          : 'txtT2TotGrWt',
	name        : 'txtT2TotGrWt',
	width       :  100,
	
	tabindex : 2
});
var btnADD = new Ext.Button({
	style   : 'text-align:center;',
	text    : "ADD",
	width   : 50,
	height  : 20
	,
	x       : 920,
	y       : 34,
	bodyStyle:{"background-color":"#ebebdf"},
	listeners:{
		click: function(){}
	}
});

var Tab1ExInvgriddetail = new Ext.grid.EditorGridPanel({
	frame: false,
	store: '',
	sm: new Ext.grid.RowSelectionModel(),
	//autoShow: true,
	stripeRows: true,
	scrollable: true,
	height: 130,
	width: 500,
	hidden:false,
	x: 10,
	y: 100,
	columns: [
	    {header: "Sl No", dataIndex: 'slno', sortable: true,  align: 'left'},
	    {header: "test", dataIndex: 'month', sortable: true,  align: 'left'},
	]
});

var Tab2ExInvgriddetail = new Ext.grid.EditorGridPanel({
	frame: false,
	store: '',
	sm: new Ext.grid.RowSelectionModel(),
	autoShow: true,
	stripeRows: true,
	scrollable: true,
	height: 50,
	width: 500,
	x: 10,
	y: 100,
	columns: [
	    {header: "Size Code", dataIndex: 'slno', sortable: true,  align: 'left'},
	    {header: "RG1. Size", dataIndex: 'month', sortable: true,  align: 'left'}
	]
});
var Tab3ExInvgriddetail = new Ext.grid.EditorGridPanel({
	frame: false,
	store: '',
	sm: new Ext.grid.RowSelectionModel(),
	autoShow: true,
	stripeRows: true,
	scrollable: true,
	height: 150,
	width: 500,
	x: 10,
	y: 100,
	columns: [
	    {header: "CONTAINER NO", dataIndex: 'contrno', sortable: true,  align: 'left'},
	    {header: "Seal NO", dataIndex: 'month', sortable: true,  align: 'left'}
	]
});

var btnT3ADD = new Ext.Button({
	style   : 'text-align:center;',
	text    : "ADD",
	width   : 50,
	height  : 20,
	x       : 650,
	y       : 65,
	bodyStyle:{"background-color":"#ebebdf"},
	listeners:{
		click: function(){}
	}
});

var txtContrNo = new Ext.form.TextField({
	fieldLabel  : 'Container Number',
	id          : 'txtContrNo',
	name        : 'txtContrNo',
	width       :  250,
	tabindex : 2
});

var txtContrSealNo = new Ext.form.TextField({
	fieldLabel  : 'Container Seal No',
	id          : 'txtContrSealNo',
	name        : 'txtContrSealNo',
	width       :  250,
	
	tabindex : 2
});

var txtNORB = new Ext.form.TextField({
	fieldLabel  : 'No of Bundles / Reels',
	id          : 'txtNORB',
	name        : 'txtNORB',
	width       :  100,
	tabindex : 2
});

var txtExcSealNo = new Ext.form.TextField({
	fieldLabel  : 'Excies Seal No',
	id          : 'txtExcSealNo',
	name        : 'txtExcSealNo',
	width       :  150,
	
	tabindex : 2
});

var cmbConttype = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 150,
        displayField    : 't3conttype_name', 
        valueField      : 't3conttype_code',
        hiddenName      : '',
        id              : 'cmbConttype',
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

var cmbPOLoad = new Ext.form.ComboBox({
        fieldLabel      : 'Port of Loading',
        width           : 200,
        displayField    : 'poload_name', 
        valueField      : 'poload_code',
        hiddenName      : '',
        id              : 'cmbPOLoad',
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

var cmbPODischarge = new Ext.form.ComboBox({
        fieldLabel      : 'Port of Discharge',
        width           : 200,
        displayField    : 'podischarge_name', 
        valueField      : 'podischarge_code',
        hiddenName      : '',
        id              : 'cmbPODischarge',
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

var cmbFinalDest = new Ext.form.ComboBox({
        fieldLabel      : 'Final Destination',
        width           : 200,
        displayField    : 'finaldest_name', 
        valueField      : 'finaldest_code',
        hiddenName      : '',
        id              : 'cmbFinalDest',
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

var cmbEPCG = new Ext.form.ComboBox({
        fieldLabel      : 'EPCG',
        width           : 200,
        displayField    : 'cepcg_name', 
        valueField      : 'cepcg_code',
        hiddenName      : '',
        id              : 'cmbEPCG',
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

var EPCG = 'N';
var chkEPCG = new Ext.form.Checkbox({
	name: 'EPCG',
	boxLabel: '',
	id: 'chkEPCG',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    EPCG = 'Y';
		}else{
		    EPCG = 'N';
		}
	    }
	}
});

var DEPB = 'N';
var chkDEPB = new Ext.form.Checkbox({
	name: 'EPCG',
	boxLabel: 'DEPB',
	id: 'chkDEPB',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    DEPB = 'Y';
		}else{
		    DEPB = 'N';
		}
	    }
	}
});

var FMARKT = 'N';
var chkFMARKT = new Ext.form.Checkbox({
	name: 'FMARKT',
	boxLabel: 'FOCUS MARKET',
	id: 'chkFMARKT',
	checked: false,
	width: 150,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    FMARKT = 'Y';
		}else{
		    FMARKT = 'N';
		}
	    }
	}
});

var txtDEPB = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtDEPB',
	name        : 'txtDEPB',
	width       :  300,
	tabindex : 2
});

var txtDEPBP = new Ext.form.TextField({
	fieldLabel  : 'DEPB %',
	id          : 'txtDEPBP',
	name        : 'txtDEPBP',
	width       :  100,
	tabindex : 2
});

var txtFMart = new Ext.form.TextField({
	fieldLabel  : '%',
	id          : 'txtFMart',
	name        : 'txtFMart',
	width       :  100,
	tabindex : 2
});

var txtFMSCCode = new Ext.form.TextField({
	fieldLabel  : 'FMS Country Code',
	id          : 'txtFMSCCode',
	name        : 'txtFMSCCode',
	width       :  100,
	tabindex : 2
});

var txtMEISP = new Ext.form.TextField({
	fieldLabel  : 'MEIS %',
	id          : 'txtMEISP',
	name        : 'txtMEISP',
	width       :  100,
	tabindex : 2
});

var txtMEISCode = new Ext.form.TextField({
	fieldLabel  : 'MEIS Country Code',
	id          : 'txtMEISCode',
	name        : 'txtMEISCode',
	width       :  100,
	tabindex : 2
});

var txtINRUSD = new Ext.form.TextField({
	fieldLabel  : 'INR / USD',
	id          : 'txtINRUSD',
	name        : 'txtINRUSD',
	width       :  100,
	tabindex : 2
});

var txtExpUCR = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtExpUCR',
	name        : 'txtExpUCR',
	width       :  150,
	tabindex : 2
});


var txtOceFC = new Ext.form.TextField({
	fieldLabel  : 'Ocean Freight/Cont',
	id          : 'txtOceFC',
	name        : 'txtOceFC',
	width       :  100,
	tabindex : 2
});

var txtInsr = new Ext.form.TextField({
	fieldLabel  : 'Insurance',
	id          : 'txtInsr',
	name        : 'txtInsr',
	width       :  100,
	tabindex : 2
});

var txtDisct = new Ext.form.TextField({
	fieldLabel  : 'Discount $',
	id          : 'txtDisct',
	name        : 'txtDisct',
	width       :  100,
	tabindex : 2
});

var txtValD = new Ext.form.NumberField({
	fieldLabel  : 'VALUE IN USD',
	id          : 'txtValD',
	name        : 'txtValD',
	width       :  150,
	tabindex : 2
});

var txtFValR = new Ext.form.NumberField({
	fieldLabel  : 'FOB VALUE (INR)',
	id          : 'txtFValR',
	name        : 'txtFValR',
	width       :  150,
	tabindex : 2
});

var txtFValD = new Ext.form.NumberField({
	fieldLabel  : 'FOB VALUE (USD)',
	id          : 'txtFValD',
	name        : 'txtFValD',
	width       :  150,
	tabindex : 2
});

var txtFRDKg = new Ext.form.NumberField({
	fieldLabel  : 'FRD($) / Kgs',
	id          : 'txtFRDKg',
	name        : 'txtFRDKg',
	width       :  150,
	tabindex : 2
});

var txtTotValD = new Ext.form.NumberField({
	fieldLabel  : 'TOTAL VALUE IN USD',
	id          : 'txtTotValD',
	name        : 'txtTotValD',
	width       :  150,
	tabindex : 2
});

var T3ExpUCopt = new Ext.form.FieldSet({
	xtype: 'fieldset',
	title: '',
	fieldLabel: '',
	layout : 'hbox',
	width:150,
	height:70,
	x:-5,
	y:-5,
	border: false,
	items: [
		{
			xtype: 'radiogroup',
			columns: 1,
			rows : 2,
			id: 'T3ExpUCopt',
			items: [
			{boxLabel: 'LUT Bond', name: 'T3ExpUCopt', id:'T3ExpUCoptL', inputValue: 1,checked:true,
				listeners:{
					check:function(rb,checked){
						if(checked==true){
							T3opt="L";

						}
					}
				}
			},
			{boxLabel: 'GST PAID-YES', name: 'T3ExpUCopt', id:'T3ExpUCoptG', inputValue: 2,
				isteners:{
					check:function(rb,checked){
						if(checked==true){
							T3opt="G";
						}
					}
				}
			},
			]
		}
	]
});

var txtPckDetail1 = new Ext.form.TextField({
	fieldLabel  : 'PACKING DETAILS',
	id          : 'txtPckDetail1',
	name        : 'txtPckDetail1',
	width       :  300,
	tabindex : 2
});

var txtPckDetail2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtPckDetail2',
	name        : 'txtPckDetail2',
	width       :  300,
	tabindex : 2
});

var txtPckDetail3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtPckDetail3',
	name        : 'txtPckDetail3',
	width       :  300,
	tabindex : 2
});

var txtPckDetail4 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtPckDetail4',
	name        : 'txtPckDetail4',
	width       :  300,
	tabindex : 2
});

var txtAssVal = new Ext.form.TextField({
	fieldLabel  : 'ASS. VALUE',
	id          : 'txtAssVal',
	name        : 'txtAssVal',
	width       :  300,
	tabindex : 2
});

var txtInsptPckNo = new Ext.form.TextField({
	fieldLabel  : 'INSPECTED PACKAGE Nos.',
	id          : 'txtInsptPckNo',
	name        : 'txtInsptPckNo',
	width       :  450,
	tabindex : 2
});


var lblGSTP = new Ext.form.Label({
	fieldLabel: 'GST Percentage',
	id: 'lblGSTP',
	labelSeparator: '',
	name: 'lblGSTP',
	width: 150
});

var lblAmt = new Ext.form.Label({
	fieldLabel: 'Amount',
	id: 'lblAmt',
	labelSeparator: '',
	name: 'lblAmt',
	width: 150
});

var txtIGSTP = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtIGSTP',
	name        : 'txtIGSTP',
	width       :  70,
	tabindex : 2
});

var txtIGSTAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtIGSTAmt',
	name        : 'txtIGSTAmt',
	width       :  70,
	tabindex : 2
});

var txtCessP = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtCessP',
	name        : 'txtCessP',
	width       :  70,
	tabindex : 2
});

var txtCessAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtCessAmt',
	name        : 'txtCessAmt',
	width       :  70,
	tabindex : 2
});

var txtEduCessP = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtEduCessP',
	name        : 'txtEduCessP',
	width       :  70,
	tabindex : 2
});

var txtEduCessAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtEduCessAmt',
	name        : 'txtEduCessAmt',
	width       :  70,
	tabindex : 2
});

var txtSHECessP = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtSHECessP',
	name        : 'txtSHECessP',
	width       :  70,
	tabindex : 2
});

var txtSHECessAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtSHECessAmt',
	name        : 'txtSHECessAmt',
	width       :  70,
	tabindex : 2
});

var txtVesselName = new Ext.form.TextField({
	fieldLabel  : 'Vessel Name',
	id          : 'txtVesselName',
	name        : 'txtVesselName',
	width       :  300,
	tabindex : 2
});

var txtShpBillNo = new Ext.form.TextField({
	fieldLabel  : 'Shipping Bill No. & Date',
	id          : 'txtShpBillNo',
	name        : 'txtShpBillNo',
	width       :  175,
	tabindex : 2
});

var txtBillLadNo = new Ext.form.TextField({
	fieldLabel  : 'Bill of Lading No. & Date',
	id          : 'txtBillLadNo',
	name        : 'txtBillLadNo',
	width       :  175,
	tabindex : 2
});

var txtShpTerms = new Ext.form.TextField({
	fieldLabel  : 'Shipping Terms',
	id          : 'txtShpTerms',
	name        : 'txtShpTerms',
	width       :  300,
	tabindex : 2
});

var txtPaymtTerms1 = new Ext.form.TextField({
	fieldLabel  : 'Payment Terms',
	id          : 'txtPaymtTerms1',
	name        : 'txtPaymtTerms1',
	width       :  300,
	tabindex : 2
});

var txtPaymtTerms2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtPaymtTerms2',
	name        : 'txtPaymtTerms2',
	width       :  300,
	tabindex : 2
});

var txtShpMarks1 = new Ext.form.TextField({
	fieldLabel  : 'Shipping Marks',
	id          : 'txtShpMarks1',
	name        : 'txtShpMarks1',
	width       :  300,
	tabindex : 2
});

var txtShpMarks2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtShpMarks2',
	name        : 'txtShpMarks2',
	width       :  300,
	tabindex : 2
});

var txtShpMarks3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtShpMarks3',
	name        : 'txtShpMarks3',
	width       :  300,
	tabindex : 2
});

var dptShpBill= new Ext.form.DateField({
	fieldLabel: '',
	id: 'dptShpBill',
	name: 'Date',
	format: 'd-m-Y',
	value: new Date()
});

var dptBillLad= new Ext.form.DateField({
	fieldLabel: '',
	id: 'dptBillLad',
	name: 'Date',
	format: 'd-m-Y',
	value: new Date()
});

var cmbCHAgnt = new Ext.form.ComboBox({
        fieldLabel      : 'CH-Agent',
        width           : 300,
        displayField    : 'chagnt_name', 
        valueField      : 'chagnt_code',
        hiddenName      : '',
        id              : 'cmbCHAgnt',
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

var cmbLiner = new Ext.form.ComboBox({
        fieldLabel      : 'Liner',
        width           : 300,
        displayField    : 'liner_name', 
        valueField      : 'liner_code',
        hiddenName      : '',
        id              : 'cmbLiner',
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
	




var tabExInv = new Ext.TabPanel({
	id          : 'Export Invoice',
	xtype       : 'tabpanel',
	bodyStyle   :{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 560,
	width       : 1000,	
	x           : 0,
	y           : 0,
	items       : [
		{
			xtype: 'panel',
			title: 'INVOICE (FOR BUNDLE)',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 500,
					x           : -5,
					y           : -5,
					border      : false,
					items: [cmbVariety]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 200,
					x           : 350,
					y           : -5,
					border      : false,
					items: [cmbSize]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 550,
					x           : 550,
					y           : -5,
					border      : false,
					items: [cmbReemB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 90,
					width       : 200,
					x           : -5,
					y           : 25,
					border      : false,
					items: [txtStBNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 200,
					x           : 180,
					y           : 25,
					border      : false,
					items: [txtEdBNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 200,
					x           : 360,
					y           : 25,
					border      : false,
					items: [txtNOB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : 540,
					y           : 25,
					border      : false,
					items: [txtSzPrint]
				},btnADD,
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 250,
					x           : 10,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtTotB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 75,
					width       : 250,
					x           : 250,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtTotNtWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 250,
					x           : 500,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtTotGrWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 950,
					x           : 10,
					y           : 55,
					border      : false,
					items: [Tab1ExInvgriddetail]
				},
			]
		},
		{
			xtype: 'panel',
			title: 'INVOICE (FOR REEL)',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 500,
					x           : -5,
					y           : -5,
					border      : false,
					items: [cmbT2Variety]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 250,
					x           : 150,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtNOR]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 75,
					width       : 250,
					x           : 400,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtT2TotNtWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 250,
					x           : 650,
					y           : 250,
					border      : false,
					height : 100,
					items: [txtT2TotGrWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 950,
					x           : 10,
					y           : 55,
					border      : false,
					items: [Tab2ExInvgriddetail]
				},
			]
		},
		{
			xtype: 'panel',
			title: 'CONTAINER DETAILS',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 170,
					width       : 500,
					x           : -5,
					y           : -5,
					border      : false,
					items: [txtContrNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 170,
					width       : 500,
					x           : -5,
					y           : 25,
					border      : false,
					items: [txtContrSealNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 400,
					x           : 450,
					y           : -5,
					border      : false,
					items: [cmbConttype]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 170,
					width       : 300,
					x           : -5,
					y           : 55,
					border      : false,
					items: [txtNORB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100 ,
					width       : 450,
					x           : 330,
					y           : 55,
					border      : false,
					items: [txtExcSealNo]
				},btnT3ADD,
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 950,
					x           : 10,
					y           : 85,
					border      : false,
					items: [Tab3ExInvgriddetail]
				},
			]
		},
		{
			xtype: 'panel',
			title: 'DESPATCH DETAILS',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : -5,
					y           : -5,
					border      : false,
					items: [cmbPOLoad]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 400,
					x           : -5,
					y           : 25,
					border      : false,
					items: [cmbPODischarge]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 400,
					x           : -5,
					y           : 55,
					border      : false,
					items: [cmbFinalDest]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 400,
					x           : 310,
					y           : 55,
					border      : false,
					items: [cmbEPCG]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 400,
					x           : 530,
					y           : 56,
					border      : false,
					items: [chkEPCG]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 450,
					x           : -5,
					y           : 95,
					border      : false,
					items: [chkDEPB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 85,
					y           : 95,
					border      : false,
					items: [txtDEPB]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 550,
					y           : 95,
					border      : false,
					items: [txtDEPBP]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 1,
					width       : 450,
					x           : -5,
					y           : 130,
					border      : false,
					items: [chkFMARKT]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 35,
					width       : 450,
					x           : 150,
					y           : 130,
					border      : false,
					items: [txtFMart]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 450,
					x           : 350,
					y           : 130,
					border      : false,
					items: [txtFMSCCode]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 175,
					width       : 450,
					x           : 10,
					y           : 165,
					border      : false,
					items: [txtMEISP]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 450,
					x           : 350,
					y           : 165,
					border      : false,
					items: [txtMEISCode]
				},

			]
		},
		{
			xtype: 'panel',
			title: 'RATE & DEPB',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : 'EXPORT UNDER CLEAN FOR REBATE',
					labelWidth  : 150,
					width       : 250,
					x           : 5,
					y           : 10,
					border      : true,
					items: [
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 200,
							x           : 200,
							y           : 170,
							border      : true,
							items: [T3ExpUCopt]
						},
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 450,
							x           : 200,
							y           : 170,
							border      : false,
							items: [txtExpUCR]
						},
					]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 75,
					width       : 450,
					x           : 280,
					y           : 10,
					border      : false,
					items: [txtINRUSD]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 450,
					x           : 480,
					y           : 10,
					border      : false,
					items: [txtOceFC]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 450,
					x           : 480,
					y           : 50,
					border      : false,
					items: [txtInsr]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 450,
					x           : 480,
					y           : 90,
					border      : false,
					items: [txtDisct]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 720,
					y           : 10,
					border      : false,
					items: [txtValD]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 720,
					y           : 50,
					border      : false,
					items: [txtFValR]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 720,
					y           : 90,
					border      : false,
					items: [txtFValD]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 720,
					y           : 130,
					border      : false,
					items: [txtFRDKg]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 450,
					x           : 720,
					y           : 170,
					border      : false,
					items: [txtTotValD]
				},

			]
		},
		{
			xtype: 'panel',
			title: 'PACKING & DUTY DETAILS',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 10,
					border      : false,
					items: [txtPckDetail1]
				},    
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 30,
					border      : false,
					items: [txtPckDetail2]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 50,
					border      : false,
					items: [txtPckDetail3]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 70,
					border      : false,
					items: [txtPckDetail4]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 100,
					border      : false,
					items: [txtAssVal]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 180,
					width       : 750,
					x           : 75,
					y           : 130,
					border      : false,
					items: [txtInsptPckNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 750,
					x           : 150,
					y           : 180,
					border      : false,
					items: [lblGSTP]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 750,
					x           : 150,
					y           : 220,
					border      : false,
					items: [lblAmt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 380,
					x           : 250,
					y           : 170,
					border      : true,
					height      : 110,
					layout: 'absolute',

					items: [
						{ 
							xtype       : 'fieldset',
							title       : 'IGST %',
							labelWidth  : 1,
							width       : 100,
							x           : -5,
							y           : 1,
							border      : false,
							items: [txtIGSTP,txtIGSTAmt]
						},
						{ 
							xtype       : 'fieldset',
							title       : 'Cess %',
							labelWidth  : 1,
							width       : 100,
							x           : 85,
							y           : 1,
							border      : false,
							items: [txtCessP,txtCessAmt]
						},
						{ 
							xtype       : 'fieldset',
							title       : 'Edu.Cess %',
							labelWidth  : 1,
							width       : 100,
							x           : 172,
							y           : 1,
							border      : false,
							items: [txtEduCessP,txtEduCessAmt]
						},
						{ 
							xtype       : 'fieldset',
							title       : 'SHE Cess %',
							labelWidth  : 1,
							width       : 100,
							x           : 254,
							y           : 1,
							border      : false,
							items: [txtSHECessP,txtSHECessAmt]
						},
					]
				},
			]
		},
		{
			xtype: 'panel',
			title: 'SHIPPING DETAILS',bodyStyle:{"background-color":"#ebebdf"},
			layout: 'absolute',
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 10,
					border      : false,
					items: [txtVesselName]
				},   
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 500,
					x           : 500,
					y           : 10,
					border      : false,
					items: [txtShpTerms]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 360,
					x           : -5,
					y           : 40,
					border      : false,
					items: [txtShpBillNo]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 250,
					x           : 254,
					y           : 40,
					border      : false,
					items: [dptShpBill]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 500,
					x           : 500,
					y           : 40,
					border      : false,
					items: [txtPaymtTerms1]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 500,
					x           : 500,
					y           : 60,
					border      : false,
					items: [txtPaymtTerms2]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 500,
					x           : 500,
					y           : 100,
					border      : false,
					items: [cmbCHAgnt]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 120,
					width       : 500,
					x           : 500,
					y           : 130,
					border      : false,
					items: [cmbLiner]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 360,
					x           : -5,
					y           : 75,
					border      : false,
					items: [txtBillLadNo]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 250,
					x           : 254,
					y           : 75,
					border      : false,
					items: [dptBillLad]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 105,
					border      : false,
					items: [txtShpMarks1]
				},    
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 125,
					border      : false,
					items: [txtShpMarks2]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 150,
					width       : 500,
					x           : -5,
					y           : 145,
					border      : false,
					items: [txtShpMarks3]
				},
			]
		},
	]
});

var TrnExInvFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        width       : 1100,
        height      : 600,
        bodyStyle:{"background-color":"#f7f7d7"},
	labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : true,
        id          : 'TrnExInvFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
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
					click:function() {
					
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
					//TrnExInvWindow.RefreshData();
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
						TrnExInvWindow.hide();
					}
				}
			},
		]
	
	},
	items: [
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1000,
			height      : 160,
			x           : 1,
			y           : 1,
			border      : true,
			layout      : 'absolute',
			items:[
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 200,
					x           : -5,
					y           : -5,
					border      : false,
					items: [txtInvNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 250,
					x           : 210,
					y           : -5,
					border      : false,
					items: [dptInv]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : -5,
					y           : 20,
					border      : false,
					items: [cmbConsName]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : -5,
					y           : 45,
					border      : false,
					items: [txtByrOtr1]
				},    
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : -5,
					y           : 65,
					border      : false,
					items: [txtByrOtr2]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : -5,
					y           : 85,
					border      : false,
					items: [txtByrOtr3]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : -5,
					y           : 105,
					border      : false,
					items: [txtByrOtr4]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : 410,
					y           : -5,
					border      : false,
					items: [cmbProfoInvNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : 410,
					y           : 20,
					border      : false,
					items: [cmbARENo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : 410,
					y           : 45,
					border      : false,
					items: [cmbChpHd]
				},RBopt,

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 500,
					x           : 410,
					y           : 100,
					border      : false,
					items: [txtByrOrdNo]
				},Datafrmopt


			], 
		},

		{
			xtype       : 'fieldset',
			title       : '',
			width       : 1250,
			height      : 500,
			x           : 10,
			y           : 165,
			border      : true,
			layout      : 'absolute',
			items:[tabExInv] 
		}
	]
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

var TrnExInvWindow = new Ext.Window({
        height      : 500,
        width       : 700,
        y           : 50,
        title       : 'EXPORT INVOICE',
        layout      : 'fit',
        items       : TrnExInvFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
	//bodyStyle:{"background-color":"#E9EEDD"},
        listeners:
            {
              show:function(){
			/*loadInvnodatastore.removeAll();
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
			  });*/
			  
			  
			  
                    }                
            }
    });
       TrnExInvWindow.show();
});
