<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet  = json_decode($_POST['griddet'],true);
$compcode = $_POST['compcode'];
$rowcnt   = $_POST['cnt'];
$compcode = $_REQUEST['compcode'];
$fincode  = $_REQUEST['fincode'];
$seqno    = $_POST['entno'];
$supcode  = $_POST['supcode'];
$entdate  = $_POST['entdate'];
$usrcode  = $_POST['usrcode'];
$AEDFlag  = $_POST['AEDFlag'];



mysql_query("BEGIN");
if ($AEDFlag === "Add")
{

	 $query1 = "select ifnull(max(rm_rate_seqno),0) + 1 as seqno from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode ='$fincode'";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $seqno=$rec1['seqno'];
}
else
{

	 $query1 = "delete from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode ='$fincode' and rm_rate_seqno = $seqno";
	 $result1 = mysql_query($query1);
}

 	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	 $sno = $i + 1;
	 $itemcode = $griddet[$i]['itemcode'];
	 $rate     = (float) $griddet[$i]['rate'];
	 $moisture = (float) $griddet[$i]['moisture'];
	 $areacode = $griddet[$i]['areacode'];

	 $query2= "insert into masrm_supplier_rate
(rm_rate_compcode, rm_rate_fincode, rm_rate_seqno, rm_rate_date, rm_rate_supcode, rm_rate_itemcode, rm_rate_areacode, rm_rate_rate, rm_rate_mois, rm_rate_entered_by, rm_rate_verified_by)
 values($compcode, $fincode, $seqno, '$entdate', $supcode, $itemcode,$areacode, $rate, $moisture, $usrcode, $usrcode)";
	 $result2=mysql_query($query2);
//echo $query1;  
	}

if ($AEDFlag === "Add")
{
	if($result2)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","EntryNo":"'.$seqno.'"})';
	}
	else
	{
	   echo '({"success":"false","EntryNo":"'.$seqno.'"})';
	    mysql_query("ROLLBACK");            
	} 
}
else
{
	if(  $result1 && $result2)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","EntryNo":"'.$seqno.'"})';
	}
	else
	{
           mysql_query("ROLLBACK");       
	   echo '({"success":"false","EntryNo":"'.$seqno.'"})';
	} 
}
  
        

       
 
?>
