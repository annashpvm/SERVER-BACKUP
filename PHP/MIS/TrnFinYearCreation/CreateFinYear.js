Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid    = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinYear  = localStorage.getItem('gstyear');


   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');


   var nextFinId   =  Number(GinFinid)+1;
   var txtCurrentYear = new Ext.form.NumberField({
        fieldLabel  : 'Current Year',
        id          : 'txtCurrentYear',
        name        : 'txtCurrentYear',
        width       :  150,
	readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex    : 2,
        style       : "font-size:14px;font-weight:bold",
    }); 




   function check_password()
   {
      if (txtPassword.getRawValue() == "annafinyear")
      {
        Ext.getCmp('CreateFinYear').setDisabled(false);
      }
      else
      {
        Ext.getCmp('CreateFinYear').setDisabled(true);
      }    

   }   




   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 
    });



   var txtNewYear = new Ext.form.NumberField({
        fieldLabel  : 'New Fin Year',
        id          : 'txtNewYear',
        name        : 'txtNewYear',
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


 var FinanceYearCreationPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'FIN YEAR CREATION',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'FinanceYearCreationPanel',
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
            text: 'Create Fin Year',
            id  : 'CreateFinYear',
            style  : 'text-align:center;',
            tooltip: 'Finyear Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
//save
                    var gstSave;
                    gstSave="true";

		    Ext.Ajax.request({
		    url: 'GenerateFinYear.php',
		    params :
		    {
		       finyear : txtNewYear.getRawValue(),
		                                    	
		    },
                    callback:function()
	            {
                       alert(" Finance Year Created..."); 
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
                            items: [txtCurrentYear]
                         },
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 50,
                            border      : false,
                            items: [txtNewYear]
                         },

                 
]
},
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 450,
                            x           : 10,
                            y           : 200,
                            border      : false,
                            items: [txtPassword]
                         },

]
});
 var FinanceYearCreationWindow = new Ext.Window({
	height      : 350,
        width       : 400,
//        y           : 30,
        title       :'FINANCE YEAR CREATION ',
        items       : 'FinanceYearCreationPanel',
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
                 Ext.getCmp('CreateFinYear').setDisabled(true);

                 txtCurrentYear.setRawValue(GinFinYear);
                 if (GinFinid == 22)
                    txtNewYear.setRawValue('2023-2024');
                 else    
                    if (GinFinid == 23)
                        txtNewYear.setRawValue('2024-2025');
                 else    
                    if (GinFinid == 24)
                        txtNewYear.setRawValue('2025-2026');
           }
             }
            });
             
            FinanceYearCreationWindow.show();  
        });      
   
