Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
   
   var io = "I";
   var gstFlag = "Add";

   var txtEntryNo = new Ext.form.TextField({
        fieldLabel  : 'Entry No',
        id          : 'txtEntyNo',
        name        : 'txtEntyNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
	//	disabled : true,
		tabindex : 2
    });

   var txtTo = new Ext.form.TextField({
        fieldLabel  : 'Letter To',
        id          : 'txtTo',
        name        : 'txtTo',
        width       :  300,
        style       :  {textTransform: "uppercase"},
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
	//	disabled : true,
		tabindex : 2
    });

   var txtItem = new Ext.form.TextField({
        fieldLabel  : 'Item',
        id          : 'txtItem',
        name        : 'txtItem',
        width       :  300,
        style       :  {textTransform: "uppercase"},
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
	//	disabled : true,
		tabindex : 2
    });
	

   var txtDestination = new Ext.form.TextField({
        fieldLabel  : 'Destination',
        id          : 'txtDestination',
        name        : 'txtDestination',
        width       :  250,
        style       :  {textTransform: "uppercase"},
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
	//	disabled : true,
		tabindex : 2
    });
	
   var txtReference = new Ext.form.TextField({
        fieldLabel  : 'Reference',
        id          : 'txtReference',
        name        : 'txtReference',
        width       :  250,
        style       :  {textTransform: "uppercase"},
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
	//	disabled : true,
		tabindex : 2
    });
	

    var dtInward= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtInward',
        name: 'Date',
        width :  140,
        format: 'd-m-Y',
        readOnly : false,
        value: new Date(),
         	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
    });


 var loadEntryNoListDataStore = new Ext.data.Store({
      id: 'loadEntryNoListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOutward.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntryNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['io_entryno']),
    });

 var loadEntryNoDetailDataStore = new Ext.data.Store({
      id: 'loadEntryNoListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOutward.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntryNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['io_entryno', 'io_date', 'io_dept', 'io_fromto', 'io_item','io_letter_type', 'io_recd_thru','io_destination','io_tracking_no', 'io_handover', 'department_name','io_reference']),
    });

 var loadDeptDataStore = new Ext.data.Store({
      id: 'loadDeptDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOutward.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDepartment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['department_code', 'department_name']),
    });


 var loadIONoDataStore = new Ext.data.Store({
      id: 'loadIONoDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOutward.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInwardNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['entryno']),
    });



var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'Department',
        width           : 250,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbDept',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDeptDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
   });


var cmbLetterType = new Ext.form.ComboBox({
        fieldLabel      : 'Item Type',
        width           : 250,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbLetterType',
        typeAhead       : true,
        mode            : 'local',
        store           : ['PARCEL','COVER'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
   });





var cmbSentby = new Ext.form.ComboBox({
        fieldLabel      : 'Sent Thru',
        width           : 250,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbSentby',
        typeAhead       : true,
        mode            : 'local',
        store           : ['BY POST','BY COURIER','BY PERSON'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
   });


var cmbEntryNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No',
        width           : 100,
        displayField    : 'io_entryno', 
        valueField      : 'io_entryno',
        hiddenName      : '',
        id              : 'cmbEntryNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEntryNoListDataStore ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true  ,
      	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",       
        listeners:{
                select: function () {
                  	loadEntryNoDetailDataStore.load({
			url: 'ClsOutward.php',
			params: {
			        task: 'loadEntryNoDetail',
				iotype :'O',
                                entryno: cmbEntryNo.getValue()   

          
			},
                      	callback:function()
                  	{
                                txtEntryNo.setValue(cmbEntryNo.getValue()); 
                                dtInward.setRawValue(Ext.util.Format.date(loadEntryNoDetailDataStore.getAt(0).get('io_date'),"d-m-Y"));
                                txtTo.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_fromto'));
                                txtItem.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_item'));
                                txtDestination.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_destination'));
                                cmbDept.setValue(loadEntryNoDetailDataStore.getAt(0).get('io_dept'));
                                cmbLetterType.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_letter_type'));
                                cmbSentby.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_recd_thru'));
                                txtReference.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('io_reference'));
	
	
                        }
                       }); 

                }

	}

});


   function RefreshData(){

	        txtTo.setRawValue("");
        txtItem.setRawValue("");
        txtDestination.setRawValue("");

        var gstFlag = "Add";	
	loadDeptDataStore.removeAll();
	loadDeptDataStore.load({
	 url: 'ClsOutward.php',
                params: {
	    	task: 'loadDepartment',
		}
	  });

	loadIONoDataStore.removeAll();
		loadIONoDataStore.load({
		 url: 'ClsOutward.php',
	                params: {
        	    	task   : 'loadInwardNo',
	                iotype : 'O',
                        },
			scope:this,
			callback:function()
               		{
			var cnt = loadIONoDataStore.getCount();


                        if (loadIONoDataStore.getAt(0).get('entryno') == 1) {
                            txtEntryNo.setValue("1");
                           }    
                          else {
                           txtEntryNo.setValue(loadIONoDataStore.getAt(0).get('entryno'));
                         } 


			}

         });

};

   var InwardPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 350,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'InwardPanel',
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
                

//EDIT
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
//alert(usertype);
                    gstFlag = "Edit";
                    Ext.getCmp('cmbEntryNo').show();

  
                    loadEntryNoListDataStore.removeAll();
                    loadEntryNoListDataStore.load({
     			url: 'ClsOutward.php',
			params: {
			    task : 'loadEntryNoList',
			    iotype : 'O',
  		        },
                      	callback:function()
                        {
//			    alert(loadInvoicelistDataStore.getCount());	


                        }
             	    });



                }
            }
        },'-',

         {
//SAVE
                    text: 'Save',
                    id  : 'save' ,
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

	                	if(txtTo.getRawValue()=="" || txtTo.getRawValue()==0)
				{
					alert("Enter Letter To");
					txtTo.setFocus();
				}
                          	else if(txtItem.getValue()=="" || txtItem.getValue()==0)
				{
					alert("Enter Item Name");
					txtItem.setFocus();
				}
                         	else if(cmbDept.getRawValue()=="" || cmbDept.getValue()==0)
				{
					alert("Select Department..");
					cmbDept.setFocus();
				}
                         	else if(cmbLetterType.getRawValue()=="" || cmbLetterType.getValue()==0)
				{
					alert("Select Letter Type..");
					cmbLetterType.setFocus();
				}
                         	else if(cmbSentby.getRawValue()=="" || cmbSentby.getValue()==0)
				{
					alert("Select Sent Through..");
					cmbSentby.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You Want to save the Record',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'OutwardSave.php',
		                                params:
						{
                                                savetype       : gstFlag,
						io_tag         : 'O',
						io_entryno     : txtEntryNo.getRawValue(),
						io_date        : Ext.util.Format.date(dtInward.getValue(),"Y-m-d"),
						io_dept        : cmbDept.getValue(),
						io_fromto      : txtTo.getRawValue(),
						io_item        : txtItem.getRawValue(),
						io_letter_type : cmbLetterType.getRawValue(),
						io_recd_thru   : cmbSentby.getRawValue(),
						io_destination : txtDestination.getRawValue(),
						io_handover    : '',
						io_reference   : txtReference.getRawValue(),
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    InwardPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
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
                            InwardWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
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
                                	items: [txtEntryNo]
                            },
   			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbEntryNo]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [dtInward]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtTo]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbDept]
                            },	
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 500,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtItem]
                            } ,
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmbLetterType]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [cmbSentby]
                            },		
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtDestination]
                            },	
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 320,
                                    	border      : false,
                                	items: [txtReference]
                            },	

                ]
            }
        ],
    });
    
   
    var InwardWindow = new Ext.Window({
	height      : 580,
        width       : 700,
        y           : 35,
        title       : 'OUTWARD ENTRY',
        items       : InwardPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                        RefreshData();
			txtTo.focus();
	                      }
			
		}
    });
//   Ext.getCmp('save').setDisabled(true);
    InwardWindow.show();  
});
