
Ext.onReady(function() {
    var store = new Ext.data.GroupingStore({
        reader: new Ext.data.ArrayReader({}, [
            {name:'heading'},
            {name:'amount', type:'float'}
        ]),
        data: [
            ['A', 100],
            ['A', 200],
            ['B', 300]
        ],
        groupField: 'heading'
    });
    
    new Ext.grid.GridPanel({
        store: store,
        columns: [
            {header:'Group', dataIndex:'heading'},
            {header:'Amount', dataIndex:'amount', summaryType:'sum'}
        ],
        view: new Ext.grid.GroupingView({
            hideGroupedColumn: true
        }),
        plugins: [ new Ext.ux.grid.GroupSummary() ],
        width: 400,
        height: 300,
        renderTo: document.body
    });
    

    });
