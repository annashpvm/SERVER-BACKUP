Ext.onReady(function () {

    Ext.QuickTips.init();

    // =========================
    // GLOBAL VARIABLES
    // =========================
    var currentLevel = 'GROUP';
    var parentCode = '';

    // =========================
    // STORE
    // =========================
    var store = new Ext.data.JsonStore({
        url: 'getTrialBalance.php',
        root: 'data',
        totalProperty: 'total',
        autoLoad: true,
        baseParams: {
            level: 'GROUP'
        },
        fields: [
            'code',
            'name',
            'debit',
            'credit'
        ]
    });

    // =========================
    // GRID
    // =========================
    var grid = new Ext.grid.GridPanel({
        renderTo: Ext.getBody(),
        title: 'Trial Balance',
        store: store,
        width: 600,
        height: 450,
        frame: true,
        columns: [
            {
                header: 'Description',
                dataIndex: 'name',
                width: 250
            },
            {
                header: 'Debit',
                dataIndex: 'debit',
                align: 'right',
                width: 120,
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            {
                header: 'Credit',
                dataIndex: 'credit',
                align: 'right',
                width: 120,
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            }
        ],

        // =========================
        // ROW CLICK EVENT
        // =========================
        listeners: {
            rowdblclick: function (grid, rowIndex) {

                var rec = store.getAt(rowIndex);

                if (currentLevel == 'GROUP') {

                    currentLevel = 'SUBGROUP';
                    parentCode = rec.get('code');

                    store.load({
                        params: {
                            level: 'SUBGROUP',
                            grp_code: parentCode
                        }
                    });

                } else if (currentLevel == 'SUBGROUP') {

                    currentLevel = 'LEDGER';
                    parentCode = rec.get('code');

                    store.load({
                        params: {
                            level: 'LEDGER',
                            subgrp_code: parentCode
                        }
                    });
                }
            }
        },

        // =========================
        // TOOLBAR
        // =========================
        tbar: [
            {
                text: 'Back',
                iconCls: 'back-icon',
                handler: function () {

                    if (currentLevel == 'LEDGER') {

                        currentLevel = 'SUBGROUP';

                        store.load({
                            params: {
                                level: 'SUBGROUP',
                                grp_code: parentCode
                            }
                        });

                    } else if (currentLevel == 'SUBGROUP') {

                        currentLevel = 'GROUP';

                        store.load({
                            params: {
                                level: 'GROUP'
                            }
                        });
                    }
                }
            },
            '-',
            {
                xtype: 'tbtext',
                text: 'Double Click row to Drill Down'
            }
        ]
    });

});