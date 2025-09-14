Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid    = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinYear  = localStorage.getItem('gstyear');


   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');


   var nextFinId   =  Number(GinFinid)+1;
   var txtClosingYear = new Ext.form.NumberField({
        fieldLabel  : 'Closing Year',
        id          : 'txtClosingYear',
        name        : 'txtClosingYear',
        width       :  150,
	readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex    : 2,
        style       : "font-size:14px;font-weight:bold",
    }); 



   var txtOpeningYear = new Ext.form.NumberField({
        fieldLabel  : 'Opening Year',
        id          : 'txtOpeningYear',
        name        : 'txtOpeningYear',
        width       :  150,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
  	enableKeyEvents: true,
        listeners:{
		    keyup:function(){

            },      
  	}
    }); 


 var AccLederOpeningPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'CLOSING TRANSFER',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 500,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'AccLederOpeningPanel',
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
            fontSize:25,
            items: [

	    {
            text: 'Transfer Data',
            id  : 'save',
            style  : 'text-align:center;',
            tooltip: 'Transfer Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            id:'save',
            listeners:{
                click:function()
                {
//save
                    var gstSave;
                    gstSave="true";
         Ext.getCmp('save').setDisabled(true);
                          Ext.Ajax.request({
                          url: 'OpeningTransfer.php',
                          params :
                             {
			        compcode  : Gincompcode,
			        finid     : GinFinid,   
                                nextfinid : nextFinId, 
                                startdate : finstdate,
                                enddate   : fineddate,   
                             },
                         callback: function(options, success, response)
                              {
                                 var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Year opening Transferred Sucessfully");

                                  }else{
                                     Ext.MessageBox.alert("Year opening NOT Transferred.. Pls Check!");                                                  
                                    }
         Ext.getCmp('save').setDisabled(false);
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
                   
                },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                         AccLederOpeningTransferWindow.hide();
                    }
                    
                },]
},
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 125,
                width   : 360,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[

			 

			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 10,
                            border      : false,
                            items: [txtClosingYear]
                         },
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 50,
                            border      : false,
                            items: [txtOpeningYear]
                         },

                 
]
}
]
});
 var AccLederOpeningTransferWindow = new Ext.Window({
	height      : 225,
        width       : 400,
//        y           : 30,
        title       :'ACCOUNTS LEDGER CLOSING TRANSFER ',
        items       : 'AccLederOpeningPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,

 	listeners:{
               show:function(){
              // RefreshData();
                 txtClosingYear.setRawValue(GinFinYear);
                 if (GinFinid == 22)
                    txtOpeningYear.setRawValue('2023-2024');
                 else    
                    if (GinFinid == 23)
                        txtOpeningYear.setRawValue('2024-2025');
                 else    
                    if (GinFinid == 24)
                        txtOpeningYear.setRawValue('2025-2026');
           }
             }
            });
             
            AccLederOpeningTransferWindow.show();  
        });      
   
