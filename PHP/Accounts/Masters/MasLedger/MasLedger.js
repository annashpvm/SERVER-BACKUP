Ext.onReady(function(){
   Ext.QuickTips.init();

var ginFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');
    var gincompcode = localStorage.getItem('gincompcode');

 var saveflag = "Add";
 var ledgercode =0;

 var ledgertype = "";
 var grppltype = "";

 var flxchk = 0;

var oldledname = '';

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  MasGeneralLedger.hide();

            }
        }]);




 var loadLedgerMainGroupDatastore = new Ext.data.Store({
      id: 'loadLedgerMainGroupDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupList2"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'grp_code', 'grp_name'
      ]),
    });

 var loadLedgerListDatastore = new Ext.data.Store({
      id: 'loadLedgerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLedgerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'cust_code', 'cust_name', 'grp_code', 'grp_name'
      ]),
    });






   var txtLedgerName = new Ext.form.TextField({
        fieldLabel  : 'Ledger Name',
        id          : 'txtLedgerName',
        name        : 'txtLedgerName',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxchk = 1;
                   flxLedger.hide();
                   cmbLedgerGroup.focus();
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

                if (flxchk == 0)
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


     var cmbLedgerGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Group Name',
        width           :  340,
        displayField    : 'grp_name',
        valueField      : 'grp_code',
        hiddenName      : 'grp_name',
        id              : 'cmbLedgerGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadLedgerMainGroupDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
	
 
         }
        }   
});  
        



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','cust_acc_group','cust_type'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsLedger.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtLedgerName.getRawValue(),
		},
        });
}



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        id : flxLedger,
        x: 450,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "Led grp Code", dataIndex:'cust_acc_group', sortable:true,width:60, align:'left' ,hidden:true},  
		{header: "Led type", dataIndex:'cust_type', sortable:true,width:60, align:'left' ,hidden:true},  


        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				ledgercode = selrow.get('cust_code');
                                ledgertype = selrow.get('cust_type');
                                saveflag = "Edit";
				txtLedgerName.setValue(selrow.get('cust_name'));
                       		cmbLedgerGroup.setValue(selrow.get('cust_acc_group'));
        			oldledname = selrow.get('cust_name');
                                flxLedger.hide();   
    

			}
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				ledgercode = selrow.get('cust_code');
                                ledgertype = selrow.get('cust_type');
                                saveflag = "Edit";
				txtLedgerName.setValue(selrow.get('cust_name'));
                       		cmbLedgerGroup.setValue(selrow.get('cust_acc_group'));
             			oldledname = selrow.get('cust_name');
                                flxLedger.hide();   


			}
		}
 
    
   }
   });



 
   function RefreshData(){


        flxchk = 0;
	txtLedgerName.setValue("");
        saveflag = "Add";
        ledgercode =0;
        loadLedgerListDatastore.removeAll();
	loadLedgerListDatastore.load({
          url:'ClsLedger.php',
          params:
       	  {
           task:"loadLedgerList"
          }
	});
   };



   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 330,
        width: 900,
        x: 170,
        y: 180,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Ledger Name", dataIndex: 'cust_name',sortable:true,width:350,align:'left'},
		{header: "Group Code", dataIndex: 'grp_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Group Name", dataIndex: 'grp_name',sortable:true,width:350,align:'left'},


        ],
       store:loadLedgerListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
                        flxLedger.hide();   
			ledgercode = selrow.get('cust_code');
			txtLedgerName.setRawValue(selrow.get('cust_name'));

                        cmbLedgerGroup.setValue(selrow.get('grp_code'));
			oldledname = selrow.get('cust_name');

			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

  function save_click()
{


   if (saveflag == "Edit")
   {
	if(txtLedgerName.getRawValue() !=  oldledname )
	{
                var ledmsg = 'Are you sure want to Change ' + oldledname + ' to ' + txtLedgerName.getRawValue();
               
		Ext.MessageBox.show({
		        title: 'Confirmation',
		        icon: Ext.Msg.QUESTION,
			buttons: Ext.MessageBox.YESNO,
	    		msg: 'ledmsg',
	    		fn: function(btn)
			{
			if (btn == 'yes')
		        {

		        }
		        }   
                });    
	}

   }




				if(txtLedgerName.getRawValue()=="" || txtLedgerName.getRawValue()==0)
				{
					alert("Enter Ledger Name");
					txtLedgerName.focus();
				}

				if(cmbLedgerGroup.getRawValue()=="" || cmbLedgerGroup.getRawValue()==0)
				{
					alert("Select  Group Name");
					cmbLedgerGroup.focus();
				}

		
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do you want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'MasLedgerSave.php',
                		       	        params:
						{
                                                        savetype    : saveflag,
                                                        ledgercode  : ledgercode,   
							ledgername  : txtLedgerName.getRawValue(),
                                                        ledgrpcode  : cmbLedgerGroup.getValue(),
                                                        usercode    : GinUserid, 
                                                        finyear     : ginFinid,
                                                        compcode    : gincompcode,

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasGeneralLedgerPanel.getForm().reset();
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

   var MasGeneralLedgerPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'LEDGER MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasGeneralLedgerPanel',
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
                            MasGeneralLedger.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'LEDGER MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 140,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtLedgerName]
                            },
			   { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbLedgerGroup]
                            },


	
                ]

            },flxDetail,flxLedger,
            
        ],
    });
    

    var MasGeneralLedger = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'ACCOUNTS GENERAL LEDGER ',
        items       : MasGeneralLedgerPanel,
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
			txtLedgerName.setValue("");
			saveflag = "Add";
			ledgercode =0;
                    txtLedgerName.focus();
  		    flxLedger.hide(); 
                    flxchk = 0;
		}
        } 
    });
    MasGeneralLedger.show();  
});
