<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Financials System</title>
        <link rel="stylesheet" type="text/css" href="../ext-3.4.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="/SHVPM/Financials/styles.css" />
        <script type="text/javascript" src="../ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../ext-3.4.1/ext-all.js"></script>
        <script type="text/javascript" src="financialslogin.js"></script>
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
            window.onload= changeHashOnLoad;
        </script>

    </head>
    <body bgcolor="#C5C5C5">
    </body>
</html>
