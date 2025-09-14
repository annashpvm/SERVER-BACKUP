Ext.onReady(function() {
    Ext.QuickTips.init();

  var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var partyledcode;
var vtype="P";

var VoucherDetDataStore = new Ext.data.Store({
      id: 'VoucherDetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbvoucherpreprint"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'recpay_ref_no', type: 'int', mapping: 'recpay_ref_no'},
        {name: 'recpay_ref_date', type: 'date', mapping: 'recpay_ref_date'},
        {name: 'recpay_oaccref_seqno', type: 'int', mapping: 'recpay_oaccref_seqno'},
        {name: 'recpay_seqno', type: 'int', mapping: 'recpay_seqno'},
        {name: 'recpay_amount', type: 'float', mapping: 'recpay_amount'},
        {name: 'recpay_aaccref_seqno', type: 'int', mapping: 'recpay_aaccref_seqno'},
        {name: 'recpay_dncn_amount', type: 'float', mapping: 'recpay_dncn_amount'}
        
      ]),
      sortInfo:{field: 'recpay_aaccref_seqno', direction: "ASC"}
    });

var VoucherLedBalanceDataStore = new Ext.data.Store({
      id: 'VoucherLedBalanceDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbVoucherLedDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'led_code', type: 'int', mapping: 'led_code'}        
      ])
    });

    var BankDataStore = new Ext.data.Store({
        id: 'BankDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',
            method: 'POST'
        }),
        baseParams:{
            task: "cmbBank"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        {
            name: 'led_code',
            type: 'int',
            mapping: 'led_code'
        },

        {
            name: 'led_name',
            type: 'string',
            mapping: 'led_name'
        }
        ]),
        sortInfo:{
            field: 'led_code',
            direction: "DESC"
        }
    });
    var PrefixDataStore = new Ext.data.Store({
        id: 'PrefixDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task: "Prefixledcode"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
           'led_prefix'
        ])
    });
    var VoucherDataStore = new Ext.data.Store({
        id: 'VoucherDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',
            method: 'POST'
        }),
        baseParams:{
            task: "cmbVoucherNo"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        {
            name: 'accref_seqno',
            type: 'int',
            mapping: 'accref_seqno'
        },

        {
            name: 'voucher',
            type: 'string',
            mapping: 'voucher'
        }
        ]),
        sortInfo:{
            field: 'accref_seqno',
            direction: "DESC"
        }
    });

        var sidno='';
	var sm = new Ext.grid.CheckboxSelectionModel({
   listeners: {
       selectionchange: function(sm) {
       var selected_rows = lstdetails.getSelectionModel().getSelections();
             for(var i=0; i<selected_rows.length; i++){
             sidno=(selected_rows[i].data.id);
        }
        }
    }
});

var fm = Ext.form;
var lstdetails = new Ext.grid.EditorGridPanel({
    frame: false,
    id : lstdetails,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 110,
    width: 150,
    x: 100,
    y: 120,
    selModel: sm,
    columns: [sm,
        {header: "recpay_ref_no", dataIndex: 'recpay_ref_no',sortable:true,width:200,align:'left',hidden : true},
	{header: "recpay_ref_date", dataIndex: 'recpay_ref_date',sortable:true,width:200,align:'left',hidden : true},
	{header: "recpay_oaccref_seqno", dataIndex: 'recpay_oaccref_seqno',sortable:true,width:200,align:'left',hidden : true},
	{header: "recpay_seqno", dataIndex: 'recpay_seqno',sortable:true,width:200,align:'left',hidden : true},
	{header: "recpay_amount", dataIndex: 'recpay_amount',sortable:true,width:200,align:'left',hidden : true},
	{header: "recpay_aaccref_seqno", dataIndex: 'recpay_aaccref_seqno',sortable:true,width:200,align:'left',hidden : true},
        {header: "recpay_dncn_amount", dataIndex: 'recpay_dncn_amount',sortable:true,width:120,align:'left',
        editor: new fm.TextField({allowBlank: false})}
    ],
    store   : VoucherDetDataStore
}); 
   
    var pst_ledprefix ;
    var cmbBank = new Ext.form.ComboBox({
        id         : 'cmbBank',
        fieldLabel : 'Account Name',
        width      : 350,
        store      : BankDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Account Name',
        listeners:{
            select :function(){
                VoucherDataStore.removeAll();
		VoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbVoucherNo",
                        Account:this.getValue(),
			finid :GinFinid,
			compcode:GinCompcode,
			type:vtype
                    }
                });
		
                             PrefixDataStore.load({
                                url: '/SHVPM/Financials/clsRepFinancials.php',
                                params:
                                {
                                    task:"Prefixledcode",
                                    Accname:this.getValue(),
                                    gincompany:GinCompcode
                                },
                                callback:function(){
                                    pst_ledprefix=PrefixDataStore.getAt(0).get('led_prefix');
                                    

                                }
                            });
            }
                        
        }

    });
var prefixnew;
    var cmbVoucherNo = new Ext.form.ComboBox({
        id         : 'cmbVoucherNo',
        fieldLabel : 'Voucher No',
        width      : 150,
        store      : VoucherDataStore,
        displayField:'voucher',
        valueField:'accref_seqno',
        hiddenName:'voucher',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Voucher No',
        listeners:{
            select :function(){
                var bank=cmbVoucherNo.getRawValue();
                var banklen=bank.length;
                if (vtype=="P")
                 prefixnew=pst_ledprefix+"P"+bank;
		else
		prefixnew="CT"+bank;
//                 Ext.Msg.alert(prefixnew);
                VoucherLedBalanceDataStore.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbVoucherLedDetails",
                        Account:cmbBank.getValue(),
                        VoucherId:this.getValue(),
                        VoucherNo:prefixnew,
			gincompcode : GinCompcode
                    },
                        callback:function(){
                            var cnt=VoucherLedBalanceDataStore.getCount();
                            if(cnt>0){
                                partyledcode=VoucherLedBalanceDataStore.getAt(0).get('led_code');
//				Ext.Msg.alert(partyledcode);
                            }else{
                                Ext.Msg.alert("Alert","Ledger Details Not Found...")
                            }
                        }
        	             });
		VoucherDetDataStore.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"getvoucherpreprint",
			accrefseqno:Ext.getCmp('cmbVoucherNo').getValue(),
			ledcode:Ext.getCmp('cmbBank').getValue(),
			ledprefix :pst_ledprefix,
			finid 	:GinFinid ,
			compcode:GinCompcode,
			vouno:Ext.getCmp('cmbVoucherNo').getRawValue()
                       
                    }
                });
	Ext.Msgbox.alert("success");
                        

            }
        }

    });

    var txtName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtName',
        name        : 'led_name',
        width       :  500
    });


    var PrePrintFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Pre Printed Voucher',
        width       : 520,
        height      : 300,
        bodyStyle:{
            "background-color":"#d7d5fa"
        },
        frame       : false,
        id          : 'PrePrintFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
            root:'rows',
            totalProperty: 'results',
            id:'id'
        },['led_name']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
            {
                text: 'Refresh',
                style  : 'text-align:center;',
                tooltip: 'Refresh Details...',
                height: 40
            },'-',

            {
                text: 'View',
                style  : 'text-align:center;',
                tooltip: 'View Details...',
                height: 40,
                icon: '/Pictures/view.png',
                //fp.getForm().reset();
                listeners:{
                    click: function () {
	
                        var v1=Ext.getCmp('cmbVoucherNo').getValue();
                        var v2=Ext.getCmp('cmbBank').getValue();
                        var v8=Ext.getCmp('cmbBank').getRawValue();
			if (vtype=="P")
			var v3 = pst_ledprefix;
			else
			var v3 = "CT";
                        var v4 =GinFinid ;
                        var v5 = GinCompcode;
			var v7 =Ext.getCmp('cmbVoucherNo').getRawValue();
                        var v6 =prefixnew;
var v9=partyledcode;
			var p1 = "&accrefseqno=" + encodeURIComponent(v1);
			var p2 = "&ledcode=" + encodeURIComponent(v2);
			var p3 = "&ledprefix=" + encodeURIComponent(v3);
			var p4 = "&finid=" + encodeURIComponent(v4);
			var p5 = "&compcode=" + encodeURIComponent(v5);
			var p6 = "&vouno=" + encodeURIComponent(v6);
			var p7 = "&ledgername=" + encodeURIComponent(v8);
			var p8 = "&balledcode=" + encodeURIComponent(v9);
			var param = (p1+p2+p3+p4+p5+p6+p7+p8) ;  
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPrePrintPayVoucherPrintingWithPhoneFinal.rptdesign' + param, '_blank'); 
			//window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccrepPreprintedVoucher.rptdesign' + param, '_blank'); 
                    }
                }
            },'-',

            {
                text: 'Exit',
                style  : 'text-align:center;',
                tooltip: 'Close...',
                height: 40,
                listeners:{
                    click: function(){
                        PrePrintWindow.hide();
                    }
                }
            }
            ]

        },
        items:[
    		 {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 30,
                y       : 10,
                columns : 2,
                items: [
		     {boxLabel: 'Payment', name: 'OptType',id:'optPayment', inputValue: 2,checked:true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
			vtype="P";
 			cmbBank.setRawValue("");
			cmbVoucherNo.setRawValue("");
			VoucherDataStore.removeAll();			
                     }
                     }
                     }
                    },
		{boxLabel: 'Contra', name: 'OptType',id:'optContra', inputValue: 2,width :15,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
			vtype="CT";
			cmbBank.setRawValue("");
			cmbVoucherNo.setRawValue("");
			VoucherDataStore.removeAll();
                     }
                     }
                     }
                    }
                    
		]
		},
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 40,
                border      : false,
                labelWidth  : 85,
                items: [cmbBank]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 80,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNo]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 120,
                border      : false,
                labelWidth  : 85,
                items: [txtName]
            }
            ]
       // }
              
       // ]
    });



    var PrePrintWindow = new Ext.Window({
        height      : 300,
        width       : 520,
        items       : PrePrintFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{
            "background-color":"#d7d5fa"
        },
        y      : 48,
        listeners:{
            show:function(){
                BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:GinCompcode
                    }
                });
            }
        }

    });
    PrePrintWindow.show();
});

/* Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('acccompcode');
var ginfinid = localStorage.getItem('accfinid');
 var pst_ledprefix;
 
 var BankDataStore = new Ext.data.Store({
      id: 'BankDataStore',
      proxy: new Ext.data.HttpProxy({
               url: '/SHVPM/Financials/clsRepFinancials.php',
                method: 'POST'
            }),
            baseParams:{task: "cmbBank"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_code', direction: "DESC"}
    });

var PrefixDataStore = new Ext.data.Store({
        id: 'PrefixDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task: "Prefixledcode"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        'led_prefix'
        ])
    });

var VounoDataStore = new Ext.data.Store({
      id: 'VounoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "preprintvouno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'accref_seqno', type: 'int', mapping: 'accref_seqno'},
        {name: 'accref_vouno', type: 'string', mapping: 'accref_vouno'}
      ]),
      sortInfo:{field: 'accref_seqno', direction: "DESC"}
    });



var cmbBank = new Ext.form.ComboBox({
        id         : 'cmbBank',
        fieldLabel : 'Account Name',
        width      : 350,
        store      : BankDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Account Name',
         listeners:{
           /* select:function(){
                  PrefixDataStore.load({
                        url:'/SHVPM/Financials/clsRepFinancials.php',
                        params:{
                            task:'Prefixledcode',
                            Accname:this.getValue(),
                            gincompany:GinCompcode
                        },
                        callback:function(){
                            pst_ledprefix=PrefixDataStore.getAt(0).get('led_prefix');
				VounoDataStore.load({
		                url:'/SHVPM/Financials/clsRepFinancials.php',
		                params:{
		                task		:	'preprintvouno',
		                ledcode		:	cmbBank.getValue(),
				ledprefix	:	pst_ledprefix,
				compcode 	: 	GinCompcode,
		                finid		:	ginfinid
		                }
		              });
                        }
                    });
} 
}

    });

var cmbVoucherNo = new Ext.form.ComboBox({
        id         : 'cmbVoucherNo',
        fieldLabel : 'Voucher No',
        width      : 150,
        store      : VoucherDataStore,
        displayField:'VoucherNo',
        valueField:'SeqNo',
        hiddenName:'VoucherNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Voucher No'
});

var txtName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtName',
        name        : 'led_name',
        width       :  500
    });


var PrePrintFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Pre Printed Voucher',
        width       : 520,
        height      : 300,
        bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'PrePrintFormPanel',
        method      : 'post',
        layout      : 'absolute',
       reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['led_name']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            PrePrintWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:150,
                width:480,
               // layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 85,
                items: [cmbBank]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNo]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 85,
                items: [txtName]
                }
                ]
              }
              
              ]
               });



     var PrePrintWindow = new Ext.Window({
        height      : 300,
        width       : 520,
        items       : PrePrintFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        x      : 45,
        y      : 48


    });
       PrePrintWindow.show();
}); */
