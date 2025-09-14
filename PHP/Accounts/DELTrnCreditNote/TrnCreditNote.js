Ext.onReady(function(){
    Ext.QuickTips.init();
   
    var gstFlag;
    var gdt_enddate;
    var gst_depname;
    var OptExpComm;
    var invdate;
    var invcomm;
    var invdiscount;
    var invvalue;
    var totalinv;
    var invno;
    var gincrvalue=0;

    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfinuser = localStorage.getItem('ginuser');
    var gstfincompcode = localStorage.getItem('gincompcode');
    var GinUser = localStorage.getItem('gstuser');
    var GinUserid = localStorage.getItem('ginuser')

    var dgrecord = Ext.data.Record.create([]);
    var billflag='O';
    var gincrtotal;
    var taxtypenew = 'CS';
    var ledtype = "O";
    var voupoint;



var LoadCGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
    //  autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    });

var LoadSGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadSGSTLedgerDataStore',
    //  autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var LoadIGSTLedgerDataStore = new Ext.data.Store({
      id: 'LoadIGSTLedgerDataStore',
     // autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIGSTledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name'
      ]),
    })

var cmbCGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'CGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbCGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadCGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbSGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'SGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbSGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadSGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){

           }
        } 
});


var cmbIGSTledger = new Ext.form.ComboBox({
        fieldLabel      : 'IGST Ledger Name',
        width           : 300,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbIGSTledger',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadIGSTLedgerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){


           }
        } 
});


var cmbGSTper = new Ext.form.ComboBox({
        fieldLabel      : 'GST %',
        width           : 80,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbGSTper',
        typeAhead       : true,
        mode            : 'local',
        store           : ['12','18','28'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : true,
        listeners:{
           select: function(){
                 calculatecrvalue();
                 findledgers();
                
                                
           }
        } 
});


function findledgers()
{
            	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : cmbGSTper.getValue(),
                           },
                       });

               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : cmbGSTper.getValue(),
                           },
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : ledtype,
				gsttype : taxtypenew,
			 	gstper  : cmbGSTper.getValue(),
                           },
                       });  

}

    function calculatecrvalue(){

/*
        flxBillDetail.getSelectionModel().selectAll();
        var selrows = flxBillDetail.getSelectionModel().getCount();
        var sel = flxBillDetail.getSelectionModel().getSelections();
         gincrtotal = 0;
        for (var i=0;i<selrows;i++){
            gincrtotal = gincrtotal + Number(sel[i].data.Credit_val);
        };
        txtCreditVal.setValue(parseFloat(gincrtotal));
*/


	if (Number(txttaxable.getRawValue())>0 && Number(cmbGSTper.getRawValue()) >0)
        {
            txtgstvalue.setRawValue(Math.round(Number(txttaxable.getRawValue()) * Number(cmbGSTper.getValue())/100));
        }  
        txtCreditVal.setValue(Math.round(Number(txttaxable.getRawValue())+Number(txtgstvalue.getRawValue())));


    }

    var PartynameDataStore = new Ext.data.Store({
        id: 'PartynameDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "Partyname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['led_code','led_name'])
    });


    var LedgernameDataStore = new Ext.data.Store({
        id: 'LedgernameDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadLedgerlist"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });

    
    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "ControlCreditNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno'])
    });
    
    var CurrencyDataStore = new Ext.data.Store({
        id: 'CurrencyDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbCurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            {name: 'Currency_code', type: 'int', mapping: 'currency_code'},
            {name: 'Currency_id', type: 'string', mapping: 'currency_symbol'}
          ])
    });
    
    var ReasonDataStore = new Ext.data.Store({
        id: 'ReasonDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbReason"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            {name: 'Reason_code', type: 'int', mapping: 'reason_code'},
            {name: 'Reason_name', type: 'string', mapping: 'reason_name'}
        ])
    });
    
    var InvoiceDetailsDataStore = new Ext.data.Store({
        id: 'InvoiceDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "InvDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'cinv_date','cinv_total_invamt','cinv_commission','cinv_discount'
        ])
    });
    
    var InvoiceDetails2DataStore = new Ext.data.Store({
        id: 'InvoiceDetails2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "InvDetails2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'acctrail_inv_date','acctran_totamt','acctrail_inv_value'
        ])
    });
    
    var InvoicNoDataStore = new Ext.data.Store({
        id: 'InvoicNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "cmbInvNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'accref_seqno','acctrail_inv_no','acctrail_inv_date','acctran_totamt'
        ])
    });
    
    var PartyAddressDataStore = new Ext.data.Store({
        id: 'PartyAddressDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/clsFinancials2.php',        // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "Address"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        'led_addr1','led_addr2'
        ])
    }); 
    
    var bill;
    var optOption= new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout : 'vbox',
        width:400,
        height:100,
        border: false,
        items: [{xtype: 'radiogroup',columns: 1, rows: 1,id:'optOption',
            items:[
            {boxLabel: 'With Bill',name: 'optOption', inputValue: 1, hidden:true,
            listeners:{
                check:function(rb,checked){
                    if(checked==true){
                        bill=true;
                        billflag='D';
			alert(gincompany);
			alert(ginfinid);
                        PartynameDataStore.load({
                            url:'/DPM/Financials/clsFinancials2.php',
                            params:{
                                task:'Partyname',
                                gincompany:gstfincompcode,
                                ginfinid:ginfinid,
                                bill:bill
                            }
                        });
                        btnAdd.enable();
                        btnRemove.enable();
                        flxBillDetail.enable();
                        txtCreditValue.enable();
                        txtInvValue.enable();
                        txtInvDate.enable();
                        cmbInvNo.enable();
                    }  
                }
            }},
            {boxLabel: 'WithOut Bill',name: 'optOption',inputValue: 2,checked: 'true',
            listeners:{
                check:function(rb,checked){
                    if(checked==true){
                        bill=false;
                        billflag='O';
                        PartynameDataStore.load({
                            url:'/DPM/Financials/clsFinancials2.php',
                            params:{
                                task:'Partyname',
                                 gincompany:gstfincompcode,
                                 ginfinid:ginfinid,
                                 bill:bill
                            }
                        });
                        btnAdd.disable();
                        btnRemove.disable();
                        flxBillDetail.disable();
                        txtCreditValue.disable();
                        txtInvValue.disable();
                        txtInvDate.disable();
                        cmbInvNo.disable();
                    }
                }
            }}
            ]
        }]
    });
    
    var txtCNno = new Ext.form.TextField({
        fieldLabel  : 'Credit Note No',
        id          : 'txtCNno',
        width       : 100,
        name        : 'Credit',
        readOnly    : true
    });
    
    var cmbPartyname = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name',
        width           : 350,
        store:PartynameDataStore,
        displayField    : 'led_name',
        valueField      : 'led_code',
        hiddenName      : 'led_name',
        id              : 'cmbPartyname',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        style :{textTransform:"uppercase"},
        listeners:{
            blur: function(){
           //     field.setValue(newValue.toUpperCase());
            },
            select:function(){



                PartyAddressDataStore.removeAll();
                InvoicNoDataStore.removeAll();
                if(billflag=="D"){
                    InvoicNoDataStore.load({
                        url:'/DPM/Financials/clsFinancials2.php',
                        params:{
                            task:'cmbInvNo',
                            ledgername:this.getRawValue(),
                            ginfinid:ginfinid,
                            gincompany:gstfincompcode
                        },
                        callback:function(){
                            var cnt=InvoicNoDataStore.getCount();
                            if(cnt>0){
                                invno=InvoicNoDataStore.getAt(0).get('acctrail_inv_no');
                                Invseq=InvoicNoDataStore.getAt(0).get('accref_seqno');
                            }else{
                                Ext.Msg.alert("Alert","Invoice Not found")
                            }
                        }
                    });
                };
                  
                PartyAddressDataStore.load({
                    url:'/DPM/Financials/clsFinancials2.php',
                    params:{
                        task:'Address',
                        ledcode:this.getValue()
                    },
                    callback:function(){
                        txtAddress1.setRawValue(PartyAddressDataStore.getAt(0).get('led_addr1'));
                        txtAddress2.setRawValue(PartyAddressDataStore.getAt(0).get('led_addr2'));
                    }
                });                                
            }
        }
    });
    
    var txtAddress1 = new Ext.form.TextField({
        fieldLabel  : 'Address',
        id          : 'txtAddress1',
        width       : 200,
        name        : 'Address',
        readOnly    : true
    });
    
    var dateon;
    var getdate;



    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/datechk.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DATECHECKING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['date'])
    });

    var dtpDate = new Ext.form.DateField({
        fieldLabel : 'Credit Note Date',
        id         : 'dtpDate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
        anchor     : '100%',
        listeners: {
            select: function () {
                dateon = 0;
                getdate=this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/DPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
			datechk:getdate
                    },
                    callback: function () {
                            dateon = DateCheckingDataStore.getAt(0).get('date');
                            if(dateon>0){
                                Ext.Msg.alert('Alert','Invalid Date');
                                dtpDate.setRawValue(new Date().format('d-m-Y'));
                            }
                    }
                });
            },           
	    blur: function () {
                dateon = 0;
                getdate=this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/DPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
			datechk:getdate
                    },
                    callback: function () {
                            dateon = DateCheckingDataStore.getAt(0).get('date');
                            if(dateon>0){
                                Ext.Msg.alert('Alert','Invalid Date');
                                dtpDate.setRawValue(new Date().format('d-m-Y'));
                            }
                    }
                });
            }
        }
    });
    
    var txtAddress2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAddress2',
        width       : 200,
        name        : 'Address2',
        readOnly    : true
    });
    
    var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 100,
        store:InvoicNoDataStore,
        displayField    : 'acctrail_inv_no',
        valueField      : 'accref_seqno',
        hiddenName      : 'acctrail_inv_no',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        listeners:{
            select:function(){
                InvoiceDetails2DataStore.removeAll();
                InvoiceDetails2DataStore.load({
                    url:'/DPM/Financials/clsFinancials2.php',
                    params:{
                        task:'InvDetails2',
                        invoiceno:cmbInvNo.getValue(),
                        ledgercode:cmbPartyname.getValue(),
                        compcode: gstfincompcode,
                        finid: ginfinid
                    },
                      callback:function(){                   
                        txtInvDate.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_date'));
                        txtInvValue.setValue(InvoiceDetails2DataStore.getAt(0).get('acctrail_inv_value'));
                    }
                });
            }
        }
    });


   var txtInvNo = new Ext.form.TextField({
        fieldLabel: 'Invoice Number',
        id: 'txtInvValue',
        width: 140,
        name: 'InvValue',
        readOnly: true
    });
    
    var txtInvDate = new Ext.form.TextField({
        fieldLabel : 'Invoice  Date',
        id         : 'txtInvDate',
        name       : 'date',
        width       : 90,
        format     : 'd-m-Y',
        readOnly    : true
    });
    
    var txtInvValue = new Ext.form.NumberField({
        fieldLabel  : 'Invoice Value',
        id          : 'txtInvValue',
        width       : 60,
        name        : 'InvValue',
        readOnly    : true
    });

    var txtCreditValue = new Ext.form.NumberField({
        fieldLabel  : 'Credit Value',
        id          : 'txtCreditValue',
        width       : 60,
        readOnly    : false,
        name        : 'CreditValue',
        
    });

    var flxBillDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 130,
        width: 500,
        x: 5,
        y: 5,
        columns: [
        {
            header: "Invoice No",
            dataIndex: 'Inv_no',
            sortable:true,
            width:90,
            align:'left'
        },
        {
            header: "Invoice Date",
            dataIndex: 'Invoice_date',
            sortable:true,
            width:110,
            align:'left'
        },
        {
            header: "Invoice Value",
            dataIndex: 'Invoice_val',
            sortable:true,
            width:80,
            align:'left'
        },
        {
            header: "Credit Value",
            dataIndex: 'Credit_val',
            sortable:true,
            width:90,
            align:'left'
        },
        {
            header: "",
            dataIndex: 'value',
            sortable:true,
            width:80,
            align:'left'
        }
        ],
        store: [ ]
    });
    
    var btnAdd = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Add",
        width   : 60,
        x       : 630,
        y       : 420,
        listeners:{
            click:function(){
		flxBillDetail.getStore().removeAll();
                flxBillDetail.getSelectionModel().selectAll();
                var selro = flxBillDetail.getSelectionModel().getCount();
                var sele = flxBillDetail.getSelectionModel().getSelections();
                var cnt1= 0;
                for (var t=0;t<selro;t++){
                    if (sele[t].data.Inv_no == cmbInvNo.getRawValue())
                    {
                        cnt1= cnt1 + 1;
                    }
                }
                if (cnt1> 0){
                    Ext.MessageBox.alert("Bill","Bill already entered");
                }else{
                    var rowcnt= flxBillDetail.getStore().getCount() + 1;
                    flxBillDetail.getStore().insert(
                    flxBillDetail.getStore().getCount(),
                        new dgrecord({
                            Sno:rowcnt,
                            Inv_no:cmbInvNo.getRawValue(),
                            Invoice_date:txtInvDate.getValue(),
                            Credit_val:txtCreditValue.getValue(),
                            Invoice_val:txtInvValue.getValue(),
                            value:cmbInvNo.getValue()
                        })
                    );
                    calculatecrvalue();
                    txtInvDate.setValue('');
                    txtInvValue.setValue('');
                    txtCreditValue.setValue('');
                    cmbInvNo.setValue('');
                }
            }
        }
    });
    
    var btnRemove= new Ext.Button({
        style   : 'text-align:center;',
        text    : "Remove",
        width   : 60,
        x       : 630,
        y       : 420,
        handler: function(){
            var sm = flxBillDetail.getSelectionModel();
            var selrow = sm.getSelected();
            flxBillDetail.getStore().remove(selrow);
            calculatecrvalue();
        }
    });

    var cmbDebitor = new Ext.form.ComboBox({
        fieldLabel      : 'Debitor',
        width           : 300,
       
        displayField    : 'led_name',
        valueField      : 'led_code',
        hiddenName      : 'led_code',
        id              : 'cmbDebitor',
        typeAhead       : true,
        mode            : 'local',
	store:LedgernameDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        //style :{textTransform:"uppercase"},
        listeners:{
//            blur: function(field,newValue,oldValue){
//                field.setValue(newValue.toUpperCase());
//            }
        }
    });
    
    var cmbReason = new Ext.form.ComboBox({
        fieldLabel      : 'Reason',
        width           : 200,
        store:ReasonDataStore,
        displayField    : 'Reason_name',
        valueField      : 'Reason_code',
        hiddenName      : 'Reason_name',
        id              : 'cmbReason',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        style :{textTransform:"uppercase"},
        listeners:{
            blur: function(field,newValue,oldValue){
               // field.setValue(newValue.toUpperCase());
            }
        }
    });

    var txtCreditVal = new Ext.form.NumberField({
        fieldLabel  : 'Credit Value',
        id          : 'txtCreditVal',
        width       : 100,
        name        : 'CreditVal'
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtNarration',
        width       : 600,
        height      : 50,
        name        : 'Narration',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
              //  field.setValue(newValue.toUpperCase());
            }
        }
    });


  var opttax= new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout : 'vbox',
        width:350,
        height:60,
	x:250,
	y:160,
        border: false,
        items: [{xtype: 'radiogroup',columns:2, rows: 1,id:'opttax',
            items:[
             {boxLabel: 'CGST/SGST',name: 'opttax',inputValue:1,id:'opttaxcsgst',checked:true,
              listeners:{
               check:function(rb,checked){
                if(checked==true){
                       taxtypenew='CS';
                       cmbCGSTledger.enable();
                       cmbSGSTledger.enable();
                       cmbIGSTledger.disable();
                 }
               }
             }
          },{boxLabel: 'IGST',name: 'opttax',inputValue:2,id:'opttaxcsgst',
              listeners:{
               check:function(rb,checked){
                if(checked==true){
                       taxtypenew='I';
                       cmbCGSTledger.disable();
                       cmbSGSTledger.disable();
                       cmbIGSTledger.enable();
                 }
               }
             }
          }
        ]
     }
  ]
});

    var txttaxable = new Ext.form.TextField({
        fieldLabel  : 'Taxable',
        id          : 'txttaxable',
        width       : 130,
        name        : 'txttaxable',
        enableKeyEvents:true,
	listeners:{
	keyup:function(){

		 calculatecrvalue();
	  }
	}
    });


    var txtgstvalue = new Ext.form.TextField({
        fieldLabel  : 'GST AMT',
        id          : 'txtgstvalue',
        width       : 130,
        name        : 'txtgstvalue',
        enableKeyEvents:true,
        readOnly  : true,
	listeners:{
	keyup:function(){
 calculatecrvalue();
	  }
	}
    });

    var txtInv = new Ext.form.TextField({
        fieldLabel  : 'Invoice No',
        id          : 'txtInv',
        width       : 130,
        name        : 'txtInv',
        enableKeyEvents:true
    });

    var txtIDate = new Ext.form.DateField({
        fieldLabel : 'Invoice  Date',
        id         : 'txtIDate',
        name       : 'date',
        width       : 125,
        format     : 'd-m-Y',
	value:new Date()
    });

    var output = 'N';
    var chkremark = new Ext.form.Checkbox({
        name: 'Input',
        boxLabel: 'Input',
        id: 'chkremark',
        checked: false,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    output = 'Y';
                    ledtype = "I";
                }else{
                    output = 'N';
                    ledtype = "O";
                }
                findledgers();
            }
        }
    });

    var CreditNoteFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Credit Note',
        header      : false,
        bodyStyle:{"background-color":"#acbf95"},
        width       : 450,
        height      : 180,
        x           : 10,
        y           : 10,
        frame       : false,
        id          : 'CreditNoteFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
            root:'rows',
            totalProperty: 'results',
            id:'id'
        },['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
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
                    }
                }
            },'-',
            {
                text: 'Edit',
                fontSize :18,
                style  : 'text-align:center;',
                tooltip: 'Modify Details...',
                height: 40,
                width:50,
                icon: '/Pictures/edit.png',
                listeners:{
                    click: function () {
                        gstFlag = "Edit";
                    }
                }
            },'-',
            {
                text: 'Save',
                style  : 'text-align:center;',
                tooltip: 'Save Details...',
                height: 40,
                fontSize:30,
                width:70,
                icon: '/Pictures/save.png',
                listeners:{
                    click: function(){
                        var rcnt = flxBillDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        var gstRefno;
                        


                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
                       
                        if(Ext.util.Format.date(dtpDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(Ext.util.Format.date(dtpDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(billflag=='D' && rcnt<=0){
                            Ext.MessageBox.alert("Credit Note","Bill Details Not Avaliable");
                        }else if(cmbPartyname.getRawValue() == cmbDebitor.getRawValue()){
                            Ext.MessageBox.alert("Credit Note","Party and Debtors Names Are Equal");
                        }else if(cmbPartyname.getValue()==0){
                            Ext.MessageBox.alert("Credit Note","Party Name Should Not be Empty");
                        }else if(cmbDebitor.getValue()==0){
                            Ext.MessageBox.alert("Credit Note","Debitor Name Should Not be Empty");
                        }else if(Number(txtCreditVal.getValue())<=0){
                            Ext.MessageBox.alert("Credit Note","Total Value  Should Not Be Zero");
                        } /*else if  ((taxtypenew == "CS" ) && (cmbCGSTledger.getValue() == '' || cmbSGSTledger.getValue() == ''))  {
                                Ext.MessageBox.alert("Credit Note", "Select CGST / SGST Ledger Names");
                        } else if  (taxtypenew == "I"  && cmbIGSTledger.getValue() == '') {
                               Ext.MessageBox.alert("Credit Note", "Select IGST Ledger Names");
                        } else if  (txtgstvalue.getValue() > 0 && Number(cmbGSTper.getValue()) == 0) {
                                Ext.MessageBox.alert("Credit Note", "Select GST %");
                        }*/ else if  (txtInv.getRawValue()  == '') {
                                Ext.MessageBox.alert("Credit Note", "Enter Invoice Number");

                        }else {
                            Ext.Msg.show({
                                title: 'Credit Note',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Save This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accData = flxBillDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });

                                  
                                        Ext.Ajax.request({
                                            url: 'FrmTrnCreditNoteSave.php',
                                            params:{
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                output: output,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: 0,
                                                vouno: txtCNno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
                                                invno:  txtInvNo.getRawValue(),
                                                invdate: Ext.util.Format.date(txtInvDate.getValue(),"Y-m-d"),
                                                bankname: "",
                                                refno: "",
                                                refdate: Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "CN",
                                                paymode: "",
                                                payno: "",
						taxtype:taxtypenew,
						TAXVAL:txtgstvalue.getRawValue(),
                                                paydate: Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
                                                party: cmbPartyname.getValue(),
                                                debtor: cmbDebitor.getValue(),
                                                totalval: Number(txtCreditVal.getValue()),
                                                reason: cmbReason.getValue(),
						invnogst: txtInv.getRawValue(),
						invdategst: Ext.util.Format.date(txtIDate.getValue(),"Y-m-d"),
                                                billmode: billflag,
                                                flagtype: gstFlag,
                                                cnt: accData.length,

                                                taxable :txttaxable.getRawValue(),
                                                cgst  : cmbCGSTledger.getValue(),
                                                sgst  : cmbSGSTledger.getValue(),
                                                igst  : cmbIGSTledger.getValue(),
						gstper: cmbGSTper.getValue(),
                                                entrypoint : voupoint,
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
                                                        Ext.Msg.show({
                                                        title: 'Saved',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Record saved with Voucher No -'+ obj['vouno'],
                                                        fn: function(btn){
                                                            if (btn == 'yes'){
                                                                window.location.reload();
                                                            }else{
                                                                window.location.reload();
                                                            }
                                                        }
                                                        });
                                                }else{
                                                    Ext.MessageBox.alert("Alert","Record not saved - " + obj['vouno']);
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
                tooltip: 'Refresh Details...',
                height: 40,
                fontSize:30,
                width:70,
                icon: '/Pictures/refresh.png',
                listeners:{
                    click: function () {
                       window.location.reload();
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
                listeners:{
                    click: function () {

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
                        CreditNoteWindow.hide();
                    }
                }
            }]
        },
        items : [
        {
            xtype       : 'fieldset',
            title       : 'Option',
            width       : 150,
            height      : 110,
            x           : 5,
            y           : 10,
            border      : true,
            style       : 'padding:0px',
            layout      : 'absolute',
            items: [
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 230,
                x           : 0,
                y           : 0,
                border      : false,
                items: [optOption]
            },
            ]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 570,
            height      : 100,
            x           : 160,
            y           : 17,
            border      : true,
            style       : 'padding:0px',
            layout      : 'absolute',
            items: [
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 250,
                x           : 0,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [txtCNno]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 250,
                x           : 0,
                y           : 25,
                defaultType : 'textfield',
                border      : false,
                items: [dtpDate]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 300,
                x           : 250,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [txtAddress1]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 300,
                x           : 250,
                y           : 25,
                defaultType : 'textfield',
                border      : false,
                items: [txtAddress2]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 500,
                x           : 0,
                y           : 50,
                defaultType : 'textfield',
                border      : false,
                items: [cmbPartyname]
            },
            ]
        },
        {
            xtype       : 'fieldset',
            title       : 'Bill Details',
            width       : 725,hidden:true,
            height      : 200,
            x           : 5,
            y           : 120,
            border      : true,
            style       : 'padding:0px',
            layout      : 'absolute',
            items: [
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 250,
                x           : 0,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [cmbInvNo]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 200,
                x           : 200,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [txtInvDate]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 200,
                x           : 400,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [txtInvValue]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 200,
                x           : 550,
                y           : 0,
                defaultType : 'textfield',
                border      : false,
                items: [txtCreditValue]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 700,
                x           : 5,
                y           : 30,
                border      : false,
                items: [flxBillDetail]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 700,
                x           : 550,
                y           : 60,
                border      : false,
                items: [btnAdd]
            },
            {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 80,
                width       : 700,
                x           : 550,
                y           : 100,
                border      : false,
                items: [btnRemove]
            },
            ]
        },

{
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 100,
            width       : 300,
            x           : 450,
            y           : 130,
            defaultType : 'textfield',
            border      : false,
            items: [txtInv]
        },{
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 100,
            width       : 250,
            x           : 450,
            y           : 160,
            border      : false,
            items: [txtIDate]
        },opttax,
           {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 200,
                x           : 0,
                y           : 160,
                defaultType : 'textfield',
                border      : false,
                items: [txttaxable]
            },
           {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 200,
                x           : 0,
                y           : 190,
                defaultType : 'textfield',
                border      : false,
                items: [cmbGSTper]
            },

           {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 70,
                width       : 200,
                x           : 0,
                y           : 220,
                defaultType : 'textfield',
                border      : false,
                items: [txtgstvalue]
            },


        {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 70,
            width       : 300,
            x           : 0,
            y           : 250,
            defaultType : 'textfield',
            border      : false,
            items: [txtCreditVal]
        }, 

        {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 70,
            width       : 400,
            x           : 0,
            y           : 280,
//            defaultType : 'textfield',
            border      : false,
            items: [cmbDebitor]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 70,
            width       : 300,
            x           : 0,
            y           : 310,
            defaultType : 'textfield',
            border      : false,
            items: [cmbReason]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 70,
            width       : 700,
            height:100,
            x           : 0,
            y           : 340,
            defaultType : 'textfield',
            border      : false,
            items: [txtNarration]
        } , {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 1,
            width       : 100,
            x           : 400,
            y           : 210,
            border      : false,
            items: [chkremark]
        } ,       
                  {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 500,
                        y: 210,
                        border: false,
                        items: [cmbCGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 500,
                        y: 240,
                        border: false,
                        items: [cmbSGSTledger]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 150,
                        width: 500,
                        x: 500,
                        y: 270,
                        border: false,
                        items: [cmbIGSTledger]
                    },


        ]
    });

    function RefreshData(){
        gstFlag = "Add";
        billflag = "O";
        cmbDebitor.setValue('');
        cmbPartyname.setValue('');
        cmbReason.setValue('');
        txtAddress1.setValue('');
        txtAddress2.setValue('');
        txtCNno.setValue('');
        txtCreditVal.setValue('');
        txtCreditValue.setValue('');
        txtInvDate.setValue('');
        txtInvValue.setValue('');
        txtNarration.setValue('');
        ControlmasterDataStore.load({
            url:'/DPM/Financials/clsFinancials2.php',
            params:{
                task:'ControlCreditNo',
                ginfinid:ginfinid,
                gincompcode:gstfincompcode
            },
            callback:function(){
                txtCNno.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
            }
        });
        flxBillDetail.getStore().removeAll();
    }

    var CreditNoteWindow = new Ext.Window({
        width       : 1200,
        height      : 500,
        y           : 70,
        items       : CreditNoteFormPanel,
        bodyStyle:{"background-color":"#acbf95"},
        title       : 'Credit Note',
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners: {
            show:function(){
                gstFlag = "Add";
               // billflag = "D";

                gdt_enddate="31/03/2016";

			if(gstfinyear.substring(5,9)==='2019'){
			  dtpDate.setRawValue('31-'+'03-'+gstfinyear.substring(5,9));
			}


               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }
                ControlmasterDataStore.load({
                    url:'/DPM/Financials/clsFinancials2.php',
                    params:{
                        task:'ControlCreditNo',
                        ginfinid:ginfinid,
                        gincompcode:gstfincompcode
                    },
                    callback:function(){
                        txtCNno.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                    }
                });
                LedgernameDataStore.load({
                    url: '/DPM/Financials/clsFinancials2.php',
                    params: {
                        task: 'LoadLedgerlist',
        
                    },
        
                });


                ReasonDataStore.load({
                    url:'/DPM/Financials/clsFinancials2.php',
                    params:{
                        task:'cmbReason'
                    }
                });


                        bill=false;
                        billflag='O';
                        PartynameDataStore.load({
                            url:'/DPM/Financials/clsFinancials2.php',
                            params:{
                                task:'Partyname',
                                 gincompany:gstfincompcode,
                                 ginfinid:ginfinid,
                                 bill:bill
                            }
                        });
                        btnAdd.disable();
                        btnRemove.disable();
                        flxBillDetail.disable();
                        txtCreditValue.disable();
                        txtInvValue.disable();
                        txtInvDate.disable();
                        cmbInvNo.disable();
                        gst_depname = "A";
               	        LoadCGSTLedgerDataStore.removeAll();
           	        LoadCGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadCGSTledgers",
				ledtype : "O",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
               	        LoadSGSTLedgerDataStore.removeAll();
           	        LoadSGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadSGSTledgers",
				ledtype : "O",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  

               	        LoadIGSTLedgerDataStore.removeAll();
           	        LoadIGSTLedgerDataStore.load({
                           url: '/DPM/Financials/PayablesUpdation/clsPayableUpdation.php',
                           params: {
		                task: "loadIGSTledgers",
				ledtype : "O",
				gsttype : taxtypenew,
			 	gstper  : 0,
                           },
	          	   callback:function()
	                   {
                           } 
                       });  
                       cmbIGSTledger.disable(); 
                       
                  }
            }
    });
    CreditNoteWindow.show();
});

