Ext.onReady(function(){
Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var invyear = 0;
   var rbunit=0;

   var invtype;
   var taxcode=0;   

   var gstFlag = "Add";

   var tcsper = 0;
   var frtperMT  = 0;

   var cdisc= 0,ddisc= 0,reeldis= 0,regdis= 0,adisc= 0,insper=0;
   var vouno = ''
   var loadSalesReturndatastore = new Ext.data.Store({
      id: 'loadSalesReturndatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSalesReturnNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'retno'
      ]),
    });


   var loadSRlistdatastore = new Ext.data.Store({
      id: 'loadSRlistdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSRNolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reth_no'
      ]),
    });


   var loadSRdetaildatastore = new Ext.data.Store({
      id: 'loadSRlistdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSRNodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reth_comp_code', 'reth_fincode', 'reth_no','reth_date', 'reth_invtype', 'reth_rettype', 'reth_cust', 'reth_noofreels', 'reth_noofbun', 'reth_totwt','reth_taxtag', 'reth_insper', 'reth_insamt', 'reth_comm', 'reth_cashdis', 'reth_dealerdis', 'reth_reeldis', 'reth_regdis', 'reth_addnldis', 'reth_frieght','reth_roff', 'reth_amt', 'reth_invno', 'reth_invdate', 'reth_updstat', 'reth_crdstat', 'reth_vouno', 'reth_vouyear', 'reth_cgst_per', 'reth_cgst_amt','reth_sgst_per', 'reth_sgst_amt', 'reth_igst_per', 'reth_igst_amt','rett_var', 'rett_sr_no', 'rett_unit', 'rett_wt', 'rett_urate', 'rett_tax', 'rett_srno_fincode','rett_variffno','rett_hsncode','cust_ref','var_code', 'var_name', 'var_grpcode','var_unit', 'var_size1', 'var_size2', 'invh_comp_code', 'invh_fincode', 'invh_no','invh_date', 'invh_crd_days', 'invh_grace_days','invh_insper', 'invh_insamt', 'invh_comm', 'invh_frt_rate', 'invh_frt_amt','invh_roff', 'invh_netamt','invh_noofbun', 'invh_noofreels', 'invh_totwt','invh_slipno', 'invh_vouno', 'invh_taxableamt', 'invh_others','invh_sgst_per', 'invh_sgst_amt', 'invh_cgst_per', 'invh_cgst_amt','invh_igst_per', 'invh_igst_amt', 'invh_A4inv', 'invh_frt_type','partyname','invh_tcs_per', 'agentname','type_name','tax_name','tax_code','reth_vouno','rett_return_wt','rett_wt_change','rett_newno','reth_tcs'
      ]),
    });


var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpackslipdespatchdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_name','itemcode','unitcode','pckt_sr_no','pckt_wt','invt_urate','unit' ,'cashdisc','dealerdisc','reeldisc','regdisc','addndisc','pckt_srno_fincode' 
        ,'invt_hsncode'
      ]),
    });



var loadsizedatastore = new Ext.data.Store({
      id: 'loadsizedatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'var_code','var_name','invh_date','invh_our_ordno','invh_type','invh_taxtag','invh_insper','invh_comm','invh_totwt','pckh_no','pckh_date',
'cust_ref','type_code','type_name','tax_name','tax_sal_led_code','invh_sgst_per','invh_cgst_per','invh_igst_per',
'tax_cgst_ledcode','invt_hsncode','invt_cashdis_yn','invt_cashdis_pmt','invt_dealerdis_yn','invt_dealerdis_pmt','invt_reeldis_yn',
'invt_reeldis_pmt','invt_regdis_yn','invt_regdis_pmt','invt_addnldis_yn','invt_addnldis_pmt','invh_tcs_per',
'invh_frt_rate','invh_frt_amt'
      ]),
    });

 var loadFinYearDataStore = new Ext.data.Store({
     id: 'loadFinYearDataStore',
      autoLoad : true,
     proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),

            baseParams:{task:"loadFinYear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'fin_code', type: 'int',mapping:'fin_code'},
	{name:'fin_year', type: 'string',mapping:'fin_year'}
      ]),
    });

 var loadCustomerStore = new Ext.data.Store({
      id: 'loadCustomerStore',
 //     autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
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

var loadInvoiceDataStore = new Ext.data.Store({
      id: 'loadInvoiceDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'inv_no'
      ]),
    });

var loadstartendnodatastore = new Ext.data.Store({
      id: 'loadstartendnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsrno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'no','fincode','pckt_unit'
      ]),
    });
/*
var loadpackslipdetdatastore = new Ext.data.Store({
      id: 'loadpackslipdetdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpackslipdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'var_name','pckt_sr_no','pckt_wt','pckt_unit','var_reams','pckh_noofbun','pckh_noofreels','pckh_totwt','pckt_sr_no','var_unit'
      ]),
    });
*/

var cmbFinYear = new Ext.form.ComboBox({
        fieldLabel      : 'Fin Year',
        width           : 180,
        displayField    : 'fin_year', 
        valueField      : 'fin_code',
        hiddenName      : '',
        id              : 'cmbFinYear',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFinYearDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {
//alert(Gincompcode);
//alert(GinFinid);
                        loadCustomerStore.removeAll();
	                loadCustomerStore.load({
			url: 'ClsTrnSalesReturn.php',
			params: {
               			    task: 'loadcustomer',
				    compcode :Gincompcode,
				    finid:cmbFinYear.getValue(),
				},
			callback:function()

               			{
//alert(loadCustomerStore.getCount());
                                   invyear = cmbFinYear.getValue();

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
        store           : loadCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {

                        flxstartno.getStore().removeAll();
           		flxendno.getStore().removeAll();
                        loadsizedatastore.removeAll();
                        loadInvoiceDataStore.removeAll();
	                loadInvoiceDataStore.load({
			url: 'ClsTrnSalesReturn.php',
			params: {
               			    task: 'loadinvno',
                                    custcode :cmbCustomer.getValue(), 
				    compcode :Gincompcode,
				    finid    : cmbFinYear.getValue()
				},
			callback:function()

               			{
//alert(loadInvoiceDataStore.getCount());
				}

				
	      	       });
		   }
                }

});

 
var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Inv. No',
        width           : 120,
        displayField    : 'inv_no', 
        valueField      : 'inv_no',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvoiceDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
					
					loadsizedatastore.load({
					url: 'ClsTrnSalesReturn.php',
					params: {
					    task: 'loadsize',
					    invno:cmbInvNo.getRawValue(),
					    compcode :Gincompcode,
					    finid: cmbFinYear.getValue()
					},
					callback:function()
					{

                                        tcsper = 0;
                                        frtperMT = 0;
					txtSlipNo.setRawValue(loadsizedatastore.getAt(0).get('pckh_no'));
					txtTaxTag.setRawValue(loadsizedatastore.getAt(0).get('tax_name'));
					txtCgstPer.setRawValue(loadsizedatastore.getAt(0).get('invh_cgst_per'));
					txtSgstPer.setRawValue(loadsizedatastore.getAt(0).get('invh_sgst_per'));
					txtIgstPer.setRawValue(loadsizedatastore.getAt(0).get('invh_igst_per'));
					txtTCSPer.setRawValue(loadsizedatastore.getAt(0).get('invh_tcs_per'));
					tcsper = loadsizedatastore.getAt(0).get('invh_tcs_per');
					frtperMT = loadsizedatastore.getAt(0).get('invh_frt_rate');


					insper = loadsizedatastore.getAt(0).get('invh_insper');
                                        dptInv.setRawValue(Ext.util.Format.date(loadsizedatastore.getAt(0).get('invh_date'),"d-m-Y"));
                                        dptSlip.setRawValue(Ext.util.Format.date(loadsizedatastore.getAt(0).get('pckh_date'),"d-m-Y"));
                                        invtype = loadsizedatastore.getAt(0).get('invh_type');
                                        taxcode = loadsizedatastore.getAt(0).get('invh_taxtag');

			flxDetail.getStore().removeAll();

					}
					
				    });
				   }


		     }
	

});


var dptInv= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dptInv',
	name: 'Date',
	format: 'd-m-Y',
	readOnly : true,
	value: new Date()
});

var txtSlipNo = new Ext.form.NumberField({
	fieldLabel  : 'Slip No.',
	id          : 'txtSlipNo',
	name        : 'txtSlipNo',
	width       :  80,
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




var txtTaxTag = new Ext.form.TextField({
	fieldLabel  : 'Tax Tag',
	id          : 'txtTaxTag',
	name        : 'txtTaxTag',
	readOnly : true,
	width       :  275,
	tabindex : 2
});

var txtSalesRetNo = new Ext.form.NumberField({
	fieldLabel  : 'Sales Ret. No',
	id          : 'txtSalesRetNo',
	name        : 'txtSalesRetNo',
	width       :  60,
	readOnly : true,	
	tabindex : 2
});

var dptSalRtn= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dptSalRtn',
	name: 'Date',
	format: 'd-m-Y',
//	readOnly : true,
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

var dptInvYear= new Ext.form.DateField({
	fieldLabel: 'Invoice Year',
	id: 'dptInvYear',
	name: 'Date',
	format: 'Y',
	readOnly : true,
	value: new Date()
});


var flxDetail = new Ext.grid.EditorGridPanel({
	frame: false,
	store: [],
	sm: new Ext.grid.RowSelectionModel(),
	autoShow: false,
	stripeRows: true,
	scrollable: true,
	hidden:false,
	height: 190,
	width: 750,
	
	x: 1,
	y: 1,
	columns: [
	{header: "Item ", dataIndex: 'itemref',sortable:true,width:150,align:'left'},
        {header: "Number", dataIndex: 'number',sortable:true,width:100,align:'left'},
        {header: "Weight", dataIndex:'weight',sortable:true,width:80,align:'right'},
        {header: "Unit Rate", dataIndex:'unitrate',sortable:true,width:80,align:'right'},
        {header: "Amount" , dataIndex: 'amount',sortable:true,width:80,align:'right',
              renderer: function (v, params, record) {

                    var retval;

                     if (record.data.wtchange == "Y")
                         retval = Number(record.data.retweight) * Number(record.data.unitrate)/1000;
                     else
                         retval = Number(record.data.weight) * Number(record.data.unitrate)/1000;

                    retval =  Ext.util.Format.number(retval.toFixed(2),'0.00');
                    return retval;
                }
        },
        {header: "itemcode", dataIndex:'itemcode',sortable:true,width:60,align:'left',hidden : true}, 
        {header: "fincode", dataIndex:'fincode',sortable:true,width:60,align:'left',hidden : true}, 
        {header: "hsncode", dataIndex:'hsncode',sortable:true,width:60,align:'left'} ,
        {header: "WT Change", dataIndex:'wtchange',sortable:true,width:90,align:'center'}, 
        {header: "Ret Wt", dataIndex:'retweight',sortable:true,width:80,align:'right',

              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    decimalPrecision: 3,

                    listeners: {
                       blur:function(){
                              grid_tot();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxDetail.getSelectionModel().getSelections();
                            var wtopt  = selrow.get('wtchange');


                         grid_tot();
                        },

                    }
                }

        },
        {header: "NewNumber", dataIndex: 'newnumber',sortable:true,width:100,align:'left'},
	],

        listeners:{
                       blur:function(){
                              grid_tot();
                        },
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


 
                if (cellIndex == 8)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.wtchange == 'N')
                                    flag = 'N';
                                else                                   
                                    flag = 'Y';
                                var newno = Number(selected_rows[i].data.number) + 50 ;              
                               	colname = 'wtchange';
                               	colname2 = 'newnumber';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				    selected_rows[i].set(colname2, newno);
           
				} else 
				{
				   selected_rows[i].set(colname, 'N');
                                  selected_rows[i].set(colname2, '');
				}
                       }   
                }
  
             }  ,
	
           'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
            if (cellIndex < 7)
                { 
            Ext.Msg.show({
               title: 'Sales Return',
               icon: Ext.Msg.QUESTION,
               buttons: Ext.MessageBox.YESNO,
               msg: 'Do You Want To Remove This Record!',
               fn: function(btn){
               if (btn === 'yes')
                  {
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
     }
});



var txtTotalR = new Ext.form.NumberField({
	fieldLabel  : 'Total Reels',
	id          : 'txtTotalR',
	name        : 'txtTotalR',
	width       :  50,
	readOnly : true,
	tabindex : 2
});

var txtTotalWt = new Ext.form.NumberField({
	fieldLabel  : 'Act Weight',
	id          : 'txtTotalWt',
	name        : 'txtTotalWt',
	width       :  80,
	readOnly : true,
	tabindex : 2
});


var txtTotalRetWt = new Ext.form.NumberField({
	fieldLabel  : 'Ret Weight',
	id          : 'txtTotalRetWt',
	name        : 'txtTotalRetWt',
	width       :  80,
	readOnly : true,
	tabindex : 2
});


var txtTotalVal = new Ext.form.NumberField({
	fieldLabel  : 'Value',
	id          : 'txtTotalVal',
	name        : 'txtTotalVal',
	width       :  80,
	readOnly : true,
	tabindex : 2
});


var txtTCS = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtTCS',
	name        : 'txtTCS',
	width       :  80,
	readOnly : true,
	tabindex : 2
});

var txtRoff = new Ext.form.NumberField({
	fieldLabel  : 'R. Off',
	id          : 'txtRoff',
	name        : 'txtRoff',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var txtInsr = new Ext.form.NumberField({
	fieldLabel  : 'Insurance',
	id          : 'txtInsr',
	name        : 'txtInsr',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var txtTaxableAmt = new Ext.form.NumberField({
	fieldLabel  : 'Taxable Amount',
	id          : 'txtTaxableAmt',
	name        : 'txtTaxableAmt',
	width       :  70,
	readOnly : true,
	tabindex : 2
});




var txtFreight = new Ext.form.NumberField({
	fieldLabel  : 'Freight',
	id          : 'txtFreight',
	name        : 'txtFreight',
	width       :  70,
        enableKeyEvents : true,
	tabindex : 2,
        listeners   :{
           keyup:function(){
              calculatevalue();
           },

        }
});

var txtCgstPer = new Ext.form.NumberField({
	fieldLabel  : 'CGST',
	id          : 'txtCgstPer',
	name        : 'txtCgstPer',
	width       :  70,
	readOnly : true,
	tabindex : 2
});


var txtCgstAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtCgstAmt',
	name        : 'txtCgstAmt',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var txtSgstPer = new Ext.form.NumberField({
	fieldLabel  : 'SGST',
	id          : 'txtSgstPer',
	name        : 'txtSgstPer',
	width       :  70,
	readOnly : true,
	tabindex : 2
});


var txtSgstAmt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtSgstAmt',
	name        : 'txtSgstAmt',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var txtIgstPer = new Ext.form.NumberField({
	fieldLabel  : 'IGST',
	id          : 'txtIgstPer',
	name        : 'txtIgstPer',
	width       :  70,
	readOnly : true,
	tabindex : 2
});


var txtIgstAmt= new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtIgstAmt',
	name        : 'txtIgstAmt',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var txtNetAmt = new Ext.form.NumberField({
	fieldLabel  : 'Net Amount',
	id          : 'txtNetAmt',
	name        : 'txtNetAmt',
	readOnly : true,
	width       :  100,
	tabindex : 2
});

var txtTCSPer = new Ext.form.NumberField({
	fieldLabel  : 'TCS',
	id          : 'txtTCSPer',
	name        : 'txtTCSPer',
	width       :  70,
	readOnly : true,
	tabindex : 2
});

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {

                                    loadstartendnodatastore.load({
					url: 'ClsTrnSalesReturn.php',
					params: {
					    task: 'loadsrno',
					    size:cmbSize.getValue(),
					    compcode :Gincompcode,
					    finid: cmbFinYear.getValue(),
				            slipno: txtSlipNo.getValue()
					},
				callback:function()
	               		{
                                    rbunit = loadstartendnodatastore.getAt(0).get('pckt_unit');
//alert(loadstartendnodatastore.getCount());
				}

					
				    });
				   }


		     }
	

});


/*
Ext.define('comboSelectedCount', {
        alias: 'plugin.selectedCount',
        init: function (combo) {

            var fl = combo.getFieldLabel();

            combo.on({
                select: function (me, records) {

                    var len = records.length,
                        store = combo.getStore();
                    
                    // toggle all selections
                    Ext.each(records, function (obj, i, recordsItself) {
                        if (records[i].data.abbreviation === 'ALL') {
                            len = store.getCount();
                            combo.select(store.getRange());
                        }
                    });

                    me.setFieldLabel(fl + ' (' + len + ' selected)');
                },
                beforedeselect: function (me, record, index) {
                    me.setFieldLabel(fl);
                }
            })
        }
    });

*/


  function datecheck()
  {
/*
        var dt_today = new Date();
        var dt_invoice = dptSalRtn.getValue();

//        var diffdays = (dt_today.getDate()-dt_invoice.getDate());
        var diffdays = dt_today.getTime()-dt_invoice.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >30)
        {     
             alert("You are Not Allowed to Modify the Sales Return Entry in the date of " +  Ext.util.Format.date(dt_invoice,"d-m-Y"));
             dptSalRtn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the Sales Return in Future date");
             dptSalRtn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
*/
 }

var cmbsrno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 60,
        displayField    : 'reth_no', 
        valueField      : 'reth_no',
        hiddenName      : '',
        id              : 'cmbsrno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSRlistdatastore, 
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
         select: function () {
		loadSRdetaildatastore.removeAll();
		loadSRdetaildatastore.load({
			url: 'ClsTrnSalesReturn.php',
			params: {
			task: 'loadSRNodetail',
			compcode :Gincompcode,
			finid:GinFinid,
			srno: cmbsrno.getValue()
			},
			callback:function()
			{
//alert(loadSRdetaildatastore.getAt(0).get('reth_invdate'));           
                           flxDetail.getStore().removeAll();
                           var cnt = loadSRdetaildatastore.getCount();

                           txtSalesRetNo.setValue(loadSRdetaildatastore.getAt(0).get('reth_no'));

                           cmbFinYear.setValue(loadSRdetaildatastore.getAt(0).get('reth_fincode'));

                           cmbCustomer.setValue(loadSRdetaildatastore.getAt(0).get('reth_cust'));

//                           dptSalRtn.setValue(loadSRdetaildatastore.getAt(0).get('reth_date')); 
//                           dptSalRtn.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_date')); 
                           dptSalRtn.setRawValue(Ext.util.Format.date(loadSRdetaildatastore.getAt(0).get('reth_date'),"d-m-Y"));

                           cmbInvNo.setValue(loadSRdetaildatastore.getAt(0).get('reth_invno'));
                           cmbInvNo.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_invno'));
                           dptInv.setRawValue(Ext.util.Format.date(loadSRdetaildatastore.getAt(0).get('reth_invdate'),"d-m-Y"));


                           txtSlipNo.setValue(loadSRdetaildatastore.getAt(0).get('invh_slipno'));
//                           dptSlip.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_invdate')); 
                           dptSlip.setRawValue(Ext.util.Format.date(loadSRdetaildatastore.getAt(0).get('reth_invdate'),"d-m-Y"));

				txtTCSPer.setRawValue(loadSRdetaildatastore.getAt(0).get('invh_tcs_per'));
				tcsper = loadSRdetaildatastore.getAt(0).get('invh_tcs_per');



		
			   txtTaxTag.setValue(loadSRdetaildatastore.getAt(0).get('tax_name')); 
                           insper = loadSRdetaildatastore.getAt(0).get('reth_insper');
                           txtInsr.setValue(loadSRdetaildatastore.getAt(0).get('reth_insamt')); 

			   txtCgstPer.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_cgst_per'));
			   txtSgstPer.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_sgst_per'));
			   txtIgstPer.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_igst_per'));
 
			   txtTCS.setRawValue(loadSRdetaildatastore.getAt(0).get('reth_tcs'));



                           vouno = loadSRdetaildatastore.getAt(0).get('reth_vouno');
                           taxcode = loadSRdetaildatastore.getAt(0).get('reth_taxtag');

                           for(var j=0; j<cnt; j++)
			   {
 
  
                              var RowCnt = flxDetail.getStore().getCount() + 1;  
                              flxDetail.getStore().insert(
                                  flxDetail.getStore().getCount(),
                                  new dgrecord({
					itemref    : loadSRdetaildatastore.getAt(j).get('var_name'),
              				number     : loadSRdetaildatastore.getAt(j).get('rett_sr_no'),
					weight     : loadSRdetaildatastore.getAt(j).get('rett_wt'),
					unitrate   : loadSRdetaildatastore.getAt(j).get('rett_urate'),
					amount     : Math.round(loadSRdetaildatastore.getAt(j).get('rett_wt')/1000*loadSRdetaildatastore.getAt(j).get('rett_urate'),0),
					itemcode   : loadSRdetaildatastore.getAt(j).get('rett_var'), 
					unitcode   : loadSRdetaildatastore.getAt(j).get('var_unit'), 
					fincode    : loadSRdetaildatastore.getAt(j).get('rett_srno_fincode'), 
					hsncode    : loadSRdetaildatastore.getAt(j).get('rett_hsncode'), 
					wtchange   : loadSRdetaildatastore.getAt(j).get('rett_wt_change'), 
					retweight  : loadSRdetaildatastore.getAt(j).get('rett_return_wt'), 
					newnumber  : loadSRdetaildatastore.getAt(j).get('rett_newno'), 

                                  })
                              );

                           }
                grid_tot();
		                                var dt_today = new Date();
		                                var dt_invoice = dptSalRtn.getValue();
		                                var diffdays = (dt_today.getDate()-dt_invoice.getDate());
		                                if (diffdays >0)
		                                     Ext.getCmp('save').setDisabled(true);
		                                else
		                                     Ext.getCmp('save').setDisabled(false);

			}
		});
                grid_tot();
                calculatevalue()
	     }
       }
    });



function calculatevalue(){
   
   var value1 = 0;
   var ins = 0;
   var cgst = 0;
   var sgst = 0;
   var igst = 0;
   var frt  = 0;
   var oth = 0;
   var taxabletotal = 0;
   var invround  =0;
   var netamt =0;

  txtInsr.setRawValue(0);
  txtCgstAmt.setRawValue(0);
  txtSgstAmt.setRawValue(0);
  txtIgstAmt.setRawValue(0);


//alert(insper);


  if (Number(frtperMT) > 0 && (txtTotalRetWt.getValue()) > 0 )  {
     frt = Number(txtTotalRetWt.getValue()) *  Number(frtperMT) /1000
    txtFreight.setRawValue(Ext.util.Format.number(Math.round(frt*100/100)),'0.00');  
  }



  value1 = Number(txtTotalVal.getValue());

  if (insper > 0 && value1 > 0 )  {
//      ins = Math.round(value1 * insper/100);  
      ins = value1 * insper/100;  
  }
  txtInsr.setRawValue(Ext.util.Format.number(ins,'0.00'));

  txtTaxableAmt.setRawValue(Ext.util.Format.number(value1+ins+ Number(txtFreight.getValue()),'0.00'));



  if (Number(txtCgstPer.getValue()) > 0)
  {
     cgst = Math.round(Number(txtTaxableAmt.getValue())* Number(txtCgstPer.getValue())/100);
     cgst = Number(txtTaxableAmt.getValue())* Number(txtCgstPer.getValue())/100;
  }

  if (Number(txtSgstPer.getValue()) > 0)
  {
     sgst = Math.round(Number(txtTaxableAmt.getValue())* Number(txtSgstPer.getValue())/100);
     sgst = Number(txtTaxableAmt.getValue())* Number(txtSgstPer.getValue())/100;
  }

  if (Number(txtIgstPer.getValue()) > 0)
  {
     igst = Math.round(Number(txtTaxableAmt.getValue())* Number(txtIgstPer.getValue())/100);
     igst = Number(txtTaxableAmt.getValue())* Number(txtIgstPer.getValue())/100;
  }

  txtCgstAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
  txtSgstAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));
  txtIgstAmt.setRawValue(Ext.util.Format.number(igst,'0.00'));

  
  var val_tcs = 0;



  val_tcs = (Number(txtTaxableAmt.getValue())+ Number(cgst) + Number(sgst) +Number(igst)) * Number(tcsper) /100 ;


  txtTCS.setRawValue(Ext.util.Format.number(Math.round(val_tcs*100/100)),'0.00');
   
//alert(txtFreight.getValue());
  netamt = Math.round(Number(txtTaxableAmt.getValue())+ cgst + sgst + igst +  Number(txtTCS.getValue())  );


  txtNetAmt.setRawValue(Ext.util.Format.number(netamt,'0.00'));

      invround = Number(netamt) - (Number(txtTaxableAmt.getRawValue()) + cgst+ sgst + igst +  Number(txtTCS.getValue()));

  txtRoff.setRawValue(Ext.util.Format.number(invround,'0.00'))

/*


          taxabletotal = Number(txtTotalValue.getRawValue()) + Number(txtInsAmt.getRawValue()) + Number(txtFrtAmt.getRawValue());

          txttottaxable.setRawValue(Ext.util.Format.number(taxabletotal,'0.00'));

    

          if (txtCgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
//             cgst = Math.round(taxable * txtCgstPer.getRawValue()/100);
             cgst = taxabletotal * txtCgstPer.getRawValue()/100;   
             cgst = Math.round(cgst*100/100);
          }

          txtCgstAmt.setRawValue(Ext.util.Format.number(cgst,'0.00'));
          
          if (txtSgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
             sgst = Math.round(taxabletotal * txtSgstPer.getRawValue()/100); 
          }
          txtSgstAmt.setRawValue(Ext.util.Format.number(sgst,'0.00'));


          if (txtIgstPer.getRawValue() > 0 && taxabletotal > 0 )  {
             igst = Math.round(taxabletotal	 * txtIgstPer.getRawValue()/100); 
          }
          txtIgstAmt.setRawValue(Ext.util.Format.number(igst,'0.00'))



  
      netamt =  Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtFrtAmt.getRawValue());

      netamt = Math.round(netamt*100/100);
      txtNetAmt.setRawValue(Ext.util.Format.number(netamt,'0.00'));

      invround = Number(netamt) - (Number(txttottaxable.getRawValue()) + Number(txtCgstAmt.getRawValue())+ Number(txtSgstAmt.getRawValue())+ Number(txtIgstAmt.getRawValue()) + Number(txtFrtAmt.getRawValue()));
      txtRound.setRawValue(Ext.util.Format.number(invround,'0.00'))

*/


}



function grid_tot(){
        var bundles = 0;
        var reels = 0;
        var wt = 0;	
        var retwt = 0;
        var val = 0;	

	fdbl_totalvalue=0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
           if (sel[i].data.unitcode==2) {
              bundles=bundles+1;
           }
           else
           {
              reels=reels+1;
           }   
              retwt=retwt+Number(sel[i].data.retweight);
              wt   =wt+Number(sel[i].data.weight);
      //        val  =val+Number(sel[i].data.amount);
                  val  =val+ (Number(sel[i].data.retweight) * Number(sel[i].data.unitrate));
         }

         val = val /1000;     
         txtTotalR.setValue(Ext.util.Format.number(reels,"0"));
         txtTotalWt.setRawValue( Ext.util.Format.number(wt,"0.00"));
         txtTotalRetWt.setRawValue( Ext.util.Format.number(retwt,"0.00"));

         txtTotalVal.setRawValue( Ext.util.Format.number(val,"0.00"));
         calculatevalue();     
         
}


   var txtEndNo = new Ext.form.ComboBox({
        fieldLabel  : 'End No.',
        id          : 'txtEndNo',
        name        : 'txtEndNo',
        width       :  100,
        tabindex : 2,
	width           : 200,
        displayField    : 'no', 
        valueField      : 'fincode',
        hiddenName      : '',
        id              : 'txtEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	listeners:
		{
		blur:function()
			{
		}
	}
    });

/*
var cmbStartNo = new Ext.form.ComboBox({
        fieldLabel      : 'StartNo',
        width           : 80,
	height : 150,
        displayField    : 'no', 
        valueField      : 'fincode',
        hiddenName      : '',
        id              : 'cmbStartNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,

	multiSelect : true
});
*/

var tot_mtr, fin_tot;

var st_no=0;
var end_no = 0;

var firstno = 0;
var lastno = 0;


/*
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

var dgrecord = Ext.data.Record.create([]);
var fm = Ext.form;

    var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadstartendnodatastore,
        height: 230,
        width: 320,
        x: 800,
        y: 0,
/*
        outsideClickDeselects: true,
        disableSelection: false,
        selModel: startnodet,
*/
//        columns: [startnodet,
      columns: [
      {header: "Start No", dataIndex: 'no', sortable: true, width: 115, align: 'left'}

        ],
        listeners: {
            cellclick: function (flxstartno, rowIndex, cellIndex, e) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.no;
	//	     txtStartNo.setRawValue(st_no);
                }
            }
        }
    });

var tot_mtr, fin_tot;
/*
    var endnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (endnodet) {
                var selected_rows = flxendno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
loadpackslipdetdatastore.load({
					url: 'ClsTrnSalesReturn.php',
					params: {
					    task: 'loadsrno',
					    size:this.getValue(),
					    compcode :Gincompcode,
						finid:GinFinid,
						slipno : txtSlipNo.getValue(),
						startno : cmbStartNo.getRawValue(),
//						endno : cmbEndNo.getRawValue()
					}			
				    });
                
            }
        }
    });
*/

 var dgrecord = Ext.data.Record.create([]);
 var fm = Ext.form;

    var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadstartendnodatastore,
        height: 230,
        width: 320,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        columns: [
            {header: "End No", dataIndex: 'no', sortable: true, width: 115, align: 'left'}
        ],
        listeners: {

             cellclick: function (flxendno, rowIndex, cellIndex, e) {
             loadgriddetailsDatastore.removeAll();
             var selected_rows = flxendno.getSelectionModel().getSelections();
             for (var i = 0; i < selected_rows.length; i++)
             {
                     end_no = selected_rows[i].data.no;
		     txtEndNo.setRawValue(end_no);
             }


            var firstno = st_no;
            var lastno = end_no;

//alert(cmbSize.getValue());
//alert(st_no);
//alert(end_no);
//alert(rbunit);
//alert(Gincompcode);
//alert(GinFinid);
//alert(txtSlipNo.getValue());
            if (st_no == 0)
            {       
               st_no   = end_no;
               firstno  = end_no;
            } 

//alert(st_no);
//alert(end_no);
            loadgriddetailsDatastore.load({
		url: 'ClsTrnSalesReturn.php',
		params: {
			task: 'loadpackslipdespatchdetails',
			size:cmbSize.getValue(),
			nofrom:st_no,
			noto:end_no,
	           	compcode:Gincompcode,
                        finid:cmbFinYear.getValue(),
			slipno: txtSlipNo.getValue()
			},
		 callback: function () {

//alert(pckt_sr_no);
//alert(pckt_wt);
//			flxDetail.getStore().removeAll();
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
                                if (sel[k].data.number == i)
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
				
			   	if(cnt>0)
				{                        
		                  for(var j=0; j<cnt; j++)
				  { 


				  	var itemref1    = loadgriddetailsDatastore.getAt(j).get('var_name');
                                  	var units1      = loadgriddetailsDatastore.getAt(j).get('unit');
	                          	var number1     = loadgriddetailsDatastore.getAt(j).get('pckt_sr_no');
         	                  	var weight1     = loadgriddetailsDatastore.getAt(j).get('pckt_wt');
                  	          	var unitrate1   = loadgriddetailsDatastore.getAt(j).get('invt_urate');
                  	          	if (units1 == "Bundles") {
                  	          		var amount1  =loadgriddetailsDatastore.getAt(j).get('invt_urate');

					}
					else {
                            	  	var amount1     = loadgriddetailsDatastore.getAt(j).get('invt_urate') * loadgriddetailsDatastore.getAt(j).get('pckt_wt')/1000;                            	  						
					}
                                  	var cashdisper1 = loadgriddetailsDatastore.getAt(j).get('cashdisc');
                                  	var dealdisper1 = loadgriddetailsDatastore.getAt(j).get('dealerdisc');
                                  	var reeldisper1 = loadgriddetailsDatastore.getAt(j).get('reeldisc');
                                  	var regdis1     = loadgriddetailsDatastore.getAt(j).get('regdisc');
                                  	var adddis1     = loadgriddetailsDatastore.getAt(j).get('addndisc');
                                  	var itemcode1   = loadgriddetailsDatastore.getAt(j).get('itemcode');
                                  	var unitcode1   = loadgriddetailsDatastore.getAt(j).get('unitcode');
				        var fincode1    = loadgriddetailsDatastore.getAt(j).get('pckt_srno_fincode');
                                        var hsn         = loadgriddetailsDatastore.getAt(j).get('invt_hsncode');
                                        cdisc  = loadgriddetailsDatastore.getAt(j).get('cashdisc');
                                        ddisc  = loadgriddetailsDatastore.getAt(j).get('dealerdisc');
                                        reeldis= loadgriddetailsDatastore.getAt(j).get('reeldisc');
                                        regdis = loadgriddetailsDatastore.getAt(j).get('regdisc');
                                        adisc  = loadgriddetailsDatastore.getAt(j).get('addndisc');


                                        var RowCnt = flxDetail.getStore().getCount() + 1;  
                                        flxDetail.getStore().insert(
                                          flxDetail.getStore().getCount(),
                                          new dgrecord({
		                            itemref    : itemref1,
					    units      : units1,
                                            number     : number1 ,
					    weight     : weight1,
					    unitrate   : unitrate1,
					    amount     : amount1,
					    cashdisper : cashdisper1,
					    dealdisper : dealdisper1,
					    reeldisper : reeldisper1,
					    regdis     : regdis1,
					    adddis     : adddis1,
					    itemcode   : itemcode1,
					    unitcode   : unitcode1,
					    fincode    : fincode1,
					    hsncode    : hsn,
                                            wtchange     : 'N',
					    retweight  : weight1,

                                	  })
                       			);
                  			
			          }//for j
                                  grid_tot();

				}	//if cnt >0	
        		}//else
                    }//call back
            });

/*  
            loadfromtoboxDatastore.removeAll();
            loadfromtoboxDatastore.load({
            url: 'ClsTrnSalesPackSlip.php',
	    params: {
		    task: 'loadfromtobox',
                    sizecode : cmbSize.getValue(),
	            fincode  : GinFinid,
		    compcode : Gincompcode,
		    slipdate : dptSlip
		    }
            });
*/
st_no=0;
end_no=0;


        }
}
   });


/*
var cmbEndNo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'no', 
        valueField      : 'no',
        hiddenName      : '',
        id              : 'cmbEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
					
					
				   }


		     }
	

});
*/






var TrnSalReturnFormpanel = new Ext.FormPanel({
	renderTo    : Ext.getBody(),
	xtype       : 'form',
	title       : 'SALES RETURN',
	header      : false,
	width       : 1300,
	height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
	x           : 0,
	y           : 0,
	frame       : false,
	id          : 'TrnSalReturnFormpanel',
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
		                           gstFlag = "Edit";
                     			   Ext.getCmp('cmbsrno').show();
					   loadSRlistdatastore.removeAll();
					   loadSRlistdatastore.load({
		      		              url: 'ClsTrnSalesReturn',
					      params: {
						  task: 'loadSRNolist',
						  finid: GinFinid,
						  compcode:Gincompcode,
					      },
					      callback:function()
					      { 
//					          alert(loadSRlistdatastore.getCount());	
					      }
					   });

					   loadCustomerStore.removeAll();
			     	           loadCustomerStore.load({
					   url: 'ClsTrnSalesReturn.php',
					   params: {
				       			    task: 'loadcustomer',
							    compcode :Gincompcode,
							    finid:GinFinid
						   },
					   callback:function()
						{
			    			}
		
					   });
 					}
				}
			},'-',
			{
//save
				text: 'Save',
                                id  : 'save',
				style  : 'text-align:center;',
				tooltip: 'Save Details...',
				height: 40,
				fontSize:30,
				width:70,
				icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {

//alert(dptSalRtn.getRawValue());
                    var gstSave;
                   
                    gstSave="true";
                    if (txtSalesRetNo.getRawValue() == 0)
                    {
                        Ext.Msg.alert('Sales Return','Sales Return No Not Empty..');
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

                           
                            var salesretData = flxDetail.getStore().getRange();                                        
                            var salesretupData = new Array();
                            Ext.each(salesretData, function (record) {
                                salesretupData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnSalesReturnSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(salesretupData),                                      
				cnt          : salesretData.length,
                                savetype     : gstFlag,
				rethcompcode : Gincompcode,
				rethfincode  : GinFinid,
				rethno       : txtSalesRetNo.getValue(),
				rethdate     : Ext.util.Format.date(dptSalRtn.getValue(),"Y-m-d"),
                        
				rethcust     : cmbCustomer.getValue(),
				rethnoofreels: txtTotalR.getValue(),
		
				rethtotwt    : txtTotalWt.getValue(),
				rethretwt    : txtTotalRetWt.getValue(),
				rethtaxtag   : taxcode,
				rethinsper   : insper,
				rethinsamt   : txtInsr.getValue(),	
				rethfrieght  :  Number(txtFreight.getValue()),
				rethroff     : txtRoff.getValue(),
				rethamt      : txtNetAmt.getValue(),
				rethinvno    : cmbInvNo.getValue(),
				rethinvdate  : Ext.util.Format.date(dptInv.getValue(),"Y-m-d"),
//				rethinvdate  : '2022-09-01',

				rethvouno    : vouno,
				rethvouyear  : invyear,
                                rethtaxable  : txtTaxableAmt.getValue(),
				rethcgstper  : Number(txtCgstPer.getValue()),
				rethcgstamt  : txtCgstAmt.getValue(),
				rethsgstper  : txtSgstPer.getValue(),
				rethsgstamt  : txtSgstAmt.getValue(),
				rethigstper  : txtIgstPer.getValue(),
				rethigstamt  : txtIgstAmt.getValue(),
				rethslipno   : txtSlipNo.getValue(),
				rethtcs      : txtTCS.getValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Sales Return Saved -" + obj['retno']);
                                    TrnSalReturnFormpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Sales Return Not Saved! Pls Check!- " + obj['retno']);                                                  
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
						TrnSalReturnWindow.hide();
					}
				}
			},
		]
	
	},

	items: [
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 500,
			height      : 140,
			x           : 25,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 170,
					x           : -10,
					y           : -5,
					border      : false,
					items: [txtSalesRetNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 170,
					x           : -10,
					y           : -5,
					border      : false,
					items: [cmbsrno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 170,
					x           : 150,
					y           : -5,
					border      : false,
					items: [dptSalRtn]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 300,
					x           : -10,
					y           : 25,
					border      : false,
					items: [cmbFinYear]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 600,
					x           : -10,
					y           : 55,
					border      : false,
					items: [cmbCustomer]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 300,
					x           : -10,
					y           : 85,
					border      : false,
					items: [cmbInvNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 25,
					width       : 200,
					x           : 220,
					y           : 85,
					border      : false,
					items: [dptInv]
				},
			]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 400,
			height      : 140,
			x           : 550,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 170,
					x           : -10,
					y           : -5,
					border      : false,
					items: [txtSlipNo]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 170,
					x           : 150,
					y           : -5,
					border      : false,
					items: [dptSlip]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 400,
					x           : -10,
					y           : 85,
					border      : false,
					items: [txtTaxTag]
				},
			]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 400,
			height      : 360,
			x           : 25,
			y           : 155,
			border      : true,
			layout      : 'absolute',
			items:[
				{ 
					xtype       : 'fieldset',
					title       : 'Size Details',
					labelWidth  : 1,
					width       : 350,
					x           : 1,
					y           : 1,
					border      : false,
					//layout      : 'vbox',
					height      : 120,
					items: [cmbSize]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Start No',
					labelWidth  : 1,
					width       : 180,
					x           : 1,
					y           : 70,
					border      : false,
					//layout      : 'vbox',
					height      : 600,
					items: [flxstartno]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'End No',
					labelWidth  : 1,
					width       : 180,
					x           : 200,
					y           : 70,
					border      : false,
					//layout      : 'vbox',
					height      : 600,
					items: [flxendno]
				}	
			]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 800,
			height      : 360,
			x           : 450,
			y           : 155,
			border      : true,
			layout      : 'absolute',
			items:[flxDetail,

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 180,
					x           : 2 ,
					y           : 190,
					border      : false,
					items: [txtTotalR]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 190,
					x           : 2,
					y           : 220,
					border      : false,
					items: [txtTotalWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 190,
					x           : 2,
					y           : 250,
					border      : false,
					items: [txtTotalRetWt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 190,
					x           : 2,
					y           : 280,
					border      : false,
					items: [txtTotalVal]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 250,
					x           : 200,
					y           : 190,
					border      : false,
					items: [txtInsr]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 250,
					x           : 200,
					y           : 250,
					border      : false,
					items: [txtTaxableAmt]
				},


				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 250,
					x           : 200,
					y           : 220,
					border      : false,
					items: [txtFreight]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 450,
					y           : 190,
					border      : false,
					items: [txtCgstPer]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 527,
					y           : 190,
					border      : false,
					items: [txtCgstAmt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 450,
					y           : 220,
					border      : false,
					items: [txtSgstPer]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 527,
					y           : 220,
					border      : false,
					items: [txtSgstAmt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 450,
					y           : 250,
					border      : false,
					items: [txtIgstPer]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 527,
					y           : 250,
					border      : false,
					items: [txtIgstAmt]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 450,
					y           : 280,
					border      : false,
					items: [txtTCSPer]
				},
		        	{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 250,
					x           : 527,
					y           : 280,
					border      : false,
					items: [txtTCS]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 250,
					x           : 300,
					y           : 310,
					border      : false,
					items: [txtRoff]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 100,
					width       : 250,
					x           : 480,
					y           : 310,
					border      : false,
					items: [txtNetAmt]
				},
				
			]
		},

	]
});


    

  function RefreshData(){
           gstFlag = "Add";
           Ext.getCmp('save').setDisabled(false);
           TrnSalReturnFormpanel.getForm().reset();
           Ext.getCmp('cmbsrno').hide();
           flxDetail.getStore().removeAll();
           flxstartno.getStore().removeAll();
           flxendno.getStore().removeAll();
	   loadSalesReturndatastore.removeAll();
	   loadSalesReturndatastore.load({
           url:'ClsTrnSalesReturn.php',
           params:
              	 {
                      	 task:"loadSalesReturnNo",
	              	 finid:GinFinid,
			 compcode:Gincompcode
                 },
		callback:function()
	        {
			txtSalesRetNo.setValue(loadSalesReturndatastore.getAt(0).get('retno'))
		}
	  });
   };
   
 var TrnSalReturnWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 30,
        title       : 'SALES RETURN',
        items       : TrnSalReturnFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false  ,
           onEsc:function(){
},
	listeners:{

              show:function(){
                   RefreshData();
/*		     
			loadSalesReturndatastore.removeAll();
			loadSalesReturndatastore.load({
                        	 url:'ClsTrnSalesReturn.php',
                        	 params:
                        	 {
                         	 task:"loadSalesReturnNo",
				 finid: GinFinid,
				 compcode:Gincompcode
                        	 },
				callback:function()
	               		{
				txtSalesRetNo.setValue(loadSalesReturndatastore.getAt(0).get('retno'));
				}
			  });
*/
                    }

        }
    });
   TrnSalReturnWindow.show();  


});
