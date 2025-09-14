Ext.onReady(function(){
   Ext.QuickTips.init();


var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv  No',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

style: {
            'color':'#32d94e',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 70
    });


 var txtInvAmt = new Ext.form.NumberField({
        fieldLabel  : 'Inv Amt',
        id          : 'txtInvAmt',
        name        : 'txtInvAmt',
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });


var GunalanPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '05032025',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 300,
       x           : 10,
        y           : 10,
        frame       : false,
        id          : 'GunalanPanel',
        method      : 'POST',
        layout      : 'absolute',
        items: [

              {
                        xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 150,
		        width   : 600,
			style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 300,
		        y       : 50,
		        items:[ 

                        {
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 250,
		             x       : 15,
			     y       : 10,
                             items: [txtInvNo]
                        },

                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 15,
			     y       : 40,
                             items: [txtInvAmt]
                        },
             ]
       }








      ]
});











 var rani = new Ext.Window({
	height      : 400,
        width       : 1200,
   //     y           : 160,
        title       :'Dummy window',
        items       : 'GunalanPanel',
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
             
            rani.show();   







});
