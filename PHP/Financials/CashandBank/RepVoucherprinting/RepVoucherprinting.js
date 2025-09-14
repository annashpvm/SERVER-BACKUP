 Ext.onReady(function() {
    Ext.QuickTips.init();
    var gstoption = "R";

    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gincompcode = localStorage.getItem('gincompcode');

var partyledcode;
var lprefix;

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

    var BankDataStore = new Ext.data.Store({
        id: 'BankDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',
            method: 'POST'
        }),
        baseParams:{
            task: "cmbBank",
			compcode:gincompcode,
			gstopt : gstoption
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
        },
        {
            name: 'led_prefix',
            type: 'string',
            mapping: 'led_prefix'
        },
        
        ]),

    });

    var ReceiptledDataStore = new Ext.data.Store({
        id: 'ReceiptledDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',
            method: 'POST'
        }),
        baseParams:{
            task: "cmbrecled"
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

    var PVoucherDataStore = new Ext.data.Store({
        id: 'PVoucherDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task: "cmbPayVouNo"
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
            mapping: 'accref_vouno'
        }
        ],

        ),
           /*     sortInfo:{
            field: 'SeqNo',
            direction: "DESC"
        },*/

    });
    var TypeVoucherDataStore = new Ext.data.Store({
        id: 'TypeVoucherDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task: "cmbTypeVouNo"
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
            mapping: 'accref_vouno'
        }
        ])
    });
    var VoucherDataStore = new Ext.data.Store({
        id: 'VoucherDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php',
            method: 'POST'
        }),
        baseParams:{
            task: "cmbRVoucherNo"
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
            mapping: 'accref_vouno'
        }
        ]),
       /* sortInfo:{
            field: 'SeqNo',
            direction: "DESC"
        }*/
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
		// Ext.Msg.alert(this.getValue() + "/" + ginfinid + "/" + gincompcode);
                VoucherDataStore.removeAll();
                VoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbRVoucherNo",
                        Account:this.getValue(),
			finid:ginfinid,
			compcode:gincompcode
                    }
                });
		
		PVoucherDataStore.removeAll();
                PVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbPayVouNo",
                        Account:this.getValue(),
			finid:ginfinid,
			compcode:gincompcode
                    }
                });


				PrefixDataStore.load({
                                url: '/SHVPM/Financials/clsRepFinancials.php',
                                params:
                                {
                                    task:"Prefixledcode",
                                    Accname:this.getValue(),
                                    gincompany:gincompcode
                                },
                                callback:function(){
                                    pst_ledprefix=PrefixDataStore.getAt(0).get('led_prefix');
//                                    Ext.Msg.alert(pst_ledprefix);
                                }
                            });
                             
            }
                        
        }

    });
var prefixnew;
    var cmbVoucherFNo = new Ext.form.ComboBox({
        id         : 'cmbVoucherFNo',
        fieldLabel : 'From ',
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
	
    var cmbVoucherTNo = new Ext.form.ComboBox({
        id         : 'cmbVoucherTNo',
        fieldLabel : 'To ',
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

     var cmbVoucherNo = new Ext.form.ComboBox({
        id         : 'cmbVoucherNo',
        fieldLabel : 'VoucherNo1 ',
        width      : 150,
        store      : PVoucherDataStore, 
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
//                var banklen=bank.length;
                
//                 prefixnew=pst_ledprefix+"P"+bank;
                 prefixnew=pst_ledprefix+"P";
//                 Ext.Msg.alert(this.getValue());
                VoucherLedBalanceDataStore.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbVoucherLedDetails",
                        Account:cmbBank.getValue(),
                        VoucherId:this.getValue(),
                        VoucherNo:bank,
			gincompcode : gincompcode
                    },
                        callback:function(){
                            var cnt=VoucherLedBalanceDataStore.getCount();
                            if(cnt>0){
                                partyledcode=VoucherLedBalanceDataStore.getAt(0).get('led_code');
//				Ext.Msg.alert(partyledcode);
                            }else{
//                                Ext.Msg.alert("Alert","Ledger Details Not Found...")
                            }
                        }
        	             });
		           

            }
        }

    });
    
     var cmbVoucherNoT = new Ext.form.ComboBox({
        id         : 'cmbVoucherNoT',
        fieldLabel : 'VoucherNo2 ',
        width      : 150,
        store      : PVoucherDataStore, 
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
//                var banklen=bank.length;
                
//                 prefixnew=pst_ledprefix+"P"+bank;
                 prefixnew=pst_ledprefix+"P";
//                 Ext.Msg.alert(this.getValue());
                VoucherLedBalanceDataStore.load
                (
                {
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbVoucherLedDetails",
                        Account:cmbBank.getValue(),
                        VoucherId:this.getValue(),
                        VoucherNo:bank,
			gincompcode : gincompcode
                    },
                        callback:function(){
                            var cnt=VoucherLedBalanceDataStore.getCount();
                            if(cnt>0){
                                partyledcode=VoucherLedBalanceDataStore.getAt(0).get('led_code');
//				Ext.Msg.alert(partyledcode);
                            }else{
//                                Ext.Msg.alert("Alert","Ledger Details Not Found...")
                            }
                        }
        	             });
		           

            }
        }

    });    

     var cmbTVoucherNo = new Ext.form.ComboBox({
        id         : 'cmbTVoucherNo',
        fieldLabel : 'VoucherNo 3',
        width      : 150,
        store      : TypeVoucherDataStore,
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
    var cmbFVoucherNo = new Ext.form.ComboBox({
        id         : 'cmbFVoucherNo',
        fieldLabel : 'VoucherNo4 ',
        width      : 150,
        store      : TypeVoucherDataStore,
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


    var VoucherPrintFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Voucher Printing',
        width       : 750,
        height      : 550,
        bodyStyle:{
            "background-color":"#d7d5fa"
        },
        frame       : false,
        id          : 'VoucherPrintFormPanel',
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
	
			

                        var v1=Ext.getCmp('cmbVoucherFNo').getValue();
                        var v2=Ext.getCmp('cmbVoucherTNo').getValue();
                        var v8=Ext.getCmp('cmbVoucherNo').getValue();
                        var v9=cmbTVoucherNo.getValue();//Ext.getCmp('cmbTVoucherNo').getValue();
                        var v10=Ext.getCmp('cmbVoucherNoT').getValue();
			var v3 = ginfinid;

			if (Ext.getCmp('cmbBank').getRawValue()=="CASH ON HAND")
			var v4="CR";
			else if (Ext.getCmp('cmbBank').getRawValue()=="HO - CASH ON HAND")
			var v4="MR";
			else
                        var v4 ="BR" ;
                        

                        var v5 = gincompcode;
			var v7 =Ext.getCmp('cmbVoucherNo').getRawValue();
                        var v6 =prefixnew;

			if (gstoption === "R")
			{
				var p1 = "&vounofrom=" + encodeURIComponent(v1);
				var p2 = "&vounoto=" + encodeURIComponent(v2);
				var p1 = "&VounoF=" + encodeURIComponent(v1);
				var p2 = "&VounoT=" + encodeURIComponent(v2);
			}
			else if (gstoption === "P")
			{
				var p1 = "&vounofrom=" + encodeURIComponent(v8);
				var p2 = "&vounoto=" + encodeURIComponent(v10);
				var p1 = "&VounoF=" + encodeURIComponent(v8);
				var p2 = "&VounoT=" + encodeURIComponent(v10);
				if (Ext.getCmp('cmbBank').getRawValue()=="CASH ON HAND")
					var v4="CP";

				else
                        		var v4 ="BP" ;
				//var v4 ="BP" ;
			}
//			else if (gstoption === "E" ||  gstoption === "PS"  ||  gstoption === "PS")
			//{
//				var p1 = "&vounofrom=" + encodeURIComponent(v9);
//				var p2 = "&vounoto=" + encodeURIComponent(v9);
			//}
			else 
			{
				var p1 = "&vounofrom=" + encodeURIComponent(v9);
				var p2 = "&vounoto=" + encodeURIComponent(v9);
			}
			var p3 = "&finid=" + encodeURIComponent(v3);
			var p4 = "&type=" + encodeURIComponent(v4);
			var p5 = "&compcode=" + encodeURIComponent(v5);
			var p6 = "&balledcode=" + encodeURIComponent(partyledcode);
			var param = (p1+p2+p3+p4+p5) ;

/*if (gstoption === "R")
{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepReceiptVoucherPrint.rptdesign' + param, '_blank'); 
}
else if (gstoption === "P")
{

var p3 = "&finid=" + encodeURIComponent(v3);
var p4 = "&type=" + encodeURIComponent(v6);
var p5 = "&compcode=" + encodeURIComponent(v5);
var p6 = "&balledcode=" + encodeURIComponent(partyledcode);
var param = (p1+p2+p3+p4+p5) ;

window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepReceiptVoucherPrint.rptdesign' + param, '_blank'); 
}			// window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepReceiptVoucherPrintCash.rptdesign' + param, '_blank'); 
			else if (gstoption === "E")
{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPlainVoucPrintingExNew.rptdesign' + param, '_blank'); 
}
			else if (gstoption === "J") 
{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPlainVoucPrintingJVNew.rptdesign' + param, '_blank'); 
}
			else if (gstoption === "C") 
{*/


if (gstoption == "R"  ||  gstoption === "P" )
{
   //window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPlainVoucPrintingJVNew.rptdesign' + param, '_blank');
   
   //var p1 = "&VounoF=" + encodeURIComponent(v1);
   //var p2 = "&VounoT=" + encodeURIComponent(v2);
   var p3 = "&finid=" + encodeURIComponent(v3);
   var p4 = "&acctype=" + encodeURIComponent(v4);
   var p5 = "&compcode=" + encodeURIComponent(v5);
   var p6 = "&lprefix=" + encodeURIComponent(pst_ledprefix);
   var param = (p1+p2+p3+p4+p5+p6) ;
   window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccReceiptVoucher.rptdesign' + param, '_blank');  

}
else if (gstoption == "DW"){
	var v9=Ext.getCmp('cmbTVoucherNo').getRawValue();
	var p6 = "&dnno=" + encodeURIComponent(v9);
	var param = (p1+p2+p3+p4+p5+p6) ;

	window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccDebitnoteWP.rptdesign' + param, '_blank'); 
	
	}
else
{
	
	
	
	window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepVoucherprint.rptdesign' + param, '_blank'); 
   	
}

/*}
			else 
			{
			var param = (p1+p2+p3+p4+p5+p6) ;
			window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPlainVoucPrintingNew.rptdesign' + param, '_blank'); 
			}*/
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
                        VoucherPrintWindow.hide();
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
            height:750,
            width:600,
            x: 10,
            y: 30,
            items:[
		 {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns : 5,
                items: [
		     {boxLabel: 'Receipt', name: 'OptType', id:'optReceipt',inputValue: 1,checked: true,
                    	listeners:{
                    		'check':function(rb,checked){
                     			if(checked==true){
						 gstoption="R";
						 cmbVoucherFNo.show();
						 cmbVoucherTNo.show();
						 cmbVoucherNo.hide();
				 		 cmbTVoucherNo.hide();
				 		 cmbFVoucherNo.hide();
				 		 cmbVoucherNoT.hide();
						BankDataStore.removeAll();
						BankDataStore.load({
							url: '/SHVPM/Financials/clsRepFinancials.php',
							params: {
							task: 'cmbBank',
							compcode:gincompcode,
							gstopt : gstoption
							}
						});
						VoucherDataStore.removeAll();
						VoucherDataStore.load({
							url: '/SHVPM/Financials/clsRepFinancials.php',
							params:
							{
							task:"cmbRVoucherNo",
							Account:this.getValue(),
							finid:ginfinid,
							compcode:gincompcode
							}
						});
                     			}
                     		}
                     }
                    },
                    {boxLabel: 'Payment', name: 'OptType',id:'optPayment', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="P";
                        
            		 Ext.getCmp('cmbVoucherFNo').hide();
            		 Ext.getCmp('cmbVoucherTNo').hide();
			 cmbVoucherNo.show();
			 cmbVoucherNoT.show();
			BankDataStore.removeAll();
 			BankDataStore.load({
			url: '/SHVPM/Financials/clsRepFinancials.php',
			params: {
			task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
			}
			});
			PVoucherDataStore.removeAll();
			PVoucherDataStore.load({
			    url: '/SHVPM/Financials/clsRepFinancials.php',
			    params:
			    {
			        task:"cmbPayVouNo",
			        Account:this.getValue(),
				finid:ginfinid,
				compcode:gincompcode
			    }
			});
			
                     }
                     }
                     }
                    },
		{boxLabel: 'Contra', name: 'OptType',id:'optContra', inputValue: 2,width :15,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="C";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 			BankDataStore.load({
		            url: '/SHVPM/Financials/clsRepFinancials.php',
		            params: {
		                task: 'cmbBank',
				compcode:gincompcode,
				gstopt : gstoption
		            }
                	});
		    TypeVoucherDataStore.removeAll();
		            TypeVoucherDataStore.load({
		            url: '/SHVPM/Financials/clsRepFinancials.php',
		            params:
		            {
		                task:"cmbTypeVouNo",
		                Acctype:"CT",
				compcode:gincompcode,
				finid:ginfinid
		            }
                	});
                     }
                     }
                     }
                    },
		    {boxLabel: 'Journal', name: 'OptType',id:'optJournal', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="J";

			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbFVoucherNo.show();
			 cmbVoucherNo.hide();
				BankDataStore.removeAll();
				BankDataStore.load({
				url: '/SHVPM/Financials/clsRepFinancials.php',
				params: {
					task: 'cmbBank',
					compcode:gincompcode,
					gstopt : gstoption
				}
				});

				TypeVoucherDataStore.removeAll();
				TypeVoucherDataStore.load({
				url: '/SHVPM/Financials/clsRepFinancials.php',
				params:
				{
					task:"cmbTypeVouNo",
					Acctype:"JV",
					compcode : gincompcode,
					finid : ginfinid
				}
				});
                     }
                     }
                     }
                    },
		   
                 {boxLabel: 'Expense', name: 'OptType',id:'optExpense', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="E";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"EX"
                    }
                });
                     }
                     }
                     }
                    },

                 {boxLabel: 'Stores', name: 'OptType',id:'optStores', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="PS";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"PS"
                    }
                });
                     }
                     }
                     }
                    },


                 {boxLabel: 'Rawmaterial - PR', name: 'OptType',id:'optRM1', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="PR";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"PR"
                    }
                });
                     }
                     }
                     }
                    },

                 {boxLabel: 'Rawmaterial - PW', name: 'OptType',id:'optRM2', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="PW";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"PW"
                    }
                });
                     }
                     }
                     }
                    },
                    
                 {boxLabel: 'FUEL - PF', name: 'OptType',id:'optFuel1', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="PF";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"PF"
                    }
                });
                     }
                     }
                     }
                    },

                 {boxLabel: 'FUEL - PC', name: 'OptType',id:'optFuel2', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="PC";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"PC"
                    }
                });
                     }
                     }
                     }
                    },

                 {boxLabel: 'Debit Note - DN', name: 'OptType',id:'optDN1', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="DN";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"DN"
                    }
                });
                     }
                     }
                     }
                    },


                 {boxLabel: 'Debit Note - DF', name: 'OptType',id:'optDF', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="DF";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"DF"
                    }
                });
                     }
                     }
                     }
                    },



                 {boxLabel: 'WORK ORDER -GRN', name: 'OptType',id:'optWG', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="WG";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"WG"
                    }
                });
                     }
                     }
                     }
                    },


                 {boxLabel: 'OTHER SALES', name: 'OptType',id:'optOS', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="OS";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"OS"
                    }
                });
                     }
                     }
                     }
                    },



                 {boxLabel: 'FUEL SALES', name: 'OptType',id:'optFUELSAL', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="FS";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"FS"
                    }
                });
                     }
                     }
                     }
                    },




                 {boxLabel: 'WASTER PAPER SALES', name: 'OptType',id:'optRMSALEES', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="RS";
			 cmbVoucherFNo.hide();
			 cmbVoucherTNo.hide();
			 cmbTVoucherNo.show();
			 cmbVoucherNo.hide();
			BankDataStore.removeAll();
 BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"RS"
                    }
                });
                     }
                     }
                     }
                    },
                 {boxLabel: 'Debit Note - WP', name: 'OptType',id:'optDN2', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                         gstoption="DW";
						 cmbVoucherFNo.hide();
						 cmbVoucherTNo.hide();
						 cmbVoucherNo.hide();
				 		 cmbTVoucherNo.show();
				 		 cmbFVoucherNo.show();
				 		 cmbVoucherNoT.hide();
			BankDataStore.removeAll();
 			BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
			TypeVoucherDataStore.removeAll();
                    TypeVoucherDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params:
                    {
                        task:"cmbTypeVouNo",
                 	compcode:gincompcode,
          		finid : ginfinid,
                        Acctype:"DN"
                    }
                });
                     }
                     }
                     }
                    }, 
                                       

		]
		},


            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 85,
                items: [cmbBank]
            },
	   /* {
            xtype: 'fieldset',
            title: '',
            layout : 'hbox',
            border:true,
            height:60,
            width:500,
            x: 0,
            y: 60,
            items:[*/
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 55,
                items: [cmbVoucherFNo]
            },
	     
	    {
                xtype       : 'fieldset',
                title       : '',
                x           : 85,
                y           : 0,
                border      : false,
                labelWidth  : 55,
                items: [cmbVoucherTNo]
            },
	   {
                xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNo]
            },{
                xtype       : 'fieldset',
                title       : '',
                x           : 85,
                y           : 0,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNoT]
            },        
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 50,
                border      : false,
                labelWidth  : 85,
                items: [cmbTVoucherNo]
            },      
                        {
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 85,
                border      : false,
                labelWidth  : 85,
                items: [cmbFVoucherNo]
            },
	   /* ]
		},*/
	 /*   {
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 60,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNo]
            },{
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 50,
                border      : false,
                labelWidth  : 85,
                items: [cmbTVoucherNo]
            }, 
            {
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 70,
                border      : false,
                labelWidth  : 85,
                items: [cmbFVoucherNo]
            },{
                xtype       : 'fieldset',
                title       : '',
                x           : 150,
                y           : 50,
                border      : false,
                labelWidth  : 85,
                items: [cmbVoucherNoT]
            } */
            ]
        }
              
        ]
    });



    var VoucherPrintWindow = new Ext.Window({
        height      : 580,
        width       : 700,
        items       : VoucherPrintFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{
            "background-color":"#d7d5fa"
        },
        y      : 60,
        listeners:{
            show:function(){
		/*if (gstoption=="R")
		{
                ReceiptledDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbrecled',
			compcode:gincompcode
                    }
                });
		}
		else
		{*/
                BankDataStore.load({
                    url: '/SHVPM/Financials/clsRepFinancials.php',
                    params: {
                        task: 'cmbBank',
			compcode:gincompcode,
			gstopt : gstoption
                    }
                });
		//}
            }
        }

    });
    cmbVoucherNo.hide();    
    cmbTVoucherNo.hide();  
    cmbVoucherNoT.hide();  
    VoucherPrintWindow.show();
});


