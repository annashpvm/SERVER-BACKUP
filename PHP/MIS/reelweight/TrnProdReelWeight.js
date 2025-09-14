Ext.onReady(function(){
   Ext.QuickTips.init();
   
    	
    var txtSONO = new Ext.form.TextField({
   	fieldLabel  :'SO.NO',
   	id	    :'txtSONO',
   	name	    :'txtSONO',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});  
     
  var txtCustomerName = new Ext.form.TextField({
   	fieldLabel  :'Customer Name',
   	id	    :'txtCustomerName',
   	name	    :'txtCustomerName',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});       
  
 var txtSize = new Ext.form.TextField({
   	fieldLabel  :'Size',
   	id	    :'txtSize',
   	name	    :'txtSize',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});

   var txtQuality = new Ext.form.TextField({
   	fieldLabel  :'Quality',
   	id	    :'txtQuality',
   	name	    :'txtQuality',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});
   	
      var txtBF = new Ext.form.TextField({
   	fieldLabel  :'BF',
   	id	    :'txtBF',
   	name	    :'txtBF',
   	width	    :100,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :3,
   	});
   	
     var txtGSM = new Ext.form.TextField({
   	fieldLabel  :'GSM',
   	id	    :'txtGSM',
   	name	    :'txtGSM',
   	width	    :100,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :4,
   	});
   	
    var txtRollNo = new Ext.form.TextField({
   	fieldLabel  :'Roll No',
   	id	    :'txtRollNo',
   	name	    :'txtRollNo',
   	width	    :100,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :5,
   	});
  
   var txtWeight = new Ext.form.TextField({
   	fieldLabel  :'Weight',
   	id	    :'txtWeight',
   	name	    :'txtWeight',
   	width	    :100,
   	readonly    :true,
   	labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
   	tabindex    :6,
   	});
  
   
   var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No ',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           :[],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:18px;font-weight:bold;color:#b8309f",
          enableKeyEvents: true,
          }); 	


  
 
 
  var ReelWeightPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'REEL WEIGHT',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'ReelWeightPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
            items: [
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
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
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				TrnProdReelWeight.hide();
			   }
			}
                  }
                  ],
        },
        items:[
    		{
    		xtype	:'fieldset',
    		title	:'',
    		width	:1200,
    		height	:1000,
    		x	:10,
    		y	:10,
    		border	:true,
    		layout	:'absolute',
    		
    		items:[
    		
    			

    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:10,
	    		border	:false,
	    		items:[cmbReelNo]
	    		},
			
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:50,
	    		border	:false,
	    		items:[txtSONO]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:90,
	    		border	:false,
	    		items:[txtCustomerName]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:130,
	    		border	:false,
	    		items:[txtQuality]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:170,
	    		border	:false,
	    		items:[txtBF]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:210,
	    		border	:false,
	    		items:[txtGSM]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:250,
	    		border	:false,
	    		items:[txtRollNo]
	    		},
	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:290,
	    		border	:false,
	    		items:[txtSize]
	    		},
	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:330,
	    		border	:false,
	    		items:[txtWeight]
	    		},
	    	       
	    	       
	    		],
	    		},
	    		],
	    		
	    	
        });
  
var ProdReelWindow = new Ext.Window({
	height      : 800,
        width       : 1000,
        y           : 50,
        title       :'REEL WEIGHT',
        items       : 'ReelWeightPanel',
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
             
             ProdReelWindow.show();  
        });      
   
