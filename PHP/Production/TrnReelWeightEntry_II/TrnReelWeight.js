Ext.onReady(function(){
   Ext.QuickTips.init();
   
   var seqno = 0;
   var varcode = 0;
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var customercode = 0;   
   var yymm = '';
   var mm = 0;
   var yy = 0;
  var gstFlag = "Add";
  var tfinwt = 0;
  var destag = "";

var loadChangedVarietyDatastore = new Ext.data.Store({
      id: 'loadChangedVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadChangedVarietyDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_bf','var_gsm'
      ]),
    })


	      

var loadEditReelNoDatastore = new Ext.data.Store({
      id: 'loadEditReelNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEditReelNos"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reelno'
      ]),
    })



var loadTempReelNoDatastore = new Ext.data.Store({
      id: 'loadTempReelNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTempReelNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reelno'
      ]),
    })




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



var lblVariety= new Ext.form.Label({
	fieldLabel  : '',
	id          : 'lblVariety',
	name        : 'lblVariety',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});  

function Edit_Records()
{






        cmbReelNo.reset();
	loadEditReelNoDatastore.removeAll();
	loadEditReelNoDatastore.load({
	 url: 'ClsReelWeight.php',
		params: {
	    	   task: 'loadEditReelNos',
                   compcode : Gincompcode,
                   finid    : GinFinid,
		   rollno   : cmbRollNo.getValue(),
	           mon      : mm,    
                   yr       : yy, 

	      
		 },
		 callback:function()
		   {

		   } 
	  });
}


function Generate_Reelno()
{
	var dt = dtProdDate.getValue();
	var m = Ext.util.Format.date(dtProdDate.getValue(),"m");
	var y = Ext.util.Format.date(dtProdDate.getValue(),"y");
	//                var rwno =  cmbWinderNo.getValue(); 

	var rwno = "0"; 

	var rno = "00"+cmbRollNo.getValue(); 
	var roll = rno.slice(-3);         
	reelno = y+m+rwno+roll+sno;

	var sno = "0";
	var pno = 0;

	var firstno = 0;
        var lastno = 0;
        var newdata = '';
	for(var i=1;i< 100;i++)
        {
           sno = "0"+i;
           pno    = sno.slice(-2); 
           reelno = y+m+rwno+roll+pno;
           newdata = newdata +  "," + reelno;
           if (i == 1)
           { 
               firstno = reelno; }   
           else 
           {
                lastno = reelno; }        
           }
          cmbReelNo.reset();


          cmbReelNoEdit.reset();


                Edit_Records();

                loadEditReelNoDatastore.removeAll();     
		loadTempReelNoDatastore.removeAll();
		loadTempReelNoDatastore.load({
		 url: 'ClsReelWeight.php',
			params: {
		    	   task: 'loadTempReelNo',
			   fno : firstno,
			   sno : lastno,   
		      
			 },
			 callback:function()
			   {

			   } 
		  });



// cmbReelNo.store.loadData(reelno,true); 

//cmbReelNo.store.insert(newdata);

//    var str = new cmbReelNo();

//    str.add({
//            id: 0,
//            name: 'All'
//        });
 

			//      cmbReelNo.store.loadData(newdata,true); 

                  //            cmbReelNo.setValue("1");

//cmbSet.reset();
//cmbSet.store.loaddata(newdata);


}
var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOsizes"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','sizecode'
      ]),
    })

var loadFinishedDetailsDatastore = new Ext.data.Store({
      id: 'loadFinishedDetailsDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinishedDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_grpcode', 'wt'
      ]),
    });



var loadVarietyDetailsDatastore = new Ext.data.Store({
      id: 'loadVarietyDetailsDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarietyDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_bf','var_gsm','prd_deckle','prd_breaks','prd_roll_dia','prd_rollwt','prd_set', 'prd_seqno'
      ]),
    });


var loadSOCustomerDataStore = new Ext.data.Store({
	id: 'loadSOCustomerDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsReelWeight.php',      // File to connect to
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

var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsReelWeight.php',      // File to connect to
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

var dtEntryDate = new Ext.form.DateField({
    fieldLabel : 'Stock Entry Date',
    id         : 'dtEntryDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;color:#b8309f;",
    style      : "border-radius:5px;",    
    width :  100,
    enableKeyEvents: true,
    listeners:{

           },
});



var dtProdDate = new Ext.form.DateField({
    fieldLabel : 'Prod.Date',
    id         : 'dtProdDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;color:#b8309f;",
    style      : "border-radius:5px;",    
    width      :  100,
    readOnly   : true,
    enableKeyEvents: true,
    listeners:{
           blur:function(){
		loadRollNoDatastore.removeAll();
		loadRollNoDatastore.load({
		 url: 'ClsReelWeight.php',
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



var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : 'SO NO',
        width           : 100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : false,
        triggerAction   : 'all',
  //      selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
      labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
    //	labelStyle : "font-:10px;font-weight:bold;",
    	//style      : "border-radius:5px;",         
	listeners:{
        select: function(){

                loadSOCustomerDataStore.removeAll();
     		loadSOCustomerDataStore.load({
     		url: 'ClsReelWeight.php',
		params: {
			    task: 'loadSOCustomer',
		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue()
                        },
               	callback:function()
			{
                         
                          txtCustomer.setValue(loadSOCustomerDataStore.getAt(0).get('cust_ref'));        
                          customercode = loadSOCustomerDataStore.getAt(0).get('cust_code'); 

                     
   }
               });

/*
                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue(),
                            varietycode : varcode,

                        },
               	callback:function()
			{
                        }
                });
*/

	}
	}
   });



var loadAllCustomerDataStore = new Ext.data.Store({
	id: 'loadAllCustomerDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsReelWeight.php',      // File to connect to
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

 var cmbCustomerName = new Ext.form.ComboBox({
        fieldLabel      : 'Customer Name ',
        width           : 200,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomerName',
        typeAhead       : true,
        mode            : 'local',
        store           :loadAllCustomerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
          enableKeyEvents: true,
	listeners:{
        select: function(){
	}
	}
});


      var txtProdMonth = new Ext.form.NumberField({
   	fieldLabel  :'Production YYMM',
   	id	    :'txtProdMonth',
   	name	    :'txtProdMonth',
   	width	    : 80,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
        style : "font-size:14px;font-weight:bold;color:#f54242",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},  
   	tabindex    :3,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){

                yymm = txtProdMonth.getRawValue();

		loadRollNoDatastore.removeAll();
		loadRollNoDatastore.load({
		 url: 'ClsReelWeight.php',
			params: {
		    	   task: 'loadRollNo',
			   compcode : Gincompcode,
			   finid    : GinFinid,   
			   yr       :  "20"+yymm.substring(0,2),   
			   mon      :  yymm.substring(2,4),   
			 },
			 callback:function()
			   {

			   } 
		  });
             }
        }    
        

   	});
   	



   	
      var txtBF = new Ext.form.TextField({
   	fieldLabel  :'BF',
   	id	    :'txtBF',
   	name	    :'txtBF',
   	width	    :100,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :3,
   	});
   	
     var txtGSM = new Ext.form.TextField({
   	fieldLabel  :'GSM',
   	id	    :'txtGSM',
   	name	    :'txtGSM',
   	width	    :100,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :4,
   	});
   	

      var txtCustomer = new Ext.form.TextField({
   	fieldLabel  :'Customer',
   	id	    :'txtCustomer',
   	name	    :'txtCustomer',
   	width	    :300,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :3,
   	});

      var txtJoints = new Ext.form.TextField({
   	fieldLabel  :'Joints',
   	id	    :'txtJoints',
   	name	    :'txtJoints',
   	width	    :100,

   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'1'},  
   	tabindex    :3,
   	});


   var txtWeight = new Ext.form.NumberField({
   	fieldLabel  :'Weight (Kgs)',
   	id	    :'txtWeight',
   	name	    :'txtWeight',
   	width	    :100,
   	readOnly    :false,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :6,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},  
        decimalPrecision: 3,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                        if(cmbReelNo.getRawValue()=="" || cmbReelNo.getValue()==0)
			{
				alert("Select ReelNO..");
	                        gstSave="false";
			}
			else if ( txtWeight.getValue() == 0)
	                    {
	                        Ext.Msg.alert('Reel Weight','Weight is empty..');
	                        gstSave="false";
	                    } 
             		else
			{ 
                             if (destag == "")
                             save_data();
                  }
             }
          }
        }  

   	});
 
   var txtOldWeight = new Ext.form.TextField({
   	fieldLabel  :'Old Weight',
   	id	    :'txtOldWeight',
   	name	    :'txtOldWeight',
   	width	    :100,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :6,
   	});


 var loadReelWeightDatastore = new Ext.data.Store({
      id: 'loadReelWeightDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelWeight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'r_reelno'

      ]),
    });
 
    var loadViewReelNo = new Ext.data.Store({
        id: 'loadViewReelNo',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsReelWeight.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadReelNumberDetail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
	},['stk_sono','stk_joints','stk_wt','cust_ref' ,'stk_var_code','sizecode','stk_destag','var_name'])
});



var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
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

var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode','prd_date','prd_seqno','prd_rollwt','prd_finprod','prd_shift','prd_rollno'
      ]),
    });

var loadAllVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode','prd_date','prd_seqno','prd_rollwt','prd_finprod','prd_shift','prd_rollno'
      ]),
    });

var dgrecord = Ext.data.Record.create([]);

var flxProduction = new Ext.grid.EditorGridPanel({
    frame: true,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:750,
    y:10,
    height: 200,
    hidden:false,
    width: 500,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [

        {header: "DATE",   dataIndex: 'prd_date',sortable:true,width:80,align:'left'},
        {header: "SHIFT",   dataIndex: 'prd_shift',sortable:true,width:40,align:'left'},
        {header: "QUALITY", dataIndex: 'var_desc',sortable:true,width:150,align:'left'},
        {header: "QLYCODE", dataIndex: 'var_groupcode',sortable:true,width:10,align:'left'},
        {header: "ROLL No", dataIndex: 'prd_rollno',sortable:true,width:60,align:'left'},//0
        {header: "ROLL WT(T)", dataIndex: 'prd_rollwt',sortable:true,width:70,align:'left'},//1
        {header: "FIN WT(MT)", dataIndex: 'prd_finprod',sortable:true,width:90,align:'left'},//16,hidden:true
        {header: "SeqNO",      dataIndex: 'prd_seqno',sortable:true,width:90,align:'left'},//16,hidden:true
    ],
	store : loadVarietyDatastore,
    listeners:{	
      
    	}

});


var btnVarietyChange = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Variety Change",
    width   : 100,
    height  : 30,
    x       : 320,
    y       : 95,    
   labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
//   style      : "'color' : 'red','font-size' : '15px','font-weight' : 'bold'",
          border: 1,
          style: {
           //   borderColor: 'blue',
              borderStyle: 'solid',

          },
   tabindex : 1,
   listeners:{
       click: function(){   
                yymm = txtProdMonth.getRawValue();
                cmbVarietyChange.show();            
		loadAllVarietyDatastore.removeAll();
		loadAllVarietyDatastore.load({
		url: 'ClsReelWeight.php',
		params: {
		    task: 'loadAllVariety',
//		    finid    : GinFinid,
		    //compcode : Gincompcode,
//		    rollno   : cmbRollNo.getValue(),
	            //yr       :  "20"+yymm.substring(0,2),   
//		    mon      :  yymm.substring(2,4),  
//                    opt      : 2,

		},
		callback:function()
		{
//                      seqno = loadVarietyDatastore.getAt(0).get('prd_seqno');
//                      cmbVariety.setRawValue(loadVarietyDatastore.getAt(0).get('var_desc'));
//                      cmbVariety.setValue(loadVarietyDatastore.getAt(0).get('var_groupcode'));
//                      dtProdDate.setRawValue(Ext.util.Format.date(loadVarietyDatastore.getAt(0).get('prd_date'),"d-m-Y"));
//                      get_variety_of_rolls();




		}
	});
       }
   }
}) 



function get_variety_of_rolls()
{
                 yymm = txtProdMonth.getRawValue();
                loadVarietyDetailsDatastore.removeAll();
     		loadVarietyDetailsDatastore.load({
     		url: 'ClsReelWeight.php',
		params: {
			    task: 'loadVarietyDetails',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollNo.getValue(),
                            varty : cmbVariety.getValue(),
          		    yr    :  "20"+yymm.substring(0,2),   
			    mon   :  yymm.substring(2,4), 
                        },
               	callback:function()
			{
                             txtBF.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_bf'));
                             txtGSM.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_gsm'));

                             Generate_Reelno();
                        }
                });


	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsReelWeight.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
                varty    : varcode,
		},
		scope:this,
		callback:function()
       		{
		}
	});




/*
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


                loadFinishedDetailsDatastore.removeAll();
     		loadFinishedDetailsDatastore.load({
     		url: 'ClsReelWeight.php',
		params: {
			    task: 'loadFinishedDetails',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollNo.getValue(),
            		    yr    :  yymm.substring(0,2),   
			    mon   :  yymm.substring(2,4), 
                        },
               	callback:function()
			{
                           var cnt = loadFinishedDetailsDatastore.getCount(); 
                           tfinwt = 0;
                           if (cnt >0)
                           {
				flxProduction.getSelectionModel().selectAll();
				var selrows1 = flxProduction.getSelectionModel().getCount();
				var sel1 = flxProduction.getSelectionModel().getSelections();

				for (var i=0;i<selrows1;i++){
	                            if (loadFinishedDetailsDatastore.getAt(0).get('var_grpcode') == sel1[i].data.var_groupcode)
	                            {
                                             tfinwt = tfinwt + Number(loadFinishedDetailsDatastore.getAt(0).get('wt'));
                                             sel1[i].set('prd_finprod', tfinwt);

                                    }
                                }     


                           }
  




//                             txtBF.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_bf'));
//                             txtGSM.setValue(loadVarietyDetailsDatastore.getAt(0).get('var_gsm'));
//                             Generate_Reelno();
                        }
                });

*/
}


var btnConfirm = new Ext.Button({
    style   : 'text-align:center;',
    text    : "CONFIRM - for Roll Close",
    width   : 180,
    height  : 50,
    x       : 790,
    y       : 250,    
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
	   var gstSave="true"

	   if(cmbRollNo.getRawValue()=="" || cmbRollNo.getValue()==0)
           {
  		alert("Select Roll Number..");
	        gstSave="false";
 	    }
             if (gstSave == "true")
             {
 
		    var ProdData = flxProduction.getStore().getRange();                                        
		    var ProdupData = new Array();
		    Ext.each(ProdData, function (record) {
		        ProdupData.push(record.data);
		    });
		    Ext.MessageBox.show({
			   title: 'Confirmation',
			   icon: Ext.Msg.QUESTION,
			   buttons: Ext.MessageBox.YESNO,
		           msg: "Do You Want to Confirm to Close the Roll Number",
		    	   fn: function(btn)
			   {         
			      if (btn == 'yes')
	                      { 
		               Ext.Ajax.request({
                                   url: 'TrnRollClose.php',
			           params:
					{
					cnt: ProdData.length,
			               	griddet: Ext.util.JSON.encode(ProdupData),    
                                        savetype : gstFlag,
					compcode : Gincompcode,
					fincode  : GinFinid,
                                        entdate  : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"), 
                                        seqno    : seqno,                                     
			                reelno   : 0,
					weight   : 0,
                                        sono     : 0,
                                        custcode : 0, 
                                        sizecode : 0,
                                        qlycode  : 0,
                                        rollno   : 0,
                                        oldweight: 0,
                                        joints   : 0,
                                        open_rel : 'P',

			        	},
				                callback: function(options, success, response)
				                {
						    var obj = Ext.decode(response.responseText);
 
						    if (obj['success']==="true")
						    {                                
							   Ext.MessageBox.alert("Roll Closed -" + obj['msg']);
		                                     }else
						     {
		                                         Ext.MessageBox.alert("Roll Not closed! Pls Check!- " + obj['msg']);                                                 
		                                     }
                                                     flxProduction.getStore().removeAll();
                                               }
                                               
		         //-- loop Z end           
                                               });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start 
      }
   }
});  

var btnSave = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SAVE",
    width   : 70,
    height  : 40,
    x       : 300,
    y       : 365,    
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
            if (destag == "")
            save_data();
       }
   }
})
      


var btnRelese = new Ext.Button({
    style   : 'text-align:center;',
    text    : "CONFIRM - for Roll Relese",
    width   : 180,
    height  : 50,
    x       : 990,
    y       : 250,    
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
	   var gstSave="true"

	   if(cmbRollNo.getRawValue()=="" || cmbRollNo.getValue()==0)
           {
  		alert("Select Roll Number..");
	        gstSave="false";
 	    }
             if (gstSave == "true")
             {
 
		    var ProdData = flxProduction.getStore().getRange();                                        
		    var ProdupData = new Array();
		    Ext.each(ProdData, function (record) {
		        ProdupData.push(record.data);
		    });
		    Ext.MessageBox.show({
			   title: 'Confirmation',
			   icon: Ext.Msg.QUESTION,
			   buttons: Ext.MessageBox.YESNO,
		           msg: "Do You Want to Relese the Roll Number",
		    	   fn: function(btn)
			   {         
			      if (btn == 'yes')
	                      { 
		               Ext.Ajax.request({
                                   url: 'TrnRollClose.php',
			           params:
					{
					cnt: ProdData.length,
			               	griddet: Ext.util.JSON.encode(ProdupData),    
                                        savetype : gstFlag,
					compcode : Gincompcode,
					fincode  : GinFinid,
                                        entdate  : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"), 
                                        seqno    : seqno,                                     
			                reelno   : 0,
					weight   : 0,
                                        sono     : 0,
                                        custcode : 0, 
                                        sizecode : 0,
                                        qlycode  : 0,
                                        rollno   : 0,
                                        oldweight: 0,
                                        joints   : 0,
                                        open_rel : 'A',

			        	},
				                callback: function(options, success, response)
				                {
						    var obj = Ext.decode(response.responseText);
 						if (open_rel == 'A'){
						    if (obj['success']==="true")
						    {                                
							   Ext.MessageBox.alert("Roll Closed -" + obj['msg']);
		                                     }else
						     {
		                                         Ext.MessageBox.alert("Roll Not closed! Pls Check!- " + obj['msg']);                                                 
		                                     }
                                                 }
                                                 else
                                                {
							if (obj['success']==="true")
						    {                                
							   Ext.MessageBox.alert("Roll Relesed -" + obj['msg']);
		                                     }else
						     {
		                                         Ext.MessageBox.alert("Roll Not Relesed! Pls Check!- " + obj['msg']);                                                 
		                                     }
                                                } 


                                                     flxProduction.getStore().removeAll();
                                               }
                                               
		         //-- loop Z end           
                                               });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start 
      }
   }
});  

function getvariety_details()
{

                yymm = txtProdMonth.getRawValue();
            
		loadVarietyDatastore.removeAll();
		loadVarietyDatastore.load({
		url: 'ClsReelWeight.php',
		params: {
		    task: 'loadVariety',
		    finid    : GinFinid,
		    compcode : Gincompcode,
		    rollno   : cmbRollNo.getValue(),
	            yr       :  "20"+yymm.substring(0,2),   
		    mon      :  yymm.substring(2,4),  
                    opt      : 1,

		},
		callback:function()
		{
                      seqno = loadVarietyDatastore.getAt(0).get('prd_seqno');
                      cmbVariety.setRawValue(loadVarietyDatastore.getAt(0).get('var_desc'));
                      cmbVariety.setValue(loadVarietyDatastore.getAt(0).get('var_groupcode'));
             
                      dtProdDate.setRawValue(Ext.util.Format.date(loadVarietyDatastore.getAt(0).get('prd_date'),"d-m-Y"));
                      varcode = loadVarietyDatastore.getAt(0).get('var_groupcode');
                      get_variety_of_rolls();




		}
	});
}

var cmbRollNo = new Ext.form.ComboBox({
        fieldLabel      : 'Roll No',
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
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;color:#b8309f;",
    	style      : "border-radius:5px;",         
	listeners:{
		select: function()
		{
                 getvariety_details();
                 if (gstFlag == "Edit") {Edit_Records();}

	}
	}
   });



var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
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
    	labelStyle : "font-size:12px;font-weight:bold;color:#b8309f;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                varcode = cmbVariety.getValue();
//alert(varcode);
                get_variety_of_rolls();

                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue(),
                            varietycode : varcode,

                        },
               	callback:function()
			{
                        }
                });

	}
	}
   });


var cmbVarietyChange = new Ext.form.ComboBox({
        fieldLabel      : 'VarietyChange',
        width           :  150,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVarietyChange',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllVarietyDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;color:#b8309f;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                varcode = cmbVarietyChange.getValue();
//alert(varcode);
                 yymm = txtProdMonth.getRawValue();
                loadChangedVarietyDatastore.removeAll();
     		loadChangedVarietyDatastore.load({
     		url: 'ClsReelWeight.php',
		params: {
			    task: 'loadChangedVarietyDetails',
                            varty : cmbVarietyChange.getValue(),

                        },
               	callback:function()
			{
                             txtBF.setValue(loadChangedVarietyDatastore.getAt(0).get('var_bf'));
                             txtGSM.setValue(loadChangedVarietyDatastore.getAt(0).get('var_gsm'));
                             Generate_Reelno();
                        }
                });
/*
	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsReelWeight.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
                varty    : varcode,
		},
		scope:this,
		callback:function()
       		{
		}
	})
*/

                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue(),
                            varietycode : varcode,

                        },
               	callback:function()
			{
                        }
                });

	}
	}
   });

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'SIZE',
        width           :  150,
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
	style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
    //	labelStyle : "font-size:12px;font-weight:bold;color:#b8309f;",
    	//style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });


   var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No ',
        width           : 200,
        displayField    : 'reelno', 
        valueField      : 'reelno',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTempReelNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
        enableKeyEvents: true,
 listeners:{


                      }    



          }); 	



   var cmbReelNoEdit = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No ',
        width           : 200,
        displayField    : 'reelno', 
        valueField      : 'reelno',
        hiddenName      : '',
        id              : 'cmbReelNoEdit',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEditReelNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
          enableKeyEvents: true,
 listeners:{



                select: function () {
             		loadViewReelNo.load({
             		url: 'ClsReelWeight.php',
			params: {
				    task: 'loadReelNumberDetail',
			           // finid: GinFinid,
				   // compcode:Gincompcode,
                                    reelno:cmbReelNoEdit.getValue()
                                },
                       	callback:function()
				{
                                 cmbReelNo.setValue(cmbReelNoEdit.getValue());                                                            
                                 cmbSONo.setValue(loadViewReelNo.getAt(0).get('stk_sono'));
                                 txtCustomer.setValue(loadViewReelNo.getAt(0).get('cust_ref'));

                                 lblVariety.update(loadViewReelNo.getAt(0).get('var_name'));
                                 cmbSize.setValue(loadViewReelNo.getAt(0).get('stk_var_code'));
                                 cmbSize.setRawValue(loadViewReelNo.getAt(0).get('sizecode'));

                                 txtJoints.setValue(loadViewReelNo.getAt(0).get('stk_joints'));                                 
				 txtWeight.setValue(loadViewReelNo.getAt(0).get('stk_wt'));
				 txtOldWeight.setValue(loadViewReelNo.getAt(0).get('stk_wt'));
                                 destag = loadViewReelNo.getAt(0).get('stk_destag');
                                 if (loadViewReelNo.getAt(0).get('stk_destag') == "T")
                                 {
                                     alert("Already Packslip Raised.. You can't Modify");

                                 }   
      				} 
                         });
			}


                      }    



          }); 	

  

 function save_data()
{

                            var ProdData = flxProduction.getStore().getRange();                                        
                            var ProdupData = new Array();
                            Ext.each(ProdData, function (record) {
                                ProdupData.push(record.data);
                            });
                           var finprod = 0;
			   Ext.MessageBox.show({
				   title: 'Confirmation',
				   icon: Ext.Msg.QUESTION,
				   buttons: Ext.MessageBox.YESNO,
		                   msg: "Do You Want to Save  the Record",
		            	   fn: function(btn)
				   {         
				      if (btn == 'yes')
                                      { 


	   var Row= flxProduction.getStore().getCount();
	   flxProduction.getSelectionModel().selectAll();
	   var sel=flxProduction.getSelectionModel().getSelections();
           for(var i=0;i<Row;i++)
           {
                if (Number(sel[i].data.var_groupcode) ==  Number(cmbVariety.getValue()))
                {
                  if (Number(sel[i].data.prd_finprod) < Number(sel[i].data.prd_rollwt))
                  {   
                     finprod = Number(sel[i].data.prd_finprod) + Number(txtWeight.getValue())/1000;
                     sel[i].set('prd_finprod', finprod);
                     { break; }
                   }

                }  
           }

	   Ext.Ajax.request({
               url: 'TrnWeightEntrySave.php',
	       params:
		{
		cnt: ProdData.length,
               	griddet: Ext.util.JSON.encode(ProdupData),    
                savetype : gstFlag,
		compcode : Gincompcode,
		fincode  : GinFinid,
                entdate  : Ext.util.Format.date(dtEntryDate.getValue(),"Y-m-d"), 
                seqno    : seqno,                                     
                reelno   : cmbReelNo.getValue(),
		weight   : txtWeight.getValue(),
                sono     : cmbSONo.getValue(),
                custcode : customercode, 
                sizecode : cmbSize.getValue(),
                qlycode  : cmbVariety.getValue(),
                rollno   : cmbRollNo.getValue(),
                oldweight: Number(txtOldWeight.getValue()),
                joints   : Number(txtJoints.getValue()),

        	},
                callback: function(options, success, response)
                {
		    var obj = Ext.decode(response.responseText);
                    if (obj['cnt1']>0)
	            {
                        Ext.MessageBox.alert("Alert","Reel Number Already exists.. ");
                    }
                    else     
		    if (obj['success']==="true")
		    {                                
			   Ext.MessageBox.alert("Reel Weight Saved -" + obj['msg']);
                           txtWeight.setValue('');
                           txtJoints.setValue('');
                           cmbReelNo.setValue(Number(cmbReelNo.getValue())+1);
          //                 Ext.getCmp('txtWeight').focus(false, 200);
                      
//		                                           ReelWeightPanel.getForm().reset();
//		                                           RefreshData();
                     }else
		     {
                         Ext.MessageBox.alert("Reel Weight Not Saved! Pls Check!- " + obj['msg']);                                                 
                     }
               }
//-- loop Z end           
               });      //loop y end


                                       }  //loop w start   
                         	   } //loop v start 
                           }); 
}
 
 
  var ReelWeightPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : '',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'ReelWeightPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
            items: [
                   {
//New
                    text: 'Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:70,width:70,
                    height: 40,
                    fontSize:30,
                    width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click:function() {
                              gstFlag = "Add";
                              Ext.getCmp('cmbReelNoEdit').hide();   
                              Ext.getCmp('cmbRollNo').setDisabled(false);       
         
                        }
                    }

                   },'-',
                   {
//edit
                    text: 'Edit',
                    style  : 'text-align:center;',
                    tooltip: 'Edit Details...', height: 40, fontSize:70,width:70,
                    height: 40,
                    fontSize:30,
                    width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click:function() {
                              gstFlag = "Edit";
                              Ext.getCmp('cmbReelNoEdit').show();   
//                              Ext.getCmp('cmbRollNo').setDisabled(true);  

	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsReelWeight.php',
		params: {
	    	   task: 'loadRollNo_Edit',
		   compcode : Gincompcode,
		   finid    : GinFinid,   
	           mon      : mm, //Ext.util.Format.date(dtProdDate.getValue(),"n"),   
                   yr       : yy, //Ext.util.Format.date(dtProdDate.getValue(),"Y"),     
		 },
		 callback:function()
		   {

		   } 
	  });

     
	              
         
                        }
                    }

                   },'-',
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:70,width:70,

//save

         height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {

//alert(gstFlag);
                        if(cmbReelNo.getRawValue()=="" || cmbReelNo.getValue()==0)
			{
				alert("Select ReelNO..");
	                        gstSave="false";
			}
			else if ( txtWeight.getValue() == 0)
	                    {
	                        Ext.Msg.alert('Reel Weight','Weight is empty..');
	                        gstSave="false";
	                    } 
             		else
			{   

                              if (destag == "")
                              save_data();
 
                   } 
             } 
   }
                  
                },'-',
                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
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
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				ProdReelWindow.hide();
			   }
			}
                  }
                  ],
        },
        items:[
    		{
    		xtype	:'fieldset',
    		title	:'',
    		width	:1300,
    		height	:450,
    		x	:10,
    		y	:10,
    		border	:true,
    		layout	:'absolute',
    		
    		items:[

			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 150,
			width       : 400,
			x           : 0,
			y           : 0,
			border      : false,
			items: [dtEntryDate]
			},


    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 150,
			width       : 300,
			x           : 0,
			y           : 30,
			border      : false,
			items: [txtProdMonth]
			},


    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 90,
			width       : 300,
			x           : 400,
			y           : 60,
			border      : false,
			items: [dtProdDate]
			},	
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:60,
	    		border	:false,
	    		items:[cmbRollNo]
	    		},
			
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:500,
	    		x	:0,
	    		y	:90,
	    		border	:false,
	    		items:[cmbVariety]
	    		},	btnVarietyChange,
    			
	    				{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:100,
	    		width	:400,
	    		x	:450,
	    		y	:90,
	    		border	:false,
	    		items:[cmbVarietyChange]
	    		},
	
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:120,
	    		border	:false,
	    		items:[txtBF]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:150,
	    		border	:false,
	    		items:[txtGSM]
	    		},


			
		       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:180,
	    		border	:false,
	    		items:[cmbReelNo]
	    		},

		       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:180,
	    		border	:false,
	    		items:[cmbReelNoEdit]
	    		},

		       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:380,
	    		y	:180,
	    		border	:false,
	    		items:[lblVariety]
	    		},


			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:210,
	    		border	:false,
	    		items:[cmbSONo]
	    		},
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:400,
	    		x	:0,
	    		y	:240,
	    		border	:false,
	    		items:[cmbSize]
	    		},


	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:500,
	    		x	:0,
	    		y	:270,
	    		border	:false,
	    		items:[txtCustomer]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:300,
	    		border	:false,
	    		items:[txtJoints]
	    		},


	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:360,
	    		border	:false,
	    		items:[txtWeight]
	    		}, btnSave,
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:100,
	    		width	:380,
	    		x	:300,
	    		y	:360,
	    		border	:false,
	    		items:[txtOldWeight]
	    		}, flxProduction,btnConfirm,btnRelese,


                      	],
            
	    		},
	    		], 
	    		
	    	
        });

function RefreshData()
{
        flxProduction.getStore().removeAll();
        destag = "";
        gstFlag = "Add";
        Ext.getCmp('cmbRollNo').setDisabled(false);     
        ReelWeightPanel.getForm().reset();
        custcode = 0;
        var dt = dtEntryDate.getValue();
        yymm= dt.format("y")+dt.format("m");

        yy =  "20"+yymm.substring(0,2);   
        mm  =  yymm.substring(2,4);   
        Ext.getCmp('cmbReelNoEdit').hide();      
//alert(dt.format("y"));
//alert(dt.format("m"));

       txtProdMonth.setValue(yymm);


	loadAllCustomerDataStore.removeAll();
	loadAllCustomerDataStore.load({
	        url: 'ClsReelWeight.php',
                params: {
	    	task     : 'loadAllCustomer',
 		
		},
		scope:this,
		callback:function()
       		{
		}
	});
/*
	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsReelWeight.php',
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
*/
	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsReelWeight.php',
		params: {
	    	   task: 'loadRollNo',
		   compcode : Gincompcode,
		   finid    : GinFinid,   
	           mon      : mm, //Ext.util.Format.date(dtProdDate.getValue(),"n"),   
                   yr       : yy, //Ext.util.Format.date(dtProdDate.getValue(),"Y"),     
		 },
		 callback:function()
		   {

		   } 
	  });
             
}

  
var ProdReelWindow = new Ext.Window({
	height      : 560,
        width       : 1350,
        y           : 50,
        title       :'REEL WEIGHT',
        items       : 'ReelWeightPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){

               cmbVarietyChange.hide();

//alert(yymm.substring(0,2));   
//alert(yymm.substring(2,4));   
               txtOldWeight.hide();
               RefreshData();
             }
             }
            });
             
             ProdReelWindow.show();  
        });      
   
