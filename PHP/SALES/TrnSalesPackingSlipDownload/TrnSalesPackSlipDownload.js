Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;
   
   var gstFlag = "Add";

 




 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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


var loaditemstockdatastore = new Ext.data.Store({
      id: 'loaditemstockdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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

var loadwhslipnodataStore = new Ext.data.Store({
      id: 'loadwhslipnodataStore',
//      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwhslipno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wpckh_no','wpckh_slipno'
      ]),
    });




var loaddanodatastore = new Ext.data.Store({
      id: 'loaddanodatastore',
autoLoad: true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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


var loadsocnodatastore = new Ext.data.Store({
      id: 'loadsocnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsocno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_ackno','da_date'
      ]),
    });

var loaddetailsdatastore= new Ext.data.Store({
      id: 'loaddetailsdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfromtobox"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','rollno'
      ]),
    });

var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgriddetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','stk_var_code','var_name','var_unit','stk_sr_no','stk_wt','var_code','stk_units','unittype','var_grpcode'
      ]),
    });

var loadwhslipnostore = new Ext.data.Store({
      id: 'loadwhslipnostore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwhslipno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wpckh_no'
      ]),
    });

var loadwhslipdetailstore = new Ext.data.Store({
      id: 'loadwhslipdetailstore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwhslipdetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wpckh_date', 'wpckh_socno', 'wpckh_socdt', 'wpckh_dano', 'wpckh_dadt', 'wpckh_noofbun', 'wpckh_noofreels', 'wpckh_totwt', 'wpckh_vehicleno',
'wpckh_slipno', 'wpckh_slipdt', 'wpckh_slipstat','wpckt_var', 'wpckt_sr_no', 'wpckt_unit', 'wpckt_wt','wpckt_selected', 'wpckt_srno_fincode',
'da_cust', 'var_code', 'var_name', 'var_grpcode', 'var_unit', 'var_size1', 'var_size2', 'var_reams', 'var_sheets', 'var_tariffno','cust_code', 'cust_ref', 
 'ordh_ref','ordh_refdt','ordh_ref'
      ]),
    });





var loadeditpackingslip = new Ext.data.Store({
      id: 'loadeditpackingslip',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPackSlipNoedit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pckh_no'
      ]),
    });

var loadeditpackingslipdetail = new Ext.data.Store({
      id: 'loadeditpackingslipdetail',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"EditPackSlipNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_name','type_code','pckh_ordno','pckh_orddate','pckh_ackno','pckh_ackdt','nos','unit','rate','pckh_date','varcode','pckh_invno','pckh_invstat',
'var_name','var_grpcode','var_unit','pckh_dano','pckh_dadt','cust_agent','agentname','cust_code','cust_ref','pckt_wt','pckt_sr_no','pckt_srno_fincode','pckt_var'
      ]),
    });
    
   var txtSlipNo = new Ext.form.NumberField({
        fieldLabel  : 'Slip No.',
        id          : 'txtSlipNo',
        name        : 'txtSlipNo',
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

  var txtAgent = new Ext.form.NumberField({
        fieldLabel  : 'Agent.',
        id          : 'txtagent',
        name        : 'txtAgent',
        width       :  300,
	readOnly : true,
        tabindex : 2
    });

  var dptSlip= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
	readOnly : true,
        value: new Date()
    });

  var dptAdv= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptAdv',
        name: 'Date',
        format: 'd-m-Y',
	readOnly : true,
        value: new Date()
    });

  var dptSoc= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSoc',
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

   var txtcontainer = new Ext.form.TextField({
        fieldLabel  : 'Container No.',
        id          : 'txtcontainer',
        name        : 'txtcontainer',
        width       :  200,
        tabindex : 2
    });


   var txtlorryno = new Ext.form.TextField({
        fieldLabel  : 'Lorry No.',
        id          : 'txtlorryno',
        name        : 'txtlorryno',
        width       :  100,
        tabindex : 2
    });


   var txtsealno = new Ext.form.TextField({
        fieldLabel  : 'Seal No.',
        id          : 'txtsealno',
        name        : 'txtsealno',
        width       :  150,
        tabindex : 2
    });
    



var cmbSlipNo = new Ext.form.ComboBox({
        fieldLabel      : 'Slip No',
        width           : 100,
        displayField    : 'pckh_no', 
        valueField      : 'pckh_no',
        hiddenName      : '',
        id              : 'cmbSlipNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadeditpackingslip,
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
		     loadAllCustomerStore.removeAll();
		       loadAllCustomerStore.load({
		          url: 'ClsTrnSalesPackSlipDownload.php',
		          params: {
		          task: 'loadcustomer',
		          invtype:1,
			  fincode:GinFinid,
			  compcode:Gincompcode,
			  despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
		          entrychk : gstFlag,
		          }
		       });
		      loadeditpackingslipdetail.load({
                           url: 'ClsTrnSalesPackSlipDownload.php',
			   params: {
			   task: 'EditPackSlipNo',
			   fincode: GinFinid,
			   compcode:Gincompcode,
                           slipno:cmbSlipNo.getValue()
                           },
                           callback:function()
                           {
                                  if (loadeditpackingslipdetail.getAt(0).get('pckh_invstat') == "T")
                                  {
                                     Ext.getCmp('save').setDisabled(true);
                                  }

                                  cmbAdvNo.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_dano'));
                                  cmbAdvNo.setValue(loadeditpackingslipdetail.getAt(0).get('pckh_dano'));
                                  dptAdv.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_dadt'),"d-m-Y"));

                                  dptSlip.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_date'),"d-m-Y"));

                                  cmbSocNo.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_ackno'));
                                  cmbSocNo.setValue(loadeditpackingslipdetail.getAt(0).get('pckh_ackno'));
                                  dptSoc.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_ackdt'),"d-m-Y"));

                                  txtPartyRef.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_ordno'));
                                  dptPartyRef.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_orddate'),"d-m-Y"));
                                  cmbCustomer.setValue(loadeditpackingslipdetail.getAt(0).get('cust_code'));
                                  txtAgent.setRawValue(loadeditpackingslipdetail.getAt(0).get('agentname'));
				  txtSlipNo.setValue(cmbSlipNo.getValue());
                                  var cnt=loadeditpackingslipdetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 
				   	    var stk_finyear    = loadeditpackingslipdetail.getAt(j).get('pckt_srno_fincode');
                                   	    var stk_var_code   = loadeditpackingslipdetail.getAt(j).get('pckt_var');
	                           	    var var_desc       = loadeditpackingslipdetail.getAt(j).get('var_name');
                                            if (loadeditpackingslipdetail.getAt(j).get('var_unit') == 1)
                                            {  
        	                   	    var var_unit       = 'Reel';
                                            }
                                            else
                                            {  
        	                   	    var var_unit       = 'Bundle';
                                            }
                                            var stk_sr_no      = loadeditpackingslipdetail.getAt(j).get('pckt_sr_no');
                            	   	    var stk_wt         = loadeditpackingslipdetail.getAt(j).get('pckt_wt');
                                   	    var var_grpcode    = loadeditpackingslipdetail.getAt(j).get('var_grpcode');
                                   	    var stk_units      = loadeditpackingslipdetail.getAt(j).get('var_unit');
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
						   vargrpcode  : var_grpcode,
						   stkfinyear  : stk_finyear,
						   stkfincode  : stk_finyear	    
                                               })
                                       	    );
					   grid_tot();
        				}
			            }



//load data in flex - end


 

			           loadwhslipnodataStore.load({
                                   url: 'ClsTrnSalesPackSlipDownload.php',
                                   params: {
				         task: 'findwhslipno',
                               
				         fincode : GinFinid,
                                         compcode:Gincompcode,
                                         slipno  :cmbSlipNo.getValue()
  				    },
                                    callback:function()
                                    {
					if (loadwhslipnodataStore.getCount() > 0)
                                        cmbWHSlipNo.setValue(loadwhslipnodataStore.getAt(0).get('wpckh_no'));
                                    }
                                  });



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
                
                	loadwhslipnostore.removeAll();
                	loadwhslipnostore.load({
                		url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadwhslipno',
				    custcode:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    
		                  },
				  callback:function(){ 
				  }
                	});
                
			/*	loaddanodatastore.removeAll();
				loaddanodatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loaddano',
				    custcode:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    invtype:cmbInvType.getValue()
		                  },
				  callback:function(){ 
					cmbAdvNo.setValue(loaddanodatastore.getAt(0).get('da_no'));
					loadsocnodatastore.removeAll();
					loadsocnodatastore.load({
					url: 'ClsTrnSalesPackSlipDownload.php',
					params: {
					    task: 'loadsocno',
					    customer:cmbCustomer.getValue(),
					    fincode: GinFinid,
					    compcode: Gincompcode,
					    dano : loaddanodatastore.getAt(0).get('da_no')
					},
					callback:function() 
					{
					 dptAdv.setRawValue(Ext.util.Format.date(loadsocnodatastore.getAt(0).get('da_date'),"d-m-Y"));
					 cmbSocNo.setValue(loadsocnodatastore.getAt(0).get('da_ackno'));
						loadsizedataStore.removeAll();
						loadsizedataStore.load({


						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadsize',
						    customer:cmbCustomer.getValue(),
						    fincode: GinFinid,
						    compcode:Gincompcode,
						    dano : loaddanodatastore.getAt(0).get('da_no'),
						    socno : loadsocnodatastore.getAt(0).get('da_ackno')
						},
						callback:function()
						{
		//alert(loadsizedataStore.getCount());
						txtAgent.setRawValue(loadsizedataStore.getAt(0).get('cust_ref'));
				                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
				                dptSoc.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_ackdate'),"d-m-Y"));
				                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));
						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));

						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : loaddanodatastore.getAt(0).get('da_no'),
						    socno : loadsocnodatastore.getAt(0).get('da_ackno'),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});

loadfromtoboxDatastore.removeAll();
txtstock.setValue('');
rbunit=0;
					        loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
						},
						callback:function()
						{



						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');

						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptSlip
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();

						}
						});





						}
					    });//loadsize
					}
					});//loadsocno
				  }
                   		});//loaddano

				loadcusttypedatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadcusttype',
				    custcode:cmbCustomer.getValue(),
		                  },
                         	callback:function()
				{

//				alert(loadcusttypedatastore.getAt(0).get('cust_type'));
                                custtype = loadcusttypedatastore.getAt(0).get('cust_type');
                                repcode = loadcusttypedatastore.getAt(0).get('cust_repr');

				}
			    });
*/

			   }
		     }
		});
var cmbWHSlipNo = new Ext.form.ComboBox({
        fieldLabel      : 'WHouse Slip No',
        width           : 100,
        displayField    : 'wpckh_no', 
        valueField      : 'wpckh_no',
        hiddenName      : '',
        id              : 'cmbWHSlipNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadwhslipnostore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        hidden          : false,
        allowblank      : true,
        listeners:{
                select: function () {                
                        flxDetail.getStore().removeAll();                       
                 	loadwhslipdetailstore.removeAll();
                	loadwhslipdetailstore.load({
		        	url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadwhslipdetail',
				    custcode:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
		                    whslipno:  cmbWHSlipNo.getValue(),
		                },
	               callback:function(){ 

                                  cmbAdvNo.setRawValue(loadwhslipdetailstore.getAt(0).get('wpckh_dano'));
                                  cmbAdvNo.setValue(loadwhslipdetailstore.getAt(0).get('wpckh_dano'));
                                  dptAdv.setRawValue(Ext.util.Format.date(loadwhslipdetailstore.getAt(0).get('wpckh_dadt'),"d-m-Y"));


                                  cmbSocNo.setRawValue(loadwhslipdetailstore.getAt(0).get('wpckh_socno'));
                                  cmbSocNo.setValue(loadwhslipdetailstore.getAt(0).get('wpckh_socno'));
                                  dptSoc.setRawValue(Ext.util.Format.date(loadwhslipdetailstore.getAt(0).get('wpckh_socdt'),"d-m-Y"));

                                  txtPartyRef.setRawValue(loadwhslipdetailstore.getAt(0).get('ordh_ref'));
                                  dptPartyRef.setRawValue(Ext.util.Format.date(loadwhslipdetailstore.getAt(0).get('ordh_refdt'),"d-m-Y"));
                                  txtAgent.setRawValue(loadwhslipdetailstore.getAt(0).get('cust_ref'));
                                  repcode = loadwhslipdetailstore.getAt(0).get('ordh_ref')
                	  	 var cnt=loadwhslipdetailstore.getCount();
//					alert(cnt);
			   	if(cnt>0)
				{             
				var j=0;           
				    	for(j=0; j<cnt; j++) {
                        		    if (loadwhslipdetailstore.getAt(j).get('var_unit') == 1)
                                            {  
        	                   	    var unittype       = 'Reel';
                                            }
                                            else
                                            {  
        	                   	    var unittype      = 'Bundle';
                                            }
					   var RowCnt = flxDetail.getStore().getCount() + 1;  
		                           flxDetail.getStore().insert(
		                            flxDetail.getStore().getCount(),
		                            new dgrecord({
							  varname     : loadwhslipdetailstore.getAt(j).get('var_name'),
							  unittype    : unittype,
							  stksrno     : loadwhslipdetailstore.getAt(j).get('wpckt_sr_no'),
							  stkwt       : loadwhslipdetailstore.getAt(j).get('wpckt_wt'),
							  varcode     : loadwhslipdetailstore.getAt(j).get('wpckt_var'),
							  varunit     : loadwhslipdetailstore.getAt(j).get('var_unit'),
							  vargrpcode  : loadwhslipdetailstore.getAt(j).get('var_grpcode'),
							  stkfinyear  : loadwhslipdetailstore.getAt(j).get('wpckt_srno_fincode'),
							  stkfincode  : loadwhslipdetailstore.getAt(j).get('wpckt_srno_fincode'),
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

var cmbAdvNo = new Ext.form.ComboBox({

        fieldLabel      : 'DA No.',
        width           : 110,
        displayField    : 'da_no', 
        valueField      : 'da_no',
        hiddenName      : 'da_no',
        id              : 'cmbAdvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loaddanodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
            listeners:{
                select: function () {
				loadsocnodatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadsocno',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode: Gincompcode,
				    dano : cmbAdvNo.getValue()
				},
                                callback:function() 
				{
                                 dptAdv.setRawValue(Ext.util.Format.date(loadsocnodatastore.getAt(0).get('da_date'),"d-m-Y"));

				cmbSocNo.setValue(loadsocnodatastore.getAt(0).get('da_ackno'));
				loadsizedataStore.load({


				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    socno : loadsocnodatastore.getAt(0).get('da_ackno')
				},
				callback:function()
				{
//alert(loadsizedataStore.getCount());
				txtAgent.setRawValue(loadsizedataStore.getAt(0).get('cust_ref'));
                                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
                                dptSoc.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_ackdate'),"d-m-Y"));
                                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));

						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : cmbAdvNo.getRawValue(),
						    socno : loadsocnodatastore.getAt(0).get('da_ackno'),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});



						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
						},
						callback:function()
						{

						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
						}
						});


						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptSlip
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();
				}
			    });
                                }
			    });
			   },
		
		     }
		});


var cmbSocNo = new Ext.form.ComboBox({
        fieldLabel      : 'SOC No.',
        width           : 110,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbSocNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsocnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{

                select: function () {

				loadsizedataStore.load({


				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    socno : cmbSocNo.getRawValue()
				},
				callback:function()
				{
//alert(loadsizedataStore.getCount());
				txtAgent.setRawValue(loadsizedataStore.getAt(0).get('cust_ref'));
                                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
                                dptSoc.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_ackdate'),"d-m-Y"));
                                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));

						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : cmbAdvNo.getRawValue(),
						    socno : cmbSocNo.getRawValue(),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});



						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
						},
						callback:function()
						{

						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
						}
						});


						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesPackSlipDownload.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptSlip
						}
				
						});
						txtStartNo.focus();
						txtEndNo.focus();


				}
			    });
			   }
		     }
		});


var cmbInvType = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice Type',
        width           : 250,
        displayField    : 'type_name', 
        valueField      : 'type_code',
        hiddenName      : '',
        id              : 'cmbInvType',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadinvoicetypedataStore,
        value           :'NORMAL SALES',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
            listeners:{
                select: function () {
				loadAllCustomerStore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadcustomer',
				    invtype:this.getValue(),
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				}
			    });
			   }
		     }
});

var cmbcontainer = new Ext.form.ComboBox({
        fieldLabel      : 'Cont.Size',
        width           : 100,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbcontainer',
        typeAhead       : true,
        mode            : 'local',
        store           : ['TRUCK','20 FCL','40 FCL'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0

  });


/*
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


				loaddetailsdatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadqtydet',
				    custcode:cmbCustomer.getValue(),
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    socno : cmbSocNo.getRawValue(),
				    sizecode : cmbSize.getValue()
				},
				callback:function()
				{
				txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
				var rate = loaddetailsdatastore.getAt(0).get('da_urate');
				}
				});



				loaditemstockdatastore.load({

				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loaditemstockqty',
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    sizecode : cmbSize.getValue(),
                                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				},
				callback:function()
				{

				txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
                  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
				}
				});


				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				}
				
				});
				txtStartNo.focus();
				txtEndNo.focus();
			   }
		     }
});
*/
 var txtdabalqty = new Ext.form.NumberField({
        fieldLabel  : 'DA.Bal Qty',
        id          : 'txtdabalqty',
        name        : 'txtdabalqty',
        width       :  70,
	readOnly : true,
        tabindex : 2

    });


  var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock.',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  70,
	readOnly : true,
        tabindex : 2
    });

var txtStsearch = new Ext.form.NumberField({
	fieldLabel  : 'St.No.',
        id          : 'txtStsearch',
        name        : 'txtStsearch',
        width       :  100,
	enableKeyEvents : true,
	listeners:{
		keyup: function () {	
		flxstartno.getStore().filter('rollno', txtStsearch.getValue());    		
	}
	}
	
});
var txtEdsearch = new Ext.form.NumberField({
	fieldLabel  : 'Ed.No.',
        id          : 'txtEdsearch',
        name        : 'txtEdsearch',
        width       :  100,
	enableKeyEvents : true,
	listeners:{
		keyup: function () {	
		flxendno.getStore().filter('rollno', txtEdsearch.getValue());    		
	}
	}	
});

/*
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

   var tot_mtr, fin_tot;
    var startnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (strartnodet) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
                
            }
        }
    });


var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;
    var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        selModel: startnodet,
        columns: [startnodet,
            {header: "Start No", dataIndex: 'rollno', sortable: true, width: 70, align: 'left'}

        ]
    });

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
alert(cmbSize.getValue());
alert(st_no);
alert(end_no);
alert(rbunit);
alert(Gincompcode);
			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:st_no,
				stnoto:end_no,
                                unit:rbunit,
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
//alert(firstno);       	
//alert(lastno);
                        stkcnt  = 0;
			for (var i=firstno;i<=lastno;i++)
                                {
          
                                    for (var k=0;k<selrows;k++)
                                    { 
                                       if (sel[k].data.stksrno == i)
                                       {
                                          stkcnt = stkcnt + 1;
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
				//	alert(cnt);
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
						  stkfincode  : stk_finyear	    
                                   		})

                               			);
						grid_tot();
						}
					}		
			    
			
            			}
}
});
loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				}
				
				});
st_no=0;
end_no=0;                          
            
            }
        }
    });

*/
var tot_mtr, fin_tot;
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
				url: 'ClsTrnSalesPackSlipDownload.php',
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
    });

var end_no = 0;


var firstno = 0;
var lastno = 0;


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
 
         txttotbundles.setValue(bundles);
         txttotreels.setValue(reels);
         txttotwt.setValue(wt);
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
                loadgriddetailsDatastore.removeAll();
                var selected_rows = flxendno.getSelectionModel().getSelections();

		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     end_no = selected_rows[i].data.rollno;
		     txtEndNo.setRawValue(end_no);
                }
                
//alert(st_no);

//alert(end_no);

var firstno = st_no;
var lastno = end_no;
/*alert(cmbSize.getValue());
alert(st_no);
alert(end_no);
alert(rbunit);
alert(Gincompcode);*/
			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:st_no,
				stnoto:end_no,
                                unit:rbunit,
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
			for (var i=firstno;i<=lastno;i++)
                                {
          
                                    for (var k=0;k<selrows;k++)
                                    { 
                                       if (sel[k].data.stksrno == i)
                                       {
                                          stkcnt = stkcnt + 1;
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
				//	alert(cnt);
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
						  stkfincode  : stk_finyear	    
                                   		})

                               			);
						grid_tot();
						}
					}		
			    
			
            			}
}
});
loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				}
				
				});
st_no=0;
end_no=0;


        }
}
    });


/*var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;
    var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        selModel: endnodet,
        columns: [endnodet,
            {header: "End No", dataIndex: 'rollno', sortable: true, width: 70, align: 'left'}

        ]
    });*/

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

var txttotbundles = new Ext.form.NumberField({
        fieldLabel  : 'No of Bundles.',
        id          : 'txttotbundles',
        name        : 'txttotbundles',
        width       :  100,
        tabindex : 2
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
           'varname','unittype','stksrno','stkwt','varcode','varunit','vargrpcode','stkfinyear','stkfincode'
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
    width: 770,
//    font-size:18px,
    columns:
    [
	{header: "Item Ref.",dataIndex: 'varname',sortable:true,width:160,align:'left'},
	{header: "Units",    dataIndex: 'unittype',sortable:true,width:80,align:'left'},
	{header: "Number",   dataIndex: 'stksrno',sortable:true,width:110,align:'left'},
	{header: "Weight",   dataIndex: 'stkwt',sortable:true,width:80,align:'left'},
	{header: "ItemCode", dataIndex: 'varcode',sortable:true,width:80,align:'left'},
	{header: "UnitCode", dataIndex: 'varunit',sortable:true,width:80,align:'left'},
	{header: "Prd.Code", dataIndex: 'vargrpcode',sortable:true,width:80,align:'left'},
	{header: "Finyear", dataIndex: 'stkfinyear',sortable:true,width:80,align:'left'},
	{header: "Fincode", dataIndex: 'stkfincode',sortable:true,width:80,align:'left'}
    ],
    store: FlxBoxDetailDatastore,
    listeners:{	
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Packing Slip',
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


	
var TrnSalesPackSlipPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES PACKING SLIP ENTRY',
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
                    Ext.getCmp('cmbSlipNo').show();
//                    flxdetail.getStore().removeAll();
                    loadeditpackingslip.load({
				url: 'ClsTrnSalesPackSlipDownload.php',
				params: {
				    task: 'loadPackSlipNoedit',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                }

                    });     

                }
            }
        },'-',
          {
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
                   	 if(cmbInvType.getRawValue()=="" || cmbInvType.getValue()==0)
			{
				alert("Select Invoice Type..");
			}
                   	 else if(cmbCustomer.getRawValue()=="" || cmbCustomer.getValue()==0)
			{
				alert("Select Customer..");
			}
                   	 else if(cmbAdvNo.getRawValue()=="" || cmbAdvNo.getValue()==0)
			{
				alert("Select DA No..");
			}
                   	else if(cmbSocNo.getRawValue()=="" || cmbSocNo.getValue()==0)
			{
				alert("Select SOC No..");
			}
                   	else if(cmbWHSlipNo.getRawValue()=="" || cmbWHSlipNo.getValue()==0)
			{
				alert("Select Slip NO..");
			}
			else if (flxDetail.rows==0)
	                    {
	                        Ext.Msg.alert('PS','Grid should not be empty..');
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
//       alert(gstFlag);
                                               Ext.Ajax.request({
				               url: 'TrnSalesPackSlipDownloadSave.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode :GinFinid,                                      
 		                                slipno : txtSlipNo.getValue(),
                                                slipdate :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                                                whslipno : cmbWHSlipNo.getValue(),	
						invtype : invtype,
						ordno : txtPartyRef.getRawValue(),
						orddate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
						socno: cmbSocNo.getRawValue(),
						socdt:Ext.util.Format.date(dptSoc.getValue(),"Y-m-d"),
						dano : cmbAdvNo.getRawValue(),
						dadate : Ext.util.Format.date(dptAdv.getValue(),"Y-m-d"),
						party : cmbCustomer.getValue(),
						type : custtype,
						repr : repcode,

						noofbundles:txttotbundles.getValue(),
						noofreels:txttotreels.getValue(),
						totwt:txttotwt.getValue(),
						invno:'',
						invdt:'',
						status:'',
						closests:'',
						cancelflag:'N'	
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Packing List No -" + obj['slipno']);
	                                    TrnSalesPackSlipPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Packing List Not Saved! Pls Check!- " + obj['slipno']);                                                  
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
           height      : 170,
           x           : 10,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [txtSlipNo]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbSlipNo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptSlip]
   		  },
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 34,
                       border      : false,
                       items: [cmbInvType]
                   },
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 68,
                       border      : false,
                       items: [cmbCustomer]
                   },
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 98,
                       border      : false,
                       items: [cmbWHSlipNo]
                   },                   

                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 450,
                height      : 170,
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
                       items: [cmbAdvNo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptAdv]
   		  },
      
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 220,
                       x           : 0,
                       y           : 25,
                       border      : false,
                       items: [cmbSocNo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 25,
	               border      : false,
                       items: [dptSoc]
   		  },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 240,
                       x           : 0,
                       y           : 50,
                       border      : false,
                       items: [txtPartyRef]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 50,
	               border      : false,
                       items: [dptPartyRef]
   		  },



                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [txtAgent]
                   },

                  ] 
            },


          {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 350,
            width: 1200,
            x: 40,
            y: 180,
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
			width       : 940,
			height      : 350,
			x           : 10,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[  
/*
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
					labelWidth  : 50,
					width       : 280,
					x           : 0,
					y           : -5,
					border      : false,
					items: [cmbSize]
					},
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 150,
					x           : 0,
					y           : 30,
					border      : false,
					items: [txtdabalqty]
					},
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 150,
					x           : 150,
					y           : 30,
					border      : false,
					items: [txtstock]
					},
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 0,
					y           : 70,
					border      : false,
					items: [txtStsearch]
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
					width       : 180,
					x           : 160,
					y           : 70,
					border      : false,
					items: [txtEdsearch]
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
*/

				{ 
				 xtype       : 'fieldset',
				 title       : '',
				 width       : 900,
				 height      : 325,
				 x           : 100,
				 y           :   0,
				 border      : true,
				 layout      : 'absolute',
				 items:[ flxDetail,
					{ 
					       xtype       : 'fieldset',
					       title       : '',
					       labelWidth  : 50,
					       width       : 280,
					       x           : 0,
					       y           : 240,
					       border      : false,
					       items: [txttotbundles]
					 },
					{ 
					       xtype       : 'fieldset',
					       title       : '',
					       labelWidth  : 50,
					       width       : 280,
					       x           : 180,
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
/*
            {
                xtype: 'panel',
                title: 'Export Details',
                width: 220,
                height: 200,
                layout: 'absolute',
                items: [
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 350,
			       x           : 5,
			       y           : 5,
			       border      : false,
			       items: [txtcontainer]
			 },
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 60,
			       width       : 200,
			       x           : 300,
			       y           : 5,
			       border      : false,
			       items: [txtlorryno]
			 },
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 50,
			       width       : 250,
			       x           : 500,
			       y           : 5,
			       border      : false,
			       items: [txtsealno]
			 },
			{ 
			       xtype       : 'fieldset',
			       title       : '',
			       labelWidth  : 80,
			       width       : 220,
			       x           : 760,
			       y           : 5,
			       border      : false,
			       items: [cmbcontainer]
			 }



                ]
            }*/
          ]
         },


    ],     

});



   var loadPackSlipnodatastore = new Ext.data.Store({
      id: 'loadPackSlipnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlipDownload.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPackSlipNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'packno'
      ]),
    });

 

   function RefreshData(){
            Ext.getCmp('cmbSlipNo').hide();
            Ext.getCmp('save').setDisabled(false);

            TrnSalesPackSlipPanel.getForm().reset();
            flxDetail.getStore().removeAll();
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            loadPackSlipnodatastore.load({
                url: 'ClsTrnSalesPackSlipDownload.php',
                params: {
                    task: 'loadPackSlipNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
		}
            });

   };


var TrnSalesPackSlipWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - PACKING SLIP DOWNLOAD',
        items       : TrnSalesPackSlipPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : true,
        draggable   : false,
	listeners:{
            show:function(){

		loadPackSlipnodatastore.load({
                  url: 'ClsTrnSalesPackSlipDownload.php',
                  params: {
                     task: 'loadPackSlipNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                  },
		  callback:function()
                 {
//                     alert(loadPackSlipnodatastore.getCount());
                    txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
                 }
               });

               loadinvoicetypedataStore.load({
                  url: 'ClsTrnSalesPackSlipDownload.php',
                  params: {
                      task: 'loadinvtype'
                  }
	       });

               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesPackSlipDownload.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                  entrychk : gstFlag,  
                  }
               });
             }
        } 
    });
	
       TrnSalesPackSlipWindow.show();  
});var flxendno
