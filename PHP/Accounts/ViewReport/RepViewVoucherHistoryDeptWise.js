Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   

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

   userselect ="A";
   vouselect ="A";

    var userid = 0; 
    var entryby = ''; 
  
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
            baseParams:{task:"loadVouNoHistory"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'accref_seqno','accref_vou_type', 'accref_vouno', 'accref_voudate', 'accref_payref_no', 'accref_payref_date', 'accvou_slno', 'accvou_date', 'accvou_narration', 'usr_name', 'usr_login'
 ]),
    });

 var loadUserListDataStore = new Ext.data.Store({
      id: 'loadUserListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVouNoHistoryDept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'usr_name', 'usr_code', 'totrecords'
 ]),
    });


var loadDepartmentListdatastore = new Ext.data.Store({
      id: 'loadDepartmentListdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/MIS/MasUsers/ClsMasUser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDepartmentList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'department_code','department_name'

      ]),
});

function process_data()
{
    loadUserListDataStore.removeAll();
    loadUserListDataStore.load({
	url: 'ClsViewStatements.php',
	params: {
	    task: 'loadVouNoHistoryDept',
	    deptcode: cmbDept.getValue(),
	    compcode:Gincompcode,
            finid:GinFinid,
            startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
            enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
	},
      	callback:function()
	{
            grid_tot();
         }
    }); 
}

 var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width           : 200,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbDept',
        typeAhead       : true,
        mode            : 'local',
        store           :loadDepartmentListdatastore,
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
            process_data();
            grid_tot();

           }
       }
    }); 
     




var lblEntryBy = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblEntryBy',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});


   var txttotRecords = new Ext.form.NumberField({
        fieldLabel  : 'Total No. of Records',
        id          : 'txttotRecords',
        name        : 'txttotRecords',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });

   var txttotRecords2 = new Ext.form.NumberField({
        fieldLabel  : 'Total No. of Records',
        id          : 'txttotRecords2',
        name        : 'txttotRecords2',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });




var dgrecord = Ext.data.Record.create([]);




function grid_tot(){

        var rec = 0;
        var Row= flxUserDetail.getStore().getCount();
        flxUserDetail.getSelectionModel().selectAll();
        var sel=flxUserDetail.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
           if (Number(sel[i].data.totrecords) > 0)
           {
             rec = Number(rec)+Number(sel[i].data.totrecords);
           }
         }
         txttotRecords.setValue(rec);
}


var flxUserDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 310,
    hidden:false,
    width: 310,
    id: 'my-grid',  

    columns:
    [ 	
        {header: "User Name" , dataIndex: 'usr_name',sortable:false,width:175,align:'left', menuDisabled: true }, 	
        {header: "User Code" , dataIndex: 'usr_code',sortable:false,width:90,align:'left', menuDisabled: true,hidden : true},

        {header: "No.of.Vou(s)" , dataIndex: 'totrecords',sortable:false,width:100,align:'center', menuDisabled: true,
},
    ],
    store: loadUserListDataStore,
    listeners:{	

            'cellDblclick': function (flxUserDetail, rowIndex, cellIndex, e) {

		var sm = flxUserDetail.getSelectionModel();
		var selrow = sm.getSelected();
                userid  = selrow.get('usr_code');
                entryby = selrow.get('usr_name');

                lblEntryBy.setText("Detail for  : " + entryby );
                lblEntryBy.getEl().setStyle('color', 'red');
                lblEntryBy.getEl().setStyle('font-size', '18px');
                lblEntryBy.getEl().setStyle('font-weight', 'bold');  


              
	flxVouNoDetail.getStore().removeAll();     
	loadVouNoDataStore.removeAll();

	loadVouNoDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadVouNoHistory',
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
          txttotRecords2.setValue(flxVouNoDetail.getStore().getCount());    
                        }
            

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
    x:200,
    y:40,
    height: 350,
    hidden:false,
    width: 1250,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Seq.No" , dataIndex: 'accref_seqno',sortable:false,width:90,align:'left', menuDisabled: true,hidden : true},
        {header: "Vou Type" , dataIndex: 'accref_vou_type',sortable:false,width:90,align:'left', menuDisabled: true,hidden : true },
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:false,width:90,align:'center', menuDisabled: true,
},
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Ref/Inv No" , dataIndex: 'accref_payref_no',sortable:false,width:130,align:'left', menuDisabled: true},
        {header: "Ref/Inv Date" , dataIndex: 'accref_payref_date',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Sl No" , dataIndex: 'accvou_slno',sortable:false,width:60,align:'left', menuDisabled: true,
},
        {header: "Entry Date" , dataIndex: 'accvou_date',sortable:false,width:100,align:'left', menuDisabled: true,
},
        {header: "Reason" , dataIndex: 'accvou_narration',sortable:false,width:350,align:'left', menuDisabled: true,
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


        {header: "User Login" , dataIndex: 'usr_login',sortable:false,width:100,align:'left', menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var vou=record.get('usr_login');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }},

    ],
    store: loadVouNoDataStore,
    listeners:{	

            'cellDblclick': function (flxVouTypeList, rowIndex, cellIndex, e) {



		var sm = flxVouTypeList.getSelectionModel();
		var selrow = sm.getSelected();

                voutype = selrow.get('accref_vou_type');

 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&vouno="+encodeURIComponent( selrow.get('accref_vouno'));
 		    var param = (p1+p2+p3) ;

                    if (voutype == "GJV")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param, '_blank');
                    }     
                    else if (voutype == "CIR" || voutype == "BKR")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param, '_blank');
                    }       
                    else if (voutype == "CIP"  || voutype == "BKP" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
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
                    else if (voutype == "PLW" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(grnno);
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param);
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param);  
                    }    
                    else if (voutype == "PPF" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 = "&grnno="+encodeURIComponent(grnno);
                    var param = (p1 + p2 + p3 ); 
                    if (printtype == "PDF") 
	         	window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                    else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 
                    }  
                    else if (voutype == "PSC" || voutype == "PSP" )
                    {  
                    grnno =  selrow.get('accref_vouno').substring(3);
 		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
 		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
                    var p3 ="&minno="+encodeURIComponent(grnno);
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
                             border  : false,
		             x       : 650,
			     y       : 10,
                             items: [lblEntryBy]
                        },


	                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 120,
                                             width       : 560,
                                             x           : 5,
                                             y           : 70,
                                             border      : false,
                                             items: [cmbDept]
                                        },
	


	
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 100,
                     items: [flxUserDetail]
                },	


	
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 350,
		     y       : 60,
                     items: [flxVouNoDetail]
                },	

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 150,
                             border  : false,
		             x       : 10,
			     y       : 415,
                             items: [txttotRecords]
                        },
  
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 150,
                             border  : false,
		             x       : 510,
			     y       : 415,
                             items: [txttotRecords2]
                        },
	
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {

       



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
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
