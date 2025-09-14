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
$custzip = $_POST['custzip'];
$custphone = $_POST['custphone'];
$custemail = $_POST['custemail'];
$custweb = $_POST['custweb'];
$custcont = $_POST['custcontact'];

$custtaxtag = (int) $_POST['custtaxtag'];
$custcrdays = (INT) $_POST['custcrdays'];

$custcrlimit =  (float)$_POST['custcrlimit'];

$custrepr =    (int)$_POST['custrepr'];
$custdealer =  (int) $_POST['custdealer'];

$custpanno = $_POST['custpanno'];

$custgstin = $_POST['custgstin'];
$custsmsno = $_POST['custsmsno'];
$custgroup = $_POST['custgroup'];

$distance = (int)$_POST['distance'];
$addnlwt = $_POST['addnlwt'];

$accrepgrp = $_POST['accrepgrp'];
$usercode = $_POST['usercode'];



$reccount = 1;
$today = date("Y-m-d H:i:s");  



mysql_query("BEGIN");

if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(cust_code),0)+1 as custcode from massal_customer";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $custcode=$rec1['custcode'];

	 $query2 = "select IFNULL(max(led_code),0)+1 as ledcode from acc_ledger_master";
	 $result2 = mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $ledcode=$rec2['ledcode'];




	 $query3 = "insert into massal_customer values (
'$custcode','$ledcode',upper('$custref'),upper('$custname'),upper('$custadd1'),upper('$custadd2'), upper('$custadd3'), upper('$custcity'), '$custstate','$custcountry','$custzip','$custphone','$custemail','$custweb', '$custcont', '$custtaxtag','$custcrdays', '$custcrlimit','$custrepr',upper('$custpanno'), upper('$custgstin'), $custdealer,$custsmsno,'$custgroup',0,0,0,'Y','$distance','$addnlwt','$usercode','$today',$reccount,'N')"; 

//echo $query3;

	 $result3=mysql_query($query3);


	 $query4= "insert into acc_ledger_master values('$ledcode','1',upper('$custname'),upper('$custadd1'),upper('$custadd2'),upper('$custadd3'), upper('$custcity'), '$custstate','$custzip','$accrepgrp','Y', '$custgstin','$custpanno','C','$custcode','$usercode','$today',$reccount)";
	 $result4=mysql_query($query4);           
  
//echo $query4;

          $query5 = "select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
          $result5 = mysql_query($query5);
          $rec5= mysql_fetch_array($result5);
          $curbalseqno=$rec5['curbal_seqno'];


          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$finid','1')";
          $result6= mysql_query($query6);  
          $curbalseqno = $curbalseqno + 1; 
          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$finid','90')";
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

 $query3 = "update massal_customer set cust_ref = upper('$custref'),cust_name = upper('$custname'),cust_add1 = upper('$custadd1') ,cust_add2 = upper('$custadd2'),cust_add3 = upper('$custadd3'),cust_city = upper('$custcity'),cust_state = '$custstate',cust_country = '$custcountry',cust_zip = '$custzip',cust_phone = '$custphone',cust_email ='$custemail',cust_web = '$custweb',cust_contact =  '$custcont', cust_taxtag = '$custtaxtag',cust_cr_days = '$custcrdays',cust_cr_limit =   '$custcrlimit',cust_repr = '$custrepr',cust_dealer = '$custdealer',cust_panno =  '$custpanno',cust_gstin = upper('$custgstin') , cust_smsno =  '$custsmsno' , cust_partygroup =  '$custgroup' , cust_distance = $distance ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount  where cust_code = '$custcode'"; 


$result3=mysql_query($query3);

	 $query4= "update acc_ledger_master set led_name = '$custname' ,led_addr1 = upper('$custadd1'),led_addr2 = upper('$custadd2'),led_city = '$custcity',led_gst_no = '$custgstin',led_pan_no = '$custpanno' ,led_addr3 = upper('$custadd3') ,led_state = '$custstate',led_pin = '$custzip' , led_grp_code =  '$accrepgrp' ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount where led_type = 'C' and led_custcode = '$custcode'";
	 $result4=mysql_query($query4);    
//echo $query4;       

}

if ($savetype === "Add")
{
	if($result1 && $result2 && $result3 && $result4 && $result6)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","custcode":"'.$custcode.'"})';
	}
	else
        {
           echo '({"success":"false","custcode":"'.$custcode.'"})';
	   mysql_query("ROLLBACK");            
	} 
}
else
{
	if($result3)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","custcode":"'.$custcode.'"})';
	}
	else
        {
           echo '({"success":"false","custcode":"'.$custcode.'"})';
	   mysql_query("ROLLBACK");            
	} 
}


?>
