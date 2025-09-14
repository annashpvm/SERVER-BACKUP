<?php
        require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
        session_start();
        $savetype = $_POST['savetype'];

	$griddet   = json_decode($_REQUEST['griddet'],true);
	$rowcnt    = $_REQUEST['cnt'];

        $ItemCode  = $_POST['ItemCode'];
        $ItemName  = $_POST['ItemName'];

	$query1    = "delete from masqc_chemical_parameters where c_itemcode = $ItemCode";
	$result1   = mysql_query($query1);


	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;
		$paracode       = $griddet[$i]['paracode'];
		$specification  = strtoupper($griddet[$i]['specification']);
                if ($specification != '')
                {
         	$query2    = "insert into masqc_chemical_parameters values('$ItemCode','$paracode','$specification')";
         	$result2   = mysql_query($query2);

                } 
        } 

       if ( $result2) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ItemName . '"})';
	} 

	else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $ItemName . '"})';
	}

   
?>
