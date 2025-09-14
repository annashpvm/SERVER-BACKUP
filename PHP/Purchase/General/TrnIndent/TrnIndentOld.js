  Ext.onReady(function(){
   Ext.QuickTips.init();

//      autoLoad : true,

   var Ginfinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');   
   var editrow = 0;
   var gridedit = "false";
   var viewopt = 0; 
   var gstFlag = "Add";
  var indtype = "R";
  var inddept = 0;
  var indsection = 0;
  var indplant = "";
  var compcode =0;



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


          'item_code', 'item_name'
 

      ]),
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
'ind_no','ind_date', 'ind_fin_code', 'ind_type', 'ind_option', 'ind_dept_code', 'ind_slno', 'ind_item_code', 'ind_qty', 'ind_rate', 'ind_value', 'ind_po_qty', 'ind_rec_qty', 'ind_iss_qty', 'ind_bal_qty', 'ind_remarks', 'ind_due_date', 'ind_approval_status', 'ind_status', 'ind_auth_flag', 'ind_ent_date', 'ind_remarks', 'ind_cancel_status', 'ind_machine', 'ind_purtype', 'ind_section', 'ind_hod_auth', 'ind_issue_SHVPM', 'ind_issue_vjpm', 'ind_issue_cogen', 'ind_issue_solvent', 'ind_equip', 'ind_plant', 'ind_prepared_by', 'item_name', 'app_name', 'section_code', 'section_name', 'section_part', 'cancelflag','equip_code', 'equip_name','equip_part', 'uom_code', 'uom_name', 'uom_short_name', 'item_avg_rate', 'item_stock','ind_purpose','ind_stock' ,
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
			item    : txtSearch.getRawValue(),
		},
        });
}


var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  150,
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
   
   var dtpDate = new Ext.form.DateField({
        fieldLabel : 'Date',
        id         : 'dtpDate',
        name       : 'setdate',
        format     : 'd-m-Y',
        value      : new Date(),
        readOnly   : true,
        width :90
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
               if (cmbPurpose.getRawValue() == "REPLACEMENT")
               { 
  
                    Ext.getCmp('txtStdLifeTime').setReadOnly(false);    
                    Ext.getCmp('txtActualLifeTime').setReadOnly(false);    
                    Ext.getCmp('txtReason').setReadOnly(false);    
               }
               else
               { 
  
                    Ext.getCmp('txtStdLifeTime').setReadOnly(true);    
                    Ext.getCmp('txtActualLifeTime').setReadOnly(true);    
                    Ext.getCmp('txtReason').setReadOnly(true);    
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
                  cmbmachine.focus();
             }
       },
        select: function(){
                  cmbmachine.focus();                

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
                  cmbitem.focus();
             }
       },
        select: function(){

        }
    } 

   });
   
    
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
                  txtqty.focus();
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

    var txtby2 = new Ext.form.TextField({
        id          : 'txtby2',
        width       : 30,
        y: 230,
        x:690,
        name        : 'txtby2'
   });

    var txtspec = new Ext.form.TextArea({
        id          : 'txtspec',
        fieldLabel  : 'Specification',
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
  
   var txtqty = new Ext.form.NumberField({
        fieldLabel  : 'Quantity',
        id          : 'txtqty',
        width       : 80,
        name        : 'txtqty',
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
                txtvalue.setValue(Number(txtqty.getValue()) * Number(txtAvgCost.getValue()));
           },
           keyup:function(){
                txtvalue.setValue(Number(txtqty.getValue()) * Number(txtAvgCost.getValue()));
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
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+Number(sel[i].data.value);
        }
        txtIndvalue.setValue(fdbl_totalvalue);
}

function refresh(){
	txtqty.setValue('');
        txtvalue.setValue('');


	txtStdLifeTime.setRawValue('');
	txtActualLifeTime.setRawValue('');
	txtReason.setRawValue('');


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
        	                Ext.Msg.alert('Indent','Select Purpoase..');
                                cmbPurpose.focus();
        	                addok="false";
        	         }
         	         else if (cmbSection.getValue()==0 || cmbSection.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Indent','Select Group / Section..');
        	                addok="false";
        	         }
      
        	         else if (txtqty.getValue()=="" || txtqty.getValue==0)
        	         {
        	                Ext.Msg.alert('Indent','Enter Qty..');
        	                addok="false";
        	         }                    


               	         else if (cmbEquip.getValue()==0 || cmbEquip.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Indent','Select Equipment Name..');
        	                addok="false";
        	         }

                         else 
                         {
	
		           var itemseq = cmbitem.getValue();
		           flxDetail.getSelectionModel().selectAll();
		           var selrows = flxDetail.getSelectionModel().getCount();
		           var sel = flxDetail.getSelectionModel().getSelections();
			   var cnt = 0;
                           for (var i=0;i<selrows;i++)
                           {
                              if (sel[i].data.itemname == cmbitem.getRawValue())
	                      {
                                cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")

                           {
             			gridedit = "false";
                        	var idx = flxDetail.getStore().indexOf(editrow);
 
		        	sel[idx].set('itemname'  , cmbitem.getRawValue());
		        	sel[idx].set('itemcode'  , cmbitem.getValue());
          			sel[idx].set('qty'       , txtqty.getValue());
	         		sel[idx].set('value'     , txtvalue.getValue());
             			sel[idx].set('duedate'   , Ext.util.Format.date(dtpduedate.getValue(),"Y-m-d"));
				sel[idx].set('approval'  , cmbapproval.getValue());
				sel[idx].set('remarks'   , IndentFormPanel.getForm().findField('txtspec').getValue());
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



              			flxDetail.getSelectionModel().clearSelections();
                              

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
                                   itemname:cmbitem.getRawValue(),
			    	   qty:txtqty.getValue(),
			           value:txtvalue.getValue(),
				   duedate:Ext.util.Format.date(dtpduedate.getValue(),"Y-m-d"),
				   approval:cmbapproval.getValue(),
				   remarks:spec,
				   status:'',
				   authflag:'N',
				   itemcode:cmbitem.getValue(),
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
  

                                 }) 
                               );

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
            {header: "Item Name ", dataIndex: 'itemname',sortable:true,width:120,align:'left'},
            {header: "Quantity", dataIndex: 'qty',sortable:true,width:100,align:'right'},
            {header: "Value", dataIndex: 'value',sortable:true,width:100,align:'right'},
            {header: "Due Date", dataIndex: 'duedate',sortable:true,width:100,align:'left'},
            {header: "Approval", dataIndex: 'approval',sortable:true,width:100,align:'left'},
            {header: "Remarks", dataIndex: 'remarks',sortable:true,width:100,align:'left'},
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

                            	cmbitem.setRawValue(selrow.get('itemname'));
                            	cmbitem.setValue(selrow.get('itemcode'));

			    	txtStkQty.setValue(selrow.get('stock'));
			    	txtqty.setValue(selrow.get('qty'));

			    	txtvalue.setValue(selrow.get('value'));
                                dtpduedate.setValue(Ext.util.Format.date(selrow.get('duedate'),"Y-m-d"));

				cmbapproval.setValue(selrow.get('approval'));
				cmbPurpose.setRawValue(selrow.get('purpose'));

				txtStdLifeTime.setRawValue(selrow.get('StdLifeTime'));
				txtActualLifeTime.setRawValue(selrow.get('ActLifeTime'));
				txtReason.setRawValue(selrow.get('Reason'));


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
   

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
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
				cmbitem.setValue(selrow.get('item_code'));
                                  
	     

			}
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
        cmbIndno.hide();
        Ext.getCmp('txtIndno').setReadOnly(true);
        Ext.getCmp('save').setDisabled(false);                
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/icons/view.png'
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
                
                width       : 320,
                height      : 520,
                x           : 990,
                y           : 4,
                border      : true,
                layout      : 'absolute',
                items: [
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
  
            {   
                xtype       : 'fieldset',
                title       : '',
                
                width       : 970,
                height      : 520,
                x           : 8,
                y           : 4,
                border      : true,
                layout      : 'absolute',
                items: [
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
                        items: [cmbSection,cmbEquip,cmbitem,txtqty,txtvalue,dtpduedate]
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
                        labelWidth  : 90,
                        width       : 400,
                        x           : 480,
                        y           : 240,
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
	listeners:{
               show:function(){
       cmbIndno.hide();
                  var dt = dtpDate.getValue();
                  dtpduedate.setValue(dt.getDate()+20);

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

