Ext.onReady(function() {
Ext.QuickTips.init();
var GinUser = localStorage.getItem('ginusername');
var GinUserid = localStorage.getItem('ginuserid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserLogin = localStorage.getItem('ginuserlogin');

var UserId   = localStorage.getItem('ginuserid');
var GinUserPW = localStorage.getItem('ginuserpw');	




new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  MasPasswordChangeWindow.hide();

            }
        }]);



  var txtUserName= new Ext.form.TextField({
        fieldLabel  : 'User Name',
     labelStyle      : "font-size:16px;font-weight:bold;color:#a64dff",
        id          : 'txtUserName',
        name        : 'txtUserName',
        readOnly : 'true',
        width       :  180,
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });
var txtUserLogin= new Ext.form.TextField({
        fieldLabel  : 'User ID',
        labelStyle      : "font-size:16px;font-weight:bold;color:#b366ff",
        id          : 'txtUserLogin',
        name        : 'txtUserLogin',
        width       :  180,

        allowBlank  :  true
    });

var txtOLDPW= new Ext.form.TextField({
        fieldLabel  : 'Old Pass Word',
        labelStyle      : "font-size:16px;font-weight:bold;color:#a64dff",
        id          : 'txtOLDPW',
        name        : 'txtOLDPW',
        width       :  180,
//    readOnly : 'true',
       // style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });
var txtNEWPW= new Ext.form.TextField({
        fieldLabel  : 'New Pass Word',
        labelStyle  : "font-size:16px;font-weight:bold;color:#a64dff",
        id          : 'txtNEWPW',
        name        : 'txtNEWPW',
        width       :  180,
        inputType: 'password',
        allowBlank  :  true
    });
var txtRetypePW= new Ext.form.TextField({
        fieldLabel  : 'Retype Pass Word',
        labelStyle  : "font-size:16px;font-weight:bold;color:#a64dff",
        id          : 'txtRetypePW',
        name        : 'txtRetypePW',
        width       :  180,
        inputType: 'password',
        allowBlank  :  true
    });

function save_click()
{
  if (GinUserPW.toString().trim() == txtOLDPW.getValue().toString().trim())
  {
     if (txtRetypePW.getValue().toString().trim() == txtNEWPW.getValue().toString().trim())
     {
            Ext.Ajax.request({
            url: 'MasPasswordChangeSave.php',
            params :
             {
                usercode : UserId,
                username : UserName,
		password : txtNEWPW.getRawValue(),
                             


		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Password Changed for -" + obj['msg']);
                    GinUserPW = txtNEWPW.getRawValue() ;	
                    RefreshData();
                  }else
                  {
   Ext.MessageBox.alert("Password Changed! Pls Check!- " + obj['msg']);                                                  
                   }
                }
           }); 

     } 
     else
     {
        alert("Passwords are not matched . Please check");
     }  
      
  } 
  else
  {
       alert("Old Password is not matched");
  }  
} 

var MasPasswordFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
     //header         :true,
        width       : 600,
        height      : 100,
       bodyStyle:{"background-color":"#ffffcc"},
	x        :0,
	y        :0,
       // frame       : true,
        id          : 'MasPasswordFormPanel',
        method      : 'post',
        layout      : 'absolute',
 	tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Save',
                   
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize :30,width :70,
                    icon: '/Pictures/save.png',
                    listeners:{
                        click: function () {
                               save_click();

                        }
                    }

                },'-',
		{
                    text: 'Refresh',
                   
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize :30,width :70,
                   // icon: '/Pictures/save.png'
                },'-',
		{
                    text: 'Exit',
                   
                    style  : 'text-align:center;',
                    tooltip: 'Exit Details...', height: 40, fontSize :30,width :70,
         
                    listeners:{
                        click: function () {
                             MasPasswordChangeWindow.hide();

                        }
                    }

                //    icon: '/Pictures/save.png'
                }]
},
 items:[
		{
		xtype   : 'fieldset',
               
                layout  : 'hbox',
                border  : true,
                height  : 250,
                width   : 412,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
              
                     items:[
				
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 0,
                        border      : false,
                        labelWidth  : 165,
                        items: [txtUserName]
                       },
			 {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 40,
                        border      : false,
                        labelWidth  : 165,
                        items: [txtUserLogin]
                       },
			
			 {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 100,
                        border      : false,
                        labelWidth  : 165,
                        items: [txtOLDPW]
                       },
 			{
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 140,
                        border      : false,
                        labelWidth  : 165,
                        items: [txtNEWPW]
                       },
			 {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 180,
                        border      : false,
                        labelWidth  : 165,
                        items: [txtRetypePW]
                       },
                         ]
}
]               
    
});
        
function RefreshData() {
   txtOLDPW.setRawValue('');
   txtNEWPW.setRawValue('');
   txtRetypePW.setRawValue('');


}
     var MasPasswordChangeWindow = new Ext.Window({
        height      : 350,
        width       : 460,
        items       : MasPasswordFormPanel,
        title       : 'Password Change',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 90,
onEsc:function(){
},
        listeners:{
            
                 show:function(){
    		 RefreshData();
                 txtUserName.setRawValue(GinUser);    

                 //txtOLDPW.setRawValue(GinUserPW); 
                 txtUserLogin.setRawValue(UserLogin);  
                    }
}
                });
        
       MasPasswordChangeWindow.show();
});
