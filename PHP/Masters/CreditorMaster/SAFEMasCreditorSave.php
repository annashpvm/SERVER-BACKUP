<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();


$compcode        = $_POST['compcode'];
$finid           = $_POST['finid'];

$savetype        = $_POST['savetype'];
$supcode         = $_POST['sup_code'];


$sup_refname     = trim($_POST['sup_refname']);
$sup_name        = trim($_POST['sup_name']);
$sup_addr1       = trim($_POST['sup_addr1']);
$sup_addr2       = trim($_POST['sup_addr2']);
$sup_addr3       = trim($_POST['sup_addr3']);
$sup_city        = trim($_POST['sup_city']);
$sup_state       = $_POST['sup_state'];
$sup_cntry_code  = $_POST['sup_cntry_code'];
$sup_zip         = $_POST['sup_zip'];
$sup_phone       = $_POST['sup_phone'];
$sup_fax         = $_POST['sup_fax'];
$sup_email       = $_POST['sup_email'];
$sup_web         = $_POST['sup_web'];
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




mysql_query("BEGIN");

if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(sup_code),0)+1 as supcode from maspur_supplier_master";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $supcode=$rec1['supcode'];

	 $query2 = "select IFNULL(max(led_code),0)+1 as ledcode from acc_ledger_master";
	 $result2 = mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $ledcode=$rec2['ledcode'];



	 $query3 = "insert into maspur_supplier_master values (
'$supcode',upper('$sup_name'),upper('$sup_refname'),upper('$sup_addr1'),upper('$sup_addr2'), upper('$sup_addr3'), upper('$sup_city'), '$sup_state','$sup_cntry_code','$sup_zip','$sup_phone','$sup_fax', '$sup_email','$sup_web','$ledcode','$sup_grp_code','$sup_type','$sup_acc_group','$sup_contact', '$sup_panno','$sup_tds_type',upper('$sup_gstin') ,'$sup_gst_type', '$sup_tds_yn', '$sup_tcs_yn','N','N','$usercode','$today',$reccount,$roaddist)"; 
	 $result3=mysql_query($query3);

//echo $query3;




	 $query4= "insert into acc_ledger_master values('$ledcode','1',upper('$sup_name'),upper('$sup_addr1'),upper('$sup_addr2'), upper('$sup_addr3'),upper('$sup_city'),'$sup_state','$sup_zip' , '$sup_acc_group','Y','$sup_gstin', '$sup_panno','S', '$supcode','$usercode','$today',$reccount )";
	 $result4=mysql_query($query4);      

//echo $query4;

          $query5 = "select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
          $result5 = mysql_query($query5);
          $rec5= mysql_fetch_array($result5);
          $curbalseqno=$rec5['curbal_seqno'];


          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$finid','1')";
          $result6= mysql_query($query6);  

//echo $query6;
          $curbalseqno = $curbalseqno + 1;

          $query6="call acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$finid','90')";
          $result6= mysql_query($query6);  

//echo $query6;
  
}
else
{

        $query2 = "insert into maspur_supplier_master_logs select * from maspur_supplier_master where sup_code = '$supcode'"; 
        $result2=mysql_query($query2);

//echo  $query2;


	$cquery1 = "select ifnull(max(seqno),0) + 1 as reccount  from maspur_supplier_master where sup_code = '$supcode'";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



 $query7 = "update maspur_supplier_master set sup_refname = upper('$sup_refname'),sup_name = upper('$sup_name'),sup_addr1 = upper('$sup_addr1'),sup_addr2 = upper('$sup_addr2'),sup_addr3 = upper('$sup_addr3'),sup_city = upper('$sup_city'),sup_state = '$sup_state', sup_cntry_code = '$sup_cntry_code',sup_zip = '$sup_zip',sup_phone = '$sup_phone',sup_fax = '$sup_fax',sup_email ='$sup_email',sup_web = '$sup_web',sup_grp_code =  '$sup_grp_code',sup_type  = '$sup_type',sup_acc_group = '$sup_acc_group',sup_contact = '$sup_contact',sup_panno = '$sup_panno',sup_tds_type = '$sup_tds_type',sup_gstin = upper('$sup_gstin') ,sup_gst_type = '$sup_gst_type' ,sup_tcs_yn = '$sup_tcs_yn' ,sup_tds_yn = '$sup_tds_yn' ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount , sup_distance = $roaddist   where sup_code = '$supcode'"; 

$result7=mysql_query($query7);

//echo  $query7;

	$query8  = "update acc_ledger_master set led_name = upper('$sup_name'), led_addr1 = upper('$sup_addr1') ,led_addr2 = '$sup_addr2',led_city = '$sup_city',led_grp_code= '$sup_acc_group' ,led_gst_no = '$sup_gstin',led_pan_no = '$sup_panno' ,led_addr3 = upper('$sup_addr3') ,led_state = '$sup_state',led_pin = '$sup_zip' ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount where led_type = 'S' and led_comp_code = 1 and  led_code = '$ledcode'";
        $result8 = mysql_query($query8);        

//echo  $query8;
}
	
if ($savetype === "Add")
{
	if($result1 && $result2 && $result3 && $result4 )
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","supcode":"'.$supcode.'"})';
	}
	else
        {
           echo '({"success":"false","supcode":"'.$supcode.'"})';
	   mysql_query("ROLLBACK");            
	} 
}
else
{
	if( $result7 && $result8)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","supcode":"'.$supcode.'"})';
	}
	else
        {
           echo '({"success":"false","supcode":"'.$supcode.'"})';
	   mysql_query("ROLLBACK");            
	} 
}


?>
