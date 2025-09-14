<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid=$_POST['finid'];
$itemcode=$_POST['itemcode'];
$partycode=$_POST['partycode'];
$areacode = $_POST['areacode'];
$lorryitemrate=$_POST['lorryitemrate'];
$tipperitemrate=$_POST['tipperitemrate'];
$chkrate=$_POST['chkrate'];

mysql_query("BEGIN");
if ($chkrate == 0) {
	$query1 = "select ifnull(max(aif_seqno),0)+1 as aif_seqno from mas_areaitemfreight";
	$result1 = mysql_query($query1);
	$rec = mysql_fetch_array($result1);
	$aif_seqno=$rec['aif_seqno'];

	$query2="call sp_ins_tonfreight ('$aif_seqno','$partycode','$areacode','1','$itemcode','$lorryitemrate','$tipperitemrate')";
  	$result2 = mysql_query($query2);

}
else{
	$query3="call sp_upd_tonfreight ('$chkrate','$lorryitemrate','$tipperitemrate')";
  	$result3 = mysql_query($query3);
	
}


if ($chkrate == 0) {

	if ($result2){
    		mysql_query("COMMIT");
    		echo '({"success":"true","msg":"' . $itemcode . '"})';
	}
	else{
		mysql_query("ROLLBACK");
		echo '({"success":"false","msg":"' . $itemcode . '"})';
	}
} 
else {
	if ($result3){
    		mysql_query("COMMIT");
    		echo '({"success":"true","msg":"' . $chkrate . '"})';
	}
	else{
		mysql_query("ROLLBACK");
		echo '({"success":"false","msg":"' . $chkrate . '"})';
	}
}
  
   
?>
