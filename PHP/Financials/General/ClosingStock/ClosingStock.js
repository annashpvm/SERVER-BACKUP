/*global Ext*/
Ext.onReady(function(){
    Ext.QuickTips.init();
    var dgrecord = Ext.data.Record.create([]);
    var compcode=localStorage.getItem('acccompcode');
    var GinFinid=localStorage.getItem('accfinid');
    var monthcode;

var MonthLoadDataStore = new Ext.data.Store({
        id: 'MonthLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"MonthLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            'month_name','month_code','open','close'])
    });

 var CurBalanceDataStore = new Ext.data.Store({
        id: 'CurBalanceDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"CurBalance"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            'curbal_obcramt','curbal_obdbamt'])
    });

   var StockDataStore = new Ext.data.Store({
        id: 'StockDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"Stock"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            'accstk_comp_code','accstk_fin_id','accstk_led_code','accstk_opening','accstk_closing','month_code','month_name'])
    });

 var ledDataStore = new Ext.data.Store({
        id: 'ledDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"ledgerName"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
            'led_name','led_code'])
    });

  var cmbledger = new Ext.form.ComboBox({
        id         : 'cmbledger',
        fieldLabel : 'Ledger',
        width      : 330,
        store:ledDataStore,
        displayField:'led_name',
        valueField:'led_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
          listeners:{
            select :function(){
		StockDataStore.removeAll();
		flxDetails.getStore().removeAll();
		MonthLoadDataStore.removeAll();
		CurBalanceDataStore.removeAll();
		MonthLoadDataStore.load({
                url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  
                params:
                {
                    task:"MonthLoad"
                },
		callback:function(){
			for(var i=0;i<MonthLoadDataStore.getCount();i++){
			flxDetails.getStore().insert(
				flxDetails.getStore().getCount(),                       
				  new dgrecord({
				     month_name:MonthLoadDataStore.getAt(i).get('month_name'),
				     open:'',
				     close:'',
				     month_code:MonthLoadDataStore.getAt(i).get('month_code')	
				})
				);
			}
			StockDataStore.load({
                	url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  
                	params:
                	{
                   	 task:"Stock",
			 finid:GinFinid,
			 compcode:compcode,
			 ledcode:cmbledger.getValue() 		
                	},	
			callback:function(){
				var cnt=StockDataStore.getCount();
				if(cnt>0){
				    var openstk=StockDataStore.getAt(0).get('accstk_opening');
				    var monthname=StockDataStore.getAt(0).get('month_name');
				    monthcode=StockDataStore.getAt(0).get('month_code');
				    flxDetails.getSelectionModel().selectAll();
				    var selrows1 = flxDetails.getSelectionModel().getCount();
				    var sel1 = flxDetails.getSelectionModel().getSelections();
				    var cnt1 = 0;
				    for (var a=0;a<selrows1;a++){
				        if (sel1[a].data.month_code==monthcode){
				            cnt1 = cnt1 + 1;
				        }	
					if(a==0){
				        sel1[a].set('open',openstk);
					}
				    }
				   }else{
					CurBalanceDataStore.load({
					url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  
					params:
					{
				   	 task:"CurBalance",
					 finid:GinFinid,
					 ledcode:cmbledger.getValue() 		
					},	
					callback:function(){
						var cnt=CurBalanceDataStore.getCount();
						if(cnt>0){
							    var curbalobdbamt=CurBalanceDataStore.getAt(0).get('curbal_obdbamt');
							    var curbalobcramt=CurBalanceDataStore.getAt(0).get('curbal_obcramt');
							    var curbalance=0;
							    if(curbalobdbamt===0&&curbalobcramt===0){
								curbalance=0;
							    }else if(curbalobdbamt>0){
								curbalance=CurBalanceDataStore.getAt(0).get('curbal_obdbamt');
							    }else if(curbalobcramt>0){
								curbalance=CurBalanceDataStore.getAt(0).get('curbal_obcramt');
							    }
							    flxDetails.getSelectionModel().selectAll();
							    var selrows1 = flxDetails.getSelectionModel().getCount();
							    var sel1 = flxDetails.getSelectionModel().getSelections();
							    var cnt1 = 0;
							    for (var a=0;a<selrows1;a++){
								if (sel1[a].data.month_code==monthcode){
								    cnt1 = cnt1 + 1;
								}	
								if(a==0){
								sel1[a].set('open',curbalance);
								}
							    }
						  }
					     }
					});
				}	
			  }
              	});
		}
              });
            }
          }
    });

 var flxDetails= new Ext.grid.EditorGridPanel({
    frame: false,
    fieldLabel:'',
    sm: new Ext.grid.RowSelectionModel(),
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    height: 330,
    width: 500,
    x: 0,
    y: 40,
    columns: [
        {header: "Month", dataIndex: 'month_name',sortable:true,width:120,align:'left'},
        {header: "Opening Stock", dataIndex: 'open',sortable:true,width:160,align:'left',
	editor: {
                    xtype:'numberfield',
                    allowBlank:true
                }
	},
        {header: "Closing Stock", dataIndex: 'close',sortable:true,width:160,align:'left',
	 editor: {
                    xtype:'numberfield',
                    allowBlank:true,
                    enableKeyEvents: true,
                    listeners:{
                        blur: function(){	
			   /* var sm = flxDetails.getSelectionModel();
                            var selrow = sm.getSelected();
                            var monthcodenew = 0;
                            var closeamt;
			    flxDetails.getSelectionModel().selectAll();
			    var selrows1 = flxDetails.getSelectionModel().getCount();
			    var sel1 = flxDetails.getSelectionModel().getSelections();
			    for (var a=0;a<selrows1;a++){
			    monthcodenew = Number(selrow.get('month_code'));
//&& Number(selrow.get('close'))==0
                            if(monthcodenew==4)
			    {                
				sel1[1].set('open',Ext.util.Format.number(this.getValue(),"0.00"));
                                closeamt=Number(selrow.get('close'));
                            }
                            else if(monthcodenew==5)
			    {
                                sel1[2].set('open',Ext.util.Format.number(this.getValue(),"0.00"));
                                closeamt=Number(selrow.get('close'));
                            }
			
			    if(monthcodenew==4)
			    {                
				sel1[1].set('open',Ext.util.Format.number(this.getValue(),"0.00"));
                                closeamt=Number(selrow.get('close'));
                            }
                            else if(monthcodenew==5)
			    {
                                sel1[3].set('open',closeamt);
                                closeamt=Number(selrow.get('close'));
				Ext.MessageBox.alert("Alert",monthcodenew);
                            }	
			

			  }*/
                    }
		}
	   }	
	},
        {header: "Monthid", dataIndex: 'month_code',sortable:true,width:165,align:'left',hidden:true}
    ],
    store:[]
   });

    var EntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Vocher Adjustment Details Refer',
        bodyStyle:{"background-color":"#3399CC"},
        header      : false,
        width       : 450,
        height      : 180,
        x           : 10,
        y           : 10,
        frame       : false,
        id          : 'EntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
            root:'rows',
            totalProperty: 'results',
            id:'id'
        },['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
            {
                text: 'Save',
                style  : 'text-align:center;',
                height: 40,
                fontSize:30,
                width:70,
                listeners:{
                    click: function () {
                           Ext.Msg.show({
                                title: 'Save',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Are You Sure to Add This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accData = flxDetails.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: '/SHVPM/Financials/General/ClosingStock/ClosingStockSave.php',
                                            params:{
                                                griddet:Ext.util.JSON.encode(accupdData),
                                                finid:GinFinid,
                                                ledcode:cmbledger.getValue(),
                                                comp:compcode,
                                                cnt:accData.length
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
                                                    Ext.MessageBox.alert("Alert","Record Successfully Added");
						    ref();
                                                }else{
                                                    Ext.MessageBox.alert("Alert","Record not saved");
                                                }
                                            }
                                       });
                                    }
                                }
                            });
                    }
                }
            },'-',
            {
                text: 'Refresh',
                style  : 'text-align:center;',
                tooltip: 'Refresh Details...',
                height: 40,
                fontSize:30,
                width:70,
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
                tooltip: 'Close...',
                height: 40,
                fontSize:30,
                width:70,
                icon: '/Pictures/exit.png',
                listeners:{
                    click: function(){
                        EntryWindow.hide();
                    }
                }
            }]
        },
        items : [
        {
            xtype       : 'fieldset',
            title       : '',
            labelWidth  : 60,
            width       : 630,
            x           : 0,
            y           : 0,
            border      : false,
            items: [cmbledger]
        },flxDetails
    ]
});

function ref(){
flxDetails.getStore().removeAll();	
      ledDataStore.load({
                url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  
                params:
                {
                    task:"ledgerName",
                    compcode:compcode	
                }
              });
		MonthLoadDataStore.load({
                url: '/SHVPM/Financials/General/ClosingStock/clsclosing.php',  
                params:
                {
                    task:"MonthLoad"
                },
		callback:function(){
			for(var i=0;i<MonthLoadDataStore.getCount();i++){
			flxDetails.getStore().insert(
				flxDetails.getStore().getCount(),                       
				  new dgrecord({
				     month_name:MonthLoadDataStore.getAt(i).get('month_name'),
				     open:'',
				     close:'',
				     month_code:MonthLoadDataStore.getAt(i).get('month_code')	
				})
				);
			}
		}
              });
}

       var EntryWindow = new Ext.Window({
        width       : 460,
        height      : 390,
        y           : 70,
        items       : EntryFormPanel,
        bodyStyle:{
            "background-color":"#3399CC"
        },
        title       : 'Closing Stock',
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners:{
            show:function(){
              ref();
            }
        }
    });
    EntryWindow.show();
});







