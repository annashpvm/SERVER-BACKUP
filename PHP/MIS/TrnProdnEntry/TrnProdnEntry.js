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

var gstFlag = "Add";
var varcodelist = "(";

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

var loadProdVarietyDatastore = new Ext.data.Store({
      id: 'loadProdVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadProdVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode'
      ]),
    });


var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
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
    labelStyle : "font-size:12px;font-weight:bold;",
    width : 100,
});

var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 60,
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
    	labelStyle : "font-size:12px;font-weight:bold;",
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
    	labelStyle : "font-size:12px;font-weight:bold;",
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
        valueField      : 'spvr_code',
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
    	labelStyle : "font-size:12px;font-weight:bold;",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});   

var lblRollNo = new Ext.form.Label({
	fieldLabel  : 'Roll No',
	id          : 'lblRollNo',
	name        : 'lblRollNo',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblRollWt = new Ext.form.Label({
	fieldLabel  : 'Roll Wt(T)',
	id          : 'lblRollWt',
	name        : 'lblRollWt',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblRunMins = new Ext.form.Label({
	fieldLabel  : 'Run Mins',
	id          : 'lblRunMins',
	name        : 'lblRunMins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblDraw = new Ext.form.Label({
	fieldLabel  : 'Draw',
	id          : 'lblDraw',
	name        : 'lblDraw',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblBreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblBreaks',
	name        : 'lblBreaks',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblRollDia = new Ext.form.Label({
	fieldLabel  : 'Roll DIA',
	id          : 'lblRollDia',
	name        : 'lblRollDia',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblReason = new Ext.form.Label({
	fieldLabel  : 'Reason of Loss',
	id          : 'lblReason',
	name        : 'lblReason',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblShiftProdn = new Ext.form.Label({
	fieldLabel  : 'Production',
	id          : 'lblShiftProdn',
	name        : 'lblShiftProdn',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblShiftrunmins = new Ext.form.Label({
	fieldLabel  : 'Run Mins',
	id          : 'lblShiftrunmins',
	name        : 'lblShiftrunmins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblShiftDownHrs = new Ext.form.Label({
	fieldLabel  : 'Down Mins',
	id          : 'lblShiftDownHrs',
	name        : 'lblShiftDownHrs',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblTodayProdn = new Ext.form.Label({
	fieldLabel  : 'Production',
	id          : 'lblTodayProdn',
	name        : 'lblTodayProdn',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblTodayrunmins = new Ext.form.Label({
	fieldLabel  : 'Run Hrs',
	id          : 'lblTodayrunmins',
	name        : 'lblTodayrunmins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblTodayDownHrs = new Ext.form.Label({
	fieldLabel  : 'Down Hrs',
	id          : 'lblTodayDownHrs',
	name        : 'lblTodayDownHrs',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblUptoDateProdn = new Ext.form.Label({
	fieldLabel  : 'Production',
	id          : 'lblUptoDateProdn',
	name        : 'lblUptoDateProdn',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblUptoDaterunmins = new Ext.form.Label({
	fieldLabel  : 'Run Hrs',
	id          : 'lblUptoDaterunmins',
	name        : 'lblUptoDaterunmins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblUptoDateDownHrs = new Ext.form.Label({
	fieldLabel  : 'Down Hrs',
	id          : 'lblUptoDateDownHrs',
	name        : 'lblUptoDateDownHrs',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblPower = new Ext.form.Label({
	fieldLabel  : 'Power',
	id          : 'lblPower',
	name        : 'lblPower',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblSteam = new Ext.form.Label({
	fieldLabel  : 'Steam',
	id          : 'lblSteam',
	name        : 'lblSteam',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblOpPulp = new Ext.form.Label({
	fieldLabel  : 'Opening',
	id          : 'lblOpPulp',
	name        : 'lblOpPulp',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblCloPulp = new Ext.form.Label({
	fieldLabel  : 'Closing',
	id          : 'lblCloPulp',
	name        : 'lblCloPulp',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblOpBroke = new Ext.form.Label({
	fieldLabel  : 'Opening',
	id          : 'lblOpBroke',
	name        : 'lblOpBroke',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblCloBroke= new Ext.form.Label({
	fieldLabel  : 'Closing',
	id          : 'lblCloBroke',
	name        : 'lblCloBroke',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});   



var lblDepartment = new Ext.form.Label({
	fieldLabel  : 'Department',
	id          : 'lblDepartment',
	name        : 'lblDepartment',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblSection = new Ext.form.Label({
	fieldLabel  : 'Section',
	id          : 'lblSection',
	name        : 'lblSection',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblEquipment = new Ext.form.Label({
	fieldLabel  : 'Equipment',
	id          : 'lblEquipment',
	name        : 'lblEquipment',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblStoppageReason = new Ext.form.Label({
	fieldLabel  : 'Reason',
	id          : 'lblStoppageReason',
	name        : 'lblStoppageReason',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblFromTime = new Ext.form.Label({
	fieldLabel  : 'From Time',
	id          : 'lblFromTime',
	name        : 'lblFromTime',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblToTime = new Ext.form.Label({
	fieldLabel  : 'To Time',
	id          : 'lblToTime',
	name        : 'lblToTime',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblInTime = new Ext.form.Label({
	fieldLabel  : 'IN Time',
	id          : 'lblInTime',
	name        : 'lblInTime',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblOutTime = new Ext.form.Label({
	fieldLabel  : 'Out-Time',
	id          : 'lblOutTime',
	name        : 'lblOutTime',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 


var lblDownHrs = new Ext.form.Label({
	fieldLabel  : 'Down Mins',
	id          : 'lblDownHrs',
	name        : 'lblDownHrs',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'QUALITY',
        width           : 170,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyDatastore,
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




var cmbProdVariety = new Ext.form.ComboBox({
        fieldLabel      : 'QUALITY',
        width           : 170,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbProdVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdVarietyDatastore,
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
        labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
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
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtspeed = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtspeed',
	name        : 'txtspeed',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",	
	tabindex : 14,

});
var txtDraw = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtDraw',
	name        : 'txtDraw',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 14,

});
var txtshiftmcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftmcprod',
	name        : 'txtshiftmcprod',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtShiftrunmins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtShiftrunmins',
	name        : 'txtShiftrunmins',
	width       :  60,
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
	name        : 'txtshiftdowntime',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});

var txtTodayrunmins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTodayrunmins',
	name        : 'txtTodayrunmins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtTodaydowntime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTodaydowntime',
	name        : 'txtTodaydowntime',
	width       :  60,
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
var txtTodaymcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTodaymcprod',
	name        : 'txtrss Nounhrs',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",	
	tabindex : 1,
	
});
var txtrollno = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtrollno',
	name        : 'txtrollno',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},    	
	tabindex : 10,

}); 
var txtrollwt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtrollwt',
	name        : 'txtrollwt',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 11,
        decimalPrecision: 3,

});





var txtRunMins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtRunMins',
	name        : 'txtRunMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 12,
        decimalPrecision: 0,
	readOnly : true,

});
var txtdeckle = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdeckle',
	name        : 'txtdeckle',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 13,

});
var txtrolldownMins = new Ext.form.NumberField({
	fieldLabel  : 'Down Mins',
	id          : 'txtrolldownMins',
	name        : 'txtrolldownMins',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtReason = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtReason',
	name        : 'txtReason',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 16,

});
var txtbreaks = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtbreaks',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 15,
       decimalPrecision: 0,

});

var txtRollDia = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtRollDia',
	name        : 'txtRollDia',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 15,
       decimalPrecision: 0,

});

var cmbdowntimedept = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
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
        fieldLabel      : '',
        width           : 200,
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
        fieldLabel      : '',
        width           : 200,
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
var txtStopReason = new Ext.form.TextField({
	fieldLabel  : 'Stoppage Reason',
	id          : 'txtStopReason',
	name        : 'txtStopReason',
	width       :  320,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:11px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
/*
var txtDownStartTime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtDownStartTime',
	name        : 'txtrss Nounhrs',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
*/
var txtDownStartTime = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'txtDownStartTime',
    name       : 'txtDownStartTime',
	width       :  70,
    format     : 'H.i',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    enableKeyEvents: true,
        listeners:{
           blur:function(){
                  find_downmins();
           },
           keyup:function(){
                  find_downmins();

            },
        }   
});

var txtDownEndTime = new Ext.form.DateField({
	fieldLabel  : '',
	id          : 'txtDownEndTime',
	name        : 'txtDownEndTime',
	width       :  70,
        format     : 'H.i',
        value      : new Date(),
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        listeners:{
           keyup:function(){
                  find_downmins();
           },
           blur:function(){
                  find_downmins();
           }
        }   

});


var txtInTime = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'txtInTime',
    name       : 'txtInTime',
    width       :  70,
    format     : 'H.i',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
    enableKeyEvents: true,
    listeners:{
           keyup:function(){
                  find_runmins();
           },
           blur:function(){
                  find_runmins();
           }
    }    
});

var txtOutTime = new Ext.form.DateField({
	fieldLabel  : '',
	id          : 'txtOutTime',
	name        : 'txtOutTime',
	width       :  70,
//        format     : 'd-m-Y H.i',

        value      : new Date(),
        format     : 'H.i',
//        format     : 'd-m-y H.i',
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 1,
        listeners:{
           blur:function(){
                  find_runmins();
           },
           keyup:function(){
                  find_runmins();
                   
                      


     //                 var startTime = Ext.getCmp('txtInTime').getRawValue();
     //                 var endTime   = Ext.getCmp('txtOutTime').getRawValue();

        //      alert(Ext.Date.diff( txtInTime, txtOutTime, Ext.Date.MINUTE) );
//alert(Ext.getCmp('txtOutTime').getRawValue()-Ext.getCmp('txtInTime').getRawValue());
            },
        }   

});



function find_runmins()
{
   txtRunMins.setValue("");
   var dt1 = txtOutTime.getValue();
   var dt2 = txtInTime.getValue();
   var diffMs1 = (dt1.getTime()-dt2.getTime());
   if (diffMs1 >0)
   {
       txtRunMins.setValue(diffMs1/60000);
   }

}

function find_downmins()
{
   txtDownMins.setValue("");
   var dt3 = txtDownStartTime.getValue();
   var dt4 = txtDownEndTime.getValue();
   var diffMs2 = (dt4.getTime()-dt3.getTime());
   if (diffMs2 >0)
   {
       txtDownMins.setValue(diffMs2/60000);
   }

}

var txtDownMins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtDownMins',
	name        : 'txtDownMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtmonthuptomcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcprod',
	name        : 'txtmonthuptomcprod',
	width       :  60,
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
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});
var txtmonthuptomcrunmins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcrunmins',
	name        : 'txtmonthuptomcrunmins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,

});

var txtPower = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtPower',
	name        : 'txtPower',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});


var txtSteam = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtSteam',
	name        : 'txtSteam',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});

var txtOpPulp = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtOpPulp',
	name        : 'txtOpPulp',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});


var txtCloPulp = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtCloPulp',
	name        : 'txtCloPulp',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});


var txtOpBroke = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtOpBroke',
	name        : 'txtOpBroke',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});


var txtCloBroke = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtCloBroke',
	name        : 'txtCloBroke',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,


});


var txtRollVarietyQty = new Ext.form.NumberField({
	fieldLabel  : 'Qty(t)',
	id          : 'txtRollVarietyQty',
	name        : 'txtRollVarietyQty',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 21,
        decimalPrecision: 3,

});


var txtRollVarietyMins = new Ext.form.NumberField({
	fieldLabel  : 'Mins',
	id          : 'txtRollVarietyMins',
	name        : 'txtRollVarietyMins',
	width       :  40,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex :22,

});

var txtRollVarietySet = new Ext.form.NumberField({
	fieldLabel  : 'Sets',
	id          : 'txtRollVarietySet',
	name        : 'txtRollVarietySet',
	width       :  40,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 23,

});

var txtRollTotalQty = new Ext.form.NumberField({
	fieldLabel  : 'Tot.Qty(t)',
	id          : 'txtRollTotalQty',
	name        : 'txtRollTotalQty',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
        decimalPrecision: 3,


});


function grid_tot()
{
	totmins=0;
	totqty=0;

        varcodelist = "(";  

      
        var Row= flxRollProductionDetailed.getStore().getCount();
        flxRollProductionDetailed.getSelectionModel().selectAll();
        var sel=flxRollProductionDetailed.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totmins=totmins+Number(sel[i].data.mins);
            totqty=totqty+Number(sel[i].data.qty);
            varcodelist = varcodelist + sel[i].data.qlycode + ',';
        }
        varcodelist = varcodelist + '0)';
        txtshiftmcprod.setValue(totqty);
        txtShiftrunmins.setValue(totmins);
        txtshiftdowntime.setValue(totqty);

        flxRollProductionDetailed.getSelectionModel().clearSelections();

}


var txtRollTotalHrs = new Ext.form.NumberField({
	fieldLabel  : 'Tot.Hrs',
	id          : 'txtRollTotalHrs',
	name        : 'txtRollTotalHrs',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
        decimalPrecision: 3,

});

var dgrecord = Ext.data.Record.create([]);
var flxMonthdowntime = new Ext.grid.EditorGridPanel({
    frame: false,
    id : 'my-grid10',	
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:60,
    height: 200,
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
		title: 'Down Time',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
                

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
    x       :860,
    y       : 5,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   style      : "border-radius:10px;",
   tabindex : 1,
   listeners:{
       click: function(){       
	   var gstadd="true";

//          tabRollProduction.show();


/*
	    if(cmbPPvariety.getRawValue()=="" || cmbPPvariety.getValue()==0)
	    {
		alert("Select Variety Name..");
                gstadd="false";
                cmbPPvariety.setFocus(); 	
	    }
*/
	    if(txtrollno.getRawValue()=="" || txtdeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtrollno.setFocus();
	    }
	    if(txtrollwt.getRawValue()=="" || txtrollwt.getValue()==0)
	    {
		alert("Roll weight is Empty..");
                gstadd="false";
                txtrollwt.Focus();
	    }
	    if(txtdeckle.getRawValue()=="" || txtdeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtdeckle.setFocus();
	    }
	    if(txtspeed.getRawValue()=="" || txtspeed.getValue()==0)
	    {
		alert("Speed is Empty..");
                gstadd="false";
                txtspeed.setFocus();
	    }



            if(gstadd=="true")
            {
              Ext.getCmp('rollvartyentry').show()
            }   
            else
            {
              Ext.getCmp('rollvartyentry').hide()
            }   

/*
                
                flxproduction.getSelectionModel().selectAll();
                var selrows = flxproduction.getSelectionModel().getCount();
                var sel = flxproduction.getSelectionModel().getSelections();


               var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.rollno === txtrollno.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxproduction.getStore().indexOf(editrow);
//			sel[idx].set('quality' , cmbPPvariety.getRawValue());
//			sel[idx].set('qlycode' , cmbPPvariety.getValue());
			sel[idx].set('rollno'  , txtrollno.getRawValue());
			sel[idx].set('speed'   , txtspeed.getRawValue());
			sel[idx].set('deckle'  , txtdeckle.getRawValue());
			sel[idx].set('draw'    , txtDraw.getRawValue());
			sel[idx].set('intime'    , txtInTime.getRawValue());
			sel[idx].set('outtime'    , txtOutTime.getRawValue());
			sel[idx].set('runmins'  , txtRunMins.getValue());
			sel[idx].set('breaks'  , txtbreaks.getValue());
			sel[idx].set('rolldia'  , txtRollDia.getValue());
			sel[idx].set('rollwt'  , txtrollwt.getRawValue());
			sel[idx].set('reason'  , txtreason.getRawValue());
			sel[idx].set('ppno'    , cmbPPNo.getRawValue());
			sel[idx].set('finwt'   , 0);
			flxproduction.getSelectionModel().clearSelections();

         


		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      


                                var RowCnt = flxproduction.getStore().getCount() + 1;
                                flxproduction.getStore().insert(
                                flxproduction.getStore().getCount(),
                                new dgrecord({
                                   sno       : flxproduction.getStore().getCount()+1,
//		                   quality   : cmbPPvariety.getRawValue(),
//		                   qlycode   : cmbPPvariety.getValue(),
			           rollno    : txtrollno.getRawValue(),
				   speed     : txtspeed.getRawValue(),
				   deckle    : txtdeckle.getRawValue(),
                                   draw      : txtDraw.getRawValue(),
                                   intime    : txtInTime.getRawValue(),
			           outtime   : txtOutTime.getRawValue(),
				   runmins    : Number(txtRunMins.getValue()),
				   breaks    : Number(txtbreaks.getValue()),
                                   rolldia    : Number(txtRollDia.getRawValue()),
                                   rollwt    : Number(txtrollwt.getRawValue()),
                                   reason    : txtReason.getRawValue(),  
			           ppno      : cmbPPNo.getRawValue(),
				   finwt     : 0,

                               }) 
                               );
                               txtrollno.setValue(Number(txtrollno.getValue())+1);
                               txtrollwt.setValue(0);
                               txtRunMins.setValue(0);
                               txtReason.setValue(0);
                               txtbreaks.setValue(0);
//                               txtrollwt.setFocus();


                }

             }



*/

       }
    }      



});



var btnRollConfirm = new Ext.Button({
    style   : 'text-align:center;',
    text    : "CONFIRM",
    width   : 50,
    height  : 25,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   style      : "border-radius:10px;",
   tabindex : 1,
   listeners:{
       click: function(){       
	   var gstadd="true"
/*
	    if(cmbPPvariety.getRawValue()=="" || cmbPPvariety.getValue()==0)
	    {
		alert("Select Variety Name..");
                gstadd="false";
                cmbPPvariety.setFocus(); 	
	    }
*/
	    if(txtrollno.getRawValue()=="" || txtdeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtrollno.setFocus();
	    }
	    if(txtrollwt.getRawValue()=="" || txtrollwt.getValue()==0)
	    {
		alert("Roll weight is Empty..");
                gstadd="false";
                txtrollwt.setFocus();
	    }
	    if(txtdeckle.getRawValue()=="" || txtdeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtdeckle.setFocus();
	    }
	    if(txtspeed.getRawValue()=="" || txtspeed.getValue()==0)
	    {
		alert("Speed is Empty..");
                gstadd="false";
                txtspeed.setFocus();
	    }



            if(gstadd=="true")

            {
                flxproduction.getSelectionModel().selectAll();
                var selrows = flxproduction.getSelectionModel().getCount();
                var sel = flxproduction.getSelectionModel().getSelections();


               var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.rollno === txtrollno.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxproduction.getStore().indexOf(editrow);
//			sel[idx].set('quality' , cmbPPvariety.getRawValue());
//			sel[idx].set('qlycode' , cmbPPvariety.getValue());
			sel[idx].set('rollno'  , txtrollno.getRawValue());
			sel[idx].set('speed'   , txtspeed.getRawValue());
			sel[idx].set('deckle'  , txtdeckle.getRawValue());
			sel[idx].set('draw'    , txtDraw.getRawValue());
			sel[idx].set('intime'  , txtInTime.getRawValue());
			sel[idx].set('outtime' , txtOutTime.getRawValue());
			sel[idx].set('runmins' , txtRunMins.getValue());
			sel[idx].set('breaks'  , txtbreaks.getValue());
			sel[idx].set('rolldia' , txtRollDia.getValue());
			sel[idx].set('rollwt'  , txtrollwt.getRawValue());
			sel[idx].set('reason'  , txtreason.getRawValue());
			sel[idx].set('ppno'    , cmbPPNo.getRawValue());
			sel[idx].set('finwt'   , 0);
			flxproduction.getSelectionModel().clearSelections();

     






		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      


                                var RowCnt = flxproduction.getStore().getCount() + 1;
                                flxproduction.getStore().insert(
                                flxproduction.getStore().getCount(),
                                new dgrecord({
                                   sno       : flxproduction.getStore().getCount()+1,
//		                   quality   : cmbPPvariety.getRawValue(),
//		                   qlycode   : cmbPPvariety.getValue(),
			           rollno    : txtrollno.getRawValue(),
				   speed     : txtspeed.getRawValue(),
				   deckle    : txtdeckle.getRawValue(),
                                   draw      : txtDraw.getRawValue(),
                                   intime    : txtInTime.getRawValue(),
			           outtime   : txtOutTime.getRawValue(),
				   runmins    : Number(txtRunMins.getValue()),
				   breaks    : Number(txtbreaks.getValue()),
                                   rolldia    : Number(txtRollDia.getRawValue()),
                                   rollwt    : Number(txtrollwt.getRawValue()),
                                   reason    : txtReason.getRawValue(),  
			           ppno      : Number(cmbPPNo.getRawValue()),
				   finwt     : 0,

                               }) 
                               );

		        flxRollProduction.getSelectionModel().selectAll();
		        var selrows1 = flxRollProduction.getSelectionModel().getCount();
		        var sel1 = flxRollProduction.getSelectionModel().getSelections();
		        var cnt = 0;
                        for (var i=0;i<selrows1;i++){

                                var RowCnt = flxRollProductionDetailed.getStore().getCount() + 1;
                                flxRollProductionDetailed.getStore().insert(
                                flxRollProductionDetailed.getStore().getCount(),
                                new dgrecord({
                                   rollno   : txtrollno.getRawValue(),
		                   quality  : sel1[i].data.quality,
		                   qlycode  : sel1[i].data.qlycode,
			           qty      : sel1[i].data.qty,
				   mins     : sel1[i].data.mins,
				   set      : sel1[i].data.set,

                               }) 
                               );


		   	}
                               grid_tot();

                               flxRollProduction.getStore().removeAll();
                               txtrollno.setValue(Number(txtrollno.getValue())+1);
                               txtrollwt.setValue('');
                               txtRunMins.setValue('');
                               txtReason.setValue('');
                               txtbreaks.setValue(0);
                               txtRollTotalQty.setValue('');
                               txtRollTotalHrs.setValue('');
                               Ext.getCmp('rollvartyentry').hide()
                }

             }


                grid_tot();

                loadProdVarietyDatastore.removeAll();
                loadProdVarietyDatastore.load({
                    url: 'ClsProdnEntry.php', // File to connect to
                    params:
                            {
                                task: "loadProdVariety",
                                varcodes:varcodelist
                             },
                     callback: function () 
                     {

                     }    

                });



       }

   }
});    

var btnsubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "+",
    width   : 50,
    height  : 30,
    x       :860,
    y       : 5,
   labelStyle : "font-size:20px;font-weight:bold;color:#cc00cc",
   style      : "border-radius:10px;",
   tabindex : 1,
   listeners:{
       click: function(){       
	   var gstadd="true";


         if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
	    {
		alert("Select Variety Name..");
                gstadd="false";
                cmbVariety.setFocus(); 	
	    }

	    if(txtRollVarietyQty.getRawValue()=="" || txtRollVarietyQty.getValue()==0)
	    {
		alert("Quantity is Empty..");
                gstadd="false";
                txtRollVarietyQty.setFocus();
	    }
	    if(txtRollVarietyMins.getRawValue()=="" || txtRollVarietyMins.getValue()==0)
	    {
		alert("Running Minitues is Empty..");
                gstadd="false";
                txtRollVarietyMins.setFocus();
	    }
	    if(txtRollVarietySet.getRawValue()=="" || txtRollVarietySet.getValue()==0)
	    {
		alert("No of Set is Empty..");
                gstadd="false";
                txtRollVarietySet.setFocus();
	    }





            if(gstadd=="true")
            {

                
                flxRollProduction.getSelectionModel().selectAll();
                var selrows = flxRollProduction.getSelectionModel().getCount();
                var sel = flxRollProduction.getSelectionModel().getSelections();


               var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.qlycode === cmbVariety.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
			gridedit = "false";

                       	var idx = flxRollProduction.getStore().indexOf(editrow);
			sel[idx].set('quality' , cmbVariety.getRawValue());
			sel[idx].set('qlycode' , cmbVariety.getValue());
			sel[idx].set('qty'     , txtRollVarietyQty.getValue());
			sel[idx].set('mins'    , txtRollVarietyMins.getValue());
			sel[idx].set('set'     , txtRollVarietySet.getValue());

			flxproduction.getSelectionModel().clearSelections();

         


		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      


                                var RowCnt = flxRollProduction.getStore().getCount() + 1;
                                flxRollProduction.getStore().insert(
                                flxRollProduction.getStore().getCount(),
                                new dgrecord({

		                   quality  : cmbVariety.getRawValue(),
		                   qlycode  : cmbVariety.getValue(),
			           qty      : txtRollVarietyQty.getValue(),
				   mins     : txtRollVarietyMins.getValue(),
				   set      : txtRollVarietySet.getValue(),

                               }) 
                               );

                               txtRollVarietyQty.setValue('');
                               txtRollVarietySet.setValue('');
                               txtRollVarietyMins.setValue('');

                }

             }





       }
    }      



});


var btnadd_downtime = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 30,
    x       : 850,
    y       : 90,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
   style      : "border-radius:10px;",
	style:{'background':'#e8badf'},

   listeners:{
       click: function(){       
	   var gstadd="true";


	    if(cmbProdVariety.getRawValue()=="" || cmbProdVariety.getValue()==0)
	    {
		alert("Select Variety Name..");
                gstadd="false";
                cmbProdVariety.setFocus();
	    }

	    if(cmbdowntimedept.getRawValue()=="" || cmbdowntimedept.getValue()==0)
	    {
		alert("Select Department Name..");
                gstadd="false";
                cmbdowntimedept.setFocus();
	    }

	    if(cmbdownsection.getRawValue()=="" || cmbdownsection.getValue()==0)
	    {
		alert("Select Section Name..");
                gstadd="false";
                cmbdownsection.setFocus();
	    }
	    if(cmbdownequip.getRawValue()=="" || cmbdownequip.getValue()==0)
	    {
		alert("Select Equipment Name..");
                gstadd="false";
                cmbdownequip.setFocus();
	    }

	    if(txtStopReason.getRawValue()=="" || txtStopReason.getValue()==0)
	    {
		alert("DownTime Reason is Empty..");
                gstadd="false";
                txtStopReason.setFocus();
	    }
	    if(txtDownStartTime.getRawValue()=="" || txtDownStartTime.getValue()==0)
	    {
		alert("Strat Time is Empty..");
                gstadd="false";
                txtDownStartTime.setFocus();
	    }
	    if(txtDownEndTime.getRawValue()=="" || txtDownEndTime.getValue()==0)
	    {
		alert("End Time is Empty..");
                gstadd="false";
                txtDownEndTime.setFocus();
	    }



            if(gstadd=="true")
            {


                flxDownTime.getSelectionModel().selectAll();

                var selrows = flxDownTime.getSelectionModel().getCount();
                var sel = flxDownTime.getSelectionModel().getSelections();
                cnt = 0;

        	if(gridedit === "true")
	          {
alert(cmbProdVariety.getRawValue());
			gridedit = "false";

                       	var idx = flxDownTime.getStore().indexOf(editrow);
			sel[idx].set('quality'    , cmbProdVariety.getRawValue());
			sel[idx].set('qlycode'    , cmbProdVariety.getValue());
			sel[idx].set('department' , cmbdowntimedept.getRawValue());
			sel[idx].set('deptcode'   , cmbdowntimedept.getValue());
			sel[idx].set('section'    , cmbdownsection.getRawValue());
			sel[idx].set('seccode'    , cmbdownsection.getValue());
			sel[idx].set('equipment'  , cmbdownequip.getRawValue());
			sel[idx].set('equipcode'  , cmbdownequip.getValue());
			sel[idx].set('reason'     , txtStopReason.getRawValue());
			sel[idx].set('fromtime'   , txtDownStartTime.getRawValue());
			sel[idx].set('totime'     , txtDownEndTime.getRawValue());
			sel[idx].set('downMins'   , txtDownMin.getRawValue());
			


			flxDownTime.getSelectionModel().clearSelections();

         


		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      

//alert(cmbPPvariety.getRawValue());
                                var RowCnt = flxDownTime.getStore().getCount() + 1;
                                flxDownTime.getStore().insert(
                                flxDownTime.getStore().getCount(),
                                new dgrecord({
		                   quality     : cmbProdVariety.getRawValue(),
		                   qlycode     : cmbProdVariety.getValue(),

			           department  : cmbdowntimedept.getRawValue(),

                                   deptcode    : cmbdowntimedept.getValue(),

				   section     : cmbdownsection.getRawValue(),
				   seccode     : cmbdownsection.getValue(),
				   equipment   : cmbdownequip.getRawValue(),
				   equipcode   : cmbdownequip.getValue(),
			           reason      : txtStopReason.getRawValue(),
				   fromtime    : txtDownStartTime.getRawValue(),
				   totime      : txtDownEndTime.getRawValue(),
				   downMins    : txtDownMins.getRawValue(),


                               }) 
                               );
/*
                               txtrollno.setValue(Number(txtrollno.getValue())+1);
                               txtrollwt.setValue(0);
                               txtRunMins.setValue(0);
                               txtReason.setValue(0);
                               txtbreaks.setValue(0);
                               txtrollwt.setFocus();

*/
                }

             }





       }
    } 


});


var dgrecord = Ext.data.Record.create([]);

var flxproduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 160,
    hidden:false,
    width: 900,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:35,align:'left'},          
  //      {header: "QUALITY", dataIndex: 'quality',sortable:true,width:150,align:'left'},
//        {header: "QLYCIDE", dataIndex: 'qlycode',sortable:true,width:10,align:'left'},
        {header: "ROLL No", dataIndex: 'rollno',sortable:true,width:60,align:'left'},//0
        {header: "SPEED", dataIndex: 'speed',sortable:true,width:60,align:'left'},//14
        {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:50,align:'left'},//14
        {header: "DRAW", dataIndex: 'draw',sortable:true,width:50,align:'left'},//14
        {header: "IN TIME", dataIndex: 'intime',sortable:true,width:60,align:'left'},//14
        {header: "OUT TIME", dataIndex: 'outtime',sortable:true,width:60,align:'left'},//14
        {header: "RUN MINS", dataIndex: 'runmins',sortable:true,width:60,align:'left'},//2
        {header: "BREAKS", dataIndex: 'breaks',sortable:true,width:60,align:'left'},//3
        {header: "ROLL DIA", dataIndex: 'rolldia',sortable:true,width:60,align:'left'},//3
        {header: "ROLL WT(T)", dataIndex: 'rollwt',sortable:true,width:70,align:'left'},//1
        {header: "Reason for Loss", dataIndex: 'reason',sortable:true,width:90,align:'left'},//1
	{header: "PP No", dataIndex: 'ppno',sortable:true,width:60,align:'left',hidden:false},//15,hidden:true
        {header: "FIN WT(MT)", dataIndex: 'finwt',sortable:true,width:90,align:'left'},//16,hidden:true
    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'Production Entry',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Quality Selction -  NO to EDIT -  CANCEL to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxproduction.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

      

			}
		}
		else if (btn === 'cancel'){
			var sm = flxproduction.getSelectionModel();
			var selrow = sm.getSelected();
			flxproduction.getStore().remove(selrow);
			flxproduction.getSelectionModel().selectAll();
                        grid_tot();
		}
		}

     	});         
    	}
}
});


var flxDownTime = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:130,
    height: 160,
    hidden:false,
    width: 900,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY",    dataIndex: 'quality',sortable:true,width:150,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:10,align:'left'},//0
        {header: "Department", dataIndex: 'department',sortable:true,width:90,align:'left'},//1
        {header: "DeptCode",   dataIndex: 'deptcode',sortable:true,width:1,align:'left'},//2
        {header: "Section",    dataIndex: 'section',sortable:true,width:60,align:'left'},//3
	{header: "Sec.Code",   dataIndex: 'seccode',sortable:true,width:10,align:'left',hidden:false},//15,hidden:true
        {header: "Equipment",  dataIndex: 'equipment',sortable:true,width:60,align:'left'},//3
	{header: "Equip.Code", dataIndex: 'equipcode',sortable:true,width:10,align:'left',hidden:false},//15,hidden:true
        {header: "Reason",     dataIndex: 'reason',sortable:true,width:70,align:'left'},//14
        {header: "From",       dataIndex: 'fromtime',sortable:true,width:70,align:'left'},//14
        {header: "To",         dataIndex: 'totime',sortable:true,width:70,align:'left'},//16,hidden:true
        {header: "Down Mins",  dataIndex: 'downMins',sortable:true,width:70,align:'left'},//16,hidden:true
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

var flxRollProductionDetailed = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 125,
    hidden:false,
    width: 450,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "Roll No",    dataIndex: 'rollno',sortable:false,width:80,align:'left'},
        {header: "QUALITY",    dataIndex: 'quality',sortable:false,width:130,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:10,align:'left'},//0
        {header: "Qty (t)",    dataIndex: 'qty' ,sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Mins",       dataIndex: 'mins' ,sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Set",        dataIndex: 'set',sortable:true,width:60,align:'left'},//16,hidden:true

    ],
	store : [],
    listeners:{	
    }
});   


var flxRollProduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 125,
    hidden:false,
    width: 330,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY",    dataIndex: 'quality',sortable:true,width:130,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:10,align:'left'},//0
        {header: "Qty (t)",    dataIndex: 'qty',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Mins",       dataIndex: 'mins',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Set",        dataIndex: 'set',sortable:true,width:60,align:'left'},//16,hidden:true

    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ROLL',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxRollProduction.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;


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
			}
		}
		else if (btn === 'no'){
			var sm = flxRollProduction.getSelectionModel();
			var selrow = sm.getSelected();
			flxRollProduction.getStore().remove(selrow);
			flxRollProduction.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});




//PANEL



var tabProductionEntryPanel = new Ext.TabPanel({
    id          : 'tabProductionEntryPanel',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 690,
    width       : 1340,
    x           : 2,
    items       : [
           {
             xtype: 'panel',
             title: 'Production Entry',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items       : [
		    { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : false,
		        height  : 515,
		        width   : 1350,
			//style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
//INSIDE
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 180,
                                	x           : 0,
                                	y           : -10,
                                  	border      : false,
                                	items: [dtproddate]
                                },

                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 300,
                                	x           : 200,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 340,
                                	x           : 470,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmboperator]
                                  },  

			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 140,
                                	x           : 780,
                                	y           : -10,
                                  	border      : false,
                                	items: [cmbshift]
                                 },

              	                 {
		                       xtype   : 'fieldset',
		                       title   : '',
		                       layout  : 'hbox',
		                       border  : false,
		                       height  : 450,
		                       width   : 1320,
//			               style:{ border:'1px solid light blue',color:' #581845 '},
		                       layout  : 'absolute',
		                       x       : -10,
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
					       xtype   : 'fieldset',
					       title   : 'Rollwise Machine Production Entry',
					       layout  : 'hbox',
					       border  : true,
					       height  : 240,
					       width   : 1300,
					       style:{ border:'1px solid blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 0,
					       y       : 40,
					       items:[
					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 51,
							width       : 200,
							x           : 10,
							y           : -15,
						    	border      : false,
							items: [lblRollNo]
						   },
	
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 5,
							width       : 120,
							x           : -10,
							y           : 5,
						    	border      : false,
							items: [txtrollno]
						    },
						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 0,
							width       : 350,
							x           : 80,
							y           : -15,
						    	border      : false,
						    	items: [lblspeed]
						   },
						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 70,
							y           : 5,
						    	border      : false,
							items: [txtspeed]
						   },



						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 130,
							x           : 130,
							y           : -15,
						    	border      : false,
						    	items: [lbldeckle]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 125,
							y           : 05,
						    	border      : false,
							items: [txtdeckle]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 130,
							x           : 200,
							y           : -15,
						    	border      : false,
						    	items: [lblDraw]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 190,
							y           : 05,
						    	border      : false,
							items: [txtDraw]
						   },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 255,
							y           : -15,
						    	border      : false,
							items: [lblInTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 250,
							y           : 05,
						    	border      : false,
							items: [txtInTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 340,
							y           : -15,
						    	border      : false,
							items: [lblOutTime]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 330,
							y           : 5,
						    	border      : false,
							items: [txtOutTime]
						    },



					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 200,
							x           : 415,
							y           : -15,
						    	border      : false,
							items: [lblRunMins]
						   },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 120,
							x           : 400,
							y           : 5,
						    	border      : false,
							items: [txtRunMins]
						    }, 


					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 51,
							width       : 200,
							x           : 485,
							y           : -15,
						    	border      : false,
							items: [lblBreaks]
						   },
 						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 120,
							x           : 470,
							y           : 5,
						    	border      : false,
							items: [txtbreaks]
						    },
					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 200,
							x           : 540,
							y           : -15,
						    	border      : false,
							items: [lblRollDia]
						   },
 						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 120,
							x           : 530,
							y           : 5,
						    	border      : false,
							items: [txtRollDia]
						    },


					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 200,
							x           : 605,
							y           : -15,
						    	border      : false,
							items: [lblRollWt]
						   },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 5,
							width       : 120,
							x           : 595,
							y           : 5,
						    	border      : false,
							items: [txtrollwt]
						    }, 

					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 200,
							x           : 690,
							y           : -15,
						    	border      : false,
							items: [lblReason]
						   },						   


     						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 250,
							x           : 670,
							y           : 5,
						    	border      : false,
							items: [txtReason]
						    },
                                                    btnadd ,flxproduction]
					     },
                			   { 
					       xtype   : 'fieldset',
					       title   : '',
                                               id      : 'rollvartyentry',   
					       layout  : 'hbox',
					       border  : true,
					       height  : 235,
					       width   : 370,
					       style:{ border:'1px light blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 930,
					       y       : 45,
					       items:[

							  { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 300,
								x           : 0,
								y           : -10,
							    	border      : false,
								items: [cmbVariety]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 300,
								x           : 280,
								y           : 15,
							    	border      : false,
								items: [btnsubmit]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 300,
								x           : 0,
								y           : 15,
							    	border      : false,
								items: [txtRollVarietyQty]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 25,
								width       : 100,
								x           : 200,
								y           : 15,
							    	border      : false,
								items: [txtRollVarietySet]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 30,
								width       : 100,
								x           : 125,
								y           : 15,
							    	border      : false,
								items: [txtRollVarietyMins]
							   },

							  { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 400,
								x           : 10,
								y           : 50,
							    	border      : false,
								items: [flxRollProduction]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 20,
								width       : 300,
								x           : 10,
								y           : 180,
							    	border      : false,
								items: [btnRollConfirm]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 60,
								width       : 300,
								x           : 100,
								y           : 180,
							    	border      : false,
								items: [txtRollTotalQty]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  :50,
								width       : 300,
								x           : 220,
								y           : 180,
							    	border      : false,
								items: [txtRollTotalHrs]
							   },





                                               ]
                                             },
                			   { 
					       xtype   : 'fieldset',
					       title   : 'Roll / Variety Details ',
  					       layout  : 'hbox',
					       border  : true,
					       height  : 150,
					       width   : 1300,
					       style:{ border:'1px solid blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 0,
					       y       : 280,
					       items:[

                                                     flxRollProductionDetailed,

			                             { 
						       xtype   : 'fieldset',
							title   : 'Shift Details',
							layout  : 'hbox',
							border  : true,
							height  : 85,
							width   : 235,
							style:{ border:'1px solid blue',color:' #9999ff'},
							layout  : 'absolute',
							x       : 470,
							y       : 20,

				 			items:[
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : -10,
									y           : -10,
								    	border      : false,
									items: [lblShiftProdn]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 70,
									y           : -10,
								    	border      : false,
									items: [lblShiftrunmins]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 140,
									y           : -10,
								    	border      : false,
									items: [lblShiftDownHrs]
								   },

								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : -15,
									y           : 15,
								    	border      : false,
									items: [txtshiftmcprod]
								   },


								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : 60,
									y           : 15,
								    	border      : false,
									items: [txtShiftrunmins]
								   },
						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 250,
									x           : 90,
									y           : 15,
								    	border      : false,
									items: [txtshiftdowntime]
								   },


                                                          ]
                                                     },


						     { 
							        xtype   : 'fieldset',
								title   : 'Today Details',
								layout  : 'hbox',
								border  : true,
								height  : 85,
								width   : 235,
								style:{ border:'1px solid blue',color:' #581845 '},
								layout  : 'absolute',
								x       : 730,
								y       : 20,

					 			items:[
									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 100,
										width       : 250,
										x           : -10,
										y           : -10,
									    	border      : false,
										items: [lblTodayProdn]
									   },
									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 100,
										width       : 250,
										x           : 70,
										y           : -10,
									    	border      : false,
										items: [lblTodayrunmins]
									   },
									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 100,
										width       : 250,
										x           : 140,
										y           : -10,
									    	border      : false,
										items: [lblTodayDownHrs]
									   },

									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 10,
										width       : 250,
										x           : -15,
										y           : 15,
									    	border      : false,
										items: [txtTodaymcprod]
									   },


									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 10,
										width       : 250,
										x           : 60,
										y           : 15,
									    	border      : false,
										items: [txtTodayrunmins]
									   },
							 		  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 50,
										width       : 250,
										x           : 90,
										y           : 15,
									    	border      : false,
										items: [txtTodaydowntime]
									   },
                                                                ]
		                                       },    


					   { 
						       xtype   : 'fieldset',
							title   : 'UPTO DATE Details',
							layout  : 'hbox',
							border  : true,
							height  : 300,
							width   : 235,
							style:{ border:'1px solid blue',color:' #581845 '},
							layout  : 'absolute',
							x       : 970,
							y       : 0,

				 			items:[
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : -10,
									y           : -10,
								    	border      : false,
									items: [lblUptoDateProdn]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 70,
									y           : -10,
								    	border      : false,
									items: [lblUptoDaterunmins]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 140,
									y           : -10,
								    	border      : false,
									items: [lblUptoDateDownHrs]
								   },

								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : -15,
									y           : 15,
								    	border      : false,
									items: [txtmonthuptomcprod]
								   },


								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : 60,
									y           : 15,
								    	border      : false,
									items: [txtmonthuptomcrunmins]
								   },
						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 250,
									x           : 90,
									y           : 15,
								    	border      : false,
									items: [txtmonthuptomcdowntime]
								   } ,

                                                                 flxMonthdowntime, 

                                                     ]
                                            },    



                                               ]
                                             },

				           ],
                                     },
                      ], 
                     },		 
                       
	          ],

           },

             {
             xtype: 'panel',
             title: 'Down Time Entry',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items       : [
  					    { 		
					       xtype   : 'fieldset',
					       title   : 'Down time Entry',
					       layout  : 'hbox',
					       border  : true,
					       height  : 400,
					       width   : 1030,
					       style:{ border:'1px solid blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 0,
					       y       : 25,
					       items:[
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 0,
							y           : 0,
						    	border      : false,
							items: [cmbProdVariety]
						    },
				       
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 0,
							y           : 30,
						    	border      : false,
							items: [lblDepartment]
						    },
				       
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 230,
							y           : 30,
						    	border      : false,
							items: [lblSection]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 480,
							y           : 30,
						    	border      : false,
							items: [lblEquipment]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 700,
							y           : 30,
						    	border      : false,
							items: [lblFromTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 800,
							y           : 30,
						    	border      : false,
							items: [lblToTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 900,
							y           : 30,
						    	border      : false,
							items: [lblDownHrs]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 300,
							x           : -15,
							y           : 50,
						    	border      : false,
							items: [cmbdowntimedept]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 280,
							x           : 200,
							y           : 50,
						    	border      : false,
							items: [cmbdownsection]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 300,
							x           : 460,
							y           : 50,
						    	border      : false,
							items: [cmbdownequip]
						    },



						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 700,
							y           : 50,
						    	border      : false,
							items: [txtDownStartTime]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 800,
							y           : 50,
						    	border      : false,
							items: [txtDownEndTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 455,
							x           : 900,
							y           : 50,
						    	border      : false,
							items: [txtDownMins]
						    }, 

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 110,
							width       : 500,
							x           : 0,
							y           : 90,
						    	border      : false,
							items: [txtStopReason]
						    },
					  		btnadd_downtime,   flxDownTime, 
						],
				            },
             ]    
             },
             {
             xtype: 'panel',
             title: 'Power & Steam Com Entry',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items       : [
             ]    
             },
    ],
});  


















       
var TrnProdnFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PRODUCTION ENTRY',
        header      : false,
        width       : 1340,	
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
            xtype: 'toolbar',bodyStyle: "background: #9999ff;",
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

//save
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {

                  var gstSave;

//alert(flxDetail.getStore().getCount());		 
  
                    gstSave="true";
		    if (flxproduction.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
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

                            var DownTimeData = flxDownTime.getStore().getRange();                                        
                            var DownTimeupData = new Array();
                            Ext.each(DownTimeData, function (record) {
                                DownTimeupData.push(record.data);
                            });


                            var ProdData = flxproduction.getStore().getRange();                                        
                            var ProdupData = new Array();
                            Ext.each(ProdData, function (record) {
                                ProdupData.push(record.data);
                            });


                            var RollData = flxRollProductionDetailed.getStore().getRange();                                        
                            var RollupData = new Array();
                            Ext.each(RollData, function (record) {
                                RollupData.push(record.data);
                            });


//alert(cmbPO.getRawValue());

                            Ext.Ajax.request({
                            url: 'TrnProdnEntrySave.php',
                            params :
                             {
				cntdowntime: DownTimeData.length,
                               	griddet_downtime: Ext.util.JSON.encode(DownTimeupData),    
                     
				cnt: ProdData.length,
                               	griddet: Ext.util.JSON.encode(ProdupData),    

				cntRoll: RollData.length,
                               	griddet_roll : Ext.util.JSON.encode(RollupData),    

                                savetype:gstFlag,

                             	prdhcompcode   : Gincompcode,
				prdhfincode    : GinFinid,
				prdhdate       : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
				prdhshift      : cmbshift.getRawValue(),
		                prdhspvrcode   : cmbsupervisor.getValue(),
				prdhoperator   : cmboperator.getValue(),
                                prdhppno       : Number(cmbPPNo.getValue()),
				prdhvariety    : Number(cmbPPvariety.getValue()),
	 	 		prdhavlhrs     : Number(txtShiftrunmins.getValue()),
				prdhrunmins    : Number(txtShiftrunmins.getRawValue()),
				prdhdownmins   : Number(txtshiftdowntime.getRawValue()),
				prdhprodn      : Number(txtshiftmcprod.getRawValue()),
				prdhopenpulp   : Number(txtOpPulp.getRawValue()),
				prdhclosepulp  : Number(txtCloPulp.getRawValue()),
				prdhopenbroke  : Number(txtOpBroke.getRawValue()),
				prdhclosebroke : Number(txtCloBroke.getRawValue()),
				prdhpower      : Number(txtPower.getRawValue()),
				prdhsteam      : Number(txtSteam.getRawValue()),


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                    
                                    Ext.MessageBox.alert("Production Entry Saved -" + obj['msg']);
                                    TrnProdnFormpanel.getForm().reset();
                                    flxproduction.getStore().removeAll();
                                    flxRollProductionDetailed.getStore().removeAll();
                                    flxDownTime.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Production Entry Not Saved! Pls Check!- " + obj['msg']);                                                  
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

                items: [tabProductionEntryPanel,
/*
 		           { 
		               xtype   : 'fieldset',
				title   : 'PRODUCTION PERFORMANCE',
				layout  : 'hbox',
				border  : true,
				height  : 515,
				width   : 260,
				style:{ border:'1px solid blue',color:' #581845 '},
				layout  : 'absolute',
				x       : 1070,
				y       : 10,

	 			items:[
   

		





						 	
					],

				},
*/

],



        
    });

function RefreshData()
{

        Ext.getCmp('rollvartyentry').hide()
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

	loadVarietyDatastore.removeAll();
	loadVarietyDatastore.load({
	 url: 'ClsProdnEntry.php',
		params: {
	    	   task: 'loadVariety',

		 },
		 callback:function()
		   {

		   } 
	  });


}

    var TrnProdnEntry = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 25,
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
