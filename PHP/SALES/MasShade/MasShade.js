Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var shadecode = 0;

var txtShade_FullName = new Ext.form.TextField({
        fieldLabel  : 'Shade Full Name',
        id          : 'txtShade_FullName',
        name        : 'txtShade_FullName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : GetShadeDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

//                  txtCode.setValue('');

                  flxShade.getStore().filter('shade_fullname', txtShade_FullName.getValue());  
            }
        }

  });


var txtShade_ShortName = new Ext.form.TextField({
        fieldLabel  : 'Shade Short Name',
        id          : 'txtShade_ShortName',
        name        : 'txtShade_ShortName',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,


  });
var txtCode = new Ext.form.TextField({
        fieldLabel  : 'Shade.Code',
        id          : 'txtCode',
        name        : 'txtCode',
        width       :  60,
        style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
     //   style       : 'background-color: #00FF00;border-radius:5px;',
        autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'2'},

	//	disabled : true,
		tabindex : 2
  });




var GetShadeDatastore = new Ext.data.Store({
      id: 'GetShadeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasShade.php',      // File to connect toClsMasShade.php
                method: 'POST'
            }),
            baseParams:{task:"loadShadeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'shade_code','shade_fullname','shade_shortname','shade_shortcode'
      ]),
    });	

   function RefreshData(){
        saveflag = "Add";
        txtShade_FullName.setRawValue("");	
	GetShadeDatastore.load({
        	 url: 'ClsMasShade.php', 
              	 params:
        	 {
                	 task:"loadShadeDetails"
               	 }
	});	
};

   var dgrecord = Ext.data.Record.create([]);
   var flxShade = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 780,
        x: 100,
        y: 200,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "Shade code", Id: 'shade_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Shade Name", Id: 'shade_fullname', sortable:true,width:350,align:'left', menuDisabled: true},
            {header: "Shade Short Name", Id: 'shade_shortname', sortable:true,width:150,align:'left', menuDisabled: true},
            {header: "Short Code", Id: 'shade_shortcode', sortable:true,width:100,align:'left', menuDisabled: true}, 
                  
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('shade_fullname') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtShade_FullName.getValue()) {
    return 'shade_fullname'
    }
}
},
store:GetShadeDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxShade.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
			shadecode = selrow.get('shade_code');
			txtShade_FullName.setValue(selrow.get('shade_fullname'));
             		txtShade_ShortName.setValue(selrow.get('shade_shortname'));
			txtCode.setValue(selrow.get('shade_shortcode'));
			flxShade.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });

   var MasShadePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'QUALITY NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasShadePanel',
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
            fontSize:18,
            items: [
                {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
                        //alert(txtShade_FullName.getRawValue());
				if( txtShade_FullName.getRawValue() == '' ) 
				{

					alert("Enter Shade Name");
					txtShade_FullName.setFocus();
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
		                            	url: 'FrmMasShadeSave.php',
                		       	        params:
						{
						     savetype       : saveflag,
						     shadecode      : shadecode,
						     shadefullname  : txtShade_FullName.getRawValue(),
						     shadeshortname : txtShade_ShortName.getRawValue(),
						     scode          : txtCode.getRawValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               /* Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                //    msg: 'Lot No Is: ' + obj['msg'],
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasAgentformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasShadePanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
                                              /*  Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Failed Contact MIS',
                                                    fn: function (btn) 
							{
                                                        if (btn === 'ok') 
							{*/
							if(obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     /*   }
                                                    	}
                                                	});*/
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasShadeWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 160,
                width   : 450,
  
//		style   : { border:'1px solid blue'},
                         style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 260,
                y       : 20,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 450,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtShade_FullName]
                          },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 450,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtShade_ShortName]
                          },
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 300,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                  
                                	items: [txtCode]
                            },


                ]

            },flxShade
            
        ],
    });
    
   
    var MasShadeWindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 35,
        title       : 'PRODUCT SHADE MASTER',
        items       : MasShadePanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){
	 }
			
		}
    });
    MasShadeWindow.show();  
});
