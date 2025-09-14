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
		case "loadthird":
		getthird();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loadpoitem":
		getpoitem();
		break;
		case "loadINVitem":
		getINVitem();
		break;
		case "loaddegritem":
		getdegritem();
		break;
		case "loadpoheader":
		getpoheader();
		break;
		case "loadlotno":
		getlotno();
		break;
		case "loadwtcard":
		getwtcard();
		break;
		case "loadwtcarddt":
		getwtcarddt();
		break;
		case "loadfreight":
		getfreight();
		break;
		case "loaditemqty":
		getitemqty();
		break;
		case "loadamnd":
		getamnd();
		break;
		case "loaddegritemqty":
		getdegritemqty();
		break;
		case "loadgrndetail":
		getgrndetail();
		break;
		case "loadgrnitemdetail":
		getgrnitemdetail();
		break;
		case "loadagent":
		getagent();
		break;
		case "userdet":
		getuserdet();
		break;
		case "loadfreightton":
		getfreightton();
		break;
		case "loadfreightlod":
		getfreightlod();
		break;
		case "loadreceipth":
		getreceipth();
		break;	
		case "loadreceiptt":
		getreceiptt();
		break;			

		case "loadAreaList":
		getAreaList();
		break;
		case "LoadInvNoList":
		getInvNoList();
		break;

		case "loadAllsupplier":
		getAllsupplier();
		break;

		case "loadINVNoDetail":
		getINVNoDetail();
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
	//$supplier_id = $_POST['supplierid'];
	$r=mysql_query(" select sup_refname, sup_code from trnirm_invoice_header , maspur_supplier_master where invh_sup_code = sup_code  group by sup_refname, sup_code order by sup_refname");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getthird()
    {
        mysql_query("SET NAMES utf8");
	//$supplier_id = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 143 order by sup_refname");
	//$r=mysql_query("call sp_pur_supplier_actgrp($supplier_id)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getagent()
    {
        mysql_query("SET NAMES utf8");
	$sup_code   = $_POST['supcode'];
	$r=mysql_query("call sprm_sel_agentparties ('$sup_code')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})'; 
    }
	
 function getlotno()
    {
        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sp_sel_lot ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getgrndetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$r=mysql_query("call spirm_sel_recheddet ('$grnno') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getgrnitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$ordno   = $_POST['ordno'];

	$r=mysql_query("select a1.* , case when b1.ordt_pen_qty > 0 then b1.ordt_pen_qty else 0 end as pendqty from 
(select a.*,b.*,c.* ,partyitemname.itmh_name as party_item ,millitemname.itmh_name as grn_item from     trnirm_receipt_header a, trnirm_receipt_trailer b, mas_lot c, masrm_item_header partyitemname  , masrm_item_header millitemname where b.rect_item_code = millitemname.itmh_code and b.rect_partyitemcode = partyitemname.itmh_code and b.rect_lotno = c.lot_code and a.rech_seqno = b.rect_hdseqno and a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno'  ) a1 left outer join trnrm_order_trailer b1 on  a1.rech_ordhdseqno = b1.ordt_hdseqno and  a1.rect_item_code = b1.ordt_item_code order by rect_seqno
");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getpoheader()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call sprm_sel_orderheader ('$ordcode') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcard()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_sup_code   = $_POST['supcode'];
	$wc_itemgrp   = $_POST['finmodtype'];
	$rech_type   = $_POST['finrecpttype'];
	$grnno   = $_POST['grnno'];

	$r=mysql_query("call sp_sel_wtcards('$wc_compcode','$wc_fincode','$wc_sup_code','0','0','$grnno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcarddt()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_seqno   = $_POST['wtcode'];


	$r=mysql_query("call sp_sel_wtcarddet('$wc_seqno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getfreight()
    {
        //mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$freightJ   = $_POST['freightJ'];
	$supcode   = $_POST['supcode'];
	$fareacode   = $_POST['fareacode'];
	$itemcode   = $_POST['itemcode'];
	mysql_query("SET NAMES utf8");

	if ( $freightJ = "Tonn")
	{
		$r=mysql_query("call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','4')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
	else if ($freightJ = "LoadJ")
	{
		$r=mysql_query("call sp_sel_loadfreight('$wc_seqno')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
		
    }
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
        	$r=mysql_query("select ifnull(max(rech_no),0)+1 as grnno from trnirm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode");
	}
	else if($gstFlag === "Edit")
	{
		$r=mysql_query("call spirm_sel_receiptnos ('$compcode','$finid')");
	}

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

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];
	//$r=mysql_query("select ordh_seqno,ordh_no from trnrm_order_header where ordh_sup_code= '$supcode' and ordh_compcode=$compcode and ordh_fincode=$finid ");
	$r=mysql_query("select * from trnirm_order_header where ordh_compcode = $compcode and ordh_fincode = $finid and ordh_seqno = $seqno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getINVitem()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno   = $_POST['seqno'];
	$r=mysql_query("select itmh_name , itmh_code from trnirm_invoice_trailer , masrm_item_header where invt_item_code = itmh_code and invt_hdseqno = $seqno  group by itmh_name , itmh_code 
");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getdegritem()
    {
//        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_itemdetails ('0')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getamnd()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$billdate = $_POST['billdate'];
	$qrycode = $_POST['qrycode'];
	
	if ($qrycode = "GRN") {
		$r = mysql_query("call sprm_sel_grnqty('$pono','$item')");
		
	}
	else if ($qrycode = "RATE") {
		$r = mysql_query("call sprm_sel_amndorddets('$pono','$item','$billdate')");
	}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitemqty()
{
        mysql_query("SET NAMES utf8");
	$item   = $_POST['item'];
	$seqno  = $_POST['seqno'];
	$status = $_POST['status'];	
	$r = mysql_query("select *  from trnirm_invoice_trailer where invt_hdseqno = '$seqno' and invt_item_code = '$item'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getdegritemqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$supno = $_POST['supno'];
	
	$r = mysql_query("call sprm_sel_supitemrate('$supno','$item')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getuserdet()
{
        mysql_query("SET NAMES utf8");
	
	$userid = $_POST['userid'];
	
	$r = mysql_query("select * from mas_users where usr_code = '$userid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getfreightton()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areaitemfreight where aif_type=1 and aif_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getfreightlod()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areafreight where arf_type=1 and arf_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getreceipth()
    {

	$edgrnno = $_POST['edgrnno'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_receiptheader ('$edgrnno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
 function getreceiptt()
    {

	$edgrnno = $_POST['edgrnno'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_receipttrailer ('$edgrnno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
   
 function getAreaList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select area_name,area_code from mas_area order by area_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	


 function getInvNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
	$r=mysql_query("select invh_invoicerefno,invh_invoiceno from trnirm_invoice_header where invh_sup_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getAllsupplier()
    {
        mysql_query("SET NAMES utf8");
	$supplierid = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master order by sup_refname");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getINVNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
 	$invno    = $_POST['invno'];
	$r=mysql_query("select * from trnirm_invoice_header where  invh_invoicerefno  = '$invno' and invh_sup_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'");
	$r=mysql_query("select * from trnirm_invoice_header , trnirm_invoice_trailer where invh_sup_code = '$supcode' and invh_seqno = invt_hdseqno and invh_compcode = '$compcode' and  invh_fincode = '$finid'  and invh_invoiceno = '$invno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpoitem()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call spirm_sel_orditems ('$ordcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
