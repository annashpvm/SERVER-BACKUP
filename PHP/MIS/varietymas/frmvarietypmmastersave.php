<?php
require($_SERVER["DOCUMENT_ROOT"]."/conn.php");
session_start();


$varietymasname  = strtoupper($_POST['varietymasname']);
$varietymasdecklewidth  = $_POST['varietymasdecklewidth'];
$varietymasmacspeed  = $_POST['varietymasmacspeed'];
$varietymaspowerreq  = $_POST['varietymaspowerreq'];
$varietymasstreamreq  = $_POST['varietymasstreamreq'];
$varietymasdesc  = $_POST['varietymasdesc'];


	  $query1="update masprd_variety set var_decklewidth=$varietymasdecklewidth, var_machspeed=$varietymasmacspeed ,    var_power_req=$varietymaspowerreq,var_stream_req=$varietymasstreamreq,var_desc='$varietymasdesc'     where var_name ='$varietymasname'";
	  $result1 = mysql_query($query1);
	  
	  if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $varietymasname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $varietymasname . '"})';
	   }
     
   
?>
