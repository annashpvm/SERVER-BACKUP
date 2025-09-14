/* global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var GinYear = localStorage.getItem('gstyear');
   var fineddate = localStorage.getItem('gfineddate');
   
    var dgaccrecord = Ext.data.Record.create([]);

    var SubGroupsdatastore = new Ext.data.Store({
        id: 'SubGroupsdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts4.php',
            method: 'POST'
        }),
        baseParams: {task: "getsubgroup"}, 
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['grp_code', 'grp_name', 'totdbamt', 'totcramt', 'acctype'])
    });

    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: SubGroupsdatastore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        menuDisabled: true,
        columnLines: true,
        border: true,
        height: 500,
        width: 505,
        x: 310,
        y: 0,
        columns: [
            {header: "Account Name", dataIndex: 'grp_name', sortable: true, width: 270, align: 'left'},
            {header: "Debit", dataIndex: 'totdbamt', sortable: true, width: 100, align: 'left'},
            {header: "Credit", dataIndex: 'totcramt', sortable: true, width: 100, align: 'left'},
            {header: "Type", dataIndex: 'acctype', sortable: true, width: 40, align: 'left', hidden: true}
        ]
    });

    var tree = new Ext.tree.TreePanel({
        width: 300, bodyStyle: {"background-color": "#99ddff"},
        height: 500,
        x: 0,
        y: 0,
        useArrows: true,
        autoScroll: true,
        animate: true,
        enableDD: true,
        containerScroll: true,
        border: true,
        dataUrl: '/SHVPM/Accounts/RepFinance/RepTrialBalance/clsTrialbal.php',
        root: {
            nodeType: 'async',
            text: 'Trail Balance',
            draggable: false,
//            id: '0'
            id: '1'
        },
        listeners: {
            beforeexpandnode: function (node) {
                node.removeAll();
            },
            expandnode: function (node) {

                Ext.Ajax.request({
                    url: '/SHVPM/Accounts/RepFinance/RepTrialBalance/clsTrialbal.php',
                    params: {
                        grpparent: node.id
//                        grpparent: 1
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });
                SubGroupsdatastore.removeAll();
                SubGroupsdatastore.load({
                    url: '/SHVPM/Accounts/clsAccounts4.php',
                    params:
                            {
                                task: "getsubgroup",
                                grpparent: node.id,
                                gincompcode : GinCompcode
                            },
                    callback: function () {
                        GetGridTotal();
                    }
                });
            },
            click: function (node) {
//alert("Node Clicked");
                node.removeAll();
                Ext.Ajax.request({
                    url: '/SHVPM/Accounts/RepFinance/RepTrialBalance/clsTrialbal.php',
                    params: {
                        grpparent: node.id
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });
                SubGroupsdatastore.removeAll();
                SubGroupsdatastore.load({
                    url: '/SHVPM/Accounts/clsAccounts4.php',
                    params:
                            {
                                task: "getsubgroup",
                                grpparent: node.id,
                                gincompcode : GinCompcode
                            },
                    callback: function () {
                        GetGridTotal();
                    }
                });
            }
        }
    });

    function GetGridTotal() {
        var rcnt = flxDetail.getStore().getCount();
        var gindbtotal = 0;
        var gincrtotal = 0;
        for (var i = 0; i < rcnt; i++) {
            var rec = flxDetail.getStore().getAt(i);
            gindbtotal = gindbtotal + Number(rec.get('totdbamt'));
            gincrtotal = gincrtotal + Number(rec.get('totcramt'));
        }
        ;
        flxDetail.getStore().insert(
                flxDetail.getStore().getCount(),
                new dgaccrecord({
                    grp_name: "Total",
                    totdbamt: gindbtotal,
                    totcramt: gincrtotal,
                    acctype: ""
                })
                );
    }

    var TreeGridFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Tree Grid', bodyStyle: {"background-color": "#3399CC"},
        header: false,
        width: 850,
        height: 600,
        x: 0,
        y: 0,
        frame: false,
        id: 'TreeGridFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['led_name']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize: 30, width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            TreegridWindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 840,
                height: 600,
                x: 0,
                y: 0,
                border: true,
                layout: 'absolute',
                items: [tree, flxDetail
                ]
            }
        ]
    });

    var TreegridWindow = new Ext.Window({
        height: 600,
        width: 870,
        y: 60,
        items: TreeGridFormPanel,
        bodyStyle: {"background-color": "#3399CC"},
        layout: 'absolute',
        closable: true, maximized: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false
    });
    TreegridWindow.show();
});

