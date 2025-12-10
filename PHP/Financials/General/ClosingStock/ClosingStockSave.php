<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

        $griddet = json_decode($_REQUEST['griddet'],true);
        $rowcnt = $_REQUEST['cnt'];
        $ledcode = $_REQUEST['ledcode'];
        $finid = $_REQUEST['finid'];
        $comp= $_REQUEST['comp'];

        mysqli_query($conn, "BEGIN");

        $query = "delete from acc_stock where accstk_comp_code='$comp' and accstk_led_code='$ledcode' and accstk_fin_id='$finid'";
        $result= mysqli_query($conn, $query);

        for ($i=0;$i<$rowcnt;$i++){
            $monthcode = $griddet[$i]['month_code'];
            $open = $griddet[$i]['open'];
            $close = $griddet[$i]['close'];

	    $query1 = "select ifnull(max(accstk_seqno),0) + 1 as accstk_seqno from acc_stock;";
	    $result1 = mysqli_query($conn, $query1);
	    $rec1 = mysqli_fetch_array($result1);
	    $accstkseqno=$rec1['accstk_seqno'];
		
            $query2 = "insert into acc_stock values ('$accstkseqno','$ledcode','$comp','$finid','$monthcode','$open','$close')";
            $result2 = mysqli_query($conn, $query2);
        }

        if ($result&&$result2)
        {
            mysqli_begin_transaction($conn);
            echo '({"success":"true"})';
        }
        else
        {
            mysqli_rollback($conn);


            echo '({"success":"false"})';
        }
  
?>
