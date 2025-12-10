<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){




		case "loadRRNo":
		getRRNo();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "loadGRNNoList":
		getGRNNoList();
		break;
		case "loadgrndetails":
		getgrndetails();
		break;
		case "loadGRNReturnHederdetails":
		getGRNReturnHederdetails();
		break;

		case "loadRRNoList":
		getRRNoList();
		break;

		case "loadRRNoPendingList":
		getRRNoPendingList();
		break;

		case "LoadDNNumber":
	        getDNNumber();
		break;

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }



   
 function getRRNo()
    {
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        global $conn;
	$sql = "select ifnull(max(debh_no),0)+1 as retno from trnpur_grn_ret_header where debh_comp_code = $compcode and debh_fin_code = $finid ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    
   
 function getsupplier()
    {
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$GRNtype  = $_POST['GRNtype'];

        global $conn;
	$sql = "select cust_ref,cust_code from trnpur_min_header , massal_customer where minh_sup_code = cust_code and  minh_comp_code = $compcode and minh_fin_code = $finid  group by cust_ref,cust_code order by cust_ref";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getGRNNoList()
    {
	$supcode  = $_POST['supcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$GRNtype  = $_POST['GRNtype'];
        global $conn;
	$sql = "select * from trnpur_min_header where minh_comp_code = $compcode and minh_fin_code = $finid and minh_sup_code = $supcode  order by minh_minno desc
";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getgrndetails()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
//	$flag     = $_POST['flag'];
	$grnno    = $_POST['grnno'];
        $GRNtype  = $_POST['GRNtype'];
	{
	$sql = "call sppur_sel_mindetails('$compcode','$finid','$grnno')";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getRRNoList()
    {
	$supcode  = $_POST['supcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$GRNtype  = $_POST['GRNtype'];
        global $conn;
	$sql = "select * from trnpur_grn_ret_header where debh_comp_code = $compcode and debh_fin_code = $finid  order by debh_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getRRNoPendingList()
    {
	$supcode  = $_POST['supcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$GRNtype  = $_POST['GRNtype'];
        global $conn;
	$sql = "select * from trnpur_grn_ret_header where debh_comp_code = $compcode and debh_fin_code = $finid and debh_accupd = 'N' order by debh_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getGRNReturnHederdetails()
    {
	$retno    = $_POST['retno'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$GRNtype  = $_POST['GRNtype'];
        global $conn;
	$sql = "select * from  trnpur_grn_ret_header,trnpur_grn_ret_trailer , massal_customer where debh_supcode = cust_code  and debh_comp_code = debt_comp_code and debh_fin_code = debt_fin_code and debh_no= debt_no and debh_comp_code = $compcode and debh_fin_code = $finid and debh_no= $retno";
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


        $sql  = "select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchLedgerlist()
    {
        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        global $conn;
        if ($party == '')
        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ' and cust_type != 'G' order by cust_name";
        else
        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ' and replace(replace(cust_name,' ','')  ,'.','') like '%$party%' and cust_type != 'G' order by cust_name";
   
   //  $qry = "select * from massal_customer where cust_name like '%$party%' order by cust_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 
?>
