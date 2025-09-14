Ext.onReady(function(){
   Ext.QuickTips.init();
   	var Gincompcode = localStorage.getItem('gincompcode');
   	var GinFinid = localStorage.getItem('ginfinid');
   	var GinYear = localStorage.getItem('gstyear');
   	var userid = localStorage.getItem('ginuser');
	var finstdate = localStorage.getItem('gfinstdate');
	var fineddate = localStorage.getItem('gfineddate');
    	var gstStatus = "N";


 var loadretnodatastore = new Ext.data.Store({
      id: 'loadretnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRecptRet.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadretno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'retno', type: 'int',mapping:'retno'}
      ]),
    });
	
	var loadsupplierDataStore = new Ext.data.Store({
      id: 'loadsupplierDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRecptRet.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'},
      ]),
    });

	var loadgrnnoDataStore = new Ext.data.Store({
      id: 'loadgrnnoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRecptRet.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'rech_seqno', type: 'int',mapping:'rech_seqno'},
	{name:'rech_no', type: 'int',mapping:'rech_no'},
      ]),
    });


      var Loadgriddetails = new Ext.data.Store({
      id: 'Loadgriddetails',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRecptRet.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrndet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_name','rect_lotno','stkqty','rect_grnbags','rect_itemvalue',
'rech_freight','rect_costvalue','trseqno','itmh_code','rech_sup_code','lotcode','grnrate','grnfreight','actgrn','billqty','retbags',
'rech_cgst_per','rech_sgst_per','rech_igst_per','rech_freight'
      ]),
    });
	

var retqty ,retvalue;
function grid_tot(){
			retqty=0;
			retvalue=0;
			
        		var Row= flxdetail.getStore().getCount();
        		flxdetail.getSelectionModel().selectAll();
        			var sel=flxdetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    retqty=Number(retqty)+Number(sel[i].data.billqty);
				    retvalue=Number(retvalue)+Number(sel[i].data.rect_itemvalue);
        			}
				    
       				    txtretqty.setValue(Math.round(retqty));
				    txtretitmval.setValue(Math.round(retvalue));
				    txtcgstval.setRawValue(Number(txtretitmval.getRawValue())*Number(txtcgst.getRawValue())/100);
				    txtsgstval.setRawValue(Number(txtretitmval.getRawValue())*Number(txtsgst.getRawValue())/100);
				    txtigstval.setRawValue(Number(txtretitmval.getRawValue())*Number(txtigstval.getRawValue())/100);
				   
				    txtretvalue.setRawValue(Number(txtretitmval.getRawValue())+Number(txtcgstval.getRawValue())+Number(txtsgstval.getRawValue())+Number(txtigstval.getRawValue())+Number(txtfreight.getRawValue()));
         		 	    
		 }
	
	var txtretno = new Ext.form.NumberField({
        fieldLabel  : 'Ret No',
        id          : 'txtretno',
        name        : 'txtretno',
        width       :  100,
        style       :  {textTransform: "uppercase"},
	readOnly    : true,
	tabindex    : 2,

    });

var dtprcretdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtprcretdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
    readonly: true
});

var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Supplier',
        width           : 300,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbsupplier',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsupplierDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
               select:function(){
				loadgrnnoDataStore.load({
                    		url: 'ClsRecptRet.php',
                    		params:
                    			{
                        		task:"loadgrnno",
					supcode:this.getValue(),
					finid:'27',
					compcode:'1'
					
                     			}
				});
			      }
		  }
   });

var cmbgrnno = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        width           : 120,
        displayField    : 'rech_no', 
        valueField      : 'rech_seqno',
        hiddenName      : '',
        id              : 'cmbgrnno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadgrnnoDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
               select:function(){
				Loadgriddetails.load({
                    		url: 'ClsRecptRet.php',
                    		params:
                    			{
                        		task:"loadgrndet",
					grnseq:this.getValue()
                     			},
				callback:function()
					{
					txtcgst.setRawValue(Loadgriddetails.getAt(0).get('rech_cgst_per'));
					txtsgst.setRawValue(Loadgriddetails.getAt(0).get('rech_sgst_per'));
					txtigst.setRawValue(Loadgriddetails.getAt(0).get('rech_igst_per'));
					txtfreight.setRawValue(Loadgriddetails.getAt(0).get('rech_freight'));
					}
				});
				grid_tot();
				},
 		blur:function(){
				Loadgriddetails.load({
                    		url: 'ClsRecptRet.php',
                    		params:
                    			{
                        		task:"loadgrndet",
					grnseq:this.getValue()
                     			},
				callback:function()
					{
					txtcgst.setRawValue(Loadgriddetails.getAt(0).get('rech_cgst_per'));
					txtsgst.setRawValue(Loadgriddetails.getAt(0).get('rech_sgst_per'));
					txtigst.setRawValue(Loadgriddetails.getAt(0).get('rech_igst_per'));
					txtfreight.setRawValue(Loadgriddetails.getAt(0).get('rech_freight'));
					}
				});
				grid_tot();
				},
		change:function(){
				Loadgriddetails.load({
                    		url: 'ClsRecptRet.php',
                    		params:
                    			{
                        		task:"loadgrndet",
					grnseq:this.getValue()
                     			},
				callback:function()
					{
					txtcgst.setRawValue(Loadgriddetails.getAt(0).get('rech_cgst_per'));
					txtsgst.setRawValue(Loadgriddetails.getAt(0).get('rech_sgst_per'));
					txtigst.setRawValue(Loadgriddetails.getAt(0).get('rech_igst_per'));
					txtfreight.setRawValue(Loadgriddetails.getAt(0).get('rech_freight'));
					}
				});
				grid_tot();
				},




		  }
   });

 var txtcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST%',
        id          : 'txtcgst',
        name        : 'txtcgst',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST%',
        id          : 'txtsgst',
        name        : 'txtsgst',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST%',
        id          : 'txtigst',
        name        : 'txtigst',
        width       :  50,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

 var txtremarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

 var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });

var txtigstval = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txtigstval',
        name        : 'txtigstval',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });
 
var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txtcgstval',
        name        : 'txtcgstval',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txtsgstval',
        name        : 'txtsgstval',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtretitmval = new Ext.form.NumberField({
        fieldLabel  : 'RetItem Val',
        id          : 'txtretitmval',
        name        : 'txtretitmval',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        name        : 'txtfreight',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
               keyup:function(){
				txtretvalue.setRawValue(Number(txtretitmval.getRawValue())+Number(txtigstval.getRawValue())+Number(txtcgstval.getRawValue())+Number(txtsgstval.getRawValue())+Number(txtfreight.getRawValue()))
				},
     	       change:function(){
				txtretvalue.setRawValue(Number(txtretitmval.getRawValue())+Number(txtigstval.getRawValue())+Number(txtcgstval.getRawValue())+Number(txtsgstval.getRawValue())+Number(txtfreight.getRawValue()))
				}

		  }

    });

var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Round Off',
        id          : 'txtroundoff',
        name        : 'txtroundoff',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1
    });

var txtretqty = new Ext.form.NumberField({
        fieldLabel  : 'Ret Qty',
        id          : 'txtretqty',
        name        : 'txtretqty',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txtretvalue = new Ext.form.NumberField({
        fieldLabel  : 'Ret Value',
        id          : 'txtretvalue',
        name        : 'txtretvalue',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1
    });




var dgrecord = Ext.data.Record.create([]);
var flxdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    store:Loadgriddetails,
    x:0,
    y:90,
    height: 130,
    hidden:false,
    width: 810,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Name", dataIndex: 'itmh_name',sortable:true,width:250,align:'left'},
        {header: "Lot No", dataIndex: 'rect_lotno',sortable:true,width:100,align:'left'},
        {header: "PenGRN/Stk Qty", dataIndex: 'stkqty',sortable:true,width:100,align:'left'},
        {header: "GRN Bags", dataIndex: 'rect_grnbags',sortable:true,width:100,align:'left'},
        {header: "Return Qty", dataIndex: 'billqty',sortable:true,width:100,align:'left',
	editor:{
		    xtype:'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
	     	    listeners:{
                    keyup: function () {
				
				
	                    var sm = flxdetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            var selected_rows = flxdetail.getSelectionModel().getSelections();
			    var actqty = Number(selrow.get('billqty'));
			    var actval = Number(selrow.get('rect_itemvalue'));
                            var rate = Number(selrow.get('grnrate'));
			    var totval = Ext.util.Format.number(Number(this.getValue()) * Number(rate), '0.00');

                            for (var a = 0; a < selected_rows.length; a++)
                            {
				if(Number(this.getValue()) > actqty)
			    	{
 				Ext.MessageBox.alert("Alert","Return Qty Exceeds Receipt Qty.. ");
				this.setValue(actqty);
				//selected_rows[a].set('billqty', 0);
				//selected_rows[a].set('rect_itemvalue', actval);
			    	}
				else
				{
                                selected_rows[a].set('rect_itemvalue', totval);
				}
                            }
			},
           change: function () {
			grid_tot();
				}
			}
		}},
        {header: "Return Bags", dataIndex: 'retbags',sortable:true,width:100,align:'left'},
        {header: "Item Value", dataIndex: 'rect_itemvalue',sortable:true,width:100,align:'left'},
        {header: "Freight Value", dataIndex: 'rech_freight',sortable:true,width:100,align:'left'},
        {header: "Cost Value", dataIndex: 'rect_costvalue',sortable:true,width:100,align:'left'},
        {header: "Tr.Seqno", dataIndex: 'trseqno',sortable:true,width:100,align:'txtretitmvalleft'},
        {header: "Item Seqno", dataIndex: 'itmh_code',sortable:true,width:50,align:'left'},
        {header: "Sup Code", dataIndex: 'rech_sup_code',sortable:true,width:50,align:'left'},
        {header: "Lot Code", dataIndex: 'lotcode',sortable:true,width:50,align:'left'},
        {header: "GRN Rate", dataIndex: 'grnrate',sortable:true,width:50,align:'left'},
        {header: "GRN Frt Val", dataIndex: 'grnfreight',sortable:true,width:50,align:'left'},
        {header: "Act GRN Qty", dataIndex: 'actgrn',sortable:true,width:50,align:'left'}
    ],
	//store : []
});

   function RefreshData(){
        TrnReceiptReturnFrompanel.reset();
};

   var TrnReceiptReturnFrompanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'RECEIPT RETURN',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnReceiptReturnFrompanel',
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
	
				if(txtretno.getRawValue()=="" || txtretno.getRawValue()==0)
				{
					alert("Ret No Should not be Empty");
					//txtretno.setFocus();
				}
				else if(cmbgrnno.getValue()=="" || cmbgrnno.getValue()==0)
				{
					alert("Enter GRN No");
					//cmbgrnno.setFocus();
				}
				else if(txtretitmval.getRawValue()=="" || txtretitmval.getRawValue()==0)
				{
					alert("Item Value Should not be Empty");
					//txtretitmval.setFocus();
				}
				else if(txtretvalue.getRawValue()=="" || txtretvalue.getRawValue()==0)
				{
					alert("Total Value Should not be Empty");
					//txtretvalue.setFocus();
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
		                            	url: 'TrnReceiptReturnSave.php',
                		       	        params:
						{
					                fabricgriddet:Ext.util.JSON.encode(fabricupdetails),	
							cnt:fabricretdetails.length,					
  							rerh_compcode :'1',
							rerh_fincode :'27',
							rerh_no : txtretno.getValue(),
  							rerh_grnseqno :cmbgrnno.getValue(),
  							rerh_date : Ext.util.Format.date(dtprcretdate.getValue(),"Y-m-d"),
  							rerh_itemvalue : txtretitmval.getValue(),
  							rerh_scper : 0,
  							rerh_stper : 0,
  							rerh_scamount : 0,
  							rerh_stamount  : 0,
  							rerh_servicecharge : '0', 
  							rerh_edamount : 0,
  							rerh_roundingoff : txtroundoff.getValue(),
  							rerh_totalvalue : txtretvalue.getValue(),
  							rerh_lorryno :txtvehicle.getRawValue(),
  							rerh_remarks :txtremarks.getRawValue(),
  							rerh_vouno :'0',
  							rerh_usr_code :'0', 
  							rerh_cgst_per : txtcgst.getValue(),
  							rerh_sgst_per : txtsgst.getValue(),
  							rerh_igst_per : txtigst.getValue(),
  							rerh_cgst_amt  :txtcgstval.getValue(),
  							rerh_sgst_amt :txtsgstval.getValue(),
  							rerh_igst_amt :txtigstval.getValue(),
 	 						rerh_entry_date :Ext.util.Format.date(dtprcretdate.getValue(),"Y-m-d"),
  							rerh_educessamount :'0'
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
                                                    msg: 'Ret No Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    TrnReceiptReturnFrompanel.getForm().reset();
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
                title   : 'RECEIPT RETURN',
                layout  : 'hbox',
                border  : true,
                height  : 430,
                width   : 830,
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
                                	items: [txtretno]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtprcretdate]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 600,
                                	x           : 180,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbsupplier]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 230,
                                	x           : 180,
                                	y           : 30,
                                    	border      : false,
                                	items: [cmbgrnno]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 395,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtcgst]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 220,
                                	x           : 510,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtsgst]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 630,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtigst]
                            },flxdetail,
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 170,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtcgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 320,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtsgstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 470,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtigstval]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 0,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtretqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 0,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtroundoff]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 170,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtfreight]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 320,
                                	x           : 320,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtretvalue]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 320,
                                	x           : 0,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtvehicle]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 520,
                                	x           : 200,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtremarks]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 620,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtretitmval]
                            }
                ]

            }
            
        ]
    });
    
   
    var TrnReceiptReturnWindow = new Ext.Window({
	height      : 530,
        width       : 860,
        y           : 35,
        title       : 'RECEIPT RETURN',
        items       : TrnReceiptReturnFrompanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			//txtretno.focus();
		 loadretnodatastore.load
                (
                  {
                    url: 'ClsRecptRet.php',
                    params:
                    {
                        task:"loadretno",
                        finid : 27
                     },
		callback:function()
		 {
						//alert(GroupcodeDataStore.getAt(0).get('grpcode'));
		 txtretno.setValue(loadretnodatastore.getAt(0).get('retno'));
		 }
		}
		);

		loadsupplierDataStore.load({
                    url: 'ClsRecptRet.php',
                    params:
                    {
                        task:"loadsupplier"
                     }
			});
	   			 }
			
		}
    });
    TrnReceiptReturnWindow.show();  
});
