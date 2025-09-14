<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $agentname=strtoupper($_POST['agentname']);

$query = "select ifnull(max(sagt_code),0)+1 as sagt_code from mas_supagent";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$agtseq=$rec['sagt_code'];

$qry = "select count(*) as cnt from mas_supagent where sagt_name = '$agentname'";
$resag = mysql_query($qry);
$recagent = mysql_fetch_array($resag);
$cnt=$recagent['cnt'];

if($cnt==0)
{
  $query1="insert into mas_supagent values('$agtseq','$agentname')";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $agentname . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $agentname . '"})';
}
  
   
?>
