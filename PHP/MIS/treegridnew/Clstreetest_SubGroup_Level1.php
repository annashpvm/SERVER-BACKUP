	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    


    $grpparent = $_POST['grpparent'];

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  


    $sql = "select  level1_grpname, level1_grpcode, sum(debit) debit, sum(credit) credit
from testTB where level2_grpcode =  $grpparent   group by  level1_grpname, level1_grpcode ORDER By level1_grpcode";


    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array("level1_grpcode"=>$data->level1_grpcode,"level1_grpname"=>$data->level1_grpname,"debit"=>$data->debit,"credit"=>$data->credit);
		array_push($nodearray,$tree_array);
	    }

    echo json_encode($nodearray);
   


?>
