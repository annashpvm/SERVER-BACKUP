Ext.onReady(function(){
   Ext.QuickTips.init();



var GetProdGroupDatastore = new Ext.data.Store({
      id: 'GetProdGroupDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clstest.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadProdGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'vargrp_type_code','vargrp_type_name','vargrp_type_short_code', 'vargrp_type_hsncode'
      ]),
    });	

   function RefreshData(){
        txtName.setRawValue("");	
	GetProdGroupDatastore.load({
        	 url: 'ClsMasProdType.php', 
              	 params:
        	 {
                	 task:"loadProdGroup"
               	 }
	});	
};

   var dgrecord = Ext.data.Record.create([]);
   var Flxtest = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 800,
        x: 0,
        y: 200,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

        
        columns: [    
            {header: "Prod code"    , Id: 'vargrp_type_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Product Name", Id: 'vargrp_type_name', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "Code"        , Id: 'vargrp_type_short_code', sortable:true,width:100,align:'left', menuDisabled: true}, 
            {header: "HsnCode"     , Id: 'vargrp_type_hsncode', sortable:true,width:100,align:'left', menuDisabled: true},                  
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('vargrp_type_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtName.getValue()) {
    return 'vargrp_type_name'
    }
}
},
store:GetProdGroupDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = Flxtest.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			qlycode = selrow.get('vargrp_type_code');
			txtName.setValue(selrow.get('vargrp_type_name'));
			txtCode.setValue(selrow.get('vargrp_type_short_code'));
			txtHsn.setValue(selrow.get('vargrp_type_hsncode'));
			Flxtest.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });
var btnAdd = new Ext.Button({
     border: 1,
          style: {
              borderColor: 'Blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 80,
    height  : 35,
    x       : 230,
    y       : 200,
  listeners:{
        click: function(){       
            add_btn_click();
       }
     }
});
var loadreligiondatastore = new Ext.data.Store({
      id: 'loadreligiondatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clstest.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadReligion"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'religion_code','religion_name'
      ]),
    });	
 
          var cmbReligion = new Ext.form.ComboBox({
        fieldLabel      : 'Religion',
        width           : 200,
        displayField    : 'religion_name', 
        valueField      : 'religion_code',
        hiddenName      : '',
        id              : 'cmbReligion',
        typeAhead       : true,
        mode            : 'local',
        store           :loadreligiondatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          });
 var loadcommunitydatastore = new Ext.data.Store({
      id: 'loadcommunitydatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clstest.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadCommunity"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'comm_code','comm_name'
      ]),
    });	        
        var cmbCommunity = new Ext.form.ComboBox({
        fieldLabel      : 'Community',
        width           : 200,
        displayField    : 'comm_name', 
        valueField      : 'comm_code',
        hiddenName      : '',
        id              : 'cmbCommunity',
        typeAhead       : true,
        mode            : 'local',
        store           :loadcommunitydatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          });
 
 var dtTest= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtTest',
        name: 'Date',
        format: 'd-m-Y',
        labelStyle   : "font-size:14px;font-weight:bold;color:#ab28ab",
        value: new Date()
   });

var txtName = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtName',
        name        : 'txtName',
        width       :  150,
        
        
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",

	tabindex : 2,
	//store       : loadqualificationdatastore,
    	enableKeyEvents: true,
        
  });
  
var TestPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       :600,
    height      : 100,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'TestPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                 
                },'-',                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'VINOMADHU',
                layout  : 'hbox',
                border  : true,
                height  : 420,
                width   : 500,
  
		style   : { border:'1px solid green'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 260,
                y       : 25,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 500,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtName]
                          },
			  { 
				        xtype       : 'fieldset',
				        title       : '',
				        labelWidth  : 60,
			                width       : 200,
			                x           : 230,
			                y           : -5,
			                border      : false,
			                items: [dtTest]
		          },
 			  { 
                                         xtype       : 'fieldset',
                                         title       : '',
                                         labelWidth  : 80,
                                         width       : 150,
                                         x           : 320,
                                         y           : 100,
                                         border      : false,
                                         items: [btnAdd]
                          },
                          { 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 85,
                          border      : false,
                          items: [cmbReligion]
                       },
{ 
                          xtype       : 'fieldset',
                          title       : '',
                          labelWidth  : 100,
                          width       : 400,
                          x           : 0,
                          y           : 130,
                          border      : false,
                          items: [cmbCommunity]
                       },Flxtest,
                                          
                     

       ]
       
       }
       ]
       
 
});
   

var TestWindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 50,
        title       :'TEST MASTER',
        items       : 'TestPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){
         //      RefreshData();
             }
             }
            });
             
            TestWindow.show();  
        });      
   

