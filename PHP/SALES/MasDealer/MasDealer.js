Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var Dealcode = 0;

var txtDealerName = new Ext.form.TextField({
        fieldLabel  : 'Dealer Name',
        id          : 'txtDealerName',
        name        : 'txtDealerName',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
     

	//	disabled : true,
	tabindex : 2,
        store       : GetDealerDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  txtAdd1.setValue('');
		  txtAdd2.setValue('');
                  txtAdd3.setValue('');
                  txtPin.setValue('');
                  flxDealer.getStore().filter('dealer_name', txtDealerName.getValue());  
            }
        }

  });

var txtAdd1 = new Ext.form.TextField({
        fieldLabel  : 'Address',
        id          : 'txtAdd1',
        name        : 'txtAdd1',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
     //   style       : 'background-color: #00FF00;border-radius:5px;',
    //    autoCreate  :{tag:'input',type:'text',size:'20',autocomplete:'off',maxLength:'2'},
   //	  disabled : true,
		tabindex : 2
  });


var txtAdd2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdd2',
        name        : 'txtAdd2',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var txtAdd3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAdd3',
        name        : 'txtAdd3',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin Code',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  150,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style: 'background-color: #00FF00;border-radius:5px;',

	//	disabled : true,
		tabindex : 2
  });

var GetDealerDatastore = new Ext.data.Store({
      id: 'GetDealerDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasDealer.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadDealer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dealer_code', 'dealer_name', 'dealer_add1', 'dealer_add2', 'dealer_add3', 'dealer_pin']),
    });	

   function RefreshData(){
        txtDealerName.setRawValue("");	
	GetDealerDatastore.load({
        	 url: 'ClsMasDealer.php', 
              	 params:
        	 {
                	 task:"loadDealer"
               	 }
	});	
};

var dgrecord = Ext.data.Record.create([]);
var flxDealer = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 800,
        x: 80,
        y: 250,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

/*
labelStyle:{
        'font-size:32px;'
      },
  */           
        columns: [    
            {header: "code"       , Id: 'dealer_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Dealer Name", Id: 'dealer_name', sortable:true,width:250,align:'left', menuDisabled: true},
            {header: "Address1 "  , Id: 'dealer_add1', sortable:true,width:200,align:'left', menuDisabled: true}, 
            {header: "Address2"   , Id: 'dealer_add2', sortable:true,width:200,align:'left', menuDisabled: true},                  
            {header: "Address3"   , Id: 'dealer_add3', sortable:true,width:200,align:'left', menuDisabled: true},    
            {header: "Pin"        , Id: 'dealer_pin', sortable:true,width:100,align:'left', menuDisabled: true},            

                  
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('dealer_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtDealerName.getValue()) {
    return 'dealer_name'
    }
}
},
store:GetDealerDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDealer.getSelectionModel();
			var selrow = sm.getSelected();
			/*flxDetaildegr.getSelectionModel().selectAll();
 			var selrows = flxDetaildegr.getSelectionModel().getCount();
			var sel = flxDetaildegr.getSelectionModel().getSelections();
			var cnt = 0; */
         		gridedit = "true";
			editrow = selrow;
	

                        saveflag = "Edit";
			Dealcode = selrow.get('dealer_code');
			txtDealerName.setValue(selrow.get('dealer_name'));
			txtAdd1.setValue(selrow.get('dealer_add1'));
			txtAdd2.setValue(selrow.get('dealer_add2'));  
             		txtAdd3.setValue(selrow.get('dealer_add3'));
              		txtPin.setValue(selrow.get('dealer_pin'));

			flxDealer.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });

   var MasDealerPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : ' NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasDealerPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {
//alert(txtDealerName.getRawValue());
				if( txtDealerName.getRawValue() == '' ) 
				{

					alert("Enter Dealer Name");
					txtDealerName.setFocus();
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
//SAVE
						Ext.Ajax.request({
		                            	url: 'FrmDealerSave.php',
                		       	        params:
						{
						     savetype    : saveflag,
						     Dealercode  : Dealcode,
						     Dealername  : txtDealerName.getRawValue(),
						     Dealeradd1  : txtAdd1.getRawValue(),
						     Dealeradd2  : txtAdd2.getRawValue(),
						     Dealeradd3  : txtAdd3.getRawValue(),
						     Dealerpin   : txtPin.getRawValue(),

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
						    MasDealerPanel.getForm().reset();
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
                            MasDealerWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 600,
  
              //style   : { border:'1px solid blue'},
                style      : "border-radius:10px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 20,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtDealerName]
                          },
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                  
                                	items: [txtAdd1]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtAdd2]
                            },

                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtAdd3]
                            },
                         { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 550,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtPin]
                            },


                ]

            },flxDealer
            
        ],
    });
    
   
    var MasDealerWindow = new Ext.Window({
	height      : 500,
        width       : 1000,
        y           : 35,
        title       : 'DEALER MASTER',
        items       : MasDealerPanel,
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
			txtDealerName.focus();
	   	        txtDealerName.setHeight(25);		 }
			
		}
    });
    MasDealerWindow.show();  
});
