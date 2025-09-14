<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];




$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];

$rech_seqno = $_REQUEST['seqno'];
$rech_no    = strtoupper($_REQUEST['edgrnno']);
$newgrnno   = strtoupper($_REQUEST['newgrnno']);



        $query1 = "update trnfu_receipt_header set rech_no = '$newgrnno'  where rech_compcode = $compcode and rech_fincode = $finid  and rech_seqno = '$rech_seqno' and rech_no = '$rech_no'";
        $result1=mysql_query($query1);

//echo $query1;
//echo "<br>";





	if($result1 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   

        
 
?>
