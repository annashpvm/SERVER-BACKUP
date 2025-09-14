Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
//   var GinFinid = localStorage.getItem('tfinid');
 var GinCompcode = 1;
 var GinFinid = 27;

var lbltitle = new Ext.form.Label({
        fieldLabel  : 'Rawmeterial Invoice Entry',
        id          : 'lbltitle',
        width       : 600,
	height	:40,
	style	    : {'color':'red','style': 'Helvetica','font-size': '15px','font-weight':'bold'}
   });


//------------------------Detail------------------------------------------------------------------------------------
var cmbpartyname = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbpartyname',
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



var dtpinvoicedate = new Ext.form.DateField({
        fieldLabel : 'Invoice Date',
        id         : 'dtpinvoicedate',
        name       : 'dtpinvoicedate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });


var dtppodate = new Ext.form.DateField({
        fieldLabel : 'Po Date',
        id         : 'dtppodate',
        name       : 'dtppodate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var cmblcno = new Ext.form.ComboBox({
        fieldLabel      : 'LC No',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmblcno',
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

var txtcreditdays  = new Ext.form.TextField({
        name        : 'txtcreditdays',
        id          : 'txtcreditdays',
        fieldLabel  : 'Credit Days',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtvesselname  = new Ext.form.TextField({
        name        : 'txtvesselname',
        id          : 'txtvesselname',
        fieldLabel  : 'Vessel Name',
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

var cmbcnfagent = new Ext.form.ComboBox({
        fieldLabel      : 'CNF Agent',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbcnfagent',
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

var txtexchangerate  = new Ext.form.TextField({
        name        : 'txtexchangerate',
        id          : 'txtexchangerate',
        fieldLabel  : 'Exchange Rate',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });



var txtbillofladingno  = new Ext.form.TextField({
        name        : 'txtbillofladingno',
        id          : 'txtbillofladingno',
        fieldLabel  : 'Bill of Lading No',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtbillofentryno  = new Ext.form.TextField({
        name        : 'txtbillofentryno',
        id          : 'txtbillofentryno',
        fieldLabel  : 'Bill of Entry no',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var dtpcargoarrivaldate = new Ext.form.DateField({
        fieldLabel : 'Cargo Arrival Date',
        id         : 'dtpcargoarrivaldate',
        name       : 'dtpcargoarrivaldate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var txtinvoiceno  = new Ext.form.TextField({
        name        : 'txtinvoiceno',
        id          : 'txtinvoiceno',
        fieldLabel  : 'Invoice No',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var cmbpono = new Ext.form.ComboBox({
        fieldLabel      : 'PO No',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbpono',
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

var txtnegotitationdays  = new Ext.form.TextField({
        name        : 'txtnegotitationdays',
        id          : 'txtnegotitationdays',
        fieldLabel  : 'Maximum Allowed Inv Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var cmborigin = new Ext.form.ComboBox({
        fieldLabel      : 'Origin',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmborigin',
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


var dtpshipmentdate = new Ext.form.DateField({
        fieldLabel : 'Shipment Date',
        id         : 'dtpshipmentdate',
        name       : 'dtpshipmentdate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var dtpdocumentcleareddate = new Ext.form.DateField({
        fieldLabel : 'Document Cleared Date',
        id         : 'dtpdocumentcleareddate',
        name       : 'dtpdocumentcleareddate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var cmblinearagent = new Ext.form.ComboBox({
        fieldLabel      : 'Linear Agent',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmblinearagent',
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



var txtbankrefno  = new Ext.form.TextField({
        name        : 'txtbankrefno',
        id          : 'txtbankrefno',
        fieldLabel  : 'Bank Ref No',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var dtpbilloflandingdate = new Ext.form.DateField({
        fieldLabel : 'Bill of Landing Date',
        id         : 'dtpbilloflandingdate',
        name       : 'dtpbilloflandingdate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var dtpbillofentrydate = new Ext.form.DateField({
        fieldLabel : 'Bill of Entry Date',
        id         : 'dtpbillofentrydate',
        name       : 'dtpbillofentrydate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });

var dtpexparrivaldate = new Ext.form.DateField({
        fieldLabel : 'Exp Arrival Date',
        id         : 'dtpexparrivaldate',
        name       : 'dtpexparrivaldate',
        format     : 'd-m-Y',
        value      : new Date(),
	disabled    : false,
        anchor     : '100%' 
   });




//-----------------------------------------Container Detail-----------------------------------------------------------------------------

var cmbcontainersize = new Ext.form.ComboBox({
        fieldLabel      : 'Container Size',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbcontainersize',
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

var txtnoofcontainers  = new Ext.form.TextField({
        name        : 'txtnoofcontainers',
        id          : 'txtnoofcontainers',
        fieldLabel  : 'No of Containers',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });


var itemdetaildatastore = new Ext.data.Store({
        
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'ItemLinkDateStore'
        },[
           'containerlength','noofcontainer'
        ])
    });
var dgrecord = Ext.data.Record.create([]);
var flxitemdetail = new Ext.grid.EditorGridPanel({
        frame: false,
	store: itemdetaildatastore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 310,
        x: 210,
        y: 130,
        columns: [
            {header: "Container Length", dataIndex: 'containerlength',sortable:true,width:155,align:'left'},
            {header: "No of Container", dataIndex: 'noofcontainer',sortable:true,width:150,align:'left'},
          
        ]
      
   });

var btnAdd = new Ext.Button({
       style   : 'text-align:center;',
        text    : "Add",
        width   : 70,
	height  : 50,
        x       : 530,
        y       : 130,  listeners:{

            click: function(){
                 
            }
          }
   });

var txttotalnoofcontainers  = new Ext.form.TextField({
        name        : 'txttotalnoofcontainers',
        id          : 'txttotalnoofcontainers',
        fieldLabel  : 'Total No of Containers',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });


//-------------------------Item Details--------------------------------------------------------


var cmbitemname = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbitemname',
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


var txtorderqty  = new Ext.form.TextField({
        name        : 'txtorderqty',
        id          : 'txtorderqty',
        fieldLabel  : 'Order Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtpendinginvorderqty  = new Ext.form.TextField({
        name        : 'txtpendinginvorderqty',
        id          : 'txtpendinginvorderqty',
        fieldLabel  : 'Pen Inv Order Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtportqty  = new Ext.form.TextField({
        name        : 'txtportqty',
        id          : 'txtportqty',
        fieldLabel  : 'Port Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtmoiturepercentage  = new Ext.form.TextField({
        name        : 'txtmoiturepercentage',
        id          : 'txtmoiturepercentage',
        fieldLabel  : 'Moiture Percentage',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtoutthrowpercentage  = new Ext.form.TextField({
        name        : 'txtoutthrowpercentage',
        id          : 'txtoutthrowpercentage',
        fieldLabel  : 'Out Through Percentage',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });



var txtitemvalueus  = new Ext.form.TextField({
        name        : 'txtitemvalueus',
        id          : 'txtitemvalueus',
        fieldLabel  : 'Item Value US $',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtmaxallowedinvqty  = new Ext.form.TextField({
        name        : 'txtmaxallowedinvqty',
        id          : 'txtmaxallowedinvqty',
        fieldLabel  : 'Max Allowed Inv Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });


var txtpendinginvlcqty  = new Ext.form.TextField({
        name        : 'txtpendinginvlcqty',
        id          : 'txtpendinginvlcqty',
        fieldLabel  : 'Pending Inv LC Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtinvqty  = new Ext.form.TextField({
        name        : 'txtinvqty',
        id          : 'txtinvqty',
        fieldLabel  : 'Inv Qty',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtdeductionper  = new Ext.form.TextField({
        name        : 'txtdeductionper',
        id          : 'txtdeductionper',
        fieldLabel  : 'Deduction Percentage',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtunitrate  = new Ext.form.TextField({
        name        : 'txtunitrate',
        id          : 'txtunitrate',
        fieldLabel  : 'Unit Rate',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });

var txtitemvaluers  = new Ext.form.TextField({
        name        : 'txtitemvaluers',
        id          : 'txtitemvaluers',
        fieldLabel  : 'Item Value RS',
	width	    :  200,
	height      :  20,
	readOnly    : false,
	style	    : {'color':'red','style': 'Helvetica','font-size': '13px','font-weight':'bold'},  
	hidden	    : false,
	disabled    : false
    });




var itemdetaildatastore2 = new Ext.data.Store({
        
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'ItemLinkDateStore'
        },[
           'itemname','penordqty','penlcqty','portqty','moisper','deduper','outthrough','unitrate'
        ])
    });
var dgrecord = Ext.data.Record.create([]);
var flxitemdetail2 = new Ext.grid.EditorGridPanel({
        frame: false,
	store: itemdetaildatastore2,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 650,
        x: 10,
        y: 220,
        columns: [
            {header: "Item Name", dataIndex: 'itemname',sortable:true,width:155,align:'left'},
            {header: "Pen Ord Qty", dataIndex: 'penordqty',sortable:true,width:70,align:'left'},
	    {header: "Pen LC Qty", dataIndex: 'penlcqty',sortable:true,width:70,align:'left'},
            {header: "Port Qty", dataIndex: 'portqty',sortable:true,width:70,align:'left'},
            {header: "Mois %", dataIndex: 'moisper',sortable:true,width:70,align:'left'},
	    {header: "Dedu %", dataIndex: 'deduper',sortable:true,width:70,align:'left'},
	    {header: "Out Through", dataIndex: 'outthrough',sortable:true,width:70,align:'left'},
	    {header: "Unit Rate", dataIndex: 'unitrate',sortable:true,width:70,align:'left'},
          
        ]
      
   });

//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------




   var TrnrawmeterialinvoiceTabpannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Rawmeterial Invoice',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnrawmeterialinvoiceTabpannel',
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
                            TrnrawmeterialinvoiceWindow.hide();
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
        	x           : 280,
        	y           : 0,
        	defaultType : 'textfield',
        	border      : false,
        	items: [lbltitle]
    		},
			

		{
		    xtype: 'tabpanel',
		    activeTab: 0,
		    height: 450,
		    width: 670,
		    x: 10,
		    y: 40,
			items: [
				{
				xtype: 'panel',
				title: 'Details',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [
						
						
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [cmbpartyname]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [dtpinvoicedate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 0,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [dtppodate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [cmblcno]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtcreditdays]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [txtvesselname]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 180,
						defaultType : 'textfield',
						border      : false,
						items: [cmbshipmentport]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 210,
						defaultType : 'textfield',
						border      : false,
						items: [cmbcnfagent]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 250,
						defaultType : 'textfield',
						border      : false,
						items: [cmbpartybank]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 280,
						defaultType : 'textfield',
						border      : false,
						items: [cmblcbank]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 310,
						defaultType : 'textfield',
						border      : false,
						items: [txtexchangerate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 340,
						defaultType : 'textfield',
						border      : false,
						items: [txtbillofladingno]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 0,
						y           : 370,
						defaultType : 'textfield',
						border      : false,
						items: [dtpcargoarrivaldate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtinvoiceno]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [cmbpono]
				    		},
						{
						xtype	: 'radiogroup',
						border  :  false,
						x       : 450,
						y       : 80,
						columns :  3,
						items: [
							{boxLabel: 'DP', name: 'opt_select', inputValue: '4',checked : false,hidden:false, listeners: {
							check: function (rb,checked) {
						     	if(checked===true){
								
								
								}
						            }
						        }},
						    	{boxLabel: 'DA', name: 'opt_select', inputValue: '1',checked : true, listeners: {
							check: function (rb,checked) {
							     	if(checked===true){
									
									
									}
								    }
								}},
							    {boxLabel: 'DA(LC)', name: 'opt_select', inputValue: '2',checked : false, listeners: {
								check: function (rb,checked) {
								     	if(checked===true){
										
										}
									    }
									}}

               						 ]
            					},

						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 110,
						defaultType : 'textfield',
						border      : false,
						items: [txtnegotitationdays]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 140,
						defaultType : 'textfield',
						border      : false,
						items: [cmborigin]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 170,
						defaultType : 'textfield',
						border      : false,
						items: [cmbarrivalport]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 330,
						y           : 200,
						defaultType : 'textfield',
						border      : false,
						items: [dtpshipmentdate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 330,
						y           : 230,
						defaultType : 'textfield',
						border      : false,
						items: [dtpdocumentcleareddate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 260,
						defaultType : 'textfield',
						border      : false,
						items: [cmblinearagent]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 290,
						defaultType : 'textfield',
						border      : false,
						items: [txtbankrefno]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 330,
						y           : 320,
						defaultType : 'textfield',
						border      : false,
						items: [dtpbilloflandingdate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 330,
						y           : 350,
						defaultType : 'textfield',
						border      : false,
						items: [dtpbillofentrydate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 330,
						y           : 380,
						defaultType : 'textfield',
						border      : false,
						items: [dtpexparrivaldate]
				    		}





					]

				},
				{
				xtype: 'panel',
				title: 'Item Details',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [cmbitemname]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [txtorderqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtpendinginvorderqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [txtportqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtmoiturepercentage]
				    		},
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [txtoutthrowpercentage]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 180,
						defaultType : 'textfield',
						border      : false,
						items: [txtitemvalueus]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtmaxallowedinvqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [txtpendinginvlcqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [txtpendinginvlcqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtinvqty]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [txtdeductionper]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtunitrate]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 330,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [txtitemvaluers]
				    		},flxitemdetail2
					]

				},


				{
				xtype: 'panel',
				title: 'Container Details',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [
						

						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 200,
						y           : 50,
						defaultType : 'textfield',
						border      : false,
						items: [cmbcontainersize]
				    		},{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 200,
						y           : 80,
						defaultType : 'textfield',
						border      : false,
						items: [txtnoofcontainers]
				    		},flxitemdetail,btnAdd,		
						{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 200,
						y           : 330,
						defaultType : 'textfield',
						border      : false,
						items: [txttotalnoofcontainers]
				    		}


					]
				},
			
				]
		},			
                ]
    });
    
   
    var TrnrawmeterialinvoiceWindow= new Ext.Window({
	height      : 570,
        width       : 700,
        y           : 35,
        title       : 'Rawmeterial Invoice Entry',
        items       : TrnrawmeterialinvoiceTabpannel,
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
    TrnrawmeterialinvoiceWindow.show();  
});
