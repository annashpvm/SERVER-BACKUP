Ext.Loader.setConfig({ 
    enabled: true 
    });

Ext.application({
    name: 'TR',

    appFolder: 'app',
   
    controllers: [
                  'Countries'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            items: [
                {
                    xtype: 'label',
                    html: '<b>ExtJs 4 Tree Panel Example</b>'
                },
                {
                    xtype: 'countryTree',
                }
            ]
        });
    }
});
