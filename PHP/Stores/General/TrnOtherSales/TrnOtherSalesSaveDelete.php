<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$snhinvno     = $_POST['snhinvno'];
$snhcompcode  = $_POST['snhcompcode'];
$snhfincode   = $_POST['snhfincode'];
$snhdate      = $_POST['snhdate'];
$accseqno     = $_POST['accseqno'];

mysql_query("BEGIN");

   $query1  = "delete from trn_other_sales where os_fincode = '$snhfincode' and os_compcode='$snhcompcode' and os_invno = '$snhinvno'";


   $result1 = mysql_query($query1);


	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$accseqno'";
        $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";

	$querya2 = "delete from acc_tran  where acctran_accref_seqno = '$accseqno'";
        $resulta2 = mysql_query($querya2);
//echo $querya2;
//echo "<br>";	

        $querya3 = "delete from acc_ref  where accref_seqno ='$accseqno' and accref_comp_code='$snhcompcode' and accref_finid ='$snhfincode'";
        $resulta3 = mysql_query($querya3);

//echo $querya3;
//echo "<br>";

  
        
   if ( $result1 &&  $resulta1 &&  $resulta2 &&  $resulta3 )
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","saleno":"'.$snhinvno.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","saleno":"'.$snhinvno.'"})';
   }  
       
 
?>
