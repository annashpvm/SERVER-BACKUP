<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
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
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
		case "loadAreaList":
		getAreaList();
		break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	//$supplier_id = $_POST['supplierid'];
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 78 order by sup_refname");
	$sql = "select sup_refname ,sup_code from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code group by sup_refname ,sup_code order by sup_refname ,sup_code");
	//$sql = "call sp_pur_supplier_actgrp($supplier_id)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getthird()
    {
        mysqli_set_charset($conn, "utf8");
	//$supplier_id = $_POST['supplierid'];
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 143 order by sup_refname");
	//$sql = "call sp_pur_supplier_actgrp($supplier_id)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getagent()
    {
        mysqli_set_charset($conn, "utf8");
	$sup_code   = $_POST['supcode'];
	$sql = "call sprm_sel_agentparties ('$sup_code')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]); 
    }
	
 function getlotno()
    {
        mysqli_set_charset($conn, "utf8");

	$sql = "call sp_sel_lot ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getgrndetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$sql = "call sprm_sel_recheddet ('$grnno') ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

 function getgrnitemdetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$ordno   = $_POST['ordno'];

/*
	$sql = "select a1.* , case when b1.ordt_pen_qty > 0 then b1.ordt_pen_qty else 0 end as pendqty from 
(select a.*,b.*,c.* ,partyitemname.itmh_name as party_item ,millitemname.itmh_name as grn_item from     trnrm_receipt_header a, trnrm_receipt_trailer b, mas_lot c, masrm_item_header partyitemname  , masrm_item_header millitemname where b.rect_item_code = millitemname.itmh_code and b.rect_partyitemcode = partyitemname.itmh_code and b.rect_lotno = c.lot_code and a.rech_seqno = b.rect_hdseqno and a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno'  ) a1 left outer join trnrm_order_trailer b1 on  a1.rech_ordhdseqno = b1.ordt_hdseqno and  a1.rect_item_code = b1.ordt_item_code order by rect_seqno
");
*/
	$sql = "select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from 
(select a.*,b.*,c.* ,partyitemname.itmh_name as party_item ,millitemname.itmh_name as grn_item from     
trnrm_receipt_header a, trnrm_receipt_trailer b, mas_lot c, masrm_item_header partyitemname  , 
masrm_item_header millitemname where b.rect_item_code = millitemname.itmh_code and b.rect_partyitemcode = partyitemname.itmh_code and b.rect_lotno = c.lot_code and a.rech_seqno = b.rect_hdseqno and a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno'  ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_no left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code order by rect_seqno");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getpoheader()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call sprm_sel_orderheader ('$ordcode') ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getwtcard()
    {
        mysqli_set_charset($conn, "utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_sup_code   = $_POST['supcode'];
	$wc_itemgrp   = $_POST['finmodtype'];
	$rech_type   = $_POST['finrecpttype'];
	$grnno   = $_POST['grnno'];

	$sql = "call sp_sel_wtcards('$wc_compcode','$wc_fincode','$wc_sup_code','0','0','$grnno')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getwtcarddt()
    {
        mysqli_set_charset($conn, "utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_seqno   = $_POST['wtcode'];


	$sql = "call sp_sel_wtcarddet('$wc_seqno')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getfreight()
    {
        //mysqli_set_charset($conn, "utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$freightJ   = $_POST['freightJ'];
	$supcode   = $_POST['supcode'];
	$fareacode   = $_POST['fareacode'];
	$itemcode   = $_POST['itemcode'];
	mysqli_set_charset($conn, "utf8");

	if ( $freightJ = "Tonn")
	{
		$sql = "call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','4')");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
	else if ($freightJ = "LoadJ")
	{
		$sql = "call sp_sel_loadfreight('$wc_seqno')");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
		
    }
 function getgrnno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
        	$sql = "select ifnull(max(rech_no),0)+1 as grnno from trnrm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode");
	}
	else if($gstFlag === "Edit")
	{
		$sql = "call sprm_sel_receiptnos ('$compcode','$finid')");
	}

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpono()
    {
        mysqli_set_charset($conn, "utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode   = $_POST['supcode'];
	//$sql = "select ordh_seqno,ordh_no from trnrm_order_header where ordh_sup_code= '$supcode' and ordh_compcode=$compcode and ordh_fincode=$finid ");
	$sql = "call sprm_sel_partyorders('$compcode','$finid','$supcode',0)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getpoitem()
    {
        mysqli_set_charset($conn, "utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call sprm_sel_orditems ('$ordcode')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getdegritem()
    {
//        mysqli_set_charset($conn, "utf8");

	$sql = "call sprm_sel_itemdetails ('0')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getamnd()
{
        mysqli_set_charset($conn, "utf8");
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

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
		$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitemqty()
{
        mysqli_set_charset($conn, "utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call sprm_sel_orditem_dets('$pono','$item','$status')");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getdegritemqty()
{
        mysqli_set_charset($conn, "utf8");
	$item = $_POST['item'];
	$supno = $_POST['supno'];
	
	$r = mysql_query("call sprm_sel_supitemrate('$supno','$item')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getuserdet()
{
        mysqli_set_charset($conn, "utf8");
	
	$userid = $_POST['userid'];
	
	$r = mysql_query("select * from mas_users where usr_code = '$userid'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getfreightton()
    {

	$suplrcode = $_POST['suplrcode'];
	mysqli_set_charset($conn, "utf8");

	$sql = "select * from mas_areaitemfreight where aif_type=1 and aif_party_code='$suplrcode'");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getfreightlod()
    {

	$suplrcode = $_POST['suplrcode'];
	mysqli_set_charset($conn, "utf8");

	$sql = "select * from mas_areafreight where arf_type=1 and arf_party_code='$suplrcode'");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getreceipth()
    {

	$edgrnno = $_POST['edgrnno'];
	mysqli_set_charset($conn, "utf8");

	$sql = "call sprm_sel_receiptheader ('$edgrnno')");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
 function getreceiptt()
    {

	$edgrnno = $_POST['edgrnno'];
	mysqli_set_charset($conn, "utf8");

	$sql = "call sprm_sel_receipttrailer ('$edgrnno')");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
   
 function getAreaList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select area_name,area_code from mas_area order by area_name asc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
