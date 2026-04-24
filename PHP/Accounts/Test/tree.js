Ext.onReady(function () {

    Ext.QuickTips.init();

    // =========================
    // LOCAL STORAGE VALUES
    // =========================
    var compcode = localStorage.getItem('gincompcode');
    var finid    = localStorage.getItem('ginfinid');
    var finstartdate = localStorage.getItem('gfinstdate');

    // =========================
    // GLOBAL VARIABLES
    // =========================
    var currentLevel = 'GROUP';
    var parentCode = '';

    // =========================
    // DATE FIELDS
    // =========================
    var txtStartDate = new Ext.form.DateField({
        fieldLabel: 'From Date',
        id: 'startdate',
        format: 'Y-m-d',
        value: new Date('04/01/2025')
    });

    var txtEndDate = new Ext.form.DateField({
        fieldLabel: 'To Date',
        id: 'enddate',
        format: 'Y-m-d',
        value: new Date()
    });

    // =========================
    // STORE
    // =========================
    var store = new Ext.data.JsonStore({
        url: 'getTrialBalance.php',
        root: 'data',
        autoLoad: false,
        method: 'POST',
        fields: ['code', 'name', 'debit', 'credit']
    });

    // =========================
    // STATIC PARAMS
    // =========================
    store.baseParams = {
        finid: finid,
        compcode: compcode,
        finfirstdate: finstartdate
    };

    // =========================
    // BEFORE LOAD
    // =========================
    store.on('beforeload', function () {

        Ext.apply(store.baseParams, {
            level: currentLevel,
            startdate: txtStartDate.getValue()
                ? txtStartDate.getValue().format('Y-m-d') : '',
            enddate: txtEndDate.getValue()
                ? txtEndDate.getValue().format('Y-m-d') : ''
        });
    });

    // =========================
    // GRID
    // =========================
    var grid = new Ext.grid.GridPanel({
        renderTo: Ext.getBody(),
        title: 'Trial Balance',
        store: store,
        width: 650,
        height: 450,
        frame: true,

        columns: [
            { header: 'Description', dataIndex: 'name', width: 300 },
            {
                header: 'Debit',
                dataIndex: 'debit',
                align: 'right',
                width: 120,
                renderer: Ext.util.Format.numberRenderer('00,00,000.00')
            },
            {
                header: 'Credit',
                dataIndex: 'credit',
                align: 'right',
                width: 120,
                renderer: Ext.util.Format.numberRenderer('00,00,000.00')
            }
        ],

        // =========================
        // EVENTS
        // =========================
        listeners: {

            afterrender: function () {
                currentLevel = 'GROUP';
                store.load();
            },

            rowdblclick: function (grid, rowIndex) {

                var rec = store.getAt(rowIndex);
                parentCode = rec.get('code');

                if (currentLevel == 'GROUP') {

                    currentLevel = 'SUBMAIN';
                    store.baseParams.mgrpcode = parentCode;

                    delete store.baseParams.subgrp;
                    delete store.baseParams.subgrp2;

                } else if (currentLevel == 'SUBMAIN') {

                    currentLevel = 'SUBGROUP';
                    store.baseParams.subgrp = parentCode;

                } else if (currentLevel == 'SUBGROUP') {

                    currentLevel = 'LEDGER';
                    store.baseParams.subgrp2 = parentCode;
                }

                store.load();
            }
        },

        // =========================
        // TOOLBAR
        // =========================
        tbar: [
            txtStartDate,
            txtEndDate,
            {
                text: 'Back',
                handler: function () {

                    if (currentLevel == 'LEDGER') {

                        currentLevel = 'SUBGROUP';
                        delete store.baseParams.subgrp2;

                    } else if (currentLevel == 'SUBGROUP') {

                        currentLevel = 'SUBMAIN';
                        delete store.baseParams.subgrp;

                    } else if (currentLevel == 'SUBMAIN') {

                        currentLevel = 'GROUP';
                        delete store.baseParams.mgrpcode;
                    }

                    store.load();
                }
            },
            '-',
            { xtype: 'tbtext', text: 'Double Click to Drill Down' }
        ]
    });

});