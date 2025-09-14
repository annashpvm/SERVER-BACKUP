<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet = json_decode($_POST['griddet'],true);
$retcompcode =$_POST['compcode'];
$rowcnt = $_POST['cnt'];
$retfincode =$_REQUEST['fincode'];
$retdate = $_POST['retdate'];
$retval =$_POST['retval'];

$usrcode= $_POST['usrcode'];


 $query1 = "select IFNULL(max(isrh_seqno),0)+1 as issretseqno from trnrm_issret_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $issretseqno=$rec1['issretseqno'];

 $query2 = "select IFNULL(max(isrh_no),0)+1 as issretno from trnrm_issret_header where isrh_fincode = '$retfincode' and isrh_compcode='$retcompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $issretno=$rec2['issretno'];

 mysql_query("BEGIN");

 if ($issretseqno > 0  && $retfincode > 0 && $retcompcode > 0)
 { 

 $query3= " call sprm_ins_issret_header ('$issretseqno','$retcompcode','$retfincode','$issretno','$retdate','$retval','$retunit','$usrcode',CURDATE())";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemseq = $griddet[$i]['itemseq'];
$lotseq = $griddet[$i]['lotseq'];
$cost = '1';
$vartype = 'Y';
$retqty = $griddet[$i]['retqty'];
$retrate = $griddet[$i]['avgrate'];
$retbags = $griddet[$i]['retbags'];
$retval = $griddet[$i]['retval'];
$billqty = $griddet[$i]['actqty'];
     
 $qry = "select IFNULL(max(isrt_seqno),0)+1 as isrt_seqno from trnrm_issret_trailer where isrt_hdseqno='$issretseqno'";
 $res = mysql_query($qry);
 $rec = mysql_fetch_array($res);
 $isrt_seqno=$rec['isrt_seqno'];


isrt_hdseqno, isrt_seqno, isrt_varty, isrt_itemcode, isrt_qty, isrt_rate, isrt_values

 $query4= " call sprm_ins_issret_trailer_new ('$issretseqno','$isrt_seqno','$vartype','$itemseq','$retqty','$retrate''$retval',
'$retcompcode','$retfincode')";
 $result4=mysql_query($query4);            
  
}

}
//echo '({"success":"true","IssNo":"'.$issseqno.'"})';        
if($result3 && $result4)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","IssRetNo":"'.$issretno.'"})';
}
else
       {
	echo '({"success":"false","IssRetNo":"'.$billqty.'"})';
	mysql_query("ROLLBACK");            
            
        }     
 
?>
