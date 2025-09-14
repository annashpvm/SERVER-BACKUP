/*
Ext.onReady(function() {
    Ext.QuickTips.init();



    var tree = new Ext.ux.tree.TreeGrid({
        title: 'TREE GRID',
        width: 600,
        height: 420,
        renderTo: Ext.getBody(),
        enableDD: true,
        loader: null,  
expanded: false ,
        columns:[
        {
            header: 'Code',
            dataIndex: 'main_grpcode',
            width: 70,

        },
        {
            header: 'Group Name',
            dataIndex: 'main_grpname',
            width: 230
        },
        {
            header: 'Debit',
            width: 150,
            dataIndex: 'debit'
        },
       {
            header: 'Credit',
            width: 100,
            dataIndex: 'credit',
            align: 'center',
            sortType: 'asFloat',


tpl: new Ext.XTemplate('{credit:this.formatValue}', {
    formatValue: function(v) {
        return Ext.util.Format.number(v, '0,0.00');
    }
})


        },

 ],

root: new Ext.tree.AsyncTreeNode({
    text: 'Main Group',
    id: 'root',
    main_grpcode: 'root',
    leaf: false,  // ✅ make sure root can be expanded
    expanded: true,

}),

    rootVisible: false,

        listeners: {

  


expandnode: function(node) {


  console.log('expandnode fired:', node.text, node.attributes.main_grpcode);  // ✅ Debug line
    if (!node.loaded) {  // only load once
        Ext.Ajax.request({
            url: 'Clstreetest_SubGroup.php',
            params: {
                grpparent: node.attributes.main_grpcode
            },
            success: function(response) {
                var children = Ext.decode(response.responseText);
                console.log('Loaded children:', children);  // ✅ Debug line
                if (children && children.length > 0) {
                    node.appendChild(children);
                } else {
                    node.attributes.leaf = true;
                }
                node.loaded = true;  // ✅ mark as loaded
            },
            failure: function() {
                Ext.Msg.alert('Error', 'Failed to load child nodes');
            }
        });
    }
}

        } 
            });


var rootNode = tree.getRootNode();

Ext.Ajax.request({
    url: 'ClstreeMain.php',
    success: function(response) {
        var topLevel = Ext.decode(response.responseText);

   console.log("Appending top level:", topLevel);  // ✅ Add this
            for (var i = 0; i < topLevel.length; i++) {
                topLevel[i].leaf = false;  // ✅ force it just in case
            }
        rootNode.appendChild(topLevel);
    }
});

          
        });
*/

Ext.onReady(function() {
    Ext.QuickTips.init();

    var tree = new Ext.ux.tree.TreeGrid({
        title: 'TREE GRID',
        width: 600,
        height: 420,
        renderTo: Ext.getBody(),
        enableDD: true,
        loader: null,
        columns: [
            {
                header: 'Code',
                dataIndex: 'main_grpcode',
                width: 70
            },
            {
                header: 'Group Name',
                dataIndex: 'main_grpname',
                width: 230
            },
            {
                header: 'Debit',
                width: 150,
                dataIndex: 'debit'
            },
            {
                header: 'Credit',
                width: 100,
                dataIndex: 'credit',
                align: 'center',
                sortType: 'asFloat',
                tpl: new Ext.XTemplate('{credit:this.formatValue}', {
                    formatValue: function(v) {
                        return Ext.util.Format.number(v, '0,0.00');
                    }
                })
            }
        ],
        root: new Ext.tree.AsyncTreeNode({
            text: 'Main Group',
            id: 'root',
            main_grpcode: 'root',
            leaf: false,
            expanded: true
        }),
        rootVisible: false
    });


    tree.on('expandnode', function(node) {
        console.log('expandnode fired:', node.text, node.attributes.main_grpcode);
        if (!node.loaded) {
            Ext.Ajax.request({
                url: 'Clstreetest_SubGroup.php',
                params: {
                    grpparent: node.attributes.main_grpcode
                },
                success: function(response) {
                    var children = Ext.decode(response.responseText);
                    console.log('Loaded children:', children);
                    if (children && children.length > 0) {
                        node.appendChild(children);
                    } else {
                        node.attributes.leaf = true;
                    }
                    node.loaded = true;
                },
                failure: function() {
                    Ext.Msg.alert('Error', 'Failed to load child nodes');
                }
            });
        }
    });

    // Load top-level nodes
    var rootNode = tree.getRootNode();
    Ext.Ajax.request({
        url: 'ClstreeMain.php',
        success: function(response) {
            var topLevel = Ext.decode(response.responseText);
            console.log("Appending top level:", topLevel);
            for (var i = 0; i < topLevel.length; i++) {
                topLevel[i].leaf = false;  // Ensure nodes are expandable
            }
            rootNode.appendChild(topLevel);
        }
    });
});

