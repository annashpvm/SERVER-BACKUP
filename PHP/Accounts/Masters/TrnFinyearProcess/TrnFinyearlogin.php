<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Password</title>
        <link rel="stylesheet" type="text/css" href="/ext-3.4.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="/styles.css" />
        <script type="text/javascript" src="/ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="/ext-3.4.1/ext-all.js"></script>
        <script type="text/javascript" src="TrnFinyearlogin.js"></script>
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
        <table align="center"><tr><td><img/Pictures/IP.png" ></td></tr></table>
<table align="right"><tr><td><img src="/Pictures/new.png" width="200" height="60">&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>
<table>&nbsp;&nbsp;
<tr>
    &nbsp;&nbsp;<td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="/Pictures/news.png" width="580" height="430"></td>
<td>
</head>
    </head>
    <body bgcolor="#C5C5C5">

    </body>
</html>
