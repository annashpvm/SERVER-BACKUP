<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$compcode        = $_POST['compcode'];
$finid           = $_POST['finid'];
$savetype  = $_POST['savetype'];
$custcode  = $_POST['custcode'];
$custref =  trim($_POST['custref']);
$custname = trim($_POST['custname']);
$custadd1 = trim($_POST['custadd1']);
$custadd2 = trim($_POST['custadd2']);
$custadd3 = trim($_POST['custadd3']);
$custcity = trim($_POST['custcity']);
$custstate = $_POST['custstate'];
$custcountry = $_POST['custcountry'];
$custzip = trim($_POST['custzip']);
$custphone = trim($_POST['custphone']);
$custemail = trim($_POST['custemail']);
$custweb = trim($_POST['custweb']);
$custcont = trim($_POST['custcontact']);

$custtaxtag = (int) $_POST['custtaxtag'];
$custcrdays = (INT) $_POST['custcrdays'];

$custgrdays =  (float)$_POST['custgrdays'];

$custrepr =    (int)$_POST['custrepr'];
$custdealer =  (int) $_POST['custdealer'];

$custpanno = $_POST['custpanno'];

$custgstin = trim($_POST['custgstin']);
$custsmsno = $_POST['custsmsno'];
$custgroup = $_POST['custgroup'];

$distance = (int)$_POST['distance'];
$addnlwt = $_POST['addnlwt'];

$accrepgrp = $_POST['accrepgrp'];
$usercode = $_POST['usercode'];

$custArea = trim($_POST['custArea']);

$reccount = 1;
$today = date("Y-m-d H:i:s");  

$cust_gst_type = $_POST['cust_gst_type'];

$accgrp = (int)$_POST['accgrp'];


mysql_query("BEGIN");

if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(cust_code),0)+1 as custcode from massal_customer";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $custcode=$rec1['custcode'];


	$qry = "select count(*) as cnt from massal_customer where cust_name = '$custname' or cust_ref = '$custref'";
	$result1 = mysql_query($qry);
	$rec2  = mysql_fetch_array($result1);
	$cnt=$rec2['cnt'];



         if ($custgroup == 0 && cnt == 0 )
            $custgroup  = $custcode;

	 $query3 = "insert into massal_customer (
cust_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_grace_days, cust_repr, cust_panno, cust_gstin, cust_dealer, cust_smsno, cust_partygroup, cust_noof_visits1, cust_desp_target1, cust_payperf1, cust_tcs_applied, cust_distance, cust_addnlwt, createdby, createddate, seqno, cust_lock, cust_overdue_msg, cust_area, cust_addnl_cd_days,cust_acc_group,cust_type,cust_gst_type)
 values ('$custcode',upper('$custref'),upper('$custname'),upper('$custadd1'),upper('$custadd2'), upper('$custadd3'), upper('$custcity'), '$custstate','$custcountry','$custzip','$custphone','$custemail','$custweb', '$custcont', '$custtaxtag','$custcrdays', '$custgrdays','$custrepr',upper('$custpanno'), upper('$custgstin'), $custdealer,$custsmsno,'$custgroup',0,0,0,'Y','$distance','$addnlwt','$usercode','$today',$reccount,'N','Y','$custArea',0,'$accgrp','C','$cust_gst_type')"; 

//echo $query3;

	 $result3=mysql_query($query3);



          $query5 = "select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
          $result5 = mysql_query($query5);
          $rec5= mysql_fetch_array($result5);
          $curbalseqno=$rec5['curbal_seqno'];


          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$custcode','$finid','1')";
          $result6= mysql_query($query6);  
          $curbalseqno = $curbalseqno + 1; 
          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$custcode','$finid','90')";
          $result6= mysql_query($query6);  

//echo $query6;

}
else
{

        $query2 = "insert into massal_customer_logs  select * from massal_customer where cust_code = '$custcode'"; 
        $result2=mysql_query($query2);

	$cquery1 = "select ifnull(max(seqno),0) + 1 as reccount  from massal_customer where cust_code = '$custcode'";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];

 $query3 = "update massal_customer set cust_ref = upper('$custref'),cust_name = upper('$custname'),cust_add1 = upper('$custadd1') ,cust_add2 = upper('$custadd2'),cust_add3 = upper('$custadd3'),cust_city = upper('$custcity'),cust_state = '$custstate',cust_country = '$custcountry',cust_zip = '$custzip',cust_phone = '$custphone',cust_email ='$custemail',cust_web = '$custweb',cust_contact =  '$custcont', cust_taxtag = '$custtaxtag',cust_cr_days = '$custcrdays',cust_grace_days =   '$custgrdays',cust_repr = '$custrepr',cust_dealer = '$custdealer',cust_panno =  '$custpanno',cust_gstin = upper('$custgstin') , cust_smsno =  '$custsmsno' , cust_partygroup =  '$custgroup' , cust_distance = $distance ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount, cust_area = $custArea,
cust_acc_group = '$accgrp'   where cust_code = '$custcode'"; 


$result3=mysql_query($query3);


}

if ($savetype === "Add")
{
	if($result3 && $result6  && $cnt==0 )
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","custcode":"'.$custref.'"})';
	}
	else if ($cnt>0)
	{
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';

	}
	else
        {
           echo '({"success":"false","custcode":"'.$custref.'"})';
	   mysql_query("ROLLBACK");            
	} 
}
else
{
	if($result3)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","custcode":"'.$custref.'"})';
	}
	else
        {
           echo '({"success":"false","custcode":"'.$custref.'"})';
	   mysql_query("ROLLBACK");            
	} 
}


?>
