Ext.onReady(function() {
    Ext.QuickTips.init();
   var custcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var millname =localStorage.getItem('gstcompany');

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var monthname = '';


 var loadBillsCollectionDetailsDatastore = new Ext.data.Store({
        id: 'loadBillsCollectionDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_RepParty_Bills_Collection"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno', 'accref_voudate', 'acctran_cramt', 'refpartyinvno', 'refpartyinvdate', 'refamount'])
    });





   var txtTotalCollAmt = new Ext.form.NumberField({
        fieldLabel  : 'Total Collected Amt',
        id          : 'txtTotalCollAmt',
        name        : 'txtTotalCollAmt',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtTotalAdjAmt = new Ext.form.NumberField({
        fieldLabel  : 'Total Adj Amt',
        id          : 'txtTotalAdjAmt',
        name        : 'txtTotalAdjAmt',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



  function grid_tot3(){


        var invcoll = 0;

        var Row1= flxCollections.getStore().getCount();

        flxCollections.getSelectionModel().selectAll();
        var sel=flxCollections.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      invcoll=Number(invcoll)+Number(sel[i].data.refamount);
        }

        txttotCollection2.setValue(Ext.util.Format.number(invcoll,"0.00"));


}




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

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  


   var yearfinid=0;
   var totdb,totcr;

   var ledname="";
   var custcode=0;

   var custname="";
   var custcode=0;

   var partycollection = 0;

   var acctran_cust_code;
   var accrefvouno,clsbal; 
   var b='';
   var pvr_cramt,pvr_dbamt;
   var monthcode;
   var typevou;
   var accref_vouno;
   var accref_voudate;
   var accref_payref_no;
   var acctrail_inv_no;
   var acctradbamt;
   var acctrancramt;
   var accref_vou_type;
   var curbal_obcramt,curbal_obdbamt,monthtype;
   var fvr_opbal,fst_dbcr, balmon;
   var dgrecord = Ext.data.Record.create([]);
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);
   var flagtypenw;

    var repcode =0;

    var RepresentativeCode = 0;
    var RepresentativeName = '';


    var SubGroupCode = 0;
    var SubGroupName = '';

    var SubGroup2Code = 0;
    var SubGroup2Name = '';

    var SubLedgerCode = 0;
    var SubLedgerName = '';


   var printtype='PDF';

   var repopt ='Bills';




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
                  ProcessRepData();
             }
          }

});





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



function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    

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



    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);



    ProcessPartyCollectionData();
  
}


    function ProcessPartyCollectionData()
    {


        flxCollections.getStore().removeAll();
	loadBillsCollectionDetailsDatastore.removeAll();
	loadBillsCollectionDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task      : 'load_RepParty_Bills_Collection',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                custcode  : custcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadBillsCollectionDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                     for(var j=0; j<cnt; j++)
 	             { 

//alert(loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_inv_date'));
  //                     balamt = loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_inv_value')-loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_adj_value');
                       flxCollections.getStore().insert(
                       flxCollections.getStore().getCount(),
                       new dgrecord({

                           accref_voudate  : Ext.util.Format.date(loadBillsCollectionDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   accref_vouno : loadBillsCollectionDetailsDatastore.getAt(j).get('accref_vouno'),
 	                   acctran_cramt : loadBillsCollectionDetailsDatastore.getAt(j).get('acctran_cramt'),
 			   refpartyinvno  : loadBillsCollectionDetailsDatastore.getAt(j).get('refpartyinvno'),
                           refpartyinvdate  : Ext.util.Format.date(loadBillsCollectionDetailsDatastore.getAt(j).get('refpartyinvdate'),"d-m-Y"),
                           refamount : loadBillsCollectionDetailsDatastore.getAt(j).get('refamount'),
	

                        })
                       );
        
                   }   
                   } 
                   grid_tot3();  

 
                   


                }         
	  });

        var m1 = 0;
       
    }

  function MonthClick(){
                flxCollections.getStore().removeAll();

//		MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(monthname=="JANUARY"){
                    monthcode=1;
                }else  if(monthname=="FEBRUARY"){
                    monthcode=2;
                }else  if(monthname=="MARCH"){
                    monthcode=3;
                }else  if(monthname=="APRIL"){
                    monthcode=4;
                }else  if(monthname=="MAY"){
                    monthcode=5;
                }else  if(monthname=="JUNE"){
                    monthcode=6;
                }else  if(monthname=="JULY"){
                    monthcode=7;
                }else  if(monthname=="AUGUST"){
                    monthcode=8;
                }else  if(monthname=="SEPTEMBER"){
                    monthcode=9;
                }else  if(monthname=="OCTOBER"){
                    monthcode=10;
                }else  if(monthname=="NOVEMBER"){
                    monthcode=11;
                }else  if(monthname=="DECEMBER"){
                    monthcode=12;
                }

                find_dates(monthcode);     


  }


 var loadCustwiseColletionDatastore = new Ext.data.Store({
      id: 'loadCustwiseColletionDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"load_CustCollection_Abstract"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[  'month','collamt'

      ]),
    });



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_type'
      ]),
    });

   var txttotCollection = new Ext.form.NumberField({
        fieldLabel  : 'Total Collections',
        id          : 'txttotCollection',
        name        : 'txttotCollection',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 0,
    });

   var txttotCollection2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Collections',
        id          : 'txttotCollection2',
        name        : 'txttotCollection2',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 0,
    });


    var flxCollections = new Ext.grid.EditorGridPanel({
        frame: true,
        store: [],
	id:'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
	style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 350,
        width: 950,
        border:false,
  
        columns: [
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:false,width:100,align:'center', menuDisabled: true,
},
        {header: "Collection Amount" , dataIndex: 'acctran_cramt',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Inv. No"  , dataIndex: 'refpartyinvno',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Inv.Date"    , dataIndex: 'refpartyinvdate',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Adjusted"   , dataIndex: 'refamount',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Advance "   , dataIndex: 'advance',sortable:false,width:80,align:'right', menuDisabled: true},

        ]  

    });



    var btnCollectionPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Print",
	width   : 90,
	height  : 35,
        id: 'Print ',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(custcode);
//		    var p5 = "&ledname="+encodeURIComponent(ledname);
       

 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPartyDatewise_Collection.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPartyDatewise_Collection.rptdesign' + param, '_blank');	
                }
            }

    });



function grid_tot(){



        var coll = 0;

        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.collections) > 0)
              {
		      coll=coll+ Number(sel[i].data.collections);
              }
         }
         txttotCollection.setValue(coll);


}


function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsViewStatements.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}


function LedgerClick()
{


	loadCustwiseColletionDatastore.removeAll();
	loadCustwiseColletionDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_CustCollection_Abstract',
                compcode:Gincompcode,
                finid:GinFinid,
                custcode   : custcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadCustwiseColletionDatastore.getCount();

  		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
                     for (var i=0;i<selrows;i++){ 
    	                   sel[i].set('collections','0');
                       }
		 
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){ 


          

                     		    if (sel[i].data.month === loadCustwiseColletionDatastore.getAt(j).get('month'))
                  		    {
                                        sel[i].set('collections', Ext.util.Format.number(loadCustwiseColletionDatastore.getAt(j).get('collamt'),'0'));
;
			            }
                                       
                              }
			}

 grid_tot();  
                   }   
  
             //      grid_tot();  

     
	  });


}

   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 420,
        x: 10,
        y: 100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:330,align:'left'},
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
				custcode = selrow.get('cust_code');
				custtype = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_name'));   
                                flxLedger.hide();   

		        LedgerClick();
		        grpcodetds = 0;
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
				custcode  = selrow.get('cust_code');
				custtype    = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_name'));   
                                flxLedger.hide();   

		        LedgerClick();
		        grpcodetds = 0;
			}
		}
 
    
   }
   });





var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Ledger',
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


    var flxMonth = new Ext.grid.EditorGridPanel({
        frame: true,
        store: [],
	id:'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
	style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 350,
        width: 300,
        border:false,
        x: 370,
        y: 70,
        columns: [
            {header: "Month", dataIndex: 'moncode',width:50,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right',hidden:true},

            {header: "Month", dataIndex: 'month',width:140,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
		renderer : function(value, meta ,record) {
		    var monthcolor=record.get('month');
		    if(monthcolor=='JANUARY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='FEBRUARY') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MARCH') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='APRIL') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MAY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='JUNE') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='JULY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='AUGUST') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='SEPTEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='OCTOBER') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='NOVEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='DECEMBER') {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	    },
            {header: "Collections", dataIndex: 'collections',width:120,align:'right',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'},
        ],
         listeners :{
            'rowDblClick' : function(flxMonth,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(1);
                var selerow =flxMonth.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    monthname =selerow[i].get('month');
                }

                MonthClick();
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
        title: 'Monthly Collections',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 250,
			layout  : 'absolute',
			x       : 950,
			y       : 10,
			items:[optprinttype],
	    },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 450,
			     y       : 80,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 650,
			     y       : 80,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 900,
			     y       : 75,
                             items: [btnProcess]
                        },

		{
		    xtype       : 'fieldset',
		    x           : 1000,
		    y           : 75,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnCollectionPrint]
		},

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 40,
            height      : 100,
            width       : 500, 		 
            labelWidth  : 80,
            border      : false,
            items : [txtAccountName]
        },flxLedger,
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      :  410,
            x           : 10,
            y           : 120,
            border      : false,
            items : [flxMonth]
        },


        {
            xtype       : 'fieldset',
            title       : '',
 	   labelWidth  : 130,
            width       : 300,
            x           : 30,
            y           : 490,
            border      : false,
            items : [txttotCollection]
        },


        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height      : 410,
            x           : 320,
            y           : 120,
            border      : false,
            items : [flxCollections]
        },


        {
            xtype       : 'fieldset',
            title       : '',
 	   labelWidth  : 130,
            width       : 300,
            x           : 700,
            y           : 490,
            border      : false,
            items : [txttotCollection2]
        },







       ]
   }
]

});


var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
   for (var i=1;i<13;i++)
   {   
        switch (i) {
           case 1 :
             monthdisplay = "APRIL";
             monthcode = 4;
             break;
           case 2 :
             monthdisplay = "MAY";
             monthcode = 5;
             break;
           case 3 :
             monthdisplay = "JUNE";
             monthcode = 6;
             break;
           case 4 :
             monthdisplay = "JULY";
             monthcode = 7;
             break;
           case 5 :
             monthdisplay = "AUGUST";
             monthcode = 8;
             break;
           case 6 :
             monthdisplay = "SEPTEMBER";
             monthcode = 9;
             break;
           case 7 :
             monthdisplay = "OCTOBER";
             monthcode = 10;
             break;
           case 8 :
             monthdisplay = "NOVEMBER";
             monthcode = 11;
             break;
           case 9 :
             monthdisplay = "DECEMBER";
             monthcode = 12;
             break;
           case 10 :
             monthdisplay = "JANUARY";
             monthcode = 1;
             break;
           case 11 :
             monthdisplay = "FEBRUARY";
             monthcode = 2;
             break;
           case 12 :
             monthdisplay = "MARCH";
             monthcode = 3;
             break;
        
        }  
        var RowCnt = flxMonth.getStore().getCount() + 1;
        flxMonth.getStore().insert(
        flxMonth.getStore().getCount(),
        new dgrecord({
           moncode : monthcode,
           month  : monthdisplay,
       }) 
       );
   }
}



function Refreshdata()
{
    Month_Add_inGrid();
   flxLedger.hide();
}


var myWin = new Ext.Window({
    id     : 'myWin',
    height : 600,
    width  : 1340,
    bodyStyle: {"background-color": "#ffffdb"},
    x:10,
    y:20,
    maximized:false,
    items  :  [tabOverall],

onEsc:function(){
},
    listeners:{
      
        show:function(){
             
            Refreshdata();

;



        }
    }
});
myWin.show();
    });




