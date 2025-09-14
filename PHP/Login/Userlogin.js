/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var username='';
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
        fieldLabel      : 'USERNAME',
        width           : 150,
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
	listeners:{
	select:function(){
		   username=txtUser.getRawValue();
	   }
	}
    });

    var txtpass = new Ext.form.TextField({
        fieldLabel: 'PASSWORD',
        id: 'txtpass',
        inputType: 'password',
        allowBlank: false,
        minLength: 3,
        maxLength: 30,
        width: 150,
        name: 'txtpass'
    });

    var txtComp = new Ext.form.ComboBox({
        fieldLabel      : 'COMPANY',
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
        store           : CompanyDataStore
    });

    var txtfinyear = new Ext.form.ComboBox({
        fieldLabel      : 'FINYEAR',
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
        store           : FinyearDataStore
    });


var btnLogin = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGIN",
    width   : 80,
    height  : 40,
    x       : 0,
    y       : 0,
    bodyStyle:{"background-color":"#ebebdf"},
    style      : "border-radius:20px;",
    labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
 //labelStyle: 'font-weight:bold;',
 listeners:{
        click: function(){       
	      EnterLogin();	  
        }

     }
});

var btnLogout = new Ext.Button({
  //  style   : 'text-align:center;',
 //  style      : "border-radius:20px;",
    text    : "LOGOUT",
    width   : 80,
    height  : 40,
    x       : 0,
    y       : 0,
    bodyStyle:{"background-color":"#ebebdf"},
    style      : "border-radius:20px;",
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
    }else if(txtpass.getRawValue()===""){
	Ext.Msg.alert("Alert","Enter Password!");
    }else{	
	var userget=Ext.getCmp('txtUser').getRawValue();	      
	var passget=Ext.getCmp('txtpass').getRawValue();
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

  
    var LOGFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'WELCOME',
        bodyStyle: {"background-color": "#ffe6e6"},
/* 
       style: {
            'color': '#21201c',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
*/
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
                x: 0,
                y: 0,
                border: false,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x: 30,
                        y: 10,
                        border: false,
                        items: [txtUser]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x: 30,
                        y: 40,
                        border: false,
                        items: [txtpass]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 450,
                        x: 30,
                        y: 70,
                        border: false,
                        items: [txtComp]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 370,
                        x: 30,
                        y: 100,
                        border: false,
                        items: [txtfinyear]
                    },

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
                ]
            },

        ],

    });





    var LOGFormWindow = new Ext.Window({
        height: 300,
        width: 500,
	x: 400,
        y: 150,
        items: LOGFormPanel,
        bodyStyle: {"background-color": "white"},
        title: 'SHVPM - WELCOME',
        layout: 'absolute',
        border: true,
        draggable: false,
   style      : "border-radius:30px;", 
	listeners:{

		show:function(){

//alert("LOGIN");
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
		}
	}
    });
  
    txtComp.setValue("1");
    txtComp.setRawValue("SRI HARI VENKATESWARA PAPER MILLS (P) LTD");
    txtfinyear.setValue("22");
    txtfinyear.setRawValue("2022-2023");

    txtpass.setRawValue("sal");
    txtpass.setValue("sal");


    var gstcompcode=1;
    var gstcompname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";
    var finid=1;
    var gstFinyear="2021-2022";
 			
    LOGFormWindow.show();
});
