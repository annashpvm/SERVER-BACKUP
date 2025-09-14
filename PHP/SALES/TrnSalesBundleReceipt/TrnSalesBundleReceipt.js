Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate')


   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;   
   var gstFlag = "Add";
  var printtype='PDF';

   var editrow = 0;
   var gridedit = "false";

   var bundle_found = 0;

   var updchk = 0;
   var sizecode = 0;
   var dcseqNumber = 0;
     var lblSizeIn = new Ext.form.Label({
       fieldLabel  : '',
       id          : 'lblSizeIn',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });




var checkBundleNoDataStore = new Ext.data.Store({
      id: 'checkBundleNoDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                      
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"CheckBundleNumber"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['br_sr_no','br_no','br_date']),
});



var checkfinishedstockstore = new Ext.data.Store({
      id: 'checkfinishedstockstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                      
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"CheckNumber_finished"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['nos','stk_ent_no','stk_ent_date' ,'stk_sr_no']),
});

var loadEditBundleRecept = new Ext.data.Store({
      id: 'loadEditDeliveryChallan',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRecptNoEdit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'br_no'
      ]),
    });

var loadfindBundleNodatastore = new Ext.data.Store({
      id: 'loadfindBundleNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfindBundleNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'bundleno'
      ]),
    });


var loadReceiptNodatastore = new Ext.data.Store({
      id: 'loadReceiptNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRecptNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'recptno'
      ]),
    });

var loadDCSizeListDataStore = new Ext.data.Store({
      id: 'loadDCSizeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNosSizeList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_name', 'var_code','dc_custcode','dc_date'
      ]),
    });

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomer"}, // this parameter asks for listing
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


 var loadConverterDataStore = new Ext.data.Store({
      id: 'loadConverterDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadConverters"}, // this parameter asks for listing
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


 var loadSOnodatastore  = new Ext.data.Store({
      id: 'loadSOnodatastore ',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONOList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ordh_sono'
      ]),
    });

var loadDeliveryChallanList = new Ext.data.Store({
      id: 'loadDeliveryChallanList',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dc_no','dc_seqno'
      ]),
    });



var loadDCWeightDataStores = new Ext.data.Store({
      id: 'loadDCWeightDataStores',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNoWeight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dc_custcode', 'weight','var_size2', 'dcs_weight' , 'dcs_receipt'
      ]),
    });

var loadsizedataStore = new Ext.data.Store({
      id: 'loadsizedataStore',
      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name','cust_ref','da_date','ordh_sono','ordh_sodate','ordh_ref','ordh_refdt'
      ]),
    })



var loadsizeDetailsdataStore = new Ext.data.Store({
      id: 'loadsizeDetailsdataStore',
//      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_size1', 'var_size2', 'var_reams', 'var_sheets', 'var_tariffno', 'var_shade', 'var_inchcm','var_gsm'
      ]),
    })


function getSizeChange()
{
	loadsizeDetailsdataStore.removeAll();
	loadsizeDetailsdataStore.load({
	url: 'ClsTrnSalesBundleReceipt.php',
	params: {
	    task: 'loadsizeDetails',
            itemcode : sizecode, // cmbSize.getValue(),
	},
	callback:function() 
	{

             var cnt=loadsizeDetailsdataStore.getCount();
             if(cnt>0)
             { 
                var inchcm = loadsizeDetailsdataStore.getAt(0).get('var_inchcm');
                var inch_to_cm = 1;  
                lblSizeIn .setText('CM');

                txtGSM.setValue(loadsizeDetailsdataStore.getAt(0).get('var_gsm'));
	        txtLength.setRawValue(loadsizeDetailsdataStore.getAt(0).get('var_size1'));
	        txtBreadth.setRawValue(loadsizeDetailsdataStore.getAt(0).get('var_size2'));
	        txtSheets.setValue(loadsizeDetailsdataStore.getAt(0).get('var_sheets'));

               if (inchcm == "I")
                { 
                    inch_to_cm = 2.54;  
                    lblSizeIn .setText('INCH');

                    txtSheetWtFormula.setRawValue( 'GSM :' + txtGSM.getRawValue() + ' X Length : ' + txtLength.getRawValue() + ' * '+ inch_to_cm  +  ' X Breadth : ' + txtBreadth.getRawValue()+ ' * '+ inch_to_cm + ' / 10000000'   );

                }  
                else
                {
                txtSheetWtFormula.setRawValue( 'GSM :' + txtGSM.getRawValue() + ' X Length : ' + txtLength.getRawValue() + ' X Breadth : ' + txtBreadth.getRawValue() + ' / 10000000'  );

                }      
                sheetwt = Number(txtGSM.getValue())* (Number(txtLength.getValue()) * inch_to_cm) * (Number(txtBreadth.getValue())* inch_to_cm)/10000000;
                sheetwt = sheetwt.toFixed(6);
              
                txtSheetWt.setRawValue(sheetwt);




             }                         

      }  
})
}


var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           :  200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {
                       sizecode =  cmbSize.getValue(); 
                       getSizeChange();
             }
	     }
});


function getBundleWt()
{
     var bundwt = 0;
     var reamwt = 0;
     txtBundleWt.setValue(0);
     reamwt = Number(txtNoOfSheets.getValue())* Number(txtSheetWt.getRawValue());
     reamwt = reamwt.toFixed(1);

//     bundwt = Number(txtNoOfSheets.getValue())* Number(txtNoOfReams.getValue())* Number(txtSheetWt.getRawValue());
     bundwt = Number(reamwt)* Number(txtNoOfReams.getValue());
     bundwt = bundwt.toFixed(1);
     txtBundleWt.setRawValue(bundwt);
    

}


var loadEditBundleReceptDetail = new Ext.data.Store({
      id: 'loadEditBundleReceptDetail',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRecptNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'br_no', 'br_date', 'br_cutter', 'br_dcno', 'br_dcdate', 'br_custcode', 'br_sono', 'br_sodate', 'br_originalsize', 'br_finishedsize', 'br_sheets', 'br_reams', 'br_sr_no', 'br_bundwt', 'br_upd',
'dc_seqno', 'dc_no', 'dc_date', 'dc_cutter', 'dc_custcode', 'dc_truck', 'dc_sono', 'dc_sodate','var_name','finishedsize'

	 ]),
    });


var cmbBundRecptNo = new Ext.form.ComboBox({
        fieldLabel      : 'Recpt No',
        width           : 100,
        displayField    : 'br_no', 
        valueField      : 'br_no',
        hiddenName      : '',
        id              : 'cmbBundRecptNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEditBundleRecept,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
                  flxDetails.getStore().removeAll();

                  Ext.getCmp('btnTransfer').show();
                  loadEditBundleReceptDetail.removeAll();
		  loadEditBundleReceptDetail.load({
		  url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadRecptNoDetails',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                    recptno:cmbBundRecptNo.getValue()
                                },
                           	callback:function()
				{
                                  cmbDCNo.setRawValue(loadEditBundleReceptDetail.getAt(0).get('dc_no'));
                                  cmbDCNo.setValue(loadEditBundleReceptDetail.getAt(0).get('dc_no'));
                                  dcseqNumber  = loadEditBundleReceptDetail.getAt(0).get('br_dcno');


                                  cmbDCSize.setValue(loadEditBundleReceptDetail.getAt(0).get('br_originalsize'));
                                  cmbDCSize.setRawValue(loadEditBundleReceptDetail.getAt(0).get('var_name'));

                                  dptBundRecpt.setRawValue(Ext.util.Format.date(loadEditBundleReceptDetail.getAt(0).get('br_date'),"d-m-Y"));
                                 
                                  dptDC.setRawValue(Ext.util.Format.date(loadEditBundleReceptDetail.getAt(0).get('br_dcdate'),"d-m-Y"));
                                  cmbSONO.setValue(loadEditBundleReceptDetail.getAt(0).get('br_sono'));
     //                             sdptSo.setRawValue(Ext.util.Format.date(loadEditBundleReceptDetail.getAt(0).get('br_sodate'),"d-m-Y"));

                                  cmbCustomer.setValue(loadEditBundleReceptDetail.getAt(0).get('br_custcode'));
                                  cmbConverter.setValue(loadEditBundleReceptDetail.getAt(0).get('br_cutter'));

	          

				  txtBundRecptNo.setValue(cmbBundRecptNo.getValue());
//load data in flex - start
                                  var cnt=loadEditBundleReceptDetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 

                                            if (loadEditBundleReceptDetail.getAt(j).get('br_upd') == "Y")
                                               updchk = 1;
                                            var RowCnt = flxDetails.getStore().getCount() + 1;  
                                            flxDetails.getStore().insert(
                                               flxDetails.getStore().getCount(),
                                               new dgrecord({
	                                           ReelSize : loadEditBundleReceptDetail.getAt(j).get('br_originalsize'),
	                                           Size     : loadEditBundleReceptDetail.getAt(j).get('br_finishedsize'),
	                                           Sheets   : loadEditBundleReceptDetail.getAt(j).get('br_sheets'),
						   Reams    : loadEditBundleReceptDetail.getAt(j).get('br_reams'),
						   BundleNo : loadEditBundleReceptDetail.getAt(j).get('br_sr_no'),
                                                   Weight   : loadEditBundleReceptDetail.getAt(j).get('br_bundwt'),
                                                   Update   : loadEditBundleReceptDetail.getAt(j).get('br_upd'),
                                                   Sono     : loadEditBundleReceptDetail.getAt(j).get('br_sono'),
                                                   originalsize   : loadEditBundleReceptDetail.getAt(j).get('var_name'),
                                                   finishedSize     : loadEditBundleReceptDetail.getAt(j).get('finishedsize'),
                                                   DcNo   : loadEditBundleReceptDetail.getAt(j).get('br_dcno'),
                                                   DcDate     : loadEditBundleReceptDetail.getAt(j).get('br_dcdate'),  

                                               })
,
                                       	    );
					   grid_tot();
                                           if (updchk == 1)
                                               Ext.getCmp('btnTransfer').setDisabled(true);  




        				}

			            }
//load data in flex - end
			           loadsizedataStore.load({
                                   url: 'ClsTrnSalesBundleReceipt.php',
                                   params: {
				         task: 'loadsize',
                                  	 customer:cmbCustomer.getValue(),
				         fincode: GinFinid,
                                         compcode:Gincompcode,
		
                                         sono : cmbSONO.getRawValue()
  				    },
                                    callback:function()
                                    {
//           alert(loadsizedataStore.getAt(0).get('var_code')); 
//                                        cmbSize.setRawValue(loadsizedataStore.getAt(0).get('var_name'));  
                                        cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));

                       sizecode = loadsizedataStore.getAt(0).get('var_code');

getSizeChange();
                                    }
                                  });

				}
  			    });

       //        txtBundRecptNo.setValue(cmbBundRecptNo.getValue());
           }
        }
  });  



   var txtBundRecptNo = new Ext.form.NumberField({
        fieldLabel  : 'Recpt No.',
        id          : 'txtBundRecptNo',
        name        : 'txtBundRecptNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



  var dptBundRecpt = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptBundRecpt',
        name: 'dptBundRecpt',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });


   var txtDCWeight = new Ext.form.NumberField({
        fieldLabel  : 'DC. Wt(Kgs)',
        id          : 'txtDCWeight',
        name        : 'txtDCWeight',
        width       :  60,
	readOnly : true,
        tabindex : 2
    });


   var txtRecdWeight = new Ext.form.NumberField({
        fieldLabel  : 'Received ',
        id          : 'txtRecdWeight',
        name        : 'txtRecdWeight',
        width       :  60,
	readOnly : true,
        tabindex : 2
    });



   var txtPendingWeight = new Ext.form.NumberField({
        fieldLabel  : 'Pending',
        id          : 'txtPendingWeight',
        name        : 'txtPendingWeight',
        width       :  60,
	readOnly : true,
        tabindex : 2
    });



   var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


   var txtLength = new Ext.form.NumberField({
        fieldLabel  : 'Length',
        id          : 'txtLength',
        name        : 'txtLength',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtBreadth = new Ext.form.NumberField({
        fieldLabel  : 'Breadth',
        id          : 'txtBreadth',
        name        : 'txtBreadth',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtSize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtSize',
        name        : 'txtSize',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


   var txtSheets = new Ext.form.NumberField({
        fieldLabel  : 'Sheets',
        id          : 'txtSheets',
        name        : 'txtSheets',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



   var txtSheetWt = new Ext.form.NumberField({
        fieldLabel  : 'Sheet Wt',
        id          : 'txtSheetWt',
        name        : 'txtSheetWt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



   var txtSheetWtFormula = new Ext.form.TextField({
        fieldLabel  : 'Sheet WT Formula',
        id          : 'txtSheetWtFormula',
        name        : 'txtSheetWtFormula',
        width       :  400,
	readOnly : true,
        tabindex : 2
    });


   var txtBundleWt = new Ext.form.NumberField({
        fieldLabel  : 'Bundle Wt',
        id          : 'txtBundleWt',
        name        : 'txtBundleWt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

   var txtTotalWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Wt',
        id          : 'txtTotalWt',
        name        : 'txtTotalWt',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



   var txtNoOfSheets = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Sheets',
        id          : 'txtNoOfSheets',
        name        : 'txtNoOfSheets',
        width       :  100,
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},
       	enableKeyEvents: true,
        listeners:{
		keyup:function(){
		   getBundleWt();
		},
        } 
    });


   var txtNoOfReams = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Reams',
        id          : 'txtNoOfReams',
        name        : 'txtNoOfReams',
        width       :  100,
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
       	enableKeyEvents: true,
        listeners:{
		keyup:function(){
		   getBundleWt();
		},
        } 

    });

  

   var txtNoOfBundles = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Bundles',
        id          : 'txtNoOfBundles',
        name        : 'txtNoOfBundles',
        width       :  100,
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
       	enableKeyEvents: true,
        listeners:{
		keyup:function(){
                  if  (Number(txtBundNoFrom.getValue()) > 0)
                  { 
		      txtBundNoTo.setRawValue(txtBundNoFrom.getValue()+ txtNoOfBundles.getValue()-1 );
                  }
                  else   
                  { 
		      txtBundNoTo.setValue('');
                  }
                  txtTotalWt.setValue(Number(txtNoOfBundles.getValue()) * Number(txtBundleWt.getValue())  ) 


		},
        } 

    });

   var txtBundNoFrom = new Ext.form.NumberField({
        fieldLabel  : 'Bund.No. From',
        id          : 'txtBundNoFrom',
        name        : 'txtBundNoFrom',
        width       :  100,
        tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'7'},
       	enableKeyEvents: true,
        listeners:{
		keyup:function(){
                  if  (Number(txtBundNoFrom.getValue()) > 0)
                  { 
		      txtBundNoTo.setRawValue(txtBundNoFrom.getValue()+ txtNoOfBundles.getValue()-1 );
                  }
                  else   
                  { 
		      txtBundNoTo.setValue('');
                  }

		},
        } 

    });



   var txtTotalNoOfBundles = new Ext.form.NumberField({
        fieldLabel  : 'Tot. No.of.Bundles',
        id          : 'txtTotalNoOfBundles',
        name        : 'txtTotalNoOfBundles',
        width       :  100,
        tabindex : 2,
	readOnly : true,
	readOnly : true,
    });


   var txtTotalWeight = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txtTotalWeight',
        name        : 'txtTotalWeight',
        width       :  100,
        tabindex : 2,
    });

   var txtBundNoTo = new Ext.form.NumberField({
        fieldLabel  : 'Bund.No. To',
        id          : 'txtBundNoTo',
        name        : 'txtBundNoTo',
        width       :  100,
        tabindex : 2,
        readOnly    :  true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'7'},

    });

  var dptDC= new Ext.form.DateField({
        fieldLabel: ' DC Date',
        id: 'dptDC',
        name: 'Date',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });



function grid_tot(){

        var wt = 0;	
        var Row= flxDetails.getStore().getCount();
        flxDetails.getSelectionModel().selectAll();
        var sel=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.Weight);
         }

         txtTotalWeight.setValue(Ext.util.Format.number(wt,'0.0'));
         txtTotalNoOfBundles.setValue(i);

}


var btnTransfer = new Ext.Button({
    style   : 'text-align:center;',
    id      : 'btnTransfer',
    text    : "Stock Transer for Invoice",
    width   : 120,
    height  : 30,
    x       : 0,
    y       : 00,
    border  : 1,
    style   : {
              borderColor: 'blue',
              borderStyle: 'solid',
    },
    bodyStyle:{"background-color":"#ebebdf"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    listeners:{
        click: function(){  

	   Ext.MessageBox.show({
           title: 'Confirmation',
           icon: Ext.Msg.QUESTION,
	   buttons: Ext.MessageBox.YESNO,
           msg: "Do You Want to Transfer the Stock",
    	   fn: function(btn)
	   {         
	      if (btn == 'yes')
              {   
               var finData = flxDetails.getStore().getRange();                                        
	       var finupdData = new Array();
               Ext.each(finData, function (record) {
               finupdData.push(record.data);
               });  


               Ext.Ajax.request({
               url: 'TrnSalesBundleStockTransfer.php',
               params:
		{
                savetype:gstFlag,
                cnt: finData.length,
                griddet: Ext.util.JSON.encode(finupdData),
		compcode :Gincompcode,
		fincode :GinFinid,  
    
                receiptno : txtBundRecptNo.getRawValue(),
                receiptdate :Ext.util.Format.date(dptBundRecpt.getValue(),"Y-m-d"),	
		cutter : cmbConverter.getValue(),
                seqno : cmbDCNo.getValue(),	
                dcno : cmbDCNo.getRawValue(),
                dcdate :Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),	
//sodate provision 
		party : cmbCustomer.getValue(),

                originalsize : cmbDCSize.getValue(),
                finishedsize : cmbSize.getValue(),

		sono: cmbSONO.getRawValue(),
 		sodt:Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),       

        	},
                callback: function(options, success, response)
                {
		         var obj = Ext.decode(response.responseText);
			if (obj['success']==="true")
			{                                
			    Ext.MessageBox.alert("Stock Transferred -" + obj['dcno']);
			    BundleReceiptPanel.getForm().reset();
			    flxDetails.getStore().removeAll();
			    RefreshData(); 
		        }
                }  
              })
	     }
           }
              })
	     }
           }    
});

function check_finstk_reelno()
{
 alert(txtBundNoFrom.getValue());
 alert(txtBundNoTo.getValue());


            for (var  i= txtBundNoFrom.getValue() ;i<txtBundNoTo.getValue() ;i++){
            checkfinishedstockstore.removeAll();
	    checkfinishedstockstore.load({
	    url: 'ClsTrnSalesBundleReceipt.php', // File to connect to
	    params:
		    {
		        task      : "CheckNumber_finished",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        rbno      : i,
		        rbunit    : 2, 
		    },
	    scope:this,
	    callback: function () {

                   if (checkfinishedstockstore.getAt(0).get('nos') > 0) {
		   alert("The Number " + i + " Alerady entered in the Entry No. " + checkfinishedstockstore.getAt(0).get('stk_ent_no') +  " in the Date of " + checkfinishedstockstore.getAt(0).get('stk_ent_date') ) ;
bundle_found = 1;
alert(bunde_found);
                   }
            }
            });
            }
}

var breakloop =0;
var btnValidation = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Number Validation",
    width   : 80,
    height  : 30,
    x       : 0,
    y       : 00,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

bodyStyle:{"background-color":"#ebebdf"},
    	labelStyle	: "font-size:12px;font-weight:bold;",
    //	style      :"border-radius: 5px;  textTransform: uppercase ", 
 listeners:{
        click: function(){    


           var pendwt =  Number(txtPendingWeight.getValue()) +100;
           var finwt  =  Number(txtBundleWt.getValue()) * Number(txtNoOfBundles.getValue()) ;

           finwt = Ext.util.Format.number( finwt,'0.0'); 
 

           if (Number(pendwt) > Number(finwt)) 
           {
          
	    var gstadd="true";
            bundle_found = 0;


            checkfinishedstockstore.removeAll();
	    checkfinishedstockstore.load({
	    url: 'ClsTrnSalesBundleReceipt.php', // File to connect to
	    params:
		    {
		        task      : "CheckNumber_finished",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
//		        rbno      : i,
		        //rbunit    : 2, 
		    },
	    scope:this,
	    callback: function () {
           	var chkNumber = checkfinishedstockstore.getCount(); 
                if (chkNumber > 0) {
		   for(var j=0;j<chkNumber;j++)
	           {  
                        breakloop =0; 
			for(var i=Number(txtBundNoFrom.getValue());i<= Number(txtBundNoTo.getValue());i++)
			{
                            if(checkfinishedstockstore.getAt(j).get('stk_sr_no')  == i)
                            {
                                   alert("Bundle Number " + i  + "  alerady entered");
                                   bundle_found =1;  
                                   break;
                                   breakloop =1;  
                                   break;
                            }     
                            if (breakloop =1)  
                               break;
                        } 
                   }
                }   
                if (bundle_found == 0) 
                    Ext.getCmp('btnAdd').setDisabled(false);  
                else
                    Ext.getCmp('btnAdd').setDisabled(true);  
           
            } 
            });





            checkBundleNoDataStore.removeAll();
	    checkBundleNoDataStore.load({
	    url: 'ClsTrnSalesBundleReceipt.php', // File to connect to
	    params:
		    {
		        task      : "CheckBundleNumber",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
//		        rbno      : i,
		        //rbunit    : 2, 
		    },
	    scope:this,
	    callback: function () {
           	var chkNumber = checkBundleNoDataStore.getCount(); 
                if (chkNumber > 0) {
		   for(var j=0;j<chkNumber;j++)
	           {  
                        breakloop =0; 
			for(var i=Number(txtBundNoFrom.getValue());i<= Number(txtBundNoTo.getValue());i++)
			{
                            if(checkBundleNoDataStore.getAt(j).get('br_sr_no')  == i)
                            {
                                   alert("Bundle Number " + i  + "  alerady entered");
                                   bundle_found =1;  
                                   break;
                                   breakloop =1;  
                                   break;
                            }     
                            if (breakloop =1)  
                               break;
                        } 
                   }
                }   
                if (bundle_found == 0) 
                    Ext.getCmp('btnAdd').setDisabled(false);  
                else
                    Ext.getCmp('btnAdd').setDisabled(true);  

            } 
            });
            }
            else
            { 
                alert("Finished Qty is higher than the DC Pending Quantity ..");
            }     
            }

        }     

});

var btnAdd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 30,
    id      : 'btnAdd',
    x       : 0,
    y       : 00,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

bodyStyle:{"background-color":"#ebebdf"},
    	labelStyle	: "font-size:12px;font-weight:bold;",
    //	style      :"border-radius: 5px;  textTransform: uppercase ", 
 listeners:{
        click: function(){              
	    var gstadd="true";

          //  check_finstk_reelno();

	    if(Number(txtNoOfSheets.getValue())== 0 )
	    {
		alert("Enter Number of Sheets..");
                gstadd="false";
                txtNoOfSheets.setFocus();
	    }

	    if(Number(txtNoOfReams.getValue())== 0 )
	    {
		alert("Enter Number of Reams..");
                gstadd="false";
                txtNoOfReams.setFocus();
	    }
	    if(Number(txtBundleWt.getValue())== 0 )
	    {
		alert("Bundle Weight is Zero..");
                gstadd="false";

	    }

            if(gstadd=="true")
            { 
                flxDetails.getSelectionModel().selectAll();
                var selrows = flxDetails.getSelectionModel().getCount();
                var sel = flxDetails.getSelectionModel().getSelections();
                var cnt = 0;
/*
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.sizecode === cmbsizelist.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }
*/



        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetails.getStore().indexOf(editrow);
			sel[idx].set('Sheets' , txtNoOfSheets.getValue());
			sel[idx].set('Reams' , txtNoOfReams.getValue());
			sel[idx].set('Weight' , txtBundleWt.getRawValue());
			flxDetails.getSelectionModel().clearSelections();
                } else
                {      
			for(var i=Number(txtBundNoFrom.getValue());i<= Number(txtBundNoTo.getValue());i++)
			{
                        var RowCnt = flxDetails.getStore().getCount() + 1;
                        flxDetails.getStore().insert(
                        flxDetails.getStore().getCount(),
                        new dgrecord({

                                   originalsize : cmbDCSize.getRawValue(),
                                   finishedSize : cmbSize.getRawValue(),

                                   ReelSize : cmbDCSize.getValue(),
                                   Size     : cmbSize.getValue(),
     		                       Sheets   : txtNoOfSheets.getValue(),
		                           Reams    : txtNoOfReams.getValue(),
                                   Sono     : cmbSONO.getValue(),
			                       BundleNo : i,
                                   Weight   : txtBundleWt.getRawValue(),
                                   Update   : 'N',
                                   DcNo     : cmbDCNo.getValue(),
                                   DcDate   : Ext.util.Format.date(dptDC.getValue(),"Y-m-d")  ,

                               }) 
                               );
                        }
                        txtBundNoFrom.setValue(txtBundNoTo.getValue()+1);
                        txtBundNoTo.setValue('');
                        txtNoOfBundles.setValue('');                        
                        txtTotalWt.setValue('');

                }

             }
 grid_tot();
        }
  }
});


var dgrecord = Ext.data.Record.create([]);
var flxDetails = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:0,
    height: 200,
    hidden:false,
    width: 800,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "Reel Size", dataIndex: 'ReelSize',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},	
        {header: "Original Size", dataIndex: 'originalsize',sortable:false,width:180,align:'left', menuDisabled: true},	
        {header: "Cutting Size", dataIndex: 'Size',sortable:false,width:100,align:'left', menuDisabled: true,hidden:true},	
        {header: "Finished Size", dataIndex: 'finishedSize',sortable:false,width:200,align:'left', menuDisabled: true},	
        {header: "No.of.Sheets", dataIndex: 'Sheets',sortable:false,width:110,align:'left', menuDisabled: true},	
        {header: "No.of.Reams" , dataIndex: 'Reams',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Bundle NO" , dataIndex: 'BundleNo',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Bundle Wt" , dataIndex: 'Weight',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "SO NO" , dataIndex: 'Sono',sortable:false,width:110,align:'left', menuDisabled: true},

        {header: "UPDATED" , dataIndex: 'Update',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "DC NO" , dataIndex: 'DcNo',sortable:false,width:60,align:'left', menuDisabled: true},
        {header: "DC DATE" , dataIndex: 'DcDate',sortable:false,width:120,align:'left', menuDisabled: true},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	

            'cellclick': function (flxDetails, rowIndex, cellIndex, e) {

  
             }  ,
 

            'cellDblclick': function (flxDetails, rowIndex, cellIndex, e) {

             if (cellIndex != 16)
             {
             Ext.Msg.show({
             title: 'SO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
	              alert("No Modification option");

	              }
		      else if (btn === 'no')
                      {
		                    var sm = flxDetails.getSelectionModel();
		                    var selrow = sm.getSelected();
                                    upd = selrow.get('Update');
             
                                    if (upd == "Y") 
                                    {
                                       alert("Stock Transferred for Invoice.   So You can't Delete");
                                    }
                                    else
                                    {
                                       flxDetails.getStore().remove(selrow);
		                       flxDetails.getSelectionModel().selectAll();
                                    }
		     
		      }
                     grid_tot();

             } 
        });
   }
   }
}
});

var cmbDCNo = new Ext.form.ComboBox({
        fieldLabel      : 'DC No',
        width           : 100,
        displayField    : 'dc_no', 
        valueField      : 'dc_seqno',
        hiddenName      : '',
        id              : 'cmbDCNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDeliveryChallanList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {

       			txtDCWeight.setRawValue(''); 
       			txtRecdWeight.setRawValue(''); 
       			txtPendingWeight.setRawValue(''); 


                    loadDCWeightDataStores.removeAll();
                    txtDCWeight.setRawValue(0);
                    loadDCSizeListDataStore.removeAll();
                    loadDCSizeListDataStore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadDCNosSizeList',
		            fincode    : GinFinid,
			    compcode   : Gincompcode,
                            cuttercode : cmbConverter.getValue(),
                            dcseqno    : cmbDCNo.getValue(),
                        },
                       	callback:function()
			{
   //                          var cnt=loadDCWeightDataStores.getCount();
//	                     if(cnt>0)
//               			txtDCWeight.setValue(loadDCWeightDataStores.getAt(0).get('weight'));  
//                        txtDCNo.setValue(cmbDCNo.getValue());
                        dptDC.setRawValue(Ext.util.Format.date(loadDCSizeListDataStore.getAt(0).get('dc_date'),"d-m-Y"));
                        cmbCustomer.setValue(loadDCSizeListDataStore.getAt(0).get('dc_custcode'));

                        dcseqNumber = cmbDCNo.getValue();
  
			loadSOnodatastore.removeAll();
			loadSOnodatastore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadSONOList',
			    customer:cmbCustomer.getValue(),
			    fincode: GinFinid,
			    compcode: Gincompcode,
			    custcode : loadDCSizeListDataStore.getAt(0).get('dc_custcode'),
			},
			callback:function() 
			{

			        cmbSONO.setValue(loadSOnodatastore.getAt(0).get('ordh_sono'));
				loadsizedataStore.removeAll();
				loadsizedataStore.load({


				url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
			            sono : loadSOnodatastore.getAt(0).get('ordh_sono'),
				},
				callback:function()
				{

                                }
                                })      

                      }  


                      })


                        }
                    });            


  
           }
        }
                       
});


var sizewt = 0;



var cmbDCSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbDCSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDCSizeListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
       			txtDCWeight.setRawValue(''); 
       			txtRecdWeight.setRawValue(''); 
       			txtPendingWeight.setRawValue(''); 
                    loadDCWeightDataStores.removeAll();
                    loadDCWeightDataStores.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadDCNoWeight',
		            fincode  : GinFinid,
			    compcode : Gincompcode,
                            seqno    : cmbDCNo.getValue(),
                            sizecode : cmbDCSize.getValue(),
                        },
                       	callback:function()
			{
                             var cnt=loadDCWeightDataStores.getCount();
	                     if(cnt>0)


//                      txtTotQty.setValue(Ext.util.Format.number(wt,'0.000'));


                  		sizewt = Number(loadDCWeightDataStores.getAt(0).get('weight')); 

               			txtDCWeight.setRawValue(Ext.util.Format.number(loadDCWeightDataStores.getAt(0).get('dcs_weight'),'0.0')); 
               			txtRecdWeight.setRawValue(Ext.util.Format.number(loadDCWeightDataStores.getAt(0).get('dcs_receipt'),'0.0')); 
               			txtPendingWeight.setRawValue(Ext.util.Format.number(loadDCWeightDataStores.getAt(0).get('weight'),'0.0')); 
 

                                 txtSize.setRawValue(loadDCWeightDataStores.getAt(0).get('var_size2'));  
                        }
                    });            


  
           }
        }
                       
});

var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {

       			txtDCWeight.setRawValue(''); 
       			txtRecdWeight.setRawValue(''); 
       			txtPendingWeight.setRawValue(''); 

			loadSOnodatastore.removeAll();
			loadSOnodatastore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadSONOList',
			    customer:cmbCustomer.getValue(),
			    fincode: GinFinid,
			    compcode: Gincompcode,
			    custcode : cmbCustomer.getValue(),
			},
			callback:function() 
			{

			        cmbSONO.setValue(loadSOnodatastore.getAt(0).get('ordh_sono'));
				loadsizedataStore.removeAll();
				loadsizedataStore.load({


				url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
			            sono : loadSOnodatastore.getAt(0).get('ordh_sono')
				},
				callback:function()
				{

                                }
                                })      
                      }  
})
}}
});

var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : 'SO No.',
        width           : 110,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSOnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
             select: function () {
			loadsizedataStore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadsize',
			    customer:cmbCustomer.getValue(),
			    fincode: GinFinid,
			    compcode:Gincompcode,
			    sono : cmbSONO.getRawValue()
			},
			callback:function()
			{
                        }
                        });  
		     }
             } 
});



var cmbConverter = new Ext.form.ComboBox({
        fieldLabel      : 'Converter',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbConverter',
        typeAhead       : true,
        mode            : 'local',
        store           : loadConverterDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
            select: function () {

                    cmbDCNo.clearValue();
                    cmbDCSize.clearValue();
                    txtPendingWeight.setRawValue(0); 
                    loadDCSizeListDataStore.removeAll();
                    loadDCWeightDataStores.removeAll();
                    txtDCWeight.setRawValue(0);
                    loadDeliveryChallanList.removeAll();
                    loadDeliveryChallanList.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadDCNoList',
		            fincode: GinFinid,
			    compcode:Gincompcode,
                            cuttercode : cmbConverter.getValue(),
                        }

                    });     

	   }
       }
});

var BundleReceiptPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES BUNDLE RECEIPT ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'BundleReceiptPanel',
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
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                    gstFlag = "Edit";
                    Ext.getCmp('cmbBundRecptNo').show();

//EDIT
//                    flxDetails.getStore().removeAll();
                    loadEditBundleRecept.load({
				url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadRecptNoEdit',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                }

                    });     

                }
            }
        },'-',
          {
//SAVE
            text: 'Save',
            id:'save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {

//alert(gstFlag);
                        if(cmbConverter.getRawValue()=="" || cmbConverter.getValue()==0)
			{
				alert("Select Customer..");
			}
         
                   	else if(cmbSONO.getRawValue()=="" || cmbSONO.getValue()==0)
			{
				alert("Select SOC No..");
                        } 
                        else if(Ext.util.Format.date(dptBundRecpt.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Receipt Date is not in current finance year. Please check");
                         } 
			else if (flxDetails.rows == 0)
	                    {
	                        Ext.Msg.alert('Bundle Receipt','Grid should not be empty..');
	                        gstSave="false";
	                    } 
             		else
			{               

/*
                                          if (gstFlag == 'Add') {
                                               msg: 'Do You Want to save the Record',
                                           }
                                           else
                                           {
                                               msg: 'Do You Want to Modify the Record',
                                           }  
*/
					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
                                           msg: "Do You Want to Save  the Record",
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetails.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  


//             Ext.getCmp('save').setDisabled(true);




//       alert(gstFlag);
                                               Ext.Ajax.request({
				               url: 'TrnSalesBundleReceiptSave.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode :GinFinid,  
                                    
 		                                receiptno : txtBundRecptNo.getRawValue(),
                                                receiptdate :Ext.util.Format.date(dptBundRecpt.getValue(),"Y-m-d"),	
						cutter       : cmbConverter.getValue(),
 		                                seqno        : dcseqNumber,	
 		                                dcno         : cmbDCNo.getRawValue(),
                                                dcdate       : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),	
//sodate provision 
						party        : cmbCustomer.getValue(),
                                                originalsize : cmbDCSize.getValue(),
                                                finishedsize : cmbSize.getValue(),
						sono         : cmbSONO.getRawValue(),
                                 		sodt         : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),       

                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Delivery Challan No -" + obj['dcno']);
	                                    BundleReceiptPanel.getForm().reset();
	                                    flxDetails.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
          Ext.MessageBox.alert("Delivery Challan Not Saved! Pls Check!- " + obj['dcno']);                                                  
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


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&dcno=" + String(encodeURIComponent(txtDCNo.getValue()));
                var param = (p1+p2+p3) ;


alert(param);
                if (printtype == "PDF") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&' + param, '_blank');

;
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
                    BundleReceiptWindow.hide();
                }
            }
        }

        ]      
     } ,
    items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 480,
           height      : 200,
           x           : 10,
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
                       items: [txtBundRecptNo]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbBundRecptNo]
                   },


               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptBundRecpt]
   		  },



                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 35,
                       border      : false,
                       items: [cmbConverter]
                   },



                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 70,
                       border      : false,
                       items: [cmbDCNo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 70,
	               border      : false,
                       items: [dptDC]
   		  },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 105,
                       border      : false,
                       items: [cmbDCSize]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 30,
                       width       : 400,
                       x           : 300,
                       y           : 105,
                       border      : false,
                       items: [txtSize]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 300,
                       x           : 0,
                       y           : 140,
                       border      : false,
                       items: [txtDCWeight]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 300,
                       x           : 160,
                       y           : 140,
                       border      : false,
                       items: [txtRecdWeight]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 60,
                       width       : 300,
                       x           : 310,
                       y           : 140,
                       border      : false,
                       items: [txtPendingWeight]
                   },


                  ] 
            },

           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 480,
           height      : 300,
           x           : 10,
           y           : 220,
           border      : true,
           layout      : 'absolute',
           items:[ 
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbCustomer]
                   },



                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 40,
                       border      : false,
                       items: [cmbSONO]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 80,
                       border      : false,
                       items: [cmbSize]
                   },



			 {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 300,
                            y           : 80,
                            border      : false,
                            items: [lblSizeIn]
                        },




                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 120,
                       border      : false,
                       items: [txtGSM]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 160,
                       border      : false,
                       items: [txtLength]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 200,
                       border      : false,
                       items: [txtBreadth]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 240,
                       border      : false,
                       items: [txtSheets]
                   },
           ]
           } ,

           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 800,
           height      : 511,
           x           : 500,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[

                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 450,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [txtSheetWt]
                   },

                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 600,
                       x           : 220,
                       y           : 0,
                       border      : false,
                       items: [txtSheetWtFormula]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 0,
                       y           : 40,
                       border      : false,
                       items: [txtNoOfSheets]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 100,
                       width       : 400,
                       x           : 0,
       		       y           : 80,
	               border      : false,
                       items: [txtNoOfReams]
   		  },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 100,
                       width       : 400,
                       x           : 0,
       		       y           : 120,
	               border      : false,
                       items: [txtBundleWt]
   		  },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 0,
                       y           : 160,
                       border      : false,
                       items: [txtNoOfBundles]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 230,
                       y           : 160,
                       border      : false,
                       items: [txtTotalWt]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 400,
                       x           : 0,
                       y           : 200,
                       border      : false,
                       items: [txtBundNoFrom]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 230,
                       y           : 200,
                       border      : false,
                       items: [txtBundNoTo]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 450,
                       y           : 160,
                       border      : false,
                       items: [btnValidation]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 450,
                       y           : 200,
                       border      : false,
                       items: [btnAdd]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 500,
                       y           : 20,
                       border      : false,
                       items: [btnTransfer]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 100,
                       width       : 800,
                       x           : 0,
                       y           : 230,
                       border      : false,
                       items: [flxDetails]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 0,
                       y           : 450,
                       border      : false,
                       items: [txtTotalNoOfBundles]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 230,
                       y           : 450,
                       border      : false,
                       items: [txtTotalWeight]
                   },





           ]
           },    



        ],  

});

   function RefreshData(){
            gstFlag = "Add";
            updchk = 0;
            Ext.getCmp('cmbBundRecptNo').hide();
            Ext.getCmp('btnAdd').setDisabled(true);  
            Ext.getCmp('btnTransfer').hide();
            Ext.getCmp('btnTransfer').setDisabled(false);  

            BundleReceiptPanel.getForm().reset();

                  loadConverterDataStore.load({
                  url: 'ClsTrnSalesBundleReceipt.php',
                  params: {
                  task: 'loadConverters',
		  fincode:GinFinid,
		  compcode:Gincompcode,
                  }
               });

            loadReceiptNodatastore.load({
                url: 'ClsTrnSalesBundleReceipt.php',
                params: {
                    task: 'loadRecptNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtBundRecptNo.setValue(loadReceiptNodatastore.getAt(0).get('recptno'));
		}
            });


            loadfindBundleNodatastore.load({
                url: 'ClsTrnSalesBundleReceipt.php',
                params: {
                    task: 'loadfindBundleNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtBundNoFrom.setValue(loadfindBundleNodatastore.getAt(0).get('bundleno'));
		}
            });


}

var BundleReceiptWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 30,
        title       : 'SALES - SHEET CONVERSION - BUNDLE RECEIPT ENTRY',
        items       : BundleReceiptPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : true,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
            show:function(){

               RefreshData();

        } 
        }
    });
	
       BundleReceiptWindow.show();  
});
