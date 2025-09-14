<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>LOGIN</title>

        <link rel="stylesheet" type="text/css" href="../ext-3.4.1/resources/css/ext-all.css" />
 <link rel="stylesheet" type="text/css" href="/DPM/styles.css" /> 
        <script type="text/javascript" src="../ext-3.4.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../ext-3.4.1/ext-all.js"></script>
        <script type="text/javascript" src="Userlogin.js"></script>
<style> 
body {
  background-image: url("Login.jpg");

  background-color: #cccccc;
  background-attachment: fixed;
  background-size: 100%;
  
}
</style>


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
       <!-- <table align="center"><tr><td><img src="/Pictures/dpmbg.jpg";position=fixed; ></td></tr></table> !-->






</head>
    </head>
    <body >

    </body>
</html>
