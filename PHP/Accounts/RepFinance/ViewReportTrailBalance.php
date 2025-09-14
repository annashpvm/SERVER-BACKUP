<html>
<head>
<title>Trail Balance</title>
<link rel="stylesheet" type="text/css" href="/ext-3.4.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="/SHVPM/Accounts/styles.css" />
<script type="text/javascript" src="/ext-3.4.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/ext-3.4.1/ext-all.js"></script>
<script type="text/javascript" src="/SHVPM/Accounts/AccountsMenus.js"></script>

<link rel="stylesheet" type="text/css" href="/ext-3.4.1/examples/ux/css/GroupSummary.css" />
<script type="text/javascript" src="/ext-3.4.1/examples/ux/GroupSummary.js"></script>



<!-- <script   src="http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewTrailBalance.html" ></script>
<iframe src="http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewTrailBalance.html"></iframe>


 <div call-html="http://10.0.0.251/SHVPM/Accounts/ViewReport/RepViewTrailBalance.html"></div> 
-- >
<script>
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};
</script>


 <?php
    require($_SERVER["DOCUMENT_ROOT"]."/SHVPM/Accounts/AccountsMainPage.php");
?>
</head>
<body>

<div w3-include-html="RepViewTrailBalance.html"></div> 

<script>
includeHTML();
</script>


</body>
</html>
