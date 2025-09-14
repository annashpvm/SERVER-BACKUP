<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid=$_POST['finid'];
$partycode=$_POST['partycode'];
$areacode = $_POST['areacode'];
$lorryitemrate=$_POST['lorryitemrate'];
$lorry10wrate=$_POST['lorry10wrate'];
$lorry12wrate=$_POST['lorry12wrate'];
$tipperitemrate=$_POST['tipperitemrate'];
$chkrate=$_POST['chkrate'];

mysql_query("BEGIN");
if ($chkrate == 0) {
	$query1 = "select ifnull(max(arf_seqno),0)+1 as arf_seqno from mas_areafreight";
	$result1 = mysql_query($query1);
	$rec = mysql_fetch_array($result1);
	$arf_seqno=$rec['arf_seqno'];

//	$query2="call sp_ins_loadfreight ('$arf_seqno','$partycode','$areacode','1','$lorryitemrate','0','0','0')";
	$query2="call sp_ins_loadfreight ('$arf_seqno','$partycode','$areacode','1','$lorryitemrate','0','0','0')";
  	$result2 = mysql_query($query2);

}
else{
	$query3="call sp_upd_loadfreight ('$chkrate','$lorryitemrate','0','0','0')";
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
