Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');

   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var gstFlag = "Add";
   var usertype = localStorage.getItem('ginuser');

  var rbunit = 1; 

  var findno = 0;


   function check_password()
   {
      if (txtPassword.getRawValue() == "REELRELEASE")
      {
        Ext.getCmp('save').setDisabled(false);
      }
      else
      {
        Ext.getCmp('save').setDisabled(true);
      }    

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
            console.log(newValue);
            obj.setRawValue(newValue.toUpperCase());
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



var LoadordernoItemDetailsDatastore = new Ext.data.Store({
        id: 'LoadordernoItemDetailsDatastore',
        autoLoad :true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesReelRelease.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSONo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['stk_sono'
])
    });


var LoadReelNoDatastore = new Ext.data.Store({
        id: 'LoadReelNoDatastore',

        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesReelRelease.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadReelNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['stk_sr_no'
])
    });

var LoadReelWeightDatastore = new Ext.data.Store({
        id: 'LoadReelWeightDatastore',

        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesReelRelease.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadWeight"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['stk_wt'
])
    });


var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : 'S.O. No.',
        width           : 120,
        displayField    : 'stk_sono', 
        valueField      : 'stk_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : 'LoadordernoItemDetailsDatastore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
    //    hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        listeners:{
             select: function() {
                 LoadReelNoDatastore.removeAll();
	         LoadReelNoDatastore.load({

			url: 'ClsTrnSalesReelRelease.php',
			params: {
			    task: 'loadReelNo',

                            sono :cmbSONo.getValue()
                        },
                   	callback:function()
			{
                        }
                 });
             }
               
        }
});
	

var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width           : 200,
        displayField    : 'stk_sr_no', 
        valueField      : 'stk_sr_no',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : 'LoadReelNoDatastore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
    //    hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
       style : "font-size:14px;font-weight:bold",
       listeners:{
             select: function() {
                 LoadReelWeightDatastore.removeAll();
	         LoadReelWeightDatastore.load({

			url: 'ClsTrnSalesReelRelease.php',
			params: {
			    task   : 'loadWeight',
                            sono   : cmbSONo.getValue(),
                            reelno : cmbReelNo.getValue(),
                        },
                   	callback:function()
			{
                                txtWt.setValue(LoadReelWeightDatastore.getAt(0).get('stk_wt'));
                        }
                 });


                                }
               
              }
                       

});

   var txtWt = new Ext.form.NumberField({
        fieldLabel  : 'Weight',
        id          : 'txtWt',
        name        : 'txtWt',
        width       :  100,
        tabindex : 2,
        enableKeyEvents: true,
  //      readOnly   : true,
    
    });
   function RefreshData(){
  
 };
   
var btnRelease = new Ext.Button({
    style   : 'text-align:center;',
    text    : "RELEASE",
    width   : 80,
    height  : 40,
    x       : 280,
    y       : 340,
    id      : 'save',
    bodyStyle:{"background-color":"#ebebdf"},  
     listeners:{
         click: function(){              
              Ext.Ajax.request({
               url: 'TrnSalesReelReleaseSave.php',
               params:
		{
                            sono   : cmbSONo.getValue(),
                            reelno : cmbReelNo.getValue(),
                            wt     : txtWt.getValue(),    
        	},
                callback: function(options, success, response)
                {
                   var obj = Ext.decode(response.responseText);
	           if (obj['success']==="true")
	           {                       
                            Ext.MessageBox.alert("Reel Moved to stock -" + obj['msg']);
                            RefreshData();
                    }else
		    {
                           Ext.MessageBox.alert("Reel Not Release- " + obj['msg']);                                                  
                    }
                }
       
         }); 

    }
    }    
});

   var TrnSalesFinishedGoodsPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 600,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 300,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesFinishedGoodsPanel',
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
			    text: ' Add',
			    style  : 'text-align:center;',
			    tooltip: 'Add Details...',
			    height: 40,
			    fontSize:20,
			    width:50,
			    align : 'right',
			    icon: '/Pictures/Add.png',
			    listeners:{
				click: function () {
				    gstFlag = "Add";
				}
			    }
			},'-',
//EDIT
			{
			    text: 'Edit',
			    style  : 'text-align:center;',
			    tooltip: 'Modify Details...',
			    height: 40,
			    fontSize:20,
			    width:50,
			    icon: '/Pictures/edit.png',
			    listeners:{
				click: function () {
				    gstFlag = "Edit";
				    Ext.getCmp('cmbEntryNo').show();
                                    loadFinEntryList.removeAll();
				    loadFinEntryList.load({
						url: 'ClsTrnSalesFinishedGoods.php',
						params: {
						    task: 'loadFinishedGoodsEntryNo',
						    finid: GinFinid,
						    compcode:Gincompcode
				                },
                                        	callback:function()
                         			{
							//cmbEntryNo.setValue(loadFinEntryList.get(0).('stk_ent_no'));
//							alert(loadFinEntryList.getCount());	
                                                }

				    });     

				}
			    }
			},'-',

                   {
                    text: 'Save',
//save
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                       listeners:{
		                click: function () {   
		                       if(cmbSize.getRawValue()=="" || cmbSize.getValue()==0)
					{
						alert("Select Item Name..");
						cmbSize.setFocus();
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
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnSalesReelReleaseSave.php',
				               params:
						{
                                                  savetype:gstFlag,
                                                  finid : GinFinid,
                                                  compcode :Gincompcode,
	                                          cnt: finData.length,
                               	                  griddet: Ext.util.JSON.encode(finupdData),                                      
                                                  entrydate :Ext.util.Format.date(dtpEntry.getValue(),"Y-m-d"),
 		                                  entryno : txtEntryNo.getValue(),
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
			          	       
             				          
                                                 if (obj['success']==="true")
					{                       
                                    Ext.MessageBox.alert("Finished Goods Entry No -" + obj['msg']);
                                    TrnSalesFinishedGoodsPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
    Ext.MessageBox.alert("Finished Goods Entry Not Completed! Pls Check!- " + obj['msg']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
            },
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
               },

               {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            TrnSalesFinishedGoodsWindow.hide();
                        }
               }]
        },

//PANEL1
        items: [
               { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 500,
                width   : 1050,
		style:{ border:'1px solid blue'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[ 

                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 100,
                                             y           : 80,
                                             border      : false,
                                             items: [cmbSONo]
                                        },

                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 500,
                                             x           : 100,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbReelNo]
                                        },
                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 500,
                                             x           : 470,
                                             y           : 120,
                                             border      : false,
                                             items: [btnRelease]
                                        },
                                    	{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 100,
                                             y           : 160,
                                             border      : false,
                                             readOnly    : true,
                                             items: [txtWt]
                                        },
                   {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 500,
                            y           : 0,
                            labelWidth  : 70,
                            border      : false,
                            items : [txtPassword]
   
                   },
                ]
                  
                
          }] ,
    });
   

    var TrnSalesFinishedGoodsWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 35,
        title       : 'SALES - STOCK RELEASE',
        items       : TrnSalesFinishedGoodsPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
                show:function(){


         

                    }
  
      }
    });
       TrnSalesFinishedGoodsWindow.show();  
});
