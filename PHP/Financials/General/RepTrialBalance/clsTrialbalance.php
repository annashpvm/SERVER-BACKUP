<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
  
    $thisref=array();
    mysql_query("SET NAMES utf8");  
    $grpparent = $_REQUEST['grpparent'];
    $sql = "select grp_code, grp_name, grp_parent_code from acc_group_master where grp_comp_code = 1 and grp_parent_code = ".$grpparent.";";

    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);
    
    while($data = mysql_fetch_assoc($result)) {
        $thisref['account_id'] = $data['grp_code'];
        $thisref['AccountName'] = $data['grp_name'];
        $thisref['parent_id'] = $data['grp_parent_code'];
        $thisref['leaf'] = 'true';
    }
    echo json_encode($thisref);
?>
