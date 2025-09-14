<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
 		
$compcode        =  $_POST['compcode'];
$finid           =  $_POST['finid'];
$cust_code       =  $_POST['cust_code'];
$acctrail_inv_no =  $_POST['acctrail_inv_no'];
$adjamt          =  $_POST['acctrail_adj_value'];
$crdays          =  $_POST['acctrail_crdays'];



 mysql_query("BEGIN");



     $query1= "update acc_trail set  acctrail_adj_value = $adjamt, acctrail_crdays = $crdays where acctrail_inv_no ='$acctrail_inv_no' and acctrail_led_code = $cust_code";

     $result1=mysql_query($query1);

        
if($result1)

       {
            mysql_query("COMMIT");                        
            echo '({"success":"true","acctrail_inv_no":"'.$acctrail_inv_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","acctrail_inv_no":"' . $acctrail_inv_no . '"})';
        }   
        

       
 
?>
