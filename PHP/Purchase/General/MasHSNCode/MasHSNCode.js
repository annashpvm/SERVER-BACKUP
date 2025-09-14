Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
    var gstStatus = "N";
//var gstGroup;

var saveFlag = "Add";
var hcode = 0;
 var loadHSNdatastore = new Ext.data.Store({
      id: 'loadHSNdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasHSNCode.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadHSNCodes"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },
	[
                'hsn_sno', 'hsn_code', 'hsn_type', 'hsn_igst', 'hsn_cgst', 'hsn_sgst'

      ]),
    });
	
function RefreshData(){
        txtHSN.setRawValue("");	
        txtIGST.setValue('');
        txtCGST.setValue('');
        txtSGST.setValue('');
        txtmattype.setValue('');
    
	loadHSNdatastore.load({
        	 url: 'ClsMasHSNCode.php', 
              	 params:
        	 {
                	 task:"loadHSNCodes"
               	 }
	});	
};



var txtmattype = new Ext.form.TextField({
	fieldLabel  : 'MATERIAL TYPE',
	id          : 'txtmattype',
	name        : 'txtmattype',
	width       :  270,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	 style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#F03FDD",  	
	tabindex : 1,

});


var txtHSN = new Ext.form.TextField({
	fieldLabel  : 'HSN CODE ',
	id          : 'txtHSN',
	name        : 'txtHSN',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	 style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#F03FDD",       	
	tabindex : 1,
	listeners:{
	    keyup: function () {
	     
	     if (flxHSN.store.find('hsn_code', txtHSN.getValue()) != -1){
	     	flxHSN.getStore().filter('hsn_code', txtHSN.getValue());   
	     }
	     else
	     {
		     flxHSN.getStore().filter('txtHSN', '');
	     }
	     
		     
		    

		                  

	    }
	}

});



var txtIGST = new Ext.form.TextField({
	fieldLabel  : 'IGST % ',
	id          : 'txtIGST',
	name        : 'txtIGST',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	 style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#F03FDD",       	
	tabindex : 1,

});

var txtCGST = new Ext.form.TextField({
	fieldLabel  : 'CGST %',
	id          : 'txtCGST',
	name        : 'txtCGST',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	 style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#F03FDD",      	
	tabindex : 1,

});
var txtSGST = new Ext.form.TextField({
	fieldLabel  : 'SGST %',
	id          : 'txtSGST',
	name        : 'txtSGST',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	 style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#F03FDD",      	
	tabindex : 1,

}); 

  var dgrecord = Ext.data.Record.create([]);
   var flxHSN = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 740,
        x: 40,
        y: 330,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

    
        columns: [  
            {header: "HSN SNO"     , Id: 'hsn_sno', sortable:true,width:100,align:'left', menuDisabled: true},   
            {header: "HSN CODE"     , Id: 'hsn_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "MATERIAL TYPE", Id: 'hsn_type', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "IGST"        , Id: 'hsn_igst', sortable:true,width:100,align:'left', menuDisabled: true}, 
            {header: "CGST"      , Id: 'hsn_cgst', sortable:true,width:100,align:'left', menuDisabled: true},  
	    {header: "SGST"     , Id: 'hsn_sgst', sortable:true,width:100,align:'left', menuDisabled: true},                   
           ],
	viewConfig: {
getRowClass: function(record) {
    var red = record.get('hsn_code') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtHSN.getValue()) {
    return 'hsn_code'
    }
}
},

store:loadHSNdatastore,
listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxHSN.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveFlag =  "Edit";
			
			txtHSN.setValue(selrow.get('hsn_code'));
			txtmattype.setValue(selrow.get('hsn_type'));
			txtIGST.setValue(selrow.get('hsn_igst'));
			txtCGST.setValue(selrow.get('hsn_cgst'));
			txtSGST.setValue(selrow.get('hsn_sgst'));
			
			hcode=selrow.get('hsn_sno');
//			alert(hcode);
			 flxHSN .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    




   });

   var MasHSNCodeformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'HSN CODE',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasHSNCodeformpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    }),
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
	
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{
		
                            if (btn === 'yes')
				{

                      Ext.Ajax.request({
                            url: 'MasHSNCodeSave.php',
                            params :
                             {
                                savetype        : saveFlag,
                                hcode           : hcode,  
				hsncode 	: txtHSN.getValue(),
                                mattype		: txtmattype.getRawValue(),
				igst	        : txtIGST.getValue(),
				cgst	        : txtCGST.getValue(),
				sgst	        : txtSGST.getValue(),
		
				                       
			},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){                                
                                    Ext.MessageBox.alert("HSN CODE SAVED -" + obj['msg']);
                                    flxHSN.getStore().removeAll();
                                    RefreshData();
                                  }
                                  else{
					Ext.MessageBox.alert("HSN CODE Not Saved! Pls Check!- " + obj['msg']);                                                  
                                    }
                                }

                           });         
  
     				}
 

                            }     
       
                });

	

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
                    handler: function(){	
                            MasHSNCodeWindow.hide();
                        }
                      },
                    ]
                },

        items: [
            { xtype   : 'fieldset',
                title   : 'HSN CODE MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 310,
                width   : 550,
		style:{ border:'1px solid BLUE',color:' #581845 '},
                layout  : 'absolute',
                x       : 120,
                y       : 10,
                items:[
			 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 420,
				x           : 10,
				y           : 10,
				border      : false,
				items: [txtHSN]
		        },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 420,
				x           : 10,
				y           : 50,
				border      : false,
				items: [txtmattype]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 250,
				x           : 10,
				y           : 100,
				border      : false,
				items: [txtIGST]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 250,
				x           : 10,
				y           : 150,
				border      : false,
				items: [txtCGST]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 250,
				x           : 10,
				y           : 200,
				border      : false,
				items: [txtSGST]
			},
			
                ]

            },flxHSN
            
        ]
    });
    
   
    var MasHSNCodeWindow = new Ext.Window({
	height      : 600,
        width       : 850,
        y           : 35,
        title       : 'HSN CODE MASTER',
        items       : MasHSNCodeformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                       saveFlag = "Add"
			/*txtitemname.focus();
			loadmotormakedatastore.removeAll();
			loadmotormakedatastore.load({
                        	 url:'ClsMotorItem.php',
                        	 params:
                       		 {
                         	 task:"loadmotormake"
                        	 }
				 });

			loadlocationDataStore.removeAll();
			loadlocationDataStore.load({
                        	 url:'ClsMotorItem.php',
                        	 params:
                       		 {
                         	 task:"loadlocation"
                        	 }
				 });*/
			
	   		
			 }
		}
    });
    MasHSNCodeWindow.show();  
});
