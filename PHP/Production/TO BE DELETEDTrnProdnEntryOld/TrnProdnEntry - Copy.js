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


var loadSupervisorDatastore = new Ext.data.Store({
      id: 'loadSupervisorDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code', 'spvr_name', 'spvr_type'
      ]),
    });

var loadDepartmentDatastore = new Ext.data.Store({
      id: 'loadDepartmentDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDepartment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'department_code','department_name'

      ]),
    });


var loadSectionDatastore = new Ext.data.Store({
      id: 'loadSectionDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSection"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'section_code', 'section_name', 'section_part'

      ]),
    });


var loadEquipmentDatastore = new Ext.data.Store({
      id: 'loadEquipmentDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEquipment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'equip_code', 'equip_name', 'equip_part', 'equip_machine', 'equip_cogen'

      ]),
    });


var loadPPNoDatastore = new Ext.data.Store({
      id: 'loadPPNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPPNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pp_advno'
      ]),
    });


var loadPPVarietyDatastore = new Ext.data.Store({
      id: 'loadPPVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPPVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode'
      ]),
    });

var loadPPVarietyQuantityDatastore = new Ext.data.Store({
      id: 'loadPPVarietyQuantityDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPPVarietyQty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pih_qty','balqty' 
      ]),
    });



//var gstGroup;
//OUT SIDE

var dtproddate = new Ext.form.DateField({
    fieldLabel : 'P.DATE	',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});

var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbshift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
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

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 150,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSupervisorDatastore,
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
   
var cmboperator = new Ext.form.ComboBox({
        fieldLabel      : 'M/C Operator',
        width           : 150,
        displayField    : 'spvr_name', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmboperator',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSupervisorDatastore,
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
var lblPPno = new Ext.form.Label({
	fieldLabel  : 'PP No',
	id          : 'lblPPno',
	name        : 'lblPPno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});   
var cmbPPNo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 78,
        displayField    : 'pp_advno', 
        valueField      : 'pp_advno',
        hiddenName      : '',
        id              : 'cmbPPNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadPPNoDatastore,
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
                loadPPVarietyDatastore.removeAll();
     		loadPPVarietyDatastore.load({
     		url: 'ClsMasSalesRate.php',
		params: {
			    task: 'loadPPVariety',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            ppno:cmbPPNo.getValue()
                        },
               	callback:function()
			{
                        }
                });


	}
	}
   });
var lblPPvariety = new Ext.form.Label({
	fieldLabel  : 'PP Variety',
	id          : 'lblPPvariety',
	name        : 'lblPPvariety',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});   
var cmbPPvariety = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 170,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbPPvariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadPPVarietyDatastore,
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
                loadPPVarietyQuantityDatastore.removeAll();
     		loadPPVarietyQuantityDatastore.load({
     		url: 'ClsMasSalesRate.php',
		params: {
			    task: 'loadPPVarietyQty',
		            finid   : GinFinid,
			    compcode:Gincompcode,
                            ppno    : cmbPPNo.getValue(),
                            variety : cmbPPvariety.getValue(),

                        },
               	callback:function()
			{
                               txtPPqty.setValue(loadPPVarietyQuantityDatastore.getAt(0).get('pih_qty'));
                               txtPPbalqty.setValue(loadPPVarietyQuantityDatastore.getAt(0).get('balqty'));     
                        }
                });
	}
	}
});
var lblPPqty = new Ext.form.Label({
	fieldLabel  : 'PP Qty',
	id          : 'lblPPqty',
	name        : 'lblPPqty',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

}); 
var txtPPqty = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtPPqty',
	name        : 'txtPPqty',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var lblPPbalqty = new Ext.form.Label({
	fieldLabel  : 'PP Bal.Qty',
	id          : 'lblPPbalqty',
	name        : 'lblPPbalqty',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtPPbalqty = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtPPbalqty',
	name        : 'txtPPbalqty',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});
var lbldeckle = new Ext.form.Label({
	fieldLabel  : 'Deckle',
	id          : 'lbldeckle',
	name        : 'lbldeckle',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtdeckle = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdeckle',
	name        : 'txtrss Nounhrs',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var lblspeed = new Ext.form.Label({
	fieldLabel  : 'Speed',
	id          : 'lblspeed',
	name        : 'lblspeed',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff471a",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtspeed = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtspeed',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtshiftmcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftmcprod',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtmcrunhrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmcrunhrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtshiftdowntime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftdowntime',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txttotshifthrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txttotshifthrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtdaymcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdaymcprod',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",	
	tabindex : 1,
	
});
var txtrollno = new Ext.form.NumberField({
	fieldLabel  : 'Roll No',
	id          : 'txtrollno',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},    	
	tabindex : 1,

}); 
var txtrollwt = new Ext.form.NumberField({
	fieldLabel  : 'Roll WT',
	id          : 'txtrollwt',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtrunhrs = new Ext.form.NumberField({
	fieldLabel  : 'Run Hrs',
	id          : 'txtrunhrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtrolldownhrs = new Ext.form.NumberField({
	fieldLabel  : 'Down Hrs',
	id          : 'txtrolldownhrs',
	name        : 'txtrolldownhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtcalcprodn = new Ext.form.NumberField({
	fieldLabel  : 'Calc Prodn',
	id          : 'txtcalcprodn',
	name        : 'txtcalcprodn',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtbreaks = new Ext.form.NumberField({
	fieldLabel  : 'Breaks',
	id          : 'txtbreaks',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var cmbdowntimedept = new Ext.form.ComboBox({
        fieldLabel      : 'Department',
        width           : 320,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbdowntimedept',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDepartmentDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",        
	listeners:{
        select: function(){
	}
	}
   });
var cmbdownsection = new Ext.form.ComboBox({
        fieldLabel      : 'Section',
        width           : 320,
        displayField    : 'section_name', 
        valueField      : 'section_code',
        hiddenName      : '',
        id              : 'cmbdownsection',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSectionDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",        
	listeners:{
        select: function(){
	}
	}
   });
var cmbdownequip = new Ext.form.ComboBox({
        fieldLabel      : 'Equipment',
        width           : 320,
        displayField    : 'equip_name', 
        valueField      : 'equip_code',
        hiddenName      : '',
        id              : 'cmbdownequip',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEquipmentDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",        
	listeners:{
        select: function(){
	}
	}
   });
var txtstopreason = new Ext.form.TextField({
	fieldLabel  : 'Stoppage Reason',
	id          : 'txtstopreason',
	name        : 'txtstopreason',
	width       :  320,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:11px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtsttime = new Ext.form.NumberField({
	fieldLabel  : 'Start Time',
	id          : 'txtsttime',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtendtime = new Ext.form.NumberField({
	fieldLabel  : 'End Time',
	id          : 'txtendtime',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtdownhrs = new Ext.form.NumberField({
	fieldLabel  : 'Down Hrs',
	id          : 'txtdownhrs',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtmonthuptomcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcprod',
	name        : 'txtmonthuptomcprod',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtmonthuptomcdowntime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcdowntime',
	name        : 'txtmonthuptomcdowntime',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtmonthuptomcrunhrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcrunhrs',
	name        : 'txtmonthuptomcrunhrs',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var dgrecord = Ext.data.Record.create([]);
var flxdowntime = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:300,
    height: 150,
    hidden:false,
    width: 250,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "DEPARTMENT", dataIndex: 'department',sortable:true,width:150,align:'left'},//0
        {header: "DOWN HRS", dataIndex: 'downhrs',sortable:true,width:70,align:''},//1

    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}

				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });
				
				
flxdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});
   
var txtfeltper = new Ext.form.NumberField({
	fieldLabel  : 'Felt Production',
	id          : 'txtfeltper',
	name        : 'txtfeltper',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var cmbwire = new Ext.form.ComboBox({
        fieldLabel      : 'Wire',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbwire',
        typeAhead       : true,
        mode            : 'local',
        store           : ['I-sd Dryer'],
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
var cmbfeltsection = new Ext.form.ComboBox({
        fieldLabel      : 'Felt Section',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbfeltsection',
        typeAhead       : true,
        mode            : 'local',
        store           : ['I-sd Dryer'],
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
var txtwireper = new Ext.form.NumberField({
	fieldLabel  : 'Wire Production',
	id          : 'txtwireper',
	name        : 'txtwireper',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});  
var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 30,
    x       : 790,
    y       : 210,
   labelStyle : "font-size:10px;font-weight:bold;",
   style      : "border-radius:10px;",
	style:{'background':'#e8badf'},

});
var dgrecord = Ext.data.Record.create([]);
var flxproddetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:265,
    height: 100,
    hidden:false,
    width: 850,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY", dataIndex: 'quality',sortable:true,width:150,align:'left'},
        {header: "ROLL No", dataIndex: 'rollno',sortable:true,width:60,align:'left'},//0
        {header: "ROLL WT(MT)", dataIndex: 'rollwt',sortable:true,width:90,align:'left'},//1
        {header: "RUN HRS", dataIndex: 'runhrs',sortable:true,width:70,align:'left'},//2
        {header: "BREAKS", dataIndex: 'breaks',sortable:true,width:60,align:'left'},//3
        {header: "D.TIME DEPT_CODE", dataIndex: 'd.timedeptcode',sortable:true,width:120,align:'left'},//4
        {header: "DEPARTMENT", dataIndex: 'department',sortable:true,width:90,align:'left'},//5
	{header: "SEC CODE", dataIndex: 'seccode',sortable:true,width:70,align:'left',hidden:false},//6,hidden:true
        {header: "SECTION", dataIndex: 'section',sortable:true,width:70,align:'left',hidden:false},//7,hidden:true
        {header: "EQP CODE", dataIndex: 'eqpcode',sortable:true,width:70,align:'left'},//8,hidden:true
        {header: "EQUIPMENT", dataIndex: 'equipment',sortable:true,width:130,align:'left'},//9
        {header: "STOPPAGE REASON", dataIndex: 'stoppagereason',sortable:true,width:200,align:'left',hidden:false},//10,hidden:true
        {header: "START TIME", dataIndex: 'starttime',sortable:true,width:80,align:'left',hidden:false},//11,hidden:true
        {header: "END TIME", dataIndex: 'endtime',sortable:true,width:80,align:'left'},//12
        {header: "DOWN HRS", dataIndex: 'downhrs',sortable:true,width:80,align:'left'},//13
        {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:70,align:'left'},//14
	{header: "PP No", dataIndex: 'ppno',sortable:true,width:60,align:'left',hidden:false},//15,hidden:true
        {header: "FIN WT(MT)", dataIndex: 'finwt',sortable:true,width:90,align:'left'},//16,hidden:true
//        {header: "Actual Issue", dataIndex: 'actiss',sortable:true,width:50,align:'left'},//17,hidden:true
//        {header: "Prev Stk Qty", dataIndex: 'prvqty',sortable:true,width:50,align:'left'},//18
//        {header: "Prev Stk Val", dataIndex: 'prvval',sortable:true,width:50,align:'left'},//17
//        {header: "Machine", dataIndex: 'machine',sortable:true,width:50,align:'left'},//18
//	  {header: "Machine code", dataIndex: 'mcseq',sortable:true,width:50,align:'left',hidden:true},//19,hidden:true

    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}
				else if (selrow.get('mcseq') == "4")
				{
					macname = 'PM3';
				}
				else if (selrow.get('mcseq') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });
				
				
flxdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});

       
var TrnProdnFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PRODUCTION ENTRY',
        header      : false,
        width       : 1270,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 700,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnProdnFormpanel',
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
				AEDFlag = "Add";
				TrnProdnFormpanel.getForm().reset();
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
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
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
				TrnProdnEntry.hide();
			   }
			}
        	}   
            ],
	
        },

                items: [
/*
		           { 
		               xtype   : 'fieldset',
				title   : 'FELT AND WIRE PERFORMANCE',
				layout  : 'hbox',
				border  : true,
				height  : 220,
				width   : 370,
				style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 855,
				y       : 10,
	 			items:[			  
						   { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 90,
				                	width       : 350,
				                	x           : 0,
				                	y           : 0,
				                    	border      : false,
				                	items: [cmbwire]
				                   }, 
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 90,
				                	width       : 200,
				                	x           : 0,
				                	y           : 30,
				                    	border      : false,
				                	items: [txtwireper]
				                   }, 
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 90,
				                	width       : 350,
				                	x           : 0,
				                	y           : 100,
				                    	border      : false,
				                	items: [cmbfeltsection]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 90,
				                	width       : 200,
				                	x           : 0,
				                	y           : 130,
				                    	border      : false,
				                	items: [txtfeltper]
				                   }, 	
					],
				}, 
*/
		           { 
		               xtype   : 'fieldset',
				title   : 'PRODUCTION PERFORMANCE',
				layout  : 'hbox',
				border  : true,
				height  : 515,
				width   : 240,
				style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 970,
				y       : 10,
	 			items:[
			 			  { 
				                	xtype       : 'label',
				                	text        : 'Month Upto Date M/c Production',
				                	labelWidth  : 50,
				                	width       : 150,
				                	x           : 0,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 75,
				                	width       : 190,
				                	x           : 65,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtmonthuptomcprod]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Month Upto Date M/c Total Run Hrs',
				                	labelWidth  : 70,
				                	width       : 160,
				                	x           : 0,
				                	y           : 50,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 75,
				                	width       : 190,
				                	x           : 65,
				                	y           : 55,
				                    	border      : false,
				                	items: [txtmonthuptomcrunhrs]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Month Upto Date M/c Total Down Hrs',
				                	labelWidth  : 70,
				                	width       : 160,
				                	x           : 0,
				                	y           : 100,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 75,
				                	width       : 190,
				                	x           : 65,
				                	y           : 100,
				                    	border      : false,
				                	items: [txtmonthuptomcdowntime]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Month Upto Date Departmentwise Downtime',
				                	labelWidth  : 70,
				                	width       : 260,
				                	x           : 0,
				                	y           : 140,
				                    	border      : false,
				                   },flxdowntime,  	
					],
				},
		    { xtype   : 'fieldset',
		        title   : 'PRODUCTION ENTRY',
		        layout  : 'hbox',
		        border  : true,
		        height  : 515,
		        width   : 950,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
//INSIDE
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 180,
                                	x           : 0,
                                	y           : -10,
                                  	border      : false,
                                	items: [dtproddate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 180,
                                	x           : 660,
                                	y           : -10,
                                  	border      : false,
                                	items: [cmbshift]
                                 },
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 300,
                                	x           : 160,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 340,
                                	x           : 410,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmboperator]
                                  },  
		                 {
		                       xtype   : 'fieldset',
		                       title   : 'ENTRY DETAILS',
		                       layout  : 'hbox',
		                       border  : true,
		                       height  : 450,
		                       width   : 900,
			               style:{ border:'1px solid red',color:' #581845 '},
		                       layout  : 'absolute',
		                       x       : 10,
		                       y       : 30,
		                       items:[
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 90,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lblPPno]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 100,
				                	x           : 75,
				                	y           : 5,
				                    	border      : false,
				                	items: [cmbPPNo]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 70,
				                	width       : 120,
				                	x           : 185,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lblPPvariety]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 200,
				                	x           : 175,
				                	y           : 5,
				                    	border      : false,
				                	items: [cmbPPvariety]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 70,
				                	width       : 100,
				                	x           : 390,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lblPPqty]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 130,
				                	x           : 380,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtPPqty]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 70,
				                	width       : 180,
				                	x           : 480,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lblPPbalqty]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 130,
				                	x           : 480,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtPPbalqty]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 70,
				                	width       : 130,
				                	x           : 590,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lbldeckle]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 130,
				                	x           : 580,
				                	y           : 05,
				                    	border      : false,
				                	items: [txtdeckle]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 0,
				                	width       : 180,
				                	x           : 680,
				                	y           : -15,
				                    	border      : false,
				                    	items: [lblspeed]
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 1,
				                	width       : 130,
				                	x           : 670,
				                	y           : 5,
				                    	border      : false,
				                	items: [txtspeed]
				                   },btnadd,flxproddetail,
				                  { 
				                	xtype       : 'label',
				                	text        : 'Shift Machine Production (M.T)',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 10,
				                	y           : 370,
				                    	border      : false,
				                   },

				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 10,
				                	width       : 250,
				                	x           : -15,
				                	y           : 380,
				                    	border      : false,
				                	items: [txtshiftmcprod]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Machine Run Hours',
				                	labelWidth  : 50,
				                	width       : 100,
				                	x           : 190,
				                	y           : 370,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 10,
				                	width       : 250,
				                	x           : 165,
				                	y           : 380,
				                    	border      : false,
				                	items: [txtmcrunhrs]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Shift Down time',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 320,
				                	y           : 370,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 250,
				                	x           : 255,
				                	y           : 380,
				                    	border      : false,
				                	items: [txtshiftdowntime]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Total Shift Hours',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 430,
				                	y           : 370,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 10,
				                	width       : 200,
				                	x           : 405,
				                	y           : 380,
				                    	border      : false,
				                	items: [txttotshifthrs]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Day Machine Production (M.T)',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 560,
				                	y           : 370,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 10,
				                	width       : 200,
				                	x           : 535,
				                	y           : 380,
				                    	border      : false,
				                	items: [txtdaymcprod]
				                   },  
						   { 
						       xtype   : 'fieldset',
						       title   : 'Rollwise Machine Production Entry',
						       layout  : 'hbox',
						       border  : true,
						       height  : 210,
						       width   : 300,
						       style:{ border:'1px solid red',color:' #581845 '},
						       layout  : 'absolute',
						       x       : 10,
						       y       : 45,
						       items:[
						   
								    /*{ 
									xtype       : 'label',
									text        : 'Roll No',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 0,
								    	border      : false,
								    },*/
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : -10,
								    	border      : false,
									items: [txtrollno]
								    },

								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : 20,
								    	border      : false,
									items: [txtrollwt]
								    }, 
								   /*{ 
									xtype       : 'label',
									text        : 'Run Hrs',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 60,
								    	border      : false,
								    },*/
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : 50,
								    	border      : false,
									items: [txtrunhrs]
								    }, 
								   /*{ 
									xtype       : 'label',
									text        : 'Down Hrs',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 60,
								    	border      : false,
								    },*/  
		 						   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : 80,
								    	border      : false,
									items: [txtrolldownhrs]
								    },
								   /*{ 
									xtype       : 'label',
									text        : 'Calc.Prodn',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 90,
								    	border      : false,
								    },*/
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : 110,
								    	border      : false,
									items: [txtcalcprodn]
								    },
								   /*{ 
									xtype       : 'label',
									text        : 'Bearks(Nos)',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 120,
								    	border      : false,
								    },*/
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 80,
									width       : 400,
									x           : 0,
									y           : 140,
								    	border      : false,
									items: [txtbreaks]
								    },
							    ]
						     },
								    { 
								       xtype   : 'fieldset',
								       title   : 'Rollwise Downtime Entry',
								       layout  : 'hbox',
								       border  : true,
								       height  : 210,
								       width   : 460,
								       style:{ border:'1px solid red',color:' #581845 '},
								       layout  : 'absolute',
								       x       : 310,
								       y       : 45,
								       items:[
								       
										   /*{ 
											xtype       : 'label',
											text        : 'Department',
											labelWidth  : 100,
											width       : 500,
											x           : 0,
											y           : 0,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 500,
											x           : 0,
											y           : -10,
										    	border      : false,
											items: [cmbdowntimedept]
										    },
								      		   /*{ 
											xtype       : 'label',
											text        : 'Section',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 30,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 500,
											x           : 0,
											y           : 20,
										    	border      : false,
											items: [cmbdownsection]
										    },
										  /*{ 
											xtype       : 'label',
											text        : 'Equipment',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 60,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 500,
											x           : 0,
											y           : 50,
										    	border      : false,
											items: [cmbdownequip]
										    },
										 /*{ 
											xtype       : 'label',
											text        : 'Stoppage Reason',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 90,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 500,
											x           : 0,
											y           : 80,
										    	border      : false,
											items: [txtstopreason]
										    },
										   /*{ 
											xtype       : 'label',
											text        : 'Start Time',
											labelWidth  : 300,
											width       : 500,
											x           : 0,
											y           : 120,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 200,
											x           : 0,
											y           : 110,
										    	border      : false,
											items: [txtsttime]
										    },
										   /*{ 
											xtype       : 'label',
											text        : 'End Time',
											labelWidth  : 50,
											width       : 100,
											x           : 230,
											y           : 120,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 80,
											width       : 200,
											x           : 180,
											y           : 110,
										    	border      : false,
											items: [txtendtime]
										    },
										   /*{ 
											xtype       : 'label',
											text        : 'Down Hrs',
											labelWidth  : 50,
											width       : 100,
											x           : 370,
											y           : 120,
										    	border      : false,
										    },*/ 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 100,
											width       : 450,
											x           : 0,
											y           : 140,
										    	border      : false,
											items: [txtdownhrs]
										    },     
								       ],
								},
				           ],
                                     },
                      ], 
                     },		 
                       
                 ],
        
    });

function RefreshData()
{

	loadPPNoDatastore.removeAll();
	loadPPNoDatastore.load({
	 url: 'ClsProdnEntry.php',
		params: {
	    	   task: 'loadPPNo',
		   compcode:Gincompcode,
		   finid:GinFinid   
		 },
		 callback:function()
		   {

		   } 
	  });

}

    var TrnProdnEntry = new Ext.Window({
	height      : 600,
        width       : 1250,
        y           : 35,
        title       : 'PRODUCTION ENTRY',
        items       : TrnProdnFormpanel,
        layout      : 'fit',
        closable    : true,
	bodyStyle   :{"background-color":"#E9EEDD"},
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
    TrnProdnEntry.show();  
});
