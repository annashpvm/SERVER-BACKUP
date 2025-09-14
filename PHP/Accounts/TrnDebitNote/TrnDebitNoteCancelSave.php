<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();



//echo "HELLOW";
//echo "<br>";

$finid     = $_POST['finid'];
$compcode  = $_POST['compcode'];
$accseqno  = $_POST['accrefseq'];
$dncrseqno = $_POST['dncrseqno'];
$vouno     = $_POST['vouno'];

//echo $vouno;
//echo "<br>";


mysql_query("BEGIN");

   $query1  = "update  acc_dbcrnote_header set dbcr_value = 0  where dbcr_seqno = $dncrseqno and dbcr_comp_code = $compcode and dbcr_finid = $finid";

//echo $query1;
//echo "<br>";

   $result1 = mysql_query($query1);


   $query2  = "update  acc_dbcrnote_trailer set dbcrt_grossvalue = 0 , dbcrt_value = 0, dbcrt_igstvalue = 0, dbcrt_cgstvalue = 0, dbcrt_sgstvalue = 0, dbcrt_igstper =0 , dbcrt_cgstper=0, dbcrt_sgstper=0, dbcrt_tcsvalue =0, dbcrt_tcsper =0, dbcrt_otheramt = 0 , dbcrt_rounding = 0  where dbcrt_seqno = $dncrseqno";

//echo $query2;
//echo "<br>";

   $result2 = mysql_query($query2);



$query3   = "delete from acc_trail where acctrail_accref_seqno = '$accseqno'";
$result3  = mysql_query($query3);

$query4   = "delete from acc_tran where acctran_accref_seqno = '$accseqno'";
$result4  = mysql_query($query4);

$query5   = "delete from acc_ref where accref_seqno = '$accseqno'";
$result5  = mysql_query($query5);


  
        
   if ( $result1 && $result2 && $result3 && $result4 && $result5 )
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","msg":"'.$vouno.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","msg":"'.$vouno.'"})';
   }  
       
?>
