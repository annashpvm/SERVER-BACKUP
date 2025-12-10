<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "findPartyType":
		getPartyType();
		break;
		case "LoadDNNumber":
	        getDNNumber();
		break;
		case "LoadDebitNoteVoucherList":
	        getDebitNoteVoucherList();
		break;
		case "LoadDebitNoteVoucherDetail":
	        getDebitNoteVoucherDetail();
		break;

		case "LoadDebitNoteVoucherDetailAccounts":
	        getDebitNoteVoucherDetailAccounts();
		break;

		case "LoadDebitNoteVoucherListAccounts":
	        getDebitNoteVoucherListAccounts();
		break;
		case "loadunit":
		getunit();
		break;


		case "LoadDNDate":
	        getDNDate();
		break;


		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    



 function getCGSTledgers()
 {

        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn; 
        if ($ledtype == "O")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'CGST'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn; 
        if ($ledtype == "O")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'SGST'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn; 
        if ($ledtype == "O")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'IGST%$gstper%'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSearchPartylist()
    {
        global $conn; 

        $party  = $_POST['party'];

        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 

        $sql = "select * from massal_customer where cust_type <> 'G' and left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
        
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPartyType()
    {
        global $conn; 

        $partydrcr = $_POST['partydrcr'];
        $partycode = $_POST['partycode'];

//        if ($partydrcr == "C")
           $sql = "select cust_state statecode from massal_customer where cust_code = $partycode" ;
//        else
  //         $qry = "select sup_state statecode from massal_customer where sup_code = $partycode" ;
           



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getDNNumber()
    {
        global $conn; 
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];

        if ($ginfinid >=  24)
        {      
        if ($gsttype == 'G')
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
        else
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
         }
         else
        {      
        if ($gsttype == 'G')
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from tmpacc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
        else
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from tmpacc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
         }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDebitNoteVoucherList()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
        $gsttype =$_POST['gsttype'];
        if ($gsttype == 'G')
		$sql = "select pur_vouno from str_debit_note where pur_gsttype = 'DNG' and pur_compcode = '$compcode' and  pur_finid = '$finid' group by pur_vouno order by pur_vouno desc";
        else
		$sql = "select pur_vouno from str_debit_note  where  pur_gsttype = 'DNN' and pur_compcode = '$compcode' and  pur_finid = '$finid' group by pur_vouno order by pur_vouno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getDebitNoteVoucherDetail()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];
	$dntype   = $_POST['dntype'];

       if  ($dntype   == '')
          $sql = "select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno'";
       else
          $sql = "select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_gsttype = '$dntype' and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno'";
  

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getDebitNoteVoucherDetailAccounts()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];

          $sql = "select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno' and pur_accseqno = 0";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getDebitNoteVoucherListAccounts()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];

	$sql = "select pur_vouno from str_debit_note where  pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_accseqno = 0 group by pur_vouno order by pur_vouno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getunit()
    {
        global $conn; 
        $sql = "select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDNDate()
    {
        global $conn; 
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $sql = "select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
        else
	   $sql = "select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
