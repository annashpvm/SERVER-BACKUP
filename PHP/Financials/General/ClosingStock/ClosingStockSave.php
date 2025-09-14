<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

        $griddet = json_decode($_REQUEST['griddet'],true);
        $rowcnt = $_REQUEST['cnt'];
        $ledcode = $_REQUEST['ledcode'];
        $finid = $_REQUEST['finid'];
        $comp= $_REQUEST['comp'];

        mysql_query("BEGIN");

        $query = "delete from acc_stock where accstk_comp_code='$comp' and accstk_led_code='$ledcode' and accstk_fin_id='$finid'";
        $result= mysql_query($query);

        for ($i=0;$i<$rowcnt;$i++){
            $monthcode = $griddet[$i]['month_code'];
            $open = $griddet[$i]['open'];
            $close = $griddet[$i]['close'];

	    $query1 = "select ifnull(max(accstk_seqno),0) + 1 as accstk_seqno from acc_stock;";
	    $result1 = mysql_query($query1);
	    $rec1 = mysql_fetch_array($result1);
	    $accstkseqno=$rec1['accstk_seqno'];
		
            $query2 = "insert into acc_stock values ('$accstkseqno','$ledcode','$comp','$finid','$monthcode','$open','$close')";
            $result2 = mysql_query($query2);
        }

        if ($result&&$result2)
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
