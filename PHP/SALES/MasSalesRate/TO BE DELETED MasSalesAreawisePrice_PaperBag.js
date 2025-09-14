Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var gstFlag = "Add";
   var ratebf14,ratebf16,ratebf18,ratebf20,ratebf22,ratebf24,ratebf26,ratebf28,ratebf30,ratebf32 = 0;
   var colname;


   var sotype = localStorage.getItem('PRICETYPE');

 var custcode = 0;
 var custname = 0;


   var txtothershades= new Ext.form.NumberField({
        fieldLabel  : 'OTHER SHADES - extra Rs.',
        id          : 'txtothershades',
        name        : 'txtothershades',
        width       :  70,
        value       : 2000,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });

 var loadOldPriceListDatastore = new Ext.data.Store({
      id: 'loadOldPriceListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'rate_code', 'rate_appr_date', 'rate_wef', 'rate_cust', 'rate_vartype', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_rate',

      ]),
    });


 var loadPriceListDetailDatastore = new Ext.data.Store({
      id: 'loadPriceListDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'rate_code', 'rate_appr_date', 'rate_wef', 'rate_cust', 'rate_vartype', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_rate',

      ]),
    });






var lblrate = new Ext.form.Label({
    fieldLabel  : 'Extra Rs.',
    id          : 'lblrate',
    width       : 120,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
});


   var txtApprovalNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtApprovalNo',
        name        : 'txtApprovalNo',
        width       :  100,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2 /* ,
        listeners:{
                  select:function(){
                         url: MasSalesRate.php',
                         callback: function () 
		           {
                                txtApprovalNo.setValue(ItemDetailsDataStore.getAt(0).get('rateseq'));
                            }
                         };         
        }  */
    });



   var txtGSTper= new Ext.form.NumberField({
        fieldLabel  : 'GST % ',
        id          : 'txtGSTper',
        name        : 'txtGSTper',
        width       :  70,
        value       : 12,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,	

    });



    var dtpApproval = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpApproval',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });





    var dtpWEF = new Ext.form.DateField({
        fieldLabel: 'W.E.F Date',
        id: 'dtpWEF',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
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



 var BFDataStore = new Ext.data.Store({
      id: 'BFDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBF"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'bf14', 'bf16', 'bf18', 'bf20', 'bf22', 'bf24', 'bf26', 'bf28,'
      ]),
    });



 var loadAreaListDataStore = new Ext.data.Store({
      id: 'loadAreaListDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAreaList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'area_code', 'area_name'
      ]),
    });




 var loadProdType = new Ext.data.Store({
      id: 'loadProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMainVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });

 var findProdType = new Ext.data.Store({
      id: 'findProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findProductType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });



  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetailsOfVariety"}, // this parameter asks for listing
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
        }, ['var_code','var_name','var_grpcode'])
    });


  var loadapprovallistStore = new Ext.data.Store({
        id: 'loadapprovallistStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadAreaRateList"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['arearate_sno'])
    });


  var loadeditApprovalNo = new Ext.data.Store({
        id: 'loadeditApprovalNo',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "EditAreaApprovalNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[ 'arearate_appr_date','arearate_wef', 'arearate_type','arearate_area', 'arearate_vartype',
'area_bf18gsm120','area_bf18gsm100','area_bf18gsm90','area_bf18gsm80','area_bf18gsm70','area_bf18gsm60',
'area_bf18gsm50','area_bf20gsm120','area_bf20gsm100','area_bf20gsm90','area_bf20gsm80','area_bf20gsm70',
'area_bf20gsm60','area_bf20gsm50','area_bf22gsm120','area_bf22gsm100','area_bf22gsm90','area_bf22gsm80',
'area_bf22gsm70','area_bf22gsm60','area_bf22gsm50','area_bf24gsm120','area_bf24gsm100','area_bf24gsm90',
'area_bf24gsm80','area_bf24gsm70','area_bf24gsm60','area_bf24gsm50','area_bf26gsm120','area_bf26gsm100',
'area_bf26gsm90','area_bf26gsm80','area_bf26gsm70','area_bf26gsm60','area_bf26gsm50','area_bf28gsm120',
'area_bf28gsm100','area_bf28gsm90','area_bf28gsm80','area_bf28gsm70','area_bf28gsm60','area_bf28gsm50',
'area_bf30gsm120','area_bf30gsm100','area_bf30gsm90','area_bf30gsm80','area_bf30gsm70','area_bf30gsm60',
'area_bf30gsm50','area_bf32gsm120','area_bf32gsm100','area_bf32gsm90','area_bf32gsm80','area_bf32gsm70',
'area_bf32gsm60','area_bf32gsm50','area_bf34gsm120','area_bf34gsm100','area_bf34gsm90','area_bf34gsm80',
'area_bf34gsm70','area_bf34gsm60','area_bf34gsm50'
 ])
    });



var cmbApprovalNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No.',
        width           : 100,
        displayField    : 'arearate_sno', 
        valueField      : 'arearate_sno',
        hiddenName      : '',
        id              : 'cmbApprovalNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadapprovallistStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        hidden          : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
            listeners:{
                select: function () {
             		loadeditApprovalNo.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'EditAreaApprovalNo',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    apprno:cmbApprovalNo.getValue()
                                },
                       	callback:function()
				{

   
  
//alert(loadeditApprovalNo.getCount());

//alert(loadeditApprovalNo.getAt(0).get('rate_type')); 



				  if (loadeditApprovalNo.getAt(0).get('rate_type') == 'B')
				  { 
//				      Ext.getCmp('bfrate').setDisabled(false);
//				      Ext.getCmp('gsmrate').setDisabled(true);
//                                      Ext.getCmp('addrate').setDisabled(false);
				  }
				  else
				  { 
				  }
     



                                  cmbArea.setValue(loadeditApprovalNo.getAt(0).get('arearate_area'));

                                  txtApprovalNo.setValue(cmbApprovalNo.getValue());
             
                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('arearate_vartype'));
                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_appr_date'),"d-m-Y"));     
                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('arearate_wef'),"d-m-Y"));              
    
                                  txtothershades.setValue(loadeditApprovalNo.getAt(0).get('arearate_othershades'));
                                  txtGSTper.setValue(loadeditApprovalNo.getAt(0).get('arearate_gst_per'));

				  flxDetailPB.getStore().removeAll();
				  var selrows = flxDetailPB.getSelectionModel().getCount();
			          var sel = flxDetailPB.getSelectionModel().getSelections();
                                  var RowCnt = flxDetailPB.getStore().getCount() + 1;



				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '18', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf18gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf18gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf18gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf18gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf18gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf18gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf18gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '20', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf20gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf20gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf20gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf20gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf20gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf20gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf20gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '22', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf22gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf22gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf22gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf22gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf22gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf22gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf22gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '24', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf24gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf24gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf24gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf24gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf24gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf24gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf24gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '26', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf26gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf26gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf26gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf26gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf26gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf26gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf26gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '28', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf28gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf28gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf28gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf28gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf28gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf28gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf28gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '30', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf30gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf30gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf30gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf30gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf30gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf30gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf30gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '32', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf32gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf32gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf32gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf32gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf32gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf32gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf32gsm50'),
				   })
				); 

				flxDetailPB.getStore().insert(
				flxDetailPB.getStore().getCount(),
				   new dgrecord({
				      bf         : '34', 
				      gsm120     : loadeditApprovalNo.getAt(0).get('area_bf34gsm120'),
				      gsm100     : loadeditApprovalNo.getAt(0).get('area_bf34gsm100'),
				      gsm90      : loadeditApprovalNo.getAt(0).get('area_bf34gsm90'),
				      gsm80      : loadeditApprovalNo.getAt(0).get('area_bf34gsm80'),
				      gsm70      : loadeditApprovalNo.getAt(0).get('area_bf34gsm70'),
				      gsm60      : loadeditApprovalNo.getAt(0).get('area_bf34gsm60'),
				      gsm50      : loadeditApprovalNo.getAt(0).get('area_bf34gsm50'),
				   })
				); 
        
      				} 
                         });
			}
                      }    
});



var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'AREA ',
        width           : 250,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAreaListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {



                }
        }
});

var cmbProductType = new Ext.form.ComboBox({
        fieldLabel      : 'Product Type ',
        width           : 250,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : 'vargrp_type_code',
        id              : 'cmbProductType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdType,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
             		findProdType.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'findProductType',
                                    ptypecode:cmbProductType.getValue()
                                },
                       	callback:function()
				{
/*

                                  if (findProdType.getAt(0).get('vargrp_type_code') == 1)
                                  {
                                       Ext.getCmp('othervarty').hide();
                                       Ext.getCmp('bfrate').setDisabled(false);
                                  }
                                  else
                                  {
                                       Ext.getCmp('othervarty').show();
                                       Ext.getCmp('bfrate').setDisabled(true);
                                  }
*/

                                }
                         })
                 }
        }
 });
/*
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 100,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
   });
*/


var dgrecord = Ext.data.Record.create([]);

var flxDetailPB = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:100,
    height: 230,
    hidden:false,
    width:950,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "BF", dataIndex:'bf', width:70,align:'center',sortable:false, menuDisabled: true},
       {header: "120 GSM", dataIndex:'gsm120', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "100 GSM", dataIndex:'gsm100', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "90 GSM", dataIndex:'gsm90', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "80 GSM", dataIndex:'gsm80', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},


       {header: "70 GSM", dataIndex:'gsm70', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

       {header: "60 GSM", dataIndex:'gsm60', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},
       {header: "50 GSM", dataIndex:'gsm50', width:90,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

    ],
    store: [], //BFDataStore,

});


   var MasSalesRateDiscountPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesRateDiscountPanel',
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
                                    RefreshData();
				}
			    }
		   },'-',
//edit data
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

//alert(Gincompcode);
//alert(GinFinid);
				    gstFlag = "Edit";
//alert(gstFlag);


                                    Ext.getCmp('cmbApprovalNo').show();

                                    loadapprovallistStore.load({
		                    url: 'ClsMasSalesRate.php',
                                    params: {
				       task: 'loadAreaRateList',
			               finid: GinFinid,
				       compcode:Gincompcode,
                                       ratetype :  sotype,   
                                    },
                                    callback: function () 
	            	           {

//                                    alert(loadapprovallistStore.getCount());


                                    }


                                    });  

				}
			    }
		   },'-',

                   {
                    text: 'Save',
                    id: 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                       listeners:{
		                click: function () {   //loop v start 
//alert(Gincompcode);
//alert(chkallsize.getValue());
//alert(Ext.getCmp("chkallsize").checked)
//save





           

		                       if(cmbArea.getRawValue()=="" )
					{
						alert("Select Area Name..");
					
					}
	
		                 	else if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
					{
						alert("Select Production Variety..");
						cmbProductType.setFocus();
					}
					else
					{            //loop w start   
						Ext.MessageBox.show({
				                title: 'Confirmation',
				                icon: Ext.Msg.QUESTION,
		        			buttons: Ext.MessageBox.YESNO,
		                    		msg: 'Do You Want to save the Record',
		                    		fn: function(btn)
						{          //loop x start   
						if (btn == 'yes')
						   {       //loop y start


            var rateData = flxDetailPB.getStore().getRange();                                        
            var rateupData = new Array();
            Ext.each(rateData, function (record) {
                rateupData.push(record.data);
            });



	         //-- loop y Start     
							Ext.Ajax.request({
				                    	url: 'FrmMasSalesAreaRatePaperBagSave.php',
				                        params:
							{
                                                        savetype:gstFlag,

		cnt: rateData.length,
               	griddet: Ext.util.JSON.encode(rateupData),   

                                                        compcode:Gincompcode,
                                                        finid:GinFinid,   
                                                     sotype       : sotype,
                                                        areacode     : cmbArea.getValue(), 
		                                        vartypecode  : cmbProductType.getValue(), 
                                othershades:Number(txtothershades.getValue()),						
                                      GSTper       : Number(txtGSTper.getValue()),

                                      apprno     : txtApprovalNo.getValue(),                                        
                                      apprdate   : Ext.util.Format.date(dtpApproval.getValue(),"Y-m-d"),
	 	                      wefdate    : Ext.util.Format.date(dtpWEF.getValue(),"Y-m-d"),

							},
							callback: function (options, success, response)
		         //-- loop Z Start                       
                                                      	{     //loop z start
		                                    	var obj = Ext.decode(response.responseText);
							var obj2 = Ext.decode(response.responseText);
		                                    	if (obj['success'] === "true") 
					                   {
	          						Ext.MessageBox.alert("Alert","Saved ");
                          
		                                                MasSalesRateDiscountPanel.getForm().reset();




								RefreshData();
		                                           }
		                                     	else 
                                                           {
	                                                        if (obj['cnt']>0)
								{
		                                                  Ext.MessageBox.alert("Alert","Already exists.. ");
								}
								else
								{
		                                                  Ext.MessageBox.alert("Alert","Not Saved.. ");
								}
		                                             
		                                    	   }
		                                         }   //loop z end
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
                            MasSalesRateDiscountWindow.hide();
                        }
                } ]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 980,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 0,	
                items:[
                       
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [txtApprovalNo]

                    },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [cmbApprovalNo]

                    },	




                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 300,
                            y           : 0,
                            labelWidth  : 40,
                            border      : false,
                            items : [dtpApproval]
   
                   },

                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 550,
                            y           : 0,
                            labelWidth  : 80,
                            border      : false,
                            items : [dtpWEF]
   
                   },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 30,
                             border      : false,
                             items: [cmbArea]

                    },	


                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 420,
                           x           : 0,
                           y           : 60,
                           border      : false,
                           items: [cmbProductType]
                   },


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 80,
                             width       : 420,
                             x           : 700,
                             y           : 60,
                             border      : false,      
         
                             items: [txtGSTper]
                      },


                   ]
       },



   	     { xtype   : 'fieldset',
                 title       : ' ',
                 id          : 'bfrate',
                 width       : 880,
                 height      : 320,
                 x           : 50,
                 y           : 125,
                 border      : true,
                 layout      : 'absolute',
                items:[

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 880,
                           x           : 0,
                           y           : 25,
                           border      : false,
                           items: [flxDetailPB]
                   },


                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 200,
                             width       : 420,
                             x           : 0,
                             y           : 260,
                             border      : false,      
         
                             items: [txtothershades]
                      },

                ] 
         },





       ] ,  
    });

      function RefreshData(){

    //    Ext.getCmp('bfrate').setDisabled(false);
//        Ext.getCmp('gsmrate').setDisabled(true);
        custcode = 0;
         Ext.getCmp('cmbApprovalNo').hide();
//         Ext.getCmp('othervarty').hide();


   


	flxDetailPB.getStore().removeAll();
	var selrows = flxDetailPB.getSelectionModel().getCount();
        var sel = flxDetailPB.getSelectionModel().getSelections();
        var RowCnt = flxDetailPB.getStore().getCount() + 1;

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '18', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '20', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '22', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '24', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '26', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '28', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '30', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '32', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 

        flxDetailPB.getStore().insert(
        flxDetailPB.getStore().getCount(),
           new dgrecord({
              bf         : '34', 
              gsm120     : 0,
              gsm100     : 0,
              gsm90      : 0,
              gsm80      : 0,
              gsm70      : 0,
              gsm60      : 0,
              gsm50      : 0,
           })
        ); 



	loadAreaRateEntryNodatastore.removeAll();
	loadAreaRateEntryNodatastore.load({
	 url: 'ClsMasSalesRate.php',
		params: {
	    	   task: 'findAreaRateEntryNo',
		   compcode:Gincompcode,
		   finid:GinFinid   
		 },
		 callback:function()
		   {
		       txtApprovalNo.setValue(loadAreaRateEntryNodatastore.getAt(0).get('rateno'));
		   } 
         });


   };


   var loadAreaRateEntryNodatastore = new Ext.data.Store({
      id: 'loadAreaRateEntryNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findAreaRateEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rateno'
      ]),
    });
   
    var MasSalesRateDiscountWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//        x           : 50,
        y           : 35,
        title       : 'SALES - PRICE MASTER - for PAPER BAGS',
        items       : MasSalesRateDiscountPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDRD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
           show:function(){
                       RefreshData();

                 }

      }
    });
    MasSalesRateDiscountWindow.show();  
});
