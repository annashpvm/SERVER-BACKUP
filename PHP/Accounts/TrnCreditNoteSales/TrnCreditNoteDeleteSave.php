<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();




$finid     = $_POST['finid'];
$compcode  = $_POST['compcode'];
$accseqno  = $_POST['accrefseq'];
$dncrseqno = $_POST['dncrseqno'];
$vouno = $_POST['vouno'];


mysqli_begin_transaction($conn);

   $query1  = "delete  from acc_dbcrnote_header  where dbcr_seqno = $dncrseqno and dbcr_comp_code = $compcode and dbcr_finid = $finid and dbcr_vouno = '$vouno' ";

//echo $query1;
   $result1 = mysqli_query($conn, $query1);


   $query2  = "delete from  acc_dbcrnote_trailer  where dbcrt_seqno = $dncrseqno";
//echo $query2;
   $result2 = mysqli_query($conn, $query2);



$query3   = "delete from acc_trail where acctrail_accref_seqno = '$accseqno'";
$result3  = mysqli_query($conn, $query3);

$query4   = "delete from acc_tran where acctran_accref_seqno = '$accseqno'";
$result4  = mysqli_query($conn, $query4);

$query5   = "delete from acc_ref where accref_seqno = '$accseqno'";
$result5  = mysqli_query($conn, $query5);


$query6   = "delete from acc_adjustments where ref_docseqno = '$accseqno'";
$result6  = mysqli_query($conn, $query6);


        
   if ( $result1 && $result2 && $result3 && $result4 && $result5 && $result6 )
   {
      mysqli_commit($conn);                     
      echo '({"success":"true","msg":"'.$vouno.'"})';
   }
   else
   {
      mysqli_rollback($conn);
      echo '({"success":"false","msg":"'.$vouno.'"})';
   }  
       
 
?>
