<html>
    <head>
        <title>Bank Reconciliation</title>
        <link rel="stylesheet" type="text/css" href="/ext-3.4.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="/Bank_Reconciliation/styles.css" />
        <script type="text/javascript" src="/ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="/ext-3.4.1/ext-all.js"></script>

        <script type="text/javascript" src="Login.js"></script>
        <script type = "text/javascript" >

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
    <body background="/HRD/Pictures/roundblue.jpg">
        <div class="centerDiv"></div>
        <div id="container">
            <div id="toolbar"></div>
        </div>
    </body>
</html>

