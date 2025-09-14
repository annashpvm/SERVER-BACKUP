Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var accgrpcode =0;

var ledgercode = 0;
var ledmergecode  = 0;

 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedgerMerge.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name','led_type'
      ]),
    });

 var loadGroupListDatastore = new Ext.data.Store({
      id: 'loadGroupListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedgerMerge.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'rep_merge_name', 'rep_merge_code', 'rep_ledcode', 'led_name'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsLedgerMerge.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtLedgerName.getRawValue(),
		},
        });
}



  var txtGroupName = new Ext.form.TextField({
        fieldLabel  : 'Merge Group Name',
        id          : 'txtGroupName',
        name        : 'txtGroupName',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });

 
  var txtLedgerName = new Ext.form.TextField({
        fieldLabel  : 'Ledger Name',
        id          : 'txtLedgerName',
        name        : 'txtLedgerName',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
                   cmbType.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtLedgerName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtLedgerName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
    });

function grid_chk_flxLedger()
{
	var sm = flxLedger.getSelectionModel();
	var selrow = sm.getSelected();

	var chkitem = (selrow.get('led_code'));
	if ((selrow != null)){

	

//				cmbAccountName.setValue(selrow.get('led_code'));
		txtLedgerName.setValue(selrow.get('led_name'));
                flxLedger.hide();  

				ledgercode = selrow.get('led_code');
				ledgername = selrow.get('led_name');
                        
                  		flxPartySelected.getSelectionModel().selectAll();
			        var selrows = flxPartySelected.getSelectionModel().getCount();
			        var sel = flxPartySelected.getSelectionModel().getSelections();
				var stkcnt  = 0;
                                for (var k=0;k<selrows;k++) 
                                { 
                                    if (sel[k].data.led_code == ledgercode)
                                    {
                                        stkcnt = stkcnt + 1;
                                    }
                                } 
                            
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Ledger  Already Selected");
			        }
				else
				{

				   var RowCnt = flxPartySelected.getStore().getCount() + 1;  
                                   flxPartySelected.getStore().insert(
                                   flxPartySelected.getStore().getCount(),
                                    new dgrecord({
					  led_code    : ledgercode,
					  led_name    : ledgername,
                                    })
                   		   );
                  		}
                        	flxPartySelected.getSelectionModel().clearSelections(); 


	}

}

   var flxPartySelected = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,

    height: 150,
    width: 500,
    x: 700,
    y: 10,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Ledger Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Selected Ledger List", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

         Ext.Msg.show({
             title: 'Customer',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Customer!',
             fn: function(btn){
               if (btn === 'yes'){
                  var sm = flxPartySelected.getSelectionModel();
                  var selrow = sm.getSelected();
                  flxPartySelected.getStore().remove(selrow);
                  flxPartySelected.getSelectionModel().selectAll();

               }
            }
         });

				}
 
    
   }
   });



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 420,
        id : flxLedger,
        x: 220,
        y: 125,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'led_type',sortable:true,width:330,align:'left'},

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
   function RefreshData(){

	txtGroupName.setValue("");
        saveflag = "Add";
	ledgercode = 0;
	ledmergecode  = 0;
		loadGroupListDatastore.removeAll();
		loadGroupListDatastore.load({
			url: 'ClsLedgerMerge.php',
			params:
			{
				task:"loadGroupList",
			},
		});


   };

   function  getLedgerList()
   {
               flxPartySelected.getStore().removeAll();
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
           if (sel[i].data.rep_merge_code== ledmergecode) {
       
		   var RowCnt = flxPartySelected.getStore().getCount() + 1;  
                   flxPartySelected.getStore().insert(
                   flxPartySelected.getStore().getCount(),
                    new dgrecord({
			  led_code    : sel[i].data.rep_ledcode,
			  led_name    : sel[i].data.led_name,
                    })
   		   );
           }

        }    

   }

   var dgrecord = Ext.data.Record.create([]);


   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 330,
        width: 1100,
        x: 40,
        y: 180,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Ledger Group Name", dataIndex: 'rep_merge_name',sortable:true,width:330,align:'left'},   
		{header: "Ledger Group Code", dataIndex: 'rep_merge_code',sortable:true,width:90,align:'left', hidden:true},
		{header: "Ledger Code", dataIndex: 'rep_ledcode',sortable:true,width:90,align:'left',hidden:true},   
		{header: "Ledger Name", dataIndex: 'led_name',sortable:true,width:500,align:'left'},

        ],
       store:loadGroupListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			ledmergecode = selrow.get('rep_merge_code');
                        saveflag = "Edit";
			txtGroupName.setRawValue(selrow.get('rep_merge_name'));
                        getLedgerList();
			}

                   //CalculatePOVal();
   }

   });

   var MaLedgerMergePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PURCHASE GROUP MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MaLedgerMergePanel',
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
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
	
				if(txtGroupName.getRawValue()=="" || txtGroupName.getRawValue()==0)
				{
					alert("Enter Merge Group Name");
					txtGroupName.focus();
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
		                                var accData = flxPartySelected.getStore().getRange();
		                                var accupdData = new Array();
		                                Ext.each(accData, function (record) {
		                                    accupdData.push(record.data);
		                                });

						{
						Ext.Ajax.request({
		                            	url: 'MasLedgerMergeSave.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        cnt        : accData.length,
                                                        mergecode  : ledmergecode,
							mergename  : txtGroupName.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MaLedgerMergePanel.getForm().reset();
                                                    flxPartySelected.getStore().removeAll();
						    RefreshData();
						
                                                }
                                             	else 
						{
                                             
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Report Group Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
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
                            MasLedgerMergeWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'Ledger Merging',
                layout  : 'hbox',
                border  : true,
                height  : 150,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 50,
                y       : 10,
                items:[
                     { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 600,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtGroupName]
                     },
                     { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 150,
                        	width       : 600,
                        	x           : 0,
                        	y           : 60,
                            	border      : false,
                        	items: [txtLedgerName]
                     },
                ]

            },flxLedger,flxPartySelected,flxDetail
            
        ],
    });
    

    var MasLedgerMergeWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'REPORT LEDGER MERGING',
        items       : MaLedgerMergePanel,
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
		txtGroupName.focus();
		flxLedger.hide();
		loadSearchLedgerListDatastore.removeAll();
		loadSearchLedgerListDatastore.load({
			url: 'ClsLedgerMerge.php',
			params:
			{
				task:"loadSearchLedgerlist",
				ledger : txtLedgerName.getRawValue(),
			},
		});
                RefreshData();
		} 	
		}
    });
    MasLedgerMergeWindow.show();  
});
