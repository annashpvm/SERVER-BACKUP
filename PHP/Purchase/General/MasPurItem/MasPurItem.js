Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var AEDFlag = "Add";
   var item_code;
   
  var loadunitdatastore = new Ext.data.Store({
      id: 'loadunitdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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

 var loaditemcodeexistchk = new Ext.data.Store({
      id: 'loaditemcodeexistchk',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"itemcodechk"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cnt'
      ]),
    });


 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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



  var loaditemgrpdatastore = new Ext.data.Store({
      id: 'loaditemgrpdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
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


  var loadhsndatastore = new Ext.data.Store({
      id: 'loadhsndatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurItem.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadhsn"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'hsn_sno', type: 'int',mapping:'hsn_sno'},
	{name:'hsn_code', type: 'string',mapping:'hsn_code'}
      ]),
    });

function clearall(){
	
	MasStoresItempanel.getForm().reset();
}

var txtItemname = new Ext.form.TextField({
	fieldLabel  : 'Item Name',
	id          : 'txtItemname',
	name        : 'txtItemname',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
	listeners:{
	    keyup: function () {
	     
	     if (flxDetail.store.find('item_name', txtItemname.getValue()) != -1){
	     	flxDetail.getStore().filter('item_name', txtItemname.getValue());   
	     }
	     else
	     {
		     flxDetail.getStore().filter('item_name', '');
/*
		     if (AEDFlag === "Add") {
				Ext.Msg.show({
				title: 'Purchase Item Master',
				icon: Ext.Msg.QUESTION,
				buttons: Ext.MessageBox.YESNO,

				msg: 'Press YES to Add New   -  NO to Cancel',
				fn: function(btn){
				if (btn === 'yes'){
				}
				else { 
				
				}
				}
						    
				});
		     
		     }

		     else {
		     	alert("No Item Name Matched!!");
		     }
*/
	     }
	     
		     
		    

		                  

	    }
	}
	});


function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtSearch.getRawValue(),
		},
        });
}

var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  300,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchItemListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     itemSearch();
            }
         }  
    });




var txtUsage = new Ext.form.TextField({
        fieldLabel  : 'USAGE',
        id          : 'txtUsage',
        name        : 'txtUsage',
        width       :  355,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'50'},
    });
    
    var txtpass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtpass',
        name        : 'txtpass',
        inputType: 'password',
        width       :  150,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
    });

var cmbunit = new Ext.form.ComboBox({
        fieldLabel      : 'Units',
        width           :  80,
        displayField    : 'uom_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbunit',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadunitdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });

var cmbQualityChk = new Ext.form.ComboBox({
        fieldLabel      : 'Quality Check',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbQualityChk',
        typeAhead       : true,
        mode            : 'local',
        store           : [['Y','Needed'],['N','Not Needed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : true,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });



var cmbitemgrp = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 320,
        displayField    : 'groupname', 
        valueField      : 'subgrp_code',
        hiddenName      : '',
        id              : 'cmbitemgrp',
        typeAhead       : true,
        mode            : 'local',
        store           : loaditemgrpdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      	:"border-radius: 5px;textTransform: uppercase; ",         
   });
var cmbhsncode = new Ext.form.ComboBox({
        fieldLabel      : 'HSN Code',
        width           :  120,
        displayField    : 'hsn_code', 
        valueField      : 'hsn_code',
        hiddenName      : '',
        id              : 'cmbhsncode',
        typeAhead       : true,
        mode            : 'local',
        store           : loadhsndatastore,
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",         
   });


var btnnew = new Ext.Button({
        icon:    'new.jpg',
        style   : 'text-align:center;',
        width   : 90,
        height  : 50,    
        text    : "NEW",
        x       : 0,
        y       : 0,
        id      : "btnnew",
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
       // html    : '<img src = "/SHVPM/NEW.JPG">',
    enableKeyEvents: true,

    	//style      :"border-radius: 5px; ",     
    listeners:{
        click:function(){
            clearall();
            txtItemname.focus();
            AEDFlag = "Add";
            //Ext.getCmp('btnedit').setDisabled(true);
        }
    }
         
});


var btnedit = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 90,
        height  : 50,    
        text    : "EDIT",
        x       : 0,
        y       : 55,
        id      : "btnedit",
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
	enableKeyEvents: true,
	listeners:{
	click:function(){
	    clearall();
	    txtItemname.focus();
	    AEDFlag = "Edit";
	    //Ext.getCmp('btnedit').setDisabled(true);
	}
	}        
});

var btnsave = new Ext.Button({
	icon:'/WorkOrder/icons/download.gif',
	style   : 'text-align:left;',
	width   : 90,
	height  : 50,    
	text    : " SAVE",
	x       : 0,
	y       : 110,
	id      : "btnsave",
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
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{
				txtpass.show();
                                if (txtpass.getValue() == "")
                                   {   
                                   alert("Enter Password ...");
                                   txtpass.focus();
                                   } 
                                else if (txtpass.getValue() != "Srihari2025")
                                   {    
                                    alert("Password Error Please check...");      
                                    txtpass.focus();
                                   } 
                                else if (cmbitemgrp.getValue() == 0 || cmbitemgrp.getRawValue() == '')
                                     {
                                         btn = 'no';
                                         alert("Select Item Group");
                                      }
                                 else if (cmbhsncode.getRawValue() == '')
                                     {
                                         btn = 'no';
                                         alert("Select HSN CODE");
                                      }
   
				
                            if (btn === 'yes' && txtpass.getValue() === "Srihari2025" )
				{

                      Ext.Ajax.request({
                            url: 'MasPurItemSave.php',
                            params :
                             {

				compcode	: Gincompcode,
                                finid		: GinFinid,
				AEDFlag	        : AEDFlag,
				itemgrp  	: cmbitemgrp.getValue(),
				item_code 	: item_code,
				itemname	: txtItemname.getValue(),
				itemusage	: txtUsage.getValue(),
				unit		: cmbunit.getValue(),
				qualitychk    	: cmbQualityChk.getValue(),
				hsncode 	: cmbhsncode.getRawValue(),
				
				                       
			},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){                                
                                    Ext.MessageBox.alert("Purchase Item Master Saved -" + obj['msg']);
//                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }
                                  else{
					Ext.MessageBox.alert("Purchase Item Master Not Saved! Pls Check!- " + obj['msg']);                                                  
                                    }
                                }

                           });         
  
     				}
 

                            }     
       
                });
     
	}

	}        
  
});

var btnRefresh = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
        style   : 'text-align:left;border-radius : 3px;',
        width   : 90,
        height  : 50,    
        text    : "Refresh",
        x       : 0,
        y       : 220,
        id      : "btnRefresh",
        border: 1,
        style: {
          borderColor: 'blue',
          borderStyle: 'solid',
        },   
	enableKeyEvents: true,
	listeners:{
	  click:function(){
                    RefreshData(); 
                    txtItemname.focus();

		loadItemListDatastore.removeAll();
		loadItemListDatastore.load({
                url: 'ClsPurItem.php',
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

          },

});

var btnexit = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 90,
        height  : 50,    
        text    : "EXIT",
        x       : 0,
        y       : 165,
        id      : "btnexit",
    border: 1,
    style: {
      borderColor: 'blue',
      borderStyle: 'solid',

    },
        handler : function(){	
             MasStoresItemWindow.hide();
        }


});
   
   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 1210,
        x: 0,
        y: 0,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "Item Usage", dataIndex: 'item_usage',sortable:true,width:330,align:'left'},
		{header: "Units Code", dataIndex: 'uom_code',sortable:true,width:100,align:'center',hidden:true},  
		{header: "Units", dataIndex: 'uom_short_name',sortable:true,width:100,align:'center'},
		{header: "SubGroup Code", dataIndex: 'subgrp_code',sortable:true,width:255,align:'left',hidden:true},
		{header: "Sub Group", dataIndex: 'subgrp_name',sortable:true,width:255,align:'left'},
		{header: "MainGroup Code", dataIndex: 'grp_code',sortable:true,width:255,align:'left',hidden:true},
		{header: "Main Group", dataIndex: 'grp_name',sortable:true,width:255,align:'left'},
		{header: "Hsn sno", dataIndex: 'hsn_sno',sortable:true,width:100,align:'center',hidden:true},  
		{header: "Hsn Code", dataIndex: 'item_hsncode',sortable:true,width:100,align:'center'},
		{header: "Location", dataIndex: 'loc_name',sortable:true,width:100,align:'right'},
		{header: "QC Check", dataIndex: 'item_qcchk',sortable:true,width:100,align:'center',hidden:true},  

        ],
store:loadItemListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
        loaditemgrpdatastore.removeAll();
        loaditemgrpdatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loaditemgroup",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });
        loadunitdatastore.removeAll();
        loadunitdatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadunit",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });
        loadhsndatastore.removeAll();
        loadhsndatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadhsn",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });                
        
         Ext.Msg.show({
             title: 'Purchase Item Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){
		AEDFlag = "Edit";
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));


			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;
				item_code = selrow.get('item_code');
				
				txtItemname.setValue(selrow.get('item_name'));
				txtUsage.setValue(selrow.get('item_usage'));
				cmbunit.setValue(selrow.get('uom_code'));
				cmbQualityChk.setValue(selrow.get('item_qcchk'));
				cmbitemgrp.setValue(selrow.get('item_group_code'));
				cmbhsncode.setValue(selrow.get('hsn_sno'));
				
				
				flxDetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
    
   }

   });

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 420,
        x: 0,
        y: 35,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
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
				txtItemname.setValue(selrow.get('item_name'));

	     if (flxDetail.store.find('item_name', txtItemname.getValue()) != -1){
	     	flxDetail.getStore().filter('item_name', txtItemname.getValue());   
	     }
	     else
	     {
		     flxDetail.getStore().filter('item_name', '');
	     }
	     

			}
		}
 
    
   }
   });


   var MasStoresItempanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ITEM MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 500,
        y           : 0,
        frame       : false,
        id          : 'MasStoresItempanel',
        method      : 'POST',
        layout      : 'absolute',
/*  
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
	
				if(txtItemname.getRawValue()=="" || txtItemname.getValue()==0)
				{
					alert("Enter Item Name");
					txtItemname.setFocus();
				}
				else if(txtUsage.getValue()=="" || txtUsage.getValue()==0)
				{
					alert("Enter Description");
					txtcgst.setFocus();
				}
				else if(cmbunit.getRawValue()=="" || cmbunit.getValue()==0)
				{
					alert("Select Unit");
					cmbunit.setFocus();
				}
				else if(cmbQualityChk.getRawValue()=="" || cmbQualityChk.getValue()==0)
				{
					alert("Select Quality");
					cmbQualityChk.setFocus();
				}
				else if(cmbindent.getRawValue()=="" || cmbindent.getValue()==0)
				{
					alert("Select Indent");
					cmbindent.setFocus();
				}
				else if(cmbitemgrp.getRawValue()=="" || cmbitemgrp.getValue()==0)
				{
					alert("Select ItemGroup");
					cmbindent.setFocus();
				}
				else if(cmbhsncode.getRawValue()=="" || cmbhsncode.getValue()==0)
				{
					alert("Select HSN Code");
					cmbhsncode.setFocus();
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
     alert(cmbQualityChk.getRawValue().substring(0,1));
     alert(cmbindent.getRawValue().substring(0,1));

						{
						Ext.Ajax.request({
		                            	url: 'MasPurItemSave.php',
                                           
                		       	        params:
						{
                                                        itemname : txtItemname.getRawValue(),
							itemdesc : txtUsage.getRawValue(),
							unit     : cmbunit.getValue(),
                                                        quality  : cmbQualityChk.getRawValue().substring(0,1),       
							indent   : cmbindent.getRawValue().substring(0,1),
							itemgrp  : cmbitemgrp.getValue(),
							hsncode  : cmbhsncode.getValue()
						},

						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasStoresItempanel.getForm().reset();
							RefreshData();
						
                                                }
                                             	else 
						{
                                               
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved... ");
							}
                                                      
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
                            MasStoresItemWindow.hide();
                        }
                }]
        },
*/



        items: [
           { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : false,
                height  : 310,
                width   : 200,
//		style   : { border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[btnnew,btnedit,btnsave,btnexit,btnRefresh],

           },      


            { xtype   : 'fieldset',
                title   : 'ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 280,
                width   : 550,
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
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtItemname]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 520,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtUsage]
                            },
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbunit]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbQualityChk]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 500,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbitemgrp]
                            },
			
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmbhsncode]
                            }
                ]

            },
                        		{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 520,
                                	x           : 950,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtpass]
                            },


            { xtype   : 'fieldset',
                title   : 'Search',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 550,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 700,
                y       : 70,
                items:[
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 10,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtSearch]
                            },flxItem,


                ]
            },

            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 270,
                width   : 1240,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 290,
                items:[flxDetail]
            },    

            
        ],
    });
    

   function RefreshData(){
        cmbhsncode.setRawValue("");
	cmbQualityChk.setRawValue("");
	cmbunit.setRawValue("");
	cmbitemgrp.setRawValue("");
	txtUsage.setRawValue("");
	txtItemname.setRawValue("");
        txtpass.hide();
        loadhsndatastore.removeAll();
        loadhsndatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loadhsn",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });    

        loaditemgrpdatastore.removeAll();
        loaditemgrpdatastore.load({
		url: 'ClsPurItem.php',
		params:
		{
			task:"loaditemgroup",
			finid    : GinFinid,
			compcode : Gincompcode,   
		},
        });


	
};

   
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
                    txtItemname.focus();

		loadItemListDatastore.removeAll();
		loadItemListDatastore.load({
                url: 'ClsPurItem.php',
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
