Ext.onReady(function(){
   Ext.QuickTips.init();

var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');

var gstyear =localStorage.getItem('gstyear');



var gstFlag = "Add";

var seccode = 0;
var secname;
var editrow = 0;
var gridedit = "false";


var gstStatus = "N";
//var gstGroup;
var viewopt = 0; 

var strItemCode = 0;

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  CashReceiptEntryWindow.hide();

            }
        }]);



var loadEntryNoDatastore = new Ext.data.Store({
  id: 'loadEntryNoDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsConsumptionEntry.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadEntryNo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issno'
  ])
});


var loadEntryDetailsDatastore = new Ext.data.Store({
      id: 'loadEntryDetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntryNodetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'iss_date',  'iss_item_code', 'uom_short_name', 'item_stock', 'item_avg_rate', 'iss_qty',
'iss_rate',  'iss_slno', 'ind_fin_code','iss_value','item_name'
 
      ]),
    });


  var loadItemStockDatastore = new Ext.data.Store({
      id: 'loadItemStockDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['uom_short_name','item_avg_rate','item_stock'
      ]),
    });


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name'
 

      ]),
    });





var loadItemDatastore  = new Ext.data.Store({
      id: 'loadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'item_code', type: 'int',mapping:'item_code'},
	{name:'item_name', type: 'string',mapping:'item_name'}
      ]),
    });






  var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  90,

        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
	readOnly : true,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
	    keyup:function(){
//alert(viewopt);
//alert(Gincompcode);
//alert(GinFinid);
//alert(txtEntryNo.getValue());
//alert("IS");
               if (viewopt == 1 && Number(txtEntryNo.getValue()) > 0 )  
               {
			loadEntryDetailsDatastore.removeAll(); 
			loadEntryDetailsDatastore.load({
			url: 'ClsConsumptionEntry.php',
			params:
			{
				task     :"loadEntryNodetails",
				issno    : txtEntryNo.getValue(),
				finid    : GinFinid,
				compcode : Gincompcode,
			},  
			callback: function () 
			{
				flxDetail.getStore().removeAll();
				var cnt=loadEntryDetailsDatastore.getCount();
				
				if(cnt>0)
				{
	
		                     dtpEntryDate.setRawValue(Ext.util.Format.date(loadEntryDetailsDatastore.getAt(0).get('iss_date'),"d-m-Y"));


				     for(var j=0; j<cnt; j++)
				     {

 
				         var RowCnt = flxDetail.getStore().getCount() + 1;  
				         flxDetail.getStore().insert(
				            flxDetail.getStore().getCount(),
				            new dgrecord({
					    sno         : loadEntryDetailsDatastore.getAt(j).get('iss_slno'),
					    item        : loadEntryDetailsDatastore.getAt(j).get('item_name'),
				            itemcode    : loadEntryDetailsDatastore.getAt(j).get('iss_item_code'),
				            uom         : loadEntryDetailsDatastore.getAt(j).get('uom_short_name'),
				            rate        : loadEntryDetailsDatastore.getAt(j).get('iss_rate'),
					    issqty      : loadEntryDetailsDatastore.getAt(j).get('iss_qty'),   
                                 	    oldqty      : loadEntryDetailsDatastore.getAt(j).get('iss_qty'),   
					    issval      : Ext.util.Format.number(loadEntryDetailsDatastore.getAt(j).get('iss_val'), "0.00"),
				            })
				         );
				     }

				}
                                grid_tot();
			} 
		});
              }
	    }
        } 
    });

    var dtpEntryDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpEntryDate',
    name       : 'date',
    format     : 'd-m-Y',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
//    anchor     : '100%',
    width : 90,
	readOnly : false,
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
//                   cmbDept.focus();

             }
          }  
        }       
});


var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item',
    id          : 'lblItem',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblstock = new Ext.form.Label({
    fieldLabel  : 'Stock',
    id          : 'lblstock',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblUOM = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lblUOM',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblIssVal = new Ext.form.Label({
    fieldLabel  : 'Issue Value',
    id          : 'lblIssVal',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



var lblIssQty = new Ext.form.Label({
    fieldLabel  : 'Issue Qty',
    id          : 'lblIssQty',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsConsumptionEntry.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
                        compcode:Gincompcode,
                        finid:GinFinid,
		},
        });
}





var txtItemName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {
                loadSearchItemListDatastore.removeAll();
                  if (txtItemName.getRawValue() != '')
                  {
                     flxItem.getEl().setStyle('z-index','10000');
                     flxItem.show();
                     itemSearch();
                  }
                  else
                  {
                     flxItem.hide();
                  } 
            }
         }  
    });

  function flx_click()
  {

			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			if ((selrow != null)){


		
				strItemCode = selrow.get('item_code');
				txtItemName.setValue(selrow.get('item_name'));
                                flxItem.hide();
                        loadItemStockDatastore.removeAll();
			loadItemStockDatastore.load({
                        url: 'ClsConsumptionEntry.php',
                        params:
                            {
                                task:"loadItemStock",
                                itemcode:strItemCode,
                                compcode:Gincompcode,
                                finid:GinFinid,
                            },
                           callback: function () {
                               var cnt = loadItemStockDatastore.getCount(); 
                               if (cnt > 0) {
                                       txtUOM.setRawValue(loadItemStockDatastore.getAt(0).get('uom_short_name'));                        
                                       txtAvgCost.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStock.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));

                                       txtIssQty.focus();

                                    } else {
                                      alert('not found'); 
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
        height: 400,
        width: 420,
        x: 0,
        y: 87,
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
                           flx_click();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     flx_click();
             }
     
    
   }
   });

function refresh()
{
	txtIssQty.setValue('');
	txtIssVal.setValue('');
        txtStock.setValue('');
        txtAvgCost.setValue('');

}

function add_btn_click()
{

      var addok;
      addok ="true";
        if (txtIssQty.getValue()=="" || txtIssQty.getValue==0)
         {
                Ext.Msg.alert('Issue Entry','Enter Qty..');
                addok="false";
         }                    




         else 
         {

   
           flxDetail.getSelectionModel().selectAll();
           var selrows = flxDetail.getSelectionModel().getCount();
           var sel = flxDetail.getSelectionModel().getSelections();
/* 
	   var cnt = 0;
           for (var i=0;i<selrows;i++)
           {

              if (sel[i].data.item == txtItemName.getRawValue())
              {
                cnt = cnt + 1;

              }
           }
*/

           if(gridedit === "true")

           {

		gridedit = "false";
        	var idx = flxDetail.getStore().indexOf(editrow);
                sel[idx].set('uom'      ,  txtUOM.getRawValue()); 
        	sel[idx].set('item'     , txtItemName.getRawValue());
        	sel[idx].set('itemcode' , strItemCode);
		sel[idx].set('issqty'   , txtIssQty.getRawValue());
 		sel[idx].set('issval'   , txtIssVal.getRawValue());
		sel[idx].set('stock'    , txtStock.getRawValue());
		sel[idx].set('rate'     , txtAvgCost.getRawValue());

		flxDetail.getSelectionModel().clearSelections();
              

            }//if(gridedit === "true")

            else
            if (addok == "true")
            { 

               var RowCnt = flxDetail.getStore().getCount() + 1;
               flxDetail.getStore().insert(
                 flxDetail.getStore().getCount(),
                 new dgrecord({
                   sno:RowCnt,
                   item: txtItemName.getRawValue(),
   		   itemcode:strItemCode,
            	   uom:txtUOM.getRawValue(),
	    	   issqty:txtIssQty.getRawValue(),
	           issval:txtIssVal.getRawValue(),
                   stock : txtStock.getRawValue(),
                   rate : txtAvgCost.getRawValue(),
                 }) 
               );

            }
            else
            {
         	alert("Same Item Already Exist");
            } 
               grid_tot();
  	       refresh();
         txtItemName.setRawValue('');
         txtItemName.focus();

}
}

var btnAdd = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 70,
        height  : 30, 
        text    : "ADD  ",
        x       : 890,
        y       : 27,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
          add_btn_click();
         }
        }
});

 



var txtAvgCost = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAvgCost',
        name        : 'txtAvgCost',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
        decimalPrecision: 5,
//        readOnly   : true,
    });

var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value ',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  120,
        allowBlank  :  false,
	tabindex : 1,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly   : true,
    });



var txtStock = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtStock',
        name        : 'txtStock',
        width       :  80,
        allowBlank  :  false,
        readOnly   : true,
	tabindex : 1
    });

var txtUOM = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtUOM',
        width       : 50,
        readOnly   : true,
        name        : 'txtUOM',
    
        enableKeyEvents: true,
});


function checkqty()
{
    
         var IssVal = Number(txtIssQty.getValue())*Number(txtAvgCost.getValue());


         txtIssVal.setRawValue(Ext.util.Format.number(IssVal, "0.00"));
         
}


var txtIssQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssQty',
        width       : 80,
        name        : 'txtIssQty',    
        enableKeyEvents: true,
        decimalPrecision: 3,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 add_btn_click();
             }  
             },

           change:function(){
                  checkqty();
            }, 
           keyup:function(){
                checkqty();
            },
            keydown:function(){ 
                checkqty();
            },
            blur:function(){
               checkqty();
            },
 
        }      
});

var txtIssVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssVal',
        width       : 80,
        readOnly   : true,
        name        : 'txtIssVal',    
        enableKeyEvents: true,
});

 

var fdbl_totalqty,fdbl_totalvalue;

function grid_tot()
{
	fdbl_totalqty=0;
	fdbl_totalvalue=0;
	

	var Row= flxDetail.getStore().getCount();
	flxDetail.getSelectionModel().selectAll();
		var sel=flxDetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
		    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.issqty);
		    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.issval);
		}
//				    txtqty.setValue(fdbl_totalqty);
                txtTotValue.setRawValue(Ext.util.Format.number(fdbl_totalvalue, "0.00"));
				   
}








 var fm = Ext.form;
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:75,
    height: 260,
    hidden:false,
    width: 1050,
    columns:
    [
        {header: "SNo", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "Item Name", dataIndex: 'item',sortable:true,width:350,align:'left'},
        {header: "ItemCode", dataIndex: 'itemcode',sortable:true,width:0,align:'left' , hidden :true},
        {header: "Unit", dataIndex: 'uom',sortable:true,width:100,align:'left'},
        {header: "AvgRate", dataIndex: 'rate',sortable:true,width:100,align:'right'},
        {header: "Stock Qty", dataIndex: 'stock',sortable:true,width:0,align:'right', hidden :true},
        {header: "Issue Qty", dataIndex: 'issqty',sortable:true,width:100,align:'right'},
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:120,align:'right'},
        {header: "Old Qty", dataIndex: 'oldqty',sortable:true,width:0,align:'left', hidden :true},
    ],
	store : [],
    listeners:{	
        'celldblclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES ISSUE ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
                      	txtItemName.setRawValue(selrow.get('item'));
                       	strItemCode = selrow.get('itemcode');
	
		    	txtAvgCost.setValue(selrow.get('rate'));
		    	txtIssQty.setValue(selrow.get('issqty'));
		    	txtStock.setValue(selrow.get('stock'));
		    	txtIssQty.setRawValue(selrow.get('issqty'));
		    	txtIssVal.setRawValue(selrow.get('issval'));
                        txtUOM.setRawValue(selrow.get('uom')); 


			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
//                   CalculatePOVal();
             }
        });         
    }
   }

});

/*
var optisstype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:100,
    height:93 ,
    x:0,
    y:0,
    border: true,
    readOnly: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optisstype',
        items: [
            {boxLabel: 'Issue', name: 'optisstype', id:'optiss', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  entrytype = "IS";
               }
              }
             }
            },
            {boxLabel: 'Return', name: 'optisstype', id:'optret', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  entrytype = "IR";            
               }
              }
             }}
        ]
    }
    ]
});
*/

function RefreshData(){


       dtpEntryDate.focus();
Ext.getCmp('dtpEntryDate').focus(false, 200);

//       TrnIssueFormpanel.getForm().reset();
       flxDetail.getStore().removeAll();

       Ext.getCmp('txtEntryNo').setReadOnly(true);

       txtTotValue.setRawValue(''); 	

       viewopt =0 ;
       
       flxDetail.getStore().removeAll();

		loadEntryNoDatastore.load({
                url: 'ClsConsumptionEntry.php',
                params: {
                    task: 'loadEntryNo',
			compcode:Gincompcode,
			fincode:GinFinid,

                },
		callback:function()
		{
		txtEntryNo.setRawValue(loadEntryNoDatastore.getAt(0).get('issno'));
		}
            });

//	alert(txtindyr.getValue());

};

function save_click()
{
           if ( flxDetail.getStore().getCount() ==0)
	{
		Ext.Msg.alert('Issue','Grid Should not be empty..');
	} 
	else
	{
		Ext.MessageBox.show({
                title: 'Confirmation',
                icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
    		msg: 'Do u want to save',
    		fn: function(btn)
		{
		if (btn == 'yes')
			{

			var issuedetails = flxDetail.getStore().getRange();
			var issuedata = new Array();
			Ext.each(issuedetails, function (record){
			issuedata.push(record.data);
			});
			
//alert(issuedetails.length);
			Ext.Ajax.request({
                    	url: 'TrnConsumptionSave.php',
	       	        params:
			{
		                griddet:Ext.util.JSON.encode(issuedata),	
				cnt         : issuedetails.length,
                                savetype    : gstFlag,                   
     				isshno      : txtEntryNo.getValue(),
				isscompcode : Gincompcode,
				issfincode  : GinFinid,
				issdate     : Ext.util.Format.date(dtpEntryDate.getValue(),"Y-m-d"),

    
			},
			callback: function (options, success, response)
                	{
                    	var obj = Ext.decode(response.responseText);
		  	if (obj['success'] === "true") 
			{
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.OK,
                            msg: ' Consumption Entry No Is: ' + obj['IssNo'],
                            fn: function (btn) {
			    if (btn === 'ok') 
				{
               //             Ext.MessageBox.alert("Alert","Saved ");
			//    TrnIssueFormpanel.getForm().reset();
				RefreshData();
				}
				}
                        	});
                        }
                     	else 
			{
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.OK,
                            msg: 'Failed to save Consumption Entry No. '+ obj['IssNo'],
                            fn: function (btn) 
				{
                                if (btn === 'ok') 
				{
                     		Ext.MessageBox.alert("Alert","Not Saved or Already exists.. ");
                                }
                            	}
                        	});
                    	}
              
		 	}   
        		});
    	
 		}
        }
});
	}

}

   var TrnIssueFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE',
        header      : false,
        width       : 920,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnIssueFormpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [

                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
//EDIT
                       click: function () {
                           gstFlag = "Edit";
                           Ext.getCmp('txtEntryNo').setReadOnly(false);
                           txtEntryNo.setValue();   
                           txtEntryNo.focus();   

                           viewopt = 1;
                           }
                    }
                    
                },'-',

                {  
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                              save_click();

                        }
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
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
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                           TrnIssueWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'CHEMICALS',
                layout  : 'hbox',
                border  : true,
                height  : 515,
                width   : 1150,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 60,
                y       : 10,
                items:[

                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 450,
                               height      : 60,
                               x           : 10,
                               y           : 10,
                               border      : true,
                               layout      : 'absolute',
                               items:[
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [txtEntryNo]
                                      },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 200,
                                       y           : 0,
                                       border      : false,
                                       items: [dtpEntryDate]
                                      },
                               ] 
                              },



		{ xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 1100,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 80,
                items:[

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblItem]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 430,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblUOM]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 500,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblstock]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 600,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblRate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 670,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblIssQty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 770,
                                	y           : 0,
                                    	border      : false,
                                	items: [lblIssVal]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 460,
                                	x           : -10,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtItemName]
                            },flxItem,

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 420,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtUOM]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 480,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtStock]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 570,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtAvgCost]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 660,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtIssQty]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 760,
                                	y           : 25,
                                    	border      : false,
                                	items: [txtIssVal]
                            },btnAdd,

			flxDetail,

			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 760,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtTotValue]
                            },



                         ]},
				//btnSubmit
                ]

            }
            
        ]
    });
    
   
    var TrnIssueWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'CHEMICAL CONSUMPTION ENTRY',
        items       : TrnIssueFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":" #b3ffd7"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	onEsc:function(){
	},
	listeners:{
               show:function(){

 RefreshData();

   flxItem.hide();
				Ext.getCmp('dtpEntryDate').focus(false, 0);	
				const input = document.getElementById('dtpEntryDate');
				const end = input.value.length;
				input.setSelectionRange(0,0);
				input.focus();	
	   	
	   			 }
			
		}
    });
    TrnIssueWindow.show();  
});
