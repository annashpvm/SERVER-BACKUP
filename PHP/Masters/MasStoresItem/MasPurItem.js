Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var gstFlag = "Add";
   var item_code;
   

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);




new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  MasStoresItemWindow.hide();

            }
        }]);




 var loadPassword = new Ext.data.Store({
      id: 'loadPassword',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos', 'pw_password'
      ]),
    });



  var loadunitdatastore = new Ext.data.Store({
      id: 'loadunitdatastore',
      autoLoad : true,
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


          'item_code', 'item_name','item_usage','item_uom', 'item_qcchk','item_group_code','item_hsncode',
 'item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5', 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10'

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
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          flxItem.hide();
		          txtUsage.focus();
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
                flxItem.removeAll();
                  if (txtItemname.getRawValue() != '')
                     itemSearch();
            }     

	}
	});




    var itemchange = 'N';
    var chkItemChange = new Ext.form.Checkbox({
        name: 'chkItemChange',
        boxLabel: 'Do you Want to Change the Item',
        id: 'chkItemChange',
    	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",

        checked: false,
        width: 400,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    Ext.getCmp('txtItemnameNew').setReadOnly(false);  
                    txtItemnameNew.setRawValue(txtItemname.getRawValue());
                    Ext.getCmp('txtItemname').setDisabled(true);
                    itemchange = 'Y';

                } else {
                    Ext.getCmp('txtItemnameNew').setReadOnly(true);   
                    txtItemnameNew.setRawValue('');  
                    itemchange = 'N';
                    Ext.getCmp('txtItemname').setDisabled(false);
                }

            }
        }
    });

var txtItemnameNew = new Ext.form.TextField({
	fieldLabel  : 'Change Item Name',
	id          : 'txtItemnameNew',
	name        : 'txtItemnameNew',
  	width       :  355,
        readOnly    : true,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'60'},
	enableKeyEvents: true,
	listeners:{



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
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          cmbunit.focus();
		     }
	    },

	}

    });
    
var cmbunit = new Ext.form.ComboBox({
        fieldLabel      : 'Units',
        width           :  80,
        displayField    : 'uom_name', 
        valueField      : 'uom_code',
        hiddenName      : '',
        id              : 'cmbunit',
        typeAhead       : true,
        mode            : 'local',
        store           : loadunitdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ",
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          cmbQualityChk.focus();
		     }
	    },

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

	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          cmbitemgrp.focus();
		     }
	    },

	}       
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
	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          cmbhsncode.focus();
		     }
	    },

	}           
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
 	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          btnsave.focus();
		     }
	    },

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
			item    : txtItemname.getRawValue(),
		},
        });
}


    var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType: 'password',
        width       :  150,
        border      : false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: '/SHVPM/clsuser.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'STORES',
		       subject  : 'ITEM MASTER',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
	                      Ext.getCmp('save').setDisabled(false);
                          }
                          else     
                          {   
                             alert("Password is Error. Please check ...");
                             Ext.getCmp('save').setDisabled(true);
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                      }           

                    }

                });   


                    }           

             }
          },

        } 
    })



/*

    var txtpass = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtpass',
        name        : 'txtpass',
        inputType: 'password',
        width       :  150,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
 	enableKeyEvents: true,
	listeners:{

           specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          save_click();
		     }
	    },

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
				txtPassword.show();
                                if (txtPassword.getValue() == "")
                                   {   
                                   alert("Enter Password ...");
                                   txtPassword.focus();
                                   } 
                                else if (txtPassword.getValue() != "Srihari@2008")
                                   {    
                                    alert("Password Error Please check...");      
                                    txtPassword.focus();
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
   
				
                            if (btn === 'yes' && txtPassword.getValue() === "Srihari@2008" )
				{

                      Ext.Ajax.request({
                            url: 'MasPurItemSave.php',
                            params :
                             {

				compcode	: Gincompcode,
                                finid		: GinFinid,
				AEDFlag	        : SaveFlag,
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

                                    RefreshData();
                                  }
                                  else{
if (obj['cnt'] > 0) 
 Ext.MessageBox.alert(" Item Already Available! Pls Check! ");                                                  

else
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
*/
function grid_chk_flxLedger()
{
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();

		var chkitem = (selrow.get('item_code'));
	if ((selrow != null)){

		item_code = selrow.get('item_code');
		txtItemname.setValue(selrow.get('item_name'));
		txtUsage.setValue(selrow.get('item_usage'));
		cmbunit.setValue(selrow.get('item_uom'));
		cmbQualityChk.setValue(selrow.get('item_qcchk'));
		cmbitemgrp.setValue(selrow.get('item_group_code'));
		cmbhsncode.setValue(selrow.get('item_hsncode'));
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

//                SaveFlag = "Edit";
		flxItem.hide();
	}
}


   
   var dgrecord = Ext.data.Record.create([]);

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 490,
        width: 420,
        x: 100,
        y: 30,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "Usage", dataIndex: 'item_usage',sortable:true,width:330,align:'left'},
		{header: "UOM", dataIndex: 'item_uom',sortable:true,width:330,align:'left'},
		{header: "QC CHK", dataIndex: 'item_qcchk',sortable:true,width:330,align:'left'},
		{header: "Group", dataIndex: 'item_group_code',sortable:true,width:330,align:'left'},
		{header: "hsn", dataIndex: 'item_hsncode',sortable:true,width:330,align:'left'},
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
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }


 
    
   }
   });

   function save_click()
   {


                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{

                                if (txtPassword.getRawValue() == '')
                                     {
                                         btn = 'no';
                                         alert("Enter Password");
                                         txtPassword.show();
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
				 else if (gstFlag == "Add" && txtItemname.getRawValue() == '')
                                      {  
				 Ext.Msg.alert('Item Master','Enter item Name.....');      
			               btn = 'no';
				 txtItemname.focus();
			              }
				 else if (gstFlag == "Edit"  && itemchange == 'Y' && txtItemnameNew.getRawValue() == '')
				      {  
					 Ext.Msg.alert('Item Master','Enter item Name to be Modified.....');      
					 btn = 'no'; 
					 txtItemnameNew.focus();
				      }
				
                            if (btn === 'yes' )
				{

                      Ext.Ajax.request({
                            url: 'MasPurItemSave.php',
                            params :
                             {

				compcode	: Gincompcode,
                                finid		: GinFinid,
				SaveFlag        : gstFlag,
				itemgrp  	: cmbitemgrp.getValue(),
				item_code 	: item_code,
				itemname	: txtItemname.getValue(),
				itemusage	: txtUsage.getValue(),
				unit		: cmbunit.getValue(),
				qualitychk    	: cmbQualityChk.getValue(),
				hsncode 	: cmbhsncode.getRawValue(),
				itemchange      : itemchange,
           			itemnameNew	: txtItemnameNew.getValue(),
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
                                    Ext.MessageBox.alert("Purchase Item Master Saved -" + obj['msg']);
                                    RefreshData();
                                  }
                                  else{
	if (obj['cnt'] > 0) 
	 Ext.MessageBox.alert(" Item Already Available! Pls Check! ");                                                  

	else
	  Ext.MessageBox.alert("Purchase Item Master Not Saved! Pls Check!- " + obj['msg']);                                                  
                                     }
                                }

                           });         
  
     				}
 

                            }     
       
                });
     	
   }   


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
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png',
                    listeners:{
                       click: function () {
                            gstFlag = "Add";
                            RefreshData();
                       }
                    }
                    
                },'-',
//EDIT
                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
                       click: function () {
                           gstFlag = "Edit";
                           Ext.getCmp('chkItemChange').setDisabled(false);
                           }
                    }
                    
                },'-',
//SAVE
                {
                    text: 'Save',
                    id  : 'save',

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
                            MasStoresItemWindow.hide();
                        }
                }]
        },



        items: [


            { xtype   : 'fieldset',
                title   : 'ITEM MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 500,
                width   : 1050,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 100,
                y       : 0,
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
                                	labelWidth  : 1,
                                	width       : 800,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [chkItemChange]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 520,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtItemnameNew]
                            },

                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 520,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtUsage]
                            },
			
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	items: [cmbunit]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 230,
                                    	border      : false,
                                	items: [cmbQualityChk]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 500,
                                	x           : 0,
                                	y           : 260,
                                    	border      : false,
                                	items: [cmbitemgrp]
                            },
			
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 0,
                                	y           : 300,
                                    	border      : false,
                                	items: [cmbhsncode]
                            },


			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 80,
                            	border      : false,
                        	items: [txtSpec1]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 105,
                            	border      : false,
                        	items: [txtSpec2]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 130,
                            	border      : false,
                        	items: [txtSpec3]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 155,
                            	border      : false,
                        	items: [txtSpec4]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 180,
                            	border      : false,
                        	items: [txtSpec5]
                         },

			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 205,
                            	border      : false,
                        	items: [txtSpec6]
                         },			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 230,
                            	border      : false,
                        	items: [txtSpec7]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 255,
                            	border      : false,
                        	items: [txtSpec8]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 280,
                            	border      : false,
                        	items: [txtSpec9]
                         },
			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 520,
                        	x           : 500,
                        	y           : 305,
                            	border      : false,
                        	items: [txtSpec10]
                         },

/*
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 50,
                                	y           : 340,
                                    	border      : false,
                                	items: [btnsave]
                            },


                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 400,
                                	x           : 150,
                                	y           : 340,
                                    	border      : false,
                                	items: [btnexit]
                            },
*/
flxItem,

                ]

            },
                        		{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 520,
                                	x           : 850,
                                	y           : 15,
                                    	border      : false,
                                	items: [txtPassword]
                            },





            
        ],
    });
    

   function RefreshData(){
         Ext.getCmp('chkItemChange').setDisabled(true);
         Ext.getCmp('txtItemname').setDisabled(false);


        flxItem.hide();
        gstFlag = "Add";
        cmbhsncode.setRawValue("");
	cmbQualityChk.setRawValue("");
	cmbunit.setRawValue("");
	cmbitemgrp.setRawValue("");
	txtUsage.setRawValue("");
	txtItemname.setRawValue("");

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



      //  txtPassword.hide();

        Ext.getCmp('txtItemnameNew').setReadOnly(true); 
	txtItemnameNew.setRawValue("");
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
                callback: function () {
                      txtItemname.focus(); 
                }
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
 onEsc:function(){
},
	listeners:{
               show:function(){
                    Ext.getCmp('save').setDisabled(true);
                    RefreshData(); 
           


               }

	}
    });
    MasStoresItemWindow.show();  
});
