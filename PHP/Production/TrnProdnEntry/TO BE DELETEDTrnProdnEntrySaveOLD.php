<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet        = json_decode($_POST['griddet'],true);
$prdhseqno      = $_POST['prdhseqno'];  
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
$prdhavlmins    = $_POST['prdhavlmins'];
$prdhrunmins    = $_POST['prdhrunmins'];
$prdhdownmins   = $_POST['prdhdownmins'];
$prdhprodn      = $_POST['prdhprodn'];
$prdhopenpulp   = $_POST['prdhopenpulp'];
$prdhclosepulp  = $_POST['prdhclosepulp'];
$prdhopenbroke    = $_POST['prdhopenbroke'];
$prdhclosebroke   = $_POST['prdhclosebroke'];
$prdhpower        = $_POST['prdhpower'];
$prdhsteam        = $_POST['prdhsteam'];

$rowcnt_downtime  = $_POST['cntdowntime'];
$griddet_downtime = json_decode($_POST['griddet_downtime'],true);

//$rowcnt_roll  = $_POST['cntRoll'];
//$griddet_roll = json_decode($_POST['griddet_roll'],true);


if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(prdh_id),0)+1 as prodseqno from trn_dayprod_header where prdh_compcode = $prdhcompcode and  prdh_fincode  = $prdhfincode";
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $prdhseqno=$rec1['prodseqno'];

         mysql_query("BEGIN");


	 if ($prdhseqno > 0 )
	 { 


 
	 $query3= "call spprod_ins_header ('$prdhseqno','$prdhcompcode','$prdhfincode', '$prdhdate', '$prdhshift','$prdhspvrcode', '$prdhoperator', '$prdhppno', '$prdhavlmins', '$prdhrunmins','$prdhdownmins','$prdhprodn','$prdhopenpulp', '$prdhclosepulp', '$prdhopenbroke', '$prdhclosebroke', '$prdhpower','$prdhsteam')";
 
	  $result3=mysql_query($query3);
	}

}

else
{
	 if ($prdhseqno > 0 )
	 { 

	 $query3= "call spprod_upd_header ('$prdhseqno','$prdhcompcode','$prdhfincode', '$prdhdate', '$prdhshift','$prdhspvrcode', '$prdhoperator', '$prdhppno', '$prdhavlmins', '$prdhrunmins','$prdhdownmins','$prdhprodn','$prdhopenpulp', '$prdhclosepulp', '$prdhopenbroke', '$prdhclosebroke', '$prdhpower','$prdhsteam')";
 
$query3= "call spprod_upd_header ('$prdhseqno','$prdhcompcode','$prdhfincode', '$prdhdate', '$prdhshift','$prdhspvrcode', '$prdhoperator', '$prdhppno', '$prdhavlmins', '$prdhrunmins','$prdhdownmins','$prdhprodn','$prdhopenpulp', '$prdhclosepulp', '$prdhopenbroke', '$prdhclosebroke', '$prdhpower','$prdhsteam')";
 
	  $result3=mysql_query($query3);
	}


}


	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	$sno      = (int)$griddet[$i]['sno'];
        $qlycode  = (int)$griddet[$i]['qlycode'];	
	$rollno   = (int)$griddet[$i]['rollno'];

	$speed    = (int)$griddet[$i]['speed'];
	$deckle   = (int)$griddet[$i]['deckle'];
	$draw     = $griddet[$i]['draw'];
	$intime   = $griddet[$i]['intime'];
	$outtime  = $griddet[$i]['outtime'];
	$runmins  = $griddet[$i]['runmins'];
	$breaks   = (int)$griddet[$i]['breaks'];
	$breakmins = (int)$griddet[$i]['breakmins'];	
        $set      = (int)$griddet[$i]['set'];
	$rolldia  = (int)$griddet[$i]['rolldia'];
	$rollwt   = (float)$griddet[$i]['rollwt'];
	$ppno     = $griddet[$i]['ppno'];
	$finwt    = (float)$griddet[$i]['finwt'];
	$reason   = $griddet[$i]['reason'];

	$query4= "call spprod_ins_roll_details ('$prdhseqno','$prdhcompcode', '$prdhfincode', '$prdhdate' , '$ppno', '$prdhshift','$sno', '$rollno', '$qlycode','$speed','$deckle','$draw','$intime','$outtime','$rolldia', '$runmins','$breaks','$breakmins','$set', '$rollwt','$finwt','$reason','A', '', '$prdhdate')";
	$result4=mysql_query($query4);            
	  
	}

	$inscnt = 0;
	for ($i=0;$i<$rowcnt_downtime;$i++)
	{
	$qlycode   = $griddet_downtime[$i]['qlycode'];
	$deptcode  = $griddet_downtime[$i]['deptcode'];
	$seccode   = $griddet_downtime[$i]['seccode'];
	$equipcode = $griddet_downtime[$i]['equipcode'];
	$fromtime  = $griddet_downtime[$i]['fromtime'];
	$totime    = $griddet_downtime[$i]['totime'];
	$downmins  = $griddet_downtime[$i]['downmins'];
	$reason    = $griddet_downtime[$i]['reason'];

$query5= "call spprod_ins_downtime ('$prdhseqno','$prdhcompcode', '$prdhfincode', '$qlycode' , '$deptcode', '$seccode', '$equipcode',  '$fromtime', '$totime', '$downmins', '$reason')";
	$result5=mysql_query($query5);            
	  
	}

/*
	$inscnt = 0;
	for ($i=0;$i<$rowcnt_roll;$i++)
	{
	$rollno   = $griddet_roll[$i]['rollno'];
	$qlycode  = $griddet_roll[$i]['qlycode'];
	$qty      = $griddet_roll[$i]['qty'];
	$mins     = $griddet_roll[$i]['mins'];
	$set      = $griddet_roll[$i]['set'];
        $query6   = "insert into  trn_dayprod_roll_variety_details values ('$prdhseqno','$prdhfincode','$rollno', '$qlycode' , '$qty', '$mins', '$set',0)";
	$result6=mysql_query($query6);            
	  
	}

*/

if ($savetype == "Add") {
	if ($result3  )  {
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
	if ($result3) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $prdhseqno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $prdhseqno . '"})';

	}
}

?>
