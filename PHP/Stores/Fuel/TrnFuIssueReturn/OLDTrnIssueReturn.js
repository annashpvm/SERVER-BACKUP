Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
    var gstStatus = "N";
   	var GinYear = localStorage.getItem('gstyear');
   	var userid = localStorage.getItem('ginuser');
	var finstdate = localStorage.getItem('gfinstdate');
	var fineddate = localStorage.getItem('gfineddate');
var chkbags = 0;
	var gstflag = "Add";
	var edissno = 0;

	var gridedit = "false";

var Issretnodatastore = new Ext.data.Store({
  id: 'Issretnodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsIssueReturn.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissretno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issretno'
  ])
});

 var loadvarietydatastore = new Ext.data.Store({
      id: 'loadvarietydatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'vartyp_code','vartyp_name'
      ]),
    });
	
	var loadlotDataStore = new Ext.data.Store({
      id: 'loadlotDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlot"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_code','lot_refno'
      ]),
    });
	
var loaditemDataStore = new Ext.data.Store({
      id: 'loaditemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadItem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_code','itmh_name'
      ]),
    });

var loaditemdetDataStore = new Ext.data.Store({
      id: 'loaditemdetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssueReturn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_code','ItemName','Stock','itmt_avgrate','stock_bags','StockBillqty'

      ]),
    });


	var txtissretno = new Ext.form.TextField({
        fieldLabel  : 'Ret No',
        id          : 'txtissretno',
        name        : 'txtissretno',
        width       :  100,
        style       :  {textTransform: "uppercase"},
	readOnly : true,
		tabindex : 2
    });

var dtpissdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpissdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    readonly: true
});

var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  100,
        height       :  50,
        allowBlank  :  false,
	style:{'background':'#e8badf','height':'auto','font-size': '28px','font-weight':'bold','font-color':'red'},
	tabindex : 1,
	readOnly : true
    });

var cmbvariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety',
        width           : 150,
        displayField    : 'vartyp_name', 
        valueField      : 'vartyp_code',
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
        store           : loaditemDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
	select: function(){
	 cmbvariety.setRawValue('');
	 txtretqty.setValue('');
	 txtretval.setValue('');
	 txtstock.setValue('');
	 txtcostrate.setValue('');

		for(var i=0; i<loaditemdetDataStore.getCount();i++){
			if (loaditemdetDataStore.getAt(i).get('itmh_code') == cmbitem.getValue()) {

				txtcostrate.setValue(loaditemdetDataStore.getAt(i).get('itmt_avgrate'));
				txtstock.setValue(loaditemdetDataStore.getAt(i).get('Stock'));

				txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 

			}
		}
	}

	}
   });
/*
var cmblotno = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 120,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'cmblotno',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadlotDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
	select: function(){
 	    loaditemdetDataStore.removeAll();
	    loaditemdetDataStore.load({
		url: 'ClsIssueReturn.php',
		params:
		{
		    task:"loaditemdet",
		    compcode : Gincompcode,
		    finid : GinFinid					    
		},
		callback:function()
		{

		}
	    });		
	}
	}

   });
*/
 var txtretqty = new Ext.form.NumberField({
        fieldLabel  : 'Return Qty',
        id          : 'txtretqty',
        name        : 'txtretqty',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
    enableKeyEvents: true,
	listeners:{
	keyup: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }
	},
	keydown: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }
		},
        	blur: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }	  
				  },
		change: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 
	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtretqty.getValue());
	}
	else { actqty = 0; }	  
				  }


		}
   });

var txtretval = new Ext.form.NumberField({
        fieldLabel  : 'Return Value',
        id          : 'txtretval',
        name        : 'txtretval',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
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
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 	  
				  },
		keydown: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 	  
				  },
        	blur: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 	  
				  },
		change: function(){
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 	  
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




var txtvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtqty = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
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
				    txtqty.setValue(fdbl_totalqty);
				    txtvalue.setValue(fdbl_totalvalue);
				   
		 }

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 750,
    y       : 125,
	style:{'background':'#e8badf'},  
    listeners:{ 
    		click: function(){
			
			txtretval.setValue(Number(txtretqty.getValue())*Number(txtcostrate.getValue())); 

        if(cmbitem.getRawValue()=="" || cmbitem.getValue()==0)
	{
		alert("Select Item");
		cmbitem.focus();
	}
	else if(cmbvariety.getRawValue()=="" || cmbvariety.getValue()==0)
	{
		alert("Select Variety..");
		cmbvariety.focus();
	}
	else if(txtretqty.getValue()=="" || txtretqty.getValue()==0)
	{
		alert("Enter Return Qty..");
		txtretqty.focus();
	}
	else if(txtretval.getValue()=="" || txtretval.getValue()==0)
	{
		alert("Enter Return Value should not be empty..");
		txtretval.focus();
	}


	else
            {

                var ginitemseq = cmbitem.getValue();

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
                } //for loop
			if (gridedit === "true") {

			var idx = flxdetail.getStore().indexOf(editrow);


			sel[idx].set('item', cmbitem.getRawValue());
			sel[idx].set('variety', cmbvariety.getRawValue());
			sel[idx].set('retqty', txtretqty.getValue());
			sel[idx].set('retval', txtretval.getValue());

			sel[idx].set('itemseq', cmbitem.getValue());
			sel[idx].set('stock', txtstock.getValue());
			sel[idx].set('avgrate', txtcostrate.getValue());
	
			sel[idx].set('actstk', actstk);
			sel[idx].set('actqty', actqty);
			//sel[idx].set('avlbag', chkbags);

			//flxdetail.getSelectionModel().clearSelections();			

			}//if gridedit === "true"
			else {
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
	
							    item:cmbitem.getRawValue(),
							    variety:cmbvariety.getRawValue(),
							    retqty:txtretqty.getValue(),
	 						    retval:txtretval.getValue(),
							    stock:txtstock.getValue(),
							    avgrate:txtcostrate.getValue(),
			
							    itemseq:cmbitem.getValue(),

							    actstk : actstk,
							    actqty : actqty
	   				              })
	  					);
				           

				}
			}

				 grid_tot();

				 cmbitem.setRawValue('');
				 cmbvariety.setRawValue('');
				 txtretqty.setValue('');
				 txtretval.setValue('');
				 txtstock.setValue('');
				 txtcostrate.setValue('');
		
			}	 
				
			}
	      }



				
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
    width: 910,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Lot No", dataIndex: 'lotno',sortable:true,width:100,align:'left'},
        {header: "Item Description", dataIndex: 'item',sortable:true,width:250,align:'left'},
        {header: "Variety", dataIndex: 'variety',sortable:true,width:100,align:'left'},
        {header: "Return Qty", dataIndex: 'retqty',sortable:true,width:100,align:'left'},
        {header: "Return Value", dataIndex: 'retval',sortable:true,width:100,align:'left'},
        {header: "Stock", dataIndex: 'stock',sortable:true,width:100,align:'left'},
        {header: "Avg Rate", dataIndex: 'avgrate',sortable:true,width:100,align:'left'},
        {header: "Return Bags", dataIndex: 'retbags',sortable:true,width:100,align:'left'},
        {header: "Item Seqno", dataIndex: 'itemseq',sortable:true,width:50,align:'left'},
        {header: "Lot Seqno", dataIndex: 'lotseq',sortable:true,width:50,align:'left'},
        {header: "Actual Stock", dataIndex: 'actstk',sortable:true,width:50,align:'left'},
        {header: "Actual Return Qty", dataIndex: 'actqty',sortable:true,width:50,align:'left'}
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
			var chkitem = (selrow.get('itemseq'));

			if ((selrow != null)){
				//Ext.getCmp('cmbitem').setDisabled(true);

				gridedit = "true";
				editrow = selrow;



				cmbitem.setValue(selrow.get('itemseq'));

				cmbitem.setRawValue(selrow.get('item'));
				txtretqty.setValue(selrow.get('retqty'));
				txtretval.setValue(selrow.get('retval'));

				cmbvariety.setRawValue(selrow.get('variety'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
		
				actstk = selrow.get('actstk');

				
				flxdetail.getSelectionModel().clearSelections();
grid_tot();
			}//selrow != null
		}//btn === 'yes'
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('itemseq'));
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();

grid_tot();
		}//btn === 'no'
		}//fn: function(btn)


     });   //Ext.Msg.show
     
    } // 'cellclick'


   } //Listeners
});



   function RefreshData(){
        TrnIssueReturnFormpanel.reset();
};

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
			gstflag = "Edit";
			flxdetail.getStore().removeAll();
			Ext.getCmp('txtissretno').hide();
			Ext.getCmp('txtissretno').setDisabled(false);
			Ext.getCmp('txtissretno').show();
			Issnodatastore.load({
			url: 'ClsIssueReturn.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				gstflag : gstflag
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
                    listeners:{
                        click: function () {
if (Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") === Ext.util.Format.date(new Date(),"Y-m-d"))
                    		{
				if(flxdetail.getSelectionModel().getCount()==0)
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

						var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});
						
						Ext.Ajax.request({
		                            	url: 'TrnIssueReturnSave.php',
                		       	        params:
						{
					                griddet:Ext.util.JSON.encode(fabricupdetails),	
							cnt:fabricretdetails.length,					
  							compcode : Gincompcode,
							fincode:GinFinid,
							retdate : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
							retval : txtvalue.getRawValue(),
							retremarks : txtremarks.getRawValue(),
							retunit : '0',
							usrcode : '0'
							
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
                                                    msg: 'Ret NO is: ' + obj['IssRetNo'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    TrnIssueReturnFormpanel.getForm().reset();
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
                            window.location.href=('http://192.168.44.10/HometexStores/index.php');
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ISSUE RETURN',
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
                                	items: [txtissretno]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 180,
                                	y           : 0,
                                    	border      : false,
                                	items: [dtpissdate]
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
                y       : 50,
                items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 430,
                                	x           : 230,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbitem]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 230,
                                	x           : 620,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbvariety]
                            },
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
                                	labelWidth  : 90,
                                	width       : 220,
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
                                	y           : 40,
                                    	border      : false,
                                	items: [txtstock]
                            },flxdetail]},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 550,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 320,
                                	x           : 610,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtvalue]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 0,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtremarks]
	                            },btnSubmit
                ]

            }
            
        ]
    });
    
   
    var TrnIssueReturnWindow = new Ext.Window({
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
			txtissretno.focus();
			loadlotDataStore.load({
               		 	url: 'ClsIssueReturn.php',
                		params: {
                    		task: 'loadlot'
                		}
            		});

			loadvarietydatastore.load({
               		 	url: 'ClsIssueReturn.php',
                		params: {
                    		task: 'loadvariety'
                		}
            		});
			
			loaditemDataStore.load({
               		 	url: 'ClsIssueReturn.php',
                		params: {
                    		task: 'LoadItem',
				compcode : Gincompcode,
				finid : GinFinid
                		}
            		});

			Issretnodatastore.load({
                		url: 'ClsIssueReturn.php',
                		params: {
                    		task: 'loadissretno',
				compcode:Gincompcode,
				fincode:GinFinid
                	},
			callback:function()
			{
			if ((Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") < finstdate) || 
(Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") > fineddate)){
				alert('Check Issue Date');
			}
			else {
				txtissretno.setValue(Issretnodatastore.getAt(0).get('issretno'));
			}
			}
            });

	   			 }
			
		}
    });
    TrnIssueReturnWindow.show();  
});
