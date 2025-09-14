Ext.define('TR.view.CountryTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.countryTree',
    store: 'Countries',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },
    height: 600,
    width: 400,
    useArrows: true,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Expand All',
        }, {
            text: 'Collapse All',
        }]
    }]
});
