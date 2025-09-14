<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task="loadindno";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loaddept":
		getdept();
		break;
		case "loadItemStock":
		getItemStock();
		break;
		case "loaditem":
		getitem();
		break;
		case "loadappno":
		getappno();
		break;
		case "loadsection":
		getsection();
		break;
		case "loadequipment":
		getequipment();
		break;
		case "loadindno":
		getindno();
		break;
		case "loadIndentBalAmt":
		getindBalAmt();
               	break;
		case "loadindentdetails":
		getindentdetails();
               	break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;
		case "loadIndNoList":
		getIndNolist();
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


 function getappno()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select app_code,app_name from maspur_approval where app_name >= 'A' order by app_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getsection()
    {
        mysql_query("SET NAMES utf8");

//	$compcode = $_POST['compcode'];
//	$finid = $_POST['finid'];
//	$dept = $_POST['dept'];
//
//      $machine =  $_POST['machine'];

        $r=mysql_query("select section_name,section_code from trn_expenses_budget , mas_bud_section , mas_department WHERE te_compcode = $compcode and te_fincode = $finid and te_section = section_code  and te_dept = department_code and department_linkcode = '$dept'  and te_machine = '$machine' group by section_name,section_code order by section_name,section_code");

        $r=mysql_query("select section_name,section_code from mas_section group by section_name,section_code  order by section_name");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getequipment()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$machine = $_POST['machine'];
	$section = $_POST['section'];
	$dept = $_POST['dept'];


        $r=mysql_query("select equip_name,equip_code from mas_department a,mas_dept b , trn_expenses_budget c ,mas_equipment d where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section = '$section'  and te_equip = equip_code and te_compcode = '$compcode' and te_fincode =  $finid and te_approved = 'Y' and te_machine = '$machine' group by equip_name,equip_code");


        $r=mysql_query("select equip_name,equip_code from  mas_equipment where equip_section = '$section' order by equip_name,equip_code");

        $r=mysql_query("select equip_name,equip_code from  mas_equipment order by equip_name,equip_code");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getindBalAmt()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$machine = $_POST['machine'];
	$section = $_POST['section'];
	$dept = $_POST['dept'];
	$equip = $_POST['equip'];
 
           
//      $r=mysql_query("select sum(te_amount) as budamt  from mas_department a,mas_dept b , trn_expenses_budget c where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section =  '$section'  and te_equip = '$equip' and te_compcode = 1 and te_fincode = 20  and te_machine = '$machine'");


      $r=mysql_query("select bud - ind_amt as budamt from (select sum(te_amount)*100000 as bud  from mas_department a,mas_dept b , trn_expenses_budget c where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section =  '$section'  and te_equip = '$equip' and te_compcode = $compcode and te_fincode =$finid  and te_machine = '$machine') a , ( select  COALESCE(sum(ind_value),0) as  ind_amt from mas_department a,mas_dept b , trnpur_indent c where a.department_linkcode = b.dept_code and b.dept_Code  = c.ind_dept_code and b.dept_code  = '$dept' and ind_projgrp = '$section'  and ind_equip = '$equip'  and ind_comp_code =$compcode and ind_fin_code = $finid and ind_cancel_status = '' and ind_purtype = 'G' and ind_plant = '$machine') b");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
        $jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getindno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("select ifnull(max(ind_no),0)+1 as ind_no from trnpur_indent where ind_comp_code= '$compcode' and ind_fin_code= '$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 


function getindentdetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$indno = $_POST['indno'];

        $r=mysql_query("call sppur_sel_indent_details ($compcode,$finid,$indno)");
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


//        $qry = "select * from maspur_item_header where item_name like '%$item%'";
        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $qry = "select * from maspur_item_header  order by item_name";
        else
           $qry = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getIndNolist()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$dept =  (int) $_POST['dept'];
        if ($dept == 0)
        $r=mysql_query("select ind_no from trnpur_indent where ind_fin_code = '$finid' and ind_comp_code = '$compcode'   group by ind_no  order by ind_no desc");
        else
        $r=mysql_query("select ind_no from trnpur_indent where ind_dept_code = $dept and ind_fin_code = '$finid' and ind_comp_code = '$compcode'   group by ind_no  order by ind_no desc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
