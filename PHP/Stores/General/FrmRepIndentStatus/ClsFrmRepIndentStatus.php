<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loaddept":
		getdept();
		break;
		case "loadissno":
		getissno();
		break;
		case "loadissnodetails":
		getissnodetails();
		break;
		case "loadindent":
		getindent();
		break;
		case "loadindentdet":
		getindentdet();
		break;
		case "loadpodet":
		getPOdetails();
		break;

		case "loadGRNdetails":
		getGRNdetails();
		break;
		case "loadIssuedetails":
		getIssuedetails();
		break;		
		case "loadsection":
		getloadsection();
		break;
		case "loadequipment":
		getloadequipment();
		break;
		case "loadcategory":
		getloadcategory();
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
        $r=mysql_query("call sp_sel_dept()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getissnodetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$issno    = $_POST['issno'];
	$isstype  = $_POST['isstype'];

if ($isstype == "IS")
{
 $irtype = "I";
}
else
{
 $irtype = "R";
}

        $r=mysql_query("call sp_pur_issue_details_new($compcode,$finid,$issno,'$irtype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getissno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$isstype = $_POST['isstype'];

if ($isstype == "IS")
{
 $irtype = "I";
}
else
{
 $irtype = "R";
}


        $r=mysql_query("select ifnull(max(iss_no),0) + 1 as issno from trnpur_item_issues where iss_comp_code=$compcode and iss_fin_code=$finid and iss_type = '$irtype'");
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
	$procurstk = $_POST['procurstk'];

        $r=mysql_query("select ind_no,ind_fin_code from trnpur_indent where ind_comp_code = $compcode and ind_fin_code = $finid and ind_dept_code = $deptcode and ind_option = '$procurstk'  group by ind_no,ind_fin_code order by ind_no desc");
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
	$deptcode = $_POST['deptcode'];
	$indno = $_POST['indno'];

$r = mysql_query("select * from trnpur_indent a ,maspur_item_header b  where item_code=ind_item_code and  ind_comp_code = $compcode and ind_fin_code = $finid and ind_dept_code = $deptcode and ind_no = $indno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getPOdetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$deptcode = $_POST['deptcode'];
	$indno    = $_POST['indno'];

$r = mysql_query("select * from trnpur_indent a ,maspur_item_header b  where item_code=ind_item_code and  ind_comp_code = $compcode and ind_fin_code = $finid and ind_dept_code = $deptcode and ind_no = $indno");

$r = mysql_query("select * from trnpur_purchase_header , trnpur_purchase_trailer , maspur_supplier_master ,  maspur_item_header where ptr_item_code = item_code and  phd_sup_code = sup_code and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and phd_comp_code = $compcode and ptr_ind_fin_code = $finid  and ptr_ind_no = $indno ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getGRNdetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$indfinid = $_POST['indfinid'];
	$supcode  = $_POST['supcode'];
	$indno    = $_POST['indno'];

//$r = mysql_query("select * from trnpur_indent a ,maspur_item_header b  where item_code=ind_item_code and  ind_comp_code = $compcode and ind_fin_code = $finid and ind_dept_code = $deptcode and ind_no = $indno");

//$r = mysql_query("select * from trnpur_min_header , trnpur_min_trailer ,  maspur_item_header , maspur_supplier_master where mint_item_code = item_code and  minh_comp_code = mint_comp_code and minh_fin_code =mint_fin_code   and minh_minno = mint_minno   and minh_sup_code = sup_code  and minh_comp_code = $compcode and minh_fin_code = $finid   and mint_ind_fin_code = $indfinid and mint_ind_no = $indno and  minh_sup_code = $supcode");

$r = mysql_query("select * from trnpur_min_header , trnpur_min_trailer ,  maspur_item_header , maspur_supplier_master where mint_item_code = item_code and  minh_comp_code = mint_comp_code and minh_fin_code =mint_fin_code   and minh_minno = mint_minno   and minh_sup_code = sup_code  and minh_comp_code = $compcode and minh_fin_code = $finid and mint_ind_fin_code = $indfinid  and mint_ind_no = $indno  and  minh_sup_code = $supcode ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getIssuedetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$indno    = $_POST['indno'];

$r = mysql_query("select * from trnpur_item_issues a,maspur_item_header b , trnpur_indent c  where a.iss_item_code=c.ind_item_code and  a.iss_item_code=b.item_code and iss_comp_code= ind_comp_code  and iss_fin_code= ind_fin_code  and a.iss_dept_code = c.ind_dept_code and a.iss_indno = c.ind_no and iss_comp_code= $compcode  and iss_fin_code= $finid   and iss_indno= $indno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpodet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$deptcode = $_POST['deptcode'];
	$indno = $_POST['indno'];

	$r = mysql_query("select * from trnpur_purchase_header , trnpur_purchase_trailer , maspur_supplier_master ,  
		maspur_item_header where ptr_item_code = item_code and  phd_sup_code = sup_code 
		and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code and phd_pono = ptr_pono 
		and phd_comp_code = '$compcode'
		and ptr_ref_fin_code = '$finid' 
		and ptr_ref_no = '$indno'");
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

        $r=mysql_query("select section_name , section_code from trn_expenses_budget,mas_bud_section,
mas_department where te_compcode = $compcode and te_fincode = $finid and te_section = section_code
and te_dept = department_code group by section_name,section_code");
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
        $r=mysql_query("select  equip_name,equip_code,section_name,section_code from trn_expenses_budget,mas_bud_section,mas_department , mas_equipment where te_compcode = $compcode  and te_fincode =$finid and te_section = section_code and te_dept = department_code and te_dept = $dept and  section_code = equip_part  and equip_part = $section  group by equip_name,equip_code,section_name,section_code");



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


?>
