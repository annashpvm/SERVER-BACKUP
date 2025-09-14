Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');

 var saveflag = "Add";
 var unitcode =0;

 var loadUnitListDatastore = new Ext.data.Store({
      id: 'loadUnitListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsUnit.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadUnit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
          'uom_code', 'uom_name', 'uom_short_name'
      ]),
    });


  var loadledgerdatastore = new Ext.data.Store({
      id: 'loadledgerdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPurchaseGroup.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });


	var txtUnitName = new Ext.form.TextField({
        fieldLabel  : 'Unit Name',
        id          : 'txtUnitName',
        name        : 'txtUnitName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });


	var txtUnitShortName = new Ext.form.TextField({
        fieldLabel  : 'Unit Short Name',
        id          : 'txtUnitShortName',
        name        : 'txtUnitShortName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });

 
   function RefreshData(){

	txtUnitName.setValue("");
        saveflag = "Add";
        unitcode =0;
        loadUnitListDatastore.removeAll();
	loadUnitListDatastore.load({
          url:'ClsUnit.php',
          params:
       	  {
           task:"loadUnit"
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
        height: 350,
        width: 600,
        x: 300,
        y: 140,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   


		{header: "Unit Code", dataIndex: 'uom_code',sortable:true,width:90,align:'left',hidden:true},   
		{header: "Unit Name", dataIndex: 'uom_name',sortable:true,width:140,align:'left'},
		{header: "Unit Short Name", dataIndex: 'uom_short_name',sortable:true,width:140,align:'left'},

        ],
       store:loadUnitListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			unitcode = selrow.get('uom_code');
			txtUnitName.setRawValue(selrow.get('uom_name'));
			txtUnitShortName.setRawValue(selrow.get('uom_short_name'));
			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });


   var MasUnitformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'UNIT MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasUnitformpanel',
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
	
				if(txtUnitName.getRawValue()=="" || txtUnitName.getRawValue()==0)
				{
					alert("Enter Group Name");
					txtUnitName.focus();
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
		                            	url: 'MasUnitSave.php',
                		       	        params:
						{
                                                        savetype   : saveflag,
                                                        unitcode   : unitcode,   
							unitname  : txtUnitName.getRawValue(),
							unitshortname  : txtUnitShortName.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasUnitformpanel.getForm().reset();
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
                            MasUnitWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'UNIT MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 120,
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
                                	width       : 450,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtUnitName]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 450,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtUnitShortName]
                            },
	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasUnitWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'UNIT MASTER',
        items       : MasUnitformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtUnitName.focus();

		} 	
		}
    });
    MasUnitWindow.show();  
});
