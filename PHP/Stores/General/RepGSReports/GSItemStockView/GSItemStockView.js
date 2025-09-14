Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');


   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 

   var grpcode  = 0;
   var grpname = '';
   var subgrpcode  = 0;
   var subgrpname = '';
   var itemcode  = 0;
   var itemname = '';


    var printtype='PDF';

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
           rmonth  : monthdisplay,
       }) 
       );
   }
}

 var loadItem_LedgerDataStore = new Ext.data.Store({
      id: 'loadItem_LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItem_Ledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['op_itemcode', 'opqty', 'opvalue', 'oprate', 'doctype', 'docno', 'docdate', 'supcode', 'item_code', 'rec_qty', 'rec_val', 'iss_qty', 'iss_val', 'sl_no', 'unitrate','cust_name','voutype' ]),
    });




var lblDetail3 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail3',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
});




var lblItem = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblItem',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        name        : 'lblItem',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


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



var flxLedger = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:70,
    height: 420,
    hidden:false,
    width: 1280,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "VouType" , dataIndex: 'voutype',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "DocType" , dataIndex: 'doctype',sortable:false,width:50,align:'left', menuDisabled: true,hidden:false},
        {header: "Item Code" , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Doc No" , dataIndex: 'doc_no',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Doc. Date" , dataIndex: 'doc_date',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Particulars"  , dataIndex: 'cust_name',sortable:false,width:350,align:'center', menuDisabled: true},
        {header: "Receipt Qty"  , dataIndex: 'rec_qty',sortable:false,width:120,align:'right', menuDisabled: true, useNull: true
 
        },
        {header: "Receipt Value"  , dataIndex: 'rec_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Issue Qty"  , dataIndex: 'iss_qty',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Issue Value"  , dataIndex: 'iss_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "Rate"  , dataIndex: 'item_avg_rate',sortable:false,width:110,align:'right', menuDisabled: true},

    ],
     store: [], // loadItemListDataStore,
    listeners:{	
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
		var sm = flxLedger.getSelectionModel();
		var selrow   = sm.getSelected();
                var docno    = selrow.get('doc_no')
                var doctype    = selrow.get('doctype')
                var grntype    = selrow.get('voutype')

                if (doctype == "RE" &&  grntype == "P")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
                 }
                if (doctype == "RE" &&  grntype == "I")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param); 
                 }

                if (doctype == "IS")
                { 
  		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&fromno=" + encodeURIComponent(docno);
		  var p4 = "&tono=" + encodeURIComponent(docno);
            	  var p5 = "&voutype=" + encodeURIComponent('IS');
                  var param = (p1+p2+p3+p4+p5) ;  

		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresIssuePrint.rptdesign&__format=pdf' + param); 
                 }

              }  
    }
});

var btnStkChange = new Ext.Button({
    style   : 'text-align:center;',
    id       : 'btnStkChange',
    text    : "Change Stock",
    width   : 80,
    height  : 30,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
          if (txtItemName.getRawValue()== "")
            {
                Ext.Msg.alert('stock','Select Item Name');
                gstSave="false";
            }  

   

            else if ( itemcode ==0)
            {
                Ext.Msg.alert('stock','Select Item Name');

                gstSave="false";
            } 


            else
            {
            Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'KINDLY COFIRM. Do You Want To CHANGE THE STOCK ...',
		    fn: function(btn)
			{
		    if (btn === 'yes')
                    {
			    Ext.Ajax.request({
			    url: 'ItemStockSave.php',
			    params :
			     {
	
                           
				compcode  : GinCompcode,
				finid     : GinFinid,
				itemcode  : itemcode,
				itemname  : txtItemName.getRawValue(),
                                yropqty   : txtYearOpeningStock.getValue(),
                                yropvalue : txtYearOpeningValue.getValue(),
                                cloqty    : txtTodayClosingStock.getValue(),
                                clovalue  : txtTodayClosingValue.getValue(),
                                avgrate   : txtAvgRate.getValue(),

				},
			      callback: function(options, success, response)
			      {
				var obj = Ext.decode(response.responseText);
				 if (obj['success']==="true")
					{                                
				    Ext.MessageBox.alert("STOCK CHANGED for.-" + obj['itemname']);

				    RefreshData();
		//				    TrnGrnformpanel.getForm().reset();
				  }else
					{
			Ext.MessageBox.alert("STOCK Not CHANGED! Pls Check!- " + obj['itemname']);                                                  
				    }
				}

			   }); 
                        } 
}
                 }); 
             }
          }   
    } 
});


   function check_password()
   {
      if (txtPassword.getRawValue() == "admin@123")
      {
        btnStkChange.show();

        Ext.getCmp('txtYearOpeningStock').setReadOnly(false);   
        Ext.getCmp('txtYearOpeningValue').setReadOnly(false);   
        Ext.getCmp('txtTodayClosingStock').setReadOnly(false);   
        Ext.getCmp('txtTodayClosingValue').setReadOnly(false);   

      }
      else
      {
        btnStkChange.hide();
        Ext.getCmp('txtYearOpeningStock').setReadOnly(true);   
        Ext.getCmp('txtYearOpeningValue').setReadOnly(true);   
        Ext.getCmp('txtTodayClosingStock').setReadOnly(true);   
        Ext.getCmp('txtTodayClosingValue').setReadOnly(true);   

      }    

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  80,
 //	readOnly    : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 

    });




    var btnLedger = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Ledger View",
	width   : 90,
	height  : 35,
        id:'btnLedger',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p3 = "&itemcode=" + encodeURIComponent(itemcode);

 		    var param = (p1+p2+p3+p4+p5) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedger_Itemwise.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedger_Itemwise.rptdesign' + param, '_blank');	



	    }
	}
    })


    var btnAbstract = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Abstract View",
	width   : 90,
	height  : 35,
        id:'btnLedger',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&fincode="+encodeURIComponent(GinFinid);    
                    var p3 = "&itemcode=" + encodeURIComponent(itemcode);
                    var p4 = "&itemname=" + encodeURIComponent(txtItemName.getRawValue());
 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresItemMonthwiseStock.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresItemMonthwiseStock.rptdesign' + param, '_blank');	



	    }
	}
    })



  var loadUnitDatastore = new Ext.data.Store({
      id: 'loadUnitDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadunit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'uom_code', type: 'int',mapping:'uom_code'},
	{name:'uom_name', type: 'string',mapping:'uom_name'}
      ]),
    });

  var loadLocationDatastore = new Ext.data.Store({
      id: 'loadLocationDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLocation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'loc_code', type: 'int',mapping:'loc_code'},
	{name:'loc_name', type: 'string',mapping:'loc_name'}
      ]),
    });


  var loadGroupDatastore = new Ext.data.Store({
      id: 'loadGroupDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'subgrp_code', type: 'int',mapping:'subgrp_code'},
	{name:'groupname', type: 'string',mapping:'groupname'}
      ]),
    });

   var txtAvgRate = new Ext.form.NumberField({
        fieldLabel  : 'Avg. Rate',
        id          : 'txtAvgRate',
        name        : 'txtAvgRate',
        width       :  90,
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


var cmbUnit = new Ext.form.ComboBox({
        fieldLabel      : 'Units',
        width           :  100,
        displayField    : 'uom_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbUnit',
        typeAhead       : true,
        mode            : 'local',
        store           : loadUnitDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Group',
        width           :  200,
        displayField    : 'groupname', 
        valueField      : 'subgrp_code',
        hiddenName      : '',
        id              : 'cmbGroup',
        typeAhead       : true,
        mode            : 'local',
        store           : loadGroupDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Location',
        width           :  160,
        displayField    : 'loc_name', 
        valueField      : 'loc_code',
        hiddenName      : '',
        id              : 'cmbLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : loadLocationDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
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
    ProcessLedgerData()
 
}

  function MonthClick(){
                flxLedger.getStore().removeAll();
		loadItem_LedgerDataStore.removeAll();
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

function ProcessLedgerData()
{



        flxLedger.getStore().removeAll();
	loadItem_LedgerDataStore.removeAll();
	loadItem_LedgerDataStore.load({
	 url: 'ClsItemStock.php',
                params: {
	    	task: 'loadItem_Ledger',
                compcode  : GinCompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                item      : itemcode,
                
		},

       	scope:this,
		callback:function()
		{
                  var document_type = ''; 
                  var cnt=loadItem_LedgerDataStore.getCount();
                  if(cnt>0)
                   {    
                     txtOpeningStock.setRawValue( Ext.util.Format.number(loadItem_LedgerDataStore.getAt(0).get('opqty')),'0.000');
                     txtOpeningValue.setRawValue( Ext.util.Format.number(loadItem_LedgerDataStore.getAt(0).get('opvalue')),'0.000');
                     for(var j=0; j<cnt; j++)
                     { 
                         if (loadItem_LedgerDataStore.getAt(j).get('doctype') == "RE" || loadItem_LedgerDataStore.getAt(j).get('doctype') == "RR")
                            document_type = loadItem_LedgerDataStore.getAt(j).get('cust_name');
                         if (loadItem_LedgerDataStore.getAt(j).get('doctype') == "IS")
                             document_type = "Issues";
                         if (loadItem_LedgerDataStore.getAt(j).get('doctype') == "IR")
                             document_type = "Issue Return";
                         if (loadItem_LedgerDataStore.getAt(j).get('doctype') == "AP")
                             document_type = "Adjustment Plus";
                         if (loadItem_LedgerDataStore.getAt(j).get('doctype') == "AM")
                             document_type = "Adjustment Minus";


                         var RowCnt    = flxLedger.getStore().getCount() + 1; 
                         flxLedger.getStore().insert(
	                    flxLedger.getStore().getCount(),
                            new dgrecord({
                                voutype   : loadItem_LedgerDataStore.getAt(j).get('voutype'), //document_type,
                                doctype   : loadItem_LedgerDataStore.getAt(j).get('doctype'), //document_type,
                                doc_no    : loadItem_LedgerDataStore.getAt(j).get('docno'),
                                doc_date  : Ext.util.Format.date(loadItem_LedgerDataStore.getAt(j).get('docdate')
,"d-m-Y"), 
                                cust_name : document_type,
                                rec_qty   : loadItem_LedgerDataStore.getAt(j).get('rec_qty'),
                                rec_val   : loadItem_LedgerDataStore.getAt(j).get('rec_val'),
                                iss_qty   : loadItem_LedgerDataStore.getAt(j).get('iss_qty'),
                                iss_val   : loadItem_LedgerDataStore.getAt(j).get('iss_val'),
                                item_avg_rate : loadItem_LedgerDataStore.getAt(j).get('unitrate'),
                            })
                        );  

                     }
                     grid_tot_ledger();
                   }     

                   }  
         
	    });
}


var dgrecord = Ext.data.Record.create([]);
var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,

    y:300,
    height: 300,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "OP - Qty"  , dataIndex: 'op_qty',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "OP - Value"  , dataIndex: 'op_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "IN - Qty"  , dataIndex: 'rec_qty',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "IN - Value"  , dataIndex: 'rec_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "ISS - Qty"  , dataIndex: 'iss_qty',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "ISS - Value"  , dataIndex: 'iss_val',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "CLO - Qty"  , dataIndex: 'clo_qty',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "CLO - Value"  , dataIndex: 'clo_val',sortable:false,width:150,align:'right', menuDisabled: true},

    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'rowDblClick': function (flxMonth, rowIndex, cellIndex, e) {
                RepPrePrintFormPannel.setActiveTab(1);
               var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();


                var selerow =flxMonth.getSelectionModel().getSelections();

    
                flxLedger.getStore().removeAll();
                repmonth = selrow.get('rmonth');
                cmbMonth.setRawValue(repmonth);   
          	find_dates(selrow.get('moncode'));
                ProcessLedgerData();
        }      
	
   }
});



 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where t	o get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name'
 

      ]),
    });


 var loadItemDetailDatastore = new Ext.data.Store({
      id: 'loadItemDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


'item_code', 'item_group_code', 'item_name', 'item_usage', 'item_uom', 'item_qcchk', 
'item_hsncode', 'item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5',
 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10', 'item_loc_code', 
'item_close',  'item_stock', 'item_avg_rate', 'item_reorder_stock', 'item_yr_opqty', 'item_yr_opval',
   'subgrp_code', 'subgrp_name', 'subgrp_grpcode', 'grp_code', 'grp_name', 'uom_code', 'uom_name', 
'uom_short_name' 

      ]),
    });

 var loadItemMonthwiseDetailDatastore = new Ext.data.Store({
      id: 'loadItemMonthwiseDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsItemStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemMonthwiseDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

          'item_code', 'rmonth', 'rec_qty', 'rec_val', 'iss_qty', 'iss_val' 

      ]),
    })




function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsItemStock.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
		},
        });
}

var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  370,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 if (itemcode == 0)
                 {    
                    alert("Select Ledger Name ...");
                    txtItemName.focus();
                 }
                 else
                 {    
                   flxItem.hide();

                 }     
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {
                if (txtItemName.getRawValue().length > 0)
                { 
		        flxItem.getEl().setStyle('z-index','10000');
		        flxItem.show();
		        loadSearchItemListDatastore.removeAll();
		          if (txtItemName.getRawValue() != '')
		             itemSearch();
                }
            }
         }  
    });

 

/*    



var txtItemName2 = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName2',
        name        : 'txtItemName2',
        width       :  420,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
        readOnly : true,
	listeners:{
         }  
    });

*/

   var txtYearOpeningStock = new Ext.form.NumberField({
        fieldLabel  : 'Year Opening Stock',
        id          : 'txtYearOpeningStock',
        name        : 'txtYearOpeningStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtYearOpeningValue = new Ext.form.NumberField({
        fieldLabel  : 'Year Opening Value',
        id          : 'txtYearOpeningValue',
        name        : 'txtYearOpeningValue',
        width       :  130,
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


   var txtTodayClosingStock = new Ext.form.NumberField({
        fieldLabel  : 'Closing Stock',
        id          : 'txtTodayClosingStock',
        name        : 'txtTodayClosingStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtTodayClosingValue = new Ext.form.NumberField({
        fieldLabel  : 'Closing Value',
        id          : 'txtTodayClosingValue',
        name        : 'txtTodayClosingValue',
        width       :  130,
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



   var txtOpeningStock = new Ext.form.NumberField({
        fieldLabel  : 'Month Opening Stock',
        id          : 'txtOpeningStock',
        name        : 'txtOpeningStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtOpeningValue = new Ext.form.NumberField({
        fieldLabel  : 'Month Opening Value',
        id          : 'txtOpeningValue',
        name        : 'txtOpeningValue',
        width       :  130,
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



   var txtClosingStock = new Ext.form.NumberField({
        fieldLabel  : 'Closing Stock',
        id          : 'txtClosingStock',
        name        : 'txtClosingStock',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtClosingValue = new Ext.form.NumberField({
        fieldLabel  : 'Closing Value',
        id          : 'txtClosingValue',
        name        : 'txtClosingValue',
        width       :  120,
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



   var txtInQty = new Ext.form.NumberField({
        fieldLabel  : 'Inward Qty',
        id          : 'txtInQty',
        name        : 'txtInQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtInValue = new Ext.form.NumberField({
        fieldLabel  : 'Inward Value',
        id          : 'txtInValue',
        name        : 'txtInValue',
        width       :  120,
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



   var txtOutQty = new Ext.form.NumberField({
        fieldLabel  : 'Outward Qty',
        id          : 'txtOutQty',
        name        : 'txtOutQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtOutValue = new Ext.form.NumberField({
        fieldLabel  : 'Outward Value',
        id          : 'txtOutValue',
        name        : 'txtOutValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    })

function grid_tot(){


        var opqty   = txtYearOpeningStock.getValue();
        var opvalue = txtYearOpeningValue.getValue();
 
        var cqty   = 0;
        var cvalue = 0;

        var rqty = 0;
        var rvalue = 0;
        var iqty = 0;
        var ivalue = 0;
          
        var Row= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sel=flxMonth.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)
       {
		if (isNaN(sel[i].data.rec_qty))
                   rqty = 0;
		else
                   rqty = sel[i].data.rec_qty;

		if (isNaN(sel[i].data.rec_val))
                   rvalue = 0;
		else
                   rvalue = sel[i].data.rec_val;

		if (isNaN(sel[i].data.iss_qty))
                   iqty = 0;
		else
                   iqty = sel[i].data.iss_qty;


		if (isNaN(sel[i].data.iss_val))
                   ivalue = 0;
		else
                   ivalue = sel[i].data.iss_val;

           cqty   =  Number(opqty)  + Number(rqty) - Number(iqty);
           cvalue =  Number(opvalue) + Number(rvalue) - Number(ivalue) ;

	   sel[i].set('op_qty', Ext.util.Format.number(opqty,'0.000'));
	   sel[i].set('op_val', Ext.util.Format.number(opvalue,'0.00'));
           sel[i].set('clo_qty', Ext.util.Format.number(cqty,'0.000'));
	   sel[i].set('clo_val', Ext.util.Format.number(cvalue,'0.00'));

           if (rqty == 0)
              sel[i].set('rec_qty', Ext.util.Format.number(rqty,'0.000'));
           if (rvalue == 0)
              sel[i].set('rec_val', Ext.util.Format.number(rvalue,'0.00'));

           if (iqty == 0)
              sel[i].set('iss_qty', Ext.util.Format.number(iqty,'0.000'));
           if (ivalue == 0)
              sel[i].set('iss_val', Ext.util.Format.number(ivalue,'0.00'));


           opqty = cqty;
           opvalue = cvalue;

/*
           if ( Number(sel[i].data.op_qty)+Number(rqty) + Number(iqty)   > 0)
           {
           if (i>0)
           {
	   sel[i].set('op_qty', Ext.util.Format.number(cqty,'0.000'));
	   sel[i].set('op_val', Ext.util.Format.number(cvalue,'0.00'));
           }   
           cqty   =  Number(sel[i].data.op_qty)+Number(sel[i].data.rec_qty) - Number(sel[i].data.iss_qty) ;
           cvalue =  Number(sel[i].data.op_val)+Number(sel[i].data.rec_val) - Number(sel[i].data.iss_val) ;
	   sel[i].set('clo_qty', Ext.util.Format.number(cqty,'0.000'));
	   sel[i].set('clo_val', Ext.util.Format.number(cvalue,'0.00'));

           }   
*/
 //          sel[i].data.clo_qty = cqty;
//           sel[i].data.clo_val = cval;
      }

}

function grid_tot_ledger(){

        var inqty   = 0;
        var invalue = 0;
        var outqty   = 0;
        var outvalue = 0;
        var cloqty   = 0;
        var clovalue = 0;

        var Row= flxLedger.getStore().getCount();
        flxLedger.getSelectionModel().selectAll();
        var sel=flxLedger.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)
       {
           if ( Number(sel[i].data.rec_qty) + Number(sel[i].data.iss_qty)   != 0)
           {
           inqty   =  Number(inqty)  + Number(sel[i].data.rec_qty) ;
           invalue =  Number(invalue)  + Number(sel[i].data.rec_val) ;
           outqty   =  Number(outqty)  + Number(sel[i].data.iss_qty) ;
           outvalue =  Number(outvalue)  + Number(sel[i].data.iss_val) ;
           }   
      }
      cloqty   = Number(txtOpeningStock.getValue())+Number(inqty)-Number(outqty);
      clovalue = Number(txtOpeningValue.getValue())+Number(invalue)-Number(outvalue);

      txtInQty.setRawValue(Ext.util.Format.number(inqty,'0.000'));
      txtOutQty.setRawValue(Ext.util.Format.number(outqty,'0.000'));
      txtClosingStock.setRawValue(Ext.util.Format.number(cloqty,'0.000'));

      txtInValue.setRawValue(Ext.util.Format.number(invalue,'0.000'));
      txtOutValue.setRawValue(Ext.util.Format.number(outvalue,'0.000'));
      txtClosingValue.setRawValue(Ext.util.Format.number(clovalue,'0.000'));

}

function grid_chk_flxItem()
{
        RefreshData();
        flxItem.hide();   
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('item_code'));
	if ((selrow != null)){

	itemcode = selrow.get('item_code');
	txtItemName.setValue(selrow.get('item_name'));

        loadItemDetailDatastore.removeAll();
        loadItemDetailDatastore.load({
	url: 'ClsItemStock.php',
	params:
	{
		task:"loaditemDetail",
		finid    : GinFinid,
		compcode : GinCompcode,   
		item     : itemcode,  
	},
        callback: function () 
        {
           var cnt=loadItemDetailDatastore.getCount();

           if(cnt>0)
           {  

// txtItemName2.setValue(loadItemDetailDatastore.getAt(0).get('item_name'));
        Ext.getCmp('lblItem').setText(loadItemDetailDatastore.getAt(0).get('item_name'));
 var clval  = Number(loadItemDetailDatastore.getAt(0).get('item_stock')) * Number(loadItemDetailDatastore.getAt(0).get('item_avg_rate'));
               clval = clval.toFixed(2);      

               txtYearOpeningStock.setRawValue(Ext.util.Format.number(loadItemDetailDatastore.getAt(0).get('item_yr_opqty'),'0.000'));
               txtYearOpeningValue.setRawValue(Ext.util.Format.number(loadItemDetailDatastore.getAt(0).get('item_yr_opval'),'0.00'));
               txtTodayClosingStock.setRawValue(Ext.util.Format.number(loadItemDetailDatastore.getAt(0).get('item_stock'),'0.000'));
               txtTodayClosingValue.setRawValue(clval,'0.00');
               txtAvgRate.setRawValue( Ext.util.Format.number(loadItemDetailDatastore.getAt(0).get('item_avg_rate'),'0.0000'));

               cmbUnit.setValue(loadItemDetailDatastore.getAt(0).get('uom_code'));
               cmbGroup.setValue(loadItemDetailDatastore.getAt(0).get('subgrp_code'));
               cmbLocation.setValue(loadItemDetailDatastore.getAt(0).get('item_loc_code'));

        loadItemMonthwiseDetailDatastore.removeAll();
        loadItemMonthwiseDetailDatastore.load({
	url: 'ClsItemStock.php',
	params:
	{
		task:"loaditemMonthwiseDetail",
		finid    : GinFinid,
		compcode : GinCompcode,   
		item     : itemcode,  
	},
        callback: function () 
        {
           var cnt=loadItemMonthwiseDetailDatastore.getCount();

           if(cnt>0)
           {  
	       flxMonth.getSelectionModel().selectAll();
	       var selrows = flxMonth.getSelectionModel().getCount();
               var sel = flxMonth.getSelectionModel().getSelections();
               for(var j=0; j<cnt; j++)
               {  

	       for (var i=0;i<selrows;i++){               
     		    if (sel[i].data.rmonth === loadItemMonthwiseDetailDatastore.getAt(j).get('rmonth'))
  		    {

//            alert(loadItemMonthwiseDetailDatastore.getAt(j).get('iss_qty'));

                        if (sel[i].data.rmonth === "APRIL")
                        {
                       sel[i].set('op_qty', Ext.util.Format.number(txtYearOpeningStock.getRawValue(),'0.000'));
                       sel[i].set('op_val', Ext.util.Format.number(txtYearOpeningValue.getRawValue(),'0.00'));
                        }     
                        else
                        {
                       sel[i].set('op_qty', '0.000');
                       sel[i].set('op_val', '0.00');
                        }     
 
                       sel[i].set('rec_qty', Ext.util.Format.number(loadItemMonthwiseDetailDatastore.getAt(j).get('rec_qty'),'0.000'));
                       sel[i].set('rec_val', Ext.util.Format.number(loadItemMonthwiseDetailDatastore.getAt(j).get('rec_val'),'0.00'));
                       sel[i].set('iss_qty', Ext.util.Format.number(loadItemMonthwiseDetailDatastore.getAt(j).get('iss_qty'),'0.000'));
                       sel[i].set('iss_val', Ext.util.Format.number(loadItemMonthwiseDetailDatastore.getAt(j).get('iss_val'),'0.00'));
	            }

              }
                    grid_tot();

		}

           }
        }  
        }); 

           }
        }  
        });    


 
	}

}

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 480,
        width: 420,
        x: 0,
        y: 0,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxItem();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxItem();
             }
     
 
    
   }
   });



 var RepPrePrintFormPannel = new Ext.TabPanel({
    id          : 'RepPrePrintFormPannel',
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
        title: 'STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 100,
                        	width       : 550,
                        	x           : 10,
                        	y           : 10,
                            	border      : false,
                        	items: [txtItemName]
                   },


                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 550,
                        	x           : 500,
                        	y           : 10,
                            	border      : false,
                        	items: [cmbUnit]
                   },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 550,
                        	x           : 700,
                        	y           : 10,
                            	border      : false,
                        	items: [cmbGroup]
                   },



                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 550,
                        	x           : 1000,
                        	y           : 10,
                            	border      : false,
                        	items: [cmbLocation]
                   },	

/*

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 550,
                        	x           : 600,
                        	y           : 40,
                            	border      : false,
                        	items: [txtItemName2]
                   },

*/	



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 300,
		        y: 120,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnStkChange]
		    }, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 300,
		        x: 300,
		        y: 490,
		        defaultType: 'textfield',
		        border: false,
		        items: [btnAbstract]
		    }, 



		    {
		        xtype: 'fieldset',
		        title: '',
		        labelWidth: 100,
		        width: 220,
		        x: 50,
		        y: 120,
		        defaultType: 'textfield',
		        border: false,
		        items: [txtPassword]
		    }, 



                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 550,
                        	x           : 500,
                        	y           : 90,
                            	border      : false,
                        	items: [txtYearOpeningStock]
                   },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 550,
                        	x           : 500,
                        	y           : 120,
                            	border      : false,
                        	items: [txtYearOpeningValue]
                   },



	
                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
                        	width       : 550,
                        	x           : 800,
                        	y           : 90,
                            	border      : false,
                        	items: [txtTodayClosingStock]
                   },

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
                        	width       : 550,
                        	x           : 800,
                        	y           : 120,
                            	border      : false,
                        	items: [txtTodayClosingValue]
                   },		

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 90,
                        	width       : 550,
                        	x           : 1100,
                        	y           : 120,
                            	border      : false,
                        	items: [txtAvgRate]
                   },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 170,
                             items: [flxMonth]
                        },
	                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 80,
                        	width       : 520,
                        	x           : 112,
                        	y           : 35,
                            	border      : false,
                        	items: [flxItem]
                   },

        ],
    },  
 
    {
		xtype: 'panel',
		title: 'ITEM LEDGER',
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
			     y       : 0,
                             items: [lblItem]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 20,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 600,
			     y       : 20,
                             items: [monthenddate]
                        },


			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 160,
			width       : 400,
			x           : 820,
			y           : 00,
			border      : false,
			items: [txtOpeningStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 160,
			width       : 400,
			x           : 820,
			y           : 30,
			border      : false,
			items: [txtOpeningValue]
			},
			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 55,
			     items: [flxLedger]	
			},

			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 90,
			width       : 400,
			x           : -5,
			y           : 495,
			border      : false,
			items: [txtInQty]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 400,
			x           : 190,
			y           : 495,
			border      : false,
			items: [txtInValue]
			},



			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 400,
			x           : 420,
			y           : 495,
			border      : false,
			items: [txtOutQty]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 120,
			width       : 400,
			x           : 630,
			y           : 495,
			border      : false,
			items: [txtOutValue]
			},



			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 400,
			x           : 890,
			y           : 495,
			border      : false,
			items: [txtClosingStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 400,
			x           : 1090,
			y           : 495,
			border      : false,
			items: [txtClosingValue]
			},


		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1150,
		     y       : 0,
                     items: [btnLedger]
                },
               ]
       }    

    ] 

});


    function RefreshData()
    {
        flxMonth.getStore().removeAll();   
        Month_Add_inGrid();
        flxItem.hide();
        txtOpeningStock.setValue('');
        txtOpeningValue.setValue('');
        txtClosingStock.setValue('');
        txtClosingValue.setValue('');
        btnStkChange.hide();

    }



    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 35,
        title       : 'Stores Stock List',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){

                  RefreshData();           
               }    
			
	}
    });
    ReppreprintWindow.show();  
});
