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

		case "IndnoDetail":
		getIndnoDetail();
		break;
		case "Indnoqty":
		getIndnoqty();
		break;
		case "PonoDetail":
		getPonoDetail();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "vendoradd":
		getvendoradd();
		break;
		case "LoadItem":
		getitem();
		break;

		case "itemdet":
		getitemdet();
		break;
		case "loadpaymode":
		getpaymode();
		break;
		case "loadcarrtype":
		getcarriagetype();
		break;
		case "Loadpoitemdetails":
		getpoitemdetails();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadPONOList":
		getPONOList();
		break;


		case "LoadGSTDetails":
		findGSTDetails();
		break;

		case "loadPurchaseHead":
		getPurchaseHead();
		break;

		case "loadIndentSpec":
		getIndentSpec();
		break;

		case "loadUOM":
		getUOM();
		break;


		case "LoadStategstlist":
		getStategstlist();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select cust_code,cust_ref from massal_customer where cust_type != 'G'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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
	
 function getIndnoDetail()
    {
        mysql_query("SET NAMES utf8");
	$cmpcode = $_POST['cmpcode'];
	$finid = $_POST['finid'];
	$dept     = $_POST['dept'];
        $r=mysql_query("select ind_no,ind_fin_code from trnpur_indent where ind_hod_auth = 'Y' and ind_comp_code = '$cmpcode' and ind_fin_code = '$finid' and ind_qty > ind_rec_qty and  ind_cancel_status <> 'C' and ind_dept_code = '$dept' group by ind_no,ind_fin_code order by ind_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getPonoDetail()
    {
        mysql_query("SET NAMES utf8");
	$cmpcode = $_POST['cmpcode'];
        $finid= $_POST['finid'];
//        $r=mysql_query("select ifnull(max(phd_pono),0)+1 as pono from   trnpur_purchase_header where phd_comp_code = '$cmpcode' and phd_fin_code = '$finid' ");
        $r=mysql_query("select ifnull(max(convert(phd_pono,signed)),0) +1 as pono from   trnpur_purchase_header where phd_comp_code = '$cmpcode' and phd_fin_code = '$finid' ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getvendoradd()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['vendor'];
        $r=mysql_query("select cust_add1,cust_add2,cust_add3,cust_city,cust_taxtag , cust_state from massal_customer where cust_code = $vendor");
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

	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        if ($indno == 0) 
        $r=mysql_query("select item_code,item_name from maspur_item_header order by item_name");
        else
        $r=mysql_query("select item_code,item_name,ind_date from trnpur_indent,maspur_item_header 
where ind_item_code = item_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getIndnoqty()
    {
        mysql_query("SET NAMES utf8");
	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$itmcode = $_POST['itmcode'];

//        $r=mysql_query("select ind_machine, ind_qty-ind_rec_qty from trnpur_indent,masrm_item_header, mas_uom 
//where ind_item_code = itmh_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode' and ind_item_code = '$itmcode'");

        $r=mysql_query("select ind_remarks,ind_machine, ind_qty-ind_rec_qty as ind_qty ,uom_short_name,uom_code from trnpur_indent,maspur_item_header, mas_uom  
where  uom_code = item_uom and ind_item_code = item_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode' and ind_item_code = '$itmcode'");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitemdet()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select itmh_moisture_per,itmh_tare_per from masrm_item_header");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpaymode()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select term_code,term_name from mas_terms order by term_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcarriagetype()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select carr_code,carr_name from mas_transport order by carr_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpoitemdetails()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        mysql_query("SET NAMES utf8");
         $r=mysql_query("call sppur_sel_po_viewdetail($compcode,$finid,'$pono')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getPurGroup()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$statecode = $_POST['statecode'];

        mysql_query("SET NAMES utf8");
         $r=mysql_query("select * from massal_customer where cust_type = 'G' and cust_acc_group in (74,75) order by cust_name");
         $r=mysql_query(" select cust_code,cust_ref,cust_name from
(select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_name regexp'%' and cust_acc_group not in (46,44,85,72)
union all
select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_acc_group in (74,75) order by cust_name ) a where left(cust_name,2) != 'ZZ'  group by cust_code,cust_ref,cust_name order by cust_name");


        $r=mysql_query("select * from maspur_gsttax where tax_state = '$statecode' order by tax_pur_ledname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getPONOList()
    {

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        mysql_query("SET NAMES utf8");
//         $r=mysql_query("select * from acc_ledger_master  where led_type = 'G' and  led_grp_code in (74,75)");
         $r=mysql_query("select * from trnpur_purchase_header where phd_fin_code = $finid  AND  phd_comp_code = $compcode order by convert(phd_pono,signed) desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function findGSTDetails()
    {
        mysql_query("SET NAMES utf8");
        $ledcode = $_POST['ledcode'];

        $r=mysql_query("select * from maspur_gsttax where tax_pur_ledcode = $ledcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPurchaseHead()
    {
        mysql_query("SET NAMES utf8");
        $ledcode = $_POST['ledcode'];

        $r=mysql_query("select * from mas_dept where dept_code = 13");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getIndentSpec()
    {
        mysql_query("SET NAMES utf8");
	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];


        $r=mysql_query(" select * from trnpur_indent where ind_comp_code = $compcode and ind_fin_code = $finid and ind_no = $indno and ind_item_code = $itemcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getUOM()
    {
        mysql_query("SET NAMES utf8");


        $r=mysql_query(" select * from mas_uom order by uom_short_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
