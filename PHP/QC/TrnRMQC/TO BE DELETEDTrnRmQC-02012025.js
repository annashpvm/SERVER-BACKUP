
Ext.onReady(function(){


   Ext.QuickTips.init();



   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var userid = localStorage.getItem('ginuser');


   var gstfinyear = localStorage.getItem('gstyear');
   var finstdate = localStorage.getItem('gfinstdate');   
   var finenddate = localStorage.getItem('gfineddate');    


   var gstStatus = "N";
   var gstFlag = "Add";
   var gridedit = "false";
   var itemgrpcode = 0;
   var edwtno = 0, wtno = 0 ;
   var supcode =0;
   var areacode =0;
   var unloaddate = new Date();
   var chkitemcode = 0;

   var itemtype = 'F';
   var savechk = 0; 
   var seqno = 0;
   var fsctype = 2;
   var itemmois = 10;
   var valuecalYN   = "N";

var dedrate = 0;
var originalrate = 0; 


   var optCalcNeed = new Ext.form.FieldSet({
    xtype: 'fieldset',
 //   title: 'Calculation',

    fieldLabel: '',
    layout : 'hbox',
    width: 400,
    height:90,
    defaultType : 'textfield',

    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optCalcNeed',

	//simpleValue: true,  // set simpleValue to true to enable value binding //id:'optcomp', id:'optsup', id:'optparty',
//bind: '{myValue}',
        items: [
            {boxLabel: 'Calculation Needed', name: 'optCalcNeed', id:'CalcNeed',  inputValue: 1,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                 valuecalYN ="Y";

               }
              }
             }
            },
            {boxLabel: 'Calculation Not Needed', name: 'optCalcNeed', id:'CalcNoNeed',  inputValue: 2,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                valuecalYN ="N";

               }
              }
             }}  , //,txtfreight



        ],
    },

    ],
});


var loadSupplierDatastore = new Ext.data.Store({
      id: 'loadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSupplierList"}, // this parameter asks for listing
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
	

 var loadQCEntryNoDetailDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entrydate', 'qc_rm_ticketdate', 'qc_rm_supcode', 'qc_rm_truck', 'qc_rm_ticketno', 'qc_rm_ticketwt', 'qc_rm_itemcode', 'qc_rm_moisper', 'qc_rm_moisqty', 'qc_rm_llessper', 'qc_rm_llessqty', 'qc_rm_rejectper','qc_rm_moisfor',  'qc_rm_rejectqty', 'qc_rm_degradeqty', 'qc_rm_acceptqty', 'qc_rm_remarks','qc_rm_remarks2', 'qc_rm_packtype', 'itmh_name',  'cust_code','cust_ref','qc_rm_itemmois', 'sup_name','qc_rm_moisper_totalmaterial', 'qc_rm_moisforqty','qc_rm_millboard','qc_rm_billqty','qc_rm_millqty', 'cust_ref','qc_rm_slno','wc_area_code','wc_unloadingtime','area_name','qc_rm_area','qc_rm_unloadingtime',
'qc_rm_itemtype','qc_rm_rate','qc_rm_calc_need','qc_rm_shortage','qc_rm_bales','qc_rm_dn_raised','qc_rm_grn_status','qc_rm_ded_rate',
'qc_rm_debitnote_no','qc_rm_grnno'
      ]),
    });

 var loadQCEntryNoListDatastore = new Ext.data.Store({
      id: 'loadQCEntryNoListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entryno',
      ]),
    });


 var loadEntryNoDatastore = new Ext.data.Store({
      id: 'loadEntryNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadQCEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'qc_rm_entryno',
      ]),
    });


 var loadTruckNoDatastore = new Ext.data.Store({
      id: 'loadTruckNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRMTruckList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_vehicleno',  
      ]),
    });


 var loadTicketNoDatastore = new Ext.data.Store({
      id: 'loadTicketNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTicketList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_ticketno' ,'wc_acceptedwt','cust_ref','cust_code','wc_area_code','wc_time','area_name','processwt','wc_netwt','wc_partynetwt', 'wt_type'
      ]),
    });


 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code' ,'itmh_name',
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


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchItemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code', 'itmh_name','itmh_moisture_per' , 'rm_rate_mois' ,'rm_rate_rate'
      ]),
    });

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxItem,
        x: 50,
        y: 180,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "itmh_code", dataIndex: 'itmh_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'itmh_name',sortable:true,width:200,align:'left'},
		{header: "", dataIndex: 'itmh_moisture_per',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'rm_rate_mois',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'rm_rate_rate',sortable:true,width:60,align:'left'},

        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			chkitemcode  = selrow.get('itmh_code');
                        if (selrow.get('rm_rate_mois') > 0)
                           itemmois  = selrow.get('rm_rate_mois');
                        else
                           itemmois  = selrow.get('itmh_moisture_per');

//alert(itemmois);

                        txtItemName.setValue(selrow.get('itmh_name'));
                        txtRate.setValue(selrow.get('rm_rate_rate'));
                        flxItem.hide();
                        txtRate.focus();
   /*          
//alert(chkitemcode);
                        if (e.getKey() == e.ENTER) {
			    txtItemName.setValue(selrow.get('itmh_name'));
                            txtMoisTotalMaterail.focus();
                        }

                        flxItem.hide();
*/
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			 chkitemcode  = selrow.get('itmh_code');
//                        itemmois  = selrow.get('itmh_moisture_per');
                        if (selrow.get('rm_rate_mois') > 0)
                           itemmois  = selrow.get('rm_rate_mois');
                        else
                           itemmois  = selrow.get('itmh_moisture_per');
                        txtItemName.setValue(selrow.get('itmh_name'));
                        txtRate.setValue(selrow.get('rm_rate_rate'));
                        flxItem.hide();
                        txtMillBoard.focus();

             }     
     
   }
   });



var txtRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 txtMillBoard.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    });


var txtBillWT = new Ext.form.NumberField({
        fieldLabel  : 'BILL WT',
        id          : 'txtBillWT',
        name        : 'txtBillWT',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });

var txtMillWT = new Ext.form.NumberField({
        fieldLabel  : 'MILL WT',
        id          : 'txtMillWT',
        name        : 'txtMillWT',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

    });
var txtShortageWT = new Ext.form.NumberField({
        fieldLabel  : 'SHORTAGE',
        id          : 'txtShortageWT',
        name        : 'txtShortageWT',
        width       :  80,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
        readOnly : true,
	enableKeyEvents: true, 
	listeners:{
        }      

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
                 RefreshTruckNo();
            }
    }
    
});


var txtUnloadingTime = new Ext.form.TextField({
	fieldLabel  : 'Unloading Time',
	id          : 'txtUnloadingTime',
	name        : 'txtUnloadingTime',
	width       :  200,
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


var cmbSupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Supplier',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSupplier',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSupplierDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
              supcode  =  cmbSupplier.getValue();

           			loadTicketNoDatastore.removeAll();
				loadTicketNoDatastore.load({
				url: '/SHVPM/QC/ClsQC.php',
				params: {
					task: 'loadTicketList',
					    compcode : Gincompcode,
					    finid    : GinFinid,
					    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
		                            truckno  : cmbTruckNo.getValue(),
                                            supcode  : cmbSupplier.getValue(),
		                            gstFlag  : gstFlag,
				},
				callback:function()
				{
	
		                       supcode = loadTicketNoDatastore.getAt(0).get('cust_code');
		                       cmbArea.setValue(loadTicketNoDatastore.getAt(0).get('wc_area_code'));
		                       areacode = loadTicketNoDatastore.getAt(0).get('wc_area_code');
		                       unloaddate = loadTicketNoDatastore.getAt(0).get('wc_unloadingtime');
		                       txtUnloadingTime.setRawValue(loadTicketNoDatastore.getAt(0).get('wc_time'));
		                }
				});

	   }
        }         

   });


function find_grnqty()
{
    var acceptqty =0;
    var deductionqty =0;
    var moisfor = 0;
    var eligibleqty = 0;

    txtRemarks.setRawValue('');
 

//    txtMoisForQty.setValue('');


//alert(txtRemarks.getRawValue());


    if (txtLLessPer.getValue() > 0)
    txtLLessQty.setValue(Ext.util.Format.number(Number(txtTicketWt.getValue())  * Number(txtLLessPer.getValue())  / 100,"0"));
    if (txtLLessQty.getValue() <= 0)
       txtLLessQty.setValue('');

    if (txtRejectPer.getValue() > 0)
    txtRejectQty.setValue(Ext.util.Format.number(Number(txtTicketWt.getValue())  * Number(txtRejectPer.getValue())  / 100,"0"));
    if (txtRejectQty.getValue() <= 0)
       txtRejectQty.setValue('');



 
    eligibleqty = Number(txtTicketWt.getValue()) - Number(txtMillBoard.getValue()) - 
Number(txtLLessQty.getValue()) - Number(txtRejectQty.getValue());

    if (Number(txtShortageWT.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Weight Shortage : "+ txtShortageWT.getValue() + " Kgs " ) ;


    if (Number(txtMillBoard.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Mill Board Qty : "+ txtMillBoard.getValue() + " Kgs " ) ;



    if (Number(txtLLessQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " LifeLess Qty : "+ txtLLessQty.getValue() + " Kgs" ) ;

    if (Number(txtRejectQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Rejection Qty : "+ txtRejectQty.getValue() + " Kgs " ) ;



    if (txtMoisTotalMaterail.getValue() > 0)
    {

    txtMoisForQty.setValue(Ext.util.Format.number(Number(eligibleqty)  * Number(txtMoisTotalMaterail.getValue())  / 100,"0"));
    if (Number(txtMoisForQty.getValue()) > 0)
       txtRemarks.setRawValue(txtRemarks.getRawValue() + txtMoisTotalMaterail.getValue()+"% Material Having Moisture of " +txtMoisPer.getValue()+"% ");
    else
       txtMoisForQty.setValue(0);
    }




//alert(txtRemarks.getRawValue());

    if (txtMoisPer.getValue() > 10)
    {
//alert(itemmois);

    if (Number(txtMoisPer.getValue()) - Number(itemmois) > 0)
    {
    txtMoisWt.setValue(Ext.util.Format.number(Number(txtMoisForQty.getValue())  * Number(txtMoisPer.getValue()-itemmois)  / 100,"0"));
    txtRemarks.setRawValue(txtRemarks.getRawValue()+ "Ex. Moisture " + Ext.util.Format.number((txtMoisPer.getValue() - itemmois), "0.00") + "%" + " for the Qty : "+ Ext.util.Format.number(txtMoisForQty.getValue(), "0") + " Kgs. Qty Deducted for moisture is "  + Ext.util.Format.number(txtMoisWt.getValue(), "0") + " Kgs." + " ,");
    }
    else
    {
       txtMoisWt.setValue(0);
    }     

    }





    if (Number(txtDegradeQty.getValue()) > 0 )
       txtRemarks.setRawValue(txtRemarks.getRawValue() + " Degraded Qty : "+ txtDegradeQty.getValue() + " Kgs" ) ;


  //  txtMoisWt.toFixed(3);
//    txtLLessQty.toFixed(3);

//  if (itemtype == 'F')
//    acceptqty = Number(txtTicketWt.getValue()) -  Number(txtMoisWt.getValue()) -  Number(txtLLessQty.getValue()) -  Number(txtRejectQty.getValue()) - Number(txtMillBoard.getValue())  -  Number(txtDegradeQty.getValue())-  Number(txtShortageWT.getValue());
//  else


    acceptqty = Number(txtTicketWt.getValue()) -  Number(txtMoisWt.getValue()) -  Number(txtLLessQty.getValue()) -  Number(txtRejectQty.getValue()) - Number(txtMillBoard.getValue())  -  Number(txtDegradeQty.getValue());


    if (acceptqty <0)
       acceptqty =0;     

    txtAcceptWt.setValue(Ext.util.Format.number(acceptqty,"0"));
  
    deductionqty = Number(txtMoisWt.getValue()) +  Number(txtLLessQty.getValue()) +  Number(txtRejectQty.getValue())+ Number(txtMillBoard.getValue()) +   Number(txtDegradeQty.getValue());
    if (deductionqty == 0 && txtRemarks.getRawValue() == "" )
      txtRemarks.setRawValue("Accepted Qty : "+ txtAcceptWt.getValue() + " Kgs" ) ;



}


function refresh()
{
	txtRate.setValue('');
   //     itemtype = 'D';
        txtTicketWt.setValue(txtDegradeQty.getValue()); 
        txtMillBoard.setValue('');
        txtMoisPer.setValue('');
	txtMoisWt.setValue('');
	txtLLessPer.setValue('');
	txtLLessQty.setValue('');
	txtRejectPer.setValue('');
	txtRejectQty.setValue('');
	txtAcceptWt.setValue(txtDegradeQty.getValue());
        txtDegradeQty.setValue('');
	txtRemarks.setValue('');
	txtRemarks2.setValue('');
        txtMoisForQty.setValue('');
        chkitemcode == 0
        txtItemName.setRawValue('');
	txtMoisTotalMaterail.setValue('');
	txtMoisForQty.setValue('');
        txtBales.setValue('');


}




var txtRemarks = new Ext.form.TextField({
	fieldLabel  : 'Remarks',
	id          : 'txtRemarks',
	name        : 'txtRemarks',
	width       :  500,
	style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'245'},
	tabindex : 2,
	listeners   : {
	}
});
var txtRemarks2 = new Ext.form.TextField({
	fieldLabel  : 'Remarks(Additional)',
	id          : 'txtRemarks2',
	name        : 'txtRemarks2',
	width       :  500,
	style       :  {textTransform: "uppercase"},
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'99'},
	tabindex : 2,
	listeners   : {
	}
});
var txtTicketWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTicketWt',
        name        : 'txtTicketWt',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
        decimalPrecision: 0,
	listeners:{
	  keyup:function()
          {
             find_grnqty();
          }
        }  
    });


var txtBales = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtBales',
        name        : 'txtBales',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
        decimalPrecision: 0,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 txtLLessPer.focus();

             }
          },
	  keyup:function()
          {

          }
        }   
   });


var txtMillBoard = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMillBoard',
        name        : 'txtLLessQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
        decimalPrecision: 0,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 txtLLessPer.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   
   });


var txtMoisPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisPer',
        name        : 'txtMoisPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtDegradeQty.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    });


var txtMoisTotalMaterail = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisTotalMaterail',
        name        : 'txtMoisTotalMaterail',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtMoisForQty.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    })



var txtMoisForQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisForQty',
        name        : 'txtMoisForQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtMoisPer.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }      

    });



var txtMoisWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMoisWt',
        name        : 'txtMoisWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
        decimalPrecision: 0,

	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtDegradeQty.focus;

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }  
    });


var txtLLessPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtLLessPer',
        name        : 'txtLLessPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtLLessQty.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtLLessQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtLLessQty',
        name        : 'txtLLessQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
        decimalPrecision: 0,

	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtRejectPer.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   
   });

var txtRejectQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRejectQty',
        name        : 'txtRejectQty',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
        decimalPrecision: 0,

	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtMoisTotalMaterail.focus();


             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtRejectPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRejectPer',
        name        : 'txtRejectPer',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true, 
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtRejectQty.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   
    });

var txtDegradeQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDegradeQty',
        name        : 'txtDegradeQty',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
        decimalPrecision: 0,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   btnSubmit.focus();

             }
          },
	  keyup:function()
          {
             find_grnqty();
          }
        }   

    });

var txtAcceptWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAcceptWt',
        name        : 'txtAcceptWt',
        width       :  70,    
        decimalPrecision: 0,
   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttotTicketWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Ticket Qty',
        id          : 'txttotTicketWt',
        name        : 'txttotTicketWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var txttotAcceptWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Accepted Qty',
        id          : 'txttotAcceptWt',
        name        : 'txttotAcceptWt',
        width       :  70,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true,
	enableKeyEvents: true, 
	listeners:{

        }  
    });



var txtTicketNo = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTicketNo',
        name        : 'txtTicketNo',
        width       :  60,        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });


var lblNoofBales = new Ext.form.Label({
    fieldLabel  : 'Bales(nos)',
    id          : 'lblNoofBales',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblPackingType = new Ext.form.Label({
    fieldLabel  : 'Packing Type',
    id          : 'lblPackingType',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});

var lblFSC = new Ext.form.Label({
    fieldLabel  : 'FSC Classification',
    id          : 'lblFSC',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblTicketNo = new Ext.form.Label({
    fieldLabel  : 'Ticket No',
    id          : 'lblTicketNo',
    width       : 60,
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
});


var lblTicketWT = new Ext.form.Label({
    fieldLabel  : 'Wt(Kgs)',
    id          : 'lblTicketWT',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItem',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});




var lblMillBoard = new Ext.form.Label({
    fieldLabel  : 'Mill.Board',
    id          : 'lblMillBoard',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblMoisper = new Ext.form.Label({
    fieldLabel  : 'Mois %',
    id          : 'lblMoisper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblMoisQty = new Ext.form.Label({
    fieldLabel  : 'Mois Qty',
    id          : 'lblMoisQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblMoisForPer = new Ext.form.Label({
    fieldLabel  : 'Mois % of Material',
    id          : 'lblMoisForPer',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblMoisForQty = new Ext.form.Label({
    fieldLabel  : 'Mois For the Qty',
    id          : 'lblMoisForQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 55
});

var lbllifelessper = new Ext.form.Label({
    fieldLabel  : 'L.less %',
    id          : 'lbllifelessper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lbllifelessQty = new Ext.form.Label({
    fieldLabel  : 'L.Less Qty',
    id          : 'lbllifelessQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblRejectper = new Ext.form.Label({
    fieldLabel  : 'Reject %',
    id          : 'lblRejectper',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var lblRejectQty = new Ext.form.Label({
    fieldLabel  : 'Reject Qty',
    id          : 'lblRejectQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});

var lblDegradeQty = new Ext.form.Label({
    fieldLabel  : 'Degraded',
    id          : 'lblDegradeQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});



var lblAcceptedQty = new Ext.form.Label({
    fieldLabel  : 'Accept. Qty',
    id          : 'lblAcceptedQty',
     labelStyle : "font-size:12px;font-weight:bold;color:#cc00cc",
    width       : 60
});


var btnRefreshSupplier = new Ext.Button({
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
			loadSupplierDatastore.removeAll();
			loadSupplierDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadSupplierList',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getRawValue(),
                                    gstFlag  : gstFlag,
			},
			callback:function()
			{

				loadTicketNoDatastore.removeAll();
				loadTicketNoDatastore.load({
				url: '/SHVPM/QC/ClsQC.php',
				params: {
					task: 'loadTicketList',
					    compcode : Gincompcode,
					    finid    : GinFinid,
					    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
		                            truckno  : cmbTruckNo.getValue(),
                                            supcode  : loadSupplierDatastore.getAt(0).get('cust_code'),
		                            gstFlag  : gstFlag,
				},
				callback:function()
				{
		                       cmbSupplier.setRawValue(loadTicketNoDatastore.getAt(0).get('cust_ref'));
		                       cmbSupplier.setValue(loadTicketNoDatastore.getAt(0).get('cust_code'));

		                       supcode = loadTicketNoDatastore.getAt(0).get('cust_code');
		                       cmbArea.setValue(loadTicketNoDatastore.getAt(0).get('wc_area_code'));
		                       areacode = loadTicketNoDatastore.getAt(0).get('wc_area_code');
		                       unloaddate = loadTicketNoDatastore.getAt(0).get('wc_unloadingtime');
		                       txtUnloadingTime.setRawValue(loadTicketNoDatastore.getAt(0).get('wc_time'));
		                }
				});
			
                        }
			});
        } 
     }
});
   


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

bodyStyle:{"background-color":"#ebebdf"},



    listeners:{


        blur: function(){    
                        grid_tot();
        }   ,
        click: function(){              


	    var gstadd="true";
	
	if(Number(txtTicketNo.getValue())==0) 
	{
                Ext.MessageBox.alert("QC", "Select Ticket No...");  
                 gstadd="false";	
	}            
	if(Number(txtTicketWt.getValue())==0) 
	{
                Ext.MessageBox.alert("QC", " Ticket Weight is empty...");
                 gstadd="false";  	
	}            

	else if( chkitemcode == 0 || txtItemName.getRawValue()== "")
	{
                Ext.MessageBox.alert("QC", "Select Item..");  
                 gstadd="false";
        }
	
	else if((txtAcceptWt.getValue() == '') || (txtAcceptWt.getValue() == 0))
	    {
                Ext.MessageBox.alert("QC", "Accept qty Should not be Zero..");
                 gstadd="false";
            }
	else if(txtRemarks.getRawValue()=='')
	{
                Ext.MessageBox.alert("QC", "Enter REMARKS line..");
                gstadd="false";
        }  
	else if(cmbPackingType.getRawValue()=='BUNDLE' &&  txtBales.getValue() == 0)
	{
                Ext.MessageBox.alert("QC", "Enter Number Bales..");
                gstadd="false";
        }  
	else if(cmbPackingType.getRawValue()=='LOOSE' &&  txtBales.getValue() > 0)
	{
                Ext.MessageBox.alert("QC", "Remove No. of Bales . It is LOOSE material ");
                gstadd="false";
        }  
	else if( txtRate.getValue() == 0 || txtRate.getRawValue()== "")
	{
                Ext.MessageBox.alert("QC", "Enter Item Rate..");  
                 gstadd="false";
                 txtRate.focus();
        }
	

            if(gstadd=="true")
            {
		
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var ticketchk =0;
                var cnt = 0;
                var bwt = 0;
                var mwt = 0;
                var swt = 0; // for shortage


                if (itemtype == 'F')
                {
		  bwt = txtBillWT.getValue();
                  mwt = txtMillWT.getValue();
                  dedrate2 =  txtRate.getValue();
                  originalrate = dedrate2;
      //            if (bwt > mwt)
//                     swt = Number(bwt)-Number(mwt);
                }   
                else  
                {
		  bwt = 0;
                  mwt = 0;

                  if (Number(originalrate) > Number(txtRate.getValue())) 
                     dedrate2 = originalrate - Number(txtRate.getValue());
                  else
                     dedrate2 =  txtRate.getValue();
  
                }   



                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.supcode != cmbSupplier.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.ticketno === txtTicketNo.getValue() && sel[i].data.ticketwt === txtTicketWt.getValue()   )
		    {
                        ticketchk = ticketchk + 1;
                    }
                }

                var shortagewt = 0;  
                if (itemtype == "F")
                    shortagewt = txtShortageWT.getValue();
                else   
                    shortagewt = 0;  

        	if(gridedit === "true")
	          {

			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);


			sel[idx].set('rate'   , txtRate.getValue());
			sel[idx].set('supcode'   , cmbSupplier.getValue());
			sel[idx].set('ticketno'   , txtTicketNo.getValue());
			sel[idx].set('ticketwt'   , txtTicketWt.getValue());
			sel[idx].set('itemname'   , txtItemName.getRawValue());
			sel[idx].set('itemcode'   , chkitemcode);
			sel[idx].set('millboard'  , txtMillBoard.getValue());
			sel[idx].set('moismatrialqty' , txtMoisTotalMaterail.getValue());
			sel[idx].set('moisforqty'    , txtMoisForQty.getValue());
			sel[idx].set('moisper'    , txtMoisPer.getValue());
			sel[idx].set('moisqty'    , txtMoisWt.getValue());
			sel[idx].set('lifelessper', txtLLessPer.getValue());
			sel[idx].set('lifelessqty', txtLLessQty.getValue());
			sel[idx].set('rejectper'  , txtRejectPer.getValue());
			sel[idx].set('rejectqty'  , txtRejectQty.getValue());
			sel[idx].set('degradeqty' , txtDegradeQty.getValue());
			sel[idx].set('acceptqty'  , txtAcceptWt.getValue());
			sel[idx].set('remarks'    , txtRemarks.getValue());
                 	sel[idx].set('remarks2'   , txtRemarks2.getValue());
                        sel[idx].set('seqno'      , seqno);			
                        sel[idx].set('itemtype'   , itemtype);	        
                   	sel[idx].set('packtype'   , cmbPackingType.getRawValue());
			sel[idx].set('billwt' , bwt);
			sel[idx].set('millwt' , mwt);
			sel[idx].set('shortage' , swt);
			sel[idx].set('bales'   , txtBales.getValue());
			sel[idx].set('fixedmois' , itemmois);
			sel[idx].set('rate' , txtRate.getValue());
          		sel[idx].set('dedrate' , dedrate2);
          		sel[idx].set('shortage' , shortagewt);

			flxDetail.getSelectionModel().clearSelections();
                        refresh();
                        grid_tot();

		}//if(gridedit === "true")

                else

                
		if (cnt > 0)
		{
                    Ext.MessageBox.alert("Grid","Different supplier not allowed to enter in single QC entry.");
                } else
		if (ticketchk > 0)
		{
                    Ext.MessageBox.alert("Grid","Same Ticket Number and  Ticket Weight already entered.");
                } else
                {
                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
                                slno        :  RowCnt,
                                rate        :  txtRate.getValue(),
                                dedrate     :  dedrate2,
         			supcode     :  cmbSupplier.getValue(),
		              	ticketno    :  txtTicketNo.getValue(),
				ticketwt    :  txtTicketWt.getValue(),
				itemname    :  txtItemName.getRawValue(),
				itemcode    :  chkitemcode,
				moismatrialqty  :  txtMoisTotalMaterail.getValue(),
				millboard   :  txtMillBoard.getValue(),
				moisforqty  :  txtMoisForQty.getValue(),
				moisper     :  txtMoisPer.getValue(),
				moisqty     :  txtMoisWt.getValue(),
				lifelessper :  txtLLessPer.getValue(),
				lifelessqty :  txtLLessQty.getValue(),
				rejectper   :  txtRejectPer.getValue(),
				rejectqty   :  txtRejectQty.getValue(),
				degradeqty  :  txtDegradeQty.getValue(),
				acceptqty   :  txtAcceptWt.getValue(),
                   	        packtype    :  cmbPackingType.getRawValue(),
				remarks     :  txtRemarks.getValue(),
				remarks2    :  txtRemarks2.getValue(),
                                itemtype    :  itemtype,
                                seqno       :  seqno,
                                billwt      :  bwt,
                                millwt      :  mwt,
                                shortage    :  swt,
                                bales       :  txtBales.getValue(),
                                fixedmois   :  itemmois,
                                shortage    :  shortagewt,   

                        }) 
                        );
                       refresh();
                       grid_tot();
//                       txtItemName.focus();
                }

  //              grid_tot();

            }
        }
    }
});


function find_qty_matching(){
	    var Row = flxTicket.getStore().getCount();
            flxTicket.getSelectionModel().selectAll();
            var selticket=flxTicket.getSelectionModel().getSelections();
            for(var k=0;k<Row;k++)
            {
                 if (Number(selticket[k].get('diff')) != 0)
                    savechk = 1;  
            }  

}


function grid_tot(){
        var ticketno = 0;
        var ticketwt = 0;
        var flxticketwt = 0;

        var ticketno2 = 0;



	    var Row2 = flxTicket.getStore().getCount();
            flxTicket.getSelectionModel().selectAll();
            var selticket=flxTicket.getSelectionModel().getSelections();
            for(var k=0;k<Row2;k++)
            {
                  selticket[k].set('processwt',0);
                  selticket[k].set('diff',0);
            }  


        var qty = 0;
        var differ = 0;

	pdb_totticketqty = 0;
	pdb_totacceptqty = 0;

	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();

	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
	{
            pdb_totticketqty = pdb_totticketqty + Number(sel[i].data.ticketwt)  - Number(sel[i].data.degradeqty)  ;
	    pdb_totacceptqty = pdb_totacceptqty + Number(sel[i].data.acceptqty) ;
	}


	txttotTicketWt.setValue(Ext.util.Format.number(pdb_totticketqty,"0.0"));
	txttotAcceptWt.setValue(Ext.util.Format.number(pdb_totacceptqty,"0.0"));


	flxDetail.getSelectionModel().selectAll();
	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
        {       
            ticketno = Number(sel[i].data.ticketno);
            ticketwt = Number(sel[i].data.ticketwt)-Number(sel[i].data.degradeqty);  



	    Row2 = flxTicket.getStore().getCount();

            flxTicket.getSelectionModel().selectAll();
            selticket=flxTicket.getSelectionModel().getSelections();
            for(var k=0;k<Row2;k++)
            {




               ticketno2 =  Number(selticket[k].get('wc_ticketno'));

               ticketwt2 =  Number(selticket[k].get('processwt'));
               flxticketwt=  Number(selticket[k].get('wc_acceptedwt'));

               if (Number(ticketno2) == Number(ticketno))
               {            
                     qty    =  Number(ticketwt2) + Number(ticketwt);
                     differ =  Number(flxticketwt) - Number(qty);

//                selticket[k].data.processwt = Number(selticket[k].data.processwt) + Number(ticketwt);
                  selticket[k].set('processwt',qty);
                  selticket[k].set('diff',differ);
               }
            } 
        }  



}



function grid_tot2(){

	flxTicket.getSelectionModel().clearSelections();
	flxDetail.getSelectionModel().clearSelections();


	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
	var sel=flxDetail.getSelectionModel().getSelections();
	for(var i=0;i<Row;i++)
        {       


            ticketno = Number(sel[i].data.ticketno);
            ticketwt = Number(sel[i].data.ticketwt)-Number(sel[i].data.degradeqty);  



	    var Row2 = flxTicket.getStore().getCount();

            flxTicket.getSelectionModel().selectAll();
            selticket=flxTicket.getSelectionModel().getSelections();
            for(var k=0;k<Row2;k++)
            {

               ticketno2 =  Number(selticket[k].get('wc_wb_no'));
               ticketwt2 =  Number(selticket[k].get('processwt'));
               flxticketwt=  Number(selticket[k].get('wc_netwt'));

               if (Number(ticketno2) == Number(ticketno))
               {  
                     qty    =  Number(ticketwt2) + Number(ticketwt);
                     differ =  Number(flxticketwt) - Number(qty);

//                selticket[k].data.processwt = Number(selticket[k].data.processwt) + Number(ticketwt);
                  selticket[k].set('processwt',qty);
                  selticket[k].set('diff',differ);
               } 

            } 
        }  



}




var cmbQCEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'QC Entry No.',
        width           : 80,
        displayField    : 'qc_rm_entryno', 
        valueField      : 'qc_rm_entryno',
        hiddenName      : '',
        id              : 'cmbQCEntNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadQCEntryNoListDatastore,
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
            	loadQCEntryNoDetailDatastore.removeAll();
		loadQCEntryNoDetailDatastore.load({
		 	url:'/SHVPM/QC/ClsQC.php',
			params:
	   		{
			task:"loadQCEntryNoDetail",
			finid    : GinFinid,
			compcode : Gincompcode,
                        entryno  : cmbQCEntNo.getRawValue(),
                        gstFlag  : gstFlag,
			},
		callback:function(){

txtRemarks.setRawValue('');
txtRemarks2.setRawValue('');
txtItemName.setRawValue('');
txtMillWT.setRawValue('');
txtBillWT.setRawValue('');


//var newdata =loadQCEntryNoDetailDatastore.getAt(0).get('cust_ref');
//cmbSupplier.store.loaddata(newdata);


                        if (loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_dn_raised') == "Y" || loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_grn_status') == "Y"  )
                        {
                            alert("Debit Note : " + loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_debitnote_no') + " - GRN : " + loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_grnno') +  " Raised for this Inspection Number.. Can't Modify .");
                            Ext.getCmp('save').setDisabled(true);  
                        }     
                        else
                        {
                            Ext.getCmp('save').setDisabled(false);  
                        }     


                        txtQCEntNo.setValue(cmbQCEntNo.getValue());

			dtEntDate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_entrydate'),'d-m-Y'));
			dtTicketDate.setRawValue(Ext.util.Format.date(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_ticketdate'),'d-m-Y'));
                        cmbArea.setValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_area'));
//                        cmbSupplier.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('cust_ref'));
                        cmbSupplier.setValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_supcode'));
                        cmbSupplier.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('cust_ref'));

                        areacode = loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_area');

                        unloaddate = loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_unloadingtime');

                        supcode = loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_supcode');
	                cmbTruckNo.setRawValue(loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_truck'));
                        var bl ="";
			var RowCnt = loadQCEntryNoDetailDatastore.getCount();
                        txttotTicketWt.setValue('');
                        txttotAcceptWt.setValue('');
                        if (loadQCEntryNoDetailDatastore.getAt(0).get('qc_rm_calc_need') == "Y")
                        {
                           Ext.getCmp('optCalcNeed').setValue(1);  
                           valuecalYN   = "Y";
                        }
                        else
                        {    
                           Ext.getCmp('optCalcNeed').setValue(2);  
                           valuecalYN   = "N";
                        }

			for (var i=0;i<RowCnt;i++)
			{
                                if (loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_packtype') == "B")
                                    bl = "BUNDLE";
                                else 
                                    bl = "LOOSE";
          			flxDetail.getStore().insert(
				flxDetail.getStore().getCount(),

				new dgrecord({
                       		      	supcode     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_supcode'),	
				      	slno        :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_slno'),	
				      	ticketno    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketno'),
					ticketwt    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_ticketwt'),
					itemname    :  loadQCEntryNoDetailDatastore.getAt(i).get('itmh_name'),
					itemcode    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_itemcode'),
					millboard   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_millboard'),

                                        moismatrialqty    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper_totalmaterial'),
                        		moisforqty     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisforqty'),
					moisper     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisper'),
					moisqty     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_moisqty'),
					lifelessper :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_llessper'),
					lifelessqty :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_llessqty'),
					rejectper   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectper'),
					rejectqty   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rejectqty'),
					degradeqty  :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_degradeqty'),
					acceptqty   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_acceptqty'),
		           	        packtype    :  bl,
					remarks     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_remarks'),
					remarks2    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_remarks2'),
                                        itemtype    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_itemtype'),
                                        billwt      :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_billqty'),
                                        millwt      :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_millqty'),
                                        fixedmois   :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_itemmois'),
                                        rate        :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_rate'),
                                        dedrate     :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_ded_rate'),

                                        shortage    :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_shortage'),
                                        bales       :  loadQCEntryNoDetailDatastore.getAt(i).get('qc_rm_bales'),

				}) 
				); 
                     }    
      
			loadTicketNoDatastore.removeAll();
			loadTicketNoDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadTicketList',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getRawValue(),
			},
			callback:function()
			{
                             grid_tot2()
                        }
			});
               grid_tot();

	
                 }    
	        });			
               grid_tot2();
	   }
        }      
   });

/*
var cmbItem = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbItem',
        typeAhead       : true,
        mode            : 'local',
        store           : loadItemListDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
			
	   }
        }      
   });
*/

function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: '/SHVPM/QC/ClsQC.php',
		params:
		{
			task:"loadSearchItemlist",
			itemname : txtItemName.getRawValue(),
                        suppcode : supcode,
		},
        });
}


var txtItemName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  220,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();
                   txtRate.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxItem.getEl().setStyle('z-index','10000');
	        flxItem.show();
	        loadSearchItemListDatastore.removeAll();
  	        ItemSearch();
            }
         }  
    });


var dgrecord = Ext.data.Record.create([]);
var flxTicket = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:800,
    y:5,
    height: 120,
    hidden:false,
    width: 450,
    columns:
    [
        {header: "Ticket No",  dataIndex: 'wc_ticketno', sortable:true,width:80,align:'left'},
        {header: "Weight",     dataIndex: 'wc_acceptedwt',sortable:true,width:90,align:'right'},
        {header: "Process Wt", dataIndex: 'processwt',sortable:true,width:90,align:'right'},
        {header: "diff",       dataIndex: 'diff',sortable:true,width:90,align:'right'},
        {header: "BillWt",     dataIndex: 'wc_partynetwt',sortable:true,width:90,align:'right'},
        {header: "MillWt",     dataIndex: 'wc_netwt',sortable:true,width:90,align:'right'},
        {header: "WT(Type)",     dataIndex: 'wt_type',sortable:true,width:90,align:'center'},

    ],
    store: loadTicketNoDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
		var sm = flxTicket.getSelectionModel();
		var selrow = sm.getSelected();
		flxTicket.getSelectionModel().clearSelections();
                txtTicketNo.setValue(selrow.get('wc_ticketno'));
		txtTicketWt.setValue(selrow.get('wc_acceptedwt'));
//		txtAcceptWt.setValue(selrow.get('wc_acceptedwt'));
		txtBillWT.setValue(selrow.get('wc_partynetwt'));
		txtMillWT.setValue(selrow.get('wc_netwt'));
		var weightype = selrow.get('wt_type');

                if (Number(txtBillWT.getValue()) > Number(txtMillWT.getValue()) && weightype == 'M' )
                   txtShortageWT.setValue(Number(txtBillWT.getValue()) - Number(txtMillWT.getValue()));
                else
                    txtShortageWT.setValue(0);

                if (Number(txtShortageWT.getValue()) > 0)
                { 
		        Ext.Msg.show({
		            title: 'Confirmation',
		            icon: Ext.Msg.QUESTION,
		            buttons: Ext.MessageBox.YESNO,
		            msg: 'Confirm -  Are you sure to Continue with Weight Shortage = '+txtShortageWT.getValue()+ " Kgs",
		            fn: function(btn)
		            {
		                if (btn === 'no')
				{
				txtTicketNo.setValue('');
				txtTicketWt.setValue('');
				txtBillWT.setValue('');
				txtMillWT.setValue('');
                                txtShortageWT.setValue(0);
                                }
                                else
                                {
			  	seqno = selrow.get('wc_ticketno');
				itemtype = 'F';
				find_grnqty();
				txtItemName.focus();
                                }       
                            } 
                        });
                }   



dedrate = 0;
 originalrate = 0; 


    }

   }
});

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:260,
    height: 130,
    hidden:false,
    width: 1260,
    columns:
    [
        {header: "Supcode", dataIndex: 'supcode',sortable:true,width:50,align:'left',hidden:true },
        {header: "Sl.No", dataIndex: 'slno',sortable:true,width:50,align:'left'},
        {header: "Ticket No", dataIndex: 'ticketno',sortable:true,width:80,align:'center'},
        {header: "Weight", dataIndex: 'ticketwt',sortable:true,width:80,align:'right'},
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:180,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:18,align:'right'},
        {header: "Rate /MT", dataIndex: 'rate',sortable:true,width:80,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('rate')));
                          
                        },
                        blur: function () {
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            if (selrow.get('itemtype') == "F")
                               selrow.set('dedrate', selrow.get('rate'));
         //                 this.setValue(Number(selrow.get('rate')));
                        }
                    },

                },

        },
        {header: "Ded.Rate", dataIndex: 'dedrate',sortable:true,width:90,align:'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    listeners: {
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('dedrate')));
                          
                        },
                        blur: function () {
                            calculateValue();
                        },
                        keyup: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
         //                 this.setValue(Number(selrow.get('rate')));

                        }
                    },


                },

        },
        {header: "Mill Board", dataIndex: 'millboard',sortable:true,width:80,align:'right'},
        {header: "Mois For Material", dataIndex: 'moismatrialqty',sortable:true,width:80,align:'right'},
        {header: "Mois For", dataIndex: 'moisforqty',sortable:true,width:80,align:'right'},
        {header: "Mois %", dataIndex: 'moisper',sortable:true,width:80,align:'right'},
        {header: "Mois Qty", dataIndex: 'moisqty',sortable:true,width:80,align:'right'},
        {header: "Life Less %", dataIndex: 'lifelessper',sortable:true,width:80,align:'right'},
        {header: "Life Less Qty", dataIndex: 'lifelessqty',sortable:true,width:80,align:'right'},
        {header: "Reject %", dataIndex: 'rejectper',sortable:true,width:80,align:'right'},
        {header: "Reject Qty", dataIndex: 'rejectqty',sortable:true,width:80,align:'right'},
        {header: "Degrade Qty", dataIndex: 'degradeqty',sortable:true,width:80,align:'right'},
        {header: "Accepted Qty", dataIndex: 'acceptqty',sortable:true,width:80,align:'right'},
        {header: "Remarks", dataIndex: 'remarks',sortable:true,width:100,align:'right'},
        {header: "Remarks - II", dataIndex: 'remarks2',sortable:true,width:100,align:'right'},
        {header: "Packing Type", dataIndex: 'packtype',sortable:true,width:100,align:'right'},
        {header: "SeqNo", dataIndex: 'seqno',sortable:true,width:100,align:'left' ,hidden:true },
        {header: "type", dataIndex: 'itemtype',sortable:true,width:100,align:'left'},
        {header: "Bill Weight", dataIndex: 'billwt',sortable:true,width:100,align:'right'},
        {header: "Mill Weight", dataIndex: 'millwt',sortable:true,width:100,align:'right'},
        {header: "Mois(F)", dataIndex: 'fixedmois',sortable:true,width:100,align:'right'},
        {header: "Shortage", dataIndex: 'shortage',sortable:true,width:100,align:'right'},
        {header: "Bales", dataIndex: 'bales',sortable:true,width:100,align:'left'},





    ],
    store: [],

    listeners:{	

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

             if ( cellIndex == 6 || cellIndex == 7 )
             {

             }   
             else
             {   
             Ext.Msg.show({
             title: 'RM PO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();
		                chkitemcode = selrow.get('itemcode');
		                txtItemName.setValue(selrow.get('itemname'));

				txtTicketNo.setValue(selrow.get('ticketno'));
				txtTicketWt.setValue(selrow.get('ticketwt'));
                		txtMoisForQty.setValue(selrow.get('moisforqty'));
                		txtMillBoard.setValue(selrow.get('millboard'));
                 		txtRate.setValue(selrow.get('rate'));
                 		txtMoisTotalMaterail.setValue(selrow.get('moismatrialqty'));
				txtMoisPer.setValue(selrow.get('moisper'));
				txtMoisWt.setValue(selrow.get('moisqty'));
				txtLLessPer.setValue(selrow.get('lifelessper'));
				txtLLessQty.setValue(selrow.get('lifelessqty'));
				txtRejectPer.setValue(selrow.get('rejectper'));
				txtRejectQty.setValue(selrow.get('rejectqty'));
				txtDegradeQty.setValue(selrow.get('degradeqty'));
				txtMillWT.setValue(selrow.get('millwt'));
				txtBillWT.setValue(selrow.get('billwt'));
				txtAcceptWt.setValue(selrow.get('acceptqty'));
				cmbPackingType.setRawValue(selrow.get('packtype'));
                           	txtBales.setValue(selrow.get('bales'));
				txtRemarks.setRawValue(selrow.get('remarks'));
				txtRemarks2.setRawValue(selrow.get('remarks2'));
				seqno = selrow.get('seqno');
				itemtype = selrow.get('itemtype');
            			itemmois = selrow.get('fixedmois');
//                if (Number(txtBillWT.getValue()) > Number(txtMillWT.getValue()))
//                   txtShortageWT.setValue(Number(txtBillWT.getValue()) - Number(txtMillWT.getValue()));
//                else


                    txtShortageWT.setValue(selrow.get('shortage'));

	              }
		      else if (btn === 'no')
                      {
                           var sm = flxDetail.getSelectionModel();
		           var selrow = sm.getSelected();
	                   flxDetail.getStore().remove(selrow);
		           flxDetail.getSelectionModel().selectAll();
		      }
                     grid_tot();

             } 
        }); 
        }       
    }

   }
});

var cmbPackingType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 100,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbPackingType',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['B','BUNDLE'],['L','LOOSE']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbFSCType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbFSCType',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','Pre Consumer Reclaimed'],['2','Post Consumer Reclaimed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){
                  fsctype = cmbFSCType.getValue();

           }
        }       
   });

var cmbTruckNo = new Ext.form.ComboBox({
        fieldLabel      : 'Vehicle Number',
        width           : 150,
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


			loadSupplierDatastore.removeAll();
			loadSupplierDatastore.load({
			url: '/SHVPM/QC/ClsQC.php',
			params: {
				task: 'loadSupplierList',
				    compcode : Gincompcode,
				    finid    : GinFinid,
				    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
                                    truckno  : cmbTruckNo.getValue(),
                                    gstFlag  : gstFlag,
			},
			callback:function()
			{

				loadTicketNoDatastore.removeAll();
				loadTicketNoDatastore.load({
				url: '/SHVPM/QC/ClsQC.php',
				params: {
					task: 'loadTicketList',
					    compcode : Gincompcode,
					    finid    : GinFinid,
					    wbdate   : Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"),
		                            truckno  : cmbTruckNo.getValue(),
                                            supcode  : loadSupplierDatastore.getAt(0).get('cust_code'),
		                            gstFlag  : gstFlag,
				},
				callback:function()
				{
		                       cmbSupplier.setRawValue(loadTicketNoDatastore.getAt(0).get('cust_ref'));
		                       cmbSupplier.setValue(loadTicketNoDatastore.getAt(0).get('cust_code'));

		                       supcode = loadTicketNoDatastore.getAt(0).get('cust_code');
		                       cmbArea.setValue(loadTicketNoDatastore.getAt(0).get('wc_area_code'));
		                       areacode = loadTicketNoDatastore.getAt(0).get('wc_area_code');
		                       unloaddate = loadTicketNoDatastore.getAt(0).get('wc_unloadingtime');
		                       txtUnloadingTime.setRawValue(loadTicketNoDatastore.getAt(0).get('wc_time'));
		                }
				});
			
                        }
			});

	   }
        }      
   });

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
					task:"loadQCEntryList",
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
                                var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"));	
                                var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtTicketDate.getValue(),"Y-m-d"));	
				var param =(compcode+fincode+entryno+fromdate+todate);

				window.open('http://10.0.0.251:8080/birt/frameset?__report=QC/RepRMQCInspection.rptdesign&__format=pdf&' + param, '_blank'); 
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
                            
                            find_qty_matching(); 


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



        	            else if ( savechk >0)
        	            {
        	                Ext.Msg.alert('qc','Ticket Qty Not tallied with Processed qty. Please check');
        	                gstSave="false";
        	            }
        	            else if ( cmbTruckNo.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('qc','Select Truck Number');
        	                gstSave="false";
        	            }
        	            else if (txttotTicketWt.getValue()==0 || txttotTicketWt .getRawValue()=="")
        	            {
        	                Ext.Msg.alert('QC','Error In Quantity');
        	                gstSave="false";
        	            }
        	            else if (txttotAcceptWt.getRawValue()=="" || txttotAcceptWt.getRawValue()==0)
        	            {
        	                Ext.Msg.alert('QC','Error In Quantity');
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

                   Ext.getCmp('save').setDisabled(true);  


                            var grnData = flxDetail.getStore().getRange();                                        
                            var grnupdData = new Array();
                            Ext.each(grnData, function (record) {
                                grnupdData.push(record.data);
                            });
                            Ext.Ajax.request({
                            url: 'TrnRMQCSave.php',
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
                                unloadtime : txtUnloadingTime.getValue(),
                                fsctype    : fsctype,
                                calcyn     : valuecalYN,

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("QC -RM Inspection Entry SAVED No.-" + obj['EntryNo']);
                                         flxDetail.getStore().removeAll();
                                         flxTicket.getStore().removeAll();
                                         flxItem.getStore().removeAll();
		

       
// 				    QCPanel.getForm().reset();
                                     RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("QC -RM Inspection Entry Not Saved! Pls Check!- " + obj['EntryNo']);                                                  
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

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 800,
                                	y           : -20,
                                    	border      : false,
                                	items: [optCalcNeed]
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
                                	x           : 0,
                                	y           : 20,
                                    	border      : false,
                                	items: [cmbTruckNo]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 400,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtUnloadingTime]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbSupplier]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 445,
                                	y           : 50,
                                    	border      : false,
                                	items: [btnRefreshSupplier]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 500,
                                	x           : 550,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtBillWT]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 500,
                                	x           : 550,
                                	y           : 75,
                                    	border      : false,
                                	items: [txtMillWT]
                            },

								{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 500,
                                	x           : 550,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtShortageWT]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbArea]
                            },



                             flxTicket,



                           {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : -5,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTicketNo]
                        },

                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 70,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblTicketWT]
                        },


                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 200,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblItem]
                        },

                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 370,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRate]
                        },


                        {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 440,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMillBoard]
                        },

                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 520,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbllifelessper]
                        },
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 600,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lbllifelessQty]
                        },

                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 680,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRejectper]
                        },
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 755,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblRejectQty]
                        },

                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 805,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMoisper]
                        },
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 100,
                            x           : 830,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMoisForPer]
                        },
                             
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 910,
                            y           : 120,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMoisForQty]
                        },
                            
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 991,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMoisper]
                        },
                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 1060,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblMoisQty]
                        },

                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 1140,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblDegradeQty]
                        },


                                                {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 120,
                            x           : 1220,
                            y           : 130,
                            defaultType : 'Label',
                            border      : false,
                            items: [lblAcceptedQty]
                        },









				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 200,
                                	x           : -15,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtTicketNo]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 53,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtTicketWt]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 120,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtItemName]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 345,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRate]
                               },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 435,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMillBoard]
                               },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 515,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtLLessPer]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 590,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtLLessQty]
                            },



			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 675,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRejectPer]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 752,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtRejectQty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 825,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMoisTotalMaterail]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 905,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMoisForQty]
                            },



				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 985,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMoisPer]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 1055,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtMoisWt]
                            },



			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 1137,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtDegradeQty ]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 1215,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtAcceptWt]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 800,
                                	x           : 0,
                                	y           : 180,
                                    	border      : false,
                                	items: [txtRemarks]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 800,
                                	x           : 0,
                                	y           : 210,
                                    	border      : false,
                                	items: [txtRemarks2]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 685,
                                	y           : 190,
                                    	border      : false,
                                	items: [lblPackingType]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 300,
                                	x           : 800,
                                	y           : 190,
                                    	border      : false,
                                	items: [lblNoofBales]
                            },
					{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 300,
                                	x           : 950,
                                	y           : 190,
                                    	border      : false,
                                	items: [lblFSC]
                            },
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 800,
                                	x           : 680,
                                	y           : 210,
                                    	border      : false,
                                	items: [cmbPackingType]
                            },

			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 800,
                                	x           : 800,
                                	y           : 210,
                                    	border      : false,
                                	items: [txtBales]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 800,
                                	x           : 900,
                                	y           : 210,
                                    	border      : false,
                                	items: [cmbFSCType]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 1150,
                                	y           : 195,
                                    	border      : false,
                                	items: [btnSubmit]
                            },
                            flxDetail,flxItem,

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 200,
                                	y           : 400,
                                    	border      : false,
                                	items: [txttotTicketWt]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 400,
                                	x           : 580,
                                	y           : 400,
                                    	border      : false,
                                	items: [txttotAcceptWt]
                            },


                ]

            },

    
        ],
    });


   function RefreshTruckNo()
   {


            loadTruckNoDatastore.removeAll();
            loadTruckNoDatastore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params: {
                    task: 'loadRMTruckList',
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

   function RefreshData()
   {
        txtRate.setValue('');
        Ext.getCmp('save').setDisabled(false);  
       flxItem.hide(); 
       gstFlag = "Add";
       cmbPackingType.setValue('L');
       flxDetail.getStore().removeAll();
       flxTicket.getStore().removeAll();
       RefreshTruckNo();
       gridedit = "false";
       supcode =0;
       chkitemcode == 0;


       txttotTicketWt.setRawValue('');
       txttotAcceptWt.setRawValue('');
       txtBillWT.setRawValue('');
       txtMillWT.setRawValue('');
       txtShortageWT.setRawValue('');

       txtTicketNo.setRawValue('');
       cmbTruckNo.setRawValue('');
       cmbArea.setRawValue('');
       cmbSupplier.setRawValue('');


       txtItemName.setRawValue('');
       cmbFSCType.setValue(2);
       fsctype = 2;   
       	Ext.getCmp('txtQCEntNo').show();
	Ext.getCmp('cmbQCEntNo').hide();

            loadEntryNoDatastore.removeAll();
            loadEntryNoDatastore.load({
                url: '/SHVPM/QC/ClsQC.php',
                params: {
                    task: 'loadQCEntryNo',
                    compcode : Gincompcode,
                    finid    : GinFinid,
                    gstFlag  : gstFlag 
                },
		callback:function()
		{
		    txtQCEntNo.setValue(loadEntryNoDatastore.getAt(0).get('qc_rm_entryno'));
		}
            });

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: '/SHVPM/QC/ClsQC.php',
		params:
		{
			task:"loadSearchItemlist",
			itemname : txtItemName.getRawValue(),
		},
        });
   }     

   var TrnRMQCWindow = new Ext.Window({
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
