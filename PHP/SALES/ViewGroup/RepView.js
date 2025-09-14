Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');
   var yr  = localStorage.getItem('gstyear');
   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";
   var monthstartdate = new Ext.form.DateField({
        id: 'monthfirstdate',
        format: 'y-m-d',
        value: new Date()   
    });
var monthenddate = new Ext.form.DateField({
        id: 'monthenddate',
        format: 'y-m-d',
        value: new Date()   
    });

 var loadCustomerGroup = new Ext.data.Store({
      id: 'loadCustomerGroup',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsView.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_group_code', type: 'int',mapping:'cust_group_code'},
	{name:'cust_group_name', type: 'string',mapping:'cust_group_name'}
      ]),
    });


 var loadCustomerDataStore = new Ext.data.Store({
      id: 'loadCustomerDataStore',
//	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsView.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });



var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350, 	
        displayField    : 'cust_group_name', 
        valueField      : 'cust_group_code',
        hiddenName      : 'cust_group_name',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadCustomerGroup,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){
		 flxDetail.getStore().removeAll();
		 loadCustomerDataStore.load({

			url: 'ClsView.php',
			params: {
		            partygrp:cmbCustomer.getValue()
		        },
		   	callback:function()
			{
                        }  
         });
	}
      }
});


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:40,
    y:40,
    height: 400,
  
    width: 800,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Customer" , dataIndex: 'cust_ref',sortable:false,width:500,align:'left', menuDisabled: true},
        {header: "CustCode" , dataIndex: 'cust_code',sortable:false,width:70,align:'left', menuDisabled: true,hidden:true},
    ],
    store: loadCustomerDataStore,
    listeners:{	

             } 

});

 var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POS7T',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                           ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 490,
                width   : 1280,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[
                                        { 
                                            xtype       : 'fieldset',
                                            title       : '',
                                            labelWidth  : 100,
                                            width       : 550,
                                            x           : 50,
                                            y           : -10,
                                            border      : false,
                                            items: [cmbCustomer]
                                        },flxDetail,
					
                ]

            },
            
        ],
    });
    
    function Refreshdata()
    {
    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Sales Details',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
