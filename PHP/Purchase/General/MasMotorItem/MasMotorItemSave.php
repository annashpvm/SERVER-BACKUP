<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$itemname=strtoupper($_POST['itemname']);
$spec=strtoupper($_POST['spec']);
$moisture=$_POST['moisture'];
$tare=$_POST['tare'];
$convloss=$_POST['convloss'];
$itemtype=$_POST['itemtype'];
$purledcode=$_POST['purledcode'];
 $grpcode=$_POST['grpcode'];
$outthrough=$_POST['outthrough'];
$prohibitive=$_POST['prohibitive'];
$hsncode=$_POST['hsncode'];

 //echo"$GroupName";
$query = "select ifnull(max(itmh_code),0)+1 as itemseq from masrm_item_header";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$itemseq=$rec['itemseq'];

$qry = "select count(*) as cnt from masrm_item_header where itmh_name = '$itemname'";
$resitem = mysql_query($qry);
$recitem = mysql_fetch_array($resitem);
$cnt=$recitem['cnt'];

if($cnt==0)
{
$query1="insert into masrm_item_header values($itemseq,'$itemname','$moisture','$tare','$convloss','$spec',0,$purledcode,$grpcode,'$outthrough','$prohibitive','$hsncode')";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $itemname . '"})';
} 
else if ($cnt>0)
{
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';

}
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $itemname . '"})';
}
  
   
?>
