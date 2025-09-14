Ext.onReady(function() {

    Ext.QuickTips.init();

    // Sample store
    var store = new Ext.data.JsonStore({
        fields: ['item', 'qty', 'price'],
        data: [
            { item: 'Item A', qty: 10, price: 50 },
            { item: 'Item B', qty: 20, price: 100 },
            { item: 'Item C', qty: 15, price: 75 }
        ]
    });

    // Add GridSummary plugin
    var summary = new Ext.ux.grid.GridSummary();

    var grid = new Ext.grid.GridPanel({
        renderTo: Ext.getBody(),
        store: store,
        width: 600,
        height: 300,
        title: 'Grid with Footer Summary',
        plugins: summary, // <-- this is important
        columns: [
            {
                header: 'Item',
                dataIndex: 'item',
                summaryType: 'count', // shows total count
                summaryRenderer: function(v) {
                    return 'Total Items: ' + v;
                }
            },
            {
                header: 'Quantity',
                dataIndex: 'qty',
                summaryType: 'sum'
            },
            {
                header: 'Price',
                dataIndex: 'price',
                summaryType: 'sum'
            }
        ],
        viewConfig: {
            forceFit: true
        },
        stripeRows: true,
        frame: true
    });

});

