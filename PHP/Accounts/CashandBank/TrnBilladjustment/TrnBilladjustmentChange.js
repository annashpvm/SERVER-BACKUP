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

const formatter = new Intl.NumberFormat('en-IN', {
//  style: 'currency',
  currency: 'inr',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
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
            baseParams:{task:"loadVouNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'accref_seqno', 'voudate', 'accref_voudate', 'accref_vouno', 'acctran_totamt', 'ref_invno', 'ref_invdate', 'ref_adjamount'
      ]),
    });



 var loadVoucherDetailDatastore = new Ext.data.Store({
      id: 'loadVoucherDetailDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBillAdjustments.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'accref_seqno', 'ref_adjseqno', 'acctrail_inv_no', 'acctrail_inv_date','invdate','ref_paymt_terms', 'acctrail_inv_value', 'pendingamt', 'ref_adjamount','accref_vouno','accref_vou_type'
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




    var cmbVoucherList = new Ext.form.ComboBox({
        fieldLabel: 'Voucher Type',
        width: 100,
        store: loadVoucherTypeListDataStore,
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

            loadVoucherDetailDatastore.removeAll();
	    loadVoucherListDatastore.removeAll();
	    loadVoucherListDatastore.load({
	        url: 'ClsBillAdjustments.php',
	        params:
	                {
	                    task: "loadVouNoList",
                            fincode : GinFinid,
                            compcode: GinCompcode,
                            ledcode : ledgercode , 
                            voutype : cmbVoucherList.getValue(), 
	                },
	        callback: function () {
	 	var cnt = loadVoucherListDatastore.getCount();

	        }
	    }); 

	}
}

 var flxVoucherList = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 1000,
        x: 10,
        y: 65,
        id: 'my-grid2',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Seq NO.", dataIndex: 'accref_seqno',sortable:true,width:100,align:'center',hidden : false},   
		{header: "Vou. Date  ", dataIndex: 'voudate',sortable:true,width:110,align:'center'},
		{header: "Vou. Date  ", dataIndex: 'accref_voudate',sortable:true,width:110,align:'center',hidden : true},
		{header: "Voucher NO.", dataIndex: 'accref_vouno',sortable:true,width:100,align:'center'},   
		{header: "Amount", dataIndex: 'acctran_totamt',sortable:true,width:120,align:'right',
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
		{header: "Inv NO.", dataIndex: 'ref_invno',sortable:true,width:130,align:'center',hidden : false},   
		{header: "Inv. Date  ", dataIndex: 'ref_invdate',sortable:true,width:110,align:'center'},
		{header: "Adj. Amount AS  ", dataIndex: 'ref_adjamount',sortable:true,width:120,align:'right',}



        ],
        store:loadVoucherListDatastore,

        listeners:{	
 
           'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
	            var sm = flxVoucherList.getSelectionModel();
	            var selrow = sm.getSelected();
	            vouseqno =  Number(selrow.get('accref_seqno')); 

                    txtVouNo.setRawValue(selrow.get('accref_vouno'));
                    txtVouDate.setRawValue(selrow.get('accref_voudate'));
                    txtInvNo.setRawValue(selrow.get('ref_invno'));

             
	    loadVoucherDetailDatastore.removeAll();
	    loadVoucherDetailDatastore.load({
	        url: 'ClsBillAdjustments.php',
	        params:
	                {
	                    task: "loadVouNoDetail",
                            fincode : GinFinid,
                            compcode: GinCompcode,
                            seqno   : vouseqno , 

	                },
	        callback: function () {

			var sm = flxAdjdocDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var rownum = flxAdjdocDetail.store.indexOf(selrow);
			var rcnt = flxAdjdocDetail.getStore().getCount();
			for (var i=0;i<rcnt;i++){
			    var rec = flxAdjdocDetail.getStore().getAt(i);
                            rec.set('newadjusted',rec.get('ref_adjamount'));
	
			}
		}

	    }); 
                },

    
   }
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
        width: 1000,
        x: 10,
        y: 360,
        id: 'my-grid',  

        columns: [         
            {header: "BR SeqNO", dataIndex: 'accref_seqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Adj SeqNO", dataIndex: 'ref_adjseqno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Inv. No.", dataIndex: 'acctrail_inv_no',sortable:true,width:140,align:'center'},
            {header: "Date", dataIndex: 'acctrail_inv_date',sortable:true,width:110,align:'center',hidden : true},
            {header: "Date", dataIndex: 'invdate',sortable:true,width:110,align:'center'},
            {header: "PayTerms", dataIndex: 'ref_paymt_terms',sortable:true,width:110,align:'center'},

            {header: "Inv Amt", dataIndex: 'acctrail_inv_value',sortable:true,width:120,align:'right' },
            {header: "Pending Amt", dataIndex: 'pendingamt',sortable:true,width:120,align:'right' },
            {header: "Adjusted Amt", dataIndex: 'ref_adjamount',sortable:true,width:120,align:'right'},
            {header: "Change Adj Amt", dataIndex: 'newadjusted',sortable:true,width:130,align:'right',
                editor: {
                    xtype:'numberfield',
                    allowBlank:true,
                    enableKeyEvents: true,
                    listeners:{
                        focus:function(){

                        },
                        blur:function(){
                        },
                        keyup: function(){
                            var sm = flxAdjdocDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var pendingamt=0;
                            invamt = Number(selrow.get('acctrail_inv_value'));
                            if (Number(this.getRawValue())>Number(invamt)){
                                Ext.MessageBox.alert("Bill Adjustment","Adjusted amount cannot be greater than Invoice amount");
                                this.setValue("");
                                selrow.set('newadjusted',"");
                                CalcSum();
                            }

                        }
                    }
                },
                listeners: {
                    click: function(){
                        UpdateReceiptBillsAdjusted();
                    }
                }
            },
            {header: "Adj NO", dataIndex: 'accref_vouno',sortable:true,width:110,align:'left',hidden : true},
            {header: "Adj Voutype", dataIndex: 'accref_vou_type',sortable:true,width:110,align:'left',hidden : true},
        ],
        store:loadVoucherDetailDatastore,
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


    var txtVouNo = new Ext.form.TextField({
        fieldLabel  : 'Voucher No.',
        id          : 'txtVouNo',
        width       : 120,
        name        : 'txtVouNo',
        readOnly    : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    });
    


    
	var txtVouDate= new Ext.form.DateField({
	     fieldLabel: 'Voucher Date.',
	     id: 'txtVouDate',
	     name: 'txtVouDate',
	     format: 'd-m-Y',
	     value: new Date(),
	     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
             readOnly    : true
	 });

    var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv. No.',
        id          : 'txtInvNo',
        width       : 150,
        name        : 'txtInvNo',
        readOnly    : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                        var rcnt = flxAdjdocDetail.getStore().getCount();
                        if(rcnt<=0){
                            Ext.MessageBox.alert("Bill Adjustment","No bills adjusted..");
                        }else if (ledgercode  == 0){
                            Ext.MessageBox.alert("Bill Adjustment","Select the Partyname");
                        }else{
                            Ext.Msg.show({
                                title: 'Bill Adjustment',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Update Bills?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accadjData = flxAdjdocDetail.getStore().getRange();
                                        var accadjupdData = new Array();
                                        Ext.each(accadjData, function (record) {
                                            accadjupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnBilladjustmentChangeSave.php',
                                            params:{
                                                gridadjdet: Ext.util.JSON.encode(accadjupdData),
                                                adjcnt:accadjData.length,   
                                                finid:GinFinid,
                                                compcode:GinCompcode,
                                                vouseqno :vouseqno,
                                                vouno    :txtVouNo.getRawValue(),
		                                voudate  : Ext.util.Format.date(txtVouDate.getRawValue(),"Y-m-d"),
                                                ledgercode :ledgercode,

                
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
//                                                        window.location.reload();
                                                        Ext.Msg.show({
                                                        title: 'Bill Adjustment',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Bills adjusted successfully',
                                                        fn: function(btn){
                                                            if (btn == 'yes'){
                                                  		 flxAdjdocDetail.getStore().removeAll();
                                                                  txtNarration.setRawValue('');
                                                                  txtTotadjamt.setValue('');
                                                                  txtAmount.setValue('');
//                                                                window.location.reload();

                                                            }else{
                                                  		 flxAdjdocDetail.getStore().removeAll();
                                                                  txtNarration.setRawValue('');
                                                                  txtTotadjamt.setValue('');
                                                                  txtAmount.setValue('');
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
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 120,
                                width: 550,
                                x: 700,
                                y: 20,
                                border: false,
                                items: [cmbVoucherList]
                            }, 

                          {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 550,
                                x: 10,
                                y: 320,
                                border: false,
                                items: [txtVouNo]
                            },

                          {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 110,
                                width: 550,
                                x: 300,
                                y: 320,
                                border: false,
                                items: [txtVouDate]
                            },

                          {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 550,
                                x: 550,
                                y: 320,
                                border: false,
                                items: [txtInvNo]
                            }

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



