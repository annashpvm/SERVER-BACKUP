	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    


    $grpparent = $_POST['grpparent'];

    $tree_array = [];
    $nodearray = [];
    global $conn;  


    $sql = "select  ledgername, ledgercode, sum(debit) debit, sum(credit) credit
from testTB where level1_grpcode =  $grpparent   group by  ledgername, ledgercode ORDER By ledgername";


    $result = mysqli_query($conn, $sql);
    $nbrows1 = mysqli_num_rows($result);    
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array("ledgercode"=>$data->ledgercode,"ledgername"=>$data->ledgername,"debit"=>$data->debit,"credit"=>$data->credit);
		array_push($nodearray,$tree_array);
	    }

    echo json_encode($nodearray);
   


?>
