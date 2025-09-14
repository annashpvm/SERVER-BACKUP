Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";

   var userid = localStorage.getItem('ginuserid');
   var usertype = localStorage.getItem('ginuser');


   var supcode = 0;
   var rmitemcode = 0;
   var rmareacode = 0;
   var rmmois = 0;
   var SaveFlag ="Add";
   var gridedit = "false";
   var editrow = 0;


var loadSupplierEntryNoDetailsDatastore = new Ext.data.Store({
  id: 'loadSupplierEntryNoDetailsDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRate.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadSupplierEntryNoDetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'rm_rate_date' , 'rm_rate_seqno', 
  ])
});




var loadEntryNoDetailsDatastore = new Ext.data.Store({
  id: 'loadEntryNoDetailsDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRate.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadEntryNoDetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'rm_rate_seqno', 'rm_rate_date', 'rm_rate_supcode', 'rm_rate_itemcode', 'rm_rate_rate', 'rm_rate_mois',  'itmh_name','cust_ref','rm_rate_areacode','area_name'

  ])
});


var loadRateSeqNoDatastore = new Ext.data.Store({
  id: 'loadRateSeqNoDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRate.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadSeqno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'seqno'
  ])
});






var loadRateSeqNoListDatastore = new Ext.data.Store({
  id: 'loadRateSeqNoListDatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsRate.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadSeqnoList"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'rm_rate_seqno'
  ])
});


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchItemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code', 'itmh_name','itmh_moisture_per'
      ]),
    });

 var loadSearchAreaListDatastore = new Ext.data.Store({
      id: 'loadSearchAreaListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchArealist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'area_code', 'area_name'
      ]),
    });

 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','qc_rm_supcode', 'cust_state','cust_wp_gstinv_supplier_yn','cust_cr_days',
'cust_grace_days'
      ]),
    });


var lblSupplier = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblSupplier',
    width       : 100,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblItemName = new Ext.form.Label({
    fieldLabel  : 'Item Name',
    id          : 'lblItemName',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblMoisture = new Ext.form.Label({
    fieldLabel  : 'Moisture',
    id          : 'lblMoisture',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblArea = new Ext.form.Label({
    fieldLabel  : 'Area',
    id          : 'lblArea',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


function add_btn_click()
{
        var gstadd="true";
	if(supcode ==0 || txtSupplierName.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Rate", "Select Supplier Name");  	
                gstadd="false";
	}            
	
	else if(rmitemcode ==0 || txtItemName.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Rate", "Select Item");  	
                gstadd="false";
	}            
	else if(rmareacode ==0 || txtAreaName.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Rate", "Select Area");  	
                gstadd="false";
	}     
	else if(Number(txtMoisture.getValue()) == 0 )
	{
                Ext.MessageBox.alert("Rate", "Enter Moisture %");
                gstadd="false";
        }

	else
            {

                var chkitemcode = rmitemcode;
                var chkareacode = rmareacode;
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemcode == chkitemcode && sel[i].data.areacode == chkareacode   )
		    {
                        cnt = cnt + 1;
                    }
                }

		if(gridedit === "true")
		{
			gridedit = "false";
			//var sm = flxDetail.getSelectionModel();
			//var selrow = sm.getSelected();

			var idx = flxDetail.getStore().indexOf(editrow);


			sel[idx].set('itemname', txtItemName.getRawValue());
			sel[idx].set('itemcode', rmitemcode);
			sel[idx].set('areaname', txtAreaName.getRawValue());
			sel[idx].set('areacode', rmareacode);
			sel[idx].set('rate', parseFloat(txtRate.getValue()));
			sel[idx].set('moisture', txtMoisture.getValue());

		                    txtItemName.setRawValue("");
                                    rmitemcode = 0;
//		                    txtAreaName.setRawValue("");
//                                    rmareacode = 0;                                    
		                    txtRate.setRawValue("");
		                    txtMoisture.setRawValue("");

			flxDetail.getSelectionModel().clearSelections();

			

		}//if(gridedit === "true")
		else
		{
               
			if (cnt > 0)
			{
		            Ext.MessageBox.alert("Grid","Same Item already Entered.");
		        } else
		        {

		            var RowCnt = flxDetail.getStore().getCount() + 1;
		            flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({
		                    slno:RowCnt,

		                    itemname : txtItemName.getRawValue(),	
				    itemcode : rmitemcode,
		                    areaname : txtAreaName.getRawValue(),	
				    areacode : rmareacode,
				    rate     : Ext.util.Format.number(txtRate.getValue(),"0.00"),
				    moisture : Ext.util.Format.number(txtMoisture.getValue(),"0.00"),
	

				    
		                }) 
		                );


		                    txtItemName.setRawValue("");
                                    rmitemcode = 0;
//		                    txtAreaName.setRawValue("");
//                                    rmareacode = 0;
		                    txtRate.setRawValue("");
		                    txtMoisture.setRawValue("");

                	}//else (cnt > 0)
		}// else //if(gridedit === "true")
		
            }//condition else



}

 var btnsubmit = new Ext.Button({
	text: 'ADD',
	width: 70,
	height: 40,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){    
                add_btn_click();
          }
       }
  })



var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden:false,
    stripeRows : true,
    scrollable: true,

    height: 250,
    width: 1000,
    id: 'my-grid',  
    columns:
    [            
    	{dataIndex:'itemcode',header: "Item Code",width: 70,align: 'center',sortable: true,hidden: true},
    	{dataIndex:'itemname',header: "Item Name",width: 300,align: 'left',sortable: true},
    	{dataIndex:'areacode',header: "Area Code",width: 70,align: 'center',sortable: true,hidden: true},
    	{dataIndex:'areaname',header: "Area Name",width: 150,align: 'left',sortable: true},
	{dataIndex:'rate'    ,header: " Rate",width: 100,align: 'center',sortable: true ,

        editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    decimalPrecision: 2,
			renderer: function(val, meta, record){
			},
    

                    listeners: {

                    }
                 }
        },
	{dataIndex:'moisture',header: "Moisture", width: 100, align: 'center',sortable: true ,
        editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    decimalPrecision: 2,
			renderer: function(val, meta, record){
			},
    

                    listeners: {

                    }
                 }
        },
     ],
    store: [],
    listeners:{	

 
        'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){

         if (cellIndex < 4 )
                {   
         Ext.Msg.show({
             title: 'STORES GRN PREPARATION',
             icon: Ext.Msg.QUESTION,
//             if (viewopt == 0)
//             { 
//                 buttons: Ext.MessageBox.YESNOCANCEL,
//                 msg: 'Press YES to Modify   - CANCEL to EXIT',
//             }
//             else
//             {
                 buttons: Ext.MessageBox.YESNOCANCEL,
                 msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
//             }    
             fn: function(btn){

        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;

                        txtItemName.setRawValue(selrow.get('itemname'));
	
             		txtRate.setValue(selrow.get('rate'));
		        txtMoisture.setValue(selrow.get('moisture'));
		        rmitemcode = selrow.get('itemcode');



                        txtAreaName.setRawValue(selrow.get('areaname'));
                        rmareacode = selrow.get('areacode');

			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                        if (viewopt == 0)
                        { 
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                        }  
                        else
                        {
                            alert("In  EDIT option - you cannot delete the Row..");
                        }   
             
                   }

             }
        }); 
     }        
    }
 }

});


var flxApproval = new Ext.grid.EditorGridPanel({
    frame: false,
//    sm: new Ext.grid.RowSelectionModel(),
    hidden:false,
    stripeRows : true,
    scrollable: true,
    height: 300,
    width: 250,
    y : 60, 
    id: 'my-grid',  
    columns:
    [            
    	{dataIndex:'rm_rate_date',header: "Date ",width: 120,align: 'center',sortable: true},
    	{dataIndex:'rm_rate_seqno',header: "No",width: 100,align: 'center',sortable: true},
    ],
    store: loadSupplierEntryNoDetailsDatastore ,
});

function get_Item_Detail()
{
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();
	rmitemcode = selrow.get('itmh_code');
	rmmois     = selrow.get('itmh_moisture_per');
        txtItemName.setValue(selrow.get('itmh_name'));
        txtMoisture.setValue(selrow.get('itmh_moisture_per'));
           
        flxItem.hide();
        flxArea.hide();
        txtAreaName.focus();




}


function get_Area_Detail()
{
	var sm = flxArea.getSelectionModel();
	var selrow = sm.getSelected();
	rmareacode = selrow.get('area_code');
        txtAreaName.setValue(selrow.get('area_name'));
           
        flxArea.hide();
        txtRate.focus();




}



function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('cust_code'));
	if ((selrow != null)){
		ledcode = selrow.get('cust_code');
		supcode = selrow.get('qc_rm_supcode');
                if (selrow.get('cust_state') == 24)
                   suptype = 1;
                else
                   suptype = 2;
   
		txtSupplierName.setValue(selrow.get('cust_name'));
                lblSupplier.setText(selrow.get('cust_name'));

lblSupplier.setText('<span style="font-size:14px; color:#007BFF; font-weight:bold;">' + ' Previouse Approvals for - ' + selrow.get('cust_name') + '</span>', false);


                txtItemName.focus();
		flxLedger.hide();

      		flxApproval.getStore().removeAll();
		loadSupplierEntryNoDetailsDatastore.removeAll();
		loadSupplierEntryNoDetailsDatastore.load({
			url:'ClsRate.php',
			params:
			{
			task:"loadSupplierEntryNoDetails",
			finid    : GinFinid,
			compcode : Gincompcode,
			supcode  : supcode,
			},
			callback:function()
			{       
                        } 
                 });
	}

}


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 470,
        width: 420,
        id : flxLedger,
        x: 140,
        y: 100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'qc_rm_supcode',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_state',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_wp_gstinv_supplier_yn',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_cr_days',sortable:true,width:50,align:'left'},
		{header: "", dataIndex: 'cust_grace_days',sortable:true,width:50,align:'left'},
        ],
        store:loadSearchLedgerListDatastore,

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

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsRate.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSupplierName.getRawValue(),
		},
        });
}



 var txtRate = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtRate',
        name        : 'txtRate',
        width       :  100,
        allowBlank  :  false,
    enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	tabindex : 1,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtMoisture.focus();

             }
          },
    }
});

 var txtMoisture = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtMoisture',
        name        : 'txtMoisture',
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
        width       :  70,
        allowBlank  :  false,
    enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,

    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 add_btn_click();
                 txtItemName.focus();

             }
          },
    }
});


var txtSupplierName = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
        id          : 'txtSupplierName',
        name        : 'txtSupplierName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   lblSupplier.setText(txtSupplierName.getRawValue());
                   lblSupplier.setStyle('font-size:18px; color:#007BFF; font-weight:bold;');
                   txtItemName.focus();
                   
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxLedger.getEl().setStyle('z-index','10000');
	        flxLedger.show();
	        loadSearchLedgerListDatastore.removeAll();
                LedgerSearch();
            }
         }  
    });


   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 420,
        id : flxItem,
        x: 10,
        y: 45,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "itmh_code", dataIndex: 'itmh_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'itmh_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'itmh_moisture_per',sortable:true,width:330,align:'left',hidden:true},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                            get_Item_Detail();
                        }
                        else if (e.getKey() == e.ESC) {
                            alert("Esc key Pressed");
                        }   
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                            get_Item_Detail();

             }     
     
   }
   });




   var flxArea = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 420,
        id : flxItem,
        x: 320,
        y: 45,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "itmh_code", dataIndex: 'area_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'area_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchAreaListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                            get_Area_Detail();

                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                            get_Area_Detail();

             }     
     
   }
   });

function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsRate.php',
		params:
		{
			task:"loadSearchItemlist",
			itemname : txtItemName.getRawValue(),
		},
        });
}



function AreaSearch()
{

        loadSearchAreaListDatastore.removeAll();
        loadSearchAreaListDatastore.load({
		url: 'ClsRate.php',
		params:
		{
			task:"loadSearchArealist",
			areaname : txtAreaName.getRawValue(),
		},
        });
}



var txtItemName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  300,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();
                  if (txtItemName.getRawValue() != "")
                        txtAreaName.focus();
                   flxArea.hide(); 

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }

            if (e.getKey() === e.ESC) {
                   flxItem.hide();
                f.blur(); // ESC key will remove focus from txtItemName
            }

          },
	    keyup: function () {

	        flxItem.getEl().setStyle('z-index','10000');
	        flxItem.show();
	        loadSearchItemListDatastore.removeAll();
  	        ItemSearch();
            }
         }  
    });



var txtAreaName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAreaName',
        name        : 'txtAreaName',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxArea.hide();
                   txtRate.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxArea.getSelectionModel().selectRow(0)
             flxArea.focus;
             flxArea.getView().focusRow(0);
             }

            if (e.getKey() === e.ESC) {
                flxArea.hide();
                f.blur(); // ESC key will remove focus from txtItemName
            }



          },
	    keyup: function () {

	        flxArea.getEl().setStyle('z-index','10000');
	        flxArea.show();
	        loadSearchAreaListDatastore.removeAll();
  	        AreaSearch();
            }
         }  
    });

var txtApprovalNo = new Ext.form.NumberField({
	fieldLabel  : 'Approval No',
	id          : 'txtApprovalNo',
	name        : 'txtApprovalNo',
	width       :  100,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

})

var txtOldApprovalNo = new Ext.form.NumberField({
	fieldLabel  : 'Pickup from Approval No',
	id          : 'txtOldApprovalNo',
	name        : 'txtOldApprovalNo',
	width       :  50,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,
	listeners:{
          change : function(){

		flxDetail.getStore().removeAll();
		loadEntryNoDetailsDatastore.removeAll();
		loadEntryNoDetailsDatastore.load({
			url:'ClsRate.php',
			params:
			{
			task:"loadEntryNoDetails",
			finid    : GinFinid,
			compcode : Gincompcode,
			entno    : txtOldApprovalNo.getValue()
			},
			callback:function()
			{
                           var RowCnt = loadEntryNoDetailsDatastore.getCount();
		           if (RowCnt > 0) {

                              for (var i=0;i<RowCnt;i++)
		              {
				flxDetail.getStore().insert(
				flxDetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
					itemcode  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_itemcode'),
		    			itemname  : loadEntryNoDetailsDatastore.getAt(i).get('itmh_name'),
					areacode  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_areacode'),
		    			areaname  : loadEntryNoDetailsDatastore.getAt(i).get('area_name'),
				    	rate      : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_rate'),
				    	moisture  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_mois'),
                                }));
  
                              }    
                           }     
                        }
                });
          }
        }

})


var cmbApprovalNo = new Ext.form.ComboBox({
        fieldLabel      : 'Approval No',
        width           : 100,
        displayField    : 'rm_rate_seqno', 
        valueField      : 'rm_rate_seqno',
        hiddenName      : '',
        id              : 'cmbApprovalNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRateSeqNoListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
	listeners:{
          select: function(){

		flxDetail.getStore().removeAll();
		loadEntryNoDetailsDatastore.removeAll();
		loadEntryNoDetailsDatastore.load({
			url:'ClsRate.php',
			params:
			{
			task:"loadEntryNoDetails",
			finid    : GinFinid,
			compcode : Gincompcode,
			entno    : cmbApprovalNo.getValue()
			},
			callback:function()
			{
                           var RowCnt = loadEntryNoDetailsDatastore.getCount();
		           if (RowCnt > 0) {
			      dtpEntryDate.setRawValue(Ext.util.Format.date(loadEntryNoDetailsDatastore.getAt(0).get('rm_rate_date'),'d-m-Y'));
                              supcode = loadEntryNoDetailsDatastore.getAt(0).get('rm_rate_supcode');
                              txtSupplierName.setRawValue(loadEntryNoDetailsDatastore.getAt(0).get('cust_ref'));
                              txtApprovalNo.setValue(cmbApprovalNo.getRawValue());
                              for (var i=0;i<RowCnt;i++)
		              {
				flxDetail.getStore().insert(
				flxDetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
					itemcode  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_itemcode'),
		    			itemname  : loadEntryNoDetailsDatastore.getAt(i).get('itmh_name'),
					areacode  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_areacode'),
		    			areaname  : loadEntryNoDetailsDatastore.getAt(i).get('area_name'),
				    	rate      : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_rate'),
				    	moisture  : loadEntryNoDetailsDatastore.getAt(i).get('rm_rate_mois'),
                                }));
  
                              }    
                           }     
                        }
                });
          }
        }
});
    
var dtpEntryDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpEntryDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    enableKeyEvents: true,  
    listeners:{
       specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSupplierName.focus();
             }
       },
    }

});

    


   var TrnRatePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WASTE PAPER RATE MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnRatePanel',
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
			SaveFlag = "Add";

			flxDetail.getStore().removeAll();
			txtApprovalNo.focus();
			Ext.getCmp('txtApprovalNo').setDisabled(true);
			Ext.getCmp('txtApprovalNo').show();
			Ext.getCmp('cmbApprovalNo').setDisabled(true);
			Ext.getCmp('cmbApprovalNo').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsRate.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});
			
			Issnodatastore.load({
			url: 'ClsRate.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : SaveFlag
			},
			callback:function()
			{
			txtApprovalNo.setValue(Issnodatastore.getAt(0).get('issno'));
			}
			});

			loadvarietydatastore.removeAll();

			loadvarietydatastore.load({
			url: 'ClsRate.php',
			params:
			{
			    task:"loadvariety",
			    compcode:Gincompcode
			}
			});
			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsRate.php',
			params:
			{
			    task:"loadbatch",
			    finid:GinFinid,
			    compcode:Gincompcode,
			    qrytype: "frmload"
			}
			});
RefreshData();
			
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
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//edit

			SaveFlag = "Edit";
			flxDetail.getStore().removeAll();
//			Ext.getCmp('txtApprovalNo').hide();
			Ext.getCmp('cmbApprovalNo').setDisabled(false);
			Ext.getCmp('cmbApprovalNo').show();
                  	loadRateSeqNoListDatastore.removeAll();
			loadRateSeqNoListDatastore.load({
			url: 'ClsRate.php',
			params: {
			    task: 'loadSeqnoList',
			    compcode:Gincompcode,
		            fincode :GinFinid,
			}
			});



                }
            }
        },'-',                
		{
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                        flxDetail.getSelectionModel().selectAll();
                               if(txtSupplierName.getRawValue()=="" || supcode ==0)
				{
					alert("Select Supplier..");
					
				}
				else if (flxDetail.getSelectionModel().getCount()==0)
                    		{
                        		Ext.Msg.alert('Entry','Grid Should not be empty..');
                    		} 
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You  want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{

						var ratedata = flxDetail.getStore().getRange();
                    				var rateupdata = new Array();
                    				Ext.each(ratedata, function (record){
                    				rateupdata.push(record.data);
                    				});
						
						Ext.Ajax.request({
		                            	url: 'TrnRateSave.php',
                		       	        params:
						{
				                griddet  : Ext.util.JSON.encode(rateupdata),	
						cnt      : ratedata.length,					
						compcode : Gincompcode,
						fincode  : GinFinid,
						entno    : txtApprovalNo.getRawValue(),
						entdate  : Ext.util.Format.date(dtpEntryDate.getValue(),"Y-m-d"),
                                                supcode  : supcode,
						usrcode  : userid,
						AEDFlag  : SaveFlag,

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
                                                    msg: 'Entry No : ' + obj['EntryNo'] + '  Saved',
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                  //  Ext.MessageBox.alert("Alert"," Saved ");
//						        TrnEntryFormpanel.getForm().reset();
							flxDetail.getStore().removeAll();
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
			//}
			//else {
			//	alert('Entry Date Should be current date');
			//}

                        }
                    }
                },'-',                


     
                  {
//VIEW
                    text: 'View',
                    id	:  'view',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

		        printtype = "PDF";
		 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&apprno=" + encodeURIComponent(cmbApprovalNo.getRawValue());
			var param = (p1+p2+p3) ;   
		        if (printtype == "PDF")                       
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMRateApprovalNo.rptdesign&__format=pdf&' + param); 
		        else

			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMRateApprovalNo.rptdesign' + param); 
		           
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
			listeners:{
			click: function(){
				TrnEntryWindow.hide();
			}
			}
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
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
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtApprovalNo]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbApprovalNo]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpEntryDate]
                            },


                            {  
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 500,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtSupplierName]
                            },

                            {  
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 180,
                                	width       : 500,
                                	x           : 500,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtOldApprovalNo]
                            },


                           flxLedger,


			    { xtype   : 'fieldset',
				title   : '',
				layout  : 'hbox',
				border  : true,
				height  : 345,
				width   : 885,
				style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 10,
				y       : 100,
				items:[


		  			{
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 120,
				            x           : 70,
				            y           : -10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblItemName]
				        },



		  			{
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 120,
				            x           : 360,
				            y           : -10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblArea]
				        },


				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 1,
				            width       : 380,
				            x           : 580,
				            y           : -10,
				            border      : false,
				            items: [lblRate]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            labelWidth  : 1,
				            width       : 380,
				            x           : 680,
				            y           : -10,
				            border      : false,
				            items: [lblMoisture]
				        },


			            {  
			                	xtype       : 'fieldset',
			                	title       : '',
			                	labelWidth  : 1,
			                	width       : 350,
			                	x           : 0,
			                	y           : 15,
			                    	border      : false,
			                	items: [txtItemName]
			            },
			            {  
			                	xtype       : 'fieldset',
			                	title       : '',
			                	labelWidth  : 1,
			                	width       : 350,
			                	x           : 320,
			                	y           : 15,
			                    	border      : false,
			                	items: [txtAreaName]
			            },
                                    flxItem,flxArea,

				   { 
			                	xtype       : 'fieldset',
			                	title       : '',
			                	labelWidth  : 1,
			                	width       : 150,
			                	x           : 550,
			                	y           : 15,
			                    	border      : false,
			                	items: [txtRate]
			            },

				   { 
			                	xtype       : 'fieldset',
			                	title       : '',
			                	labelWidth  : 0,
			                	width       : 250,
			                	x           : 580,
			                	y           : 15,
			                    	border      : false,
			                	items: [txtMoisture]
			            },


			        {
			            xtype       : 'fieldset',
			            title       : '',
			            labelWidth  : 1,
			            width       : 380,
			            x           : 780,
			            y           : 5,
			            border      : false,
			            items: [btnsubmit]
			        },
			            {  
		                	xtype       : 'fieldset',
		                	title       : '',
		                	labelWidth  : 1,
		                	width       : 1000,
		                	x           : 0,
		                	y           : 50,
		                    	border      : false,
		                	items: [flxDetail]
			            }

                              ]
                         },

                ]

            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'absolute',
                border  : true,
                height  : 480,
                width   : 340,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 950,
                y       : 10,
                items:[
			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 300,
			    x           : 10,
			    y           : 10,
			    defaultType : 'Label',
			    border      : false,
			    items: [lblSupplier]
			},


			flxApproval,

	        ] 
            } 

        ]
    });
   



    function RefreshData()
    { 
         SaveFlag ="Add";
         flxItem.hide();
         flxArea.hide();
         flxLedger.hide();
         Ext.getCmp('cmbApprovalNo').hide();


	flxDetail.getStore().removeAll();
	flxApproval.getStore().removeAll();



	lblSupplier.setText('');
	txtItemName.setRawValue('');
	txtAreaName.setRawValue('');
	txtOldApprovalNo.setRawValue('');
        txtSupplierName.setRawValue('');

	loadRateSeqNoDatastore.load({
	url: 'ClsRate.php',
	params: {
	    task: 'loadSeqno',
		compcode:Gincompcode,
		fincode:GinFinid,
	},
	callback:function()
	{
		txtApprovalNo.setValue(loadRateSeqNoDatastore.getAt(0).get('seqno'));

		const input = document.getElementById('dtpEntryDate');
		const end = input.value.length;
		input.setSelectionRange(0,0);
		input.focus();

	}
	});


    }
    var TrnRateWindow = new Ext.Window({
	height      : 570,
        width       : 1350,
        y           : 35,
        title       : 'WASTE PAPER RATE & MOISTURE MASTER',
        items       : TrnRatePanel,
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

      
                       RefreshData();
	   	
	   	}

		}
    });
    TrnRateWindow.show();  
});
