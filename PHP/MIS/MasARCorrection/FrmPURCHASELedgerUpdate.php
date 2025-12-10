<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

 mysqli_query($conn, "BEGIN");


 $query1 = "update trn_weight_card,maspur_supplier_master  set wc_sup_code = sup_led_code   where wc_sup_code = sup_code and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysqli_query($conn, $query1);


 $query2 = "update trnpur_min_header,maspur_supplier_master  set minh_sup_code = sup_led_code    where minh_sup_code = sup_code and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysqli_query($conn, $query2);


 $query3 = "update trnpur_grn_ret_header,maspur_supplier_master set debh_supcode = sup_led_code  where debh_supcode = sup_code  and debh_comp_code >= 1  and debh_fin_code >= 21  and debh_no >= 0";
 $result3 = mysqli_query($conn, $query3);


 $query4 = "update tmpacc_dbcrnote_header,maspur_supplier_master set dbcr_partycode = sup_led_code   where dbcr_partycode = sup_code  and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysqli_query($conn, $query4);


 $query5 = "update acc_dbcrnote_header,maspur_supplier_master set dbcr_partycode = sup_led_code   where dbcr_partycode = sup_code  and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result5 = mysqli_query($conn, $query5);


 $query6 = "update trn_other_sales,maspur_supplier_master set os_custcode = sup_led_code    where os_custcode = sup_code  and os_compcode >= 1  and os_fincode >= 21  and os_seqno >= 0";
 $result6 = mysqli_query($conn, $query6);


 $query7 = "update trnpur_deliverychallan_header,maspur_supplier_master  set dch_party = sup_led_code    where dch_party = sup_code  and dch_comp_code >= 1  and dch_fincode >= 21 and dch_no >= 0";
 $result7 = mysqli_query($conn, $query7);


 $query8 = "update trnpur_deliverychallan_receipt,maspur_supplier_master  set dcr_party = sup_led_code     where dcr_party = sup_code and dcr_comp_code >= 1  and dcr_fincode >= 21  and dcr_no >= 0";
 $result8 = mysqli_query($conn, $query8);


 $query9 = "update trnrm_receipt_header,maspur_supplier_master set rech_sup_code = sup_led_code where rech_sup_code = sup_code  and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";

 $result9 = mysqli_query($conn, $query9);



 $query10 = "update  trnfu_receipt_header,maspur_supplier_master set rech_sup_code = sup_led_code  where rech_sup_code = sup_code  and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result10 = mysqli_query($conn, $query10);



 $query11 = "update trn_qc_rm_inspection,maspur_supplier_master set qc_rm_supcode = sup_led_code    where qc_rm_supcode = sup_code   and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysqli_query($conn, $query11);


 $query12 = "update trn_qc_fuel_inspection,maspur_supplier_master set qc_fuel_supcode = sup_led_code    where qc_fuel_supcode = sup_code   and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result12 = mysqli_query($conn, $query12);


 $query13 = "update trnpur_purchase_header,maspur_supplier_master   set phd_sup_code = sup_led_code   where phd_sup_code = sup_code and phd_comp_code >= 1  and phd_fin_code >= 21  and phd_pono >= 0";
 $result13 = mysqli_query($conn, $query13);


 $query14 = "update trnrm_order_header,maspur_supplier_master  set ordh_sup_code = sup_led_code  where ordh_sup_code = sup_code  and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_seqno >= 0";
 $result14 = mysqli_query($conn, $query14);


 $query15 = "update trnfu_order_header,maspur_supplier_master  set ordh_sup_code = sup_led_code  where ordh_sup_code = sup_code  and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_seqno >= 0";
 $result15 = mysqli_query($conn, $query15);




if($result1 &&  $result2 && $result3 && $result4 &&  $result5 && $result6 && $result7 &&  $result8 && $result9 && $result10 &&  $result11 && $result12 && $result13 &&  $result14 && $result15 )


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
