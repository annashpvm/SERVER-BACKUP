<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$isscompcode =$_POST['isscompcode'];
$rowcnt = $_POST['cnt'];
$issfincode =$_REQUEST['issfincode'];
$isspno =$_POST['isspno'];
$AEDFlag = $_POST['AEDFlag'];
$seqnoed = $_POST['seqnoed'];

$issdate = $_POST['issdate'];
$issval =$_POST['issval'];

$isstype ='C';
// $issremarks= $_POST['issremarks'];
$usrcode= $_POST['usrcode'];

if ($AEDFlag === "Add")
{

	 $query1 = "select IFNULL(max(issh_seqno),0)+1 as issseqno from trnfu_issue_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $issseqno=$rec1['issseqno'];

	 $query2 = "select IFNULL(max(issh_no),0)+1 as issh_no from trnfu_issue_header where issh_fincode = '$issfincode' and issh_compcode='$isscompcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $issh_no=$rec2['issh_no'];

 mysql_query("BEGIN");

 if ($issseqno > 0  && $issfincode > 0 && $isscompcode > 0)
 { 

	 $query3= "call spfu_ins_issue_header ('$issseqno','$isscompcode','$issfincode','$issh_no','$issdate','$issval','$usrcode',CURDATE())";
	 $result3=mysql_query($query3);
//echo $query3;
	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	$sno = $i + 1;
	$itemseq = $griddet[$i]['itemseq'];
	$cost = "1";
$itemtype = $griddet[$i]['itemtype'];
	$issqty = $griddet[$i]['issqty'];
	$issrate = $griddet[$i]['avgrate'];

	$issvalue = $griddet[$i]['issval'];


	 $query4= "call spfu_ins_issue_trailer ('$isscompcode','$issfincode','$issseqno','$sno','$itemseq','$issqty','$issrate','$issvalue','$itemtype')";
	 $result4=mysql_query($query4);      

//echo $query4;
//  echo "<br>";


	}

}
}
else if ($AEDFlag === "Edit")
{
 mysql_query("BEGIN");  
 $query5= "call spfu_upd_issue_stock ('$seqnoed')";
 $result5=mysql_query($query5); 
//echo $query5;
 $query6= "call spfu_del_issue_trailer ('$seqnoed')";
 $result6=mysql_query($query6);
//echo $query6;

 $query7= "call spfu_upd_issue_header ('$seqnoed','$isscompcode','$issfincode','$seqnoed','$issdate', '$issval','$usrcode')";
 $result7=mysql_query($query7); 
//echo $query7;


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemseq = $griddet[$i]['itemseq'];
$itemtype = $griddet[$i]['itemtype'];

$lotseq = $griddet[$i]['lotseq'];
$cost = '1';
$vartype = $griddet[$i]['varseq'];
$issqty = $griddet[$i]['issqty'];
$issrate = $griddet[$i]['avgrate'];

$issvalue = $griddet[$i]['issval'];
$issbillqty = $griddet[$i]['actiss'];

	 $query8= "call spfu_ins_issue_trailer ('$isscompcode','$issfincode','$seqnoed','$sno','$itemseq','$issqty','$issrate','$issvalue','$itemtype')";
        $result8=mysql_query($query8);   

//echo $query8;
//echo "<br>";
  
}
}
//echo '({"success":"true","IssNo":"'.$issseqno.'"})';        
if ($AEDFlag === "Add")
{
	if($result3 && $result4)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","IssNo":"'.$issh_no.'"})';
	}
	else
	       {
		echo '({"success":"false","IssNo":"'.$issh_no.'"})';
		mysql_query("ROLLBACK");            
		    
		} 
}
else
{
	if(  $result7 && $result8)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","IssNo":"'.$isspno.'"})';
	}
	else
	       {
mysql_query("ROLLBACK");       
		echo '({"success":"false","IssNo":"'.$isspno.'"})';
		     
		    
		} 
}
  
        

       
 
?>
