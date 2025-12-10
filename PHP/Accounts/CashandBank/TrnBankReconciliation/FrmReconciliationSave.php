<?php
	require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	$flagtype = $_REQUEST['flagtype'];
	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_REQUEST['cnt'];
	$finid = $_REQUEST['finid'];
	$compcode = $_REQUEST['compcode'];
	$vouno = '';
	mysqli_query($conn, "BEGIN");



	for($i=0;$i< $rowcnt  ;$i++){


            $seqno   = $griddet[$i]['accref_seqno'];
	    $recdate =  substr($griddet[$i]['rec_date'],0,10);
//echo $recdate ;
//echo "<br>";
            if (!empty($recdate))
            {
//	        $query1  = "insert into acc_bank_reconciliation values ( $seqno ,'$recdate') ";
	        $query1  = "update acc_ref set accref_recon_date = '$recdate' where  accref_seqno  = $seqno";
                $result1 = mysqli_query($conn, $query1);
//echo $query1 ;
//echo "<br>";
            }
	}  
	if( $result1)
	{
	mysqli_begin_transaction($conn);
	echo '({"success":"true","vouno":"'.$vouno.'"})';
	}
	else
	{
	mysqli_rollback($conn);


	echo '({"success":"false","vouno":"'.$vouno.'"})';
	}

?>
