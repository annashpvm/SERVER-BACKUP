Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');


var gridedit = "false";
var editrow = 0;

var gstFlag = "Add";

var reelno = "";


var findno = 0;


var checkReelNoDatastore = new Ext.data.Store({
	id: 'checkReelNoDatastore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"CheckNumber"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'r_entryno',  'r_w_date','nos'
	]),
});



var loadRWEntryNoDetailDataStore = new Ext.data.Store({
	id: 'loadRWEntryNoDetailDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadRWEntryNoDetail"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'r_entryno', 'r_prod_date', 'r_shift', 'r_w_date', 'r_operator','r_rollno', 'r_varietycode', 'r_mcshift',
	'r_rollwt', 'r_winder_no', 'r_set', 'r_deckle', 'r_size', 'r_joints','r_reel_dia', 'r_ppno', 
	'r_sono', 'r_custcode', 'r_reelno', 'r_reelwt', 'r_process', 'r_qcresult', 'r_qcresult_old',
	'r_qcreason', 'r_old_variety', 'r_process_date', 'r_location', 'r_sizecode', 'r_reel_refno',
	'r_winder_reelno','var_desc', 'var_bf', 'var_gsm','spvr_code', 'spvr_name','cust_ref'
	]),
});

var loadRWEntryNoListDataStore = new Ext.data.Store({
	id: 'loadRWEntryNoListDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadRWEntryNoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'r_entryno'
	]),
});


var loadSOCustomerDataStore = new Ext.data.Store({
	id: 'loadSOCustomerDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadSOCustomer"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'cust_ref','cust_code'
	]),
});


var loadAllCustomerDataStore = new Ext.data.Store({
	id: 'loadAllCustomerDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadAllCustomer"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'cust_ref','cust_code'
	]),
});

var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnWinderEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadSONoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_sono'
	]),
});

var findReelNoDatastore = new Ext.data.Store({
      id: 'findReelNoDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findReelNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reelno'
      ]),
    });

var loadRollNoDatastore = new Ext.data.Store({
      id: 'loadRollNoDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });


var loadEntryNoDatastore = new Ext.data.Store({
      id: 'loadEntryNoDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRWEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'entryno'
      ]),
    });


var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
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



var loadVarietyDetailsDatastore = new Ext.data.Store({
      id: 'loadVarietyDetailsDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarietyDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_bf','var_gsm','prd_deckle','prd_breaks','prd_roll_dia','prdv_qty','prdv_sets', 'prd_seqno'
      ]),
    });

var loadMCShiftDatastore = new Ext.data.Store({
      id: 'loadMCShiftDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMCShiftDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_shift'
      ]),
    });

var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeofVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','sizecode'
      ]),
    })

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  90,
        displayField    : 'sizecode', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSizeDatastore,
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


function get_variety_of_rolls()
{
                loadVarietyDetailsDatastore.removeAll();
     		loadVarietyDetailsDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadVarietyDetails',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollNo.getValue(),
                            varty : cmbVariety.getValue(),
                            rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
                        },
               	callback:function()
			{
//	'var_bf','var_gsm','prd_deckle','prd_breaks','prd_roll_dia','prdv_qty','prdv_sets'
                             txtBF.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_bf'));
                             txtGSM.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_gsm'));
                             txtRollwt.setValue(loadVarietyDetailsDatastore.getAt(0).get('prdv_qty'));
                             txtRollDia.setValue(loadVarietyDetailsDatastore.getAt(0).get('prd_roll_dia'));
                             txtBreaks.setValue(loadVarietyDetailsDatastore.getAt(0).get('prd_breaks'));
                             txtNoofSets.setValue(loadVarietyDetailsDatastore.getAt(0).get('prdv_sets'));
                             txtSeqNo.setValue(loadVarietyDetailsDatastore.getAt(0).get('prd_seqno'));

			     var newdata = '';
			       for(var i=1;i<txtNoofSets.getValue()+1;i++)
			       {
				   newdata = newdata + i;
				}
	
			      cmbSet.reset();
			      cmbSet.store.loadData(newdata); 
                              cmbSet.setValue("1");


                        }
                });

                loadMCShiftDatastore.removeAll();
     		loadMCShiftDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadMCShiftDetails',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollNo.getValue(),
                            varty : cmbVariety.getValue(),
                            rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
                        },
               	callback:function()
			{
                           cmbMcShift.setValue(loadMCShiftDatastore.getAt(0).get('prd_shift'));
                           cmbMcShift.setRawValue(loadMCShiftDatastore.getAt(0).get('prd_shift'));
                      
                        }
                });

                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSizeofVariety',

                            varty : cmbVariety.getValue(),
                        },
               	callback:function()
			{
                        }
                });

}


var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  150,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyDatastore,
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
                get_variety_of_rolls();
	}
	}
   });

var lblVariety = new Ext.form.Label({
	fieldLabel  : 'Variety',
	id          : 'lblvar',
	name        : 'lblvar',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblBF = new Ext.form.Label({
	fieldLabel  : 'BF',
	id          : 'lblBF',
	name        : 'lblBF',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblGSM = new Ext.form.Label({
	fieldLabel  : 'GSM',
	id          : 'lblGSM',
	name        : 'lblGSM',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtBF = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtBF',
        name        : 'txtBF',
        width       : 60,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtGSM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       : 60,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblbreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblbreaks',
	name        : 'lblbreaks',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtBreaks = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtBreaks',
        name        : 'txtBreaks',
        width       : 60,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});


var lblNoofSets = new Ext.form.Label({
	fieldLabel  : 'Set',
	id          : 'lblNoofSets',
	name        : 'lblNoofSets',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});




var txtNoofSets = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtNoofSets',
        name        : 'txtNoofSets',
        width       : 60,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});


var txtSeqNo = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSeqNo',
        name        : 'txtSeqNo',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        hidden   : 'true'        
});

var dtProdDate = new Ext.form.DateField({
    fieldLabel : 'Prod.Date',
    id         : 'dtProdDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
    enableKeyEvents: true,
    listeners:{
           blur:function(){
		loadRollNoDatastore.removeAll();
		loadRollNoDatastore.load({
		 url: 'ClsTrnWinderEntry.php',
			params: {
		    	   task: 'loadRollNo',
			   compcode : Gincompcode,
			   finid    : GinFinid,   
		           rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
			 },
			 callback:function()
			   {

			   } 
		  });

           },
    }     
});

var dtEntryDate = new Ext.form.DateField({
    fieldLabel : 'Entry Date',
    id         : 'dtEntryDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
    enableKeyEvents: true,
    listeners:{
           blur:function(){
		loadEntryNoDatastore.removeAll();
		loadEntryNoDatastore.load({
			url: 'ClsTrnWinderEntry.php',
		        params: {
		    	task     : 'loadRWEntryNo',
		        compcode : Gincompcode,
		        finid    : GinFinid,
		        rdate    : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"),   
			},
			scope:this,
			callback:function()
	       		{
		           txtEntryNo.setValue(loadEntryNoDatastore.getAt(0).get('entryno'));
			}
		  });

           },
    }  
    
});




var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry no',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var cmbEntryNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry no',
        width           : 60,
        displayField    : 'r_entryno', 
        valueField      : 'r_entryno',
        hiddenName      : '',
        id              : 'cmbEntryNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRWEntryNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
 	hidden  	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
          select: function(){
            txtEntryNo.setValue(cmbEntryNo.getValue()),


            flxWinderDetails.getStore().removeAll();
            loadRWEntryNoDetailDataStore.removeAll();
            loadRWEntryNoDetailDataStore.load({
		url: 'ClsTrnWinderEntry.php',
		params: {
		    task: 'loadRWEntryNoDetail',
		    finid    : GinFinid,
		    compcode : Gincompcode,
                    rdate    : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"),  
                    entryno  : cmbEntryNo.getValue(),
		},
              	callback:function()
                {
                  dtProdDate.setRawValue(Ext.util.Format.date(loadRWEntryNoDetailDataStore.getAt(0).get('r_prod_date'),"d-m-Y"));

                  cmbShift.setValue(loadRWEntryNoDetailDataStore.getAt(0).get('r_shift'));
                  cmbOperator.setValue(loadRWEntryNoDetailDataStore.getAt(0).get('r_operator'));          
                  var cnt=loadRWEntryNoDetailDataStore.getCount();
                  if(cnt>0)
                  {    
		          for(var j=0; j<cnt; j++)
		          { 
	                        var RowCnt = flxWinderDetails.getStore().getCount() + 1;
                                flxWinderDetails.getStore().insert(
                                flxWinderDetails.getStore().getCount(),
                                new dgrecord({

		                   quality   : loadRWEntryNoDetailDataStore.getAt(j).get('var_desc'),
		                   qlycode   : loadRWEntryNoDetailDataStore.getAt(j).get('r_varietycode'),
			           bf        : loadRWEntryNoDetailDataStore.getAt(j).get('var_bf'),
				   gsm       : loadRWEntryNoDetailDataStore.getAt(j).get('var_gsm'),
                                   rollno    : loadRWEntryNoDetailDataStore.getAt(j).get('r_rollno'),
				   rollwt    : loadRWEntryNoDetailDataStore.getAt(j).get('r_rollwt'),
                                   mcshift   : loadRWEntryNoDetailDataStore.getAt(j).get('r_mcshift'),
                                   windno    : loadRWEntryNoDetailDataStore.getAt(j).get('r_winder_no'),
                                   set       : loadRWEntryNoDetailDataStore.getAt(j).get('r_set'),
			           deckle    : loadRWEntryNoDetailDataStore.getAt(j).get('r_deckle'),
				   size      : loadRWEntryNoDetailDataStore.getAt(j).get('r_size'),
				   sizecode  : loadRWEntryNoDetailDataStore.getAt(j).get('r_sizecode'),
                                   joints    : loadRWEntryNoDetailDataStore.getAt(j).get('r_joints'),
                                   dia       : loadRWEntryNoDetailDataStore.getAt(j).get('r_reel_dia'),
                                   reelno    : loadRWEntryNoDetailDataStore.getAt(j).get('r_reelno'),  
			           sono      : loadRWEntryNoDetailDataStore.getAt(j).get('r_sono'),
				   customer  : loadRWEntryNoDetailDataStore.getAt(j).get('cust_ref'),
	                           custcode  : loadRWEntryNoDetailDataStore.getAt(j).get('r_custcode'),  
	                           process   : loadRWEntryNoDetailDataStore.getAt(j).get('r_process'),  

                             }) 
                               );
                          }       

                  }
              }
     	    }); 

          }
	}
   });


var cmbShift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 70,
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
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
   
var loadSupervisorDatastore = new Ext.data.Store({
      id: 'loadSupervisorDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnWinderEntry.php',      // File to connect to
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
    
    var cmbOperator = new Ext.form.ComboBox({
        fieldLabel      : 'RW Operator',
        width           : 150,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbOperator',
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

var lblwinderno = new Ext.form.Label({
	fieldLabel  : 'Winder No',
	id          : 'lblwinderno',
	name        : 'lblwinderno',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblRollNo = new Ext.form.Label({
	fieldLabel  : 'Roll No',
	id          : 'lblRollNo',
	name        : 'lblRollNo',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblSet = new Ext.form.Label({
	fieldLabel  : 'Set',
	id          : 'lblSet',
	name        : 'lblSet',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblbatchno = new Ext.form.Label({
	fieldLabel  : 'Batch No',
	id          : 'lblbatchno',
	name        : 'lblbatchno',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblMcShift = new Ext.form.Label({
	fieldLabel  : 'M/C Shift',
	id          : 'lblMcShift',
	name        : 'lblMcShift',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblRollWt = new Ext.form.Label({
	fieldLabel  : 'Roll WT (t)',
	id          : 'lblRollWt',
	name        : 'lblRollWt',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblwinderdeckle = new Ext.form.Label({
	fieldLabel  : 'Winder Deckle',
	id          : 'lblwinderdeckle',
	name        : 'lblwinderdeckle',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblrolldia = new Ext.form.Label({
	fieldLabel  : 'Roll Dia',
	id          : 'lblrolldia',
	name        : 'lblrolldia',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});
 

var cmbWinderNo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : '1', 
        valueField      : '1',
        hiddenName      : '',
        id              : 'cmbWinderNo',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1','2'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

                Generate_Reelno();
                findReelNoDatastore.removeAll();
     		findReelNoDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'findReelNo',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbWinderNo.getValue()
                        },
               	callback:function()
			{
                      //  alert(findReelNoDatastore.getAt(0).get('reelno'));
                        }
                });

	}
	}
   });


function Generate_Reelno()
{
		var dt = dtProdDate.getValue();
		var m = Ext.util.Format.date(dtProdDate.getValue(),"m");
		var y = Ext.util.Format.date(dtProdDate.getValue(),"y");
                var rwno =  cmbWinderNo.getValue(); 
		var rno = "00"+cmbRollNo.getValue(); 
                var sno = "0"+txtRollSlNo.getValue();   

                  
                var roll = rno.slice(-3);         

                sno    = sno.slice(-2);         
		reelno = y+m+rwno+roll+sno;

		txtReelNo.setValue(reelno);

}


var cmbRollNo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'prd_rollno', 
        valueField      : 'prd_rollno',
        hiddenName      : '',
        id              : 'cmbRollNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRollNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
		select: function()
		{

                Generate_Reelno();
		loadVarietyDatastore.removeAll();
		loadVarietyDatastore.load({
		url: 'ClsTrnWinderEntry.php',
		params: {
		    task: 'loadVariety',
		    finid    : GinFinid,
		    compcode : Gincompcode,
		    rollno   : cmbRollNo.getValue(),
                    rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
		},
		callback:function()
		{
                      cmbVariety.setRawValue(loadVarietyDatastore.getAt(0).get('var_desc'));
                      cmbVariety.setValue(loadVarietyDatastore.getAt(0).get('var_groupcode'));
                      get_variety_of_rolls();

		}
	});


	}
	}
   });

var cmbSet = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbSet',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });


var cmbMcShift = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'prd_shift', 
        valueField      : 'prd_shift',
        hiddenName      : '',
        id              : 'cmbMcShift',
        typeAhead       : true,
        mode            : 'local',
        store           : loadMCShiftDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var txtRollwt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRollwt',
        name        : 'txtRollwt',
        width       : 90,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtwinderdeck = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtwinderdeck',
        name        : 'txtwinderdeck',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtRollDia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRollDia',
        name        : 'txtRollDia',
        width       : 50,
	readOnly    :true,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtvar = new Ext.form.NumberField({
        fieldLabel  : 'Variety',
        id          : 'txtvar',
        name        : 'txtvar',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var cmbPPNo = new Ext.form.ComboBox({
        fieldLabel      : 'PP No.',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbPPNo',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });


var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 240,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

                loadSOCustomerDataStore.removeAll();
     		loadSOCustomerDataStore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOCustomer',
		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue()
                        },
               	callback:function()
			{
                         
                       cmbCustomer.setValue(loadSOCustomerDataStore.getAt(0).get('cust_code'));       
                        }
               });
	}
	}
   });




var lblsize = new Ext.form.Label({
	fieldLabel  : 'Size',
	id          : 'lblsize',
	name        : 'lblsize',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:8px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblSONo = new Ext.form.Label({
	fieldLabel  : 'SO No',
	id          : 'lblSONo',
	name        : 'lblSONo',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:8px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblCustomer = new Ext.form.Label({
	fieldLabel  : 'Customer',
	id          : 'lblCustomer',
	name        : 'lblCustomer',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:8px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var dgrecord = Ext.data.Record.create([]);




var dgrecord = Ext.data.Record.create([]);
;

var lblJoints = new Ext.form.Label({
	fieldLabel  : 'Joints',
	id          : 'lblJoints',
	name        : 'lblJoints',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblreeldia = new Ext.form.Label({
	fieldLabel  : 'Reel DIA',
	id          : 'lblreeldia',
	name        : 'lblreeldia',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtJoints = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtJoints',
        name        : 'txtJoints',
        width       : 40,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});



var txtReelDia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtReelDia',
        name        : 'txtReelDia',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

/*
var txtCustomer = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});
*/

var txtReelNo = new Ext.form.NumberField({
        fieldLabel  : 'Reel No',
        id          : 'txtReelNo',
        name        : 'txtReelNo',
        width       : 180,
        enableKeyEvents: true,
    	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'10'},     	
	tabindex : 1,        
});


var txtRollSlNo = new Ext.form.NumberField({
        fieldLabel  : 'No',
        id          : 'txtRollSlNo',
        name        : 'txtRollSlNo',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,  
 	hidden   : true, 
            
});

/*
function find_reelno()
{

	    checkReelNoDatastore.removeAll();
	    checkReelNoDatastore.load({
	    url: 'ClsTrnWinderEntry.php', // File to connect to
	    params:
		    {
		        task: "CheckNumber",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        reelno    : txtReelNo.getValue(),
		    },
	            scope:this,
           callback: function () {
                   if (checkReelNoDatastore.getAt(0).get('nos') > 0) {

                    gstadd="false";
		   alert("The Number " + txtReelNo.getValue() + " Alerady entered in the Entry No. " + checkReelNoDatastore.getAt(0).get('r_entryno') +  " in the Date of " + checkReelNoDatastore.getAt(0).get('r_w_date')) ;

                   }
            }     
           });
}
*/


function grid_tot()
{
        var nos = 0;
        var wt  = 0;
        var Row= flxWinderDetails.getStore().getCount();
        flxWinderDetails.getSelectionModel().selectAll();
        var sel=flxWinderDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            nos++;
            wt=wt+Number(sel[i].data.reelwt);
        }
        txttotnoreelno.setValue(nos);
        txttotwt.setValue(wt);

        flxWinderDetails.getSelectionModel().clearSelections();

}

var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 40,
    x       : 720,
    y       : 60,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

   listeners:{
       click: function(){       
	   var gstadd="true";

	    checkReelNoDatastore.removeAll();
	    checkReelNoDatastore.load({
	    url: 'ClsTrnWinderEntry.php', // File to connect to
	    params:
		    {
		        task: "CheckNumber",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        reelno    : txtReelNo.getValue(),
		    },
	            scope:this,
           callback: function () {
                   if (checkReelNoDatastore.getAt(0).get('nos') > 0) {

                    gstadd="false";
//		   alert("The Number " + txtReelNo.getValue() + " Alerady entered in the Entry No. " + checkReelNoDatastore.getAt(0).get('r_entryno') +  " in the Date of " + checkReelNoDatastore.getAt(0).get('r_w_date')) ;

		   alert("The Number " + txtReelNo.getValue() + " Alerady entered ");

                   }



            if (checkReelNoDatastore.getAt(0).get('nos') == 0) {

		    if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
		    {
			alert("Select Variety Name..");
		        gstadd="false";
		        cmbVariety.setFocus(); 	
		    }

		    if(cmbRollNo.getRawValue()=="" || cmbRollNo.getValue()==0)
		    {
			alert("Select Roll NO..");
		        gstadd="false";
		        cmbRollNo.setFocus();
		    }
		    if(txtRollwt.getRawValue()=="" || txtRollwt.getValue()==0)
		    {
			alert("Roll weight is Empty..");
		        gstadd="false";
		        txtrollwt.Focus();
		    }
		    if(txtReelNo.getRawValue()=="" || txtReelNo.getValue()==0)
		    {
			alert("Reel No is Empty..");
		        gstadd="false";
		        txtReelNo.setFocus();
		    }
		    if(txtJoints.getRawValue()=="")
		    {
			alert("Joints is Empty..");
		        gstadd="false";
		        txtJoints.setFocus();
		    }
            if(gstadd=="true")
            {
                flxWinderDetails.getSelectionModel().clearSelections();
//                flxWinderDetails.getSelectionModel().selectAll();
//                var selrows = flxWinderDetails.getSelectionModel().getCount();
//                var sel = flxWinderDetails.getSelectionModel().getSelections();

                flxWinderDetails.getSelectionModel().selectAll();
                var selrows = flxWinderDetails.getSelectionModel().getCount();
                var sel = flxWinderDetails.getSelectionModel().getSelections();

                var cnt = 0;


                for (var i=0;i<selrows;i++){
                    if (sel[i].data.reelno === txtReelNo.getRawValue())
		    {
                        cnt = cnt + 1;
                    }
                }
                if (selrows == 1 && cnt == 0)
                {   
                   flxWinderDetails.getStore().remove(0);             
                }
        	if(gridedit === "true")
	          {
			gridedit = "false";

                       	var idx = flxWinderDetails.getStore().indexOf(editrow);
			sel[idx].set('quality' , cmbVariety.getRawValue());
			sel[idx].set('qlycode' , cmbVariety.getValue());
			sel[idx].set('bf'      , txtBF.getRawValue());
			sel[idx].set('gsm'     , txtGSM.getRawValue());
			sel[idx].set('rollno'  , cmbRollNo.getRawValue());
			sel[idx].set('rollwt'  , txtRollwt.getRawValue());
			sel[idx].set('mcshift' , cmbMcShift.getRawValue());
			sel[idx].set('windno'  , cmbWinderNo.getRawValue());
			sel[idx].set('set'     , cmbSet.getRawValue());
			sel[idx].set('deckle'  , txtwinderdeck.getValue());
			sel[idx].set('size'    , cmbSize.getRawValue());
			sel[idx].set('sizecode', cmbSize.getValue());
			sel[idx].set('joints'  , txtJoints.getRawValue());
			sel[idx].set('dia'     , txtReelDia.getRawValue());
			sel[idx].set('reelno'  , txtReelNo.getRawValue());
                        sel[idx].set('sono'    , cmbSONo.getRawValue());
			sel[idx].set('customer', cmbCustomer.getRawValue());
		        sel[idx].set('custcode', cmbCustomer.getValue());
	                sel[idx].set('process' , "N");
                        sel[idx].set('seqno', txtSeqNo.getValue());


		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Reel Number already Entered.");
                } else
                { 

                                var RowCnt = flxWinderDetails.getStore().getCount() + 1;
                                flxWinderDetails.getStore().insert(
                                flxWinderDetails.getStore().getCount(),
                                new dgrecord({
//                                 sno       : flxWinderDetails.getStore().getCount()+1,
		                   quality   : cmbVariety.getRawValue(),
		                   qlycode   : cmbVariety.getValue(),
			           bf        : txtBF.getRawValue(),
				   gsm       : txtGSM.getRawValue(),
                                   rollno    : cmbRollNo.getRawValue(),
				   rollwt    : txtRollwt.getRawValue(),
                                   mcshift   : cmbMcShift.getRawValue(),
                                   windno    : cmbWinderNo.getRawValue(),
                                   set       : cmbSet.getRawValue(),
			           deckle    : txtwinderdeck.getRawValue(),
				   size      : cmbSize.getRawValue(),
				   sizecode  : cmbSize.getValue(),
                                   joints    : Number(txtJoints.getRawValue()),
                                   dia       : Number(txtReelDia.getRawValue()),
                                   reelno    : txtReelNo.getRawValue(),  
			           sono      : cmbSONo.getRawValue(),
				   customer  : cmbCustomer.getRawValue(),
	                           custcode  : cmbCustomer.getValue(),
                                   process   : "N",
                                   seqno     : Number(txtSeqNo.getRawValue()),
                               }) 
                               );

                               txtRollSlNo.setValue(txtRollSlNo.getValue()+1);   
                               txtReelNo.setValue(txtReelNo.getValue()+1);


                               /* txtvar.setValue('');
                               txtRollVarietySet.setValue('');
                               txtRollVarietyMins.setValue('');*/

                }

             }


           // grid_tot_roll();

}
       }
      });
       }
    }      



});


var dgrecord = Ext.data.Record.create([]);
var flxWinderDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
  //      autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 130,
        width: 950,
        x: 0,
        y: 115,        
        columns: [   
            {header: "Quality"     , dataIndex: 'quality',sortable:true,width:140,align:'left'},   
            {header: "Variety Code", dataIndex: 'qlycode',sortable:true,width:1,align:'left'}, 
            {header: "BF"          , dataIndex: 'bf',sortable:true,width:50,align:'left'}, 
            {header: "GSM"         , dataIndex: 'gsm',sortable:true,width:50,align:'left'}, 
            {header: "Roll No"     , dataIndex: 'rollno',sortable:true,width:80,align:'left'},  
            {header: "Roll Wt"     , dataIndex: 'rollwt',sortable:true,width:80,align:'left'}, 
            {header: "M/C Shift"   , dataIndex: 'mcshift',sortable:true,width:70,align:'left'}, 
            {header: "Wind.No"     , dataIndex: 'windno',sortable:true,width:70,align:'left'}, 
            {header: "Set"         , dataIndex: 'set',sortable:true,width:50,align:'left'}, 
            {header: "Deckle"      , dataIndex: 'deckle',sortable:true,width:70,align:'left'}, 
            {header: "SIZE"        , dataIndex: 'size',sortable:true,width:100,align:'left'}, 
            {header: "SIZE CODE"   , dataIndex: 'sizecode',sortable:true,width:10,align:'left'}, 
            {header: "Joints"      , dataIndex: 'joints',sortable:true,width:50,align:'left'}, 
            {header: "DIA"         , dataIndex: 'dia',sortable:true,width:50,align:'left'}, 
            {header: "Reel No"     , dataIndex: 'reelno',sortable:true,width:100,align:'left'}, 
            {header: "Reel WT"     , dataIndex: 'reelwt',sortable:true,width:100,align:'left'}, 
            {header: "SO No"       , dataIndex: 'sono',sortable:true,width:100,align:'left'}, 
            {header: "Customer"    , dataIndex: 'customer',sortable:true,width:180,align:'left'}, 
            {header: "CustCode"    , dataIndex: 'custcode',sortable:true,width:70,align:'left'}, 
            {header: "Process"     , dataIndex: 'process',sortable:true,width:70,align:'left'}, 
            {header: "Seq.No"      , dataIndex: 'seqno',sortable:true,width:70,align:'left'}, 
                                                        
        ],
        store:[''],

    listeners:{	

            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {

             Ext.Msg.show({
             title: 'REWINDER ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxWinderDetails.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
                                if (selrow.get('process') == "N")
                                {   
					flxWinderDetails.getSelectionModel().clearSelections();

				        cmbRollNo.setRawValue(selrow.get('rollno'));
				        cmbRollNo.setValue(selrow.get('rollno'));
				        cmbVariety.setRawValue(selrow.get('quality'));
				        cmbVariety.setValue(selrow.get('qlycode'));
		                        txtBF.setValue(selrow.get('bf'));
					txtGSM.setValue(selrow.get('gsm'));
					txtRollwt.setValue(selrow.get('rollwt'));
					cmbMcShift.setRawValue(selrow.get('mcshift'));

					cmbWinderNo.setRawValue(selrow.get('windno'));
					cmbWinderNo.setValue(selrow.get('windno'));

		    			cmbSet.setRawValue(selrow.get('set'));
					cmbSet.setValue(selrow.get('set'))

					txtwinderdeck.setValue(selrow.get('deckle'));
		          		cmbSize.setRawValue(selrow.get('size'));
		          		cmbSize.setValue(selrow.get('sizecode'));

					txtJoints.setValue(selrow.get('joints'));
					txtReelDia.setValue(selrow.get('dia'));
                			txtReelNo.setValue(selrow.get('reelno'));
					cmbSONo.setValue(selrow.get('sono'));
					cmbCustomer.setValue(selrow.get('custcode'));
                                }  
                                else
                                {
                                      if (selrow.get('process') == "Y")
                                      {
                                        alert("Roll Already Processed.. You can't Modify");                           
                                      }

                                }

	              }
		      else if (btn === 'no')
                      {

	                    var sm = flxDetail.getSelectionModel();
	                    var selrow = sm.getSelected();
		            if (selrow.get('process') == "N" || selrow.get('process') == ""  )
		            {  
		               flxWinderDetails.getStore().remove(selrow);
                               flxWinderDetails.getSelectionModel().selectAll();
		            }  
		            else
		            {
		               alert("Roll Already Processed.. You can't Delete");
		            }   
		      }

             } 
        });
   }
  }
   });
   
var txttotnoreelno = new Ext.form.NumberField({
        fieldLabel  : 'Total No.of Reels',
        id          : 'txttotnoreelno',
        name        : 'txttotnoreelno',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'WT',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});   

var txtuptorewind = new Ext.form.NumberField({
        fieldLabel  : 'Upto Rewinded',
        id          : 'txtuptorewind',
        name        : 'txtuptorewind',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxmadetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 200,
        x: 1000,
        y: 135,        
        columns: [   
            {header: "PPNO", dataIndex: 'mano',sortable:true,width:70,align:'left'},   
            {header: "ORDNO", dataIndex: 'ordno',sortable:true,width:70,align:'left'}, 
            {header: "SIZE", dataIndex: 'size',sortable:true,width:70,align:'left'}, 
            {header: "Wt(Kg)", dataIndex: 'wt_kg',sortable:true,width:70,align:'left'}, 
            {header: "Recd(Kg)", dataIndex: 'recd_kg',sortable:true,width:70,align:'left'}, 
        ],
store:[''],
   });

   
var TrnWinderEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WINDER ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnWinderEntryFormPanel',
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
            font:25,
            items: [
		    {
                    text: 'New',
                    font :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Add Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
//EDIT
                {
                    text: 'Edit',
                    font :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
		            Ext.getCmp('cmbEntryNo').show();
		            loadRWEntryNoListDataStore.removeAll();
		            loadRWEntryNoListDataStore.load({
	     			url: 'ClsTrnWinderEntry.php',
				params: {
				    task: 'loadRWEntryNoList',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    rdate    : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"),   
				},
		              	callback:function()
		                {
//				    alert(loadRWEntryNoListDataStore.getCount());	


		                }
		     	    }); 
                        }
                    }
                },'-',
           {
//SAVE
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                 var gstSave;

//alert(flxWinderDetails.getStore().getCount());		 
  
                    gstSave="true";
		    if (flxWinderDetails.getStore().getCount()== 1)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
        	                gstSave="false";
	                    }
		    else if(cmbOperator.getRawValue()=="" || cmbOperator.getValue()==0)
		    {
			alert("Select  Rewinder Operator Name..");
			gstSave="false";
			cmbOperator.setFocus();
		    }
		    else if(cmbShift.getRawValue()=="" )
		    {
			alert("Select Shift ..");
			gstSave="false";
			cmbOperator.setFocus();
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

                            var WinderData = flxWinderDetails.getStore().getRange();                                        
                            var WinderupData = new Array();
                            Ext.each(WinderData, function (record) {
                                WinderupData.push(record.data);
                            });
			      Ext.Ajax.request({
                            url: 'TrnWinderEntrySave.php',
                            params :
                             {
				cnt: WinderData.length,
                               	griddet   : Ext.util.JSON.encode(WinderupData),    
                     
				
                                savetype:gstFlag,

                             	rcompcode   : Gincompcode,
				rfincode    : GinFinid,
				rentryno    : txtEntryNo.getValue(),
				proddate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),
				rshift      : cmbShift.getRawValue(),
		                rwdate      :  Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"),
			        roperator   : cmbOperator.getValue(),
                             //   rrollno     : Number(cmbRollNo.getValue()),
			//	rvarietycode   : Number(txtvar.getValue()),
	 	 	//	rmcshift    : Number(cmbMcShift.getRawValue()),
				rrollwt   : Number(txtRollwt.getRawValue()),
				

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                    
                                    Ext.MessageBox.alert("Production Entry Saved -" + obj['msg']);
                                    TrnWinderEntryFormPanel.getForm().reset();
                                    flxWinderDetails.getStore().removeAll();
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
                    tooltip: 'Refresh Details...', 
                    height: 40,
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
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            TrnWinderEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
             
		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:10px;font-weight:bold;",
                height		:505,
                width		:980,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
 
			{ 
				xtype       : 'fieldset',
				title       : '',
            
				labelWidth  : 70,
				width       : 200,
				x           : 5,
				y           : -5,
				border      : false,
				items: [dtProdDate]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',            
				labelWidth  : 70,
				width       : 200,
				x           : 200,
				y           : -5,
				border      : false,
				items: [dtEntryDate]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 150,
				x           : 400,
				y           : -5,
				border      : false,
				items       : [txtEntryNo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 150,
				x           : 400,
				y           : -5,
				border      : false,
				items       : [cmbEntryNo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 130,
				x           : 550,
				y           : -5,
				border      : false,
				items	    : [cmbShift]
			},	
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 300,
				x           : 680,
				y           : -5,
				border      : false,
				items	    : [cmbOperator]
			},					             		
             {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid green;border-radius:5px;",              
                height		:100,
                width		:950,
                layout 	: 'absolute',
                x		: 0,
                y		: 35,
             items:[	

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 115,
				x           : 30,
				y           : -10,
				border      : false,
				items	    : [lblRollNo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 20,
				y           : 10,
				border      : false,
				items	    : [cmbRollNo]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 140,
				y           : -10,
				border      : false,
				items	    : [lblVariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 300,
				x           : 130,
				y           : 10,
				border      : false,
				items       : [cmbVariety]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 330,
				y           : -10,
				border      : false,
				items	    : [lblBF]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 330,
				x           : 300,
				y           : 10,
				border      : false,
				items       : [txtBF]
			},
			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 80,
				x           : 400,
				y           : -10,
				border      : false,
				items	    : [lblGSM]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 380,
				y           : 10,
				border      : false,
				items       : [txtGSM]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 105,
				x           : 470,
				y           : -10,
				border      : false,
				items	    : [lblRollWt]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 455,
				y           : 10,
				border      : false,
				items       : [txtRollwt]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 85,
				x           : 570,
				y           : -10,
				border      : false,
				items	    : [lblMcShift]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 560,
				y           : 10,
				border      : false,
				items	    : [cmbMcShift]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 75,
				x           : 645,
				y           : -10,
				border      : false,
				items	    : [lblrolldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 640,
				y           : 10,
				border      : false,
				items       : [txtRollDia]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 725,
				y           : -10,
				border      : false,
				items	    : [lblbreaks]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 165,
				x           : 710,
				y           : 10,
				border      : false,
				items       : [txtBreaks]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 805,
				y           : -10,
				border      : false,
				items	    : [lblNoofSets]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 165,
				x           : 790,
				y           : 10,
				border      : false,
				items       : [txtNoofSets]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 150,
				x           : 850,
				y           : 10,
				border      : false,
				items       : [txtSeqNo]
			},


				                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 150,
				x           : 20,
				y           : 40,
				border      : false,
				items	    : [cmbPPNo]
			},			                

								             
              	]
	  },
	  {
		 xtype  	: 'fieldset',
                title		: 'WINDER FINISHED',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid blue;border-radius:5px;",              
                height		:335,
                width		:950,
                layout 	: 'absolute',
                x		: 0,
                y		: 140,
             items:[



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 85,
				x           : 10,
				y           : -10,
				border      : false,
				items	    : [lblwinderno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 90,
				x           : 10,
				y           : 10,
				border      : false,
				items	    : [cmbWinderNo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 50,
				x           : 90,
				y           :-10,
				border      : false,
				items	    : [lblSet]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 90,
				x           : 80,
				y           : 10,
				border      : false,
				items	    : [cmbSet]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 110,
				x           : 150,
				y           : -10,
				border      : false,
				items	    : [lblwinderdeckle]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 150,
				y           : 10,
				border      : false,
				items       : [txtwinderdeck]
			},
			                

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 50,
				x           : 290,
				y           : -10,
				border      : false,
				items	    : [lblsize]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 260,
				y           : 10,
				border      : false,
				items       : [cmbSize]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 65,
				x           : 390,
				y           : -10,
				border      : false,
				items	    : [lblJoints]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 385,
				y           : 10,
				border      : false,
				items       : [txtJoints]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 75,
				x           : 470,
				y           : -10,
				border      : false,
				items	    : [lblreeldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 455,
				y           : 10,
				border      : false,
				items       : [txtReelDia]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 75,
				x           : 565,
				y           : -10,
				border      : false,
				items	    : [lblSONo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 180,
				x           : 550,
				y           : 10,
				border      : false,
				items	    : [cmbSONo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 105,
				x           : 680,
				y           : -10,
				border      : false,
				items	    : [lblCustomer]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 350,
				x           : 660,
				y           : 10,
				border      : false,
				items	    : [cmbCustomer]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 280,
				x           : 0,
				y           : 55,
				border      : false,
				items       : [txtReelNo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 150,
				x           : 280,
				y           : 55,
				border      : false,
				items       : [txtRollSlNo]
			},btnadd,flxWinderDetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 230,
				x           : 0,
				y           : 260,
				border      : false,
				items       : [txttotnoreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 140,
				x           : 250,
				y           : 260,
				border      : false,
				items       : [txttotwt]
			},
             ]
             },	
	  			             
      	]
      },

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 160,
				x           : 1000,
				y           : 30,
				border      : true,
				style	    : "border:0.25px solid lightgreen;border-radius:5px;",
				items       : [txtuptorewind]
			},flxmadetails,     		
      ]
});


function RefreshData()
{

        cmbSet.setValue("1");
        Ext.getCmp('cmbEntryNo').hide();
	loadAllCustomerDataStore.removeAll();
	loadAllCustomerDataStore.load({
	        url: 'ClsTrnWinderEntry.php',
                params: {
	    	task     : 'loadAllCustomer',
		},
		scope:this,
		callback:function()
       		{
		}
	  });


	loadEntryNoDatastore.removeAll();
	loadEntryNoDatastore.load({
	        url: 'ClsTrnWinderEntry.php',
                params: {
	    	task     : 'loadRWEntryNo',
                compcode : Gincompcode,
                finid    : GinFinid,
                rdate    : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"),   
		},
		scope:this,
		callback:function()
       		{
                   txtEntryNo.setValue(loadEntryNoDatastore.getAt(0).get('entryno'));
		}
	  });


	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnWinderEntry.php',
		params: {
	    	   task: 'loadRollNo',
		   compcode : Gincompcode,
		   finid    : GinFinid,   
                   rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
		 },
		 callback:function()
		   {

		   } 
	  });


	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsTrnWinderEntry.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
		},
		scope:this,
		callback:function()
       		{
		}
	  });

}


     var TrnWinderEntryWindow = new Ext.Window({
        height      : 615,
        width       : 1250,
        y           : 35,
        layout      : 'fit',
        items       : TrnWinderEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
onEsc:function(){
},
        listeners:
            {
                    show:function(){
                      RefreshData();
                      cmbWinderNo.setValue("1");
                      txtRollSlNo.setValue("1");	   	
	   	}        
            }
    });
       TrnWinderEntryWindow.show();
});

