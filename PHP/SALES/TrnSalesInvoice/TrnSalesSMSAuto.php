  <?php
  require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

  session_start();
  global $conn;  

  /* ---------------- TIME CONTROL ---------------- */
date_default_timezone_set('Asia/Kolkata');

$hour = (int) date('H');
$min  = (int) date('i');
$currentMinutes = ($hour * 60) + $min;

// 8:59 PM → 1259, 9:00 AM → 540



if ($currentMinutes >= 1259 || $currentMinutes < 541) {
    exit; // STOP SMS auto-send during restricted hours
}
/* ------------------------------------------------ */


  $invhcompcode = $_POST['invhcompcode'];
  $invhfincode  = $_POST['invhfincode'];

  $query = "select * from trnsal_invoice_header , massal_customer , massal_repr where cust_repr = repr_code and invh_party = cust_code and  invh_comp_code = 1  and invh_fincode = '$invhfincode' and invh_date >= '2026-01-10' and SMSsent = 'N' and E_inv_confirm = 'Y'";
  $result = mysqli_query($conn, $query);
  while ($row = mysqli_fetch_assoc($result)) {
    
    $invhparty   = substr($row['cust_name'],0,28);
    $invhparty2  = substr($row['cust_name'],28,58);
    $invhrefno   = $row['invh_invrefno'];
    $invhdate   = date('d/m/y', strtotime($row['invh_date']));
    $invhtotwt   = $row['invh_totwt']/1000;
    $invhnetamt  = $row['invh_netamt'];
    $smsnumber  = $row['repr_mobile'] . ',' . $row['cust_smsno'];

    $query1= "update trnsal_invoice_header set SMSsent = 'Y' where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";
    $result1=mysqli_query($conn, $query1); 
  
  
    $msg = "Dear $invhparty, your bill details, Inv.No: $invhrefno Dt: $invhdate Qty: $invhtotwt Amt:$invhnetamt Thanking you, Sri Hari Venkateswara Paper Mills Pvt Ltd"; 
  
  
  
    $url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg);  
  
    $ret = file($url);
  
    print_r($ret);    //$ret stores the msg-id
  
  
  }
    
  ?>


