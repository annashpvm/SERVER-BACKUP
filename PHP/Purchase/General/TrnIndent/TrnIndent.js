  Ext.onReady(function(){
   Ext.QuickTips.init();

//      autoLoad : true,

   var Ginfinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');   


    var gstfinyear = localStorage.getItem('gstyear');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var editrow = 0;
   var gridedit = "false";
   var viewopt = 0; 
   var gstFlag = "Add";
  var indtype = "R";
  var inddept = 0;
  var indsection = 0;
  var indplant = "";
  var compcode =0;

  var itemcode =0;
  var dept = 0;
  var auth1 = "";
  var auth2 = "";
  var authstatus = "";
  var poqty = 0;
  var itempoqty = 0;
  var itemrecdqty = 0;
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


 var loadIndNoDatastore = new Ext.data.Store({
      id: 'loadIndNoDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIndNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'ind_no'
      ]),
    });

 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
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
		       dept     : 'PURCHASE',
		       subject  : 'INDENT',
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
    });


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
		           txtspec.focus();
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



  var loadItemStockDatastore = new Ext.data.Store({
      id: 'loadItemStockDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['uom_short_name','item_avg_rate','item_stock'
      ]),
    });

  var loadindnodatastore = new Ext.data.Store({
      id: 'loadindnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ind_no'
      ]),
    });

  var loadindentDetailsdatastore = new Ext.data.Store({
      id: 'loadindentDetailsdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindentdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'ind_no','ind_date', 'ind_fin_code', 'ind_type', 'ind_option', 'ind_dept_code', 'ind_slno', 'ind_item_code', 'ind_qty', 'ind_rate', 'ind_value', 'ind_po_qty', 'ind_rec_qty', 'ind_iss_qty', 'ind_bal_qty', 'ind_remarks', 'ind_due_date', 'ind_approval_status', 'ind_status', 'ind_auth_flag', 'ind_ent_date', 'ind_remarks', 'ind_cancel_status', 'ind_machine', 'ind_purtype', 'ind_section', 'ind_hod_auth', 'ind_po_auth', 'ind_issue_SHVPM', 'ind_issue_vjpm', 'ind_issue_cogen', 'ind_issue_solvent', 'ind_equip', 'ind_plant', 'ind_prepared_by', 'item_name', 'app_name', 'section_code', 'section_name', 'section_part', 'cancelflag','equip_code', 'equip_name','equip_part', 'uom_code', 'uom_name', 'uom_short_name', 'item_avg_rate', 'item_stock','ind_purpose','ind_stock' ,
 'ind_std_lifetime', 'ind_act_lifetime', 'ind_reason'
      ]),
    });

  var loaddeptdatastore = new Ext.data.Store({
      id: 'loaddeptdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'dept_code', type: 'int',mapping:'dept_code'},
	{name:'dept_name', type: 'string',mapping:'dept_name'}
      ]),
    });

var loadappdatastore  = new Ext.data.Store({
      id: 'loadappdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadappno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'app_code', type: 'int',mapping:'app_code'},
	{name:'app_name', type: 'string',mapping:'app_name'}
      ]),
    });

var loadItemDatastore  = new Ext.data.Store({
      id: 'loadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'item_code', type: 'int',mapping:'item_code'},
	{name:'item_name', type: 'string',mapping:'item_name'}
      ]),
    });

var loadsectionDataStore = new Ext.data.Store({
      id: 'loadsectionDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsection"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'section_code', type: 'int',mapping:'section_code'},
	{name:'section_name', type: 'string',mapping:'section_name'}
      ]),
    });

function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsIndent.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
		},
        });
}








var loadequipmentDataStore = new Ext.data.Store({
      id: 'loadequipmentDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndent.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadequipment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'equip_code', type: 'int',mapping:'equip_code'},
	{name:'equip_name', type: 'string',mapping:'equip_name'}
      ]),
    });

   var FrameDataStore = new Ext.data.Store({
 
    });
 
  var IndTransDataStore = new Ext.data.Store({
 
    });


     var cmbIndno = new Ext.form.ComboBox({
        fieldLabel      : 'Indent No',
        width           : 100,
        displayField    : 'ind_no',
        valueField      : 'ind_no',
        hiddenName      : 'ind_no',
        id              : 'cmbIndno',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadIndNoDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

              if (viewopt == 1 && Number(cmbIndno.getValue()) > 0 )  
               {
                    loadindentDetailsdatastore.removeAll(); 
                    loadindentDetailsdatastore.load({
                       url: 'ClsIndent.php',
                       params:
                       {
                          task:"loadindentdetails",
                          indno:cmbIndno.getValue(),
                          finid:Ginfinid,
                          compcode:Gincompcode

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=loadindentDetailsdatastore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  
  //alert(loadindentDetailsdatastore.getAt(0).get('ind_dept_code'));
                          if (loadindentDetailsdatastore.getAt(0).get('ind_auth_flag') == "Y") 
                          {
                              Ext.getCmp('save').setDisabled(false);                      
                              alert("Indent Already Authorized .. You Can't Edit");
                          }
                         // else { Ext.getCmp('save').setDisabled(false);}
                          

                          txtIndno.setValue(cmbIndno.getValue());
                          inddept = loadindentDetailsdatastore.getAt(0).get('ind_dept_code');
                      	  indsection= loadindentDetailsdatastore.getAt(0).get('ind_setcion');
                          cmbmachine.setRawValue(loadindentDetailsdatastore.getAt(0).get('ind_machine'));
/*

				loadsectionDataStore.removeAll();
		        	loadsectionDataStore.load({
		                url: 'ClsIndent.php',
		                params:
		                    {
		                        task:"loadsection",
		                        compcode:Gincompcode,
					finid:Ginfinid,
					dept:inddept,
		                        machine:indplant,
		               
		                    }
		                });      
*/
				loadequipmentDataStore.removeAll();
				loadequipmentDataStore.load({
		                url: 'ClsIndent.php',
		                params:
		                    {
		                        task:"loadequipment",
		                        compcode:Gincompcode,
					finid:Ginfinid,
					section:indsection,
					machine:indplant,
					dept : inddept
		                    }
		                }); 
			       grid_tot();

                          dtpDate.setRawValue(Ext.util.Format.date(loadindentDetailsdatastore.getAt(0).get('ind_date'),"d-m-Y"));
                          cmbdept.setValue(loadindentDetailsdatastore.getAt(0).get('ind_dept_code')); 
                          txtindentby.setRawValue(loadindentDetailsdatastore.getAt(0).get('ind_prepared_by'))
/*
                             if (loadindentDetailsdatastore.getAt(0).get('minh_type') == 'C')
                             {
                                 Ext.getCmp('opt_select').setValue(1);
                             }
                             else
                             {
                                 Ext.getCmp('opt_select').setValue(2);
                             }  */

                             for(var j=0; j<cnt; j++)
		             { 
                          inddept = loadindentDetailsdatastore.getAt(j).get('ind_dept_code');
                          indplant = loadindentDetailsdatastore.getAt(j).get('ind_plant');

//                               var slno1          = loadindentDetailsdatastore.getAt(j).get('ind_slno');
                               var slno1          = j+1;
                               var itemname1      = loadindentDetailsdatastore.getAt(j).get('item_name');
                               var qty1           = loadindentDetailsdatastore.getAt(j).get('ind_qty');
                               var value1         = loadindentDetailsdatastore.getAt(j).get('ind_value');
			       var duedate1       = loadindentDetailsdatastore.getAt(j).get('ind_due_date'); 
                               var approval1      = loadindentDetailsdatastore.getAt(j).get('ind_approval_status');
                               var status1        = loadindentDetailsdatastore.getAt(j).get('ind_status');
                               var author1        = loadindentDetailsdatastore.getAt(j).get('ind_auth_flag');
                               var ordqty1        = loadindentDetailsdatastore.getAt(j).get('ind_po_qty');
                               var recdqty1       = loadindentDetailsdatastore.getAt(j).get('ind_rec_qty');
                               var issqty1        = loadindentDetailsdatastore.getAt(j).get('ind_iss_qty');
			       var remarks1       = loadindentDetailsdatastore.getAt(j).get('ind_remarks');
                               var itemcode1      = loadindentDetailsdatastore.getAt(j).get('ind_item_code');
                               var indtype1       = loadindentDetailsdatastore.getAt(j).get('ind_type');
 		               var sectioncode1    = loadindentDetailsdatastore.getAt(j).get('ind_section');
 		               var sectionname1    = loadindentDetailsdatastore.getAt(j).get('section_name');
	 		       var equipcode1     = loadindentDetailsdatastore.getAt(j).get('equip_code');
	 		       var equipname1     = loadindentDetailsdatastore.getAt(j).get('equip_name');
                               var machine1       = loadindentDetailsdatastore.getAt(j).get('ind_machine');
                               var RowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                 new dgrecord({
                                       slno       : slno1,      
                                       itemname   : itemname1,  
                                       qty        : qty1,       
                                       value      : value1, 
                                       duedate    : Ext.util.Format.date(duedate1,"Y-m-d"),    	
                                       approval   : approval1,    
                                       remarks    : remarks1 ,   
                                       itemcode   : itemcode1,   
                                       indtype    : indtype1,   
 	                               sectioncode : sectioncode1, 
 		                       sectionname : sectionname1, 
	 		               equipcode  : equipcode1, 
	 		               equipname  : equipname1, 
                                       machine    : machine1,
				       ordqty     : ordqty1, 
                                       recqty     : recdqty1,
                                       issqty     : issqty1,
                                       authflag   : author1,
                                       purpose    : loadindentDetailsdatastore.getAt(j).get('ind_purpose'),
                                       stock      : loadindentDetailsdatastore.getAt(j).get('ind_stock'),
		                       StdLifeTime : loadindentDetailsdatastore.getAt(j).get('ind_std_lifetime'),
		                       ActLifeTime : loadindentDetailsdatastore.getAt(j).get('ind_act_lifetime'),
		                       Reason : loadindentDetailsdatastore.getAt(j).get('ind_reason'),
                                       hodauth    : loadindentDetailsdatastore.getAt(j).get('ind_hod_auth'),
                                       purauth    : loadindentDetailsdatastore.getAt(j).get('ind_po_auth'),

                                   })
                                );

	             	        grid_tot();
       

                             } // for loop end

                         }  
                         else {  
                            alert("INDENT Number not found..."); 
                         }  // if end
            
                                if (poqty > 0) 
                                {   
                                   alert("Already PO raised for this Indent Number.. You can't Modify the Indent");
                                   Ext.getCmp('save').setDisabled(true); 
                                   txtPassword.show();  
                                }
                                else
                                {

                                   Ext.getCmp('save').setDisabled(false);   
                                   txtPassword.hide();
                                 } 


                      }  // call back function end
                   });

               }

	}
} 
   });
   

   var txtIndno = new Ext.form.NumberField({
        fieldLabel  : 'Indent No',
        id          : 'txtIndno',
        width       : 100,
        name        : 'ind_no',
	readOnly:true,
        enableKeyEvents: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
           keyup:function(){

//alert(txtIndno.getValue());
//alert(Ginfinid);
//alert(Gincompcode);

              if (viewopt == 1 && Number(txtIndno.getValue()) > 0 )  
               {
                    loadindentDetailsdatastore.removeAll(); 
                    loadindentDetailsdatastore.load({
                       url: 'ClsIndent.php',
                       params:
                       {
                          task:"loadindentdetails",
                          indno:txtIndno.getValue(),
                          finid:Ginfinid,
                          compcode:Gincompcode

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=loadindentDetailsdatastore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  
  //alert(loadindentDetailsdatastore.getAt(0).get('ind_dept_code'));
                          if (loadindentDetailsdatastore.getAt(0).get('ind_auth_flag') == "Y") 
                          {
                              Ext.getCmp('save').setDisabled(false);                      
                              alert("Indent Already Authorized .. You Can't Edit");
                          }
                         // else { Ext.getCmp('save').setDisabled(false);}
                          


                          inddept = loadindentDetailsdatastore.getAt(0).get('ind_dept_code');
                      	  indsection= loadindentDetailsdatastore.getAt(0).get('ind_setcion');
                          cmbmachine.setRawValue(loadindentDetailsdatastore.getAt(0).get('ind_machine'));
/*

				loadsectionDataStore.removeAll();
		        	loadsectionDataStore.load({
		                url: 'ClsIndent.php',
		                params:
		                    {
		                        task:"loadsection",
		                        compcode:Gincompcode,
					finid:Ginfinid,
					dept:inddept,
		                        machine:indplant,
		               
		                    }
		                });      
*/
				loadequipmentDataStore.removeAll();
				loadequipmentDataStore.load({
		                url: 'ClsIndent.php',
		                params:
		                    {
		                        task:"loadequipment",
		                        compcode:Gincompcode,
					finid:Ginfinid,
					section:indsection,
					machine:indplant,
					dept : inddept
		                    }
		                }); 
			       grid_tot();

                          dtpDate.setRawValue(Ext.util.Format.date(loadindentDetailsdatastore.getAt(0).get('ind_date'),"d-m-Y"));
                          cmbdept.setValue(loadindentDetailsdatastore.getAt(0).get('ind_dept_code')); 
                          txtindentby.setRawValue(loadindentDetailsdatastore.getAt(0).get('ind_prepared_by'))
/*
                             if (loadindentDetailsdatastore.getAt(0).get('minh_type') == 'C')
                             {
                                 Ext.getCmp('opt_select').setValue(1);
                             }
                             else
                             {
                                 Ext.getCmp('opt_select').setValue(2);
                             }  */

                             for(var j=0; j<cnt; j++)
		             { 
                          inddept = loadindentDetailsdatastore.getAt(j).get('ind_dept_code');
                          indplant = loadindentDetailsdatastore.getAt(j).get('ind_plant');

                               var slno1          = loadindentDetailsdatastore.getAt(j).get('ind_slno');
                               var itemname1      = loadindentDetailsdatastore.getAt(j).get('item_name');
                               var qty1           = loadindentDetailsdatastore.getAt(j).get('ind_qty');
                               var value1         = loadindentDetailsdatastore.getAt(j).get('ind_value');
			       var duedate1       = loadindentDetailsdatastore.getAt(j).get('ind_due_date'); 
                               var approval1      = loadindentDetailsdatastore.getAt(j).get('ind_approval_status');
                               var status1        = loadindentDetailsdatastore.getAt(j).get('ind_status');
                               var author1        = loadindentDetailsdatastore.getAt(j).get('ind_auth_flag');
                               var ordqty1        = loadindentDetailsdatastore.getAt(j).get('ind_po_qty');
                               var recdqty1       = loadindentDetailsdatastore.getAt(j).get('ind_rec_qty');
                               var issqty1        = loadindentDetailsdatastore.getAt(j).get('ind_iss_qty');
			       var remarks1       = loadindentDetailsdatastore.getAt(j).get('ind_remarks');
                               var itemcode1      = loadindentDetailsdatastore.getAt(j).get('ind_item_code');
                               var indtype1       = loadindentDetailsdatastore.getAt(j).get('ind_type');
 		               var sectioncode1    = loadindentDetailsdatastore.getAt(j).get('ind_section');
 		               var sectionname1    = loadindentDetailsdatastore.getAt(j).get('section_name');
	 		       var equipcode1     = loadindentDetailsdatastore.getAt(j).get('equip_code');
	 		       var equipname1     = loadindentDetailsdatastore.getAt(j).get('equip_name');
                               var machine1       = loadindentDetailsdatastore.getAt(j).get('ind_machine');
                               var RowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                 new dgrecord({
                                       slno       : slno1,      
                                       itemname   : itemname1,  
                                       qty        : qty1,       
                                       value      : value1, 
                                       duedate    : Ext.util.Format.date(duedate1,"Y-m-d"),    	
                                       approval   : approval1,    
                                       remarks    : remarks1 ,   
                                       itemcode   : itemcode1,   
                                       indtype    : indtype1,   
 	                               sectioncode : sectioncode1, 
 		                       sectionname : sectionname1, 
	 		               equipcode  : equipcode1, 
	 		               equipname  : equipname1, 
                                       machine    : machine1,
				       ordqty     : ordqty1, 
                                       recqty     : recdqty1,
                                       issqty     : issqty1,
                                       authflag   : author1,
                                       purpose    : loadindentDetailsdatastore.getAt(j).get('ind_purpose'),
                                       stock      : loadindentDetailsdatastore.getAt(j).get('ind_stock'),
                                   })
                                );

	             	        grid_tot();
                             } // for loop end

                         }  
                         else {  
                            alert("INDENT Number not found..."); 
                         }  // if end
            
                      }  // call back function end
                   });

               }

           }
        }             
   });
   


  function datecheck()
  {

        var dt_today = new Date();
        var dtgrn = dtpDate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();

        Ext.getCmp('save').setDisabled(false);  

        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays > 1)
        {     
             alert("You are Not Allowed to Raise the INDENT in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtpDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the INDENT in Future date");
             dtpDate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);

    if(Ext.util.Format.date(dtpDate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Indent Date is not in current finance year. Please check");
             Ext.getCmp('save').setDisabled(true);  
    }

    else if(Ext.util.Format.date(dtpDate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Indent Date is not in current finance year. Please check");
             Ext.getCmp('save').setDisabled(true);  
    }

 }

   var dtpDate = new Ext.form.DateField({
        fieldLabel : 'Date',
        id         : 'dtpDate',
        name       : 'setdate',
        format     : 'd-m-Y',
        value      : new Date(),
        readOnly   : true,
        width :90,
       enableKeyEvents: true,
 listeners:{
           change:function(){
              datecheck();
           },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            }
}
     

   });


        var cmbPurpose = new Ext.form.ComboBox({
        id: 'cmbPurpose',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        store: ['DEVELOPMENT','REPLACEMENT','CONSUMPTION','MINIMUM STOCK'],

        displayField: 'field2',
        valueField: 'field1',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:true,
        fieldLabel:'Purpose',
        editable:true,
        labelWidth:30,
        width: 130,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtStdLifeTime.focus();
             }
             },

           select :function(){
               if (cmbPurpose.getRawValue() == "REPLACEMENT" || cmbPurpose.getRawValue() == "MINIMUM STOCK" )
               { 
  
                    Ext.getCmp('txtStdLifeTime').setReadOnly(false);    
                    Ext.getCmp('txtActualLifeTime').setReadOnly(false);    
//                    Ext.getCmp('txtReason').setReadOnly(false);    
               }
               else
               { 
  
                    Ext.getCmp('txtStdLifeTime').setReadOnly(true);    
                    Ext.getCmp('txtActualLifeTime').setReadOnly(true);    
  //                  Ext.getCmp('txtReason').setReadOnly(true);    
               }
               
      
           }     
        }       
       
      });




     var cmbdept = new Ext.form.ComboBox({
        fieldLabel      : 'Department',
        width           : 250,
        displayField    : 'dept_name',
        valueField      : 'dept_code',
        hiddenName      : 'dept_name',
        id              : 'cmbdept',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loaddeptdatastore,     
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dept = cmbdept.getValue();
                           loadIndNoDatastore.removeAll();
                           loadIndNoDatastore.load({
			     url: 'clsIndent.php',
			     params:
				    {
				        task: "loadIndNoList",
				        finid: Ginfinid,
				        compcode:Gincompcode,
                                        dept    :dept,  

				    }
        		     });

                  cmbmachine.focus();
             }
       },
        select: function(){
                  cmbmachine.focus();  
                  dept = cmbdept.getValue();              
                           loadIndNoDatastore.removeAll();
                           loadIndNoDatastore.load({
			     url: 'clsIndent.php',
			     params:
				    {
				        task: "loadIndNoList",
				        finid: Ginfinid,
				        compcode:Gincompcode,
                                        dept    :dept,  

				    }
        		     });
/*	
			loadsectionDataStore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadsection",
                                compcode:Gincompcode,
				finid:Ginfinid,
				dept:cmbdept.getValue(),
                                machine:cmbmachine.getRawValue()
                       
                            }
                        });      
*/

	}
} 
   });
   
      var cmbmachine = new Ext.form.ComboBox({
        fieldLabel      : 'Machine',
        width           : 130,
        displayField    : 'machine',
        valueField      : 'machine',
        hiddenName      : 'machine',
        id              : 'cmbmachine',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
	store		:  ['PAPER MACHINE','POWER PLANT','GENERAL'],
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbSection.focus();
             }
       },
        select:function(){


/*
			loadsectionDataStore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadsection",
                                compcode:compcode,
				finid:Ginfinid,
				dept:cmbdept.getValue(),
                                machine:cmbmachine.getRawValue()
                            }
                        });      
*/
        }
    }
});

   
    var cmbSection = new Ext.form.ComboBox({
        fieldLabel      : 'Seciton',
        width           : 350,
        id              : 'cmbSection',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        displayField    : 'section_name',
        valueField      : 'section_code',
        hiddenName      : 'section_name',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: loadsectionDataStore,
        listeners:{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbEquip.focus();
             }
       },
        select:function(){



/*
			loadequipmentDataStore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadequipment",
                                compcode:compcode,
				finid:Ginfinid,
				section:cmbSection.getValue(),
				machine:cmbmachine.getRawValue(),
				dept : cmbdept.getValue()
                            }
                        });
*/         
        }
    }
});

   
     var cmbEquip = new Ext.form.ComboBox({
        fieldLabel      : 'Equipment',
        width           : 350,
        id              : 'cmbEquip',
        typeAhead       : true,
	displayField    : 'equip_name',
        valueField      : 'equip_code',
        hiddenName      : 'equip_name',
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: loadequipmentDataStore ,
        listeners:{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtItemName.focus();
             }
       },
        select: function(){

        }
    } 

   });
   
/*    
     var cmbitem = new Ext.form.ComboBox({
        fieldLabel      : 'Item',
        width           : 350,
        id              : 'cmbitem',
        typeAhead       : true,
	displayField    : 'item_name',
        valueField      : 'item_code',
        hiddenName      : 'item_name',
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        tabIndex	: 0,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: loadItemDatastore,
        listeners:{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtQty.focus();
             }
       },

            select: function(){ 
//alert(cmbitem.getValue());
                        loadItemStockDatastore.removeAll();
			loadItemStockDatastore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadItemStock",
                                itemcode:cmbitem.getValue(),
                                compcode:Gincompcode,
                                finid:Ginfinid,
                            },
                           callback: function () {
                               var cnt = loadItemStockDatastore.getCount(); 
                               if (cnt > 0) {
                                       lblunit.setText(loadItemStockDatastore.getAt(0).get('uom_short_name'));                        
                                       txtAvgCost.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStkQty.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));



                                    } else {
                                      alert('not found'); 
                                    } 
                           } 


                         });  

            }
        }



   });
*/
   
   var cmbused = new Ext.form.ComboBox({
        fieldLabel      : 'Used For',
        width           : 150,
        id              : 'cmbused',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: ['']
   });
   
    var cmbapproval = new Ext.form.ComboBox({
        fieldLabel      : 'Approval',
        width           : 180,
        id              : 'cmbapproval',
        displayField    : 'app_name',
        valueField      : 'app_code',
        hiddenName      : 'app_name',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: loadappdatastore,
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbPurpose.focus();
             }
         }, 
       }   

   });

var lblunit = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblunit',
    width       : 90,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    style:{
         color: 'Red' ,
     //    backgroundColor:'White',
         fontSize : '14px',
    }
});

var lblSpec = new Ext.form.Label({
    fieldLabel  : 'Specification of the Item',
    id          : 'lblSpec',
    width       : 600,
//        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
      labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    style:{
         color: 'Red' ,
     //    backgroundColor:'White',
         fontSize : '14px',
    }
});

    var txtby2 = new Ext.form.TextField({
        id          : 'txtby2',
        width       : 30,
        y: 230,
        x:690,
        name        : 'txtby2'
   });

    var txtspec = new Ext.form.TextArea({
        id          : 'txtspec',
        fieldLabel  : '',
        height      : 200,  
        width       : 270,
        name        : 'txtspec',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnAdd.focus();
             }
         }, 
       }  

   });

    var txtStdLifeTime = new Ext.form.TextField({
        id          : 'txtStdLifeTime',
        fieldLabel  : 'Std.Life Time',
        width       : 270,
        name        : 'txtStdLifeTime',
        readOnly    : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtActualLifeTime.focus();
             }
         }, 
       }  

   });

    var txtActualLifeTime = new Ext.form.TextField({
        id          : 'txtActualLifeTime',
        fieldLabel  : 'Act.Life Time',
        width       : 270,
        name        : 'txtActualLifeTime',
        readOnly    : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtActualLifeTime.focus();
             }
         }, 
       }  
   });

      var txtActualLifeTime = new Ext.form.TextField({
        id          : 'txtActualLifeTime',
        fieldLabel  : 'Act.Life Time',
        width       : 270,
        name        : 'txtActualLifeTime',
        readOnly    : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtReason.focus();
             }
         }, 
       }  
   });
   var txtReason = new Ext.form.TextField({
        fieldLabel  : 'Reason',
        id          : 'txtReason',
        width       : 270,
        name        : 'txtReason',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtspec.focus();
             }
         }, 
       }  
//        readOnly    : true,
   });

   var txtStkQty= new Ext.form.NumberField({
        fieldLabel  : 'Stock ',
        id          : 'txtStkQty',
        width       : 80,
        name        : 'txtStkQty',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
//        readOnly    : true,
   });
   var txtAvgCost = new Ext.form.NumberField({
        fieldLabel  : 'Avg. Cost',
        id          : 'txtAvgCost',
        width       : 80,
        name        : 'txtAvgCost',
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
  //      readOnly    : true,
   });
  
   var txtQty = new Ext.form.NumberField({
        fieldLabel  : 'Quantity',
        id          : 'txtQty',
        width       : 80,
        name        : 'txtQty',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtvalue.focus();
             }
       },
           blur:function(){
                txtvalue.setValue(Number(txtQty.getValue()) * Number(txtAvgCost.getValue()));
           },
           keyup:function(){
                txtvalue.setValue(Number(txtQty.getValue()) * Number(txtAvgCost.getValue()));
           },
        }
   });
   
   var txtvalue = new Ext.form.NumberField({
        fieldLabel  : 'Value',
        id          : 'txtvalue',
        width       : 150,
        name        : 'txtvalue',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  dtpduedate.focus();
             }
         },

        }
   });
   
   var txtbudget = new Ext.form.NumberField({
        fieldLabel  : 'Budget Bal Amt',
        id          : 'txtbudget',
        width       : 150,
        name        : 'balamt'
   });
   
     var txtIndvalue = new Ext.form.NumberField({
        fieldLabel  : 'Indent Value',
        id          : 'txtIndvalue',
        width       : 150,
        x:380,
        y:450,
        name        : 'valuindent',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
   });

     var txtindentby = new Ext.form.TextField({
        fieldLabel  : 'Indent Prepared BY',
        id          : 'txtindentby',
        width       : 370,
        name        : 'txtindentby', 
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
   });
   
   var cmbFrame = new Ext.form.ComboBox({
        fieldLabel      : 'Frame',
        width           : 150,
        displayField    : 'frame_name',
        valueField      : 'frame_code',
        hiddenName      : 'frame_name',
        id              : 'cmbFrame',
        store           : FrameDataStore,
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false
   });

function grid_tot(){
	fdbl_totalvalue=0;
        poqty = 0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+Number(sel[i].data.value);
            poqty = poqty +Number(sel[i].data.ordqty);
        }
        txtIndvalue.setValue(fdbl_totalvalue);

}

function refresh(){
	txtQty.setValue('');
        txtvalue.setValue('');
        itemcode =0;
        flxItem.hide();
	txtStdLifeTime.setRawValue('');
	txtActualLifeTime.setRawValue('');
	txtReason.setRawValue('');

        dept = 0;   
        IndentFormPanel.getForm().findField('txtspec').setValue('');
        cmbIndno.hide();

    
}



var btnRefreshSection = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 5,
        height  : 10, 
        text    : "R",
        border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
		loadsectionDataStore.load({

		 url:'ClsIndent.php',
		 params:
		 {
	 	 task:"loadsection",
		 }
		 });
        } 
     }
});
   
var btnRefreshEquipment = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 5,
        height  : 10, 
        text    : "R",
        border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
			loadequipmentDataStore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadequipment",
                                compcode:compcode,
				finid:Ginfinid,
				section:cmbSection.getValue(),
				machine:cmbmachine.getRawValue(),
				dept : cmbdept.getValue()
                            }
                        });    
        } 
     }
});

/*
var btnRefreshItem = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 5,
        height  : 10, 
        text    : "R",
        border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
		loadItemDatastore.load({

		 url:'ClsIndent.php',
		 params:
		 {
	 	 task:"loaditem",
		 finid: Ginfinid
		 }
		 });
		 }
        } 
});
*/

var btnAdd = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 70,
        height  : 50, 
        text    : "ADD  ",
        x       : 450,
        y       : 45,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
          	var addok;
	              addok ="true";
                      datecheck();
//alert(editrow);
//alert(gridedit);
        	      if (cmbdept.getValue()==0 || cmbdept.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Indent','Select Dept.....');
        	                addok="false";
        	         }
      	                 else if (cmbmachine.getRawValue()=="")
             	         {
        	                Ext.Msg.alert('Indent','Select machine..');
        	                addok="false";
        	         }
      	                 else if (cmbPurpose.getRawValue()=="")
             	         {
        	                Ext.Msg.alert('Indent','Select Purpose..');
                                cmbPurpose.focus();
        	                addok="false";
        	         }
         	         else if (cmbSection.getValue()==0 || cmbSection.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Indent','Select Group / Section..');
        	                addok="false";
        	         }
      
        	         else if (txtQty.getValue()=="" || txtQty.getValue==0)
        	         {
        	                Ext.Msg.alert('Indent','Enter Qty..');
        	                addok="false";
        	         }                    

        	         else if (txtvalue.getValue()=="" || txtvalue.getValue==0)
        	         {
        	                Ext.Msg.alert('Indent','Enter Value ..');
        	                addok="false";
        	         }     

               	         else if (cmbEquip.getValue()==0 || cmbEquip.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Indent','Select Equipment Name..');
        	                addok="false";
        	         }
               	         else if (itemcode == 0 )
        	         {
        	                Ext.Msg.alert('Indent','Select Item Name Again..');
        	                addok="false";
        	         }

                         else 
                         {
	
		           flxDetail.getSelectionModel().selectAll();
		           var selrows = flxDetail.getSelectionModel().getCount();
		           var sel = flxDetail.getSelectionModel().getSelections();
			   var cnt = 0;
                           for (var i=0;i<selrows;i++)
                           {
                              if (sel[i].data.itemname == txtItemName.getRawValue())
	                      {
                                cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")

                           {
                              if ( Number(txtQty.getValue()) < itempoqty )
                              {
                                 alert("Already Order qty is : " + itempoqty + " We can't change the Qty...");     
                              }
                              else
                              if (  Number(txtQty.getValue()) < itemrecdqty )
                              {
                                 alert("Already Received qty is : " + itemrecdqty + " We can't change the Qty...");     
                              }
                              else
                              {   
                                
             			gridedit = "false";
                        	var idx  = flxDetail.getStore().indexOf(editrow);
                                var spec = Ext.getCmp('txtspec').getValue();

		        	sel[idx].set('itemname'  , txtItemName.getRawValue());
		        	sel[idx].set('itemcode'  , itemcode);
          			sel[idx].set('qty'       , txtQty.getValue());
	         		sel[idx].set('value'     , txtvalue.getValue());
             			sel[idx].set('duedate'   , Ext.util.Format.date(dtpduedate.getValue(),"Y-m-d"));
				sel[idx].set('approval'  , cmbapproval.getValue());
				sel[idx].set('remarks'   , IndentFormPanel.getForm().findField('txtspec').getRawValue());
//				sel[idx].set('remarks'   , spec);
                                sel[idx].set('machine'   , cmbmachine.getRawValue());
                                sel[idx].set('indtype'   , indtype);
				sel[idx].set('sectioncode', cmbSection.getValue());
				sel[idx].set('sectionname', cmbSection.getRawValue());
				sel[idx].set('equipcode' , cmbEquip.getValue());
				sel[idx].set('equipname' , cmbEquip.getRawValue());
				sel[idx].set('usedfor'   , cmbused.getValue());
                         	sel[idx].set('purpose'  , cmbPurpose.getRawValue());
                                sel[idx].set('authflag'  , "N");
                                sel[idx].set('stock'     , txtStkQty.getValue());
                                sel[idx].set('StdLifeTime' , txtStdLifeTime.getRawValue());
                                sel[idx].set('ActLifeTime' , txtActualLifeTime.getRawValue());
                                sel[idx].set('Reason'     , txtReason.getRawValue());
                                sel[idx].set('hodauth'     , auth1);
                                sel[idx].set('purauth'     , auth2);
                                sel[idx].set('status'     , authstatus);

              			flxDetail.getSelectionModel().clearSelections();
                                txtItemName.setRawValue('');

                             }

		            }//if(gridedit === "true")

                            else
                            if (cnt ==0)
                            { 
                               var RowCnt = flxDetail.getStore().getCount() + 1;
                               var spec = Ext.getCmp('txtspec').getValue();
                               flxDetail.getStore().insert(
                                 flxDetail.getStore().getCount(),
                                 new dgrecord({
                                   slno:RowCnt,
				   itemcode:itemcode,
                                   itemname:txtItemName.getRawValue(),
			    	   qty:txtQty.getValue(),
			           value:txtvalue.getValue(),
				   duedate:Ext.util.Format.date(dtpduedate.getValue(),"Y-m-d"),
				   approval:cmbapproval.getValue(),
				   remarks:spec,
				   status:'0',
				   authflag:'N',

				   ordqty:0,
				   recqty:0,
				   cancel:'N',
                                   machine:cmbmachine.getRawValue(),
                                   indtype:indtype,
				   sectioncode:cmbSection.getValue(),
				   sectionname:cmbSection.getRawValue(),
			           issqty:0,
				   equipcode:cmbEquip.getValue(),
				   equipname:cmbEquip.getRawValue(),
				   usedfor:cmbused.getValue(),
				   purpose:cmbPurpose.getRawValue(),
                                   stock : txtStkQty.getValue(),
                                   StdLifeTime : txtStdLifeTime.getRawValue(),
                                   ActLifeTime : txtActualLifeTime.getRawValue(),
                                   Reason : txtReason.getRawValue(),
                                   hodauth : 'N',
                                   purauth : 'N',

                                 }) 
                               );
                                txtItemName.setRawValue('');
		            }
                            else
                            {
	                 	alert("Same Item Already Exist");
                            } 
                               grid_tot();
	          	       refresh();

            }
  }
}
});
   
   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 920,
        x: 0,
        y: 315,
        columns: [   
            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},       
            {header: "Item Name ", dataIndex: 'itemname',sortable:true,width:160,align:'left'},
            {header: "Quantity", dataIndex: 'qty',sortable:true,width:100,align:'right'},
            {header: "Value", dataIndex: 'value',sortable:true,width:100,align:'right'},
            {header: "Due Date", dataIndex: 'duedate',sortable:true,width:100,align:'left'},
            {header: "Approval", dataIndex: 'approval',sortable:true,width:100,align:'left'},
            {header: "Remarks", dataIndex: 'remarks',sortable:true,width:150,align:'left'},
            {header: "Status", dataIndex: 'status',sortable:true,width:100,align:'left'},
            {header: "HOD Auth", dataIndex: 'hodauth',sortable:true,width:100,align:'left'},
            {header: "PUR Auth", dataIndex: 'purauth',sortable:true,width:100,align:'left'},
            {header: "Item Code", dataIndex: 'itemcode',sortable:true,width:100,align:'left'},
            {header: "Ord Qty", dataIndex: 'ordqty',sortable:true,width:100,align:'left'},
            {header: "Rec Qty", dataIndex: 'recqty',sortable:true,width:100,align:'left'},
            {header: "Iss Qty", dataIndex: 'issqty',sortable:true,width:100,align:'left'},             
            {header: "Cancel", dataIndex: 'cancel',sortable:true,width:100,align:'left'},
            {header: "Ind Type", dataIndex: 'indtype',sortable:true,width:100,align:'left'},
            {header: "Section Code", dataIndex: 'sectioncode',sortable:true,width:100,align:'left'},
            {header: "Section Name", dataIndex: 'sectionname',sortable:true,width:100,align:'left'},
            {header: "Equip Code", dataIndex: 'equipcode',sortable:true,width:100,align:'left'},
            {header: "Equip Name", dataIndex: 'equipname',sortable:true,width:100,align:'left'},
            {header: "Machine", dataIndex: 'machine',sortable:true,width:100,align:'left'},
            {header: "Purpose", dataIndex: 'purpose',sortable:true,width:100,align:'left'},
            {header: "Stk", dataIndex: 'stock',sortable:true,width:100,align:'left'},
             {header: "Std.Life.Time", dataIndex: 'StdLifeTime',sortable:true,width:100,align:'left'},
            {header: "Act.Life.Time", dataIndex: 'ActLifeTime',sortable:true,width:100,align:'left'},
            {header: "Reason", dataIndex: 'Reason',sortable:true,width:100,align:'left'},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES PO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();


         		gridedit = "true";
			editrow = selrow;

                                    
                            	txtItemName.setRawValue(selrow.get('itemname'));
                            	itemcode = selrow.get('itemcode');
                                itempoqty = selrow.get('ordqty');
                                itemrecdqty = selrow.get('recqty');

			    	txtStkQty.setValue(selrow.get('stock'));
			    	txtQty.setValue(selrow.get('qty'));

			    	txtvalue.setValue(selrow.get('value'));
                                dtpduedate.setValue(Ext.util.Format.date(selrow.get('duedate'),"Y-m-d"));

				cmbapproval.setValue(selrow.get('approval'));
				cmbPurpose.setRawValue(selrow.get('purpose'));

				txtStdLifeTime.setRawValue(selrow.get('StdLifeTime'));
				txtActualLifeTime.setRawValue(selrow.get('ActLifeTime'));
				txtReason.setRawValue(selrow.get('Reason'));



                                auth1 = selrow.get('hodauth');
                                auth2 = selrow.get('purauth');
                                authstatus = selrow.get('status');




                                IndentFormPanel.getForm().findField('txtspec').setValue(selrow.get('remarks'));
				cmbmachine.setRawValue(selrow.get('machine'));

                                if (selrow.get('indtype') == 'C')
                                {
                                   Ext.getCmp('r11').setValue('b');
                                }
                                else
                                {
                                   Ext.getCmp('r12').setValue('c');
                                } 

				cmbSection.setValue(selrow.get('sectioncode'));
				cmbEquip.setValue(selrow.get('equipcode'));
				cmbused.setValue(selrow.get('usedfor'));


			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
//                   CalculatePOVal();
             }
        });         
    }
   }
   });
   

   function flxItemClick()
  {
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			if ((selrow != null)){
//				gridedit = "true";
//				editrow  = selrow;
				itemcode = selrow.get('item_code');
				txtItemName.setValue(selrow.get('item_name'));

                                txtspec.setRawValue(
selrow.get('item_spec1') +'\r\n'+ selrow.get('item_spec2')+'\r\n'+ selrow.get('item_spec3') + 
'\r\n'+ selrow.get('item_spec4') +'\r\n'+ selrow.get('item_spec5')+'\r\n'+ selrow.get('item_spec6') + 
'\r\n'+ selrow.get('item_spec7') +'\r\n'+ selrow.get('item_spec8')+'\r\n'+ selrow.get('item_spec9') + '\r\n'+ selrow.get('item_spec10'));
                                flxItem.hide();  
                                txtQty.focus();

                        loadItemStockDatastore.removeAll();
			loadItemStockDatastore.load({
                        url: 'ClsIndent.php',
                        params:
                            {
                                task:"loadItemStock",
                                itemcode:itemcode,
                                compcode:Gincompcode,
                                finid:Ginfinid,
                            },
                           callback: function () {
                               var cnt = loadItemStockDatastore.getCount(); 
                               if (cnt > 0) {
                                       lblunit.setText(loadItemStockDatastore.getAt(0).get('uom_short_name'));                        
                                       txtAvgCost.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStkQty.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));



                                    } else {
                                      alert('not found'); 
                                    } 
                           } 


                         });  
   
			}

  }

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 500,
        width: 420,
        x: 500,
        y: 35,
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
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           flxItemClick();
                        }
                     });
             },
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                flxItemClick();
		}
 
    
   }
   });



   var dtpduedate = new Ext.form.DateField({
        fieldLabel : 'Due Date',
        id         : 'dtpduedate',
        name       : 'fromdate',
        format     : 'd-m-Y',
        value      : new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        width:100,
    	enableKeyEvents: true,
        listeners   :{
        specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  cmbapproval.focus();
             }
         },

        }
   });
   
 
var radcapital = new Ext.form.Radio({id : 'r11' ,boxLabel: 'Capital', name: 'rbtag', inputValue: 'b',x:620, y:10,
     listeners: {
	         check: function (rb,checked) {
                     	if(checked===true){
		           indtype="C";
			}
                 }
                }

})

var radrevenue = new Ext.form.Radio({id : 'r12' ,boxLabel: 'Revenue', name: 'rbtag', inputValue: 'c',checked:true,x:720,y:10,
     listeners: {
	         check: function (rb,checked) {
                     	if(checked===true){
		           indtype="R";
			}
                 }
                }

})

function RefreshData(){  
        IndentFormPanel.getForm().reset();
        flxDetail.getStore().removeAll();
        viewopt = 0; 
        itempoqty = 0;
        itemrecdqty = 0;
        cmbIndno.hide();
        Ext.getCmp('txtIndno').setReadOnly(true);
        Ext.getCmp('save').setDisabled(false);  
        gridedit = "false";              
        loadindnodatastore.load({
        url:'ClsIndent.php',
        params:
        {
        task:"loadindno",
	compcode : Gincompcode,
	finid:Ginfinid
        },
	callback:function()
	{
	txtIndno.setValue(loadindnodatastore.getAt(0).get('ind_no'));
	}
	});


              //     Ext.getCmp('save').setDisabled(true);   
}

   
   var IndentFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 1330,
        height      : 590,
        bodyStyle:'background: url(/WorkOrder/icons/img1.jpg)',
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'IndentFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
//            style   :'background-color:#d7d5fa',
            style   :'background-color:#F7d555',

            fontSize:18,
            items: [
                {
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '/icons/Add.png',
                    listeners:{
                       click: function () {
                            RefreshData();
                       }   
                    }
                    
                },'-',
//EDIT
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/icons/edit.png',
                    listeners:{
                       click: function () {
                           gstFlag = "Edit";
 
                           viewopt = 1;
                           cmbIndno.show();
                           loadIndNoDatastore.removeAll();
                           loadIndNoDatastore.load({
			     url: 'clsIndent.php',
			     params:
				    {
				        task: "loadIndNoList",
				        finid: Ginfinid,
				        compcode:Gincompcode,
                                        dept    :dept,  

				    }
        		     });
                           }
                    }
                    
                },'-',
                {

//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    id:'save',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/icons/save.png' ,
	                   listeners:{
                        click: function () {


//                           alert(txtindentby.getValue());
//                           alert(Ext.getCmp('txtspec').getvalue());
	

			var gstSave;
	                    gstSave="true";
        	            if (cmbdept.getValue()==0 || cmbdept.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Indent','Select Dept.....');
        	                gstSave="false";
        	            }
        	          /*  else if (cmbmachine.getValue()==0 || cmbmachine.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Indent','Select machine..');
        	                gstSave="false";
        	            }
        	            else if (cmbapproval.getValue()==0 || cmbapproval.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Indent','Select machine..');
        	                gstSave="false";
        	            }*/

        	            else if (txtIndvalue.getValue()=="" || txtIndvalue.getValue==0)
        	            {
        	                Ext.Msg.alert('Indent','Value should not be empty..');
        	                gstSave="false";
        	            }                    
			    else if (flxDetail.rows==0)
        	            {
        	                Ext.Msg.alert('Indent','Grid should not be empty..');
        	                gstSave="false";
	                    }
 
			    else if (txtindentby.getRawValue()=="")
        	            {
        	                Ext.Msg.alert('Indent','Enter data in INDENT PREPARED BY..');
        	                gstSave="false";
	                    }
        	            else
				{
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

                           
                         
                           var indData = flxDetail.getStore().getRange();                                        
                           var indupdData = new Array();
                            Ext.each(indData, function (record) {
                                indupdData.push(record.data);
                            });

//alert(indData.length);

                         
                          var spec = Ext.getCmp('txtspec').getValue();
  
                          Ext.Ajax.request({
                            url: 'TrnIndentSave.php',
                            params :
                             {
                             	griddet	  : Ext.util.JSON.encode(indupdData),  
                       
                                cnt       : indData.length,    
                                savetype  : gstFlag,                                
				compcode  : Gincompcode,                                 
                                finid     : Ginfinid,
                                indno     : txtIndno.getValue(),
				inddate   : Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
                                entdate   : Ext.util.Format.date(new Date(),"Y-m-d"),

                                indtype   : indtype,
				preparedby: txtindentby.getRawValue(),
				approvedby: cmbapproval.getValue(),
				dept      : cmbdept.getValue(),
                                purpose   : cmbPurpose.getRawValue(),
				userid	  : userid,
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Indent Saved -" + obj['msg']);
                           
                                    IndentFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();





                                  }else
					{
Ext.MessageBox.alert("Indent Not Saved! Pls Check!- " + obj['msg']);                                                  
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/icons/refresh.png',
                    listeners:{
                       click: function () {
                            RefreshData();
                       }   
                    }
                    
                },'-',
                {
//VIEW
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/icons/view.png',
                    listeners:{
                       click: function () {


printtype = "PDF";


		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(Ginfinid);
		  var p3 = "&indno=" + encodeURIComponent(cmbIndno.getValue());
                  var param = (p1+p2+p3) ;  
                  if (printtype == "PDF") 
		     window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
	             window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 
                       }
                    } 



                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/icons/exit.png',
                    handler: function(){	
                            IndentWindow.hide();
                        }
                    
                }]
        },
        items: [

  
            {   
                xtype       : 'fieldset',
                title       : '',
                
                width       : 1300,
                height      : 520,
                x           : 8,
                y           : 4,
                border      : true,
                layout      : 'absolute',
                items: [

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 420,
                             x           : 900,
                             y           : 0,
                             border      : false,
                             items: [txtPassword]

                    },


                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 220,
                        x           : 0,
                        y           : 30,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtIndno]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 220,
                        x           : 0,
                        y           : 30,
                        defaultType : 'textfield',
                        border      : false,
                        items: [cmbIndno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 150,
                        x           : 220,
                        y           : 30,
                        labelWidth  : 35,
                        border      : false,
                        items : [dtpDate]
                    },
                     {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 400,
                        x           : 0,
                        y           : 0,
                        labelWidth  : 90,
                        border      : false,
                        items : [cmbdept]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : 'Type (Rev or Capital)',
                        width       : 200,
                        x           : 600,
                        y           : 0,
                        border      : true,
                        items : []
                    },radrevenue,radcapital,

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 250,
                        x           : 0,
                        y           : 70,
                        border      : false,
                        items: [cmbmachine]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 300,
                        x           : 520,
                        y           : 70,
                        border      : false,
                        items: [cmbPurpose]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 450,
                        x           : 520,
                        y           : 100,
                        border      : false,
                        items: [txtStdLifeTime]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 450,
                        x           : 520,
                        y           : 130,
                        border      : false,
                        items: [txtActualLifeTime]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 450,
                        x           : 520,
                        y           : 160,
                        border      : false,
                        items: [txtReason]
                    },


                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 500,
                        x           : 0,
                        y           : 100,
                        border      : false,
                        items: [cmbSection,cmbEquip,txtItemName,txtQty,txtvalue,dtpduedate]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 300,
                        x           : 0,
                        y           : 270,
                        border      : false,
                        items: [cmbapproval]
                    },

                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 80,
                        x           : 450,
                        y           : 95,
                        border      : false,
                        items: [btnRefreshSection]
                    }, 

                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 80,
                        x           : 450,
                        y           : 124,
                        border      : false,
                        items: [btnRefreshEquipment]
                    }, 

/*
                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 80,
                        x           : 450,
                        y           : 150,
                        border      : false,
                        items: [btnRefreshItem]
                    }, 

*/


                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 130,
                        width       : 500,
                        x           : 480,
                        y           : 200,
                        border      : false,
                        items: [txtStkQty]
                    }, 
                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 500,
                        x           : 740,
                        y           : 200,
                        border      : false,
                        items: [txtAvgCost]
                    }, 
                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 100,
                        x           : 185,
                        y           : 185,
                        border      : false,
                        items: [lblunit]
                    },                    

                  

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 300,
				            x           : 950,
				            y           : 80,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblSpec]
				        },
    
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 400,
                        x           : 850,
                        y           : 100,
                        border      : false,
                        items: [txtspec]
                    },
/*
                    {
                    xtype: 'textarea',
                    fieldLabel: 'Specification',
                    labelWidth  :100,

                    width:300,
                    name: 'arearText',
                    x           : 500,
                    y           : 200,
                    id : 'txtspec'
                    }, 


                    { 
                        xtype       : 'fieldset',
                        title       : 'Indent Prepared By',
                        labelWidth  : 1,
                        width       : 200,
                        x           : 655,
                        y           : 430,
                        border      : true,
                        items: [{
                    xtype: 'textfield',
                    fieldLabel: '',
                    width:200,
                    name: 'txtindentby',
                    id: 'txtindentby',
                    
                }]
                    }

*/
  
                  {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 100,
                        x           : 860,
                        y           : 250,                        
                        border      : false,
                        items: [btnAdd]
                    },flxDetail 
                    ,{
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 120,
                        width       : 300,
                        x           : 600,
                        y           : 465,
                        height:45,
                        border      : false,
                        readOnly    : true,
                        items: [txtIndvalue]
                    },

                    {
                        xtype       : 'fieldset',
                        labelWidth  :150 ,
                        width       :300,
                        x           :100,
                        y           :465,
                        border      : false,
                        items: [txtindentby]
                   },
                   flxItem,
                    
                ]
            }
        ]
    });
    
 
    
    var IndentWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : ' Indent',
        items       : IndentFormPanel,
        layout      : 'absolute',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){


       //            Ext.getCmp('save').setDisabled(true); 



       cmbIndno.hide();
        flxItem.hide();



                  var dt = dtpDate.getValue();
                  dtpduedate.setValue(dt.getDate()+20);
                  txtPassword.hide();
                                gridedit = "false";  
				loadindnodatastore.load({
                        	 url:'ClsIndent.php',
                        	 params:
                       		 {
                         	 task:"loadindno",
				 compcode : Gincompcode,
				 finid:Ginfinid
                        	 },
				callback:function()
				{

				txtIndno.setValue(loadindnodatastore.getAt(0).get('ind_no'));
				}
				 });

				loaddeptdatastore.load({
                        	 url:'ClsIndent.php',
                        	 params:
                       		 {
                         	 task:"loaddept"
                        	 }
				 });

				loadappdatastore.load({
                        	 url:'ClsIndent.php',
                        	 params:
                       		 {
                         	 task:"loadappno"
                        	 }
				 });

				loadItemDatastore.load({

                        	 url:'ClsIndent.php',
                        	 params:
                       		 {
                         	 task:"loaditem",
				 finid: Ginfinid
                        	 }
				 });
	   			 }
			
		}
    });
    IndentWindow.show();  
});

