<!DOCTYPE html>
<html>
<head>
<title>BANK RECEIPT AND ADJUSTMENT DETAILS</title>

<?php include($_SERVER["DOCUMENT_ROOT"]."/SHVPM/Accounts/Test/ext_loader.php"); ?>

<script>
Ext.onReady(function () {

    // safety check
    if (!Ext.ux || !Ext.ux.grid || !Ext.ux.grid.GroupSummary) {
        alert("GroupSummary NOT loaded");
        return;
    }

    var store = new Ext.data.GroupingStore({
        reader: new Ext.data.ArrayReader({}, [
            {name:'heading'},
            {name:'amount', type:'float'}
        ]),
        data: [
            ['A',100],
            ['A',200],
            ['B',300]
        ],
        groupField:'heading'
    });

    new Ext.grid.GridPanel({
        renderTo: 'gridDiv',
        width: 400,
        height: 300,
        store: store,
        plugins: [ new Ext.ux.grid.GroupSummary() ],
        columns: [
            {header:'Group', dataIndex:'heading'},
            {header:'Amount', dataIndex:'amount', summaryType:'sum'}
        ],
        view: new Ext.grid.GroupingView({
            hideGroupedColumn:true
        })
    });
});
</script>

</head>

<body>

<?php
require($_SERVER["DOCUMENT_ROOT"]."/SHVPM/Accounts/AccountsMainPage.php");
?>

<div id="gridDiv"></div>

</body>
</html>
