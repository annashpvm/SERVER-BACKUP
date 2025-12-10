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
		case "loadvewhand":
		getvewhand();
		break;
		case "loadinvsdt":
		getinvsdt();
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
		/*case "loadfilldt":
		getfilldt();
		break;*/
		case "loadordqty":
		getordqty();
		break;
		case "loaditemqty":
		getitemqty();
		break;		
		case "loadamnd":
		getamnd();
		break;
		case "loaddispdegritem":
		getdispdegritem();
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
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }

 function getdispdegritem()
    {
        mysqli_set_charset($conn, "utf8");
	$sltdegritemcode = $_POST['sltdegritemcode'];
	$sql = "select itmh_name,itmh_code from masrm_item_header where itmh_code in ($sltdegritemcode) order by itmh_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	//$supplier_id = $_POST['supplierid'];
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 52 order by sup_refname");
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
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 54 order by sup_refname");
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
	$sql = "call sp_sel_partyagent ('$sup_code')");
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

	$sql = "call sprm_sel_recitems ('$compcode','$grnno','$ordno','0')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getinvsdt()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call spirm_sel_invheddet ('$ordcode') ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }    
 function getvewhand()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call spirm_vew_handling ('$ordcode') ");
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
	$invspono   = $_POST['invspono'];
	$sql = "call spirm_sel_orderheader ('$invspono') ");
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
        	$sql = "select ifnull(max(rech_no),0)+1 as grnno from trnirm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode");
	}
	else if($gstFlag === "Edit")
	{
		$sql = "call spirm_sel_receiptnos ('$compcode','$finid')");
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
	$sql = "call spirm_sel_partyinvs('$compcode','$finid','$supcode')");
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
	$sql = "call spirm_sel_invitems ('$ordcode')");
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

	$sql = "call sprm_sel_itemdetails ('3')");
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
function getordqty()
{
        mysqli_set_charset($conn, "utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call spirm_sel_orditem_dets('$pono','$item')");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getitemqty()
{
        mysqli_set_charset($conn, "utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call spirm_sel_invitem_dets('$pono','$item')");

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
?>
