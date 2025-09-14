<html>
    <head>
        <title>Bank Reconciliation</title>
        <link rel="stylesheet" type="text/css" href="/ext-3.4.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="/ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="/ext-3.4.1/ext-all.js"></script>
        <link rel="stylesheet" type="text/css" href="/Bank_Reconciliation/styles.css" />
        <link rel="icon" href="/Pictures/favicon.ico" type="image/x-icon">
        <script type="text/javascript" src="/ext-3.4.1/examples/ux/MultiSelect.js"></script>
        <script type="text/javascript" src="/ext-3.4.1/examples/ux/ItemSelector.js"></script>
        <script type="text/javascript" src="/Bank_Reconciliation/Login/Login.js"></script>
        <script type = "text/javascript">

            function changeHashOnLoad() {
                window.location.href += '#';
                setTimeout('changeHashAgain()', '50');
            }
            function changeHashAgain() {
                window.location.href += '1';
            }
            var storedHash = window.location.hash;
            window.setInterval(function () {
                if (window.location.hash != storedHash) {

                    window.location.hash = storedHash;
                }
            }, 50);
            window.onload = changeHashOnLoad;
        </script>        
    </head> 
        
<body background="/Bank_Reconciliation/Pictures/bank1.jpg">
        <div class="centerDiv"></div>
        <div id="container" width="150">
            <div id="toolbar" width="150"></div>
        </div>

    </body>
</html>
