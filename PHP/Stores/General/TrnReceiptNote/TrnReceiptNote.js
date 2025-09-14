Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";
    var returntype = "N";
    var recq = 0;
   var drecqty= 0;
   var freitemcode;

var txtrecpno = new Ext.form.TextField({
	fieldLabel  : 'Receipt No',
	id          : 'txtrecpno',
	name        : 'txtrecpno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dtrecpdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtrecpdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});


var cmbreceivfrm = new Ext.form.ComboBox({
        fieldLabel      : 'Received From ',
        width       	 :  450,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbreceivfrm',
        typeAhead       : true,
        mode            : 'local',
        store           : '', //loadsalessocnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
         
	}
	}
});

var txtdcno = new Ext.form.TextField({
	fieldLabel  : 'INV / DC No',
	id          : 'txtdcno',
	name        : 'txtdcno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dtdcdate = new Ext.form.DateField({
    fieldLabel : 'INV/ DC Date',
    id         : 'dtdcdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var txtgentno = new Ext.form.TextField({
	fieldLabel  : 'Gate Entry No',
	id          : 'txtgentno',
	name        : 'txtgentno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dtgentdtdate = new Ext.form.DateField({
    fieldLabel : 'G.Ent.Date',
    id         : 'dtgentdtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var cmbitemname = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name ',
        width       	 :  450,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbitemname',
        typeAhead       : true,
        mode            : 'local',
        store           : '', //loadsalessocnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
         
	}
	}
});

var lblqty = new Ext.form.Label({
	fieldLabel  : 'Qty',
	id          : 'lblqty',
	name        : 'lblqty',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtqty = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtqty',
	name        : 'txtqty',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var lblrate = new Ext.form.Label({
	fieldLabel  : 'Rate',
	id          : 'lblrate',
	name        : 'lblrate',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtrate = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtrate',
	name        : 'txtrate',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var lblfreight = new Ext.form.Label({
	fieldLabel  : 'Freight',
	id          : 'lblfreight',
	name        : 'lblfreight',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtfreight = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtfreight',
	name        : 'txtfreight',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var lblother = new Ext.form.Label({
	fieldLabel  : 'Others',
	id          : 'lblother',
	name        : 'lblother',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtother = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtother',
	name        : 'txtother',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var lblinvvalue = new Ext.form.Label({
	fieldLabel  : 'Inv Value',
	id          : 'lblinvvalue',
	name        : 'lblinvvalue',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtinvvalue = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtinvvalue',
	name        : 'txtinvvalue',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 30,
    x       : 500,
    y       : 180,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	
	

        }//click
    }//listener
}); 

var dgrecord = Ext.data.Record.create([]);
var flxData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 550,
        x: 10,
        y: 230,        
        columns: [   
            {header: "Item Name", Id: 'item_name',sortable:true,width:150,align:'left'},
            {header: "Code", Id: 'code',sortable:true,width:50,align:'left'},
            {header: "UOM", Id: 'uom',sortable:true,width:50,align:'left'},
            {header: "Quantity", Id: 'qty',sortable:true,width:80,align:'left'},
            {header: "Rate", Id: 'rate',sortable:true,width:50,align:'left'},
            {header: "Freight", Id: 'freight',sortable:true,width:50,align:'left'},
            {header: "Others", Id: 'others',sortable:true,width:50,align:'left'},
            {header: "Value", Id: 'inv_value',sortable:true,width:65,align:'left'}, //hidden:'true'},       
        ],
store:[''], //loadsalledgerlistdatastore,

    

   });

var txttruckno = new Ext.form.TextField({
	fieldLabel  : 'Truck No',
	id          : 'txttruckno',
	name        : 'txttruckno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtdescrip = new Ext.form.TextField({
	fieldLabel  : 'Description',
	id          : 'txtdescrip',
	name        : 'txtdescrip',
	width       :  450,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});   


var txttotfreight = new Ext.form.TextField({
	fieldLabel  : 'Freight',
	id          : 'txttotfreight',
	name        : 'txttotfreight',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 

var txttotothers = new Ext.form.TextField({
	fieldLabel  : 'Others',
	id          : 'txttotothers',
	name        : 'txttotothers',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 

var txttotinvamt = new Ext.form.TextField({
	fieldLabel  : 'Inv Amount',
	id          : 'txttotinvamt',
	name        : 'txttotinvamt',
	width       :  70,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
var TrnReceiptNoteFormPanel = new Ext.form.FormPanel({
        width        :  610, 
        title        : 'Receipt Note',
        style        : 'margin: 5px ',
        height       : 570,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        id           : 'TrnReceiptNoteFormPanel',
        layout       : 'absolute',
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 45,
            items: [
                {
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',

		    listeners:
	            {
                     	click: function(){
//EDIT
                           gstFlag = "Edit";
                           Ext.getCmp('cmbreceiptno').show(); 
                           loadDNRecptnolistdatastore.removeAll();
                           loadDNRecptnolistdatastore.load({
      		              url: 'ClsDeliveryNoteReceipt',
                              params: {
			          task: 'loaddnrecptnolist',
			          finid: Ginfinid,
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(loadDNRecptnolistdatastore.getCount());	
                              }
                           });

                        }
                    }
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {
                                      
                                    }
                                }
		         
     
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
                    listeners:{
                      click: function () {
                            RefreshData();
                       }
                    }
                    
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png',
		    listeners:
	            {
                     	click: function(){
                            TrnReceiptNotewindow.hide();
                        }
                    }
                    
                },
           ],

          },
          items: [ 
                   {
                      xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : false,
		        height  : 530,
		        width   : 590,
			//style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
                             
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : -10,
					border      : false,
					items: [txtrecpno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 90,
					width       : 215,
					x           : 350,
					y           : -10,
				    	border      : false,
					items: [dtrecpdate]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 560,
					x           : 10,
					y           : 20,
					border      : false,
					items: [cmbreceivfrm]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : 55,
					border      : false,
					items: [txtdcno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 90,
					width       : 215,
					x           : 350,
					y           : 55,
				    	border      : false,
					items: [dtdcdate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : 90,
					border      : false,
					items: [txtgentno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 90,
					width       : 215,
					x           : 350,
					y           : 90,
				    	border      : false,
					items: [dtgentdtdate]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 560,
					x           : 10,
					y           : 125,
					border      : false,
					items: [cmbitemname]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 10,
					y           : 150,
					border      : false,
					items: [lblqty]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : -5,
					width       : 85,
					x           : 10,
					y           : 170,
					border      : false,
					items: [txtqty]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 100,
					y           : 150,
					border      : false,
					items: [lblrate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : -5,
					width       : 95,
					x           : 100,
					y           : 170,
					border      : false,
					items: [txtrate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 200,
					y           : 150,
					border      : false,
					items: [lblfreight]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : -5,
					width       : 95,
					x           : 200,
					y           : 170,
					border      : false,
					items: [txtfreight]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 300,
					y           : 150,
					border      : false,
					items: [lblother]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : -5,
					width       : 95,
					x           : 300,
					y           : 170,
					border      : false,
					items: [txtother]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 180,
					x           : 400,
					y           : 150,
					border      : false,
					items: [lblinvvalue]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : -5,
					width       : 95,
					x           : 400,
					y           : 170,
					border      : false,
					items: [txtinvvalue]
				},btnadd,flxData,
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : 330,
					border      : false,
					items: [txttruckno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 560,
					x           : 10,
					y           : 360,
					border      : false,
					items: [txtdescrip]
				},
				{ 
					xtype   : 'fieldset',
					title   : 'TOTAL',
					layout  : 'hbox',
					border  : true,
					height  : 70,
					width   : 550,
					style:{ border:'1px solid red',color:' #581845 '},
					layout  : 'absolute',
					x       : 10,
					y       : 400,
				items:[ 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 150,
					x           : 10,
					y           : -10,
					border      : false,
					items: [txttotfreight]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 150,
					x           : 170,
					y           : -10,
					border      : false,
					items: [txttotothers]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 170,
					x           : 330,
					y           : -10,
					border      : false,
					items: [txttotinvamt]
				},
					
		       	],
		     	     },
		  
                    ]
                },         
          ]     
    });


function RefreshData(){
        gstFlag = "Add"
        TrnReceiptNoteFormPanel.getForm().reset();
	txtdnyear.setValue(Ginfinid);
        flxDetail.getStore().removeAll();   
        Ext.getCmp('cmbreceiptno').hide(); 
 	loadDNRecptdatastore.removeAll();
	loadDNRecptdatastore.load({
        url: 'ClsDeliveryNoteReceipt.php',
        params: {
                    task: 'loaddnrecptno',
                    compcode:Gincompcode,
                    finid:Ginfinid  
                },
		callback:function()
      		{
//    alert(loadDNRecptdatastore.getAt(0).get('dnno'));
                    txtreceiptno.setValue(loadDNRecptdatastore.getAt(0).get('dnrecptno'));
               }
	  });

   };


var TrnReceiptNotewindow = new Ext.Window({
      width        : 640,         //1340,
      height       : 600,
      items        : TrnReceiptNoteFormPanel,
      closable:false,
      resizable:false,
      draggable:false,
      x:200,
      y:35,
      listeners:{
	   show:function()
	   {
		 RefreshData();
                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryNoteReceipt.php',
                    params: {
		       task: 'loadsupplier'
		      	}
                 });

             	LoadDeptDatastore.load({
		    url: 'ClsDeliveryNoteReceipt.php',
                    params: {
		         task: 'loaddept'
	         	}
               	});                                   					
             	LoadItemDatastore.load({
		    url: 'ClsDeliveryNoteReceipt.php',
                    params: {
		         task: 'loaditemlist'
	         	}
               	});                                   					

             	LoadCarrierDatastore.load({
		    url: 'ClsDeliveryNoteReceipt.php',
                    params: {
		         task: 'loadcarrier'
	         	}
               	});        
                           					

	  }

        }  
  
});
  TrnReceiptNotewindow.show();
  
});
