
Ext.onReady(function(){


   Ext.QuickTips.init();



   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var userid = localStorage.getItem('ginuser');


   var gstfinyear = localStorage.getItem('gstyear');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    

var gstFlag = "Add";
var PurNo = '';
var MinNo = '';

var cditemcode = 0;
var loadQCEntryNoDetailDatastore = new Ext.data.Store({
    id: 'loadQCEntryNoDetailDatastore',
    proxy: new Ext.data.HttpProxy({
              url: '/SHVPM/QC/ClsQC.php',      // File to connect to
              method: 'POST'
          }),
          baseParams:{task:"loadCDQCEntryNoDetail"}, // this parameter asks for listing
    reader: new Ext.data.JsonReader({
                // we tell the datastore where to get his data from
      root: 'results',
      totalProperty: 'total',
      id: 'id'
    },[
       'qc_cd_entryno', 'qc_cd_entdate', 'qc_cd_supcode', 'qc_cd_pono', 'qc_cd_pondate', 'qc_cd_grnno', 'qc_cd_grndate', 'qc_cd_billno', 'qc_cd_billdate', 'qc_cd_truck', 'qc_cd_itemcode', 'qc_cd_billqty', 'qc_cd_actqty', 'qc_cd_slno', 'qc_cd_param_code', 'qc_cd_measuring_code', 'qc_cd_observation', 'qc_cd_status', 'qc_cd_remarks', 'cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_email', 'cust_web', 'cust_contact', 'cust_taxtag', 'cust_cr_days', 'cust_grace_days', 'cust_repr', 'cust_panno', 'cust_gstin', 'cust_dealer', 'cust_smsno', 'cust_partygroup', 'cust_noof_visits1', 'cust_desp_target1', 'cust_payperf1', 'cust_tcs_applied', 'cust_distance', 'cust_addnlwt', 'cust_lock', 'cust_overdue_msg', 'cust_area', 'cust_addnl_cd_days', 'cust_acc_group', 'cust_gst_type', 'cust_tds_type', 'cust_tds_yn', 'cust_wp_gst_dnote_yn', 'cust_type', 'createdby', 'createddate', 'seqno', 'cust_destination_enable_yn', 'item_code', 'item_group_code', 'item_name', 'item_usage', 'item_uom', 'item_qcchk', 'item_hsncode', 'item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5', 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10', 'item_loc_code', 'item_close', 'qc_cd_param_code', 'qc_cd_param_name', 'qc_measuring_code', 'qc_measuring_name','qc_cd_specificaton'
 
    ]),
  });

var loadPODataStore = new Ext.data.Store({
  id: 'loadPODataStore',
  proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/QC/ClsQC.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPONOlist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'phd_pono'
  ])
});


var loadGRNDataStore = new Ext.data.Store({
  id: 'loadGRNDataStore',
  proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/QC/ClsQC.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadGRNNOlist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'minh_minno','mint_podate','mint_mindate','minh_bill_no', 'minh_bill_date','minh_carrier'
  ])
});


var loadGRNItemListDataStore = new Ext.data.Store({
  id: 'loadGRNItemListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/QC/ClsQC.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadGRNNOItemlist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'item_code','item_name','mint_mindate','minh_bill_no', 'minh_bill_date','minh_carrier'
  ])
});

var loadGRNItemDetailsDataStore = new Ext.data.Store({
    id: 'loadGRNItemDetailsDataStore',
    proxy: new Ext.data.HttpProxy({
              url: '/SHVPM/QC/ClsQC.php',      // File to connect to
              method: 'POST'
          }),
          baseParams:{task: "loadGRNNOItemDetails"}, // this parameter asks for listing
    reader: new Ext.data.JsonReader({
                // we tell the datastore where to get his data from
      root: 'results',
      totalProperty: 'total',
      id: 'id'
    },[
      'mint_inv_qty','mint_accept_qty'
    ])
  });
  


 var loadChemicalParameterDatastore = new Ext.data.Store({
      id: 'loadChemicalParameterDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadChemicalParameterDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'c_itemcode', 'c_paramcode', 'c_specification', 'qc_cd_param_code', 'qc_cd_param_name'
 
      ]),
    });

 var loadEntryNoDatastore = new Ext.data.Store({
      id: 'loadEntryNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadChemicalQCEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_cd_entryno',
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name', 'cust_state'
      ]),
    });


 var loadQCEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCDQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_cd_entryno',
      ]),
    });


 var loadQCParameterListDatastore = new Ext.data.Store({
      id: 'loadQCParameterListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCDParameters"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_cd_param_code','qc_cd_param_name',
      ]),
    });

 var loadQCMeasuringListDatastore = new Ext.data.Store({
      id: 'loadQCMeasuringListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCDMeasures"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_measuring_code','qc_measuring_name',
      ]),
    });


var txtQCEntNo = new Ext.form.NumberField({
        fieldLabel  : 'QC Entry No.',
        id          : 'txtQCEntNo',
        name        : 'txtQCEntNo',
        width       :  100,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'left',
            'style': 'Helvetica',
            'font-size': '16px','font-weight':'bold'
        },
	enableKeyEvents: true, 
	listeners:{
        }      

    });

var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'QC Entry No.',
        width           : 80,
        displayField    : 'qc_cd_entryno', 
        valueField      : 'qc_cd_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadQCEntryNoListDatastore,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
            flxDetail.getStore().removeAll();
            loadQCEntryNoDetailDatastore.removeAll();
            loadQCEntryNoDetailDatastore.load({
                url:'/SHVPM/QC/ClsQC.php',
                params:
                {
                task:"loadCDQCEntryNoDetail",
                    finid    : GinFinid,
                    compcode : Gincompcode,
                    entryno  : cmbQCEntNo.getRawValue(),
                    gstFlag  : gstFlag,
                },
                callback:function(){
                    var RowCnt = loadQCEntryNoDetailDatastore.getCount();
                    if (RowCnt > 0)
                    {
                    txtQCEntNo.setValue(cmbQCEntNo.getValue());
                    dtEntDate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_entdate'),'d-m-Y'));
                    txtSupplierName.setValue(loadQCEntryNoDetailDatastore.getAt(0).get('cust_ref'));
                    supcode = loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_supcode');
                    txtTruckNo.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_truck'));
                    cmbPONO.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_pono'));
                    dtPODate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_pondate'),'d-m-Y'));
                    cmbGRNNo.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_grnno'));
                    dtGRNDate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_grndate'),'d-m-Y'));
                    txtBillNo.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_billno'));
                    dtBillDate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_billdate'),'d-m-Y'));
                    cditemcode = loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_itemcode');
                    cmbItem.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('item_name'));
                    txtBillQty.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_billqty'));
                    txtActualQty.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_cd_actqty'));
      

                    for (var i = 0; i < RowCnt; i++) {
                        var cdstatus = "OK";
                        if (loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_status') == "N")
                            cdstatus = "NOT OK";

                        flxDetail.getStore().insert(
                            flxDetail.getStore().getCount(),
                            new dgrecord({
                                slno: i + 1,
                                parameter: loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_param_name'),
                                paracode: loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_param_code'),
                                specification: loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_specificaton'),
                                measuring : loadQCEntryNoDetailDatastore.getAt(i).get('qc_measuring_name'),
                                measurecode: loadQCEntryNoDetailDatastore.getAt(i).get('qc_measuring_code'),
                                observation: loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_observation'),
                                status: cdstatus,
                                remarks: loadQCEntryNoDetailDatastore.getAt(i).get('qc_cd_remarks'),

                            })
                        );
                    }
 
                    }
                }       
            });
           }
        }
});



var txtBillNo = new Ext.form.TextField({
    fieldLabel  : 'Bill No.',
    id          : 'txtBillNo',
    name        : 'txtBillNo',
    width       :  120,        
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank  :  false,
tabindex : 1,
    readOnly : true,
style: {
        'color':'#873e72',readOnly:true,'text-align': 'left',
        'style': 'Helvetica',
        'font-size': '12px','font-weight':'bold'
    },
enableKeyEvents: true, 
listeners:{
    }      

});



var dtBillDate  = new Ext.form.DateField({
    fieldLabel : 'Bill Date',
    id         : 'dtBillDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    readOnly: true,
	enableKeyEvents: true,
    listeners:{
    }
    
});



var txtTruckNo = new Ext.form.TextField({
    fieldLabel  : 'Truck.',
    id          : 'txtTruckNo',
    name        : 'txtTruckNo',
    width       :  120,        
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank  :  false,
tabindex : 1,
    readOnly : true,
style: {
        'color':'#873e72',readOnly:true,'text-align': 'left',
        'style': 'Helvetica',
        'font-size': '12px','font-weight':'bold'
    },
enableKeyEvents: true, 
listeners:{
    }      

});



var txtBillQty = new Ext.form.NumberField({
    fieldLabel  : 'Inv.Qty',
    id          : 'txtBillQty',
    name        : 'txtBillQty',
    width       :  100,        
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank  :  false,
tabindex : 1,
    readOnly : true,
style: {
        'color':'#873e72',readOnly:true,'text-align': 'left',
        'style': 'Helvetica',
        'font-size': '12px','font-weight':'bold'
    },
enableKeyEvents: true, 
listeners:{
    }      

});


var txtActualQty = new Ext.form.NumberField({
    fieldLabel  : 'Act.Qty',
    id          : 'txtActualQty',
    name        : 'txtActualQty',
    width       :  120,        
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    allowBlank  :  false,
tabindex : 1,
    readOnly : true,
style: {
        'color':'#873e72',readOnly:true,'text-align': 'left',
        'style': 'Helvetica',
        'font-size': '12px','font-weight':'bold'
    },
enableKeyEvents: true, 
listeners:{
    }      

});


function Load_AllGRNs()
{
              Ext.getCmp('cmbItem').reset();

              loadGRNItemListDataStore.removeAll();
              loadGRNDataStore.removeAll();
              loadGRNDataStore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params:
                {
                    task     :"loadGRNNOlist",
                    pono     : PurNo,
                    compcode : Gincompcode,
                    finid    : GinFinid 
                },
                callback: function(){

                   txtBillQty.setRawValue (0); 
                   txtActualQty.setRawValue (0);

                   var cnt=loadGRNDataStore.getCount();
                   MinNo  = loadGRNDataStore.getAt(0).get('minh_minno');
                   dtPODate.setRawValue(Ext.util.Format.date(loadGRNDataStore.getAt(0).get('mint_podate'),"d-m-Y"));
                   dtGRNDate.setRawValue(Ext.util.Format.date(loadGRNDataStore.getAt(0).get('mint_mindate'),"d-m-Y"));

                   
                   cmbGRNNo.setValue(MinNo);
                   GRNItemList();
                }
             });

}

function GRNItemList()
{

              loadGRNItemListDataStore.removeAll();
              loadGRNItemListDataStore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params:
                {
                    task     :"loadGRNNOItemlist",
                    grnno    : cmbGRNNo.getValue(),
                    compcode : Gincompcode,
                    finid    : GinFinid 
                },
                callback: function(){
                    txtBillQty.setRawValue (0); 
                    txtActualQty.setRawValue (0);
                    dtGRNDate.setRawValue(Ext.util.Format.date(loadGRNItemListDataStore.getAt(0).get('mint_mindate'),"d-m-Y"));
                    dtBillDate.setRawValue(Ext.util.Format.date(loadGRNItemListDataStore.getAt(0).get('minh_bill_date'),"d-m-Y"));
                    txtBillNo.setRawValue (loadGRNItemListDataStore.getAt(0).get('minh_bill_no')); 
                    txtTruckNo.setRawValue (loadGRNItemListDataStore.getAt(0).get('minh_carrier')); 

                }
             });
}
  
var cmbPONO = new Ext.form.ComboBox({
        id: 'cmbPONO',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'phd_pono',
        valueField: 'phd_pono',
        hiddenName : 'phd_pono',
        typeAhead: true,
        mode: 'local',
        store: loadPODataStore,
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'PO No',
        editable        : true,
        //labelWidth:30,
        width: 100,
        listeners:{
 
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 // cmbindno.focus();
             }
       },

            select: function () {
                PurNo = this.getValue();
                Load_AllGRNs();
     
	   }
	  }
       
});




var cmbGRNNo = new Ext.form.ComboBox({
    fieldLabel      : 'GRN No',
    width           :  100,
    displayField    : 'minh_minno',
    valueField      : 'minh_minno',
    hiddenName      : 'minh_minno',
    id              : 'cmbGRNNo',
    typeAhead       : true,
    mode            : 'local',
    store           : loadGRNDataStore,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function () {
               GRNItemList();                   
        }
    }        
});


var cmbItem = new Ext.form.ComboBox({
    fieldLabel      : 'Item Name',
    width           :  390,
    displayField    : 'item_name',
    valueField      : 'item_code',
    hiddenName      : 'item_name',
    id              : 'cmbItem',
    typeAhead       : true,
    mode            : 'local',
    store           : loadGRNItemListDataStore,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
    listeners:{
        select: function () {


        loadChemicalParameterDatastore.removeAll();
        loadGRNItemDetailsDataStore.removeAll();

        loadGRNItemDetailsDataStore.removeAll();
        loadGRNItemDetailsDataStore.load({
          url: '/SHVPM/QC/ClsQC.php',
          params:
          {
              task     :"loadGRNNOItemDetails",
              grnno    : MinNo,
              compcode : Gincompcode,
              finid    : GinFinid,
              itemcode : cmbItem.getValue(),
          },
          callback: function(){
            cditemcode = cmbItem.getValue();
            txtBillQty.setRawValue (loadGRNItemDetailsDataStore.getAt(0).get('mint_inv_qty')); 
            txtActualQty.setRawValue (loadGRNItemDetailsDataStore.getAt(0).get('mint_accept_qty'));

          }
       });


        loadChemicalParameterDatastore.load({
            url: '/SHVPM/QC/ClsQC.php',
            params: {
                task: 'loadChemicalParameterDetails',
                item: cmbItem.getValue(),
            },
            callback: function () {
                flxDetail.getStore().removeAll();
                var RowCnt = loadChemicalParameterDatastore.getCount();

                for (var i = 0; i < RowCnt; i++) {
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                            slno: i + 1,
                            parameter: loadChemicalParameterDatastore.getAt(i).get('qc_cd_param_name'),
                            paracode: loadChemicalParameterDatastore.getAt(i).get('c_paramcode'),
                            specification: loadChemicalParameterDatastore.getAt(i).get('c_specification')
                        })
                    );
                }

                // Optional: Add empty row for new entry
                flxDetail.getStore().add(new dgrecord({
                    slno: RowCnt + 1,
                    parameter: '',
                    paracode: '',
                    specification: ''
                }));

                // Ensure view is rendered before focusing
                Ext.defer(function () {
                    var grid = flxDetail;
                    var store = grid.getStore();
                    var lastRowIndex = store.getCount() - 1;

                    if (lastRowIndex >= 0) {
                        grid.getSelectionModel().selectRow(lastRowIndex);
                        grid.getView().focusRow(lastRowIndex);

                        // Delay startEditing slightly to ensure editor is ready
                        Ext.defer(function () {
                            grid.startEditing(lastRowIndex, 0); // Focus PARAMETER
                        }, 100);
                    }
                }, 300);
            }
        });
                    
        }
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



var dgrecord = Ext.data.Record.create([]);



var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden: false,
    stripeRows: true,
    scrollable: true,
    x: 10,
    y: 220,
    height: 220,
    width: 1350,
    clicksToEdit: 1,
    store: [],//flxStore, // your defined store
    columns: [
        { dataIndex: 'slno', header: "SLNO", width: 50, align: 'center', sortable: true },
	{
	    dataIndex: 'parameter',
	    header: "PARAMETER",
	    width: 150,
	    align: 'left',
	    sortable: true,
	    renderer: function(value) {
		var store = loadQCParameterListDatastore;
		var idx = store.find('qc_cd_param_code', value);
		if (idx !== -1) {
		    return store.getAt(idx).get('qc_cd_param_name');
		}
		return value;
	    },
	    editor: new Ext.form.ComboBox({
		displayField: 'qc_cd_param_name',
		valueField: 'qc_cd_param_code',
		store: loadQCParameterListDatastore,
		editable: true,
		mode: 'local',
		triggerAction: 'all',
		enableKeyEvents: true,
		selectOnFocus: true,
		listeners: {
		    select: function (combo, record) {
		        var editorGrid = flxDetail;
		        var editor = editorGrid.activeEditor;
		        if (editor) {
		            var rowIndex = editor.row;
		            var currentRecord = editorGrid.getStore().getAt(rowIndex);
		            currentRecord.set('parameter', record.get('qc_cd_param_code')); // store code
		            currentRecord.set('paracode', record.get('qc_cd_param_code'));  // also in paracode
		        }
		    }
		}
	    })
	},


        { dataIndex: 'paracode', header: "PARAMETER CODE", width: 50, align: 'center', sortable: true,hidden:true  },
        { dataIndex: 'specification', header: "SPECIFICATION", width: 200, align: 'center', sortable: true },
        { dataIndex: 'measuring', header: "MEASURING METHOD", width: 200, align: 'center', sortable: true, 
	    renderer: function(value) {
		var store = loadQCMeasuringListDatastore;
		var idx = store.find('qc_measuring_code', value);
		if (idx !== -1) {
		    return store.getAt(idx).get('qc_measuring_name');
		}
		return value;
	    },
	    editor: new Ext.form.ComboBox({
		displayField: 'qc_measuring_name',
		valueField: 'qc_measuring_code',
		store: loadQCMeasuringListDatastore ,
		editable: true,
		mode: 'local',
		triggerAction: 'all',
		enableKeyEvents: true,
		selectOnFocus: true,
		listeners: {
		    select: function (combo, record) {
		        var editorGrid = flxDetail;
		        var editor = editorGrid.activeEditor;
		        if (editor) {
		            var rowIndex = editor.row;
		            var currentRecord = editorGrid.getStore().getAt(rowIndex);
		            currentRecord.set('measuring', record.get('qc_measuring_code')); // store code
		            currentRecord.set('measurecode', record.get('qc_measuring_code'));  // also in paracode
		        }
		    }
		}
	    })

        },
        { dataIndex: 'measurecode', header: "MEASURING ", width: 50, align: 'center', sortable: true,hidden:true },

        { dataIndex: 'observation',header: "OBSERVATION",width: 200,align: 'center',sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: true,
                enableKeyEvents: true
            }
        },
        {
            dataIndex: 'status',
            header: "STATUS OK/NOT",
            width: 130,
            align: 'center',
            sortable: true,
            editor: new Ext.form.ComboBox({
                store: ['OK', 'NOT OK'],
                editable: false,
                mode: 'local',
                triggerAction: 'all'
            })
        },
        { dataIndex: 'remarks', header: "REMARKS", width: 300, align: 'left', sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: true,
                enableKeyEvents: true
            }
         },
    ]
});

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

var dtPODate = new Ext.form.DateField({
    fieldLabel : 'PO Date',
    id         : 'dtPODate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    readOnly: true,
	enableKeyEvents: true,
    listeners:{
    }
    
});

var dtGRNDate = new Ext.form.DateField({
    fieldLabel : 'GRN Date',
    id         : 'dtGRNDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    readOnly: true,
	enableKeyEvents: true,
    listeners:{
    }
    
});
function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

		supcode = selrow.get('cust_code');
                partyledcode= selrow.get('cust_code');
		txtSupplierName.setValue(selrow.get('cust_name'));
		flxLedger.hide();

		 PurNo = '';
		 MinNo = '';

              loadGRNItemListDataStore.removeAll();
              loadGRNDataStore.removeAll();
              loadPODataStore.removeAll();
              loadPODataStore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params:
                {
                    task     :"loadPONOlist",
                    vendor   : supcode,
                    compcode : Gincompcode,
                    finid    : GinFinid 
                },
                callback: function(){

                   var cnt=loadPODataStore.getCount();
                   PurNo = loadPODataStore.getAt(0).get('phd_pono');
                   cmbPONO.setValue(PurNo);
                   Load_AllGRNs();

                }
             });









	}

}



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 380,
        width: 420,
        id : flxLedger,
	enableKeyEvents: true,
        x: 130,
        y: 40,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "sup code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:330,align:'left',hidden:true},
        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	


             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {

                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
     
   }
   });


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: '/SHVPM/QC/ClsQC.php',
		params:
		{
			task:"loadSearchLedgerlist",
			party : txtSupplierName.getRawValue(),
		},
        });
}






var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Subpplier ',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  390,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {



	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    }); 
   

   function save_data()
   {

                   Ext.getCmp('save').setDisabled(true);

                   var grnData = flxDetail.getStore().getRange();                                        
	            var grnupdData = new Array();
	            Ext.each(grnData, function (record) {
	                grnupdData.push(record.data);
	            });




	            Ext.Ajax.request({
	            url: 'TrnChemicalQCSave.php',
	            params :
	             {
	             	griddet : Ext.util.JSON.encode(grnupdData),
			cnt     : grnData.length,


			gstFlag    : gstFlag,                                 
			compcode   : Gincompcode,
	        finid      : GinFinid,
	        entryno    : txtQCEntNo.getValue() ,
			entrydate  : Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d"),
            supcode    : supcode,
            pono       : cmbPONO.getRawValue() ,
			podate     : Ext.util.Format.date(dtPODate.getValue(),"Y-m-d"),
            grnno      : cmbGRNNo.getRawValue() ,
			grndate    : Ext.util.Format.date(dtGRNDate.getValue(),"Y-m-d"),
            billno     : txtBillNo.getRawValue() ,
			billdate   : Ext.util.Format.date(dtBillDate.getValue(),"Y-m-d"),
			truckno    : txtTruckNo.getRawValue(),
            itemcode   : cditemcode,
            billqty    : txtBillQty.getValue(),
            actqty     : txtActualQty.getValue(),

			},
	              callback: function(options, success, response)
	              {
	                var obj = Ext.decode(response.responseText);
	                 if (obj['success']==="true")
				{                                
	                    Ext.MessageBox.alert("QC - Chemical Inspection Entry SAVED No.-" + obj['EntryNo']);
	                        flxDetail.getStore().removeAll();
             			    QCPanel.getForm().reset();
	                        RefreshData();
	                  }else
				{
                    Ext.getCmp('save').setDisabled(false);   
		Ext.MessageBox.alert("QC -Chemical Inspection Entry Not Saved! Pls Check!- " + obj['EntryNo']);  

        
//QCPanel.getForm().reset(); 
   //RefreshData();                                        
	                    }
	                }
	           });     
   }    
   

   var QCPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WEIGHT CARD ENTRY',
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
                        Ext.getCmp('txtQCEntNo').hide();
                        Ext.getCmp('cmbQCEntNo').show();
                        loadQCEntryNoListDatastore.removeAll();
                        loadQCEntryNoListDatastore.load({
			         	url:'ClsRMGrn.php',
            			params:
		           		{
                        task:"loadCDQCEntryList",
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
				var param =(compcode+fincode+entryno);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepChemicalQCInspection.rptdesign&__format=pdf&' + param, '_blank'); 
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
            Ext.MessageBox.alert("Alert","Entry Date is not in current finance year. Please check");
        gstSave="false";
    }

    else if(Ext.util.Format.date(dtEntDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Entry Date is not in current finance year. Please check");
        gstSave="false";
    }
    else if (txtQCEntNo.getValue() ==  0)
    {    
        Ext.MessageBox.alert("Alert","QC Entry Number is Empty. Please check");
        gstSave="false";

    }     
                         if ( txtTruckNo.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('qc','Select Truck Number');
        	                gstSave="false";
        	            }
        	            else if ( txtQCEntNo.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('qc','QC ENTRY NUMBER IS ERROR. CLICK REFRESH AND CONTINUE');
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
        	            else
				{




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
                                save_data(); 
                                }
                                }
                            }
                        });
		
                        }
                } }
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
                            TrnStoreQCWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 50,
                width   : 1315,
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
                width   : 1325,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 5,
                y       : 60,
                items:[
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 5,
                                    	border      : false,
                                	items: [txtSupplierName]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbPONO]
                            },

                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 120,
                                width       : 600,
                                x           : 250,
                                y           : 40,
                                    border      : false,
                                items: [dtPODate]
                        },                          
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 75,
                                    	border      : false,
                                	items: [cmbGRNNo]
                            },

                            
                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 120,
                                width       : 600,
                                x           : 250,
                                y           : 75,
                                    border      : false,
                                items: [dtGRNDate]
                        },      

                        { 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 80,
                            width       : 600,
                            x           : 490,
                            y           : 75,
                                border      : false,
                            items: [txtBillNo]
                    }, 

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 600,
                        x           : 720,
                        y           : 75,
                            border      : false,
                        items: [dtBillDate]
                }, 
                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 90,
                    width       : 600,
                    x           : 960,
                    y           : 75,
                        border      : false,
                    items: [txtTruckNo]
            }, 


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 110,
                                    	border      : false,
                                	items: [cmbItem]
                            },


                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 90,
                                width       : 600,
                                x           : 720,
                                y           : 110,
                                border      : false,
                                items: [txtBillQty]
                        }, 
                        { 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 90,
                            width       : 600,
                            x           : 960,
                            y           : 110,
                            border      : false,
                            items: [txtActualQty]
                    }, 
        
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 1260,
                                	x           : 10,
                                	y           : 160,
                                    	border      : false,
                                	items: [flxDetail]
                            },


                           flxLedger, //flxDetail,

                ]
           }

    
        ],
    });


   function RefreshData()
   {
      
       cmbQCEntNo.hide();
       flxLedger.hide();

       txtBillQty.setRawValue (0); 
       txtActualQty.setRawValue (0);

    flxDetail.render(Ext.getBody());

    // Automatically add one empty row


	flxDetail.getStore().insert(
	flxDetail.getStore().getCount(),
	new dgrecord({
        parameter: '',
        specification: '',
        measuring: '',
        observation: '',
        status: ''

	})
	);


       Ext.getCmp('save').setDisabled(false);  
            loadEntryNoDatastore.removeAll();
            loadEntryNoDatastore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params: {
                    task: 'loadChemicalQCEntryNo',
                    compcode : Gincompcode,
                    finid    : GinFinid,
                    gstFlag  : gstFlag 
                },
		callback:function()
		{
		    txtQCEntNo.setValue(loadEntryNoDatastore.getAt(0).get('qc_cd_entryno'));
		}
            });


   }     

   var TrnStoreQCWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'WASTE PAPER QC INSPECTION ENTRY',
        items       : QCPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
  onEsc:function(){
},
	listeners:{

               show:function(){
     
                   RefreshData();
		}
        } 
    });
    TrnStoreQCWindow.show();  
});
