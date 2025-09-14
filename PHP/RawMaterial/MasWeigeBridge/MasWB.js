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


var itemcode = 0;

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
                  MasItemMaster.hide();

            }
        }]);




 var loadItemGroupDatastore = new Ext.data.Store({
      id: 'loadItemGroupDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWB.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'item_grpcode','item_grpname'
      ]),
    });

 var loadItemListDatastore = new Ext.data.Store({
      id: 'loadItemListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWB.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWBItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'item_code', 'item_name', 'item_group',  'item_grpname'
      ]),
    });






   var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item  Name',
        id          : 'txtItemName',
        name        : 'txtItemName',
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
                   flxItem.hide();
                   cmbItemGroup.focus();
         

             }
          },
	    keyup: function () {

                if (flxchk == 0)
                { 
		        flxItem.getEl().setStyle('z-index','10000');
		        flxItem.show();
		        loadSearchItemListDatastore.removeAll();
		          if (txtItemName.getRawValue() != '')
		             ItemNameSearch();
                }
            }

	}
    });


     var cmbItemGroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group Name',
        width           :  340,
        displayField    : 'item_grpname',
        valueField      : 'item_grpcode',
        hiddenName      : 'item_grpname',
        id              : 'cmbItemGroup',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadItemGroupDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
	
 
         }
        }   
});  
        



 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWB.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchWBItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'item_code', 'item_name', 'item_group'
      ]),
    });

function ItemNameSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsWB.php',
		params:
		{
			task:"loadSearchWBItemList",
			iname : txtItemName.getRawValue(),
		},
        });
}



   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        id : flxItem,
        x: 450,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		{header: "Group Code", dataIndex:'item_group', sortable:true,width:60, align:'left' ,hidden:true},  

        ],
        store:loadSearchItemListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('led_code'));
			if ((selrow != null)){

				itemcode = selrow.get('item_code');
                                saveflag = "Edit";
				txtItemName.setValue(selrow.get('item_name'));
                                   
                       		cmbItemGroup.setValue(selrow.get('item_group'));
                                flxItem.hide();   
    

			}
		}
 
    
   }
   });



 
   function RefreshData(){
      itemcode = 0;

        flxchk = 0;
	txtItemName.setValue("");
        saveflag = "Add";
        ledgercode =0;
        loadItemListDatastore.removeAll();
	loadItemListDatastore.load({
          url:'ClsWB.php',
          params:
       	  {
           task:"loadWBItemList"
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
    	style      :"border-radius: 5px;",  
        columns: [   
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:350,align:'left'},
		{header: "Group Code", dataIndex: 'item_group',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Group Name", dataIndex: 'item_grpname',sortable:true,width:350,align:'left'},



        ],
       store:loadItemListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
                        flxItem.hide();   
			itemcode = selrow.get('item_code');
			txtItemName.setRawValue(selrow.get('item_name'));
                        cmbItemGroup.setValue(selrow.get('item_group'));
			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

  function save_click()
{
				if(txtItemName.getRawValue()=="" || txtItemName.getRawValue()==0)
				{
					alert("Enter ITEM  Name");
					txtItemName.focus();
				}

				if(cmbItemGroup.getRawValue()=="" || cmbItemGroup.getRawValue()==0)
				{
					alert("Select  Group Name");
					cmbItemGroup.focus();
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
						{
						Ext.Ajax.request({
		                            	url: 'MasWBItemSave.php',
                		       	        params:
						{
                                                        savetype    : saveflag,
                                                        itemcode    : itemcode,   
							itemname    : txtItemName.getRawValue(),
                                                        itemgrpcode : cmbItemGroup.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    WBItemMasterPanel.getForm().reset();
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

   var WBItemMasterPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WB ITEM MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'WBItemMasterPanel',
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
                            MasItemMaster.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
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
                                	items: [txtItemName]
                            },
			   { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbItemGroup]
                            },


	
                ]

            },flxDetail,flxItem,
            
        ],
    });
    

    var MasItemMaster = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'Weigh Bridger Item Master ',
        items       : WBItemMasterPanel,
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
                    txtItemName.focus();
  		    flxItem.hide(); 
                    flxchk = 0;
		}
        } 
    });
    MasItemMaster.show();  
});
