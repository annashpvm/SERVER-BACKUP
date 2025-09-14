Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finStartDate = localStorage.getItem('gfinstdate');
   var finEndDate = localStorage.getItem('gfineddate');
   


   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;
   
   var gstFlag = "Add";
   var hsncode = '';

   var hsncount = 0; 
new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);



new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'Are you sure want to Exit...',
		    fn: function(btn)
                    {
		        if (btn === 'yes')
			{
                                   TrnSalesPackSlipWindow.hide();
                        }
                    }  
               });   
            }
        }]);



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


  var txtTruck = new Ext.form.TextField({
        fieldLabel  : 'Truck',
        id          : 'txtTruck',
        name        : 'txtTruck',
        width       :  120,
        tabindex : 2
    });




  function datecheck()
  {
        var dt_today = new Date();
        var dt_slip = dptSlip.getValue();
   //     var diffdays = (dt_today.getDate()-dt_slip.getDate());
        var diffdays = Math.abs((dt_today-dt_slip));
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 

        if (diffdays >2)
        {     
             alert("You are Not Allowed to Raise the Packing Slip in the date of " +  Ext.util.Format.date(dt_slip,"d-m-Y"));
             dptSlip.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays < 0)
        {     
             alert("System will not allow to raise the Packing Slip in future date");
             dptSlip.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }


          if(Ext.util.Format.date(dptSlip.getValue(),"Y-m-d") > Ext.util.Format.date(finEndDate,"Y-m-d")){
             Ext.MessageBox.alert("Alert","Packing Slip Date is not in current finance year. Please check");
          }

 }


  var dptSlip= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }  	
    });

  var dptAdv= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptAdv',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,
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


 var loadHSNCOEdatastore = new Ext.data.Store({
      id: 'loadHSNCOEdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadHSNCODE"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['var_code','var_name','var_tariffno' 
      ]),
    });


 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemstockqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk','stk_units','var_tariffno'
      ]),
    });

var loadinvoicetypedataStore = new Ext.data.Store({
      id: 'loadinvoicetypedataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name','cust_ref','da_date','ordh_sono','ordh_sodate','ordh_ref','ordh_refdt','var_tariffno'
      ]),
    });

var loaddanodatastore = new Ext.data.Store({
      id: 'loaddanodatastore',
autoLoad: true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOno"}, // this parameter asks for listing
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfromtobox"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','rollno','stk_sono','var_tariffno'
      ]),
    });

var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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



var loadeditpackingslip = new Ext.data.Store({
      id: 'loadeditpackingslip',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"EditPackSlipNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_name','type_code','pckh_ordno','pckh_orddate','pckt_sono','pckh_ackdt','nos','unit','rate','pckh_date','varcode','pckh_invno','pckh_invstat',
'var_name','var_grpcode','var_unit','pckh_dano','pckh_dadt','cust_agent','agentname','cust_code','cust_ref','pckt_wt','pckt_sr_no','pckt_srno_fincode','pckt_size',
'pckt_sono','pckh_truck','pckt_sodate','var_tariffno'
      ]),
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
                  url: 'ClsTrnSalesPackSlip.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                  entrychk : gstFlag,
                  }
               });


                                loadeditpackingslipdetail.removeAll();

				loadeditpackingslipdetail.load({

				url: 'ClsTrnSalesPackSlip.php',
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

                                  Ext.getCmp('cmbCustomer').setDisabled(true);

                                  cmbAdvNo.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_dano'));
                                  cmbAdvNo.setValue(loadeditpackingslipdetail.getAt(0).get('pckh_dano'));

                  //                var pckh_dano = loadeditpackingslipdetail.getAt(0).get('pckh_dano');
                  //                cmbAdvNo.reset();
                  //                cmbAdvNo.store.loaddata(pckh_dano);

                                  dptAdv.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_dadt'),"d-m-Y"));

                                  dptSlip.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_date'),"d-m-Y"));

                                  cmbSONO.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckt_sono'));
                                  cmbSONO.setValue(loadeditpackingslipdetail.getAt(0).get('pckt_sono'));
                                  sdptSo.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckt_sodate'),"d-m-Y"));

                                  txtPartyRef.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_ordno'));
                                  dptPartyRef.setRawValue(Ext.util.Format.date(loadeditpackingslipdetail.getAt(0).get('pckh_orddate'),"d-m-Y"));
			          txtTruck.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_truck'));

//                                  cmbCustomer.setRawValue(loadeditpackingslipdetail.getAt(0).get('cust_ref'));
                                  cmbCustomer.setValue(loadeditpackingslipdetail.getAt(0).get('cust_code'));
				  txtTruck.setRawValue(loadeditpackingslipdetail.getAt(0).get('pckh_truck'));
          

				  txtSlipNo.setValue(cmbSlipNo.getValue());
//load data in flex - start
                                  var cnt=loadeditpackingslipdetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 
				   	    var stk_finyear    = loadeditpackingslipdetail.getAt(j).get('pckt_srno_fincode');
                                   	    var stk_var_code   = loadeditpackingslipdetail.getAt(j).get('pckt_size');
	                           	    var var_desc       = loadeditpackingslipdetail.getAt(j).get('var_name');
                                            var stk_sr_no      = loadeditpackingslipdetail.getAt(j).get('pckt_sr_no');
                            	   	    var stk_wt         = loadeditpackingslipdetail.getAt(j).get('pckt_wt');
                                   	    var var_grpcode    = loadeditpackingslipdetail.getAt(j).get('var_grpcode');
//                                   	    var stk_units      = loadeditpackingslipdetail.getAt(j).get('var_unit');
                                            var RowCnt = flxDetail.getStore().getCount() + 1;  
                                            flxDetail.getStore().insert(
                                               flxDetail.getStore().getCount(),
                                               new dgrecord({
	                                           varname     : var_desc,
		
						   stksrno     : stk_sr_no,
						   stkwt       : stk_wt,
						   varcode     : stk_var_code,
						   vargrpcode  : var_grpcode,
						   stkfinyear  : stk_finyear,
						   stkfincode  : stk_finyear,
                                                   soentno     : loadeditpackingslipdetail.getAt(j).get('pckt_sono'),	
                                                   soentdate   : loadeditpackingslipdetail.getAt(j).get('pckt_sodate'),
                                                   var_tariffno : loadeditpackingslipdetail.getAt(j).get('var_tariffno'),    	
                                               })
                                       	    );
					   grid_tot();
        				}

			            }
//load data in flex - end
			           loadsizedataStore.load({
                                   url: 'ClsTrnSalesPackSlip.php',
                                   params: {
				         task: 'loadsize',
                                  	 customer:cmbCustomer.getValue(),
				         fincode: GinFinid,
                                         compcode:Gincompcode,
				         dano : cmbAdvNo.getRawValue(),
                                         sono : cmbSONO.getRawValue()
  				    },
                                    callback:function()
                                    {
//           alert(loadsizedataStore.getAt(0).get('var_code')); 
//                                        cmbSize.setRawValue(loadsizedataStore.getAt(0).get('var_name'));  
                                  var cnt = loadsizedataStore.getCount();
                                   if (cnt == 0)
                                   {
alert("Check Tax Ledger in Order / Customer Master. Both are not same.");
                                   }  
                                   else 
                                   {    
                                        cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
                                   } 

                                    }
                                  });

				loadSOnodatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadSOno',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode: Gincompcode,
				    dano : loadeditpackingslipdetail.getAt(0).get('pckh_dano'),
				},
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
				loaddanodatastore.removeAll();
				loaddanodatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loaddano',
				    custcode:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				  
		                  },
				  callback:function(){ 
					cmbAdvNo.setValue(loaddanodatastore.getAt(0).get('da_no'));
					loadSOnodatastore.removeAll();
					loadSOnodatastore.load({
					url: 'ClsTrnSalesPackSlip.php',
					params: {
					    task: 'loadSOno',
					    customer:cmbCustomer.getValue(),
					    fincode: GinFinid,
					    compcode: Gincompcode,
					    dano : loaddanodatastore.getAt(0).get('da_no')
					},
					callback:function() 
					{
					 dptAdv.setRawValue(Ext.util.Format.date(loadSOnodatastore.getAt(0).get('da_date'),"d-m-Y"));
					 cmbSONO.setValue(loadSOnodatastore.getAt(0).get('da_ackno'));
						loadsizedataStore.removeAll();
						loadsizedataStore.load({


						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loadsize',
						    customer:cmbCustomer.getValue(),
						    fincode: GinFinid,
						    compcode:Gincompcode,
						    dano : loaddanodatastore.getAt(0).get('da_no'),
						    sono : loadSOnodatastore.getAt(0).get('da_ackno')
						},
						callback:function()
						{
		//alert(loadsizedataStore.getCount());
				                   var cnt = loadsizedataStore.getCount();
				                   if (cnt == 0)
				                   {
		alert("Check Tax Ledger in Order / Customer Master. Both are not same.");
				                   }  
				                   else
						{ 
				                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
				                sdptSo.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_sodate'),"d-m-Y"));
				                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));
						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));

						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : loaddanodatastore.getAt(0).get('da_no'),
						    sono : loadSOnodatastore.getAt(0).get('da_ackno'),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
// alert(loaddetailsdatastore.getCount());
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});

loadfromtoboxDatastore.removeAll();
txtstock.setValue('');
rbunit=0;
					        loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
                                         	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),

						},
						callback:function()
						{



						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
                          hsncode = loaditemstockdatastore.getAt(0).get('var_tariffno');  
                                                if (loaditemstockdatastore.getAt(0).get('var_tariffno') == '')
                                                {
                         			alert("HSN Code Error in the Size. Check in Size Master..");
                                                } 
                                                else
                                                {                   
							loadfromtoboxDatastore.load({
							url: 'ClsTrnSalesPackSlip.php',
							params: {
							    task: 'loadfromtobox',
						            sizecode : loadsizedataStore.getAt(0).get('var_code'),
							    fincode  : GinFinid,
							    compcode : Gincompcode,
							    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
		                                	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),
							}
				
							});
                                                 }
						txtStartNo.focus();
						txtEndNo.focus();

						}
						});


                                                }


						}
					    });//loadsize
					}
					});//loadSOno
				  }
                   		});//loaddano

				loadcusttypedatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
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


var cmbAdvNo = new Ext.form.ComboBox({

        fieldLabel      : 'DP No.',
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
				loadSOnodatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadSOno',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode: Gincompcode,
				    dano : cmbAdvNo.getValue()
				},
                                callback:function() 
				{
                                 dptAdv.setRawValue(Ext.util.Format.date(loadSOnodatastore.getAt(0).get('da_date'),"d-m-Y"));

				cmbSONO.setValue(loadSOnodatastore.getAt(0).get('da_ackno'));

                                      
				loadsizedataStore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    sono : loadSOnodatastore.getAt(0).get('da_ackno')
				},
				callback:function()
				{
                                   var cnt = loadsizedataStore.getCount();
                                   if (cnt == 0)
                                   {
alert("Check Tax Ledger in Order / Customer Master. Both are not same.");
                                   }  
                                   else
                                   {        
		                    txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
                                sdptSo.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_sodate'),"d-m-Y"));
                                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));

						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : cmbAdvNo.getRawValue(),
						    sono : loadSOnodatastore.getAt(0).get('da_ackno'),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});



						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlip.php',
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
                          hsncode = loaditemstockdatastore.getAt(0).get('var_tariffno');  
						}
						});


						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
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
				}
			    });
                                }
			    });
			   },
		
		     }
		});


var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : 'SO No.',
        width           : 110,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
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
                                loadsizedataStore.removeAll();
                                loaditemstockdatastore.removeAll();
                                loadfromtoboxDatastore.removeAll(); 

				loadsizedataStore.load({


				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    sono : cmbSONO.getRawValue()
				},
				callback:function()
				{
//alert(loadsizedataStore.getCount());

                                  var cnt = loadsizedataStore.getCount();
                                   if (cnt == 0)
                                   {
alert("Check Tax Ledger in Order / Customer Master. Both are not same.");
                                   }  
                                   else
                                {  
 		
                                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
                                sdptSo.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_sodate'),"d-m-Y"));
                                dptPartyRef.setRawValue(Ext.util.Format.date(loadsizedataStore.getAt(0).get('ordh_refdt'),"d-m-Y"));

						cmbSize.setValue(loadsizedataStore.getAt(0).get('var_code'));
                                                loaddetailsdatastore.removeAll();
						loaddetailsdatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loadqtydet',
						    custcode:cmbCustomer.getValue(),
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    dano : cmbAdvNo.getRawValue(),
						    sono : cmbSONO.getRawValue(),
						    sizecode : loadsizedataStore.getAt(0).get('var_code')
						},
						callback:function()
						{
						txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
						var rate = loaddetailsdatastore.getAt(0).get('da_urate');
						}
						});


                                                loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
						    sono : cmbSONO.getRawValue(),
						},
						callback:function()
						{

						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
                          hsncode = loaditemstockdatastore.getAt(0).get('var_tariffno');  
                               if (loaditemstockdatastore.getAt(0).get('var_tariffno') == '')
                                                {
                         			alert("HSN Code Error in the Size. Check in Size Master..");
                                                } 
                                                else
                                                {   

                                                loadfromtoboxDatastore.removeAll(); 
						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptSlip ,
                                  		    sono : cmbSONO.getRawValue(),
						}
				
						});
						}
                                                 }
						});
                                          
						txtStartNo.focus();
						txtEndNo.focus();

                                }
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


                        loadHSNCOEdatastore.removeAll();
			loadHSNCOEdatastore.load({
			url: 'ClsTrnSalesPackSlip.php',
			params: {
			    task: 'loadHSNCODE',
			    sizecode : cmbSize.getValue()
			},
			callback:function()
			{
	                    flxstartno.getStore().removeAll();
		                flxendno.getStore().removeAll();
                           if (loadHSNCOEdatastore.getAt(0).get('var_tariffno') == '')
                           {    
                              alert("Eror in HSN Code. Please check Size Master..");  
                           }
                           else
                           {    
		                flxstartno.getStore().removeAll();
		                flxendno.getStore().removeAll();

		                loaddetailsdatastore.removeAll();
				loaddetailsdatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadqtydet',
				    custcode : cmbCustomer.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    dano     : cmbAdvNo.getRawValue(),
				    sono     : cmbSONO.getRawValue(),
				    sizecode : cmbSize.getValue()
				},
				callback:function()
				{

	//alert(loaddetailsdatastore.getCount());

					txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
					var rate = loaddetailsdatastore.getAt(0).get('da_urate');
                                        loaditemstockdatastore.removeAll();
					loaditemstockdatastore.load({
						url: 'ClsTrnSalesPackSlip.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : cmbSize.getValue(),
		                                    sono     : cmbSONO.getRawValue(),
				                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")

						},
						callback:function()
						{

							txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
					  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
                                                       hsncode = loaditemstockdatastore.getAt(0).get('var_tariffno');  
//alert(hsncode);     
                                                        loadfromtoboxDatastore.removeAll(); 
							loadfromtoboxDatastore.load({
							url: 'ClsTrnSalesPackSlip.php',
							params: {
							    task: 'loadfromtobox',
						            sizecode : cmbSize.getValue(),
							    fincode  : GinFinid,
							    compcode : Gincompcode,
		                                	    sono     : cmbSONO.getRawValue(),
							    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
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
//alert(st_no);
//alert(end_no);

			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
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



                                 hsncnt  = 1;  

                                 for (var k=0;k<selrows;k++) 
                                 { 

                                    if (sel[k].data.var_tariffno == hsncode)
                                    {
                                        hsncnt = hsncnt + 1;
                                     }
                                     else
                                     {
                                      hsncnt  = 0;  
                                     }     
                                 } 


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
  
             			if (hsncnt == 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Different HSN Code will not allowed");
			        }
				else  
                                {
                            
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
                                                  var_tariffno : hsncode, 
                                   		})

                               			);
						grid_tot();
						}
					}		
st_no=0;
end_no=0;                          
			        }
			
            			}
}
});
/*loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
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
				url: 'ClsTrnSalesPackSlip.php',
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

                                
//                               flxendno.getSelectionModel().removeAll();
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
				url: 'ClsTrnSalesPackSlip.php',
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

                        stkcnt  = 0;
       
                                 hsncnt  = 1;  

                                 for (var k=0;k<selrows;k++) 
                                 { 

                                    if (sel[k].data.var_tariffno == hsncode)
                                    {
                                        hsncnt = hsncnt + 1;
                                     }
                                     else
                                     {
                                      hsncnt  = 0;  
                                     }     
                                 } 

                         
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

             			if (hsncnt == 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Different HSN Code will not allowed");
			        }
				else  
                                {
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
                                                  var_tariffno : hsncode,   
						 	    
                                   		})

                               			);

						grid_tot();
						}
					}		
			    
			
            			}
                              }
}
});
st_no=0;
end_no=0;  

                        	flxstartno.getSelectionModel().clearSelections();
                              	flxendno.getSelectionModel().clearSelections();


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
           'varname','unittype','stksrno','stkwt','varcode','varunit','vargrpcode','stkfinyear','stkfincode','vartruck','var_tariffno'
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
	{header: "SO No.",   dataIndex: 'soentno',sortable:true,width:80,align:'left'},
	{header: "SO Date",  dataIndex: 'soentdate',sortable:true,width:80,align:'left'},
	{header: "ItemCode", dataIndex: 'varcode',sortable:true,width:80,align:'left'},
	{header: "Prd.Code", dataIndex: 'vargrpcode',sortable:true,width:80,align:'left'},	
	{header: "Finyear", dataIndex: 'stkfinyear',sortable:true,width:80,align:'left' ,hidden:true},
	{header: "Fincode", dataIndex: 'stkfincode',sortable:true,width:80,align:'left'},
	{header: "hsncode", dataIndex: 'var_tariffno',sortable:true,width:80,align:'left'}
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

function edit_click()
{
    gstFlag = "Edit";
    Ext.getCmp('cmbSlipNo').show();
//                    flxdetail.getStore().removeAll();
    loadeditpackingslip.load({
		url: 'ClsTrnSalesPackSlip.php',
		params: {
		    task: 'loadPackSlipNoedit',
	            fincode: GinFinid,
		    compcode:Gincompcode,
                }

    });   
}

function save_click()
{

        if(Ext.util.Format.date(dptSlip.getValue(),"Y-m-d") > Ext.util.Format.date(finEndDate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Packing Slip Date is not in current finance year. Please check");
        }
 
        else if(cmbCustomer.getRawValue()=="" || cmbCustomer.getValue()==0)
	{
		alert("Select Customer..");
	}

	 else if(cmbAdvNo.getRawValue()=="" || cmbAdvNo.getValue()==0)
	{
		alert("Select Despatch Plan No..");
	}
	else if(cmbSONO.getRawValue()=="" || cmbSONO.getValue()==0)
	{
		alert("Select SOC No..");
	}
	else if(txtTruck.getRawValue() == "")
	{
		alert("Enter Truck Number ..");
	}
	else if (flxDetail.rows == 0)
	    {
		Ext.Msg.alert('Packing Slip','Grid should not be empty..');
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
		           msg: "Do You Want to Save  the Packing Slip",
		    	   fn: function(btn)
			   {         
			      if (btn == 'yes')
		              {   
		               var finData = flxDetail.getStore().getRange();                                        
			       var finupdData = new Array();
		               Ext.each(finData, function (record) {
		               finupdData.push(record.data);
		               });  


	//             Ext.getCmp('save').setDisabled(true);



	//       alert(gstFlag);
		               Ext.Ajax.request({
			       url: 'TrnSalesPackSlipSave.php',
			       params:
				{
		                savetype:gstFlag,
		                cnt: finData.length,
	       	                griddet: Ext.util.JSON.encode(finupdData),
				compcode :Gincompcode,
				fincode :GinFinid,                                      
		                slipno : txtSlipNo.getValue(),
		                slipdate :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),	


				ordno : txtPartyRef.getRawValue(),
				orddate : Ext.util.Format.date(dptPartyRef.getValue(),"Y-m-d"),


				sono: cmbSONO.getRawValue(),
				sodt:Ext.util.Format.date(sdptSo.getValue(),"Y-m-d"),
				dano : cmbAdvNo.getRawValue(),
				dadate : Ext.util.Format.date(dptAdv.getValue(),"Y-m-d"),
				party : cmbCustomer.getValue(),
		                truck : txtTruck.getRawValue(),  
				noofreels:txttotreels.getValue(),
				totwt:txttotwt.getValue(),
				invno:'0',
				invdt:'',
				status:'N',
				closests:'N',
				cancelflag:'0'	
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

}

	
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
                    edit_click();

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
                      save_click();
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
                       width       : 450,
                       x           : 0,
                       y           : 40,
                       border      : false,
                       items: [cmbCustomer]
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
                       items: [cmbSONO]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 25,
	               border      : false,
                       items: [sdptSo]
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
                       width       : 240,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [txtTruck]
                   },



                  ] 
            },


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
/*
            {
                xtype: 'panel',
                title: 'Container Details',
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
            }
*/
          ]
         },


    ],     

});

   function RefreshData(){
            gstFlag = "Add";
            Ext.getCmp('cmbSlipNo').hide();
            Ext.getCmp('save').setDisabled(false);
            Ext.getCmp('cmbCustomer').setDisabled(false);

            TrnSalesPackSlipPanel.getForm().reset();
            flxDetail.getStore().removeAll();
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            loadPackSlipnodatastore.load({
                url: 'ClsTrnSalesPackSlip.php',
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



   var loadPackSlipnodatastore = new Ext.data.Store({
      id: 'loadPackSlipnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
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

 
var TrnSalesPackSlipWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - PACKING SLIP ENTRY',
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

		loadPackSlipnodatastore.load({
                  url: 'ClsTrnSalesPackSlip.php',
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

               loadinvoicetypedataStore.load({
                  url: 'ClsTrnSalesPackSlip.php',
                  params: {
                      task: 'loadinvtype'
                  }
	       });

               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesPackSlip.php',
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
});
