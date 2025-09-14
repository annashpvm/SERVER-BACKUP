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
$issunit =$_POST['issunit'];
$isstype ='C';
// $issremarks= $_POST['issremarks'];
$usrcode= $_POST['usrcode'];

if ($AEDFlag === "Add")
{

	 $query1 = "select IFNULL(max(issh_seqno),0)+1 as issseqno from trnrm_issue_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $issseqno=$rec1['issseqno'];

	 $query2 = "select IFNULL(max(issh_no),0)+1 as issh_no from trnrm_issue_header where issh_fincode = '$issfincode' and issh_compcode='$isscompcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $issh_no=$rec2['issh_no'];

 mysql_query("BEGIN");

 if ($issseqno > 0  && $issfincode > 0 && $isscompcode > 0)
 { 

	 $query3= "call sprm_ins_issh ('$issseqno','$isscompcode','$issfincode','$issh_no','$isstype','$issdate','$issval','$usrcode',CURDATE())";
	 $result3=mysql_query($query3);
//echo $query3;
	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	$sno = $i + 1;
	$itemseq = $griddet[$i]['itemseq'];
	$lotseq = $griddet[$i]['lotseq'];
	$cost = "1";
	$vartype = $griddet[$i]['varseq'];
	$issqty = $griddet[$i]['issqty'];
	$issrate = $griddet[$i]['avgrate'];
	$issbgs = $griddet[$i]['issbags'];
	$issvalue = $griddet[$i]['issval'];
	$issbillqty = $griddet[$i]['actiss'];
	$issbatch = $griddet[$i]['batseq'];
	$machine = $griddet[$i]['mcseq'];


	 $query4= "call sprm_ins_issue_trailer ('$isscompcode','$issfincode','$issseqno','$sno','$lotseq','$itemseq','$vartype','$issqty','$issrate','$issvalue')";
	 $result4=mysql_query($query4);      
//echo $query4;
  
	}

}
}
else if ($AEDFlag === "Edit")
{
 mysql_query("BEGIN");  
 $query5= "call sprm_upd_iss_stock ('$seqnoed')";
 $result5=mysql_query($query5); 
//echo $query5;
 $query6= "call sprm_del_issue_trailer ('$seqnoed')";
 $result6=mysql_query($query6);
//echo $query6;

 $query7= "call sprm_upd_issh ('$seqnoed','$isscompcode','$issfincode','$seqnoed','$isstype','$issdate', '$issval','$usrcode')";
 $result7=mysql_query($query7); 
//echo $query7;


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemseq = $griddet[$i]['itemseq'];
$lotseq = $griddet[$i]['lotseq'];
$cost = '1';
$vartype = $griddet[$i]['varseq'];
$issqty = $griddet[$i]['issqty'];
$issrate = $griddet[$i]['avgrate'];
$issbgs = $griddet[$i]['issbags'];
$issvalue = $griddet[$i]['issval'];
$issbillqty = $griddet[$i]['actiss'];

	 $query8= "call sprm_ins_issue_trailer ('$isscompcode','$issfincode','$seqnoed','$sno','$lotseq','$itemseq','$vartype','$issqty','$issrate','$issvalue')";
        $result8=mysql_query($query8);   

//echo $query8;
  
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
