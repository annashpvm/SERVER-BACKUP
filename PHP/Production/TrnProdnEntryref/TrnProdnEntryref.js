Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var AEDFlag ="Add";
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
     'lot_code', 'lot_refno', 'lot_remarks', 'isst_hdseqno', 'isst_seqno', 'isst_lotseqno', 'isst_itmcode', 'isst_costcenter', 'isst_vartype', 'isst_qty', 'isst_rate', 'isst_bags', 'isst_values', 'isst_bqty', 'isst_batch', 'isst_machine', 'issh_type', 'issh_unit', 'issh_date', 'issh_remarks', 'issh_seqno', 'itmh_name', 'stk_qty', 'stk_qty_bags', 'stk_billqty',
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
	'mis_var_grpcode','mis_var_grp_sname'
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
	fieldLabel  : 'Iss No',
	id          : 'txtissno',
	name        : 'txtissno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

 var cmbissno = new Ext.form.ComboBox({
        fieldLabel      : 'Iss No',
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
        editable        : false,
	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
		flxdetail.getStore().removeAll();
		Issdetaildatastore.removeAll();
            	Issdetaildatastore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadissdetail",
                    finid: GinFinid,
		    compcode: Gincompcode,
		    issno: cmbissno.getRawValue(),
		    AEDFlag : AEDFlag
                },
		scope : this,
		callback:function(){

			var RowCnt = Issdetaildatastore.getCount();
			seqnoed = cmbissno.getValue();
			for (var i=0;i<RowCnt;i++)
			{
				cmbbatch.setValue(Issdetaildatastore.getAt(i).get('isst_batch'));
				cmbvariety.setValue(Issdetaildatastore.getAt(i).get('isst_vartype'));
				dtpissdate.setValue(Ext.util.Format.date(Issdetaildatastore.getAt(i).get('issh_date'),"Y-m-d"));
				if (Issdetaildatastore.getAt(i).get('isst_machine') == "1")
				{
					macname = 'DIP';
				}
				else if (Issdetaildatastore.getAt(i).get('isst_machine') == "2")
				{
					macname = 'PM1';
				}
				else if (Issdetaildatastore.getAt(i).get('isst_machine') == "3")
				{
					macname = 'PM2';
				}
				else if (Issdetaildatastore.getAt(i).get('isst_machine') == "4")
				{
					macname = 'PM3';
				}
				else if (Issdetaildatastore.getAt(i).get('isst_machine') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(Issdetaildatastore.getAt(i).get('isst_machine'));
				cmbmachine.setRawValue(macname);
				flxdetail.getStore().insert(
				flxdetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
                            
                            lotno : Issdetaildatastore.getAt(i).get('lot_refno'),
                            itemname : Issdetaildatastore.getAt(i).get('itmh_name'),
			    batch : cmbbatch.getRawValue(), 
			    variety : cmbvariety.getRawValue(), 
			    issqty : Issdetaildatastore.getAt(i).get('isst_qty'),
			    issval : Issdetaildatastore.getAt(i).get('isst_values'),
                            lotseq : Issdetaildatastore.getAt(i).get('lot_code'),
                            itemseq : Issdetaildatastore.getAt(i).get('isst_itmcode'),
			    batseq : Issdetaildatastore.getAt(i).get('isst_batch'),
			    varseq : Issdetaildatastore.getAt(i).get('isst_vartype'),
			    stock : (Number(Issdetaildatastore.getAt(i).get('stk_qty')) + Number(Issdetaildatastore.getAt(i).get('isst_qty'))),
			    avgrate : Issdetaildatastore.getAt(i).get('isst_rate'),
			    issbags : Issdetaildatastore.getAt(i).get('isst_bags'), 
			    tbistk : Number(Issdetaildatastore.getAt(i).get('isst_bags')) + Number(Issdetaildatastore.getAt(i).get('stk_qty_bags')),
			    actstk : Number(Issdetaildatastore.getAt(i).get('isst_bqty')) + Number(Issdetaildatastore.getAt(i).get('stk_billqty')),
			    actiss : Issdetaildatastore.getAt(i).get('isst_bqty'),
			    prvqty : '',//Issdetaildatastore.getAt(i).get(''),
			    prvval : '',//Issdetaildatastore.getAt(i).get(''),
			    machine : macname,
			    mcseq : Issdetaildatastore.getAt(i).get('isst_machine'),


				}) 
				);

				/*cmbbatch.setValue('');
				cmbvariety.setValue('');
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
//	readOnly : true
});

var cmbmachine = new Ext.form.ComboBox({
        fieldLabel      : 'Machine',
        width           : 150,
    	displayField    : 'field2',
    	valueField      : 'field1',
    	hiddenName      : 'field1',
        id              : 'cmbmachine',
        typeAhead       : true,
        mode            : 'local',
        store           : [[1, 'DIP'],[2,'PM1'],[3,'PM2'],[4,'PM3'],[5,'VJPM']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
    listeners:{
        select: function(){
		
		if (cmbmachine.getValue() == 1) { mcode = 0;}
		if (cmbmachine.getValue() == 2) { mcode = 4;}
		if (cmbmachine.getValue() == 3) { mcode = 2;}
		if (cmbmachine.getValue() == 4) { mcode = 2;}
		if (cmbmachine.getValue() == 5) { mcode = 3;}
		if (cmbmachine.getValue() > 5) { mcode = 90;}
            //Ext.getCmp('cmbmachine').setDisabled(false);            
            loadvarietydatastore.removeAll();
            loadvarietydatastore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadvariety",
		    machine : this.getRawValue()
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
		    issdate:Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
		    mcode : mcode,
		    machine: cmbmachine.getValue(),
		    qrytype: "afmc"
                },
		
		callback:function(){
		    if(cmbmachine.getValue() == 1)
			{
			    cmbbatch.setValue(loadbatchdatastore.getAt(0).get('d_variety'));
			}
		    else
			{
			    cmbbatch.setValue(loadbatchdatastore.getAt(0).get('t_batch'));				
			    cmbvariety.setValue(loadbatchdatastore.getAt(0).get('t_variety'));
			}
		}
            });


        }
    }
});

var cmbbatch = new Ext.form.ComboBox({
        fieldLabel      : 'Batch',
        width           : 150,
        displayField    : 'mis_batchvariety', 
        valueField      : 'mis_batchcode',
        hiddenName      : '',
        id              : 'cmbbatch',
        typeAhead       : true,
        mode            : 'local',
        store           : loadbatchdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbvariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 150,
        displayField    : 'mis_var_grp_sname', 
        valueField      : 'mis_var_grpcode',
        hiddenName      : '',
        id              : 'cmbvariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadvarietydatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
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
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
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
                            txtnoofbags.setRawValue("");
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

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });


        }
    }
});

 var txtissqty = new Ext.form.NumberField({
        fieldLabel  : 'Issue Qty',
        id          : 'txtissqty',
        name        : 'txtissqty',
        width       :  100,
        allowBlank  :  false,
    enableKeyEvents: true,
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
	tabindex : 1
    });

var txtcostrate = new Ext.form.NumberField({
        fieldLabel  : 'Cost Rate',
        id          : 'txtcostrate',
        name        : 'txtcostrate',
        width       :  100,
        allowBlank  :  false,
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

 var txtremarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
        width       :  450,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

 var txtnoofbags = new Ext.form.NumberField({
        fieldLabel  : 'No of Bags',
        id          : 'txtnoofbags',
        name        : 'txtnoofbags',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  100,
        height       :  50,
        allowBlank  :  false,
	style:{'background':'#e8badf','height':'auto','font-size': '28px','font-weight':'bold','font-color':'red'},
	tabindex : 1
    });
 
var txtvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1
    });

var txtqty = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  80,
        allowBlank  :  false,
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
	else if(txtissqty.getValue() > txtstock.getValue())
	{
                Ext.MessageBox.alert("Issue", "Iss Qty should not be greater than Stock");
                gstadd="false";
        }  
	else if(cmbmachine.getRawValue()=="" || cmbmachine.getValue()==0)
	{
		
		Ext.MessageBox.alert("Issue", "Select Machine");
                gstadd="false";
		
	}
	else if(cmbbatch.getRawValue()=="" || cmbbatch.getValue()==0)
	{
		Ext.MessageBox.alert("Issue", "Select Batch");
                gstadd="false";
		
	}
	else if(cmbvariety.getRawValue()=="" || cmbvariety.getValue()==0)
	{
		Ext.MessageBox.alert("Issue", "Select Variety");
                gstadd="false";
		
	}
	else if(Number(tbistk) < Number(txtnoofbags.getValue()))
	{
		Ext.MessageBox.alert("Issue", "Available number of bag(s) is less");
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
			sel[idx].set('batch', cmbbatch.getRawValue());
			sel[idx].set('variety', cmbvariety.getRawValue());
			sel[idx].set('issqty', parseFloat(txtissqty.getValue()));
			sel[idx].set('issval', txtissval.getValue());
			sel[idx].set('lotseq', cmblotno.getValue());
			sel[idx].set('itemseq', cmbitem.getValue());
			sel[idx].set('batseq', cmbbatch.getValue());
			sel[idx].set('varseq', cmbvariety.getValue());
			sel[idx].set('variety', cmbvariety.getRawValue());

			sel[idx].set('stock', parseFloat(txtstock.getValue()));
			sel[idx].set('avgrate', txtcostrate.getValue());
			sel[idx].set('issbags', txtnoofbags.getValue());
			sel[idx].set('tbistk', tbistk);
			sel[idx].set('actstk' ,actstk);
			sel[idx].set('actiss', actqty);

			sel[idx].set('prvqty', txtstock.getValue());
			sel[idx].set('prvval', actstk);
			sel[idx].set('machine',cmbmachine.getRawValue());
			sel[idx].set('mcseq', cmbmachine.getValue());


		            grid_tot();
		            CalculatePOVal();

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
				    batch : cmbbatch.getRawValue(),
				    variety : cmbvariety.getRawValue(),
				    issqty : txtissqty.getValue(),
				    issval : txtissval.getValue(),
		                    lotseq : cmblotno.getValue(),
		                    itemseq : cmbitem.getValue(),
				    batseq : cmbbatch.getValue(),
				    varseq : cmbvariety.getValue(),
				    stock :  parseFloat(txtstock.getValue()),
				    avgrate : txtcostrate.getValue(),
				    issbags : txtnoofbags.getValue(),
				    tbistk : tbistk,
				    actstk : actstk,
				    actiss : actqty,
				    prvqty : txtstock.getValue(),
				    prvval : actstk,
				    machine : cmbmachine.getRawValue(),
				    mcseq : cmbmachine.getValue()
				    
		                }) 
		                );

		                    grid_tot();
		                  //  CalculatePOVal();
		                    cmblotno.reset();
		                    cmbitem.setRawValue("");

		                    txtissqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    txtcostrate.setRawValue("");
		                    txtnoofbags.setRawValue("");
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
        {header: "Batch", dataIndex: 'batch',sortable:true,width:100,align:'left'},//2
        {header: "Variety", dataIndex: 'variety',sortable:true,width:100,align:'left'},//3
        {header: "Issue Qty", dataIndex: 'issqty',sortable:true,width:100,align:'left'},//4
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:100,align:'left'},//5
	{header: "Lot Seqno", dataIndex: 'lotseq',sortable:true,width:50,align:'left',hidden:true},//6,hidden:true
        {header: "Item Seqno", dataIndex: 'itemseq',sortable:true,width:50,align:'left',hidden:true},//7,hidden:true
        {header: "Batch Seqno", dataIndex: 'batseq',sortable:true,width:50,align:'left',hidden:true},//8,hidden:true
        {header: "Variety Seqno", dataIndex: 'varseq',sortable:true,width:50,align:'left',hidden:true},//9,hidden:true
        {header: "Stock", dataIndex: 'stock',sortable:true,width:100,align:'left'},//10
        {header: "Avg Rate", dataIndex: 'avgrate',sortable:true,width:100,align:'left'},//11
        {header: "Issue Bags", dataIndex: 'issbags',sortable:true,width:100,align:'left'},//12
	{header: "Total Bags in Stock", dataIndex: 'tbistk',sortable:true,width:50,align:'left',hidden:true},//13,hidden:true
        {header: "Actual Stock", dataIndex: 'actstk',sortable:true,width:50,align:'left'},//14,hidden:true
        {header: "Actual Issue", dataIndex: 'actiss',sortable:true,width:50,align:'left'},//15,hidden:true
        {header: "Prev Stk Qty", dataIndex: 'prvqty',sortable:true,width:50,align:'left'},//16
        {header: "Prev Stk Val", dataIndex: 'prvval',sortable:true,width:50,align:'left'},//17
        {header: "Machine", dataIndex: 'machine',sortable:true,width:50,align:'left'},//18
	{header: "Machine code", dataIndex: 'mcseq',sortable:true,width:50,align:'left',hidden:true},//19,hidden:true

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

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}
				else if (selrow.get('mcseq') == "4")
				{
					macname = 'PM3';
				}
				else if (selrow.get('mcseq') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
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

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
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

var optisstype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:180,
    height:60,
    x:680,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optisstype',
        items: [
            {boxLabel: 'Consumption', name: 'optisstype', id:'optcons', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            
               }
              }
             }
            },
            {boxLabel: 'Conversion', name: 'optisstype', id:'optconv', inputValue: 2,hidden:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            
               }
              }
             }}
        ]
    }
    ]
});

                        function RefreshData(){

			TrnIssueFormpanel.getForm().reset();

			/*txtissno.focus();
			Ext.getCmp('txtissno').setDisabled(true);
			Ext.getCmp('txtissno').show();
			Ext.getCmp('cmbissno').setDisabled(true);
			Ext.getCmp('cmbissno').hide();
			//ItemDataStore.removeAll();*/
};

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
			AEDFlag = "Add";
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
				AEDFlag : AEDFlag
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
			AEDFlag = "Edit";
			flxdetail.getStore().removeAll();
			Ext.getCmp('txtissno').hide();
			Ext.getCmp('cmbissno').setDisabled(false);
			Ext.getCmp('cmbissno').show();
			Issnodatastore.load({
			url: 'ClsIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : AEDFlag
			}
			});

			RefreshData();

                }
            }
        },'-',                
		{
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
				if (Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") === Ext.util.Format.date(new Date(),"Y-m-d"))
                    		{
				if(cmbmachine.getRawValue()=="" || cmbmachine.getValue()==0)
				{
					alert("Select Machine..");
					
				}
				else if(cmbbatch.getRawValue()=="" || cmbbatch.getValue()==0)
				{
					alert("Select Batch..");
					
				}
				else if(cmbvariety.getRawValue()=="" || cmbvariety.getValue()==0)
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
							issremarks : txtremarks.getRawValue(),
							usrcode : '1',
							AEDFlag : AEDFlag,
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
                                                    msg: 'Issue No Is: ' + obj['IssNo'] + 'Saved',
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                  //  Ext.MessageBox.alert("Alert","Saved ");
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
			}
			else {
				alert('Issue Date Should be current date');
			}

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
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtissno]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbissno]
                            },optisstype,
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpissdate]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 250,
                                	x           : 180,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbmachine]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 250,
                                	x           : 420,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbbatch]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 230,
                                	x           : 420,
                                	y           : 40,
                                    	border      : false,
                                	items: [cmbvariety]
                            },
		{ xtype   : 'fieldset',
                title   : 'Grid Details',
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
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 230,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtnoofbags]
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

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 0,
                                	y           : 370,
                                    	border      : false,
                                	items: [txtremarks]
	                            },btnSubmit
                ]

            }
            
        ]
    });
    
   
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

		if (AEDFlag === "Add")
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
			
			Issnodatastore.load({
			url: 'ClsIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : AEDFlag
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
		}

	   	
	   	}

		}
    });
    TrnIssueWindow.show();  
});
