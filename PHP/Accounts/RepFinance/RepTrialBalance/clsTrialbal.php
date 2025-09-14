<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  
    $grpparent = $_REQUEST['grpparent'];

  
    $sql = "select grp_code, grp_name, grp_parent_code , 10000 as amt1 from acc_group_master where grp_comp_code = 1 and grp_parent_code = ".$grpparent." and grp_code <> 1 order by grp_code;";

    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    

    if ($nbrows1 >0)
    { 
	    while($data = mysql_fetch_object($result)) {
		$tree_array = array("id"=>$data->grp_code,"text"=>$data->grp_name,"text1"=>$data->amt1);
		array_push($nodearray,$tree_array);
	    }
    }
    else
    {
  
	    $sql = " select led_code, led_name, led_grp_code  from acc_ledger_master where led_grp_code = $grpparent;";

	    $result = mysql_query($sql);
	    $nbrows1 = mysql_num_rows($result);    

	    if ($nbrows1 >0)
	    { 
		    while($data = mysql_fetch_object($result)) {
			$tree_array = array("id"=>$data->led_code,"text"=>$data->led_name);
			array_push($nodearray,$tree_array);
		    }
	    }

    }  
    echo json_encode($nodearray);
?>
