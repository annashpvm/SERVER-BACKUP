Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var gstStatus = "N";
//var Hdeptname = 'IT DEPARTMENT';
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var itemcode = 0;
var fincode =0;
var varcode = 0;
var newsize = 0;
var newsono = 0;

var finyear  = localStorage.getItem('ginfinid');

   var yymm = '';
   var mm = 0;
   var yy = 0;

  var printtype='PDF';

var rep = "Reel No wise Wt Changed";


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});



var optrep = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:150,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optrep',
        items: [
            {boxLabel: 'Reel No wise Wt Changed' , name: 'optrep', id:'optWT', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Reel No wise Wt Changed";	
	
                    }                       
                     }
                 }
            },

            {boxLabel: 'Size Chanaged Details' , name: 'optrep', id:'optSize', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Size Changed";
	   	
                 } 
                 }
                 }  
            },

            {boxLabel: 'Size Chanaged Details Abstract' , name: 'optrep', id:'optSizeAbs', inputValue: 3,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Size Changed Abs";
	   	
                 } 
                 }
                 }  
            },
        ]


    },
    ]



});


var btnSubmit = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "PRINT",
    width   : 80,
    height  : 35,
    listeners:{
        click: function(){    
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dptStartDate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dptEndDate.getValue(),"Y-m-d"));

//alert(printtype);

                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF") 
                {
                if (rep == "Reel No wise Wt Changed")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_WeightChangeReelNowise.rptdesign&__format=pdf&' + param, '_blank');
                else
                if (rep == "Size Changed")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_SizeChangedReelNowise.rptdesign&__format=pdf&' + param, '_blank');	
              
                else
                 if (rep == "Size Changed Abs")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_SizeChangedSummary.rptdesign&__format=pdf&' + param, '_blank');	
              
                }
        }
    }
});  

  var dptStartDate= new Ext.form.DateField({
        fieldLabel: 'S.Date',
        id: 'dptStartDate',
        name: 'dptStartDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });

  var dptEndDate= new Ext.form.DateField({
        fieldLabel: 'E.Date',
        id: 'dptEndDate',
        name: 'dptEndDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });



var loadFinyearDataStore = new Ext.data.Store({
      id: 'loadFinyearDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinYear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'fin_year','fin_code'
      ]),
    });


var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
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


var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
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
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnSalesReelWeightChange.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : finyear,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsReelWeight.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : finyear,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }   
             },
           change:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
               
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnSalesReelWeightChange.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : finyear,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsReelWeight.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : finyear,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }  
             }
        }    
        

   	});

var cmbFinyear = new Ext.form.ComboBox({
        fieldLabel      : 'Fin Year',
        width           :  150,
        displayField    : 'fin_year', 
        valueField      : 'fin_code',
        hiddenName      : '',
        id              : 'cmbFinyear',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFinyearDataStore,
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
                   finyear = cmbFinyear.getValue();
          	}
	}
   });


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

                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4); 

        cmbReelNo.reset();


	loadreelnodatastore.removeAll();
	loadreelnodatastore.load({
	 url: 'ClsReelWeight.php',
		params: {
	    	   task: 'loadReelNoList',
                   compcode : Gincompcode,
                   finid    : finyear,
		   rollno   : cmbRollNo.getValue(),
	           mon      : mm,    
                   yr       : yy , 

	      
		 },
		 callback:function()
		   {

        //                   alert(loadreelnodatastore.getAt(0).get('rmonth'));


		   } 
	  });
	}
	}
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
		 url: 'ClsTrnSalesReelWeightChange.php',
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

var loadAllVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
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

var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
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
var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
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


 var loaddocnodatastore = new Ext.data.Store({
      id: 'loaddocnodatastore',
//      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentryno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'no'
      ]),
    });

 var loadreelnodatastore = new Ext.data.Store({
      id: 'loadreelnodatastore',
     // autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['stk_sr_no' , 'stk_finyear','rmonth' ]),
    });

var loadreelnodetaildatastore = new Ext.data.Store({
      id: 'loadreelnodetaildatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelWeightChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm','stk_finyear','stk_sono','var_grpcode'
      ]),
    });


var txtdocno = new Ext.form.TextField({
	fieldLabel  : 'Document No',
	id          : 'txtdocno',
	name        : 'txtdocno',
	width       :  80,
	readOnly    : true,
	//disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var dtdocdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdocdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",
    width : 100,
});

var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : 'SO NO. CHANGED AS' ,
        width       	 :  200,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                newsono  = cmbSONO.getValue();
                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : Gincompcode,
			    compcode : Gincompcode,
                            sono     : cmbSONO.getValue(),
                            varietycode : cmbVariety.getValue(),

                        },
               	callback:function()
			{
          
                        }
                });
    
	}
	}
});

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'SIZE CHANGED AS' ,
        width       	 :  200,
        displayField    : 'sizecode', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSizeDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                newsize = cmbSize.getValue();
    
	}
	}
});

var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Varty. CHANGED AS' ,
        width       	 :  200,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllVarietyDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsTrnSalesReelWeightChange.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
                varty    : cmbVariety.getValue(),
		},
		scope:this,
		callback:function()
       		{
		}
	})
    
	}
	}
});

var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width       	 :  200,
        displayField    : 'stk_sr_no', 
        valueField      : 'stk_sr_no',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadreelnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select : function(){


     		loadreelnodetaildatastore.removeAll();
		loadreelnodetaildatastore.load({
			url: 'ClsTrnSalesReelVarietyChange.php',
			params: {
		          task: 'loadReelDetail',
			  compcode : Gincompcode,
//			  finid    : cmbReelNo.getValue(),
		          reelno   : cmbReelNo.getRawValue(),  
			},
			callback : function(){
//alert(loadreelnodetaildatastore.getCount());
//'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm'
                            txtvariety.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_desc'));
                            cmbVariety.setValue(loadreelnodetaildatastore.getAt(0).get('var_grpcode'));  
                            txtsizename.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_name'));
                            txtgsm.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_gsm'));
                            txtsize1.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_size2'));
                            txtSONO.setRawValue(loadreelnodetaildatastore.getAt(0).get('stk_sono'));
                            txtoldwt.setRawValue(loadreelnodetaildatastore.getAt(0).get('stk_wt'));
                            itemcode = loadreelnodetaildatastore.getAt(0).get('stk_var_code');
                            varcode = loadreelnodetaildatastore.getAt(0).get('var_grpcode');
                            fincode = loadreelnodetaildatastore.getAt(0).get('stk_finyear');
                            txtRNo.setValue(cmbReelNo.getValue().substring(8) );
			    loadOrderNoListDataStore.removeAll();
			    loadOrderNoListDataStore.load({
				url: 'ClsTrnSalesReelWeightChange.php',
				params: {
			    	task     : 'loadSONoList',
				compcode : Gincompcode,
				finid    : GinFinid,
				varty    : loadreelnodetaildatastore.getAt(0).get('var_grpcode'),
				},
				scope:this,
				callback:function()
		       		{
				cmbSONO.setValue(loadreelnodetaildatastore.getAt(0).get('stk_sono'));     

				loadSizeDatastore.removeAll();
		     		loadSizeDatastore.load({
		     		url: 'ClsTrnWinderEntry.php',
				params: {
					    task: 'loadSOsizes',
		   		            finid    : GinFinid,
					    compcode : Gincompcode,
					    sono     : loadreelnodetaildatastore.getAt(0).get('stk_sono'),
					    varietycode : loadreelnodetaildatastore.getAt(0).get('var_grpcode'),

					},
			       	callback:function()
					{
//			  	        cmbSize.setValue(loadreelnodetaildatastore.getAt(0).get('var_size2')); 
				 	}
				});

				}
			    });
          		},    
                }); 
    
	}
	}
});


var ReasonType = 0;

var cmbReasonType = new Ext.form.ComboBox({
        fieldLabel      : 'Reason Type',
        width       	 :  300,
        displayField: 'field2',
        valueField: 'field1',
        hiddenName      : '',
        id              : 'cmbReasonType',
        typeAhead       : true,
        mode            : 'local',
        store           : [  ['0',''], ['1','REEL DEMAGED FROM ATTI'],['2','REEL DEMAGED'],['3','SIZE CHANGED'],['4','OLD REELS'],['5','REEL Number Wrong'],['6','WRONG WEIGHT'],['7','BF CHANGE'],['8','GSM CHANGE']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : false,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
           select : function(){
                ReasonType = 0;
                ReasonType = cmbReasonType.getValue();
           }
        }   
});
var txtvariety = new Ext.form.TextField({
	fieldLabel  : 'Variety',
	id          : 'txtvariety',
	name        : 'txtvariety',
	width       :  270,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",    
        readOnly   : true, 	
	tabindex : 1,

});


var txtgsm = new Ext.form.TextField({
	fieldLabel  : 'GSM',
	id          : 'txtgsm',
	name        : 'txtgsm',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
        readOnly   : true,
	tabindex : 1,

});

var txtsizename = new Ext.form.TextField({
	fieldLabel  : 'Size',
	id          : 'txtsizename',
	name        : 'txtsizename',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
        readOnly   : true,
	tabindex : 1,

});

   
var txtsize1 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtsize1',
	name        : 'txtsize1',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,
});

var txtmano = new Ext.form.TextField({
	fieldLabel  : 'MA No',
	id          : 'txtmano',
	name        : 'txtmano',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,
});   

var txtSONO = new Ext.form.TextField({
	fieldLabel  : 'SO No',
	id          : 'txtSONO',
	name        : 'txtSONO',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});  

var txtoldwt = new Ext.form.NumberField({
	fieldLabel  : 'Old Weight (Kgs)',
	id          : 'txtoldwt',
	name        : 'txtoldwt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});



var txtNewRollNo = new Ext.form.NumberField({
	fieldLabel  : 'New Roll No',
	id          : 'txtNewRollNo',
	name        : 'txtNewRollNo',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);  

                rno  = cmbReelNo.getRawValue().substring(8);

                rno2 = "0"+txtRNo.getValue();
                rno2 = rno2.slice(-2);   
                
                rollno2 = "00"+txtNewRollNo.getValue();
                rollno2 = rollno2.slice(-3);  
          
                txtNewReelNo.setValue(yymm+"0"+ rollno2 +rno2);
            
              
         
           }
        } 


});

var txtRNo = new Ext.form.NumberField({
	fieldLabel  : 'Reel No',
	id          : 'txtRNo',
	name        : 'txtRNo',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);  
                rno  = cmbReelNo.getRawValue().substring(8);

                rno2 = "0"+txtRNo.getValue();
         //       rno2 = rno2.substring(0,2);   
                rno2 = rno2.slice(-2);  

                
                rollno2 = "00"+txtNewRollNo.getValue();
                rollno2 = rollno2.slice(-3);  
          
                txtNewReelNo.setValue(yymm+"0"+ rollno2 +rno2);
 
          
//                txtNewReelNo.setValue(yymm+"0"+ txtNewRollNo.getValue()+rno2);
              
         
           }
        } 


});


var txtNewReelNo = new Ext.form.NumberField({
	fieldLabel  : 'New Reel No',
	id          : 'txtNewReelNo',
	name        : 'txtNewReelNo',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'10'},

});

   function check_password()
   {
      if (txtPassword.getRawValue() == "stock")
      {
        Ext.getCmp('save').setDisabled(false);
      }
      else
      {
        Ext.getCmp('save').setDisabled(true);
      }    

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
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


var txtReason = new Ext.form.TextField({
	fieldLabel  : 'Reason-II',
	id          : 'txtReason',
	name        : 'txtReason',
	width       :  450,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'59'},

});


function find_wt_check(value1)
{
    if (value1 >0)
       Ext.getCmp('cmbReasonType').setDisabled(false);
    else
       Ext.getCmp('cmbReasonType').setDisabled(true);
}


var txtnewwt = new Ext.form.NumberField({
	fieldLabel  : 'WT Changed as',
	id          : 'txtnewwt',
	name        : 'txtnewwt',
	width       :  80,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
 	enableKeyEvents: true,
        listeners   :{

		blur: function(field) {
		    find_wt_check(field.getValue());
		},
		keyup: function(field, e) {
		    find_wt_check(field.getValue());
		}
        }
 

});
 
function loadRollDetails()
{
	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnSalesReelWeightChange.php',
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

function Refresh()
{
	txtoldwt.setValue('');
	txtnewwt.setValue('');
        txtSONO.setRawValue('');
        txtNewReelNo.setValue('');
        txtReason.setRawValue('');
        cmbSize.setValue(0);
        cmbSize.setRawValue('');

}

function RefreshData(){

        Ext.getCmp('cmbReasonType').setDisabled(true);
        Ext.getCmp('save').setDisabled(true);

        var dt = dtdocdate.getValue();
        yymm= dt.format("y")+dt.format("m");

        yy =  "20"+yymm.substring(0,2);   
        mm  =  yymm.substring(2,4);   


       txtProdMonth.setValue(yymm);

       loadRollDetails()

			loaddocnodatastore.removeAll();
			loaddocnodatastore.load({
				url: 'ClsTrnSalesReelWeightChange.php',
				params: {
				task: 'loadentryno',
				compcode: Gincompcode,
				finid: GinFinid
				},
				callback : function(){
				   txtdocno.setValue(loaddocnodatastore.getAt(0).get('no'));
                                }
		        });    	    

}
       
               
var TrnSalesReelWeightChangeFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesReelWeightChangeFormpanel',
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
				TrnSalesReelWeightChangeFormpanel.getForm().reset();
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
//save              
		{
	            text: 'Save',
	            id: 'save',
	            style  : 'text-align:center;',
	            tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
                     var gstSave;

                    gstSave="true";

function showError(msg, cmpId = null) {
    Ext.Msg.alert('Sales', msg, function () {
        if (cmpId) {
            var cmp = Ext.getCmp(cmpId);
            if (cmp && cmp.rendered) {
                cmp.focus(false, 200);
                cmp.selectText();
            }
        }
    });
}



                    if (txtdocno.getRawValue() == 0)
                    {
		        showError('Sales Entry No..');
		        return;
                        gstSave="false";
                    } 

                    else if ( Number(txtNewRollNo.getValue())  >0 && txtNewReelNo.getRawValue().length != 10 ) 
                    {
		        showError('Error in Reel Number format..');
		        return;
                        gstSave="false";
                    } 
                    else if (Number(txtnewwt.getValue()) > 0 &&  cmbReasonType.getValue() == 0 ) 
                    {
      			showError('Select Reason for Weight Change ..', 'cmbReasonType');	
                        gstSave="false";
                    } 

                    else if ( txtReason.getRawValue()== "" || txtReason.getRawValue().length < 15   ) 
                    {
				showError('Enter Proper Reason for Modify ..', 'txtReason');
				return;
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

                            Ext.Ajax.request({
                            url: 'TrnSalesReelWeightChangeSave.php',
                            params :
                             {


				compcode : Gincompcode,
				fincode  : GinFinid,
				entno    : txtdocno.getValue(),
				entdate  : Ext.util.Format.date(dtdocdate.getValue(),"Y-m-d"),
				reelno   : cmbReelNo.getRawValue(),
                                reelyear : cmbReelNo.getValue(),
				oldwt    : txtoldwt.getValue(),
				newwt    : txtnewwt.getValue(),
                                oldsono  : txtSONO.getRawValue(),
                                newsono  : newsono,
				oldsize  : itemcode,
				newsize  : newsize,
                                oldRollNo  : cmbRollNo.getValue(),
                                newRollNo  : txtNewRollNo.getValue(),
                                newreelno  : txtNewReelNo.getValue(),
                                reasontype : ReasonType,
                                reason     : txtReason.getRawValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Reel SO / Size / weight changed -" + obj['entno']);
//                                    TrnSalesReelWeightChangeFormpanel.getForm().reset();
                                    Refresh();
                                  }else
					{
			Ext.MessageBox.alert("Reel SO / Size / weight Not changed! Pls Check!- " + obj['entno']);                                                  
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
				TrnSalesReelWeightChange.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
                { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 500,
		        width   : 1250,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 10,
		        items:[ 


   			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:10,
	    		y	:0,
	    		border	:false,
	    		items:[cmbFinyear]
	    		},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 250,
				x           : 10,
				y           : 40,
				border      : false,
				items: [txtdocno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 160,
				x           : 250,
				y           : 40,
			    	border      : false,
				items: [dtdocdate]
			},
                                               {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 400,
                                                x           : 450,
                                                y           : 0,
                                                border      : false,
                                                items: [txtPassword] 
                                               },

    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 300,
			x           : 10,
			y           : 80,
			border      : false,
			items: [txtProdMonth]
			},

	
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:10,
	    		y	:120,
	    		border	:false,
	    		items:[cmbRollNo]
	    		},

    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 90,
			width       : 300,
			x           : 400,
			y           : 120,
			border      : false,
			items: [dtProdDate]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 170,
				border      : false,
				items: [cmbReelNo]
			},
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 220,
				border      : false,
				items: [txtvariety]
		        },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 160,
				width       : 400,
				x           : 420,
				y           : 220,
				border      : false,
				items: [cmbVariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 260,
				border      : false,
				items: [txtSONO]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 160,
				width       : 400,
				x           : 420,
				y           : 260,
				border      : false,
				items: [cmbSONO]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 160,
				width       : 400,
				x           : 420,
				y           : 300,
				border      : false,
				items: [cmbSize]
			},
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 270,
				x           : 10,
				y           : 120,
				border      : false,
				items: [txtgsm]
			},
*/

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 270,
				x           : 10,
				y           : 300,
				border      : false,
				items: [txtsizename]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 290,
				y           : 300,
				border      : false,
				items: [txtsize1]
			},
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 270,
				x           : 10,
				y           : 200,
				border      : false,
				items: [txtmano]
			},
*/

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 270,
				x           : 10,
				y           : 340,
				border      : false,
				items: [txtoldwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 160,
				width       : 300,
				x           : 420,
				y           : 340,
				border      : false,
				items: [txtnewwt]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 500,
				x           : 10,
				y           : 380,
				border      : false,
				items: [cmbReasonType]
			},
/*

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 300,
				x           : 10,
				y           : 380,
				border      : false,
				items: [txtNewRollNo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 300,
				x           : 260,
				y           : 380,
				border      : false,
				items: [txtRNo]
			},	
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 300,
				x           : 420,
				y           : 380,
				border      : false,
				items: [txtNewReelNo]
			},
*/
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 800,
				x           : 10,
				y           : 420,
				border      : false,
				items: [txtReason]
			},	        		        			
                 ],
             },  
      {   
                xtype       : 'fieldset',
                title       : '',
                width       : 280,
                height      : 420,
                x           : 1000,
                y           : 20,
                border      : true,
                layout      : 'absolute',
                items:[
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 185,
			layout  : 'absolute',
			x       : 0,
			y       : 10,

			items:[optprinttype],
		},


		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 450,
		               x           : 0,
	       		       y           : 60,
			       border      : false,
		               items: [optrep]
	   		  },
		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 240,
			       border      : false,
		               items: [dptStartDate]
	   		  },
       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 270,
			       border      : false,
		               items: [dptEndDate]
	   		  },

       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 40,
	       		       y           : 310,
			       border      : false,
		               items: [btnSubmit]
	   		  },
                      ]
            }  ,

        
          ],
                 
    });



    

   
    var TrnSalesReelWeightChange = new Ext.Window({
	height      : 600,
        width       : 1300,
        x	     : 30,
        y           : 30,
        title       : 'REEL WEIGHT CHANGE',
        items       : TrnSalesReelWeightChangeFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
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
//                alert("Hai");
//                alert(Gincompcode);

     		/*loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnSalesReelWeightChange.php',
			params: {
		          task: 'loadentryno',
			  compcode : Gincompcode,
			  finid    : GinFinid,
			},
			callback : function(){

			alert(loadreelnodatastore.getCount());

		 	},    
                });   

     		loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnSalesReelWeightChange.php',
			params: {
		          task: 'loadReelNoList',
			  compcode : Gincompcode,
			  finid    : GinFinid
			},
			callback : function(){

		      	//alert(loadreelnodatastore.getCount());

		 	},    
                });   
*/
		}
	}	
    });
    TrnSalesReelWeightChange.show();  
});
