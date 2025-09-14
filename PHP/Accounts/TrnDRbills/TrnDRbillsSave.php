<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$led_code  = $_POST['ledger_code'];

$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];

#Begin Transaction
mysql_query("BEGIN");



$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$seqno  = $griddet[$i]['acctrail_accref_seqno'];
	$invno  = $griddet[$i]['acctrail_inv_no'];
	$invdate  = $griddet[$i]['acctrail_inv_date'];
	$adjamt  = (float) $griddet[$i]['acctrail_adj_value'];
	$crdays  =  (int) $griddet[$i]['acctrail_crdays'];
	$modify_yn  = $griddet[$i]['modify_yn'];
	$ledcode  = $griddet[$i]['acctrail_led_code'];


//	$query = "update acc_trail set acctrail_adj_value = $adjamt  where  acctrail_accref_seqno = '$seqno' and acctrail_inv_no = '$invno' and acctrail_inv_date < '2022-09-01' and acctrail_led_code = $led_code";

//	$query = "update acc_trail set acctrail_adj_value = $adjamt , acctrail_crdays = $crdays where  acctrail_accref_seqno = '$seqno' and acctrail_inv_no = '$invno'  and acctrail_led_code = $led_code";

     if ($modify_yn == "Y")
     {
	$query = "update acc_trail set acctrail_adj_value = $adjamt , acctrail_crdays = $crdays , acctrail_inv_no = '$invno', acctrail_inv_date = '$invdate'  where  acctrail_led_code =  $ledcode  and acctrail_accref_seqno = '$seqno'";

//   echo $query;
//echo "<br>";

        $result = mysql_query($query);
}



}


      if (($result ))
      {
          mysql_query("COMMIT");
          Echo '{success:true,results:1,
             rows:[{"ledger":"$led_code"}]}';
      }
     else
     {
         mysql_query("ROLLBACK");
           Echo '{success:false,results:1,
             rows:[{"ledger":"$led_code"}]}';
     }
?>
