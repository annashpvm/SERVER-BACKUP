<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loaditemgroup":
		getitemgroup();
		break;
		case "loadunit":
		getunit();
		break;
		case "loadhsn":
		gethsn();
		break;
		case "loaditemlist":
		getitemlist();
		break;
		case "itemcodechk":
		getitemcodechk();
		break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getitemgroup()
    {
        global $conn;
//        $sql = "select grp_code,grp_name from maspur_group";
        $sql = "select subgrp_code ,  concat(subgrp_name,' -> ', grp_name)  groupname   from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code";
        $sql = "select subgrp_code , subgrp_name groupname from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code order by subgrp_name ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getunit()
    {
        global $conn;
        $sql = "select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getitemcodechk()
    {
	$itemnam = $_POST['item'];
        global $conn;
	$sql = "select count(*) as cnt from maspur_item_header where item_name = '$itemname'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function gethsn()
    {
        global $conn;
        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getitemlist()
    {
        global $conn;
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

//$sql = "select a.item_group_code, a.item_code, a.item_name, a.item_usage,b.item_avg_rate, a.item_qcchk, b.item_stock, f.loc_name,b.item_lpur_date, b.item_liss_date,c.uom_short_name,  d.grp_name,e.hsn_code,e.hsn_sno,c.uom_code from maspur_item_header a, maspur_item_trailer b , mas_uom c , maspur_group d ,mas_hsncode e, maspur_location f where b.item_loc_code =  f.loc_code and a.item_code = b.item_code and a.item_group_code =  d.grp_code and a.item_uom = c.uom_code and a.item_hsncode = e.hsn_sno and b.item_comp_code = '$compcode' and b.item_fin_code = '$finid' order by a.item_name";

$sql = "select a.item_group_code, a.item_code, a.item_name, a.item_usage,b.item_avg_rate, a.item_qcchk, b.item_stock, f.loc_name, b.item_lpur_date, b.item_liss_date,c.uom_short_name,  d.grp_name,e.hsn_code,e.hsn_sno,c.uom_code,  g.subgrp_name,d.grp_code,g.subgrp_code from   maspur_item_header a, maspur_item_trailer b , mas_uom c , maspur_group d ,mas_hsncode e, maspur_location f ,maspur_subgroup g   where b.item_loc_code =  f.loc_code and a.item_code = b.item_code   and  a.item_group_code =  g.subgrp_code   and  g.subgrp_grpcode =  d.grp_code  and a.item_uom = c.uom_code and a.item_hsncode = e.hsn_sno and b.item_comp_code = '1' and b.item_fin_code = '22' order by a.item_name";


$sql = "select a.item_group_code, a.item_code, a.item_name, a.item_usage, a.item_qcchk, uom_short_name,  d.grp_name, c.uom_code,  g.subgrp_name,d.grp_code,g.subgrp_code,item_hsncode from maspur_item_header a , mas_uom c , maspur_group d  ,maspur_subgroup g  where a.item_group_code =  g.subgrp_code and  g.subgrp_grpcode =  d.grp_code  and a.item_uom = c.uom_code  order by a.item_name";


//echo $sql;

$r=mysqli_query($conn, $sql);

/*$sql = "select * from maspur_item_header a,  mas_uom c , maspur_group d ,mas_hsncode e where 
 a.item_group_code =  d.grp_code and a.item_uom = c.uom_code and
a.item_hsncode = e.hsn_sno order by item_name ";*/

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchitemlist()
    {
        global $conn;
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
//        $item     = $_POST['item'];
        $item     = strtoupper($_POST['item']);

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $sql = "select * from maspur_item_header  order by item_name";
        else
           $sql = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         




//$qry = "select * from maspur_item_header where item_name like '%$item%' order by item_name";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
