<html>
<head>
<title>MODULES LIST</title>
<link rel="stylesheet" type="text/css" href="../ext-3.4.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="styles.css" />
<script type="text/javascript" src="../ext-3.4.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../ext-3.4.1/ext-all.js"></script>
<script type="text/javascript" src="/ext-3.4.1/examples/ux/MultiSelect.js"></script>
<script type="text/javascript" src="/ext-3.4.1/examples/ux/ItemSelector.js"></script>
<script type="text/javascript" src="/SHVPM/ModulelistNew.js"></script>
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
<!-- <table align="center"><tr><td><img src="../Pictures/modlogo.png" ></td></tr></table> !-->
</head>
<body>
    <body bgcolor="black">
 <div id="Grp-form" ></div>
</body>
</html>

