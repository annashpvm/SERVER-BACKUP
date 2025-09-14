Ext.onReady(function(){
    Ext.QuickTips.init();
   
    var LedgerDataStore = new Ext.data.Store({
        id: 'FinishingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/Inspection/Cls.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"cmbledcode"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        'Process_SeqNo','Process_BatchNo','Process_BatchName',
        'Process_SetNo', 'Process_BeamSNo', 'Process_Style', 'mtrs','Process_Prod_Status'
        ])
    });

    function load(){
        FinishingDataStore.load({
            url: '/Inspection/Cls.php',
            params:
            {
                task:'getfinishingstock'
            },
            callback:function(){
                var cnt=FinishingDataStore.getCount();
                if(cnt>0){
                    for(var  i=0;i<cnt;i++){
                        var Process_SetNo=FinishingDataStore.getAt(i).get('Process_SetNo');
                        var ProcessBeamSNo=FinishingDataStore.getAt(i).get('Process_BeamSNo');
                        var Process_BatchNo=FinishingDataStore.getAt(i).get('Process_BatchNo');
                        var Process_BatchName=FinishingDataStore.getAt(i).get('Process_BatchName');
                        var Process_Style=FinishingDataStore.getAt(i).get('Process_Style');
                        var mtrs=FinishingDataStore.getAt(i).get('mtrs');
                        var Process_Prod_Status=FinishingDataStore.getAt(i).get('Process_Prod_Status');
                        var Process_SeqNo=FinishingDataStore.getAt(i).get('Process_SeqNo');
                        if(Process_Prod_Status=="R"){
                            flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                    Process_SetNo:Process_SetNo,
                                    Process_BeamSNo:ProcessBeamSNo,
                                    Process_BatchNo:Process_BatchNo,
                                    Process_BatchName :Process_BatchName,
                                    Process_Style:Process_Style,
                                    mtrs:mtrs,
                                    Process_Prod_Status:"R",
                                    Process_SeqNo:Process_SeqNo
                                })
                                );
                        }else {
                            flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                    Process_SetNo:Process_SetNo,
                                    Process_BeamSNo:ProcessBeamSNo,
                                    Process_BatchNo:Process_BatchNo,
                                    Process_BatchName :Process_BatchName,
                                    Process_Style:Process_Style,
                                    mtrs:mtrs,
                                    Process_Prod_Status:"N",
                                    Process_SeqNo:Process_SeqNo
                                })
                                );
                        }
                    }
                }
            }
        });

     
    }

    var fm=Ext.form;
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),  
        store : [],
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 280,   
        mode  : 'local',
        width: 665,
        x: 0,
        y: 0,
        columns: [          
        {
            header: "Set No",
            dataIndex: 'Process_SetNo',
            sortable:true,
            width:70,
            align:'left'
        },

        {
            header: "Beam Sno",
            dataIndex: 'Process_BeamSNo',
            sortable:true,
            width:70,
            align:'left'
        },

        {
            header: "Batch No",
            dataIndex: 'Process_BatchNo',
            sortable:true,
            width:70,
            align:'left'
        },

        {
            header: "Batch Name",
            dataIndex: 'Process_BatchName',
            sortable:true,
            width:80,
            align:'left'
        },

        {
            header: "Style",
            dataIndex: 'Process_Style',
            sortable:true,
            width:120,
            align:'left'
        },

        {
            header: "Meters",
            dataIndex: 'mtrs',
            sortable:true,
            width:80,
            align:'left'
        },

        {
            header: "Status",
            dataIndex: 'Process_Prod_Status',
            sortable:true,
            width:60,
            align:'left',
            editor: new fm.ComboBox({
                allowBlank: false,
                store:['Y','N','R'],
                displayField    : 'Group_name',
                valueField      : 'Group_name',
                hiddenName      : 'Group_code',
                id              : 'cmbaccname',
                typeAhead       : true,
                mode            : 'local',
                forceSelection  : false,
                triggerAction   : 'all',
                selectOnFocus   : false,
                editable        : true,
                allowblank      : false
            })
        },
        {
            header: "process_seq",
            dataIndex: 'Process_SeqNo',
            sortable:true,
            width:100,hidden:true,
            align:'left'
        }
        ]
    });

    var lblmsg = new Ext.form.Label({
        fieldLabel  : 'Please Wait Few Seconds......',
        id          : 'lblmsg',
        hidden:true,
        labelStyle: 'font-size: 16px; font-weight: bold;'
    });

    var btnOk = new Ext.Button({
        text    : "Save",
        width   : 100,
        icon: '/Pictures/save.png',
        x       : 280,
        y       : 10,
        listeners:{
            click:function() {
                btnOk.hide();
                lblmsg.show();
                var InspData = flxDetail.getStore().getRange();
                var InspupdData = new Array();
                Ext.each(InspData, function (record) {
                    InspupdData.push(record.data);
                });
                Ext.Ajax.request({
                    url: 'FinishingStockEntrySave.php',
                    params:{
                        griddet: Ext.util.JSON.encode(InspupdData),
                        cnt:InspData.length
                    },
                    success:function()
                    {
                        Ext.Msg.show({
                            title: 'Inspection',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Finsihed Stock Updated SuccessFully',
                            fn: function(btn){
                                if (btn == 'yes'){
                                    flxDetail.getStore().removeAll();
                                    load();
                                    btnOk.show();
                                    lblmsg.hide();
                                }
                            }
                        });

                    },
                    failure:function(){
                        Ext.Msg.show({
                            title: 'Inspection',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Finsihed Stock Updated Failed',
                            fn: function(btn){
                                if (btn == 'yes'){
                                                            
                            }
                            }
                        });
                    }
                });
            }
        }
    });

    var FinishingStockEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Finishing Stock Entry',
        bodyStyle:{
            "background-color":"#3399CC"
        },
        header      : false,
        width       : 438,
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'FinishingStockEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',      
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #99ddff;",
            height: 40,
            style   :'background-color:#99ddff',
            fontSize:18,
            items: [
            {
                text: 'Refresh',
                style  : 'text-align:center;',
                tooltip: 'Refresh...',
                height: 40,
                fontSize:30,
                width:70,
                listeners:{
                    click: function(){
                        load();
                    }
                }
            },
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
                        FinishingStockEntryWindow.hide();
                    }
                }
            }
            ]
        },
        items: [
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 200,
            height      : 60,
            x           : 500,
            y           : 12,
            border      : false,
            items: [btnOk]
        },{
            xtype       : 'fieldset',
            title       : '',
            width       : 400,
            height      : 80,
            x           : 0,
            y           : 0,
            items: [lblmsg]
        },{
            xtype       : 'fieldset',
            title       : '',
            width       : 690,
            height      : 320,
            x           : 3,
            y           : 80,
            border      : false,
            items: [flxDetail
            ]
        },
        ]
    });
    

    var dgrecord = Ext.data.Record.create([]);
    var FinishingStockEntryWindow = new Ext.Window({
        height      : 450,
        width       : 710,
        y           : 90,
        title       : 'Finishing Stock Entry',
        bodyStyle:{
            "background-color":"#3399CC"
        },
        items       : FinishingStockEntryFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners :
        {
            show :function(){
                load();
            }
        }
    });
    FinishingStockEntryWindow.show();  
});
