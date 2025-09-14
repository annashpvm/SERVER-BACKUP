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
		case "loaditemDetail":
		getitemDetail();
		break;
		case "loadLocation":
		getLocation();
		break;
		case "loaditemMonthwiseDetail":
		getitemMonthwiseDetail();
		break;
		case "loadItem_Ledger":
		getItemLedger();
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
           $qry = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         




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

 function getitemDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];

        $qry = "select *  from maspur_item_header h,maspur_item_trailer t , maspur_subgroup sg  , maspur_group mg , mas_uom u where  item_group_code = subgrp_code and subgrp_grpcode = grp_code and uom_code = item_uom and
 item_comp_code = $compcode and item_fin_code = $finid  and h.item_code = t.item_code and h.item_code = $item";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getLocation()
    {
        mysql_query("SET NAMES utf8");


        $qry = "select * from maspur_location order by loc_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getitemMonthwiseDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];
/*
        $qry = "
select item_code,rmonth, sum(rec_qty) rec_qty, round(sum(rec_val),2) rec_val, sum(iss_qty) iss_qty , round(sum(iss_val),2)   iss_val from

(select mint_item_code item_code, UPPER(monthname(mint_mindate)) as rmonth , sum(mint_rcvd_qty)  rec_qty  ,sum(mint_value)   rec_val , 0 as iss_qty, 0 as iss_val     
from trnpur_min_trailer where mint_comp_code = $compcode and   mint_item_code = $item AND mint_fin_code = $finid group by mint_item_code , UPPER(monthname(mint_mindate))

union all
select debt_item_code item_code, UPPER(monthname(debt_date)) as rmonth ,   sum(debt_qty)*-1 rec_qty , sum(debt_item_value) *-1 rec_val  ,0  iss_qty, 0 iss_val from  trnpur_grn_ret_trailer   where       
debt_comp_code = $compcode and  debt_item_code =$item  and debt_fin_code = $finid  group by debt_item_code , UPPER(monthname(debt_date))

union all
select  iss_item_code item_code, UPPER(monthname(iss_date)) as rmonth ,   0 rec_qty , 0 rec_val ,
sum(iss_qty) iss_qty  ,sum((iss_qty * iss_rate) )  iss_val  from trnpur_item_issues  
where  iss_comp_code = $compcode and  iss_fin_code  = $finid and iss_type in ('IS','AM')  AND iss_item_code =$item
group by iss_item_code , UPPER(monthname(iss_date))

union all
select  iss_item_code item_code, UPPER(monthname(iss_date)) as rmonth ,   sum(iss_qty) rec_qty , sum((iss_qty * iss_rate) )  rec_val ,
0 iss_qty  ,0 iss_val  from trnpur_item_issues  
where  iss_comp_code = $compcode and  iss_fin_code  = $finid and iss_type in ('IR','AP')  AND iss_item_code =$item
group by iss_item_code , UPPER(monthname(iss_date))
) a1 group by item_code,rmonth   ";

*/
        $qry = "call spst_rep_stock_item_Month_Abstract($compcode ,$finid,$item)";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItemLedger()
    {
        mysql_query("SET NAMES utf8");
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
        $item      = $_POST['item'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];


        $qry="call sp_pur_rep_storeledger_item($compcode ,'$finid', '$item','$startdate' ,'$enddate' )"; 

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
