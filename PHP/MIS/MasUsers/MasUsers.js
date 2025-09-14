Ext.onReady(function(){
   Ext.QuickTips.init();

    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var dcode = 0;

var usrcode = 0;
var accounts = "N";
var production = "N";
var sales = "N";
var purchase = "N";
var stores = "N";
var rawmaterial = "N";
var fuel = "N";
var imports = "N";
var payroll = "N";


var GetModuleListDatastore = new Ext.data.Store({
      id: 'GetModuleListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasUser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadModuleList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'modseqno','modname','rights'

      ]),
});



var loadDepartmentListdatastore = new Ext.data.Store({
      id: 'loadDepartmentListdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasUser.php',      // File to connect to
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


var loadUserdatastore = new Ext.data.Store({
      id: 'loadUserdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasUser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadUsersList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'usr_code','usr_name'

      ]),
});


var loadUserDetailsdatastore = new Ext.data.Store({
      id: 'loadUserDetailsdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasUser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadUserDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'usr_code', 'usr_dept','usr_name', 'usr_login','usr_pw', 'usr_type', 'usr_accounts', 'usr_sales', 'usr_production', 'usr_purchase', 'usr_stores', 'usr_rawmaterial', 'usr_fuel', 'usr_import', 'usr_payroll', 'usr_active','usr_indent','usr_inward','usr_entrydays','usr_alterdays','usr_qc'

      ]),
});



var cmbRights = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'field1', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbRights',
        typeAhead       : true,
        mode            : 'local',
        store           : ['NO','RO','RW'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;  textTransform: uppercase ", 
        
 });

   var fm = Ext.form;
var dgrecord = Ext.data.Record.create([]);
var flxSystem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 355	,
        width: 	320,

        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "code"       , Id: 'modseqno', sortable:true,width:50,align:'left', menuDisabled: true,hidden:'true'},       
            {header: "Module Name", Id: 'modname', sortable:true,width:200,align:'left', menuDisabled: true},
            {header: "Rights"     , dataIndex: 'rights', sortable:true,width:80,align:'left', menuDisabled: true,default : 'NO',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: ['NO','RO','RW'],
		displayField: 'field1',
		valueField: 'field1',
		hiddenName: 'field1',
	   	id: 'cmbRights',
	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
				    	selectOnFocus: false,
				    	editable: true,
				    	allowblank: false,
				    	listeners: {
				        select: function () {
	
				        		   }
				    		}
					})}, 

                  
           ],

store:GetModuleListDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxSystem.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;
	

     //                   saveflag = "Edit";
		//	Dealcode = selrow.get('modseqno');
		//	txtDealerName.setValue(selrow.get('modname'));


			flxSystem.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });
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
                Ext.Msg.show({
		    title: 'Confirmation',
		    icon: Ext.Msg.QUESTION,
		    buttons: Ext.MessageBox.YESNO,
		    msg: 'Are you sure want to Exit...',
		    fn: function(btn)
                    {
		        if (btn === 'yes')
			{
                          UsrMasWindow.hide();
                        }
                    }  
               });   
            }
        }]);



function edit_click()
{
	  gstFlag = "Edit";
	    Ext.getCmp('cmbUser').show();


	    loadUserdatastore.removeAll();
	    loadUserdatastore.load({
		url: 'ClsMasUser.php',
		params: {
		    task: 'loadUsersList',
		    deptcode: cmbDept.getValue(),
		},
	      	callback:function()
		{
		    //alert(loadOrderNoListDataStore.getCount());	


		}
	    });  
}



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
	}
	}
   }); 




 var cmbUser = new Ext.form.ComboBox({
        fieldLabel      : 'User Name',
        width           : 200,
        displayField    : 'usr_name', 
        valueField      : 'usr_code',
        hiddenName      : '',
        id              : 'cmbUser',
        typeAhead       : true,
        mode            : 'local',
        store           :loadUserdatastore,
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

	    loadUserDetailsdatastore.removeAll();
	    loadUserDetailsdatastore.load({
		url: 'ClsMasUser.php',
		params: {
		    task: 'loadUserDetails',
		    usrcode: cmbUser.getValue(),
		},
	      	callback:function()
		{
	//	   alert(loadUserDetailsdatastore.getCount());	

                        saveflag = "Edit";
                        usrcode =  cmbUser.getValue();
			txtUserName.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_name')); 
			txtLoginName.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_login'));  
			txtPassword.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_pw'));  
			txtPassword2.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_pw'));  
			cmbUserType.setValue(loadUserDetailsdatastore.getAt(0).get('usr_type')); 
			txtEntryDays.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_entrydays'));  
			txtAlterDays.setRawValue(loadUserDetailsdatastore.getAt(0).get('usr_alterdays'));


   			var Row= flxSystem.getStore().getCount();
			flxSystem.getSelectionModel().selectAll();
			var sel=flxSystem.getSelectionModel().getSelections();
			for(var i=0;i<Row;i++)

			{

                            if  (Number(sel[i].data.modseqno) == 1)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_accounts'));
                            if  (Number(sel[i].data.modseqno) == 2)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_sales'));
                            if  (Number(sel[i].data.modseqno) == 3)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_stores'));
                            if  (Number(sel[i].data.modseqno) == 4)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_rawmaterial'));
                            if  (Number(sel[i].data.modseqno) == 5)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_purchase'));

                            if  (Number(sel[i].data.modseqno) == 7)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_fuel'));
                            if  (Number(sel[i].data.modseqno) == 8)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_production'));
                            if  (Number(sel[i].data.modseqno) == 9)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_payroll'));
                            if  (Number(sel[i].data.modseqno) == 10)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_indent'));
                            if  (Number(sel[i].data.modseqno) == 11)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_import'));
                            if  (Number(sel[i].data.modseqno) == 12)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_inward'));
                            if  (Number(sel[i].data.modseqno) == 17)
                                sel[i].set('rights', loadUserDetailsdatastore.getAt(0).get('usr_qc'));
                       }
 			flxSystem.getSelectionModel().clearSelections();



		}
	    });  

          }
	}
   }); 

 var cmbUserType = new Ext.form.ComboBox({
        fieldLabel      : 'User Type',
        width           : 120,
        displayField    : 'field2', 
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbUserType',
        typeAhead       : true,
        mode            : 'local',
        store           :[['1','User Level-1'],['2','User Level-2'],['3','HOD'],['4','IT']],
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

	   }
	}
   }); 

var loadDepartmentListdatastore = new Ext.data.Store({
      id: 'loadDepartmentListdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasUser.php',      // File to connect toClsMasProdType
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

   function RefreshData(){
      UserMasPanel.getForm().reset();
        Ext.getCmp('cmbUser').setVisible(false);
        Ext.getCmp('txtUserName').setVisible(true);        
        txtUserName.setRawValue("");	
	loadDepartmentListdatastore.load({
        	 url: 'ClsMasUser.php', 
              	 params:
        	 {
                	 task:"loadDepartmentList"
               	 }
	});

	GetModuleListDatastore.load({
        	 url: 'ClsMasUser.php', 
              	 params:
        	 {
                	 task:"loadModuleList"
               	 }
	});


};

var fm = Ext.form;
    /*
   var dgrecord = Ext.data.Record.create([]);
   var flxdeptdetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 550,
        x: 0,
        y: 120,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid',  

           
        columns: [    
            {header: "Dept code", Id: 'department_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Dept Name", Id: 'department_name', sortable:true,width:170,align:'left', menuDisabled: true},
           
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('department_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtUserName.getValue()) {
    return 'department_name'
    }
}
},
store:loadDepartmentListdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxdeptdetail.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	
			saveflag = "Edit";
			
			txtUserName.setValue(selrow.get('department_name'));
			dcode=selrow.get('department_code');
			alert(dcode);
			 flxdeptdetail .getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
    

   });
  */
   
var txtUserName = new Ext.form.TextField({
        fieldLabel  : 'User Name',
        id          : 'txtUserName',
        name        : 'txtUserName',
        width       :  200,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'30'},
	
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtUserName.getValue());  
            }
        }
  

  });
  
var txtLoginName = new Ext.form.TextField({
        fieldLabel  : 'Login Name',
        id          : 'txtLoginName',
        name        : 'txtLoginName',
        width       :  200,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'15'},
	
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtUserName.getValue());  
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
        inputType   : 'password',
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtUserName.getValue());  
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
        inputType   : 'password',
	tabindex : 2,
//	store       : loadDepartmentListdatastore,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

//                    flxdeptdetail.getStore().filter('department_name', txtUserName.getValue());  
            }
        }
  

  });


var txtEntryDays = new Ext.form.TextField({
        fieldLabel  : 'Allowed days for New Entry',
        id          : 'txtEntryDays',
        name        : 'txtEntryDays',
        width       :  50,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:12px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
	tabindex : 3,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {

            }
        }
  });

var txtAlterDays = new Ext.form.TextField({
        fieldLabel  : 'Allowed days for Alter Entry',
        id          : 'txtAlterDays',
        name        : 'txtAlterDays',
        width       :  50,
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        labelStyle : "font-size:12px;font-weight:bold;color:#ab28ab",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
	tabindex : 3,
    	enableKeyEvents: true,
          
    	listeners : {
            keyup: function () {
            }
        }
  });


   var UserMasPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       : 280,
    height      : 50 ,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'UserMasPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtUserName.getRawValue() == '' ) 
				{

					alert("Enter Department Name");
					txtUserName.setFocus();
				}

				else if( txtPassword.getRawValue() !=  txtPassword2.getRawValue() ) 
				{

					alert("Password Not Matched.. pleck check ..");
					txtPassword.setFocus();
				}
				else if( Number(txtEntryDays.getValue()) == 0) 
				{

					alert("Please give Allowed Entry Days  ..");
					txtEntryDays.setFocus();
				}
				else if( Number(txtAlterDays.getValue()) == 0) 
				{

					alert("Please give Allowed Alter Days  ..");
					txtAlterDays.setFocus();
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

					        var RigtsData = flxSystem.getStore().getRange();                                        
						var RigtsupData = new Array();
						Ext.each(RigtsData, function (record) {
							RigtsupData.push(record.data);
						});

						Ext.Ajax.request({
		                            	url: 'MasUserSave.php',
                		       	        params:
						{
						     cnt        : RigtsData.length,
						     griddet    : Ext.util.JSON.encode(RigtsupData),    
						     savetype   : saveflag,
						     usercode   : usrcode,
						     department : cmbDept.getValue(),
                                                     username   : txtUserName.getRawValue(), 
                                                     loginname  : txtLoginName.getRawValue(), 
                                                     pw         : txtPassword.getRawValue(), 
                                                     usrtype    : cmbUserType.getValue(),
                                                     entrydays  : txtEntryDays.getValue(),
                                                     alterdays  : txtAlterDays.getValue(),    
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    UserMasPanel.getForm().reset();
				                    RefreshData();
                                                }
                                             	else 
						{
                                              
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","User Name Already exists.. ");
							}
                                                        else if(obj['cnt2']>0)
							{
                                             Ext.MessageBox.alert("Alert","Login Name Already exists.. ");
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
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 30,
                                             border      : false,
                                             items: [cmbDept]
                                        },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [txtUserName]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [cmbUser]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtLoginName]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtPassword]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 190,
                                    	border      : false,
                                	items: [txtPassword2]
                          },
    			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 230,
                                    	border      : false,
                                	items: [cmbUserType]
                          }, 


    			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 270,
                                    	border      : false,
                                	items: [txtEntryDays]
                          }, 



    			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 500,
                                	x           : 0,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtAlterDays]
                          }, 


			  { 
			    xtype   : 'fieldset',
				title   : 'System Rights',
				layout  : 'hbox',
				border  : true,
				height  : 430,
				width   : 370,
		  
				style   : { border:'1px solid blue'},
				         style      : "border-radius:15px;",     
				layout  : 'absolute',
				x       : 420,
				y       : 10,	
				items:[
		    			{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 500,
						x           : 0,
						y           : 0,
					    	border      : false,
						items: [flxSystem]
				          }, 
                                ]
        
                           },
/*
			  { 
			    xtype   : 'fieldset',
				title   : 'System Rights',
				layout  : 'hbox',
				border  : true,
				height  : 200,
				width   : 370,
		  
				style   : { border:'1px solid blue'},
				         style      : "border-radius:15px;",     
				layout  : 'absolute',
				x       : 790,
				y       : 40,	
				items:[

            {
                xtype: 'checkboxgroup',
		border  :  false,
                x       : 0,
                y       : 0,
                columns :  2,
                items: [
                   {boxLabel: 'Accounts', name: 'chkacct', id: 'chkacct', inputValue: 1 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    accounts = "Y";
                                        else
               				    accounts = "N";
					
				}
			} 
                   },
                   {boxLabel: 'Sales', name: 'chksales', id: 'chksales', inputValue: 2 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    sales = "Y";
                                        else
               				    sales = "N";
				}
			} 
                    },

                   {boxLabel: 'Production', name: 'chkproduction', id: 'chkproduction',  inputValue: 3 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    production  = "Y";
                                        else
               				    production  = "N";
				}
			} 
                    },


                   {boxLabel: 'Purchase', name: 'chkpurchase', id: 'chkpurchase', inputValue: 4 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    purchase = "Y";
                                        else
               				    purchase = "N";
				}
			} 
                    },


                   {boxLabel: 'Stores', name: 'chkstores',id: 'chkstores', inputValue: 5 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    stores  = "Y";
                                        else
               				    stores  = "N";
				}
			} 
                    },


                   {boxLabel: 'Rawmaterial', name: 'chkRawmaterial', id: 'chkRawmaterial', inputValue: 6 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    rawmaterial  = "Y";
                                        else
               				    rawmaterial  = "N";
				}
			} 
                    },


                   {boxLabel: 'Fuel', name: 'chkfuel',id: 'chkfuel', inputValue: 7 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    fuel = "Y";
                                        else
               				    fuel = "N";
				}
			} 
                    },



                   {boxLabel: 'Import', name: 'chkimport', id: 'chkimport',inputValue: 8 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    imports = "Y";
                                        else
               				    imports = "N";
				}
			} 
                    },

                   {boxLabel: 'Payroll', name: 'chkpayroll', id: 'chkpayroll', inputValue: 9 ,checked : false,
                	listeners:{
				check:function(rb,checked){
					if(checked==true)
					    payroll = "Y";
                                        else
               				    payroll = "N";
				}
			} 
                    },






			]
	    }

				]
			     }  ,
				          
 */  
                                          
             //          flxdeptdetail,

       ]
       
       }
       ]
       
 
});


 var UsrMasWindow = new Ext.Window({
	height      : 580,
        width       : 900,
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
               RefreshData();

             }
             }
            });
             
            UsrMasWindow.show();  
        });      
   
