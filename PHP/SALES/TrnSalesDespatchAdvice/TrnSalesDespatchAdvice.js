Ext.onReady(function(){
   Ext.QuickTips.init();


   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');


   var invtype = 1;
   var gstFlag = "Add";

   var editrow = 0;
   var gridedit = "false";
   var viewopt = 0; 

   var varietyname = '';
   var varietycode = 0;
   var bf = 0;
   var gsm = 0;
   var rsize = 0;  
   var sizename = '';    
   var inch_cm = '';    

   var  varshade = '';    

new Ext.KeyMap( Ext.getBody(), [{
            key: "w",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
alert("hai");
            }
        }]);
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
                          TrnSalesOrder1Window.hide();
                        }
                    }  
               });   
            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);




 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref','cust_led_code','cust_cr_days' , 'cust_grace_days','area_code', 'rate_areacode','area_rategrp','cust_partygroup','cust_destination_enable_yn'
 

      ]),
    });




function flx_change()
{

	var sm = flxParty.getSelectionModel();
	var selrow = sm.getSelected();
	var chkitem = (selrow.get('cust_code'));
        custcode = 0;
        custledcode = 0;

	if ((selrow != null)){

		gridedit = "false";
		editrow = selrow;
		custcode = selrow.get('cust_code');
		custledcode = selrow.get('cust_led_code');
                txtCustomer.setRawValue(selrow.get('cust_ref'));

		custname = selrow.get('cust_ref');
                flxParty.hide();

		loadSONodatastore.load({
		url: 'ClsTrnSalesDespatchAdvice.php',
		params: {
		    task: 'loadSONo',
		    party:custcode,
		    compcode :Gincompcode,
                    finid:GinFinid
		},
 	        callback:function()
                { 
	 	        cmbSO.setValue(loadSONodatastore.getAt(0).get('ordh_sono'));
                        cmbSize.reset();
			loadSalesSizestore.removeAll();
			loadSalesSizestore.load({
				url: 'ClsTrnSalesDespatchAdvice.php',
				params: {
			    	task: 'loadsizedetails',
			    	party:custcode,
			    	compcode :Gincompcode,
		                finid :GinFinid,
			    	socno : cmbSO.getRawValue()
				},
		           	callback:function()
		         	{

					varietyname = "";
					varietycode = 0;
                                        bf = 0;
                                        gsm = 0;
                                        rsize = 0;
                                        sizename = '';	

			                cmbSO.setRawValue(loadSONodatastore.getAt(0).get('ordh_sono'));
		                        cmbSize.setValue(loadSalesSizestore.getAt(0).get('var_code'));




			        	GetqtyDetailDatastore.load({
						url: 'ClsTrnSalesDespatchAdvice.php',
						params: {
						    	task: 'loadqtydet',
						    	finid: GinFinid,
						    	compcode : Gincompcode,
						    	socno : cmbSO.getRawValue(),
							sizecode:cmbSize.getValue()
						},
						callback:function()
						{
							txtOrdQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_qty'));
							txtPendingQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('penqty'));
							//txtStock.setRawValue(GetqtyDetailDatastore.getAt(0).get(''));
							txtRate.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_rate'));


                                        varietyname  = GetqtyDetailDatastore.getAt(0).get('var_desc');
                                        varietycode  = GetqtyDetailDatastore.getAt(0).get('var_groupcode');
					bf = GetqtyDetailDatastore.getAt(0).get('var_bf');
					gsm = GetqtyDetailDatastore.getAt(0).get('var_gsm');
					rsize = GetqtyDetailDatastore.getAt(0).get('var_size2');
	                                sizename = GetqtyDetailDatastore.getAt(0).get('var_name');

	                                inch_cm  = GetqtyDetailDatastore.getAt(0).get('var_inchcm');
                                        full_bit = "All Reels";

                                        if (bf == 0 )
                                        {
                                        if  ((inch_cm == "I" && Number(rsize) > 16) || (inch_cm == "C" && Number(rsize) > 41))
                                            full_bit = "Full Reel";
                                         else
                                            full_bit = "Bit Reel";
	                                 } 
							loadStockDetailDatastore.load({
								url: 'ClsTrnSalesDespatchAdvice.php',
								params: {
								        task: 'loadstkdet',
		  		                                     	compcode : Gincompcode,
			       						variety:cmbSize.getValue()
								},
								callback:function()
								{
								       txtStock.setRawValue(Ext.util.Format.number(loadStockDetailDatastore.getAt(0).get('stkwt'),'0.000'));
					  			}			
		         	                        });
                                                }  
		                        });

                                  }       
					
              		});
		 }
              });
	     

        }

}

function PartySearch()
{
        flxParty.show();
        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsTrnSalesDespatchAdvice.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}


var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxchk = 1;
                     

                   flxParty.hide();

             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }


             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
          },

	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });






var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 350,
//        header : false,
        x: 100,
        y: 28,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
		{header: "Customer Code", dataIndex: 'cust_led_code',sortable:true,width:60,align:'left',hidden:true},   

        ],
        store:loadSearchPartyListDatastore,

    listeners:{	

             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flx_change();
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                           flx_change();
		
         }

			}



   });


   var loaddespadvnodatastore = new Ext.data.Store({
      id: 'loaddespadvnodatastore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsTrnSalesDespatchAdvice.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespAdvNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'advno'
      ]),
    });

   var loadSONodatastore = new Ext.data.Store({
      id: 'loadSONodatastore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsTrnSalesDespatchAdvice.php',    // File to connect to
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

  var loadSalesSizestore = new Ext.data.Store({
      id: 'loadSalesSizestore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsizedetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name','sizedisp'
      ]),
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });

  var GetqtyDetailDatastore = new Ext.data.Store({
        id: 'GetqtyDetailDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesDespatchAdvice.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadqtydet"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ordt_var_code','ordt_qty','penqty','ordt_rate','var_groupcode', 'var_desc' , 'var_bf','var_gsm','var_inchcm' , 'var_size2' ,'var_size1','var_name' ,'var_shade'])

    });


 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
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

 var loadStockDetailDatastore = new Ext.data.Store({
      id: 'loadStockDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstockdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stkwt'
      ]),
    });



 var loaddespadvlistDataStore = new Ext.data.Store({
      id: 'loaddespadvlistDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespAdvNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_no'
      ]),
    });

 var loaddespadvdetailsDataStore = new Ext.data.Store({
      id: 'loaddespadvdetails',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespAdvNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_ref','da_date', 'da_ackno', 'da_ackdt', 'ordt_qty', 'ordt_adv_qty', 'var_name', 'da_desqty', 'da_slipqty', 'da_despdt', 'da_urate', 'da_rem', 'cust_code', 'var_code', 'da_close','var_unit' 

      ]),
    });

 var loadinvtypestore = new Ext.data.Store({
      id: 'loadinvtypestore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchAdvice.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvtype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_name' ,'type_code'
      ]),
    });

   var txtDANo = new Ext.form.NumberField({
        fieldLabel  : 'Desp.Plan.No.',
        id          : 'txtDANo',
        name        : 'advno',
        width       :  100,
	readOnly : true,
        tabindex : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
    });

  function datecheck()
  {
        var dt_today = new Date();
        var dt_DA = dptDA.getValue();
//        var diffdays = (dt_today.getDate()-dt_DA.getDate());
        var diffdays = dt_today.getTime()-dt_DA.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Raise the Despatch Plan in the date of " +  Ext.util.Format.date(dt_DA,"d-m-Y"));
             dptDA.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the Despatch Plan in future date");
             dptDA.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
    if(Ext.util.Format.date(dptDA.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Plan Date is not in current finance year. Please check");
    }



 }


    var dptDA= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptDA',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,
        value: new Date(),
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
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


var cmbInvType = new Ext.form.ComboBox({
        fieldLabel      : 'Type',
        width           : 250,
        displayField    : 'type_name', 
        valueField      : 'type_code',
        hiddenName      : '',
        id              : 'cmbInvType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadinvtypestore,
        value           :'NORMAL SALES',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDANo = new Ext.form.ComboBox({
        fieldLabel      : 'Desp.Plan.No',
        width           : 100,
        displayField    : 'da_no', 
        valueField      : 'da_no',
        hiddenName      : '',
        id              : 'cmbDANo',
        typeAhead       : true,
        mode            : 'local',
        store           : loaddespadvlistDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        listeners:{
                select: function () {

//alert(cmbDANo.getValue());
//alert(Gincompcode);
//alert(GinFinid);

                        flxDetail.getStore().removeAll();
                      	loaddespadvdetailsDataStore.removeAll();
                    	loaddespadvdetailsDataStore.load({
			url: 'ClsTrnSalesDespatchAdvice.php',
			params: {
			        task: 'loadDespAdvNoDetails',
				dano:cmbDANo.getValue(),
				compcode :Gincompcode,
                                finid:GinFinid
			},
                      	callback:function()
                  	{

                          if (loaddespadvdetailsDataStore.getCount() > 0) {
                                txtDANo.setValue(cmbDANo.getValue());
                                dptDA.setRawValue(Ext.util.Format.date(loaddespadvdetailsDataStore.getAt(0).get('da_date'),"d-m-Y"));   
                                var cnt=loaddespadvdetailsDataStore.getCount();
                                if(cnt>0)
		                {                        
		                    for(var j=0; j<cnt; j++)
	 	                    { 

		                        var custcode   = loaddespadvdetailsDataStore.getAt(j).get('cust_code');
		                        var custname   = loaddespadvdetailsDataStore.getAt(j).get('cust_ref');
		                        var ackno      = loaddespadvdetailsDataStore.getAt(j).get('da_ackno');

		                        var ackdate    = Ext.util.Format.date(loaddespadvdetailsDataStore.getAt(0).get('da_ackdt'),"y-m-d");  


		                        var varname   = loaddespadvdetailsDataStore.getAt(j).get('var_name');
		                        var ordqty     = loaddespadvdetailsDataStore.getAt(j).get('ordt_qty');
		                        var penqty     = loaddespadvdetailsDataStore.getAt(j).get('da_desqty');
		                        var advqty     = loaddespadvdetailsDataStore.getAt(j).get('da_desqty');
                                        var despqty    = loaddespadvdetailsDataStore.getAt(j).get('da_slipqty');
                                        var despdate   = Ext.util.Format.date(loaddespadvdetailsDataStore.getAt(0).get('da_ackdt'),"y-m-d"); 
	                                var desptag    = loaddespadvdetailsDataStore.getAt(j).get('da_despdt');
	                                var unitrate   = loaddespadvdetailsDataStore.getAt(j).get('da_urate');
	                                var remarks    = loaddespadvdetailsDataStore.getAt(j).get('da_rem');
	                                var varcode    = loaddespadvdetailsDataStore.getAt(j).get('var_code');
	                                var varunit    = loaddespadvdetailsDataStore.getAt(j).get('var_unit');
                                        var RowCnt    = flxDetail.getStore().getCount() + 1;  

	                                flxDetail.getStore().insert(
		                               flxDetail.getStore().getCount(),
		                               new dgrecord({

							customer   : custname,
							orderno    : ackno, 
							orddate    : ackdate,
							itemname   : varname,   
							ordqty     : ordqty,
							pendqty    : penqty,
							advqty     : advqty,
                                 			oldqty     : advqty,
							despqty    : despqty,
							despdate   : despdate,
							unitrate   : unitrate,
							remarks    : remarks,
							custcode   : custcode,
							itemcode   : varcode,
							close      : '', 
                                                        closereason: '',
							status     : '',
	                                       })
		                      	);

                                  }

                                } 
                           }
                        }
                        });
                }

	}

});

/*
var cmbCustomer1 = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer1',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        listeners:{
             select: function () {	
		loadSONodatastore.load({
		url: 'ClsTrnSalesDespatchAdvice.php',
		params: {
		    task: 'loadSONo',
		    party:cmbCustomer.getValue(),
		    compcode :Gincompcode,
                    finid:GinFinid
		},
 	        callback:function()
                { 
	 	        cmbSO.setValue(loadSONodatastore.getAt(0).get('ordh_sono'));
                        cmbSize.reset();
			loadSalesSizestore.removeAll();
			loadSalesSizestore.load({
				url: 'ClsTrnSalesDespatchAdvice.php',
				params: {
			    	task: 'loadsizedetails',
			    	party:cmbCustomer.getValue(),
			    	compcode :Gincompcode,
		                finid :GinFinid,
			    	socno : cmbSO.getRawValue()
				},
		           	callback:function()
		         	{

					varietyname = "";
					varietycode = 0;
                                        bf = 0;
                                        gsm = 0;
                                        rsize = 0;
                                        sizename = '';	

			                cmbSO.setRawValue(loadSONodatastore.getAt(0).get('ordh_sono'));
		                        cmbSize.setValue(loadSalesSizestore.getAt(0).get('var_code'));




			        	GetqtyDetailDatastore.load({
						url: 'ClsTrnSalesDespatchAdvice.php',
						params: {
						    	task: 'loadqtydet',
						    	finid: GinFinid,
						    	compcode : Gincompcode,
						    	socno : cmbSO.getRawValue(),
							sizecode:cmbSize.getValue()
						},
						callback:function()
						{
							txtOrdQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_qty'));
							txtPendingQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('penqty'));
							//txtStock.setRawValue(GetqtyDetailDatastore.getAt(0).get(''));
							txtRate.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_rate'));


                                        varietyname  = GetqtyDetailDatastore.getAt(0).get('var_desc');
                                        varietycode  = GetqtyDetailDatastore.getAt(0).get('var_groupcode');
					bf = GetqtyDetailDatastore.getAt(0).get('var_bf');
					gsm = GetqtyDetailDatastore.getAt(0).get('var_gsm');
					rsize = GetqtyDetailDatastore.getAt(0).get('var_size2');
	                                sizename = GetqtyDetailDatastore.getAt(0).get('var_name');

	                                inch_cm  = GetqtyDetailDatastore.getAt(0).get('var_inchcm');
                                        full_bit = "All Reels";

                                        if (bf == 0 )
                                        {
                                        if  ((inch_cm == "I" && Number(rsize) > 16) || (inch_cm == "C" && Number(rsize) > 41))
                                            full_bit = "Full Reel";
                                         else
                                            full_bit = "Bit Reel";
	                                 } 
							loadStockDetailDatastore.load({
								url: 'ClsTrnSalesDespatchAdvice.php',
								params: {
								        task: 'loadstkdet',
		  		                                     	compcode : Gincompcode,
			       						variety:cmbSize.getValue()
								},
								callback:function()
								{
								       txtStock.setRawValue(Ext.util.Format.number(loadStockDetailDatastore.getAt(0).get('stkwt'),'0.000'));
					  			}			
		         	                        });
                                                }  
		                        });

                                  }       
					
              		});
		 }
              });
	     
         }
     }
});

*/

var cmbSO = new Ext.form.ComboBox({
        fieldLabel      : 'SO No.',
        width           : 110,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSONodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
            listeners:{
                select: function () {
                                        cmbSize.reset();
					loadSalesSizestore.removeAll();
					loadSalesSizestore.load({
					url: 'ClsTrnSalesDespatchAdvice.php',
					params: {
				    	task: 'loadsizedetails',
				    	party:custcode,
				    	compcode :Gincompcode,
                                        finid :GinFinid,
				    	socno : cmbSO.getRawValue()
					},
                                   	callback:function()
                                 	{
                  			   cmbSize.setValue(loadSalesSizestore.getAt(0).get('var_code'));
                                        }    
				    });
				   }


		     }
	

});


var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 350,
        displayField    : 'sizedisp', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSalesSizestore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
            listeners:{
                select: function () {
	
//  				alert(cmbSO.getRawValue());
//				alert(this.getValue());


	
         				GetqtyDetailDatastore.load({
					url: 'ClsTrnSalesDespatchAdvice.php',
					params: {
				    	task: 'loadqtydet',
				    	finid: GinFinid,
				    	compcode : Gincompcode,
				    	socno : cmbSO.getRawValue(),
					sizecode:this.getValue()
					},
					callback:function()
					{
					txtOrdQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_qty'));
					txtPendingQty.setRawValue(GetqtyDetailDatastore.getAt(0).get('penqty'));
					//txtStock.setRawValue(GetqtyDetailDatastore.getAt(0).get(''));
					txtRate.setRawValue(GetqtyDetailDatastore.getAt(0).get('ordt_rate'));

                                        varietyname  = GetqtyDetailDatastore.getAt(0).get('var_desc');
                                        varietycode  = GetqtyDetailDatastore.getAt(0).get('var_groupcode');

					bf = GetqtyDetailDatastore.getAt(0).get('var_bf');
					gsm = GetqtyDetailDatastore.getAt(0).get('var_gsm');
					rsize = GetqtyDetailDatastore.getAt(0).get('var_size2');
	                                sizename = GetqtyDetailDatastore.getAt(0).get('var_name');
	                                inch_cm  = GetqtyDetailDatastore.getAt(0).get('var_inchcm');
	                                varshade  = GetqtyDetailDatastore.getAt(0).get('var_shade');

                                        full_bit = "All Reels"; 
                             
                                        if (bf == 0 )
                                        {
                                        if  ((inch_cm == "I" && Number(rsize) > 16) || (inch_cm == "C" && Number(rsize) > 41))
                                            full_bit = "Full Reel";
                                         else
                                            full_bit = "Bit Reel";
	                                 } 


					}			
				    });

					loadStockDetailDatastore.load({
					url: 'ClsTrnSalesDespatchAdvice.php',
					params: {
				    	task: 'loadstkdet',
                                 	compcode : Gincompcode,
					variety:this.getValue()
					},
					callback:function()
					{
					txtStock.setRawValue(Ext.util.Format.number(loadStockDetailDatastore.getAt(0).get('stkwt'),'0.000'));
      				}			
				    });

Ext.getCmp('txtAdvQty').focus(false, 200);
				   }


		     }
	
   });


   var txtOrdQty = new Ext.form.NumberField({
        fieldLabel  : 'Ord. Qty.',
        id          : 'txtOrdQty',
        name        : 'txtOrdQty',
        width       :  80,
	readOnly : true,
        tabindex : 2
    });

   var txtPendingQty = new Ext.form.NumberField({
        fieldLabel  : 'Pend. Qty.',
        id          : 'txtPendingQty',
        name        : 'txtPendingQty',
        width       :  80,
	readOnly : true,
        tabindex : 2
    });

   var txtStock = new Ext.form.NumberField({
        fieldLabel  : 'Stock.',
        id          : 'txtStock',
        name        : 'txtStock',
        width       :  80,
	readOnly : true,
        tabindex : 2
    });


   var txtRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate.',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
	readOnly : true,
        tabindex : 2
    });

   var txtAdvQty = new Ext.form.TextField({
        fieldLabel  : 'Adv.Qty',
        id          : 'txtAdvQty',
        name        : 'txtAdvQty',
        width       :  80,
	readOnly : false,
        tabindex : 2,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnSubmit.focus();
             }
          }
        }


    });

 
    var dptDesp= new Ext.form.DateField({
        fieldLabel: 'Desp.Date',
        id: 'dptDesp',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
    });


   var txtRemarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks.',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  400,
        tabindex : 2,
        labelStyle : "font-size:12px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",

    });


//

var dgrecord = Ext.data.Record.create([]);



var flxcheckRate = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:560,
    height: 170,
    hidden:false,
    width:850,
//    font-size:18px,
    columns:
    [

	{header: "Customer", dataIndex: 'customer',sortable:true,width:200,align:'left'},
	{header: "Customer", dataIndex: 'ccode',sortable:true,width:120,align:'left'},
	{header: "Quality", dataIndex: 'variety',sortable:true,width:120,align:'left'},
        {header: "Qlycode", dataIndex: 'vcode',sortable:true,width:60,align:'left'},
        {header: "bf", dataIndex: 'bf',sortable:true,width:60,align:'left'},
        {header: "shade", dataIndex: 'shade',sortable:true,width:60,align:'left'},
        {header: "gsm", dataIndex: 'gsm',sortable:true,width:60,align:'left'},
        {header: "inchcm", dataIndex: 'inchcm',sortable:true,width:60,align:'left'},
        {header: "reeltype", dataIndex: 'reeltype',sortable:true,width:90,align:'left'},
	{header: "Unit Rate", dataIndex: 'rate',sortable:true,width:100,align:'left'},

    ],
    store: [],
});


var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:210,
    height: 170,
    hidden:false,
    width:950,
//    font-size:18px,
    columns:
    [
	{header: "Customer", dataIndex: 'customer',sortable:true,width:200,align:'left'},
	{header: "Order No", dataIndex: 'orderno',sortable:true,width:80,align:'left'},
	{header: "Ord Date", dataIndex: 'orddate',sortable:true,width:80,align:'left'},
	{header: "Size", dataIndex: 'itemname',sortable:true,width:130,align:'left'},
	{header: "Ord Qty", dataIndex: 'ordqty',sortable:true,width:60,align:'left'},
	{header: "Pend Qty", dataIndex: 'pendqty',sortable:true,width:60,align:'left'},
	{header: "Adv Qty", dataIndex: 'advqty',sortable:true,width:60,align:'left'},
	{header: "Desp Qty", dataIndex: 'despqty',sortable:true,width:60,align:'left'},
	{header: "Desp Date", dataIndex: 'despdate',sortable:true,width:80,align:'left'},
	{header: "Unit Rate", dataIndex: 'unitrate',sortable:true,width:60,align:'left'},
	{header: "Remarks", dataIndex: 'remarks',sortable:true,width:200,align:'left'},
	{header: "C-Code", dataIndex: 'custcode',sortable:true,width:50,align:'left'},
	{header: "V-Code", dataIndex: 'itemcode',sortable:true,width:50,align:'left'},
	{header: "Close", dataIndex: 'close',sortable:true,width:50,align:'left',inputValue:'N'},
	{header: "Close Reason", dataIndex: 'closereason',sortable:true,width:200,align:'left'},
	{header: "Status", dataIndex: 'status',sortable:true,width:50,align:'left'},
        {header: "Old Qty", dataIndex: 'oldqty',sortable:true,width:60,align:'left'},
	{header: "Quality", dataIndex: 'varietyname',sortable:true,width:100,align:'left'},
        {header: "Qlycode", dataIndex: 'varietycode',sortable:true,width:60,align:'left'},
        {header: "size", dataIndex: 'varname',sortable:true,width:110,align:'left'},
        {header: "size", dataIndex: 'size',sortable:true,width:60,align:'left'},
        {header: "bf", dataIndex: 'bf',sortable:true,width:60,align:'left'},
        {header: "gsm", dataIndex: 'gsm',sortable:true,width:60,align:'left'},
        {header: "reeltype", dataIndex: 'reeltype',sortable:true,width:90,align:'left'},
        {header: "inchcm", dataIndex: 'inchcm',sortable:true,width:60,align:'left'},
        {header: "shade", dataIndex: 'shade',sortable:true,width:60,align:'left'},

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
//             msg: 'Do You Want To Remove This Record!',
             msg: 'Press YES to Modify  - NO to Delete -  CANCEL to to EXIT',
             fn: function(btn){
		     if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
	       		gridedit = "true";
			editrow = selrow;
                        if (selrow.get('despqty') == 0)
                        {
		        txtCustomer.setRawValue(selrow.get('customer'));
		        custcode =   selrow.get('custcode');
			cmbSO.setRawValue(selrow.get('orderno'));
			cmbSO.setValue(selrow.get('orderno'));
		        cmbSize.setValue(selrow.get('itemcode'));
		        txtOrdQty.setValue(selrow.get('ordqty'));
		 	txtPendingQty.setValue(selrow.get('pendqty')); 
		        txtAdvQty.setValue(selrow.get('advqty')); 
//		        dptDesp.setRawValue(Ext.util.Format.date(selrow.get('despdate'),"d-m-Y"));
		        dptDesp.setRawValue(selrow.get('despdate'));

		        txtRate.setValue(selrow.get('unitrate')); 
		        txtRemarks.setValue(selrow.get('remarks'));
                        }
                        else
                        {
                             alert("Already Despatched in this Size. You can't Modify");

                        }
  
		     }    
                     else if (btn === 'no'){  
		                 var sm = flxDetail.getSelectionModel();
		                 var selrow = sm.getSelected(); 
                                 if (selrow.get('despqty') == 0)
                                 {                     
		                 flxDetail.getStore().remove(selrow);
		                 flxDetail.getSelectionModel().selectAll();
	                         }
                                 else
                                 {
                                   alert("Already Despatched in this Size. You can't Modify");                       
                                 }
             }
            }

     });         
    }

   }
});


/*

function grid_move() {



     flxcheckRate.getStore().removeAll();


    let finalStore = flxcheckRate.getStore();

    // Re-select all rows to ensure correct selection (could be optimized out if not needed)
    flxDetail.getSelectionModel().selectAll();
    var sel = flxDetail.getSelectionModel().getSelections();

    for (var i = 0; i < sel.length; i++) {
        var recData = sel[i].data;

            var exists = false;

            // Check if the record already exists in the final store
            for (var j = 0; j < finalStore.getCount(); j++) {
                var existing = finalStore.getAt(j);


                if (
                     existing.get('variety') === recData.varietyname && existing.get('ccode') === recData.custcode && Number(existing.get('bf')) === Number(recData.bf) && Number(existing.get('gsm')) === Number(recData.gsm)  && existing.get('reeltype') === recData.reeltype  && existing.get('inchcm') === recData.inchcm && existing.get('shade') === recData.shade
                )

                {
                    if(Number(existing.get('rate')) === Number(recData.unitrate))
                    {
                       exists = true;
                       break;
                    } 
                    else
                    {
                         flxDetail.getStore().remove(sel[i]);
                         alert("A record with the same BF+GSM+Other fields exists but with a different rate. Can't Add the Record. Check the rate in the SO and Continue..");
                         exists = true;
                    }   
                }
            }

            if (!exists) {
                // Add record to final store
                finalStore.add(new dgrecord({
                    ccode    : Number(recData.custcode),
                    customer : recData.customer,
                    vcode    : Number(recData.varietycode),
                    variety  : recData.varietyname,
                    rate     : Number(recData.unitrate),
                    bf       : Number(recData.bf),
                    gsm      : Number(recData.gsm),
                    inchcm   : recData.inchcm,
                    reeltype : recData.reeltype,
                    shade    : recData.shade,
                }));
            }



        }
    }
*/


function grid_move() {
    flxcheckRate.getStore().removeAll();
    let finalStore = flxcheckRate.getStore();

    flxDetail.getSelectionModel().selectAll();
    const sel = flxDetail.getSelectionModel().getSelections();

    let rateConflictShown = false;
    const keysMap = {}; // To track unique key -> rate mapping
    const validRecords = [];

    for (let i = 0; i < sel.length; i++) {
        const rec = sel[i].data;

        // Build a unique key for BF+GSM+customer+variety+shade+reeltype+inchcm
        const key = `${rec.varietyname}_${rec.custcode}_${rec.bf}_${rec.gsm}_${rec.reeltype}_${rec.inchcm}_${rec.shade}`;
        const rate = Number(rec.unitrate);

        if (keysMap[key] !== undefined) {
            if (keysMap[key] !== rate) {
                // Conflict: same key but different rate
                flxDetail.getStore().remove(sel[i]);

                if (!rateConflictShown) {
                    alert("A record with the same BF+GSM+Other fields exists but with a different rate. Can't Add the Record. Check the rate in the SO and Continue..");
                    rateConflictShown = true;
                }

                continue; // skip this record
            }
        } else {
            keysMap[key] = rate;
        }

        // Passed all checks, add to valid list
        validRecords.push(new dgrecord({
            ccode    : Number(rec.custcode),
            customer : rec.customer,
            vcode    : Number(rec.varietycode),
            variety  : rec.varietyname,
            rate     : rate,
            bf       : Number(rec.bf),
            gsm      : Number(rec.gsm),
            inchcm   : rec.inchcm,
            reeltype : rec.reeltype,
            shade    : rec.shade,
        }));
    }

    // Add only valid records
    finalStore.add(validRecords);
}



function add_btn_click()
{

	    var gstadd="true";


            if (Number(txtAdvQty.getValue())===0){
                Ext.MessageBox.alert("DA ", "Enter Advice quantity..");
                txtAdvQty.focus();
                gstadd="false";
            }

//alert(gridedit);
            if(gstadd=="true")
            {
		var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemcode == cmbSize.getValue() &&  sel[i].data.custcode ==  custcode &&  sel[i].data.orderno ==  cmbSO.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
                
                if (cnt >0)
                {
                    alert("Customer + SO Number + Size combination Already Selected..")
                    gridedit = "false";
                }  




        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";
                       	var idx = flxDetail.getStore().indexOf(editrow);
            
                        sel[idx].set('customer' , txtCustomer.getRawValue());
                        sel[idx].set('orderno'  , cmbSO.getRawValue());
                        sel[idx].set('orddate'  , Ext.util.Format.date(dptDA.getValue(),"Y-m-d"));
                        sel[idx].set('itemname' , cmbSize.getRawValue());
                        sel[idx].set('ordqty'   , txtOrdQty.getValue());
                        sel[idx].set('pendqty'  , txtPendingQty.getValue());
                        sel[idx].set('advqty'   , txtAdvQty.getValue());
                        sel[idx].set('despqty'  , 0);
                        sel[idx].set('despdate' , Ext.util.Format.date(dptDesp.getValue(),"Y-m-d"));
                        sel[idx].set('unitrate' , txtRate.getValue());
                        sel[idx].set('remarks'  , txtRemarks.getRawValue());
                        sel[idx].set('custcode' , custcode);
                        sel[idx].set('itemcode' , cmbSize.getValue());

                        sel[idx].set('varietyname' , varietyname);
                        sel[idx].set('varietycode' , varietycode);
                        sel[idx].set('varname' , sizename);
                        sel[idx].set('size' , rsize);
                        sel[idx].set('bf' , bf);
                        sel[idx].set('gsm' , gsm);

                        sel[idx].set('inchcm' , inch_cm);

                        sel[idx].set('reeltype' , full_bit);
                        sel[idx].set('shade' , varshade);


                   }                 
	         else if (cnt === 0)
	            {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),
                      new dgrecord({
                            customer : txtCustomer.getRawValue(),
                            orderno  : cmbSO.getRawValue(),
                            orddate  : Ext.util.Format.date(dptDA.getValue(),"Y-m-d"),
                            itemname : cmbSize.getRawValue(),
                            ordqty   : txtOrdQty.getValue(),
                            pendqty : txtPendingQty.getValue(),
                            advqty : txtAdvQty.getValue(),
                            despqty : 0,
                            despdate : Ext.util.Format.date(dptDesp.getValue(),"Y-m-d"),
                            unitrate : txtRate.getValue(),
                            remarks : txtRemarks.getRawValue(),
                            custcode : custcode,
                            itemcode : cmbSize.getValue(),
			    status : '',
                            varietyname : varietyname,
                            varietycode : varietycode,
                            varname     : sizename,
                            size        : rsize,
                            bf          : bf,
                            gsm         : gsm,
                            inchcm      : inch_cm,
                            reeltype    : full_bit,
                            shade       : varshade,

                           })
                      );

			var lastIndex = flxDetail.getStore().getCount() - 1;
			flxDetail.getView().focusRow(lastIndex);
			flxDetail.getSelectionModel().selectRow(lastIndex);

                    } //endif

grid_move();


			txtOrdQty.setValue('')
			txtPendingQty.setValue('');
			txtRate.setValue('');
			txtAdvQty.setValue('');
 			txtRemarks.setValue('');
			txtStock.setValue('');       
                        Ext.getCmp('cmbSize').focus(false, 200);       
          }

}
var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 890,
    y       : 160,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){              
         add_btn_click();
  }
}
});

function edit_click()
{

	
    Ext.getCmp('cmbDANo').show();
    gstFlag = "Edit";
    loaddespadvlistDataStore.removeAll();
    loaddespadvlistDataStore.load({
	url: 'ClsTrnSalesDespatchAdvice.php',
	params: {
	    task: 'loadDespAdvNoList',
	    finid: GinFinid,
	    compcode:Gincompcode
        },
      	callback:function()
        {
	    //alert(loadOrderNoListDataStore.getCount());	


        }
    });
}

function save_click()
{
    var gstSave;
    gstSave="true";
    if (flxDetail.rows==0)
    {
        Ext.Msg.alert('DA','Grid should not be empty..');
        gstSave="false";
    } 

    else if(Ext.util.Format.date(dptDA.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Packing Slip Date is not in current finance year. Please check");
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

           
            var despData = flxDetail.getStore().getRange();                                        
            var despupdData = new Array();
            Ext.each(despData, function (record) {
                despupdData.push(record.data);
            });

            Ext.Ajax.request({
            url: 'TrnSalesDespatchAdviceSave.php',
            params :
             {

                savetype:gstFlag,
                dano:txtDANo.getValue(),
               	griddet: Ext.util.JSON.encode(despupdData),                                      
                compcode:Gincompcode,
                finid:GinFinid,
                dadate: Ext.util.Format.date(dptDA.getValue(),"Y-m-d"),
		cnt: despData.length

		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("DA Saved No -" + obj['dano']);
                    TrnSalesDespatchAdvicePanel.getForm().reset();
                    flxDetail.getStore().removeAll();
                    RefreshData();
                  }else
			{
	Ext.MessageBox.alert("DA Not Saved! Pls Check!- " + obj['dano']);                                                  
                    }
                }
           });         

          	}
		}
            }
        });
    }
}

var TrnSalesDespatchAdvicePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'DESPATCH PLAN ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesDespatchAdvicePanel',
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
//EDIT
                    edit_click();

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
                    save_click();

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

			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&dpno=" + encodeURIComponent(cmbDANo.getValue());
			var param = (p1+p2+p3) ;
		 	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptDepatchPlan.rptdesign&__format=pdf&' + param, '_blank'); 

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
                    TrnSalesDespatchAdviceWindow.hide();
                }
            }
        }]
    },

    items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 500,
           height      : 60,
           x           : 250,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [txtDANo]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbDANo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 240,
       		       y           : 0,
	               border      : false,
                       items: [dptDA]
   		  },
                 ]   
           },
/*         
           {   
           xtype       : 'fieldset',
           title       : 'INVOICE TYPE',
           width       : 450,
           height      : 60,
           x           : 500,
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
                       y           : -10,
                       border      : false,
                       items: [cmbInvType]
                   },
                 ]   
          },
*/

         {   
            xtype       : 'fieldset',
           title       : '',
           width       : 1000,
           height      : 430,
           x           : 10,
           y           : 75,
           border      : true,
           layout      : 'absolute',
           items:[

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 550,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [txtCustomer]
                   },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 50,
                       width       : 400,
                       x           : 500,
                       y           : 0,
                       border      : false,
                       items: [cmbSO]
                   },
      
                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 500,
                       x           : 0,
                       y           : 40,
                       border      : false,
                       items: [cmbSize]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 0,
                       border      : false,
                       items: [txtOrdQty]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 30,
                       border      : false,
                       items: [txtPendingQty]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 60,
                       border      : false,
                       items: [txtStock]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 90,
                       border      : false,
                       items: [txtRate]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 120,
                       border      : false,
                       items: [txtAdvQty]
                   },
   
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
       		       y           : 80,
	               border      : false,
                       items: [dptDesp]
   		  },


               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 80,
                       width       : 600,
                       x           : 0,
       		       y           : 130,
	               border      : false,
                       items: [txtRemarks]
   		  }, btnSubmit,flxDetail,flxParty,

            ]   
          }

,flxcheckRate
      ],

});

function RefreshData(){
   flxParty.hide();
        Ext.getCmp('cmbDANo').hide();
        flxDetail.getStore().removeAll();
        loaddespadvnodatastore.load({
        url: 'ClsTrnSalesDespatchAdvice.php',
        params: {
                task: 'loadDespAdvNo',
	        compcode:Gincompcode,
                finid:GinFinid 
                },
	callback:function()
		{
		txtDANo.setValue(loaddespadvnodatastore.getAt(0).get('advno'));
		}
       });

};
   
    var TrnSalesDespatchAdviceWindow = new Ext.Window({
	height      : 900,
        width       : 1100,
        y           : 30,
        title       : 'SALES - DEPATCH PLAN ENTRY',
        items       : TrnSalesDespatchAdvicePanel,
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
   flxParty.hide();
//alert(Gincompcode);
//alert(GinFinid);

		loaddespadvnodatastore.load({
                url: 'ClsTrnSalesDespatchAdvice.php',
                params: {
                    task: 'loadDespAdvNo',
		    compcode:Gincompcode,
                    finid:GinFinid 
                },
		callback:function()
		{
		txtDANo.setValue(loaddespadvnodatastore.getAt(0).get('advno'));
		}
            });


		loadAllCustomerStore.load({
                url: 'ClsTrnSalesDespatchAdvice.php',
                params: {
                    task: 'loadAllCustomerDetails',
		    compcode:Gincompcode
//                    finid:GinFinid 
                }
            });


			
                    }
        } 
    });
       TrnSalesDespatchAdviceWindow.show();  
});
