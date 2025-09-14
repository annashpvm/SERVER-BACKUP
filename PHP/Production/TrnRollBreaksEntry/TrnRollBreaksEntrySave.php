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


	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
	$sno      = (int)$griddet[$i]['sno'];
        $qlycode  = (int)$griddet[$i]['qlycode'];	
	$rollno   = (int)$griddet[$i]['rollno'];
        $shade     = $griddet[$i]['shade'];
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
	$rwdeck    = (float)$griddet[$i]['rwdeck'];
	$query1= "update trn_dayprod_roll_details set prd_breaks = '$breaks', prd_breakmins = '$breakmins' , prd_shade = '$shade' , prd_rwdeck =  '$rwdeck' where prd_seqno =  $prdhseqno  and prd_compcode = $prdhcompcode and prd_fincode = $prdhfincode and prd_date = '$prdhdate '  and prd_shift = '$prdhshift' and prd_rollno = $rollno and prd_variety = $qlycode";
	$result1=mysql_query($query1);            
	  
	}


	if ($result1)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $prdhseqno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $prdhseqno . '"})';

	}

?>
