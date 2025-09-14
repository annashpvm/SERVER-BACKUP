<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();


$compcode        = $_POST['compcode'];
$finid           = $_POST['finid'];

$savetype        = $_POST['savetype'];
$custcode         = $_POST['sup_code'];


$sup_refname     = trim($_POST['sup_refname']);
$sup_name        = trim($_POST['sup_name']);
$sup_addr1       = trim($_POST['sup_addr1']);
$sup_addr2       = trim($_POST['sup_addr2']);
$sup_addr3       = trim($_POST['sup_addr3']);
$sup_city        = trim($_POST['sup_city']);
$sup_state       = $_POST['sup_state'];
$sup_cntry_code  = $_POST['sup_cntry_code'];
$sup_zip         = trim($_POST['sup_zip']);
$sup_phone       = $_POST['sup_phone'];
$sup_fax         = $_POST['sup_fax'];
$sup_email       = trim($_POST['sup_email']);
$sup_web         = trim($_POST['sup_web']);
$sup_grp_code    = (int) $_POST['sup_grp_code'];
$sup_type        = $_POST['sup_type'];
$sup_acc_group   = (int) $_POST['sup_acc_group'];



$sup_agentcode   = $_POST['sup_agentcode'];
$sup_contact    = $_POST['sup_contact'];

$sup_panno       = $_POST['sup_panno'];
;
$sup_tds_type    = $_POST['sup_tds_type'];
$sup_gstin       = $_POST['sup_gstin'];
$ledcode         = $_POST['ledcode'];
$sup_gst_type    = $_POST['sup_gst_type'];
$sup_tds_yn      = $_POST['sup_tds_yn'];
$sup_tcs_yn      = $_POST['sup_tcs_yn'];

$roaddist        = (int) $_POST['roaddist'];
   
$usercode = $_POST['usercode'];

$reccount = 1;
$today = date("Y-m-d H:i:s");  
$payterms   = (int) $_POST['payterms'];



mysql_query("BEGIN");

if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(cust_code),0)+1 as custcode from massal_customer";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $custcode=$rec1['custcode'];


	$qry = "select count(*) as cnt from massal_customer where cust_name = '$sup_name' or cust_ref = '$sup_refname'";
	$result1 = mysql_query($qry);
	$rec2  = mysql_fetch_array($result1);
	$cnt=$rec2['cnt'];


         if ($cnt == 0 )
         {
	 $query3 = "insert into massal_customer (
cust_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_grace_days, cust_repr, cust_panno, cust_gstin, cust_dealer, cust_smsno, cust_partygroup, cust_noof_visits1, cust_desp_target1, cust_payperf1, cust_tcs_applied, cust_distance, cust_addnlwt,
cust_overdue_msg, cust_area, cust_addnl_cd_days,cust_acc_group,cust_gst_type,
cust_tds_type,cust_tds_yn,cust_wp_gst_dnote_yn ,cust_type, cust_lock, 
 createdby, createddate, seqno)
 values (
'$custcode',upper('$sup_refname'),upper('$sup_name'),upper('$sup_addr1'),upper('$sup_addr2'), upper('$sup_addr3'), upper('$sup_city'), '$sup_state','$sup_cntry_code','$sup_zip','$sup_phone','$sup_email','$sup_web', upper('$sup_contact'), '$sup_type',0,0,0,'$sup_panno',upper('$sup_gstin') ,'0', '','0',0,0,0,
'$sup_tcs_yn',$roaddist,0,'N','0','0','$sup_acc_group','$sup_gst_type','$sup_tds_type','$sup_tds_yn','N',
'S','N','$usercode','$today',$reccount)";

/*
	 $query3 = "insert into maspur_supplier_master values (
'$supcode',upper('$sup_name'),upper('$sup_refname'),upper('$sup_addr1'),upper('$sup_addr2'), upper('$sup_addr3'),
 upper('$sup_city'), '$sup_state','$sup_cntry_code','$sup_zip','$sup_phone',' '$sup_email','$sup_web','$ledcode','$sup_grp_code','$sup_type','$sup_acc_group','$sup_contact', '$sup_panno','$sup_tds_type',upper('$sup_gstin') ,'$sup_gst_type', '$sup_tds_yn', '$sup_tcs_yn','N','N','$usercode','$today',$reccount,$roaddist)"; 



*/
//echo $query3;

	 $result3=mysql_query($query3);


          $query5 = "select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
          $result5 = mysql_query($query5);
          $rec5= mysql_fetch_array($result5);
          $curbalseqno=$rec5['curbal_seqno'];


          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$custcode','$finid','1')";
          $result6= mysql_query($query6);  

//echo $query6;
          $curbalseqno = $curbalseqno + 1;

          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$custcode','$finid','90')";
          $result6= mysql_query($query6);  

//echo $query6;
      }
  
}
else
{


        $query2 = "insert into massal_customer_logs  select * from massal_customer where cust_code = '$custcode'"; 
        $result2=mysql_query($query2);


//echo $query2;
//echo "<br>";

	$cquery1 = "select ifnull(max(seqno),0) + 1 as reccount  from massal_customer where cust_code = '$custcode'";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];




 $query3 = "update massal_customer set cust_ref = upper('$sup_refname'),cust_name = upper('$sup_name'),cust_add1 = upper('$sup_addr1') ,cust_add2 = upper('$sup_addr2'),cust_add3 = upper('$sup_addr3'),cust_city = upper('$sup_city'),cust_state = '$sup_state',cust_country = '$sup_cntry_code',cust_zip = '$sup_zip',cust_phone = '$sup_phone',cust_email ='$sup_email',cust_web = '$sup_web',cust_contact =  '$sup_contact', cust_taxtag = '$sup_type',cust_cr_days = '0',cust_grace_days =   '0',cust_repr = '0',cust_dealer = '0',cust_panno =  '$sup_panno',cust_gstin = upper('$sup_gstin') , cust_smsno =  '0' , cust_partygroup =  '0' , cust_distance = 
$roaddist ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount,  
cust_tcs_applied = '$sup_tcs_yn' , cust_acc_group = '$sup_acc_group',cust_gst_type =  '$sup_gst_type',
cust_tds_type = '$sup_tds_type',cust_tds_yn = '$sup_tds_yn' ,cust_cr_days = '$payterms' , cust_wp_gst_dnote_yn = 'N'  where cust_code = '$custcode'"; 


$result3=mysql_query($query3);

//echo  $query3;
//echo "<br>";


}
	
if ($savetype === "Add")
{
	if($result3 && $result5 && $result6 && $cnt==0 )
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","supcode":"'.$sup_refname.'"})';
	}
	else if ($cnt>0)
	{
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';

	}
	else
        {
           echo '({"success":"false","supcode":"'.$sup_refname.'"})';
	   mysql_query("ROLLBACK");            
	} 
}
else
{
	if( $result3 )
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","supcode":"'.$sup_refname.'"})';
	}
	else
        {
           echo '({"success":"false","supcode":"'.$sup_refname.'"})';
	   mysql_query("ROLLBACK");            
	} 
}


?>
