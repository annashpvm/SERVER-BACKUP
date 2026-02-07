<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$snhinvno     = $_POST['snhinvno'];
$snhcompcode  = $_POST['snhcompcode'];
$snhfincode   = $_POST['snhfincode'];
$snhdate      = $_POST['snhdate'];
$accseqno     = $_POST['accseqno'];

global $conn; 
mysqli_begin_transaction($conn);

   $query1  = "delete from trn_other_sales where os_fincode = '$snhfincode' and os_compcode='$snhcompcode' and os_invno = '$snhinvno'";


   $result1 = mysqli_query($conn, $query1);


	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$accseqno'";
        $resulta1 = mysqli_query($conn, $querya1);

//echo $querya1;
//echo "<br>";

	$querya2 = "delete from acc_tran  where acctran_accref_seqno = '$accseqno'";
        $resulta2 = mysqli_query($conn, $querya2);
//echo $querya2;
//echo "<br>";	

        $querya3 = "delete from acc_ref  where accref_seqno ='$accseqno' and accref_comp_code='$snhcompcode' and accref_finid ='$snhfincode'";
        $resulta3 = mysqli_query($conn, $querya3);

//echo $querya3;
//echo "<br>";

  
        
   if ( $result1 &&  $resulta1 &&  $resulta2 &&  $resulta3 )
   {
            mysqli_commit($conn);                          
            echo '({"success":"true","saleno":"'.$snhinvno.'"})';
   }
   else
   {
            mysqli_rollback($conn);

            
            echo '({"success":"false","saleno":"'.$snhinvno.'"})';
   }  
       
 
?>
