<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title></title>
    
    <style type="text/css">
        .report
        {
            background:url(img/pie-chart.png) 0 no-repeat !important;
        }
        .dataset
        {
            background:url(img/table.png) 0 no-repeat !important;
        }	
        .datasource
        {
            background:url(img/data.png) 0 no-repeat !important;
        }	
	</style>
        <link rel="stylesheet" type="text/css" href="/ext-3.4.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="/ext-3.4.1/examples/shared/examples.css" />
        <script type="text/javascript" src="/ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="/ext-3.4.1/ext-all.js"></script>

    <script type="text/javascript">

        Ext.BLANK_IMAGE_URL = '/ext-3.4.1/images/default/s.gif';
        Ext.QuickTips.init();

        Ext.onReady(function() {

            var tree = new Ext.tree.TreePanel({
                renderTo: Ext.getBody(),
                title: 'Reporting Project',
                width: 200,
                height: 250,
                userArrows: true,
                animate: true,
                autoScroll: true,
        	dataUrl: '/YarnBarcode/TreePanel/tree-nodes.php',
                root: {
                    nodeType: 'async',
                    text: 'Root Node'
                },
                listeners: {
                    render: function() {
                        this.getRootNode().expand();
                    }
                }
            })

        });
    
    </script>

</head>
<body style="padding: 20px;">
</body>
</html>
