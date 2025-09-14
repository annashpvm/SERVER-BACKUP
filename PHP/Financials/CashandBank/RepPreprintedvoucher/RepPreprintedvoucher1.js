Ext.onReady(function() {
    Ext.QuickTips.init();

  var GinCompcode = localStorage.getItem('acccompcode');
   var GinFinid = localStorage.getItem('accfinid');


var refno="";var refdate="";var reftamount="";var refdncn = "";var refamt="";
var refno1="";var refdate1="";var reftamount1="";var refdncn1 = "";var refamt1="";
var refno2="";var refdate2="";var reftamount2="";var refdncn2= "";var refamt2="";
var refno3="";var refdate3="";var reftamount3="";var refdncn3 = "";var refamt3="";
var refno4="";var refdate4="";var reftamount4="";var refdncn4 = "";var refamt4="";
var refno5="";var refdate5="";var reftamount5="";var refdncn5 = "";var refamt5="";
var refno6="";var refdate6="";var reftamount6="";var refdncn6 = "";var refamt6="";
var refno7="";var refdate7="";var reftamount7="";var refdncn7 = "";var refamt7="";
var refno8="";var refdate8="";var reftamount8="";var refdncn8 = "";var refamt8="";


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
        },[ 
        'recpay_ref_no',
        'recpay_ref_date', 
        'recpay_oaccref_seqno',
        'recpay_seqno',
        'recpay_amount',
        'recpay_aaccref_seqno',
        'recpay_dncn_amount'
        
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
            name: 'SeqNo',
            type: 'int',
            mapping: 'accref_seqno'
        },

        {
            name: 'VoucherNo',
            type: 'string',
            mapping: 'voucher'
        }
        ]),
        sortInfo:{
            field: 'SeqNo',
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
var dgrecord = Ext.data.Record.create([]);
var lstdetails = new Ext.grid.EditorGridPanel({
               frame: false,
                store: VoucherDetDataStore,
                sm: new Ext.grid.RowSelectionModel(),
                autoShow: true,
                stripeRows : true,
                scrollable: true,
	        menuDisabled: true,
		columnLines: true,
		border:true,
                height: 250,
                width: 950,
                x: 15,
                y: 300,
             columns: [
            {header: "recpay_ref_no", dataIndex: 'recpay_ref_no',sortable:true,width:50,align:'left'},
            {header:  "recpay_ref_date", dataIndex: 'recpay_ref_date',sortable:true,width:70,align:'left'},
            {header: "recpay_oaccref_seqno", dataIndex: 'recpay_oaccref_seqno',sortable:true,width:100,align:'left'},
            {header: "recpay_seqno", dataIndex: 'recpay_seqno',sortable:true,width:50,align:'left'},
            {header: "recpay_amount", dataIndex: 'recpay_amount',sortable:true,width:50,align:'left'},
            {header: "recpay_aaccref_seqno", dataIndex: 'recpay_aaccref_seqno',sortable:true,width:50,align:'left'},
            {header: "recpay_dncn_amount", dataIndex: 'recpay_dncn_amount',sortable:true,width:50,align:'left'},
           
               ]
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
			compcode:GinCompcode
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
        displayField:'VoucherNo',
        valueField:'SeqNo',
        hiddenName:'VoucherNo',
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
		var voucher=cmbVoucherNo.getValue(); 
                var banklen=bank.length;
                
                 prefixnew=pst_ledprefix+"P"+bank;
		//var v451 = cmbVoucherNo.getValue();

                // Ext.Msg.alert(voucher);
                PrePrintFormPanel.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbVoucherLedDetails",
                        Account:cmbBank.getValue(),
                        VoucherId:this.getValue(),
                        VoucherNo:this.getRawValue()

                    }
                });
		//Ext.Msg.alert(voucher+"</br>"+cmbBank.getValue()+"</br>"+ pst_ledprefix+"</br>"+GinFinid+"</br>"+ GinCompcode+"</br>"+cmbVoucherNo.getRawValue());
		VoucherDetDataStore.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbvoucherpreprint",
			accrefseqno:voucher,
			ledcode:cmbBank.getValue(),
			ledprefix :pst_ledprefix,
			finid 	:GinFinid ,
			compcode:GinCompcode,
			vouno:prefixnew			                      
                    }
                });
	
                        

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
        height      : 600,
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
			var v3 = pst_ledprefix;
                        var v4 =GinFinid ;
                        var v5 = GinCompcode;
			var v7 =Ext.getCmp('cmbVoucherNo').getRawValue();
                        var v6 =prefixnew;
			
			
			/*var refdate = "&refdate=" + encodeURIComponent(refdate);
			var refdate1 = "&refdate1=" + encodeURIComponent(refdate1);
			var refdate2= "&refdate2=" + encodeURIComponent(refdate2);
			var refdate3 = "&refdate3=" + encodeURIComponent(refdate3);
			var refdate4 = "&refdate4=" + encodeURIComponent(refdate4);
			var refdate5 = "&refdate5=" + encodeURIComponent(refdate5);
			var refdate6 = "&refdate6=" + encodeURIComponent(refdate6);
			var refdate7 = "&refdate7=" + encodeURIComponent(refdate7);
			var refdate8 = "&refdate8=" + encodeURIComponent(refdate8); */
			//var refno9= +refdate+reftamount+refdncn+refamt+refno1+refdate1+reftamount1+refdncn1+refamt1+refno2+refdate2+reftamount2+refdncn2+refamt2+refno3+refdate3+reftamount3+refdncn3+refamt3+refno4+refdate4+reftamount4+refdncn4+refamt4+refno5+refdate5+reftamount5+refdncn5+refamt5+refno6+refdate6+reftamount6+refdncn6+refamt6+refno7+refdate7+reftamount7+refdncn7+refamt7+refno8+refdate8+reftamount8+refdncn8+refamt8

			var sel = lstdetails.getSelectionModel().getSelections();
			
			for (var t=0; t<sel.length; t++)
			{
				Ext.Msg.alert(sel.length);
				if(t=0)
				{
				refno =  sel[t].data.recpay_ref_no;
				refdate =  sel[t].data.recpay_ref_date;
				reftamount =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn =  sel[t].data.recpay_dncn_amount;
				refamt =  sel[t].data.recpay_amount;
				}
				else if(t=1)
				{
				refno1 =  sel[t].data.recpay_ref_no;
				refdate1 =  sel[t].data.recpay_ref_date;
				reftamount1 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn1 =  sel[t].data.recpay_dncn_amount;
				refamt1 =  sel[t].data.recpay_amount;
				}
				else if(t=2)
				{
				refno2 =  sel[t].data.recpay_ref_no;
				refdate2 =  sel[t].data.recpay_ref_date;
				reftamount2 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn2 =  sel[t].data.recpay_dncn_amount;
				refamt2 =  sel[t].data.recpay_amount;
				}
				else if(t=3)
				{
				refno3 =  sel[t].data.recpay_ref_no;
				refdate3 =  sel[t].data.recpay_ref_date;
				reftamount3 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn3 =  sel[t].data.recpay_dncn_amount;
				refamt3 =  sel[t].data.recpay_amount;
				}
				else if(t=4)
				{
				refno4 =  sel[t].data.recpay_ref_no;
				refdate4 =  sel[t].data.recpay_ref_date;
				reftamount4 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn4 =  sel[t].data.recpay_dncn_amount;
				refamt4 =  sel[t].data.recpay_amount;
				}
				else if(t=5)
				{
				refno5 =  sel[t].data.recpay_ref_no;
				refdate5 =  sel[t].data.recpay_ref_date;
				reftamount5 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn5 =  sel[t].data.recpay_dncn_amount;
				refamt5 =  sel[t].data.recpay_amount;
				}
				
				else if(t=6)
				{
				refno6 =  sel[t].data.recpay_ref_no;
				refdate6 =  sel[t].data.recpay_ref_date;
				reftamount6 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn6 =  sel[t].data.recpay_dncn_amount;
				refamt6 =  sel[t].data.recpay_amount;
				}
				else if(t=7)
				{
				refno7 =  sel[t].data.recpay_ref_no;
				refdate7 =  sel[t].data.recpay_ref_date;
				reftamount7 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn7 =  sel[t].data.recpay_dncn_amount;
				refamt7 =  sel[t].data.recpay_amount;
				}
				else if(t=8)
				{
				refno8 =  sel[t].data.recpay_ref_no;
				refdate8 =  sel[t].data.recpay_ref_date;
				reftamount8 =  sel[t].data.recpay_amount + sel[t].data.recpay_dncn_amount;
				refdncn8 =  sel[t].data.recpay_dncn_amount;
				refamt8 =  sel[t].data.recpay_amount;
				}
			}

			var p1 = "&accrefseqno=" + encodeURIComponent(v1);
			var p2 = "&ledcode=" + encodeURIComponent(v2);
			var p3 = "&ledprefix=" + encodeURIComponent(v3);
			var p4 = "&finid=" + encodeURIComponent(v4);
			var p5 = "&compcode=" + encodeURIComponent(v5);
			var p6 = "&vouno=" + encodeURIComponent(v6);

			var refno = "&refno=" + encodeURIComponent(refno);
			var refno1 = "&refno1=" + encodeURIComponent(refno1);
			var refno2 = "&refno2=" + encodeURIComponent(refno2);
			var refno3 = "&refno3=" + encodeURIComponent(refno3);
			var refno4 = "&refno4=" + encodeURIComponent(refno4);
			var refno5 = "&refno5=" + encodeURIComponent(refno5);
			var refno6 = "&refno6=" + encodeURIComponent(refno6);
			var refno7 = "&refno7=" + encodeURIComponent(refno7);
			var refno8 = "&refno8=" + encodeURIComponent(refno8);
			var parm = (refno+refno1+refno2+refno3+refno4+refno5+refno6+refno7+refno8);
			//var parm = (refno+refdate+reftamount+refdncn+refamt+refno1+refdate1+reftamount1+refdncn1+refamt1+refno2+refdate2+reftamount2+refdncn2+refamt2+refno3+refdate3+reftamount3+refdncn3+refamt3+refno4+refdate4+reftamount4+refdncn4+refamt4+refno5+refdate5+reftamount5+refdncn5+refamt5+refno6+refdate6+reftamount6+refdncn6+refamt6+refno7+refdate7+reftamount7+refdncn7+refamt7+refno8+refdate8+reftamount8+refdncn8+refamt8);
 			var param = (p1+p2+p3+p4+p5+p6+parm) ;  
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepPrePrintPayVoucherPrintingWithPhone1.rptdesign' + param, '_blank'); 
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
            xtype: 'fieldset',
            title: '',
            layout : 'vbox',
            border:true,
            height:150,
            width:480,
            x: 10,
            y: 10,
            items:[
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 85,
                items: [cmbBank]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNo]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 85,
                items: [txtName]
            }
            ]
        },lstdetails
              
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
        bodyStyle:{
            "background-color":"#d7d5fa"
        },
        y      : 48,
        listeners:{
            show:function(){
                BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank'
                    }
                });
            }
        }

    });
    PrePrintWindow.show();
});

