Ext.onReady(function(){
   Ext.QuickTips.init();
   	var Gincompcode = localStorage.getItem('gincompcode');
   	var GinFinid = localStorage.getItem('ginfinid');
   	var GinYear = localStorage.getItem('gstyear');
   	var userid = localStorage.getItem('ginuser');
	var gstFlag = "Add";
	var gstStatus = "N";
	var itemtypep = "-1";
	var chkrate = 0;
	var oldopstk =0, oldopvalue  = 0;

        var chkitemcode = 0; 

        new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);




  var loaddeptdatastore = new Ext.data.Store({
      id: 'loaddeptdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMinimumStock.php',      // File to connect to
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



  var loaditemgrpdatastore = new Ext.data.Store({
      id: 'loaditemgrpdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMinimumStock.php',      // File to connect to
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



  var loadItemGrpListdatastore = new Ext.data.Store({
      id: 'loadItemGrpListdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMinimumStock.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGroupItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'item_code', 'item_name', 'uom_short_name', 'minstk_qty'
      ]),
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

             }
       },
        select: function(){
                  dept = cmbdept.getValue();

	}
} 
   });
   

function getItemList()
{

        loadItemGrpListdatastore.removeAll();
        loadItemGrpListdatastore.load({
		url: 'ClsMinimumStock.php',
		params:
		{
			task : "loadGroupItemList",
			finid    : GinFinid,
			compcode : Gincompcode,  
                        dept     : cmbdept.getValue(),                 
                        grpcode  : cmbitemgrp.getValue(),

		},
                callback: function () {
                       
                }
        });


}

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
		          getItemList();
		     }
  	    },
            select: function(){
               getItemList();
            }


	}           
   });



   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 410,
        width: 750,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Item Name", dataIndex: 'item_name',sortable:true,width:450,align:'left'},
		{header: "UOM", dataIndex: 'uom_short_name',sortable:true,width:100,align:'center'},
		{header: "Minimum Stock", dataIndex: 'minstk_qty',sortable:true,width:150,align:'right',
                editor: {
                    xtype:'numberfield',
                    allowBlank:true,
                    enableKeyEvents: true,
                    decimalPrecision: 3, 
                    listeners:{

                    }
                }   
                },


        ],
        store:loadItemGrpListdatastore,

    listeners:{	

    
   }
   });






        function save_click()
        {        	
        	var gstSave;
		
		gstSave="true";

		if(cmbdept.getRawValue()=="" || cmbdept.getValue()==0)
		{
			Ext.Msg.alert("Select the Department and continue");
			cmbdept.setFocus();
			gstSave="false";
		}

		else if(cmbitemgrp.getRawValue()=="" || cmbitemgrp.getValue()==0)
		{
			Ext.Msg.alert("Select the Item Group and continue");
			cmbitemgrp.setFocus();
			gstSave="false";
		}

		else
		{
			Ext.MessageBox.show({
                        title: 'Confirmation',
                        icon: Ext.Msg.QUESTION,
			buttons: Ext.MessageBox.YESNO,
            		msg: 'Do u want to save',
            		fn: function(btn){
			if (btn == 'yes'){
				if (gstSave === "true"){


			       flxItem.getSelectionModel().selectAll();
                               var ItemData = flxItem.getStore().getRange();                                
			       var ItemupData = new Array();
                               Ext.each(ItemData, function (record) {
                               ItemupData.push(record.data);
                               });  




				Ext.Ajax.request({
		            	url: '	MinimumStockSave.php',
		       	        params:
				{
            			     	griddet  : Ext.util.JSON.encode(ItemupData),                          
 		            		cnt 	 : ItemData.length,
					dept     : cmbdept.getValue(),
					itemgrp  : cmbitemgrp.getValue(),


				},
				callback: function (options, success, response)
                        	{
					var obj = Ext.decode(response.responseText);
					if (obj['success']==="true"){                                
						Ext.MessageBox.alert("Details Saved");
//								MasOpeningpanel.getForm().reset();
						RefreshData();
						
					}else{
						Ext.MessageBox.alert("Details Not Saved! Pls Check!");                                                  
					}
                      
			 	}   
				});//'MasLotStockSave.php'end
				}  

	    	
         		}
                	}
    			});
		}
        }



   var MasOpeningpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GENERAL STORES OPENING STOCK ENTRY ',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasOpeningpanel',
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
  /*      {
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
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";
			

                }
            }
        },'-', */              
                {
//SAVE
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
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
                    text: 'Print',
                    style  : 'text-align:center;',
                    tooltip: 'Print Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
		          var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
             		  var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		          var p3 = "&dept=" + encodeURIComponent(cmbdept.getValue());
             		  var p4 = "&grp=" + encodeURIComponent(cmbitemgrp.getValue());
             		  var p5 = "&departmentname=" + encodeURIComponent(cmbdept.getRawValue());
             		  var p6 = "&groupname=" + encodeURIComponent(cmbitemgrp.getRawValue());
                          var param = (p1+p2+p3+p4+p5+p6) ;  
                   	  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresMInimumStock.rptdesign&__format=pdf' + param); 
                       
                        }
                    }
                },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasWPOpeningWindow.hide();

                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'GENERAL STORES MINIMUM STOCK ENTRY ',
                layout  : 'hbox',
                border  : true,
                height  : 510,
                width   : 1000,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                y       : 10,
                x       : 150,        
                items:[


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
                	title       : '',
                	labelWidth  : 110,
                	width       : 500,
                	x           : 400,
                	y           : 0,
                    	border      : false,
                	items: [cmbitemgrp]
                    },

                    { 
                	xtype       : 'fieldset',
                	title       : '',
                	labelWidth  : 110,
                	width       : 800,
                	x           : 100,
                	y           : 40,
                    	border      : false,
                	items: [flxItem]
                    },


                ]

            },


            
        ],
    });
    

    function RefreshData()
    {
	 flxItem.getStore().removeAll();


    }   
   
    var MasWPOpeningWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 35,
        title       : 'GENERAL STORES OPENING STOCK ENTRY',
        items       : MasOpeningpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
	//closeAction : window.location.href=('http://192.168.11.14/SHVPM/Fuel/FuelMainPage.php'),
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			//if (gstFlag === "Add"){

				RefreshData();


			//}			
	   		
		}
	}
    });
    MasWPOpeningWindow.show();  
});
