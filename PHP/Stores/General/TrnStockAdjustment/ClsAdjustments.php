<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadDept":
		getdept();
		break;
		case "loadItemStock":
		getItemStock();
		break;
		case "loadAdjNo":
		getAdjNo();
		break;
		case "loadAdjNoDetails":
		getAdjNoDetails();
		break;
		case "loadindent":
		getindent();
		break;
		case "loadindentdet":
		getindentdet();
		break;
		case "loadSection":
		getloadsection();
		break;
		case "loadEquipment":
		getloadequipment();
		break;
		case "loadcategory":
		getloadcategory();
		break;
		default:
		case "loaditem":
		getitem();
		break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;
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



function getAdjNodetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$issno    = $_POST['issno'];
	$isstype  = $_POST['isstype'];


        $r=mysql_query("call sp_pur_issue_details($compcode,$finid,$issno,'$isstype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getAdjNo()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$adjtype = $_POST['adjustmenttype'];


        $r=mysql_query("select ifnull(max(iss_no),0) + 1 as adjdocno from trnpur_item_issues where iss_comp_code=$compcode and iss_fin_code=$finid and iss_type = '$adjtype'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getindent()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$deptcode = $_POST['deptcode'];
	$isstype = $_POST['isstype'];

if ($isstype == "IS")
{
        $r=mysql_query("select ind_no,ind_fin_code from trnpur_indent where ind_comp_code = $compcode and ind_fin_code = $finid and ind_dept_code = $deptcode  and ind_hod_auth = 'Y' and ind_bal_qty <> 0 group by ind_no,ind_fin_code order by ind_no desc");
}
else
{
        $r=mysql_query("select iss_indno as ind_no,iss_fin_code from trnpur_item_issues where iss_comp_code = $compcode and iss_fin_code = $finid and iss_dept_code = $deptcode group by iss_indno,iss_fin_code order by iss_indno desc");
}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getindentdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$indno = $_POST['indno'];
	$isstype = $_POST['isstype'];
	$indcompcode = $_POST['indcompcode'];

if ($isstype === "IS")
{
    if ($savetype == "Add") 
    {
        $r=mysql_query("select a.*,b.item_name as item_name,c.app_name as app_name,e.*,f.* ,g.*,item_avg_rate,item_stock                      
from trnpur_indent a, maspur_item_header b,maspur_approval c, mas_bud_section e , mas_equipment f ,mas_uom g ,maspur_item_trailer h                   
Where a.ind_item_code = b.item_code and a.ind_approval_status = c.app_code      and ind_comp_code = $indcompcode
      and ind_fin_code = $finid and ind_projgrp = section_code and a.ind_no = $indno  and ind_equip = equip_code             
      and item_comp_code = $compcode     and item_fin_code   = $finid  and item_uom = uom_code  and b.item_code = h.item_code            
      and ind_bal_qty > 0 order by ind_slno");
    }
    else
    {
        $r=mysql_query("select a.*,b.item_name as item_name,c.app_name as app_name,e.*,f.* ,g.*,item_avg_rate,item_stock                      
from trnpur_indent a, maspur_item_header b,maspur_approval c, mas_bud_section e , mas_equipment f ,mas_uom g ,maspur_item_trailer h                   
Where a.ind_item_code = b.item_code and a.ind_approval_status = c.app_code      and ind_comp_code =  $indcompcode                     
      and ind_fin_code = $finid and ind_projgrp = section_code and a.ind_no = $indno  and ind_equip = equip_code             
      and item_comp_code = $compcode     and item_fin_code   = $finid  and item_uom = uom_code  and b.item_code = h.item_code order by ind_slno");
    }  
}
else
{
$r=mysql_query("select * from trnpur_item_issues  a, maspur_item_header b,mas_bud_section c , mas_equipment d , mas_uom e ,  maspur_item_trailer f where   iss_item_code = b.item_code and iss_comp_code = $compcode  and iss_fin_code =  $finid  and  iss_indno = $indno and iss_section = section_code and iss_equip = equip_code and item_uom = uom_code and iss_item_code = f.item_code and iss_comp_code = item_comp_code   and iss_fin_code = f.item_fin_code");

}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getloadsection()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $r=mysql_query("select section_name,section_code from mas_section group by section_name,section_code  order by section_name");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getloadequipment()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$section = $_POST['section'];
	$dept = $_POST['dept'];
        $r=mysql_query("select equip_name,equip_code from  mas_equipment where equip_section = '$section' order by equip_name,equip_code");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getloadcategory()
    {
        mysql_query("SET NAMES utf8");
	/*$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$deptcode = $_POST['deptcode'];*/
        $r=mysql_query("select cat_code,cat_name from maspur_category where cat_code in(2,3,4)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getitem()
    {
        mysql_query("SET NAMES utf8");

	$finid = $_POST['finid'];


//        $r=mysql_query("select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_stock > 0 and item_comp_code in (1,3,5,8) and item_fin_Code = '$finid'  group by item_name,a.item_Code order by item_name");
//        $r=mysql_query("select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_stock > 0 and item_comp_code in (1,3,5,8) and item_fin_Code = '$finid'  group by item_name,a.item_Code order by item_name");

        $r=mysql_query("select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_comp_code in (1,3,5,8) and b.item_fin_Code = $finid AND a.item_code <> 5443 group by item_name,a.item_Code order by item_name");

        $r=mysql_query("select item_name,item_code from maspur_item_header group by item_name,item_Code order by item_name");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getItemStock()
    {
        mysql_query("SET NAMES utf8");
	$item = $_POST['itemcode'];
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];



        $r=mysql_query("select a.item_code,item_avg_rate,uom_short_name,b.item_stock  from maspur_item_header a, maspur_item_trailer b, mas_uom c where uom_code = a.item_uom and a.item_code = b.item_code and  b.item_comp_code =$compcode and b.item_fin_code =$finid  and  a.item_code = $item");
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



	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $qry = "select * from maspur_item_header  order by item_name";
        else
           $qry = "select * from maspur_item_header h , maspur_item_trailer t   where item_comp_code = $compcode and item_fin_code = $finid  and h.item_code = t.item_code and  replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         

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
