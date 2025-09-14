Ext.define('TR.store.Countries', {
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: 'CountryServlet'
    },
    root: {
        text: 'Tree display of Countries',
        id: 'myTree',
        expanded: true
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
   
});
