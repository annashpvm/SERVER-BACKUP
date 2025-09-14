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

var Issnodatastore = new Ext.data.Store({
  id: 'Issnodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsIssue.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issno','issh_no','issh_seqno',
  ])
});


var Issdetaildatastore = new Ext.data.Store({
  id: 'Issdetaildatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsIssue.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissdetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'lot_code', 'lot_refno', 'lot_remarks', 'isst_hdseqno', 'isst_seqno', 'isst_lotseqno', 'isst_itmcode', 'isst_costcenter', 'isst_vartype', 'isst_qty', 'isst_rate', 'isst_bags', 'isst_values', 'isst_bqty', 'isst_batch', 'isst_machine', 'issh_type', 'issh_unit', 'issh_date', 'issh_remarks', 'issh_seqno', 'itmh_name', 'stk_qty', 'stk_qty_bags', 'stk_billqty','isst_varty'
  ])
});

 var loadvarietydatastore = new Ext.data.Store({
      id: 'loadvarietydatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'vargrp_type_code', 'vargrp_type_name'
      ]),
    });
	
 var loadbatchdatastore = new Ext.data.Store({
      id: 'loadbatchdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
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
                url: 'ClsIssue.php',      // File to connect to
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
                url: 'ClsIssue.php',      // File to connect to
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

var LotItemDataStore = new Ext.data.Store({
      id: 'LotItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlotitem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_refno','lot_code','stock','itmt_avgrate','itmt_clqty','itmt_clbillqty','stock_bags','stk_billqty','itmtype','itmvalue'
      ]),
    });

var txtissno = new Ext.form.NumberField({
	fieldLabel  : 'Issue No',
	id          : 'txtissno',
	name        : 'txtissno',
	width       :  100,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var cmbissno = new Ext.form.ComboBox({
        fieldLabel      : 'Issue No',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbissno',
        typeAhead       : true,
        mode            : 'local',
        store           : Issnodatastore,
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
			loadvarietydatastore.removeAll();

			loadvarietydatastore.load({
			url: 'ClsIssue.php',
			params:
			{
			    task:"loadvariety",
			    compcode:Gincompcode
			}
			});		
		Issdetaildatastore.removeAll();
            	Issdetaildatastore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadissdetail",
                    finid: GinFinid,
		    compcode: Gincompcode,
		    issno: cmbissno.getRawValue(),
		    AEDFlag : SaveFlag
                },
		scope : this,
		callback:function(){

			var RowCnt = Issdetaildatastore.getCount();
			seqnoed = cmbissno.getValue();
			for (var i=0;i<RowCnt;i++)
			{


				cmbVariety.setValue(Issdetaildatastore.getAt(i).get('isst_varty'));
				dtpissdate.setValue(Ext.util.Format.date(Issdetaildatastore.getAt(i).get('issh_date'),"Y-m-d"));

	
				flxdetail.getStore().insert(
				flxdetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
                            
                            lotno : Issdetaildatastore.getAt(i).get('lot_refno'),
                            itemname : Issdetaildatastore.getAt(i).get('itmh_name'),
			    variety : cmbVariety.getRawValue(), 
			    issqty : Issdetaildatastore.getAt(i).get('isst_qty'),
			    issval : Issdetaildatastore.getAt(i).get('isst_values'),
                            lotseq : Issdetaildatastore.getAt(i).get('lot_code'),
                            itemseq : Issdetaildatastore.getAt(i).get('isst_itmcode'),
                            varseq  : Issdetaildatastore.getAt(i).get('isst_varty'),
			    stock : (Number(Issdetaildatastore.getAt(i).get('stk_qty')) + Number(Issdetaildatastore.getAt(i).get('isst_qty'))),
			    avgrate : Issdetaildatastore.getAt(i).get('isst_rate'),


				}) 
				);

				/*cmbbatch.setValue('');
				cmbVariety.setValue('');
				cmbmachine.setValue('');*/
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


var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 150,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadvarietydatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
   });

var cmbitem = new Ext.form.ComboBox({
        fieldLabel      : 'Item Details',
        width           : 250,
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
                url: 'ClsIssue.php',
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
                            txtissqty.setRawValue("");
                            txtstock.setRawValue("");
                            txtcostrate.setRawValue("");
          
                            txtissval.setRawValue("");
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

           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('itmt_avgrate'),"0.00000"));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('stock'),"0.000"));
				actstk = Ext.util.Format.number(LotItemDataStore.getAt(0).get('stock'),"0.000");
			}
			else { 
				txtstock.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('stock'),"0.000"));
				actstk = Ext.util.Format.number(LotItemDataStore.getAt(0).get('stk_billqty'),"0.000");
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });


        }
    }
});

 var txtissqty = new Ext.form.TextField({
        fieldLabel  : 'Issue Qty',
        id          : 'txtissqty',
        name        : 'txtissqty',
        width       :  100,
        allowBlank  :  false,
    enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
    listeners:{
keyup: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);

	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtissqty.getValue());
	}
	else { actqty = 0; }

},
 keydown: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtissqty.getValue());
	}
	else { actqty = 0; }
},
        blur: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtissqty.getValue());
	}
	else { actqty = 0; }
},
 change: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtissqty.getValue());
	}
	else { actqty = 0; }
}
}
    });

var txtissval = new Ext.form.NumberField({
        fieldLabel  : 'Issue Value',
        id          : 'txtissval',
        name        : 'txtissval',
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
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
 keydown: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
        blur: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
 change: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
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
        width       :  120,
        height       :  50,
        allowBlank  :  false,
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
		    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.issqty);
		    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.issval);
		}
		    txtqty.setValue(fdbl_totalqty);
		    txtvalue.setValue(fdbl_totalvalue);
		   
}

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 750,
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
	
	if(cmbitem.getValue()==0 || cmbitem.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Issue", "Select Item");  	
	}            
	else if(cmblotno.getValue()==0 || cmblotno.getRawValue()=="")
	{
                Ext.MessageBox.alert("Issue", "Select Lotno");  
                 gstadd="false";
        }
	else if(txtissqty.getValue() == '' || txtissqty.getValue() == 0)
	{
                Ext.MessageBox.alert("Issue", "Enter IssQty");
                 gstadd="false";
        }
	else if((txtcostrate.getValue() == '') || (txtcostrate.getValue() == 0))
	    {
                Ext.MessageBox.alert("Issue", "Enter Cost Rate");
                 gstadd="false";
            }
	/*else if(txtnoofbags.getRawValue() == '')
	    {
                Ext.MessageBox.alert("Issue", "Enter No of Bags");
                 gstadd="false";
            }*/
	else if((txtissval.getValue()==0) || (txtissval.getValue()==0))
	{
                Ext.MessageBox.alert("Issue", "Enter Value");
                gstadd="false";
        } 
/* 
	else if(Number(txtissqty.getValue()) > Number(txtstock.getValue()))
	{
                Ext.MessageBox.alert("Issue", "Consumption Qty should not be greater than Stock");
                gstadd="false";
        }  
*/
	else if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
	{
		Ext.MessageBox.alert("Issue", "Select Variety");
                gstadd="false";
		
	}

	else
            {

                var ginitemseq = cmbitem.getValue();
                var ginlotseq = cmblotno.getValue();
                flxdetail.getSelectionModel().selectAll();
                var selrows = flxdetail.getSelectionModel().getCount();
                var sel = flxdetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq == cmbitem.getValue() && sel[i].data.lotseq == cmblotno.getValue())
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

			sel[idx].set('lotno', cmblotno.getRawValue());
			sel[idx].set('itemname', cmbitem.getRawValue());
			sel[idx].set('variety', cmbVariety.getRawValue());
			sel[idx].set('issqty', parseFloat(txtissqty.getValue()));
			sel[idx].set('issval', txtissval.getValue());
			sel[idx].set('lotseq', cmblotno.getValue());
			sel[idx].set('itemseq', cmbitem.getValue());

			sel[idx].set('varseq', cmbVariety.getValue());
			sel[idx].set('variety', cmbVariety.getRawValue());

			sel[idx].set('stock', parseFloat(txtstock.getValue()));
			sel[idx].set('avgrate', txtcostrate.getValue());

			sel[idx].set('tbistk', tbistk);
			sel[idx].set('actstk' ,actstk);
			sel[idx].set('actiss', actqty);

			sel[idx].set('prvqty', txtstock.getValue());
			sel[idx].set('prvval', actstk);



		            grid_tot();
		           // CalculatePOVal();

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
		                    lotno : cmblotno.getRawValue(),
		                    itemname : cmbitem.getRawValue(),
	
				    variety : cmbVariety.getRawValue(),
				    issqty : Ext.util.Format.number(txtissqty.getValue(),"0.000"),
				    issval : txtissval.getValue(),
		                    lotseq : cmblotno.getValue(),
		                    itemseq : cmbitem.getValue(),
	              		    varseq : cmbVariety.getValue(),
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
		                    cmblotno.reset();
		                    cmbitem.setRawValue("");

		                    txtissqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    txtcostrate.setRawValue("");
		
		                    txtissval.setRawValue("");
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
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:100,align:'left'},//0
        {header: "Item Description", dataIndex: 'itemname',sortable:true,width:250,align:'left'},//1
        {header: "Variety", dataIndex: 'variety',sortable:true,width:100,align:'left'},//3
        {header: "Issue Qty", dataIndex: 'issqty',sortable:true,width:100,align:'left'},//4
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:100,align:'left'},//5
	{header: "Lot Seqno", dataIndex: 'lotseq',sortable:true,width:50,align:'left',hidden:true},//6,hidden:true
        {header: "Variety Seqno", dataIndex: 'varseq',sortable:true,width:50,align:'left',hidden:true},//9,hidden:true
        {header: "Stock", dataIndex: 'stock',sortable:true,width:100,align:'left'},//10
        {header: "Avg Rate", dataIndex: 'avgrate',sortable:true,width:100,align:'left'},//11
        {header: "Actual Stock", dataIndex: 'actstk',sortable:true,width:50,align:'left'},//14,hidden:true
        {header: "Actual Issue", dataIndex: 'actiss',sortable:true,width:50,align:'left'},//15,hidden:true
//        {header: "Prev Stk Qty", dataIndex: 'prvqty',sortable:true,width:50,align:'left'},//16
//        {header: "Prev Stk Val", dataIndex: 'prvval',sortable:true,width:50,align:'left'},//17


    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
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



				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));

				cmbVariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));

           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('itmt_avgrate'),"0.00000"));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('stock'),"0.000"));
				
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(Ext.util.Format.number(LotItemDataStore.getAt(0).get('stock'),"0.000"));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

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


   var TrnIssueFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE',
        header      : false,
        width       : 827,	
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
			TrnIssueFormpanel.getForm().reset();
			flxdetail.getStore().removeAll();
			txtissno.focus();
			Ext.getCmp('txtissno').setDisabled(true);
			Ext.getCmp('txtissno').show();
			Ext.getCmp('cmbissno').setDisabled(true);
			Ext.getCmp('cmbissno').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsIssue.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});
			
			Issnodatastore.load({
			url: 'ClsIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : SaveFlag
			},
			callback:function()
			{
			txtissno.setValue(Issnodatastore.getAt(0).get('issno'));
			}
			});

			loadvarietydatastore.removeAll();

			loadvarietydatastore.load({
			url: 'ClsIssue.php',
			params:
			{
			    task:"loadvariety",
			    compcode:Gincompcode
			}
			});
			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsIssue.php',
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
			Ext.getCmp('txtissno').hide();
			Ext.getCmp('cmbissno').setDisabled(false);
			Ext.getCmp('cmbissno').show();

			Issnodatastore.load({
			url: 'ClsIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode :GinFinid,
				AEDFlag : SaveFlag
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
                               if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
				{
					alert("Select Variety..");
					
				}
				else if (flxdetail.getSelectionModel().getCount()==0)
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

						var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});
						
						Ext.Ajax.request({
		                            	url: 'TrnIssueSave.php',
                		       	        params:
						{
					                griddet:Ext.util.JSON.encode(fabricupdetails),	
							cnt:fabricretdetails.length,					
  							isscompcode : Gincompcode,
							issfincode : GinFinid,
							issdate : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
							issval : txtvalue.getValue(),
							issunit : '1',
//							issremarks : txtremarks.getRawValue(),
							usrcode : '1',
							AEDFlag : SaveFlag,
							isspno  : cmbissno.getRawValue(),
							seqnoed : seqnoed
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
                                                    msg: 'Issue No : ' + obj['IssNo'] + '  Saved',
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                  //  Ext.MessageBox.alert("Alert"," Saved ");
						        TrnIssueFormpanel.getForm().reset();
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
				TrnIssueWindow.hide();
			}
			}
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ISSUE',
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
                                	items: [txtissno]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbissno]
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

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 270,
                                	x           : 420,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbVariety]
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
                                	width       : 430,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbitem]
                            },
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
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtissqty]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 220,
                                	x           : 230,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtissval]
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
	TrnIssueFormpanel.getForm().reset();
	flxdetail.getStore().removeAll();
	
	Issnodatastore.load({
	url: 'ClsIssue.php',
	params: {
	    task: 'loadissno',
		compcode:Gincompcode,
		fincode:GinFinid,
		AEDFlag : SaveFlag
	},
	callback:function()
	{

	txtissno.setValue(Issnodatastore.getAt(0).get('issno'));
	}
	});

        cmbVariety.setValue(1);

	txtissno.focus();
	Ext.getCmp('txtissno').setDisabled(true);
	Ext.getCmp('txtissno').show();
	Ext.getCmp('cmbissno').setDisabled(true);
	Ext.getCmp('cmbissno').hide();

};
 
   
    var TrnIssueWindow = new Ext.Window({
	height      : 570,
        width       : 960,
        y           : 35,
        title       : 'ISSUE',
        items       : TrnIssueFormpanel,
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
			txtissno.focus();
			Ext.getCmp('txtissno').setDisabled(true);
			
			Ext.getCmp('txtissno').show();
			Ext.getCmp('cmbissno').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsIssue.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});

			loadvarietydatastore.removeAll();

			loadvarietydatastore.load({
			url: 'ClsIssue.php',
			params:
			{
			    task:"loadvariety",
			    compcode:Gincompcode
			},
                        callback : function() {
                           cmbVariety.setValue(1);
                        } 
			});
                        RefreshData();
/*
			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsIssue.php',
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
    TrnIssueWindow.show();  
});
