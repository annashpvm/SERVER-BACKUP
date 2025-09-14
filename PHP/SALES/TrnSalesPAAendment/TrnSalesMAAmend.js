Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstadd;
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var mamachine = localStorage.getItem('ma_machine');
   var mamachinename = localStorage.getItem('ma_machinename');

   var editrow = 0;
   var gridedit = "false";

   var Validatechk = "true";
   var lsize;
   var bsize;
   var gsm;
   var ordtype = "L";
   var varcodelist = "(";
   var sizecodelist = "("  
   var gstFlag = "Add";


 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
  
 });


 var loadmavarietystore = new Ext.data.Store({
      id: 'loadmavarietystore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesMAAmend.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadmavariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
  
 });

 var loadmaitemstore = new Ext.data.Store({
      id: 'loadmaitemstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesMAAmend.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadmasize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['msize','var_gsm'
      ]),
  
 });


 var loadmanoliststore = new Ext.data.Store({
      id: 'loadmanoliststore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesMAAmend.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadmanolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ma_advno'
      ]),
  
 });

 var loadmanoheaderstore = new Ext.data.Store({
      id: 'loadmanoheaderstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesMAAmend.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"editmanoheader"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ma_advdate', 'ma_slno', 'ma_party', 'ma_varcode','ma_sizecode','ma_ordtype', 'ma_qty', 'ma_sheets', 'ma_reamwt', 'ma_reams', 'ma_priority', 'ma_machine', 'ma_close','ma_closereason', 'ma_order_ref','ma_rwprodn', 'ma_rg1prodn', 'ma_retree', 'ma_sheetconv', 'ma_sheetconv_moved', 'ma_sheetconv_recpt', 'ma_salvage', 
'ma_salvage_sheet', 'ma_salvage_retree', 'ma_salvage_rg1', 'ma_salvage_repulp', 'ma_salvage_floor', 'ma_repulp', 'ma_floor', 'ma_despdate','ma_amendno', 'ma_amenddate','cust_ref','var_desc','var_typecode', 'var_gsm','var_code', 'var_grpcode', 'var_unit','var_size1', 'var_size2', 'var_reams','var_sheets','var_name'

      ]),
  
 });

 var loadmanotrailerstore = new Ext.data.Store({
      id: 'loadmanotrailerstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesMAAmend.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"editmanotrailer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['mat_slno','mat_varcode','mat_size1', 'mat_size2', 'mat_size3', 'mat_size4', 'mat_size5', 'mat_size6', 'mat_size7', 'mat_size8', 'mat_size9', 'mat_size10', 'mat_size11', 'mat_size12', 'mat_size13', 'mat_size14','mat_qty', 'mat_deckle', 'mat_deckle_size','var_code', 'var_desc', 'var_typecode','var_gsm'

      ]),
  
 });

 var loadAllCustomerList = new Ext.data.Store({
      id: 'loadAllCustomerList',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
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


  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetailsOfVariety"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode','var_gsm'])
    });
	

/*

  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });


*/





  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit','var_reams','var_sheets'])
    });


  var loadMANoDataStore = new Ext.data.Store({
        id: 'loadMANoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesMAAmend.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadMANo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['advno'])
    });

   var txtMANo = new Ext.form.NumberField({
        fieldLabel  : 'MA No.',
        id          : 'txtMANo',
        name        : 'txtMANo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtmill = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtmill',
        name        : 'txtmill',
        width       :  150,
        border      : false,
	readOnly : true,
        tabindex : 2
    });

   var txtgsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       :  40,
 	readOnly : true,
        tabindex : 2
    });
   var txtgsm2 = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm2',
        name        : 'txtgsm2',
        width       :  40,
 	readOnly : true,
        tabindex : 2
    });

   var txtPriority = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPriority',
        name        : 'txtPriority',
        width       :  40,
        tabindex : 2
    });

   var txtnoofreels1 = new Ext.form.NumberField({
        fieldLabel  : 'No.of. Reels',
        id          : 'txtnoofreels1',
        name        : 'txtnoofreels1',
        width       :  40,
        tabindex : 2
    });

   var txtnoofreels2 = new Ext.form.NumberField({
        fieldLabel  : 'No.of. Reels',
        id          : 'txtnoofreels2',
        name        : 'txtnoofreels2',
        width       :  40,
        tabindex : 2
    });

   var txtnoofreels3 = new Ext.form.NumberField({
        fieldLabel  : 'No.of. Reels',
        id          : 'txtnoofreels3',
        name        : 'txtnoofreels3',
        width       :  40,
        tabindex : 2
    });


   var txttotqty1 = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty(T)',
        id          : 'txttotqty1',
        name        : 'txttotqty1',
        width       :  70,
	readOnly : true,
        tabindex : 2
    });


   var txttotqty2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty(T)',
        id          : 'txttotqty2',
        name        : 'txttotqty2',
        width       :  70,
	readOnly : true,
        tabindex : 2
    });


   var txtremarks1 = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks1',
        name        : 'txtremarks1',
        width       :  600,
        value      : 'GSM & BRIGHTNESS SHOULD BE MAINTAINED STRICTLY',
        tabindex    : 2
    });

   var txtremarks2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks2',
        name        : 'txtremarks2',
        width       :  600,
        tabindex : 2
    });

   var txtremarks3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks3',
        name        : 'txtremarks3',
        width       :  600,
        tabindex : 2
    });


   var txtremarks4 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks4',
        name        : 'txtremarks4',
        width       :  600,
        tabindex : 2
    });

   var txtremarks5 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks5',
        name        : 'txtremarks5',
        width       :  600,
        tabindex : 2
    });

   var txtremarks6 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks6',
        name        : 'txtremarks6',
        width       :  600,
        tabindex : 2
    });

   var txtremarks7 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks7',
        name        : 'txtremarks7',
        width       :  600,
        tabindex : 2
    });

   var txtremarks8 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks8',
        name        : 'txtremarks8',
        width       :  600,
        tabindex : 2
    });

   var txtremarks9 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks9',
        name        : 'txtremarks9',
        width       :  600,
        tabindex : 2
    });

   var txtremarks10 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtremarks10',
        name        : 'txtremarks10',
        width       :  600,
        tabindex : 2
    });


   var txttolerance = new Ext.form.TextField({
        fieldLabel  : 'Tolarence % for M/C Production',
        id          : 'txttolerance',
        name        : 'txttolerance',
        width       :  60,
        tabindex : 2
    });


var lblqty = new Ext.form.Label({
    fieldLabel  : 'QTY(T)',
    id          : 'lblqty',
    width       : 60
});


   var txtdeckqty = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtdeckqty',
        name        : 'txtdeckqty',
        width       :  60,
        tabindex : 2
    });

var cmbdeckle = new Ext.form.ComboBox({
        fieldLabel      : 'Existing Deckle',
        width           : 300,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbdeckle',
        typeAhead       : true,
        mode            : 'local',
        store           : [],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize1 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize1',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize2 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize2',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize3 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize3',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize4 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize4',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize5 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize5',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize6 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize6',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize7 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize7',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize8 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize8',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize9 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize9',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize10 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize10',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbdsize11 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize11',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize12 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize12',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});



var cmbdsize13 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize13',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbdsize14 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbdsize14',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbMANo = new Ext.form.ComboBox({
        fieldLabel      : 'MA No.',
        width           : 100,
        displayField    : 'ma_advno', 
        valueField      : 'ma_advno',
        hiddenName      : '',
        id              : 'cmbMANo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmanoliststore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
            select: function () 
            {
                txtMANo.setValue(cmbMANo.getValue());
		flxDetail.getStore().removeAll();
		flxdeckle.getStore().removeAll();
		flxsize.getStore().removeAll();
		flxvariety.getStore().removeAll();
tabSalesMA.setActiveTab(1); tabSalesMA.setActiveTab(0);
		loadmanoheaderstore.load({
		url: 'ClsTrnSalesMAAmend.php',
		params: {
		    task: 'editmanoheader',
		    finid   : GinFinid,
		    compcode:Gincompcode,
                    machine:mamachine,
		    mano:cmbMANo.getValue()
		},
		callback:function()
		{
//alert(loadmanoheaderstore.getCount());
                  cmbCustomer.setValue(loadmanoheaderstore.getAt(0).get('cust_code')); 
                  txtAmendno.setValue(Number(loadmanoheaderstore.getAt(0).get('ma_amendno'))+1); 
		  var cnt=loadmanoheaderstore.getCount();
                  if(cnt>0)
	          {  
                      for(var j=0; j<cnt; j++)
		      { 
		            var RowCnt = flxDetail.getStore().getCount() + 1;
		            flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({
		                        sno      : loadmanoheaderstore.getAt(j).get('ma_slno'),
					varname  : loadmanoheaderstore.getAt(j).get('var_desc'),
					varcode  : loadmanoheaderstore.getAt(j).get('ma_varcode'),
					gsm      : loadmanoheaderstore.getAt(j).get('var_gsm'),
					size     : loadmanoheaderstore.getAt(j).get('var_name'),
					itemcode : loadmanoheaderstore.getAt(j).get('ma_sizecode'),
					qty      : loadmanoheaderstore.getAt(j).get('ma_qty'),
					reamwt   : loadmanoheaderstore.getAt(j).get('ma_reamwt'),
					reams    : loadmanoheaderstore.getAt(j).get('ma_reams'),
					sheets   : loadmanoheaderstore.getAt(j).get('ma_sheets'),
					customer : loadmanoheaderstore.getAt(j).get('cust_ref'),
					custcode : loadmanoheaderstore.getAt(j).get('ma_party'),
					priority : loadmanoheaderstore.getAt(j).get('ma_priority'),
					ordno    : loadmanoheaderstore.getAt(j).get('ma_order_ref'),
		 			type     : loadmanoheaderstore.getAt(j).get('ma_ordtype'),
		 			finished : loadmanoheaderstore.getAt(j).get('ma_rwprodn'),
					despdate : Ext.util.Format.date(loadmanoheaderstore.getAt(j).get('ma_despdate'),"Y-m-d"),
					close    : 'N',
		                }) 
		            );
      grid_tot();  
                       }
                    }   
                loadmavarietystore.removeAll();
                loadmavarietystore.load({
                    url: 'ClsTrnSalesMAAmend.php', // File to connect to
                    params:
                            {
                                task: "loadmavariety",
                                varcodes:varcodelist
                             },
                     callback: function () 
                     {

                     }    

                });


                }  //call back function end
                });  
          grid_tot();  
 


		loadmanotrailerstore.load({
		url: 'ClsTrnSalesMAAmend.php',
		params: {
		    task: 'editmanotrailer',
		    finid   : GinFinid,
		    compcode:Gincompcode,
	            machine:mamachine,
		    mano:cmbMANo.getValue()
		},
		callback:function()
		{
		  var cnt=loadmanotrailerstore.getCount();
//alert(cnt);
                  if(cnt>0)
	          {  
                      for(var j=0; j<cnt; j++)
		      { 
		            var RowCnt = flxdeckle.getStore().getCount() + 1;
		            flxdeckle.getStore().insert(
		                flxdeckle.getStore().getCount(),
		                new dgrecord({
		                        sno      : loadmanotrailerstore.getAt(j).get('mat_slno'),
					varname  : loadmanotrailerstore.getAt(j).get('var_desc'),
					varcode  : loadmanotrailerstore.getAt(j).get('mat_varcode'),
					gsm      : loadmanotrailerstore.getAt(j).get('var_gsm'),
					decksize : loadmanotrailerstore.getAt(j).get('mat_deckle_size'),
					deckle   : loadmanotrailerstore.getAt(j).get('mat_deckle'),
					qty      : loadmanotrailerstore.getAt(j).get('mat_qty'),
					size1    : loadmanotrailerstore.getAt(j).get('mat_size1'),
					size2    : loadmanotrailerstore.getAt(j).get('mat_size2'),
					size3    : loadmanotrailerstore.getAt(j).get('mat_size3'),
					size4    : loadmanotrailerstore.getAt(j).get('mat_size4'),
					size5    : loadmanotrailerstore.getAt(j).get('mat_size5'),
					size6    : loadmanotrailerstore.getAt(j).get('mat_size6'),
					size7    : loadmanotrailerstore.getAt(j).get('mat_size7'),
		 			size8    : loadmanotrailerstore.getAt(j).get('mat_size8'),
					size9    : loadmanotrailerstore.getAt(j).get('mat_size9'),
					size10   : loadmanotrailerstore.getAt(j).get('mat_size10'),
					size11   : loadmanotrailerstore.getAt(j).get('mat_size11'),
					size12   : loadmanotrailerstore.getAt(j).get('mat_size12'),
					size13   : loadmanotrailerstore.getAt(j).get('mat_size13'),
					size14   : loadmanotrailerstore.getAt(j).get('mat_size14'),

		                }) 
		            );
                     
                       }
                   
                    }   
                   refreshdeckle();
                } 

                });  
 //refreshdeckle();

             
         } 

      } 
     
});





    var dptMANo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptMANo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

    var dptdesp= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dptdesp',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

   var txtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtAmendno = new Ext.form.NumberField({
        fieldLabel  : 'Amendment No.',
        id          : 'txtAmendno',
        name        : 'txtAmendno',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });
   var txtRecdQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRecdQty',
        name        : 'txtRecdQty',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtNoSheets = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Sheets',
        id          : 'txtNoSheets',
        name        : 'txtNoSheets',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtReamWt = new Ext.form.NumberField({
        fieldLabel  : 'Ream.Wt',
        id          : 'txtReamWt',
        name        : 'txtReamWt',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtNoReams = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Reams',
        id          : 'txtNoReams',
        name        : 'txtNoReams',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });


    var dptRefNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptRefNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });
	
var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety ',
        width           : 350,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdnVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function () 
                {
                getSizeDataStore.removeAll();
                loadSalesVarietyStore.removeAll();
                loadSalesVarietyStore.load({
                    url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
                    params:
                            {
                                task: "loadSizeDetailsOfVariety",
                                grpcode:cmbVariety.getValue()
                             },
                     callback: function () 
                     {
//alert(loadSalesVarietyStore.getCount());
                           gsm = loadSalesVarietyStore.getAt(0).get('var_gsm');
                           txtgsm.setValue(loadSalesVarietyStore.getAt(0).get('var_gsm'));
                     }


                });
/*

var combobox = Ext.getCmp('cmbCuttingVariety');
var fieldValue1, displayField1;
var store1 = Ext.getStore('loadProdnVariety');

combobox.store.loadData(store1.data.items);

valueField = 'var_code';
displayField = 'var_desc';
combobox.valueField = valueField;
combobox.displayField = displayField;
combobox.displayTpl = new Ext.XTemplate(
'<tpl for=".">' +
'{[typeof values === "string" ? values : values["' + combobox.displayField + '"]]}' +
'<tpl if="xindex < xcount">' + combobox.delimiter + '</tpl>' +
'</tpl>'
);
combobox.picker = null;
*/

              }
        }
});




var cmbCuttingVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Cutting Variety ',
        width           : 350,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbCuttingVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmavarietystore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function () 
            {

		sizecodelist = "("  
		var Row= flxDetail.getStore().getCount();
		flxDetail.getSelectionModel().selectAll();
		var sel=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
			if (cmbCuttingVariety.getValue() == sel[i].data.varcode)
			{ 
			   sizecodelist = sizecodelist + sel[i].data.itemcode + ',';
			}
		}
                sizecodelist = sizecodelist + "0)";


                loadmaitemstore.load({
                    url: 'ClsTrnSalesMAAmend.php', // File to connect to
                    params:
                            {
                                task: "loadmasize",
                                sizecodes:sizecodelist
                             },
                     callback: function () 
                     {
                        txtgsm2.setRawValue(loadmaitemstore.getAt(0).get('var_gsm'));
                     }

                });

              }
        }
});



var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});



var cmbOrderType = new Ext.form.ComboBox({
        fieldLabel      : 'Order / PI No. ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbOrderType',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['Stock Keeping','Bit Reels'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State ',
        width           : 200,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


  var getGSTDataStore = new Ext.data.Store({
        id: 'getGSTDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
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


function grid_tot()
{
	totqty1=0;
        varcodelist = "(";  
//alert("Edit");
      
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totqty1=totqty1+Number(sel[i].data.qty);
            varcodelist = varcodelist + sel[i].data.varcode + ',';
        }
        txttotqty1.setValue(totqty1);
        varcodelist = varcodelist + '0)';
//alert(varcodelist);
	totqty1=0;
        var Row1= flxdeckle.getStore().getCount();

	if (Row1 >0) {
		flxdeckle.getSelectionModel().selectAll();

		var sel1=flxdeckle.getSelectionModel().getSelections();
		for(var i=0;i<Row1;i++)
		{
		    totqty1=totqty1+Number(sel1[i].data.qty);
		}
		txttotqty2.setValue(totqty1);
	}

}

var cmbsize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 180,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbsize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesVarietyStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function () 
                {
                getSizeDataStore.removeAll();
                getSizeDataStore.load({
                    url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
                    params:
                            {
                                task: "findSizeDetails",
                                sizecode:cmbsize.getValue()
                             },
                     callback: function () 
                     {
                           if (getSizeDataStore.getAt(0).get('var_unit') == 2)
                           {
		                   var reamwt = 0; 
		                   reamwt =  getSizeDataStore.getAt(0).get('var_size1') * getSizeDataStore.getAt(0).get('var_size2') * getSizeDataStore.getAt(0).get('var_gsm') * getSizeDataStore.getAt(0).get('var_sheets') / 10000000

		                   txtNoSheets.setValue(getSizeDataStore.getAt(0).get('var_sheets'));
		                   txtNoReams.setValue(getSizeDataStore.getAt(0).get('var_reams'));



		                   txtReamWt.setValue(reamwt.toFixed(1));
                          }



                     }

                });
              }
        }

});




var cmbsize1 = new Ext.form.ComboBox({
        fieldLabel      : 'Size ',
        width           : 70,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbsize1',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbsize2 = new Ext.form.ComboBox({
        fieldLabel      : 'Size-2',
        width           : 70,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbsize2',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbsize3 = new Ext.form.ComboBox({
        fieldLabel      : 'Size-3',
        width           : 70,
        displayField    : 'msize', 
        valueField      : 'msize',
        hiddenName      : '',
        id              : 'cmbsize3',
        typeAhead       : true,
        mode            : 'local',
        store           : loadmaitemstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
/*

var DSize4 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'DSize4',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesVarietyStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var DSize5 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'DSize5',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesVarietyStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var DSize6 = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'DSize6',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesVarietyStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
*/

var cmbDocuments = new Ext.form.ComboBox({
        fieldLabel      : 'Documents ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDocuments',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DIRECT','THROUGH BANK','LC'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbBankParty = new Ext.form.ComboBox({
        fieldLabel      : 'Party Bank ',
        width           : 350,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbBankParty',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadLedgerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});



  var loadLedgerList = new Ext.data.Store({
        id: 'loadLedgerList',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
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
	









var dgrecord = Ext.data.Record.create([]);

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:220,
    height: 130,
    hidden:false,
    width: 850,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:200,align:'left'},
        {header: "Varcode", dataIndex: 'varcode',sortable:true,width:30,align:'left'},
        {header: "GSM", dataIndex:'gsm',sortable:true,width:50,align:'left'},
        {header: "SIZE", dataIndex:'size',sortable:true,width:120,align:'left'},
        {header: "Item Code", dataIndex:'itemcode',sortable:true,width:50,align:'left'},
        {header: "Qty" , dataIndex:'qty',sortable:true,width:60,align:'left'},
        {header: "Ream Wt", dataIndex:'reamwt',sortable:true,width:50,align:'left'},       
        {header: "Reams", dataIndex:'reams',sortable:true,width:50,align:'left'},       
        {header: "Sheets", dataIndex:'sheets',sortable:true,width:50,align:'left'},       
        {header: "Customer", dataIndex:'customer',sortable:true,width:120,align:'left'},
        {header: "Custcode", dataIndex:'custcode',sortable:true,width:50,align:'left'},
        {header: "Priority" , dataIndex:'priority',sortable:true,width:60,align:'left'},
        {header: "Ord.No", dataIndex:'ordno',sortable:true,width:50,align:'left'},       
        {header: "Type", dataIndex:'type',sortable:true,width:50,align:'left'},       
        {header: "Desp.Date", dataIndex:'despdate',sortable:true,width:50,align:'left'},       
        {header: "Finished", dataIndex:'finished',sortable:true,width:50,align:'left'}, 
        {header: "Close", dataIndex:'close',sortable:true,width:50,align:'left'},       


    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'MA ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: ' Press YES to Modify   -  NO to Delete',
             fn: function(btn){
             if (btn === 'yes'){
                var sm = flxDetail.getSelectionModel();
                var selrow = sm.getSelected();
        	gridedit = "true";
		editrow = selrow;
                cmbVariety.setRawValue(selrow.get('varname'));
		cmbVariety.setValue(selrow.get('varcode'));
		txtgsm.setValue(selrow.get('gsm'));
		cmbsize.setRawValue(selrow.get('size'));
		cmbsize.setValue(selrow.get('itemcode'));
		txtQty.setValue(selrow.get('qty'));
		txtReamWt.setValue(selrow.get('reamwt'));
		txtNoReams.setValue(selrow.get('reams'));
		txtNoSheets.setValue(selrow.get('sheets'));
		cmbCustomer.setRawValue(selrow.get('customer'));
		cmbCustomer.setValue(selrow.get('custcode'));
		txtPriority.setValue(selrow.get('priority'));
		cmbOrderType.setRawValue(selrow.get('ordno'));
                txtRecdQty.setValue(selrow.get('finished'));
		dptdesp.setValue(selrow.get('despdate'));

                if (gstFlag == "Edit")
                {
		        getSizeDataStore.removeAll();
		        loadSalesVarietyStore.removeAll();
		        loadSalesVarietyStore.load({
		            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
		            params:
		                    {
		                        task: "loadSizeDetailsOfVariety",
		                        grpcode:selrow.get('varcode')
		                     },
		             callback: function () 
		             {
		                   gsm = loadSalesVarietyStore.getAt(0).get('var_gsm');
		                   txtgsm.setValue(loadSalesVarietyStore.getAt(0).get('var_gsm'));
		                   cmbsize.setValue(selrow.get('itemcode'));
		             }


		        });

                }                

            }
            else if (btn === 'no'){
                var sm = flxDetail.getSelectionModel();
	        var selrow = sm.getSelected();
      		flxDetail.getStore().remove(selrow);
	        flxDetail.getSelectionModel().selectAll();
	        grid_tot();
            }

      }
     });         
    }

   }
});


var flxdeckle = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:190,
    height: 150,
    hidden:false,
    width: 850,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:200,align:'left'},
        {header: "Varcode", dataIndex: 'varcode',sortable:true,width:30,align:'left'},
        {header: "GSM", dataIndex:'gsm',sortable:true,width:50,align:'left'},
        {header: "DECKLE SIZE", dataIndex:'decksize',sortable:true,width:150,align:'left'},
        {header: "DECKLE", dataIndex:'deckle',sortable:true,width:50,align:'left'},
        {header: "QTY(MT)" , dataIndex:'qty',sortable:true,width:50,align:'left'},
        {header: "SIZE1", dataIndex:'size1',sortable:true,width:50,align:'left'},       
        {header: "SIZE2", dataIndex:'size2',sortable:true,width:50,align:'left'},       
        {header: "SIZE3", dataIndex:'size3',sortable:true,width:50,align:'left'},       
        {header: "SIZE4", dataIndex:'size4',sortable:true,width:50,align:'left'},       
        {header: "SIZE5", dataIndex:'size5',sortable:true,width:50,align:'left'},       
        {header: "SIZE6", dataIndex:'size6',sortable:true,width:50,align:'left'},       
        {header: "SIZE7", dataIndex:'size7',sortable:true,width:50,align:'left'},       
        {header: "SIZE8", dataIndex:'size8',sortable:true,width:50,align:'left'},       
        {header: "SIZE9", dataIndex:'size9',sortable:true,width:50,align:'left'},       
        {header: "SIZE10", dataIndex:'size10',sortable:true,width:50,align:'left'},       
        {header: "SIZE11", dataIndex:'size11',sortable:true,width:50,align:'left'},       
        {header: "SIZE12", dataIndex:'size12',sortable:true,width:50,align:'left'},       
        {header: "SIZE13", dataIndex:'size13',sortable:true,width:50,align:'left'},       
        {header: "SIZE14", dataIndex:'size14',sortable:true,width:50,align:'left'},       

  

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: ' Press YES to Modify   -  NO to Delete',
             fn: function(btn){
		     if (btn === 'yes'){
		        var sm = flxdeckle.getSelectionModel();
		        var selrow = sm.getSelected();
			gridedit = "true";
			editrow = selrow;
		        cmbCuttingVariety.setRawValue(selrow.get('varname'));
			cmbCuttingVariety.setValue(selrow.get('varcode'));
			txtgsm2.setValue(selrow.get('gsm'));
			txtdeckqty.setValue(selrow.get('qty'));
			cmbdsize1.setRawValue(selrow.get('size1'));
			cmbdsize2.setRawValue(selrow.get('size2'));
			cmbdsize3.setRawValue(selrow.get('size3'));
			cmbdsize4.setRawValue(selrow.get('size4'));
			cmbdsize5.setRawValue(selrow.get('size5'));
			cmbdsize6.setRawValue(selrow.get('size6'));
			cmbdsize7.setRawValue(selrow.get('size7'));
			cmbdsize8.setRawValue(selrow.get('size8'));
			cmbdsize9.setRawValue(selrow.get('size9'));
			cmbdsize10.setRawValue(selrow.get('size10'));
			cmbdsize11.setRawValue(selrow.get('size11'));
			cmbdsize12.setRawValue(selrow.get('size12'));
			cmbdsize13.setRawValue(selrow.get('size13'));
			cmbdsize14.setRawValue(selrow.get('size14'));
                        if (gstFlag == "Edit")
			{

		sizecodelist = "("  
		var Row= flxDetail.getStore().getCount();
		flxDetail.getSelectionModel().selectAll();
		var sel=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
			if (cmbCuttingVariety.getValue() == sel[i].data.varcode)
			{ 
			   sizecodelist = sizecodelist + sel[i].data.itemcode + ',';
			}
		}
                sizecodelist = sizecodelist + "0)";


                loadmaitemstore.removeAll();
                loadmaitemstore.load({
                    url: 'ClsTrnSalesMAAmend.php', // File to connect to
                    params:
                            {
                                task: "loadmasize",
                                sizecodes:sizecodelist
                             },
                     callback: function () 
                     {
                        txtgsm2.setRawValue(loadmaitemstore.getAt(0).get('var_gsm'));
                     }

                });


                        }
		    }
		    else if (btn === 'no'){
		        var sm = flxdeckle.getSelectionModel();
			var selrow = sm.getSelected();
	      		flxdeckle.getStore().remove(selrow);
			flxdeckle.getSelectionModel().selectAll();
			grid_tot();
		    }
            }
     });         
    }

   }
});


var flxsize = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:5,
    y:10,
    height: 150,
    hidden:false,
    width: 300,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:40,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:160,align:'left'},
        {header: "VARCODE", dataIndex: 'varcode',sortable:true,width:50,align:'left'},
        {header: "SIZE", dataIndex:'size',sortable:true,width:50,align:'left'},
        {header: "QTY(MT)" , dataIndex:'qty',sortable:true,width:50,align:'left'},
    ],

    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxdeckle.getSelectionModel();
        var selrow = sm.getSelected();
        flxdeckle.getStore().remove(selrow);
        flxdeckle.getSelectionModel().selectAll();
        grid_tot();
       }
      }
     });         
    }

   }
});



var flxvariety = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:5,
    y:220,
    height: 100,
    hidden:false,
    width: 300,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:40,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:180,align:'left'},
        {header: "VARCODE", dataIndex: 'varcode',sortable:true,width:50,align:'left'},
        {header: "QTY(MT)" , dataIndex:'qty',sortable:true,width:60,align:'left'},
    ],

    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxdeckle.getSelectionModel();
        var selrow = sm.getSelected();
        flxdeckle.getStore().remove(selrow);
        flxdeckle.getSelectionModel().selectAll();
        grid_tot();

       }
      }
     });         
    }

   }
});


var opttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Order Type',
    fieldLabel: '',
    layout : 'hbox',
    width: 500,
    height:55,
    x:15,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 4,
        rows : 1,
        id: 'opttype',
        items: [
            {boxLabel: 'Export', name: 'opttype', id:'optexport', inputValue: 1,checked:false,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
                     ordtype = "E"         
                   }
                 }
               }},
            {boxLabel: 'Local', name: 'opttype', id:'optlocal', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
                     ordtype = "L"         
                   }
                 }
               }},
            {boxLabel: 'With out Order', name: 'opttype', id:'optnoorder', inputValue: 1,checked:false,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
                     ordtype = "W"         
                   }
                 }
               }},
            {boxLabel: 'Agent', name: 'opttype', id:'optagent', inputValue: 2,checked:false,
               listeners:{
                 check:function(rb,checked){
                   if(checked==true){
                     ordtype = "A"         
                   }
                 }
               }
            }
         ]
    }
    ]
});

function validatechkgrid()
{

	Validatechk="true";
	if (cmbVariety.getValue()==0 || cmbVariety.getRawValue()=="")
	{
		Ext.Msg.alert('MA','Select Variety Name');
		Validatechk="false";
	}

	else if (cmbCustomer.getValue()==0 || cmbCustomer.getRawValue()=="")
	{
		Ext.Msg.alert('MA','Select Customer Name');
		Validatechk="false";
	}            
	else if (cmbsize.getValue()==0 || cmbsize.getRawValue()== "")
	{
		Ext.Msg.alert('MA','Select Size Name');
		Validatechk="false";
	}            

	else if (cmbOrderType.getValue()==0 || cmbOrderType.getRawValue()=="")
	{
		Ext.Msg.alert('MA','Select Size Name');
		Validatechk="false";
	}            
        else  if (Number(txtPriority.getRawValue())===0){
                Ext.MessageBox.alert("MA", "Enter Priority..");
                Validatechk="false";
          }
        else  if (Number(txtQty.getRawValue())===0){
                Ext.MessageBox.alert("MA", "Enter Qty..");
                Validatechk="false";
          }
        else  if (Number(txtRecdQty.getRawValue()) > Number(txtQty.getRawValue()) ){
                Ext.MessageBox.alert("MA", "Qty Can't be less then the Production Qty..");
                Validatechk="false";
          }
}




var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    id      : "btnSubmit",
    width   : 80,
    height  : 30,
    x       : 750,
    y       : 170,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    
           var gstadd="true";

alert(cmbsize.getValue());
alert(cmbsize.getRawValue());


            validatechkgrid();

            if (Validatechk === "true")
            {
                var cnt = 0;



                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

/*

                for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemcode === cmbItems.getValue() &&  sel[i].data.indentno  === cmbindno.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
*/
        	if(gridedit === "true")
	          {
			gridedit = "false";
                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('varname'  , cmbVariety.getRawValue());
			sel[idx].set('varcode'  , cmbVariety.getValue());
			sel[idx].set('gsm'      , txtgsm.getValue());
			sel[idx].set('size'     , cmbsize.getRawValue());
			sel[idx].set('itemcode' , cmbsize.getValue());
			sel[idx].set('qty'      , txtQty.getValue());
			sel[idx].set('reamwt'   , txtReamWt.getValue());
			sel[idx].set('reams'    , txtNoReams.getValue());
			sel[idx].set('sheets'   , txtNoSheets.getValue());
			sel[idx].set('customer' , cmbCustomer.getRawValue());
			sel[idx].set('custcode' , cmbCustomer.getValue());
			sel[idx].set('priority' , txtPriority.getValue());
			sel[idx].set('ordno'    , cmbOrderType.getRawValue());
 			sel[idx].set('type'     , ordtype);
			sel[idx].set('despdate' , dptdesp.getValue());
                        sel[idx].set('finished' , txtRecdQty.getValue());
			sel[idx].set('close'    , 'N');

			flxDetail.getSelectionModel().clearSelections();

		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item For Same Department For Same Indent already Entered.");
                } else
                    {
                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                                sno      :RowCnt,
				varname  : cmbVariety.getRawValue(),
				varcode  : cmbVariety.getValue(),
				gsm      : txtgsm.getValue(),
				size     : cmbsize.getRawValue(),
				itemcode : cmbsize.getValue(),
				qty      : txtQty.getValue(),
				reamwt   : txtReamWt.getValue(),
				reams    : txtNoReams.getValue(),
				sheets   : txtNoSheets.getValue(),
				customer : cmbCustomer.getRawValue(),
				custcode : cmbCustomer.getValue(),
				priority : txtPriority.getValue(),
				ordno    : cmbOrderType.getRawValue(),
	 			type     : ordtype,
                                finished : txtRecdQty.getValue(),
				despdate : Ext.util.Format.date(dptdesp.getValue(),"Y-m-d"),
				close    : 'N',
                        }) 
                        );

                            txtQty.setValue('');
                            txtRecdQty.setValue('');
                            txtPriority.setValue('');
                            txtReamWt.setValue('');
		            txtNoReams.setValue('');
		            txtNoSheets.setValue('');
                            grid_tot();

//                            alert(varcodelist);


                loadmavarietystore.removeAll();
                loadmavarietystore.load({
                    url: 'ClsTrnSalesMAAmend.php', // File to connect to
                    params:
                            {
                                task: "loadmavariety",
                                varcodes:varcodelist
                             },
                     callback: function () 
                     {

                     }    

                }); 


                }

                
            } 



         }
    }
});


var btnSubmit2 = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    id      : "btnSubmit2",
    width   : 80,
    height  : 30,
    x       : 750,
    y       : 170,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   


            var gstadd="true";
            var decklesum = "";
            var decklesize = "";


            if (Number(txtdeckqty.getValue())===0){
                Ext.MessageBox.alert("MA ", "Quantity is empty..");
                gstadd="false";
            }


            if (cmbCuttingVariety.getValue() ==0 && cmbCuttingVariety.getRawValue() == '' ){
                alert("MA", "Select Cutting Varity..");
                cmbtype.focus();
                gstadd="false";
            }

            if(gstadd=="true")
            {
                var cnt = 0;
                flxdeckle.getSelectionModel().selectAll();
                var selrows = flxdeckle.getSelectionModel().getCount();
                var sel = flxdeckle.getSelectionModel().getSelections();
/*

                for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemcode === cmbItems.getValue() &&  sel[i].data.indentno  === cmbindno.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
*/
        	if(gridedit === "true")
	        {

                    decklesum = Number(cmbdsize1.getRawValue())+Number(cmbdsize2.getRawValue())+Number(cmbdsize3.getRawValue())+Number(cmbdsize4.getRawValue())+Number(cmbdsize5.getRawValue())+Number(cmbdsize6.getRawValue())+Number(cmbdsize7.getRawValue())+Number(cmbdsize8.getRawValue())+Number(cmbdsize9.getRawValue())+Number(cmbdsize10.getRawValue())+Number(cmbdsize11.getRawValue())+Number(cmbdsize12.getRawValue())+Number(cmbdsize13.getRawValue())
                    decklesize =   cmbdsize1.getRawValue();
                    if (Number(cmbdsize2.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize2.getRawValue();}
                    if (Number(cmbdsize3.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize3.getRawValue();}
                    if (Number(cmbdsize4.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize4.getRawValue();}
                    if (Number(cmbdsize5.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize5.getRawValue();}
                    if (Number(cmbdsize6.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize6.getRawValue();}
                    if (Number(cmbdsize7.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize7.getRawValue();}
                    if (Number(cmbdsize8.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize8.getRawValue();}
                    if (Number(cmbdsize9.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize9.getRawValue();}
                    if (Number(cmbdsize10.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize10.getRawValue();}
                    if (Number(cmbdsize11.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize11.getRawValue();}
                    if (Number(cmbdsize12.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize12.getRawValue();}
                    if (Number(cmbdsize13.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize13.getRawValue();}
                    if (Number(cmbdsize14.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize14.getRawValue();}

			gridedit = "false";
                       	var idx = flxdeckle.getStore().indexOf(editrow);
			sel[idx].set('varname' , cmbCuttingVariety.getRawValue());
			sel[idx].set('varcode' , cmbCuttingVariety.getValue());
			sel[idx].set('gsm'     , txtgsm2.getValue());
			sel[idx].set('decksize', decklesize);
			sel[idx].set('deckle'  ,  decklesum);
			sel[idx].set('qty'     , txtdeckqty.getValue());
			sel[idx].set('size1'   , cmbdsize1.getRawValue());
			sel[idx].set('size2'   , cmbdsize2.getRawValue());
			sel[idx].set('size3'   , cmbdsize3.getRawValue());
			sel[idx].set('size4'   , cmbdsize4.getRawValue());
			sel[idx].set('size5'   , cmbdsize5.getRawValue());
			sel[idx].set('size6'   , cmbdsize6.getRawValue());
			sel[idx].set('size7'   , cmbdsize7.getRawValue());
 			sel[idx].set('size8'   , cmbdsize8.getRawValue());
			sel[idx].set('size9'   , cmbdsize9.getRawValue());
			sel[idx].set('size10'  , cmbdsize10.getRawValue());
			sel[idx].set('size11'  , cmbdsize11.getRawValue());
			sel[idx].set('size12'  , cmbdsize12.getRawValue());
			sel[idx].set('size13'  , cmbdsize13.getRawValue());
			sel[idx].set('size14'  , cmbdsize14.getRawValue());

                       refreshdeckle();   
			flxdeckle.getSelectionModel().clearSelections();

		}//if(gridedit === "true")


                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item For Same Department For Same Indent already Entered.");
                } else
                {
                    var RowCnt = flxdeckle.getStore().getCount() + 1;

                    decklesum = Number(cmbdsize1.getRawValue())+Number(cmbdsize2.getRawValue())+Number(cmbdsize3.getRawValue())+Number(cmbdsize4.getRawValue())+Number(cmbdsize5.getRawValue())+Number(cmbdsize6.getRawValue())+Number(cmbdsize7.getRawValue())+Number(cmbdsize8.getRawValue())+Number(cmbdsize9.getRawValue())+Number(cmbdsize10.getRawValue())+Number(cmbdsize11.getRawValue())+Number(cmbdsize12.getRawValue())+Number(cmbdsize13.getRawValue())
                    decklesize =   cmbdsize1.getRawValue();

                    if (Number(cmbdsize2.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize2.getRawValue();}
                    if (Number(cmbdsize3.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize3.getRawValue();}
                    if (Number(cmbdsize4.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize4.getRawValue();}
                    if (Number(cmbdsize5.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize5.getRawValue();}
                    if (Number(cmbdsize6.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize6.getRawValue();}
                    if (Number(cmbdsize7.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize7.getRawValue();}
                    if (Number(cmbdsize8.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize8.getRawValue();}
                    if (Number(cmbdsize9.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize9.getRawValue();}
                    if (Number(cmbdsize10.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize10.getRawValue();}
                    if (Number(cmbdsize11.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize11.getRawValue();}
                    if (Number(cmbdsize12.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize12.getRawValue();}
                    if (Number(cmbdsize13.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize13.getRawValue();}
                    if (Number(cmbdsize14.getRawValue()) > 0) {decklesize = decklesize + " + " + cmbdsize14.getRawValue();}

                       
                    flxdeckle.getStore().insert(
                        flxdeckle.getStore().getCount(),
                        new dgrecord({
                                sno      :RowCnt,
				varname  : cmbCuttingVariety.getRawValue(),
				varcode  : cmbCuttingVariety.getValue(),
				gsm      : txtgsm2.getValue(),
				decksize : decklesize,
				deckle   : decklesum,
				qty      : txtdeckqty.getValue(),
				size1    : cmbdsize1.getRawValue(),
				size2    : cmbdsize2.getRawValue(),
				size3    : cmbdsize3.getRawValue(),
				size4    : cmbdsize4.getRawValue(),
				size5    : cmbdsize5.getRawValue(),
				size6    : cmbdsize6.getRawValue(),
				size7    : cmbdsize7.getRawValue(),
	 			size8    : cmbdsize8.getRawValue(),
				size9    : cmbdsize9.getRawValue(),
				size10   : cmbdsize10.getRawValue(),
				size11   : cmbdsize11.getRawValue(),
				size12   : cmbdsize12.getRawValue(),
				size13   : cmbdsize13.getRawValue(),
				size14   : cmbdsize14.getRawValue(),

                        }) 
                        );
                        refreshdeckle();
                }
                       
                     refreshdeckle();
            } 
         }
    }
});

function refreshdeckle()
{
//      gstFlag = "Add"

      grid_tot();
      txtdeckqty.setValue('');
      cmbsize1.setValue('');
      cmbsize2.setValue('');
      cmbsize3.setValue('');

      cmbdsize1.setValue('');
      cmbdsize2.setValue('');
      cmbdsize3.setValue('');
      cmbdsize4.setValue('');
      cmbdsize5.setValue('');
      cmbdsize6.setValue('');
      cmbdsize7.setValue('');
      cmbdsize8.setValue('');
      cmbdsize9.setValue('');
      cmbdsize10.setValue('');
      cmbdsize11.setValue('');
      cmbdsize12.setValue('');
      cmbdsize13.setValue('');
      cmbdsize14.setValue('');

      txtnoofreels1.setValue('');
      txtnoofreels2.setValue('');
      txtnoofreels3.setValue('');

      flexrefresh();
}


function flexrefresh()
{
       flxsize.getStore().removeAll();
       flxvariety.getStore().removeAll();
        var vname;    
        var vcode = 0;
        var deck = 0;
        var totqty = 0;
        var size1 = 0;

        flxdeckle.getSelectionModel().selectAll();
        var selrows1 = flxdeckle.getSelectionModel().getCount();
        var sel1 = flxdeckle.getSelectionModel().getSelections();
        for (var i=0;i<selrows1;i++){
            vname  = sel1[i].data.varname;
            vcode  = sel1[i].data.varcode;
            deck   = sel1[i].data.deckle;
            totqty = sel1[i].data.qty;
            size1  = Number(sel1[i].data.qty);
	    var qty1 = 0;
	    var qty2 = 0;
	    var qty3 = 0;
	    var qty4 = 0;
	    var qty5 = 0;
	    var qty6 = 0;
	    var qty7 = 0;
	    var qty8 = 0;
	    var qty9 = 0;
	    var qty10 = 0;
	    var qty11 = 0;
	    var qty12 = 0;
	    var qty13 = 0;
	    var qty14 = 0;

            size1 = Number(sel1[i].data.size1);
            size2 = Number(sel1[i].data.size2);
            size3 = Number(sel1[i].data.size3);
            size4 = Number(sel1[i].data.size4);
            size5 = Number(sel1[i].data.size5);
            size6 = Number(sel1[i].data.size6);
            size7 = Number(sel1[i].data.size7);
            size8 = Number(sel1[i].data.size8);
            size9 = Number(sel1[i].data.size9);
            size10 = Number(sel1[i].data.size10);
            size11 = Number(sel1[i].data.size11);
            size12 = Number(sel1[i].data.size12);
            size13 = Number(sel1[i].data.size13);
            size14 = Number(sel1[i].data.size14);

            if (Number(sel1[i].data.size1) > 0 && deck > 0) {
                 qty1 = Number(sel1[i].data.size1) / deck * totqty;
                flexaddition(vname,vcode,size1,qty1);
            }
            if (Number(sel1[i].data.size2) > 0 && deck > 0) {
                 qty2 = Number(sel1[i].data.size2) / deck * totqty;
                 flexaddition(vname,vcode,size2,qty2);
            }
            if (Number(sel1[i].data.size3) > 0 && deck > 0) {
                 qty3 = Number(sel1[i].data.size3) / deck * totqty;
                 flexaddition(vname,vcode,size3,qty3);
            }
            if (Number(sel1[i].data.size4) > 0 && deck > 0) {
                 qty4 = Number(sel1[i].data.size4) / deck * totqty;
                 flexaddition(vname,vcode,size4,qty4);
            }
            if (Number(sel1[i].data.size5) > 0 && deck > 0) {
                 qty5 = Number(sel1[i].data.size5) / deck * totqty;
                 flexaddition(vname,vcode,size5,qty5);
            }
            if (Number(sel1[i].data.size6) > 0 && deck > 0) {
                 qty6 = Number(sel1[i].data.size6) / deck * totqty;
                 flexaddition(vname,vcode,size6,qty6);
            }
            if (Number(sel1[i].data.size7) > 0 && deck > 0) {
                 qty7 = Number(sel1[i].data.size7) / deck * totqty;
                 flexaddition(vname,vcode,size7,qty7);
            }
            if (Number(sel1[i].data.size8) > 0 && deck > 0) {
                 qty8 = Number(sel1[i].data.size8) / deck * totqty;
                 flexaddition(vname,vcode,size8,qty8);
            }
            if (Number(sel1[i].data.size9) > 0 && deck > 0) {
                 qty9 = Number(sel1[i].data.size9) / deck * totqty;
                 flexaddition(vname,vcode,size9,qty9);

            }
            if (Number(sel1[i].data.size10) > 0 && deck > 0) {
                 qty10 = Number(sel1[i].data.size10) / deck * totqty;
                 flexaddition(vname,vcode,size10,qty10);
            }
            if (Number(sel1[i].data.size11) > 0 && deck > 0) {
                 qty11 = Number(sel1[i].data.size11) / deck * totqty;
                 flexaddition(vname,vcode,size11,qty11);
  
            }
            if (Number(sel1[i].data.size12) > 0 && deck > 0) {
                 qty12 = Number(sel1[i].data.size12) / deck * totqty;
                 flexaddition(vname,vcode,size12,qty12);

            }
            if (Number(sel1[i].data.size13) > 0 && deck > 0) {
                 qty13 = Number(sel1[i].data.size13) / deck * totqty;
                 flexaddition(vname,vcode,size13,qty13);
            }
            if (Number(sel1[i].data.size14) > 0 && deck > 0) {
                 qty14 = Number(sel1[i].data.size14) / deck * totqty;
                 flexaddition(vname,vcode,size14,qty14);
            }












/*
//Size1
            var k =0;
            var q =0;
            flxsize.getSelectionModel().selectAll();
            var selrows = flxsize.getSelectionModel().getCount();
            var sel = flxsize.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode && Number(sel[j].data.size) ==  size1)
                {
                    q = qty1 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0) {
                    var RowCnt1 = flxsize.getStore().getCount() + 1;
                    flxsize.getStore().insert(
                        flxsize.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				size     : size1,
				qty      : qty1,
                        }) 
                        );
            } 

            k =0;
            q =0;
            flxvariety.getSelectionModel().selectAll();
            var selrows = flxvariety.getSelectionModel().getCount();
            var sel = flxvariety.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode )
                {
                    q =  qty1 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && qty1 >0) {
                    var RowCnt1 = flxvariety.getStore().getCount() + 1;
                    flxvariety.getStore().insert(
                        flxvariety.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				qty      : qty1,
                        }) 
                        );
            } 


//Size2
            k =0;
            q =0;
            flxsize.getSelectionModel().selectAll();
            selrows = flxsize.getSelectionModel().getCount();
            sel = flxsize.getSelectionModel().getSelections();
            for (j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode && Number(sel[j].data.size) ==  size2)
                {
                    q = qty2 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0) {
                    var RowCnt1 = flxsize.getStore().getCount() + 1;
                    flxsize.getStore().insert(
                        flxsize.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				size     : size2,
				qty      : qty2,
                        }) 
                        );
            } 
            k =0;
            q =0
            flxvariety.getSelectionModel().selectAll();
            var selrows = flxvariety.getSelectionModel().getCount();
            var sel = flxvariety.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode )
                {
                    q =  qty2 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0) {
                    var RowCnt1 = flxvariety.getStore().getCount() + 1;
                    flxvariety.getStore().insert(
                        flxvariety.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				qty      : qty2,
                        }) 
                           );
            } 
                

//Size3
            k =0;
            q =0; 
            flxsize.getSelectionModel().selectAll();
            selrows = flxsize.getSelectionModel().getCount();
            sel = flxsize.getSelectionModel().getSelections();
            for (j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode && Number(sel[j].data.size) ==  size3)
                {
                    q =  qty3 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && qty3 > 0) {
                    var RowCnt1 = flxsize.getStore().getCount() + 1;
                    flxsize.getStore().insert(
                        flxsize.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				size     : size3,
				qty      : qty3,
                        }) 
                        );
            } 


            k =0;
            q =0;
            flxvariety.getSelectionModel().selectAll();
            var selrows = flxvariety.getSelectionModel().getCount();
            var sel = flxvariety.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode )
                {
                    q = qty3 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && qty3 > 0) {
                    var RowCnt1 = flxvariety.getStore().getCount() + 1;
                    flxvariety.getStore().insert(
                        flxvariety.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				qty      : qty3,
                        }) 
                        
                   );
            } 

//Size4
            k =0;
            q =0; 
            flxsize.getSelectionModel().selectAll();
            selrows = flxsize.getSelectionModel().getCount();
            sel = flxsize.getSelectionModel().getSelections();
            for (j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode && Number(sel[j].data.size) ==  size4)
                {
                    q = qty4 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && qty4 > 0) {
                    var RowCnt1 = flxsize.getStore().getCount() + 1;
                    flxsize.getStore().insert(
                        flxsize.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				size     : size4,
				qty      : qty4,
                        }) 
                        );
            } 
            k =0;
            q =0; 
            flxvariety.getSelectionModel().selectAll();
            var selrows = flxvariety.getSelectionModel().getCount();
            var sel = flxvariety.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == vcode )
                {
                    q = qty4 + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && qty4 > 0) {
                    var RowCnt1 = flxvariety.getStore().getCount() + 1;
                    flxvariety.getStore().insert(
                        flxvariety.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : vname,
				varcode  : vcode,
				qty      : qty4,
                        }) 
                        
                   );
            } 
*/

///
//DATA UPDATED IN THE VARIETY FLEX



      }


}

function flexaddition(gvname,gvcode,gsize,gqty) {

//alert(gvname);
//alert(gvcode);
//alert(gsize);
//alert(gqty);


//Size4
            k =0;
            q =0; 
            flxsize.getSelectionModel().selectAll();
            selrows = flxsize.getSelectionModel().getCount();
            sel = flxsize.getSelectionModel().getSelections();
            for (j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == gvcode && Number(sel[j].data.size) ==  gsize)
                {
                    q = gqty + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && gqty > 0) {
                    var RowCnt1 = flxsize.getStore().getCount() + 1;
                    flxsize.getStore().insert(
                        flxsize.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : gvname,
				varcode  : gvcode,
				size     : gsize,
				qty      : gqty,
                        }) 
                        );
            } 

//alert("Variety Addition");
            k =0;
            q =0; 
            flxvariety.getSelectionModel().selectAll();
            var selrows = flxvariety.getSelectionModel().getCount();
            var sel = flxvariety.getSelectionModel().getSelections();
            for (var j=0;j<selrows;j++){
                if (Number(sel[j].data.varcode) == gvcode )
                {
                    q = gqty + Number(sel[j].data.qty);
                    sel[j].set('qty', q);
                    k =1;
                }
            }  
            if (k==0 && gqty > 0) {
                    var RowCnt1 = flxvariety.getStore().getCount() + 1;
                    flxvariety.getStore().insert(
                        flxvariety.getStore().getCount(),
                        new dgrecord({
                                sno      : RowCnt1,
				varname  : gvname,
				varcode  : gvcode,
				qty      : gqty,
                        }) 
                        
                   );
            } 


}

var btnSubmitSize = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 40,
    height  : 30,
    x       : 700,
    y       : 50,
    bodyStyle:{"background-color":"#ebebdf"},
   listeners:{
        click: function()
            {   
               cmbdsize1.setRawValue('');
               cmbdsize2.setRawValue('');
               cmbdsize3.setRawValue('');
               cmbdsize4.setRawValue('');
               cmbdsize5.setRawValue('');
               cmbdsize6.setRawValue('');
               cmbdsize7.setRawValue('');
               cmbdsize8.setRawValue('');
               cmbdsize9.setRawValue('');
               cmbdsize10.setRawValue('');
               cmbdsize11.setRawValue('');
               cmbdsize12.setRawValue('');
               cmbdsize13.setRawValue('');
               cmbdsize14.setRawValue('');
               var s1;
               no = txtnoofreels1.getValue();
               s1 = cmbsize1.getValue();
               for(var i=0;i<no;i++)                                      
               {
                  switch(i) {
                  case 0 : 
                      cmbdsize1.setRawValue(s1);
                      break; 
                  case 1 : 
                      cmbdsize2.setRawValue(s1);
                      break; 
                  case 2 : 
                      cmbdsize3.setRawValue(s1);
                      break; 
                  case 3 : 
                      cmbdsize4.setRawValue(s1);
                      break; 
                  case 4 : 
                      cmbdsize5.setRawValue(s1);
                      break; 
                  case 5 : 
                      cmbdsize6.setRawValue(s1);
                      break; 
                  case 6 : 
                      cmbdsize7.setRawValue(s1);
                      break; 
                  case 7 : 
                      cmbdsize8.setRawValue(s1);
                      break; 
                  case 8 : 
                      cmbdsize9.setRawValue(s1);
                      break; 
                  case 9 : 
                      cmbdsize10.setRawValue(s1);
                      break; 
                  case 10 : 
                      cmbdsize11.setRawValue(s1);
                      break; 
                  case 11 : 
                      cmbdsize12.setRawValue(s1);
                      break; 
                  case 12 : 
                      cmbdsize13.setRawValue(s1);
                      break; 
                  case 13 : 
                      cmbdsize14.setRawValue(s1);
                      break; 
                  }
               }  

//--loop2
               no2 = Number(txtnoofreels1.getValue())+Number(txtnoofreels2.getValue());
               s1 = cmbsize2.getValue();
               for(var i=no;i<no2;i++)                                      
               {
                  switch(i) {
                  case 0 : 
                      cmbdsize1.setRawValue(s1);
                      break; 
                  case 1 : 
                      cmbdsize2.setRawValue(s1);
                      break; 
                  case 2 : 
                      cmbdsize3.setRawValue(s1);
                      break; 
                  case 3 : 
                      cmbdsize4.setRawValue(s1);
                      break; 
                  case 4 : 
                      cmbdsize5.setRawValue(s1);
                      break; 
                  case 5 : 
                      cmbdsize6.setRawValue(s1);
                      break; 
                  case 6 : 
                      cmbdsize7.setRawValue(s1);
                      break; 
                  case 7 : 
                      cmbdsize8.setRawValue(s1);
                      break; 
                  case 8 : 
                      cmbdsize9.setRawValue(s1);
                      break; 
                  case 9 : 
                      cmbdsize10.setRawValue(s1);
                      break; 
                  case 10 : 
                      cmbdsize11.setRawValue(s1);
                      break; 
                  case 11 : 
                      cmbdsize12.setRawValue(s1);
                      break; 
                  case 12 : 
                      cmbdsize13.setRawValue(s1);
                      break; 
                  case 13 : 
                      cmbdsize14.setRawValue(s1);
                      break; 
                  }
               }  

//--loop3
               no3 = Number(txtnoofreels1.getValue())+Number(txtnoofreels2.getValue())+Number(txtnoofreels3.getValue());
               s1 = cmbsize3.getValue();
               for(var i=no2;i<no3;i++)                                      
               {
                  switch(i) {
                  case 0 : 
                      cmbdsize1.setRawValue(s1);
                      break; 
                  case 1 : 
                      cmbdsize2.setRawValue(s1);
                      break; 
                  case 2 : 
                      cmbdsize3.setRawValue(s1);
                      break; 
                  case 3 : 
                      cmbdsize4.setRawValue(s1);
                      break; 
                  case 4 : 
                      cmbdsize5.setRawValue(s1);
                      break; 
                  case 5 : 
                      cmbdsize6.setRawValue(s1);
                      break; 
                  case 6 : 
                      cmbdsize7.setRawValue(s1);
                      break; 
                  case 7 : 
                      cmbdsize8.setRawValue(s1);
                      break; 
                  case 8 : 
                      cmbdsize9.setRawValue(s1);
                      break; 
                  case 9 : 
                      cmbdsize10.setRawValue(s1);
                      break; 
                  case 10 : 
                      cmbdsize11.setRawValue(s1);
                      break; 
                  case 11 : 
                      cmbdsize12.setRawValue(s1);
                      break; 
                  case 12 : 
                      cmbdsize13.setRawValue(s1);
                      break; 
                  case 13 : 
                      cmbdsize14.setRawValue(s1);
                      break; 
                  }
               }  
                                          
            }



        }
});



var tabSalesMA = new Ext.TabPanel({
    id          : 'Sales Manufacturing Advice',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 410,
    width       : 890,	
    x           : 10,
    y           : 0,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'ORDER DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                             opttype ,
 
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 80,
                    		       width       : 550,
	                               x           : 0,
          		               y           : 60,
                        	       border      : false,
		                       items: [cmbVariety]
 		                   },
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 80,
                    		       width       : 550,
	                               x           : 700,
          		               y           : 60,
                        	       border      : false,
		                       items: [txtgsm]
 		                   },

                                   { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       :	 550,
                                       x           : 0,
                                       y           : 90,
                                       border      : false,
                                       items: [cmbCustomer]
                                    },

                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 550,
                                       x           : 0,
                                       y           : 120,
                                       border      : false,
                                       items: [cmbOrderType]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 300,
                                       x           : 0,
                                       y           : 170,
                                       border      : false,
                                       items: [cmbsize]
                                    },

  	           				     
	           	            { 
			               xtype       : 'label',
			               text        : 'Priority',
			               labelWidth  : 100,
			               width       : 90,
			               x           : 315,
			               y           : 160,
                                       border      : false
    				    },
	           	            { 
			               xtype       : 'label',
			               text        : 'Qty(T)',
			               labelWidth  : 100,
			               width       : 90,
			               x           : 390,
			               y           : 160,
                                       border      : false
    				    },
	           	            { 
			               xtype       : 'label',
			               text        : 'Recd Qty',
			               labelWidth  : 100,
			               width       : 100,
			               x           : 475,
			               y           : 160,
                                       border      : false
    				    },
	           	            { 
			               xtype       : 'label',
			               text        : 'Desp.Date',
			               labelWidth  : 100,
			               width       : 100,
			               x           : 590,
			               y           : 160,
                                       border      : false
    				    },


                                    { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 1,
                                           width       : 80,
                                           x           : 300,
                                           y           : 170,
                                           border      : false,
                                           items: [txtPriority]
                                    },
               			        
                                    { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 1,
                                           width       : 200,
                                           x           : 370,
                                           y           : 170,
                                           border      : false,
                                           items: [txtQty]
                                    },
                                    { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 1,
                                           width       : 200,
                                           x           : 450,
                                           y           : 170,
                                           border      : false,
                                           items: [txtRecdQty]
                                    },
      		                    { 
	                                   xtype       : 'fieldset',
           		                   title       : '',
		                           labelWidth  : 1,
                		           width       : 300,
		                           x           : 550,
                		           y           : 170,
		                           border      : false,
                		           items: [dptdesp]
   		                   },    btnSubmit,
// RIGHT PANEL START

                             {
                                  xtype       : 'fieldset',
                                  title       : 'BUNDLE DETAILS',
                                  width       : 200,
                                  height      : 100,
                                  x           : 500,
                                  y           : 60,
                                  border      : true,
                                  layout      : 'absolute',
                                  items:[
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 80,
                                           width       : 160,
                                           x           : 0,
                                           y           : -10,
                                           border      : false,
                                           items: [txtNoSheets]
                                        },
               			        
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 80,
                                           width       : 160,
                                           x           : 0,
                                           y           : 12,
                                           border      : false,
                                           items: [txtReamWt]
                                        },
                                        { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 80,
                                           width       : 160,
                                           x           : 0,
                                           y           : 31,
                                           border      : false,
                                           items: [txtNoReams]
                                        },


                                        ]
                             },flxDetail ,
                             { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 110,
                                           width       : 250,
                                           x           : 600,
                                           y           : 340,
                                           border      : false,
                                           items: [txttotqty1]
    	                        },

        			        
                     ]
         },

           {
                     xtype: 'panel',
                     title: 'DECKLE - CUTTING SIZES',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 60,
                    		       width       : 550,
	                               x           : 0,
          		               y           : 10,
                        	       border      : false,
		                       items: [cmbCuttingVariety]
 		                   },
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 60,
                    		       width       : 550,
	                               x           : 900,
          		               y           : 10,
                        	       border      : false,
		                       items: [txtgsm2]
 		                   },


                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 100,
                    		       width       : 550,
	                               x           : 450,
          		               y           : 10,
                        	       border      : false,
		                       items: [cmbdeckle]
 		                   },
                                   { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 60,
                                       width       : 200,
                                       x           : 0,
                                       y           : 50,
                                       border      : false,
                                       items: [cmbsize1]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 40,
                                       width       : 150,
                                       x           : 150,
                                       y           : 50,
                                       border      : false,
                                       items: [txtnoofreels1]
                                    },

                                   { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 40,
                                       width       : 200,
                                       x           : 250,
                                       y           : 50,
                                       border      : false,
                                       items: [cmbsize2]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 40,
                                       width       : 150,
                                       x           : 370,
                                       y           : 50,
                                       border      : false,
                                       items: [txtnoofreels2]
                                    },

                                   { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 40,
                                       width       : 200,
                                       x           : 460,
                                       y           : 50,
                                       border      : false,
                                       items: [cmbsize3]
                                    },

                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 40,
                                       width       : 150,
                                       x           : 580,
                                       y           : 50,
                                       border      : false,
                                       items: [txtnoofreels3]
                                    },  btnSubmitSize,

                                   {
                                  xtype       : 'fieldset',
                                  title       : 'DECKLE SIZES',
                                  width       : 860,
                                  height      : 100,
                                  x           : 10,
                                  y           : 90,
                                  border      : true,
                                  layout      : 'absolute',

                                  items:[
               			        
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 60,
                                             width       : 170,
                                             x           : -70,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize1]
                                         },

	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 66,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 67,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize2]
                                         },

	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 155,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 160,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize3]
                                         },


	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 250		,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 255,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize4]
                                         },





	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 350,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 350,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize5]
                                         },



	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 440,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 445,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize6]
                                         },


	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 540,
                                             style       : 'font-size:20px;',
			                     y           : 10,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 550,
                                             y           : 0,
                                             border      : false,
                                             items: [cmbdsize7]
                                         },



                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 60,
                                             width       : 170,
                                             x           : -70,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize8]
                                         },


	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 66,
                                             style       : 'font-size:20px;',
			                     y           : 43,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 67,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize9]
                                         },

	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 155,
                                             style       : 'font-size:20px;',
			                     y           : 43,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 160,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize10]
                                         },


	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 250		,
                                             style       : 'font-size:20px;',
			                     y           : 43,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 255,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize11]
                                         },





	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 350,
                                             style       : 'font-size:20px;',
			                     y           : 43,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 350,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize12]
                                         },



	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 440,
                                             style       : 'font-size:20px;',
			                     y           : 43,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 445,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize13]
                                         },


	           	                { 
			                     xtype       : 'label',
                                             text        : '+',
			                     labelWidth  : 10,
                                             width       : 60,
 			                     x           : 540,
                                             style       : 'font-size:20px;',
			                     y           : 40,
                                             border      : false
    	                                },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 550,
                                             y           : 33,
                                             border      : false,
                                             items: [cmbdsize14]
                                         },


                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 60,
                                             width       : 170,
                                             x           : 660,
                                             y           : 10,
                                             border      : false,
                                             items: [lblqty]
                                         },


                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 640,
                                             y           : 33,
                                             border      : false,
                                             items: [txtdeckqty]
                                         },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 10,
                                             width       : 170,
                                             x           : 720,
                                             y           : 20,
                                             border      : false,
                                             items: [btnSubmit2]
                                         },

                                        ]
                                  }  ,flxdeckle,
					
                             { 
                                           xtype       : 'fieldset',
                                           title       : '',
                                           labelWidth  : 110,
                                           width       : 250,
                                           x           : 600,
                                           y           : 340,
                                           border      : false,
                                           items: [txttotqty2]
    	                        },

                                      
                                ]


                         }  ,


                 {
                     xtype: 'panel',
                     title: 'REMARKS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 5,
                                       border      : false,
                                       items: [txtremarks1]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 30,
                                       border      : false,
                                       items: [txtremarks2]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 55,
                                       border      : false,
                                       items: [txtremarks3]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 80,
                                       border      : false,
                                       items: [txtremarks4]
                                    },

                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 105,
                                       border      : false,
                                       items: [txtremarks5]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 130,
                                       border      : false,
                                       items: [txtremarks6]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 155,
                                       border      : false,
                                       items: [txtremarks7]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 180,
                                       border      : false,
                                       items: [txtremarks8]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 205,
                                       border      : false,
                                       items: [txtremarks9]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 700,
                                       x           : 10,
                                       y           : 230,
                                       border      : false,
                                       items: [txtremarks10]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 200,
                                       width       : 400,
                                       x           : 10,
                                       y           : 280,
                                       border      : true,
                                       items: [txttolerance]
                                    },



                     ]
                 }


      ],


});



var TrnSalesMAPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'MANUFACTURING ADVICE ENTRY',
    header      : false,
    width       : 600,
    height      : 190,
   bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesMAPanel',
    method      : 'POST',
    layout      : 'absolute',
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
                    gstFlag = "Add";
                }
            }
        },'-',
        {
//EDIT
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//alert(GinFinid);
//alert(Gincompcode);
                    gstFlag = "Edit";
//                    Ext.getCmp('cmbMANo').show();

                   	loadmanoliststore.load({
			url: 'ClsTrnSalesMAAmend.php',
			params: {
			    task: 'loadmanolist',
			    finid: GinFinid,
			    compcode:Gincompcode,
		            machine:mamachine,
            
		        }


                    });     



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
                click:function()
                {
                    var gstSave;
                    gstSave="true";

                    if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('MA','Grid should not be empty..');
        	                gstSave="false";
	
                           }
                    if (flxdeckle.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('MA','Grid should not be empty..');
        	                gstSave="false";
	
                           }
                    

                    if (txttotqty1.getRawValue()==0)
                    {
                        Ext.Msg.alert('MA','Size qty is empty.....');
                        gstSave="false";
                    }
                    else if (txttotqty2.getRawValue()==0 )
                    {
                        Ext.Msg.alert('MA','Deckle Total qty is empty..');
                        gstSave="false";
                    }
                    else if (txttolerance.getRawValue()==0 )
                    {
                        alert('MA','Deckle Total qty is empty..');
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

                           
                            var maData = flxDetail.getStore().getRange();                                        
                            var maupdData = new Array();
                            Ext.each(maData, function (record) {
                                maupdData.push(record.data);
                            });

                            var deckData = flxdeckle.getStore().getRange();                                        
                            var deckupdData = new Array();
                            Ext.each(deckData, function (record) {
                                deckupdData.push(record.data);
                            });

                            var sizeData = flxsize.getStore().getRange();                                        
                            var sizeupdData = new Array();
                            Ext.each(sizeData, function (record) {
                                sizeupdData.push(record.data);
                            });


                            var vartyData = flxvariety.getStore().getRange();                                        
                            var vartyupdData = new Array();
                            Ext.each(vartyData, function (record) {
                                vartyupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnSalesMAAmendSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(maupdData),                                      
				deckgriddet : Ext.util.JSON.encode(deckupdData),                                                
				sizegriddet : Ext.util.JSON.encode(sizeupdData),                                                
				vartygriddet : Ext.util.JSON.encode(vartyupdData),                                                

                               	savetype    : gstFlag,
                        	cnt         : maData.length,
				deckcnt     : deckData.length,
				sizecnt     : sizeData.length,
				vartycnt    : vartyData.length,

				macompcode  : Gincompcode,
				mafincode   : GinFinid,
				maamendno   : txtAmendno.getRawValue(), 
				maamenddate : Ext.util.Format.date(dptMANo.getValue(),"Y-m-d"),
				maadvno     : txtMANo.getRawValue(),
				maadvdate   : Ext.util.Format.date(new Date(),"Y-m-d"),
 				mamachine   : mamachine,
                                tol         : txttolerance.getRawValue(),    
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);

                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Manufacturing Advice No -" + obj['msg']);
                                    TrnSalesMAPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();

                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("MA Entry Not Completed! Pls Check!- " + obj['msg']);                                                  
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
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
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
                    TrnSalesMAWindow.hide();
                }
            }
        }]
    },

     items: [
               {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 700,
                    height      : 60,
                    x           : 100,
                    y           : 10,
                    border      : true,
                    layout      : 'absolute',
                    items:[
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 400,
                                  x           : 0,
                                  y           : 0,
                                  border      : false,
                                  items: [txtMANo]
                               },

                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 400,
                                  x           : 0,
                                  y           : 0,
                                  border      : false,
                                  items: [cmbMANo]
                               },

  			       { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 50,
                		       width       : 400,
		                       x           : 230,
                		       y           : 0,
		                       border      : false,
                		       items: [dptMANo]
   		               },
   
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 100,
                                  width       : 400,
                                  x           : 450,
                                  y           : 0,
                                  border      : false,
                                  items: [txtAmendno]
                               },
                         ] , 
                 },

                            { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 400,
                                  x           : 700,
                                  y           : 20,
                                  border      : false,
                                  items: [txtmill]
                               },



                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 930,
                    height      : 440,
                    x           : 10,
                    y           : 75,
                    border      : true,
                    layout      : 'absolute',
                    items:[tabSalesMA], 

                 },

                               {
					    xtype       : 'fieldset',
					    title       : 'ABSTRACT',
					    width       : 330,
					    height      : 445,
					    x           : 950,
					    y           : 70,
					    border      : true,
					    layout      : 'absolute',
					    items:[ flxsize,flxvariety], 

					 },
            ],
	          
});


    

   function RefreshData(){

                        TrnSalesMAPanel.getForm().reset();
//                        Ext.getCmp('cmbMANo').hide();
                        flxDetail.getStore().removeAll();
                        flxdeckle.getStore().removeAll();
                        flxsize.getStore().removeAll();
                        flxvariety.getStore().removeAll();

                        txtremarks1.setValue('GSM & BRIGHTNESS SHOULD BE MAINTAINED STRICTLY');
                        txtremarks2.setValue('TO PACK WITH BROWN WRAPPER AND HDPE PACKING');
                        txtremarks3.setValue('TAKE CARE OF SHEET CUTTING CROSS CUT,FILLING');
                        txtremarks4.setValue('GSM SHOULD BE MINUS SIDE TO AVOID EXCESS WEIGHT LOADING');
                        txtremarks5.setValue('PRODUCTION SHOULD BE AN EQUALENT TO THE GIVEN PROGRAMME TO AVOID EXCESS PRODN');
                        txttolerance.setValue(10);                     

                    gstFlag = "Edit";
//                    Ext.getCmp('cmbMANo').show();

                   	loadmanoliststore.load({
			url: 'ClsTrnSalesMAAmend.php',
			params: {
			    task: 'loadmanolist',
			    finid: GinFinid,
			    compcode:Gincompcode,
		            machine:mamachine,
            
		        }


                    });     

   };
   






 var TrnSalesMAWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 30,
        title       : 'SALES - MANUFACTURING ADVICE AMENDMENT',
        items       : TrnSalesMAPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false  ,


 	listeners:{
               show:function(){
RefreshData();
//alert(mamachine);
                        txtmill.setValue(mamachinename);


/*
			GetVarietyNameDatastore.removeAll();
			GetVarietyNameDatastore.load({
			 url: 'ClsTrnSalesMAAmend.php',
		                params: {
                	    	task: 'verietyname',
                		}
			  });
*/

                    }
        } 
    });
   TrnSalesMAWindow.show();  


});
