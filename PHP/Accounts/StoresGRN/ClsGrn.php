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
             	case "findGSTDetails":
		getGSTDetails();
		break;	

		case "loadSearchitemlist":
		getSearchitemlist();
		break;


		case "LoadGSTDetails":
		findGSTDetails();
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
	$r=mysql_query("select cust_ref,cust_code from massal_customer where cust_type != 'G' order by cust_ref;");
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
        if ($finid < 24)
        $r=mysql_query("select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where   minh_fin_code=$finid  and minh_comp_code= $compcode");
        else
   
        $r=mysql_query("select ifnull(max(convert(substring(minh_minno,3),signed)),0) +1 as grnno from trnpur_min_header where minh_fin_code = $finid and minh_comp_code = $compcode");

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


$r=mysql_query("select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_freight) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , massal_customer where cust_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno");

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
	$searchedby = $_POST['searchedby'];
	$itemcode = $_POST['itemcode'];

	if($flag=="I")
	{
	$r=mysql_query("call sppur_pending_indent($compcode,$finid)");


	}
	else
	{
         if ($searchedby == 'supplier')
             $r=mysql_query("call sppur_pending_po('$compcode','$finid','$supcode')");
         else
             $r=mysql_query("call sppur_pending_po_supplier_withitem('$compcode','$finid','$supcode','$itemcode')");

             

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


	$query1 = "select minh_grn_status from trnpur_min_header where minh_comp_code = $compcode and minh_fin_code = $finid and minh_minno = '$grnno';";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$grnStatus =$rec1['minh_grn_status'];
           
        if ($grnStatus == "C")
	{
//	$r=mysql_query("call sppur_sel_mindetails('$compcode','$finid','$grnno','$purtype')");

	$r=mysql_query("call sppur_sel_mindetails('$compcode','$finid','$grnno')");
	}
      
        else
        {
	$r=mysql_query("call sppur_sel_mindetails2('$compcode','$finid','$grnno')");
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
phd_comp_code = $compcode and phd_fin_code  = $finid and  phd_pono = '$pono' and (ptr_ord_qty-ptr_rec_qty)> 0  group by  ptr_podate,ptr_ind_no , ptr_ind_fin_code");
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
	if($flag=="N") 
	{
	$r=mysql_query("select item_code ptr_item_code, item_name from maspur_item_header order by item_name");
	}
	elseif($flag=="I") 
	{
	$r=mysql_query("call sppur_ind_details_items('$compcode','$finid','$indno')");
	}
	else
	{
//	$r=mysql_query("call sppur_po_details_new('$compcode','$finid','$supcode','$indno')");

	$r=mysql_query("select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = '$pono'  and ptr_pono = '$pono' and ptr_ind_no = $indno and ptr_item_code = item_code and item_uom = uom_code and (ptr_ord_qty-ptr_rec_qty)> 0 ");


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
	$r=mysql_query("select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = '$pono'  and ptr_ind_no = $indno  and ptr_item_code = $item and ptr_item_code = item_code and ptr_uom = uom_code ");

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

	$statecode = $_POST['statecode'];


        mysql_query("SET NAMES utf8");
//         $r=mysql_query("select * from massal_customer  where cust_type = 'G' and  cust_acc_group in (74,75) order by cust_name");

         $r=mysql_query("select  * from maspur_gsttax order by tax_pur_ledname");
         $r=mysql_query("select * from maspur_gsttax where tax_state = '$statecode' order by tax_pur_ledname");
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

        $r=mysql_query("select minh_minno from trnpur_min_header where  minh_fin_code=$finid  and minh_comp_code= $compcode order by minh_minno desc");
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
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        mysql_query("SET NAMES utf8");
//        if ($party == '')
//        $qry = "select * from massal_customer where left(cust_name,2) != 'ZZ' order by cust_name";
//        else


        $qry = "select * from massal_customer where left(cust_name,2) != 'ZZ'  and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','') like '%$party%' order by cust_name";
   
   //  $qry = "select * from massal_customer where cust_name like '%$party%' order by cust_name";
   
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getGSTDetails()
    {
        $tax  = (float) $_POST['gst'];

        $qry = "select * from  mas_purchasetax  where tax_gst = $tax";
  
        $r=mysql_query($qry);
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
?>
