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

var dbcr = "D";
var ledcode = 0;




 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAdjustment.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_ref','cust_type'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsAdjustment.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate',
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


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 450,
        x: 100,
        y: 120,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:450,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:0,align:'left'},
        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('cust_code');
				custcode = selrow.get('cust_code');
				ledtype  = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_ref'));   



                                lblParty1.setText("Report For "+ selrow.get('cust_ref'));


		                grpcodetds = 0;
                                LedgerChangeRefresh();
          		        LedgerClick(); 
                                ProcessPartyBillsData();
                                ProcessPartyCollectionData();
                                ProcessPaymentPerformance();

			}
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('cust_code'));

			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('cust_code');
				custcode = selrow.get('cust_code');
				ledtype    = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_ref'));  

                                lblParty1.setText("Report For "+ selrow.get('cust_ref'));
   

			}
		}
 
    
   }
   });




var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Ledger Name',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
            //       cmbType.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtAccountName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtAccountName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
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
                                           dbcr = "D";
					}
				}
			}
		},
             {boxLabel: 'Credit', name: 'optVouType', id:'optCredit', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   voutype  ="Credit";
                                           dbcr = "C";

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
			    var p1 = "&compcode="+encodeURIComponent(compcode);      
			    var p2 = "&fincode=" + encodeURIComponent(finid);

			    var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
		            var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
			    var p5 = "&ledcode="+encodeURIComponent(ledcode);                
	       		    var p6 = "&drcr="+encodeURIComponent(dbcr);

	 		    var param = (p1+p2+p3+p4+p5+p6) ;

		            if (printtype == "PDF") 
		            window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BillAdjustment_Partywise.rptdesign&__format=PDF&'+param,  '_blank' );
			    else if (printtype == "XLS") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BillAdjustment_Partywise.rptdesign&__format=XLS' + param, '_blank');
		            else
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BillAdjustment_Partywise.rptdesign' + param, '_blank');
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

		      

		{
		    xtype       : 'fieldset',
		    title       : '',
		    x           : 10,
		    y           : 80,
		    height      : 100,
		    width:500, 		 
		    labelWidth  : 100,
		    border      : false,
		    items : [txtAccountName]
        },     flxLedger,



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             width       : 250,
                             border  : false,
		             x       : 600,
			     y       : 100,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width       : 250,
		             x       : 600,
			     y       : 140,
                             items: [monthenddate]
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
