Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');

   var Gincompcode = localStorage.getItem('gincompcode');
   var gstFlag = "Add";
   var usertype = localStorage.getItem('ginuser');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



  var rbunit = 1; 

  var findno = 0;


   function check_password()
   {
      if (txtPassword.getRawValue() == "FINSTK")
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
        fieldStyle  : 'text-transform:uppercase',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
            console.log(newValue);
            obj.setRawValue(newValue.toUpperCase());
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

function Generate_Reelno()
{
	var dt = dtpEntry.getValue();
	var m = Ext.util.Format.date(dtpEntry.getValue(),"m");
	var y = Ext.util.Format.date(dtpEntry.getValue(),"y");

	var rwno = "0"; 

	var rno = "00"+txtRollNo.getValue(); 
	var roll = rno.slice(-3);         
	reelno = y+m+rwno+roll
        txtReelNo.setValue(reelno);
}


var loadSONodatastore = new Ext.data.Store({
      id: 'loadSONodatastore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsTrnSalesFinishedGoods.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono','ordh_sodate'
      ]),
});
var loadFinEntryList = new Ext.data.Store({
      id: 'loadFinEntryList',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinishedGoodsEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_ent_no'
      ]),
});

var loadFinEntryNoDetails = new Ext.data.Store({
      id: 'loadFinEntryNoDetails',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinEntNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_ent_date','stk_var_code','stk_sr_no','stk_wt','stk_destag','var_name','var_grpcode','var_unit','var_size1','var_size2','var_tariffno',
'var_desc','var_gsm','var_sheets','var_reams','godown_code', 'godown_name','cust_code','cust_ref','stk_sono','stk_yymm','stk_rollno'
      ]),
});

var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
});
function datecheck()
  {
        txtYYMM.setValue(Ext.util.Format.date(dtpEntry.getValue(),"ym"));   
        Generate_Reelno();   
        var dt_today = new Date();
        var dt_fin  = dtpEntry.getValue();
        var diffdays = (dt_today.getDate()-dt_fin.getDate());

/*
        if (diffdays > 0)
        {     
             alert("You are Not Allowed to entered in the date of " +  Ext.util.Format.date(dt_fin,"d-m-Y"));
             dtpEntry.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
*/
        if (diffdays < 0)
        {     
             alert("System will not allow to raise the entry in future date");
             dtpEntry.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
        }

 }
var dtpEntry = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpEntry',
        name: 'Date',
        format: 'd-m-Y',
	readOnly : true,
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
/*
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
*/
        } 

    });


//
var txtVariety = new Ext.form.NumberField({
        fieldLabel  : 'Variety',
        id          : 'txtVariety',
        name        : 'txtVariety',
        width       :  240,
        tabindex : 2
});

var txtUnit = new Ext.form.NumberField({
    fieldLabel  : 'Unit',
    id          : 'txtUnit',
    name        : 'txtUnit',
    width       :  100,
    readonly    : true,
    tabindex : 2
});

var txtSize = new Ext.form.TextField({
     fieldLabel  : 'Size',
     id          : 'txtSize',
     name        : 'txtSize',
     width       :  100,
     tabindex : 2
    });

var lblInchCm = new Ext.form.Label({
	fieldLabel  : '',
	id          : 'lblinchcm',
	name        : 'lblInchCm',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
       labelStyle : "font-size:14px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",    
      	enableKeyEvents: true,
	tabindex : 1,

}); 

var lblUnit = new Ext.form.Label({
	fieldLabel  : '(KGS)',
	id          : 'lblUnit',
	name        : 'lblUnit',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
        labelStyle : "font-size:14px;font-weight:bold;color:#cc00cc",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

   var txtYYMM = new Ext.form.NumberField({
        fieldLabel  : 'Prod. YYMM',
        id          : 'txtYYMM',
        name        : 'txtYYMM',
        width       :  50,
        tabindex : 2,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
              Generate_Reelno();
           },
           change:function(){
              Generate_Reelno();
           }
        }
    });

   var txtRollNo = new Ext.form.NumberField({
        fieldLabel  : 'Roll No.',
        id          : 'txtRollNo',
        name        : 'txtRollNo',
        width       :  50,
        tabindex : 2,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
              Generate_Reelno();
           },
           change:function(){
              Generate_Reelno();
           }
        }
    });

   var txtReelNo = new Ext.form.NumberField({
        fieldLabel  : 'Reel No.',
        id          : 'txtReelNo',
        name        : 'txtReelNo',
        width       :  200,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtWt.focus();
             }
          }
        }
    });

   var txtWt = new Ext.form.NumberField({
        fieldLabel  : 'Weight',
        id          : 'txtWt',
        name        : 'txtWt',
        width       :  100,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  addtogrid();
             }
          }
        }      
    });

var txttotReels = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Reels',
        id          : 'txttotReels',
        name        : 'txttotReels',
        width       :  120,
	readOnly : true,
        tabindex : 2
});
var txttotWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Wt.',
        id          : 'txttotWt',
        name        : 'txttotWt',
        width       :  100,
	readOnly : true,
        tabindex : 2
});

var dtpEntry2 = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpEntry2',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
});

var txtEntryNo3 = new Ext.form.NumberField({
        fieldLabel  : 'Entry No3.',
        id          : 'txtEntryNo3',
        name        : 'txtEntryNo3',
        width       :  100,
        tabindex : 2
});

var dtpEntry3 = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpEntry3',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
});
//
var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
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
    })

var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 350, 	
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
		loadSONodatastore.load({
		url: 'ClsTrnSalesFinishedGoods.php',
		params: {
		    task: 'loadSONo',
		    party:cmbCustomer.getValue(),
                    compcode : Gincompcode,
                    
		},
 	        callback:function()
                { 
	 	       cmbSONO.setValue(loadSONodatastore.getAt(0).get('ordh_sono'));
                       
			    	//socno : cmbSO.getRawValue()
		},
		});      
         }
	}
 
});

var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200, 	
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
       // hiddenName      : 'cust_code',
        id              : 'SONO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSONodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
         }
	}
 
});

var loadGodown = new Ext.data.Store({
      id: 'loadGodown',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGodownDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'godown_code', type: 'int',mapping:'godown_code'},
	{name:'godown_name', type: 'string',mapping:'godown_name'}
      ]),
});
var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      autoLoad : true,
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
var checkfinishedstockstore = new Ext.data.Store({
      id: 'checkfinishedstockstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                      
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"CheckNumber"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['nos','stk_ent_no','stk_ent_date']),
});
var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
       autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
});

var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        autoLoad : true,
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
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit','var_tariffno','var_sheets','var_reams','var_inchcm'])
});

function refreshsizedetails(){
         txtVariety.setRawValue('');

         txtSize.setValue('');
         txtWt.setValue('');
         txtUnit.setRawValue(''); 

         txtRollNo.setRawValue(''); 
         txtReelNo.setRawValue(''); 
        dtpEntry.setRawValue('31-03-2022');
}

	
var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size ',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : 'var_code',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners: {

            select: function ()       

          {
                refreshsizedetails();
    //            RefreshData();

                getSizeDataStore.removeAll();
                getSizeDataStore.load({

                    url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
                    params:
                            {
        
                                task: "findSizeDetails",
                                sizecode:cmbSize.getValue()
                            },
                    callback: function () {
                        var reamwt = 0; 
                        var bundwt = 0;
                        var cnt = getSizeDataStore.getCount(); 
                        if (cnt > 0) {
                                     
                                   rbunit = getSizeDataStore.getAt(0).get('var_unit');
                                   txtVariety.setRawValue(getSizeDataStore.getAt(0).get('var_desc'));

                                   if (getSizeDataStore.getAt(0).get('var_inchcm') == "I")   
                                   {  
                                      lblInchCm.setText("Inch")
                                   }  
                                   else
                                   {  
                                      lblInchCm.setText("CM")
                                   }  



//                                   txtSize.setValue(getSizeDataStore.getAt(0).get('var_size1'));

                                   if (getSizeDataStore.getAt(0).get('var_unit') == 1)                         		           						{
                                        txtUnit.setRawValue('Reel'); 
                                        txtSize.setValue(getSizeDataStore.getAt(0).get('var_size2'));
			
                                        txtWt.setDisabled(false);
                                     
                                        } 
                                  else {
                                        txtUnit.setRawValue('Bundle'); 
                                        txtSize.setValue(getSizeDataStore.getAt(0).get('var_size1') + " X " + getSizeDataStore.getAt(0).get('var_size2') );
                                       
                                        txtWt.setDisabled(true);
                                        reamwt = (getSizeDataStore.getAt(0).get('var_size1') *  getSizeDataStore.getAt(0).get('var_size2') * getSizeDataStore.getAt(0).get('var_gsm') * getSizeDataStore.getAt(0).get('var_sheets') / 10000000)
//                                        reamwt = Ext.util.Format.number(Math.round(reamwt),'0.00');
                                        reamwt = reamwt.toFixed(1) 
                                        bundwt =  Ext.util.Format.number(reamwt * getSizeDataStore.getAt(0).get('var_reams'),'00.0');  
                                        txtWt.setValue(bundwt);
                                        }
                                    }


                         else {alert('not found');

                       } 
                   }
                });
              }
        }    
});

var cmbEntryNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No.',
        width           : 100,
        displayField    : 'stk_ent_no', 
        valueField      : 'stk_ent_no',
        hiddenName      : '',
        id              : 'cmbEntryNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFinEntryList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                 select: function () {
                         flxDetail.getStore().removeAll();
		         loadFinEntryNoDetails.load({
				url: 'ClsTrnSalesFinishedGoods.php',
				params: {
				    task: 'loadFinEntNoDetails',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    entno:cmbEntryNo.getValue()
                                },
                           	callback:function()
				{
//alert(loadFinEntryNoDetails.getCount());
                                  txtWt.setValue(0);
                                  txtEntryNo.setValue(cmbEntryNo.getValue());
                                  cmbSize.setValue(loadFinEntryNoDetails.getAt(0).get('stk_var_code'));   
                                  txtVariety.setRawValue(loadFinEntryNoDetails.getAt(0).get('var_desc'));
                       
                                  dtpEntry.setRawValue(Ext.util.Format.date(loadFinEntryNoDetails.getAt(0).get('stk_ent_date'),"d-m-Y"));

                                  if (loadFinEntryNoDetails.getAt(0).get('var_unit') == 1)                         		           					  {
                                        txtUnit.setRawValue('Reel'); 
                                        txtSize.setValue(loadFinEntryNoDetails.getAt(0).get('var_size2'));
                                  } 
                                  else 
                                  {
                                        txtUnit.setRawValue('Bundle'); 
                                        txtSize.setValue(loadFinEntryNoDetails.getAt(0).get('var_size1') + " X " + loadFinEntryNoDetails.getAt(0).get('var_size2') );

                                        reamwt = (loadFinEntryNoDetails.getAt(0).get('var_size1') *  loadFinEntryNoDetails.getAt(0).get('var_size2') * loadFinEntryNoDetails.getAt(0).get('var_gsm') * loadFinEntryNoDetails.getAt(0).get('var_sheets') / 10000000)
                                        reamwt = reamwt.toFixed(1) 
                                        bundwt =  Ext.util.Format.number(reamwt * loadFinEntryNoDetails.getAt(0).get('var_reams'),'00.0');  
                                        txtWt.setValue(bundwt);              
                                   }

                                   var cnt=loadFinEntryNoDetails.getCount();
//alert(cnt);
	                           if(cnt>0)
		                       {                        
                                          for(var j=0; j<cnt; j++)
 		                          { 

	 					    var varname   = loadFinEntryNoDetails.getAt(j).get('var_name');
		                          	    var varcode   = loadFinEntryNoDetails.getAt(j).get('stk_var_code');
		                                    if (loadFinEntryNoDetails.getAt(j).get('var_unit') == 1)   
                                                    {  
			                   	    var varunit   = 'Reel';
		                                    }
		                                    else
		                                    {  
			                   	    var varunit   = 'Bundle';
		                                    }
		                                    var sr_no     = loadFinEntryNoDetails.getAt(j).get('stk_sr_no');
		                    	   	    var wt        = loadFinEntryNoDetails.getAt(j).get('stk_wt');

		                          	    var desp      = loadFinEntryNoDetails.getAt(j).get('stk_destag');
		                                    var hsncode   = loadFinEntryNoDetails.getAt(j).get('var_tariffno');
		                           	    var godname   = loadFinEntryNoDetails.getAt(j).get('godown_name');
		                                    var godcode   = loadFinEntryNoDetails.getAt(j).get('godown_code');

		                                    var RowCnt    = flxDetail.getStore().getCount() + 1;  
		                                    flxDetail.getStore().insert(
		                                       flxDetail.getStore().getCount(),
		                                       new dgrecord({
							    itemname: varname,
							    itemcode: varcode,
							    unit: varunit,
							    number:sr_no ,
							    weight:wt,
							    destag:desp,
							    hsncode:hsncode,
							    party :loadFinEntryNoDetails.getAt(j).get('cust_ref'),
							    sono  :loadFinEntryNoDetails.getAt(j).get('stk_sono'),
                                                            yymm  :loadFinEntryNoDetails.getAt(j).get('stk_yymm'),
                                                            rollno :loadFinEntryNoDetails.getAt(j).get('stk_rollno'),
		                                       })
                                       	            );
                   grid_tot();
        				   }
                        
                                       } 
                                   } 
                             });

                    }
              }
                       

});


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 330,
    hidden:false,
    width: 490,
//    font-size:18px,
    columns:
    [
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:120,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:100,align:'left',hidden:true},
        {header: "Unit", dataIndex: 'unit',sortable:true,width:0,align:'left',hidden:true},
        {header: "Number" , dataIndex: 'number',sortable:true,width:80,align:'left'},
        {header: "Weight", dataIndex:'weight',sortable:true,width:70,align:'left'},
        {header: "Party", dataIndex:'party',sortable:true,width:140,align:'left'},
        {header: "SO No.", dataIndex:'sono',sortable:true,width:80,align:'left'},
        {header: "Des Tag", dataIndex:'destag',sortable:true,width:100,align:'left'} ,        
        {header: "YYMM", dataIndex:'yymm',sortable:true,width:80,align:'left'},
        {header: "Roll", dataIndex:'rollno',sortable:true,width:100,align:'left'} ,  
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
                var sm = flxDetail.getSelectionModel();
                var selrow = sm.getSelected();
                if (selrow.get('destag')  == '') {
                    flxDetail.getStore().remove(selrow);}
                    flxDetail.getSelectionModel().selectAll();
                    grid_tot();
                }
                else
                {
alert("Hello");
                  //  alert("Reel Despatched...");
                }
           }
        });         
    }

   }
});

function grid_tot(){
        var reels = 0;
        var bundles = 0;
        var wt = 0;	
	var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
           if (sel[i].data.unit == "Reel") {
               reels = reels +1;
           }
           else
           {
               bundles = bundles+1;
           }

            wt=wt+Number(sel[i].data.weight);
         }
         txttotReels.setRawValue(Ext.util.Format.number(reels,'0'));
         txttotWt.setRawValue(Ext.util.Format.number(wt,'0.0'));
     
}


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 280,
    y       : 340,
    bodyStyle:{"background-color":"#ebebdf"},  
     listeners:{
         click: function(){              
             addtogrid();
         } 
    }
});

function addtogrid()
{
            checkfinishedstockstore.removeAll();
	    checkfinishedstockstore.load({
	    url: 'ClsTrnSalesFinishedGoods.php', // File to connect to
	    params:
		    {
		        task: "CheckNumber",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        rbno      : txtReelNo.getValue(),

		        rbunit    : rbunit, 
		    },
	    scope:this,
	    callback: function () {

//                   var fincount = 0;
//		   fincount = checkfinishedstockstore.getCount();
//                   alert(checkfinishedstockstore.getAt(0).get('nos'));
//                   findno = checkfinishedstockstore.getAt(0).get('nos');
//                   alert(findno);

                   if (checkfinishedstockstore.getAt(0).get('nos') > 0) {
		   alert("The Number " + txtReelNo.getValue() + " Alerady entered in the Entry No. " + checkfinishedstockstore.getAt(0).get('stk_ent_no') +  " in the Date of " + checkfinishedstockstore.getAt(0).get('stk_ent_date') ) ;
                   }

            if (checkfinishedstockstore.getAt(0).get('nos') == 0)
            {
  	    var gstadd="true";

//alert("HELLO");
   
            if(txtReelNo.getRawValue()=="" || txtReelNo.getValue()==0)
            {
	      alert("Enter Reel / Bundle No...");
              gstadd="false";
              txtReelNo.setFocus();
	    }
            else if(txtWt.getRawValue()=="" || txtWt.getValue()==0)
            {
	      alert("Enter Weight of the Reel...");
              gstadd="false";
              txtWt.setFocus();
            }
            else if(cmbCustomer.getRawValue()=="" || cmbCustomer.getValue()==0)
            {
	      alert("Select Customer Name...");
              gstadd="false";
              txtWt.setFocus();
            }
            else if(cmbSONO.getRawValue()=="" || cmbSONO.getValue()==0)
            {
	      alert("Select SO NO...");
              gstadd="false";
              txtWt.setFocus();
            }

            else
            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var RowCnt = flxDetail.getStore().getCount() + 1;
		var gstunit = txtUnit.getRawValue();
		if(gstunit=="Bundle")
		{
	}
	else
       {
        for (var i= txtReelNo.getValue();i<=txtReelNo.getValue();i++)
                {
                   var selrows = flxDetail.getSelectionModel().getCount();
                   var sel = flxDetail.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
//alert(cmbSize.getValue());
	            if (cnt === 0)
	            {
            //             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
              //      }
                //    else
                  //  {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),

                      new dgrecord({
                            itemname  : cmbSize.getRawValue(),
                            itemcode  : cmbSize.getValue(),
                            unit      : txtUnit.getRawValue(),
                            number    : i,
                            weight    : txtWt.getRawValue(),  
                            party     : cmbCustomer.getRawValue(),
                            sono      : cmbSONO.getValue(),
                            destag    :'',
                            yymm      : txtYYMM.getRawValue(),  
                            rollno    : txtRollNo.getRawValue(),  


                           })
            
                      );
                    }
                }
	}


          grid_tot();
          txtWt.setRawValue('');
          txtReelNo.focus();

          }
  
//        grid_tot();

          txtWt.setRawValue('');


      }
	    }        


            });  
}

   function RefreshData(){
         dtpEntry.setRawValue('31-03-2022');
         Ext.getCmp('cmbEntryNo').hide();

         loadfinentrynodatastore.removeAll();
         loadfinentrynodatastore.load({
              	 url:'ClsTrnSalesFinishedGoods.php',
              	 params:
              	 {
                     	 task:"findFinishedGoodsEntryNo",
                         compcode:Gincompcode,
                         finid:GinFinid   
              	 },
                 callback:function()
	         {
		         txtEntryNo.setValue(loadfinentrynodatastore.getAt(0).get('sentno'));
                 }
 	 });

         flxDetail.getStore().removeAll();

         txtVariety.setRawValue('');

         txtSize.setValue('');
         txtUnit.setRawValue(''); 

         txtReelNo.setValue(''); 

         txtWt.setValue(''); 
         txtYYMM.setValue(''); 
         txtRollNo.setRawValue(''); 
  
 };
   
var TrnSalesFinishedGoodsPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 600,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 300,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesFinishedGoodsPanel',
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
            fontSize:25,
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
//EDIT
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
				    gstFlag = "Edit";
				    Ext.getCmp('cmbEntryNo').show();
                                    loadFinEntryList.removeAll();
				    loadFinEntryList.load({
						url: 'ClsTrnSalesFinishedGoods.php',
						params: {
						    task: 'loadFinishedGoodsEntryNo',
						    finid: GinFinid,
						    compcode:Gincompcode
				                },
                                        	callback:function()
                         			{
							//cmbEntryNo.setValue(loadFinEntryList.get(0).('stk_ent_no'));
//							alert(loadFinEntryList.getCount());	
                                                }

				    });     

				}
			    }
			},'-',

                   {
                    text: 'Save',
                    id  : 'save',
//save
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                       listeners:{
		                click: function () {   
		                       if(cmbSize.getRawValue()=="" || cmbSize.getValue()==0)
					{
						alert("Select Item Name..");
						cmbSize.setFocus();
					}
	
		             		else
					{               
					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
		                           msg: 'Do You Want to save the Record',
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnSalesFinishedGoodsSave.php',
				               params:
						{
                                                  savetype:gstFlag,
                                                  finid : GinFinid,
                                                  compcode :Gincompcode,
	                                          cnt: finData.length,
                               	                  griddet: Ext.util.JSON.encode(finupdData),                                      
                                                  entrydate :Ext.util.Format.date(dtpEntry.getValue(),"Y-m-d"),
 		                                  entryno : txtEntryNo.getValue(),
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
			          	       
             				          
                                                 if (obj['success']==="true")
					{                       
                                    Ext.MessageBox.alert("Finished Goods Entry No -" + obj['msg']);
                                    TrnSalesFinishedGoodsPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
    Ext.MessageBox.alert("Finished Goods Entry Not Completed! Pls Check!- " + obj['msg']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
            },
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
               },

               {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            TrnSalesFinishedGoodsWindow.hide();
                        }
               }]
        },

//PANEL1
        items: [
               { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 500,
                width   : 1050,
		style:{ border:'1px solid blue'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
                   { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 400,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [txtEntryNo]

                   },	

                   { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 400,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [cmbEntryNo]

                   },	

                   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 300,
                            y           : 0,
                            labelWidth  : 30,
                            border      : false,
                            items : [dtpEntry]
   
                   },

                   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 500,
                            y           : 0,
                            labelWidth  : 70,
                            border      : false,
                            items : [txtPassword]
   
                   },



                   {  xtype   : 'fieldset',
                      title   : 'Sales Item Details',
                      layout  : 'hbox',
                      border  : true,
                      height  : 440,
                      width   : 820,
		      style:{ border:'1px solid yellow',color:' #581845 '},
                      layout  : 'absolute',
                      x       : 10,
                      y       : 40,


                   }, 

//Left Pannel Start
                  {  xtype   : 'fieldset',
                      title   : '',
                      layout  : 'hbox',
                      border  : true,
                      height  : 410,
                      width   : 450,
		      style:{ border:'1px solid red',color:' #581845 '},
                      layout  : 'absolute',
                      x       : 30,
                      y       : 60,
                      items:[
                         { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 50,
                             width       : 300,
                             x           : 0,
                             y           : -10,
                             border      : false,
                             items: [cmbSize]

                         },	
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 500,
                            x           : 0,
                            y           : 20,
                            labelWidth  : 50,
                            border      : false,
                            items : [txtVariety]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 50,
                            labelWidth  : 50,
                            border      : false,
                            readOnly : true,
                            items : [txtSize]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 90,
                            labelWidth  : 50,
                            border      : false,
                            readOnly : true,
                            items : [txtYYMM]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 130,
                            labelWidth  : 50,
                            border      : false,
                            readOnly : true,
                            items : [txtRollNo]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 160,
                            y           : 80,
                            labelWidth  : 50,
                            border      : false,
                           readOnly : true,
                            items : [lblInchCm]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 120,
                            labelWidth  : 1,
                            border      : false,
                            readOnly : true,                          
                            items : [txtUnit]
                         },
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 180,
                            labelWidth  : 50,
                            border      : false,
                            items : [txtReelNo]
                         },


                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 230,
                            labelWidth  : 50,
                            border      : false,
                            items : [txtWt]
                         }, 
     
                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 160,
                            y           : 230,
                            labelWidth  : 50,
                            border      : false,
                            items : [lblUnit]
                         }, 
                        { 
                            xtype       : 'fieldset',
                            title       : 'Customer',
                            labelWidth  : 1,
                            width       : 550,
                            x           : 0,
                            y           : 280,
                            border      : false,
                            items: [cmbCustomer]
                        },
			{ 
                            xtype       : 'fieldset',
                            title       : 'SO. NO',
                            labelWidth  : 1,
                            width       : 550,
                            x           : 0,
                            y           : 330,
                            border      : false,
                            items: [cmbSONO]
                        },
                
			 btnSubmit,

                      ] 
                   } ,
//Left Pannel End
//Right Pannel Start
                  {  xtype   : 'fieldset',
                      title   : '',
                      layout  : 'hbox',
                      border  : true,
                      height  : 410,
                      width   : 530,
		      style:{ border:'1px solid red',color:' #581845 '},
                      layout  : 'absolute',
                      x       : 480,
                      y       : 60,
                      items:[
                       flxDetail,

                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 170,
                            x           : 0,
                            y           : 325,
                            labelWidth  : 90,
                            border      : false,
                            items : [txttotReels]
                         },



                         {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 160,
                            x           : 245,
                            y           : 325,
                            labelWidth  : 70,
                            border      : false,
                            items : [txttotWt]
                         },
       

                      ] 
                   } 
//Right Pannel End
     
                ]                   
          }] ,
    });
   

   var loadfinentrynodatastore = new Ext.data.Store({
      id: 'loadfinentrynodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findFinishedGoodsEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'sentno'
      ]),
    });
var TrnSalesFinishedGoodsWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 35,
        title       : 'SALES - FINISHED GOODS ENTRY',
        items       : TrnSalesFinishedGoodsPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
                show:function(){
                        dtpEntry.setRawValue('31-03-2022');

                        txtYYMM.setValue(Ext.util.Format.date(dtpEntry.getValue(),"ym"));  
                        Generate_Reelno();
                 	loadfinentrynodatastore.removeAll();
			loadfinentrynodatastore.load({
			 url: 'ClsTrnSalesFinishedGoods.php',
		                params: {
                	    	task: 'findFinishedGoodsEntryNo',
		                compcode:Gincompcode,
                                finid:GinFinid   
                		},
				callback:function()
	               		{
                                    txtEntryNo.setValue(loadfinentrynodatastore.getAt(0).get('sentno'));
                 		}
			  });
                        txtUnit.hide();
        Ext.getCmp('save').setDisabled(true);

/*
			loadfinentrynodatastore.removeAll();
			loadfinentrynodatastore.load({
                        	 url:'ClsTrnSalesFinishedGoods.php',
//                        	 params:
//                        	 {
//                         	 task:"findFinishedGoodsEntryNo"
//                        	 },
				callback:function()
	               		{
				txtEntryNo.setValue(loadfinentrynodatastore.getAt(0).get('sentno'));
				}
			  });
*/
                    }
  
      }
    });
       TrnSalesFinishedGoodsWindow.show();  
});
