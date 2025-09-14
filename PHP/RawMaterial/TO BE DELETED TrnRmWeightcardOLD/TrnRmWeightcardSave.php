<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
 $wtdate=$_POST['wtdate'];
 $supplier=$_POST['supplier'];
 $area=$_POST['area'];
 $itemgrp=$_POST['itemgrp'];
 $supervisor=$_POST['supervisor'];
 $transport=$_POST['transport'];
 $wbcardno=$_POST['wbcardno'];
 $grosswt=$_POST['grosswt'];
 $netwt=$_POST['netwt'];								
 $tarewt=$_POST['tarewt'];
 $userid= (int)$_POST['$userid'];
 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];
 $gstFlag = $_POST['gstFlag'];

 $edwtno = $_POST['edwtno'];
 $wtno = $_POST['wtno'];



$vehicleno = str_replace(" ","",$_POST['vehicleno']);
$vehicleno = str_replace("  ","",$vehicleno );
$vehicleno = str_replace("   ","",$vehicleno);
$vehicleno = str_replace("-","",$vehicleno);



  $unloadingtime = $_POST['unloadingtime'];
if ($gstFlag === "Add") {

$query = "select ifnull(max(wc_seqno),0)+1 as wcseq from trn_weightcard";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$edwtno=$rec['wcseq'];

$qrywcno = "select ifnull(max(wc_no),0)+1 as wcno from trn_weightcard where wc_fincode = $finid and wc_compcode ='$compcode' ";
$reswcno = mysql_query($qrywcno);
$recwcno = mysql_fetch_array($reswcno);
$wcno=$recwcno['wcno'];

$query1="call sp_ins_weightcard ('$edwtno','$compcode','$finid','$wcno','$wtdate','$unloadingtime', '$area','$supplier','$itemgrp','$supervisor',UPPER('$vehicleno'),'$transport','$wbcardno', '$grosswt','$tarewt','$netwt','N',
'$userid','$wtdate')";

//echo $query1;
$result1 = mysql_query($query1);

}
else if ($gstFlag === "Edit") {

$query2="call sp_upd_weightcard ('$edwtno','$wtdate' , '$unloadingtime','$area','$supplier','$itemgrp','$supervisor',UPPER('$vehicleno'),'$transport','$wbcardno','$grosswt','$tarewt','$netwt','N',
'$userid','$wtdate')";

$result2 = mysql_query($query2);
}

if ($gstFlag === "Add") {

  if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","wtno":"' . $wtno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","wtno":"' . $wtno . '"})';
}
  
 }
else  if ($gstFlag === "Edit"){  
  if ($result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","wtno":"' . $wtno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","wtno":"' . $wtno . '"})';
}
}
?>
