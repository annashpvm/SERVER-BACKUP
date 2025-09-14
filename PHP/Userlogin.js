	/*global Ext*/
var usrtype = '';
Ext.onReady(function () {
    Ext.QuickTips.init();
    var username='';

    var usrpw='';
    var usrtype = 0;
    var usrname = '';


    var newdays = 0;
    var editdays = 0;    
    var usracct   = "NO";
    var usrsale   = "NO";
    var usrprod   = "NO";
    var usrpur    = "NO";
    var usrstr    = "NO";
    var usrrm     = "NO";
    var usrfuel   = "NO";
    var usrimp    = "NO";
    var usrpay    = "NO";
    var usrindent = "NO";
    var usrinward = "NO";
    var usrqc     = "NO";


  var findLoginNameDataStore = new Ext.data.Store({
      id: 'findLoginNameDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "findLoginName"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
 'usr_dept', 'usr_name', 'usr_login', 'usr_pw', 'usr_type', 'usr_accounts', 'usr_sales', 'usr_production', 'usr_purchase', 'usr_stores', 'usr_rawmaterial', 'usr_fuel', 'usr_import', 'usr_payroll', 'usr_active','usr_code',
'usr_indent','usr_inward','usr_entrydays','usr_alterdays','usr_qc'
      ]),

    });




  var UserDataStore = new Ext.data.Store({
      id: 'UserDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loaduser"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'userid', type: 'int', mapping: 'userid'},
        {name: 'username', type: 'string', mapping: 'username'}
      ]),
      sortInfo:{field: 'userid', direction: "DESC"}
    });

  var CompanyDataStore = new Ext.data.Store({
      id: 'CompanyDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadcompany"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'companycode', type: 'int', mapping: 'companycode'},
        {name: 'companyname', type: 'string', mapping: 'companyname'}
      ]),
      sortInfo:{field: 'companycode', direction: "ASC"}
    });

  var FinyearDataStore = new Ext.data.Store({
      id: 'FinyearDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadfinyear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_code', type: 'int', mapping: 'fin_code'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_year', direction: "DESC"}
    });

    var lblHeading = new Ext.form.Label({
        fieldLabel: 'LOGIN',
        id: 'lblHeading',
        labelStyle: 'font-size: 14px; font-weight: bold;'
    });
    
    var txtUser = new Ext.form.ComboBox({
     //   fieldLabel      : 'USERNAME',
        width           : 150,
        icon: '/SHVPM/Pictures/add.png',
        displayField    : 'username',
        valueField      : 'userid',
        hiddenName      : 'username',
        id              : 'txtUser',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        store           : UserDataStore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	listeners:{
	select:function(){
		   username=txtUser.getRawValue();
	   }
	}
    });

    var txtLoginName = new Ext.form.TextField({
        fieldLabel: 'USER NAME',
        id: 'txtLoginName',

        allowBlank: false,
        minLength: 3,
        maxLength: 30,
        width: 150,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:8px;",     	
        name: 'txtLoginName',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 txtPasswd.focus();
             }
          }
        }
    });


    var txtPasswd = new Ext.form.TextField({
        fieldLabel: 'PASS WORD',
        id: 'txtPasswd',
        inputType: 'password',
        allowBlank: false,
        minLength: 3,
        maxLength: 30,
        width: 150,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:8px;",     	
        name: 'txtPasswd',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnLoginNew.focus();
             }
          }
        }
    });

    var txtComp = new Ext.form.ComboBox({
        fieldLabel      : 'MILL NAME',
        width           : 320,
        displayField    : 'companyname',
        valueField      : 'companycode',
        hiddenName      : 'companyname',
        id              : 'txtComp',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:8px;",   
        store           : CompanyDataStore,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnLoginNew.focus();
             }
          }
        }
    });

    var txtfinyear = new Ext.form.ComboBox({
        fieldLabel      : 'FIN YEAR',
        width           : 150,
        displayField    : 'fin_year',
        valueField      : 'fin_code',
        hiddenName      : 'fin_year',
        id              : 'txtfinyear',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:8px;",   
        store           : FinyearDataStore,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnLoginNew.focus();
             }
          }
        }
    });


var btnLogin = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGIN",
    width   : 80,
    height  : 50,
    x       : 0,
    y       : 0,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              borderRadius:'10px',
          },
    bodyStyle:{"background-color":"#ebebdf"},
//    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){       
	      EnterLogin();	  
        }

     }
});


var btnUser = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
 icon: '/SHVPM/Pictures/add.png',
iconAlign: 'center',
//    text    : "LOGIN",
    width   : 80,
    height  : 50,
    x       : 0,
    y       : 0,

          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              borderRadius:'10px',
          },
    bodyStyle:{"background-color":"#ebebdf"},
//    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){       
	      EnterLogin();	  
        }

     }
});


var btnTemp = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGIN",
    width   : 80,
    height  : 50,
    x       : 200,
    y       : 100,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              borderRadius:'10px',
          },
    bodyStyle:{"background-color":"#ebebdf"},
//    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){    
             txtLoginName.setRawValue('annait')
             txtPasswd.setRawValue('annait')
   
	      EnterLoginTEMP();	  
        }

     }
});

function EnterLoginTEMP()
{
    if(txtLoginName.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Login Name!");
    }else if(txtPasswd.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Password!");
    }else
    {	



        findLoginNameDataStore.removeAll();
        findLoginNameDataStore.load({
	url: 'clsuser.php',
	params: {
	    task: 'findLoginName',
            loginname: txtLoginName.getRawValue(),
        },
   	callback:function()
	{
           var cnt=findLoginNameDataStore.getCount();
           if(cnt>0)
	   {    
                userid = findLoginNameDataStore.getAt(0).get('usr_code');
		usrpw = findLoginNameDataStore.getAt(0).get('usr_pw');
		usrtype = findLoginNameDataStore.getAt(0).get('usr_type');
		usrname = findLoginNameDataStore.getAt(0).get('usr_name');
		usracct = findLoginNameDataStore.getAt(0).get('usr_accounts');
		usrsale = findLoginNameDataStore.getAt(0).get('usr_sales');
		usrprod = findLoginNameDataStore.getAt(0).get('usr_production');
		usrpur = findLoginNameDataStore.getAt(0).get('usr_purchase');
		usrstr = findLoginNameDataStore.getAt(0).get('usr_stores');
		usrrm = findLoginNameDataStore.getAt(0).get('usr_rawmaterial');
		usrfuel = findLoginNameDataStore.getAt(0).get('usr_fuel');
		usrimp = findLoginNameDataStore.getAt(0).get('usr_import');
		usrpay = findLoginNameDataStore.getAt(0).get('usr_payroll');
       		usrindent = findLoginNameDataStore.getAt(0).get('usr_indent');
		usrinward = findLoginNameDataStore.getAt(0).get('usr_inward');
          	usrmis = findLoginNameDataStore.getAt(0).get('usr_mis');
                var systemallowed = "(0";    
                if (usracct != "NO")
                   systemallowed = systemallowed + ",1";
                if (usrsale != "NO")
                   systemallowed = systemallowed + ",2";
                if (usrstr != "NO")
                   systemallowed = systemallowed + ",3";
                if (usrrm != "NO")
                   systemallowed = systemallowed + ",4";
                if (usrpur != "NO")
                   systemallowed = systemallowed + ",5";
                if (usrfuel != "NO")
                   systemallowed = systemallowed + ",7";
                if (usrprod != "NO")
                   systemallowed = systemallowed + ",8";  
                if (usrpay != "NO")
                   systemallowed = systemallowed + ",9";
                if (usrindent != "NO")
                   systemallowed = systemallowed + ",10";
                if (usrimp != "NO")
                   systemallowed = systemallowed + ",11";    
                if (usrinward != "NO")
                   systemallowed = systemallowed + ",12";

                if (userid  == 1 || userid  == 17  )
                {    
                   systemallowed = systemallowed + ",15";
                   systemallowed = systemallowed + ",16";
                }   

                 systemallowed = systemallowed + ")";




//alert(systemallowed);

                if (txtPasswd.getRawValue() == usrpw)
                {  
			var gstcompcode=Ext.getCmp('txtComp').getValue();
			var gstcompname=Ext.getCmp('txtComp').getRawValue();
//			var username=Ext.getCmp('txtUser').getRawValue();
			var username=Ext.getCmp('txtLoginName').getRawValue();


			var finid=Ext.getCmp('txtfinyear').getValue();
			var gstFinyear=Ext.getCmp('txtfinyear').getRawValue();		    
			var finstdate=gstFinyear.substr(0,4) + '-04-01';
			var fineddate=gstFinyear.substr(5,4) + '-03-31';
                          
                        var invfin  = gstFinyear.substr(2,2) + "-" + gstFinyear.substr(7,2);

			localStorage.setItem("user",username); 
			localStorage.setItem("ginusername",usrname); 
       			localStorage.setItem("ginusertype",usrtype);	
			localStorage.setItem("ginuserid",userid);	
                 	localStorage.setItem("ginuserpw",usrpw);	



			localStorage.setItem("gincompcode",gstcompcode);  
			localStorage.setItem("gstcompany",gstcompname);


			localStorage.setItem("ginfinid",finid);	
			localStorage.setItem("gstyear",gstFinyear);
			localStorage.setItem("gfinstdate",finstdate);
			localStorage.setItem("gfineddate",fineddate);
			localStorage.setItem("invfin",invfin);
  
                	localStorage.setItem("allowed_systems",systemallowed);

			window.location.href=('ModulesNew.php');               
        }

                else
                {
                    alert("Password is Error  . Please Retry ");
                    txtPasswd.focus();
                }
            }
            else
            {
                  alert("Login User Name Not found  . Please Retry ");
            }      


        }    
     });




    }
 }


var btnLoginNew = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGIN",
    width   : 80,
    height  : 50,
    x       : 0,
    y       : 0,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              borderRadius:'10px',
          },
    bodyStyle:{"background-color":"#ebebdf"},
//    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){       
	      EnterLoginNew();	  
        }

     }
});


var btnLogout = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGOUT",
    width   : 80,
    height  : 50,
    x       : 0,
    y       : 0,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              borderRadius:'10px',

          },
    bodyStyle:{"background-color":"#ebebdf"},
//    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){       
	     window.location.href=('http://www.google.com');;	  
        }

     }
});


function EnterLogin()
{


    if(txtUser.getRawValue()===""){
	Ext.Msg.alert("Alert","Select User!");
    }else if(txtPasswd.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Password!");
    }else{	
	var userget=Ext.getCmp('txtUser').getRawValue();	      
	var passget=Ext.getCmp('txtPasswd').getRawValue();
	var userid=Ext.getCmp('txtUser').getValue();

	for (var i=0;i<UserDataStore.getCount();i++) {
		if (userget === UserDataStore.getAt(i).get('username')) {
		userid = UserDataStore.getAt(i).get('userid')

		}
	}


	Ext.Ajax.request({
	    url: 'usrloginchk.php',
	    params: {
	        username: userget,
	        password: passget
	    },
	    success: function(response){
		    var text = response.responseText;
		    if(text == "success")
		    {

		localStorage.setItem("user",userget); 
alert(userget);
				var gstcompcode=Ext.getCmp('txtComp').getValue();
				var gstcompname=Ext.getCmp('txtComp').getRawValue();
				var username=Ext.getCmp('txtUser').getRawValue();
				var finid=Ext.getCmp('txtfinyear').getValue();
				var gstFinyear=Ext.getCmp('txtfinyear').getRawValue();		    
				var finstdate=gstFinyear.substr(0,4) + '-04-01';
				var fineddate=gstFinyear.substr(5,4) + '-03-31';
                                  
                                var invfin  = gstFinyear.substr(2,2) + "-" + gstFinyear.substr(7,2);


				localStorage.setItem("gstuser",username);   
				localStorage.setItem("gincompcode",gstcompcode);  
				localStorage.setItem("gstcompany",gstcompname);
				localStorage.setItem("ginuser",userid);			           
				localStorage.setItem("ginfinid",finid);	
				localStorage.setItem("gstyear",gstFinyear);
				localStorage.setItem("gfinstdate",finstdate);
				localStorage.setItem("gfineddate",fineddate);
				localStorage.setItem("invfin",invfin);

				window.location.href=('Modules.php');
		     }
		     else
		     {
		         Ext.Msg.alert('Message',text);
		     }
            }
     });
}


}


function EnterLoginNew()
{



    if(txtLoginName.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Login Name!");
    }else if(txtPasswd.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Password!");
    }else
    {	




        findLoginNameDataStore.removeAll();
        findLoginNameDataStore.load({
	url: 'clsuser.php',
	params: {
	    task: 'findLoginName',
            loginname: txtLoginName.getRawValue(),
        },
   	callback:function()
	{
           var cnt=findLoginNameDataStore.getCount();
           if(cnt>0)
	   {    


                userid = findLoginNameDataStore.getAt(0).get('usr_code');
		usrpw = findLoginNameDataStore.getAt(0).get('usr_pw');
		usrtype = findLoginNameDataStore.getAt(0).get('usr_type');
		usrname = findLoginNameDataStore.getAt(0).get('usr_name');
            	usrlogin = findLoginNameDataStore.getAt(0).get('usr_login');
		usracct = findLoginNameDataStore.getAt(0).get('usr_accounts');
		usrsale = findLoginNameDataStore.getAt(0).get('usr_sales');
		usrprod = findLoginNameDataStore.getAt(0).get('usr_production');
		usrpur = findLoginNameDataStore.getAt(0).get('usr_purchase');
		usrstr = findLoginNameDataStore.getAt(0).get('usr_stores');
		usrrm = findLoginNameDataStore.getAt(0).get('usr_rawmaterial');
		usrfuel = findLoginNameDataStore.getAt(0).get('usr_fuel');
		usrimp = findLoginNameDataStore.getAt(0).get('usr_import');
		usrpay = findLoginNameDataStore.getAt(0).get('usr_payroll');
       		usrindent = findLoginNameDataStore.getAt(0).get('usr_indent');
		usrinward = findLoginNameDataStore.getAt(0).get('usr_inward');
          	usrmis = findLoginNameDataStore.getAt(0).get('usr_mis');
        	usrqc  = findLoginNameDataStore.getAt(0).get('usr_qc');

          	newdays = findLoginNameDataStore.getAt(0).get('usr_entrydays');
                editdays = findLoginNameDataStore.getAt(0).get('usr_alterdays');

                var systemallowed = "(0";    
                if (usracct != "NO")
                   systemallowed = systemallowed + ",1";
                if (usrsale != "NO")
                   systemallowed = systemallowed + ",2";
                if (usrstr != "NO")
                   systemallowed = systemallowed + ",3";
                if (usrrm != "NO")
                   systemallowed = systemallowed + ",4";
                if (usrpur != "NO")
                   systemallowed = systemallowed + ",5";
                if (usrfuel != "NO")
                   systemallowed = systemallowed + ",7";
                if (usrprod != "NO")
                   systemallowed = systemallowed + ",8";  
                if (usrpay != "NO")
                   systemallowed = systemallowed + ",9";
                if (usrindent != "NO")
                   systemallowed = systemallowed + ",10";
                if (usrimp != "NO")
                   systemallowed = systemallowed + ",11";    
                if (usrinward != "NO")
                   systemallowed = systemallowed + ",12";
                if (usrqc != "NO")
                   systemallowed = systemallowed + ",17";

                if (userid  == 1 || userid  == 17  )
                {    
                   systemallowed = systemallowed + ",15";
                   systemallowed = systemallowed + ",16";
                }   

                 systemallowed = systemallowed + ")";




//alert(systemallowed);

                if (txtPasswd.getRawValue() == usrpw)
                {  
			var gstcompcode=Ext.getCmp('txtComp').getValue();
			var gstcompname=Ext.getCmp('txtComp').getRawValue();
//			var username=Ext.getCmp('txtUser').getRawValue();
			var username=Ext.getCmp('txtLoginName').getRawValue();


			var finid=Ext.getCmp('txtfinyear').getValue();
			var gstFinyear=Ext.getCmp('txtfinyear').getRawValue();		    
			var finstdate=gstFinyear.substr(0,4) + '-04-01';
			var fineddate=gstFinyear.substr(5,4) + '-03-31';
                          
                        var invfin  = gstFinyear.substr(2,2) + "-" + gstFinyear.substr(7,2);

                      
                        var fromyear =  gstFinyear.substr(2,2);
                        var toyear =  gstFinyear.substr(7,2);



			localStorage.setItem("ginuserlogin",usrlogin); 
			localStorage.setItem("ginusername",usrname); 
       			localStorage.setItem("ginusertype",usrtype);	
			localStorage.setItem("ginuserid",userid);	
                 	localStorage.setItem("ginuserpw",usrpw);	



			localStorage.setItem("gincompcode",gstcompcode);  
			localStorage.setItem("gstcompany",gstcompname);


			localStorage.setItem("ginfinid",finid);	
			localStorage.setItem("gstyear",gstFinyear);
			localStorage.setItem("gfinstdate",finstdate);
			localStorage.setItem("gfineddate",fineddate);
			localStorage.setItem("invfin",invfin);

			localStorage.setItem("fromyear",fromyear);
			localStorage.setItem("toyear",toyear);


			localStorage.setItem("newdays",newdays);
			localStorage.setItem("editdays",editdays);

  
                	localStorage.setItem("allowed_systems",systemallowed);

			window.location.href=('ModulesNew.php');               
        }

                else
                {
                    alert("Password is Error  . Please Retry ");
                    txtPasswd.focus();
                }
            }
            else
            {
                  alert("Login User Name Not found  . Please Retry ");
            }      


        }    
     });




    }
 }


  
    var LOGFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'WELCOME',
        bodyStyle: {"background-color": "#ffe6e6"},
 

        header: false,
        width: 1000,
        height: 280,
        x: 0,
        y: 0,
        frame: false,
        id: 'LOGFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        items: [

            {
                xtype: 'fieldset',
                title: '',
                width: 500,
                height: 250,
                x: 10,
                y: 5,
                border: true,
                layout: 'absolute',
//                style: 'padding:0px',
          style: {
              borderColor: 'red',
              borderStyle: 'solid',
              borderRadius:'20px',
          },

                items: [
/*
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x: 30,
                        y: 10,
                        border: false,
                        items: [txtUser]
                    },
*/
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 370,
                        x: 30,
                        y: 10,
                        border: false,
                        items: [txtLoginName]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 370,
                        x: 30,
                        y: 40,
                        border: false,
                        items: [txtPasswd]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 450,
                        x: 30,
                        y: 70,
                        border: false,
                        items: [txtComp]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 100,
                        width: 370,
                        x: 30,
                        y: 100,
                        border: false,
                        items: [txtfinyear]
                    },

/*
                       {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x:60,
                        y:170,
                        border: false,
                        items: [btnLogin]
                        },
*/
                       {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x:200,
                        y:170,
                        border: false,
                        items: [btnLogout]
                        },

                       {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x:60,
                        y:170,
                        border: false,
                        items: [btnLoginNew]
                        },
                       {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x:435,
                        y:375,
                        border: false,
                        items: [btnTemp]
                        },

/*
                       {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x:350,
                        y:170,
                        border: false,
                        items: [btnUser]
                        },

*/

                ]
            },

        ],

    });





    var LOGFormWindow = new Ext.Window({
        height: 300,
        width: 550,
	x: 400,
        y: 150,
          style: {
              borderColor: 'orange',
              borderStyle: 'solid',
              borderRadius:'2px',
          },

        items: LOGFormPanel,
        bodyStyle: {"background-color": "white"},
        title: 'SHVPM - WELCOME',
        layout: 'absolute',
//        layout: 'vbox',
        border: true,
        draggable: false,
 //  style      : "border-radius:30px;", 
	listeners:{

		show:function(){


			UserDataStore.load({
			url:'clsuser.php',
				params:{
				   task:'loaduser'
				}
			});

			CompanyDataStore.load({
			url:'clsuser.php',
				params:{
				   task:'loadcompany'
				}
			});

			FinyearDataStore.load({
			url:'clsuser.php',
				params:{
				   task:'loadfinyear'
				}
			});

Ext.getCmp('txtLoginName').focus(false, 200);
		}
	}
    });
  
    txtComp.setValue("1");
    txtComp.setRawValue("SRI HARI VENKATESWARA PAPER MILLS (P) LTD");
    txtfinyear.setValue("25");
    txtfinyear.setRawValue("2025-2026");

//    txtPasswd.setRawValue("sal");
//    txtPasswd.setValue("sal");


    var gstcompcode=1;
    var gstcompname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";
    var finid=25;
    var gstFinyear="2025-2026";
 			
    LOGFormWindow.show();

});
