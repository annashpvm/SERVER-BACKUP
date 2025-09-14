Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
//   var GinFinid = localStorage.getItem('tfinid');
 var GinCompcode = 1;
 var GinFinid = 27;


var lbltitle = new Ext.form.Label({
        fieldLabel  : 'LC APPLICATION',
        id          : 'lbltitle',
        width       : 600,
	height	:40,
	style	    : {'color':'red','style': 'Helvetica','font-size': '15px','font-weight':'bold'}
   });

var txtlcnumber  = new Ext.form.TextField({
        name        : 'txtlcnumber',
        id          : 'txtlcnumber',
        fieldLabel  : 'LC Number',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });


var dtplcapplicationdate = new Ext.form.DateField({
        fieldLabel : 'LC Application Date',
        id         : 'dtplcapplicationdate',
        name       : 'dtplcapplicationdate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var cmbpartybank = new Ext.form.ComboBox({
        fieldLabel      : 'Party Bank',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbpartybank',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var txtmodeofadvisinglc  = new Ext.form.TextField({
        name        : 'txtmodeofadvisinglc',
        id          : 'txtmodeofadvisinglc',
        fieldLabel  : 'Mode of Advising LC',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var dtpexpirydate = new Ext.form.DateField({
        fieldLabel : 'Expiry Date',
        id         : 'dtpexpirydate',
        name       : 'dtpexpirydate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var cmbpartshipment = new Ext.form.ComboBox({
        fieldLabel      : 'Part Shipment',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbpartshipment',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });



var cmbtranshipment = new Ext.form.ComboBox({
        fieldLabel      : 'TranShipment',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbtranshipment',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var txtnaturedaysoflc  = new Ext.form.TextField({
        name        : 'txtnaturedaysoflc',
        id          : 'txtnaturedaysoflc',
        fieldLabel  : 'Nature days of LC',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });


var cmbshipmentport = new Ext.form.ComboBox({
        fieldLabel      : 'Shipment Port',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbshipmentport',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var cmbarrivalport = new Ext.form.ComboBox({
        fieldLabel      : 'Arrival Port',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbarrivalport',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var cmbgoodstype = new Ext.form.ComboBox({
        fieldLabel      : 'Goods Type',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbgoodstype',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });


var txtamountoflcinusd  = new Ext.form.TextField({
        name        : 'txtamountoflcinusd',
        id          : 'txtamountoflcinusd',
        fieldLabel  : 'Amount of LC in USD',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtnegotiationperiod  = new Ext.form.TextField({
        name        : 'txtnegotiationperiod',
        id          : 'txtnegotiationperiod',
        fieldLabel  : 'Negotiation period',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var dtplastdateofshipment = new Ext.form.DateField({
        fieldLabel : 'Lst Date of Shipment',
        id         : 'dtplastdateofshipment',
        name       : 'dtplastdateofshipment',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : true,
        anchor     : '100%' 
   });

var txtlcapplicationnumber  = new Ext.form.TextField({
        name        : 'txtlcapplicationnumber',
        id          : 'txtlcapplicationnumber',
        fieldLabel  : 'LC Application Number',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var cmblcbank = new Ext.form.ComboBox({
        fieldLabel      : 'LC Bank',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmblcbank',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var txtplaceofpresentation  = new Ext.form.TextField({
        name        : 'txtplaceofpresentation',
        id          : 'txtplaceofpresentation',
        fieldLabel  : 'Place of presentation',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var cmbconfirmationofcredit = new Ext.form.ComboBox({
        fieldLabel      : 'Confirmation of Credit',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbconfirmationofcredit',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });

var txtexpirydescription  = new Ext.form.TextArea({
        name        : 'txtexpirydescription',
        id          : 'txtexpirydescription',
        fieldLabel  : 'Expiry Description',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtnatureoflc  = new Ext.form.TextArea({
        name        : 'txtnatureoflc',
        id          : 'txtnatureoflc',
        fieldLabel  : 'Nature of LC',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtdescriptionofgoods  = new Ext.form.TextArea({
        name        : 'txtdescriptionofgoods',
        id          : 'txtdescriptionofgoods',
        fieldLabel  : 'Description of Goods',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });
var txtshipmentdescription  = new Ext.form.TextArea({
        name        : 'txtshipmentdescription',
        id          : 'txtshipmentdescription',
        fieldLabel  : 'Shipment Description',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtinsurancepercentage  = new Ext.form.TextField({
        name        : 'txtinsurancepercentage',
        id          : 'txtinsurancepercentage',
        fieldLabel  : 'Insurance %',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtfreight  = new Ext.form.TextField({
        name        : 'txtfreight',
        id          : 'txtfreight',
        fieldLabel  : 'Freight',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtnotifyaddress  = new Ext.form.TextArea({
        name        : 'txtnotifyaddress',
        id          : 'txtnotifyaddress',
        fieldLabel  : 'Notify Address',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtdocumentsrequired  = new Ext.form.TextArea({
        name        : 'txtdocumentsrequired',
        id          : 'txtdocumentsrequired',
        fieldLabel  : 'Documentsrequired',
	width	    :  600,
	height      :  320,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtinterestforusageperiod  = new Ext.form.TextArea({
        name        : 'txtinterestforusageperiod',
        id          : 'txtinterestforusageperiod',
        fieldLabel  : 'Interest for usage period',
	width	    :  200,
	height      :  60,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtbankcharges  = new Ext.form.TextField({
        name        : 'txtbankcharges',
        id          : 'txtbankcharges',
        fieldLabel  : 'Bank Charges',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txttermsofsupply  = new Ext.form.TextField({
        name        : 'txttermsofsupply',
        id          : 'txttermsofsupply',
        fieldLabel  : 'Terms of Supply',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });








   var TrnLcApplicationFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnLcApplicationFormpanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
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
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            TrnLcApplicationWindow.hide();
                        }
                    }
                }
              ]
        },
        items: [
           
                { 
        	xtype       : 'fieldset',
        	title       : '',
        	labelWidth  : 300,
        	width       : 205,
        	x           : 350,
        	y           : 0,
        	defaultType : 'textfield',
        	border      : false,
        	items: [lbltitle]
    		},
			

		{
		    xtype: 'tabpanel',
		    activeTab: 0,
		    height: 490,
		    width: 800,
		    x: 10,
		    y: 40,
			items: [
				{
				xtype: 'panel',
				title: 'LC Application Detail',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 500,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtlcnumber]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 395,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [dtplcapplicationdate]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [cmbpartybank]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [txtmodeofadvisinglc]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 395,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [dtpexpirydate]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [cmbpartshipment]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 180,
						defaultType : 'textfield',
						border      : false,
						items: [cmbtranshipment]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 210,
						defaultType : 'textfield',
						border      : false,
						items: [txtnaturedaysoflc]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 240,
						defaultType : 'textfield',
						border      : false,
						items: [cmbshipmentport]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 270,
						defaultType : 'textfield',
						border      : false,
						items: [cmbarrivalport]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 300,
						defaultType : 'textfield',
						border      : false,
						items: [cmbgoodstype]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 330,
						defaultType : 'textfield',
						border      : false,
						items: [txtamountoflcinusd]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 360,
						defaultType : 'textfield',
						border      : false,
						items: [txtnegotiationperiod]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 390,
						defaultType : 'textfield',
						border      : false,
						items: [dtplastdateofshipment]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtlcapplicationnumber]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [cmblcbank]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtplaceofpresentation]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [cmbconfirmationofcredit]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtexpirydescription]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 190,
						defaultType : 'textfield',
						border      : false,
						items: [txtnatureoflc]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 260,
						defaultType : 'textfield',
						border      : false,
						items: [txtdescriptionofgoods]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 330,
						defaultType : 'textfield',
						border      : false,
						items: [txtshipmentdescription]
				    		},




					]
				},
				{
				xtype: 'panel',
				title: 'Document Detail',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [

						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtinsurancepercentage]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [txtfreight]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 0,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtnotifyaddress]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 900,
						x           : 0,
						y           : 130,
						defaultType : 'textfield',
						border      : false,
						items: [txtdocumentsrequired]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtinterestforusageperiod]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 70,
						defaultType : 'textfield',
						border      : false,
						items: [txtbankcharges]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 170,
						width       : 400,
						x           : 400,
						y           : 100,
						defaultType : 'textfield',
						border      : false,
						items: [txttermsofsupply]
				    		},




					]

				}
				]
		},			
                ]
    });
    
   
    var TrnLcApplicationWindow = new Ext.Window({
	height      : 610,
        width       : 830,
        y           : 35,
        title       : 'LC Application',
        items       : TrnLcApplicationFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			
	   	
	   			 }
			
		}
    });
    TrnLcApplicationWindow.show();  
});
