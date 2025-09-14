<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$compcode        = $_POST['compcode'];
$finid           = $_POST['finid'];
$savetype  = $_POST['savetype'];
$custcode  = $_POST['custcode'];
$custref = $_POST['custref'];
$custname = $_POST['custname'];
$custadd1 = $_POST['custadd1'];
$custadd2 = $_POST['custadd2'];
$custadd3 = $_POST['custadd3'];
$custcity = $_POST['custcity'];
$custstate = $_POST['custstate'];
$custcountry = $_POST['custcountry'];
$custzip = $_POST['custzip'];
$custphone = $_POST['custphone'];
$custemail = $_POST['custemail'];
$custweb = $_POST['custweb'];
$custcont = $_POST['custcontact'];

$custtaxtag = $_POST['custtaxtag'];
$custcrdays = $_POST['custcrdays'];

$custcrlimit = $_POST['custcrlimit'];

$custrepr =    $_POST['custrepr'];
$custdealer =    $_POST['custdealer'];

$custpanno = $_POST['custpanno'];

$custgstin = $_POST['custgstin'];
$custsmsno = $_POST['custsmsno'];


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
'$custcode','$ledcode',upper('$custref'),upper('$custname'),upper('$custadd1'),upper('$custadd2'), upper('$custadd3'), upper('$custcity'), '$custstate','$custcountry','$custzip','$custphone','$custemail','$custweb','$custcont','$custtaxtag','$custcrdays', '$custcrlimit',
'$custrepr',upper('$custpanno'), upper('$custgstin'),$custdealer,$custsmsno)"; 

	 $result3=mysql_query($query3);


	 $query4= "insert into acc_ledger_master values('$ledcode','1',upper('$custref'),upper('$custadd1'),upper('$custadd2'),upper('$custcity'),'61','', 'N','','','','$custgstin','$custpanno','C','$custcode')";
	 $result4=mysql_query($query4);           
  

          $query5 = "select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
          $result5 = mysql_query($query5);
          $rec5= mysql_fetch_array($result5);
          $curbalseqno=$rec5['curbal_seqno'];


          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$finid','$compcode')";
          $result6= mysql_query($query6);  


}
else
{
 $query3 = "update massal_customer set cust_ref = upper('$custref'),cust_name = upper('$custname'),cust_add1 = upper('$custadd1') ,cust_add2 = upper('$custadd2'),cust_add3 = upper('$custadd3'),cust_city = upper('$custcity'),cust_state = '$custstate',cust_country = '$custcountry',cust_zip = '$custzip',cust_phone = '$custphone',cust_email ='$custemail',cust_web = '$custweb',cust_contact =  '$custcont',
cust_taxtag = '$custtaxtag',cust_cr_days = '$custcrdays',cust_cr_limit =   '$custcrlimit',cust_repr = '$custrepr',cust_dealer = '$custdealer',
cust_panno =  '$custpanno',cust_gstin = upper('$custgstin') , cust_smsno =  '$custsmsno' where cust_code = '$custcode'"; 


$result3=mysql_query($query3);

	 $query4= "update acc_ledger_master set led_name = '$custref' ,led_addr1 = '$custadd1',led_addr2 = '$custadd2',led_city = '$custcity',led_grp_code= 0 ,led_TinNo = '$custgstin',led_gst_no = '$custgstin',led_pan_no = '$custpanno' where led_custcode = '$custcode'";
	 $result4=mysql_query($query4);           

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
