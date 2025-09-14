	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    


    $grpparent = $_POST['grpparent'];

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  


    $sql = "select  level2_grpname, level2_grpcode, sum(debit) debit, sum(credit) credit
from testTB where main_grpcode =  $grpparent   group by  level2_grpname, level2_grpcode ORDER By level2_grpcode";


    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array("level2_grpcode"=>$data->level2_grpcode,"level2_grpname"=>$data->level2_grpname,"debit"=>$data->debit,"credit"=>$data->credit);
		array_push($nodearray,$tree_array);
	    }

    echo json_encode($nodearray);
   


?>
