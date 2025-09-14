<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$prdhseqno      = $_POST['prdhseqno'];  
$savetype       = $_POST['savetype'];  
$prdhcompcode   = $_POST['prdhcompcode'];
$prdhfincode    = $_POST['prdhfincode'];
$prdhdate       = $_POST['prdhdate'];
$prdhshift      = $_POST['prdhshift'];
$prhdtotdownmins= (int)$_POST['prhdtotdownmins'];
$prdhspvrcode   = $_POST['prdhspvrcode'];
$prdhoperator   = $_POST['prdhoperator'];

$downtype       = $_POST['downtype'];


$prdhppno       = 0;
$prdhavlmins    = 0;
$prdhrunmins    = 0;


$rowcnt_downtime  = $_POST['cntdowntime'];
$griddet_downtime = json_decode($_POST['griddet_downtime'],true);

//$rowcnt_roll  = $_POST['cntRoll'];
//$griddet_roll = json_decode($_POST['griddet_roll'],true);

if ($savetype === "Add" && $downtype === "SHUT")
{
	 $query1 = "select IFNULL(max(prdh_id),0)+1 as prodseqno from trn_dayprod_header where prdh_compcode = $prdhcompcode and  prdh_fincode  = $prdhfincode";
//echo $query1;
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $prdhseqno=$rec1['prodseqno'];

	 $query2 = "call spprod_ins_header ('$prdhseqno','$prdhcompcode','$prdhfincode', '$prdhdate', '$prdhshift','$prdhspvrcode', '$prdhoperator', '$prdhppno', '$prdhavlmins', '$prdhrunmins','$prhdtotdownmins','0','0', '0', '0', '0', '0','0')";

//echo $query2;
 
	  $result2=mysql_query($query2);

}


if ($savetype === "Edit")
{
  
       $query1 = "delete from trn_dayprod_downtime where prds_id = $prdhseqno and  prds_fincode = $prdhfincode and prds_compcode = $prdhcompcode";
       $result1=mysql_query($query1);  
// echo $query1;
}

$inscnt = 0;
for ($i=0;$i<$rowcnt_downtime;$i++)
{
        $inscnt = $inscnt+1;
	$qlycode   = $griddet_downtime[$i]['qlycode'];
	$deptcode  = $griddet_downtime[$i]['deptcode'];
	$seccode   = $griddet_downtime[$i]['seccode'];
	$fromtime  = strtotime($griddet_downtime[$i]['fromtime']);
	$totime    = strtotime($griddet_downtime[$i]['totime']);
	$fromtime  = date('Y-m-d H:i',$fromtime);
	$totime    = date('Y-m-d H:i',$totime); //$griddet_downtime[$i]['totime'];
	$downmins  = $griddet_downtime[$i]['downmins'];

	$reason    = strtoupper($griddet_downtime[$i]['reason']);
	$rootcause    = strtoupper($griddet_downtime[$i]['rootcause']);
	$actiontaken  = strtoupper($griddet_downtime[$i]['actiontaken']);
	$correctiveaction = strtoupper($griddet_downtime[$i]['correctiveaction']);


         $reason=str_replace("'","",$reason);
         $reason=str_replace('"','',$reason);


         $rootcause=str_replace("'","",$rootcause);
         $rootcause=str_replace('"','',$rootcause);


         $actiontaken=str_replace("'","",$actiontaken);
         $actiontaken=str_replace('"','',$actiontaken);


         $correctiveaction=str_replace("'","",$correctiveaction);
         $correctiveaction=str_replace('"','',$correctiveaction);


        $query1 = "call spprod_ins_downtime ('$prdhseqno','$prdhcompcode', '$prdhfincode', '$qlycode' , '$deptcode', '$seccode', $inscnt, '$fromtime', '$totime', '$downmins','$reason','$rootcause', '$actiontaken', '$correctiveaction')";
	$result1=mysql_query($query1);



// echo $query1;            
//echo "<br>";
	  
}


if ($downtype === "SHIFT")
{
       $query2 = "update trn_dayprod_header set prdh_downmins = $prhdtotdownmins where prdh_id = $prdhseqno and  prdh_fincode = $prdhfincode and prdh_compcode = $prdhcompcode and  prdh_date = '$prdhdate' and prdh_shift = '$prdhshift'";
       $result2=mysql_query($query2);  
}

// echo $query2;   

if ($result1 && $result2)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $prdhseqno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $prdhseqno . '"})';

	}

?>
