Ext.onReady(function(){
   Ext.QuickTips.init();
   

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var fcode = 0;


var loadSupervisorDatastore = new Ext.data.Store({
      id: 'loadSupervisorDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code', 'spvr_name', 'spvr_type'
      ]),
    });

var loadShiftInchargeDatastore = new Ext.data.Store({
      id: 'loadShiftInchargeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftIncharge"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code', 'spvr_name', 'spvr_type'
      ]),
    });

var dtDateMounted = new Ext.form.DateField({
    fieldLabel : 'Mounted Date',
    id         : 'dtDateMounted',
    name       : 'dtDateMounted',
    format     : 'd-m-Y',
    value      : new Date(),

    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    style       :  "font-size:14px;border-radius:10px;font-weight:bold",

    width : 120,
	listeners:{
        select: function(){

	}
	}
});

var cmbShiftMounted = new Ext.form.ComboBox({
        fieldLabel      : 'Mounted Shift ',
        width           : 70,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbShiftMounted',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
      
	listeners:{
        select: function(){

	}
	}
   });


var dtDateRemoved = new Ext.form.DateField({
    fieldLabel : 'Removed Date',
    id         : 'dtDateRemoved',
    name       : 'dtDateRemoved',
    format     : 'd-m-Y',
    value      : new Date(),

    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    style       :  "font-size:14px;border-radius:10px;font-weight:bold",

    width : 120,
	listeners:{
        select: function(){

	}
	}
});

var cmbShiftRemoved = new Ext.form.ComboBox({
        fieldLabel      : 'Removed Shift ',
        width           : 70,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbShiftRemoved',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
      
	listeners:{
        select: function(){

	}
	}
   });

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 300,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSupervisorDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
      
	listeners:{
        select: function(){
	}
	}
   });
   
var cmbShiftIncharge = new Ext.form.ComboBox({
        fieldLabel      : 'Shift Incharge',
        width           : 300,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbShiftIncharge',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShiftInchargeDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
       
	listeners:{
        select: function(){
	}
	}
   });


var loadFeltWireEntryDatastore = new Ext.data.Store({
      id: 'loadFeltWireEntryDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFeltWire.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadFeltWireEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'fw_seqno'
      ]),
    });	

   function RefreshData(){
        txtEntryNo.setRawValue("");
        Ext.getCmp('cmbEntryNo').hide();
        saveflag = "Add";	
	loadFeltWireEntryDatastore.load({
        	 url: 'ClsFeltWire.php', 
              	 params:
        	 {
                     task:"loadFeltWireEntryNo",
                     fincode:GinFinid,
		     compcode:Gincompcode,
               	 },
		  callback:function()
                 {
                   txtEntryNo.setValue(loadFeltWireEntryDatastore.getAt(0).get('fw_seqno'));
                 }
	});	
};


var cmbSection = new Ext.form.ComboBox({
        fieldLabel      : 'Section',
        width           : 300,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbSection',
        typeAhead       : true,
        mode            : 'local',
//        store           : [['F','FELT'],['W','WIRE'],['S','SCREENS']],
        store           : ['Bottom Wire','Top Wire','I Press Top Felt','I Press Bottom Felt','II Press Top Felt','II Press Bottom Felt','Jumbo Press Bottom Felt','Jumbo Press Top Felt' ,'Pre Dryer I Bottom Screen','Pre Dryer I Top Screen','Pre Dryer II Bottom Screen','Pre Dryer II Top Screen','Pre Dryer III Bottom Screen','Pre Dryer III Top Screen','Pre Dryer IV Bottom Screen','Pre Dryer IV Top Screen'
,'Post Dryer I Bottom Screen','Post Dryer I Top Screen'
,'Post Dryer II Bottom Screen','Post Dryer II Top Screen'
 ],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",    
	listeners:{
        select: function(){
   //               refresh();
	}
	}
   });

var cmbLifeStatus = new Ext.form.ComboBox({
        fieldLabel      : 'Life Status',
        width           : 140,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbLifeStatus',
        typeAhead       : true,
        mode            : 'local',
        store           : [['C','Completed'],['N','Not Completed']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style           : "font-size:14px;border-radius:10px;font-weight:bold",    
	listeners:{
        select: function(){
      //            refresh();
	}
	}
   });

var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);

   
var txtFeltWireSize = new Ext.form.TextField({
        fieldLabel  : 'Size ',
        id          : 'txtFeltWire',
        name        : 'txtFeltWire',
        width       :  300,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
          
	listeners:{
/*
          specialkey:function(f,e){

             if (e.getKey() == e.ENTER)
             {
                   flxFeltWireDetails.hide();
           //        cmbSelction.focus();

             }
          },
	    keyup: function () {
                if (txtFeltWire.getRawValue().length > 0)
                { 
		        flxFeltWireDetails.getEl().setStyle('z-index','10000');
		        flxFeltWireDetails.show();
		        loadFeltWireEntryDatastore.removeAll();
		          if (txtFeltWire.getRawValue() != '')
		             ItemSearch();
                }
            }
*/
       }
  });
  

   
var txtFeltWireNo = new Ext.form.TextField({
        fieldLabel  : 'Wire No ',
        id          : 'txtFeltWireNo',
        name        : 'txtFeltWireNo',
        width       :  100,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
          
	listeners:{

       }
  });


var txtProdnGuarantee = new Ext.form.NumberField({
        fieldLabel  : 'Prodn Guarantee ',
        id          : 'txtProdnGuarantee',
        name        : 'txtProdnGuarantee',
        width       :  100,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
          
	listeners:{

       }
  });


var txtProdnYield = new Ext.form.NumberField({
        fieldLabel  : 'Prodn Yield ',
        id          : 'txtProdnYield',
        name        : 'txtProdnYield',
        width       :  100,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
          
	listeners:{

       }
  });


var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No ',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  100,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
        readOnly  : true,     
	listeners:{

       }
  });


var loadEntryNoListDataStore = new Ext.data.Store({
	id: 'loadEntryNoListDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsFeltWire.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadFeltWireEntryList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'fw_seqno'
	]),
});


var loadEntryNoDetailDataStore = new Ext.data.Store({
	id: 'loadEntryNoDetailDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsFeltWire.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadFeltWireEntryDetail"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'fw_supervisor', 'fw_shift_incharge', 'fw_suplier', 'fw_size', 'fw_mounteddate', 'fw_mountedshift', 'fw_section', 'fw_wireno', 'fw_lifestatus', 'fw_removeddate', 'fw_removedshift', 'fw_prod_garantee', 'fw_prod_yield', 'fw_reason'
	]),
});


var cmbEntryNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No ',
        width           : 100,
        displayField    : 'fw_seqno', 
        valueField      : 'fw_seqno',
        hiddenName      : '',
        id              : 'cmbEntryNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEntryNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
 	hidden  	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	listeners:{
          select: function(){
            txtEntryNo.setValue(cmbEntryNo.getValue()),

            loadEntryNoDetailDataStore.removeAll();
            loadEntryNoDetailDataStore.load({
		url: 'ClsFeltWire.php',
		params: {
		    task: 'loadFeltWireEntryDetail',
		    finid    : GinFinid,
		    compcode : Gincompcode,
                    entryno  : cmbEntryNo.getValue(),
		},
              	callback:function()
                {


		dtDateMounted.setRawValue(Ext.util.Format.date(loadEntryNoDetailDataStore.getAt(0).get('fw_mounteddate'),"d-m-Y"));
                cmbShiftMounted.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_mountedshift'));          
		cmbsupervisor.setValue(loadEntryNoDetailDataStore.getAt(0).get('fw_supervisor'));
		cmbShiftIncharge.setValue(loadEntryNoDetailDataStore.getAt(0).get('fw_shift_incharge'));          
		cmbSection.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_section'));          
		txtFeltWireSize.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_size'));          
		txtFeltWireNo.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_wireno'));          
		txtSupplier.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_suplier'));          
		cmbLifeStatus.setValue(loadEntryNoDetailDataStore.getAt(0).get('fw_lifestatus'));          
		txtReason.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_reason'));          
		dtDateRemoved.setRawValue(Ext.util.Format.date(loadEntryNoDetailDataStore.getAt(0).get('fw_removeddate'),"d-m-Y"));          
		cmbShiftRemoved.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_removedshift'));          
		txtProdnGuarantee.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_prod_garantee'));          
		txtProdnYield.setRawValue(loadEntryNoDetailDataStore.getAt(0).get('fw_prod_yield'));          
              }
     	    }); 

          }
	}
   });



var txtSupplier = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  550,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
    	enableKeyEvents: true,
          
	listeners:{

       }
  });

var txtReason = new Ext.form.TextField({
        fieldLabel  : 'Reason',
        id          : 'txtReason',
        name        : 'txtReason',
        width       :  550,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	store       : loadFeltWireEntryDatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

   //                 flxFeltWireDetails.getStore().filter('fw_name', txtFeltWire.getValue());  
            }
        }
  

  });
  
   var FeltWirePanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'FeltWirePanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
//EDIT
                {
                    text: 'Edit',
                    font :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            saveflag = "Edit";
		            Ext.getCmp('cmbEntryNo').show();
		            loadEntryNoListDataStore.removeAll();
		            loadEntryNoListDataStore.load({
	     			url: 'ClsFeltWire.php',
				params: {
				    task: 'loadFeltWireEntryList',
				    finid    : GinFinid,
				    compcode : Gincompcode,
				},
		              	callback:function()
		                {
//				    alert(loadEntryNoListDataStore.getCount());	


		                }
		     	    }); 
                        }
                    }
                },'-',
                  {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( cmbShiftMounted.getRawValue() == '' ) 
				{

					alert("Select Mounted Shift");
					cmbShiftMounted.setFocus();
				}
				else if( cmbsupervisor.getRawValue() == '' ) 
				{

					alert("Select Supervisor Name");
					cmbsupervisor.setFocus();
				}
				else if( cmbShiftIncharge.getRawValue() == '' ) 
				{

					alert("Select Shift Incharge");
					cmbShiftIncharge.setFocus();
				}
				else if( cmbSection.getRawValue() == '' ) 
				{

					alert("Select Section Name");
					cmbSection.setFocus();
				}
				else if( txtFeltWireSize.getRawValue() == '' ) 
				{

					alert("Enter Size of Felt/wire");
					txtFeltWireSize.setFocus();
				}
				else if( txtFeltWireNo.getRawValue() == '' ) 
				{

					alert("Enter Wire No.");
					txtFeltWireNo.setFocus();
				}
				else if( txtSupplier.getRawValue() == '' ) 
				{

					alert("Enter Supplier Name");
					txtSupplier.setFocus();
				}
				else if( cmbLifeStatus.getRawValue() == '' ) 
				{

					alert("Select Life Status");
					cmbLifeStatus.setFocus();
				}
				else if( txtReason.getRawValue() == '' ) 
				{

					alert("Enter Reason");
					txtReason.setFocus();
				}
				else if( cmbShiftRemoved.getRawValue() == '' ) 
				{

					alert("Select Removed Shift ");
					cmbShiftRemoved.setFocus();
				}
				else if( txtProdnGuarantee.getRawValue() == '' ) 
				{

					alert("Enter Production Guarantee");
					txtProdnGuarantee.setFocus();
				}
				else if( txtProdnYield.getRawValue() == '' ) 
				{

					alert("Enter txtProduction Yield");
					txtProdnYield.setFocus();
				}

				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'frmFeltWiresave.php',
                		       	        params:
						{


						     savetype      : saveflag,
						     compcode      : Gincompcode,
						     entryno       : txtEntryNo.getValue(),
						     mounteddate   : Ext.util.Format.date(dtDateMounted.getValue(),"Y-m-d"),
						     mountedshift  : cmbShiftMounted.getValue(),
                                                     supervisor    : cmbsupervisor.getValue(), 
                                                     shiftincharge : cmbShiftIncharge.getValue(), 
                                                     section       : cmbSection.getRawValue(), 
						     size          : txtFeltWireSize.getValue(),
                                                     wireno        : txtFeltWireNo.getRawValue(), 
                                                     supplier      : txtSupplier.getValue(), 
                                                     lifestatus    : cmbLifeStatus.getValue(), 
                                                     reason        : txtReason.getRawValue(),  
						     removeddate   : Ext.util.Format.date(dtDateRemoved.getValue(),"Y-m-d"),
						     removedshift  : cmbShiftRemoved.getValue(), 
                                                     prodgarantee  : Number(txtProdnGuarantee.getValue()),
                                                     prodyield     : Number(txtProdnYield.getValue()),

                                                         
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    FeltWirePanel.getForm().reset();
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                    handler: function(){
                       RefreshData();
                    }
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    handler: function(){	
                            FeltWireWindow.hide();
                    }      
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 505,
                width   : 900,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 100,
                y       : 10,	
                items:[

                               {

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 270,
                                	x           : 10,
                                	y           : 0,
                                  	border      : false,
                                	items: [txtEntryNo]
                                },
                               {

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 270,
                                	x           : 10,
                                	y           : 0,
                                  	border      : false,
                                	items: [cmbEntryNo]
                                },


                               {

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 270,
                                	x           : 10,
                                	y           : 40,
                                  	border      : false,
                                	items: [dtDateMounted]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 250,
                                	x           : 400,
                                	y           : 40,
                                  	border      : false,
                                	items: [cmbShiftMounted]
                                 },
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 450,
                                	x           : 10,
                                	y           : 80,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 450,
                                	x           : 10,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbShiftIncharge]
                                  },  

                       
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 160,
                                    	border      : false,
                                	items: [cmbSection]
                          },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 200,
                                    	border      : false,
                                	items: [txtFeltWireSize]
                          },
                
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 240,
                                    	border      : false,
                                	items: [txtFeltWireNo]
                          },
                
			  { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 280,
                                    	border      : false,
                                	items: [txtSupplier]
                          },
                

                  			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 320,
                                    	border      : false,
                                	items: [cmbLifeStatus]
                          },                        
                          
                  			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 10,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtReason]
                          }, 



                               {

                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 270,
                                	x           : 10,
                                	y           : 400,
                                  	border      : false,
                                	items: [dtDateRemoved]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 250,
                                	x           : 400,
                                	y           : 400,
                                  	border      : false,
                                	items: [cmbShiftRemoved]
                                 },

			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 10,
                                	y           : 440,
                                  	border      : false,
                                	items: [txtProdnGuarantee]
                                 },

			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 250,
                                	x           : 400,
                                	y           : 440,
                                  	border      : false,
                                	items: [txtProdnYield]
                                 },

       /*                         

    			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 110,
                                	width       : 1000,
                                	x           : 150,
                                	y           : 165,
                                    	border      : false,
                                	items: [flxFeltWireDetails]
                          },
*/



       ]
       
       }
       ]
       
 
});
   
 
 var FeltWireWindow = new Ext.Window({
	height      : 610,
        width       : 1200,
        y           : 30,
        title       :'FELT / WIRE / SCREEN REPLACEMENT ENTRY',
        items       : 'FeltWirePanel',
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
    //               flxFeltWireDetails.hide();
             }
             }
            });
             
            FeltWireWindow.show();  
        });      
   
