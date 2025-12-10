	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

 mysqli_query($conn, "BEGIN");


 $query1 = "update trnsal_delivery_address,massal_customer set d_custcode = cust_led_code  where  d_custcode = cust_code";
 $result1 = mysqli_query($conn, $query1);


 $query2 = "update massal_rate,massal_customer set rate_cust = cust_led_code where   rate_cust = cust_code  and rate_comp_code >=1  and rate_fincode >= 21 and rate_code =0";
 $result2 = mysqli_query($conn, $query2);


 $query3 = "update massal_target,massal_customer  set customer_code = cust_led_code  where  customer_code = cust_code and customer_code >= 0";
 $result3 = mysqli_query($conn, $query3);



 $query4 = "update trnsal_order_header ,massal_customer set ordh_party = cust_led_code  where  ordh_party = cust_code  and ordh_comp_code >= 1 and ordh_fincode >=21  and ordh_sono >= 1";
 $result4 = mysqli_query($conn, $query4);


 $query5 = "update trnsal_desp_advice ,massal_customer  set da_cust = cust_led_code  where  da_cust = cust_code  and da_comp_code >= 1 and da_fincode >=21  and da_no >= 0";
 $result5 = mysqli_query($conn, $query5);


 $query6 = "update trnsal_packslip_header,massal_customer  set pckh_party = cust_led_code  where  pckh_party = cust_code and pckh_comp_code >= 1 and pckh_fincode >=21 and pckh_no = 0";
 $result6 = mysqli_query($conn, $query6);


 $query7 = "update trnsal_invoice_header,massal_customer set invh_party = cust_led_code where  invh_party = cust_code  and invh_comp_code >= 1 and invh_fincode >=21 and invh_seqno  >= 0";
 $result7 = mysqli_query($conn, $query7);


 $query8 = "update trnsal_stock_transfer,massal_customer set tr_party_from = cust_led_code where  tr_party_from = cust_code   and tr_compcode >= 1 and tr_finyear >=21  and tr_entno >= 0";
 $result8 = mysqli_query($conn, $query8);


 $query9 = "update trnsal_stock_transfer,massal_customer set tr_party_to = cust_led_code where  tr_party_to = cust_code   and tr_compcode >= 1 and tr_finyear >=21  and tr_entno >= 0";
 $result9 = mysqli_query($conn, $query9);



 $query10 = "update trnsal_salret_header,massal_customer set  reth_cust = cust_led_code  where  reth_cust = cust_code   and reth_comp_code >= 1 and reth_fincode >=21  and reth_no >= 0";
 $result10 = mysqli_query($conn, $query10);


 $query11 = "update trn_delivery_note,massal_customer   set dn_custcode = cust_led_code where  dn_custcode = cust_code    and dn_comp_code >= 1 and dn_fincode >=21  and dn_no >= 0";
 $result11 = mysqli_query($conn, $query11);


 $query12 = "update trn_delivery_challan,massal_customer set dc_custcode = cust_led_code  where  dc_custcode = cust_code    and dc_comp_code >= 1 and dc_fincode >=21  and dc_no >= 0 and dc_seqno >= 0";
 $result12 = mysqli_query($conn, $query12);


 $query13 = "update trnsal_bundle_receipt,massal_customer   set br_custcode = cust_led_code  where  br_custcode = cust_code  and br_comp_code >=1 and br_fincode >=21 and br_no >= 0";
 $result13 = mysqli_query($conn, $query13);


 $query14 = "update trnsal_bundle_receipt,massal_customer   set br_cutter = cust_led_code  where  br_cutter = cust_code  and br_comp_code >=1 and br_fincode >=21 and br_no >= 0";
 $result14 = mysqli_query($conn, $query14);


 $query15 = "update trn_delivery_challan_reel_receipt,massal_customer set dcrr_cutter = cust_led_code  where  dcrr_cutter = cust_code  and dcrr_comp_code >=1 and dcrr_fincode >=21 and dcrr_no >= 0";
 $result15 = mysqli_query($conn, $query15);


 $query16 = "update trnsal_sample,massal_customer  set rs_customer = cust_led_code where  rs_customer = cust_code   and rs_compcode >=1 and rs_finyear >=21 and rs_entno >= 0";
 $result16 = mysqli_query($conn, $query16);

 $query17 = "update trnsal_proforma_invoice,massal_customer  set invh_party = cust_led_code  where  invh_party = cust_code   and invh_comp_code >= 1 and invh_fincode >=21  and invh_no >= 0";
 $result17 = mysqli_query($conn, $query17);



if($result1 &&  $result2 && $result3 && $result4 &&  $result5 && $result6 && $result7 &&  $result8 && $result9 && $result10 &&  $result11 && $result12 && $result13 &&  $result14 && $result15 && $result16 &&  $result17)



       {
           mysqli_query($conn, "COMMIT");                       
            echo '({"success":"true"})';
        }
        else
        {
            mysqli_rollback($conn);

            
          
	    echo '({"success":"false"})';
        }   
        

       
 
?>
