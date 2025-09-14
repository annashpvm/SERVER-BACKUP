Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


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
   optionselect ="P";
   optionDate ="P";


   var printtype='PDF';

   var repopt ='Over Due Bills Oustanding';

  function MonthClick(){



	//	MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(cmbMonth.getRawValue()=="JANUARY"){
                    monthcode=1;
                }else  if(cmbMonth.getRawValue()=="FEBRUARY"){
                    monthcode=2;
                }else  if(cmbMonth.getRawValue()=="MARCH"){
                    monthcode=3;
                }else  if(cmbMonth.getRawValue()=="APRIL"){
                    monthcode=4;
                }else  if(cmbMonth.getRawValue()=="MAY"){
                    monthcode=5;
                }else  if(cmbMonth.getRawValue()=="JUNE"){
                    monthcode=6;
                }else  if(cmbMonth.getRawValue()=="JULY"){
                    monthcode=7;
                }else  if(cmbMonth.getRawValue()=="AUGUST"){
                    monthcode=8;
                }else  if(cmbMonth.getRawValue()=="SEPTEMBER"){
                    monthcode=9;
                }else  if(cmbMonth.getRawValue()=="OCTOBER"){
                    monthcode=10;
                }else  if(cmbMonth.getRawValue()=="NOVEMBER"){
                    monthcode=11;
                }else  if(cmbMonth.getRawValue()=="DECEMBER"){
                    monthcode=12;
                }

                find_dates(monthcode);     



  }


function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
//alert(mmon);

    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 



    //mdays = Ext.util.Format.date(new Date(),"d");



//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);



    monthstartdate2.setValue(yr+"-"+rmon+"-01");
    monthenddate2.setValue(yr+"-"+rmon+"-"+mdays);

	
    loadvoucherList();
 
}



    var cmbMonth = new Ext.form.ComboBox({
        id         : 'cmbMonth',
        fieldLabel : 'Month',
        width      : 250,
	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        store : ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY',
                    'AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
        displayField:'month_name',
        valueField:'month_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners:{
            select :function(){
                MonthClick();
            }
        }
    });


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
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

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date() ,
       	enableKeyEvents: true,
        listeners:{
           blur:function(){

           },
           keyup:function(){

            },
           change:function(){


            },
        }  	

 
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });




    var monthstartdate2 = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate2',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   ,
        readOnly : true,
    });
    var monthenddate2 = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate2',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });






 var loadVouTypeListDataStore = new Ext.data.Store({
      id: 'loadVouTypeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouTypeList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['voutype', 'VouName', 'totrec', 'cancelrec' ]),
    });



 var loadVouTypeMonthDataStore = new Ext.data.Store({
      id: 'loadVouTypeMonthDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouTypeMonthwise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['vouyear', 'voumonth', 'voumonthname', 'totnos', 'cancelnos' ]),
    });



 var loadVouNoDataStore = new Ext.data.Store({
      id: 'loadVouNoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'accref_vou_type','accref_seqno','accref_vouno','accref_payref_no','accref_voudate','cust_name','acctran_dbamt','acctran_cramt','acctran_led_code' ]),
    });



var lblDetail = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});

var txtTotVouchers = new Ext.form.NumberField({
        fieldLabel  : 'Total Vouchers',
        id          : 'txtTotVouchers',
        name        : 'txtTotVouchers',
        width       : 60,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtTotCancelled = new Ext.form.NumberField({
        fieldLabel  : 'Cancelled',
        id          : 'txtTotCancelled',
        name        : 'txtTotCancelled',
        width       : 60,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

var optSelect = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optSelect',
        items: [
		{boxLabel: 'PartyWise', name: 'optSelect', id:'prtPartywise', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionselect ="P";
                                            loadvoucherList();

					}
				}
			}
		},
		{boxLabel: 'All Details', name: 'optSelect', id:'optAllDetails', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionselect ="A";
                                            loadvoucherList();
					}
				}
			}
		},
            
        ],
    }



    ]
});

var optDate = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optDate',
        items: [
		{boxLabel: 'Period', name: 'optDate', id:'optPeriod', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionDate ="P";
                                            loadvoucherList();

					}
				}
			}
		},
		{boxLabel: 'For Date', name: 'optDate', id:'optDate', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    optionDate ="D";
                                            loadvoucherList();
					}
				}
			}
		},
            
        ],
    }



    ]
});

   var txttotProdQty = new Ext.form.NumberField({
        fieldLabel  : 'Prodn Qty',
        id          : 'txttotProdQty',
        name        : 'txttotProdQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txttotSalesQty',
        name        : 'txttotSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Tot.Inv.Amout',
        id          : 'txttotSalesValue',
        name        : 'txttotSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });



   var txtSalesQty = new Ext.form.NumberField({
        fieldLabel  : 'Sales Qty',
        id          : 'txtSalesQty',
        name        : 'txtSalesQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtSalesValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Inv.Amt',
        id          : 'txtSalesValue',
        name        : 'txtSalesValue',
        width       :  110,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

var btnBack = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "BACK",
	width   : 80,
	height  : 35,
	x       : 700,
	y       : 430,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
                 flxVouTypeList.show(); 

                
       	 }
        }   
});


  function grid_tot(){
	totvouchers="";
        cancelledvouchers="";
//alert("Hello");
        var Row1= flxVouTypeListMonthwise.getStore().getCount();
        flxVouTypeListMonthwise.getSelectionModel().selectAll();
        var sele=flxVouTypeListMonthwise.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totvouchers=Number(totvouchers)+Number(sele[i].data.totnos);
            cancelledvouchers=Number(cancelledvouchers)+Number(sele[i].data.cancelnos);
        }
        txtTotVouchers.setRawValue(Ext.util.Format.number(totvouchers,"0"));
        txtTotCancelled.setRawValue(Ext.util.Format.number(cancelledvouchers,"0"));
}






function loadvoucherList()
{
    loadVouNoDataStore.removeAll();
    loadVouNoDataStore.load({
	url: 'ClsViewStatements.php',
	params: {
    	task: 'loadVouNoList',
	compcode:Gincompcode,
	finid:GinFinid,
        startdate: Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"),  
        enddate  : Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"),  
        voutype  : vouchertype, 
        ledtype  : optionselect, 
	},
	scope:this,
	callback:function()
	{

           grid_tot();
	}
    });

}


var dgrecord = Ext.data.Record.create([]);
var flxVouTypeList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:40,
    height: 340,
    hidden:false,
    width: 380,
   // id: 'my-grid5',  

    columns:
    [ 	 	
        {header: "Vou type" , dataIndex: 'voutype',sortable:false,width:60,align:'left', menuDisabled: true,hidden:true},
        {header: "Vou Name" , dataIndex: 'VouName',sortable:false,width:200,align:'left', menuDisabled: true,
        },
        {header: "Vouchers" , dataIndex: 'totrec',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Canelled" , dataIndex: 'cancelrec',sortable:false,width:80,align:'left', menuDisabled: true},

    ],
    store:loadVouTypeListDataStore,
    listeners :{	

            'cellDblclick': function (flxVouTypeList, rowIndex, cellIndex, e) {
		var sm = flxVouTypeList.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));
            vouchertype = selrow.get('voutype')
     

	loadVouTypeMonthDataStore.removeAll();
	loadVouTypeMonthDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouTypeMonthwise',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                voutype : vouchertype,
		},

       	scope:this,
		callback:function()
		{
                   grid_tot();

		}
	    });

     
    }
 }
});


var flxVouNoDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:180,
    y:40,
    height: 360,
    hidden:false,
    width: 880,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Vou Type" , dataIndex: 'accref_vou_type',sortable:false,width:90,align:'left', menuDisabled: true,hidden : true
},
        {header: "Seq No" , dataIndex: 'accref_seqno',sortable:true,width:125,align:'center', menuDisabled: true,hidden : true
},
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:true,width:125,align:'center', menuDisabled: true,
},
        {header: "Ref/Inv No" , dataIndex: 'accref_payref_no',sortable:false,width:125,align:'left', menuDisabled: true,
},
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:true,width:100,align:'center', menuDisabled: false},
        {header: "Ledger" , dataIndex: 'cust_name',sortable:true,width:280,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('cust_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }},
        {header: "Debit" , dataIndex: 'acctran_dbamt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Credit" , dataIndex: 'acctran_cramt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Head Code" , dataIndex: 'acctran_led_code',sortable:false,width:80,align:'right', menuDisabled: true,hidden : true},

    ],
    store:loadVouNoDataStore,
    listeners:{	

            'cellDblclick': function (flxVouTypeList, rowIndex, cellIndex, e) {



		var sm = flxVouTypeList.getSelectionModel();
		var selrow = sm.getSelected();


                voutype = selrow.get('accref_vou_type');


                    if (voutype == "GJV")
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param, '_blank');
                    }     
                    else if (voutype == "CHR" || voutype == "BKR")
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&seqno="+encodeURIComponent( selrow.get('accref_seqno'));
 		    var param = (p1+p2+p3) ;

                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param, '_blank');
                    }       
                    else if (voutype == "CHP"  || voutype == "BKP" )
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&seqno="+encodeURIComponent( selrow.get('accref_seqno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign' + param, '_blank');
                    }   
                    else if (voutype == "GSI" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&invno="+encodeURIComponent( selrow.get('accref_payref_no'));
                    i1 = "ORIGINAL FOR BUYER";
         	    var p4 = "&displayword=" + encodeURIComponent(i1);
                    var param = (p1 + p2 + p3 + p4  ); 
                    if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                    else
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign'+ param); 
                    }  
                    else if (voutype == "OSI" )
                    {  
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&invno="+encodeURIComponent( selrow.get('accref_payref_no'));
                    i1 = "ORIGINAL FOR BUYER";
         	    var p4 = "&displayword=" + encodeURIComponent(i1);
                    var param = (p1 + p2 + p3 + p4  ); 


                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf' + param);  
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                    }   
                    else if (voutype == "PWP" || voutype == "PIW" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param);
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param);  
                    }    
                    else if (voutype == "PFU" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var param = (p1 + p2 + p3 ); 

                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 
                    }  
                    else if (voutype == "PGS" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 ="&minno="+encodeURIComponent(selrow.get('accref_vouno'));
                    var p4 ="&purtype="+encodeURIComponent(voutype);
                    var param = (p1 + p2 + p3 + p4 ); 
                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
                    }  
    }
 }
});


var flxVouTypeListMonthwise = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:40,
    height: 340,
    hidden:false,
    width: 500,
   // id: 'my-grid5',  

    columns:
    [ 	 	
        {header: "Vou Year" , dataIndex: 'vouyear',sortable:false,width:60,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'voumonth',sortable:false,width:60,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'voumonthname',sortable:false,width:200,align:'left', menuDisabled: true,},

        {header: "Vouchers" , dataIndex: 'totnos',sortable:false,width:80,align:'center', menuDisabled: true},
        {header: "Canelled" , dataIndex: 'cancelnos',sortable:false,width:80,align:'center', menuDisabled: true},

    ],
    store:loadVouTypeMonthDataStore,
    listeners :{	
            'rowDblClick' : function(flxMonth,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(1);
                var selerow =flxVouTypeListMonthwise.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    var a =selerow[i].get('voumonthname');
                }
                cmbMonth.setRawValue(a);

                flxVouNoDetail.getStore().removeAll();

                MonthClick();
            }

    }
});



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
	flxVouNoDetail.getStore().removeAll();     
	loadVouNoDataStore.removeAll();

	loadVouNoDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouNoList',
		compcode:Gincompcode,
		finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                voutype    : vouchertype, 
                ledtype    : optionselect, 
		},

       	scope:this,
		callback:function()
                { 

//       grid_tot();
                     var cnt=loadVouNoDataStore.getCount();
                        if(cnt>0){
                        }
                }

	    });

   //              grid_tot();
       	 }
        }   
});



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
        title: 'Voucher List',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 20,
                     items: [flxVouTypeList]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 410,
		     y       : 20,
                     items: [flxVouTypeListMonthwise]
                },	

		{
		    xtype       : 'fieldset',
		    width       : 800,
		    height      : 100,
		    labelWidth  : 120,
		    x           : 500,
		    y           : 365,
		    border      : false,
		    items : [txtTotVouchers]
		},


		{
		    xtype       : 'fieldset',
		    width       : 800,
		    height      : 100,
		    labelWidth  : 100,
		    x           : 700	,
		    y           : 365,
		    border      : false,
		    items : [txtTotCancelled]
		},
          ] 
       },

       {
        xtype: 'panel',
        title: 'Voucher Details',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{
			    xtype       : 'fieldset',
			    title       : '',
			    x           : 10,
			    y           : 10,
			    height      : 100,
			    labelWidth  : 80,
			    border      : false,
			    items : [cmbMonth]
			},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 10,
                             items: [monthstartdate2]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 600,
			     y       : 10,
                             items: [monthenddate2]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 800,
			     y       : 10,
                             items: [btnProcess]
                        },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 60,
                     items: [flxVouNoDetail]
                },	
        ]
       }        
       ]       
   });







   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 890,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POST',
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

       
//                    var fdate=Ext.getCmp('monthstartdate').value;
//                    var tdate=Ext.getCmp('monthenddate').value;
//                    var d1 =  fdate + " 00:00:00.000";
//                    var d2 =  tdate + " 00:00:00.000";


             

                    var vou = "&voutype="+encodeURIComponent(vouchertype);
                    var fd = "&fmdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                    var td = "&tdate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var comp = "&comp="+encodeURIComponent(Gincompcode);

                    var param = (vou+fd+td+comp) ;


if  (optionselect == "P")
             
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegisterParty.rptdesign' + param, '_blank');	
else
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign' + param, '_blank');

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
                height  : 520,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,

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
		             x       : 220,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 10,
                             items: [btnProcess]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 120,
			layout  : 'absolute',
			x       : 800,
			y       : 0,
			items:[optSelect],
		},	
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 120,
			layout  : 'absolute',
			x       : 900,
			y       : 0,
			items:[optDate],
		},	
		
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 250,
			layout  : 'absolute',
			x       : 1050,
			y       : -5,
			items:[optprinttype],
		},

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 60,
                     items: [tabOverall]
                },



	
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {

      var dt_today = new Date();     
      monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d"));

	loadVouTypeListDataStore.removeAll();
	loadVouTypeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouTypeList',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{


		}
	    });

    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 610,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'VOUCHER Details',
        items       : RepPrePrintFormPannel,
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
