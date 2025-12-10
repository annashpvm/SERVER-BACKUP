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

	       case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
               case "ControlExpNo":
                getControlExpNo();
                break;
               case "LoadTDStype":
                getTDStype();
                break;
               case "LoadPartyTDSType":
                getPartyTDSType();
                break;
               case "LoadTDSPer":
                getTDSPer();
                break;

               case "loadExpNoList":
                getExpNoList();
                break;

               case "LoadExpVouNoDetails":
                getExpVouNoDetails();
                break;

		case "loadServiceList":
		getServiceList();
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

    global $conn;
	$taxtype = $_POST['taxtype'] ?? '';
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];
 	
        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'";
		}  
        }
        else
        {
             	if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%%CGST%'";
		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%CGST%%LIA%'";
		}  
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

        global $conn;
	$taxtype = $_POST['taxtype'] ?? '';
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];

        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%SGST%LIA%$gstper%'";
		}  
        }
/*
        else
        {
             	if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%%SGST%'";
		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%SGST%%LIA%'";
		}  
        } 
*/
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIGSTledgers()

    {

        global $conn;
	$ledtype = $_POST['ledtype'];
	$taxtype = $_POST['taxtype'] ?? '';
 	$gstper  = $_POST['gstper'];
        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%IGST%LIA%$gstper%'";
		}  
        }
/*
        else
        {
             	if ($taxtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%%IGST%'";
		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%IGST%%LIA%'";
		}  
        } 
*/
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


//        $ledname = strtoupper($_POST['ledger']);
//        $sql = "select * from massal_customer where cust_name like '%$ledname%'";


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
      $sql = "select * from massal_customer where  cust_type != 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


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
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
      $sql = "select * from massal_customer where cust_type = 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


    function getControlExpNo() {
        global $conn;
        $ginfinid= $_POST['ginfinid'];
        $gincompcode=$_POST['gincompcode'];
        $sql = "select concat('EXP',ifnull(max(eh_expno),0) + 1) as Vouno from acc_expenses_header where eh_fincode = '$ginfinid' and eh_compcode = '$gincompcode';";
        $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
        $arr = [];
        while ($re = mysqli_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

  function getTDStype()
    {
        global $conn;

        $sql = "select tds_code,tds_name from mas_acc_tds  order by tds_code";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getPartyTDSType()
    {
        global $conn;
        $supcode = $_POST['supcode'];

        $sql = "select * from massal_customer , mas_acc_tds  where cust_tds_type = tds_code and cust_code = $supcode ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function getTDSPer()
    {
        global $conn;
        $tdscode = $_POST['tdscode'];

        $sql = "select * from mas_acc_tds  where  tds_code = $tdscode ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    function getExpNoList() {
        global $conn;
        $ginfinid    = $_POST['fincode'];
        $gincompcode = $_POST['compcode'];
        $sql = "select eh_expvouno from acc_expenses_header where eh_compcode = $gincompcode and eh_fincode = $ginfinid order by  eh_expno  desc;";
        $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);

        $arr = [];
        while ($re = mysqli_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }


    function getExpVouNoDetails() {
        global $conn;
        $ginfinid    = $_POST['fincode'];
        $gincompcode = $_POST['compcode'];
        $ginvouno    = $_POST['vouno'];




        $sql = " select a.*,b.*,c.* , tax.cust_name tax_ledname 
 , cgst.cust_name cgst_ledname 
 , sgst.cust_name sgst_ledname 
 , igst.cust_name igst_ledname 
 , tds.cust_name tds_ledname 
  from acc_expenses_header  a, acc_expenses_trailer b, massal_customer c
 ,massal_customer tax
 ,massal_customer cgst
 ,massal_customer sgst
 ,massal_customer igst
 ,massal_customer tds
 where 
 et_taxable_code  = tax.cust_code and 
 et_cgst_ledcode  = cgst.cust_code and 
 et_sgst_ledcode  = sgst.cust_code and 
 et_igst_ledcode  = igst.cust_code and 
 et_tdsledcode  = tds.cust_code and  
 eh_partycode = c.cust_code and 
 eh_compcode = et_compcode and eh_fincode = et_fincode and eh_expno = et_expno
 and eh_compcode = $gincompcode and eh_fincode =  $ginfinid and eh_expvouno  =  '$ginvouno'";


 $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);

        
    $arr = [];
        while ($re = mysqli_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

 function getServiceList()
    {
        global $conn;
	$sql = "select * from mas_tds_servicetype order by tds_service_type_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	

?>
