Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid    = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinYear  = localStorage.getItem('gstyear');


   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');







    var yearstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'yearstartdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });
    var yearenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'yearenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
        width : 110   
    });



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


 var StoresOpeningTransferPanel = new Ext.FormPanel({
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
        id          : 'StoresOpeningTransferPanel',
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



                          Ext.Ajax.request({
                          url: 'WastePaperOpeningTransfer.php',
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
                                  
                                    Ext.MessageBox.alert("Waste Paper Year opening Stock Transferred Sucessfully");

                                  }else{
                                     Ext.MessageBox.alert("Waste Paper Year opening Stock opening NOT Transferred.. Pls Check!");                                                  
                                    }
                                }
                           });         
   
                          }

             } 	
        },'-',
  

	    {
            text: 'Stock Correction',
            style  : 'text-align:center;',
            tooltip: 'Transfer Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            id:'StockCorrection',
            listeners:{
                click:function()
                {
//save
                    var gstSave;
                    gstSave="true";



                          Ext.Ajax.request({
                          url: 'WastePaperStockCorrection.php',
                          params :
                             {
			        compcode  : Gincompcode,
                                finid     : GinFinid,   
                                startdate : finstdate,
                                enddate   : fineddate,   
                             },
                         callback: function(options, success, response)
                              {
                                 var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Waste Paper Stock Corrected Sucessfully");

                                  }else{
                                     Ext.MessageBox.alert("Waste Paper Stock Not Corrected .. Pls Check!");Corrected
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
                   
                },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                         StoresOpeningTransferWindow.hide();
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
},

]
});
 var StoresOpeningTransferWindow = new Ext.Window({
	height      : 350,
        width       : 400,
//        y           : 30,
        title       :'WASTE PAPER STOCK - CLOSING TRANSFER ',
        items       : 'StoresOpeningTransferPanel',
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
             
            StoresOpeningTransferWindow.show();  
        });      
   
