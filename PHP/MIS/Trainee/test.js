Ext.onReady(function(){
   Ext.QuickTips.init();




    var dt = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'dt',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });

   var dt1 = new Ext.form.DateField({
        fieldLabel : 'To Date',
        id         : 'dt1',
        format     : 'd-m-Y',
        labelStyle : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()  
   });     



    var userName = new Ext.form.TextField({
        fieldlabel  : 'UserName',    
        id          : 'username',
        name        : 'username',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });
                                                                        

                                                                                                                     


    var txtInvNo = new Ext.form.TextField({
        fieldLabel  : 'Inv  No',
        id          : 'txtInvNo',
        name        : 'txtInvNo',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
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
        width       : 120
    });
       
var UserMasPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'test ENTRY',
        header      : false,
        width       : 1340,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 900,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'UserMasPanel',
        method      : 'POST',
        layout      : 'absolute',
        items: [

		    {
                        xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 300,
		        width   : 600,
			style:{ border:'1px solid blue',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 100,
		        y       : 100,
		        items:[ 

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 15,
			     y       : 50,
                             items: [dt]
                        },

                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 300,
			     y       : 50,
                             items: [dt1]
                        },


                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 15,
			     y       : 160,
                             items: [userName]
                        },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 15,
			     y       : 80,
                             items: [txtInvNo]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 15,
			     y       : 110,
                             items: [txtInvAmt]
                        },

                        ] 
                    }      

        ]     

});



 var UsrMasWindow = new Ext.Window({
	height      : 500,
        width       : 1200,
        y           : 30,
        title       :'USER MASTER',
        items       : 'UserMasPanel',
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
             
            UsrMasWindow.show();  
});
        

