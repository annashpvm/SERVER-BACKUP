<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadgrnno":
		getgrnno();
		break;

		case "loadgrneddt":
		getgrneddt();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "loadunloadparty":
		getunloadparty();
		break;
		case "loadagent":
		getagent();
		break;
		case "loadgrnpo":
		getgrnpo();
		break;
		case "loaditempo":
		getitempo();
		break;
		case "loadlotno":
		getlotno();
		break;
		case "loadordno":
		getordno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loaditemqty":
		getitemqty();
		break;
		case "loadfilldt":
		getfilldt();
		break;
		case "loadgrnitemdetail":
		getgrnitemdetail();
		break;
		case "loadarea":
		getarea();
		break;

		case "loadfreight":
		getfreight();
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

		case "loadPendingGRNS":
		getPendingGRNS();
		break;	


		case "loadPurGroup":
		getPurGroup();
		break;

		case "loadQCEntryList":
		getQCEntryList();
		break;

		case "loadQCEntryNoDetail":
		getQCEntryNoDetail();
		break;

		case "loadFuelTicketList":
		getFuelTruckList();
		break;
                 
		case "loadFuelTicketNoDetail":
		getFuelTicketNoDetail();
		break;
		
		case "loadFuelItemList":
		getFuelItemList();
		break;
		case "loadGrnQcCombine":
		getGrnQcCombine();
		break;
				

		case "loadGST":
		getGST();
		break;
			
		case "loadPurLedgerDetail":
		getPurLedgerDetail();
		break;

		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;

		case "LoadDNNumber":
	        getDNNumber();
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
            $data= $json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   function getordno()
    {
		$finid = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$supcode = $_POST['supcode'];
		$gstFlag = $_POST['gstFlag'];

       // mysqli_set_charset($conn, "utf8");
	if($gstFlag === "Add")
	{
		//$sql = "call spfu_sel_partyorders ('$compcode','$finid','$supcode','0')");
		$sql = "select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnfu_order_header , trnfu_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno");
        
	}
	else if($gstFlag === "Edit")
	{

		$sql = "select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnfu_order_header , trnfu_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno");

	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getfilldt()
    {
	mysqli_set_charset($conn, "utf8");
	$qrycode = $_POST['qrycode'];
	if ($qrycode === "GRN")
	{
		$grnno = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		if ($grnno > 0)
		{
			$grnno = $_POST['grnno'];
			$itemcode = $_POST['itemcode'];
		$sql = "select max(rect_grnqty) as rect_grnqty from trnfu_receipt_trailer where rect_hdseqno = $grnno and rect_item_code = $itemcode ");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';			
		}
		/*else
		{
			$grnno = 1;
			$itemcode = 1;
		}*/
		

	}
	else if ($qrycode === "RATE")
	{
		$grnno = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		$billdt = $_POST['billdate'];
		if ($grnno > 0)
		{
			$grnno = $_POST['grnno'];
			$itemcode = $_POST['itemcode'];
			$billdt = $_POST['billdate'];
		}
		else
		{
			$grnno = 1;
			$itemcode = 1;
			$billdt = '2021-03-01';
		}
		$sql = "select max(amnt_unit_rate) as amnt_unit_rate from trnfu_orderamnd_trailer where amnt_hdseqno=
			(select max(amnh_seqno) from trnfu_orderamnd_header where amnh_ordhdseqno = '$grnno' and amnh_wedate<= '$billdt') 
				and amnt_item_code= '$itemcode' ");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

	}

    }

 function getgrnitemdetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnseqno = $_POST['grnno'];
	$ordno    = $_POST['ordno'];

//	$sql = "call spfu_sel_recitems ('$compcode','$grnno','$ordno','0')");
	$sql = "select *  from trnfu_receipt_header a, trnfu_receipt_trailer b ,  masfu_item_header d , acc_ledger_master e where  rech_purgrp = led_code  and rect_item_code =  itmh_code and rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_seqno = rect_hdseqno and rech_seqno = '$grnseqno' ");
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
	$supplier_id = $_POST['supplierid'];
	$sql = "call sp_pur_supplier_actgrp($supplier_id)");

	$sql = "select cust_code,cust_ref from massal_customer");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getunloadparty()
    {
        mysqli_set_charset($conn, "utf8");
	$supplier_id = $_POST['supplierid'];
	$sql = "call sp_pur_sup");
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
	$supcode = $_POST['supcode'];
	$sql = "call spfu_sel_agentparties ('$supcode')");
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
 function getgrnpo()
    {
       // mysqli_set_charset($conn, "utf8");
	$ordcode = $_POST['ordcode'];

        $sql = "select * from trnfu_order_header , trnfu_order_trailer where  ordh_seqno = $ordcode and ordh_seqno = ordt_hdseqno");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getgrnno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
        	$sql = "select ifnull(max(rech_no),0)+1 as grnno from trnfu_receipt_header where rech_fincode=$finid and rech_compcode=$compcode ");
	}
	else if($gstFlag === "Edit")
	{
		$sql = "call spfu_sel_receiptnos ('$compcode','$finid')");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getgrneddt()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno = $_POST['grnno'];
	// $sql = "call spfu_sel_recheddet ('$grnno')");
//	$r="select * from trnfu_receipt_header ,massal_customer where rech_seqno= '$grnno' and rech_status='' /and cust_code= rech_sup_code";
//echo $r;
	$sql = "select * from trnfu_receipt_header ,massal_customer where rech_seqno= '$grnno' and rech_status='' and cust_code= rech_sup_code");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getitempo()
{
         mysqli_set_charset($conn, "utf8");
	$ordcode = $_POST['ordcode'];

        $sql = "call spfu_sel_orditems ('$ordcode')");
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
	$itemcode = $_POST['itemcode'];
	$ordcode = $_POST['ordcode'];
	$gstFlag = $_POST['gstFlag'];
	$status = "N";

	if ($gstFlag == "Add"){
		$status = "N";
	}
	else{
		$status = "E";
	}
	$r = mysql_query("call spfu_sel_orditem_dets ('$ordcode','$itemcode','$status')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getarea()
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

	if ( $freightJ === "Tonn")
	{
		$sql = "call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','1')");

		
	}
	else if ($freightJ === "LoadJ")
	{
		$sql = "call sp_sel_loadfreight('$supcode','$fareacode','1')");

		
	}
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
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

	$sql = "call spfu_sel_receiptheader_new ('$edgrnno')");

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

	$sql = "call spfu_sel_receipttrailer ('$edgrnno')");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
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
        mysqli_set_charset($conn, "utf8");
//        $sql = "select * from acc_ledger_master  where led_type = 'G' and  led_code in (1756,1745,1746,2258)");


        $sql = "select * from mas_RMFU_purchasetax where tax_purtype = 'FU' order by tax_purname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getQCEntryList()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$supcode = $_POST['supcode'];


        $sql = "select qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_supcode = $supcode and qc_fuel_grn_status = 'N' and qc_fuel_compcode = '$compcode' and qc_fuel_fincode = $finid group by qc_fuel_entryno order by qc_fuel_entryno desc");





    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }





 function getQCEntryNoDetail()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];




        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getFuelTruckList()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];


  //      $sql = "select wc_vehicleno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_vehicleno order by wc_vehicleno");
	


      $sql = "select wc_ticketno from trn_weight_card left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and  item_grpname in ('BIO MASS','COAL  ITEMS') and wc_process = 'Y' and wt_grn_process = 'N'  order by wc_ticketno desc");


        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelTicketNoDetail()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$ticketno = $_POST['ticketno'];


  //      $sql = "select wc_vehicleno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_vehicleno order by wc_vehicleno");
	


      $sql = "select *  from trn_weight_card , massal_customer , mas_area  where  wc_area_code = area_code and wc_sup_code = cust_code and  wc_compcode = '$compcode'  and wc_fincode = '$finid' and  wc_ticketno = $ticketno");


        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getFuelItemList()
{
         mysqli_set_charset($conn, "utf8");
	$ordcode = $_POST['ordcode'];
        $sql = "select * from masfu_item_header order by itmh_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);



}

function getGrnQcCombine()
{
         mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno = $_POST['grnno'];
/*
	$sql = "select *  from trnfu_receipt_header , trnfu_receipt_trailer  , massal_customer , trn_qc_fuel_inspection , masfu_item_header,mas_RMFU_purchasetax  where rech_purgrp = tax_purcode and itmh_code = rect_item_code and   cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode  and rech_seqno = rect_hdseqno and rech_seqno = $grnno");

	$qry="select *  from trnfu_receipt_header , trnfu_receipt_trailer  , massal_customer , trn_qc_fuel_inspection , masfu_item_header,mas_RMFU_purchasetax  where rech_purgrp = tax_purcode and itmh_code = rect_item_code and   cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode  and rech_seqno = rect_hdseqno and rech_seqno = $grnno";

*/
	$qry="select a.*,b.*,c.*,d.*,e.*,f.* ,deg.itmh_name degrade_itemname from trnfu_receipt_header a , trnfu_receipt_trailer b , massal_customer c, trn_qc_fuel_inspection d,masfu_item_header e,mas_RMFU_purchasetax f , masfu_item_header deg where rech_purgrp = tax_purcode and e.itmh_code = rect_item_code and cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and deg.itmh_code = qc_fuel_degrade_item and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode and rech_seqno = rect_hdseqno and rech_seqno =  $grnno";

	$r=mysqli_query($conn, $qry);

//echo $qry;



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

}

function getGST()
{
         mysqli_set_charset($conn, "utf8");
	$taxcode = $_POST['taxcode'];

	$sql = "select * from mas_RMFU_purchasetax where tax_purcode = $taxcode");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

function getPurLedgerDetail()
    {
	$purcode     = $_POST['purcode'];

        $sql = "select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $sql = "select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getPendingGRNS()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "call spfu_sel_pending_grnlist ('$compcode','$finid')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDNNumber()
    {
        mysqli_set_charset($conn, "utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
