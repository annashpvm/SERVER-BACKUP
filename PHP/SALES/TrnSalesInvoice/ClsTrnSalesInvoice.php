<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinishedGoodsEntryNo';

    $task = $_POST['task'] ?? 'loadFinishedGoodsEntryNo';

    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadInvoiceNo":
		getInvoiceNo();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadslipno":
		getslipno();
		break;
		case "loadslipdet":
		getslipdetails();
		break;
		case "loadslipdetInv":
		getslipdetailsInv();
		break;
		case "loadSONOlist":
		getSONOlist();
		break;
		case "loadslipdiscount":
		getslipdiscount();
		break;
		case "loadslipalldetails":
		getslipalldetails();
		break;
		case "loadtruck":
		gettruck();
		break;
		case "loadslipinsurance":
		getslipinsurance();
		break;
        	case "findTaxCode":
		getTaxCode();
		break;
		case "loadhsnlist":
		gethsnlist();
		break;
		case "loadstates":
		getstatelist();
		break;
		case "loadInvoiceNoList":
		getInvoiceNolist();
		break;
		case "loadInvoiceNoDetails":
		getInvoiceNoDetails();
		break;
		case "updatetruck":
		invupdatetruck();
		break;
		case "loadEInvStatus":
		getEInvStatus();
		break;
		case "loadEWayStatus":
		getEWayStatus();
		break;
		case "loadInvoiceAmount":
		getInvoiceAmount();
		break;
		case "loadPartyDistance":
		getPartyDistance();
		break;

		case "loadSalesLedgerCode":
		getSalesLedgerCode();
		break;

		case "loadslipNetWt":
		getslipNetWt();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getInvoiceNo()
    {
	global $conn;  

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gsttype = $_POST['gsttype'];

    $sql= "select ifnull(max(invh_no),0)+1 as invno from trnsal_invoice_header where invh_saltype = '$gsttype' and  invh_fincode= $finid  and invh_comp_code= $compcode";

   $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getInvoiceNoList()
    {
     
		global $conn;  
//   
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $gsttype = $_POST['gsttype'];

    $sql = "SELECT invh_invrefno, invh_seqno 
            FROM trnsal_invoice_header 
            WHERE invh_saltype = '$gsttype'
              AND invh_fincode = '$finid'
              AND invh_comp_code = '$compcode'
            ORDER BY invh_no DESC";

    // Execute query
    $r = mysqli_query($conn, $sql);

    if (!$r) {
        // Debug message (you can log it instead)
        die("Query Error: " . mysqli_error($conn));
    }

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    $nrow = mysqli_num_rows($r);

    // Encode JSON safely
    $jsonresult = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }


	function getInvoiceNoDetails()
	{
		global $conn;
	

	
		// Collect POST values safely
		$finid = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$invno = $_POST['invno'];
	
		// Build query (you had two; I merged the more complete one)
		$sql = "select * from trnsal_invoice_header a , massal_customer b where invh_party = cust_code and invh_fincode= $finid  and invh_comp_code= $compcode and invh_seqno = $invno";

	
		// Execute query
		$r = mysqli_query($conn, $sql);
	
		if (!$r) {
			die("Query Error: " . mysqli_error($conn));
		}
	
		// Fetch all rows
		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		$nrow = mysqli_num_rows($r);
	
		// JSON encode and return
		$jsonresult = json_encode($arr, JSON_UNESCAPED_UNICODE);
		echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
	}
	

   function getTaxCode()
    {
		global $conn;  
	    $taxcode = $_POST['taxcode'];
        $sql ="select tax_code,tax_cgst,tax_sgst,tax_igst,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode from massal_tax where tax_code = '$taxcode'";
		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);

    }



   function getstatelist()
    {
		global $conn;  

        $sql = "select state_code,state_name from mas_state order by state_name";
		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getcustomer()
    {
		global $conn;  

	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $invno    = $_POST['invno'];
        $gsttype  = $_POST['gsttype'];

if ($invno === "0")
{
      if (  $gsttype  == "TN")
        $sql= "select cust_code,cust_ref  ,cust_phone,cust_email, cust_smsno , repr_mobile ,cust_zip,cust_gstin,cust_name  from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c , massal_repr d  where cust_state = 24 and cust_repr = repr_code and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_invstat <> 'T'and a.pckh_party = c.cust_code and a.pckh_fincode = $fincode and a.pckh_comp_code =$compcode  group by cust_code,cust_ref,cust_phone,cust_email, cust_smsno , repr_mobile ,cust_zip,cust_gstin,cust_name  order by cust_code,cust_ref";
      else
        $sql= "select cust_code,cust_ref  ,cust_phone,cust_email, cust_smsno , repr_mobile ,cust_zip ,cust_gstin,cust_name from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c , massal_repr d  where cust_state <> 24 and cust_repr = repr_code and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_invstat <> 'T'and a.pckh_party = c.cust_code and a.pckh_fincode = $fincode and a.pckh_comp_code =$compcode  group by cust_code,cust_ref,cust_phone,cust_email, cust_smsno , repr_mobile ,cust_zip,cust_gstin,cust_name  order by cust_code,cust_ref";
}
else
{
        $sql= "select cust_code,cust_ref ,cust_phone,cust_email, cust_smsno , repr_mobile ,cust_zip  ,cust_gstin,cust_name  from trnsal_invoice_header , massal_customer , massal_repr  where cust_repr = repr_code and invh_party = cust_code and  invh_fincode= '$fincode'  and invh_comp_code= '$compcode' and invh_seqno = $invno ";

}



$r = mysqli_query($conn, $sql);

$arr = [];
while ($re = mysqli_fetch_assoc($r)) {
	$arr[] = $re;
}

echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getslipno()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
    $sql= "select pckh_no from trnsal_packslip_header where pckh_invstat <> 'T' and pckh_party = $custcode and pckh_fincode =$fincode  and pckh_comp_code = $compcode and pckh_totwt > 0 group by pckh_no order by pckh_no desc";
    $r = mysqli_query($conn, $sql);
    $arr = [];
	while ($re = mysqli_fetch_assoc($r)) {
		$arr[] = $re;
	}
   echo json_encode(["total" => count($arr), "results" => $arr]);
  
  }


function getslipdetails()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];

/*
	$sql= "select sum(pckt_wt) as weight,count(pckt_sr_no)  as nos,pckh_ordno,pckh_orddate,pckt_sono,pckt_sodate,pckh_noofreels, 
var_size2 as size,pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_size as sizecode,var_size1,var_size2 , ordt_rate as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, ordt_qcdev_yn as qcdev,ordt_loss_pmt as losspmt,pckh_truck  from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e where  b.pckt_sono = e.ordt_sono and a.pckh_fincode >= e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_size = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no =$slipno  and pckh_party = $custcode and b.pckt_size = d.var_code and a.pckh_no = b.pckt_no and b.pckt_fincode =$fincode   and a.pckh_comp_code = $compcode group by pckh_ordno,pckh_orddate, pckt_sono, pckt_sodate, pckh_noofreels, var_grpcode,var_name,var_tariffno,pckt_size,pckh_date,var_size1,var_size2, ordt_rate,ordt_loss_pmt,pckh_truck,ordt_qcdev_yn");
*/
	$sql= "select sum(pckt_wt) as weight,count(pckt_sr_no)  as nos,pckh_ordno,pckh_orddate,pckt_sono,pckt_sodate,pckh_noofreels, 
var_size2 as size,pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_size as sizecode,var_size1,var_size2 , ordt_rate as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, pckh_truck  from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e where  b.pckt_sono = e.ordt_sono and a.pckh_fincode >= e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_size = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no =$slipno  and pckh_party = $custcode and b.pckt_size = d.var_code and a.pckh_no = b.pckt_no and b.pckt_fincode =$fincode   and a.pckh_comp_code = $compcode group by pckh_ordno,pckh_orddate, pckt_sono, pckt_sodate, pckh_noofreels, var_grpcode,var_name,var_tariffno,pckt_size,pckh_date,var_size1,var_size2, ordt_rate,pckh_truck";


$r = mysqli_query($conn, $sql);

$arr = [];
while ($re = mysqli_fetch_assoc($r)) {
	$arr[] = $re;
}

echo json_encode(["total" => count($arr), "results" => $arr]);

    }



function getslipdetailsInv()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];


	$sql= "select Cast(sum(pckt_wt) as decimal(10,0)) as weight,count(pckt_sr_no)  as nos,pckh_noofreels, var_size2 as size,pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_size as sizecode,var_size1,var_size2 , ordt_rate as rate, round(Cast(sum(pckt_wt) as decimal(10,0))/1000 * ordt_rate,2)  as amount, pckh_truck  from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e where  b.pckt_sono = e.ordt_sono and a.pckh_fincode >= e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_size = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no =$slipno  and pckh_party = $custcode and b.pckt_size = d.var_code and a.pckh_no = b.pckt_no and b.pckt_fincode =$fincode   and a.pckh_comp_code = $compcode group by  pckh_noofreels, var_grpcode,var_name,var_tariffno,pckt_size,pckh_date,var_size1,var_size2, ordt_rate,pckh_truck";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getSONOlist()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];
	
	$sql= "select  pckt_sono, pckt_sodate from trnsal_packslip_trailer  where pckt_comp_code = $compcode and pckt_fincode = $fincode  and pckt_no = $slipno  group by pckt_sono,pckt_sodate";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getslipdiscount()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$varcode = $_POST['varcode'];
	$slipno = $_POST['slipno'];
    $sql= "select * from trnsal_order_trailer where ordt_fincode = $fincode and ordt_sono = $slipno and ordt_var_code = $varcode and ordt_comp_code = $compcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getslipalldetails()
    {
		global $conn;  

	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ordno    = $_POST['ordno'];



        $sql= "select ordh_creditdays,ordh_gracedays,ordh_tax, tax_name,ordh_sgst,ordh_cgst,ordh_igst,ordh_ins_yn ,ordh_insper,ordh_delivery_add1,
ordh_delivery_add2,ordh_delivery_add3,ordh_delivery_city,ordh_delivery_pin,ordh_delivery_gst,ordh_cust_rem,
ordh_frt from trnsal_order_header,massal_tax , massal_customer where  ordh_party = cust_code and cust_taxtag = tax_code 
and ordh_comp_code =  $compcode  and ordh_fincode >= $fincode and ordh_sono =  $ordno";


$r = mysqli_query($conn, $sql);

$arr = [];
while ($re = mysqli_fetch_assoc($r)) {
	$arr[] = $re;
}

echo json_encode(["total" => count($arr), "results" => $arr]);

    }

function gettruck()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$slipno = $_POST['slipno'];
    $sql= "select * from trnware_packslip_header where wpckh_slipno = $slipno and wpckh_fincode = $fincode and wpckh_comp_code = $compcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getslipinsurance()
    {
		global $conn;  

	$compcode = $_POST['compcode'];
    $sql= "select * from massal_default1 where def_comp_code = $compcode";
	$nrow = mysqli_num_rows($r);

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function gethsnlist()
    {
		global $conn;  


        $sql= "select tariff_code,tariff_name from massal_tariff ";

		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function invupdatetruck()
    {
		global $conn;  

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];
	$truck = $_POST['truck'];
	$despl = $_POST['despl'];
    mysqli_query($conn, "BEGIN");
    $query = "update  trnsal_invoice_header set invh_vehi_no = '$truck' , invh_desp_location = '$despl' where  invh_fincode= $finid  and invh_comp_code= $compcode and invh_no = $invno";
	$result = mysqli_query($conn, $query);

		if (!$result) {
			mysqli_query($conn, "ROLLBACK");
			die("Query failed: " . mysqli_error($conn));
		} else {
			mysqli_commit($conn);


		}
  }

 function getEInvStatus()
    {
		global $conn;  

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

        $sql= "select * from AIS_OEIV where invEntry = '$invno' and DocEntry in (select max(DocEntry) from AIS_OEIV where invEntry = '$invno'";

        $sql= "select * from AIS_OEIV where invEntry = '$invno' order by CreateDate desc";


		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getEWayStatus()
    {
		global $conn;  

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

        $sql= "select * from AIS_OEIV where invEntry = '$invno' and DocEntry in (select max(DocEntry) from AIS_OEIV where invEntry = '$invno'";

        $sql= "select * from AIS_OEWB where invEntry = '$invno' order by CreateDate desc";


		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getInvoiceAmount()
    {
		global $conn;  

	$finid      = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$custcode  = $_POST['custcode'];
	$startdate  = $_POST['startdate'];

//        $sql= "select sum(invh_netamt) as salesinvamt from trnsal_invoice_header where invh_comp_code = $compcode  and invh_fincode =  $finid   and invh_date >= '$startdate' and invh_party = $custcode");

        $sql= "select case when sum(invh_netamt) > 0  then  sum(invh_netamt) else 0 end  as salesinvamt  from trnsal_invoice_header, massal_customer where  invh_party = cust_code and cust_tcs_applied = 'Y'  and invh_comp_code = $compcode  and invh_fincode =  $finid   and invh_date >= '$startdate' and invh_party = $custcode";


		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getPartyDistance()
{
	global $conn;  

	$custcode  = $_POST['custcode'];
    $sql= "select cust_distance from massal_customer where cust_code = '$custcode'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSalesLedgerCode()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];

	$sql= "select * from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety c , masprd_variety d,masprd_type e where c.var_grpcode = d.var_groupcode and d.var_typecode = e.vargrp_type_code and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no = $slipno  and b.pckt_size = c.var_code and b.pckt_fincode  = $fincode and a.pckh_comp_code =  $compcode  limit 1";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getslipNetWt()
    {
		global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];


	$sql= "select * from trnsal_packslip_header where pckh_comp_code= $compcode and pckh_fincode = $fincode  and pckh_no = $slipno";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
