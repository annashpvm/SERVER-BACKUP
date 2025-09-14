<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    


//$smsnumber  = "9600415110";
//$smsnumber  = "6380815257";
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


//        $smsnumber  = "9443350114";


//        $smsnumber  = "9486927561";
//        $smsnumber  = "6380815257";  // VIGNESWARAN - ACCOUNTS
//        $smsnumber  = "9442094459";  // PANDYARAJAN - ACCOUNTS
//        $smsnumber  = "8754002046";  //  - ACCOUNTS
//        $smsnumber  = "9677751501";  //  - ACCOUNTS
//        $smsnumber  = "9443350114";   //MD
//        $smsnumber  = "9486927561";
//        $smsnumber  = "9442094459";  // PANDYARAJAN - ACCOUNTS


            if ($dbamt>100 && $odmsg == 'Y' && $smsnumber != '' && $maxday > 5)
{



//$msg = "Dear $ledname Your Outstanding Rs.$dbamt is overdue  $dayprint. Kindly remit the Payment ASAP. Discard this message if paid, Thanking you - Sri Hari Venkateswara Paper Mills (P) Ltd";


$msg = "Dear  $ledname  Rs.$dbamt is overdue $dayprint , Kindly remit the Payment Immediately. Discard this message if paid, Thanking you - Sri Hari Venkateswara Paper Mills Pvt Ltd";

//echo $msg;



//$url = "http://smsserver9.creativepoint.in/api.php?username=shvpmills&password=652971&to=$smsnumber&from=SHVPML&message=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169520279417380";  

//$url = "http://sms.creativepoint.in/api.php?username=srihari&password=Srihari@123&to=$smsnumber&from=SHVPML&message=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169520279417380";  

  //Store data into URL variable


//$url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169520279417380";  

$url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169536539173064";  


$ret = file($url);

print_r($ret);    //$ret stores the msg-id

}
}
   
?>


