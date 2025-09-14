Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";
    var returntype = "N";
var recq = 0;
   var drecqty= 0;
var freitemcode;

var dtdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});


var cmbdept = new Ext.form.ComboBox({
        fieldLabel      : 'Department ',
        width       	 :  280,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbdept',
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

var cmbrecptno = new Ext.form.ComboBox({
        fieldLabel      : 'Receipt No ',
        width       	 :  100,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbrecptno',
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

var txtreceivefrm = new Ext.form.TextField({
	fieldLabel  : 'Received From',
	id          : 'txtreceivefrm',
	name        : 'txtreceivefrm',
	width       :  280,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtdcno = new Ext.form.TextField({
	fieldLabel  : 'DC No',
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
    fieldLabel : 'DC Date',
    id         : 'dtdcdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});


var cmbitemname = new Ext.form.ComboBox({
        fieldLabel      : 'Item Name ',
        width       	 :  280,
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

var txtstk = new Ext.form.TextField({
	fieldLabel  : 'Stock',
	id          : 'txtstk',
	name        : 'txtstk',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtSHVPM1 = new Ext.form.TextField({
	fieldLabel  : 'SHVPM-1',
	id          : 'txtSHVPM1',
	name        : 'txtSHVPM1',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtSHVPM2 = new Ext.form.TextField({
	fieldLabel  : 'SHVPM-2',
	id          : 'txtSHVPM2',
	name        : 'txtSHVPM2',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtSHVPM3 = new Ext.form.TextField({
	fieldLabel  : 'SHVPM-3',
	id          : 'txtSHVPM3',
	name        : 'txtSHVPM3',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtvjpm = new Ext.form.TextField({
	fieldLabel  : 'VJPM',
	id          : 'txtvjpm',
	name        : 'txtvjpm',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtcogen = new Ext.form.TextField({
	fieldLabel  : 'COGEN',
	id          : 'txtcogen',
	name        : 'txtcogen',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

 
var TrnIssueEntryFormPanel = new Ext.form.FormPanel({
        width        :  450, 
        title        : 'Issue Entry',
        style        : 'margin: 5px ',
        height       : 470,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        id           : 'TrnIssueEntryFormPanel',
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
                            TrnIssueEntrywindow.hide();
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
		        height  : 390,
		        width   : 430,
			//style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
                             
				
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 220,
					y           : -10,
				    	border      : false,
					items: [dtdate]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 390,
					x           : 10,
					y           : 20,
					border      : false,
					items: [cmbdept]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 220,
					x           : 10,
					y           : 60,
					border      : false,
					items: [cmbrecptno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 390,
					x           : 10,
					y           : 100,
					border      : false,
					items: [txtreceivefrm]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : 140,
					border      : false,
					items: [txtdcno]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 180,
					x           : 220,
					y           : 140,
				    	border      : false,
					items: [dtdcdate]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 390,
					x           : 10,
					y           : 180,
					border      : false,
					items: [cmbitemname]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 80,
					width       : 210,
					x           : 10,
					y           : 215,
					border      : false,
					items: [txtstk]
				},
				{ 
					xtype   : 'fieldset',
					title   : 'Issue To',
					layout  : 'hbox',
					border  : true,
					height  : 100,
					width   : 390,
					style:{ border:'1px solid red',color:' #581845 '},
					layout  : 'absolute',
					x       : 10,
					y       : 255,
				items:[ 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 130,
					x           : -10,
					y           : -10,
					border      : false,
					items: [txtSHVPM1]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 130,
					x           : 120,
					y           : -10,
					border      : false,
					items: [txtSHVPM2]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 130,
					x           : 240,
					y           : -10,
					border      : false,
					items: [txtSHVPM3]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 130,
					x           : -10,
					y           : 30,
					border      : false,
					items: [txtvjpm]
				}, 
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 40,
					width       : 130,
					x           : 240,
					y           : 30,
					border      : false,
					items: [txtcogen]
				},
					
		       	],
		     	     },
		  
                    ]
                },         
          ]     
    });


function RefreshData(){
        gstFlag = "Add"
        TrnIssueEntryFormPanel.getForm().reset();
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


var TrnIssueEntrywindow = new Ext.Window({
      width        : 480,         //1340,
      height       : 500,
      items        : TrnIssueEntryFormPanel,
      closable:false,
      resizable:false,
      draggable:false,
      x:300,
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
  TrnIssueEntrywindow.show();
  
});
