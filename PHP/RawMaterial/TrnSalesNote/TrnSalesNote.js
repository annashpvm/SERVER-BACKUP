Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
  // var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
//var gstGroup;
var GinFinid = 27;
var GinCompcode = 1;

var Salenotenodatastore = new Ext.data.Store({
  id: 'Salenotenodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesnote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsalenoteno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'salenote_no'
  ])
});

var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesnote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'sup_code', type: 'int', mapping: 'sup_code'},
    {name: 'sup_refname', type: 'string', mapping: 'sup_refname'}
  ])
});

var ItemLoadDataStore = new Ext.data.Store({
  id: 'ItemLoadDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesnote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "LoadItem"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'itmh_code','itmh_name'
  ])
});

var LotLoadDataStore = new Ext.data.Store({
  id: 'LotLoadDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesnote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadlot"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'lot_code','lot_refno'
  ])
});

var LotDetailLoadDataStore = new Ext.data.Store({
  id: 'LotDetailLoadDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsSalesnote.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadlotdet"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
     'itmh_code','itemname','stock','itemrate','stock_bags'
  ])
});


var fdbl_totalqty,fdbl_totalvalue,fdbl_totalcgst,fdbl_totalsgst,fdbl_totaligst;
function grid_tot(){
			fdbl_totalqty=0;
			fdbl_totalvalue=0;
			fdbl_totalcgst=0;
			fdbl_totalsgst=0;
			fdbl_totaligst=0;

        		var Row= flxdetail.getStore().getCount();
        		flxdetail.getSelectionModel().selectAll();
        			var sel=flxdetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.qty);
				    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.itemvalue);
 				    fdbl_totalcgst=Number(fdbl_totalcgst)+Number(sel[i].data.cgstamt);
 				    fdbl_totalsgst=Number(fdbl_totalsgst)+Number(sel[i].data.sgstamt);
 			   	    fdbl_totaligst=Number(fdbl_totaligst)+Number(sel[i].data.igstamt);
        			}
				    txttotqty.setValue(fdbl_totalqty);
				    txttotvalue.setValue(fdbl_totalvalue);
       				    txtcgstamt.setValue(fdbl_totalcgst);
				    txtsgstamt.setValue(fdbl_totalsgst);
				    txtigstamt.setValue(fdbl_totaligst);
				   
		 }



	
	var txtsalenoteno = new Ext.form.NumberField({
        fieldLabel  : 'SalesNote No',
        id          : 'txtsalenoteno',
        name        : 'txtsalenoteno',
        width       :  100,
	readOnly : true,
		tabindex : 2
    });

var dtpsndate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpsndate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    readonly: true
});

var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name',
        width           : 250,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : 'sup_refname',
        id              : 'cmbsupplier',
        typeAhead       : true,
        mode            : 'remote',
        store           : VendorDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbitem = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name',
        width           : 250,
        displayField    : 'itemname', 
        valueField      : 'itmh_code',
        hiddenName      : 'itmh_code',
        id              : 'cmbitem',
        typeAhead       : true,
        mode            : 'remote',
        store           : LotDetailLoadDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmblotno = new Ext.form.ComboBox({
        fieldLabel      : 'Lot No',
        width           : 120,
        displayField    : 'lot_refno', 
        valueField      : 'lot_code',
        hiddenName      : '',
        id              : 'remote',
        typeAhead       : true,
        mode            : 'local',
        store           : LotLoadDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        	select: function(){
			 	    LotDetailLoadDataStore.removeAll();
				    LotDetailLoadDataStore.load({
					url: 'ClsSalesnote.php',
					params:
					{
					    task:"loadlotdet",
					    fincode:GinFinid,
					    compcode:GinCompcode,
					    lotno:cmblotno.getValue()
					    
					},
					callback:function()
					{
					txtitemrate.setRawValue(LotDetailLoadDataStore.getAt(0).get('itemrate'));
					txtstkqtymt.setRawValue(LotDetailLoadDataStore.getAt(0).get('stock'));
					txtstkbag.setRawValue(LotDetailLoadDataStore.getAt(0).get('stock_bags'));
					}
				    });
				  }

		}
   });

 var txtitemrate = new Ext.form.NumberField({
        fieldLabel  : 'Item Rate',
        id          : 'txtitemrate',
        name        : 'txtitemrate',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:
		{
		change:function()
			{
			txtitemval.setValue(Number(txtsaleqty.getValue())*Number(txtitemrate.getValue()));
			},
		keyup:function()
			{
			txtitemval.setValue(Number(txtsaleqty.getValue())*Number(txtitemrate.getValue()));
			}
		}
    });

var txtstkqtymt = new Ext.form.NumberField({
        fieldLabel  : 'Stk Qty/MT',
        id          : 'txtstkqtymt',
        name        : 'txtstkqtymt',
        width       :  100,
        allowBlank  :  false,
	readOnly    :true,
	tabindex : 1
    });

var txtstkbag = new Ext.form.NumberField({
        fieldLabel  : 'Stk Bag',
        id          : 'txtstkbag',
        name        : 'txtstkbag',
        width       :  100,
        allowBlank  :  false,
	readOnly    :true,
	tabindex : 1
    });

 var txtsaleqty = new Ext.form.NumberField({
        fieldLabel  : 'Sale Qty(MT)',
        id          : 'txtsaleqty',
        name        : 'txtsaleqty',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:
		{
		change:function()
			{
			if(Number(txtsaleqty.getValue()) > Number(txtstkqtymt.getValue()))
				{
				Ext.MessageBox.alert("Alert","Sale Qty Exceeds Stock Qty.. ");
				txtsaleqty.setValue('');
				txtsaleqty.focus(); 
				}

			},
		keyup:function()
			{
			if(Number(txtsaleqty.getValue()) > Number(txtstkqtymt.getValue()))
				{
				Ext.MessageBox.alert("Alert","Sale Qty Exceeds Stock Qty.. ");
				txtsaleqty.setValue('');
				txtsaleqty.focus(); 
				}
			txtitemval.setValue(Number(txtsaleqty.getValue())*Number(txtitemrate.getValue()));

			}
		
		}
    });


var txtsalebag = new Ext.form.NumberField({
        fieldLabel  : 'Sale Bag',
        id          : 'txtsalebag',
        name        : 'txtsalebag',
        width       :  100,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:
		{
		change:function()
			{
			if(Number(txtsalebag.getValue()) > Number(txtstkbag.getValue()))
				{
				Ext.MessageBox.alert("Alert","Sale Bag Exceeds Stock Bag.. ");
				txtsalebag.setValue('');
				txtsalebag.focus(); 
				}

			},
		keyup:function()
			{
			if(Number(txtsalebag.getValue()) > Number(txtstkbag.getValue()))
				{
				Ext.MessageBox.alert("Alert","Sale Bag Exceeds Stock Bag.. ");
				txtsalebag.setValue('');
				txtsalebag.focus(); 
				}

			}
		
		}
    });

var txtitemval = new Ext.form.NumberField({
        fieldLabel  : 'Item Value',
        id          : 'txtitemval',
        name        : 'txtitemval',
        width       :  100,
        allowBlank  :  true,
	readOnly:true,
	enableKeyEvents: true,
	//tabindex : 1
    });

var txtCGSTvalue = new Ext.form.NumberField({
    id          : 'txtCGSTvalue',
    name        : 'txtCGSTvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txtCGST = new Ext.form.NumberField({
    id          : 'txtCGST',
    name        : 'txtCGST',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,
    fieldLabel  : 'CGST%',
	listeners:
		{
		change:function()
			{
			 if(Number(txtCGST.getValue()) > 0)
			{
			txtIGST.setDisabled(true);
			}
			else
			{
			txtIGST.setDisabled(false);
			}
			txtCGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtCGST.getValue())/Number(100));
			},
		keyup:function()
			{
			 if(Number(txtCGST.getValue()) > 0)
			{
			txtIGST.setDisabled(true);
			}
			else
			{
			txtIGST.setDisabled(false);
			}
			txtCGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtCGST.getValue())/Number(100));
			}
		}
});

var txtSGST = new Ext.form.NumberField({
    id          : 'txtSGST',
    name        : 'txtSGST',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,
        fieldLabel  : 'SGST%',
	listeners:
		{
		change:function()
			{
			if(Number(txtSGST.getValue()) > 0)
			{
			txtIGST.setDisabled(true);
			}
			else
			{
			txtIGST.setDisabled(false);
			}
			txtSGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtSGST.getValue())/Number(100));
			},
		keyup:function()
			{
			if(Number(txtSGST.getValue()) > 0)
			{
			txtIGST.setDisabled(true);
			}
			else
			{
			txtIGST.setDisabled(false);
			}
			txtSGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtSGST.getValue())/Number(100));
			}
		}
});

var txtSGSTvalue = new Ext.form.NumberField({
    id          : 'txtSGSTvalue',
    name        : 'txtSGSTvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txtIGST = new Ext.form.NumberField({
    id          : 'txtIGST',
    name        : 'txtIGST',
    width       : 50,
    readOnly: false,
    enableKeyEvents: true,
    allowBlank: true,
        fieldLabel  : 'IGST%',
	listeners:
		{
		change:function()
			{
			if(Number(txtIGST.getValue()) > 0)
			{
			txtCGST.setDisabled(true);
			txtSGST.setDisabled(true);
			}
			else
			{
			txtCGST.setDisabled(false);
			txtSGST.setDisabled(false);
			}
			txtIGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtIGST.getValue())/Number(100));
			},
		keyup:function()
			{
			if(Number(txtIGST.getValue()) > 0)
			{
			txtCGST.setDisabled(true);
			txtSGST.setDisabled(true);
			}
			else
			{
			txtCGST.setDisabled(false);
			txtSGST.setDisabled(false);
			}
			txtIGSTvalue.setValue(Number(txtitemval.getValue())*Number(txtIGST.getValue())/Number(100));
			}
		}
});

var txtIGSTvalue = new Ext.form.NumberField({
    id          : 'txtIGSTvalue',
    name        : 'txtIGSTvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txttotqty = new Ext.form.NumberField({
    id          : 'txttotqty',
    name        : 'txttotqty',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txttotvalue = new Ext.form.NumberField({
    id          : 'txttotvalue',
    name        : 'txttotvalue',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txtcgstamt = new Ext.form.NumberField({
    id          : 'txtcgstamt',
    name        : 'txtcgstamt',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txtsgstamt = new Ext.form.NumberField({
    id          : 'txtsgstamt',
    name        : 'txtsgstamt',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

var txtigstamt = new Ext.form.NumberField({
    id          : 'txtigstamt',
    name        : 'txtigstamt',
    width       : 100,
    readOnly: true,
    enableKeyEvents: true,
    allowBlank: true
});

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
				if(cmblotno.getRawValue()=="" || cmblotno.getValue()==0)
				{
					alert("Select Lot No");
					//cmbgrnno.setFocus();
				}
				else if(cmbitem.getRawValue()=="" || cmbitem.getValue()==0)
				{
					alert("Select Item");
					//txtretitmval.setFocus();
				}
				else if(txtsaleqty.getValue()=="" || txtsaleqty.getValue()==0)
				{
					alert("Enter Sales Qty..");
					//txtretvalue.setFocus();
				}
				else if(txtsalebag.getValue()=="" || txtsalebag.getValue()==0)
				{
					alert("Enter Sales Bag..");
					//txtretvalue.setFocus();
				}
				else if(txtitemrate.getValue()=="" || txtitemrate.getValue()==0)
				{
					alert("Rate Should not be Empty");
					//txtretvalue.setFocus();
				}
				else if((txtCGST.getValue()=="" || txtCGST.getValue()==0) && (txtSGST.getValue()=="" || txtSGST.getValue()==0))
				{
					alert("Enter Tax Percentage..");
					//txtretvalue.setFocus();
				}
				else
				{
				var RowCnt = flxdetail.getStore().getCount() + 1;
  				flxdetail.getStore().insert(
   				flxdetail.getStore().getCount(),
				new dgrecord({
	                			  slno:RowCnt,
	              				  itmname:cmbitem.getRawValue(),
	            				  rate:txtitemrate.getRawValue(),
						  qty:txtsaleqty.getRawValue(),
						  bagqty:txtsalebag.getRawValue(),
						  itemvalue:txtitemval.getValue(),
						  cgstper:txtCGST.getValue(),
						  cgstamt:txtCGSTvalue.getValue(),
						  sgstper:txtSGST.getValue(),
						  sgstamt:txtSGSTvalue.getValue(),
						  igstper:txtIGST.getValue(),
						  igstamt:txtIGSTvalue.getValue(),
						  lotseq:cmblotno.getValue(),
						  itemseq:cmbitem.getValue()

   				              })
  					);
				 grid_tot();
				 txtitemrate.setValue('');
				 txtsaleqty.setValue('');
				 txtsalebag.setValue('');
				 txtitemval.setValue('');
				 txtCGST.setValue('');
				 txtCGSTvalue.setValue('');
				 txtSGSTvalue.setValue('');
				 txtSGST.setValue('');
			  	 txtIGST.setValue('');
				 txtIGSTvalue.setValue('');
				 }
				
			}
	      }



				
});

var Salenoteflxdatastore = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'Salenoteflxdatastore'
        },[
           'slno','itmname','rate','qty','bagqty','itemvalue','cgstper','cgstamt','sgstper','sgstamt','igstper','igstamt','lotseq','itemseq'
        ])
    });

var dgrecord = Ext.data.Record.create([]);
var flxdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    store:Salenoteflxdatastore,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:140,
    height: 130,
    hidden:false,
    width: 910,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Name", dataIndex: 'itmname',sortable:true,width:250,align:'left'},
        {header: "Item Rate", dataIndex: 'rate',sortable:true,width:100,align:'left'},
        {header: "Sale Qty", dataIndex: 'qty',sortable:true,width:100,align:'left'},
        {header: "Sale Bag", dataIndex: 'bagqty',sortable:true,width:100,align:'left'},
        {header: "Item Value", dataIndex: 'itemvalue',sortable:true,width:100,align:'left'},
        {header: "CGST%", dataIndex: 'cgstper',sortable:true,width:50,align:'left'},
        {header: "CGST Amt", dataIndex: 'cgstamt',sortable:true,width:100,align:'left'},
        {header: "SGST%", dataIndex: 'sgstper',sortable:true,width:50,align:'left'},
        {header: "SGST Amt", dataIndex: 'sgstamt',sortable:true,width:100,align:'left'},
        {header: "IGST%", dataIndex: 'igstper',sortable:true,width:50,align:'left'},
        {header: "IGST Amt", dataIndex: 'igstamt',sortable:true,width:100,align:'left'},
        {header: "Lot Seqno", dataIndex: 'lotseq',sortable:true,width:100,align:'left'},
        {header: "Item Seqno", dataIndex: 'itemseq',sortable:true,width:100,align:'left'}
    ],
	
});



   function RefreshData(){
        TrnSalesNoteFormpanel.reset();
};

   var TrnSalesNoteFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SALES NOTE',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesNoteFormpanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
				if(cmbsupplier.getRawValue()=="" || cmbsupplier.getValue()==0)
				{
					alert("Select Supplier..");
					
				}
				else if (Salenoteflxdatastore.getCount()==0)
                    		{
                        		Ext.Msg.alert('Sales Note','Grid Should not be empty..');
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
		                            	url: 'TrnSalesNoteSave.php',
                		       	        params:
						{
					                griddet:Ext.util.JSON.encode(fabricupdetails),	
							cnt:fabricretdetails.length,					
  							salh_compcode : GinCompcode,
							salh_fincode:GinFinid,
							salh_date : Ext.util.Format.date(dtpsndate.getValue(),"Y-m-d"),
							salh_party_code : cmbsupplier.getValue(),
							salh_itemvalue : txttotvalue.getValue(),
							salh_roundingoff : '0',
							salh_totalvalue : txttotvalue.getValue(),
							salh_remarks: 'tr',
							salh_vouno: '0',
							salh_usr_code: '0',
							salh_entry_date: Ext.util.Format.date(dtpsndate.getValue(),"Y-m-d"),
							salh_cgst_amount: txtcgstamt.getValue(),
							salh_sgst_amount: txtsgstamt.getValue()
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
                                                    msg: 'Sales Note No Is: ' + obj['saleno'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    TrnSalesNoteFormpanel.getForm().reset();
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
                title   : 'SALES NOTE',
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
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtsalenoteno]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 230,
                                	y           : 0,
                                    	border      : false,
                                	items: [dtpsndate]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 430,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbsupplier]
                            },
		{ xtype   : 'fieldset',
                title   : 'Grid Details',
                layout  : 'hbox',
                border  : true,
                height  : 350,
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
                                	labelWidth  : 90,
                                	width       : 240,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmblotno]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 230,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtitemrate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 230,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtstkbag]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 220,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtstkqtymt]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtsaleqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 230,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtsalebag]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 320,
                                	x           : 230,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtitemval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 400,
                                	x           : 470,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtCGST]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 400,
                                	x           : 490,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtCGSTvalue]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 400,
                                	x           : 470,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtSGST]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 400,
                                	x           : 490,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtSGSTvalue]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 400,
                                	x           : 470,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtIGST]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 400,
                                	x           : 490,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtIGSTvalue]
                            },
flxdetail]},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 270,
                                	y           : 340,
                                    	border      : false,
                                	items: [txttotqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 320,
                                	x           : 330,
                                	y           : 340,
                                    	border      : false,
                                	items: [txttotvalue]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 480,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtcgstamt]
	                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 590,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtsgstamt]
	                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 700,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtigstamt]
	                            },btnSubmit
                ]

            }
            
        ]
    });
    
   
    var TrnSalesNoteWindow = new Ext.Window({
	height      : 520,
        width       : 960,
        y           : 35,
        title       : 'SALES NOTE',
        items       : TrnSalesNoteFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtsalenoteno.focus();
VendorDataStore.load({
                url: 'ClsSalesnote.php',
                params: {
                    task: 'loadsupplier'
                }
            });
ItemLoadDataStore.load({
                url: 'ClsSalesnote.php',
                params: {
                    task: 'LoadItem'
                }
            });
LotLoadDataStore.load({
                url: 'ClsSalesnote.php',
                params: {
                    task: 'loadlot'
                }
            });
Salenotenodatastore.load({
                url: 'ClsSalesnote.php',
                params: {
                    task: 'loadsalenoteno',
			compcode:GinCompcode,
			fincode:GinFinid
                },
		callback:function()
		{
		txtsalenoteno.setValue(Salenotenodatastore.getAt(0).get('salenote_no'));
		}
            });
	   			 }
			
		}
    });
    TrnSalesNoteWindow.show();  
});
