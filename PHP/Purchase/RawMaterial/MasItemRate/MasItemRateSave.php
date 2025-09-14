<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid=$_POST['finid'];
$itemcode=$_POST['itemcode'];
$partycode=$_POST['partycode'];
$itemrate=$_POST['itemrate'];
$chkrate=$_POST['chkrate'];

mysql_query("BEGIN");
if ($chkrate == 0) {
	$query1 = "select ifnull(max(pitr_seqno),0)+1 as pitr_seqno from masrm_party_itemrate";
	$result1 = mysql_query($query1);
	$rec = mysql_fetch_array($result1);
	$pitr_seqno=$rec['pitr_seqno'];

	$query2="call sprm_ins_partyitemrate ('$pitr_seqno','$itemcode','$partycode','$itemrate')";
  	$result2 = mysql_query($query2);

}
else{
	$query3="call sprm_upd_partyitemrate ('$chkrate','$itemrate')";
  	$result3 = mysql_query($query3);
	mysql_query("COMMIT");
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
