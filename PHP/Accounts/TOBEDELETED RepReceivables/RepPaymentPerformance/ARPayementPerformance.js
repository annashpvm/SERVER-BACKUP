Ext.onReady(function () {
    var compcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var finid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');







    var accledcode = 0;
    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });

    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });



  var LoadCollectionDetailsDataStore = new Ext.data.Store({
        id: 'LoadCollectionDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsPaymentPerformance.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadCollectionDocumentList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_paymode', 'accref_payref_no', 'accref_payref_date', 'acctrail_inv_value', 'refpartyinvno', 'refpartyinvdate', 'refpurchaseno', 'refamount', 'acctrail_crdays', 'led_code', 'led_name' ,'noofdays','daysfromduedate' ])
    });


var LoadBalanceDueDataStore = new Ext.data.Store({
        id: 'LoadBalanceDueDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsPaymentPerformance.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadBalanceDue"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctran_led_code', 'opdr', 'opcr', 'trn_opdr', 'trn_opcr', 'trn_dr', 'trn_cr', 'trn_sales' ])
    });



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPaymentPerformance.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"getSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'led_code', 'led_name','led_type','led_custcode'
 

      ]),
    });

   var printtype='PDF';

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
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



function ledgerSearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsPurchaseAccount.php',
		params:
		{
			task   :"loadSearchPartylist",
			party  : txtCustomer.getRawValue(),
		},
        });
}


    var txtClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing Balance',
        id          : 'txtClosing',
        name        : 'txtClosing',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txtSales = new Ext.form.NumberField({
        fieldLabel  : 'Total Sales',
        id          : 'txtSales',
        name        : 'txtSales',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtAvg_NoofDays = new Ext.form.NumberField({
        fieldLabel  : 'Average No. of Days',
        id          : 'txtAvg_NoofDays',
        name        : 'txtAvg_NoofDays',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtAvg_NoofDays_Duedate = new Ext.form.NumberField({
        fieldLabel  : 'Average No.of Days from Due Date',
        id          : 'txtAvg_NoofDays_Duedate',
        name        : 'txtAvg_NoofDays_Duedate',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var btnView = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnView',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p4 = "&ledcode=" + encodeURIComponent(accledcode);
                    var p5 = "&closing=" + encodeURIComponent(txtClosing.getValue());
                    var p6 = "&salesamount=" + encodeURIComponent(txtSales.getValue());

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPaymentPerformance.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPaymentPerformance.rptdesign' + param, '_blank');	



	    }
	}
	});



    var txtCustomer = new Ext.form.TextField({
        fieldLabel: 'Customer Name',
        id: 'txtCustomer',
        width: 300,
        name: 'txtCustomer',
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'left',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
         labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                flxParty.show();


   //             Ext.getCmp('tabAccPurchase').hide();   
                loadSearchPartyListDatastore.removeAll();
                  if (txtCustomer.getRawValue() != '')
                     ledgerSearch();
            },
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();
   
             }
             if (e.getKey() == e.DOWN)
             {
 //              Ext.getCmp('flxParty').focus(false, 200);
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);  
             }
          }

         }  
    });



   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        hideHeaders : false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 350,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Customer Name", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
		{header: "Led type", dataIndex: 'led_type',sortable:true,width:60,align:'left',hidden:true},   
		{header: "party Code", dataIndex: 'led_custcode',sortable:true,width:60,align:'left',hidden:true},   
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('led_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				accledcode = selrow.get('led_code');
				txtCustomer.setRawValue(selrow.get('led_name'));
                                ledDRCR = selrow.get('led_type');
                                ledpartycode = selrow.get('led_custcode');
                flxParty.hide();   

			}
		}
 
    
   }
   });
    var dgrecord = Ext.data.Record.create([]);
    var flxdetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
    id: 'my-grid-font', 
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 400,
        width: 720,
        border:false,

        enableKeyEvents: true,
        columns: [
            {header: "Date of Bill", dataIndex: 'refpartyinvdate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,             },
            {header: "Invoice No.", dataIndex: 'refpartyinvno',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('refpartyinvno');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "Invoice Amt.", dataIndex: 'acctran_totamt',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true, },
            {header: "Receipt Date", dataIndex: 'accref_voudate',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},
            {header: "Receipt Amt.", dataIndex: 'refamount',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'},

            {header: "Paymt Terms", dataIndex: 'acctrail_crdays',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "No of Days", dataIndex: 'noofdays',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},

            {header: "No of Days fr Duedate", dataIndex: 'daysfromduedate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,},
         ],
         listeners :{


            'rowDblClick' : function(flxdetails,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =flxdetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },'cellclick': function (flxdetails, rowIndex, cellIndex, e) {
                 var selected_rows =flxdetails.getSelectionModel().getSelections();
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.accref_vouno;
		         }
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
                                     }
                                }
                            });
	   },
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =flxdetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        }
    });



     function grid_tot(){
        flxdetails.getSelectionModel().selectAll();
        var selrows = flxdetails.getSelectionModel().getCount();
        var sel = flxdetails.getSelectionModel().getSelections();
        no1  = 0;
        no2 = 0;
        var reccnt = 0;
        for (var i=0;i<selrows;i++){
            reccnt = reccnt + 1;    
            no1 = Number(no1)+Number(sel[i].data.noofdays);
            no2 = Number(no2)+Number(sel[i].data.daysfromduedate);
        };
        txtAvg_NoofDays.setValue(no1/reccnt);
        txtAvg_NoofDays_Duedate.setValue(no2/reccnt);

    };


var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  

//txtClosing.label.update(‘Display Name’);

//txtClosing.setText('Voucher Already Make Adjust!');

// Ext.getCmp('txtClosing').setText('Voucher Already Make Adjust!');

//        fp.getForm().findField('txtClosing').setText('HELLO');

		flxdetails.getStore().removeAll();     
		LoadCollectionDetailsDataStore.removeAll();

		LoadCollectionDetailsDataStore.load({
		 url: 'ClsPaymentPerformance.php',
		        params: {
		    	task: 'loadCollectionDocumentList',
		        compcode:compcode,
	//	        finid:finid,
		        ledcode:accledcode,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

			},
                        scope:this,
                        callback:function(){
                        var cnt=LoadCollectionDetailsDataStore.getCount();
                        if(cnt>0){
                            for(var i=0;i<cnt;i++){


                               invdate  = LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvdate');
                               colldate = LoadCollectionDetailsDataStore.getAt(i).get('accref_voudate');

    

                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    refpartyinvdate :Ext.util.Format.date(LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvdate'),"d-m-Y"), 
                                    refpartyinvno   : LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvno'),
                                    acctran_totamt  : LoadCollectionDetailsDataStore.getAt(i).get('acctrail_inv_value'),
                                    accref_voudate  : Ext.util.Format.date(LoadCollectionDetailsDataStore.getAt(i).get('accref_voudate'),"d-m-Y"), 
                                    refamount       : LoadCollectionDetailsDataStore.getAt(i).get('refamount'),
                                    acctrail_crdays : LoadCollectionDetailsDataStore.getAt(i).get('acctrail_crdays'),
                                    noofdays : LoadCollectionDetailsDataStore.getAt(i).get('noofdays'),
                                    daysfromduedate : LoadCollectionDetailsDataStore.getAt(i).get('daysfromduedate'),

                                })
                                );
      
                            }
                          grid_tot();
                        }
                    }
		 });



                var closing =0;
		LoadBalanceDueDataStore.removeAll();

		LoadBalanceDueDataStore.load({
		 url: 'ClsPaymentPerformance.php',
		        params: {
		    	task: 'loadBalanceDue',
		        compcode:compcode,
		        fincode:finid,
		        ledcode:accledcode,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
			},
                        scope:this,
                        callback:function(){
                        var cnt=LoadBalanceDueDataStore.getCount();
                        if(cnt>0){
                                 closing =  Number(LoadBalanceDueDataStore.getAt(0).get('opdr')) - Number(LoadBalanceDueDataStore.getAt(0).get('opcr')) + Number(LoadBalanceDueDataStore.getAt(0).get('trn_opdr')) - Number(LoadBalanceDueDataStore.getAt(0).get('trn_opcr')) + Number(LoadBalanceDueDataStore.getAt(0).get('trn_dr')) - Number(LoadBalanceDueDataStore.getAt(0).get('trn_cr'));                      
                                 txtClosing.setValue(closing);
                                 txtSales.setValue(Number(LoadBalanceDueDataStore.getAt(0).get('trn_sales')) );
 

                            }
                        }
		 });
             }
          }

});



var tabPerf = new Ext.TabPanel({
    id          : 'tabPerf',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 420,
    width       : 750,	
    x           : 470,
    y           : 65,
    items       : [
           {
             xtype: 'panel',
             title: ' DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [
		    {xtype: 'fieldset',
		        title: '',
		        width: 900,
		        height: 400,
		        x: 10,
		        y: 0,
		        border: false,
		        style: 'padding:0px',
		        items: [flxdetails]
		     }, 
             ]
           }
     ]
 });           




    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: '', bodyStyle: {"background-color": "WHITE"},
        width: 1285,
        height: 585,
        x: 25,
        y: 25,
        frame: false,
        id: 'fp',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', id: 'viewid1',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                                var p3 = "&compcode="+encodeURIComponent(GinCompcode);
                                var p5 = "&fromdate="+encodeURIComponent(fdate);

                                var param = (p3+p5);
if (Rpttype == "AR - Register")
{    
         if (printtype == "PDF")                             
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=pdf&' + param,  '_blank' );                            
         else
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign' + param,  '_blank' );                            
}
else
{
         if (printtype == "PDF")                             
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivablesAgewise.rptdesign&__format=pdf&' + param,  '_blank' );                            
         else
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivablesAgewise.rptdesign' + param,  '_blank' );                            
  
}

                        }
                    }
                }, '-',
                {
                 //   text: 'Note:Debit Note/Credit Note/Bank Payment/Bank Receipt/All Voucher wise Report Combine Input Result',
                    style: 'text-align:center;',
                     height: 40,
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                }
            ]
        },
        items: [

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 450,
                x: 10,
                y: 10,
                border: false,
                items: [txtCustomer]
            },

            {xtype: 'fieldset',
                title: '',
                id   : 'hidecontrol',  
                width: 430,
                height: 220,
                x: 100,
                y: 50,
                border: false,
                style: 'padding:0px',
                items: [flxParty]
             }, tabPerf,

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 300,
                border: false,
                items: [txtClosing]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 340,
                border: false,
                items: [txtSales]
            },



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 380,
                border: false,
                items: [txtAvg_NoofDays]
            },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 420,
                border: false,
                items: [txtAvg_NoofDays_Duedate]
            },



		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 80,
                     border  : false,
	             x       : 500,
		     y       : 10,
                     items: [monthstartdate]
                },
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
	             x       : 700,
		     y       : 10,
                     items: [monthenddate]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 900,
		     y       : 10,
                     items: [btnProcess]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1100,
		     y       : 10,
                     items: [btnView]
                },




        ]
    });

    var frmwindow = new Ext.Window({
        height: 600,
        width: 1300,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 30,
        items: fp,


onEsc:function(){
},
        listeners:
                {
                    show: function () {

                        
                    }
                }
    }).show();
});

