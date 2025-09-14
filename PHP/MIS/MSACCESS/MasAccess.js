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


var loadDepartmentListdatastore = new Ext.data.Store({
      id: 'loadDepartmentListdatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsAccess.php',      // File to connect to
                method: 'POST'
            }),
 //           baseParams:{task:"loadDepartmentList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'Name'

      ]),
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


 var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width           : 200,
        displayField    : 'Name', 
        valueField      : 'Name',
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





   function RefreshData(){
      UserMasPanel.getForm().reset();
	loadDepartmentListdatastore.load({
        	 url: 'ClsAccess.php', 
              	 params:
        	 {
           //     	 task:"loadDepartmentList"
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
/*
                                                     accounts   : accounts,
                                                     sales      : sales,   
                                                     production : production,
						     purchase   : purchase,
						     stores     : stores,
					             rawmaterial: rawmaterial,
						     fuel       : fuel,
						     imports    : imports,
						     payroll    : payroll,                
*/       
						     
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
                height  : 425,
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

       ]
       
       }
       ]
       
 
});


 var UsrMasWindow = new Ext.Window({
	height      : 540,
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
   
