Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');


   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;   
   var gstFlag = "Add";
  var printtype='PDF';

var rep = "Date-DC-Reelwise";
var seqno = 0

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
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
		{boxLabel: 'XLS', name: 'optprinttype', id:'optXLS', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTH";


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
    width:190,
    height:180,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optrep',
        items: [
            {boxLabel: 'Date-DC-Reelwise' , name: 'optrep', id:'optDDN', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Date-DC-Reelwise";	
	
                    }                       
                     }
                 }
            },
            {boxLabel: 'Date-DC-Sizewise' , name: 'optrep', id:'optDCsizew', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Date-DC-Sizewise";	
	
                    }                       
                     }
                 }
            },
            {boxLabel: 'Datewise Delivery Challan' , name: 'optrep', id:'optDatewsise', inputValue: 3,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Datewise Delivery Challan";	
	
                    }                       
                     }
                 }
            },
            {boxLabel: 'Datewise Bundle Receipt' , name: 'optrep', id:'optDatewiseBund', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Datewise Bundle Receipt";	
	
                    }                       
                     }
                 }
            },
            {boxLabel: 'DCwise Pending' , name: 'optrep', id:'optDCPending', inputValue: 5,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "DCwise Pending";	
	
                    }                       
                     }
                 }
            },
        ]


    },
    ]



});
 
   var txtDCNo = new Ext.form.NumberField({
        fieldLabel  : 'DC No.',
        id          : 'txtDCNo',
        name        : 'txtDCNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



  var txtPartyRef = new Ext.form.NumberField({
        fieldLabel  : 'Party Order.',
        id          : 'txtPartyRef',
        name        : 'txtPartyRef',
        width       :  200,
	readOnly : true,
        tabindex : 2
    });


  var txtTruck = new Ext.form.TextField({
        fieldLabel  : 'Truck',
        id          : 'txtTruck',
        name        : 'txtTruck',
        width       :  120,
        tabindex : 2
    });


  var dptDC= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptDC',
        name: 'Date',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
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



  var sdptSo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'sdptSo',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });

  var dptPartyRef= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptPartyRef',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date()
    });

   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address 1',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  300,
        tabindex : 2
    });


   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address 2',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  300,
        tabindex : 2
    });


   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address 3',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  300,
        tabindex : 2
    });

   var txtCity = new Ext.form.TextField({
        fieldLabel  : 'City',
        id          : 'txtCity',
        name        : 'txtCity',
        width       :  300,
        tabindex : 2,
    });



   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin ',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  100,
        tabindex : 2
    });


   var txtGST = new Ext.form.TextField({
        fieldLabel  : 'GST ',
        id          : 'txtGST',
        name        : 'txtGST',
        width       :  150,
        tabindex : 2
    });




 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
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


 var loadSOCustomerStore = new Ext.data.Store({
      id: 'loadSOCustomerStore',
 //     autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOcustomer"}, // this parameter asks for listing
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

var loaditemstockdatastore = new Ext.data.Store({
      id: 'loaditemstockdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemstockqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk','stk_units'
      ]),
    });

var loadinvoicetypedataStore = new Ext.data.Store({
      id: 'loadinvoicetypedataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvtype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_code','type_name'
      ]),
    });

var loadsizedataStore = new Ext.data.Store({
      id: 'loadsizedataStore',
      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
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
    });

var loaddanodatastore = new Ext.data.Store({
      id: 'loaddanodatastore',
autoLoad: true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddano"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_no'
      ]),
    });

var loadcusttypedatastore = new Ext.data.Store({
      id: 'loadcusttypedatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcusttype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_type','cust_repr'
      ]),
    });


var loadSOnodatastore = new Ext.data.Store({
      id: 'loadSOnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono','ordh_sodate'
      ]),
    });

var loaddetailsdatastore= new Ext.data.Store({
      id: 'loaddetailsdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadqtydet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_urate','wt'
      ]),
    });

var loadfromtoboxDatastore= new Ext.data.Store({
      id: 'loadfromtoboxDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfromtobox"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','rollno','stk_sono'
      ]),
    });

var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgriddetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','stk_var_code','var_name','stk_sr_no','stk_wt','var_code','unittype','var_grpcode','stk_sono','ordh_sodate'
      ]),
    });

var loadEditDeliveryChallan = new Ext.data.Store({
      id: 'loadEditDeliveryChallan',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNoEdit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dc_no','dc_seqno'
      ]),
    });

var loadEditDeliveryChallandetail = new Ext.data.Store({
      id: 'loadEditDeliveryChallandetail',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"EditDCNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_name','type_code','dc_sono','dc_sodate','dc_rate','varcode','var_name','var_grpcode','cust_code','cust_ref','dc_wt','dc_sr_no','dc_srno_fincode','dc_size',
'dc_truck' ,'dc_date','dc_seqno' ,'dc_cutter','dcs_cuttingsize','dc_deliveryAdd1', 'dc_deliveryAdd2', 'dc_deliveryAdd3', 'dc_deliverycity', 'dc_delivery_pin', 'dc_delivery_GSTin','dc_type','dcs_receipt'

 ]),
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
        store           : loadEditDeliveryChallan,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {
              
             flxDetail.getStore().removeAll();

               txtDCNo.setValue(cmbDCNo.getValue());
/*
               loadAllCustomerStore.removeAll();
               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesDeliveryChallan.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),
                  entrychk : gstFlag,
                  }
               });
*/
                  var processwt = 0;
                  loadEditDeliveryChallandetail.removeAll();
		  loadEditDeliveryChallandetail.load({
		  url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'EditDCNo',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                    dcno:cmbDCNo.getValue()
                                },
                           	callback:function()
				{
                                  cmbDCType.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_type'));
                                  seqno = loadEditDeliveryChallandetail.getAt(0).get('dc_seqno');

                                  dptDC.setRawValue(Ext.util.Format.date(loadEditDeliveryChallandetail.getAt(0).get('dc_date'),"d-m-Y"));
                                  cmbSONO.setRawValue(loadEditDeliveryChallandetail.getAt(0).get('dc_sono'));
                                  cmbSONO.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_sono'));
                                  sdptSo.setRawValue(Ext.util.Format.date(loadEditDeliveryChallandetail.getAt(0).get('dc_sodate'),"d-m-Y"));

//                                  cmbCustomer.setRawValue(loadEditDeliveryChallandetail.getAt(0).get('cust_ref'));
                                  cmbCustomer.setValue(loadEditDeliveryChallandetail.getAt(0).get('cust_code'));
                                  cmbConverter.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_cutter'));

				  txtTruck.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_truck'));
          
				  txtAddr1.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_deliveryAdd1'));
				  txtAddr2.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_deliveryAdd2'));
				  txtAddr3.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_deliveryAdd3'));
				  txtCity.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_deliverycity'));
				  txtPin.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_delivery_pin'));
				  txtGST.setValue(loadEditDeliveryChallandetail.getAt(0).get('dc_delivery_GSTin'));


				  txtDCNo.setRawValue(cmbDCNo.getRawValue());
//load data in flex - start
                                  var cnt=loadEditDeliveryChallandetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 
                                            processwt  = Number(processwt)+Number(loadEditDeliveryChallandetail.getAt(j).get('dcs_receipt'));
				   	    var stk_finyear    = loadEditDeliveryChallandetail.getAt(j).get('dc_srno_fincode');
                                   	    var stk_var_code   = loadEditDeliveryChallandetail.getAt(j).get('dc_size');
	                           	    var var_desc       = loadEditDeliveryChallandetail.getAt(j).get('var_name');
                                            var stk_sr_no      = loadEditDeliveryChallandetail.getAt(j).get('dc_sr_no');
                            	   	    var stk_wt         = loadEditDeliveryChallandetail.getAt(j).get('dc_wt');
                                   	    var var_grpcode    = loadEditDeliveryChallandetail.getAt(j).get('var_grpcode');
                                            var RowCnt = flxDetail.getStore().getCount() + 1;  
                                            flxDetail.getStore().insert(
                                               flxDetail.getStore().getCount(),
                                               new dgrecord({
	                                           varname     : var_desc,		
						   stksrno     : stk_sr_no,
						   stkwt       : stk_wt,
                                                   rate        : loadEditDeliveryChallandetail.getAt(j).get('dc_rate'),	 
						   varcode     : stk_var_code,
						   vargrpcode  : var_grpcode,
						   stkfinyear  : stk_finyear,
						   stkfincode  : stk_finyear,
                                                   soentno     : loadEditDeliveryChallandetail.getAt(j).get('dc_sono'),	
                                                   soentdate   : loadEditDeliveryChallandetail.getAt(j).get('dc_sodate'),
                                                   cuttingsize : loadEditDeliveryChallandetail.getAt(j).get('dcs_cuttingsize')
 	
                                               })
                                       	    );

					   grid_tot();

        				}

                                    if (processwt > 0 )
                                    { 
                                        Ext.getCmp('save').setDisabled(true);
alert("DC - Already processed and Receipt entries are made. Can't Modifty");
                                    }        
                                    else
                                        Ext.getCmp('save').setDisabled(false);

			            }
//load data in flex - end
			           loadsizedataStore.load({
                                   url: 'ClsTrnSalesDeliveryChallan.php',
                                   params: {
				         task: 'loadsize',
                                  	 customer:cmbCutter.getValue(),
				         fincode: GinFinid,
                                         compcode:Gincompcode,
		
                                         sono : cmbSONO.getRawValue()
  				    },
                                    callback:function()
                                    {
//           alert(loadsizedataStore.getAt(0).get('var_code')); 
//                                        cmbSize.setRawValue(loadsizedataStore.getAt(0).get('var_name'));  
                                        cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
                                    }
                                  });

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
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
        }  
});


var cmbDCType = new Ext.form.ComboBox({
        fieldLabel      : 'DC TYPE',
        width           : 130,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbDCType',
        typeAhead       : true,
        mode            : 'local',
        store: [['S','Sheet Conversion'],['R','Reel Conversion']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
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
        store           : loadSOCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
                        flxstartno.getStore().removeAll();
                        flxendno.getStore().removeAll();

                                       txtRate.setValue('');	
					loadSOnodatastore.removeAll();
					loadSOnodatastore.load({
					url: 'ClsTrnSalesDeliveryChallan.php',
					params: {
					    task: 'loadSOno',
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


						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loadsize',
						    customer:cmbCustomer.getValue(),
						    fincode: GinFinid,
						    compcode:Gincompcode,
					            sono : loadSOnodatastore.getAt(0).get('ordh_sono')
						},
						callback:function()
						{
		//alert(loadsizedataStore.getCount());
						
				                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
				                sdptSo.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_sodate'),"d-m-Y"));
				                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));
			
			cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
/*
						loaddetailsdatastore.load({
						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
//						    dano : loaddanodatastore.getAt(0).get('da_no'),
						    sono : loadSOnodatastore.getAt(0).get('da_ackno'),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
// alert(loaddetailsdatastore.getCount());
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');

txtRate.setValue( loaddetailsdatastore.getAt(0).get('da_urate'));
						}
						});
*/
loadfromtoboxDatastore.removeAll();
//txtCuttingSize.setValue('');
rbunit=0;
					        loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),
                                         	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),

						},
						callback:function()
						{


//
//						txtCuttingSize.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		//rbunit = loaditemstockdatastore.getAt(0).get('stk_units');

						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
//						    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),
                                        	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();

						}
						});
						}
					    });//loadsize
					}
					});//loadSOno


				loadcusttypedatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'loadcusttype',
				    custcode:cmbCustomer.getValue(),
		                  },
                         	callback:function()
				{

//				alert(loadcusttypedatastore.getAt(0).get('cust_type'));
//                                custtype = loadcusttypedatastore.getAt(0).get('cust_type');
                                repcode = loadcusttypedatastore.getAt(0).get('cust_repr');

				}
			    });
			   }
		     }
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
                               txtRate.setValue('');	 
				loadsizedataStore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    sono : cmbSONO.getRawValue()
				},
				callback:function()
				{
//alert(loadsizedataStore.getCount());
		
                                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
                                sdptSo.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_sodate'),"d-m-Y"));
                                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));
                                cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
				loaddetailsdatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				          task: 'loadqtydet',
				          custcode:cmbCustomer.getValue(),
				          fincode:GinFinid,
				          compcode:Gincompcode,
					  sono : cmbSONO.getRawValue(),
			                  sizecode : loadsizedataStore.getAt(0).get('var_code')
					},
			        	callback:function()
		         		{
					   txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
					   var rate = loaddetailsdatastore.getAt(0).get('da_urate');
                                           txtRate.setValue( loaddetailsdatastore.getAt(0).get('da_urate'));
					}
					});

					loaditemstockdatastore.load({
						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),
						    sono : cmbSONO.getRawValue(),
						},
						callback:function()
						{

//						txtCuttingSize.setValue(loaditemstockdatastore.getAt(0).get('stk'));

						}
						});


						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptDC ,
                                  		    sono : cmbSONO.getRawValue(),
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();
				}
			    });
			   }
		     }
		});



var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 200,
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

                        flxstartno.getStore().removeAll();
                        flxendno.getStore().removeAll();

                        loaddetailsdatastore.removeAll();
			loaddetailsdatastore.load({
			url: 'ClsTrnSalesDeliveryChallan.php',
			params: {
			    task: 'loadqtydet',
			    custcode : cmbCustomer.getValue(),
			    fincode  : GinFinid,
			    compcode : Gincompcode,

			    sono     : cmbSONO.getRawValue(),
			    sizecode : cmbSize.getValue()
			},
			callback:function()
			{

//alert(loaddetailsdatastore.getCount());

				txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
				var rate = loaddetailsdatastore.getAt(0).get('da_urate');
                                txtRate.setValue(rate);
				loaditemstockdatastore.load({
					url: 'ClsTrnSalesDeliveryChallan.php',
					params: {
					    task: 'loaditemstockqty',
					    fincode:GinFinid,
					    compcode:Gincompcode,
					    sizecode : cmbSize.getValue(),
                                            sono     : cmbSONO.getRawValue(),
		                            slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d")

					},
					callback:function()
					{

	//					txtCuttingSize.setValue(loaditemstockdatastore.getAt(0).get('stk'));
						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryChallan.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : cmbSize.getValue(),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
                                        	    sono     : cmbSONO.getRawValue(),
						    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d")
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();
		                      }
                               });
                        }
			});
		   }
	     }
});

 var txtdabalqty = new Ext.form.NumberField({
        fieldLabel  : 'DA.Bal Qty',
        id          : 'txtdabalqty',
        name        : 'txtdabalqty',
        width       :  70,
	readOnly : true,
        tabindex : 2

    });


  var txtCuttingSize = new Ext.form.TextField({
        fieldLabel  : 'Cutting Size',
        id          : 'txtCuttingSize',
        name        : 'txtCuttingSize',
        width       :  200,
//	readOnly : true,
        tabindex : 2
    });

var txtRate = new Ext.form.NumberField({
	fieldLabel  : 'Rate.',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  10,
	enableKeyEvents : true,
	listeners:{
		keyup: function () {	
		
	}
	}
	
});

var txtStartNo = new Ext.form.ComboBox({
        fieldLabel  : 'StartNo.',
        id          : 'txtStartNo',
        name        : 'txtStartNo',
        width       :  80,
        tabindex : 2,
        displayField    : 'rollno', 
        valueField      : 'rollno',
        hiddenName      : '',
        id              : 'txtStartNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadfromtoboxDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        enableKeyEvents: true,
	multiSelect : true
    });

/*   var tot_mtr, fin_tot;
    var startnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (strartnodet) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
                
            }
        }
    });

*/

var st_no=0;

var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;

    var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
	enableKeyEvents: true,        
        store: loadfromtoboxDatastore,
        height: 190,
        width: 150,
        x: 0,
        y: 120,
        columns: [
            {header: "Start No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

        ],
        listeners: {
            cellclick: function (flxstartno, rowIndex, cellIndex, e) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.rollno;
                     
		     txtStartNo.setRawValue(st_no);
                }

		        var reelrows = flxstartno.getStore().getCount();
             //           flxstartno.getSelectionModel().selectAll();
                        var selendno = flxstartno.getSelectionModel().getSelections();

            },
            dblclick :function () {
             loadgriddetailsDatastore.removeAll();
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.rollno;
                     
		     txtStartNo.setRawValue(st_no);
                     end_no = selected_rows[i].data.rollno;
		     txtEndNo.setRawValue(end_no);		     
                }  

var firstno = st_no;
var lastno = end_no;
alert(st_no);
alert(end_no);

			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:st_no,
				stnoto:end_no,
                                unit:rbunit,
                                sono:cmbSONO.getValue(),
				compcode:Gincompcode
				
			},
			 callback: function () {
//alert(rbunit);
//alert(cmbSize.getValue());
				flxDetail.getSelectionModel().selectAll();
			        var selrows = flxDetail.getSelectionModel().getCount();
			        var sel = flxDetail.getSelectionModel().getSelections();
				var stkcnt  = 0;


			//	alert(selrows);
/*
       				for (var i=0;i<selrows;i++)
				{
       				 if (sel[i].data.stksrno == st_no || sel[i].data.stksrno == end_no)
				{
       				 stkcnt = stkcnt + 1;
       				 }
       				 }

*/
//alert(firstno);       	
//alert(lastno);
                        stkcnt  = 0;

/*
			for (var i=firstno;i<=lastno;i++)
                                {
          
                                    for (var k=0;k<selrows;k++)
                                    { 
                                       if (sel[k].data.stksrno == i)
                                       {
//alert(sel[k].data.stksrno);
                                          stkcnt = stkcnt + 1;
                                       }

                                    } 

                                } 
*/   

			for (var i=firstno;i<=lastno;i++)
                                {
          
                                 for (rr = 0;rr< reelrows; rr++)
                                 {

                                     if (selendno[rr].data.rollno == i)
                                     {                     
//alert(selendno[rr].data.rollno);
                                         for (var k=0;k<selrows;k++) 
                                         { 
                                            if (sel[k].data.stksrno == selendno[rr].data.rollno)
                                            {
                                                stkcnt = stkcnt + 1;
//alert(sel[k].data.stksrno);
                                             }
                                         } 
                                     }    
                                 }   
                                }   
                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Number Already exists");
			        }
				else
				{
	   			  	var cnt=loadgriddetailsDatastore.getCount();

					alert(loadgriddetailsDatastore.getAt(0).get('stk_sono'));
	alert(loadgriddetailsDatastore.getAt(0).get('ordh_sodate'));


				   	if(cnt>0)
					{                        
		                   	for(var j=0; j<cnt; j++)
						{ 
				   		var stk_finyear    = loadgriddetailsDatastore.getAt(j).get('stk_finyear');
                                   		var stk_var_code   = loadgriddetailsDatastore.getAt(j).get('stk_var_code');
	                           		var var_desc       = loadgriddetailsDatastore.getAt(j).get('var_name');
         	                   		var var_unit       = loadgriddetailsDatastore.getAt(j).get('unittype');
                  	           		var stk_sr_no      = loadgriddetailsDatastore.getAt(j).get('stk_sr_no');
                            	   		var stk_wt         = loadgriddetailsDatastore.getAt(j).get('stk_wt');
                                   		var var_code       = loadgriddetailsDatastore.getAt(j).get('var_grpcode');
                                   		var stk_units      = loadgriddetailsDatastore.getAt(j).get('stk_units');
                                                var so_no          = loadgriddetailsDatastore.getAt(j).get('stk_sono');
                                              //  var so_date        = loadgriddetailsDatastore.getAt(j).get('ordh_sodate');


				   var RowCnt = flxDetail.getStore().getCount() + 1;  
                                   flxDetail.getStore().insert(
                                   flxDetail.getStore().getCount(),
                                    new dgrecord({
						  varname     : var_desc,
						  unittype    : var_unit,
						  stksrno     : stk_sr_no,
						  stkwt       : stk_wt,
						  varcode     : stk_var_code,
						  varunit     : stk_units,
						  vargrpcode  : var_code,
						  stkfinyear  : stk_finyear,
						  stkfincode  : stk_finyear,
                                                  soentno     : so_no,	    
                                                  soentdate   : Ext.util.Format.date(sdptSo.getValue(),"Y-m-d"),
                                   		})

                               			);
						grid_tot();
						}
					}		
st_no=0;
end_no=0;                          
			    
			
            			}
}
});
/*loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d")
				}
				
				});*/
st_no=0;
end_no=0;                          
            
            }
        }
    });

/*var tot_mtr, fin_tot;
    var endnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            click: function (endnodet) {
                   var selected_rows = flxendno.getSelectionModel().getSelections();
		var cnt = flxendno.getSelectionModel().getCount();

		var stcnt = flxstartno.getSelectionModel().getCount();
                var strows = flxstartno.getSelectionModel().getSelections();
		for(var a=0;i<stcnt;a++)
		{
		 stno = strows[a].data.rollno;
		alert(stno);
		for(var i=0;i<cnt;i++)
		{
		 endno = selected_rows[i].data.rollno;
                loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:stno,
				stnoto:endno,
				compcode:1
				    
				}
				
				});
		}
}
            }
        }
    });*/

var end_no = 0;
var firstno = 0;
var lastno = 0;

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


                var param = (p1+p2+p3+p4) ;
//alert(param);
                if (printtype == "PDF") 
                {
                if (rep == "Date-DC-Reelwise")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseDeliveryChallan.rptdesign&__format=pdf&' + param, '_blank');
                else
                if (rep == "Date-DC-Sizewise")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateSizewise_DeliveryChallan.rptdesign&__format=pdf&' + param, '_blank');	


                if (rep == "Datewise Delivery Challan")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateWise_DeliveryChallanAbstract.rptdesign&__format=pdf&' + param, '_blank');	
                else
                if (rep == "Datewise Bundle Receipt")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseBundleReceipt.rptdesign&__format=pdf&' + param, '_blank');
                else
                if (rep == "DCwise Pending")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDC_Pending.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                }   
                else if (printtype == "XLS") 
                {
                if (rep == "Date-DC-Reelwise")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseDeliveryChallan.rptdesign&__format=XLS&' + param, '_blank');
                else
                if (rep == "Date-DC-Sizewise")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateSizewise_DeliveryChallan.rptdesign&__format=XLS&' + param, '_blank');	


                if (rep == "Datewise Delivery Challan")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateWise_DeliveryChallanAbstract.rptdesign&__format=XLS&' + param, '_blank');	
                else
                if (rep == "Datewise Bundle Receipt")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseBundleReceipt.rptdesign&__format=XLS&' + param, '_blank');
                else
                if (rep == "DCwise Pending")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDC_Pending.rptdesign&__format=XLS&' + param, '_blank');
                }   
                else
                {
                if (rep == "Date-DC-Reelwise")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseDeliveryChallan.rptdesign&' + param, '_blank');
                else
                if (rep == "Date-DC-Sizewise")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateSizewise_DeliveryChallan.rptdesign&' + param, '_blank');	


                if (rep == "Datewise Delivery Challan")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDateWise_DeliveryChallanAbstract.rptdesign&' + param, '_blank');	
                else
                if (rep == "Datewise Bundle Receipt")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseBundleReceipt.rptdesign&' + param, '_blank');
                else
                if (rep == "DCwise Pending")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDC_Pending.rptdesign&' + param, '_blank');
                }  
  
        }
    }
});  


function grid_tot(){
        var bundles = 0;
        var reels = 0;
        var wt = 0;	
	fdbl_totalvalue=0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
           if (sel[i].data.varunit==2) {
              bundles=bundles+1;
           }
           else
           {
              reels=reels+1;
           }   
              wt=wt+Number(sel[i].data.stkwt);
         }
 
 
         txttotreels.setValue(reels);
         txttotwt.setValue(wt);
   //      flxDetail.getSelectionModel().clearSelections();
        flxSizeUpdation();
}




function flxSizeUpdation() {
        var sizecode = 0;
        var twt = 0;
        var k = 0;  

        flxSize.getStore().removeAll();
	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
       var sel=flxDetail.getSelectionModel().getSelections();
    

        for(var i=0;i<Row;i++)
        {
            itemcode  =  Number(sel[i].data.varcode); 
            wt        =  sel[i].data.stkwt; 
            cutsize   =  sel[i].data.cuttingsize; 


            var k = 0;  
//alert(itemcode);

            var selrows = flxSize.getStore().getCount();

	    flxSize.getSelectionModel().selectAll();
            var sel1 = flxSize.getSelectionModel().getSelections();
            for(var j=0;j<selrows;j++){

                if (Number(sel1[j].data.sizecode) == itemcode )
                {    
                   twt =  Number(wt) + Number(sel1[j].data.weight);
                   sel1[j].set('weight', twt);
                   k =1;
                }
            }

            if (k==0 && wt >0) {


                    var RowCnt1 = flxSize.getStore().getCount() + 1;
                    flxSize.getStore().insert(
                        flxSize.getStore().getCount(),
                        new dgrecord2({

			      sizecode   : itemcode,
			      weight     :  Ext.util.Format.number(wt,'0.0'),
                              cuttingsize : cutsize,

                        }) 
                        );

            } 

           flxSize.getSelectionModel().clearSelections();
        }

} 

var dgrecord = Ext.data.Record.create([]);
var fm = Ext.form;
var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 190,
        width: 150,
        x: 150,
        y: 120,
        columns: [
            {header: "End No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

        ],

        listeners: {

            cellclick: function (flxendno, rowIndex, cellIndex, e) {

       if (Number(txtRate.getValue()) > 0)
       { 
                loadgriddetailsDatastore.removeAll();
                var selected_rows = flxendno.getSelectionModel().getSelections();

		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     end_no = selected_rows[i].data.rollno;
		     txtEndNo.setRawValue(end_no);
                }

                                
//              flxendno.getSelectionModel().removeAll();
                var reelrows = flxendno.getStore().getCount();
                flxendno.getSelectionModel().selectAll();
	        var selendno = flxendno.getSelectionModel().getSelections();

//alert(st_no);

//alert(end_no);

var firstno = st_no;
var lastno = end_no;
/*alert(cmbSize.getValue());
alert(st_no);

alert(rbunit);
alert(Gincompcode);*/
			if (firstno ==0) {
			    firstno = end_no;
			}

			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom: st_no,
				stnoto:end_no,
				compcode:Gincompcode,
                                sono:cmbSONO.getValue(),
				
			},
			 callback: function () {
//alert(rbunit);
//alert(cmbSize.getValue());
				flxDetail.getSelectionModel().selectAll();
			        var selrows = flxDetail.getSelectionModel().getCount();
			        var sel = flxDetail.getSelectionModel().getSelections();
				var stkcnt  = 0;
                                           
			//	alert(selrows);
/*
       				for (var i=0;i<selrows;i++)
				{
       				 if (sel[i].data.stksrno == st_no || sel[i].data.stksrno == end_no)
				{
       				 stkcnt = stkcnt + 1;
       				 }
       				 }

*/

// - Need to Modify at here

//alert(reelrows);
                        stkcnt  = 0;
			for (var i=firstno;i<=lastno;i++)
                                {
          
                                 for (rr = 0;rr< reelrows; rr++)
                                 {

                                     if (selendno[rr].data.rollno == i)
                                     {                     
//alert(selendno[rr].data.rollno);
                                         for (var k=0;k<selrows;k++) 
                                         { 
                                            if (sel[k].data.stksrno == selendno[rr].data.rollno)
                                            {
                                                stkcnt = stkcnt + 1;
//alert(sel[k].data.stksrno);
                                             }
                                         } 
                                     }    
                                 }   
                                }    

                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Number Already exists");
			        }
				else
				{
	   			  	var cnt=loadgriddetailsDatastore.getCount();


//					alert(loadgriddetailsDatastore.getAt(0).get('stk_sono'));
				   	if(cnt>0)
					{                        
		                   	for(var j=0; j<cnt; j++)
						{ 
				   		var stk_finyear    = loadgriddetailsDatastore.getAt(j).get('stk_finyear');
                                   		var stk_var_code   = loadgriddetailsDatastore.getAt(j).get('stk_var_code');
	                           		var var_desc       = loadgriddetailsDatastore.getAt(j).get('var_name');
                  	           		var stk_sr_no      = loadgriddetailsDatastore.getAt(j).get('stk_sr_no');
                            	   		var stk_wt         = loadgriddetailsDatastore.getAt(j).get('stk_wt');
                                   		var var_code       = loadgriddetailsDatastore.getAt(j).get('var_grpcode'); 
                                                var so_no          = loadgriddetailsDatastore.getAt(j).get('stk_sono');
                               
 
				   var RowCnt = flxDetail.getStore().getCount() + 1;  
                                   flxDetail.getStore().insert(
                                   flxDetail.getStore().getCount(),
                                    new dgrecord({
						  varname     : var_desc,
						  stksrno     : stk_sr_no,
						  stkwt       : stk_wt,
						  varcode     : stk_var_code,
						  vargrpcode  : var_code,
						  stkfinyear  : stk_finyear,
						  stkfincode  : stk_finyear,
                                                  soentno     : so_no,
                                                  soentdate   : Ext.util.Format.date(sdptSo.getValue(),"Y-m-d"),
                                                  rate        : txtRate.getValue(),
                                                  cuttingsize : txtCuttingSize.getRawValue(),
						 	    
                                   		})

                               			);

						grid_tot();

						}
					}		
			    
			
            			}
}
});
st_no=0;
end_no=0;  

flxstartno.getSelectionModel().clearSelections();
flxendno.getSelectionModel().clearSelections();
/*
                                loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),
                                    sono     : cmbSONO.getValue(),
				}
				
				});
st_no=0;
end_no=0;
*/

        }
else
{
   alert("Rate is empty...");
}
}

}
    });

var txtEndNo = new Ext.form.ComboBox({
        fieldLabel  : 'End No.',
        id          : 'txtEndNo',
        name        : 'txtEndNo',
        width       :  80,
        displayField    : 'rollno', 
        valueField      : 'rollno',
        hiddenName      : '',
        id              : 'txtEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadfromtoboxDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	listeners:
		{
		blur:function()
			{

				
			/*fabricstockdownloadDateStore.removeAll();
			loadwtlistdetstore.load({
         		url: 'ClsWtlist.php',
                 	params: 
			{
                        task: 'loadwtlistdet',
                        wtlistseqno:cmbwtlistno.getValue()
                       	},
			 callback: function () {
				var cnt=loadwtlistdetstore.getCount();
				if(cnt<=0)
					{  
                			Ext.Msg.alert("Alert","No Weight list Details Available");
					}
				else
	   			  	var cnt=loadwtlistdetstore.getCount();
				   	if(cnt>0){                        
		                   	for(var j=0; j<cnt; j++){ 
				   		var FabStkBaleNo    = loadwtlistdetstore.getAt(j).get('stkbaleno');
                                   		var prod_sortname   = loadwtlistdetstore.getAt(j).get('prodname');
	                           		var FabSTkShadeCode = loadwtlistdetstore.getAt(j).get('wtlistcolorcode');
         	                   		var FabStkLength    = loadwtlistdetstore.getAt(j).get('wtlistlength');
                  	           		var FabStkGrossWt   = loadwtlistdetstore.getAt(j).get('wtlistgrosswt');
                            	   		var FabStkNetWt     = loadwtlistdetstore.getAt(j).get('wtlistnetwt');
                                   		var FabStkWidth     = loadwtlistdetstore.getAt(j).get('wtlistwidth');
                                   		var FabStkShade     = loadwtlistdetstore.getAt(j).get('stkcolorcode');
                                   		var FabStkGrade     = loadwtlistdetstore.getAt(j).get('catalogname');
                                   		var JoHdseqno       = loadwtlistdetstore.getAt(j).get('wtlistseqno');
                                   		var styleid         = loadwtlistdetstore.getAt(j).get('wtliststyleid');
                                   		var baleid          = loadwtlistdetstore.getAt(j).get('wtlistbaleid');
                                   		var prodno          = loadwtlistdetstore.getAt(j).get('prodno');
                                   		var prodseqno          = loadwtlistdetstore.getAt(j).get('prodseqno');

				   var RowCnt = flxDetail.getStore().getCount() + 1;  
                                   flxDetail.getStore().insert(
                                   flxDetail.getStore().getCount(),
                                    new dgrecord({
						  FabStkBaleNo    : FabStkBaleNo,
						  prod_sortname   : prod_sortname,
						  FabSTkShadeCode : FabSTkShadeCode,
						  FabStkLength    : FabStkLength,
						  FabStkGrossWt   : FabStkGrossWt,
						  FabStkNetWt     : FabStkNetWt,
						  FabStkWidth     : FabStkWidth,
						  FabStkShade     : FabStkShade,
						  FabStkGrade     : FabStkGrade,
						  JoHdseqno       : JoHdseqno,
						  styleid         : styleid,
						  baleid          : baleid,
						  prodno	  : prodno,
						  prodseqno	  : prodseqno		    
                                   		})
                               			);
						grid_tot();
						}
					}		
				}    
			});*/
		}
	}
    });


var txttotreels = new Ext.form.NumberField({
        fieldLabel  : 'No of Reels.',
        id          : 'txttotreels',
        name        : 'txttotreels',
        width       :  100,
        tabindex : 2
});

var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'Tot Wt.',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       :  100,
        tabindex : 2
});

var FlxBoxDetailDatastore = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'FlxBoxDetailDatastore'
        },[
           'varname','stksrno','stkwt','rate','varcode','varunit','vargrpcode','stkfinyear','stkfincode','vartruck'
        ])
    });
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 230,
    hidden:false,
    width: 600,
//    font-size:18px,
    columns:
    [
	{header: "Size  ",dataIndex: 'varname',sortable:true,width:160,align:'left'},
	{header: "Number",   dataIndex: 'stksrno',sortable:true,width:110,align:'left'},
	{header: "Weight",   dataIndex: 'stkwt',sortable:true,width:80,align:'left'},
//	{header: "Rate", dataIndex: 'rate',sortable:true,width:80,align:'left'},
	{header: "SO No.",   dataIndex: 'soentno',sortable:true,width:80,align:'left'},
	{header: "SO Date",  dataIndex: 'soentdate',sortable:true,width:80,align:'left'},
	{header: "ItemCode", dataIndex: 'varcode',sortable:true,width:80,align:'left'},
	{header: "Prd.Code", dataIndex: 'vargrpcode',sortable:true,width:80,align:'left'},	
	{header: "Finyear", dataIndex: 'stkfinyear',sortable:true,width:80,align:'left' ,hidden:true},
	{header: "Fincode", dataIndex: 'stkfincode',sortable:true,width:80,align:'left'},
	{header: "Cutting Size", dataIndex: 'cuttingsize',sortable:true,width:80,align:'left'},


    ],
    store: FlxBoxDetailDatastore,
    listeners:{	
/*
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
alert("Del key is pressed");
             }
         } ,

        
 
*/
'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Delivery Challan',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
             fn: function(btn){
               if (btn === 'yes'){
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

var dgrecord2 = Ext.data.Record.create([]);
var flxSize = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 230,
    hidden:false,
    width: 600,
//    font-size:18px,
    columns:
    [
	{header: "Size  ",dataIndex: 'sizecode',sortable:true,width:60,align:'left'},
	{header: "Weight",   dataIndex: 'weight',sortable:true,width:80,align:'left'},
	{header: "Cutting Size", dataIndex: 'cuttingsize',sortable:true,width:80,align:'left'},
    ],
    store: [],
    listeners:{	



   }
});
	
var TrnSalesPackSlipPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES DELIVERY CHALLAN ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesPackSlipPanel',
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
                    Ext.getCmp('cmbDCNo').show();
//                    flxdetail.getStore().removeAll();
                    loadEditDeliveryChallan.load({
				url: 'ClsTrnSalesDeliveryChallan.php',
				params: {
				    task: 'loadDCNoEdit',
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
                        if(cmbCustomer.getRawValue()=="" || cmbCustomer.getValue()==0)
			{
				alert("Select Customer..");
			}
                        else if(Ext.util.Format.date(dptDC.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Deliver Date is not in current finance year. Please check");
                         }          
                   	else if(cmbSONO.getRawValue()=="" || cmbSONO.getValue()==0)
			{
				alert("Select SOC No..");
			}
                   	else if(txtTruck.getRawValue()=="")
			{
				alert("Enter Truck Number ..");
			}
			else if (flxDetail.rows == 0)
	                    {
	                        Ext.Msg.alert('Delivery Challan','Grid should not be empty..');
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

                                       var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                       var sizedata = flxSize.getStore().getRange();                                        
      					       var sizeupdData = new Array();
                                               Ext.each(sizedata, function (record) {
                                               sizeupdData.push(record.data);
                                               });  


//             Ext.getCmp('save').setDisabled(true);



//       alert(gstFlag);
                                               Ext.Ajax.request({
				               url: 'TrnSalesDeliveryChallanSave.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
	                                        cnt2: sizedata.length,
                               	                griddet2: Ext.util.JSON.encode(sizeupdData),
                                                seqno    : seqno,
						compcode :Gincompcode,
						fincode :GinFinid,                                      
 		                                dcno : txtDCNo.getRawValue(),
                                                dcdate :Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),	
						ordno : txtPartyRef.getRawValue(),
						orddate : Ext.util.Format.date(dptPartyRef.getValue(),"Y-m-d"),
						sono: cmbSONO.getRawValue(),
						sodt:Ext.util.Format.date(sdptSo.getValue(),"Y-m-d"),
						cutter : cmbConverter.getValue(),			
						party : cmbCustomer.getValue(),
			                        truck : txtTruck.getRawValue(),  
						noofreels:txttotreels.getValue(),
						totwt:txttotwt.getValue(),

                                                daddr1 : txtAddr1.getRawValue(),
                                                daddr2 : txtAddr2.getRawValue(),
                                                daddr3 : txtAddr3.getRawValue(),
                                                dcity  : txtCity.getRawValue(),
                                                dpin   : txtPin.getRawValue(),
                                                dgst   : txtGST.getRawValue(),
                                         	dctype : cmbDCType.getValue(),

                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Delivery Challan No -" + obj['dcno']);
	                                    TrnSalesPackSlipPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
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

      
                if (printtype == "PDF") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&' + param, '_blank');

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
                    TrnSalesPackSlipWindow.hide();
                }
            }
        }]
    },

    items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 480,
           height      : 130,
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
                       items: [txtDCNo]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbDCNo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptDC]
   		  },

                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 25,
                       border      : false,
                       items: [cmbConverter]
                   },


                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 50,
                       border      : false,
                       items: [cmbCustomer]
                   },

                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [cmbDCType]
                   },
                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 450,
                height      : 130,
                x           : 620,
                y           : 10,
                border      : true,
                layout      : 'absolute',
                items:[

      
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 220,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbSONO]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [sdptSo]
   		  },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 240,
                       x           : 0,
                       y           : 35,
                       border      : false,
                       items: [txtPartyRef]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 35,
	               border      : false,
                       items: [dptPartyRef]
   		  },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 240,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [txtTruck]
                   },



                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 220,
                height      : 120,
                x           : 1100,
                y           : 420,
                border      : true,
                layout      : 'absolute',
                items:[
		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : -10,
	       		       y           : -10,
			       border      : false,
		               items: [flxSize]
	   		  },
                ]
            },
 
            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 260,
                height      : 400,
                x           : 1072,
                y           : 10,
                border      : true,
                layout      : 'absolute',
                items:[



		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 210,
			layout  : 'absolute',
			x       : 0,
			y       : 10,

			items:[optprinttype],
		},


		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
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
	       		       y           : 260,
			       border      : false,
		               items: [dptStartDate]
	   		  },
       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 290,
			       border      : false,
		               items: [dptEndDate]
	   		  },

       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 40,
	       		       y           : 330,
			       border      : false,
		               items: [btnSubmit]
	   		  },

                      ]
            }  ,


          {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 400,
            width: 1060,
            x: 10,
            y: 140,
            items: [
            {
                xtype: 'panel',
                title: 'Item Details',
                width: 220,
                height: 200,
                layout: 'absolute',
                items: [
			{
			xtype       : 'fieldset',
			title       : '',
			width       : 1030,
			height      : 350,
			x           : 10,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[  
				{ 
				xtype       : 'fieldset',
				title       : '',
				width       : 350,
				height      : 325,
				x           : 0,
				y           : 0,
				border      : true,
				layout      : 'absolute',
				items:[ 
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 350,
					x           : 0,
					y           : 0,
					border      : false,
					items: [cmbSize]
					},

					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 350,
					x           : 0,
					y           : 40,
					border      : false,
					items: [txtCuttingSize]
					},
				
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 0,
					y           : 100,
					border      : false,
					items: [//txtStartNo
					flxstartno]
					},
					
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 170,
					x           : 170,
					y           : 100,
					border      : false,
					items: [//txtEndNo
					flxendno]
					},
				]
				} ,

				{ 
				 xtype       : 'fieldset',
				 title       : '',
				 width       : 650,
				 height      : 325,
				 x           : 350,
				 y           :   0,
				 border      : true,
				 layout      : 'absolute',
				 items:[ flxDetail,

					{ 
					       xtype       : 'fieldset',
					       title       : '',
					       labelWidth  : 100,
					       width       : 280,
					       x           : 100,
					       y           : 240,
					       border      : false,
					       items: [txttotreels]
					 },
					{ 
					       xtype       : 'fieldset',
					       title       : '',
					       labelWidth  : 50,
					       width       : 280,
					       x           : 350,
					       y           : 240,
					       border      : false,
					       items: [txttotwt]
					 }
				 ]
				} ,


			]
                     },
                 ],
              },


            {
                xtype: 'panel',
                title: 'Delivery Details',
                width: 220,
                height: 200,
                layout: 'absolute',
                items: [
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 550,
			       x           : 5,
			       y           : 5,
			       border      : false,
			       items: [txtAddr1]
			 },
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 550,
			       x           : 5,
			       y           : 45,
			       border      : false,
			       items: [txtAddr2]
			 },
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 550,
			       x           : 5,
			       y           : 95,
			       border      : false,
			       items: [txtAddr3]
			 },

			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 550,
			       x           : 5,
			       y           : 140,
			       border      : false,
			       items: [txtCity]
			 },

			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 200,
			       x           : 5,
			       y           : 175,
			       border      : false,
			       items: [txtPin]
			 },


			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 250,
			       x           : 5,
			       y           : 215,
			       border      : false,
			       items: [txtGST]
			 },



                ]
            }

          ]
         },


    ],     

});

var loadDCNodatastore = new Ext.data.Store({
      id: 'loadDCNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryChallan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dcno'
      ]),
    });


   function RefreshData(){
            gstFlag = "Add";
            Ext.getCmp('cmbDCNo').hide();
            Ext.getCmp('save').setDisabled(false);
            seqno = 0;
            TrnSalesPackSlipPanel.getForm().reset();
            flxDetail.getStore().removeAll();
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            loadDCNodatastore.load({
                url: 'ClsTrnSalesDeliveryChallan.php',
                params: {
                    task: 'loadDCNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtDCNo.setValue(loadDCNodatastore.getAt(0).get('dcno'));
		}
            });

   };

 
var TrnSalesPackSlipWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 30,
        title       : 'SALES - SHEET CONVERSION - DELIVERY CHALLAN ENTRY',
        items       : TrnSalesPackSlipPanel,
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
               cmbDCType.setValue('S');
               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesDeliveryChallan.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,

                  }
               });

               loadSOCustomerStore.load({
                  url: 'ClsTrnSalesDeliveryChallan.php',
                  params: {
                  task: 'loadSOcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,

                  }
               });
             }
        } 
    });
	
       TrnSalesPackSlipWindow.show();  
});
