Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');

var GinUserid = localStorage.getItem('ginuserid');
var GinUserType = localStorage.getItem('ginusertype');


   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;   
   var gstFlag = "Add";
  var printtype='PDF';

var rep = "Date-DN-Reelwise";

    var LastDNNO = 0;

 var loadPassword = new Ext.data.Store({
      id: 'loadPassword',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos', 'pw_password'
      ]),
    });


/*
   function check_password()
   {
      if (txtPassword.getRawValue() == "dnok")
      {
          Ext.getCmp('save').setDisabled(false);
      }
      else
      {
         Ext.getCmp('save').setDisabled(true);
      }    

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  80,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {

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

*/

    var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType: 'password',
        width       :  150,
        border      : false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: '/SHVPM/clsuser.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'SALES',
		       subject  : 'DELIVERY NOTE',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
                              Ext.getCmp('save').setDisabled(false);
                          }
                          else     
                          {   
                             alert("Password is Error. Please check ...");
                              Ext.getCmp('save').setDisabled(true);
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                      }           

                    }

                });   


                    }           

             }
          },

        } 
    });


  function datecheck()
  {
        var dt_today = new Date();
        var dt_dn    = dptDN.getValue();

        var diffdays = dt_today.getTime()-dt_dn.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
        if (diffdays >1)
        {     
             alert("You are Not Allowed to Modify the Document...")
         Ext.getCmp('save').setDisabled(true);

        }

    if(Ext.util.Format.date(dptDN.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","DN Date is not in current finance year. Please check");
    }

 }


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
						printtype="OTHERS";


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
    width:200,
    height:300,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optrep',
        items: [
            {boxLabel: 'Date-DN-Reelwise' , name: 'optrep', id:'optDDN', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Date-DN-Reelwise";	
	
                    }                       
                     }
                 }
            },
            {boxLabel: 'Date-DN-Size wise' , name: 'optrep', id:'optDateDNAbs', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Date-DN-Size wise";
	   	
                 } 
                 }
                 }  
            },
            {boxLabel: 'Datewise Abstract' , name: 'optrep', id:'optDateAbs', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Datewise Abstract";
	   	
                 } 
                 }
                 }  
            },
            {boxLabel: 'Party-DNwise Abs' , name: 'optrep', id:'optPartyDCAbs', inputValue: 3,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Party-DNwise Abstract";	
                    } 
                 }
                 }  
            },
            {boxLabel: 'Partywise Abstract' , name: 'optrep', id:'optPartyAbs', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Partywise Abstract";	
                 }
                 }    
                 }  
            },
            {boxLabel: 'BFGSMwise Abstract' , name: 'optrep', id:'optBFGSMAbs', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "BFGSMwise Abstract";	
                 }
                 }    
                 }  
            },
            {boxLabel: 'REP - Partywise Abstract' , name: 'optrep', id:'optREPPartyAbs', inputValue: 5,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "REP - Partywise Abstract";	
                 }
                 }    
                 }  
            },
            {boxLabel: 'REP-GSM-Partywise Abstract' , name: 'optrep', id:'optREPGSMPartyAbs', inputValue: 6,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "REP-GSM-Partywise Abstract";	
                 }
                 }    
                 }  
            },
            {boxLabel: 'REP-Monthwise Abstract' , name: 'optrep', id:'optREPMonthAbs', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "REP-Monthwise Abstract";	
                 }
                 }    
                 }  
            },
            {boxLabel: 'REP-Party-Monthwise Abstract' , name: 'optrep', id:'optREPPartyMonthAbs', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "REP-Party-Monthwise Abstract";	
                 }
                 }    
                 }  
            },
        ]


    },
    ]



});

   var txtTAX = new Ext.form.NumberField({
        fieldLabel  : 'Tax (%)',
        id          : 'txtTAX',
        name        : 'txtTAX',
        width       :  60,
        Value       : 300,  
        tabindex : 2,
        autoCreate:{tag:'input',type:'Text',size:'20',autocomplete:'off',maxlength:'2'},
    });


   var txtFreight = new Ext.form.NumberField({
        fieldLabel  : 'Frt/MT',
        id          : 'txtFreight',
        name        : 'txtFreight',
        width       :  80,
        Value       : 300,  
        tabindex : 2,
	readOnly : true,
    });

 
   var txtDNNo = new Ext.form.NumberField({
        fieldLabel  : 'DN No.',
        id          : 'txtDNNo',
        name        : 'txtDNNo',
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


  var dptDN= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptDN',
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

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
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

var loadeditdeliverynote = new Ext.data.Store({
      id: 'loadeditdeliverynote',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDNNoedit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dn_no'
      ]),
    });

var loadeditdeliverynotedetail = new Ext.data.Store({
      id: 'loadeditdeliverynotedetail',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"EditDNNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_name','type_code','dn_sono','dn_sodate','dn_rate','varcode','var_name','var_grpcode','cust_code','cust_ref','dn_wt','dn_sr_no','dn_srno_fincode','dn_size',
'dn_truck' ,'dn_date','dn_freight','dn_vehicle_by','dn_tax','dn_pono','dn_podate']),
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

                                       txtRate.setValue('');	
					loadSOnodatastore.removeAll();
					loadSOnodatastore.load({
					url: 'ClsTrnSalesDeliveryNote.php',
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


						url: 'ClsTrnSalesDeliveryNote.php',
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

						loaddetailsdatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
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

txtRate.setValue( loaddetailsdatastore.getAt(0).get('da_urate'));
						}
						});

loadfromtoboxDatastore.removeAll();
txtstock.setValue('');
rbunit=0;
					        loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
                                         	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),

						},
						callback:function()
						{



						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');

						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
//						    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
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
				url: 'ClsTrnSalesDeliveryNote.php',
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

                                       txtRate.setValue('');	
					loadSOnodatastore.removeAll();
					loadSOnodatastore.load({
					url: 'ClsTrnSalesDeliveryNote.php',
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


						url: 'ClsTrnSalesDeliveryNote.php',
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

						loaddetailsdatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
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

loadfromtoboxDatastore.removeAll();
txtstock.setValue('');
rbunit=0;
					        loaditemstockdatastore.removeAll();
						loaditemstockdatastore.load({

						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
                                         	    sono : loadSOnodatastore.getAt(0).get('da_ackno'),

						},
						callback:function()
						{



						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
				  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');

						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
//						    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
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
				url: 'ClsTrnSalesDeliveryNote.php',
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


var cmbDNNo = new Ext.form.ComboBox({
        fieldLabel      : 'DN No',
        width           : 100,
        displayField    : 'dn_no', 
        valueField      : 'dn_no',
        hiddenName      : '',
        id              : 'cmbDNNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadeditdeliverynote,
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

               txtDNNo.setValue(cmbDNNo.getValue());

               loadAllCustomerStore.removeAll();
               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesDeliveryNote.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
                  entrychk : gstFlag,
                  }
               });


                  loadeditdeliverynotedetail.removeAll();
		  loadeditdeliverynotedetail.load({
		  url: 'ClsTrnSalesDeliveryNote.php',
				params: {
				    task: 'EditDNNo',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                    dnno:cmbDNNo.getValue()
                                },
                           	callback:function()
				{


                                   Ext.getCmp('save').setDisabled(true);


                                  dptDN.setRawValue(Ext.util.Format.date(loadeditdeliverynotedetail.getAt(0).get('dn_date'),"d-m-Y"));
                                  cmbSONO.setRawValue(loadeditdeliverynotedetail.getAt(0).get('dn_sono'));
                                  cmbSONO.setValue(loadeditdeliverynotedetail.getAt(0).get('dn_sono'));
                                  sdptSo.setRawValue(Ext.util.Format.date(loadeditdeliverynotedetail.getAt(0).get('dn_sodate'),"d-m-Y"));

                                  txtPartyRef.setRawValue(loadeditdeliverynotedetail.getAt(0).get('dn_pono'));
                                  dptPartyRef.setRawValue(Ext.util.Format.date(loadeditdeliverynotedetail.getAt(0).get('dn_podate'),"d-m-Y"));


                                  cmbCustomer.setValue(loadeditdeliverynotedetail.getAt(0).get('cust_code'));
                                  cmbCustomer.setRawValue(loadeditdeliverynotedetail.getAt(0).get('cust_ref'));

				  txtTruck.setValue(loadeditdeliverynotedetail.getAt(0).get('dn_truck'));

                                  cmbVehicle.setValue(loadeditdeliverynotedetail.getAt(0).get('dn_vehicle_by'));
				  txtFreight.setValue(loadeditdeliverynotedetail.getAt(0).get('dn_freight'));
       				  txtTAX.setValue(loadeditdeliverynotedetail.getAt(0).get('dn_tax'));

				  txtDNNo.setValue(cmbDNNo.getValue());

                                  datecheck(); 

//load data in flex - start

                   
                                  var cnt=loadeditdeliverynotedetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 
				   	    var stk_finyear    = loadeditdeliverynotedetail.getAt(j).get('dn_srno_fincode');
                                   	    var stk_var_code   = loadeditdeliverynotedetail.getAt(j).get('dn_size');
	                           	    var var_desc       = loadeditdeliverynotedetail.getAt(j).get('var_name');
                                            var stk_sr_no      = loadeditdeliverynotedetail.getAt(j).get('dn_sr_no');
                            	   	    var stk_wt         = loadeditdeliverynotedetail.getAt(j).get('dn_wt');
                                   	    var var_grpcode    = loadeditdeliverynotedetail.getAt(j).get('var_grpcode');
                                            var RowCnt = flxDetail.getStore().getCount() + 1;  
                                            flxDetail.getStore().insert(
                                               flxDetail.getStore().getCount(),
                                               new dgrecord({
	                                           varname     : var_desc,		
						   stksrno     : stk_sr_no,
						   stkwt       : stk_wt,
                                                   rate        : loadeditdeliverynotedetail.getAt(j).get('dn_rate'),	 
						   varcode     : stk_var_code,
						   vargrpcode  : var_grpcode,
						   stkfinyear  : stk_finyear,
						   stkfincode  : stk_finyear,
                                                   soentno     : loadeditdeliverynotedetail.getAt(j).get('dn_sono'),	
                                                   soentdate   : loadeditdeliverynotedetail.getAt(j).get('dn_sodate'), 	
                                                   pono        : loadeditdeliverynotedetail.getAt(j).get('dn_pono'),	
                                                   podate      : loadeditdeliverynotedetail.getAt(j).get('dn_podate') 	
                                               })
                                       	    );
					   grid_tot();

        				}

			            }
//load data in flex - end
			           loadsizedataStore.load({
                                   url: 'ClsTrnSalesDeliveryNote.php',
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
                                    }
                                  });

				}
  			    });
                    }
              }
                       
});

var cmbVehicle = new Ext.form.ComboBox({
        fieldLabel      : 'Vehicle',
        width           : 110,
        displayField    : 'field2', 
        valueField      : 'field1',

        id              : 'cmbVehicle',
        typeAhead       : true,
        mode            : 'local',
        store           : [['M','Mill Vehicle'],['P','Party Vehicle']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
                     if (cmbVehicle.getValue() == "M")
                     {
                         txtFreight.setValue(300);
                     }      
                     else
                     {
                         txtFreight.setValue(0);
                     }      
   
                        
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
				url: 'ClsTrnSalesDeliveryNote.php',
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
				url: 'ClsTrnSalesDeliveryNote.php',
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
						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loaditemstockqty',
						    fincode:GinFinid,
						    compcode:Gincompcode,
						    sizecode : loadsizedataStore.getAt(0).get('var_code'),
				                    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
						    sono : cmbSONO.getRawValue(),
						},
						callback:function()
						{

						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));

						}
						});


						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : loadsizedataStore.getAt(0).get('var_code'),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
						    slipdate : dptDN ,
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

                        flxstartno.getStore().removeAll();
                        flxendno.getStore().removeAll();

                        loaddetailsdatastore.removeAll();
			loaddetailsdatastore.load({
			url: 'ClsTrnSalesDeliveryNote.php',
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
					url: 'ClsTrnSalesDeliveryNote.php',
					params: {
					    task: 'loaditemstockqty',
					    fincode:GinFinid,
					    compcode:Gincompcode,
					    sizecode : cmbSize.getValue(),
                                            sono     : cmbSONO.getRawValue(),
		                            slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d")

					},
					callback:function()
					{

						txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
						loadfromtoboxDatastore.load({
						url: 'ClsTrnSalesDeliveryNote.php',
						params: {
						    task: 'loadfromtobox',
				                    sizecode : cmbSize.getValue(),
						    fincode  : GinFinid,
						    compcode : Gincompcode,
                                        	    sono     : cmbSONO.getRawValue(),
						    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d")
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


  var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock.',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  70,
	readOnly : true,
        tabindex : 2
    });

var txtRate = new Ext.form.NumberField({
	fieldLabel  : 'Rate.',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  100,
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
//alert(st_no);
//alert(end_no);

			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesDeliveryNote.php',
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
                                                  pono        : txtPartyRef.getRawValue(),	    
                                                  podate      : Ext.util.Format.date(dptPartyRef.getValue(),"Y-m-d"),
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
				url: 'ClsTrnSalesDeliveryNote.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d")
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
				url: 'ClsTrnSalesDeliveryNote.php',
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

var btnPrint = new Ext.Button({
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

//alert(printtype);

                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF") 
                {
		        if (rep == "Date-DN-Reelwise")
		    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails.rptdesign&__format=pdf&' + param, '_blank');
		        else
		        if (rep == "Date-DN-Size wise")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewise.rptdesign&' + param, '_blank');	


		        if (rep == "Datewise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewiseAbstract.rptdesign&__format=pdf&' + param, '_blank');	
		        else
		        if (rep == "Party-DNwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyDCwise.rptdesign&__format=pdf&' + param, '_blank');
		        else
		        if (rep == "Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyAbstract.rptdesign&__format=pdf&' + param, '_blank');
		        else  
		        if (rep == "REP - Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepPartyAbstract.rptdesign&__format=pdf&' + param, '_blank');

		        else  
		        if (rep == "BFGSMwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_BFGSMwise.rptdesign&__format=pdf&' + param, '_blank');
                        else
		        if (rep == "REP-GSM-Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepGSMPartyAbstract.rptdesign&' + param, '_blank');
                        else
		        if (rep == "REP-Monthwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepDNMonthwise.rptdesign&__format=pdf&' + param, '_blank');

                        else
		        if (rep == "REP-Party-Monthwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepDNMonthPartywise.rptdesign&__format=pdf&' + param, '_blank');

                }
                else if (printtype == "XLS") 
                {
		        if (rep == "Date-DN-Reelwise")
		    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails.rptdesign&__format=XLSX&' + param, '_blank');
		        else
		        if (rep == "Date-DN-Size wise")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewise.rptdesign&__format=XLSX&' + param, '_blank');	


		        if (rep == "Datewise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewiseAbstract.rptdesign&__format=XLSX&' + param, '_blank');	
		        else
		        if (rep == "Party-DNwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyDCwise.rptdesign&__format=XLSX&' + param, '_blank');
		        else
		        if (rep == "Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyAbstract.rptdesign&__format=XLSX&' + param, '_blank');
		        else  
		        if (rep == "REP - Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepPartyAbstract.rptdesign&__format=XLSX&' + param, '_blank');

		        else  
		        if (rep == "BFGSMwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_BFGSMwise.rptdesign&__format=XLSX&' + param, '_blank');
                        else
		        if (rep == "REP-GSM-Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepGSMPartyAbstract.rptdesign&__format=XLSX&' + param, '_blank');
                        else
		        if (rep == "REP-Monthwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepDNMonthwise.rptdesign&__format=XLSX&' + param, '_blank');

                        else
		        if (rep == "REP-Party-Monthwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepDNMonthPartywise.rptdesign&__format=XLSX&' + param, '_blank');

                }
                    
                else
                {
        if (rep == "Date-DN-Reelwise")
		    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails.rptdesign&' + param, '_blank');
		        else
		        if (rep == "Date-DN-Size wise")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewise.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');	


		        if (rep == "Datewise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewiseAbstract.rptdesign&' + param, '_blank');	
		        else
		        if (rep == "Party-DNwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyDCwise.rptdesign&' + param, '_blank');
		        else
		        if (rep == "Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyAbstract.rptdesign&' + param, '_blank');
		        else  
		        if (rep == "REP - Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepPartyAbstract.rptdesign&' + param, '_blank');

		        else  
		        if (rep == "BFGSMwise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_BFGSMwise.rptdesign&' + param, '_blank');
		        if (rep == "REP-GSM-Partywise Abstract")
		        window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_RepGSMPartyAbstract.rptdesign&' + param, '_blank')
/*
                if (rep == "Date-DNwise")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails.rptdesign&' + param, '_blank');
                else 
                if (rep == "Date-DN-Size wise")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewise.rptdesign&' + param, '_blank');

                else
                if (rep == "Datewise Abstract")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewiseAbstract.rptdesign&' + param, '_blank');	
                else
                if (rep == "Party-DNwise Abstract")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyDCwise.rptdesign&' + param, '_blank');
                else
                if (rep == "Partywise Abstract")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_PartyAbstract.rptdesign&' + param, '_blank');
                if (rep == "BFGSMwise Abstract")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_BFGSMwise.rptdesign' + param, '_blank');
*/
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
                            st_no= end_no;
			}

			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesDeliveryNote.php',
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
                                                  pono        : txtPartyRef.getRawValue(),	    
                                                  podate      : Ext.util.Format.date(dptPartyRef.getValue(),"Y-m-d"),
						 	    
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
				url: 'ClsTrnSalesDeliveryNote.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
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
	{header: "Rate", dataIndex: 'rate',sortable:true,width:80,align:'left',
   	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	      keyup: function () { 
                      }
                    } 
                }
        },
	{header: "SO No.",   dataIndex: 'soentno',sortable:true,width:80,align:'left'},
	{header: "SO Date",  dataIndex: 'soentdate',sortable:true,width:80,align:'left'},
	{header: "PO No.",   dataIndex: 'pono',sortable:true,width:80,align:'left'},
	{header: "PO Date",  dataIndex: 'podate',sortable:true,width:80,align:'left'},
	{header: "ItemCode", dataIndex: 'varcode',sortable:true,width:80,align:'left',hidden:true},
	{header: "Prd.Code", dataIndex: 'vargrpcode',sortable:true,width:80,align:'left',hidden:true},	
	{header: "Finyear", dataIndex: 'stkfinyear',sortable:true,width:80,align:'left' ,hidden:true},
	{header: "Fincode", dataIndex: 'stkfincode',sortable:true,width:80,align:'left',hidden:true},


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
        if (cellIndex != 3) 
         {
         Ext.Msg.show({

             title: 'Delivery Note',
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

   }
});
	
var TrnSalesDeliveryNotePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES DELIVERY NOTE ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesDeliveryNotePanel',
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
                    Ext.getCmp('cmbDNNo').show();
//                    flxdetail.getStore().removeAll();
                    loadeditdeliverynote.load({
				url: 'ClsTrnSalesDeliveryNote.php',
				params: {
				    task: 'loadDNNoedit',
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
                        else if(Ext.util.Format.date(dptDN.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Delivery Date is not in current finance year. Please check");
                         }         
                   	else if(cmbSONO.getRawValue()=="" || cmbSONO.getValue()==0)
			{
				alert("Select SOC No..");
			}
                   	else if(cmbVehicle.getRawValue()=="" )
			{
				alert("Select Vehicle Type..");
                                cmbVehicle.focus();
			}

                   	else if(txtTruck.getRawValue()=="")
			{
				alert("Enter Truck Number ..");
			}
                   	else if(txtFreight.getRawValue() == "")
			{
				alert("Enter Freight Amount ..");
			}

                        else if (gstFlag == 'Edit' && Number(LastDNNO) != Number(txtDNNo.getValue()) && flxDetail.getStore().getCount()==0)
                        {

	                        Ext.Msg.alert('DELIVERY NOTE','Grid should not be empty..');
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


                                               Ext.getCmp('save').setDisabled(true);



//       alert(gstFlag);
                                               Ext.Ajax.request({
				               url: 'TrnSalesDeliveryNoteSave.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode :GinFinid,                                      
 		                                dnno : txtDNNo.getValue(),
                                                dndate :Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),	
						ordno : txtPartyRef.getRawValue(),
						orddate : Ext.util.Format.date(dptPartyRef.getValue(),"Y-m-d"),
						sono: cmbSONO.getRawValue(),
						sodt:Ext.util.Format.date(sdptSo.getValue(),"Y-m-d"),
			
						party : cmbCustomer.getValue(),
			                        truck : txtTruck.getRawValue(),  
						noofreels:txttotreels.getValue(),
						totwt:    txttotwt.getValue(),
						freight : txtFreight.getValue(),
                				tax     : txtTAX.getValue(),
                                                vehicle : cmbVehicle.getValue(),
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Delivery Note No -" + obj['dnno']);
	                                    TrnSalesDeliveryNotePanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
            Ext.getCmp('save').setDisabled(false);
	                                    RefreshData();
	                                  }else
						{
            Ext.getCmp('save').setDisabled(false);
          Ext.MessageBox.alert("Delivery Note Not Saved! Pls Check!- " + obj['dnno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  } 
               else
               {
                   Ext.getCmp('save').setDisabled(false);
               }     
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
            text: 'View - Reel List',
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
		var p3 = "&dnno=" + String(encodeURIComponent(txtDNNo.getValue()));
		var p4 = "&dntype=" + String(encodeURIComponent('1'));

                var param = (p1+p2+p3+p4) ;
                if (printtype == "PDF") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDNPrint.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDNPrint.rptdesign&__format=pdf&' + param, '_blank');

;
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
		var p3 = "&dnno=" + String(encodeURIComponent(txtDNNo.getValue()));
		var p4 = "&dntype=" + String(encodeURIComponent('2'));
                var param = (p1+p2+p3+p4) 
                if (printtype == "PDF") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDNPrint.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDNPrint.rptdesign&__format=pdf&' + param, '_blank');

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
                    TrnSalesDeliveryNoteWindow.hide();
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
                       items: [txtDNNo]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbDNNo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptDN]
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

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [txtPassword]
                   },


                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 570,
                height      : 130,
                x           : 500,
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
		       labelWidth  : 50,
                       width       : 300,
                       x           : 400,
       		       y           : 35,
	               border      : false,
                       items: [txtTAX]
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

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 300,
                       x           : 230,
       		       y           : 75,
	               border      : false,
                       items: [cmbVehicle]
   		  },


               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 300,
                       x           : 400,
       		       y           : 75,
	               border      : false,
                       items: [txtFreight]
   		  },
                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 220,
                height      : 500,
                x           : 1100,
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
			width   : 220,
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
	       		       y           : 340,
			       border      : false,
		               items: [dptStartDate]
	   		  },
       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 370,
			       border      : false,
		               items: [dptEndDate]
	   		  },

       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 40,
	       		       y           : 410,
			       border      : false,
		               items: [btnPrint]
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
					items: [txtRate]
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
            Ext.getCmp('cmbDNNo').hide();
            Ext.getCmp('save').setDisabled(false);

            TrnSalesDeliveryNotePanel.getForm().reset();
            flxDetail.getStore().removeAll();
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            loadDNNodatastore.load({
                url: 'ClsTrnSalesDeliveryNote.php',
                params: {
                    task: 'loadDNNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtDNNo.setValue(loadDNNodatastore.getAt(0).get('dnno'));
                LastDNNO = loadDNNodatastore.getAt(0).get('dnno') - 1;
		}
            });

   };
var loadDNNodatastore = new Ext.data.Store({
      id: 'loadDNNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDNNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dnno'
      ]),
    });

 
var TrnSalesDeliveryNoteWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 30,
        title       : 'SALES - DELIVERY NOTE ENTRY',
        items       : TrnSalesDeliveryNotePanel,
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
/*
			Ext.Ajax.request({
	            	url: 'TrnDNExport.php',
	       	        params:
			{
				compcode : Gincompcode,
                                finid:GinFinid,
			},
                        });

			Ext.Ajax.request({
	            	url: 'TrnSizeExport.php',
	       	        params:
			{
			},
                        });

*/
               loadinvoicetypedataStore.load({
                  url: 'ClsTrnSalesDeliveryNote.php',
                  params: {
                      task: 'loadinvtype'
                  }
	       });

               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesDeliveryNote.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptDN.getValue(),"Y-m-d"),
                  entrychk : gstFlag,  
                  }
               });
             }
        } 
    });
	
       TrnSalesDeliveryNoteWindow.show();  
});
