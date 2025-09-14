Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstFlag;
   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var userid = localStorage.getItem('ginuser');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var portcode = 0;
var ordseqno = 0;
var poseqno = 0;

var invseqno = 0;

function grid_tot(){
        var totqty = 0;
        var totval = 0;

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totqty = totqty + Number(sel[i].data.qty);
            totval =  totval + Number(sel[i].data.value);               
        }

        txtTotQty.setValue(totqty);  
        txtTotValue.setValue(totval);
}




var loadINVNoListDataStore = new Ext.data.Store({
  id: 'loadINVNoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_invoiceno'
  ])
});


var loadINVNoDetailDataStore = new Ext.data.Store({
  id: 'loadINVNoDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNoDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invh_seqno', 'invh_compcode', 'invh_fincode', 'invh_invoiceno', 'invh_invoicerefno', 'invh_date', 'invh_refno', 'invh_refdate', 'invh_poseqno', 'invh_sup_code', 'invh_agent', 'invh_payterms', 'invh_deliveryterms', 'invh_shiftment', 'invh_origincountry', 'invh_originport', 'invh_arrivalport', 'invh_bankacno', 'invh_bankname', 'invh_bankcode', 'invh_branchcode', 'invh_swiftcode', 'invh_bankadd1', 'invh_bankadd2', 'invh_bankadd3', 'invh_billladingno', 'invh_billladingdate', 'invh_billentryno', 'invh_billentrydate', 'invh_exchangerate', 'invh_invoicevalue', 'invh_BCD', 'invh_ACD', 'invh_SWS', 'invh_CVD', 'invh_IGST', 'invh_otherduty', 'invh_interest', 'invh_penalty', 'invh_fine', 'invh_totduty', 'invh_clearing','invh_vesselname', 'invh_shipmentdate', 'invh_doccleared', 'invh_partyaccstat', 'invh_partyvouno', 'invh_dutyaccstat', 'invh_dutyvouno', 'invh_jv_vouno', 'invt_seqno', 'invt_item_code', 'invt_qty', 'invt_portqty', 'invt_recqty', 'invt_moisper', 'invt_outthroughper', 'invt_dedper', 'invt_itemUSDrate', 'invt_itemvalue','ordh_no' , 'ordh_date','invt_exrate', 'invh_20feet_container','invh_40feet_container','itmh_name' , 'invt_item_code',
  ])
});




var PONoListDataStore = new Ext.data.Store({
  id: 'PONoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_no','ordh_seqno'
  ])
});



var PONoItemListDataStore = new Ext.data.Store({
  id: 'PONoItemListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPOItemList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['itmh_name', 'itmh_code'
  ])
});



var PONoItemDetailDataStore = new Ext.data.Store({
  id: 'PONoItemDetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPOItemDetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordt_qty', 'ordt_pen_qty', 'ordt_inv_qty', 'ordt_usdrate', 'ordt_usdvalue', 'ordt_moisper', 'ordt_tareper', 'ordt_outthroughper', 'ordt_prohibitive', 'ordt_status'
  ])
});



var AgentDataStore = new Ext.data.Store({
  id: 'AgentDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadAllsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'sup_code', type: 'int', mapping: 'sup_code'},
    {name: 'sup_refname', type: 'string', mapping: 'sup_refname'}
  ])
});



var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
//  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'sup_code', type: 'int', mapping: 'sup_code'},
    {name: 'sup_refname', type: 'string', mapping: 'sup_refname'}
  ])
});

var PONoListDataStore = new Ext.data.Store({
  id: 'PONoListDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadPONoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_no','ordh_seqno'
  ])
});

var LoadINVNoDataStore = new Ext.data.Store({
  id: 'LoadINVNoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadINVNo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['invno'
  ])
});

var btnSubmit = new Ext.Button({
 //  style   : 'text-align:left;font-size:14px;font-weight:bold',
 
/*  style : {
        'color' : 'red',
        'font-size' : '15px',
        'font-weight' : 'bold'
    },
*/ 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 80,
    height  : 35,

 listeners:{
        click: function(){       
	    var gstadd="true";

	    if(cmbItem.getRawValue()=="" || cmbItem.getValue()==0)
	    {
		alert("Select Item Name..");
                gstadd="false";
                cmbItem.setFocus();
	    }



	    if(txtRate.getRawValue()=="" || txtRate.getValue()==0)
	    {
		alert("USD Rate is zero..");
                gstadd="false";
                txtRate.setFocus();
	    }

	    if(txtExRate.getRawValue()=="" || txtExRate.getValue()==0)
	    {
		alert("Exchange Rate is zero..");
                gstadd="false";
                txtExRate.setFocus();
	    }

	    if(txtQty.getRawValue()=="" || txtQty.getValue()==0)
	    {
		alert("Enter Order  Quantity..");
                gstadd="false";
                txtQty.setFocus();
	    }

            if(gstadd=="true")
            { 
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.itemcode === cmbItem.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }
        	if(gridedit === "true")
	        {
			gridedit = "false";
                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('itemcode' , cmbItem.getValue());
			sel[idx].set('itemname' , cmbItem.getRawValue());
			sel[idx].set('qty'      , txtQty.getValue());
			sel[idx].set('rate'     , txtRate.getValue());
			sel[idx].set('exrate'     , txtExRate.getValue());
			sel[idx].set('value'    , txtValue.getValue());

			flxDetail.getSelectionModel().clearSelections();
		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Item already Entered.");
                } else
                {      
                    var RowCnt = flxDetail.getStore().getCount() + 1;

                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
		                   itemcode   : cmbItem.getValue(),
		                   itemname   : cmbItem.getRawValue(),
			           qty        : txtQty.getValue(),
                                   rate       : Number(txtRate.getValue()),
                                   exrate     : Number(txtExRate.getValue()),
				   value      : txtValue.getValue(),

                        }),
                   );
                   txtQty.setValue('');
                   txtRate.setValue('');
                   txtValue.setValue('');
    
                }

             }

 grid_tot();
      }

      }
});


var PODetailDataStore = new Ext.data.Store({
  id: 'PODetailDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsImportInvoice.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadPODetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },['ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_terms', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_itemvalue', 'ordh_roundingoff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'ordt_hdseqno', 'ordt_seqno', 'ordt_item_code', 'ordt_indh_seqno', 'ordt_enqh_seqno', 'ordt_qty', 'ordt_rec_qty', 'ordt_can_qty', 'ordt_pen_qty', 'ordt_unit_rate', 'ordt_item_value', 'ordt_edpercentage', 'ordt_moisper', 'ordt_tareper', 'ordt_status', 'ordt_educessper', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_group', 'itmh_outthrough', 'itmh_prohiper', 'itmh_hsncode','ordt_outper' ,'ordh_refno','ordh_refdate','ordh_preparedby','ordh_payterms','ordh_deliveryterms','ordh_origincountry','ordh_originport',
'cmbDischargePort','ordh_arrivalport','ordh_shiftment','ordh_remarks', 'ordh_bankacno', 'ordh_bankname', 'ordh_bankcode', 'ordh_branchcode', 'ordh_swiftcode', 'ordh_bankadd1', 'ordh_bankadd2', 'ordh_bankadd3','ordh_agent_code' , 'ordt_usdrate','ordt_usdvalue'
  ])
});




var cmbInvSlNo = new Ext.form.ComboBox({
    fieldLabel      : 'INV Sl.No.',
    width           : 60,
    displayField    : 'invh_invoiceno',
    valueField      : 'invh_invoiceno',
    hiddenName      : 'invh_invoiceno',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : loadINVNoListDataStore,
    id              : 'cmbInvSlNo',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
    listeners:{
        select:function(){

                    flxDetail.getStore().removeAll();

                    //RefreshData();
                        loadINVNoDetailDataStore.removeAll();
			loadINVNoDetailDataStore.load({
                        url: 'ClsImportInvoice.php',
                        params:
                            {
                                task:"loadINVNoDetail",
                                invno: cmbInvSlNo.getValue(),
			    	compcode: Gincompcode,
			    	finid: GinFinid,
                            },
                            scope: this,
                            callback: function () 
			    {

                                txtInvSlNo.setValue(cmbInvSlNo.getValue());
                     		dtpPodate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('ordh_date'),'d-m-Y'));
				cmbPONo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('ordh_no'));
                                cmbPONo.setValue(loadINVNoDetailDataStore.getAt(0).get('ordh_no'));
 	 
                                txtInvNo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_invoicerefno')); 
				dtpInvdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_date'),'d-m-Y'));
                                txtRefNo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_refno')); 
				dtpRefdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_refdate'),'d-m-Y'));


           
//				ordseqno = loadINVNoDetailDataStore.getAt(0).get('ordh_seqno');
                                cmbAgent.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_agent'));
                                cmbPartyName.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_sup_code'));

                                tabInvoice.setActiveTab(1);
				cmbPayTerms.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_payterms'));	
				cmbDeliveryTerms.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_deliveryterms'));
				cmbCountry.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_origincountry'));
				cmbLoadingPort.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_originport'));	
				cmbDischargePort.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_arrivalport'));
				txtShipDetails.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_shiftment'));
			        txtDeliveryRemarks.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_remarks'));
//alert(loadINVNoDetailDataStore.getAt(0).get('invh_bankacno'));
//alert(loadINVNoDetailDataStore.getAt(0).get('invh_bankname'));

                                tabInvoice.setActiveTab(3);
                                txtBankACNo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankacno'));
                                txtBankName.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankname'));
                                txtBankCode.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankcode'));
                                txtBranchCode.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_branchcode'));
                                txtSwiftCode.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_swiftcode'));
                                txtBankAdd1.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankadd1'));
                                txtBankAdd2.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankadd2'));
                                txtBankAdd3.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_bankadd3'));
                                txtBLNo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_billladingno')),
                                dtpBLdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_billladingdate'),'d-m-Y'));
                                txtBENo.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_billentryno'));
                                dtpBEdate.setRawValue(Ext.util.Format.date(loadINVNoDetailDataStore.getAt(0).get('invh_billentrydate'),'d-m-Y')); 
                                tabInvoice.setActiveTab(2);
                                txtCarrier.setRawValue(loadINVNoDetailDataStore.getAt(0).get('invh_vesselname'));

                                txtContainer_20Feet.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_20feet_container'));
                                txtContainer_40Feet.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_40feet_container'));


                                tabInvoice.setActiveTab(0);
                                txtExRate.setValue(loadINVNoDetailDataStore.getAt(0).get('invh_exchangerate'));   

                                poseqno = loadINVNoDetailDataStore.getAt(0).get('invh_poseqno');

                                invseqno = loadINVNoDetailDataStore.getAt(0).get('invh_seqno');

//				grid_tot();

				flxDetail.getSelectionModel().clearSelections();

				PONoItemListDataStore.load({
				   url: 'ClsImportInvoice.php',
				   params:
				   {
				        task  : "LoadPOItemList",
				        seqno : poseqno,
				   },
			            callback: function () 
				    {
                                    }
                                });        


				var RowCnt = loadINVNoDetailDataStore.getCount();
				for (var i=0;i<RowCnt;i++)
				{

//alert(loadINVNoDetailDataStore.getAt(i).get('invt_itemUSDrate'));

					flxDetail.getStore().insert(
					flxDetail.getStore().getCount(),
					new dgrecord({
				                   itemcode   : loadINVNoDetailDataStore.getAt(i).get('invt_item_code'),
						   itemname   : loadINVNoDetailDataStore.getAt(i).get('itmh_name'),
						   qty        : loadINVNoDetailDataStore.getAt(i).get('invt_qty'),
				                   rate       : loadINVNoDetailDataStore.getAt(i).get('invt_itemUSDrate'),
				                   exrate     : loadINVNoDetailDataStore.getAt(i).get('invt_exrate'),
						   value      : loadINVNoDetailDataStore.getAt(i).get('invt_itemvalue'),


						slno:i + 1,
	
					}) 
					);

				}//For Loop
		
                                 grid_tot();
				
			     }
			     });//PODetailDataStore
				//POdelvyDataStore.removeAll();
//grid_tot();
//CalculatePOValue();
//CalculateTaxValue();
         flxDetail.getSelectionModel().clearSelections();
        }
    }

});

var cmbPONo = new Ext.form.ComboBox({
    fieldLabel      : 'CONTRAT No.',
    width           : 80,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : 'ordh_no',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : PONoListDataStore,
    id              : 'cmbPONo',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
    listeners:{
        select:function(){

                    flxDetail.getStore().removeAll();

                    //RefreshData();
                        PODetailDataStore.removeAll();
			PODetailDataStore.load({
                        url: 'ClsImportInvoice.php',
                        params:
                            {
                                task:"loadPODetail",
                                ordno: cmbPONo.getRawValue(),
			    	compcode: Gincompcode,
			    	finid: GinFinid,
                            },
                            scope: this,
                            callback: function () 
			    {


                     		dtpPodate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_date'),'d-m-Y'));
                                txtRefNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_refno')); 
				dtpRefdate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_refdate'),'d-m-Y'));
           
				ordseqno = PODetailDataStore.getAt(0).get('ordh_seqno');
                                cmbAgent.setValue(PODetailDataStore.getAt(0).get('ordh_agent_code'));


				cmbPayTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_payterms'));	
				cmbDeliveryTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_deliveryterms'));
				cmbCountry.setValue(PODetailDataStore.getAt(0).get('ordh_origincountry'));
				cmbLoadingPort.setValue(PODetailDataStore.getAt(0).get('ordh_originport'));	
				cmbDischargePort.setValue(PODetailDataStore.getAt(0).get('ordh_arrivalport'));
				txtShipDetails.setRawValue(PODetailDataStore.getAt(0).get('ordh_shiftment'));
			        txtDeliveryRemarks.setRawValue(PODetailDataStore.getAt(0).get('ordh_remarks'));

                                txtBankACNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankacno'));
                                txtBankName.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankname'));
                                txtBankCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankcode'));
                                txtBranchCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_branchcode'));
                                txtSwiftCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_swiftcode'));
                                txtBankAdd1.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd1'));
                                txtBankAdd2.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd2'));
                                txtBankAdd3.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd3'));



                                poseqno = PODetailDataStore.getAt(0).get('ordh_seqno');


//				grid_tot();

				flxDetail.getSelectionModel().clearSelections();

				PONoItemListDataStore.load({
				   url: 'ClsImportInvoice.php',
				   params:
				   {
				        task  : "LoadPOItemList",
				        seqno : poseqno,
				   },
			            callback: function () 
				    {
                                    }
                                });        




			
	
			     }
			     });//PODetailDataStore
				//POdelvyDataStore.removeAll();
//grid_tot();
//CalculatePOValue();
//CalculateTaxValue();
         flxDetail.getSelectionModel().clearSelections();
        }
    }

});

var cmbPONo = new Ext.form.ComboBox({
    fieldLabel      : 'CONTRAT No.',
    width           : 80,
    displayField    : 'ordh_no',
    valueField      : 'ordh_seqno',
    hiddenName      : 'ordh_no',
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    store           : PONoListDataStore,
    id              : 'cmbPONo',
    typeAhead       : true,
    mode            : 'local',
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : false,
    editable        : false,
    allowblank      : false,
    listeners:{
        select:function(){

                    flxDetail.getStore().removeAll();

                    //RefreshData();
                        PODetailDataStore.removeAll();
			PODetailDataStore.load({
                        url: 'ClsImportInvoice.php',
                        params:
                            {
                                task:"loadPODetail",
                                ordno: cmbPONo.getRawValue(),
			    	compcode: Gincompcode,
			    	finid: GinFinid,
                            },
                            scope: this,
                            callback: function () 
			    {


                     		dtpPodate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_date'),'d-m-Y'));
                                txtRefNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_refno')); 
				dtpRefdate.setRawValue(Ext.util.Format.date(PODetailDataStore.getAt(0).get('ordh_refdate'),'d-m-Y'));
           
				ordseqno = PODetailDataStore.getAt(0).get('ordh_seqno');
                                cmbAgent.setValue(PODetailDataStore.getAt(0).get('ordh_agent_code'));


				cmbPayTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_payterms'));	
				cmbDeliveryTerms.setRawValue(PODetailDataStore.getAt(0).get('ordh_deliveryterms'));
				cmbCountry.setValue(PODetailDataStore.getAt(0).get('ordh_origincountry'));
				cmbLoadingPort.setValue(PODetailDataStore.getAt(0).get('ordh_originport'));	
				cmbDischargePort.setValue(PODetailDataStore.getAt(0).get('ordh_arrivalport'));
				txtShipDetails.setRawValue(PODetailDataStore.getAt(0).get('ordh_shiftment'));
			        txtDeliveryRemarks.setRawValue(PODetailDataStore.getAt(0).get('ordh_remarks'));

                                txtBankACNo.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankacno'));
                                txtBankName.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankname'));
                                txtBankCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankcode'));
                                txtBranchCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_branchcode'));
                                txtSwiftCode.setRawValue(PODetailDataStore.getAt(0).get('ordh_swiftcode'));
                                txtBankAdd1.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd1'));
                                txtBankAdd2.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd2'));
                                txtBankAdd3.setRawValue(PODetailDataStore.getAt(0).get('ordh_bankadd3'));



                                poseqno = PODetailDataStore.getAt(0).get('ordh_seqno');


//				grid_tot();

				flxDetail.getSelectionModel().clearSelections();

				PONoItemListDataStore.load({
				   url: 'ClsImportInvoice.php',
				   params:
				   {
				        task  : "LoadPOItemList",
				        seqno : poseqno,
				   },
			            callback: function () 
				    {
                                    }
                                });        


				
			     }
			     });//PODetailDataStore
				//POdelvyDataStore.removeAll();
//grid_tot();
//CalculatePOValue();
//CalculateTaxValue();
         flxDetail.getSelectionModel().clearSelections();
        }
    }

});



var txtTotQty = new Ext.form.TextField({
        fieldLabel  : 'Total Qty.',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtTotValue = new Ext.form.TextField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

function calculateItemValue()
{

    txtValue.setValue(Number(txtQty.getValue()) * Number(txtRate.getValue()) * Number(txtExRate.getValue())   ) ;
}

var txtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     
        decimalPrecision: 3,

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           keyup:function(){
                calculateItemValue();
            },
            keydown:function(){ 
                calculateItemValue();
            },
            blur:function(){
               calculateItemValue();
            }  
        }

  });


var txtRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           keyup:function(){
                calculateItemValue();
            },
            keydown:function(){ 
                calculateItemValue();
            },
            blur:function(){
               calculateItemValue();
            }  

        }

  });

var txtValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtValue',
        name        : 'txtValue',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     
        readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtExRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtExRate',
        name        : 'txtExRate',
        width       :  80,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
           keyup:function(){
                calculateItemValue();
            },
            keydown:function(){ 
                calculateItemValue();
            },
            blur:function(){
               calculateItemValue();
            }  
        }

  });



var txtInvSlNo = new Ext.form.NumberField({
        fieldLabel  : 'INV Sl.No.',
        id          : 'txtInvSlNo',
        name        : 'txtInvSlNo',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Invoice No.',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        width       :  160,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtBLNo = new Ext.form.TextField({
        fieldLabel  : 'Bill of Lading No.',
        id          : 'txtBLNo',
        name        : 'txtBLNo',
        width       :  160,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })




var txtBENo = new Ext.form.TextField({
        fieldLabel  : 'Bill of Entry No.',
        id          : 'txtBENo',
        name        : 'txtBENo',
        width       :  160,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  })

var txtRefNo = new Ext.form.TextField({
        fieldLabel  : 'Ref/Ind. No.',
        id          : 'txtRefNo',
        name        : 'txtRefNo',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankACNo = new Ext.form.TextField({
        fieldLabel  : 'Bank A/c No.',
        id          : 'txtBankACNo',
        name        : 'txtBankACNo',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankName = new Ext.form.TextField({
        fieldLabel  : 'Bank Name.',
        id          : 'txtBankName',
        name        : 'txtBankName',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankCode = new Ext.form.TextField({
        fieldLabel  : 'Bank Code.',
        id          : 'txtBankCode',
        name        : 'txtBankCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBranchCode = new Ext.form.TextField({
        fieldLabel  : 'Branch Code.',
        id          : 'txtBranchCode',
        name        : 'txtBranchCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtSwiftCode = new Ext.form.TextField({
        fieldLabel  : 'Swift Code.',
        id          : 'txtSwiftCode',
        name        : 'txtSwiftCode',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankAdd1 = new Ext.form.TextField({
        fieldLabel  : 'Address ',
        id          : 'txtBankAdd1',
        name        : 'txtBankAdd1',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtBankAdd2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtBankAdd2',
        name        : 'txtBankAdd2',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtBankAdd3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtBankAdd3',
        name        : 'txtBankAdd3',
        width       :  300,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtShipDetails = new Ext.form.TextField({
        fieldLabel  : 'Shipment Details',
        id          : 'txtShipDetails',
        name        : 'txtShipDetails',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtDeliveryRemarks = new Ext.form.TextField({
        fieldLabel  : 'Delivery Remarks',
        id          : 'txtDeliveryRemarks',
        name        : 'txtDeliveryRemarks',
        width       :  200,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });
var dtpPodate = new Ext.form.DateField({
    fieldLabel : 'Date ',
    id         : 'dtpPodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});

var dtpRefdate = new Ext.form.DateField({
    fieldLabel : 'Ref. Date ',
    id         : 'dtpRefdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});


var dtpInvdate = new Ext.form.DateField({
    fieldLabel : 'Invoice Date ',
    id         : 'dtpInvdate',
    name       : 'dtpInvdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});


var dtpBLdate = new Ext.form.DateField({
    fieldLabel : 'Bill of Lading Date',
    id         : 'dtpBLdate',
    name       : 'dtpBLdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});



var dtpBEdate = new Ext.form.DateField({
    fieldLabel : 'Bill of Entry Date',
    id         : 'dtpBEdate',
    name       : 'dtpBEdate',
    format     : 'd-m-Y',
    value      : new Date(),
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//    readOnly   : true,
    anchor     : '100%',
    listeners:{
            change:function(){
               dateval=dtpPodate.getValue();
            },
            select:function(){    
                var days1 = dtpPodate.getValue().getTime();
                var days2 = new Date().getTime();                
                var days3 =parseInt(days1/(24*3600*1000));
                var days4 =parseInt(days2/(24*3600*1000))-1;
                var days5=parseInt(days4)-parseInt(days3);  
              }
    }
});


var lblItems = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItems',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblQty = new Ext.form.Label({
    fieldLabel  : 'Qty(t)',
    id          : 'lblQty',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate(USD)',
    id          : 'lblRate',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblValue = new Ext.form.Label({
    fieldLabel  : 'Value',
    id          : 'lblValue',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblExRate = new Ext.form.Label({
    fieldLabel  : 'INR/USD',
    id          : 'lblExRate',
    width       : 60,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
})

var txtContainer_20Feet = new Ext.form.NumberField({
        fieldLabel  : '20 FEET CONTAINERS ',
        id          : 'txtContainer_20Feet',
        name        : 'txtContainer_20Feet',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });


var txtContainer_40Feet = new Ext.form.NumberField({
        fieldLabel  : '40 FEET CONTAINERS',
        id          : 'txtContainer_40Feet',
        name        : 'txtContainer_40Feet',
        width       :  60,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var txtCarrier = new Ext.form.TextField({
        fieldLabel  : 'Carrier / SS Line',
        id          : 'txtCarrier',
        name        : 'txtCarrier',
        width       :  140,
  //      style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     
	tabindex : 2,

    	enableKeyEvents: true,
//          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
        }

  });

var LoadPortDataStore = new Ext.data.Store({
      id: 'LoadPortDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsImportInvoice.php',      // File to connect toClsImportInvoice
                method: 'POST'
            }),
            baseParams:{task:"loadPortList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'port_code', 'port_name','country_code','country_name',
      ]),
    });



var LoadCountryDataStore = new Ext.data.Store({
      id: 'LoadCountryDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsImportInvoice.php',      // File to connect toClsImportInvoice
                method: 'POST'
            }),
            baseParams:{task:"loadCountryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'country_code','country_name'
      ]),
    });	


var cmbCountry = new Ext.form.ComboBox({
        fieldLabel      : 'Country of Orgin ',
        width           : 200,
        displayField    : 'country_name', 
        valueField      : 'country_code',
        hiddenName      : '',
        id              : 'cmbCountry',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCountryDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });


var cmbLoadingPort= new Ext.form.ComboBox({
        fieldLabel      : 'Loading Port',
        width           : 200,
        displayField    : 'port_name', 
        valueField      : 'port_code',
        hiddenName      : '',
        id              : 'cmbLoadingPort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadPortDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });

var cmbDischargePort= new Ext.form.ComboBox({
        fieldLabel      : 'Discharge Port',
        width           : 200,
        displayField    : 'port_name', 
        valueField      : 'port_code',
        hiddenName      : '',
        id              : 'cmbDischargePort',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadPortDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function () 
                    {
                    } 
       }
  });


var cmbAgent = new Ext.form.ComboBox({
    fieldLabel      : 'Agent ',
    width           : 350,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbAgent',
    typeAhead       : true,
    mode            : 'local',
    store           : AgentDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
        }
    }
});



var cmbPartyName = new Ext.form.ComboBox({
    fieldLabel      : 'Supplier',
    width           : 350,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbPartyName',
    typeAhead       : true,
    mode            : 'local',
    store           :  VendorDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
           PONoListDataStore.removeAll();
	   PONoListDataStore.load({
		url: 'ClsImportInvoice.php',
	        params: {
	            task: 'LoadPONoList',
		    compcode : Gincompcode,
		    finid    : GinFinid,
                    supcode  : cmbPartyName.getValue(),
	        },
               callback: function () {
        
		}
	  });
        }
    }
});



var cmbPayTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Payment Terms',
    width           : 200,
    displayField    : '',
    valueField      : '',
    hiddenName      : 'sup_code',
    id              : 'cmbPayTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['100% DP','100% DA','LC 30 DAYS'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});

var cmbDeliveryTerms = new Ext.form.ComboBox({
    fieldLabel      : 'Delivery Terms',
    width           : 200,
    displayField    : 'sup_refname',
    valueField      : 'sup_code',
    hiddenName      : 'sup_code',
    id              : 'cmbDeliveryTerms',
    typeAhead       : true,
    mode            : 'local',
    store           : ['CIF TUTICORIN'],
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

        }
    }
});



var cmbItem = new Ext.form.ComboBox({
    fieldLabel      : '',
    width           : 200,
    displayField    : 'itmh_name',
    valueField      : 'itmh_code',
    hiddenName      : 'itmh_code',
    id              : 'cmbItem',
    typeAhead       : true,
    mode            : 'local',
    store           :  PONoItemListDataStore,
    forceSelection  :true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){
           PONoItemDetailDataStore.removeAll();
	   PONoItemDetailDataStore.load({
		url: 'ClsImportInvoice.php',
	        params: {
	            task     : 'LoadPOItemDetail',
		    seqno    : poseqno,
                    itemcode : cmbItem.getValue(),
	        },
               callback: function () {
			txtQty.setValue(PONoItemDetailDataStore.getAt(0).get('ordt_pen_qty'));
			txtRate.setValue(PONoItemDetailDataStore.getAt(0).get('ordt_usdrate'));
//			txtValue.setValue(PONoItemDetailDataStore.getAt(0).get('ordt_usdvalue'));
                        calculateItemValue();
		}
	  });
        }


        }
});




   var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 650,
        x: 5,
        y: 40,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "Item code", dataIndex: 'itemcode', sortable:true,width:100,align:'left', menuDisabled: true , hidden : true},       
            {header: "Item Name", dataIndex: 'itemname', sortable:true,width:200,align:'left', menuDisabled: true},
            {header: "Qty (t)", dataIndex: 'qty', sortable:true,width:100,align:'left', menuDisabled: true},
            {header: "USD Rate ", dataIndex: 'rate', sortable:true,width:100,align:'left', menuDisabled: true },       
            {header: "Ex.Rate ", dataIndex: 'exrate', sortable:true,width:100,align:'left', menuDisabled: true }, 
            {header: "Value ", dataIndex: 'value', sortable:true,width:100,align:'left', menuDisabled: true },   
           ],

store:[],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();

		                cmbItem.setValue(selrow.get('itemcode'));
				txtQty.setValue(selrow.get('qty'));
				txtRate.setValue(selrow.get('rate'));
				txtExRate.setValue(selrow.get('exrate'));
                           	txtValue.setValue(selrow.get('value'));

			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });


var tabInvoice = new Ext.TabPanel({
    id          : 'tabInvoice',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 255,
    width       : 750,
    items       : [
                   {
                     xtype: 'panel',
                     title: 'Item Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 5,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItems]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 235,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblQty]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 330,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 430,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblExRate]
                        },
                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 560,
                            y           : -10,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblValue]
                        },

                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 250,
                            x           : 0,
                            y           : 10,
                            border      : false,
                            items: [cmbItem]
                        },


                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 220,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtQty]
                        },
                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 320,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtRate]
                        },
                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 430,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtExRate]
                        },

                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 480,
                            x           : 550,
                            y           : 10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtValue]
                        },


                     {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 1,
                            width       : 100,
                            x           : 660,
                            y           : 5,
                            defaultType : 'textfield',
                            border      : false,
                            items: [btnSubmit]
                        },

                       flxDetail,


                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 50,
                            y           : 140,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotQty]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 300,
                            y           : 140,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtTotValue]
                        },

                     ]
                   },    
                   {
                     xtype: 'panel',
                     title: 'Port / Payment Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 5,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbPayTerms]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 35,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbDeliveryTerms]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 65,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbCountry]
		                },


		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 95,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbLoadingPort]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 125,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [cmbDischargePort]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 155,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtShipDetails]
		                },

/*
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 130,
		                    width       : 480,
		                    x           : 0,
		                    y           : 185,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtDeliveryRemarks]
		                },
*/

                     ]
                   },
 
                    {
                     xtype: 'panel',
                     title: 'Container Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 170,
		                    width       : 480,
		                    x           : 50,
		                    y           : 5,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtContainer_20Feet]
		                },
		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 170,
		                    width       : 480,
		                    x           : 50,
		                    y           : 50	,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtContainer_40Feet]
		                },

		              {
		                    xtype       : 'fieldset',
		                    title       : '',
		                    labelWidth  : 170,
		                    width       : 480,
		                    x           : 50,
		                    y           : 95	,
		                    defaultType : 'textfield',
		                    border      : false,
		                    items: [txtCarrier]
		                },
	
                     ]
                   },

                   {
                     xtype: 'panel',
                     title: 'Bank Details',bodyStyle:{"background-color":"#ffffcc"},
                     layout: 'absolute',
                     items: [


                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 5,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankACNo]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 30,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankName]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 55,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankCode]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 80,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBranchCode]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 105,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtSwiftCode ]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 130,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd1]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 155,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd2]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 480,
                            x           : 0,
                            y           : 180,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtBankAdd3]
                        },
                     ]
                   },   

    ]
})


   var MasInvoicePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'IMPORT INVOICE ENTRY',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasInvoicePanel',
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
            text: 'Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
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
//edit
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Edit Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {
                gstFlag = "Edit";
                Ext.getCmp('cmbInvSlNo').setVisible(true);
 
		loadINVNoListDataStore.load({
		url: 'ClsMasImportInvoice.php',
	        params: {
	            task: 'loadINVNoList',
		    compcode: Gincompcode,
		    finid: GinFinid,
	        },
               callback: function () {
        
		}
	});
                }
            }
        },'-',
                   {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click: function () {



				if( txtInvSlNo.getRawValue() == '' ) 
				{

					alert("Enter Entry Number");
					txtInvSlNo.setFocus();
				}
                            	else if(cmbCountry.getRawValue()=="" || cmbCountry.getValue()==0)
			        {
					alert("Select Country..");
//					cmbCountry.setFocus();
				}

                            	else if(txtInvNo.getRawValue()=="" )
			        {
					alert("Enter Invoice Number..");
	//				txtInvNo.Focus();
				}
                            	else if(txtBENo.getRawValue()=="" )
			        {
					alert("Enter BILL OF ENTRY Number..");
	//				txtInvNo.Focus();
				}
                            	else if(txtBLNo.getRawValue()=="" )
			        {
					alert("Enter BL Number..");
	//				txtInvNo.Focus();
				}

				else
				{
					Ext.MessageBox.show({
			                title: 'Confirmation',
			                icon: Ext.Msg.QUESTION,
					buttons: Ext.MessageBox.YESNO,
		            		msg: 'Do u want to save',
		            		fn: function(btn)
					{
					if (btn == 'yes')
					{
				            var poData = flxDetail.getStore().getRange();                                        
				            var poupdData = new Array();
				            Ext.each(poData, function (record) {
				                poupdData.push(record.data);
				            });
				            Ext.Ajax.request({
				            url: 'TrnImportInvoiceSave.php',
				            params :
				            {

				             	griddet: Ext.util.JSON.encode(poupdData),  
			    			cnt: poData.length,  
               	                                savetype   : gstFlag,                                  
				                compcode   : Gincompcode,
				                finid      : GinFinid,
                                                invseqno   : invseqno,
                                                invslno    : txtInvSlNo.getValue(), 
				                invno      : txtInvNo.getRawValue(),
				                invdate    : Ext.util.Format.date(dtpInvdate.getValue(),"Y-m-d"),  		
				                refno      : txtRefNo.getRawValue(),
				                refdate    : Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                        	                poseqno    : poseqno,   
                  	   			party      : cmbPartyName.getValue(),
			  			agent      : cmbAgent.getValue(),
				          	payterms   : cmbPayTerms.getRawValue(),
				             	delyterms  : cmbDeliveryTerms.getRawValue(),	
				              	shipdetails: txtShipDetails.getRawValue(),
				         	country    : cmbCountry.getValue(),
				              	loadingport: cmbLoadingPort.getValue(),
				         	discharport: cmbDischargePort.getValue(),
				                bankacno   : txtBankACNo.getRawValue(),
				                bankname   : txtBankName.getRawValue(),
				                bankcode   : txtBankCode.getRawValue(),
				                branchcode : txtBranchCode.getRawValue(),
				                swiftcode  : txtSwiftCode.getRawValue(),
				                bankadd1   : txtBankAdd1.getRawValue(),
				                bankadd2   : txtBankAdd2.getRawValue(),
				                bankadd3   : txtBankAdd3.getRawValue(),
				                blno       : txtBLNo.getRawValue(),
				                bldate     : Ext.util.Format.date(dtpBLdate.getValue(),"Y-m-d"),  
				                beno       : txtBENo.getRawValue(),
				                bedate     : Ext.util.Format.date(dtpBEdate.getValue(),"Y-m-d"),  
                                                vessal     : txtCarrier.getRawValue(),
                                                totvalue   : txtTotValue.getValue(),
                                                exrate     : txtExRate.getValue(),
                                                con_20feet : txtContainer_20Feet.getValue(),
                                                con_40feet : txtContainer_40Feet.getValue(),
//                                                deliremakrs: txtDeliveryRemarks.getRawValue(),     
			                   } ,
					  callback: function(options, success, response)
					      {
						var obj = Ext.decode(response.responseText);
		
						 if (obj['success']==="true")
						 {                                
						    Ext.MessageBox.alert("Import Invoice Saved -" + obj['ino']);
						    MasInvoicePanel.getForm().reset();
						    flxDetail.getStore().removeAll();

						    RefreshData();
						  }else
						  {
		Ext.MessageBox.alert("Import invoice Not Completed! Pls Check!- " + obj['ino']);                                                  
						   }
						}   

	
                                           });
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
                            MasImportInvoiceWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 230,
                width   : 900,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 50,
                y       : 3,	
                items:[

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : -5,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtInvSlNo]
                        },
	                {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 400,
                            x           : 0,
                            y           : -5,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbInvSlNo]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : 25,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbPartyName]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 55,
                            labelWidth  : 110,
                            border      : false,
                            items : [cmbPONo]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            x           : 0,
                            y           : 85,
                            labelWidth  : 110,
                            border      : false,
                            items : [dtpPodate]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 400,
                            x           : 0,
                            y           : 115,
                            labelWidth  : 110,
                            border      : false,
                            items : [txtRefNo]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 250,
                            x           : 0,
                            y           : 145,
                            labelWidth  : 110,
                            border      : false,
                            items : [dtpRefdate]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 500,
                            x           : 0,
                            y           : 175,
                            defaultType : 'textfield',
                            border      : false,
                            items: [cmbAgent]
                        },

                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 500,
                            x           : 550,
                            y           : 25,
                            defaultType : 'textfield',
                            border      : false,
                            items: [txtInvNo]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 260,
                            x           : 550,
                            y           : 55,
                            labelWidth  : 130,
                            border      : false,
                            items : [dtpInvdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 350,
                            x           : 550,
                            y           : 85,
                            labelWidth  : 130,
                            border      : false,
                            items : [txtBLNo]
                        },


                       {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 260,
                            x           : 550,
                            y           : 115,
                            labelWidth  : 130,
                            border      : false,
                            items : [dtpBLdate]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 350,
                            x           : 550,
                            y           : 145,
                            labelWidth  : 130,
                            border      : false,
                            items : [txtBENo]
                        },
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 130,
                            width       : 260,
                            x           : 550,
                            y           : 175,
                            defaultType : 'textfield',
                            border      : false,
                            items: [dtpBEdate]
                        },

                ]

            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 280,
                width   : 800,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 100,
                y       : 237,	
                items:[

                    
                      {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 900,
                            x           : 0,
                            y           : -10,
                            defaultType : 'textfield',
                            border      : false,
                            items: [tabInvoice]
                        },



                ]
           },
        ],
    });
   
   function RefreshData(){

       invseqno = 0;
        gstFlag = "Add";
        Ext.getCmp('cmbInvSlNo').setVisible(false);
	VendorDataStore.load({
        url: 'ClsImportInvoice.php', 
        params:
       {
         	 task:"loadsupplier"
        }
	});	

            LoadINVNoDataStore.removeAll();
            LoadINVNoDataStore.load({
		url: 'ClsImportInvoice.php',
		params: {
		task: 'loadINVNo',
		compcode: Gincompcode,
		finid: GinFinid
		},
		callback : function(){
		txtInvSlNo.setValue(LoadINVNoDataStore.getAt(0).get('invno'));
		}
            });


}
 
   
    var MasImportInvoiceWindow = new Ext.Window({
	height      : 590,
        width       : 1000,
        y           : 35,
        title       : 'IMPORT INVOICE ENTRY',
        items       : MasInvoicePanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

                         RefreshData();
		 }
			
		}
    });
    MasImportInvoiceWindow.show();  
});
