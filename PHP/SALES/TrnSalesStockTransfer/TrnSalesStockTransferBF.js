Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

   var gstFlag = "Add";
   var st_no=0;
   var end_no=0;
   var sizechk = 0;

   var loadEntryNoDetailsdatastore = new Ext.data.Store({
      id: 'loadEntryNoDetailsdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntryNoDetails_BF_GSM"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'tr_date', 'tr_srno', 'tr_wt', 'tr_sono', 'tr_size_from', 'tr_size_to', 'oldsizename', 'newsizename'
      ]),
    });


   var loadEntryNoeditdatastore = new Ext.data.Store({
      id: 'loadEntryNoeditdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPackSlipNoedit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'tr_entno'
      ]),
    });



   var loadEntryNodatastore = new Ext.data.Store({
      id: 'loadEntryNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findEntryNo_BF_GSM"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'entno'
      ]),
    });


var loadsizedataStore = new Ext.data.Store({
      id: 'loadsizedataStore',
      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name'
      ]),
    });
var loadNewSizeDataStore = new Ext.data.Store({
      id: 'loadNewSizeDataStore',
      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadNewSize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name'
      ]),
    });

var loadItemCheckdataStore = new Ext.data.Store({
      id: 'loadItemCheckdataStore',
      autoLoad:true,  
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"itemcheck_in_so"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos'
      ]),
    });


 loadfromtoboxDatastore= new Ext.data.Store({
      id: 'loadfromtoboxDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfromtobox"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','rollno','stk_sono'
      ]),
    });


var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgriddetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','stk_var_code','var_name','stk_sr_no','stk_wt','var_code','unittype','var_grpcode','stk_sono','ordh_sodate'
      ]),
    });


var loadSOnodatastore = new Ext.data.Store({
      id: 'loadSOnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono'
      ]),
    });




var loadSOnoTOdatastore = new Ext.data.Store({
      id: 'loadSOnoTOdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOnoTO"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono'
      ]),
    });

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
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

 var loadCustomerStore = new Ext.data.Store({
      id: 'loadCustomerStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSalesStockTransfer.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOcustomer"}, // this parameter asks for listing
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

var cmbCustomerFrom = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomerFrom',
        typeAhead       : true,
        mode            : 'local',
        store           : loadCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            select: function () {
                cmbSONO.reset();
                cmbSize.reset();
                flxstartno.getStore().removeAll();
                flxendno.getStore().removeAll();
                flxDetail.getStore().removeAll();

                loadsizedataStore.removeAll();

		loadSOnodatastore.removeAll();
		loadSOnodatastore.load({
		url: 'ClsSalesStockTransfer.php',
		params: {
		    task: 'loadSOno',
		    customer:cmbCustomerFrom.getValue(),
		    fincode: GinFinid,
		    compcode: Gincompcode,
                    userid  : UserId,
		},
		callback:function() 
		{
                }
               }); 


	   }
        }
});




var dgrecord = Ext.data.Record.create([]);
var fm = Ext.form;

var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
	enableKeyEvents: true,        
        store: loadfromtoboxDatastore,
        style : "font-size:14px;font-weight:bold;color:#0080ff",  
        height: 240,
        width: 150,
        x: 0,
        y: 0,
        columns: [
            {header: "Start No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

        ],
        listeners: {
            cellclick: function (flxstartno, rowIndex, cellIndex, e) {

//if (sizechk ==1)
//{
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.rollno;
                     
	//	     txtStartNo.setRawValue(st_no);
                }

	        var reelrows = flxstartno.getStore().getCount();
            //           flxstartno.getSelectionModel().selectAll();
               var selendno = flxstartno.getSelectionModel().getSelections();

            },
            dblclick :function () {
                loadgriddetailsDatastore.removeAll();
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.rollno;
                     
//		     txtStartNo.setRawValue(st_no);
                     end_no = selected_rows[i].data.rollno;
//		     txtEndNo.setRawValue(end_no);		     
                }  
		var firstno = st_no;
		var lastno = end_no;
		loadgriddetailsDatastore.load({
			url: 'ClsSalesStockTransfer.php',
			params: {
			task: 'loadgriddetails',
			varitycode:cmbSize.getValue(),
			stnofrom:st_no,
			stnoto:end_no,
                        unit:rbunit,
                        sono:cmbSONO.getValue(),
			compcode:Gincompcode
			
		},
		callback: function () {
			flxDetail.getSelectionModel().selectAll();
		        var selrows = flxDetail.getSelectionModel().getCount();
		        var sel = flxDetail.getSelectionModel().getSelections();
			var stkcnt  = 0;
                        stkcnt  = 0;
              		for (var i=firstno;i<=lastno;i++)
                        {
  
                         for (rr = 0;rr< reelrows; rr++)
                         {
                             if (selendno[rr].data.rollno == i)
                             {                     
//alert(selendno[rr].data.rollno);
                                 for (var k=0;k<selrows;k++) 
                                 { 
                                    if (sel[k].data.stksrno == selendno[rr].data.rollno)
                                    {
                                        stkcnt = stkcnt + 1;
//alert(sel[k].data.stksrno);
                                     }
                                 } 
                             }    
                         }   
                        }   
                    
     			if (stkcnt > 0)
			{
			        Ext.MessageBox.alert("Alert Msg","Same Number Already exists");
		        }
			else
          		{
   	                    var cnt=loadgriddetailsDatastore.getCount();
			    if(cnt>0)
		            {                        
			            for(var j=0; j<cnt; j++)
		                    { 
		                        var RowCnt = flxDetail.getStore().getCount() + 1;  
		                        flxDetail.getStore().insert(
		                        flxDetail.getStore().getCount(),
		                        new dgrecord({
                                             stksrno       : loadgriddetailsDatastore.getAt(j).get('stk_sr_no'), 
                                             stkwt         : loadgriddetailsDatastore.getAt(j).get('stk_wt'),  
                                             OldSizeName   : cmbSize.getRawValue(),
					     OldSizeCode   : cmbSize.getValue(),
					     sono          : cmbSONO.getValue(),
					     NewSizeName   : cmbNewSize.getRawValue(),
					     NewSizeCode   : cmbNewSize.getValue(),
		               		})
		    			);
//					grid_tot();
		                   }
                            } //if end		
                            st_no=0;   
                            end_no=0;                          
    			}
                }
               });

               st_no=0;
               end_no=0;    

// }
 //else
// {
//    alert("Size not available in the Destination SO Number...");
// }                      
    
         }


     }
});




var flxendno = new Ext.grid.EditorGridPanel({
	frame: false,
	sm: new Ext.grid.RowSelectionModel(),
	stripeRows: true,
	hideHeaders: false,
	scrollable: true,
	store: loadfromtoboxDatastore,
	height: 240,
	width: 150,
	x: 0,
	y: 0,
	columns: [
	    {header: "End No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

	],

	listeners: {

	    cellclick: function (flxendno, rowIndex, cellIndex, e) {


            if (Number(cmbNewSize.getValue()) == 0)
            {
                 alert("Select New Size....");
            }             
            else
            {     
		loadgriddetailsDatastore.removeAll();
		var selected_rows = flxendno.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++)
                {
                     end_no = selected_rows[i].data.rollno;
	//	     txtEndNo.setRawValue(end_no);
                }
                var reelrows = flxendno.getStore().getCount();
                flxendno.getSelectionModel().selectAll();
	        var selendno = flxendno.getSelectionModel().getSelections();

           
                var firstno = st_no;
                var lastno = end_no; 
		if (firstno ==0) {
		    firstno = end_no;
		    st_no = end_no;
		}
                loadgriddetailsDatastore.load({
			url: 'ClsSalesStockTransfer.php',
			params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom: st_no,
				stnoto:end_no,
				compcode:Gincompcode,
		                sono:cmbSONO.getValue(),
	                },
			 callback: function () {
				flxDetail.getSelectionModel().selectAll();
			        var selrows = flxDetail.getSelectionModel().getCount();
			        var sel = flxDetail.getSelectionModel().getSelections();
				var stkcnt  = 0;
                                stkcnt  = 0;
	                 	for (var i=firstno;i<=lastno;i++)
                                {
          
                                 for (rr = 0;rr< reelrows; rr++)
                                 {

                                     if (selendno[rr].data.rollno == i)
                                     {                     
//alert(selendno[rr].data.rollno);
                                         for (var k=0;k<selrows;k++) 
                                         { 
                                            if (sel[k].data.stksrno == selendno[rr].data.rollno)
                                            {
                                                stkcnt = stkcnt + 1;
//alert(sel[k].data.stksrno);
                                             }
                                         } 
                                     }    
                                 }   
                                }    

                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Number Already exists");
			        }
				else
				{
	   			  	var cnt=loadgriddetailsDatastore.getCount();
//alert(cnt);

//					alert(loadgriddetailsDatastore.getAt(0).get('stk_sono'));
				   	if(cnt>0)
					{     

                   
				           	for(var j=0; j<cnt; j++)
						{ 

		                                var RowCnt = flxDetail.getStore().getCount() + 1;  
		                                flxDetail.getStore().insert(
		                                flxDetail.getStore().getCount(),
		                                new dgrecord({
                                                    stksrno       : loadgriddetailsDatastore.getAt(j).get('stk_sr_no'), 
                                                    stkwt         : loadgriddetailsDatastore.getAt(j).get('stk_wt'),  
                                                    OldSizeName   : cmbSize.getRawValue(),
						    OldSizeCode   : cmbSize.getValue(),
						    sono          : cmbSONO.getValue(),
						    NewSizeName   : cmbNewSize.getRawValue(),
						    NewSizeCode   : cmbNewSize.getValue(),


                                      	 	    
		                           	})
		                             	);
		                         	grid_tot();
						}
					}		
            			}
				}
				});
                        	flxstartno.getSelectionModel().clearSelections();
                              	flxendno.getSelectionModel().clearSelections();
				st_no=0;
				end_no=0;  

                   }

 
           }
          }   
    });
var FlxBoxDetailDatastore = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'FlxBoxDetailDatastore'
        },[
           'varname','unittype','stksrno','stkwt','varcode','varunit','vargrpcode','stkfinyear','stkfincode','vartruck'
        ])
    });


   var txtTotQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty(Kgs)',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    });





var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:400,
    y:10,
    height: 240,
    hidden:false,
    width: 600,
//    font-size:18px,
    columns:
    [
        {header: "Number",  dataIndex: 'stksrno',sortable:true,width:110,align:'left'},
	{header: "Weight",  dataIndex: 'stkwt',sortable:true,width:80,align:'left'},
	{header: "SONO",    dataIndex: 'sono',sortable:true,width:80,align:'left'},
	{header: "Old Size",dataIndex: 'OldSizeName',sortable:true,width:110,align:'left'},
	{header: "Old Size",dataIndex: 'OldSizeCode',sortable:true,width:80,align:'left',hidden:true},
	{header: "New Size",dataIndex: 'NewSizeName',sortable:true,width:110,align:'left'},
	{header: "New Size",dataIndex: 'NewSizeCode',sortable:true,width:80,align:'left',hidden:true},


    ],
    store: [],
    listeners:{	

'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Stock Transfer',
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
               }
            }
         });
   
     
                       
    }

   }
});



var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : 'SO No.',
        width           : 110,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSOnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            select: function () {
                cmbSize.reset();
                flxstartno.getStore().removeAll();
                flxendno.getStore().removeAll();
                loadsizedataStore.removeAll();
		loadsizedataStore.load({
		url: 'ClsSalesStockTransfer.php',
		params: {
		    task: 'loadsize',
		    fincode  : GinFinid,
		    compcode : Gincompcode,
		    sono     : cmbSONO.getRawValue()
		},
		callback:function()
		{
                }
 	     });
         }

        }
});


var cmbNewSize = new Ext.form.ComboBox({
        fieldLabel      : 'NEW SIZE',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbNewSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadNewSizeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
            select: function () {
/*
                cmbSONOTo.reset();
		loadSOnoTOdatastore.removeAll();
		loadSOnoTOdatastore.load({
		url: 'ClsSalesStockTransfer.php',
		params: {
		    task: 'loadSOnoTO',
		    customer:cmbNewSize.getValue(),
		    fincode: GinFinid,
		    compcode: Gincompcode,
		},
		callback:function() 
		{

                }
               }); 


*/

	   }
        }
});




var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners:{
           select: function () {
                        flxstartno.getStore().removeAll();
                        flxendno.getStore().removeAll();
			loadfromtoboxDatastore.load({
			url: 'ClsSalesStockTransfer.php',
			params: {
			    task: 'loadfromtobox',
	                    sizecode : cmbSize.getValue(),
			    fincode  : GinFinid,
			    compcode : Gincompcode,
                	    sono     : cmbSONO.getRawValue(),
			}	
			});
                        loadNewSizeDataStore.removeAll();
			loadNewSizeDataStore.load({
			url: 'ClsSalesStockTransfer.php',
			params: {
			    task: 'loadNewSize',
	                    sizecode : cmbSize.getRawValue(),
			    fincode  : GinFinid,
			    compcode : Gincompcode,
			}	
			});


		   }
	     }
});


var cmbEntryNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No.',
        width           :  60,
        displayField    : 'tr_entno', 
        valueField      : 'tr_entno',
        hiddenName      : '',
        id              : 'cmbEntryNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEntryNoeditdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
                select: function () {              
                   flxDetail.getStore().removeAll();
                   flxstartno.getStore().removeAll();
                   flxendno.getStore().removeAll();



                   loadEntryNoDetailsdatastore.load({
		   url: 'ClsSalesStockTransfer.php',
		   params: {
			    task: 'loadEntryNoDetails_BF_GSM',
			    finid    : GinFinid,
			    compcode : Gincompcode,
                            entryno  : cmbEntryNo.getValue(),
			},
                        callback:function()
			{
    //                       dtEntry.setRawValue(Ext.util.Format.date(loadEntryNoDetailsdatastore.getAt(0).get('tr_date'),"d-m-Y"));  


                           flxDetail.getStore().removeAll();
                           var cnt = loadEntryNoDetailsdatastore.getCount();


                           txtEntryNo.setValue(loadEntryNoDetailsdatastore.getAt(0).get('tr_entno'));



                           for(var j=0; j<cnt; j++)
			   {
                              var RowCnt = flxDetail.getStore().getCount() + 1;  
                              flxDetail.getStore().insert(
                                  flxDetail.getStore().getCount(),
                                  new dgrecord({


                                    stksrno       : loadEntryNoDetailsdatastore.getAt(j).get('tr_srno'), 
                                    stkwt         : loadEntryNoDetailsdatastore.getAt(j).get('tr_wt'),  
				    sono          : loadEntryNoDetailsdatastore.getAt(j).get('tr_sono'), 
                                    OldSizeName   : loadEntryNoDetailsdatastore.getAt(j).get('oldsizename'), 
				    OldSizeCode   : loadEntryNoDetailsdatastore.getAt(j).get('tr_size_from'), 
				    NewSizeName   : loadEntryNoDetailsdatastore.getAt(j).get('newsizename'), 
				    NewSizeCode   : loadEntryNoDetailsdatastore.getAt(j).get('tr_size_to'), 
                                  })
                              );

                           }
                           grid_tot();   
                           Ext.getCmp('save').setDisabled(true);
                        }                                	
		  });

                }
        }
});

   var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  60,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,
        listeners:{
                  select:function(){
                  } 
        }  
    });


    var dtEntry = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtEntry',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });


function grid_tot(){

        var reels = 0;
        var wt = 0;	

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {   
              reels=reels+1;
              wt=wt+Number(sel[i].data.stkwt);
        }  
         txtTotQty.setValue(wt);
}


var TrnSalesStockTransferPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : '',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesStockTransferPanel',
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
                    Ext.getCmp('cmbEntryNo').show();
//                    flxdetail.getStore().removeAll();
                    loadEntryNoeditdatastore.load({
		    url: 'ClsTrnSalesStockTransfer.php',
		    params: {
			    task: 'loadEntryNoList_BF_GSM',
			    finid: GinFinid,
			    compcode:Gincompcode,
                    }
                    });     
                }
            }
        },'-',
          {
//SAVE
            text: 'Save',
            id:'save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {

//alert(gstFlag);
                        if(cmbCustomerFrom.getRawValue()=="" || cmbCustomerFrom.getValue()==0)
			{
				alert("Select Customer..");
			}
 			else if (flxDetail.rows == 0)
	                    {
	                        Ext.Msg.alert('Packing Slip','Grid should not be empty..');
	                        gstSave="false";
	                    } 
             		else
			{               

/*
                                          if (gstFlag == 'Add') {
                                               msg: 'Do You Want to save the Record',
                                           }
                                           else
                                           {
                                               msg: 'Do You Want to Modify the Record',
                                           }  
*/
					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
                                           msg: "Do You Want to Save  the Record",
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  


//             Ext.getCmp('save').setDisabled(true);



//       alert(gstFlag);
                                               Ext.Ajax.request({
				               url: 'TrnSalesStockTransferBF_GSM_Save.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode  :GinFinid,                                      
 		                                entno : txtEntryNo.getValue(),
                                                entdate :Ext.util.Format.date(dtEntry.getValue(),"Y-m-d"),	
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Stock Transfer Entry No Saved - " + obj['entno']);
	                                    TrnSalesStockTransferPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    flxstartno.getStore().removeAll();
	                                    flxendno.getStore().removeAll();

             
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Stock Transfer Entry Not Saved! Pls Check!- " + obj['entno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
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
                    TrnSalesStockTransferWindew.hide();
                }
            }
        }]
    },
  
    items: [

           {   
		   xtype       : 'fieldset',
		   title       : '',
		   width       : 500,
		   height      : 50,
		   x           : 250,
		   y           : 10,
		   border      : true,
		   layout      : 'absolute',
		   items:[
		         { 
		               xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 200,
		               x           : 0,
		               y           : -10,
		               border      : false,
		               items: [txtEntryNo]
		           },
		         { 
		               xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 200,
		               x           : 0,
		               y           : -10,
		               border      : false,
		               items: [cmbEntryNo]
		           },
		         { 
		               xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 60,
		               width       : 450,
		               x           : 200,
		               y           : -10,
		               border      : false,
		               items: [dtEntry]
		           },
                 ]
           },     
           {   
		   xtype       : 'fieldset',
		   title       : 'QUALITY FROM',
		   width       : 480,
		   height      : 150,
		   x           : 10,
		   y           : 60,
		   border      : true,
		   layout      : 'absolute',
		   items:[

		         { 
		               xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 450,
		               x           : 0,
		               y           : 0,
		               border      : false,
		               items: [cmbCustomerFrom]
		           },
		          { 
		                xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 450,
		               x           : 0,
		               y           : 40,
		               border      : false,
		               items: [cmbSONO]
		           },
		          { 
		                xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 450,
		               x           : 0,
		               y           : 80,
		               border      : false,
		               items: [cmbSize]
		           },
		   ],
             } ,

           {   
		   xtype       : 'fieldset',
		   title       : 'QUALITY TO',
		   width       : 485,
		   height      : 150,
		   x           : 530,
		   y           : 60,
		   border      : true,
		   layout      : 'absolute',
		   items:[

		         { 
		               xtype       : 'fieldset',
		               title       : '',
		               labelWidth  : 80,
		               width       : 450,
		               x           : 0,
		               y           : 0,
		               border      : false,
		               items: [cmbNewSize]
		           },

		   ],
             } ,

             {   
		   xtype       : 'fieldset',
		   title       : 'Reel No Details',
		   width       : 1010,
		   height      : 315,
		   x           : 10,
		   y           : 210,
		   border      : true,
		   layout      : 'absolute',
		   items:[ 
				{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 180,
				x           : 10,
				y           : 20,
				border      : false,
				items: [flxstartno]
				},
				{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 180,
				x           : 170,
				y           : 20,
				border      : false,
				items: [flxendno]
				},
				{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 250,
				x           : 600,
				y           : 245,
				border      : false,
				items: [txtTotQty]
				},
                                flxDetail,
                   ]
             }   

   ]
 });
    
   function RefreshData(){
            gstFlag = "Add";

            txtTotQty.setValue('');
            Ext.getCmp('cmbEntryNo').hide();
            Ext.getCmp('save').setDisabled(false);
            flxDetail.getStore().removeAll();
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            loadCustomerStore.removeAll();
	    loadSOnodatastore.removeAll();
            loadCustomerStore.load({
                url: 'ClsSalesStockTransfer.php',
                params: {
                    task: 'loadSOcustomer',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		//txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
		}
            });

            loadAllCustomerStore.removeAll();
            loadAllCustomerStore.load({
                url: 'ClsSalesStockTransfer.php',
                params: {
                    task: 'loadcustomer',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		//txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
		}
            });


            loadEntryNodatastore.removeAll();
	    loadEntryNodatastore.load({
		 url: 'ClsSalesStockTransfer.php',
	                params: {
        	    	task: 'findEntryNo_BF_GSM',
	                compcode:Gincompcode,
                        finid:GinFinid   
        		},
			callback:function()
               		{
                            txtEntryNo.setValue(loadEntryNodatastore.getAt(0).get('entno'));
         		}
	     });




   };    

   
 
var TrnSalesStockTransferWindew = new Ext.Window({
	height      : 600,
        width       : 1050,
        y           : 30,
        title       : 'SALES - STOCK TRANSER ENTRY',
        items       : TrnSalesStockTransferPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : true,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
            show:function(){
//alert(UserId);   
            RefreshData();
            }
        } 
    });
	
       TrnSalesStockTransferWindew.show();  
});
