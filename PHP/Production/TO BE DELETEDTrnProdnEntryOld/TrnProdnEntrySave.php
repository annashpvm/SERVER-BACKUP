<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet        = json_decode($_POST['griddet'],true);
$rowcnt         = $_POST['cnt'];
$savetype       = $_POST['savetype'];  
$prdhcompcode   = $_POST['prdhcompcode'];
$prdhfincode    = $_POST['prdhfincode'];
$prdhdate       = $_POST['prdhdate'];
$prdhshift      = $_POST['prdhshift'];
$prdhspvrcode   = $_POST['prdhspvrcode'];
$prdhoperator   = $_POST['prdhoperator'];
$prdhppno       = $_POST['prdhppno'];
$prdhvariety    = $_POST['prdhvariety'];
$prdhavlhrs     = $_POST['prdhavlhrs'];
$prdhrunhrs     = $_POST['prdhrunhrs'];
$prdhdownhrs    = $_POST['prdhdownhrs'];
$prdhprodn      = $_POST['prdhprodn'];
$prdhopenpulp   = $_POST['prdhopenpulp'];
$prdhclosepulp  = $_POST['prdhclosepulp'];
$prdhopenbroke  = $_POST['prdhopenbroke'];
$prdhclosebroke = $_POST['prdhclosebroke'];
$prdhpower      = $_POST['prdhpower'];
$prdhsteam      = $_POST['prdhsteam'];
$rowcnt_downtime  = $_POST['cntdowntime'];
$griddet_downtime = json_decode($_POST['griddet_downtime'],true);

if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(prdh_id),0)+1 as prodseqno from trn_dayprod_header where prdh_compcode = $prdhcompcode and  prdh_fincode  = $prdhfincode";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $prdhseqno=$rec1['prodseqno'];

         mysql_query("BEGIN");


	 if ($prdhseqno > 0 )
	 { 

		 $query3= "call spprod_ins_header ('$prdhseqno',
	'$prdhcompcode','$prdhfincode','$prdhdate','$prdhshift','$prdhspvrcode','$prdhoperator','$prdhppno','$prdhvariety','$prdhavlhrs','$prdhrunhrs',
	'$prdhdownhrs','$prdhprodn','$prdhopenpulp','$prdhclosepulp','$prdhopenbroke','$prdhclosebroke','$prdhpower','$prdhsteam')";

	  $result3=mysql_query($query3);
	}

	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	$sno      = $griddet[$i]['sno'];
	$qlycode  = $griddet[$i]['qlycode'];
	$rollno   = $griddet[$i]['rollno'];
	$speed    = $griddet[$i]['speed'];
	$deckle   = $griddet[$i]['deckle'];
	$draw     = $griddet[$i]['draw'];
	$intime   = $griddet[$i]['intime'];
	$outtime  = $griddet[$i]['outtime'];
	$runhrs   = $griddet[$i]['runhrs'];
	$breaks   = $griddet[$i]['breaks'];	
	$rolldia  = $griddet[$i]['rolldia'];
	$rollwt   = $griddet[$i]['rollwt'];
	$ppno     = $griddet[$i]['ppno'];
	$finwt    = $griddet[$i]['finwt'];
	$reason   = $griddet[$i]['reason'];

	$query4= "call spprod_ins_roll_details ('$prdhseqno','$prdhcompcode', '$prdhfincode', '$prdhdate' , '$ppno', '$prdhshift', '$qlycode', '$sno', '$rollno', '$speed','$deckle','$draw','$intime','$outtime','$rolldia', '$runhrs','$breaks', '$rollwt','$finwt','$reason',
'A', 'N', 'N', '', '$prdhdate')";
	$result4=mysql_query($query4);            
	  
	}

	$inscnt = 0;
	for ($i=0;$i<$rowcnt_downtime;$i++)
	{
	$qlycode   = $griddet_downtime[$i]['qlycode'];
	$deptcode  = $griddet_downtime[$i]['deptcode'];
	$seccode   = $griddet_downtime[$i]['seccode'];
	$equipcode = $griddet_downtime[$i]['equipcode'];
	$reason    = $griddet_downtime[$i]['reason'];
	$fromtime  = $griddet_downtime[$i]['fromtime'];
	$totime    = $griddet_downtime[$i]['totime'];
	$downhrs   = $griddet_downtime[$i]['downhrs'];
	$reason    = $griddet_downtime[$i]['reason'];

$query5= "call spprod_ins_downtime ('$prdhseqno','$prdhcompcode', '$prdhfincode', '$qlycode' , '$deptcode', '$seccode', '$equipcode',  '$fromtime', '$totime', '$downhrs', '$reason')";
	$result5=mysql_query($query5);            
	  
	}


}

if ($savetype == "Add") {
	if ($result3 && $result4 )  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $prdhseqno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $prdhseqno . '"})';

	}
}
else
 {
	if ($result3 && $result4 ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $prdhseqno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $prdhseqno . '"})';

	}
}

?>
