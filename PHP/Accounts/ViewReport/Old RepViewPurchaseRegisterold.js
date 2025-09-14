Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');
   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";




 var loadPurchaseDetailsDatastore = new Ext.data.Store({
      id: 'loadPurchaseDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPurchaseDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'dramt', 'cramt', 'value1'


      ]),
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


function grid_tot(){

        var dr = 0;
        var cr = 0;
        var clo = 0;
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.debit)+Number(sel[i].data.credit) > 0)
              {
	      dr=Number(dr)+Number(sel[i].data.debit);
	      cr=cr+Number(sel[i].data.credit);
              } 
         }
         txtTotalDebit.setValue(dr);
         txtTotalCredit.setValue(cr);
         txtTotalClosing.setValue(Math.abs(dr-cr));

}

   var vouchertype = '';
   optionselect ="P";

    var txtFinYear = new Ext.form.NumberField({
        fieldLabel  : 'Finance Year',
        id          : 'txtFinYear',
        name        : 'txtFinYear',
        width       : 80,
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


   var txtTotalDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtTotalDebit',
        name        : 'txtTotalDebit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


   var txtTotalCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtTotalCredit',
        name        : 'txtTotalCredit',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });


   var txtTotalClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtTotalClosing',
        name        : 'txtTotalClosing',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

    var monthStartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthStartdate',
	format: 'Y-m-d',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });
    var monthEnddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthEnddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'Y-m-d',
        value: new Date()   
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
	flxdetails.getStore().removeAll();     
	MonthClickVocDataStore.removeAll();

	MonthClickVocDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDocumentList',
                compcode:compcode,
                finid:finid,
                ledcode:ledcode,
                startdate: Ext.util.Format.date(monthStartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthEnddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
                { 
                     var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){
			    acctradbamt=0;
			    acctrail_inv_no='';	
			    acctrancramt=0;	
			    accrefvouno='';	
			    accref_vou_type='';
			    accref_payref_no='';
			    ledname='';	
                            for(var i=0;i<cnt;i++){
                               party =MonthClickVocDataStore.getAt(i).get('partyledger');
                               accrefvouno=MonthClickVocDataStore.getAt(i).get('accref_vouno');
                               accref_voudate=MonthClickVocDataStore.getAt(i).get('accref_voudate');
                               accref_payref_no=MonthClickVocDataStore.getAt(i).get('accref_payref_no');
                               acctrail_inv_no=MonthClickVocDataStore.getAt(i).get('acctrail_inv_no');
                               ledname=MonthClickVocDataStore.getAt(i).get('led_name');
                               acctradbamt=MonthClickVocDataStore.getAt(i).get('acctran_dbamt');
                               acctrancramt=MonthClickVocDataStore.getAt(i).get('acctran_cramt');
                               accref_vou_type=MonthClickVocDataStore.getAt(i).get('accref_vou_type');
                               if(accref_vou_type=="BR"){
                                   typevou="BANK RECEIPT";
                               }else  if(accref_vou_type=="BP"){
                                   typevou="BANK PAYMENT";
                               }else  if(accref_vou_type=="CR"){
                                   typevou="CASH RECEIPT";
                               }else  if(accref_vou_type=="CP"){
                                   typevou="CASH PAYMENT";
                               }else  if(accref_vou_type=="WA"){
                                   typevou="SALE MISLLANEOUS STORES";
                               }else  if(accref_vou_type=="WS"){
                                   typevou="SALE MISLLANEOUS ACCOUNTS";
                               }else{
                                   typevou="GENERAL";
                               }
                               flxdetails.getStore().insert(
                                flxdetails.getStore().getCount(),
                                new dgrecord({
                                    month:i+1,
                                    accountledger : party,
                                    accref_vouno:accrefvouno,
                                    accref_voudate:accref_voudate,
                                    accref_payref_no:acctrail_inv_no,
                                    Chequeno:accref_payref_no,
                                    Account:ledname,
                                    Debit:acctradbamt,
                                    Credit:acctrancramt,
                                    Vouctype:typevou
                                })
                                );
                             grid_tot2();
                            }
                        }
                }

	    });

                 grid_tot2();
       	 }
        }   
});


var dgrecord = Ext.data.Record.create([]);
var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:100,
    height: 350,
    hidden:false,
    width: 600,
    id: 'my-grid-font', 
    columnLines: true,
    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true,},
        {header: "Month" , dataIndex: 'month',sortable:false,width:150,align:'left', menuDisabled: true,
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
        {header: "Debit" , dataIndex: 'debit',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Credit"  , dataIndex: 'credit',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Closing"  , dataIndex: 'closing',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMonth, rowIndex, cellIndex, e) {
		var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();
                repmonth = selrow.get('rmonth');
          	find_dates(selrow.get('moncode'));
        }      
	
   }
});



   var RepPurchaseRegisterPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPurchaseRegisterPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),

        items: [
		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 20,
		    border      : false,
		    width       :500,
		    items : [txtFinYear]
		},

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 80,
                     border  : false,
	             x       : 300,
		     y       : 20,
                     items: [monthStartdate]
                },
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
	             x       : 500,
		     y       : 20,
                     items: [monthEnddate]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 700,
		     y       : 20,
                     items: [btnProcess]
                },

                flxMonth,
		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalDebit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 200,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalCredit]
		},

		{
		    xtype       : 'fieldset',
		    x           : 400,
		    y           : 450,
		    border      : false,
		    width       :500,
                    labelWidth  : 50,
		    items : [txtTotalClosing]
		},
        ],
    });
    
    function Refreshdata()
    {

        Month_Add_inGrid();
        var dt_today = new Date();

//alert(finstartdate);

        monthStartdate  = finstartdate;
        monthEnddate    = Ext.util.Format.date(dt_today,"Y-m-d");

//alert(monthStartdate);
//alert(monthEnddate);


	loadPurchaseDetailsDatastore.removeAll();
	loadPurchaseDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadPurchaseDetails',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthStartdate,"Y-m-d"), 
                enddate: Ext.util.Format.date(monthEnddate,"Y-m-d"), 
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadPurchaseDetailsDatastore.getCount();
                   var dr = 0;
                   var cr = 0;
                   var clo = 0;
                   if(cnt>0)
                   {
		       flxMonth.getSelectionModel().selectAll();
		       var selrows = flxMonth.getSelectionModel().getCount();
                       var sel = flxMonth.getSelectionModel().getSelections();
		       var cnt = loadPurchaseDetailsDatastore.getCount();
                       for(var j=0; j<cnt; j++)
                       {  

             		       for (var i=0;i<selrows;i++){    
//alert(loadPurchaseDetailsDatastore.getAt(j).get('rmonth')); 
//alert(sel[i].data.month); 
          
                     		    if (sel[i].data.month === loadPurchaseDetailsDatastore.getAt(j).get('rmonth'))
                  		    {
                                        dr = Number(loadPurchaseDetailsDatastore.getAt(j).get('dramt'));
                                        cr = Number(loadPurchaseDetailsDatastore.getAt(j).get('cramt'));;
                                        clo = Math.abs(clo + dr - cr);


	                                sel[i].set('debit', Ext.util.Format.number(loadPurchaseDetailsDatastore.getAt(j).get('dramt'),'0.00'));
                                        sel[i].set('credit', Ext.util.Format.number(loadPurchaseDetailsDatastore.getAt(j).get('cramt'),'0.00'));
	                               sel[i].set('closing', Ext.util.Format.number(clo,'0.00'));
			            }
                              }
			}
                       grid_tot();

                   }    

                }         
	  });

        var m1 = 0;
       
     //   m1 = Ext.util.Format.date(dt_today,"m"); 

//        find_dates(m1);



    }  
   
    var RepPurchaseRegisterWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Purchase Register',
        items       : RepPurchaseRegisterPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
                   txtFinYear.setRawValue(yr);
                   Refreshdata();
   		}
			
	}
    });
    RepPurchaseRegisterWindow.show();  
});
