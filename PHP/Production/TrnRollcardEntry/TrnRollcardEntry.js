Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');


var loadRollNoDatastore = new Ext.data.Store({
      id: 'loadRollNoDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnRollcardEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });

var loadVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnRollcardEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode'
      ]),
    });

var dtproddate = new Ext.form.DateField({
    fieldLabel : 'M/C  P.DATE',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});

var lblrollno = new Ext.form.Label({
	fieldLabel  : 'Roll No',
	id          : 'lblrollno',
	name        : 'lblrollno',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

}); 

var cmbRollno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'prd_rollno', 
        valueField      : 'prd_rollno',
        hiddenName      : '',
        id              : 'cmbRollno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRollNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                loadVarietyDatastore.removeAll();
     		loadVarietyDatastore.load({
     		url: 'ClsTrnRollcardEntry.php',
		params: {
			    task: 'loadVariety',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollno.getValue()
                        },
               	callback:function()
			{
                        }
                });


	}
	}
   });



var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           :  150,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVarietyDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                loadVarietyDetailsDatastore.removeAll();
     		loadVarietyDetailsDatastore.load({
     		url: 'ClsTrnRollcardEntry.php',
		params: {
			    task: 'loadVarietyDetails',
		            finid: GinFinid,
			    compcode:Gincompcode,
                            rollno:cmbRollno.getValue(),
                            varty : cmbVariey.getValue(),
                        },
               	callback:function()
			{
                        }
                });
	}
	}
   });


var lblBF = new Ext.form.Label({
	fieldLabel  : 'BF',
	id          : 'lblBF',
	name        : 'lblBF',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

   
var cmbbatch = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbbatch',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });   

var lblrollwt = new Ext.form.Label({
	fieldLabel  : 'WT (Tons)',
	id          : 'lblrollwt',
	name        : 'lblrollwt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtrollwt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtrollwt',
        name        : 'txtrollwt',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblmcdeckle = new Ext.form.Label({
	fieldLabel  : 'M/C Deckle',
	id          : 'lblmcdeckle',
	name        : 'lblmcdeckle',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtmcdeckle = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtmcdeckle',
        name        : 'txtmcdeckle',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblvar = new Ext.form.Label({
	fieldLabel  : 'Variety',
	id          : 'lblvar',
	name        : 'lblvar',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtvar = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtvar',
        name        : 'txtvar',
        width       : 150,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblgsm = new Ext.form.Label({
	fieldLabel  : 'GSM',
	id          : 'lblgsm',
	name        : 'lblgsm',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtbf = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtbf',
        name        : 'txtbf',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtgsm = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblPPNo = new Ext.form.Label({
	fieldLabel  : 'PP No',
	id          : 'lblPPNo',
	name        : 'lblPPNo',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtmano = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtmano',
        name        : 'txtmano',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});



var lblbreaks = new Ext.form.Label({
	fieldLabel  : 'Breaks',
	id          : 'lblbreaks',
	name        : 'lblbreaks',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtbreaks = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtbreaks',
        name        : 'txtbreaks',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var lblrolldia = new Ext.form.Label({
	fieldLabel  : 'Roll Dia',
	id          : 'lblrolldia',
	name        : 'lblrolldia',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtrolldia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtrolldia',
        name        : 'txtrolldia',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txttotnoset = new Ext.form.NumberField({
        fieldLabel  : 'Total No. of sets',
        id          : 'txttotnoset',
        name        : 'txttotnoset',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1, 
		
        listeners   :{
           keyup:function(){
               var newdata = '';
               for(var i=1;i<txttotnoset.getValue()+1;i++)
               {
                   newdata = newdata + i;
        	}
       //        alert(newdata);
              cmbselectsetno.reset();
              cmbselectsetno.store.loadData(newdata);           }
        }       
});
   
var cmbselectsetno = new Ext.form.ComboBox({
        fieldLabel      : 'Select SET No',
        width           : 60,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbselectsetno',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
           select: function(){
                 alert(cmbselectsetno.getValue());
           }    
    	}
   });                  

var cmbselallsetsamdeck = new Ext.form.ComboBox({
        fieldLabel      : 'Select All Sets are same Deckle',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbselallsetsamdeck',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Yes','No'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   }); 

var cmbrewinddeckl = new Ext.form.ComboBox({
        fieldLabel      : 'Rewinder Deckle',
        width           : 350,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbrewinddeckl',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   }); 


var dgrecord = Ext.data.Record.create([]);
var flxrollcard = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 190,
        width: 1040,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Quality", dataIndex: 'quality',sortable:true,width:100,align:'left'},      
            {header: "Qlycode", dataIndex: 'qlycode',sortable:true,width:100,align:'left'}, 
            {header: "BF", dataIndex: 'bf',sortable:true,width:50,align:'left'},          
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:50,align:'left'},  
            {header: "SET", dataIndex: 'set',sortable:true,width:80,align:'left'},
            {header: "SIZE", dataIndex: 'size',sortable:true,width:150,align:'left'}, 
            {header: "REMARKS", dataIndex: 'remarks',sortable:true,width:150,align:'left'},
            {header: "PROCESS", dataIndex: 'process',sortable:true,width:50,align:'left'},
            {header: "ORDER", dataIndex: 'order',sortable:true,width:70,align:'left'},
        ],
store:[], //loadsalledgerlistdatastore,

    

   });
/*
var lblcheck = new Ext.form.Label({
	fieldLabel  : 'CHECK FOR REWINDER DATA IF ROLL CARD IS PROCESS OR NOT',
	id          : 'lblcheck',
	name        : 'lblcheck',
	width       :  120,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var btncheck = new Ext.Button({
        icon	:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 60,
        text    : "CHECK ",
        x       : 1020,
        y       : 75,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;", 
    	listeners:{
        click: function(){    
          	var addok;
	              addok ="true";

	          	       refresh();

            
  }
}
});
*/

var dgrecord = Ext.data.Record.create([]);
var flxsetbatch = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 240,
        x: 930,
        y: 150,        
        columns: [   
            {header: "SET", dataIndex: 'set',sortable:true,width:80,align:'left'}, 
            {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:80,align:'left'},  
            {header: "BATCH", dataIndex: 'batch',sortable:true,width:80,align:'left'},
        ],
store:[], //loadsalledgerlistdatastore,

    

   });

var TrnRollcardEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ROLL CARD ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
        frame       : false,
        id          : 'TrnRollcardEntryFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
		    {
                    text: 'New',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Add Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                   
                  }
                }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            TrnRollcardEntryWindow.RefreshData();
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
                            TrnRollcardEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                
		{
		  xtype	: 'fieldset',
                title	: '',
                layout 	: 'hbox',
                border	:true,
                height	:440,
                width	:920,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 210,
				x           : 680,
				y           : -10,
				border      : false,
				items	    : [dtproddate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 120,
				x           : 5,
				y           : 25,
				border      : false,
				items	    : [lblrollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 120,
				x           : -5,
				y           : 50,
				border      : false,
				items	     : [cmbRollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 120,
				y           : 25,
				border      : false,
				items	    : [lblvar]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 300,
				x           : 110,
				y           : 50,
				border      : false,
				items       : [cmbVariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 300,
				y           : 25,
				border      : false,
				items	    : [lblBF]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 300,
				x           : 280,
				y           : 50,
				border      : false,
				items       : [txtbf]
			},
			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 80,
				x           : 380,
				y           : 25,
				border      : false,
				items	    : [lblgsm]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 90,
				x           : 360,
				y           : 50,
				border      : false,
				items       : [txtgsm]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 90,
				x           : 450,
				y           : 25,
				border      : false,
				items	    : [lblrollwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 100,
				x           : 445,
				y           : 50,
				border      : false,
				items       : [txtrollwt]
			},
			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 90,
				x           : 550,
				y           : 25,
				border      : false,
				items	    : [lblPPNo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 100,
				x           : 535,
				y           : 50,
				border      : false,
				items       : [txtmano]
			},			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 625,
				y           : 25,
				border      : false,
				items	    : [lblmcdeckle]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 110,
				x           : 615,
				y           : 50,
				border      : false,
				items       : [txtmcdeckle]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 735,
				y           : 25,
				border      : false,
				items	    : [lblbreaks]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 165,
				x           : 720,
				y           :50,
				border      : false,
				items       : [txtbreaks]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 100,
				x           : 815,
				y           : 25,
				border      : false,
				items	    : [lblrolldia]
			},		
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 165,
				x           : 805,
				y           : 50,
				border      : false,
				items       : [txtrolldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 190,
				x           : 0,
				y           : 100,
				border      : false,
				items       : [txttotnoset]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 200,
				width       : 300,
				x           : 300,
				y           : 100,
				border      : false,
				items	     : [cmbselallsetsamdeck]
			},			
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 190,
				x           : 0,
				y           : 140,
				border      : false,
				items	     : [cmbselectsetno]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 500,
				x           : 300,
				y           : 140,
				border      : false,
				items	     : [cmbrewinddeckl]
			},
			     
      
                	]
		  },
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 220,
				width       : 230,
				x           : 930,
				y           : 30,
				border      : true,
				items	    : [lblcheck]
			},
*/

//                     btncheck,
flxsetbatch,
		{
		xtype	: 'fieldset',
                title	: 'CUTTING SIZES',
                layout 	: 'hbox',
                border	: true,
                height	: 240,
                width	: 900,
                layout 	: 'absolute',
                x	: 15,
                y	: 200,
             	items:[
			flxrollcard,
             	   ]
            	 }
		]
               });


function RefreshData()
{

	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnRollcardEntry.php',
		params: {
	    	   task: 'loadRollNo',
		   compcode:Gincompcode,
		   finid:GinFinid   
		 },
		 callback:function()
		   {

		   } 
	  });

}

     var TrnRollcardEntryWindow = new Ext.Window({
        height      : 550,
        width       : 1200,
        y           : 40,
        layout      : 'fit',
        items       : TrnRollcardEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
onEsc:function(){
},
        listeners:
            {
               show:function(){
                      RefreshData();	   	
	   	}
            }
    });
       TrnRollcardEntryWindow.show();
});
