<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  
    $grpparent = $_REQUEST['grpparent'];
    $sql = "select grp_code, grp_name, grp_parent_code from acc_group_master where grp_comp_code = 1 and grp_parent_code = ".$grpparent." order by grp_code;";
    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    
    while($data = mysql_fetch_object($result)) {
        $tree_array = array("id"=>$data->grp_code,"text"=>$data->grp_name);
        array_push($nodearray,$tree_array);
    }
    echo json_encode($nodearray);
?>
