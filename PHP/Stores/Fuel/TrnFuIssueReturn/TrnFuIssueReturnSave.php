<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$issretcompcode =$_POST['isscompcode'];
$issretfincode =$_REQUEST['issfincode'];
$gstflag = $_POST['gstflag'];
$rowcnt = $_POST['cnt'];

$issretno = $_POST['issretno'];

$SeqNo = $_POST['seqnoed'];

$issretdate = $_POST['issretdate'];
$issretval =$_POST['issretval'];

$issretremarks= $_POST['issretremarks'];
$usrcode= $_POST['usrcode'];

$issreted;

if ($gstflag === "Add") {

 $query1 = "select IFNULL(max(isrh_seqno),0)+1 as issretseqno from trnfu_issret_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $issreted=$rec1['issretseqno'];

 $query2 = "select IFNULL(max(isrh_no),0)+1 as isrh_no from trnfu_issret_header where isrh_fincode = '$issretfincode' and isrh_compcode='$issretcompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $isrh_no=$rec2['isrh_no'];

 mysql_query("BEGIN");

// if ($issretseqno > 0  && $issretfincode > 0 && $issretcompcode>0)
 //{ 

$query3 ="call spfu_ins_issret_header('$issreted','$issretcompcode','$issretfincode','$isrh_no','$issretdate','$issretval','$issretremarks','$usrcode',CURDATE())";

//echo $query3;
//echo "<br>";

 $result3=mysql_query($query3);
}
else if ($gstflag === "Edit"){
	$query5 ="call spfu_upd_issret_stock('$SeqNo')";
	$result5=mysql_query($query5);

//echo $query5;
//echo "<br>";

	$query6 ="call spfu_del_issret_trailer('$SeqNo')";
	$result6=mysql_query($query6);

//echo $query6;
//echo "<br>";

	$query7 ="call spfu_upd_issret_header('$SeqNo','$issretcompcode','$issretfincode','$issretno','$issretdate','$issretval','$issretremarks','$usrcode')";
	$result7=mysql_query($query7);
	$issreted = $SeqNo;

//echo $query7;
//echo "<br>";

}
$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$lotno = $griddet[$i]['lotno'];
$itemname = $griddet[$i]['itemname'];
$issretqty = $griddet[$i]['retqty'];
$issretval = $griddet[$i]['retval'];

$itemseq = $griddet[$i]['itemseq'];
$stock = $griddet[$i]['stock'];
$avgrate = $griddet[$i]['avgrate'];


     
 $query4= "call spfu_ins_issret_trailer('$issreted','$sno','$itemseq','$issretqty','$avgrate','$issretval', '$issretcompcode','$issretfincode')";
 $result4=mysql_query($query4);            

//echo $query4;
//echo "<br>";
  
}

//}
//echo '({"success":"true","IssNo":"'.$issretseqno.'"})'; 
if ($gstflag === "Add") {       
	if($result3 && $result4)
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","IssRetNo":"'.$isrh_no.'"})';
	}
	else
	{
		echo '({"success":"false","IssRetNo":"'.$isrh_no.'"})';
		mysql_query("ROLLBACK");            
	}  
} 
else if ($gstflag === "Edit") {
	if($result5 && $result6 && $result7 && $result4)
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","IssRetNo":"'.$issretno.'"})';
	}
	else
	{
		echo '({"success":"false","IssRetNo":"'.$issretno.'"})';
		mysql_query("ROLLBACK");            
	}  
}
        

       
 
?>
