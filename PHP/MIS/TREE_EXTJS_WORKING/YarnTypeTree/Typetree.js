/* global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    
    var tree = new Ext.tree.TreePanel({
        width: 300,
        bodyStyle: {"background-color": "#99ddff"},
        height: 500,
        x: 0,
        y: 0,
        useArrows: true,
        autoScroll: true,
        animate: true,
        enableDD: true,
        containerScroll: true,
        border: true,
        dataUrl: 'clsTypeTree.php',
        root: {
            nodeType: 'async',
            text: 'Type',
            draggable: false,
            id: '0'
        },
        listeners: {
            beforeexpandnode: function (node) {
                node.removeAll();
            },
            expandnode: function (node) {
                Ext.Ajax.request({
                    url: 'clsTypeTree.php',
                    params: {
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });
            }
        }
    });

    var TreegridWindow = new Ext.Window({
        height: 450,
        width: 300,
        y: 45,
        items: tree,
        bodyStyle: {"background-color": "#3399CC"},
        layout: 'absolute',
        closable: true, 
        maximized: false,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false
    });
    TreegridWindow.show();
});
