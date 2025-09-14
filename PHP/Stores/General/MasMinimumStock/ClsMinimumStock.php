<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
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
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   

   
 function getdept()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call sp_sel_dept_new()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   
 function getitemgroup()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select subgrp_code , subgrp_name groupname from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code order by subgrp_name ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getGroupItemList()
    {
        mysql_query("SET NAMES utf8");
       

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $grpcode  = $_POST['grpcode'];
        $dept     = $_POST['dept'];

        $r=mysql_query("select ih.item_code , ih.item_name,uom_short_name, item_reorder_stock from maspur_item_header ih
        join maspur_item_trailer it on ih.item_code = it.item_code  and it.item_comp_code = $compcode and it.item_fin_code = $finid  join mas_uom uom  on ih.item_uom = uom.uom_code 
        where item_group_code = $grpcode  order by item_name");



        $r= "select ih.item_code , ih.item_name,uom_short_name, case when minstk_qty is null then 0 else minstk_qty end as minstk_qty  from maspur_item_header ih left join maspur_item_minimum_stock it on ih.item_code = it.minstk_itemcode join mas_uom uom  on ih.item_uom = uom.uom_code where item_group_code = $grpcode  order by item_name";



        $r=mysql_query(" select item_code, item_name, uom_short_name, sum(minstk_qty) minstk_qty  from (
 select ih.item_code , ih.item_name,uom_short_name, 0 minstk_qty from  maspur_item_header ih  join mas_uom uom on ih.item_uom = uom.uom_code   where item_group_code = $grpcode  
 union all
 select ih.item_code , ih.item_name,uom_short_name, case when minstk_qty is null then 0 else minstk_qty end as minstk_qty from 
maspur_item_header ih  join maspur_item_minimum_stock it on ih.item_code = it.minstk_itemcode  and minstk_dept = $dept 
 join mas_uom uom on ih.item_uom = uom.uom_code and minstk_grpcode = $grpcode ) a1 group by  item_code, item_name, uom_short_name order by item_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
