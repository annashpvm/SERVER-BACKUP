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
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	
		case "loadQCEntryList":
		getQCEntryList();
		break;

		case "loadQCEntryNoDetail":
		getQCEntryNoDetail();
		break;

		case "loadQCItems":
		getQCItems();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        global $conn;
	//$supplier_id = $_POST['supplierid'];
	$sql = " select cust_ref, cust_code from trnirm_invoice_header , massal_customer where invh_cust_code = cust_code  group by cust_ref, cust_code order by cust_ref";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getthird()
    {
        global $conn;
	//$supplier_id = $_POST['supplierid'];
	$sql = "select cust_code,cust_ref from massal_customer where sup_acc_group = 143 order by cust_ref";
	//$sql = "call sp_pur_supplier_actgrp($supplier_id)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getagent()
    {
        global $conn;
	$cust_code   = $_POST['supcode'];
	$sql = "call sprm_sel_agentparties ('$cust_code')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]); 
    }
	
 function getlotno()
    {
        global $conn;

	$sql = "call sp_sel_lot ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getgrndetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
//	$sql = "call spirm_sel_recheddet ('$grnno') ";
	$sql = "select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from (select * from     
trnrm_receipt_header a, trnrm_receipt_trailer b,  masrm_item_header  c , massal_customer d  where rech_sup_code = cust_code and b.rect_item_code = c.itmh_code and a.rech_seqno = b.rect_hdseqno and  a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_seqno = '$grnno' 
 ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_seqno left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code  and ordt_status = '' order by rect_seqno
 ";

	$sql = "select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from (select a.*,b.*,c.*,d.*,e.cust_ref led_name from trnrm_receipt_header a, trnrm_receipt_trailer b,  masrm_item_header  c , massal_customer d  , massal_customer e where  a.rech_sup_code = d.cust_code and e.cust_code = a.rech_purledger and b.rect_item_code = c.itmh_code and a.rech_seqno = b.rect_hdseqno and  a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_seqno = '$grnno' ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_seqno left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code  and ordt_status = '' order by rect_seqno ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

 function getgrnitemdetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$ordno   = $_POST['ordno'];

	$sql = "select a1.* , case when b1.ordt_pen_qty > 0 then b1.ordt_pen_qty else 0 end as pendqty from 
(select a.*,b.*,c.* ,partyitemname.itmh_name as party_item ,millitemname.itmh_name as grn_item from     trnrm_receipt_header a, trnrm_receipt_trailer b, mas_lot c, masrm_item_header partyitemname  , masrm_item_header millitemname where b.rect_item_code = millitemname.itmh_code and b.rect_partyitemcode = partyitemname.itmh_code and b.rect_lotno = c.lot_code and a.rech_seqno = b.rect_hdseqno and a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno'  ) a1 left outer join trnrm_order_trailer b1 on  a1.rech_ordhdseqno = b1.ordt_hdseqno and  a1.rect_item_code = b1.ordt_item_code order by rect_seqno
";

	$sql = "select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from (select * from     
trnrm_receipt_header a, trnrm_receipt_trailer b,  masrm_item_header  c  
where b.rect_item_code = c.itmh_code and a.rech_seqno = b.rect_hdseqno and
 a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno' 
 ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_seqno left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code  and ordt_status = '' order by rect_seqno
 ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getpoheader()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call sprm_sel_orderheader ('$ordcode') ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getwtcard()
    {
        global $conn;
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_cust_code   = $_POST['supcode'];
	$wc_itemgrp   = $_POST['finmodtype'];
	$rech_type   = $_POST['finrecpttype'];
	$grnno   = $_POST['grnno'];

	$sql = "call sp_sel_wtcards('$wc_compcode','$wc_fincode','$wc_cust_code','0','0','$grnno')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getwtcarddt()
    {
        global $conn;
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_seqno   = $_POST['wtcode'];


	$sql = "call sp_sel_wtcarddet('$wc_seqno')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getfreight()
    {
        //global $conn;
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$freightJ   = $_POST['freightJ'];
	$supcode   = $_POST['supcode'];
	$fareacode   = $_POST['fareacode'];
	$itemcode   = $_POST['itemcode'];
	global $conn;

	if ( $freightJ = "Tonn")
	{
		$sql = "call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','4')";
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
		$sql = "call sp_sel_loadfreight('$wc_seqno')";
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
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
//        	$sql = "select ifnull(max(rech_no),0)+1 as grnno from trnrm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode";

           if ($finid <24)
        	$sql = "select ifnull(max(rech_no),0)+1 as grnno from trnrm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode";
           else
      	$sql = "select ifnull(max(convert(substring(rech_no,3),signed)),0) +1 as grnno from trnrm_receipt_header where  rech_fincode = $finid and rech_compcode = $compcode";
	}
	else if($gstFlag === "Edit")
	{
		$sql = "call sprm_sel_receiptnos ('$compcode','$finid','I')";
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
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];
	$supcode  = $_POST['supcode'];
//	$sql = "select * from trnirm_order_header where ordh_compcode = $compcode and ordh_fincode = $finid and ordh_seqno = $seqno";


		$sql = "select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnrm_order_header , trnrm_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getINVitem()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno   = $_POST['seqno'];
	$sql = "select itmh_name , itmh_code from trnirm_invoice_trailer , masrm_item_header where invt_item_code = itmh_code and invt_hdseqno = $seqno  group by itmh_name , itmh_code 
";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getdegritem()
    {
//        global $conn;

	$sql = "call sprm_sel_itemdetails ('0')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getamnd()
{
        global $conn;
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$billdate = $_POST['billdate'];
	$qrycode = $_POST['qrycode'];
	
	if ($qrycode = "GRN") {
		$sql = "call sprm_sel_grnqty('$pono','$item')";
		
	}
	else if ($qrycode = "RATE") {
		$sql = "call sprm_sel_amndorddets('$pono','$item','$billdate')";
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
        global $conn;
	$item   = $_POST['item'];
	$seqno  = $_POST['seqno'];
	$status = $_POST['status'];	
	$sql = "select *  from trnirm_invoice_trailer where invt_hdseqno = '$seqno' and invt_item_code = '$item'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getdegritemqty()
{
        global $conn;
	$item = $_POST['item'];
	$supno = $_POST['supno'];
	
	$sql = "call sprm_sel_supitemrate('$supno','$item')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getuserdet()
{
        global $conn;
	
	$userid = $_POST['userid'];
	
	$sql = "select * from mas_users where usr_code = '$userid'";
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
	global $conn;

	$sql = "select * from mas_areaitemfreight where aif_type=1 and aif_party_code='$suplrcode'";

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
	global $conn;

	$sql = "select * from mas_areafreight where arf_type=1 and arf_party_code='$suplrcode'";

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
	global $conn;

	$sql = "call sprm_sel_receiptheader ('$edgrnno')";

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
	global $conn;

	$sql = "call sprm_sel_receipttrailer ('$edgrnno')";

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
        global $conn;
        $sql = "select area_name,area_code from mas_area order by area_name asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	


 function getInvNoList()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
	$sql = "select invh_invoicerefno,invh_invoiceno from trnirm_invoice_header where invh_cust_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   
 function getAllsupplier()
    {
        global $conn;
	$supplierid = $_POST['supplierid'];
	$sql = "select cust_code,cust_ref from massal_customer  where sup_acc_group = '$supplierid' order by cust_ref";
	$sql = "select cust_code,cust_ref from massal_customer order by cust_ref";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getINVNoDetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
 	$invno    = $_POST['invno'];
	$sql = "select * from trnirm_invoice_header where  invh_invoicerefno  = '$invno' and invh_cust_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'";
	$sql = "select * from trnirm_invoice_header , trnirm_invoice_trailer where invh_cust_code = '$supcode' and invh_seqno = invt_hdseqno and invh_compcode = '$compcode' and  invh_fincode = '$finid'  and invh_invoiceno = '$invno'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpoitem()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$sql = "call spirm_sel_orditems ('$ordcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchLedgerlist()
    {
        global $conn;
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $sql  = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_taxtag,cust_wp_gst_dnote_yn,cust_state from trn_qc_rm_inspection,massal_customer  where  cust_code = qc_rm_supcode  group by cust_code,cust_name,qc_rm_supcode,cust_taxtag,cust_wp_gst_dnote_yn,cust_state) a1 order by cust_name";
        else
	        $sql  = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_taxtag,cust_wp_gst_dnote_yn,cust_state from trn_qc_rm_inspection,massal_customer where  cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_taxtag,cust_wp_gst_dnote_yn,cust_state) a1 where cust_name like '%$ledname%'  order by cust_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getQCEntryList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$supcode = $_POST['supcode'];


        $sql = "select qc_rm_entryno ,qc_rm_ticketno, qc_rm_truck,cast(qc_rm_ticketwt/1000 as decimal(8,3)) ticketwt from trn_qc_rm_inspection where qc_rm_supcode = $supcode and qc_rm_grn_status = 'N' and qc_rm_compcode = '$compcode' and qc_rm_fincode = $finid group by qc_rm_entryno ,qc_rm_ticketno,qc_rm_truck, qc_rm_ticketwt order by qc_rm_entryno desc";





    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }





 function getQCEntryNoDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer , mas_area ,mas_areagroup where area_grpcode = areagrp_code and qc_rm_supcode = cust_code and qc_rm_area = area_code  and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno";


  //      $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
 function getQCItems()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$qcnos    = $_POST['qcnos'];
	$supcode  = $_POST['supcode'];

        $sql = "select itmh_name,qc_rm_itemcode ,cast(sum(qc_rm_ticketwt)/1000 as decimal(8,3)) ticketwt  from trn_qc_rm_inspection , masrm_item_header where qc_rm_itemcode = itmh_code and qc_rm_supcode = $supcode and qc_rm_grn_status = 'N' and qc_rm_compcode = '$compcode' and qc_rm_fincode = $finid and  qc_rm_entryno in ($qcnos) group by  itmh_name,qc_rm_itemcode ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	function getPurGroup()
    {
		global $conn;
	   $supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname";
        else
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname";

           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'RM'order by tax_purname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
?>
