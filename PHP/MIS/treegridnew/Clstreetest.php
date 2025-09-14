	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  

  

    $sql = "select cust_code ,cust_ref,sum(invh_totwt)/1000 invh_totwt ,sum(invh_netamt) invh_netamt  from trnsal_invoice_header,massal_customer where invh_comp_code = 1 and invh_party = cust_code and invh_date between '2024-04-01' and '2024-04-09' group by cust_code,cust_ref";

    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array("id"=>$data->cust_code,"cust_ref"=>$data->cust_ref,"invh_totwt"=>$data->invh_totwt,"invh_netamt"=>$data->invh_netamt);
		array_push($nodearray,$tree_array);
	    }

    echo json_encode($nodearray);
   


?>
