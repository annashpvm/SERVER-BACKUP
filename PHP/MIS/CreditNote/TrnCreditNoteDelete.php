<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$finid     = $_POST['finid'];
$compcode  = $_POST['compcode'];
$accseqno  = $_POST['accrefseq'];
$dncrseqno = $_POST['dncrseqno'];
$vouno = $_POST['vouno'];


$adjamt = 0;
mysqli_begin_transaction($conn);


	$query19 = "update acc_dbcrnote_header,acc_dbcrnote_trailer_invoice ,acc_trail set acctrail_adj_value = acctrail_adj_value - dbcrt_value where dbcr_comp_code = $compcode and dbcr_finid = $finid  and dbcr_seqno = dbcrt_seqno and 
dbcrt_inv_no =  acctrail_inv_no and dbcrt_inv_date = acctrail_inv_date and dbcrt_seqno = $dncrseqno and acctrail_accref_seqno > 0";
	$result19 = mysqli_query($conn, $query19);

	$query20 = "select * from acc_dbcrnote_header where dbcr_seqno = $dncrseqno and dbcr_comp_code = $compcode and dbcr_finid = $finid";
	$result20 = mysqli_query($conn, $query20);
	$rec2 = mysqli_fetch_array($result20);
	$adjamt = $rec2['dbcr_value'];



   $query1  = "delete from  acc_dbcrnote_trailer  where dbcrt_seqno = $dncrseqno";
//echo $query1;
//echo "<br>";
   $result1 = mysqli_query($conn, $query1);


   $query2  = "delete from acc_dbcrnote_header where dbcr_seqno = $dncrseqno and dbcr_comp_code = $compcode and dbcr_finid = $finid";

//echo $query2;
//echo "<br>";

   $result2 = mysqli_query($conn, $query2);



	$query21 = "select * from acc_ref where accref_comp_code = $compcode and accref_finid = $finid and accref_seqno = '$accseqno'";
	$result21 = mysqli_query($conn, $query21);
	$rec2 = mysqli_fetch_array($result21);
	$bkrseqno = $rec2['accref_link_seqno'];




$query3   = "delete from acc_trail where acctrail_accref_seqno = '$accseqno'";
$result3  = mysqli_query($conn, $query3);
//echo $query3;
//echo "<br>";

$query4   = "delete from acc_tran where acctran_accref_seqno = '$accseqno'";
$result4  = mysqli_query($conn, $query4);
//echo $query4;
//echo "<br>";

$query5   = "delete from acc_ref where accref_comp_code = $compcode and accref_finid = $finid and accref_seqno = '$accseqno'";
$result5  = mysqli_query($conn, $query5);


//echo $query5;
//echo "<br>";


 $query6   = "delete from acc_adjustments where ref_docseqno= '$accseqno' and ref_compcode= $compcode and ref_finid= $finid";
 $result6  = mysqli_query($conn, $query6);     

if ($bkrseqno > 0)
{
$query7   = "update acc_ref set accref_link_seqno = 0 where accref_comp_code = $compcode and accref_finid = $finid and accref_seqno = '$bkrseqno'";
$result7  = mysqli_query($conn, $query7);


}
   if ( $result1 && $result2 && $result3 && $result4 && $result5 )
   {
      mysqli_commit($conn);               
            echo '({"success":"true","msg":"'.$vouno.'"})';
   }
   else
   {		    mysqli_rollback($conn);

            
            echo '({"success":"false","msg":"'.$vouno.'"})';
   }  
       
 
?>
