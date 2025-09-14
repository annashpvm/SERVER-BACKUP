Ext.onReady(function(){
   Ext.QuickTips.init();

    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var dcode = 0;

var usrcode = 0;



var loadDepartmentListdatastore = new Ext.data.Store({
      id: 'loadDepartmentListdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPassword.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDepartmentList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'department_code','department_name'

      ]),
});


var loadSubjectDatastore = new Ext.data.Store({
      id: 'loadSubjectDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPassword.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubjectList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pw_subject',

      ]),
});



var loadSubjectPasswordDatastore = new Ext.data.Store({
      id: 'loadSubjectPasswordDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasPassword.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'pw_password',

      ]),
});

function edit_click()
{
	    saveflag = "Edit";
	    Ext.getCmp('cmbSubject').show();


	    loadSubjectDatastore.removeAll();
	    loadSubjectDatastore.load({
		url: 'ClsMasPassword.php',
		params: {
		    task  : 'loadSubjectList',
		    dept  : cmbDept.getRawValue(),
		},
	      	callback:function()
		{
		    //alert(loadOrderNoListDataStore.getCount());	


		}
	    });  
}


var txtSubject = new Ext.form.TextField({
        fieldLabel  : 'Subject',
        id          : 'txtSubject',
        name        : 'txtSubject',
        width       :  300,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'30'},
	
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtSubject.getValue());  
            }
        }
  

  });
  

var txtCurrentPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtCurrentPassword',
        name        : 'txtCurrentPassword',
        width       :  200,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},
	tabindex : 2,

          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtSubject.getValue());  
            }
        }
  

  });


var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        width       :  200,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},
//        inputType   : 'password',
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtSubject.getValue());  
            }
        }
  

  });

var txtPassword2 = new Ext.form.TextField({
        fieldLabel  : 'ReType - Password',
        id          : 'txtPassword2',
        name        : 'txtPassword2',
        width       :  200,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},
//        inputType   : 'password',
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtSubject.getValue());  
            }
        }
  

  });


 var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width           : 200,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbDept',
        typeAhead       : true,
        mode            : 'local',
        store           :loadDepartmentListdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
            listeners:{
        select: function(){
	    loadSubjectPasswordDatastore.removeAll();
	}
	}
   }); 


 var cmbSubject = new Ext.form.ComboBox({
        fieldLabel      : 'Subject',
        width           : 300,
        displayField    : 'pw_subject', 
        valueField      : 'pw_subject',
        hiddenName      : '',
        id              : 'cmbSubject',
        typeAhead       : true,
        mode            : 'local',
        store           :loadSubjectDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
        enableKeyEvents: true,
        listeners:{
          select: function(){

	    loadSubjectPasswordDatastore.removeAll();
	    loadSubjectPasswordDatastore.load({
		url: 'ClsMasPassword.php',
		params: {
		    task     : 'loadSubjectPassword',
		    dept     : cmbDept.getRawValue(),
		    subject  : cmbSubject.getRawValue(),
		},
	      	callback:function()
		{
                    txtSubject.setRawValue(cmbSubject.getRawValue());
		    txtCurrentPassword.setRawValue(loadSubjectPasswordDatastore.getAt(0).get('pw_password')); 	


		}
	    }); 
          }
	}
   }); 




   var UserPasswordPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',

    header      : true,
    width       : 280,
    height      : 50 ,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'UserPasswordPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
        		
        	 {
                    text: 'Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
           	 {
//edit 
                    text: 'Edit',
                    style  : 'text-align:center;',
                    tooltip: 'Edit Details...', height: 40, fontSize:70,width:70,

                    listeners:{
                        click: function () {
                               edit_click();
                        }
                     }    

                  
                },'-',             
                  {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtSubject.getRawValue() == '' ) 
				{

					alert("Enter Subject Name");
					txtSubject.setFocus();
				}

				else if( txtPassword.getRawValue() !=  txtPassword2.getRawValue() ) 
				{

					alert("Password Not Matched.. pleck check ..");
					txtPassword.setFocus();
				}

				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{


						Ext.Ajax.request({
		                            	url: 'MasPasswordSave.php',
                		       	        params:
						{
   
						     savetype   : saveflag,
						     department : cmbDept.getRawValue(),
                                                     subject    : txtSubject.getRawValue(), 
                                                     pw         : txtPassword.getRawValue(), 
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    UserPasswordPanel.getForm().reset();
				                    RefreshData();
                                                }
                                             	else 
						{
                                              
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Subject Name Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Error Not Saved.. ");
							}
                                                    
                                            	}
                                      
					 	}   
			        		});
			    	
		         		}
                                }
 		    	});
 		    	
				}
                        }
                    }
                },'-',                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                    listeners:{
                        click: function () {
                               RefreshData();
                        }
                    }       
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                         handler: function(){	
                            UsrMasWindow.hide();
                        }              
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 465,
                width   : 850,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[


                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 70,
                                             width       : 250,
                                             x           : 0,
                                             y           : 10,
                                             border      : false,
                                             items: [txtPassword]
                                        },

                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 70,
                                             border      : false,
                                             items: [cmbDept]
                                        },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtSubject]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [cmbSubject]
                          },



			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 160,
                                    	border      : false,
                                	items: [txtCurrentPassword]
                          },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txtPassword]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 240,
                                    	border      : false,
                                	items: [txtPassword2]
                          },



       ]
       
       }
       ]
       
 
});


   function RefreshData(){

        Ext.getCmp('cmbSubject').setVisible(false);
        Ext.getCmp('txtSubject').setVisible(true);        
        txtSubject.setRawValue("");	
        txtCurrentPassword.setRawValue("");
        txtPassword.setRawValue("");	
        txtPassword2.setRawValue("");	
        saveflag = "Add";


};


 var UsrMasWindow = new Ext.Window({
	height      : 580,
        width       : 900,
        y           : 30,
        title       :'Passord Master',
        items       : 'UserPasswordPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,

 	listeners:{
               show:function(){
               RefreshData();

             }
             }
            });
             
            UsrMasWindow.show();  
        });      
   
