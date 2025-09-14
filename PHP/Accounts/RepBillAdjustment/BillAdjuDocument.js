Ext.onReady(function() {
Ext.QuickTips.init();
    var finid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var dgrecord = Ext.data.Record.create([]);

var printtype="PDF";
var voutype  ="Debit";

var dbcr = "dr";
var ledcode = 0;
 var loadVoucherNoDataStore = new Ext.data.Store({
      id: 'loadVoucherNoDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAdjustment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findVouNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_ref','acctrail_inv_date','acctrail_inv_value', 'acctrail_adj_value','cust_code'
      ]),
    });





  var AdjustmentDetailsDataStore = new Ext.data.Store({
        id: 'AdjustmentDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsAdjustment.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"AdjNoClick"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'ref_slno', 'ref_docseqno', 'ref_docno', 'ref_docdate', 'ref_adjseqno', 'ref_adjvouno', 'ref_invno', 'ref_invdate', 'ref_adjamount', 'ref_paymt_terms', 'ref_adj_days', 'ref_adj_by', 'ref_adjusted_on', 'ref_ledcode', 'ref_adjvoutype','adjdate','voudate'
        ])
    });


  function grid_tot(){

        txttotAjusted.setValue('');
        txtVoucherAmount.setValue('');
        txtBalanceAmount.setValue('');

	pvr_dbamt=0;
        Row= flxAdjustments.getStore().getCount();

        flxAdjustments.getSelectionModel().selectAll();
        var sel=flxAdjustments.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.ref_adjamount);
        }
        vouamt = Number(txtVoucherAmount2.getValue());
        txttotAjusted.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtVoucherAmount.setRawValue(Ext.util.Format.number(vouamt,"0.00"));
        txtBalanceAmount.setRawValue(Ext.util.Format.number(vouamt-pvr_dbamt,"0.00"));






}



function find_voucher_details()
{


   loadVoucherNoDataStore.removeAll();
   loadVoucherNoDataStore.load({
        url: 'ClsAdjustment.php',
        params:{
            task:'findVouNo',
            compcode : compcode,
            finid    : finid,
            vouno    : txtVouNo.getRawValue(),
        },
        callback:function(){
            ledcode = 0;
            txtPartyName.setValue(''); 
            txtVoucherAmount2.setValue('');             
            txttotAjusted2.setValue(''); 
	    txtBalanceAmount2.setValue(''); 
            flxAdjustments.getStore().removeAll();  
            var cnt=loadVoucherNoDataStore.getCount();
            if(cnt>0){

//'cust_ref','acctrail_inv_date','acctrail_inv_value', 'acctrail_adj_value'


                    var balamt =  Number(loadVoucherNoDataStore.getAt(0).get('acctrail_inv_value'))-  Number(loadVoucherNoDataStore.getAt(0).get('acctrail_adj_value'));

   
		    txtPartyName.setRawValue(loadVoucherNoDataStore.getAt(0).get('cust_ref')); 
                    txtVouDate.setRawValue(Ext.util.Format.date(loadVoucherNoDataStore.getAt(0).get('acctrail_inv_date'),"d-m-Y")); 
		    txtVoucherAmount2.setRawValue(Ext.util.Format.number(loadVoucherNoDataStore.getAt(0).get('acctrail_inv_value'),"0.00"));             
		    txttotAjusted2.setRawValue(Ext.util.Format.number(loadVoucherNoDataStore.getAt(0).get('acctrail_adj_value'),"0.00")); 
		    txtBalanceAmount2.setRawValue(Ext.util.Format.number(balamt,"0.00")); 



		    ledcode = loadVoucherNoDataStore.getAt(0).get('cust_code'); 

			   AdjustmentDetailsDataStore.removeAll();
                           AdjustmentDetailsDataStore.load({
                                url: 'ClsAdjustment.php',
                                params:{
                                    task:'AdjNoClick',
                                    compcode : compcode,
                                    finid    : finid,
                                    vouno    :txtVouNo.getRawValue(),
                                    db_cr    : dbcr,
                                    ledcode  : ledcode
                                },
                                callback:function(){
                                    

txttotAjusted.setValue(''); 
txtBalanceAmount.setValue(''); 
                                    flxAdjustments.getStore().removeAll();  
                                    var cnt=AdjustmentDetailsDataStore.getCount();
                                    if(cnt>0){

		                        for(var i=0;i<cnt;i++){
//		                          if (dbcr  == "cr")
		                          //{
		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_invno');
                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('voudate');
//		                          } 
//                                          else
		                          //{
//		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_docno');
//                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('adjdate');
		                          //} 



                                           var paymt =AdjustmentDetailsDataStore.getAt(i).get('ref_paymt_terms');
                                           var adjamt =AdjustmentDetailsDataStore.getAt(i).get('ref_adjamount');
                                           var adjdays =AdjustmentDetailsDataStore.getAt(i).get('ref_adj_days');

				 
				                flxAdjustments.getStore().insert(
				                flxAdjustments.getStore().getCount(),
				                new dgrecord({
				                    ref_invno : docno,
				                    voudate   : docdt,
				                    ref_paymt_terms:paymt,
				                    ref_adjamount  :adjamt,
				                    ref_adj_days   :adjdays,
				                })
				                );
grid_tot();
                                          }




                                    }
//grid_tot_trans();
                                }


                            });
            }
            else 
            {
                  alert("Voucher Number Not found..");
            }      
        }
});

}


    var txtVouNo = new Ext.form.TextField({
        fieldLabel: 'Voucher Number',
        id: 'txtVouNo',
        width: 150,
        name: 'txtVouNo',
        enableKeyEvents: true,
style: {
            'color':'#0C5DA9','text-align': 'left',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        listeners: {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   find_voucher_details();
             }

          },
          },
    });



    var txtVouDate = new Ext.form.TextField({
        fieldLabel: 'Voucher Date',
        id: 'txtVouDate',
        width: 150,
        name: 'txtVouDate',
        enableKeyEvents: true,
style: {
            'color':'#0C5DA9','text-align': 'left',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        listeners: {

          },
    });

   var flxAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
	id:'my-grid3',
        width: 600,
        height: 200,
    	labelStyle :"font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Inv/Doc No.", dataIndex: 'ref_invno',width:120,align:'left'},   
		{header: "Date", dataIndex: 'voudate',width:110,align:'left'},   
		{header: "Pay.Terms", dataIndex: 'ref_paymt_terms',width:90,align:'center'},   
		{header: "Adj. Amount", dataIndex: 'ref_adjamount',width:120,align:'right'},   
		{header: "Adj. Days", dataIndex: 'ref_adj_days',width:90,align:'center'},   
        ],
        store:[],
        listeners:{	
        }    
});



    var txtPartyName = new Ext.form.NumberField({
        fieldLabel  : '' ,
        id          : 'txtPartyName',
        name        : 'txtPartyName',
        width       : 300,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });




    var txtVoucherAmount = new Ext.form.NumberField({
        fieldLabel  : 'Voucher Amount' ,
        id          : 'txtVoucherAmount',
        name        : 'txtVoucherAmount',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotAjusted = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted' ,
        id          : 'txttotAjusted',
        name        : 'txttotAjusted',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtBalanceAmount = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amount' ,
        id          : 'txtBalanceAmount',
        name        : 'txtBalanceAmount',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });





    var txtVoucherAmount2 = new Ext.form.NumberField({
        fieldLabel  : 'Voucher Amount' ,
        id          : 'txtVoucherAmount2',
        name        : 'txtVoucherAmount2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotAjusted2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted' ,
        id          : 'txttotAjusted2',
        name        : 'txttotAjusted2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtBalanceAmount2 = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amount' ,
        id          : 'txtBalanceAmount2',
        name        : 'txtBalanceAmount2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



var optVouType = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
//        columns: 0,
        rows : 1,
        id: 'optVoutype',
        items: [
		{boxLabel: 'Debit', name: 'optVouType', id:'prtDebit', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   voutype  ="Debit";
                                           dbcr = "dr";
					}
				}
			}
		},
             {boxLabel: 'Credit', name: 'optVouType', id:'optCredit', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   voutype  ="Credit";
                                           dbcr = "cr";

					}
				}
			}
		},
            
        ],
    }



    ]
});


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
             {boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});

var JournalRegiterFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Voucher Register',
        width       : 1250,
        height      : 600,
      bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'JournalRegiterFormPanel',
        method      : 'post',
        layout      : 'absolute',
       
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',icon: '/Pictures/refresh.png',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',icon: '/Pictures/view.png',
                    tooltip: 'View Details...', height: 40,
                   listeners:{
                        click:
                          function () {
		 

                    }

                   }


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',icon: '/Pictures/exit.png',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            JournalRegiterWindow.hide();
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
                height:450,
                width:1150,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
		{ 
			xtype   : 'fieldset',
			title   : 'Voucher Type',
			layout  : 'hbox',
			border  : true,
			height  : 75,
			width   : 275,
			layout  : 'absolute',
			x       : 100,
			y       : 0,
			items:[optVouType],
		},
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 250,
			layout  : 'absolute',
			x       : 500,
			y       : 0,
			items:[optprinttype],
		},


                { xtype       : 'fieldset',
                title       : '',
                x           : 70,
                y           : 80,
                border      : false,
                labelWidth  : 130,
                width:305,
                items: [txtVouNo]
                },


                { xtype       : 'fieldset',
                title       : '',
                x           : 70,
                y           : 120,
                border      : false,
                labelWidth  : 130,
                width:305,
                items: [txtVouDate]
                },



        {
            xtype       : 'fieldset',
            x           : 60,
            y           : 160,
            border      : false,
            labelWidth  : 1,
            width       :500,
            items : [txtPartyName]
        },


        {
            xtype       : 'fieldset',
            x           : 70,
            y           : 200,
            border      : false,
            labelWidth  : 130,
            width       :250,
            items : [txtVoucherAmount2]
        },

        {
            xtype       : 'fieldset',
            x           : 70,
            y           : 240,
            border      : false,
            labelWidth  : 130,
            width       :250,
            items : [txttotAjusted2]
        },


        {
            xtype       : 'fieldset',
            x           : 70,
            y           : 280,
            border      : false,
            labelWidth  : 130,
            width       :250,
            items : [txtBalanceAmount2]
        },




        {
            xtype       : 'fieldset',
            title       : '',
            width       : 800,
            height      : 400,
            x           : 400,
            y           : 80,
            border      : false,
            items : [flxAdjustments]
        },



        {
            xtype       : 'fieldset',
            x           : 620,
            y           : 300,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtVoucherAmount]
        },

        {
            xtype       : 'fieldset',
            x           : 620,
            y           : 340,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txttotAjusted]
        },


        {
            xtype       : 'fieldset',
            x           : 620,
            y           : 380,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtBalanceAmount]
        },
                
                ]
              },
              ]
               });

    var JournalRegisterWindow = new Ext.Window({
        height      : 600,
        width       : 1200,
        items       : JournalRegiterFormPanel,bodyStyle:{"background-color":"#ffe6e6"},
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

                }
            }

    });
       JournalRegisterWindow.show();
});
