Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   
   var dgrecord = Ext.data.Record.create([]);
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');


   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var printtype = "PDF";
   var voutype = 'GJV'
   var vouchertype = '';

   var docseqno = 0;
   userselect ="A";
   vouselect ="A";

new Ext.KeyMap( Ext.getBody(), [{
            key: "v",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                view_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             ReppreprintWindow.hide();

            }
        }]);



var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
  //  title: 'Report Format type',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
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



    function view_click()
    {

	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
	var p2 = "&fincode=" + encodeURIComponent(GinFinid);
	var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d 00:00:00.000"));
	var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d 23:59:59.000"));
	var param = (p1+p2+p3+p4) ;
        if (printtype == "PDF") 
    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherModificaitonHistory.rptdesign&__format=pdf&' + param, '_blank');
        else if (printtype == "XLS") 

    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherModificaitonHistory.rptdesign&__format=XLS' + param, '_blank');
        else
    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherModificaitonHistory.rptdesign&' + param, '_blank');   

    }  


      var VouNoClickLoadDataStore = new Ext.data.Store({
        id: 'VouNoClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date'])
    });

    var VouNoClickDetailsDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickDetails"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_paymode','accref_payref_no','accref_payref_date','accref_narration'])
    });


  var VouNoClickDetailsNewDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsNewDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"VouNoClickDetailsNew"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'accref_narration','accref_payref_no','accref_payref_date'
        ])
    });


  var VouNoHistoryDataStore = new Ext.data.Store({
        id: 'VouNoHistoryDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"loadVouNoModifyHistoryDetail"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'modified_date','cust_name','acctran_dbamt','acctran_cramt'
        ])
    });
    var txtVouDate = new Ext.form.TextField({
        fieldLabel  : 'Voucher Date',
        id          : 'txtVouDate',
        name        : 'txtVouDate',
        readOnly: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtVouNo = new Ext.form.TextField({
        fieldLabel  : 'Voucher No',
        id          : 'txtVouNo',
        name        : 'txtVouNo',
        readOnly: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtLtotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtLtotdebit',
        name        : 'txtLtotdebit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtLtotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txtLtotcredit',
        name        : 'txtLtotcredit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var userid = 0;   
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


 var loadVouNoDataStore = new Ext.data.Store({
      id: 'loadVouNoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoModifyHistory"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'accref_seqno','accref_voudate','accref_vouno', 'accref_payref_no','accref_payref_date','accvou_slno', 'accvou_date', 'usr_name', 'accvou_narration'
 ]),
    });



  var Ledger2DataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: 'clsFinancials.php'
            }),
             baseParams:{task:"loadgrid"},
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'Ledger2DataStore'
        },[
           'invno','pdate','invval','atype'
          ])
    });




  var flxld = new Ext.grid.EditorGridPanel({
        frame: false,
        store: Ledger2DataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
	id:'my-grid3',
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
        style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'	     
        },
	columnLines: true,
        height: 220,
        width: 500,
        border:false,
   //     x: 370,
//        y: 40,
        columns: [
            {header: "Ledger Name", dataIndex: 'ledger',width:280,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
            renderer : function(value, meta ,record) {
		    var deb=record.get('debit');
		    var cre=record.get('credit');
		    if(deb>0) {
			meta.style = "background-color:#FFDEAD;";
		    }else if(cre>0) {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	   },
            {header: "Debit", dataIndex: 'debit',width:105,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'
	    },
            {header: "Credit", dataIndex: 'credit',width:105,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'}
        ]
    });


  var flxOldld = new Ext.grid.EditorGridPanel({
        frame: false,
        store: VouNoHistoryDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
	id:'my-grid3',
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
        style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 380,
        width: 680,
        border:false,
     //   x: 370,
//        y: 40,
        columns: [
            {header: "Modified", dataIndex: 'modified_date',width:160,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'center'
	    },
            {header: "Ledger Name", dataIndex: 'cust_name',width:250,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
            renderer : function(value, meta ,record) {
		    var deb=record.get('debit');
		    var cre=record.get('credit');
		    if(deb>0) {
			meta.style = "background-color:#FFDEAD;";
		    }else if(cre>0) {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	   },
            {header: "Debit", dataIndex: 'acctran_dbamt',width:105,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'
	    },
            {header: "Credit", dataIndex: 'acctran_cramt',width:105,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'}
        ]
    });

var loadUserdatastore = new Ext.data.Store({
      id: 'loadUserdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadUsersList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'usr_code','usr_name'

      ]),
});




 var cmbUser = new Ext.form.ComboBox({
        fieldLabel      : 'User Name',
        width           : 250,
        displayField    : 'usr_name', 
        valueField      : 'usr_code',
        hiddenName      : '',
        id              : 'cmbUser',
        typeAhead       : true,
        mode            : 'local',
 //       x               : 470,
//        y               : 5,
         
        store           :loadUserdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
        enableKeyEvents: true,
        listeners:{
          select: function(){
               userid =  cmbUser.getValue();
                process_data();

          }
	}
   }); 





var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});



var optUserSelect = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    style: {
            'color':'#00001a','text-align': 'left',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optUserSelect',
        items: [
		{boxLabel: 'All Users', name: 'optUserSelect', id:'allusers', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    userselect ="A";

					}
				}
			}
		},
		{boxLabel: 'Selective users', name: 'optUserSelect', id:'selectiveuser', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
				         userselect ="S";

					}
				}
			}
		},
            
        ],
    },



    ]
});







var dgrecord = Ext.data.Record.create([]);


  function grid_tot_trans(){
	pvr_dbamt="";
        pvr_cramt="";
        var Row= flxld.getStore().getCount();
        flxld.getSelectionModel().selectAll();
        var sel=flxld.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.debit);
            pvr_cramt=Number(pvr_cramt)+Number(sel[i].data.credit);
        }
        txtLtotdebit.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtLtotcredit.setRawValue(Ext.util.Format.number(pvr_cramt,"0.00"));
}



  function VoucherClick(){



	       VouNoClickLoadDataStore.removeAll();
	       VouNoClickDetailsDataStore.removeAll();
               flxld.getStore().removeAll();

               VouNoClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'VouNoClickLoad',
                        fcompcode:Gincompcode,
                        ffinid:GinFinid,
                        vouno:txtVouNo.getRawValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){
//alert(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                for(var i=0;i<cnt;i++){
                                var lednam=VouNoClickLoadDataStore.getAt(i).get('cust_name');
                                var acctdbamt=VouNoClickLoadDataStore.getAt(i).get('acctran_dbamt');
                                var acctcramt=VouNoClickLoadDataStore.getAt(i).get('acctran_cramt');
                                flxld.getStore().insert(
                                flxld.getStore().getCount(),
                                new dgrecord2({
                                    ledger:lednam,
                                    debit:acctdbamt,
                                    credit:acctcramt
                                })
                                );
                              grid_tot_trans();
                          }
                           VouNoClickDetailsDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetails',
                                    fcompcode:Gincompcode,
                                    ffinid:GinFinid,
                                    vouno:txtVouNo.getRawValue()
                                },
                                callback:function(){

                                }
                            });
                        }
                    }
                });

	       VouNoHistoryDataStore.removeAll();
	       VouNoHistoryDataStore.removeAll();
               flxOldld.getStore().removeAll();

               VouNoHistoryDataStore.load({
                    url: 'ClsViewStatements.php',
                    params:{
                        task:'loadVouNoModifyHistoryDetail',
                        seqno:docseqno,
                    },
                    callback:function(){
                    }
               });  

  }

var flxVouNoDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:40,
    height: 430,
    hidden:false,
    width: 1250,
    id: 'my-grid',  


    columns:
    [ 	 	
        {header: "Seq.No" , dataIndex: 'accref_seqno',sortable:false,width:80,align:'left', menuDisabled: true,hidden:true},
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:100,align:'left', menuDisabled: true},

        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:false,width:80,align:'center',
},
        {header: "Ref/Inv No" , dataIndex: 'accref_payref_no',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Ref/Inv Date" , dataIndex: 'accref_payref_date',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Sl No" , dataIndex: 'accvou_slno',sortable:false,width:60,align:'left', menuDisabled: true,
},
        {header: "Effected Date" , dataIndex: 'accvou_date',sortable:false,width:170,align:'left', menuDisabled: true,
},



        {header: "User Name" , dataIndex: 'usr_name',sortable:false,width:160,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('usr_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }},

        {header: "Reason" , dataIndex: 'accvou_narration',sortable:false,width:350,align:'left', menuDisabled: true,
},

    ],
    store: loadVouNoDataStore,
          listeners :{

            specialkey: function(f,e){  
                if(e.getKey()==e.ENTER){  
                    alert("I hit enter!"); 
                }  
            },

            'rowDblClick' : function(flxVouNoDetail,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(1);
                var selerow =flxVouNoDetail.getSelectionModel().getSelections();

                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                     docseqno = selerow[i].get('accref_seqno');
                     vdate =selerow[i].get('accref_voudate');

                }


//alert(b);
                txtVouNo.setRawValue(b);
                txtVouDate.setRawValue(vdate);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },
/*
             'cellclick': function (flxdetails, rowIndex, cellIndex, e) {

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
                                    fcompcode:Gincompcode,
                                    ffinid:GinFinid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
       //  tabOverall.setActiveTab(1);
                                     }
                                }
                            });

	   },
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

//                tabOverall.setActiveTab(2);
                var selerow =flxdetails.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                txtVouNo.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },
*/
        },
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 35,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'VIEW',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                             view_click();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            myWin.hide();
                        }
                    }
                }
            ]
        },
});


function process_data()
{
	flxVouNoDetail.getStore().removeAll();     
	loadVouNoDataStore.removeAll();

	loadVouNoDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouNoModifyHistory',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                usrcode : userid,  
		},

       	scope:this,
		callback:function()
                { 


                     var cnt=loadVouNoDataStore.getCount();
                        if(cnt>0){
                        }
                }

	    });

}

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

               process_data();

       	 }
        }   
});


    
   var btnview = new Ext.Button({
        style   : 'text-align:center;',
        text    : " VIEW DOCUMENT",
        width   : 100,id:'btnview',
        x       : 10,
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&seqno=" + encodeURIComponent(docseqno);

 	 	   var param = (p1 + p2 + p3);   

		   if (printtype == "PDF") 
		    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherHistory.rptdesign&__format=pdf&' + param, '_blank');
		   else if (printtype == "XLS") 

		    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherHistory.rptdesign&__format=XLSX' + param, '_blank');
		   else
		    	   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccVoucherHistory.rptdesign&' + param, '_blank');  


	    }
	}
	});


/*
   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POS7T',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
//view
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(finstartdate,"Y-m-d"));
				var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(new Date(),"Y-m-d"));
                              	var p5 = "&custcode=" + encodeURIComponent(cmbCustomer.getValue());
				var param = (p1+p2+p3+p4+p5) ;
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepViewPartySales.rptdesign&' + param, '_blank');

			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                           ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 490,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 30,

                items:[


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 10,
			     y       : 10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 210,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 410,
			     y       : 10,
                             items: [btnProcess]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 300,
			layout  : 'absolute',
			x       : 550,
			y       : 5,
			items:[optUserSelect ],
		},	

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 300,
			layout  : 'absolute',
			x       : 850,
			y       : 5,
			items:[cmbUser],
		},	
	
	
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 20,
		     y       : 60,
                     items: [flxVouNoDetail]
                },	

  
	
                ]

            },
            
        ],
    });
*/
    
    function Refreshdata()
    {
        process_data();       
    }  

   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'TRANSACTIONS Details',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 10,
			     y       : 10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 210,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 410,
			     y       : 10,
                             items: [btnProcess]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 300,
			layout  : 'absolute',
			x       : 550,
			y       : 5,
			items:[optUserSelect],
		},	

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 300,
			layout  : 'absolute',
			x       : 850,
			y       : 5,
			items:[cmbUser],
		},	
	
	
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 20,
		     y       : 60,
                     items: [flxVouNoDetail]
                },	

  
		{ 
			xtype   : 'fieldset',
			title   : '',
//			layout  : 'hbox',
			border  : false,
			height  : 100,
			width   : 120,
			layout  : 'absolute',
			x       : 1200,
			y       : -15,
			items:[optprinttype],
		},

        ]
    },
    {
        xtype: 'panel',
        title: 'Voucher Detail',
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtVouNo]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtVouDate]
        },

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 900,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [btnview]
        },
        { xtype   : 'fieldset',
                title   : 'CURRENT DATA',
                layout  : 'hbox',
                border  : true,
                height  : 430,
                width   : 550,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 100,

                items:[

		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 600,
		    height      : 235,
		    x           : 10,
		    y           : 10,
		    border      : false,
		    items : [flxld]
		},
		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 260,
		    labelWidth  : 120,
		    border      : false,
		    width       :250,
		    items : [txtLtotdebit]
		},
		{
		    xtype       : 'fieldset',
		    x           : 240,
		    y           : 260,
		    border      : false,
		    labelWidth  : 120,
		    width       :250,
		    items : [txtLtotcredit]
		},
              ]
           },


        { xtype   : 'fieldset',
                title   : 'OLD DATA',
                layout  : 'hbox',
                border  : true,
                height  : 430,
                width   : 750,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 565,
                y       : 100,

                items:[

		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 800,
		    height      : 400,
		    x           : 10,
		    y           : 10,
		    border      : false,
		    items : [flxOldld]
		},

              ]
           },
        ]
    },

        ]

});

   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'VOUCHER Modifications Details',
        items       : tabOverall,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

onEsc:function(){
},
	listeners:{
               show:function(){

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
