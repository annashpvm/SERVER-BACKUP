Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gsttype='R';
    var GinFinid=localStorage.getItem('ginfinid');
    var gstfinyear=localStorage.getItem('gstyear');
    var GinCompcode =localStorage.getItem('gincompcode');

    var usertype = localStorage.getItem('ginuser');
    var UserName = localStorage.getItem('ginusername');
    var UserId   = localStorage.getItem('ginuserid');



    var dgadjrecord = Ext.data.Record.create([]);
    var gstfin='';



var ledgercode = 0;
var ledtype    = '';
var partycode  = 0;

var vouchertype = 'BKR';
var vouseqno = 0;
var voudrcr = 'D';
const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}); 



var startDate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'startDate',
	    format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date(),
        enableKeyEvents: true,
        listeners:{

            }              
    });



    var endDate = new Ext.form.DateField({
        fieldLabel: 'To Date',
        id: 'endDate',
        labelStyle: "font-size:14px;font-weight:bold;color:#fc9403",
        format: 'd-m-Y',
        value: new Date(),

    
        listeners: {
            specialkey:function(f,e){
                if (e.getKey() == e.ENTER){
                    callvounolist();
                }
            },
            blur:function(){
                callvounolist();
            }
        }
    });    

 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_type'
      ]),
    });



 var loadVoucherListDatastore = new Ext.data.Store({
      id: 'loadVoucherListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoListPeriod"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'accref_seqno', 'voudate', 'accref_voudate', 'accref_vouno','acctrail_inv_no', 'acctrail_inv_value','balamt', 'ref_invno', 'ref_invdate', 'ref_adjamount','acctrail_amtmode'
      ]),
    });



 var loadVoucherAdjustedDetailsDatastore = new Ext.data.Store({
      id: 'loadVoucherAdjustedDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouAdjustedList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'ref_slno' , 'ref_docseqno', 'ref_docno','ref_docdate','ref_adjseqno', 'acctrail_inv_no', 'acctrail_inv_date','invdate','ref_paymt_terms', 'acctrail_inv_value', 'pendingamt', 'ref_adjamount','accref_vouno','accref_vou_type' ,'ref_adjvouno','ref_adjvoudate','acctrail_amtmode','mdrcr','adrcr'
      ]),
    });


 var loadVoucherTypeListDataStore = new Ext.data.Store({
      id: 'loadVoucherTypeListDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouTypeList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'accref_vou_type'
      ]),
    });


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsBillAdjustments.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}


function  callvounolist()
{
    loadVoucherAdjustedDetailsDatastore.removeAll();
    loadVoucherListDatastore.removeAll();
    loadVoucherListDatastore.load({
        url: 'ClsBillAdjustments.php',
        params:
                {
                    task: "loadVouNoListPeriod",
                        fincode   : GinFinid,
                        compcode  : GinCompcode,
                        ledcode   : ledgercode , 
                        voutype   : cmbVoucherList.getValue(), 
                        startdate : Ext.util.Format.date(startDate.getValue(),"Y-m-d"), 
                        enddate   : Ext.util.Format.date(endDate.getValue(),"Y-m-d"),                                
                },
        callback: function () {
               var cnt = loadVoucherListDatastore.getCount();
        }
    });
}



    var cmbVoucherList = new Ext.form.ComboBox({
        fieldLabel: 'Voucher Type',
        width: 100,
   //     store: loadVoucherTypeListDataStore,
        store: ['BKR','BKP','CHR','CHP','GJV','DNG','DNN','CNG'],
        displayField: 'accref_vou_type',
        valueField: 'accref_vou_type',
        hiddenName: 'accref_vou_type',
        id: 'cmbVoucherList',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function(){
                callvounolist();
            } 
        }
    });
function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){

            ledgercode = selrow.get('cust_code');
            ledtype    = selrow.get('cust_type');
            partycode  = selrow.get('cust_code');
	    txtAccountName.setValue(selrow.get('cust_name'));
	    flxLedger.hide();  


	}
}


function grid_tot(){



}

var sm = new Ext.grid.CheckboxSelectionModel({
    singleSelect: false
});


sm.on('selectionchange', function(sm) {

    var selected = sm.getSelections();

    if (selected.length === 0) {
        loadVoucherAdjustedDetailsDatastore.removeAll();
        loadVoucherAdjustedDetailsDatastore.baseParams = {};
        grid_tot();
        return;
    }

    var seqnos = [];


    for (var i = 0; i < selected.length; i++) {
        seqnos.push(selected[i].get('accref_seqno'));
    }


    var voudrcrArr = selected[0].get('acctrail_amtmode');
    if (cmbVoucherList.getValue() == "DNG" || cmbVoucherList.getValue() == "DNN")
        voudrcrArr = 'D';




    loadVoucherAdjustedDetailsDatastore.removeAll();
    loadVoucherAdjustedDetailsDatastore.load({
        url: 'ClsBillAdjustments.php',
        params: {
            task: "loadVouAdjustedList",
            fincode : GinFinid,
            compcode: GinCompcode,
            seqnos  : seqnos.join(','),
            voudrcr : voudrcrArr,
            ledcode : ledgercode
        },
        callback: function () {

            var rcnt = flxAdjdocDetail.getStore().getCount();

            for (var i = 0; i < rcnt; i++) {
                var rec = flxAdjdocDetail.getStore().getAt(i);
                rec.set('newadjusted', rec.get('ref_adjamount'));
            }

            grid_tot();
        }
    });
});


 var flxVoucherList = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: sm,
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1100,
        x: 10,
        y: 100,
        id: 'my-grid2',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [ sm,
		{header: "Seq NO.", dataIndex: 'accref_seqno',sortable:true,width:100,align:'center',hidden : true},   
		{header: "Vou. Date  ", dataIndex: 'voudate',sortable:true,width:110,align:'center'},
		{header: "Vou. Date  ", dataIndex: 'accref_voudate',sortable:true,width:110,align:'center',hidden : true},
		{header: "Voucher NO.", dataIndex: 'accref_vouno',sortable:true,width:140,align:'center'},   
        {header: "Amount", dataIndex: 'acctrail_inv_value',sortable:true,width:120,align:'right',
                renderer: function (val, metaData, r){
        if (val > 0) 
        { 
        return  parseFloat(val).toLocaleString('en-In', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
    //         style: 'currency',
            currency: 'INR',
            });
        }
        } 
       },
       {header: "BalAmount", dataIndex: 'balamt',sortable:true,width:0,align:'right',
            renderer: function (val, metaData, r){
            if (val > 0) 
            { 
            return  parseFloat(val).toLocaleString('en-In', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            //         style: 'currency',
                currency: 'INR',
                });
            }
            } 
        },       
		{header: "Inv NO.", dataIndex: 'acctrail_inv_no',sortable:true,width:180,align:'center',hidden : false},   
		{header: "Inv. Date  ", dataIndex: 'ref_invdate',sortable:true,width:110,align:'center'},
		{header: "Adj. Amount AS  ", dataIndex: 'ref_adjamount',sortable:true,width:140,align:'right',
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }             
        },
        {header: "Adj Type", dataIndex: 'acctrail_amtmode',sortable:true,width:110,align:'left',hidden : false},


        ],
        store:loadVoucherListDatastore,

        listeners:{	
 
                },


   });

 


function UpdateReceiptBillsAdjusted(){
        var sm = flxAdjdocDetail.getSelectionModel();
        var selrow = sm.getSelected();
        var rownum = flxAdjdocDetail.store.indexOf(selrow);
        var rcnt = flxAdjdocDetail.getStore().getCount();

    }
    

    var flxAdjdocDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 1100,
        x: 10,
        y: 360,
        id: 'my-grid',  

        columns: [         
            {header: "Adj SlNO", dataIndex: 'ref_slno',sortable:true,width:110,align:'left',hidden : true},
            {header: "BR SeqNO", dataIndex: 'ref_docseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Adj SeqNO", dataIndex: 'ref_adjseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Vou. No.", dataIndex: 'ref_docno',sortable:true,width:140,align:'center',hidden : false},
            {header: "VouDate", dataIndex: 'ref_docdate',sortable:true,width:120,align:'center',hidden : false},            
            {header: "Inv. No.", dataIndex: 'acctrail_inv_no',sortable:true,width:180,align:'center'},
            {header: "Date", dataIndex: 'acctrail_inv_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:110,align:'center'},
            {header: "PayTerms", dataIndex: 'ref_paymt_terms',sortable:true,width:110,align:'center'},

            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:120,align:'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    } 
             },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:120,align:'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    } 
             },
            {header: "Adjusted Amt", dataIndex: 'ref_adjamount',sortable:true,width:120,align:'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    } 
            },

            {header: "Adj NO", dataIndex: 'accref_vouno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Adj Voutype", dataIndex: 'accref_vou_type',sortable:true,width:110,align:'left',hidden : true},
            {header: "MDrCr", dataIndex: 'mdrcr',sortable:true,width:110,align:'left',hidden : true},
            {header: "ADrCr", dataIndex: 'adrcr',sortable:true,width:110,align:'left',hidden : true},

        ],
        store:loadVoucherAdjustedDetailsDatastore,
    });
    


 var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 450,
        id : flxLedger,
        x: 100,
        y: 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:50,align:'left'},



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
                   'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                          grid_chk_flxLedger();

                },

    
   }
   });




 
var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Account Name',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ESC)
             {
                flxLedger.hide();
             }
             if (e.getKey() == e.ENTER)
             {
                cmbVoucherList.focus;
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
             if (e.getKey() == e.UP)
             {
 
              txtAccountName.focus;
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                flxLedger.getEl().setStyle('z-index','10000');
                flxLedger.show();
                loadSearchLedgerListDatastore.removeAll();
                  if (txtAccountName.getRawValue() != '')
                     LedgerSearch();
            }
         }  
    });


    
    var BillAdjustmentEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bill Adjustment Entry',
        header      : false,
        width       : 600,
        height      : 280,           bodyStyle: {"background-color": "#fff0ff"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'BillAdjustmentEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',    bodyStyle:{
			"background-color":"#3399CC"
		    },
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
//save
                    text: 'Remove Bills Settled',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                        var rcnt = flxAdjdocDetail.getStore().getCount();
                        if(rcnt<=0){
                            Ext.MessageBox.alert("Bill Adjustment","No bills adjusted..");
                        }else if (ledgercode  == 0){
                            Ext.MessageBox.alert("Bill Adjustment","Select the Partyname");
                         }else
                        
                        {
                            Ext.Msg.show({
                                title: 'Bill Adjustment',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Confirm - Do you want Reverse Bills Adjustments ?',
                                fn: function(btn){
                                    if (btn == 'yes'){


                                        var selectedRecords = flxVoucherList.getSelectionModel().getSelections();

                                        var accupdData = [];

                                        Ext.each(selectedRecords, function(record) {
                                        accupdData.push(record.data);
                                        });

                                        
                                        var accadjData = flxAdjdocDetail.getStore().getRange();
                                        var accadjupdData = new Array();
                                        Ext.each(accadjData, function (record) {
                                            accadjupdData.push(record.data);
                                        });


                                        Ext.Ajax.request({
                                            url: 'FrmTrnBilladjustmentREVERSALSave.php',
                                            params:{

                                                griddet      : Ext.util.JSON.encode(accupdData),
                                                cnt          : accupdData.length,                                                   
                                                gridadjdet   : Ext.util.JSON.encode(accadjupdData),
                                                adjcnt       : accadjData.length,   

                                                finid        : GinFinid,
                                                compcode     : GinCompcode,
//                                                vouseqno     : vouseqno,
                                                ledgercode   : ledgercode,
//                                                voudrcr      : voudrcr,

                
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
//                                                        window.location.reload();
                                                        Ext.Msg.show({
                                                        title: 'Bill Adjustment',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.OK,
                                                        msg: 'Bills adjusted Reversed successfully',
                                                        fn: function(btn){
                                                            if (btn == 'ok'){
                                                  		          flxAdjdocDetail.getStore().removeAll();
                                                                  flxVoucherList.getStore().removeAll();
                                                                 //txtNarration.setRawValue('');

                                                                  callvounolist();
//                                                                window.location.reload();

                                                            }else{
                                                  		          flxAdjdocDetail.getStore().removeAll();

//                                                                window.location.reload();
                                                            }
                                                        }
                                                        });
                                                }else{
                                               Ext.MessageBox.alert( " Error - Bills not adjusted  ");   
                                                       
                                                }
                                            }
                                       });
                                    }
                                }
                            });
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
                    listeners:{
                        click: function(){
                            BillAdjustmentEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
                         {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 550,
                                x: 0,
                                y: 20,
                                border: false,
                                items: [txtAccountName]
                            }, flxVoucherList,flxAdjdocDetail,flxLedger,




                            { 
                                xtype   : 'fieldset',
                                title   : '',
                                labelWidth  : 120,
                                border  : false,
                                x       : 0,
                                y       : 50,
                                items: [startDate]
                            },
                            { 
                                xtype   : 'fieldset',
                                title   : '',
                                labelWidth  : 70,
                                border  : false,
                                x       : 300,
                                y       : 50,
                                items: [endDate]
                            },


                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 550,
                                x: 700,
                                y: 50,
                                border: false,
                                items: [cmbVoucherList]
                            }, 


                                                  

            ]

    });
    
    
    function RefreshData(){
        gstFlag = "Add";
        flxLedger.hide(); 
        flxVoucherList.getStore().removeAll();
        flxAdjdocDetail.getStore().removeAll();
    }
    
    var BillAdjustmentEntryWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'Bill Adjustment Entry',
        items       : BillAdjustmentEntryFormPanel,
        layout      : 'fit',    bodyStyle:{
        "background-color":"#3399CC"
    },
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
        listeners:
            {
                show:function(){
                 RefreshData();
                 cmbVoucherList.setValue('BKR')
                }
            }
    });
    BillAdjustmentEntryWindow.show();  
});



