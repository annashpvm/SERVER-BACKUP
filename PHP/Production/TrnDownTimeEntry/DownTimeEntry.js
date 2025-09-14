Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";

   var gridedit_downtime = "false";


   var prodseqno = 0;
   var gstFlag = "Add";

   var  downtype = localStorage.getItem('DOWNTYPE');

   var QlyCode = 0;
 
function grid_tot_downtime()
{
	totmins=0;
        var Row =  flxDownTime.getStore().getCount();

        var Row= flxDownTime.getStore().getCount();
        flxDownTime.getSelectionModel().selectAll();
        var sel=flxDownTime.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
                 totmins=totmins+Number(sel[i].data.downmins);
        }
        txtTotalDownMins.setValue(totmins);

        flxDownTime.getSelectionModel().clearSelections();

}

var loadDataCheckDatastore = new Ext.data.Store({
      id: 'loadDataCheckDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadProdnDataCheck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos' 
      ]),
    });

var loadDataCheckDatastore2 = new Ext.data.Store({
      id: 'loadDataCheckDatastore2',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadProdnDataCheck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos' 
      ]),
    });
function  shift_Prodn_data_check()
{
        rdate = dtproddate.getValue();
        loadDataCheckDatastore.removeAll();
	loadDataCheckDatastore.load({
	url: 'ClsDownTimeEntry.php',
	params: {
		    task     : 'loadProdnDataCheck',
	            finid    : GinFinid,
		    compcode : Gincompcode,
                    shift1   : cmbShift.getValue(),
                    edate    : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
                },
       	callback:function()
		{
                    datafound = loadDataCheckDatastore.getAt(0).get('nos');
                    if (datafound == 0) 
	            {
	                Ext.getCmp('downdetail').setDisabled(true);
                             alert("Shift Production data for the Date " + Ext.util.Format.date(rdate,"d-m-Y") + " Shift "+ cmbShift.getValue() + " is not Available" );

	            }     
	            else
	            {
	                Ext.getCmp('downdetail').setDisabled(false);
	            }
                 }
        });
}




function  shift_Prodn_data_check2()
{
        rdate = dtproddate.getValue();
        loadDataCheckDatastore2.removeAll();
	loadDataCheckDatastore2.load({
	url: 'ClsDownTimeEntry.php',
	params: {
		    task     : 'loadProdnDataCheck',
	            finid    : GinFinid,
		    compcode : Gincompcode,
                    shift1   : cmbShift.getValue(),
                    edate    : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
                },
       	callback:function()
		{
                    datafound = loadDataCheckDatastore2.getAt(0).get('nos');
                    if (datafound == 0) 
	            {
	                Ext.getCmp('downdetail').setDisabled(false);
	            }     
	            else
	            {
	                alert("Data Already Entered.. You  can't give SHUT entries ...")
	                Ext.getCmp('downdetail').setDisabled(true);
	            }
                }
        });
}

var loadShiftDownTimeDatastore = new Ext.data.Store({
      id: 'loadShiftDownTimeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftDownTime"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'prds_qlycode','prds_dept', 'prds_section', 'prds_equipment', 'prds_starttime', 'prds_endtime', 'prds_mins', 'prds_nature_of_breakdown', 'var_desc', 'section_name','equip_name','department_name', 'prds_rootcause', 'prds_actiontaken', 'prds_correctiveaction','prds_id'

      ]),
    });



var loadVarietyListDatastore = new Ext.data.Store({
      id: 'loadVarietyListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarietyList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode','prd_seqno'
      ]),
    });
var loadSectionDatastore = new Ext.data.Store({
      id: 'loadSectionDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
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
                url: 'ClsDownTimeEntry.php',      // File to connect to
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


var loadDepartmentDatastore = new Ext.data.Store({
      id: 'loadDepartmentDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDownTimeEntry.php',      // File to connect to
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



var lblDate = new Ext.form.Label({
	fieldLabel  : 'Date',
	id          : 'lblDate',
	name        : 'lblDate',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblShift = new Ext.form.Label({
	fieldLabel  : 'Shift',
	id          : 'lblShift',
	name        : 'lblShift',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblQuality = new Ext.form.Label({
	fieldLabel  : 'Quality',
	id          : 'lblQuality',
	name        : 'lblQuality',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 




var dtproddate = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    width : 100,
	listeners:{
        select: function(){
            getData();
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbShift.focus();
             }
          }

	}
});

var cmbShift = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbShift',
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
            getData();

	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbQuality.focus();
             }
          }
	}
   });


var cmbDepartment = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbDepartment',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDepartmentDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
	listeners:{
        select: function(){
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbSection.focus();
             }
          }
	}
   });
var cmbSection = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 280,
        displayField    : 'section_name', 
        valueField      : 'section_code',
        hiddenName      : '',
        id              : 'cmbSection',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSectionDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
	listeners:{
        select: function(){
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtStartTime.focus();
             }
          }
	}
   });

var cmbEquipment = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 280,
        displayField    : 'equip_name', 
        valueField      : 'equip_code',
        hiddenName      : '',
        id              : 'cmbEquipment',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEquipmentDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
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



var cmbRootCause = new Ext.form.ComboBox({
        fieldLabel      : 'Root Cause',
        width           : 500,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbRootCause',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DUST PASSED','SLIME PASSED','UNKNOWN'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",  
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'119'},
	listeners:{
        select: function(){
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbActionTaken.focus();
             }
          }
	}
   });
var cmbActionTaken = new Ext.form.ComboBox({
        fieldLabel      : 'Action Taken',
        width           : 500,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbActionTaken',
        typeAhead       : true,
        mode            : 'local',
        store           : ['REELED', 'WORK COMPLETED AND PAPER REELED.'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'119'},   
	listeners:{
        select: function(){
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbCorrectiveAction.focus();
             }
          }
	}
   });

var cmbCorrectiveAction = new Ext.form.ComboBox({
        fieldLabel      : 'Corrective Action',
        width           : 500,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbCorrectiveAction',
        typeAhead       : true,
        mode            : 'local',
        store           : ['WILL BE ANALYSED'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;", 
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'119'},       
	listeners:{
        select: function(){
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnadd_downtime.focus();
             }
          }
	}
   });


var cmbQuality = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 170,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbQuality',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
    	enableKeyEvents: true,     
	listeners:{
        select: function(){

                QlyCode = cmbQuality.getValue();
	},
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbDepartment.focus();
             }
          }
	}
});


function getData()
{

 if (downtype == "SHIFT")
 { 
	loadVarietyListDatastore.removeAll();
	loadVarietyListDatastore.load({
	 url: 'ClsDownTimeEntry.php',
		params: {
	    	   task: 'loadVarietyList',
		   compcode: Gincompcode,
		   finid   : GinFinid,
                   shift1  : cmbShift.getRawValue(),
                   edate   : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),  
		 },
		 callback:function()
		   {
                         prodseqno = 0;
                         var cnt=loadVarietyListDatastore.getCount(); 
                         if (cnt >0)
                         {    
                            prodseqno = loadVarietyListDatastore.getAt(0).get('prd_seqno');
                         }   
		   } 
	  });
  }
  else
  {
     var newdata ='MACHINE SHUT';
     cmbQuality.reset();
//     cmbQuality.store.loaddata(newdata);
   cmbQuality.setRawValue('MACHINE SHUT');
//   cmbQuality.setValue('193');
  }
}


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


var loadSupervisorDatastore = new Ext.data.Store({
      id: 'loadSupervisorDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',      // File to connect to
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

var loadShiftInchargeDatastore = new Ext.data.Store({
      id: 'loadShiftInchargeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftIncharge"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code', 'spvr_name', 'spvr_type'
      ]),
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
   
var cmbShiftIncharge = new Ext.form.ComboBox({
        fieldLabel      : 'Shift Incharge',
        width           : 150,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbShiftIncharge',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShiftInchargeDatastore,
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


/*



var lblRootCause = new Ext.form.Label({
	fieldLabel  : 'Root Cause',
	id          : 'lblRootCause',
	name        : 'lblRootCause',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblActionTaken = new Ext.form.Label({
	fieldLabel  : 'Action Taken',
	id          : 'lblActionTaken',
	name        : 'lblActionTaken',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblCorrectiveAction = new Ext.form.Label({
	fieldLabel  : 'Corrective Action',
	id          : 'lblCorrectiveAction',
	name        : 'lblCorrectiveAction',
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

var lblReason = new Ext.form.Label({
	fieldLabel  : 'Nature of Break Down',
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


*/

function find_downmins()
{
   txtDownMins.setValue("");
   var dt3 = txtStartTime.getValue();
   var dt4 = txtEndTime.getValue();
   var diffMs2 = (dt4.getTime()-dt3.getTime());
   if (diffMs2 >0)
   {
       txtDownMins.setValue(diffMs2/60000);
   }

}




var txtStartTime = new Ext.form.DateField({
    fieldLabel : 'FROM TIME',
    id         : 'txtStartTime',
    name       : 'txtStartTime',
    width       :  140,
    format     : 'd-m-Y H.i',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtEndTime.focus();
             }
          },
           keyup:function(){
                  find_downmins();
    //              txtEndTime.setValue(txtStartTime.getValue());
           },
           blur:function(){
//                  txtEndTime.setValue(txtStartTime.getValue());
                  find_downmins();
           }
        }   
});

var txtEndTime = new Ext.form.DateField({
	fieldLabel  : 'TO TIME',
	id          : 'txtEndTime',
	name        : 'txtEndTime',
	width       :  140,
        format     : 'd-m-Y H.i',
        value      : new Date(),
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBreakDownReason.focus();
             }
          },
           keyup:function(){
                  find_downmins();
      //            txtEndTime.setValue(txtEndTime.getValue());
           },
           blur:function(){
        //          txtEndTime.setValue(txtEndTime.getValue());
                  find_downmins();
           }
        }   

});


var txtDownMins = new Ext.form.NumberField({
	fieldLabel  : 'DOWN MINS',
	id          : 'txtDownMins',
	name        : 'txtDownMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});


var txtTotalDownMins = new Ext.form.NumberField({
	fieldLabel  : 'Total Down Minitues',
	id          : 'txtTotalDownMins',
	name        : 'txtTotalDownMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});


var txtBreakDownReason = new Ext.form.TextField({
	fieldLabel  : 'Nature of Break Down',
	id          : 'txtBreakDownReason',
	name        : 'txtBreakDownReason',
	width       :  500,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'119'},
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbRootCause.focus();
             }
          }
        } 

});


var btnadd_downtime = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 100,
    height  : 50,
    x       : 800,
    y       : 150,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "border-radius:10px;",
//	style:{'background':'#e8badf'},
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

   listeners:{
       click: function(){       
	   var gstadd="true";

            if (downtype == "SHIFT")
            { 
		    if(cmbQuality.getRawValue()=="" || cmbQuality.getValue()==0)
		    {
			alert("Select Variety Name..");
		        gstadd="false";
		        cmbQuality.setFocus();
		    }
            }
	    if(cmbDepartment.getRawValue()=="" || cmbDepartment.getValue()==0)
	    {
		alert("Select Department Name..");
                gstadd="false";
                cmbDepartment.setFocus();
	    }

	    if(cmbSection.getRawValue()=="" || cmbSection.getValue()==0)
	    {
		alert("Select Section Name..");
                gstadd="false";
                cmbSection.setFocus();
	    }

	    if(txtBreakDownReason.getRawValue()=="" || txtBreakDownReason.getValue()==0)
	    {
		alert("DownTime Reason is Empty..");
                gstadd="false";
                txtBreakDownReason.setFocus();
	    }
	    if(txtStartTime.getRawValue()=="" || txtStartTime.getValue()==0)
	    {
		alert("Strat Time is Empty..");
                gstadd="false";
                txtStartTime.setFocus();
	    }
	    if(txtEndTime.getRawValue()=="" || txtEndTime.getValue()==0)
	    {
		alert("End Time is Empty..");
                gstadd="false";
                txtEndTime.setFocus();
	    }
            if(gstadd=="true")
            {

                flxDownTime.getSelectionModel().selectAll();
                var selrows = flxDownTime.getSelectionModel().getCount();
                var sel = flxDownTime.getSelectionModel().getSelections();
                cnt = 0;

        	if(gridedit_downtime === "true")
	          {
//alert(cmbQuality.getRawValue());

			gridedit_downtiem = "false";

                       	var idx = flxDownTime.getStore().indexOf(editrow_downtime);
			sel[idx].set('quality'    , cmbQuality.getRawValue());
			sel[idx].set('qlycode'    , QlyCode); //cmbQuality.getValue());
			sel[idx].set('department' , cmbDepartment.getRawValue());
			sel[idx].set('deptcode'   , cmbDepartment.getValue());
			sel[idx].set('section'    , cmbSection.getRawValue());
			sel[idx].set('seccode'    , cmbSection.getValue());

			sel[idx].set('reason'     , txtBreakDownReason.getRawValue());
			sel[idx].set('fromtime'   , txtStartTime.getRawValue());
			sel[idx].set('totime'     , txtEndTime.getRawValue());
			sel[idx].set('downmins'   , txtDownMins.getRawValue());
			sel[idx].set('rootcause'  , cmbRootCause.getRawValue());
			sel[idx].set('actiontaken'  , cmbActionTaken.getRawValue());
			sel[idx].set('correctiveaction'  , cmbCorrectiveAction.getRawValue());			


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
 		                   quality     : cmbQuality.getRawValue(),
		                   qlycode     : QlyCode, //cmbQuality.getValue(),

			           department  : cmbDepartment.getRawValue(),
                                   deptcode    : cmbDepartment.getValue(),
				   section     : cmbSection.getRawValue(),
				   seccode     : cmbSection.getValue(),

			           reason      : txtBreakDownReason.getRawValue(),
				   fromtime    : txtStartTime.getRawValue(),
				   totime      : txtEndTime.getRawValue(),
				   downmins    : txtDownMins.getRawValue(),


			           rootcause   :  cmbRootCause.getRawValue(),
			           actiontaken :  cmbActionTaken.getRawValue(),
			           correctiveaction : cmbCorrectiveAction.getRawValue(),			

                               }) 
                               );
                               txtDownMins.setValue();
                               txtBreakDownReason.setRawValue('')
/*
                               txtRollNo.setValue(Number(txtRollNo.getValue())+1);
                               txtRollWt.setValue(0);

                               txtReason.setValue(0);
                               txtBreaks.setValue(0);
                               txtRollWt.setFocus();

*/
                }

             }


     grid_tot_downtime();


       }
    } 


});


var dgrecord = Ext.data.Record.create([]);

var flxDownTime = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:220,
    height: 160,
    hidden:false,
    width: 1300,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY",    dataIndex: 'quality',sortable:false,width:150,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:80,align:'left',hidden:false},//0
        {header: "Department", dataIndex: 'department',sortable:true,width:100,align:'left'},//1
        {header: "DeptCode",   dataIndex: 'deptcode',sortable:true,width:1,align:'left',hidden:true},//2
        {header: "Section",    dataIndex: 'section',sortable:true,width:150,align:'left'},//3
	{header: "Sec.Code",   dataIndex: 'seccode',sortable:true,width:10,align:'left',hidden:true},//15,hidden:true
        //{header: "Equipment",  dataIndex: 'equipment',sortable:true,width:150,align:'left'},//3
//	{header: "Equip.Code", dataIndex: 'equipcode',sortable:true,width:10,align:'left',hidden:true},//15,hidden:true

        {header: "From",       dataIndex: 'fromtime',sortable:true,width:115,align:'left'},//14
        {header: "To",         dataIndex: 'totime',sortable:true,width:115,align:'left'},//16,hidden:true
        {header: "Down Mins",  dataIndex: 'downmins',sortable:true,width:70,align:'left'},//16,hidden:true
        {header: "Nature of Break Down",     dataIndex: 'reason',sortable:true,width:140,align:'left'},//14
        {header: "Root Cause",     dataIndex: 'rootcause',sortable:true,width:140,align:'left'},//14
        {header: "Action Taken",     dataIndex: 'actiontaken',sortable:true,width:140,align:'left'},//14
        {header: "Corrective Action",dataIndex: 'correctiveaction',sortable:true,width:120,align:'left'},//14

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
			var sm = flxDownTime.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit_downtime = "true";
				editrow_downtime = selrow;

				        cmbQuality.setRawValue(selrow.get('quality'));
				        cmbQuality.setValue(selrow.get('qlycode'));
				        cmbDepartment.setRawValue(selrow.get('department'));
				        cmbDepartment.setValue(selrow.get('deptcode'));
				        cmbSection.setRawValue(selrow.get('section'));
				        cmbSection.setValue(selrow.get('seccode'));
                                        QlyCode = selrow.get('qlycode');


		                        txtBreakDownReason.setRawValue(selrow.get('reason'));

//					txtStartTime.setValue(selrow.get('fromtime'));
					//txtEndTime.setValue(selrow.get('totime'));
			txtStartTime.setValue(Ext.util.Format.date(selrow.get('fromtime'),"d-m-Y H.i"));
			txtEndTime.setValue(Ext.util.Format.date(selrow.get('totime'),"d-m-Y H.i"));
	

					txtDownMins.setRawValue(selrow.get('downmins'));		

				        cmbRootCause.setRawValue(selrow.get('rootcause'));
				        cmbActionTaken.setRawValue(selrow.get('actiontaken'));
				        cmbCorrectiveAction.setRawValue(selrow.get('correctiveaction'));



                                        flxDownTime.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxDownTime.getSelectionModel();
			var selrow = sm.getSelected();
			flxDownTime.getStore().remove(selrow);
			flxDownTime.getSelectionModel().selectAll();
                        grid_tot_downtime();
		}
		}

     	});         
    	}
}
});
//PANEL
var tabProductionDownTime = new Ext.TabPanel({
    id          : 'tabProductionDownTime',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 690,
    width       : 1340,
    x           : 2,
    items       : [
             {
             xtype: 'panel',
             title: 'Down Time Entry',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items       : [
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 30,
                                	y           : 10,
                                  	border      : false,
                                	items: [lblDate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 20,
                                	width       : 200,
                                	x           : 00,
                                	y           : 30,
                                  	border      : false,
                                	items: [dtproddate]
                                },

			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 180,
                                	y           : 10,
                                  	border      : false,
                                	items: [lblShift]
                                },



			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 140,
                                	x           : 140,
                                	y           : 30,
                                  	border      : false,
                                	items: [cmbShift]
                                 },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 300,
                                	y           : 10,
                                  	border      : false,
                                	items: [lblQuality]
                                },
				   { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 500,
					x           : 250,
					y           : 30,
				    	border      : false,
					items: [cmbQuality]
				    },
			       
				   { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 500,
					x           : 530,
					y           : 10,
				    	border      : false,
					items: [lblDepartment]
				    },
		       
				   { 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 500,
					x           : 800,
					y           : 10,
				    	border      : false,
					items: [lblSection]
				    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 300,
							x           : 470,
							y           : 30,
						    	border      : false,
							items: [cmbDepartment]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 320,
							x           : 700,
							y           : 30,
						    	border      : false,
							items: [cmbSection]
						    },


	     {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                id      : 'downdetail',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid blue;border-radius:5px;",              
                height		: 435,
                width		: 1300,
                layout        	: 'absolute',
                x		: 10,
                y		: 70,
                items:[ 

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 350,
							x           : 20,
							y           : 10,
						    	border      : false,
							items: [txtStartTime]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 350,
							x           : 20,
							y           : 40,
						    	border      : false,
							items: [txtEndTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 255,
							x           : 330,
							y           : 40,
						    	border      : false,
							items: [txtDownMins]
						    }, 

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 680,
							x           : 20,
							y           : 70,
						    	border      : false,
							items: [txtBreakDownReason]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 700,
							x           : 20,
							y           : 100,
						    	border      : false,
							items: [cmbRootCause]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 700,
							x           : 20,
							y           : 130,
						    	border      : false,
							items: [cmbActionTaken]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 700,
							x           : 20,
							y           : 160,
						    	border      : false,
							items: [cmbCorrectiveAction]
						    },



					  		btnadd_downtime,   flxDownTime, 

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 150,
							width       : 500,
							x           : 550,
							y           : 380,
						    	border      : false,
							items: [txtTotalDownMins]
						    },
                 ]
            },


	     {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                id      : 'mcshut',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid blue;border-radius:5px;",              
                height		: 105,
                width		: 300,
                layout        	: 'absolute',
                x		: 1000,
                y		: 90,
                items:[ 
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 0,
                                	y           : 10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 340,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbShiftIncharge]
                                  },  

                ]
             } ,  


             ] ,


   
             },
			  
             ]    

});  

       
var TrnProdnDownTimePanel = new Ext.FormPanel({
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
        id          : 'TrnProdnDownTimePanel',
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
		    text: 'New',
		    style  : 'text-align:center;',
		    tooltip: 'Add New Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		    align : 'right',
		    icon: '/Pictures/Add.png',
		    listeners:{
		        click: function () {
                             if(cmbShift.getRawValue()=="" )
                             {
                  		alert("Select Shift ..");		
                  		cmbShift.setFocus();
		             }
                             else
                             {
                                gstFlag = "Add";


  //                              flxProduction.getStore().removeAll();
                                flxDownTime.getStore().removeAll();	
			        //flxRollProduction.getStore().removeAll();

                        
//				TrnProdnDownTimePanel.getForm().reset();
//				RefreshData();
//                                Ext.getCmp('downdetail').setDisabled(false);


                              if (downtype == "SHIFT") 
                              { 
                                 shift_Prodn_data_check();
                              }
                              else
                              { 
                                 shift_Prodn_data_check2();
                              }



                                Ext.getCmp('dtproddate').setDisabled(true);  
			        Ext.getCmp('cmbShift').setDisabled(true)
                             }      
                           
			
		        }
		    }
		},'-',
//EDIT
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

                            gstFlag = "Edit";


			    Ext.getCmp('dtproddate').setDisabled(true);  
			    Ext.getCmp('cmbShift').setDisabled(true)

  
                            flxDownTime.getStore().removeAll();	

	                     Ext.getCmp('downdetail').setDisabled(false);  
	                    loadShiftDownTimeDatastore.removeAll();
		            loadShiftDownTimeDatastore.load({
	     			url: 'ClsDownTimeEntry.php',
				params: {
				    task     : 'loadShiftDownTime',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    shift1   : cmbShift.getValue(),
                                    edate    : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
        
				},
		              	callback:function()
		                {
                                        var cnt=loadShiftDownTimeDatastore.getCount();
                                        if (cnt == 0)
                                        { 
                                         alert("Shift data for the Date " + Ext.util.Format.date(dtproddate.getValue(),"d-m-Y") + " Shift "+ cmbShift.getValue() + " is not Available" );
                     	                 Ext.getCmp('downdetail').setDisabled(true);
                                        }
//alert(cnt);                           else
                                        {   
                                        prdhseqno =loadShiftDownTimeDatastore.getAt(0).get('prds_id');
   					for(var j=0; j<cnt; j++)
 		                        { 
                                                 
					        var RowCnt = flxDownTime.getStore().getCount() + 1;
					        flxDownTime.getStore().insert(
					        flxDownTime.getStore().getCount(),
					        new dgrecord({
						   quality     : loadShiftDownTimeDatastore.getAt(j).get('var_desc'),
						   qlycode     : loadShiftDownTimeDatastore.getAt(j).get('prds_qlycode'),
						   department  : loadShiftDownTimeDatastore.getAt(j).get('department_name'),
				                   deptcode    : loadShiftDownTimeDatastore.getAt(j).get('prds_dept'),
						   section     : loadShiftDownTimeDatastore.getAt(j).get('section_name'),
						   seccode     : loadShiftDownTimeDatastore.getAt(j).get('prds_section'),
						   equipment   : loadShiftDownTimeDatastore.getAt(j).get('equip_name'),
						   equipcode   : loadShiftDownTimeDatastore.getAt(j).get('prds_equipment'),
						   reason      : loadShiftDownTimeDatastore.getAt(j).get('prds_nature_of_breakdown'),
						   fromtime    : loadShiftDownTimeDatastore.getAt(j).get('prds_starttime'),
						   totime      : loadShiftDownTimeDatastore.getAt(j).get('prds_endtime'),
						   downmins    : loadShiftDownTimeDatastore.getAt(j).get('prds_mins'),
						   rootcause    : loadShiftDownTimeDatastore.getAt(j).get('prds_rootcause'),
						   actiontaken  : loadShiftDownTimeDatastore.getAt(j).get('prds_actiontaken'),
						   correctiveaction  : loadShiftDownTimeDatastore.getAt(j).get('prds_correctiveaction'),
					       }) 
					       );
                                        }
                                        grid_tot_downtime();

                                        getData();  
		                        }  

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

                  var gstSave;

//alert(flxDetail.getStore().getCount());		 
  
                    gstSave="true";

                    if (downtype == "SHUT")
                    {
		            if(cmbsupervisor.getRawValue()=="" || cmbsupervisor.getValue()==0)
			    {
				alert("Select Supervisor Name..");
				gstSave="false";
				cmbShiftIncharge.setFocus();
			    }
	 		    if(cmbShiftIncharge.getRawValue()=="" || cmbShiftIncharge.getValue()==0)
			    {
				alert("Select Shift Incharge Name..");
				gstSave="false";
				cmbShiftIncharge.setFocus();
			    }
                    } 
		    if (flxDownTime.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
        	                gstSave="false";
	                    }

		    else if(cmbShift.getRawValue()=="" )
		    {
			alert("Select Shift ..");
			gstSave="false";
			cmbShiftIncharge.setFocus();
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




//alert(cmbPO.getRawValue());

                            Ext.Ajax.request({
                            url: 'TrnDownTimeSave.php',
                            params :
                             {
				cntdowntime: DownTimeData.length,
                               	griddet_downtime: Ext.util.JSON.encode(DownTimeupData),    
                     
  

//				cntRoll: RollData.length,
//                             	griddet_roll : Ext.util.JSON.encode(RollupData),    

                                savetype       : gstFlag,
                                prdhseqno      : prodseqno,
                             	prdhcompcode   : Gincompcode,
				prdhfincode    : GinFinid,
		                prdhspvrcode   : cmbsupervisor.getValue(),
				prdhoperator   : cmbShiftIncharge.getValue(),
				prdhdate       : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
				prdhshift      : cmbShift.getRawValue(),
                                prhdtotdownmins: txtTotalDownMins.getValue(),
                                downtype       : downtype,         


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                    
                                    Ext.MessageBox.alert("Down Time Entry Saved ");
                                    TrnProdnDownTimePanel.getForm().reset();
                                    flxDownTime.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Down TimeEntry Not Saved! Pls Check!- ");                                                  
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
                            TrnProdnDownTimePanel.getForm().reset();
                            flxDownTime.getStore().removeAll();
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
				TrnProdnDownTimeEntry.hide();
			   }
			}
        	}   
            ],
	
        },

                items: [tabProductionDownTime,],



        
    });



function RefreshData()
{
gstFlag = "Add";
flxDownTime.getStore().removeAll();
txtTotalDownMins.setValue('');
Ext.getCmp('dtproddate').setDisabled(false);  
Ext.getCmp('cmbShift').setDisabled(false)

Ext.getCmp('downdetail').setDisabled(true);  


if (downtype == "SHIFT")
{ 
  Ext.getCmp('mcshut').setDisabled(true);  
}
else
{
  Ext.getCmp('mcshut').setDisabled(false);  
  QlyCode = 193;
}


}

    var TrnProdnDownTimeEntry = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 25,
        title       : 'PRODUCTION DOWN TIME ENTRY',
        items       : TrnProdnDownTimePanel,
        layout      : 'fit',
        closable    : true,
	bodyStyle   :{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                      RefreshData();	   	
//alert(downtype);
	   	}

		}
    });
    TrnProdnDownTimeEntry.show();  
});
