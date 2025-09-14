<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
 $savetype   = $_POST['savetype'];
 $AreaGroup  = strtoupper($_POST['AreaGroup']);
 $oldareagrp = $_POST['areagrpcode'];


if ($savetype  ==  "Add")
{
	$query = "select ifnull(max(areagrp_code),0)+1 as areaseq from mas_areagroup";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$areaseq=$rec['areaseq'];

	$qry = "select count(*) as cnt from mas_areagroup where areagrp_name = '$AreaGroup'";
	$res = mysql_query($qry);
	$reclot = mysql_fetch_array($res);
	$cnt=$reclot['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_areagroup values('$areaseq','$AreaGroup')";
	  $result1 = mysql_query($query1);
	}
}
else
{
	  $query1="update mas_areagroup set areagrp_name='$AreaGroup' where areagrp_code=$oldareagrp";
	  $result1 = mysql_query($query1);
          $cnt=0;


}
  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $AreaGroup . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $AreaGroup . '"})';
}
  
   
?>
