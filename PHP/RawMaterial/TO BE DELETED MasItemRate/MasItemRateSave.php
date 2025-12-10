<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid=$_POST['finid'];
$itemcode=$_POST['itemcode'];
$partycode=$_POST['partycode'];
$itemrate=$_POST['itemrate'];
$chkrate=$_POST['chkrate'];

mysqli_query($conn, "BEGIN");
if ($chkrate == 0) {
	$query1 = "select ifnull(max(pitr_seqno),0)+1 as pitr_seqno from masrm_party_itemrate";
	$result1 = mysqli_query($conn, $query1);
	$rec = mysqli_fetch_array($result1);
	$pitr_seqno=$rec['pitr_seqno'];

	$query2="call sprm_ins_partyitemrate ('$pitr_seqno','$itemcode','$partycode','$itemrate')";
  	$result2 = mysqli_query($conn, $query2);

}
else{
	$query3="call sprm_upd_partyitemrate ('$chkrate','$itemrate')";
  	$result3 = mysqli_query($conn, $query3);
	mysqli_begin_transaction($conn);
}


if ($chkrate == 0) {

	if ($result2){
    		mysqli_begin_transaction($conn);
    		echo '({"success":"true","msg":"' . $itemcode . '"})';
	}
	else{
		mysqli_rollback($conn);


		echo '({"success":"false","msg":"' . $itemcode . '"})';
	}
} 
else {
	if ($result3){
    		mysqli_begin_transaction($conn);
    		echo '({"success":"true","msg":"' . $chkrate . '"})';
	}
	else{
		mysqli_rollback($conn);


		echo '({"success":"false","msg":"' . $chkrate . '"})';
	}
}
  
   
?>
