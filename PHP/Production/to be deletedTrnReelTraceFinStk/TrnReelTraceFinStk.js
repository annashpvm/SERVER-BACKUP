Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;

var qlycod=0;

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

var vsizecode = 0;
finid = GinFinid;
var loadReelNoDetailDatastore = new Ext.data.Store({
      id: 'loadReelNoDetailDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNODetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_wt','stk_ent_no', 'stk_ent_date','stk_destag','stk_slipno','stk_desdt','ordh_sono','ordh_sodate','cust_ref','pckh_invno','pckh_invdt','var_name'
      ]),
    });

var loadReelNoDetailDatastore2 = new Ext.data.Store({
      id: 'loadReelNoDetailDatastore2',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNODetail2"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_wt','stk_ent_no', 'stk_ent_date','stk_destag','stk_slipno','stk_desdt','ordh_sono','ordh_sodate','cust_ref','pckh_invno','pckh_invdt'
      ]),
    });

var loadReelNoDetailDatastore3 = new Ext.data.Store({
      id: 'loadReelNoDetailDatastore3',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNODetail3"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_wt','stk_ent_no', 'stk_ent_date','stk_destag','stk_slipno','stk_desdt','ordh_sono','ordh_sodate','cust_ref','dn_no'     ]),
    });


var LoadFinyearDataStore = new Ext.data.Store({
      id: 'LoadFinyearDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinyear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'fin_code', 'fin_year'
      ]),
    });

var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
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

var loadReelNoDatastore = new Ext.data.Store({
      id: 'loadReelNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNos"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_sr_no','stk_wt'
      ]),
    })


var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelTraceFinStk.php',      // File to connect to
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

var lbldetails = new Ext.form.Label({
	fieldLabel  : 'Details of REEL No',
	id          : 'lbldetails',
	name        : 'lbldetails',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:15px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var cmbFinyear = new Ext.form.ComboBox({
	fieldLabel      : 'Financial Year',
	width           : 100,
	displayField    : 'fin_year',
	valueField      : 'fin_code',
	hiddenName      : 'fin_year',
	id              : 'cmbFinyear',
	typeAhead       : true,
	mode            : 'local',
	forceSelection  : false,
	triggerAction   : 'all',
	selectOnFocus   : false,
	editable        : true,
	allowblank      : false,
   	labelStyle 	: "font-size:12px;font-weight:bold;",
    	style      	: "border-radius:5px;",
	store           : LoadFinyearDataStore,
	listeners: {
	select: function () {
		finid      = Ext.getCmp('cmbFinyear').getValue();
		gstFinyear = Ext.getCmp('cmbFinyear').getRawValue();
		finstdate  = gstFinyear.substr(0,4) + '-04-01';
		fineddate  = gstFinyear.substr(5,4) + '-03-31';
 
	}   
	}
});

var criteria = "2";
var optcriteria = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Criteria',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:50,
    x:230,
    y: 0,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid skyblue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optcriteria',
        items: [
            {boxLabel: 'All Items', name: 'optcriteria', id:'optcriteriaall', inputValue: '1',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		criteria = "1";
            
               }
              }
             }
            },
            {boxLabel: 'Stocked Items', name: 'optcriteria', id:'optcriteriastk', inputValue: '2',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		criteria = "2";
            
               }
              }
             }},
        ]
    }
    ]
});   

var txtVarty = new Ext.form.TextField({
        fieldLabel  : 'Variety',
        id          : 'txtVarty',
        name        : 'txtVarty',
        width       : 250,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

    	listeners : {
            keyup: function () {
                 flxVarietyDetails.getStore().filter('var_desc', txtVarty.getValue());      
            }
        }         
});

var txtSize = new Ext.form.TextField({
        fieldLabel  : 'Size ',
        id          : 'txtSize',
        name        : 'txtSize',
        width       : 250,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1, 
    	listeners : {
            keyup: function () {
                 flxSizeDetails.getStore().filter('sizecode', txtSize.getValue());      
            }
        }          
});

var txtSizeDisplay = new Ext.form.TextField({
        fieldLabel  : 'Size ',
        id          : 'txtSizeDisplay',
        name        : 'txtSizeDisplay',
        width       : 150,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1, 
    	listeners : {
        }          
});

var txtNoofReels = new Ext.form.TextField({
        fieldLabel  : 'Nos',
        id          : 'txtNoofReels',
        name        : 'txtNoofReels',
        width       : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",
        readOnly   : true,     	
	tabindex : 1, 
    	listeners : {
        }          
});

var txtTotWt = new Ext.form.TextField({
        fieldLabel  : 'Tot Wt',
        id          : 'txtTotWt',
        name        : 'txtTotWt',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true, 
    	listeners : {
        }          
});


function grid_tot(){

        var wt = 0;
         txtTotWt.setRawValue('');
         txtNoofReels.setRawValue('');
        var Row= flxReelNo.getStore().getCount();
        flxReelNo.getSelectionModel().selectAll();
        var sel=flxReelNo.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.stk_wt);
         }

         txtTotWt.setRawValue(Ext.util.Format.number(wt,'0.0'));
         txtNoofReels.setRawValue(i); 
}



function TxtRefresh()
{
     txtReelNo.setValue('');
     txtReelNoDisplay.setValue('');
     txtSizeDisplay.setValue('');
     txtwt.setValue('');
     dtentdate.setRawValue('');
     txtcust.setRawValue('');
     txtslipno.setValue('');
     dtslipdate.setRawValue('');
     txtSONo.setValue('');
     dtSOdate.setRawValue('');
     txtinvno.setRawValue('');
     dtinvdate.setRawValue('');
}

var dgrecord = Ext.data.Record.create([]);
var flxVarietyDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 140,
        width: 250,
        x: 65,
        y: 80,        
        columns: [   
            {header: "", dataIndex: 'var_desc',sortable:true,width:160,align:'left'},                                               
            {header: "", dataIndex: 'var_groupcode',sortable:true,width:45,align:'left'},    
        ],
       store:loadVarietyDatastore,
        listeners: {
            cellclick: function (flxVarietyDetails, rowIndex, cellIndex, e) {
             var selected_rows = flxVarietyDetails.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                      txtVarty.setValue(selected_rows[i].data.var_desc);
                      qlycode =selected_rows[i].data.var_groupcode   
                     
		     
                }

                TxtRefresh();
                flxReelNo.getStore().removeAll();
                flxSizeDetails.getStore().removeAll();
                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnReelTraceFinStk.php',
		params: {
			    task: 'loadSizeofVariety',
                            varty : qlycode,
                        },
               	callback:function()
			{
                        }
                });


              }
            },

   });

var flxSizeDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 250,
        x: 65,
        y: 270,        
        columns: [   
            {header: "", dataIndex: 'sizecode',sortable:true,width:110,align:'left'},                                               
            {header: "", dataIndex: 'var_code',sortable:true,width:50,align:'left'},                                               

        ],
       store:loadSizeDatastore,
        listeners: {
            cellclick: function (flxSizeDetails, rowIndex, cellIndex, e) {
             var selected_rows = flxSizeDetails.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
 
                      vsizecode =selected_rows[i].data.var_code   
                     
		     
                }
                TxtRefresh();
                flxReelNo.getStore().removeAll();
                loadReelNoDatastore.removeAll();
     		loadReelNoDatastore.load({
     		url: 'ClsTrnReelTraceFinStk.php',
		params: {
			    task: 'loadReelNos',
                            size     :  vsizecode,
                            fincode  :  finid,
                            compcode :  Gincompcode, 
                            stkopt   :  criteria,

      
                        },
               	callback:function()
			{
                            grid_tot();
                        }
                });


              }
            },
   });

var lblreelno = new Ext.form.Label({
	fieldLabel  : 'Reel No',
	id          : 'lblreelno',
	name        : 'lblreelno',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblVarty = new Ext.form.Label({
	fieldLabel  : 'Variety',
	id          : 'lblVarty',
	name        : 'lblVarty',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblSize = new Ext.form.Label({
	fieldLabel  : 'Size',
	id          : 'lblSize',
	name        : 'lblSize',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtReelNo = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtReelNo',
        name        : 'txtReelNo',
        width       : 180,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
	listeners : {
            keyup: function () {
                 flxReelNo.getStore().filter('stk_sr_no', txtReelNo.getValue());      
            },
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                loadReelNoDetailDatastore.removeAll();
     		loadReelNoDetailDatastore.load({
     		url: 'ClsTrnReelTraceFinStk.php',
		params: {
			    task: 'loadReelNODetail',
                            reelno   : txtReelNo.getValue(),
                            compcode : Gincompcode, 
                            fincode  : finid,
                        },
               	callback:function()
		     {
                     var cnt=loadReelNoDetailDatastore.getCount(); 
                     if (cnt > 0)
		        {    
                             txtReelNoDisplay.setValue(txtReelNo.getValue());
                             txtSizeDisplay.setValue(loadReelNoDetailDatastore.getAt(0).get('var_name'));
		             txtwt.setValue(loadReelNoDetailDatastore.getAt(0).get('stk_wt'));
		             dtentdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore.getAt(0).get('stk_ent_date'),"d-m-Y"));
		             txtcust.setRawValue(loadReelNoDetailDatastore.getAt(0).get('cust_ref'));
		             txtSONo.setValue(loadReelNoDetailDatastore.getAt(0).get('ordh_sono'));
		             dtSOdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore.getAt(0).get('ordh_sodate'),"d-m-Y"));
                             if  (loadReelNoDetailDatastore.getAt(0).get('stk_destag') == 'D')
                             {
				loadReelNoDetailDatastore3.removeAll();

		     		loadReelNoDetailDatastore3.load({
		     		url: 'ClsTrnReelTraceFinStk.php',
				params: {
					    task: 'loadReelNODetail3',
				            reelno   : txtReelNo.getValue(),
				            compcode : Gincompcode, 
				            fincode  : finid,
				        },
			       	callback:function()
				     {
					     txtslipno.setValue('');
					     txtinvno.setRawValue('');
				     var cnt=loadReelNoDetailDatastore3.getCount(); 
				     if (cnt > 0)
				     {   
                           	             txtSONo.setValue('');
                      		             txtcust.setRawValue(loadReelNoDetailDatastore3.getAt(0).get('cust_ref')); 
					     txtslipno.setValue(loadReelNoDetailDatastore3.getAt(0).get('stk_slipno'));
					     dtslipdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore3.getAt(0).get('stk_desdt'),"d-m-Y"));
					     txtinvno.setRawValue('DN'+loadReelNoDetailDatastore3.getAt(0).get('dn_no'));
					     dtinvdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore3.getAt(0).get('stk_desdt'),"d-m-Y"));
				     }
				     } 
				});
                             }     
                             else
                             {
				loadReelNoDetailDatastore2.removeAll();

		     		loadReelNoDetailDatastore2.load({
		     		url: 'ClsTrnReelTraceFinStk.php',
				params: {
					    task: 'loadReelNODetail2',
				            reelno   : txtReelNo.getValue(),
				            compcode : Gincompcode, 
				            fincode  : finid,
				        },
			       	callback:function()
				     {
				     var cnt=loadReelNoDetailDatastore2.getCount(); 
					     txtslipno.setValue('');
					     txtinvno.setRawValue('');
				     if (cnt > 0)
				     {    
					     txtslipno.setValue(loadReelNoDetailDatastore2.getAt(0).get('stk_slipno'));
					     dtslipdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore2.getAt(0).get('stk_desdt'),"d-m-Y"));
					     txtinvno.setRawValue(loadReelNoDetailDatastore2.getAt(0).get('pckh_invno'));
					     dtinvdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore2.getAt(0).get('stk_desdt'),"d-m-Y"));
				     }
				     } 
				});
                             } 
		        }
                     else
 		             {    
		             txtwt.setValue(0);
                             txtSizeDisplay.setValue('');
		             dtentdate.setRawValue('');
		             txtcust.setRawValue('');
		             txtslipno.setValue('');
		             dtslipdate.setRawValue('');
		             txtSONo.setValue('');
		             dtSOdate.setRawValue('');
		             txtinvno.setRawValue('');
		             dtinvdate.setRawValue('');
                             alert("Reel Number Not found...");

		             }

                     }
                });
 }
 }

	}     
});

function get_ReelNo_Details()
{

             loadReelNoDetailDatastore.removeAll();
     		loadReelNoDetailDatastore.load({
     		url: 'ClsTrnReelTraceFinStk.php',
		params: {
			    task: 'loadReelNODetail',
                            reelno   : txtReelNo.getValue(),
                            compcode : Gincompcode, 
                            fincode  : finid,
                        },
               	callback:function()
		     {
                     var cnt=loadReelNoDetailDatastore.getCount(); 
                     if (cnt > 0)
		       {    
		             txtwt.setValue(loadReelNoDetailDatastore.getAt(0).get('stk_wt'));
                             txtSizeDisplay.setValue(loadReelNoDetailDatastore.getAt(0).get('var_name'));
		             dtentdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore.getAt(0).get('stk_ent_date'),"d-m-Y"));
		             txtcust.setRawValue(loadReelNoDetailDatastore.getAt(0).get('cust_ref'));
		             txtSONo.setValue(loadReelNoDetailDatastore.getAt(0).get('ordh_sono'));
		             dtSOdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore.getAt(0).get('ordh_sodate'),"d-m-Y"));
		             if  (loadReelNoDetailDatastore.getAt(0).get('stk_destag') == 'D')
                             {
				loadReelNoDetailDatastore3.removeAll();

		     		loadReelNoDetailDatastore3.load({
		     		url: 'ClsTrnReelTraceFinStk.php',
				params: {
					    task: 'loadReelNODetail3',
				            reelno   : txtReelNo.getValue(),
				            compcode : Gincompcode, 
				            fincode  : finid,
				        },
			       	callback:function()
				{
				     var cnt=loadReelNoDetailDatastore3.getCount(); 
				     if (cnt > 0)
				     {   
                           	             txtSONo.setValue('');
                      		             txtcust.setRawValue(loadReelNoDetailDatastore3.getAt(0).get('cust_ref')); 
					     txtslipno.setValue(loadReelNoDetailDatastore3.getAt(0).get('stk_slipno'));
					     dtslipdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore3.getAt(0).get('stk_desdt'),"d-m-Y"));
					     txtinvno.setRawValue('DN'+loadReelNoDetailDatastore3.getAt(0).get('dn_no'));
					     dtinvdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore2.getAt(0).get('stk_desdt'),"d-m-Y"));
				     }
				 } 
				 });
                             }     
                             else
                             {
				loadReelNoDetailDatastore2.removeAll();

		     		loadReelNoDetailDatastore2.load({
		     		url: 'ClsTrnReelTraceFinStk.php',
				params: {
					    task: 'loadReelNODetail2',
				            reelno   : txtReelNo.getValue(),
				            compcode : Gincompcode, 
				            fincode  : finid,
				        },
			       	callback:function()
				     {
				     var cnt=loadReelNoDetailDatastore2.getCount(); 
				     if (cnt > 0)
				     {    
					     txtslipno.setValue(loadReelNoDetailDatastore2.getAt(0).get('stk_slipno'));
					     dtslipdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore2.getAt(0).get('stk_desdt'),"d-m-Y"));
					     txtinvno.setRawValue(loadReelNoDetailDatastore2.getAt(0).get('pckh_invno'));
					     dtinvdate.setRawValue(Ext.util.Format.date(loadReelNoDetailDatastore2.getAt(0).get('pckh_invdt'),"d-m-Y"));
				     }
				     } 
				});
				     }
                              }   
                     else
 		             {    
				     txtwt.setValue(0);
		                     txtSizeDisplay.setValue('');
				     dtentdate.setRawValue('');
				     txtcust.setRawValue('');
				     txtslipno.setValue('');
				     dtslipdate.setRawValue('');
				     txtSONo.setValue('');
				     dtSOdate.setRawValue('');
				     txtinvno.setRawValue('');
				     dtinvdate.setRawValue('');
		                     alert("Reel Number Not found...");

		             }

                     }
                });


}

var dgrecord = Ext.data.Record.create([]);
var flxReelNo = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 275,
        width: 250,
        x: 360,
        y: 115,        
        columns: [   
            {header: "Reel No", dataIndex: 'stk_sr_no',sortable:true,width:150,align:'left'}, //hidden:'true'},
            {header: "Weigt", dataIndex: 'stk_wt',sortable:true,width:105,align:'left'}, //hidden:'true'},
        ],
        store:loadReelNoDatastore,
        listeners: {
             cellclick: function (flxReelNo, rowIndex, cellIndex, e) {
		 var selected_rows = flxReelNo.getSelectionModel().getSelections();
		 txtReelNo.setValue(selected_rows[0].data.stk_sr_no); 
		 txtReelNoDisplay.setValue(selected_rows[0].data.stk_sr_no);
                 get_ReelNo_Details();
             },
            },


   });

var txtReelNoDisplay = new Ext.form.NumberField({
        fieldLabel  : 'Reel No',
        id          : 'txtReelNoDisplay',
        name        : 'txtReelNoDisplay',
        width       : 200,
        enableKeyEvents: true,
        readOnly   : true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtunit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtunit',
        name        : 'txtunit',
        width       : 90,

        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtwt = new Ext.form.NumberField({
        fieldLabel  : 'Weight',
        id          : 'txtwt',
        name        : 'txtwt',
        width       : 80,
        readOnly    : true,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dtentdate = new Ext.form.DateField({
    fieldLabel : 'Entry Date',
    id         : 'dtentdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly   : true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 120,
    readOnly   : true,
});

/*
var lbldespstatus = new Ext.form.Label({
	fieldLabel  : 'Despatch Status',
	id          : 'lbldespstatus',
	name        : 'lbldespstatus',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lbldeletestatus = new Ext.form.Label({
	fieldLabel  : 'Delete Status',
	id          : 'lbldeletestatus',
	name        : 'lbldeletestatus',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var despstatusyes = 'N';
var chkdespstatusyes = new Ext.form.Checkbox({
	name: 'YES',
	boxLabel: 'YES',
	id: 'chkdespstatusyes',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    despstatusyes = 'Y';
		}else{
		    despstatusyes = 'N';
		}
	    }
	}
});

var despstatusno = 'N';
var chkdespstatusno = new Ext.form.Checkbox({
	name: 'NO',
	boxLabel: 'NO',
	id: 'chkdespstatusno',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    despstatusno = 'Y';
		}else{
		    despstatusno = 'N';
		}
	    }
	}
});

var deletestatusyes = 'N';
var chkdeletestatusyes = new Ext.form.Checkbox({
	name: 'YES',
	boxLabel: 'YES',
	id: 'chkdeletestatusyes',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    deletestatusyes = 'Y';
		}else{
		    deletestatusyes = 'N';
		}
	    }
	}
});

var deletestatusno = 'N';
var chkdeletestatusno = new Ext.form.Checkbox({
	name: 'NO',
	boxLabel: 'NO',
	id: 'chkdeletestatusno',
	checked: false,
	width: 100,
	listeners: {
	    check: function (rb, checked) {
		if (checked === true) {
		    deletestatusno = 'Y';
		}else{
		    deletestatusno = 'N';
		}
	    }
	}
});
*/
var despstatus = "1";
var chkdespstatus = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:40,
    x:115,
    y:115,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    //style      : "border-radius:5px;",    
    style:"border:0.25px solid skyblue;border-radius:5px;",
    items: [
  		 {
                        xtype: 'checkboxgroup',
                        fieldLabel: '',
                        //arrange Checkboxes into 3 columns
                        columns: 2,
                        allowBlank: true,
                        itemId: 'chkdespstatus',
                        items: [
                            {
                                xtype: 'checkbox',
                                boxLabel: 'YES',
                                name: 'yes',
                                id:'checktest',
                                checked: '',
                                inputValue: ''
                            },
                            {
                             xtype: 'checkbox',
                                boxLabel: 'NO',
                                name: 'no',
                                inputValue: ''
                            },
        ]
    }
    ]
});

var deletestatus = "1";
var chkdeletestatus = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:40,
    x:115,
    y:160,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    //style      : "border-radius:5px;",    
    //style:{ border:'0.25px solid gray',radius:'5px'},color:' #581845 '
    style:"border:0.25px solid skyblue;border-radius:5px;",
    items: [
  		 {
                        xtype: 'checkboxgroup',
                        fieldLabel: '',
                        //arrange Checkboxes into 3 columns
                        columns: 2,
                        allowBlank: true,
                        itemId: 'chkdeletestatus',
                        items: [
                            {
                                xtype: 'checkbox',
                                boxLabel: 'YES',
                                name: 'yes',
                                checked: '',
                                inputValue: ''
                            },
                            {
                             xtype: 'checkbox',
                                boxLabel: 'NO',
                                name: 'no',
                                inputValue: ''
                            },
        ]
    }
    ]
});

var txtcust = new Ext.form.NumberField({
        fieldLabel  : 'Customer',
        id          : 'txtcust',
        name        : 'txtcust',
        width       : 370,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,  
         readOnly   : true,      
});

var txtslipno = new Ext.form.NumberField({
        fieldLabel  : 'Slip No',
        id          : 'txtslipno',
        name        : 'txtslipno',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
        readOnly   : true,
});

var dtslipdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtslipdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 100,
    readOnly   : true,

});


var txtSONo = new Ext.form.NumberField({
        fieldLabel  : 'SO No',
        id          : 'txtSONo',
        name        : 'txtSONo',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
        readOnly   : true,
});

var dtSOdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtSOdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 100,
    readOnly   : true,

});
var txtinvno = new Ext.form.NumberField({
        fieldLabel  : 'Inv. No',
        id          : 'txtinvno',
        name        : 'txtinvno',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,    
        readOnly   : true,    
});

var dtinvdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtinvdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 100,
    readOnly   : true,
});

var txtsalreturnno = new Ext.form.NumberField({
        fieldLabel  : 'Sales Return No',
        id          : 'txtsalreturnno',
        name        : 'txtsalreturnno',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dtsalreturndate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtsalreturndate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 100,
    readOnly   : true,
});
   
var TrnReelTraceRG1StkFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Reel Trace in the RG1 Stock',
        width       : 800,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-size:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnReelTraceRG1StkFormPanel',
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
            fontSize:25,
            items: [

                {
                    text: 'View',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                             if (flxReelNo.getStore().getCount()==0)
                             {
                              alert("Select Size");
                             }       
                             else
                             {
				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&sizecode=" + encodeURIComponent(vsizecode);
				var param = (p1+p2);
			    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSizewiseStock.rptdesign&__format=pdf&' + param, '_blank'); 
                             }  
                        }
                    }
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                  // alert( Ext.getCmp('checktest').getValue());
                   
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
                            TrnReelTraceRG1StkWindow.RefreshData();
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
                            TrnReelTraceRG1StkWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 300,
				width       : 270,
				x           : 330,
				y           : 0,
				border      : false,
				items	    : [lbldetails]
			},                
		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid gray;border-radius:5px;",                
                height		:460,
                width		:1250,
                layout 	: 'absolute',
                x		: 5,
                y		: 40,
             items:[	             
             {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid green;border-radius:5px;",              
                height		:435,
                width		:655,
                layout 	: 'absolute',
                x		: 0,
                y		: 0,
             items:[	
			{
				xtype	    : 'fieldset',
				title	    : '',
				labelWidth  : 100,
				width	    : 280,
				x	    : 0,
				y	    : -5,
				border	    : false,
				items	    : [cmbFinyear]
			},optcriteria,


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 350,
				x           : 0,
				y           : 45,
				border      : false,
				items       : [txtVarty]
			},
                        flxVarietyDetails,


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 350,
				x           : 0,
				y           : 230,
				border      : false,
				items       : [txtSize]
			},
                        flxSizeDetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 70,
				x           : 380,
				y           : 60,
				border      : false,
				items	    : [lblreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 215,
				x           : 370,
				y           : 80,
				border      : false,
				items       : [txtReelNo]
			},flxReelNo,

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 215,
				x           : 350,
				y           : 385,
				border      : false,
				items       : [txtNoofReels]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 215,
				x           : 450,
				y           : 385,
				border      : false,
				items       : [txtTotWt]
			},
					             
              	]
	  },	
             {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid green;border-radius:5px;", 
                height		:435,
                width		:540,
                layout 	: 'absolute',
                x		: 665,
                y		: 0,
             items:[	
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 330,
				x           : 0,
				y           : -10,
				border      : false,
				items       : [txtReelNoDisplay]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 330,
				x           : 0,
				y           : 40,
				border      : false,
				items       : [txtSizeDisplay]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 250,
				x           : 0,
				y           : 90,
				border      : false,
				items       : [txtwt]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 250,
				x           : 0,
				y           : 140,
			    	border      : false,
				items	    : [dtentdate]
			},
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 120,
				x           : 0,
				y           : 120,
				border      : false,
				items	    : [lbldespstatus]
			},chkdespstatus,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 120,
				x           : 0,
				y           : 160,
				border      : false,
				items	    : [lbldeletestatus]
			},chkdeletestatus,

*/
		{
		 xtype  	: 'fieldset',
                title		: ' Details',
                layout 	: 'hbox',
                border		: true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid lightgreen;border-radius:5px;",                
                height		: 190,
                width		: 500,
                layout 	: 'absolute',
                x		: 10,
                y		: 190,
             	items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 490,
				x           : -10,
				y           : -10,
				border      : false,
				items       : [txtcust]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 320,
				x           : -10,
				y           : 30,
				border      : false,
				items       : [txtSONo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 320,
				y           : 30,
			    	border      : false,
				items	    : [dtSOdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 320,
				x           : -10,
				y           : 70,
				border      : false,
				items       : [txtslipno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 320,
				y           : 70,
			    	border      : false,
				items	    : [dtslipdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 320,
				x           : -10,
				y           : 110,
				border      : false,
				items       : [txtinvno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 320,
				y           : 110,
			    	border      : false,
				items	    : [dtinvdate]
			},             	
             	]
             },
/*
             	{
		 xtype  	: 'fieldset',
                title		: 'Sales Return Details',
                layout 	: 'hbox',
                border		: true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border:0.25px solid lightblue;border-radius:5px;",                
                height		: 65,
                width		: 500,
                layout 	: 'absolute',
                x		: 10,
                y		: 345,
             	items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 320,
				x           : -10,
				y           : -10,
				border      : false,
				items       : [txtsalreturnno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 320,
				y           : -10,
			    	border      : false,
				items	    : [dtsalreturndate]
			},             	
             	]
             },	

*/					
             /*{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		: true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border-radius:5px;",                
                height		: 55,
                width		: 300,
                layout 	: 'absolute',
                x		: 120,
                y		: 115,
             	items:[			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 30,
				y           : -5,
				border      : false,
				items	    : [chkdespstatusyes]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 180,
				y           : -5,
				border      : false,
				items	    : [chkdespstatusno]
			},
		     ]
		   },

		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		: true,
		labelStyle 	: "font-size:12px;font-weight:bold;",
   		style      	: "border-radius:5px;",                
                height		: 55,
                width		: 300,
                layout 	: 'absolute',
                x		: 120,
                y		: 175,
             	items:[			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 30,
				y           : -5,
				border      : false,
				items	    : [chkdeletestatusyes]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 180,
				y           : -5,
				border      : false,
				items	    : [chkdeletestatusno]
			},
		     ]
		   },*/				   									
              	]
	  },	  			             
      	]
      },		
      ]
});

     var TrnReelTraceRG1StkWindow = new Ext.Window({
        height      : 600,
        width       : 1300,
        y           : 30,
        layout      : 'fit',
        items       : TrnReelTraceRG1StkFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
        listeners:
            {
                
            }
    });
//    finid = 22;   
    cmbFinyear.setValue("22");
    cmbFinyear.setRawValue("2022-2023");
       TrnReelTraceRG1StkWindow.show();
});

