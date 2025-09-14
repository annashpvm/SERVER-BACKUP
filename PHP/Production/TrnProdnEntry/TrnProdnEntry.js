Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');


   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');


   var gstfinyear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuserid');
   var usertype = localStorage.getItem('ginuser');



   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var gridedit_main = "false";
var gridedit_roll = "false";
var gridedit_downtime = "false";

var editrow = 0;

var editrow_main = 0;
var editrow_roll = 0;
var editrow_downtime = 0;

var seqnoed;

var gstFlag = "Add";
var varcodelist = "(";

var prodseqno = 0;

var datafound = 0;

var oldshift = "";

var daymcprod = 0; dayrunmins = 0; daybreaks = 0; daybreakmins = 0; 
var monmcprod = 0; monrunmins = 0; monbreaks = 0; monbreakmins = 0; 

var MonthStartDate = new Date();

var loadShiftDownTimeDatastore = new Ext.data.Store({
      id: 'loadShiftDownTimeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftDownTime"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'prds_qlycode','prds_dept', 'prds_section', 'prds_equipment', 'prds_starttime', 'prds_endtime', 'prds_mins', 'prds_reason', 'var_desc', 'section_name','equip_name','department_name'

      ]),
    });



 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });



var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE',
        width           : 80,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        hiddenName      : '',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRollVarietyQty.focus();
             }
          },
          click: function(){       
                  txtRollVarietyQty.focus();

          } 
        } 
   });


var loadShiftDatastore = new Ext.data.Store({
      id: 'loadShiftDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftDetails_1"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prdh_id', 'prdh_compcode', 'prdh_fincode', 'prdh_date', 'prdh_shift', 'prdh_spvrcode', 
'prdh_operator', 'prdh_ppno','prdh_avlmins', 'prdh_runmins', 'prdh_downmins', 'prdh_prodn',
'prd_seqno','prd_ppno','prd_slno', 'prd_rollno', 'prd_speed', 'prd_deckle', 'prd_draw', 'prd_roll_intime',
'prd_roll_outtime', 'prd_roll_dia', 'prd_runmins', 'prd_breaks','prd_breakmins' , 'prd_rollwt', 'prd_finprod', 
'prd_reason', 'prd_roll_status', 'prd_roll_refno', 'prd_process_date','var_desc','prd_variety','prd_set','prd_shade','prd_rwdeck'

      ]),
    });

var loadShiftDatastore2 = new Ext.data.Store({
      id: 'loadShiftDatastore2',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftDetails_2"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prdv_rollno', 'prdv_varty', 'prdv_qty', 'prdv_mins', 'prdv_sets', 'var_groupcode', 'var_desc','prdv_finwt'

      ]),
    });


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

var loadShiftInchargeDatastore = new Ext.data.Store({
      id: 'loadShiftInchargeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
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


var loadDAYPreviousShiftDataCheckDatastore = new Ext.data.Store({
      id: 'loadDAYPreviousShiftDataCheckDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDAYUptoPreviousShiftData"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'mcprod','runmins', 'breaks', 'breakmins' 
      ]),
    });

var loadMONPreviousShiftDataCheckDatastore = new Ext.data.Store({
      id: 'loadMONPreviousShiftDataCheckDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMONUptoPreviousShiftData"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'mcprod','runmins', 'breaks', 'breakmins' 
      ]),
    });


var loadDataCheckDatastore = new Ext.data.Store({
      id: 'loadDataCheckDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDataCheck"}, // this parameter asks for listing
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
                url: 'ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDataCheck"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos' 
      ]),
    });


function shift_data_check()
{
        rdate    = dtProdDate.getValue();
        loadDataCheckDatastore.removeAll();
	loadDataCheckDatastore.load({
	url: 'ClsProdnEntry.php',
	params: {
		    task     : 'loadDataCheck',
	            finid    : GinFinid,
		    compcode : Gincompcode,
                    shift1   : cmbShift.getValue(),
                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
                },
       	callback:function()
		{
                    datafound = loadDataCheckDatastore.getAt(0).get('nos');
                    if (datafound == 0) 
	            {
	                Ext.getCmp('roll-entry').setDisabled(false);
	            }     
	            else
	            {
	                alert("Data Already Entered.. You  can't add ...")
	                Ext.getCmp('roll-entry').setDisabled(true);
	            }

                    if (cmbShift.getValue() == "A")
                    { 
                       oldshift = "C";

                       rdate    = dtProdDate.getValue().add(Date.DAY, -1);;
                    }   
                    else if (cmbShift.getValue() == "B")
                    {
                       oldshift = "A";
                       rdate    = dtProdDate.getValue();
                    }  
                    else if (cmbShift.getValue() == "C")
                    {
                       oldshift = "B";
                       rdate    = dtProdDate.getValue();
                    } 
                    loadDataCheckDatastore2.removeAll();
                    loadDataCheckDatastore2.load({
                    url: 'ClsProdnEntry.php',
                    params: {
			    task     : 'loadDataCheck',
			    finid    : GinFinid,
			    compcode : Gincompcode,
			    shift1   : oldshift,
			    edate    : Ext.util.Format.date(rdate,"Y-m-d"),
			},
                    callback:function()
			{
			    datafound = loadDataCheckDatastore2.getAt(0).get('nos');
                            if (datafound == 0)
                            {
//                               alert("Date " + Ext.util.Format.date(rdate,"d-m-Y") + " Previous Shift "+ oldshift + " is not Available" );
				Ext.Msg.show({
				    title: 'Confirmation',
				    icon: Ext.Msg.QUESTION,
				    buttons: Ext.MessageBox.YESNO,
/*
				    msg: "DATE : " + Ext.util.Format.date(rdate,"d-m-Y") + " - Previous Shift :"+ oldshift + " is not Available.  Do you want to Continue",
				    fn: function(btn)
			            {

					    if (btn === 'yes')
		                            {
                                                Ext.getCmp('roll-entry').setDisabled(false);
		                            }
                                            else 
		                            {
                                                Ext.getCmp('roll-entry').setDisabled(true);
		                            }

                                    }
*/
				    msg: "DATE : " + Ext.util.Format.date(rdate,"d-m-Y") + " - Previous Shift :"+ oldshift + " is not Available.  I am unable to Continue",
				    fn: function(btn)
			            {

		                                Ext.getCmp('roll-entry').setDisabled(false);
		
                                    }

                                 });
                             }
                      }
        });
       }
        });
}

function Previous_shift_data_check()
{
         daymcprod  = 0;
         dayrunmins = 0;
         daybreaks  = 0;
         daybreakmins = 0;

        rdate    = dtProdDate.getValue();
        loadDAYPreviousShiftDataCheckDatastore.removeAll();
	loadDAYPreviousShiftDataCheckDatastore.load({
	url: 'ClsProdnEntry.php',
	params: {
		    task     : 'loadDAYUptoPreviousShiftData',
	            finid    : GinFinid,
		    compcode : Gincompcode,
                    shift1   : cmbShift.getValue(),
                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
                },
       	callback:function()
		{
                    datafound = loadDAYPreviousShiftDataCheckDatastore.getCount(); 
                    if (datafound >  0) 
	            {
                         daymcprod    = loadDAYPreviousShiftDataCheckDatastore.getAt(0).get('mcprod');
                         dayrunmins   = loadDAYPreviousShiftDataCheckDatastore.getAt(0).get('runmins');
                         daybreaks    = loadDAYPreviousShiftDataCheckDatastore.getAt(0).get('breaks');
                         daybreakmins = loadDAYPreviousShiftDataCheckDatastore.getAt(0).get('breakmins');




                         mcprod    = Number(daymcprod)+ Number(txtshiftmcprod.getValue());
                         runmins   = Number(dayrunmins)+ Number(txtShiftrunmins.getValue());
                         breaks    = Number(daybreaks)+ Number(txtshiftBreaks.getValue());
                         breakmins = Number(daybreakmins)+ Number(txtshiftBreakmins.getValue());

                         txtTodaymcprod.setValue(mcprod);
			 txtTodayrunmins.setValue(runmins);
			 txtTodayBreaks.setValue(breaks);
			 txtTodayBreakMins.setValue(breakmins);


	            } 
                }      

        });

}


function UptoPrevious_shift_data_check()
{
         monmcprod  = 0;
         monrunmins = 0;
         monbreaks  = 0;
         monbreakmins = 0;

        rdate    = dtProdDate.getValue();
        loadMONPreviousShiftDataCheckDatastore.removeAll();
	loadMONPreviousShiftDataCheckDatastore.load({
	url: 'ClsProdnEntry.php',
	params: {
		    task     : 'loadMONUptoPreviousShiftData',
	            finid    : GinFinid,
		    compcode : Gincompcode,
                    shift1   : cmbShift.getValue(),
                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
                    sdate    : Ext.util.Format.date(MonthStartDate,"Y-m-d"),

                },
       	callback:function()
		{
                    datafound = loadMONPreviousShiftDataCheckDatastore.getCount(); 
                    if (datafound >  0) 
	            {
                         monmcprod    = loadMONPreviousShiftDataCheckDatastore.getAt(0).get('mcprod');
                         monrunmins   = loadMONPreviousShiftDataCheckDatastore.getAt(0).get('runmins');
                         monbreaks    = loadMONPreviousShiftDataCheckDatastore.getAt(0).get('breaks');
                         monbreakmins = loadMONPreviousShiftDataCheckDatastore.getAt(0).get('breakmins');




                         mcprod    = Number(monmcprod)+ Number(txtshiftmcprod.getValue());
                         runmins   = Number(monrunmins)+ Number(txtShiftrunmins.getValue());
                         breaks    = Number(monbreaks)+ Number(txtshiftBreaks.getValue());
                         breakmins = Number(monbreakmins)+ Number(txtshiftBreakmins.getValue());

                         txtMonthUptoMcprod.setValue(mcprod);
			 txtMonthUptoRunMins.setValue(runmins);
			 txtMonthUptoBreaks.setValue(breaks);
			 txtMonthUptoBreakMins.setValue(breakmins);


	            } 
                }      

        });

}




var dtProdDate = new Ext.form.DateField({
    fieldLabel : 'P.DATE	',
    id         : 'dtProdDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    width : 100,
	listeners:{
        select: function(){
                  refresh();
	}
	}
});

function refresh()
{

            flxProduction.getStore().removeAll();
            flxRollProduction.getStore().removeAll();
            flxDownTime.getStore().removeAll();

            var d = Ext.util.Format.date(dtProdDate.getValue(),"d");
            MonthStartDate = dtProdDate.getValue().add(Date.DAY, -d+1);
            

}


var cmbShift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
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
                  refresh();
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

var lblDayBreakMins = new Ext.form.Label({
	fieldLabel  : 'B.Mins',
	id          : 'lblDayBreakMins',
	name        : 'lblDayBreakMins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var txtBreakMins = new Ext.form.NumberField({
	fieldLabel  : 'Break Mins',
	id          : 'txtBreakMins',
	name        : 'txtBreakMins',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,

        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",  
	tabindex : 12,
        decimalPrecision: 0,
        enableKeyEvents: true,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},    
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                  txtReason.focus();
             }
          }
        }   

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

var lblShiftBreakMins = new Ext.form.Label({
	fieldLabel  : 'Break Mins',
	id          : 'lblShiftBreakMins',
	name        : 'lblShiftBreakMins',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblShiftBreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblShiftBreaks',
	name        : 'lblShiftBreaks',
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
	fieldLabel  : 'Run Mins',
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

var lblTodayBreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblTodayBreaks',
	name        : 'lblTodayBreaks',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblTodayBreakMins = new Ext.form.Label({
	fieldLabel  : 'Break Mins',
	id          : 'lblTodayBreakMins',
	name        : 'lblTodayBreakMins',
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
	fieldLabel  : 'Run Mins',
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

var lblUptoDateBreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblUptoDateBreaks',
	name        : 'lblUptoDateBreaks',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblUptoDateBreakMins = new Ext.form.Label({
	fieldLabel  : 'Break Mins',
	id          : 'lblUptoDateBreakMins',
	name        : 'lblUptoDateBreakMins',
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
	disabled	: true,
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


var lblDayBreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblDayBreaks',
	name        : 'lblDayBreaks',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblDayBreakMins = new Ext.form.Label({
	fieldLabel  : 'Break Mins',
	id          : 'lblDayBreakMins',
	name        : 'lblDayBreakMins',
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
    	enableKeyEvents: true,      
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbShade.focus();
             }
          },
          click: function(){       
                  cmbShade.focus();

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
	disabled	: true,
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
        readOnly   :  true,
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
var txtSpeed = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtSpeed',
	name        : 'txtSpeed',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",	
	tabindex : 14,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},   
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDeckle.focus();
             }
          }
        } 

});
var txtDraw = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtDraw',
	name        : 'txtDraw',
	width       :  40,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},
        decimalPrecision: 1,   
	tabindex : 14,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtInTime.focus();
             }
          }
        } 

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
	tabindex : 1,
        decimalPrecision: 3,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

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
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});

var txtshiftBreaks = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftBreaks',
	name        : 'txtshiftBreaks',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});


var txtshiftBreakmins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftBreakmins',
	name        : 'txtshiftBreakmins',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

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
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});

var txtTodayBreaks = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTodayBreaks',
	name        : 'txtTodayBreaks',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});

var txtTodayBreakMins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTodayBreakMins',
	name        : 'txtTodayBreakMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
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
        decimalPrecision: 3,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
	
});
var txtRollNo = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtRollNo',
	name        : 'txtRollNo',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},    	
	tabindex : 10,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSpeed.focus();
             }
          }
        } 

}); 
var txtRollWt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtRollWt',
	name        : 'txtRollWt',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 11,
        decimalPrecision: 3,
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbVariety.focus();
             }
          },

           blur:function(){
               txtRollVarietyQty.setValue(txtRollWt.getRawValue());
               txtRollVarietyMins.setValue(txtRunMins.getValue());
           },
           keyup:function(){
              txtRollVarietyQty.setValue(txtRollWt.getRawValue());
              txtRollVarietyMins.setValue(txtRunMins.getValue());

            },
        } 


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
        enableKeyEvents: true,
        listeners:{
           blur:function(){
               txtRollVarietyMins.setValue(txtRunMins.getValue());
           },
           keyup:function(){
              txtRollVarietyMins.setValue(txtRunMins.getValue());

            },
           change:function(){
               txtRollVarietyMins.setValue(txtRunMins.getValue());
           },
        }   

});
var txtDeckle = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtDeckle',
	name        : 'txtDeckle',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
        style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},   
    	tabindex : 13,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDraw.focus();
             }
          }
        } 

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
	fieldLabel  : 'Reason',
	id          : 'txtReason',
	name        : 'txtReason',
	width       :  160,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,

        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",  
	tabindex : 16,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'149'},   
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 btnsubmit.focus();
             }
          }
        } 

});
var txtBreaks = new Ext.form.NumberField({
	fieldLabel  : 'Breaks',
	id          : 'txtBreaks',
	name        : 'txtBreaks',
	width       :  40,


        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",  
	tabindex : 15,
        decimalPrecision: 0,
    	enableKeyEvents: true,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},    
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBreakMins.focus();
             }
          }
        } 

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
        decimalPrecision: 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},   
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRollWt.focus();
             }
          }
        } 

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
    width       :  150,
//    format     : 'H.i',
    format     : 'd-m-y H.i',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
    enableKeyEvents: true,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtOutTime.focus();
             }
          },
           keyup:function(){
                  find_runmins();
                  txtInTime2.setValue(txtInTime.getValue());
           },
           blur:function(){
                  txtInTime2.setValue(txtInTime.getValue());
                  find_runmins();
           }
    }    
});

var txtOutTime = new Ext.form.DateField({
	fieldLabel  : '',
	id          : 'txtOutTime',
	name        : 'txtOutTime',
	width       :  150,
//        format     : 'd-m-Y H.i',

        value      : new Date(),
        format     : 'H.i',
        format     : 'd-m-y H.i',
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 1,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRollDia.focus();
             }
          },

           blur:function(){
                  txtOutTime2.setValue(txtOutTime.getValue());

                  find_runmins();
           },
           keyup:function(){
                  txtOutTime2.setValue(txtOutTime.getValue());
                  find_runmins();
                   
                      


     //                 var startTime = Ext.getCmp('txtInTime').getRawValue();
     //                 var endTime   = Ext.getCmp('txtOutTime').getRawValue();

        //      alert(Ext.Date.diff( txtInTime, txtOutTime, Ext.Date.MINUTE) );
//alert(Ext.getCmp('txtOutTime').getRawValue()-Ext.getCmp('txtInTime').getRawValue());
            },
        }   

});

var txtInTime2 = new Ext.form.DateField({
    fieldLabel : '',
    id         : 'txtInTime2',
    name       : 'txtInTime2',
    width       :  70,
    format     : 'H.i',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
    enableKeyEvents: true,
    listeners:{

    }    
});

var txtOutTime2 = new Ext.form.DateField({
	fieldLabel  : '',
	id          : 'txtOutTime2',
	name        : 'txtOutTime2',
	width       :  100,
//        format     : 'd-m-Y H.i',

        value      : new Date(),
        format     : 'H.i',
//        format     : 'd-m-y H.i',
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 1,
        listeners:{
        }      

});

function find_runmins()
{
   txtRunMins.setValue("");
   var dt1 = txtOutTime.getValue();
   var dt2 = txtInTime.getValue();
//alert(dt1);
//   var diffdays = (dt1.getDate()-dt2.getDate());
//alert(diffdays);
//alert(dt1);

   var diffMs1 = (dt1.getTime()-dt2.getTime());
   if (diffMs1 >0)
   {
       txtRunMins.setValue(diffMs1/60000);
   }
   txtRollVarietyMins.setValue(txtRunMins.getValue());

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

var txtPaperPlantPower = new Ext.form.NumberField({
	fieldLabel  : 'Paper Plant Power(U)',
	id          : 'txtPaperPlantPower',
	name        : 'txtPaperPlantPower',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});

var txtTGPower = new Ext.form.NumberField({
	fieldLabel  : 'TG Power(U)',
	id          : 'txtTGPower',
	name        : 'txtTGPower',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});

var txtMainSteam = new Ext.form.NumberField({
	fieldLabel  : 'Main Steam(MT)',
	id          : 'txtMainSteam',
	name        : 'txtMainSteam',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtExtractionSteamPower = new Ext.form.NumberField({
	fieldLabel  : 'Extraction Steam -Power',
	id          : 'txtExtractionSteamPower',
	name        : 'txtExtractionSteamPower',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtExtractionSteamPaper = new Ext.form.NumberField({
	fieldLabel  : 'Extraction Steam -Paper',
	id          : 'txtExtractionSteamPaper',
	name        : 'txtExtractionSteamPaper',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtFreshWater = new Ext.form.NumberField({
	fieldLabel  : 'Fresh Water(M3)',
	id          : 'txtFreshWater',
	name        : 'txtFreshWater',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtSKWater = new Ext.form.NumberField({
	fieldLabel  : 'SK Water(M3)',
	id          : 'txtSKWater',
	name        : 'txtSKWater',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtEBPowerImport = new Ext.form.NumberField({
	fieldLabel  : 'EB Power -Import',
	id          : 'txtEBPowerImport',
	name        : 'txtEBPowerImport',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});
var txtEBPowerExport = new Ext.form.NumberField({
	fieldLabel  : 'EB Power -Export',
	id          : 'txtEBPowerExport',
	name        : 'txtEBPowerExport',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 0,
	readOnly : true,

});

var txtMonthUptoMcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtMonthUptoMcprod',
	name        : 'txtMonthUptoMcprod',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 3,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},


});
var txtMonthUptoBreaks = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtMonthUptoBreaks',
	name        : 'txtMonthUptoBreaks',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});

var txtMonthUptoBreakMins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtMonthUptoBreakMins',
	name        : 'txtMonthUptoBreakMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 3,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

});



var txtMonthUptoRunMins = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtMonthUptoRunMins',
	name        : 'txtMonthUptoRunMins',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",    	
	tabindex : 1,
        decimalPrecision: 3,
        readOnly  : true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},

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
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'6'},    
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRollVarietyMins.focus();
             }
          }
        } 


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
        decimalPrecision: 0,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRollVarietySet.focus();
             }
          },
        change : function(){

        vmins = Number(txtRollVarietyMins.getValue());
        var dt1 = txtInTime2.getValue(); 
        var newDateObj = new Date(txtInTime2.getValue()); 
        newDateObj.setMinutes ( dt1.getMinutes() + vmins );
        txtOutTime2.setValue(newDateObj); 
  
  
        },
        keyup : function(){

	   vmins = Number(txtRollVarietyMins.getValue());
	   var dt1 = txtInTime2.getValue(); 
	   var newDateObj = new Date(txtInTime2.getValue()); 
	   newDateObj.setMinutes ( dt1.getMinutes() + vmins );
	   txtOutTime2.setValue(newDateObj); 
                
 //                var dt1 = txtOutTime2.getValue();                 
//                 alert(dt1.getTime());   
//                 alert(dt1.getTime()+ (10*60*1000));   

//                 txtOutTime2.setValue(dt1.getTime()+ (10*60*1000)); 
  
        }

        }      

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
        decimalPrecision: 0,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},   
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtRewinderDeckle.focus();
             }
          }
        } 



});

var txtRewinderDeckle = new Ext.form.NumberField({
	fieldLabel  : 'RW Deckle',
	id          : 'txtRewinderDeckle',
	name        : 'txtRewinderDeckle',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 23,
        decimalPrecision: 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},   
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBreaks.focus();
             }
          }
        } 



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
	brkmins=0;
	brks=0;

	totqty=0;

        varcodelist = "(";  

     
        var Row= flxProduction.getStore().getCount();
        flxProduction.getSelectionModel().selectAll();
        var sel=flxProduction.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            totmins=totmins+Number(sel[i].data.runmins);
            brkmins=brkmins+Number(sel[i].data.breakmins);
            brks=brks+Number(sel[i].data.breaks);

            totqty=totqty+Number(sel[i].data.rollwt);
            varcodelist = varcodelist + sel[i].data.qlycode + ',';
        }
        varcodelist = varcodelist + '0)';
//        txtshiftmcprod.setValue(totqty);

        txtshiftmcprod.setValue(Ext.util.Format.number(totqty,'0.000'));
        txtshiftBreakmins.setValue(brkmins);
        txtshiftBreaks.setValue(brks);
        txtShiftrunmins.setValue(totmins);

        Previous_shift_data_check();
        UptoPrevious_shift_data_check();
}

/*
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
        txtshiftBreakmins.setValue(totmins);

        flxDownTime.getSelectionModel().clearSelections();

}
*/


function grid_tot_roll()
{
	totmins=0;
	totqty=0;
      	breaks=0;
      	breakmins=0;
        var Row= flxRollProduction.getStore().getCount();
        flxRollProduction.getSelectionModel().selectAll();
        var sel=flxRollProduction.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totmins=totmins+Number(sel[i].data.mins);
            totqty=totqty+Number(sel[i].data.qty);
            breaks=breaks+Number(sel[i].data.breaks);
            breakmins=breakmins+Number(sel[i].data.breakmins);

        }
        txtRollTotalQty.setValue(totqty);
        txtRollTotalMins.setValue(totmins);
        txtTotBreaks.setValue(breaks);
        txtTotBreakMins.setValue(breakmins);

        flxRollProduction.getSelectionModel().clearSelections();

}

var txtRollTotalMins = new Ext.form.NumberField({
	fieldLabel  : 'Tot.Mins',
	id          : 'txtRollTotalMins',
	name        : 'txtRollTotalMins',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
        decimalPrecision: 3,
});

var txtTotBreaks = new Ext.form.NumberField({
	fieldLabel  : 'Tot.BRKs',
	id          : 'txtTotBreaks',
	name        : 'txtTotBreaks',
	width       :  40,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
        decimalPrecision: 0,
});

var txtTotBreakMins = new Ext.form.NumberField({
	fieldLabel  : 'Brk.Mins',
	id          : 'txtTotBreakMins',
	name        : 'txtTotBreakMins',
	width       :  45,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
        decimalPrecision: 0,
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

var btnModify = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Modify",
    width   : 50,
    height  : 30,
    x       :700,
    y       : 0,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "border-radius:10px;",
   tabindex : 1,
   listeners:{
       click: function(){       
	   var gstadd="true";

//          tabRollProduction.show();

	    if(txtRollNo.getRawValue()=="" || txtDeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtRollNo.setFocus();
	    }
	    if(txtRollWt.getRawValue()=="" || txtRollWt.getValue()==0)
	    {
		alert("Roll weight is Empty..");
                gstadd="false";
                txtRollWt.Focus();
	    }
	    if(txtDeckle.getRawValue()=="" || txtDeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtDeckle.setFocus();
	    }
	    if(txtSpeed.getRawValue()=="" || txtSpeed.getValue()==0)
	    {
		alert("Speed is Empty..");
                gstadd="false";
                txtSpeed.setFocus();
	    }

            if(gstadd=="true")
            {
              Ext.getCmp('rollvartyentry').show()
            }   
            else
            {
              Ext.getCmp('rollvartyentry').hide()
            }   

	    txtRollVarietyQty.setValue(txtRollWt.getRawValue())
	    txtRollVarietyMins.setValue(txtRunMins.getValue())

            btnModify.hide(); 

       }
    }      

});




var btnConfirm = new Ext.Button({
    style   : 'text-align:center;',
    text    : "CONFIRM",
    width   : 50,
    height  : 22,
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
   tabindex : 1,
   listeners:{
       click: function(){       
	   var gstadd="true"

	    if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
	    {
		alert("Select Variety Name..");
                gstadd="false";
                cmbPPvariety.setFocus(); 	
	    }


	    if(txtRollTotalQty.getRawValue()=="" || txtRollTotalQty.getValue()==0)
	    {
		alert("Quantity is Empty..");
                gstadd="false";
                [txtRollTotalQty].setFocus();
	    }
	    if(txtRollTotalMins.getRawValue()=="" || txtRollTotalMins.getValue()==0)
	    {
		alert("Running Minitues is Empty..");
                gstadd="false";
                txtRollVarietyMins.setFocus();
	    }


	    if(txtRollNo.getRawValue()=="" || txtDeckle.getValue()==0)
	    {
		alert("Roll No. is Empty..");
                gstadd="false";
                txtRollNo.setFocus();
	    }
	    if(txtRollWt.getRawValue()=="" || txtRollWt.getValue()==0)
	    {
		alert("Roll weight is Empty..");
                gstadd="false";
                txtRollWt.setFocus();
	    }
	    if(txtDeckle.getRawValue()=="" || txtDeckle.getValue()==0)
	    {
		alert("Deckle is Empty..");
                gstadd="false";
                txtDeckle.setFocus();
	    }

	    if(txtSpeed.getRawValue()=="" || txtSpeed.getValue()==0)
	    {
		alert("Speed is Empty..");
                gstadd="false";
                txtSpeed.setFocus();
	    }


	    if (Number(txtRunMins.getValue()) !=  Number(txtRollTotalMins.getValue()))
	    {
		alert("Roll Running Minutes Not tallied with Vareity Total Minutes..");
                gstadd="false";
	    }
	    if (Number(txtRollWt.getValue()) !=  Number(txtRollTotalQty.getValue()))
	    {
		alert("Roll Weight Not tallied with Vareity Total Qty..");
                gstadd="false";
	    }
	    if(txtRollDia.getRawValue()=="" || txtRollDia.getValue()==0)
	    {
		alert("Roll DIA is empty / Zero . Please check..");
                gstadd="false";
	    }

            if(gstadd=="true")

            {

	               flxProduction.getSelectionModel().selectAll();
                       var selrows1 = flxProduction.getSelectionModel().getCount();
		       var sel1 = flxProduction.getSelectionModel().getSelections();
		       for (var i=0;i<selrows1;i++){
		            if (Number(sel1[i].data.rollno) === Number(txtRollNo.getValue()))
			    {
		               flxProduction.getStore().remove(sel1[i]);
		            }
		       }   


		        flxRollProduction.getSelectionModel().selectAll();
		        var selrows1 = flxRollProduction.getSelectionModel().getCount();
		        var sel1 = flxRollProduction.getSelectionModel().getSelections();

		        var cnt = 0;
                        for (var i=0;i<selrows1;i++){
                            var RowCnt = flxProduction.getStore().getCount() + 1;
                            flxProduction.getStore().insert(
                            flxProduction.getStore().getCount(),
                            new dgrecord({
                                   sno       : flxProduction.getStore().getCount()+1,
		                   quality   : sel1[i].data.quality,
		                   qlycode   : sel1[i].data.qlycode,
		                   shade     : sel1[i].data.shade,
			           rollno    : txtRollNo.getRawValue(),
				   speed     : txtSpeed.getRawValue(),
				   deckle    : txtDeckle.getRawValue(),
                                   draw      : txtDraw.getRawValue(),
                                   intime    : sel1[i].data.intime,
			           outtime   : sel1[i].data.outtime,
				   runmins   : Number(sel1[i].data.mins),
				   set       : Number(sel1[i].data.set),
				   breaks    : Number(sel1[i].data.breaks), // Number(txtBreaks.getValue()),
                                   breakmins : Number(sel1[i].data.breakmins),  // Number(txtBreakMins.getValue()),
                                   rolldia   : Number(txtRollDia.getRawValue()),
                                   rollwt    : sel1[i].data.qty,
                                   reason    : sel1[i].data.reason, //txtReason.getRawValue(),  
			           ppno      : Number(cmbPPNo.getRawValue()),
                                   set       : sel1[i].data.set,
                                   rwdeck    : sel1[i].data.rwdeck,
				   finwt     : 0,
                           }) 
                           );
                       }

                }
                if(gstadd=="true")
                {
			flxRollProduction.getStore().removeAll();
			txtRollNo.setValue(Number(txtRollNo.getValue())+1);
			txtRollWt.setValue('');
			txtRunMins.setValue('');
			txtReason.setValue('');
			txtBreaks.setValue('');
			txtBreakMins.setValue('');

			txtRollTotalQty.setValue('');
			txtRollTotalMins.setValue('');
			txtBreaks.setValue('');
			txtBreakMins.setValue('');
		        txtRollDia.setValue('');

                }

                grid_tot(); 
                flxRollProduction.getSelectionModel().clearSelections();

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
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
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

         if(cmbShade.getRawValue()=="" || cmbShade.getValue()==0)
	    {
		alert("Select Shade.");
                gstadd="false";
                cmbShade.setFocus(); 	
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
                txtRollVarietyMins.Focus();
	    }
	    if(txtRollVarietySet.getRawValue()=="" || txtRollVarietySet.getValue()==0)
	    {
		alert("No of Set is Empty..");
                gstadd="false";
                txtRollVarietySet.Focus();
	    }


	    if(txtBreaks.getRawValue()=="" )
	    {
		alert("Break is Empty. Enter 0 or Other Value.");
                gstadd="false";
                txtBreaks.setFocus();
	    }

	    if (Number(txtBreaks.getValue()) > 0 &&  Number(txtBreakMins.getValue()) == 0)
	    {
		alert("Roll Break Minutes is empty Please check..");
                gstadd="false";
                txtBreakMins.Focus();
	    }
	    if (Number(txtRewinderDeckle.getValue()) == 0)
	    {
		alert("Rewinder Deckle is empty Please check..");
                gstadd="false";
                txtRewinderDeckle.Focus();
	    }
            if(gstadd=="true")
            {
               
                flxRollProduction.getSelectionModel().selectAll();
                var selrows = flxRollProduction.getSelectionModel().getCount();
                var sel = flxRollProduction.getSelectionModel().getSelections();


               var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.qlycode === cmbVariety.getValue() && sel[i].data.shade === cmbShade.getRawValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit_roll === "true")
	          {
			gridedit_roll = "false";

                       	var idx = flxRollProduction.getStore().indexOf(editrow_roll);
			sel[idx].set('quality' , cmbVariety.getRawValue());
			sel[idx].set('qlycode' , cmbVariety.getValue());
                      	sel[idx].set('shade'   , cmbShade.getRawValue());
			sel[idx].set('qty'     , txtRollVarietyQty.getValue());
			sel[idx].set('mins'    , txtRollVarietyMins.getValue());
			sel[idx].set('set'     , txtRollVarietySet.getValue());
			sel[idx].set('intime'  , txtInTime2.getRawValue());
			sel[idx].set('outtime' , txtOutTime2.getRawValue());
			sel[idx].set('breaks'  , txtBreaks.getValue());
			sel[idx].set('breakmins', txtBreakMins.getValue());
                 	sel[idx].set('reason', txtReason.getValue()); 
                  	sel[idx].set('rwdeck', txtRewinderDeckle.getValue()); 
			flxProduction.getSelectionModel().clearSelections();

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
		                   shade    : cmbShade.getRawValue(),
			           qty      : txtRollVarietyQty.getValue(),
				   mins     : txtRollVarietyMins.getValue(),
				   set      : txtRollVarietySet.getValue(),
                                   intime   : txtInTime2.getRawValue(),
			           outtime  : txtOutTime2.getRawValue(),
				   breaks   : txtBreaks.getValue(),
                                   breakmins: txtBreakMins.getValue(),
                                   reason   : txtReason.getValue(),
                                   rwdeck   : txtRewinderDeckle.getValue(),

                               }) 
                               );

                               txtRollVarietyQty.setValue('');
                               txtRollVarietySet.setValue('');
                               txtRollVarietyMins.setValue('');
                               txtInTime2.setValue(txtOutTime2.getValue());
                               txtOutTime2.setValue(txtOutTime.getValue());
                               txtBreaks.setValue('');
                               txtBreakMins.setValue('');
	                       txtReason.setValue('');	
	                       txtRewinderDeckle.setValue('');

                }

             }

            grid_tot_roll();

            txtRollVarietyQty.setValue(txtRollWt.getRawValue()-txtRollTotalQty.getValue());
	    txtRollVarietyMins.setValue(txtRunMins.getValue() -txtRollTotalMins.getValue());
            cmbVariety.focus();

       }
    }      



});

var btnadd_downtime = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 30,
    x       : 700,
    y       : 110,
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

        	if(gridedit_downtime === "true")
	          {
//alert(cmbProdVariety.getRawValue());

			gridedit_downtiem = "false";

                       	var idx = flxDownTime.getStore().indexOf(editrow_downtime);
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
			sel[idx].set('downmins'   , txtDownMins.getRawValue());
			


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
				   downmins    : txtDownMins.getRawValue(),


                               }) 
                               );
/*
                               txtRollNo.setValue(Number(txtRollNo.getValue())+1);
                               txtRollWt.setValue(0);
                               txtRunMins.setValue(0);
                               txtReason.setValue(0);
                               txtBreaks.setValue(0);
                               txtRollWt.setFocus();

*/
                }

             }


//     grid_tot_downtime();


       }
    } 


});


var dgrecord = Ext.data.Record.create([]);
var flxProduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 195,
    hidden:false,
    width: 750,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:35,align:'left'},          
        {header: "QUALITY", dataIndex: 'quality',sortable:true,width:150,align:'left'},
        {header: "QLYCODE", dataIndex: 'qlycode',sortable:true,width:10,align:'left',hidden:true},
        {header: "SHADE",      dataIndex: 'shade',sortable:true,width:60,align:'left'},
        {header: "ROLL No", dataIndex: 'rollno',sortable:true,width:60,align:'left'},//0
        {header: "SPEED", dataIndex: 'speed',sortable:true,width:60,align:'left'},//14
        {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:50,align:'left'},//14
        {header: "DRAW", dataIndex: 'draw',sortable:true,width:50,align:'left'},//14
        {header: "IN TIME", dataIndex: 'intime',sortable:true,width:60,align:'left'},//14
        {header: "OUT TIME", dataIndex: 'outtime',sortable:true,width:60,align:'left'},//14
        {header: "RUN MINS", dataIndex: 'runmins',sortable:true,width:60,align:'left'},//2
        {header: "BREAKS", dataIndex: 'breaks',sortable:true,width:60,align:'left'},//3
        {header: "BRK(Mins)", dataIndex: 'breakmins',sortable:true,width:70,align:'left'},//3
        {header: "ROLL DIA", dataIndex: 'rolldia',sortable:true,width:60,align:'left'},//3
        {header: "ROLL WT(T)", dataIndex: 'rollwt',sortable:true,width:70,align:'left'},//1
        {header: "Set", dataIndex: 'set',sortable:true,width:70,align:'left'},//1
        {header: "Reason for Loss", dataIndex: 'reason',sortable:true,width:90,align:'left'},//1
	{header: "PP No", dataIndex: 'ppno',sortable:true,width:60,align:'left',hidden:false},//15,hidden:true
        {header: "FIN WT(MT)", dataIndex: 'finwt',sortable:true,width:90,align:'left'},//16,hidden:true
        {header: "RW DECK", dataIndex: 'rwdeck',sortable:true,width:90,align:'left'},//16,hidden:true
    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'Production Entry',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to EDIT -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
                        var rlno = 0;
			var sm = flxProduction.getSelectionModel();
			var selrow = sm.getSelected();
                        if (Number(selrow.get('finwt')) == 0) {
				if (selrow != null){
					gridedit_main = "true";
					editrow_main = selrow;

	                                 txtRollVarietyQty.setValue(0);
	   				 txtRollVarietyMins.setValue(0);




					flxProduction.getSelectionModel().clearSelections();
                                        cmbVariety.setValue(selrow.get('qlycode')) 
				        txtRollNo.setValue(selrow.get('rollno'));
				        txtSpeed.setValue(selrow.get('speed'));
					txtDeckle.setValue(selrow.get('deckle'));
		                        txtDraw.setValue(selrow.get('draw'));
//					txtInTime.setRawValue(Ext.util.Format.number(selrow.get('intime')),'00.00');
//					txtOutTime.setRawValue(selrow.get('outtime'));


					txtInTime.setRawValue(findintime);
					txtOutTime.setRawValue(findouttime);
//alert(findintime);
//alert(findouttime);
//alert(txtInTime.getRawValue());


					txtRunMins.setValue(selrow.get('runmins'));
					txtBreaks.setValue(selrow.get('breaks'));
					txtBreakMins.setValue(selrow.get('breakmins'));


					txtRollDia.setValue(selrow.get('rolldia'));
					txtRollWt.setValue(selrow.get('rollwt'));
					txtReason.setRawValue(selrow.get('reason'));
					cmbPPNo.setValue(selrow.get('ppno'));

                                        txtRollVarietySet.setValue(selrow.get('set'));
		                        flxRollProduction.getStore().removeAll();

                                      
		                        rlno = selrow.get('rollno');
                                        btnModify.show(); 
					flxProduction.getSelectionModel().selectAll();
					var selrows1 = flxProduction.getSelectionModel().getCount();
					var sel1 = flxProduction.getSelectionModel().getSelections();

					for (var i=0;i<selrows1;i++){
		                            if (rlno == sel1[i].data.rollno)
		                            {

				                var RowCnt = flxRollProduction.getStore().getCount() + 1;
				                flxRollProduction.getStore().insert(
				                flxRollProduction.getStore().getCount(),
				                new dgrecord({

						   quality  : sel1[i].data.quality,
						   qlycode  : sel1[i].data.qlycode,
						   qty      : sel1[i].data.rollwt,
						   mins     : sel1[i].data.runmins,
						   set      : sel1[i].data.set,
                                                   intime   : sel1[i].data.intime,
						   outtime  : sel1[i].data.outtime,
                                                   breaks   : sel1[i].data.breaks,
						   breakmins: sel1[i].data.breakmins,
                           			   reason   : sel1[i].data.reason,
                          			   rwdeck   : sel1[i].data.rwdeck,
                                                   shade    : sel1[i].data.shade,
				               }) 
				               );
		                              grid_tot_roll();
		                           } 
		                        }


					txtRunMins.setValue(0);
					txtRollWt.setValue(0);


                                        var rollfirst = 0; 
                                        var findintime ='';
                                        var findouttime ='';
			                flxProduction.getSelectionModel().selectAll();
					var selrows1 = flxProduction.getSelectionModel().getCount();
					var sel1 = flxProduction.getSelectionModel().getSelections();
                                        txtRunMins.setValue(0);
					for (var i=0;i<selrows1;i++){
                                            if (rlno == sel1[i].data.rollno)
		                            {
                                                 if ( rollfirst == 0)
                                                 {
        findintime = Ext.util.Format.date(dtProdDate.getValue(),"d-m-y")+' '+ Ext.util.Format.number(sel1[i].data.intime),'00.00' ;
//                                                    txtInTime.setRawValue(sel1[i].data.intime);
                                                    txtInTime.setRawValue(findintime);
                                                    rollfirst = 1;
                                                 }      
        findouttime = Ext.util.Format.date(dtProdDate.getValue(),"d-m-y")+' '+ Ext.util.Format.number(sel1[i].data.outtime),'00.00' ;

//                                                 txtOutTime.setRawValue(sel1[i].data.outtime);
                                                 txtOutTime.setRawValue(findouttime);

                                                 txtRollWt.setValue(Number(txtRollWt.getValue()) + Number(sel1[i].data.rollwt));
                                                 txtRunMins.setValue(Number(txtRunMins.getValue()) + Number(sel1[i].data.runmins));
                                            } 
                                        }    


			       }
                            }    
                            else
                            {
                                 alert("Finished Entries are done in the Roll No. Can't Modify...");
                            }


		}
		else if (btn === 'no'){
			var sm = flxProduction.getSelectionModel();
			var selrow = sm.getSelected();
                        if (Number(selrow.get('finwt')) == 0) {
				var sm = flxProduction.getSelectionModel();
				var selrow = sm.getSelected();
				flxProduction.getStore().remove(selrow);
				flxProduction.getSelectionModel().selectAll();
                        }
                        else
                        {
                           alert("Finished Entries are done in the Roll No. Can't Delete...");
                        } 
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
    y:170,
    height: 160,
    hidden:false,
    width: 900,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY",    dataIndex: 'quality',sortable:false,width:150,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:10,align:'left',hidden:'true'},//0
        {header: "Department", dataIndex: 'department',sortable:true,width:100,align:'left'},//1
        {header: "DeptCode",   dataIndex: 'deptcode',sortable:true,width:1,align:'left',hidden:true},//2
        {header: "Section",    dataIndex: 'section',sortable:true,width:150,align:'left'},//3
	{header: "Sec.Code",   dataIndex: 'seccode',sortable:true,width:10,align:'left',hidden:true},//15,hidden:true
        {header: "Equipment",  dataIndex: 'equipment',sortable:true,width:150,align:'left'},//3
	{header: "Equip.Code", dataIndex: 'equipcode',sortable:true,width:10,align:'left',hidden:true},//15,hidden:true
        {header: "Reason",     dataIndex: 'reason',sortable:true,width:120,align:'left'},//14
        {header: "From",       dataIndex: 'fromtime',sortable:true,width:70,align:'left'},//14
        {header: "To",         dataIndex: 'totime',sortable:true,width:70,align:'left'},//16,hidden:true
        {header: "Down Mins",  dataIndex: 'downmins',sortable:true,width:70,align:'left'},//16,hidden:true
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

				        cmbProdVariety.setRawValue(selrow.get('quality'));
				        cmbProdVariety.setValue(selrow.get('qlycode'));
				        cmbdowntimedept.setRawValue(selrow.get('department'));
				        cmbdowntimedept.setValue(selrow.get('deptcode'));
				        cmbdownsection.setRawValue(selrow.get('section'));
				        cmbdownsection.setValue(selrow.get('seccode'));

				        cmbdownequip.setRawValue(selrow.get('equipment'));
				        cmbdownequip.setValue(selrow.get('equipcode'));

		                        txtStopReason.setRawValue(selrow.get('reason'));
					txtDownStartTime.setValue(selrow.get('fromtime'));
					txtDownEndTime.setValue(selrow.get('totime'));
					txtDownMins.setRawValue(selrow.get('downmins'));				
                                        flxDownTime.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxDownTime.getSelectionModel();
			var selrow = sm.getSelected();
			flxDownTime.getStore().remove(selrow);
			flxDownTime.getSelectionModel().selectAll();
                        grid_tot();
		}
		}

     	});         
    	}
}
});


var flxRollProduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 110,
    hidden:false,
    width: 470,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "QUALITY",    dataIndex: 'quality',sortable:true,width:130,align:'left'},
        {header: "QLYCode",    dataIndex: 'qlycode',sortable:true,width:10,align:'left',hidden:true},//0
        {header: "SHADE",      dataIndex: 'shade',sortable:true,width:60,align:'left'},
        {header: "Qty (t)",    dataIndex: 'qty',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Mins",       dataIndex: 'mins',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Set",        dataIndex: 'set',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "intime",     dataIndex: 'intime',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "outtime",    dataIndex: 'outtime',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "breaks",     dataIndex: 'breaks',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "break Mins", dataIndex: 'breakmins',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "Reason", dataIndex: 'reason',sortable:true,width:60,align:'left'},//16,hidden:true
        {header: "RW DECK", dataIndex: 'rwdeck',sortable:true,width:90,align:'left'},//16,hidden:true

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
				gridedit_roll = "true";
				editrow_roll = selrow;
                       		cmbVariety.setRawValue(selrow.get('quality')); 
                     		cmbShade.setRawValue(selrow.get('shade')); 
				cmbVariety.setValue(selrow.get('qlycode'));
				txtRollVarietyQty.setValue(selrow.get('qty'));
				txtRollVarietyMins.setValue(selrow.get('mins'));
				txtRollVarietySet.setValue(selrow.get('set'));
 				txtInTime2.setRawValue(selrow.get('intime')); 
				txtOutTime2.setRawValue(selrow.get('outtime')); 
 				txtBreaks.setRawValue(selrow.get('breaks')); 
				txtBreakMins.setRawValue(selrow.get('breakmins')); 
				txtRewinderDeckle.setRawValue(selrow.get('rwdeck')); 


			}
		}
		else if (btn === 'no'){
			var sm = flxRollProduction.getSelectionModel();
			var selrow = sm.getSelected();
			flxRollProduction.getStore().remove(selrow);
			flxRollProduction.getSelectionModel().selectAll();
                        grid_tot_roll();

			    txtRollVarietyQty.setValue(txtRollWt.getRawValue()-txtRollTotalQty.getValue());
			    txtRollVarietyMins.setValue(txtRunMins.getValue() -txtRollTotalMins.getValue());
			    cmbVariety.focus();
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
                                	width       : 200,
                                	x           : 0,
                                	y           : -10,
                                  	border      : false,
                                	items: [dtProdDate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 140,
                                	x           : 230,
                                	y           : -10,
                                  	border      : false,
                                	items: [cmbShift]
                                 },
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 300,
                                	x           : 470,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 340,
                                	x           : 780,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbShiftIncharge]
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
					       height  : 270,
					       width   : 1300,
                                               id      : 'roll-entry',
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
							x           : -10,
							y           : -15,
						    	border      : false,
							items: [lblRollNo]
						   },
	
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 5,
							width       : 100,
							x           : -20,
							y           : 5,
						    	border      : false,
							items: [txtRollNo]
						    },
						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 0,
							width       : 350,
							x           : 50,
							y           : -15,
						    	border      : false,
						    	items: [lblspeed]
						   },
						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 40,
							y           : 5,
						    	border      : false,
							items: [txtSpeed]
						   },



						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 130,
							x           : 100,
							y           : -15,
						    	border      : false,
						    	items: [lbldeckle]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 90,
							y           : 05,
						    	border      : false,
							items: [txtDeckle]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 130,
							x           : 155,
							y           : -15,
						    	border      : false,
						    	items: [lblDraw]
						   },

						  { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 130,
							x           : 145,
							y           : 05,
						    	border      : false,
							items: [txtDraw]
						   },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 500,
							x           : 200,
							y           : -15,
						    	border      : false,
							items: [lblInTime]
						    },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 150,
							x           : 190,
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
							width       : 150,
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
							x           : 470,
							y           : -15,
						    	border      : false,
							items: [lblRunMins]
						   },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 120,
							x           : 455,
							y           : 5,
						    	border      : false,
							items: [txtRunMins]
						    }, 



					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 200,
							x           : 550,
							y           : -15,
						    	border      : false,
							items: [lblRollDia]
						   },
 						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 10,
							width       : 120,
							x           : 535,
							y           : 5,
						    	border      : false,
							items: [txtRollDia]
						    },


					          { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 200,
							x           : 610,
							y           : -15,
						    	border      : false,
							items: [lblRollWt]
						   },
						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 5,
							width       : 120,
							x           : 600,
							y           : 5,
						    	border      : false,
							items: [txtRollWt]
						    }, 


                                                    btnModify,
                                                    flxProduction, 
                                                    ]
					     },
                			   { 
					       xtype   : 'fieldset',
					       title   : '',
                                               id      : 'rollvartyentry',   
					       layout  : 'hbox',
					       border  : true,
					       height  : 252,
					       width   : 520,
					       style:{ border:'1px light blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 780,
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
								x           : 250,
								y           : -10,
							    	border      : false,
								items: [cmbShade]
							   },


							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 300,
								x           : 420,
								y           : 12,
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
								labelWidth  : 26,
								width       : 100,
								x           : 125,
								y           : 15,
							    	border      : false,
								items: [txtRollVarietyMins]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 26,
								width       : 100,
								x           : 200,
								y           : 15,
							    	border      : false,
								items: [txtRollVarietySet]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 160,
								x           : 280,
								y           : 15,
							    	border      : false,
								items: [txtRewinderDeckle]
							   },


 						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 140,
							x           : 0,
							y           : 45,
						    	border      : false,
							items: [txtBreaks]
						    },

 						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 70,
							width       : 150,
							x           : 125,
							y           : 45,
						    	border      : false,
							items: [txtBreakMins]
						    },



     						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 50,
							width       : 450,
							x           : 270,
							y           : 45,
						    	border      : false,
							items: [txtReason]
						    },

						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 50,
							y           : 35,
						    	border      : false,
							items: [txtInTime2]
						    },


						   { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 90,
							x           : 100,
							y           : 35,
						    	border      : false,
							items: [txtOutTime2]
						    },



							  { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 70,
								width       : 700,
								x           : 5,
								y           : 80,
							    	border      : false,
								items: [flxRollProduction]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 20,
								width       : 300,
								x           : -10,
								y           : 193,
							    	border      : false,
								items: [btnConfirm]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 65,
								width       : 300,
								x           : 60,
								y           : 200,
							    	border      : false,
								items: [txtRollTotalQty]
							   },
							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 60,
								width       : 300,
								x           : 180,
								y           : 200,
							    	border      : false,
								items: [txtRollTotalMins]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 55,
								width       : 300,
								x           : 290,
								y           : 200,
							    	border      : false,
								items: [txtTotBreaks]
							   },

							   { 
								xtype       : 'fieldset',
								title       : '',
								labelWidth  : 50,
								width       : 300,
								x           : 390,
								y           : 200,
							    	border      : false,
								items: [txtTotBreakMins]
							   },

                                               ]
                                             },
                			   { 
					       xtype   : 'fieldset',
					       title   : '',
  					       layout  : 'hbox',
					       border  : true,
					       height  : 115,
					       width   : 1300,
					       style:{ border:'1px solid blue',color:' #581845 '},
					       layout  : 'absolute',
					       x       : 0,
					       y       : 315,
					       items:[

//                                                     flxRollProductionDetailed,

			                             { 
						       xtype   : 'fieldset',
							title   : 'Shift Details',
							layout  : 'hbox',
							border  : true,
							height  : 85,
							width   : 350,
							style:{ border:'1px solid blue',color:' #9999ff'},
							layout  : 'absolute',
							x       : 50,
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
									items: [lblShiftProdn]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 80,
									y           : -10,
								    	border      : false,
									items: [lblShiftrunmins]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 110,
									width       : 250,
									x           : 160,
									y           : -10,
								    	border      : false,
									items: [lblShiftBreaks]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 110,
									width       : 250,
									x           : 225,
									y           : -10,
								    	border      : false,
									items: [lblShiftBreakMins]
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
									x           : 70,
									y           : 15,
								    	border      : false,
									items: [txtShiftrunmins]
								   },
						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 200,
									x           : 110,
									y           : 15,
								    	border      : false,
									items: [txtshiftBreaks]
								   },

						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 200,
									x           : 180,
									y           : 15,
								    	border      : false,
									items: [txtshiftBreakmins]
								   },
                                                          ]
                                                     },


						     { 
							        xtype   : 'fieldset',
								title   : 'Today Details',
								layout  : 'hbox',
								border  : true,
								height  : 85,
								width   : 350,
								style:{ border:'1px solid blue',color:' #581845 '},
								layout  : 'absolute',
								x       : 460,
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
										x           : 165,
										y           : -10,
									    	border      : false,
										items: [lblTodayBreaks]
									   },
									  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 100,
										width       : 250,
										x           : 230,
										y           : -10,
									    	border      : false,
										items: [lblTodayBreakMins]
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
										x           : 100,
										y           : 15,
									    	border      : false,
										items: [txtTodayBreaks]
									   },
							 		  { 
										xtype       : 'fieldset',
										title       : '',
										labelWidth  : 50,
										width       : 250,
										x           : 180,
										y           : 15,
									    	border      : false,
										items: [txtTodayBreakMins]
									   },
                                                                ]
		                                       },    


					   { 
						       xtype   : 'fieldset',
							title   : 'UPTO DATE Details',
							layout  : 'hbox',
							border  : true,
							height  : 85,
							width   : 350,
							style:{ border:'1px solid blue',color:' #581845 '},
							layout  : 'absolute',
							x       : 870,
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
									x           : 75,
									y           : -10,
								    	border      : false,
									items: [lblUptoDaterunmins]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 148,
									y           : -10,
								    	border      : false,
									items: [lblUptoDateBreaks]
								   },
								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 100,
									width       : 250,
									x           : 219,
									y           : -10,
								    	border      : false,
									items: [lblUptoDateBreakMins]
								   },

								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : -15,
									y           : 15,
								    	border      : false,
									items: [txtMonthUptoMcprod]
								   },


								  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 10,
									width       : 250,
									x           : 60,
									y           : 15,
								    	border      : false,
									items: [txtMonthUptoRunMins]
								   },
						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 250,
									x           : 95,
									y           : 15,
								    	border      : false,
									items: [txtMonthUptoBreaks]
								   } ,
						 		  { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 250,
									x           : 170,
									y           : 15,
								    	border      : false,
									items: [txtMonthUptoBreakMins]
								   } ,

                          //                                       flxMonthdowntime, 

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
/*
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
							labelWidth  : 110,
							width       : 500,
							x           : 900,
							y           : 30,
						    	border      : false,
							items: [lblDayBreakMins]
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
*/
             {
             xtype: 'panel',
             title: 'Power & Steam Com Entry',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items       : [
			  { 		
					       xtype   : 'fieldset',
					       title   : 'Energy/Water',
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
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 0,
						    	border      : false,
							items: [txtPaperPlantPower]
						    },
						    
					             { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 40,
						    	border      : false,
							items: [txtTGPower]
						    },

						     { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 80,
						    	border      : false,
							items: [txtMainSteam]
						    },

					            { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 120,
						    	border      : false,
							items: [txtExtractionSteamPower]
						    },

						    { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 160,
						    	border      : false,
							items: [txtExtractionSteamPaper]
						    },

						    { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 200,
						    	border      : false,
							items: [txtFreshWater]
						    },

						    { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 240,
						    	border      : false,
							items: [txtSKWater]
						    },

						     { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 280,
						    	border      : false,
							items: [txtEBPowerImport]
						    },

						    { 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 200,
							width       : 500,
							x           : 0,
							y           : 320,
						    	border      : false,
							items: [txtEBPowerExport]
						    },
				       		],
			},
			  
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
// NEW
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
                  		cmbShiftIncharge.setFocus();
		             }
                             else
                             {
                                gstFlag = "Add";


                                flxProduction.getStore().removeAll();
                                flxDownTime.getStore().removeAll();	
			        flxRollProduction.getStore().removeAll();

                        
//				TrnProdnFormpanel.getForm().reset();
//				RefreshData();
//                                Ext.getCmp('roll-entry').setDisabled(false);

                                shift_data_check();
                                Previous_shift_data_check();
                                UptoPrevious_shift_data_check();
                                Ext.getCmp('dtProdDate').setDisabled(true);  
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


			    Ext.getCmp('dtProdDate').setDisabled(true);  
			    Ext.getCmp('cmbShift').setDisabled(true)

                            flxProduction.getStore().removeAll();
                            flxDownTime.getStore().removeAll();	
			    flxRollProduction.getStore().removeAll();



		            loadShiftDatastore.removeAll();
		            loadShiftDatastore.load({
	     			url: 'ClsProdnEntry.php',
				params: {
				    task: 'loadShiftDetails_1',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    shift1   : cmbShift.getValue(),
                                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),

        
				},
		              	callback:function()
		                {
                                  var cnt=loadShiftDatastore.getCount(); 
                                  if (cnt >0)
                                  {    
                                        Ext.getCmp('roll-entry').setDisabled(false);

                                        prodseqno = loadShiftDatastore.getAt(0).get('prdh_id')
                                        cmbsupervisor.setValue(loadShiftDatastore.getAt(0).get('prdh_spvrcode'));
                                        cmbShiftIncharge.setValue(loadShiftDatastore.getAt(0).get('prdh_operator'));
                                     
   					for(var j=0; j<cnt; j++)
 		                        { 
					        var RowCnt = flxProduction.getStore().getCount() + 1;
					        flxProduction.getStore().insert(
					        flxProduction.getStore().getCount(),
					        new dgrecord({
					           sno       : flxProduction.getStore().getCount()+1,
						   quality   : loadShiftDatastore.getAt(j).get('var_desc'),
 			                           qlycode   : loadShiftDatastore.getAt(j).get('prd_variety'),
 			                           shade     : loadShiftDatastore.getAt(j).get('prd_shade'),

                          			   rollno    : loadShiftDatastore.getAt(j).get('prd_rollno'),
						   speed     : loadShiftDatastore.getAt(j).get('prd_speed'),
						   deckle    : loadShiftDatastore.getAt(j).get('prd_deckle'),
					           draw      : loadShiftDatastore.getAt(j).get('prd_draw'),
					           intime    : loadShiftDatastore.getAt(j).get('prd_roll_intime'),
						   outtime   : loadShiftDatastore.getAt(j).get('prd_roll_outtime'),
						   runmins   : loadShiftDatastore.getAt(j).get('prd_runmins'),
						   breaks    : loadShiftDatastore.getAt(j).get('prd_breaks'),
						   breakmins  : loadShiftDatastore.getAt(j).get('prd_breakmins'),

                                                   set       : loadShiftDatastore.getAt(j).get('prd_set'),
					           rolldia   : loadShiftDatastore.getAt(j).get('prd_roll_dia'),
					           rollwt    : loadShiftDatastore.getAt(j).get('prd_rollwt'),
					           reason    : loadShiftDatastore.getAt(j).get('prd_reason'),  
						   ppno      : loadShiftDatastore.getAt(j).get('prd_ppno'),
						   finwt     : loadShiftDatastore.getAt(j).get('prd_finprod'),
						   rwdeck    : loadShiftDatastore.getAt(j).get('prd_rwdeck'),

					       }) 
					       );

                                        }
                                        grid_tot();
	//				grid_tot_downtime();
					grid_tot_roll();
                                         Previous_shift_data_check();
                                        UptoPrevious_shift_data_check();
                                        flxRollProduction.getSelectionModel().clearSelections();
                                     }
                                     else
                                     {
                                        alert("Data Not found...");
                                     }   
		                }

		     	    }); 
      flxRollProduction.getSelectionModel().clearSelections();
/*
		            loadShiftDatastore2.removeAll();
		            loadShiftDatastore2.load({
	     			url: 'ClsProdnEntry.php',
				params: {
				    task: 'loadShiftDetails_2',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    shift1   : cmbShift.getValue(),
                                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
        
				},
		              	callback:function()
		                {
                                        var cnt=loadShiftDatastore2.getCount();
   					for(var j=0; j<cnt; j++)
 		                        { 
					        var RowCnt = flxRollProductionDetailed.getStore().getCount() + 1;
					        flxRollProductionDetailed.getStore().insert(
					        flxRollProductionDetailed.getStore().getCount(),
					        new dgrecord({
				                   rollno   : loadShiftDatastore2.getAt(j).get('prdv_rollno'),
						   quality  : loadShiftDatastore2.getAt(j).get('var_desc'),
						   qlycode  : loadShiftDatastore2.getAt(j).get('prdv_varty'),
						   qty      : loadShiftDatastore2.getAt(j).get('prdv_qty'),
						   mins     : loadShiftDatastore2.getAt(j).get('prdv_mins'),
						   set      : loadShiftDatastore2.getAt(j).get('prdv_sets'),
                                                   finwt    : loadShiftDatastore2.getAt(j).get('prdv_finwt'),

					       }) 
					       );
                                        }
                                        grid_tot();
					grid_tot_downtime();
					grid_tot_roll();

		                }
		     	    }); 

	                    loadShiftDownTimeDatastore.removeAll();
		            loadShiftDownTimeDatastore.load({
	     			url: 'ClsProdnEntry.php',
				params: {
				    task: 'loadShiftDownTime',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    shift1   : cmbShift.getValue(),
                                    edate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
        
				},
		              	callback:function()
		                {
                                        var cnt=loadShiftDownTimeDatastore.getCount();
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
						   reason      : loadShiftDownTimeDatastore.getAt(j).get('prds_reason'),
						   fromtime    : loadShiftDownTimeDatastore.getAt(j).get('prds_starttime'),
						   totime      : loadShiftDownTimeDatastore.getAt(j).get('prds_endtime'),
						   downmins    : loadShiftDownTimeDatastore.getAt(j).get('prds_mins'),

					       }) 
					       );
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

                 		grid_tot_downtime();
                    		grid_tot_roll();			

		                }

		     	    }); 
*/

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
                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
//alert(fromdate);
//alert(todate);
    if(Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Production  Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Production Date is not in current finance year. Please check");
    }


		    else if (flxProduction.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
        	                gstSave="false";
	                    }
 		    else if(cmbsupervisor.getRawValue()=="" || cmbsupervisor.getValue()==0)
		    {
			alert("Select Supervisor Name..");
			gstSave="false";
			cmbShiftIncharge.setFocus();
		    }
 		    else if(cmbShiftIncharge.getRawValue()=="" || cmbShiftIncharge.getValue()==0)
		    {
			alert("Select Shift Incharge Name..");
			gstSave="false";
			cmbShiftIncharge.setFocus();
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

/*
                            var DownTimeData = flxDownTime.getStore().getRange();                                        
                            var DownTimeupData = new Array();
                            Ext.each(DownTimeData, function (record) {
                                DownTimeupData.push(record.data);
                            });

*/
                            var ProdData = flxProduction.getStore().getRange();                                        
                            var ProdupData = new Array();
                            Ext.each(ProdData, function (record) {
                                ProdupData.push(record.data);
                            });




//alert(cmbPO.getRawValue());

                            Ext.Ajax.request({
                            url: 'TrnProdnEntrySave.php',
                            params :
                             {

				cnt: ProdData.length,
                               	griddet: Ext.util.JSON.encode(ProdupData),    

//				cntRoll: RollData.length,
//                             	griddet_roll : Ext.util.JSON.encode(RollupData),    

                                savetype:gstFlag,
                                prdhseqno      : prodseqno,
                             	prdhcompcode   : Gincompcode,
				prdhfincode    : GinFinid,
				prdhdate       : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
				prdhshift      : cmbShift.getRawValue(),
		                prdhspvrcode   : cmbsupervisor.getValue(),
				prdhoperator   : cmbShiftIncharge.getValue(),
                                prdhppno       : Number(cmbPPNo.getValue()),
				prdhvariety    : Number(cmbPPvariety.getValue()),
	 	 		prdhavlmins    : Number(txtShiftrunmins.getValue()),
				prdhrunmins    : Number(txtShiftrunmins.getRawValue()),
				prdhdownmins   : Number(txtshiftBreakmins.getRawValue()),
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
//                                    flxProduction.getStore().removeAll();
//                                    flxRollProductionDetailed.getStore().removeAll();
//                                    flxDownTime.getStore().removeAll();
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
                            TrnProdnFormpanel.getForm().reset();
                            flxProduction.getStore().removeAll();
//                            flxRollProductionDetailed.getStore().removeAll();
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



    Ext.getCmp('dtProdDate').setDisabled(false);  
    Ext.getCmp('cmbShift').setDisabled(false)
    btnModify.hide(); 
    txtInTime2.hide(); 
    txtOutTime2.hide(); 
    flxProduction.getStore().removeAll();
    flxProduction.getStore().removeAll();
    flxDownTime.getStore().removeAll();

        datafound = 0;
  //      Ext.getCmp('rollvartyentry').hide();
        Ext.getCmp('roll-entry').setDisabled(true);
	loadPPNoDatastore.removeAll();
	loadPPNoDatastore.load({
	 url: 'ClsProdnEntry.php',
		params: {
	    	   task: 'loadPPNo',
		   compcode:Gincompcode,
		   finid:GinFinid,
   
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
onEsc:function(){
},
	listeners:{
               show:function(){
                      RefreshData();	   	
	   	}

		}
    });
    TrnProdnEntry.show();  
});
