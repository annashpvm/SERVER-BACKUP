	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

 mysql_query("BEGIN");

/*

 $query10 = "insert into ledger (
cust_code, cust_led_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_grace_days, cust_repr, cust_panno, cust_gstin, cust_dealer, cust_smsno, cust_partygroup, cust_noof_visits1, cust_desp_target1, cust_payperf1, cust_tcs_applied, cust_distance, cust_addnlwt, createdby, createddate, seqno, cust_lock, cust_overdue_msg, cust_area, cust_addnl_cd_days)
 select * from massal_customer;";
 $result10 = mysql_query($query10);


 $query1 = "select * from acc_ledger_master where led_code>0 and led_type = 'G'";
 $result1 = mysql_query($query1);

 while ($row = mysql_fetch_assoc($result1)) {

    $ledcode = $row['led_code'];
    $ledname = $row['led_name'];
    $ledgrpcode = $row['led_grp_code'];

    $query11 = "insert into ledger(
cust_code, cust_led_code, cust_ref, cust_name, cust_acc_group,cust_type,cust_add1,cust_add2)
values($ledcode,$ledcode,'$ledname',' $ledname',$ledgrpcode,'G','','')";



    $query11 = "insert into ledger(
cust_code, cust_led_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_grace_days, cust_repr, cust_panno, cust_gstin, cust_dealer, cust_smsno, cust_partygroup, cust_noof_visits1, cust_desp_target1, cust_payperf1, cust_tcs_applied, cust_distance, cust_addnlwt, cust_lock, cust_overdue_msg, cust_area, cust_addnl_cd_days, cust_acc_group, cust_gst_type, cust_tds_type, cust_tds_yn, cust_wp_gstinv_supplier_yn, cust_type)

values(

$ledcode,$ledcode,'$ledname',' $ledname','','','','',0,
0,'','','','','','0',0,
0,0,'0','0',0,'0',0,0,
0,0,'N','0', 0,0,'N',
0,0,$ledgrpcode,'0','0','',  
  '','G')";


    $result11 = mysql_query($query11);


//     echo $query11;
//     echo "<br>";

}

 mysql_free_result($result11); 	

*/

 $query2 = "select * from maspur_supplier_master , acc_ledger_master where led_type = 'S' and sup_code = led_custcode";
 $query2 = "select * from maspur_supplier_master where sup_code >0 and  sup_update = 'N'";
 $result2 = mysql_query($query2);
 while ($row = mysql_fetch_assoc($result2)) {



    $sup_code = $row['sup_code'];
    $sup_led_code = $row['sup_led_code'];
    $sup_name = trim($row['sup_name']);
    $sup_refname = trim($row['sup_refname']);
    $sup_addr1 = trim($row['sup_addr1']); 
    $sup_addr2 = trim($row['sup_addr2']);
    $sup_addr3 = trim($row['sup_addr3']);  
    $sup_city = trim($row['sup_city']);  
    $sup_state = $row['sup_state'];
    $sup_cntry_code = $row['sup_cntry_code'];
    $sup_zip = $row['sup_zip'];
    $sup_phone = $row['sup_phone'];
    $sup_email = strtolower($row['sup_email']);
    $sup_web = $row['sup_web']; 


    $sup_smsno = $row['sup_phone'];

    $sup_smsno = str_replace(' ','',$sup_smsno);
    $sup_smsno = trim(str_replace(',','',$sup_smsno));;

    $sup_smsno = substr($row['sup_phone'],0,9);




 $itemname2=str_replace('"','',$itemname);
    $sup_acc_group = $row['sup_acc_group'];  
    $sup_contact = $row['sup_contact'];
    $sup_gstin = $row['sup_gstin'];  
    $sup_panno = $row['sup_panno'];
    $sup_type = $row['sup_type'];

    $sup_tds_type  = (int) $row['sup_tds_type']; 
    $sup_tds_yn = $row['sup_tds_yn']; 
    $sup_tcs_yn = $row['sup_tcs_yn']; 
    $sup_distance = $row['sup_distance'];
    $sup_wp_gstinv_supplier_yn = $row['sup_wp_gstinv_supplier_yn'];  
    $sup_gst_type = $row['sup_gst_type'];





    $query21 = "insert into massal_customer(
cust_code,cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_grace_days, cust_repr, cust_panno, cust_gstin, cust_dealer, cust_smsno, cust_partygroup, cust_noof_visits1, cust_desp_target1, cust_payperf1, cust_tcs_applied, cust_distance, cust_addnlwt, cust_lock, cust_overdue_msg, cust_area, cust_addnl_cd_days, cust_acc_group, cust_gst_type, cust_tds_type, cust_tds_yn, cust_wp_gstinv_supplier_yn, cust_type)
values(

$sup_code,'$sup_refname','$sup_name','$sup_addr1','$sup_addr2','$sup_addr3','$sup_city',$sup_state,
$sup_cntry_code,'$sup_zip','$sup_phone','$sup_email','$sup_web','$sup_contact','$sup_type',0,
0,0,'$sup_panno','$sup_gstin',0,'$sup_smsno',0,0,
0,0,'$sup_tcs_yn','$sup_distance', 0,0,'N',
0,0,$sup_acc_group,'$sup_gst_type','$sup_tds_type','$sup_tds_yn',  
  '$sup_wp_gstinv_supplier_yn','S')";




    $result21 = mysql_query($query21);




   }

 mysql_free_result($result21); 	

 $query2 = "UPDATE maspur_supplier_master set sup_update = 'Y' where  sup_code > 0 and sup_led_code >0 and sup_update = 'N'";
 $result2 = mysql_query($query2);



if( $result2 && $result21 )
       {
            mysql_query("COMMIT");                        
            echo '({"success":"true"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false"})';
        }   
        

       
 
?>
