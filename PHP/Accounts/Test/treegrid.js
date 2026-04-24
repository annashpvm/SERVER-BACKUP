Ext.onReady(function () {

    console.log("TreeGrid check:", Ext.ux.tree);

    // ✅ DEFINE COLUMNS USING TreeGridColumn
    var columns = [
        new Ext.ux.tree.TreeGridColumn({
            header: 'Particulars',
            dataIndex: 'text',
            width: 300
        }),
        new Ext.grid.Column({
            header: 'Debit',
            dataIndex: 'debit',
            width: 120,
            align: 'right'
        }),
        new Ext.grid.Column({
            header: 'Credit',
            dataIndex: 'credit',
            width: 120,
            align: 'right'
        })
    ];

    // ✅ ROOT NODE
    var root = new Ext.tree.AsyncTreeNode({
        text: 'Root',
        expanded: true,
        children: [
            {
                text: 'Capital Account',
                debit: 1000,
                credit: 0,
                expanded: true,
                children: [
                    {
                        text: 'Reserves & Surplus',
                        debit: 500,
                        credit: 0,
                        leaf: true
                    }
                ]
            }
        ]
    });

    // ✅ CREATE TREEGRID
    new Ext.ux.tree.TreeGrid({
        renderTo: Ext.getBody(),
        width: 650,
        height: 400,
        title: 'Trial Balance',

        rootVisible: false,
        columns: columns,
        root: root
    });

});