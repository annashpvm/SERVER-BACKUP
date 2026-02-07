Ext.onReady(function () {

    Ext.Ajax.request({
        url: 'AutoGridData.php',
        method: 'POST',

        success: function (resp) {

            // Decode JSON safely
            var obj = Ext.decode(resp.responseText);

            // 1️⃣ Apply number renderer ONLY for decimal columns
            Ext.each(obj.columns, function (col) {
                if (col.isAmount === true) {
                    col.align = 'right';
                    col.renderer = Ext.util.Format.numberRenderer('0,0.00');
                }
            });

            // 2️⃣ Create store dynamically
            var store = new Ext.data.JsonStore({
                data: obj.data,
                fields: Ext.pluck(obj.columns, 'dataIndex')
            });

            // 3️⃣ Bottom bar text item (for totals)
            var totalBar = new Ext.Toolbar.TextItem({
                text: '<b>Total :</b>'
            });

            // 4️⃣ Create Grid
            new Ext.grid.GridPanel({
                store: store,
                columns: obj.columns,
                renderTo: Ext.getBody(),
                width: 900,
                height: 380,
                title: 'Dynamic Auto Grid',
                stripeRows: true,
                autoScroll: true,
                bbar: ['->', totalBar]
            });

            // 5️⃣ Build totals text dynamically (DECIMAL cols only)
            var totalText = '<b>';

            Ext.each(obj.decimalCols, function (colName) {

                // safety check
                if (obj.totals[colName] !== undefined) {

                    totalText +=
                        colName.toUpperCase().replace(/_/g, ' ') +
                        ' : ' +
                        Ext.util.Format.number(obj.totals[colName], '0,0.00') +
                        ' | ';
                }
            });

            // remove last |
            totalText = totalText.replace(/\| $/, '') + '</b>';

            totalBar.setText(totalText);
        },

        failure: function () {
            Ext.Msg.alert('Error', 'Unable to load grid data');
        }
    });

});
