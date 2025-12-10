<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$isscompcode =$_POST['isscompcode'];
$rowcnt = $_POST['cnt'];
$issfincode =$_REQUEST['issfincode'];

$AEDFlag = $_POST['AEDFlag'];
$seqnoed = $_POST['seqnoed'];

$issdate = $_POST['issdate'];
$issval =$_POST['issval'];
$issunit =$_POST['issunit'];
$isstype ='C';
$issremarks= $_POST['issremarks'];
$usrcode= $_POST['usrcode'];

if ($AEDFlag === "Add")
{

	 $query1 = "select IFNULL(max(issh_seqno),0)+1 as issseqno from trnrm_issue_header";
	 $result1 = mysqli_query($conn, $query1);
	 $rec1 = mysqli_fetch_array($result1);
	 $issseqno=$rec1['issseqno'];

	 $query2 = "select IFNULL(max(issh_no),0)+1 as issh_no from trnrm_issue_header where issh_fincode = '$issfincode' and issh_compcode='$isscompcode'";
	 $result2= mysqli_query($conn, $query2);
	 $rec2 = mysqli_fetch_array($result2);
	 $issh_no=$rec2['issh_no'];

 mysqli_query($conn, "BEGIN");

 if ($issseqno > 0  && $issfincode > 0 && $isscompcode > 0)
 { 

	 $query3= "call sprm_ins_issh ('$issseqno','$isscompcode','$issfincode','$issh_no','$isstype','$issdate','$issval','$issremarks','$issunit','$usrcode',CURDATE())";
	 $result3=mysqli_query($conn, $query3);

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

	 $qry = "select IFNULL(max(isst_seqno),0)+1 as isst_seqno from trnrm_issue_trailer where isst_hdseqno='$issseqno'";
	 $res = mysqli_query($conn, $qry);
	 $rec = mysqli_fetch_array($res);
	 $isst_seqno=$rec['isst_seqno'];

	//13,1,1,2,0,

	 $query4= "call sprm_ins_issue_trailer ('$issseqno','$sno','$lotseq','$itemseq','$cost','$vartype','$issqty','$issrate','$issbgs','$issvalue','$isscompcode',
'$issfincode','$issbillqty','$issbatch','$machine')";
	 $result4=mysqli_query($conn, $query4);      


	 /*$query4= "insert into trnrm_issue_trailer values('$issseqno','$isst_seqno','$lotseq','$itemseq','$cost','$vartype','$issqty','$issrate','$issbgs','$issvalue','$issbillqty','$issbatch','$machine','N')";
	 $result4=mysqli_query($conn, $query4);  */          
  
	}

}
}
else if ($AEDFlag === "Edit")
{
  
 $query5= "call sprm_upd_iss_stock_new ('$seqnoed')";
 $result5=mysqli_query($conn, $query5); 

 $query6= "call sprm_del_issue_trailer ('$seqnoed')";
 $result6=mysqli_query($conn, $query6);

 $query7= "call sprm_upd_issh ('$seqnoed','$isscompcode','$issfincode','$issseqno','$isstype','$issdate','$issval','$issremarks','$issunit','$usrcode')";
 $result7=mysqli_query($conn, $query7); 

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
$issbatch = $griddet[$i]['batseq'];
$machine = $griddet[$i]['mcseq'];

 $qry = "select IFNULL(max(isst_seqno),0)+1 as isst_seqno from trnrm_issue_trailer where isst_hdseqno='$seqnoed '";
 $res = mysqli_query($conn, $qry);
 $rec = mysqli_fetch_array($res);
 $isst_seqno=$rec['isst_seqno'];


//13,1,1,2,0,

 $query8= "call sprm_ins_issue_trailer ('$seqnoed','$isst_seqno','$lotseq','$itemseq','$cost','$vartype','$issqty','$issrate','$issbgs','$issvalue','$isscompcode','$issfincode','$issbillqty','$issbatch','$machine')";
 $result8=mysqli_query($conn, $query8);      


 /*$query4= "insert into trnrm_issue_trailer values('$issseqno','$isst_seqno','$lotseq','$itemseq','$cost','$vartype','$issqty','$issrate','$issbgs','$issvalue','$issbillqty','$issbatch','$machine','N')";
 $result4=mysqli_query($conn, $query4);  */          
  
}
}
//echo '({"success":"true","IssNo":"'.$issseqno.'"})';        
if ($AEDFlag === "Add")
{
	if($result3 && $result4)
	{
	 mysqli_query($conn, "COMMIT");                       
	  echo '({"success":"true","IssNo":"'.$issh_no.'"})';
	}
	else
	       {
		echo '({"success":"false","IssNo":"'.$issh_no.'"})';
		mysqli_rollback($conn);

            
		    
		} 
}
else
{
	if(  $result7 && $result8)
	{
	 mysqli_query($conn, "COMMIT");                       
	  echo '({"success":"true","IssNo":"'.$seqnoed.'"})';
	}
	else
	       {
mysqli_rollback($conn);

       
		echo '({"success":"false","IssNo":"'.$seqnoed.'"})';
		     
		    
		} 
}
  
        

       
 
?>
