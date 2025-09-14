Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var Lcode = 0;

var txtlotno = new Ext.form.TextField({
        fieldLabel  : 'Lot No',
        id          : 'txtlotno',
        name        : 'txtlotno',
        width       :  150,
	labelStyle  : "font-size:14px;font-weight:bold;color:#ff33cc",
     //   style       :  {textTransform: "uppercase"},
	//	disabled : true,
		tabindex : 2
    });
	

 var txtlotremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtlotremarks',
        name        : 'txtlotremarks',
        width       :  250,
	labelStyle  : "font-size:14px;font-weight:bold;color:#ff33cc",
      //  style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
	tabindex : 1
    });

 
 /*  function RefreshData(){
        txtlotremarks.setRawValue("");
	txtlotno.setRawValue("");
	
};*/
var GetLotListDatastore = new Ext.data.Store({
      id: 'GetLotListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsRawLot.php',      // File to connect toClsRawLot
                method: 'POST'
            }),
            baseParams:{task:"loadLotList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_code','lot_refno','lot_remarks'
      ]),
    });	

   function RefreshData(){
        txtQuality.setRawValue("");	
	GetLotListDatastore.load({
        	 url: 'ClsRawLot.php', 
              	 params:
        	 {
                	 task:"loadLotList"
               	 }
	});	
};

  var dgrecord = Ext.data.Record.create([]);
   var flxLot = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 800,
        x: 80,
        y: 230,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  

        
        columns: [    
            {header: "Lot code" , Id: 'lot_code', sortable:true,width:100,align:'left', menuDisabled: true},       
            {header: "Lot RefNO", Id: 'lot_refno', sortable:true,width:170,align:'left', menuDisabled: true},
            {header: "Remarks"  , Id: 'lot_remarks', sortable:true,width:170,align:'left', menuDisabled: true}, 
                       
           ],
viewConfig: {
getRowClass: function(record) {
    var red = record.get('lot_refno') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtlotno.getValue()) {
    return 'lot_refno'
    }
}
},
store:GetLotListDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxLot.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
	

                        saveflag = "Edit";
			Lcode = selrow.get('lot_code');
			
			txtlotno.setValue(selrow.get('lot_refno'));
			txtlotremarks.setValue(selrow.get('lot_remarks'));



			flxLot.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

   var MasLotformpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'LOT MASTER',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 450,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasLotformpanel',
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
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if(txtlotno.getRawValue()=="" || txtlotno.getRawValue()==0)
				{
					alert("Enter Lotno");
					txtlotno.setFocus();
				}
				else if(txtlotremarks.getRawValue()=="" || txtlotremarks.getRawValue()==0)
				{
					alert("Enter Remarks");
					txtlotremarks.setFocus();
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
		                            	url: 'FrmMasLotSave.php',
                		       	        params:
						{
							lotremarks : txtlotremarks.getRawValue(),
							lotno : txtlotno.getRawValue()
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
						    MasLotformpanel.getForm().reset();
							RefreshData();
							}
							}
                                                	});*/
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasLotformpanel.getForm().reset();
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
                            MasLotWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'LOT MASTER',
                layout  : 'hbox',
                border  : true,
                height  : 160,
                width   : 450,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 260,
                y       : 20,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 350,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtlotno]
                            },
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtlotremarks]
                            }
                ]

            },flxLot
            
        ],
    });
    
   
    var MasLotWindow = new Ext.Window({
	height      : 500,
        width       : 1000,
        y           : 35,
        title       : 'LOT MASTER',
        items       : MasLotformpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
			txtlotno.focus();
	   			 }
			
		}
    });
    MasLotWindow.show();  
});
