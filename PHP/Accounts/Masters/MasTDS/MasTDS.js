Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



 var saveflag = "Add";
 var tdscode =0;

 var loadTDSListDatastore = new Ext.data.Store({
      id: 'loadTDSListDatastore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTDS.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTDSList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'tds_code','tds_ledcode','tds_name', 'tds_description', 'tds_per'

      ]),
    });


 var loadTDSLedgerDatastore = new Ext.data.Store({
      id: 'loadTDSLedgerDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTDS.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadTDSLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'led_code', 'led_name'

      ]),
    });

     var cmbTDSName = new Ext.form.ComboBox({
        fieldLabel      : 'Select TDS Name',
        width           :  350,
        displayField    : 'led_name',
        valueField      : 'led_code',
        hiddenName      : 'led_name',
        id              : 'cmbTDSName',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadTDSLedgerDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
	
         }
        }   
});  
        

   var txtTDSDescription = new Ext.form.TextField({
        fieldLabel  : 'Description',
        id          : 'txtTDSDescription',
        name        : 'txtTDSDescription',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });


  var txtTDSPer = new Ext.form.NumberField({
        fieldLabel  : 'TDS %',
        id          : 'txtTDSPer',
        name        : 'txtTDSPer',
        width       :  50,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });


   function RefreshData(){

	cmbTDSName.setValue("");
        saveflag = "Add";
        tdscode =0;
        loadTDSListDatastore.removeAll();
	loadTDSListDatastore.load({
          url:'ClsTDS.php',
          params:
       	  {
           task:"loadTDSList"
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
        height: 300,
        width: 900,
        x: 150,
        y: 190,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   

		{header: "TDS Code", dataIndex: 'tds_code',sortable:true,width:90,align:'left'}, 
		{header: "Led Code", dataIndex: 'tds_ledcode',sortable:true,width:90,align:'left'},   
		{header: "TDS Name", dataIndex: 'tds_name',sortable:true,width:300,align:'left'},
		{header: "Description", dataIndex: 'tds_description',sortable:true,width:350,align:'left'},
		{header: "TDS %", dataIndex: 'tds_per',sortable:true,width:90,align:'left'},

       ],
       store:loadTDSListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			tdscode = selrow.get('tds_code');
			cmbTDSName.setRawValue(selrow.get('tds_name'));
			txtTDSDescription.setRawValue(selrow.get('tds_description'));
			txtTDSPer.setValue(selrow.get('tds_per'));


			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });


   var MasTDSPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'TDS MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasTDSPanel',
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
	
				if(cmbTDSName.getRawValue()=="" || cmbTDSName.getValue()==0)
				{
					alert("Enter TDS Name");
					cmbTDSName.focus();
				}
				else if(txtTDSPer.getRawValue() =="" )
				{
					alert("Enter TDS Percentage ");
					txtTDSPer.focus();
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
		                            	url: 'MasTDSSave.php',
                		       	        params:
						{
                                                        savetype : saveflag,
                                                        tdscode  : tdscode,   
							ledcode  : cmbTDSName.getValue(),
							tdsname  : cmbTDSName.getRawValue(),
							tdsdesc  : txtTDSDescription.getRawValue(),
							tdsper   : txtTDSPer.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasTDSPanel.getForm().reset();
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
                            MasTDSWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'TDS MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 170,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 550,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbTDSName]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 550,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtTDSDescription]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 450,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtTDSPer]
                            },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasTDSWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'TDS MASTER',
        items       : MasTDSPanel,
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
			cmbTDSName.focus();
				loadTDSListDatastore.load({
                        	 url:'ClsTDS.php',
                        	 params:
                       		 {
                         	 task:"loadTDSList"
                        	 }
				 });
	   			 }
			
		}
    });
    MasTDSWindow.show();  
});
