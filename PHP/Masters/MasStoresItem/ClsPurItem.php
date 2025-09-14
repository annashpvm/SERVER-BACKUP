<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
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
    
   
 function getitemgroup()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select grp_code,grp_name from maspur_group");
        $r=mysql_query("select subgrp_code ,  concat(subgrp_name,' -> ', grp_name)  groupname   from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code");
        $r=mysql_query("select subgrp_code , subgrp_name groupname from  maspur_subgroup, maspur_group where subgrp_grpcode = grp_code order by subgrp_name ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getunit()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getitemcodechk()
    {
	$itemnam = $_POST['item'];
        mysql_query("SET NAMES utf8");
	mysql_query("select count(*) as cnt from maspur_item_header where item_name = '$itemname'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function gethsn()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getitemlist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

//$qry = "select a.item_group_code, a.item_code, a.item_name, a.item_usage,b.item_avg_rate, a.item_qcchk, b.item_stock, f.loc_name,b.item_lpur_date, b.item_liss_date,c.uom_short_name,  d.grp_name,e.hsn_code,e.hsn_sno,c.uom_code from maspur_item_header a, maspur_item_trailer b , mas_uom c , maspur_group d ,mas_hsncode e, maspur_location f where b.item_loc_code =  f.loc_code and a.item_code = b.item_code and a.item_group_code =  d.grp_code and a.item_uom = c.uom_code and a.item_hsncode = e.hsn_sno and b.item_comp_code = '$compcode' and b.item_fin_code = '$finid' order by a.item_name";

$qry = "select a.item_group_code, a.item_code, a.item_name, a.item_usage,b.item_avg_rate, a.item_qcchk, b.item_stock, f.loc_name, b.item_lpur_date, b.item_liss_date,c.uom_short_name,  d.grp_name,e.hsn_code,e.hsn_sno,c.uom_code,  g.subgrp_name,d.grp_code,g.subgrp_code from   maspur_item_header a, maspur_item_trailer b , mas_uom c , maspur_group d ,mas_hsncode e, maspur_location f ,maspur_subgroup g   where b.item_loc_code =  f.loc_code and a.item_code = b.item_code   and  a.item_group_code =  g.subgrp_code   and  g.subgrp_grpcode =  d.grp_code  and a.item_uom = c.uom_code and a.item_hsncode = e.hsn_sno and b.item_comp_code = '1' and b.item_fin_code = '22' order by a.item_name";


$qry = "select a.item_group_code, a.item_code, a.item_name, a.item_usage, a.item_qcchk, uom_short_name,  d.grp_name, c.uom_code,  g.subgrp_name,d.grp_code,g.subgrp_code,item_hsncode from maspur_item_header a , mas_uom c , maspur_group d  ,maspur_subgroup g  where a.item_group_code =  g.subgrp_code and  g.subgrp_grpcode =  d.grp_code  and a.item_uom = c.uom_code  order by a.item_name";


//echo $qry;

$r=mysql_query($qry);

/*$r=mysql_query("select * from maspur_item_header a,  mas_uom c , maspur_group d ,mas_hsncode e where 
 a.item_group_code =  d.grp_code and a.item_uom = c.uom_code and
a.item_hsncode = e.hsn_sno order by item_name ");*/

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchitemlist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $qry = "select * from maspur_item_header  order by item_name";
        else
           $qry = "select * from maspur_item_header where left(item_name,2) != 'ZZ'  and replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         




//$qry = "select * from maspur_item_header where item_name like '%$item%' order by item_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
