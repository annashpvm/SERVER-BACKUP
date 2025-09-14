Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




    var BillsType = 'GSI';
    var gstFlag;
    var seqno =0; 
    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsOpeningBills.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'cust_name', 'led_addr1', 'led_addr2','led_type', 'led_custcode','acctrail_inv_no','acctrail_inv_date', 'acctrail_inv_value', 'acctrail_adj_value', 'acctrail_led_code', 'acctrail_amtmode','accttrail_payterms' ,'acctrail_crdays' ])
    });



    var ladVoucherNodatastore = new Ext.data.Store({
        id: 'ladVoucherNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsOpeningBills.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "loadVoucherNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
          {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
    //    sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });


    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: 'clsOpeningBills.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });



    var findLedgerOpeningDataStore = new Ext.data.Store({
      id: 'findLedgerOpeningDataStore',
//   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsOpeningBills.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerOpening"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['curbal_obdbamt' , 'curbal_obcramt' , 'curbal_dbamt' , 'curbal_cramt']),

    });


    var GroupNameDataStore = new Ext.data.Store({
      id: 'GroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsOpeningBills.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'subgrpcode','subgrpname'
      ]),
      sortInfo:{field: 'subgrpname', direction: "ASC"}
    });


      var LedCodeLedgerDataStore = new Ext.data.Store({
      id: 'LedCodeLedgerDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsOpeningBills.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['cust_code','cust_name'])
    });



var optBillsType = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',

    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 4,
        rows : 1,
        id: 'optBillsType',
        items: [
		{boxLabel: 'Sales Bills', name: 'optBillsType', id:'salbills', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    BillsType="SB";

					}
				}
			}
		},
		{boxLabel: 'Purchase Bills', name: 'optBillsType', id:'purbills', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						BillsType="PB";
					}
				}
			}
		},
            
		{boxLabel: 'Debit Items', name: 'optBillsType', id:'drbills', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						BillsType="DR";


					}
				}
			}
		},

		{boxLabel: 'Creidt Items', name: 'optBillsType', id:'crbills', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						BillsType="CR";


					}
				}
			}
		},
        ],
    }
   ]
});



    var txtBillNo = new Ext.form.TextField({
        fieldLabel: 'Bill No',
        id: 'txtBillNo',
        width: 120,
        name: '',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });


    var dtpBillDate = new Ext.form.DateField({
        fieldLabel: 'Bill Date',
        id: 'dtpBillDate',
        name: 'dtpBillDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        anchor: '100%',
        listeners: {
        }
    });


    var txtVouNo = new Ext.form.TextField({
        fieldLabel: 'OB ENT. No',
        id: 'txtVouNo',
        width: 120,
        name: 'txtVouNo',
        readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var cmbVouNo = new Ext.form.ComboBox({
        fieldLabel      : 'OB ENT. No',
        width           : 120,
        store           : ladVoucherNodatastore, //readOnly:true,
        displayField    : 'vou_no',
        valueField      : 'vou_seqno',
        hiddenName      : 'vou_no',
        id              : 'cmbVouNo',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style :{textTransform:"uppercase"},
        listeners:{
           select: function(){
         	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginfinid,
			        compcode: gincompcode,
                                vouno   : cmbVouNo.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {
                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouNo.setRawValue(cmbVouNo.getRawValue());
                                      dtpOPDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtBillNo.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpBillDate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtPayTerms.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctrail_crdays'));
                                      txtBalance.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctrail_inv_value'));
                                      cmbLedgerName.setValue(LoadVouNoDetailsdatastore.getAt(j).get('acctrail_led_code'));

                                      if (LoadVouNoDetailsdatastore.getAt(j).get('accref_narration') == "SB")
                                        Ext.getCmp('optBillsType').setValue(1);
          
                                      else if (LoadVouNoDetailsdatastore.getAt(j).get('accref_narration') == "PB")
                                        Ext.getCmp('optBillsType').setValue(2);

                                      else if (LoadVouNoDetailsdatastore.getAt(j).get('accref_narration') == "DR")
                                        Ext.getCmp('optBillsType').setValue(3);
                                      else if (LoadVouNoDetailsdatastore.getAt(j).get('accref_narration') == "CR")
                                        Ext.getCmp('optBillsType').setValue(4);
   ;

                                  }
                              }  
                          }
                      });  
            }    
        }
    })

    var dtpOPDate = new Ext.form.DateField({
        fieldLabel: 'Ref Date',
        id: 'dtpOPDate',
        name: 'dtpOPDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
//value: '2020-03-31',
        anchor: '100%',
        listeners: {
            select: function () {

               dtpBillDate.setValue(dtpOPDate.getValue());
            }
        }
    });


var txtBalance = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amt',
        id          : 'txtBalance',
        name        : 'txtBalance',
        width       :  120,
        tabindex : 2,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
});


var txtPayTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPayTerms',
        name        : 'txtPayTerms',
        width       :  60,
        tabindex : 2,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
});




var cmbLedgerName = new Ext.form.ComboBox({
        id         : 'cmbLedgerName',
        name	   : 'cmbLedgerName',
        fieldLabel : 'Ledger Name ',
        store:LedCodeLedgerDataStore,
        width      : 350,
        displayField:'cust_name',
        valueField:'cust_code',
        hiddenName:'cust_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            select :function(){

          }
       }
    });

   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Opening Bills Entry',
        width       : 700,
        height      : 500,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'MasLedgerFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },[]),
        tbar: {
//edit
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                            cmbVouNo.show();
				ladVoucherNodatastore.load({
				    url: 'clsOpeningBills.php',
				    params:
				    {
					task: "loadVoucherNo",
					finid: ginfinid,
					compcode: gincompcode
				    }
				});


                        }
                    }


                },'-',
               {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                        Ext.Ajax.request({
                            url: 'TrnOpeningBillsSave.php',
                            params :
                             {
                                  savetype    : gstFlag,
                                  ledcode     : cmbLedgerName.getValue(),
                                  seqno       : seqno,
                                  opno        : txtVouNo.getRawValue(),
                                  opdate      : Ext.util.Format.date(dtpOPDate.getValue(),"Y-m-d"),                                 
                                  billno      : txtBillNo.getRawValue(),
                                  billdate    : Ext.util.Format.date(dtpBillDate.getValue(),"Y-m-d"),
                                  balance     : Number(txtBalance.getValue()),
                                  payterms    : Number(txtPayTerms.getValue()),
                                  billtype    : BillsType,
                                  compcode    : gincompcode,
                                  fincode     : ginfinid,
		             },
                             callback: function(options, success, response)
                             {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
		                   {                                
                                    Ext.MessageBox.alert("Opening Entry Saved -" + obj['vouno']);                           
                                    RefreshData();

                                 }else
				 {
                                    Ext.MessageBox.alert("Opening Entry Not Saved! Pls Check!- " + obj['vouno']); 
                                 }
                                }
                           });  
                    }
                    }   
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function(){
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasLedgerWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{
                 xtype: 'fieldset',
                title: 'Opening Bills Details',
                layout : 'absolute',
                border:true,
                height:400,
                width:730,
                x: 10,
                y: 0,
                     items:[


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 500,
			layout  : 'absolute',
			x       : 100,
			y       : 10,
			items:[optBillsType],
		},

                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 80,
                        border      : false,
                        labelWidth  : 120,
                        items: [txtVouNo]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 80,
                        border      : false,
                        labelWidth  : 120,
                        items: [cmbVouNo]
                       },          
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 250,
                        x           : 260,
                        y           : 80,
                        border      : false,
                        labelWidth  : 90,
                        items: [dtpOPDate]
                       },

                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 150,
                        border      : false,
                        labelWidth  : 120,
                        items: [cmbLedgerName]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 200,
                        border      : false,
                        labelWidth  : 120,
                        items: [txtBillNo]
                       },
                
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 250,
                        x           : 260,
                        y           : 200,
                        border      : false,
                        labelWidth  : 90,
                        items: [dtpBillDate]
                       },

		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 120, 
		         x           : 0,
		         y           : 250,
		         border      : false,
		         items:[txtBalance],
		     },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 300,
                        border      : false,
                        labelWidth  : 120,
                        items: [txtPayTerms]
                       },



               ]
             }
            ]
         });

    function RefreshData(){
       cmbVouNo.hide();
       txtBalance.setValue('');
       txtBillNo.setRawValue(''); 
       txtPayTerms.setRawValue(''); 
       gstFlag = "Add";
                  VouNodatastore.load({
                        url: 'clsOpeningBills.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: ginfinid,
                            compcode: gincompcode,
                            voutype : 'OPB'
                        },
                        callback: function(){
                            txtVouNo.setValue("OPB"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });


    }

     var MasLedgerWindow = new Ext.Window({
        height      : 540,
        width       : 760,
        items       : MasLedgerFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 50,
onEsc:function(){
},
        listeners:{
            show:function(){

                   

                RefreshData();
                LedCodeLedgerDataStore.load({
                    url:'loadLedgerDetails',
                    params:{
                        task:'loadLedgerDetails'
                    },
                    callback:function(){

                    }
                });
            }
        }
    });
       MasLedgerWindow.show();
});
