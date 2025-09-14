Ext.onReady(function(){
   Ext.QuickTips.init();
   var txtinvoiceno = new Ext.form.TextField({
   	fieldLabel  :'Invoice No',
   	id	    :'txtinvoiceno',
   	name	    :'txtinvoiceno',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
   	tabindex    :2,
   	});
    
    
      var dptDOJ = new Ext.form.DateField({
    	fieldLabel:'Invoice Date',
    	id	  :'dptDOJ',
    	name	  :'dptDOJ',
    	format	  :'d-m-y',
    	labelStyle:"font-size:14px;font-weight:bold;color:#ab28ab",
    	value	  :new Date()
    	}); 	
    
    	  var cmbcustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbcustomer',
        typeAhead       : true,
        mode            : 'local',
        store           :[],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 	
          
           var txtemail = new Ext.form.TextField({
   	fieldLabel  :'Email',
   	id	    :'txtemail',
   	name	    :'txtemail',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
   	tabindex    :2,
   	});
   
    var txtcontact = new Ext.form.TextField({
   	fieldLabel  :'Contact Number',
   	id	    :'txtcontact',
   	name	    :'txtcontact',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
   	tabindex    :2,
   	});
   
  var txtsub = new Ext.form.TextField({
   	fieldLabel  :'Subject',
   	id	    :'txtsub',
   	name	    :'txtsub',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
   	tabindex    :2,
   	});
   var txtbody = new Ext.form.TextField({
   	fieldLabel  :'Body',
   	id	    :'txtbody',
   	name	    :'txtbody',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
   	tabindex    :2,
   	});
   
 var btnsendmail = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SendMail",
    width   : 80,
    height  : 40,
    x       : 200,
    y       : 300,
    bodyStyle:{"background-color":"#009933"},  
     
});
 
  
    var invoicepanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'EMAIL',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'invoicepanel',
    method      : 'POST',
    layout      : 'absolute',
    		items:[
    		{
    		xtype	:'fieldset',
    		title	:'',
    		width	:1000,
    		height	:800,
    		x	:10,
    		y	:10,
    		border	:true,
    		layout	:'absolute',
    		items:[
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140,
	    		width	:600,
	    		x	:10,
	    		y	:30,
	    		border	:false,
	    		items:[txtinvoiceno]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:400,
	    		y	:30,
	    		border	:false,
	    		items:[dptDOJ]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:10,
	    		y	:70,
	    		border	:false,
	    		items:[cmbcustomer]
	    		},
	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:10,
	    		y	:110,
	    		border	:false,
	    		items:[txtemail]
	    		},
	    		 {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:10,
	    		y	:150,
	    		border	:false,
	    		items:[txtcontact]
	    		},
	    	      {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:10,
	    		y	:190,
	    		border	:false,
	    		items:[txtsub]
	    		},
	    		 {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:140	,
	    		width	:600,
	    		x	:10,
	    		y	:230,
	    		border	:false,
	    		items:[txtbody]
	    		},  
	    	       btnsendmail,
	    	       
	    	 ],
    		},
    		],
    		});
   
  var invoicewindow = new Ext.Window({
	height      : 500,
        width       : 1000,
        y           : 50,
        title       : '',
        items       : 'invoicepanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        dra21ggable   : false,
 	listeners:{
               show:function(){
             }
             }
            });
            
            
            
            invoicewindow.show();  
        });      
   
