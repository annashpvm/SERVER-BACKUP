<?php
	require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
	session_start();



	$gstFlag   = $_REQUEST['gstFlag'];
	$compcode  = $_REQUEST['compcode'];
	$finid     = $_REQUEST['finid'];
	$rmentryno = $_REQUEST['entryno'];



    $today = date("Y-m-d H:i:s"); 

	mysql_query("BEGIN");
        if ($gstFlag === "Edit") {

			$query1     = "select qc_rm_ticketno from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $rmentryno";
			$result1    = mysql_query($query1);
			$rec        = mysql_fetch_array($result1);
			$rmTicketNo = $rec['qc_rm_ticketno'];
   
			$query2     = "select count(*) as noofrec from (select qc_rm_entryno  from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_ticketno = $rmTicketNo group by qc_rm_entryno) a1";
			$result2    = mysql_query($query2);
			$rec2       = mysql_fetch_array($result2);
			$qccount    = $rec2['noofrec'];
   




			if ($qccount > 1) 
			{
				 $query3 = "delete from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $rmentryno";
         		 $result3= mysql_query($query3);
			}		  

        }              
 	
	
if($result3 )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","EntryNo":"' . $rmentryno . '"})';
    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","EntryNo":"' . $rmentryno . '"})';
}
 
?>
