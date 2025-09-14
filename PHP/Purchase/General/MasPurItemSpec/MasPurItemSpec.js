Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var AEDFlag = "Add";
   var item_code;


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItemSpec.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name','item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5', 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10'
 

      ]),
    });


 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItemSpec.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 'item_code', 'item_name', 'item_usage', 'item_uom','uom_name', 'subgrp_code', 'subgrp_name' ,'grp_code', 'grp_name','hsn_sno', 'hsn_code','item_loc_code','item_qcchk',	'item_group_code','item_hsncode','item_potype',  'item_comp_code', 'item_code', 'item_avg_rate', 'item_stock', 'item_min_stock', 'item_max_stock', 'item_grade',  'item_useage', 'item_yr_opqty', 'item_yr_opval', 'item_lpur_date', 'item_liss_date', 'item_mol_upd', 'item_ro_level', 'item_fin_code', 'item_temp',  'uom_code', 'uom_short_name',  'grp_short_name', 'grp_rep_code', 'grp_tngst_code', 'grp_cst_code', 'grp_imp_code', 'grp_cen_ledger_code', 'grp_freight_code', 'grp_educess_code', 'hsn_type', 'hsn_igst', 'hsn_cgst', 'hsn_sgst', 'loc_code', 'loc_name','item_hsncode'
 

      ]),
    });



function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsPurItemSpec.php',
		params:
		{
			task :"loadSearchitemlist",
			item : txtItemName.getRawValue(),
		},
        });
}



var txtItemName = new Ext.form.TextField({
	fieldLabel  : 'Item Name',
	id          : 'txtItemName',
	name        : 'txtItemName',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
           txtSpec1.focus();
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



var txtSpec1 = new Ext.form.TextField({
	fieldLabel  : 'Specifications',
	id          : 'txtSpec1',
	name        : 'txtSpec1',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec2.focus();
		     }
		  },

	    keyup: function () {

	    }
	}
	});

var txtSpec2 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec2',
	name        : 'txtSpec2',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},
	
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec3.focus();
		     }
		  },
	    keyup: function () {

	    }
	}
	});


var txtSpec3 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec3',
	name        : 'txtSpec3',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},

	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec4.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});



var txtSpec4 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec4',
	name        : 'txtSpec4',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},

	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec5.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});


var txtSpec5 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec5',
	name        : 'txtSpec5',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec6.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});



var txtSpec6 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec6',
	name        : 'txtSpec6',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},

	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec7.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});


var txtSpec7 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec7',
	name        : 'txtSpec7',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},

	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec8.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});



var txtSpec8 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec8',
	name        : 'txtSpec8',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec9.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});


var txtSpec9 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec9',
	name        : 'txtSpec9',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           txtSpec10.focus();
		     }
		  },

	    keyup: function () {
	    }
	}
	});


var txtSpec10 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtSpec10',
	name        : 'txtSpec10',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'69'},

	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		           btnSave.focus();
		     }
		  },
	    keyup: function () {
	    }
	}
	});



var btnSave = new Ext.Button({
	icon:'/WorkOrder/icons/download.gif',
	style   : 'text-align:left;',
	width   : 90,
	height  : 50,    
	text    : " SAVE",
	x       : 0,
	y       : 110,
	id      : "btnSave",
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
	enableKeyEvents: true,
	listeners:{
	click:function(){
//alert(cmbhsncode.getRawValue());
//save	
                Ext.Msg.show({
                    title: 'Confirmation',
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.MessageBox.YESNO,
                    msg: 'Do You Want To Save the Specifications...',
                    fn: function(btn)
			{
  	
                         if (btn === 'yes')
	                 {
                         Ext.Ajax.request({
                            url: 'MasPurItemSaveSpec.php',
                            params :
                             {
				item_code : item_code,
				item_name : txtItemName.getRawValue(),
				spec1     : txtSpec1.getRawValue(),
				spec2     : txtSpec2.getRawValue(),
				spec3     : txtSpec3.getRawValue(),
				spec4     : txtSpec4.getRawValue(),				
				spec5     : txtSpec5.getRawValue(),
				spec6     : txtSpec6.getRawValue(),
				spec7     : txtSpec7.getRawValue(),
				spec8     : txtSpec8.getRawValue(),
				spec9     : txtSpec9.getRawValue(),				
				spec10    : txtSpec10.getRawValue(),
				                       
			},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){                                
                                    Ext.MessageBox.alert("Purchase Item Spec Saved -" + obj['msg']);
//                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }
                                  else{
					Ext.MessageBox.alert("Purchase Item Spect Not Saved! Pls Check!- " + obj['msg']);                                                  
                                    }
                                }

                           });         
  
     				}
 

                            }     
       
                });
     
	}

	}        
  
});


var btnExit = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 90,
        height  : 50,    
        text    : "EXIT",
        x       : 0,
        y       : 165,
        id      : "btnExit",
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
        handler : function(){	
             MasStoresItemWindow.hide();
        }


});

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        x: 0,
        y: 0,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "spec1", dataIndex: 'item_spec1',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec2", dataIndex: 'item_spec2',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec3", dataIndex: 'item_spec3',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec4", dataIndex: 'item_spec4',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec5", dataIndex: 'item_spec5',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec6", dataIndex: 'item_spec6',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec7", dataIndex: 'item_spec7',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec8", dataIndex: 'item_spec8',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec9", dataIndex: 'item_spec9',sortable:true,width:60,align:'left',hidden:true},   
		{header: "spec10", dataIndex: 'item_spec10',sortable:true,width:60,align:'left',hidden:true},   
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				item_code = selrow.get('item_code');
				txtItemName.setValue(selrow.get('item_name'));
				txtSpec1.setRawValue(selrow.get('item_spec1'));
				txtSpec2.setRawValue(selrow.get('item_spec2'));
				txtSpec3.setRawValue(selrow.get('item_spec3'));
				txtSpec4.setRawValue(selrow.get('item_spec4'));
				txtSpec5.setRawValue(selrow.get('item_spec5'));
				txtSpec6.setRawValue(selrow.get('item_spec6'));
				txtSpec7.setRawValue(selrow.get('item_spec7'));
				txtSpec8.setRawValue(selrow.get('item_spec8'));
				txtSpec9.setRawValue(selrow.get('item_spec9'));
				txtSpec10.setRawValue(selrow.get('item_spec10'));
                                flxItem.hide();  
                                txtSpec1.focus();       
			}
		}
 
    
   }
   });



   var MasStoresItempanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ITEM MASTER',
        header      : false,
        width       : 900,
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 500,
        y           : 0,
        frame       : false,
        id          : 'MasStoresItempanel',
        method      : 'POST',
        layout      : 'absolute',


        items: [
   


            { xtype   : 'fieldset',
                title   : 'ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 550,
                width   : 600,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 150,
                y       : 10,
                items:[

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 10,
                            	border      : false,
                        	items: [txtItemName]
                         },




			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 80,
                            	border      : false,
                        	items: [txtSpec1]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 105,
                            	border      : false,
                        	items: [txtSpec2]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 130,
                            	border      : false,
                        	items: [txtSpec3]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 155,
                            	border      : false,
                        	items: [txtSpec4]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 180,
                            	border      : false,
                        	items: [txtSpec5]
                         },

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 205,
                            	border      : false,
                        	items: [txtSpec6]
                         },			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 230,
                            	border      : false,
                        	items: [txtSpec7]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 255,
                            	border      : false,
                        	items: [txtSpec8]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 280,
                            	border      : false,
                        	items: [txtSpec9]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 10,
                        	y           : 305,
                            	border      : false,
                        	items: [txtSpec10]
                         },


			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 150,
                        	y           : 460,
                            	border      : false,
                        	items: [btnSave]
                         },


			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 300,
                        	y           : 460,
                            	border      : false,
                        	items: [btnExit]
                         },


			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 450,
                        	x           : 123,
                        	y           : 30,
                            	border      : false,
                        	items: [flxItem]
                         },


                ]
            },
        ]
	
});

function RefreshData()
{
    flxItem.hide();

    txtSpec1.setRawValue('');
    txtSpec2.setRawValue('');
    txtSpec3.setRawValue('');
    txtSpec4.setRawValue('');
    txtSpec5.setRawValue('');
    txtSpec6.setRawValue('');
    txtSpec7.setRawValue('');
    txtSpec8.setRawValue('');
    txtSpec9.setRawValue('');
    txtSpec10.setRawValue('');

}

   
    var MasStoresItemWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'ITEM MASTER',
        items       : MasStoresItempanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                    RefreshData(); 
                    txtItemName.focus();

		loadItemListDatastore.removeAll();
		loadItemListDatastore.load({
                url: 'ClsPurItemSpec.php',
                params:
                    {
                        task:"loaditemlist",
			finid    : GinFinid,
			compcode : Gincompcode,   
                    },
                   // scope: this,
                    callback:function() 
		    {
//alert(loadItemListDatastore.getCount());
                    }
                });  
               }

	}
    });
    MasStoresItemWindow.show();  
});
