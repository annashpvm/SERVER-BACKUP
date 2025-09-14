<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadtransno":
		gettransno();
		break;

		case "loadtransdetail":
		gettransdetail();
		break;
		case "loadpono":
		getpono();
		break;
		/*case "loadpodetails":
		getpodetails();
		break;*/
		case "loaditem":
		getitem();
		break;
		case "loaditemdetails":
		getitemdetails();
		break;
		case "loaditemtax":
		getitemtax();
		break;
		case "loadgrndetails":
		getgrndetails();
		break;

		case "loadindentnos":
		getindentnos();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadGRNList":
		getgrnnolist();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
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
	$r=mysql_query("CALL sp_pur_sup()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];

        $r=mysql_query("select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where minh_purtype = '$purtype' and  minh_fin_code=$finid  and minh_comp_code= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function gettransno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$r=mysql_query("select t_clr_no from trnpur_trans_clearance where t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode group by t_clr_no order by t_clr_no");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function gettransdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$docno = $_POST['docno'];

//	$r=mysql_query("select * from trnpur_trans_clearance where t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode =  ////and t_clr_grn_party = $supcode and t_clr_no =$docno ");

//$r=mysql_query("select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_lorry_frt) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , maspur_supplier_master where sup_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno");

$r=mysql_query("select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_freight) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , maspur_supplier_master where sup_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpono()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag = $_POST['flag'];
	$supcode = $_POST['supcode'];
	if($flag=="I")
	{
	$r=mysql_query("call sppur_pending_indent($compcode,$finid)");
//	$r=mysql_query("call sppur_pending_indent($compcode)");

	}
	else
	{
	$r=mysql_query("call sppur_pending_po('$compcode','$finid','$supcode')");
//	$r=mysql_query("call sppur_pending_po('1','20','7')");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getgrndetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
//	$flag     = $_POST['flag'];
	$grnno    = $_POST['grnno'];
        $purtype  = $_POST['purtype'];
	{
	$r=mysql_query("call sppur_sel_mindetails('$compcode','$finid','$grnno','$purtype')");
	$r=mysql_query("call sppur_sel_mindetails('$compcode','$finid','$grnno')");

	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getindentnos()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$pono    = $_POST['pono'];

	$r=mysql_query("select   ptr_podate  podate ,ptr_ind_no  indno, ptr_ind_fin_code  indfincode,phd_credit_days,phd_tol from trnpur_purchase_trailer a,   trnpur_purchase_header b where 
phd_comp_code = ptr_comp_code and phd_fin_code  = ptr_fin_code  and phd_pono = ptr_pono  and
phd_comp_code = $compcode and phd_fin_code  = $finid and  phd_pono = $pono group by  ptr_podate,ptr_ind_no , ptr_ind_fin_code");
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
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	if($flag=="I") 
	{
	$r=mysql_query("call sppur_ind_details_items('$compcode','$finid','$indno')");
	}
	else
	{
//	$r=mysql_query("call sppur_po_details_new('$compcode','$finid','$supcode','$indno')");

	$r=mysql_query("select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = $pono  and ptr_pono = $pono and ptr_ind_no = $indno and ptr_item_code = item_code and item_uom = uom_code");


	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getitemdetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	$item     = $_POST['itemcode'];

	if($flag=="I") 
	{
$r=mysql_query("select * from trnpur_indent a, maspur_item_header b , mas_uom c  where ind_comp_code ='$compcode' and ind_fin_code = '$finid'  and ind_item_code = item_code and item_uom = uom_code and ind_qty > ind_rec_qty  and ind_no = '$indno'  and ind_item_code ='$item'");

	}
	else
	{
	$r=mysql_query("select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = $pono  and ptr_ind_no = $indno  and ptr_item_code = $item and ptr_item_code = item_code and item_uom = uom_code ");

	}


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

/*function getitem()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$indno = $_POST['indno'];
	
	$r=mysql_query("call sppur_ind_details_items('$compcode','$finid','$indno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }*/

function getitemtax()
{
        mysql_query("SET NAMES utf8");
	$cgstper = $_POST['cgstper'];
	$sgstper = $_POST['sgstper'];
	$igstper = $_POST['igstper'];
	
	$r=mysql_query("select * from maspur_gsttax where tax_gst_per = $cgstper");
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
        mysql_query("SET NAMES utf8");
         $r=mysql_query("select * from massal_customer  where cust_type = 'G' and  cust_acc_group in (74,75) order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getgrnnolist()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];

        $r=mysql_query("select minh_minno from trnpur_min_header where minh_purtype = '$purtype' and  minh_fin_code=$finid  and minh_comp_code= $compcode order by minh_minno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchLedgerlist()
    {
        $party  = $_POST['party'];

        mysql_query("SET NAMES utf8");
        if ($party == '')
        $qry = "select * from maspur_supplier_master order by sup_name";
        else
        $qry = "select * from maspur_supplier_master where sup_name like '%$party%' order by sup_name";
   

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
