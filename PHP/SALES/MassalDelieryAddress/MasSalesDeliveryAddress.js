Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var fm = Ext.form;
   var usertype = localStorage.getItem('ginuser');
   var gstFlag = "Add";



   var shade = 'NS';

var lblDeliveryAddress = new Ext.form.Label({
    fieldLabel  : 'STANDARD DELIVERY ADDRESS',
    id          : 'lblDeliveryAddress',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080gg",
});

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
                Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'Are you sure want to Exit...',
		    fn: function(btn)
                    {
		        if (btn === 'yes')
			{
                          TrnSalesDeliveryAddressWindow.hide();
                        }
                    }  
               });   
            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);



 var loadStatesstore = new Ext.data.Store({
      id: 'loadStatesstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryAddress.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstates"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'state_code', type: 'int',mapping:'state_code'},
	{name:'state_name', type: 'string',mapping:'state_name'}
      ]),
    });

var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State',
        width           : 250,
        displayField    : 'state_name', 
        valueField      : 'state_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'local',
        store           : loadStatesstore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
 });



   var txtDeliveryName = new Ext.form.TextField({
        fieldLabel  : 'Name.',
        id          : 'txtDeliveryName',
        name        : 'txtDeliveryName',
        width       :  500,
        tabindex : 2
    });

   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
        tabindex : 2
    });
   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
        tabindex : 2
    });

   var txtCity = new Ext.form.TextField({
        fieldLabel  : 'City',
        id          : 'txtCity',
        name        : 'txtCity',
        width       :  500,
        tabindex : 2
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
        tabindex : 2
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
        tabindex : 2
    });



 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
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


var LoadDeliveryAddressDatastore = new Ext.data.Store({
        id: 'LoadDeliveryAddressDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsDeliveryAddress.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadDeliveryAddress"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'delivery_add1','delivery_add2','delivery_add3','delivery_city','delivery_pin','delivery_gst','state_code','state_name'
])
    });



var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350, 	
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

                  txtDeliveryName.setRawValue(""); 
                  txtAddr1.setRawValue(""); 
                  txtAddr2.setRawValue(""); 
                  txtCity.setRawValue(""); 
                  txtPin.setRawValue(""); 
                  txtGstNo.setRawValue("");



	    LoadDeliveryAddressDatastore.removeAll();
	    LoadDeliveryAddressDatastore.load({
		url: 'ClsDeliveryAddress.php',
		params: {
		    task: 'loadDeliveryAddress',
                     custcode:cmbCustomer.getValue()   
		},
	      	callback:function()
		{
                  txtDeliveryName.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add1')); 
                  txtAddr1.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add2')); 
                  txtAddr2.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_add3')); 
                  txtCity.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_city')); 
                  txtPin.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_pin')); 
                  txtGstNo.setRawValue(LoadDeliveryAddressDatastore.getAt(0).get('delivery_gst'));
                  cmbState.setValue(LoadDeliveryAddressDatastore.getAt(0).get('state_code'));                    

		}
	    });  
		
         }
	}
 
});
function edit_click()
{
	  gstFlag = "Edit";
	    Ext.getCmp('cmbSONo').show();
	 /*  if (usertype == 1)
	    {
		Ext.getCmp('save').setDisabled(false);
	    }
	    else
	    {
		Ext.getCmp('save').setDisabled(true);
	    }*/

}

function save_click()
{
    var gstSave;

//alert(flxDetail.getStore().getCount());		 

    gstSave="true";
    if (txtDeliveryName.getRawValue()=="")
    {
        Ext.Msg.alert('Sales','Enter Delivery Address Line 1.....');
        gstSave="false";
    }


    else if  (txtAddr1.getRawValue()=="")
    {
         Ext.Msg.alert('Sales-','Enter Delivery Address Line 1');
         gstSave="false";
    }

    else{

       Ext.Msg.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do You Want To Save...',
            fn: function(btn)
		{
            if (btn === 'yes')
		{
            if (gstSave === "true")
                {  

//alert(cmbPO.getRawValue());

            Ext.Ajax.request({
            url: 'TrnSalesDeliveryAddressSave.php',
            params :
             {
		ordhparty: cmbCustomer.getValue(),

		ordhdeliveryadd1:txtDeliveryName.getRawValue() ,
		ordhdeliveryadd2: txtAddr1.getRawValue(),
		ordhdeliveryadd3: txtAddr2.getRawValue(),
		ordhdeliverycity: txtCity.getRawValue(),
		ordhdeliverypin: txtPin.getRawValue(),
		ordhdeliverygst: txtGstNo.getRawValue(),
		statecode      : cmbState.getValue(),
		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Delivery Address Saved -" + obj['msg']);
                    TrnSalesDeliveryAddressPanel.getForm().reset();
                    RefreshData();
                  }else
			{
Ext.MessageBox.alert("Delivery Address Not Saved! Pls Check!- " + obj['msg']);                                                  
                    }
                }
           });         

          	}
		}
            }
        });
    }
}

var TrnSalesDeliveryAddressPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES ORDER ENTRY',
    header      : false,
    width       : 500,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesDeliveryAddressPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
        {
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
                       edit_click();
   
                }
            }
        },'-',
          {
//save
            text: 'Save',
            id  : 'save',

            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                     save_click();

                }
            }
        },'-',
        {
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/view.png',
            //fp.getForm().reset();
            listeners:{
                click: function () {

                }
            }
        },'-',
        {
            text: 'Exit',
            style  : 'text-align:center;',
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnSalesDeliveryAddressWindow.hide();
                }
            }
        }]
    },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 460,
                width   : 620,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 90,
                             width       : 500,
                             x           : 0,
                             y           : 10,
                             border      : false,
                             items: [cmbCustomer]   	
                           },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 300,
				            labelWidth  : 300,
				            x           : 0,
				            y           : 60,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDeliveryAddress]
				        },


                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 10,
                                             y           : 100,
                                             border      : false,
                                             items: [txtDeliveryName] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 10,
                                             y           : 140,	
                                             border      : false,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 10,
                                             y           : 190,
                                             border      : false,
                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 800,
                                             x           : 10,
                                             y           : 240,	
                                             border      : false,
                                             items: [txtCity] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 200,
                                             x           : 10,
                                             y           : 290,	
                                             border      : false,
                                             items: [txtPin] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 300,
                                             x           : 10,
                                             y           : 340,	
                                             border      : false,
                                             items: [txtGstNo] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 350,
                                             x           : 10,
                                             y           : 390,	
                                             border      : false,
                                             items: [cmbState] 
                                         },

                ]
             }
          ],
                       
});


    

function RefreshData(){

  };
   

    var TrnSalesDeliveryAddressWindow = new Ext.Window({
	height      : 550,
        width       : 700,
        y           : 80,
        title       : 'DELIVERY ADDRESS',
        items       :  TrnSalesDeliveryAddressPanel,
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


                    }
        } 
    });
       TrnSalesDeliveryAddressWindow.show();  
});
