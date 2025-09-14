Ext.onReady(function(){
Ext.QuickTips.init();
var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var grpcode = 0;
var qlycode = '';
var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";	
var txtBF = new Ext.form.NumberField({
        fieldLabel  : 'BF',
        id          : 'txtBF',
        name        : 'txtBF',
        width       :  50,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'2'},
        allowBlank  :  true,
	tabindex : 1,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                setqlydesc();
            },
        }
    });
 
 var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  50,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'3'},
        allowBlank  :  true,
	tabindex : 1,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                setqlydesc();
            },
        }
    });


 var txtQuality = new Ext.form.TextField({
        fieldLabel  : 'Qly Desc',
        id          : 'txtQuality',
        name        : 'txtQuality',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'3'},
        allowBlank  :  true,
	tabindex : 1,
        readOnly : true
    });


 var txtQlySearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtQlySearch',
        name        : 'txtQlySearch',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  true,
	tabindex : 1,
        readOnly : false,
        store       : loadVarietyDataStore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {


                  flxQly.getStore().filter('var_desc', txtQlySearch.getValue());  
            }
        }
    });
 var loadVargrpDataStore = new Ext.data.Store({
      id: 'loadVargrpDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasBFGSM.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarMainGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'vargrp_type_code', type: 'int',mapping:'vargrp_type_code'},
	{name:'vargrp_type_name', type: 'string',mapping:'vargrp_type_name'}
      ]),
    });

 var loadVarietyDataStore = new Ext.data.Store({
      id: 'loadVarietyDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasBFGSM.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVarietydetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'var_groupcode','var_desc','var_bf',   'var_gsm', 'vargrp_type_name', 'var_typecode','vargrp_type_code', 'vargrp_type_short_code'
      ]),
    });


  var loadviewQuality = new Ext.data.Store({
        id: 'loadviewQuality',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasBFGSM.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "viewquality"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['vargrp_type_code','vargrp_type_short_code'])
    });



var cmbQuality = new Ext.form.ComboBox({
        fieldLabel      : 'Product Type ',
        width           : 250,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : '',
        id              : 'cmbQuality',
        typeAhead       : true,
        mode            : 'local',
        store           : loadVargrpDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : false,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",

           listeners:{
                select: function () {
                        txtBF.setValue('');
                        txtGSM.setValue('');
             		loadviewQuality.load({
             		url: 'ClsMasBFGSM.php',
			params: {
				    task: 'viewquality',

                                    qcode:cmbQuality.getValue()
                                },
                       	callback:function()
				{

//alert(loadviewQuality.getCount());

                                   grpcode = loadviewQuality.getAt(0).get('vargrp_type_code');         
                                   qlycode = loadviewQuality.getAt(0).get('vargrp_type_short_code');
/*

                                   if (grpcode == 1 || grpcode == 14)
                                   {
                                        txtBF.setDisabled(false);      
                                   }
                                   else
                                   {
                                       txtBF.setDisabled(true);      
                                   }
*/
                                   setqlydesc();                   

      				}
                         });
			}
                      }    

   });



   function setqlydesc(){
        var gsmdisplay = "";
        var bfdisplay = "";
        gsmdisplay = ("00"+txtGSM.getValue()).slice(-3);

        txtQuality.setValue(qlycode);
    //    alert(gsmdisplay);
/*
        if (grpcode == 1) 
	{
		if(txtBF.getValue() != "" )
		{
		    txtQuality.setValue(qlycode+txtBF.getValue()+"BF ");
		}
		if(txtGSM.getValue() != "" )
		{
		    txtQuality.setValue(qlycode+txtBF.getValue()+"BF "+gsmdisplay+"GSM ");
		}
        } 
        else
  	{
		if(txtGSM.getValue() != "" )
		{
		    txtQuality.setValue(qlycode+"0000 "+gsmdisplay+"GSM ");
		}
        }       
*/


         	if(txtBF.getValue() != "" )
                {
                   bfdisplay = txtBF.getValue() + "BF ";
                }
                else
                {
                   bfdisplay = "0000 ";
                }
 



		if(txtGSM.getValue() != "" )
		{

		    txtQuality.setValue(qlycode+bfdisplay+gsmdisplay+"GSM");

		}

   }
	
   function RefreshData(){

	 loadVargrpDataStore.load({
      		 url: 'ClsMasBFGSM.php', 
		 params:
		 {
		   task:"loadVarMainGroup"
              	 }
	 });	

	 loadVarietyDataStore.load({
      		 url: 'ClsMasBFGSM.php', 
		 params:
		 {
		   task:"loadVarietydetails"
              	 }
	 });

   };


var dgrecord = Ext.data.Record.create([]);
var flxQly = new Ext.grid.EditorGridPanel({
        frame: true,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 420,
        width: 450,
        x: 10,
        y: 10,
        style:"font-size:24px;padding:10px 0px 0 15px",
        fontSize:18,
          
        columns: [    
            {header: "Var code" , Id: 'var_groupcode', sortable:true,width:50,align:'left',hidden: true },       
            {header: "Variety Name", Id: 'var_desc', sortable:true,width:100,align:'left'},
            {header: "BF"      , Id: 'var_bf'  , sortable:true,width:70,align:'left'}, 
            {header: "GSM"     , Id: 'var_gsm' , sortable:true,width:70,align:'left'},   
            {header: "Qly "    , Id: 'vargrp_type_name' , sortable:true,width:120,align:'left'},  
            {header: "Qly Code" , Id: 'var_grptype_code' , sortable:true,width:100,align:'left'},  
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('var_desc') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtQuality.getRawValue()) {
    return 'var_desc'
    }
}
},

store:loadVarietyDataStore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxQly.getSelectionModel();
			var selrow = sm.getSelected();
	       		gridedit = "true";
			editrow = selrow;
	

                        saveflag = "Edit";
			qlycode = selrow.get('var_groupcode');
			txtQuality.setValue(selrow.get('var_desc'));
			txtBF.setValue(selrow.get('var_bf'));
			txtGSM.setValue(selrow.get('var_gsm'));
                        cmbQuality.setValue(selrow.get('vargrp_type_name'));


			flxQly.getSelectionModel().clearSelections();
			}

   }
    

   });
 

   var MasQualitySubPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 500,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasQualitySubPanel',
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
//SAVE
                    text: 'Save',
                    id : 'save', 
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
//alert(grpcode);
	                	if(txtQuality.getRawValue()=="" )
				{
					alert("Select Qauality");
				}

//                          	else if(grpcode == 1 && (txtBF.getRawValue()=="" || txtBF.getValue()==0))
//				{
					//alert("Enter BF ");
//					txtBF.setFocus();
//				}

                          	else if(txtGSM.getRawValue()=="" || txtGSM.getValue()==0)
				{
					alert("Enter GSM ");
					txtGSM.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You Want to save the Record',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmMasBFGSMSave.php',
		                                params:
						{

				        	grpname : txtQuality.getRawValue(),	
	                                        grpcode : cmbQuality.getValue(), 
	                                        gsm     : Number(txtGSM.getRawValue()),
						bf      : Number(txtBF.getValue()),
                                   
                                     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","VARIETY Saved ");
						    MasQualitySubPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","VARIETY Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. Please Check ");
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
                            MasQualitySubGrpWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 270,
                width   : 500,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
	                    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtQlySearch]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [cmbQuality]
                            },	
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 0,
                                	y           : 100,
                                    	border      : false,
                                	items: [txtBF]
                            } ,
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtGSM]
                            },
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txtQuality]
                            },
                           
                ]
            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : false,
                height  : 450,
                width   : 500,
		style:{ border:'1px solid red'},
               layout  : 'absolute',
                x       : 550,
                y       : 10,	
                items:[

                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 600,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [flxQly]
                            },

                   
                ]
            }, 


        ],
    });
    

    var MasQualitySubGrpWindow = new Ext.Window({
	height      : 580,
        width       : 1100,
        y           : 35,
        title       : 'VARIETY MASTER(BF & GSM)  ',
        items       : MasQualitySubPanel,
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
			      RefreshData();
	                      }
			
		}
    });
   // Ext.getCmp('save').setDisabled(true);
    MasQualitySubGrpWindow.show();  
});
