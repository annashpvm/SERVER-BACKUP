
Ext.onReady(function() {
    Ext.QuickTips.init();


var loadMainDatastore = new Ext.data.Store({
      id: 'loadMainDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clslistview.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
          //  baseParams:{task:"loadDesignation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2' 
      ]),
    });	


var listView = new Ext.list.ListView({
    store: loadMainDatastore,
    multiSelect: false,
    emptyText: 'No images to display',
    reserveScrollOffset: true,
    border : true,
    columns: [{
        header: 'cust_code',
        width: 0.001,
fixed: true,
        dataIndex: 'cust_code',
        align: 'center',
        hidden: 'true',
    },
    {
        header: 'cust_ref',
        dataIndex: 'cust_ref',
fixed: true,
        width: 0.2,
        align: 'left'
    },

    {
        header: 'cust_name',
        width: 0.20,
        dataIndex: 'cust_name',
fixed: true,
        align: 'left'
    },
    {
        header: 'cust_add1',
        dataIndex: 'cust_add1',
        width: 0.2,

        align: 'left'
    },
    {
        header: 'cust_add2',
        dataIndex: 'cust_add2',
        width: 0.20,
        align: 'left'
    },
 ],
         listeners :{


   'render': function(panel) {
       listView.body.on('click', function() {
           alert('onclick');
       });
    }

               
            },

});



// put it in a Panel so it looks pretty
var panel = new Ext.Panel({
    id:'images-view',
    width:1200,
    height:500,
    collapsible:true,
    layout:'fit',
    title:'Simple ListView (0 items selected)',
    items: listView
});

panel.render(document.body);

// little bit of feedback
listView.on('selectionchange', function(view, nodes){
    var l = nodes.length;
    var s = l != 1 ? 's' : '';
    panel.setTitle('Simple ListView ('+l+' item'+s+' selected)');
});
          
        });
