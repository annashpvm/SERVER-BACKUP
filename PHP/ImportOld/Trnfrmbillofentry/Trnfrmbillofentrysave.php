<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$isscompcode =$_POST['isscompcode'];
$rowcnt = $_POST['cnt'];
$issfincode =$_REQUEST['issfincode'];

$issdate = $_POST['issdate'];
$issval =$_POST['issval'];
$issunit =$_POST['issunit'];
$isstype ='Y';
$issremarks= $_POST['issremarks'];
$usrcode= $_POST['usrcode'];

 $query1 = "select IFNULL(max(issh_seqno),0)+1 as issseqno from trnrm_issue_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $issseqno=$rec1['issseqno'];

 $query2 = "select IFNULL(max(issh_no),0)+1 as issh_no from trnrm_issue_header where issh_fincode = $issfincode and issh_compcode='$isscompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $issh_no=$rec2['issh_no'];

 mysql_query("BEGIN");

 if ($issseqno > 0  && $issfincode > 0 && $isscompcode>0)
 { 
 $query3= "insert into trnrm_issue_header values('$issseqno','$isscompcode','$issfincode','$issh_no','$isstype','$issdate','$issval','$issremarks','$issunit','$usrcode','$issdate')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemseq = $griddet[$i]['itemseq'];
$lotseq = $griddet[$i]['lotseq'];
$cost = '0';
$vartype = 'Y';
$issqty = $griddet[$i]['issqty'];
$issrate = $griddet[$i]['avgrate'];
$issbgs = $griddet[$i]['issbags'];
$issvalue = $griddet[$i]['issval'];
$issbillqty = '0';
$issbatch = $griddet[$i]['batseq'];
$machine = $griddet[$i]['mcseq'];
     
 $qry = "select IFNULL(max(isst_seqno),0)+1 as isst_seqno from trnrm_issue_trailer where isst_hdseqno='$issseqno'";
 $res = mysql_query($qry);
 $rec = mysql_fetch_array($res);
 $isst_seqno=$rec['isst_seqno'];

 $query4= "insert into trnrm_issue_trailer values('$issseqno','$isst_seqno','$lotseq','$itemseq','$cost','$vartype','$issqty','$issrate','$issbgs','$issvalue','$issbillqty','$issbatch','$machine')";
 $result4=mysql_query($query4);            
  
}

}
//echo '({"success":"true","IssNo":"'.$issseqno.'"})';        
if($result3 && $result4)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","IssNo":"'.$issh_no.'"})';
}
else
       {
	echo '({"success":"false","IssNo":"'.$machine.'"})';
	mysql_query("ROLLBACK");            
            
        }   
        

       
 
?>
