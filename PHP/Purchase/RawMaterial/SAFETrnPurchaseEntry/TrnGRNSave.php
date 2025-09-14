<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet      = json_decode($_REQUEST['griddet'],true);



$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];


$savetype     = $_POST['savetype'];
$clrdocno     = $_POST['clrdocno'];
$rowcnt       = $_POST['cnt'];
$grnflag      = $_POST['grnflag'];
$compcode = $_POST['minhcompcode'];
$minhminno    = $_POST['minhminno'];
$minhmindate  = $_POST['minhmindate'];
$finid  = $_POST['minhfincode'];
$minhtype     = $_POST['minhtype'];
$minhsupcode  = $_POST['minhsupcode'];
$billno= $_POST['minhbillno'];
$billdate= $_POST['minhbilldate'];
$minhgrossvalue= $_POST['minhgrossvalue'];
$minhroundoff= (float) $_POST['minhroundoff'];
$minhvalue= $_POST['minhvalue'];
$minhpaid= $_POST['minhpaid'];
$minhacctstatus= $_POST['minhacctstatus'];
$minhcarrier= $_POST['minhcarrier'];
$narration  = $_POST['minhremarks'];
$minhentdate= $_POST['minhentdate'];

$vouno= $_POST['minhvouno'];
$vouyear= $_POST['minhvouyear'];
$voutype= $_POST['minhvoutype'];

$minhcreditdays= $_POST['minhcreditdays'];

$minhgeno= $_POST['minhgeno'];
$minhgedate= $_POST['minhgedate'];
$minhlrno= $_POST['minhlrno'];
$minhlrdate= $_POST['minhlrdate'];
$minhaccupd= $_POST['minhaccupd'];
//$cancelflag= $_POST['cancelflag'];
//$minhseqno = $_POST['minhseqno'];

$roundneed = $_POST['roundneed'];

$voudate   = $_POST['minhmindate'];

    $usercode = $_POST['usercode'];
    $reason   = strtoupper($_POST['reason']);

    $reccount = 1;
    $today = date("Y-m-d H:i:s");  

 mysql_query("BEGIN");


#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq=$rec1['con_value'];


   $query1 =  "update trnpur_min_header set  minh_acc_seqno = '$ginaccrefseq', minh_accupd = 'Y', minh_acc_date =  '$voudate' where minh_fin_code= $finid and minh_comp_code= $compcode and minh_vou_no =  '$vouno'";


//echo $query1;
//echo "<br>";
$result1=mysql_query($query1);

if ($ginaccrefseq > 0) {


    $query7 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '','','$billno', '$billdate','$narration');";
    $result7 = mysql_query($query7);

//echo $query7;
//echo "<br>";

   $query4 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
   $result4 = mysql_query($query4);


        $inscnt = 0;
        for($i=0;$i<$rowcntacc;$i++){
            $slno = $i+1;
            $ledseq = $griddetacc[$i]['ledcode'];
            $dbamt = (float) $griddetacc[$i]['debit'];
            $cramt = (float) $griddetacc[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddetacc[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $result5 = mysql_query($query5);

//echo $query5;
//echo "<br>";

               }  


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype');";
            $result6 = mysql_query($query6);

//echo $query6;
//echo "<br>";

	  }
        }
}


$vno = $minhminno . " and  Accounts Voucher No. " .$vouno;


if( $result1 && $result5   && $result6   && $result7 )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","vno":"'. $vno . '"})';
    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","vno":"' . $vno . '"})';
} 


       
 
?>
