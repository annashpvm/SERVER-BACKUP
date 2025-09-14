
Ext.onReady(function(){


   Ext.QuickTips.init();



   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');
   var userid = localStorage.getItem('ginuser');
   var gstStatus = "N";
   var gstFlag = "Add";
   var gridedit = "false";
   var itemgrpcode = 0;
   var edwtno = 0, wtno = 0 ;
   var supcode =0;
   var areacode =0;
   var unloaddate = new Date();

   var savechk = 0; 
   var seqno = 0;


var loadWTRefreshdatastore = new Ext.data.Store({
      id: 'loadWTRefreshdatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTicketWeight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'wc_acceptedwt'
      ]),
    });

var loadSupplierRefreshdatastore = new Ext.data.Store({
      id: 'loadSupplierRefreshdatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTicketSupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'wc_sup_code','cust_ref'
      ]),
    });	

var btnRefreshWt = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 3,
        height  : 10, 
        text    : "R",
        border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
		loadWTRefreshdatastore.load({

                 url: '/SHVPM/QC/ClsQC.php',
		 params:
		 {
	 	 task:"loadTicketWeight",
                 ticketno : cmbTicketNo.getValue(),
                 fincode  : GinFinid,
                 compcode : Gincompcode,

		 },
		callback:function()
		{
                  txtAcceptedWeight.setValue(loadWTRefreshdatastore.getAt(0).get('wc_acceptedwt'));
                        findDifferance();
              	        find_value();
                } 
		 });
        } 
     }
});
   

var btnSupplierRefresh = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 3,
        height  : 10, 
        text    : "R",
        border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    


		loadSupplierRefreshdatastore.load({

                 url: '/SHVPM/QC/ClsQC.php',
		 params:
		 {
	 	 task:"loadTicketSupplier",
                 ticketno : cmbTicketNo.getValue(),
		 },
		callback:function()
		{
//alert(loadSupplierRefreshdatastore.getAt(0).get('cust_ref'));
                  txtSupplier.setRawValue(loadSupplierRefreshdatastore.getAt(0).get('cust_ref'));
                  supcode = loadSupplierRefreshdatastore.getAt(0).get('wc_sup_code');
//alert(supcode);

                } 
		 });
        } 
     }
});
   
var txtVessel = new Ext.form.TextField({
        fieldLabel  : 'Vessel',
        id          : 'txtVessel',
        name        : 'txtVessel',
        width       :  180,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
enableKeyEvents: true, 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'30'},
	listeners:{
        }      

    });
var lblSupplier = new Ext.form.Label({
    fieldLabel  : 'Supplier Name',
    id          : 'lblSupplier',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblUnlodingTime = new Ext.form.Label({
    fieldLabel  : 'Unloading Time',
    id          : 'lblUnlodingTime',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblArea = new Ext.form.Label({
    fieldLabel  : 'Area',
    id          : 'lblArea',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

	var loadareadatastore = new Ext.data.Store({
      id: 'loadareadatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'area_code', type: 'int',mapping:'area_code'},
	{name:'area_name', type: 'string',mapping:'area_name'}
      ]),
    });
	

 var loadQCFuelEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCFuelEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCFuelEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entrydate', 'qc_fuel_ticketdate', 'qc_fuel_supcode', 'qc_fuel_truck', 'qc_fuel_ticketno', 'qc_fuel_ticketwt', 'qc_fuel_itemcode', 
 'qc_fuel_mois_arb_fixed', 'qc_fuel_mois_arb_actual', 'qc_fuel_mois_arb_diff', 'qc_fuel_mois_arb_qty', 'qc_fuel_mois_arb_debit_yn', 'qc_fuel_mios_arb_rate', 'qc_fuel_mois_arb_value', 'qc_fuel_mois_adb_fixed', 'qc_fuel_mois_adb_actual', 'qc_fuel_mois_adb_diff', 'qc_fuel_mois_adb_qty', 'qc_fuel_mois_adb_debit_yn', 'qc_fuel_mois_adb_rate', 'qc_fuel_mois_adb_value', 'qc_fuel_ash_fixed', 'qc_fuel_ash_actual', 'qc_fuel_ash_diff', 'qc_fuel_ash_qty', 'qc_fuel_ash_debit_yn', 'qc_fuel_ash_rate', 'qc_fuel_ash_value', 'qc_fuel_volatile_fixed', 'qc_fuel_volatile_actual', 'qc_fuel_volatile_diff', 'qc_fuel_volatile_qty', 'qc_fuel_volatile_debit_yn', 'qc_fuel_volatile_rate', 'qc_fuel_volatile_value', 'qc_fuel_fixedcarbon_fixed', 'qc_fuel_fixedcarbon_actual', 'qc_fuel_fixedcarbon_diff', 'qc_fuel_fixedcarbon_qty', 'qc_fuel_fixedcarbon_debit_yn', 'qc_fuel_fixedcarbon_rate', 'qc_fuel_fixedcarbon_value', 'qc_fuel_fines_fixed', 'qc_fuel_fines_actual', 'qc_fuel_fines_diff', 'qc_fuel_fines_qty', 'qc_fuel_fines_debit_yn', 'qc_fuel_fines_rate', 'qc_fuel_fines_value', 'qc_fuel_sand_fixed', 'qc_fuel_sand_actual', 'qc_fuel_sand_diff', 'qc_fuel_sand_qty', 'qc_fuel_sand_debit_yn', 'qc_fuel_sand_rate', 'qc_fuel_sand_value', 'qc_fuel_iron_fixed', 'qc_fuel_iron_actual', 'qc_fuel_iron_diff', 'qc_fuel_iron_qty', 'qc_fuel_iron_debit_yn', 'qc_fuel_iron_rate', 'qc_fuel_iron_value', 'qc_fuel_gcv_adb_fixed', 'qc_fuel_gcv_adb_actual', 'qc_fuel_gcv_adb_diff', 'qc_fuel_gcv_adb_qty', 'qc_fuel_gcv_adb_debit_yn', 'qc_fuel_gcv_adb_rate', 'qc_fuel_gcv_adb_value', 'qc_fuel_gcv_arb_fixed', 'qc_fuel_gcv_arb_actual', 'qc_fuel_gcv_arb_diff', 'qc_fuel_gcv_arb_qty', 'qc_fuel_gcv_arb_debit_yn', 'qc_fuel_gcv_arb_rate', 'qc_fuel_gcv_arb_value', 'itmh_name',  'cust_code', 'cust_ref','cust_ref','qc_fuel_slno', 'wc_area_code','wc_unloadingtime','area_name','qc_fuel_area','qc_fuel_unloadingtime','cust_ref',
'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc','qc_fuel_vessel_name','qc_fuel_billqty','qc_fuel_millqty','qc_fuel_itemrate','qc_fuel_dn_raised' ,'qc_fuel_grn_raised','qc_fuel_otherdedqty',
'qc_fuel_degrade_item', 'qc_fuel_degrade_qty', 'qc_fuel_degrade_rate'

      ]),
    });

 var loadQCFuelEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCFuelEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entryno',
      ]),
    });


 var loadEntryNoDatastore = new Ext.data.Store({
      id: 'loadEntryNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCFuelEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_fuel_entryno',
      ]),
    });




 var loadTruckNoDetailDatastore = new Ext.data.Store({
      id: 'loadTruckNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelTruckDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_ticketno' ,'wc_acceptedwt','cust_ref','cust_code','wc_area_code','wc_time','area_name',
          'wc_vehicleno','wc_netwt','wc_partynetwt','wc_itemcode'

      ]),
    });

 var loadTruckTicketNoDetailDatastore = new Ext.data.Store({
      id: 'loadTruckTicketNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelTruckTicketNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_ticketno'
      ]),
    });





 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code' ,'itmh_name',
      ]),
    });


 var loadFuelItemDetailDatastore = new Ext.data.Store({
      id: 'loadFuelItemDetailDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelItemDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'itmh_code', 'itmh_name', 'itmh_moisture_ARB', 'itmh_moisture_ADB', 'itmh_ash', 'itmh_volatile', 'itmh_fixedcarbon', 'itmh_fines', 'itmh_sand', 'itmh_iron', 'itmh_gcv_ADB', 'itmh_gcv_ARB', 'itmh_hsncode',
'itmh_moisture_ARB_qc', 'itmh_moisture_ADB_qc', 'itmh_ash_qc', 'itmh_volatile_qc', 'itmh_fixedcarbon_qc', 'itmh_fines_qc', 'itmh_sand_qc', 'itmh_iron_qc', 'itmh_gcv_ADB_qc', 'itmh_gcv_ARB_qc'
      ]),
    });


 var loadWBSlNoDatastore = new Ext.data.Store({
      id: 'loadWBSlNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWBSlNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_seqno', 'wc_wc_ticketno'
      ]),
    });


var txtQCEntNo = new Ext.form.NumberField({
        fieldLabel  : 'QC Entry No.',
        id          : 'txtQCEntNo',
        name        : 'txtQCEntNo',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });




var txtAcceptedWeight = new Ext.form.NumberField({
        fieldLabel  : 'Accept Weight.',
        id          : 'txtAcceptedWeight',
        name        : 'txtAcceptedWeight',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });



var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : 'Degrade Qty',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        value    : 0,
	enableKeyEvents: true, 
	listeners:{
           change:function(){
                          findDifferance();
              	        find_value();
           },
           blur:function(){
                        findDifferance();
              	        find_value();
           },
           keyup:function(){
                          findDifferance();
              	        find_value();
            }
        }      

    });


var txtPartyWeight = new Ext.form.NumberField({
        fieldLabel  : 'Party Weight.',
        id          : 'txtPartyWeight',
        name        : 'txtPartyWeight',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });


var txtMillWeight = new Ext.form.NumberField({
        fieldLabel  : 'Mill Weight.',
        id          : 'txtMillWeight',
        name        : 'txtMillWeight',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });


   var txtItemRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate(MT)',
        id          : 'txtItemRate',
        name        : 'txtItemRate',
        width       :  90,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });



   var txtDegradeItemRate = new Ext.form.NumberField({
        fieldLabel  : 'Rate(MT)',
        id          : 'txtDegradeItemRate',
        name        : 'txtDegradeItemRate',
        width       :  90,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });




var txtOtherDedQty = new Ext.form.NumberField({
        fieldLabel  : 'Any Other DEDU. QTY ',
        id          : 'txtOtherDedQty',
        name        : 'txtOtherDedQty',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
	    keyup:function()
            {
		var dqty = 0;
		var aqty = 0;

        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();


		for (var i = 0; i < selrows; i++) {
		    if (Number(sel[i].data.dedqty) > 0 ) {
		          dqty  = dqty +  Number(sel[i].data.dedqty);
		    }
		}

		dqty = dqty  + txtOtherDedQty.getValue();
		txtTotQty.setRawValue(dqty);
		txtAcceptedQty.setRawValue(Number(txtAcceptedWeight.getValue()) - Number(dqty));
          }  


        }      

    });



var txtTotQty = new Ext.form.NumberField({
        fieldLabel  : 'TOTAL DEDUCTION QTY ',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{

        }      

    });

var txtAcceptedQty = new Ext.form.NumberField({
        fieldLabel  : 'ACCEPTED QTY ',
        id          : 'txtAcceptedQty',
        name        : 'txtAcceptedQty',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });

var txtFC  =  new Ext.form.NumberField({
        fieldLabel  : 'Fixed Carbon',
        id          : 'txtFC',
        name        : 'txtFC',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });


var txtFC  =  new Ext.form.NumberField({
        fieldLabel  : 'Fixed Carbon',
        id          : 'txtFC',
        name        : 'txtFC',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });

var txtGCVARB  =  new Ext.form.NumberField({
        fieldLabel  : 'GCV (ARB)',
        id          : 'txtGCVARB',
        name        : 'txtGCVARB',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });


  function datecheck()
  {

        var dt_today = new Date();

        var dtgrn = dtEntDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >30)
        {     
             alert("You are Not Allowed to Raise the QC Entry in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtEntDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the QC Entry in Future date");
             dtEntDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert"," Date is not in current finance year. Please Change the Fin Year");
    }

    else if(Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert"," Date is not in current finance year. Please change the Fin Year");
    }

 }


var dtEntDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtEntDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
	enableKeyEvents: true,
    listeners:{
           change:function(){
              datecheck();
           },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            }
    }
    
});



var dtTicketDate = new Ext.form.DateField({
    fieldLabel : 'Ticket Date',
    id         : 'dtTicketDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
    listeners:{
            change:function(){
                 RefreshTruckNoList();
            }
    }
    
});


var txtSupplier = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSupplier',
	name        : 'txtSupplier',
	width       :  300,
	style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,
	listeners   : {
	}
});


var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 250,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadareadatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false
   });






function refresh()
{
	
        txtTicketWt.setValue(''); 
        txtMoisPer.setValue('');
	txtMoisWt.setValue('');
	txtLLessPer.setValue('');
	txtLLessQty.setValue('');
	txtRejectPer.setValue('');
	txtRejectQty.setValue('');
	txtAcceptWt.setValue();
        txtDegradeQty.setValue('');
	txtRemarks.setValue('');
        txtMoisForQty.setValue('');




}

var txtRemarks = new Ext.form.TextField({
	fieldLabel  : 'Remarks',
	id          : 'txtRemarks',
	name        : 'txtRemarks',
	width       :  500,
	style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	listeners   : {
	}
});




var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'QC Entry No.',
        width           : 80,
        displayField    : 'qc_fuel_entryno', 
        valueField      : 'qc_fuel_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadQCFuelEntryNoListDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                flxDetail.getStore().removeAll();
                RefreshGRID();
            	loadQCFuelEntryNoDetailDatastore.removeAll();
		loadQCFuelEntryNoDetailDatastore.load({
		 	url:'ClsQC.php',
			params:
	   		{
			task:"loadQCFuelEntryNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){

                        txtQCEntNo.setValue(cmbQCEntNo.getValue());

			dtEntDate.setRawValue(Ext.util.Format.date(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_entrydate'),'d-m-Y'));
			dtTicketDate.setRawValue(Ext.util.Format.date(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketdate'),'d-m-Y'));
                        txtSupplier.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('cust_ref'));
                        cmbArea.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_area'));


                        if (loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_dn_raised') == "Y" || loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_grn_raised') == "Y"  )
                        {
                            alert("Debit Note / GRN Raised for this Inspection Number.. Can't Modify .");
                            Ext.getCmp('save').setDisabled(true);  
                        }     
                        else
                        {
                            Ext.getCmp('save').setDisabled(false);  
                        }     



                        areacode = loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_area');

                        unloaddate = loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_unloadingtime');

                        supcode = loadQCFuelEntryNoDetailDatastore.getAt(0).get('cust_code');
	                cmbTruckNo.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_truck'));

                        cmbTicketNo.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketno'));

                        cmbItemName.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_itemcode')); 

			txtOtherDedQty.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_otherdedqty'));
			txtAcceptedWeight.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ticketwt'));
			txtVessel.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_vessel_name'));


                        txtPartyWeight.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_billqty'));
                        txtMillWeight.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_millqty'));
                        txtItemRate.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_itemrate'));


                        txtDegradeQty.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_degrade_qty'));
                        cmbDegradeItem.setValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_degrade_item'));
                     txtDegradeItemRate.setRawValue(loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_degrade_rate'));


			flxDetail.getSelectionModel().selectAll();
			var selrows = flxDetail.getSelectionModel().getCount();
			var sel = flxDetail.getSelectionModel().getSelections();


			for (var i = 0; i < selrows; i++) {

                        if (sel[i].data.parameter  == "TOTAL MOISTURE" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_arb_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_moisture_ARB_qc'));

			}
                        if (sel[i].data.parameter  == "INHERENT MOISTURE" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_mois_adb_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_moisture_ADB_qc'));
			}
                        if (sel[i].data.parameter  == "ASH" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_ash_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_ash_qc'));

			}
                        if (sel[i].data.parameter  == "VOLATILE MATTER" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_volatile_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_volatile_qc'));

			}
                        if (sel[i].data.parameter  == "FIXED CARBON" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fixedcarbon_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_fixedcarbon_qc'));

			}
                        if (sel[i].data.parameter  == "FINES" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_fines_qty'));
                        sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_fines_qc'));

			}
                        if (sel[i].data.parameter  == "SAND" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_sand_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_sand_qc'));

			}
                        if (sel[i].data.parameter  == "IRON" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_iron_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_iron_qc'));

			}
                        if (sel[i].data.parameter  == "GCV(KCAL/KG)" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_adb_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_gcv_ADB_qc'));

			}
                        if (sel[i].data.parameter  == "GCV(KCAL /KG)" ) {
                        sel[i].set('fixed',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_fixed'));
                        sel[i].set('actual',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_actual'));
                        sel[i].set('differ',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_diff'));
                        sel[i].set('differ2',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_diff2'));
                        sel[i].set('qty',loadQCFuelEntryNoDetailDatastore.getAt(0).get('qc_fuel_gcv_arb_qty'));
sel[i].set('qcchk',loadQCFuelEntryNoDetailDatastore.getAt(0).get('itmh_gcv_ARB_qc'));

			}
			}
	
                 }    
	        });			
      
	   }
        }      
   });



function columnWrap(val){
    return '<div style="white-space:normal !important;">'+ val +'</div>';
}

function findDifferance() {

        var diff = 0;  
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();

        for (var i = 0; i < selrows; i++) {
            sel[i].data.differ =0;
            sel[i].data.dedqty  = '0';

//alert(sel[i].data.qcchk);

            if (Number(sel[i].data.actual) > Number(sel[i].data.fixed) ) {

                  qty1 = Number(sel[i].data.actual) - Number(sel[i].data.fixed);
                  diff = Number(sel[i].data.actual) - Number(sel[i].data.fixed);

                  sel[i].data.differ  =  Ext.util.Format.number(Number(qty1),"0.00") ;

                   if (Number(sel[i].data.actual) > 0 && Number(sel[i].data.actual) > Number(sel[i].data.fixed)) {

                        var q1 = Number(txtAcceptedWeight.getValue()) - Number(txtDegradeQty.getValue());


 //                       var qty1 = (Number(txtAcceptedWeight.getValue()) -Number(txtDegradeQty.getValue()))  *  (Number(sel[i].data.actual) - Number(sel[i].data.fixed))/100 ;
                       var qty1 = Number(q1)  *  (Number(sel[i].data.actual) - Number(sel[i].data.fixed))/100 ;

                        if (sel[i].data.qcchk == "Y")   


                      {   
//if (Number(txtDegradeQty.getValue())  > 0)
//{alert(q1);              
//alert(qty1);    
//}
                       var qty1 = Number(q1)  *  (Number(sel[i].data.actual) - Number(sel[i].data.fixed))/100 ;

                           sel[i].data.dedqty  =  Ext.util.Format.number(Number(qty1),"0") ;

                           sel[i].data.differ  =  Ext.util.Format.number(Number(diff),"0.00") ;
                           sel[i].data.differ2  =  Ext.util.Format.number(Number(diff),"0.00") ;

                        } 
                        else
                        {
                           sel[i].data.dedqty  = '0';
                           sel[i].data.differ  =  '0';
                        } 

                    } else {
             
                        sel[i].data.dedqty  = '0';

                    }

            }
        }

  

        var dqty = 0;
        var aqty = 0;

        for (var i = 0; i < selrows; i++) {
            
            if (Number(sel[i].data.dedqty) > 0 ) {
                  dqty  = dqty +  Number(sel[i].data.dedqty);
            }
        }

	dqty = dqty  + txtOtherDedQty.getValue();

        txtTotQty.setRawValue(dqty);
        txtAcceptedQty.setRawValue(Number(txtAcceptedWeight.getValue()) - Number(dqty));
      
         

}

function find_value()
{
        var tm = 0;
        var im = 0;

        var ash = 0;
        var vm = 0;
        var fc = 0;
        var gcvadb = 0;
        var gcvarb = 0;

        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
       
        for (var i = 0; i < selrows; i++) {
            if (sel[i].data.parameter == "TOTAL MOISTURE")                 
                tm =  Ext.util.Format.number(sel[i].data.actual,'0.00');
            if (sel[i].data.parameter == "INHERENT MOISTURE")                 
                im =  Ext.util.Format.number(sel[i].data.actual,'0.00');
            if (sel[i].data.parameter == "ASH")                 
                ash =  Ext.util.Format.number(sel[i].data.actual,'0.00');
            if (sel[i].data.parameter == "VOLATILE MATTER")                 
                vm =  Ext.util.Format.number(sel[i].data.actual,'0.00');
            if (sel[i].data.parameter == "GCV(KCAL/KG)")                 
                gcvadb =  Ext.util.Format.number(sel[i].data.actual,'0.00');

        }    
//for fixed carbon
        if (im > 0 && ash > 0 && vm > 0)
        { 
            val1 = 100 - (Number(im)+Number(ash)+Number(vm));  
            fc =  Ext.util.Format.number(val1,'0.00');
        }  
//for GCV ARB
       if (cmbItemName.getRawValue() == "IMPORTED STEAM COAL")
       {
		if (tm > 0 && im > 0 )
		{ 
		    val1 = (100-Number(tm))/(100-Number(im))*gcvadb;
		    gcvarb =  Ext.util.Format.number(val1,'0');
		}  
        } 
        else
       {
		if (tm > 0)
		{ 
		    val1 = gcvadb-  (gcvadb * (tm/100));  
		    gcvarb =  Ext.util.Format.number(val1,'0');
		}  
        } 
 

        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();


        txtFC.setRawValue(fc);
        txtGCVARB.setRawValue(gcvarb);


        for (var i = 0; i < selrows; i++) {
//alert("3");

            if (sel[i].data.parameter == "FIXED CARBON") 
                  sel[i].data.actual  = fc;  
            if (sel[i].data.parameter == "GCV(KCAL /KG)") 
                  sel[i].data.actual  = gcvarb;  
              

        }   

}

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:220,
    height: 250,
    hidden:false,
    width: 1200,
 
    columns:
    [
        {header: "Parameters", dataIndex: 'parameter',sortable:false,width:250,align:'left',
		renderer : function(value, meta ,record) {
		    var paraname =record.get('parameter');
		    if(paraname  =='FIXED CARBON') { 
			meta.style = "background-color:  #e4e572 ;";
		    }
                    else if(paraname  =='GCV(KCAL /KG)') { 
			meta.style = "background-color:  #e4e572 ;";
                        
		    }
                    else{
			meta.style = "background-color:#FFDEAD;";
		    }
		    return value;
		  }},
        {header: "%", dataIndex: 'percent',sortable:false,width:50,align:'left'},
        {header: "Type", dataIndex: 'type',sortable:false,width:60,align:'left'},
        {header: "QC Chk", dataIndex: 'qcchk',sortable:false,width:60,align:'left'},
        {header: "Fixed", dataIndex: 'fixed',sortable:false,width:100,align:'left',
/*
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                     focus: function () {

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('fixed')));
                            selrow.set('diff', Number(selrow.get('fixed')) - Number(selrow.get('actual')));
                            CalcValue();
                        },
                        blur: function () {

                            CalcValue();
                        },
                        keyup: function () {

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt = 0;
     CalcValue();
                        }

                    }
         }     */
        },
        {header: "Actual", dataIndex: 'actual',sortable:false,width:100,align:'left',

                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {

           blur:function(){
                        findDifferance();
              	        find_value();
           },
           keyup:function(){
                        findDifferance();
              	        find_value();
           },

/*
                     focus: function () {

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
//alert(selrow.get('parameter'));
//                            if (selrow.get('parameter') != "FIXED CARBON")
//                            {
//alert(selrow.get('parameter'));
        //                       this.setValue(Number(selrow.get('actual')));
    //                        } 
           
                        },
                        blur: function () {
                        findDifferance();
              	        find_value();

                        },
                        keyup: function () {

                        //    var sm = flxDetail.getSelectionModel();
//                            var selrow = sm.getSelected();
                        }
*/
                    }
         },
                listeners: {
                    click: function () {
                        findDifferance();
              	        find_value();
                    }
                }
         },

        {header: "Differance", dataIndex: 'differ2' ,sortable:false,width:100,align:'left',hidden:'true',
               renderer: function (v, params, record) {
               var retval;
               findDifferance();
	       find_value();

                    if (Number(record.data.actual) > 0 && Number(record.data.actual) > Number(record.data.fixed) ) {

                        retval =  Number(record.data.actual) - Number(record.data.fixed) ;
                        retval =  Ext.util.Format.number(Number(retval),"0.00") ;
                    } else {
             
                            retval = '0';

                    }
                    return retval;

                }

        },


        {header: "Differance", dataIndex: 'differ',sortable:false,width:100,align:'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                     focus: function () {

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('differ')));
           
                        },
                        blur: function () {

                      //      CalcValue();
                        },
                        keyup: function () {

                        var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('differ')));

                        }

                    }
         }

       },

        {header: "Qty Deduct", dataIndex: 'dedqty',sortable:true,width:100,align:'left',
/*
                renderer: function (v, params, record) {
                    var retval;
                    if (Number(record.data.actual) > 0 && Number(record.data.actual) > Number(record.data.fixed) ) {
                        var val1 = Number(txtAcceptedWeight.getValue())* (Number(record.data.actual) - Number(record.data.fixed))/100 ;
                        retval =  Ext.util.Format.number(Number(val1),"0") ;
                    } else {
             
                            retval = '0';

                    }
                    return retval;
                }
*/
        },
/*
        {header: "Debit Note(Y/N)", dataIndex: 'DNyn',sortable:true,width:120,align:'left',},
        {header: "Debit(qty)", dataIndex: 'qty',sortable:true,width:100,align:'left'},
        {header: "Rate", dataIndex: 'rate',sortable:true,width:100,align:'left',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                     focus: function () {

                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('rate')));

                    }
                   },
         } 
        },
        {header: "Value", dataIndex: 'value',sortable:true,width:100,align:'left'},
*/
    ],
    store: [],

    listeners:{	

            'rowSelect' : function(flxDetail,rowIndex,cellIndex,e){
                    if (rowIndex == 4)      
                          flxDetail.lock(rowIndex);

            },


            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
    /*     
               var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.parameter == "FIXED CARBON")
                 flxDetail.getSelectionModel().lock();
                        } 

                if (cellIndex == 6)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.DNyn == null)
                                    flag = 'N';
                                else                                   
                                    flag = selected_rows[i].data.DNyn;
                                             
                               	colname = 'DNyn';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				} else 
				{
				   selected_rows[i].set(colname, 'N');
				}
                       }   
                }

*/
  
             }  ,
    
   }
});




var cmbDegradeItem = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name',
        width           : 350,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbDegradeItem',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemListDatastore,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
        }
});  


function get_Item_parameters()
{

    loadFuelItemDetailDatastore.removeAll();
    loadFuelItemDetailDatastore.load({
        url: '/SHVPM/QC/ClsQC.php',
        params: {
            task: 'loadFuelItemDetail',
            itemcode : cmbItemName.getValue(),
        },
	callback:function()
	{

            var Cnt = loadFuelItemDetailDatastore.getCount();

       	    var Row = flxDetail.getStore().getCount();
	    flxDetail.getSelectionModel().selectAll();
	    var sel  =flxDetail.getSelectionModel().getSelections();
	    for(var k=0;k<Row;k++)
	    {

        if (sel[k].data.parameter == "TOTAL MOISTURE")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_moisture_ARB'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_moisture_ARB_qc'));

        } 
        if (sel[k].data.parameter == "INHERENT MOISTURE")
        {  
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_moisture_ADB'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_moisture_ADB_qc'));

        } 
        if (sel[k].data.parameter == "ASH")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_ash'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_ash_qc'));

        } 
        if (sel[k].data.parameter == "VOLATILE MATTER")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_volatile'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_volatile_qc'));

        } 
        if (sel[k].data.parameter == "FIXED CARBON")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_fixedcarbon'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_fixedcarbon_qc'));

        } 
        if (sel[k].data.parameter == "FINES")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_fines'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_fines_qc'));

        } 
        if (sel[k].data.parameter == "SAND")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_sand'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_sand_qc'));

        } 
        if (sel[k].data.parameter == "IRON")
        { 
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_iron'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_iron_qc'));

        } 
        if (sel[k].data.parameter == "GCV(KCAL/KG)")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_gcv_ADB'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_gcv_ADB_qc'));

        } 
        if (sel[k].data.parameter == "GCV(KCAL /KG)")
        {
           sel[k].set('fixed',loadFuelItemDetailDatastore.getAt(0).get('itmh_gcv_ARB'));
           sel[k].set('qcchk',loadFuelItemDetailDatastore.getAt(0).get('itmh_gcv_ARB_qc'));

        } 


	    }  
            

	}
    });


}

var cmbItemName = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name',
        width           : 350,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItemName',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemListDatastore,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                   get_Item_parameters();			
	   }
        }      
   });

 var loadTruckNoDatastore = new Ext.data.Store({
      id: 'loadTruckNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFuelTruckList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_vehicleno',
      ]),
    });




var cmbTruckNo = new Ext.form.ComboBox({
        fieldLabel      : 'Vehicle Number',
        width           : 180,
        displayField    : 'wc_vehicleno', 
        valueField      : 'wc_vehicleno',
        hiddenName      : '',
        id              : 'cmbTruckNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTruckNoDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
 

			loadTruckTicketNoDetailDatastore.removeAll();
			loadTruckTicketNoDetailDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadFuelTruckTicketNoList',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getRawValue(),
			},
			callback:function()
			{



			loadTruckNoDetailDatastore.removeAll();
			loadTruckNoDetailDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadFuelTruckDetail',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getRawValue(),
                                    ticketno : loadTruckTicketNoDetailDatastore.getAt(0).get('wc_ticketno'),

			},
			callback:function()
			{

                               cmbTicketNo.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_ticketno'));
                               cmbTicketNo.setValue(loadTruckNoDetailDatastore.getAt(0).get('wc_ticketno'));

                               supcode = loadTruckNoDetailDatastore.getAt(0).get('cust_code');

                             if (supcode > 0 )
                                   txtSupplier.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('cust_ref'));
                               else
                                   txtSupplier.setRawValue('');


                               cmbArea.setValue(loadTruckNoDetailDatastore.getAt(0).get('wc_area_code'));
                               areacode = loadTruckNoDetailDatastore.getAt(0).get('wc_area_code');
                               unloaddate = loadTruckNoDetailDatastore.getAt(0).get('wc_unloadingtime');
                               txtAcceptedWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_acceptedwt'));
                               txtPartyWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_partynetwt'));
                               txtMillWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_netwt'));
                        }
			});

                        }
			});
			
	   }
        }      
   });


var cmbTicketNo = new Ext.form.ComboBox({
        fieldLabel      : 'Ticket Number.',
        width           : 100,
        displayField    : 'wc_ticketno', 
        valueField      : 'wc_ticketno',
        hiddenName      : '',
        id              : 'cmbTicketNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadTruckTicketNoDetailDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
 

			loadTruckNoDetailDatastore.removeAll();
			loadTruckNoDetailDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadFuelTruckDetail',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getRawValue(),
                                    ticketno : cmbTicketNo.getRawValue(),

			},
			callback:function()
			{

                               cmbTicketNo.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_ticketno'));

                               cmbItemName.setValue(loadTruckNoDetailDatastore.getAt(0).get('wc_itemcode'));

                               supcode = loadTruckNoDetailDatastore.getAt(0).get('cust_code');
                               if (supcode > 0 )
                                   txtSupplier.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('cust_ref'));
                               else
                                   txtSupplier.setRawValue('');

                               cmbArea.setValue(loadTruckNoDetailDatastore.getAt(0).get('wc_area_code'));
                               areacode = loadTruckNoDetailDatastore.getAt(0).get('wc_area_code');
                               unloaddate = loadTruckNoDetailDatastore.getAt(0).get('wc_unloadingtime');
                               txtAcceptedWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_acceptedwt'));
                               txtPartyWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_partynetwt'));
                               txtMillWeight.setRawValue(loadTruckNoDetailDatastore.getAt(0).get('wc_netwt'));
                               get_Item_parameters();

                        }
			});
			
	   }
        }      
   });







   var QCPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'QCPanel',
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
            fontSize:18,
            items: [
			{
//edit
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
                		       flxDetail.getStore().removeAll();
                                        RefreshGRID();

                                       	Ext.getCmp('txtQCEntNo').hide();
                   			Ext.getCmp('cmbQCEntNo').show();


		                    	loadQCFuelEntryNoListDatastore.removeAll();
                      			loadQCFuelEntryNoListDatastore.load({
			         	url:'ClsQC.php',
            				params:
		           		{
					task:"loadFuelQCEntryList",
					finid : GinFinid,
					compcode : Gincompcode,
				        },
				        });
                                }
				}
			},'-',
			{
//edit
				text: 'View',
				style  : 'text-align:center;',
				tooltip: 'View Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
	                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var entryno = "&entryno=" + encodeURIComponent(cmbQCEntNo.getValue());

                                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-  d"));	
                                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-  d"));	


				var param =(compcode+fincode+entryno+fromdate+todate);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepFuelQCInspectionVouPrint.rptdesign&__format=pdf&' + param, '_blank'); 
                                }
				}
			},'-',
                {

//save
                    text: 'Save',
                    id     : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{

                        click: function () {
                            var gstSave;
	                    gstSave="true";
                            savechk = 0;

      fromdate = "04/01/"+gstfinyear.substring(0,4);
      todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
        gstSave="false";
    }

    else if(Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Invoice Date is not in current finance year. Please check");
        gstSave="false";
    }
                            
                            else if ( cmbTicketNo.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('qc','Select Truck Number');
        	                gstSave="false";
        	            }

                	    else if (flxDetail.rows==0)
        	            {
        	                Ext.Msg.alert('QC','Grid should not be empty');
        	                gstSave="false";
	                    } 
                            else if (supcode ==0)
        	            {
        	                Ext.Msg.alert('QC','Supplier Name is empty. please instruct to Store for rectification.');
        	                gstSave="false";
	                    } 
                                else if (cmbItemName.getValue() ==0)
        	            {
        	                Ext.Msg.alert('QC','Item Name is empty. please rectify.');
        	                gstSave="false";
	                    }    
                                else if (Number(txtTotQty.getValue()) >= Number(txtAcceptedWeight.getValue()))
        	            {
        	                Ext.Msg.alert('QC','Deduction qty is error. please rectify.');
        	                gstSave="false";
	                    }    
                            else if (Number(txtItemRate.getValue()) == 0 )
        	            {
        	                Ext.Msg.alert('QC','Please enter Item Rate.');
                                txtItemRate.focus();
        	                gstSave="false";
	                    }    
 


                     
        	            else
				{

                        Ext.getCmp('save').setDisabled(true); 

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
                            var grnData = flxDetail.getStore().getRange();                                        
                            var grnupdData = new Array();
                            Ext.each(grnData, function (record) {
                                grnupdData.push(record.data);
                            });
                            Ext.Ajax.request({
                            url: 'TrnFuelQCSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(grnupdData),
				cnt:grnData.length,

				gstFlag    : gstFlag,                                 
				compcode   : Gincompcode,
                                finid      : GinFinid,
                                entryno    : txtQCEntNo.getValue() ,
		                entrydate  : Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d"),
                 		ticketdate : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
				truckno    : cmbTruckNo.getRawValue(),
				supcode    : supcode,
                                areacode   : cmbArea.getValue(),
                                ticketno   : cmbTicketNo.getValue(),
                                itemcode   : cmbItemName.getValue(),
                                weight     : Number(txtAcceptedWeight.getValue()),
                                totaldedqty: txtTotQty.getValue(),
                                acceptedqty: txtAcceptedQty.getValue(),  
                                partyqty   : txtPartyWeight.getValue(),  
                                millqty    : txtMillWeight.getValue(),  
                                vessel     : txtVessel.getValue(),
                                itemrate   : txtItemRate.getValue(),  
                                otherdedqty:  txtOtherDedQty.getValue(), 

                                degradeqty        : txtDegradeQty.getValue(), 
                                degradeitemcode   : cmbDegradeItem.getValue(), 
                                degradeitemrate   : txtDegradeItemRate.getValue(),  


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("QC -FUEL Inspection Entry SAVED No.-" + obj['EntryNo']);
                                    flxDetail.getStore().removeAll();

                                    RefreshData();
				    QCPanel.getForm().reset();
                                  }else
					{
			Ext.MessageBox.alert("QC -FUEL Inspection Entry Not Saved! Pls Check!- " + obj['EntryNo']);        
                        Ext.getCmp('save').setDisabled(false);                                            
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            QCPanel.getForm().reset();
			    RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            TrnRMQCWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 50,
                width   : 1265,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 5,
                items:[

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : -7,
                                    	border      : false,
                                	items: [txtQCEntNo]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : -7,
                                    	border      : false,
                                	items: [cmbQCEntNo]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 300,
                                	y           : -7,
                                    	border      : false,
                                	items: [dtEntDate]
                            },


                ]
            },   
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 460,
                width   : 1265,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 60,
                items:[


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtTicketDate]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 260,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbTruckNo]
                            },



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 600,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbTicketNo]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbItemName]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 500,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbArea]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 500,
                                	x           : 900,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtVessel]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtAcceptedWeight]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtDegradeQty]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 250,
                                	y           : 100,
                                    	border      : false,
                                	items: [cmbDegradeItem]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 85,
                                	width       : 400,
                                	x           : 750,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtDegradeItemRate]
                            },


                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 60,
                        x           : 210,
                        y           : 70,
                        border      : false,
                        items: [btnRefreshWt]
                    }, 

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 253,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtPartyWeight]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 500,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtMillWeight]
                            },

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 85,
                                	width       : 400,
                                	x           : 750,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtItemRate]
                            },

                           {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 950,
                            y           : -15,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblSupplier]
                        },




				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 500,
                                	x           : 880,
                                	y           : 5,
                                    	border      : false,
                                	items: [btnSupplierRefresh]
                            },



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 500,
                                	x           : 920,
                                	y           : 5,
                                    	border      : false,
                                	items: [txtSupplier]
                            },





				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	x           : 10,
                                	y           : 140,
                                    	border      : false,
                                	items: [flxDetail]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 400,
                                	x           : 0,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtOtherDedQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 200,
                                	width       : 400,
                                	x           : 300,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtTotQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 600,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtAcceptedQty]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 850,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtFC]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 1050,
                                	y           : 400,
                                    	border      : false,
                                	items: [txtGCVARB]
                            },

                ]

            },

    
        ],
    });


   function RefreshTruckNoList()
   {

            loadTruckNoDatastore.removeAll();
            loadTruckNoDatastore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params: {
                    task: 'loadFuelTruckList',
                    compcode : Gincompcode,
                    finid    : GinFinid,
                    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d") 
                }
            });

			loadareadatastore.removeAll();
			loadareadatastore.load({
                        	 url:'/SHVPM/QC/ClsQC.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });

   } 


   function RefreshGRID()
   {

       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "TOTAL MOISTURE",
            percent   : "(%)",
            type      : "ARB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "INHERENT MOISTURE",
            percent   : "(%)",
            type      : "ADB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "ASH",
            percent   : "(%)",
            type      : "ADB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "VOLATILE MATTER",
            percent   : "(%)",
            type      : "ADB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "FIXED CARBON",
            percent   : "(%)",
            type      : "ARB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "FINES",
            percent   : "(%)",
            type      : "ARB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "SAND",
            percent   : "(%)",
            type      : "ARB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "IRON",
            percent   : "(%)",
            type      : "ADB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "GCV(KCAL/KG)",
            percent   : "KCAL",
            type      : "ADB",
            DNyn        : "N",

        })
       );
       flxDetail.getStore().insert(
        flxDetail.getStore().getCount(),
        new dgrecord({
            parameter : "GCV(KCAL /KG)",
            percent   : "KCAL",
            type      : "ARB",
            DNyn        : "N",

        })
       );


   }  



   function RefreshData()
   {
       gstFlag = "Add";
            Ext.getCmp('save').setDisabled(false); 
       flxDetail.getStore().removeAll();

            loadEntryNoDatastore.removeAll();
            loadEntryNoDatastore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params: {
                    task: 'loadQCFuelEntryNo',
                    compcode : Gincompcode,
                    finid    : GinFinid,
                    gstFlag  : gstFlag 
                },
		callback:function()
		{
		    txtQCEntNo.setValue(loadEntryNoDatastore.getAt(0).get('qc_fuel_entryno'));
		}
            });

       RefreshGRID();
       RefreshTruckNoList();
       gridedit = "false";
       supcode =0;
       	Ext.getCmp('txtQCEntNo').show();
	Ext.getCmp('cmbQCEntNo').hide();


   }     

   var TrnRMQCWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'FUEL -QC INSPECTION ENTRY',
        items       : QCPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{

/*
       'render' : function(cmp) {
                 cmp.getEl().on('keypress', function(e) {
                      alert(e.getKey());
//                      if (e.getKey() == e.ENTER) {
                      if (e.getKey() ==13) {
                          alert("Hello");
                      }
                 });
         },

*/
               show:function(){
                   RefreshData();
		}
        } 
    });
    TrnRMQCWindow.show();  
});
