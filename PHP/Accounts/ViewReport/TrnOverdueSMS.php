<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();



    $griddet   = json_decode($_REQUEST['griddet'],true);
    $rowcnt    = $_REQUEST['cnt'];
    $todaydate = $_REQUEST['todaydate'];    
    $repcode   = $_REQUEST['repcode'];    


//$smsnumber  = "9600415110";
//$smsnumber  = "6380815257";


$qry = "select count(*) as cnt from log_sms_email where log_date = '$todaydate' and log_rep = '$repcode' and log_type = 'sms'";
$smschk  = mysql_query($qry);
$smsfind = mysql_fetch_array($smschk);
$cnt=$smsfind['cnt']; 


if ($cnt == 0)
{

	for($i=0;$i<$rowcnt+1;$i++){
	    $ledname    = $griddet[$i]['grpname'];
	    $ledname    = substr($ledname,0,28);
	    $dbamt      = (float)$griddet[$i]['debit'];
	    $smsnumber  = $griddet[$i]['smsno'];
	    $odmsg      = $griddet[$i]['odmsg'];
	    $minday     = $griddet[$i]['minday'];
	    $maxday     = $griddet[$i]['maxday'];

	    if ($minday == $maxday )
		$dayprint   = " from " . $minday . ' days';
	    else
		$dayprint   = " from " . $minday . " to " . $maxday  . ' days';

            if ($dbamt>100 && $odmsg == 'Y' && $smsnumber != '' && $maxday > 5)
	    {


		$msg = "Dear  $ledname  Rs.$dbamt is overdue $dayprint , Kindly remit the Payment Immediately. Discard this message if paid, Thanking you - Sri Hari Venkateswara Paper Mills Pvt Ltd";


		$url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169536539173064";  


		$ret = file($url);

		print_r($ret);    //$ret stores the msg-id

	     }
         }

  $query1="insert into log_sms_email (log_date, log_rep, log_type) values('$todaydate','$repcode','sms')";
  $result1 = mysql_query($query1);
  $cnt = $cnt + 1;
}

 if ($cnt > 0) 
    echo '({"success":"true"})';
 else 
    echo '({"success":"false"})';


   
?>


