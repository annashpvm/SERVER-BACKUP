<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype  = ($_REQUEST['savetype']);
$led_code  = $_POST['ledcode'];
$ginaccrefseq   = $_POST['seqno'];
$vouno     = $_POST['opno'];
$voudate   = $_POST['opdate'];
$billno    = $_POST['billno'];
$billdate  = $_POST['billdate'];
$balance   = $_POST['balance'];
$payterms  = $_POST['payterms'];
$billtype  = $_POST['billtype'];
$compcode  = $_POST['compcode'];
$finid     = $_POST['fincode'];

$btype = 'D';

if ($billtype == "PB" || $billtype == "CR")
{
     $btype = 'C';
}


#Begin Transaction
mysql_query("BEGIN");

if ($savetype == 'Add')
{
	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];
 
        #Get Voucher Number
        $query2 = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'OPB' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval=$rec2['vou_no'];
        $vouno='OPB'.$conval;

        $query1 = "insert into acc_ref values(
'$ginaccrefseq', '$vouno','$compcode', '$finid', '$voudate', 'OPB','','', '$billno','$billdate', '$billtype', 0, '$voudate')";
        $result1 = mysql_query($query1);
//echo  $query1;
//echo "<br>";

         $query2 = "insert into  acc_trail  values ('$ginaccrefseq' ,'1','$billno', '$billdate', '$balance', '0', '$led_code', '$btype','$payterms',0)";

         $result2 = mysql_query($query2);
//echo  $query2;
//echo "<br>";

}
else
{
        $query1 = "update acc_ref set accref_payref_no = '$billno' , accref_payref_date = '$billdate' ,  accref_narration = '$billtype' where accref_comp_code = '$compcode' and  accref_finid = '$finid' and accref_vouno = '$vouno' and accref_seqno ='$ginaccrefseq'";
     $result1 = mysql_query($query1);
//echo  $query1;

         $query2 = "update acc_trail  set acctrail_inv_no = '$billno' , acctrail_inv_date = '$billdate',  acctrail_inv_value = '$balance' , acctrail_led_code = '$led_code'  , acctrail_amtmode = '$btype' , acctrail_crdays =  '$payterms'  where acctrail_accref_seqno = '$ginaccrefseq'";
         $result2 = mysql_query($query2);
//echo  $query2;

}

      if (($result1 && $result2 ))
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
?>
