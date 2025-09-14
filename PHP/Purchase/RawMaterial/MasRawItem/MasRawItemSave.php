<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype=$_POST['savetype'];

$itemseq=$_POST['icode'];
$itemname=strtoupper($_POST['itemname']);
$spec=strtoupper($_POST['spec']);
$moisture=$_POST['moisture'];
//$tare=$_POST['tare'];
//$convloss=$_POST['convloss'];
$itemtype=$_POST['itemtype'];
$purledcode=$_POST['purledcode'];
 $grpcode=$_POST['grpcode'];
//$outthrough=$_POST['outthrough'];
//$prohibitive=$_POST['prohibitive'];
$hsncode=$_POST['hsncode'];

 //echo"$GroupName";

if ($savetype == "Add")
{
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
	$query1="insert into masrm_item_header values($itemseq,upper('$itemname'),'$moisture','$spec','$itemtype',$purledcode,$grpcode,'$hsncode',0,0,0,0,0,0)";

	  $result1 = mysql_query($query1);
        }
}
else
{
	$query1="update masrm_item_header  set itmh_name = upper('$itemname') , itmh_moisture_per = '$moisture',  itmh_specification = '$spec', itmh_type = '$itemtype', itmh_hsncode = '$hsncode' , itmh_group = $grpcode where itmh_code = $itemseq";
	  $result1 = mysql_query($query1);

}

if ($savetype == "Add")
{
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
}
else
{
	if ($result1) 
	{
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $itemname . '"})';
	} 
	else
	{
	    mysql_query("ROLLBACK");
	    echo '({"success":"true","msg":"' . $itemname . '"})';

	}
}  
   
?>
