Ext.onReady(function () {

    Ext.Ajax.request({
        url: 'AutoGridData.php',
        method: 'POST',

        success: function (resp) {

            var obj = Ext.decode(resp.responseText);

            Ext.each(obj.columns, function (col) {
                if (col.isAmount) {
                    col.renderer = Ext.util.Format.numberRenderer('0,0.00');
                }
            });

            var store = new Ext.data.JsonStore({
                data: obj.data,
                fields: Ext.pluck(obj.columns, 'dataIndex')
            });

            var totalBar = new Ext.Toolbar.TextItem({
                text: ''
            });

            new Ext.grid.GridPanel({
                store: store,
                columns: obj.columns,
                renderTo: Ext.getBody(),
                width: 850,
                height: 350,
                title: 'Invoice Details',
                stripeRows: true,
                autoScroll: true,
                bbar: ['->', totalBar]
            });

            totalBar.setText(
                '<b>' +
                'Total WT : ' + Ext.util.Format.number(obj.totals.invwt, '0,0.000') +
                ' | Taxable : ' + Ext.util.Format.number(obj.totals.invh_taxableamt, '0,0.00') +
                ' | Net Amt : ' + Ext.util.Format.number(obj.totals.invh_netamt, '0,0.00') +
                '</b>'
            );
        }
    });

});
