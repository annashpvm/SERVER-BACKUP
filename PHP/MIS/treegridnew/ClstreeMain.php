	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

header('Content-Type: application/json');
    

    $tree_array = [];
    $nodearray = [];
    global $conn;  

  

    $sql = "select  main_grpname, main_grpcode, sum(debit) debit, sum(credit) credit
from testTB  group by  main_grpname, main_grpcode ORDER By main_grpcode";

    $result = mysqli_query($conn, $sql);
    $nbrows1 = mysqli_num_rows($result);    
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array(
        "id" => $data->main_grpcode,
        "text" => $data->main_grpname, 
"main_grpcode"=>$data->main_grpcode,"main_grpname"=>$data->main_grpname,"debit"=>$data->debit,"credit"=>$data->credit , "leaf" => false  );
		array_push($nodearray,$tree_array);
	    }

    echo json_encode($nodearray);
   


?>
