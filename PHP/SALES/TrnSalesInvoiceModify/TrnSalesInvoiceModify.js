Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var gstStatus = "N";
//var Hdeptname = 'IT DEPARTMENT';
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;

   var loadInvoicelistDataStore = new Ext.data.Store({
      id: 'loadInvoicelistDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoiceModify.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'invh_invrefno','invh_seqno'
      ]),
    });

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoiceModify.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'},
      ]),
    });

var cmbInvno = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No ',
        width       	 :  150,
        displayField    : 'invh_invrefno', 
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbInvno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvoicelistDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
         
		loadAllCustomerStore.removeAll();
			loadAllCustomerStore.load({
		                url: 'ClsTrnSalesInvoice.php',
		                params: {
		                    task: 'loadcustomer',
					fincode:GinFinid,
					compcode:Gincompcode,
                                	invno:cmbInvno.getValue()
		                },
				scope: this,
                                callback:function()
                                {
//alert(loadAllCustomerStore.getAt(0).get('cust_phone'));
                                txtCustomer.setRawValue(loadAllCustomerStore.getAt(0).get('cust_ref')); 
                    
                                }

			  });
	}
	}
});

var dtdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var txtCustomer = new Ext.form.TextField({
	fieldLabel  : 'Customer',
	id          : 'txtCustomer',
	name        : 'txtCustomer',
	width       :  360,
	//readOnly    : true,
	//disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});


var dgrecord = Ext.data.Record.create([]);
var flxData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 190,
        width: 730,
        x: 10,
        y: 150,        
        columns: [   
            {header: "SO Number", dataIndex: 'repulp_reel_no',sortable:true,width:100,align:'left'},  //hidden:'true'},
            {header: "Item Code", dataIndex: 'repulp_reel_no',sortable:true,width:130,align:'left'},  //hidden:'true'},
            {header: "Weight", dataIndex: 'repulp_tag',sortable:true,width:90,align:'left'}, //hidden:'true'},
            {header: "Old Rate", dataIndex: 'repulp_mill',sortable:true,width:100,align:'left'}, //hidden:'true'},
            {header: "New Rate", dataIndex: 'repulp_mill',sortable:true,width:100,align:'left'}, //hidden:'true'},
            {header: "Var.Code", dataIndex: 'repulp_var',sortable:true,width:100,align:'left'}, //hidden:'true'},       
            {header: "Size.Code", dataIndex: 'repulp_reel_no',sortable:true,width:100,align:'left'},  //hidden:'true'},
            
        ],
store:[''], //loadsalledgerlistdatastore,  
   });
      
var TrnSalesInvoiceModifyFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesInvoiceModifyFormpanel',
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
				AEDFlag = "Add";
				TrnSalesInvoiceModifyFormpanel.getForm().reset();
				RefreshData();
			
		        }
		    }
		},'-',
		{
		    text: 'Edit',
		    style  : 'text-align:center;',
		    tooltip: 'Modify Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
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
	            tooltip: 'Close...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				TrnSalesInvoiceModify.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
                	
                { 
                	xtype   : 'fieldset',
		        title   : 'Invoice Details',
		        layout  : 'hbox',
		        border  : false,
		        height  : 400,
		        width   : 800,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[
		        
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 260,
				x           : 10,
				y           : 10,
				border      : false,
				items: [cmbInvno]
		        }, 
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 180,
				x           : 300,
				y           : 10,
			    	border      : false,
				items: [dtdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 470,
				x           : 10,
				y           : 55,
				border      : false,
				items: [txtCustomer]
			},
	               flxData,
								        		        			
                 ],
             },     
	                      
          ],
                 
    });


function RefreshData()
{
    loadInvoicelistDataStore.removeAll();
    loadInvoicelistDataStore.load({
	url: 'ClsTrnSalesInvoiceModify.php',
	params: {
	    task: 'loadInvoiceNoList',
	    finid: GinFinid,
	    compcode:Gincompcode,
        },
      	callback:function()
        {



        }
    });
}  
    var TrnSalesInvoiceModify = new Ext.Window({
	height      : 500,
        width       : 850,
        x	     : 250,
        y           : 30,
        title       : 'INVOICE RATE MODIFICATIONS',
        items       : TrnSalesInvoiceModifyFormpanel,
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
		}
	}	
    });
    TrnSalesInvoiceModify.show();  
});
