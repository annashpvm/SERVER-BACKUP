Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');


   var loadfinentrynodatastore = new Ext.data.Store({
      id: 'loadfinentrynodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesFinishedGoods.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFinishedGoodsEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'advno'
      ]),
    });

var txtDANo = new Ext.form.NumberField({
     fieldLabel  : 'Desp.Adv.No.',
     id          : 'txtDANo',
     name        : 'txtDANo',
     width       :  100,
     readOnly : true,
     tabindex : 2
});
var dptDA= new Ext.form.DateField({
     fieldLabel: 'Date',
     id: 'dptDA',
     name: 'Date',
     format: 'd-m-Y',
     value: new Date()
    });


var cmbInvType = new Ext.form.ComboBox({
     fieldLabel      : ' ',
     width           : 250,
     displayField    : 'ref_name', 
     valueField      : 'rer_code',
     hiddenName      : '',
     id              : 'cmbInvType',
     typeAhead       : true,
     mode            : 'local',
     store           : ['1.NORMAL SALES','2.DEPOT TRANSFER','3.UDP SALES'],
     forceSelection  : true,
     triggerAction   : 'all',
     selectOnFocus   : false,
     editable        : true,
     tabIndex	     : 0,
     allowblank      : true
});

var lblCustomer = new Ext.form.Label({
    fieldLabel  : 'Customer',
    id          : 'lblCustomer',
    width       : 60
});

var lblSOC = new Ext.form.Label({
    fieldLabel  : 'SOC',
    id          : 'lblSOC',
    width       : 60
});

var lblSize = new Ext.form.Label({
    fieldLabel  : 'Size',
    id          : 'lblSize',
    width       : 60
});



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });


var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'remote',
        store           : 'loadAllCustomerStore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true

});

var cmbSOC = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 110,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbSOC',
        typeAhead       : true,
        mode            : 'local',
        store           : ['424','425'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadSalesVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
   });

var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });


var txtOrdQty = new Ext.form.NumberField({
     fieldLabel  : 'Ord. Qty.',
     id          : 'txtOrdQty',
     name        : 'txtOrdQty',
     width       :  80,
     readOnly : true,
     tabindex : 2
});
var txtPendingQty = new Ext.form.NumberField({
     fieldLabel  : 'Pend. Qty.',
     id          : 'txtPendingQty',
     name        : 'txtPendingQty',
     width       :  80,
     readOnly : true,
     tabindex : 2
});

var txtStock = new Ext.form.NumberField({
     fieldLabel  : 'Stock.',
     id          : 'txtStock',
     name        : 'txtStock',
     width       :  80,
     readOnly : true,
     tabindex : 2
});

var txtRate = new Ext.form.NumberField({
     fieldLabel  : 'Rate.',
     id          : 'txtRate',
     name        : 'txtRate',
     width       :  80,
     readOnly : true,
     tabindex : 2
 });

var txtAdvQty = new Ext.form.NumberField({
     fieldLabel  : 'Adv.Qty',
     id          : 'txtAdvQty',
     name        : 'txtAdvQty',
     width       :  80,
     readOnly : false,
     tabindex : 2
});
 
var dptDesp= new Ext.form.DateField({
     fieldLabel: 'Desp.Date',
     id: 'dptDesp',
     name: 'Date',
     format: 'd-m-Y',
     value: new Date()
});


var txtRemarks = new Ext.form.TextField({
     fieldLabel  : 'Remarks.',
     id          : 'txtRemarks',
     name        : 'txtRemarks',
     width       :  400,
     tabindex : 2
});

  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });
	
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:0,
    height: 330,
    hidden:false,
    width: 410,
//    font-size:18px,
    columns:
    [
        {header: "Item Name", dataIndex: 'itemname',sortable:true,width:200,align:'left'},
        {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:30,align:'left'},
        {header: "Number" , dataIndex: 'number',sortable:true,width:150,align:'left'},
        {header: "Weight", dataIndex:'weight',sortable:true,width:100,align:'left'},
        {header: "Des Tag", dataIndex:'destag',sortable:true,width:100,align:'left'} ,        
        {header: "HSN Code", dataIndex:'hsncode',sortable:true,width:100,align:'left'}
    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         
    }

   }
});

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 850,
    y       : 165,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
                var RowCnt = flxDetail.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetail.getSelectionModel().getCount();
                   var sel = flxDetail.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
            Ext.MessageBox.alert("Grid","Number " + sel[j].data.number + " Already Entered.");
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
	            if (cnt === 0)
	            {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),
                      new dgrecord({
                            itemname: cmbSize.getRawValue(),
                            itemcode: cmbSize.getValue(),
                            number:i,
                            weight:txtWt.getRawValue(),
                            destag:'',
                            hsncode:''
                           })
                      );
                    }
                }
          }
  }
}
});

var TrnSalesDespatchAdvicePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES ORDER ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesDespatchAdvicePanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
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
                    gstFlag = "Add";
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
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                    gstFlag = "Edit";
                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                    var gstSave;
                    gstSave="true";
                    if (txtorderterms.getRawValue()==0 || txtorderterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Order Terms.....');
                        gstSave="false";
                    }
                    else if (txtpaymentterms.getRawValue()==0 || txtpaymentterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Payment Terms..');
                        gstSave="false";
                    }
                    else if (txtcreditdays.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Credit Days..');
                        gstSave="false";
                    }
                    else if (txtservicechrg.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Service Chrage/MT..');
                        gstSave="false";
                    }
                    else if (txtRemarks.getRawValue()==0 || txtRemarks.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Remarks..');
                        gstSave="false";
                    }
                    else if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbcarriage.getValue()==0 || cmbcarriage.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Carriage..');
                        gstSave="false";
                    }
		   else if (cmbfreight.getValue()==0 || cmbfreight.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Type..');
                        gstSave="false";
                    } 
                    else if (cmbfrparty.getValue()==0 || cmbfrparty.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Party..');
                        gstSave="false";
                    }                    
		    else if (flxdeldetail.rows==0)
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Delivery Detail..');
                        gstSave="false";
                    } 
                    else{
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{
                            if (btn === 'yes')
				{
                            if (gstSave === "true")
	                        {  

                           
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });

						/*var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});*/

                            
                            var deliData = flxdeldetail.getStore().getRange();                                        
                            var deliupdData = new Array();
                            Ext.each(deliData, function (record) {
                                deliupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnPOPreparationSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),                                      
				deligriddet : Ext.util.JSON.encode(deliupdData),                                                
                                po_company_code:Gincompcode,
                                po_finid:GinFinid,
                                po_date :Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                                po_duedate:Ext.util.Format.date(dtpDuedate.getValue(),"Y-m-d"),
                                po_vendor_code :cmbPartyname.getValue(),
				remarks:txtRemarks.getRawValue(),
				cnt: poData.length,
				delicnt : deliData.length,
				ordtype : ordtype,
				orderterms : txtorderterms.getRawValue(),
				po_transport_mode : cmbcarriage.getValue(),
				po_paymode : cmbpaymode.getValue(),
				creditdays : txtcreditdays.getRawValue(),
				po_payterm : txtpaymentterms.getRawValue(),
				po_frighttype : cmbfreight.getValue(),
				po_frparty : cmbfrparty.getValue(),
				tcsper : txttcs.getValue(),
				cgstper :txtCGST.getValue(),
				sgstper :txtSGST.getValue(),
				igstper : txtIGST.getValue(),
				servchrg : txtservicechrg.getRawValue(),
				itemval : 0,
				roundoff : 0,
				totval : 0,
				wefdate : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d")
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				alert(obj['pono']);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono']);
                                    TrnPoFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Purchase Order Not Completed! Pls Check!- " + obj['pono']);                                                  
                                    }
                                }
                           });         
   
                          	}
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
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnSalesDespatchAdvicePanel.hide();
                }
            }
        }]
    },

    items: [
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
                       items: [txtDANo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptDA]
   		  },
                 ]   
           },
          
           {   
           xtype       : 'fieldset',
           title       : 'INVOICE TYPE',
           width       : 450,
           height      : 60,
           x           : 500,
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
                       y           : -10,
                       border      : false,
                       items: [cmbInvType]
                   },
                 ]   
          },

         {   
            xtype       : 'fieldset',
           title       : '',
           width       : 1000,
           height      : 230,
           x           : 10,
           y           : 80,
           border      : true,
           layout      : 'absolute',
           items:[
                    {
                       xtype       : 'fieldset',
                       title       : '',
                       width       : 120,
                       x           : 0,
                       y           : 0,
                       defaultType : 'Label',
                       border      : false,
                       items: [lblCustomer]
                    },
                                        
                    {
                       xtype       : 'fieldset',
                       title       : '',
                       width       : 120,
                       x           : 450,
                       y           : 0,
                       defaultType : 'Label',
                       border      : false,
                       items: [lblSOC]
                    } ,
                    {
                       xtype       : 'fieldset',
                       title       : '',
                       width       : 200,
                       x           : 650,
                       y           : 0,
                       defaultType : 'Label',
                       border      : false,
                       items: [lblSize]
                    },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 0,
                       width       : 700,
                       x           : -100,
                       y           : 20,
                       border      : false,
                       items: [cmbCustomer]
                   },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 0,
                       width       : 400,
                       x           : 300,
                       y           : 20,
                       border      : false,
                       items: [cmbSOC]
                   },
      
                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 0,
                       width       : 400,
                       x           : 450,
                       y           : 20,
                       border      : false,
                       items: [cmbSize]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 0,
                       border      : false,
                       items: [txtOrdQty]
                   },

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 30,
                       border      : false,
                       items: [txtPendingQty]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 60,
                       border      : false,
                       items: [txtStock]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 90,
                       border      : false,
                       items: [txtRate]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 250,
                       x           : 800,
                       y           : 120,
                       border      : false,
                       items: [txtAdvQty]
                   },
   
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 70,
                       width       : 400,
                       x           : 0,
       		       y           : 120,
	               border      : false,
                       items: [dptDesp]
   		  },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 600,
                       x           : 200,
       		       y           : 120,
	               border      : false,
                       items: [txtRemarks]
   		  }, btnSubmit,

            ]   
          },


      ],

});

 function RefreshData(){

};
   
var TrnSalesDespatchAdviceWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - DEPATCH ADVICE ENTRY',
        items       : TrnSalesOrderPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			loadfinentrynodatastore.removeAll();
			loadfinentrynodatastore.load({
                        url:'ClsTrnSalesFinishedGoods.php',
 			params:
                            {
                                task: "loadFinishedGoodsEntryNo"
                               
                            },
				callback:function()
	               		{
				txtDANo.seRawtValue(loadfinentrynodatastore.getAt(0).get('advno'));
				}
			  });


 	
       TrnSalesDespatchAdviceWindow.show();  
});
