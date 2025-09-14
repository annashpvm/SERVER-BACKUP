<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$compcode = $_POST['compcode'];

mysql_query("BEGIN");
for ($i=0;$i<$rowcnt;$i++)
  {

	$invno = $griddet[$i]['invno'];
	$size  = $griddet[$i]['size'];
        $fromno= $griddet[$i]['fromno'];
	$tono  = $griddet[$i]['tono'];
	$wt    = $griddet[$i]['wt'];

       $query1= "insert into tmp_inv_srno values('$compcode', '$invno', '$size', '2', '$fromno', '$tono', '$wt')";
       $result1=mysql_query($query1);   
    }    
 
   mysql_query("COMMIT"); 
?>
