Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');
   var gstStatus = "N";
   var gstFlag = "Add";
   var itemgrpcode = 0;
   var edwtno = 0, wtno = 0 ;

 var loadsupplierdatastore = new Ext.data.Store({
      id: 'loadsupplierdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'sup_code', type: 'int',mapping:'sup_code'},
	{name:'sup_refname', type: 'string',mapping:'sup_refname'}
      ]),
    });

 var loadWBSlNoDatastore = new Ext.data.Store({
      id: 'loadWBSlNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWBSlNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'wc_seqno', 'wc_no'
      ]),
    });


	var loadareadatastore = new Ext.data.Store({
      id: 'loadareadatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadarea"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'area_code', type: 'int',mapping:'area_code'},
	{name:'area_name', type: 'string',mapping:'area_name'}
      ]),
    });
	
	var loadsupervisordatastore = new Ext.data.Store({
      id: 'loadsupervisordatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'spvr_code', type: 'int',mapping:'spvr_code'},
	{name:'spvr_name', type: 'string',mapping:'spvr_name'}
      ]),
    });

var loadwtcardnodatastore = new Ext.data.Store({
      id: 'loadwtcardnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwtcardno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'wc_seqno', 'wc_compcode', 'wc_fincode', 'wc_no', 'wc_date', 'wc_area_code', 'wc_sup_code', 'wc_itemgrp', 'wc_supervisor', 'wc_vehicleno', 'wc_transportname', 'wc_wb_no', 'wc_tarewt', 'wc_netwt', 'wc_status', 'wc_usr_code', 'wc_entry_date','wc_grosswt','wc_unloadingtime'
      ]),
    });

	var txtWeighSlipNo = new Ext.form.NumberField({
        fieldLabel  : 'Weight Sl.No',
        id          : 'txtWeighSlipNo',
        name        : 'txtWeighSlipNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
	tabindex : 2,
	listeners   : {
	blur        : function() {

		if (gstFlag === "Edit" && (txtWeighSlipNo.getValue() > 0 || txtWeighSlipNo.getValue() === "")) {


		}
	}
	}
    });

var btnAddArea = new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "Add Area",
    width   : 120,
    height  : 40,
    x       : 880,
    y       : 105,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   
             Ext.getCmp('areabox').setVisible(true);
        }
     }
});


var btnSave =   new Ext.Button({
    style   : 'text-align:center;background-color":"#ebebdf" ',
    text    : "Save",
    width   : 120,
    height  : 40,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){   


		Ext.Ajax.request({
            	url: '/SHVPM/RawMaterial/MasArea/FrmMasAreaSave.php',
       	        params:
		{

			loadingArea : txtAreaName.getRawValue()
		},
		callback: function (options, success, response)
        	{
            	var obj = Ext.decode(response.responseText);
            	if (obj['success'] === "true") 
		{

		Ext.MessageBox.alert("Alert","Saved ");
                Ext.getCmp('areabox').setVisible(false);
 			loadareadatastore.removeAll();
			loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });               

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
     
var cmbWeighSlipNo = new Ext.form.ComboBox({
        fieldLabel      : 'Weight Sl.No',
        width           : 100,
        displayField    : 'wc_no', 
        valueField      : 'wc_seqno',
        hiddenName      : '',
        id              : 'cmbWeighSlipNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadWBSlNoDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
        listeners:{
           select: function(){

                        txtWeighSlipNo.setValue(cmbWeighSlipNo.getValue());
                        txtWeighSlipNo.setRawValue(cmbWeighSlipNo.getRawValue());


			loadwtcardnodatastore.removeAll();
			loadwtcardnodatastore.load({
			url: 'ClsRmWtCard.php',
			params: {
				task: 'loadwtcardno',
				compcode : Gincompcode,
				finid : GinFinid,
				wtno : txtWeighSlipNo.getValue(),
				gstFlag : gstFlag
			},
			callback:function()
			{
				if (loadwtcardnodatastore.getCount() > 0) {

				edwtno = loadwtcardnodatastore.getAt(0).get('wc_seqno');
				dtWeighSlipDate.setRawValue(Ext.util.Format.date(loadwtcardnodatastore.getAt(0).get('wc_date'),'d-m-Y'));
				dtUnloading.setRawValue(Ext.util.Format.date(loadwtcardnodatastore.getAt(0).get('wc_unloadingtime'),'d-m-Y H.i'));
				cmbsupplier.setValue(loadwtcardnodatastore.getAt(0).get('wc_sup_code'));
				cmbarea.setValue(loadwtcardnodatastore.getAt(0).get('wc_area_code'));
				cmbitemgroup.setValue(loadwtcardnodatastore.getAt(0).get('wc_itemgrp'));	
				cmbsupervisor.setValue(loadwtcardnodatastore.getAt(0).get('wc_supervisor'));
				txttransport.setValue(loadwtcardnodatastore.getAt(0).get('wc_transportname'));	
				txtvehicle.setValue(loadwtcardnodatastore.getAt(0).get('wc_vehicleno'));	
				txtWbTicketNo.setValue(loadwtcardnodatastore.getAt(0).get('wc_wb_no'));	
				txttarewt.setValue(loadwtcardnodatastore.getAt(0).get('wc_tarewt'));	
				txtnetwt.setValue(loadwtcardnodatastore.getAt(0).get('wc_netwt'));	
				txtgrosswt.setValue(Number(loadwtcardnodatastore.getAt(0).get('wc_grosswt')));	

				}//if cnt > 0
				else if(gstFlag === "Edit" && txtWeighSlipNo.getValue() > 0 ) {
					Ext.MessageBox.alert("Weight Card", "Weight Card Details not found");
				}
			
			}
			});
			
	   }
        }      
   });

 var loadSupplierListDatastore = new Ext.data.Store({
      id: 'loadSupplierListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRmWtCard.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'sup_code', 'sup_refname'
 

      ]),
    });


   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 420,
        x: 0,
        y: 35,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'sup_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Supplier Name", dataIndex: 'sup_refname',sortable:true,width:330,align:'left'},
        ],
        store:loadSupplierListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('sup_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow = selrow;

				cmbsupplier.setValue(selrow.get('sup_code'));
	     

			}
		}
 
    
   }
   });
function itemSearch()
{

        loadSupplierListDatastore.removeAll();
        loadSupplierListDatastore.load({
		url: 'ClsRmWtCard.php',
		params:
		{
			task:"loadSearchitemlist",
			party    : txtSearch.getRawValue(),
		},
        });
}



var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  200,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSupplierListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     itemSearch();
            }
         }  
    });




var dtWeighSlipDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtWeighSlipDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
    listeners:{
            change:function(){
            }
    }
});

var dtUnloading = new Ext.form.DateField({
    fieldLabel : 'Unloading Time',
    id         : 'dtUnloading',
    name       : 'date',
    format     : 'd-m-Y H.i',
    value      : new Date(),
//    anchor     : '100%',
    width : 150,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    //readOnly: true,
    listeners:{
            change:function(){
            }
    }
}); 
var cmbitemgroup = new Ext.form.ComboBox({
        fieldLabel      : 'Item Group',
        width           : 250,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbitemgroup',
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        typeAhead       : true,
        mode            : 'local',
        store           : [['1','WASTE PAPER'],['2','FUEL'],['3','GENERAL STORES'],['4','OTHERS']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbarea = new Ext.form.ComboBox({
        fieldLabel      : 'Area',
        width           : 250,
        displayField    : 'area_name', 
        valueField      : 'area_code',
        hiddenName      : '',
        id              : 'cmbarea',
        typeAhead       : true,
        mode            : 'local',
        store           : loadareadatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false
   });

var cmbsupplier = new Ext.form.ComboBox({
        fieldLabel      : 'Supplier',
        width           : 350,
        displayField    : 'sup_refname', 
        valueField      : 'sup_code',
        hiddenName      : '',
        id              : 'cmbsupplier',
        typeAhead       : true,
        mode            : 'local',
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        store           : loadsupplierdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:
		{
		select:function()
				{
				cmbarea.focus();
				loadareadatastore.removeAll();
				loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });
				}
		
		}
   });

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 250,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadsupervisordatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false,
	listeners:
		{
		select:function()
				{
				cmbitemgroup.focus();
				
				}
		
		}
   });


 var txttransport = new Ext.form.TextField({
        fieldLabel  : 'Transport',
        id          : 'txttransport',
        name        : 'txttransport',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });
 
 var txtvehicle = new Ext.form.TextField({
        fieldLabel  : 'Vehicle No',
        id          : 'txtvehicle',
        name        : 'txtvehicle',
        width       :  120,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

 var txtAreaName = new Ext.form.TextField({
        fieldLabel  : 'Area',
        id          : 'txtAreaName',
        name        : 'txtAreaName',
        width       :  170,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

 var txtWbTicketNo = new Ext.form.NumberField({
        fieldLabel  : 'WB Ticket No',
        id          : 'txtWbTicketNo',
        name        : 'txtWbTicketNo',
        width       :  100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

function find_netwt()
{
		if ( Number(txtgrosswt.getValue()) > 0 && Number(txttarewt.getValue())>Number(txtgrosswt.getValue()))
			{
			alert("Tare Weight should be less than Gross Weight..");

			txtgrosswt.focus();
			txtgrosswt.setValue("");
			}
			txtnetwt.setValue(Number(txtgrosswt.getValue()) - Number(txttarewt.getValue()));
			
}

var txtgrosswt = new Ext.form.NumberField({
        fieldLabel  : 'Loaded Wt(Kgs)',
        id          : 'txtgrosswt',
        name        : 'txtgrosswt',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
	   blur:function()
		{
                     find_netwt();
		},
	    change:function()
		{
                     find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}
}
    });

var txtnetwt = new Ext.form.NumberField({
        fieldLabel  : 'Net Wt(Kgs)',
        id          : 'txtnetwt',
        name        : 'txtnetwt',
        width       :  100,        
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	readOnly : true
    });

var txttarewt = new Ext.form.NumberField({
        fieldLabel  : 'Empty Wt(Kgs)',
        id          : 'txttarewt',
        name        : 'txttarewt',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  false,
	tabindex : 1,
	enableKeyEvents: true,
	listeners:{
	     blur: function()
		{
                   find_netwt();
		},
	    change: function()
		{
                  find_netwt();
		},
	    keyup:function()
		{
                     find_netwt();			
		}
}
    });


   function RefreshData(){
                        Ext.getCmp('areabox').setVisible(false);

			txtWeighSlipNo.setValue('');
			txtWeighSlipNo.show();
			cmbWeighSlipNo.hide();
			gstFlag = "Add";
			loadwtcardnodatastore.removeAll();
			loadwtcardnodatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadwtcardno",
				 compcode : Gincompcode,
				 finid : GinFinid,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{
					txtWeighSlipNo.setValue(loadwtcardnodatastore.getAt(0).get('wc_no'));
				}
				 });
};

   var TrnWeightcardformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WEIGHT CARD ENTRY',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnWeightcardformpanel',
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
//edit
				text: 'View',
				style  : 'text-align:center;',
				tooltip: 'View Details...',
				height: 40,
				fontSize:20,
				width:50,
				icon: '/Pictures/edit.png',
				listeners:{
	                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(Gincompcode);
				var fincode = "&fincode=" + encodeURIComponent(GinFinid);
				var entryno = "&ticketno=" + encodeURIComponent(txtWbTicketNo.getValue());
				var param =(compcode+fincode+entryno);
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMWeighslip.rptdesign&__format=pdf&' + param, '_blank'); 
                                }
				}
			},'-',
			{
//edit
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
						txtWeighSlipNo.hide();
						cmbWeighSlipNo.show();
                           loadWBSlNoDatastore.removeAll();
                           loadWBSlNoDatastore.load({
			     url: 'clsRmWtCard.php',
			     params:
				    {
				        task: "loadWBSlNoList",
				        finid: GinFinid,
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
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if(txtWeighSlipNo.getRawValue()=="" || txtWeighSlipNo.getValue()==0)
				{
					alert("Enter the Weight Card No");
					txtWeighSlipNo.focus();
				}
				else if(cmbsupplier.getRawValue()=="" || cmbsupplier.getValue()==0)
				{
					alert("Select Supplier");
					cmbsupplier.focus();
				}
				else if(cmbarea.getRawValue()=="" || cmbarea.getValue()==0)
				{
					alert("Select Area");
					cmbarea.focus();
				}
				else if(cmbitemgroup.getRawValue()==""  )
				{
					alert("Select Itemgroup..");
					cmbitemgroup.focus();
				}
				else if(txtvehicle.getRawValue()=="" || txtvehicle.getRawValue()==0)
				{
					alert("Enter Vehicle No..");
					txtvehicle.focus();
				}
				else if(txtWbTicketNo.getRawValue()=="" || txtWbTicketNo.getRawValue()==0)
				{
					alert("Enter WB Ticket No..");
					txtWbTicketNo.focus();
				}
				else if(txtgrosswt.getValue()=="" || txtgrosswt.getValue()==0)
				{
					alert("Enter Gross Wt..");
					txtgrosswt.focus();
				}
				else if(txtnetwt.getValue()=="" || txtnetwt.getValue()==0)
				{
					alert("Enter Net Wt..");
					txtnetwt.focus();
				}
				else if(txttarewt.getValue()=="" || txttarewt.getValue()==0)
				{
					alert("Enter Tare Wt..");
					txttarewt.focus();
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
		                            	url: 'TrnRmWeightcardSave.php',
                		       	        params:
						{
							compcode	:Gincompcode,
							finid		:GinFinid,
							wtdate		:Ext.util.Format.date(dtWeighSlipDate.getValue(),"Y-m-d"),
							unloadingtime	:Ext.util.Format.date(dtUnloading.getValue(),"Y-m-d H:i"),
							supplier	:cmbsupplier.getValue(),
							area		:cmbarea.getValue(),
							itemgrp		:cmbitemgroup.getValue(),
							supervisor	:'1',
							transport	:'',
							vehicleno	:txtvehicle.getRawValue(),
							wbcardno	:txtWbTicketNo.getRawValue(),
							grosswt		:txtgrosswt.getRawValue(),
							netwt		:txtnetwt.getRawValue(),
							tarewt		:txttarewt.getRawValue(),
							userid		:userid,
							edwtno		:edwtno,
							gstFlag		:gstFlag,
							wtno		:txtWeighSlipNo.getValue()
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
							Ext.MessageBox.alert("Weight Card No Is: " + obj['wtno']);
						    	TrnWeightcardformpanel.getForm().reset();
							RefreshData();

                                                }
                                             	else 
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
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            TrnWeightcardformpanel.getForm().reset();
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
                            TrnWightcardWindow.hide();
                        }
                }]
        },
        items: [


            { xtype   : 'fieldset',
                title   : 'WEIGHMENT SLIP ENTRY',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 570,
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
                                	items: [txtWeighSlipNo]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbWeighSlipNo]
                            },
			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 320,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtWbTicketNo]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 250,
                                	y           : 40,
                                    	border      : false,
                                	items: [dtWeighSlipDate]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [dtUnloading]
                            },


/*
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 600,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbsupervisor]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txttransport]
                            },

*/
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 600,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbsupplier]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbarea]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 420,
                                	x           : 400,
                                	y           : 155,
                                    	border      : false,
                                	items: [btnAddArea]
                            },


				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [cmbitemgroup]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [txtvehicle]
                            },
			

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 240,
                                	x           : 0,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtgrosswt]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 240,
                                	x           : 0,
                                	y           : 320,
                                    	border      : false,
                                	items: [txttarewt]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 240,
                                	x           : 00,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtnetwt]
                            },


            { xtype   : 'fieldset',
                title   : 'ADD NEW AREA NAME',
     //           layout  : 'hbox',
                border  : false,
                height  : 150,
                width   : 250,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 280,
                y       : 250,
                id      : 'areabox',
                items:[
              		{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 40,
                        	width       : 400,
                        	x           : 0,
                        	y           : 0,
                            	border      : false,
                        	items: [txtAreaName]
                        },
              		{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 40,
                        	width       : 400,
                        	x           : 50,
                        	y           : 50,
                            	border      : false,
                        	items: [btnSave]
                        },

                      ]   
            },

                ]

            },

            { xtype   : 'fieldset',
                title   : 'Supplier Search',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 460,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 590,
                y       : 10,
                items:[ 
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 520,
                                	x           : 10,
                                	y           : -10,
                                    	border      : false,
                                	items: [txtSearch]
                            },flxParty,
                ]
             },
            
        ],
    });
    
   
    var TrnWightcardWindow = new Ext.Window({
	height      : 560,
        width       : 1100,
        y           : 35,
        title       : 'WEIGHT CARD ENTRY',
        items       : TrnWeightcardformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
       Ext.getCmp('areabox').setVisible(false);
                        cmbWeighSlipNo.hide();
			txtWeighSlipNo.focus();
			loadwtcardnodatastore.removeAll();
			loadwtcardnodatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadwtcardno",
				 compcode : Gincompcode,
				 finid : GinFinid,
				 gstFlag : gstFlag
                        	 },
				callback:function()
				{
				txtWeighSlipNo.setValue(loadwtcardnodatastore.getAt(0).get('wc_no'));
				}
				 });

			loadsupplierdatastore.removeAll();
			loadsupplierdatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
                        	 }
				 });

			loadareadatastore.removeAll();
			loadareadatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadarea"
                        	 }
				 });
/*
			loadsupervisordatastore.removeAll();
			loadsupervisordatastore.load({
                        	 url:'ClsRmWtCard.php',
                        	 params:
                       		 {
                         	 task:"loadsupervisor"
                        	 }
				 });
*/
			cmbitemgroup.setValue(1);			
	   			 }

		}
    });
    TrnWightcardWindow.show();  
});
