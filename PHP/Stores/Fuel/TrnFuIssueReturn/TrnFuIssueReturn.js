Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var SaveFlag ="Add";
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
//var gstGroup;
var chkitemcode = 0;

   var userid = localStorage.getItem('ginuserid');
   var usertype = localStorage.getItem('ginuser');

 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchItemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code', 'itmh_name','itmh_moisture_per'
      ]),
    });



var IssRetnodatastore = new Ext.data.Store({
  id: 'IssRetnodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuIssueReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissretno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issretno','isrh_no','isrh_seqno',
  ])
});


var Issdetaildatastore = new Ext.data.Store({
  id: 'Issdetaildatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuIssueReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissRetdetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
'isrh_seqno', 'isrh_compcode', 'isrh_fincode', 'isrh_no', 'isrh_date', 'isrh_value', 'isrh_remarks', 'isrh_usr_code', 'isrh_entry_date', 'isrt_hdseqno', 'isrt_seqno', 'isrt_itemcode', 'isrt_qty', 'isrt_rate', 'isrt_values', 'itmh_code', 'itmh_name' ,'itmt_clqty'
  ])
});


	
 var loadbatchdatastore = new Ext.data.Store({
      id: 'loadbatchdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadbatch"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'mis_batchcode','mis_batchvariety','t_variety','t_batch','d_compcode','d_fincode','d_variety','d_date'
      ]),
    });

	var ItemDataStore = new Ext.data.Store({
      id: 'ItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadItem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmh_code', type: 'string',mapping:'itmh_code'},
	{name:'itmh_name', type: 'string',mapping:'itmh_name'}
      ]),
    });
	
	var LotDataStore = new Ext.data.Store({
      id: 'LotDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlot"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_refno','lot_code'
      ]),
    });

var loadItemStockDataStore = new Ext.data.Store({
      id: 'loadItemStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'itmt_opqty', 'itmt_opvalue', 'itmt_clqty', 'itmt_clvalue', 'itmt_avgrate'
      ]),
    });

var txtissretno = new Ext.form.NumberField({
	fieldLabel  : 'Ret No',
	id          : 'txtissretno',
	name        : 'txtissretno',
	width       :  100,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});


function get_Stock()
{
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();
	chkitemcode  = selrow.get('itmh_code');

//ert(chkitemcode);
        txtItemName.setValue(selrow.get('itmh_name'));
        flxItem.hide();
        txtretqty.focus();

        loadItemStockDataStore.removeAll();
        loadItemStockDataStore.load({
                url: 'ClsFuIssueReturn.php',
                params:
                {
                    task:"loadItemStock",
		    compcode : Gincompcode,
		    finid    : GinFinid,
		    itemcode : chkitemcode,

                },
		callback:function()
		{

			txtcostrate.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('itmt_avgrate'),"0.00000"));
			
 			txtstock.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('itmt_clqty'),"0.000"));
				

		}
            });


}

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxItem,
        x: 80,
        y: 40,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "itmh_code", dataIndex: 'itmh_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'itmh_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'itmh_moisture_per',sortable:true,width:330,align:'left',hidden:true},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                            get_Stock();

                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                            get_Stock();

             }     
     
   }
   });

var cmbIssRetNo = new Ext.form.ComboBox({
        fieldLabel      : 'Ret. No',
        width           : 100,
        displayField    : 'isrh_no', 
        valueField      : 'isrh_seqno',
        hiddenName      : '',
        id              : 'cmbIssRetNo',
        typeAhead       : true,
        mode            : 'local',
        store           : IssRetnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       enableKeyEvents: true,
	listeners:{
        select: function(){
		flxdetail.getStore().removeAll();
		
		Issdetaildatastore.removeAll();
            	Issdetaildatastore.load({
                url: 'ClsFuIssueReturn.php',
                params:
                {
                    task:"loadissRetdetail",
                    finid: GinFinid,
		    compcode: Gincompcode,
		    issno: cmbIssRetNo.getRawValue(),
		    AEDFlag : SaveFlag
                },
		scope : this,
		callback:function(){

			var RowCnt = Issdetaildatastore.getCount();

                         txtissretno.setRawValue(cmbIssRetNo.getRawValue());


			seqnoed = cmbIssRetNo.getValue();
			for (var i=0;i<RowCnt;i++)
			{


			
				dtpissdate.setValue(Ext.util.Format.date(Issdetaildatastore.getAt(i).get('isrh_date'),"Y-m-d"));

	
				flxdetail.getStore().insert(
				flxdetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
                            itemname : Issdetaildatastore.getAt(i).get('itmh_name'),
			    retqty : Issdetaildatastore.getAt(i).get('isrt_qty'),
			    retval : Issdetaildatastore.getAt(i).get('isrt_values'),
                            itemseq : Issdetaildatastore.getAt(i).get('isrt_itemcode'),
			    stock : (Number(Issdetaildatastore.getAt(i).get('itmt_clqty')) + Number(Issdetaildatastore.getAt(i).get('isrt_qty'))),
			    avgrate : Issdetaildatastore.getAt(i).get('isrt_rate'),


				}) 
				);

			}//For Loop
grid_tot();
		}
		});
		
	}
	}
   });

var dtpissdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpissdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true
});


function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsFuIssueReturn.php',
		params:
		{
			task:"loadSearchItemlist",
			itemname : txtItemName.getRawValue(),
		},
        });
}

var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();
                   txtretqty.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxItem.getEl().setStyle('z-index','10000');
	        flxItem.show();
	        loadSearchItemListDatastore.removeAll();
  	        ItemSearch();
            }
         }  
    });

/*
var cmbitem = new Ext.form.ComboBox({
        fieldLabel      : 'Item Details',
        width           : 350,
        displayField    : 'itmh_name', 
        valueField      : 'itmh_code',
        hiddenName      : '',
        id              : 'cmbitem',
        typeAhead       : true,
        mode            : 'local',
        store           : ItemDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select: function(){

           LotDataStore.removeAll();
	   cmblotno.reset();
            LotDataStore.load({
                url: 'ClsFuIssueReturn.php',
                params:
                {
                    task:"loadlot",
		    compcode : Gincompcode,
		    finid: GinFinid,
		    itemcode : cmbitem.getValue()
                }
            });
                            grid_tot();
                          //  CalculatePOVal();
                            cmblotno.reset();
                            txtretqty.setRawValue("");
                            txtstock.setRawValue("");
                            txtcostrate.setRawValue("");
          
                            txtretval.setRawValue("");
			    flxdetail.getSelectionModel().clearSelections();

        }
    }
});


var cmblotno = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 120,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'cmblotno',
        typeAhead       : true,
        mode            : 'local',
        store           : LotDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowblank      : false,
    listeners:{
        select: function(){

           loadItemStockDataStore.removeAll();
            loadItemStockDataStore.load({
                url: 'ClsFuIssueReturn.php',
                params:
                {
                    task:"loadItemStock",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('itmt_avgrate'),"0.00000"));
			
			if (Number(loadItemStockDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = loadItemStockDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(loadItemStockDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('stock'),"0.000"));
				actstk = Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('stock'),"0.000");
			}
			else { 
				txtstock.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('stock'),"0.000"));
				actstk = Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('stk_billqty'),"0.000");
			}
			var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
			txtretval.setValue(issval);			

		}
            });


        }
    }
});
*/



 var txtretqty = new Ext.form.TextField({
        fieldLabel  : 'Return Qty',
        id          : 'txtretqty',
        name        : 'txtretqty',
        width       :  100,
        allowBlank  :  false,
    enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   btnSubmit.focus();

             }
          },

keyup: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);

	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }

},
 keydown: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }
},
        blur: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }
},
 change: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }
}
}
    });

var txtretval = new Ext.form.NumberField({
        fieldLabel  : 'Iss. Ret. Value',
        id          : 'txtretval',
        name        : 'txtretval',
        width       :  100,
        allowBlank  :  false,
	readOnly:true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

var txtcostrate = new Ext.form.TextField({
        fieldLabel  : 'Cost Rate',
        id          : 'txtcostrate',
        name        : 'txtcostrate',
        width       :  100,
        allowBlank  :  false,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	
	tabindex : 1,
    enableKeyEvents: true,
    listeners:{
 keyup: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
},
 keydown: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
},
        blur: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
},
 change: function(){
	var issval = Number(txtretqty.getValue())*Number(txtcostrate.getValue());
	txtretval.setValue(issval);
}
}
    });

/*
 var txtremarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
        width       :  450,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });
*/


var txtstock = new Ext.form.TextField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  140,
        height       :  50,
        allowBlank  :  false,
        readOnly    : true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style:{'background':'#e8badf','height':'auto','font-size': '24px','font-weight':'bold','font-color':'red'},
	tabindex : 1
    });
 
var txtvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  80,
        allowBlank  :  false,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : true,
	tabindex : 1
    });

var txtqty = new Ext.form.TextField({
        fieldLabel  : 'Total',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  80,
        allowBlank  :  false, 
        readOnly    : true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

var fdbl_totalqty,fdbl_totalvalue;
function grid_tot(){
	fdbl_totalqty=0;
	fdbl_totalvalue=0;
	

	var Row= flxdetail.getStore().getCount();
	flxdetail.getSelectionModel().selectAll();
		var sel=flxdetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
		    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.retqty);
		    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.retval);
		}

		   
		txtqty.setValue(Ext.util.Format.number(fdbl_totalqty,"0.000"));
		txtvalue.setValue(Ext.util.Format.number(fdbl_totalvalue,"0.00"));
}

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 800,
    y       : 130,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	
	if(chkitemcode ==0 || txtItemName.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Issue Return", "Select Item");  	
	}            

	else if(txtretqty.getValue() == '' || txtretqty.getValue() == 0)
	{
                Ext.MessageBox.alert("Issue Return", "Enter IssQty");
                 gstadd="false";
        }
	else if((txtcostrate.getValue() == '') || (txtcostrate.getValue() == 0))
	    {
                Ext.MessageBox.alert("Issue Return", "Enter Cost Rate");
                 gstadd="false";
            }
	/*else if(txtnoofbags.getRawValue() == '')
	    {
                Ext.MessageBox.alert("Issue Return", "Enter No of Bags");
                 gstadd="false";
            }*/
	else if((txtretval.getValue()==0) || (txtretval.getValue()==0))
	{
                Ext.MessageBox.alert("Issue Return", "Enter Value");
                gstadd="false";
        }  
	else if(Number(txtretqty.getValue()) > Number(txtstock.getValue()))
	{
                Ext.MessageBox.alert("Issue Return", "Iss Qty should not be greater than Stock");
                gstadd="false";
        }  



	else
            {

                var ginitemseq = chkitemcode;
                flxdetail.getSelectionModel().selectAll();
                var selrows = flxdetail.getSelectionModel().getCount();
                var sel = flxdetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq == chkitemcode )
		    {
                        cnt = cnt + 1;
                    }
                }

		if(gridedit === "true")
		{
			gridedit = "false";
			//var sm = flxDetail.getSelectionModel();
			//var selrow = sm.getSelected();

			var idx = flxdetail.getStore().indexOf(editrow);


			sel[idx].set('itemname', txtItemName.getRawValue());

			sel[idx].set('retqty', parseFloat(txtretqty.getValue()));
			sel[idx].set('retval', txtretval.getValue());
			sel[idx].set('itemseq', chkitemcode);

			sel[idx].set('stock', parseFloat(txtstock.getValue()));
			sel[idx].set('avgrate', txtcostrate.getValue());


			sel[idx].set('prvval', actstk);



		            grid_tot();
	
		                    txtItemName.setRawValue("");
                                    chkitemcode = 0;
		                    txtretqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    txtcostrate.setRawValue("");
		
		                    txtretval.setRawValue("");


			flxdetail.getSelectionModel().clearSelections();

			

		}//if(gridedit === "true")
		else
		{
               
			if (cnt > 0)
			{
		            Ext.MessageBox.alert("Grid","Same Item already Entered.");
		        } else
		        {

		            var RowCnt = flxdetail.getStore().getCount() + 1;
		            flxdetail.getStore().insert(
		                flxdetail.getStore().getCount(),
		                new dgrecord({
		                    slno:RowCnt,

		                    itemname : txtItemName.getRawValue(),
	

				    retqty : Ext.util.Format.number(txtretqty.getValue(),"0.000"),
				    retval : txtretval.getValue(),
	
		                    itemseq : chkitemcode,

				    stock :  Ext.util.Format.number(txtstock.getValue(),"0.000"),
				    avgrate : txtcostrate.getValue(),
	
				    tbistk : tbistk,
				    actstk : actstk,
				    actiss : actqty,
				    prvqty : txtstock.getValue(),
				    prvval : actstk,

				    
		                }) 
		                );

		                    grid_tot();
		                  //  CalculatePOVal();

		                    txtItemName.setRawValue("");
                                    chkitemcode = 0;
		                    txtretqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    txtcostrate.setRawValue("");
		
		                    txtretval.setRawValue("");
                	}//else (cnt > 0)
		}// else //if(gridedit === "true")
		
            }//condition else


        }//click
    }//listener
});

var dgrecord = Ext.data.Record.create([]);
var flxdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:110,
    height: 130,
    hidden:false,
    width: 800,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Description", dataIndex: 'itemname',sortable:true,width:250,align:'left'},//1
        {header: "Item Code", dataIndex: 'itemseq',sortable:true,width:50,align:'left'},//1
        {header: "Return Qty", dataIndex: 'retqty',sortable:true,width:100,align:'left'},
        {header: "Return Value", dataIndex: 'retval',sortable:true,width:100,align:'left'},
        {header: "Stock", dataIndex: 'stock',sortable:true,width:100,align:'left'},//10
        {header: "Avg Rate", dataIndex: 'avgrate',sortable:true,width:100,align:'left'},//11




    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUE RETURN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;



				txtItemName.setValue(selrow.get('itemname'));
			        chkitemcode = selrow.get('itemseq');


				txtretqty.setValue(selrow.get('retqty'));
				txtretval.setValue(selrow.get('retval'));
				txtstock.setRawValue(selrow.get('stock'));
				txtcostrate.setRawValue(selrow.get('avgrate'));

           loadItemStockDataStore.removeAll();
            loadItemStockDataStore.load({
                url: 'ClsFuIssueReturn.php',
                params:
                {
                    task:"loadItemStock",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{


                        var clostk = Number(loadItemStockDataStore.getAt(0).get('itmt_clqty'))+Number(selrow.get('retqty'));
                        var cloval = Number(loadItemStockDataStore.getAt(0).get('itmt_clvalue'))+Number(selrow.get('retval'));


			txtcostrate.setValue(Ext.util.Format.number( Number(cloval)/Number(clostk) ,"0.00000"));
			
 			txtstock.setRawValue(Ext.util.Format.number( clostk,"0.000"));
		

		}
            });
				
				
flxdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});


   var TrnIssueReturnFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE RETURN',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnIssueReturnFormpanel',
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
            text: ' Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
            height: 40,
            fontSize:20,
            width:50,
            align : 'right',
            icon: '/Pictures/Add.png',
            listeners:{
                click: function () {
			SaveFlag = "Add";
			TrnIssueReturnFormpanel.getForm().reset();
			flxdetail.getStore().removeAll();
			txtissretno.focus();
			Ext.getCmp('txtissretno').setDisabled(true);
			Ext.getCmp('txtissretno').show();
			Ext.getCmp('cmbIssRetNo').setDisabled(true);
			Ext.getCmp('cmbIssRetNo').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsFuIssueReturn.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});
			
			IssRetnodatastore.load({
			url: 'ClsFuIssueReturn.php',
			params: {
			    task: 'loadissretno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : SaveFlag
			},
			callback:function()
			{
			txtissretno.setValue(IssRetnodatastore.getAt(0).get('issretno'));
			}
			});

			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsFuIssueReturn.php',
			params:
			{
			    task:"loadbatch",
			    finid:GinFinid,
			    compcode:Gincompcode,
			    qrytype: "frmload"
			}
			});
RefreshData();
			
                }
            }
        },'-',
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//edit

			SaveFlag = "Edit";
			flxdetail.getStore().removeAll();
			Ext.getCmp('txtissretno').hide();
			Ext.getCmp('cmbIssRetNo').setDisabled(false);
			Ext.getCmp('cmbIssRetNo').show();

			IssRetnodatastore.load({
			url: 'ClsFuIssueReturn.php',
			params: {
			    task: 'loadissretno',
				compcode:Gincompcode,
				fincode :GinFinid,
				gstflag : SaveFlag
			}
			});



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
                        flxdetail.getSelectionModel().selectAll();
                                if (flxdetail.getSelectionModel().getCount()==0)
                    		{
                        		Ext.Msg.alert('Issue Return','Grid Should not be empty..');
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

						var IssueReturndetails = flxdetail.getStore().getRange();
                    				var IssueReturnData = new Array();
                    				Ext.each(IssueReturndetails, function (record){
                    				IssueReturnData.push(record.data);
                    				});
						
						Ext.Ajax.request({
		                            	url: 'TrnFuIssueReturnSave.php',
                		       	        params:
						{
					                griddet:Ext.util.JSON.encode(IssueReturnData),	
                                                        cnt:IssueReturndetails.length,
  							isscompcode : Gincompcode,
							issfincode : GinFinid,
						issretdate : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
							issretval : txtvalue.getValue(),
							usrcode   : userid,
							gstflag   : SaveFlag,
							issretno  : txtissretno.getRawValue(),
							seqnoed   : seqnoed
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
                                                    msg: 'Issue Return No : ' + obj['IssRetNo'] + '  Saved',
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                  //  Ext.MessageBox.alert("Alert"," Saved ");
//						        TrnIssueReturnFormpanel.getForm().reset();
							flxdetail.getStore().removeAll();
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
                                                    msg: 'Failed Contact MIS',
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
			//}
			//else {
			//	alert('Issue Date Should be current date');
			//}

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
			listeners:{
			click: function(){
				TrnIssueRetrunWindow.hide();
			}
			}
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ISSUE RETRUN',
                layout  : 'hbox',
                border  : true,
                height  : 480,
                width   : 930,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtissretno]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbIssRetNo]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpissdate]
                            },

		{ xtype   : 'fieldset',
                title   : 'Item Details',
                layout  : 'hbox',
                border  : true,
                height  : 280,
                width   : 890,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 80,
                items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtItemName]
                            },flxItem,
/*
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 230,
                                	x           : 370,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmblotno]
                            },
*/
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtretqty]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 250,
                                	x           : 230,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtretval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtcostrate]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 520,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtstock]
                            },flxdetail]},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 550,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 320,
                                	x           : 610,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtvalue]
                            },
/*
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 0,
                                	y           : 370,
                                    	border      : false,
                                	items: [txtremarks]
	                            },
*/
                             btnSubmit
                ]

            }
            
        ]
    });
   


   function RefreshData(){
        SaveFlag ="Add";  
        flxItem.hide();             
//	TrnIssueReturnFormpanel.getForm().reset();
	flxdetail.getStore().removeAll();
	
	IssRetnodatastore.load({
	url: 'ClsFuIssueReturn.php',
	params: {
	    task: 'loadissretno',
		compcode:Gincompcode,
		fincode:GinFinid,
		gstflag : SaveFlag
	},
	callback:function()
	{

	txtissretno.setValue(IssRetnodatastore.getAt(0).get('issretno'));
	}
	});



	txtissretno.focus();
	Ext.getCmp('txtissretno').setDisabled(true);
	Ext.getCmp('txtissretno').show();
	Ext.getCmp('cmbIssRetNo').setDisabled(true);
	Ext.getCmp('cmbIssRetNo').hide();

};
 
   
    var TrnIssueRetrunWindow = new Ext.Window({
	height      : 570,
        width       : 960,
        y           : 35,
        title       : 'ISSUE RETURN',
        items       : TrnIssueReturnFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
      
		if (SaveFlag === "Add")
		{	
			txtissretno.focus();
			Ext.getCmp('txtissretno').setDisabled(true);
			
			Ext.getCmp('txtissretno').show();
			Ext.getCmp('cmbIssRetNo').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsFuIssueReturn.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});


                        RefreshData();
/*
			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsFuIssueReturn.php',
			params:
			{
			    task:"loadbatch",
			    finid:GinFinid,
			    compcode:Gincompcode,
			    qrytype: "frmload"
			}
			});
*/
       
		}

	   	
	   	}

		}
    });
    TrnIssueRetrunWindow.show();  
});
