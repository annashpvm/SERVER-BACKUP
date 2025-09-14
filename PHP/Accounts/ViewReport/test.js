Ext.onReady(function() {
    Ext.QuickTips.init();

store = new GeoExt.data.WMSCapabilitiesStore({
    url: "data.xml"
});
store.load();


grpStore = new Ext.data.GroupingStore({
    groupField: 'name',
    sortInfo: {field: 'name', direction: 'ASC'},
    groupOnSort: true   
});

store.on('load', function(store, records, options)
{
    store.each(function(eachItem) {
        grpStore.add(eachItem);
    });
});


    var grid = new Ext.grid.GridPanel({
        store: grpStore,
        columns: [
            {header: "Title", dataIndex: "title", sortable: true},
            {header: "Name", dataIndex: "name", sortable: true},
            {id: "description", header: "Description", dataIndex: "abstract"}
        ],
        autoExpandColumn: "description",
        height: 300,
        width: 650,
        view: new Ext.grid.GroupingView({
            forcefit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        })
});


    });

