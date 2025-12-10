<?php
        require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
        session_start();
        $savetype = $_POST['savetype'];

	$griddet   = json_decode($_REQUEST['griddet'],true);
	$rowcnt    = $_REQUEST['cnt'];

        $ItemCode  = $_POST['ItemCode'];
        $ItemName  = $_POST['ItemName'];

	$query1    = "delete from masqc_chemical_parameters where c_itemcode = $ItemCode";
	$result1   = mysqli_query($conn, $query1);


	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;
		$paracode       = $griddet[$i]['paracode'];
		$specification  = strtoupper($griddet[$i]['specification']);
                if ($specification != '')
                {
         	$query2    = "insert into masqc_chemical_parameters values('$ItemCode','$paracode','$specification')";
         	$result2   = mysqli_query($conn, $query2);

                } 
        } 

       if ( $result2) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $ItemName . '"})';
	} 

	else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $ItemName . '"})';
	}

   
?>
