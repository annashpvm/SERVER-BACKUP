<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

		case "loaddept":
		getdept();
		break;

		case "loaditemgroup":
		getitemgroup();
		break;

		case "loadGroupItemList":
                getGroupItemList();
		break;


	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }


    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

   
 function getdept()
    {
        global $conn; 
        $sql = "call sp_sel_dept_new()";
        $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
 function getitemgroup()
    {
        global $conn; 
        $sql = "select subgrp_code , subgrp_name groupname from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code order by subgrp_name ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getGroupItemList()
    {
        mysqli_set_charset($conn, "utf8");
       

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $grpcode  = $_POST['grpcode'];
        $dept     = $_POST['dept'];

        $sql = "select ih.item_code , ih.item_name,uom_short_name, item_reorder_stock from maspur_item_header ih
        join maspur_item_trailer it on ih.item_code = it.item_code  and it.item_comp_code = $compcode and it.item_fin_code = $finid  join mas_uom uom  on ih.item_uom = uom.uom_code 
        where item_group_code = $grpcode  order by item_name";



        $r= "select ih.item_code , ih.item_name,uom_short_name, case when minstk_qty is null then 0 else minstk_qty end as minstk_qty  from maspur_item_header ih left join maspur_item_minimum_stock it on ih.item_code = it.minstk_itemcode join mas_uom uom  on ih.item_uom = uom.uom_code where item_group_code = $grpcode  order by item_name";



        $sql = " select item_code, item_name, uom_short_name, sum(minstk_qty) minstk_qty  from (
 select ih.item_code , ih.item_name,uom_short_name, 0 minstk_qty from  maspur_item_header ih  join mas_uom uom on ih.item_uom = uom.uom_code   where item_group_code = $grpcode  
 union all
 select ih.item_code , ih.item_name,uom_short_name, case when minstk_qty is null then 0 else minstk_qty end as minstk_qty from 
maspur_item_header ih  join maspur_item_minimum_stock it on ih.item_code = it.minstk_itemcode  and minstk_dept = $dept 
 join mas_uom uom on ih.item_uom = uom.uom_code and minstk_grpcode = $grpcode ) a1 group by  item_code, item_name, uom_short_name order by item_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
