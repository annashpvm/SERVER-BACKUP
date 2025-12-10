<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadDCNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadDCNo":
		getDCNo();
		break;
		case "loadDCNolist":
		getDCNolist();
		break;
				
		case "loadcarrier":
		getcarrier();
		break;
		case "loaddept":
		getdept();
		break;
		case "loadpayterms":
		getpayterms();
		break;
		case "loaddcno":
		getdcno();
		break;
		case  "loadDCNodetail":
		getDCNodetail();
		break;
		case  "loaditem":
		getitem();
		break;
		case  "loaditemdet":
		getitemdet();
		break;
		case  "loaditemlist":
		getitemlist();
		break;


		case  "loadSearchItemlist":
		getSearchItemlist();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 
	

function getsupplier(){
    $query = "call sp_pur_sup()";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
   }
	
 function getDCNo()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dctype   = $_POST['dctype'];
        $sql = "select ifnull(max(dch_no),0)+1 as dcno from trnpur_deliverychallan_header where dch_type  = '$dctype' and dch_comp_code = $compcode and dch_fincode = $finid";
        $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDCNolist()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dctype   = $_POST['dctype'];
        $sql = "select dch_no from trnpur_deliverychallan_header where dch_type  = '$dctype' and dch_comp_code = $compcode and dch_fincode = $finid group by dch_no order by dch_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcarrier()
    {
        global $conn;
	$sql = "select * from mas_transport";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getdept()
    {
        global $conn;
	$sql = "call sp_sel_dept()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpayterms()
    {
        global $conn;
	$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
/*
function getdcno()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$sql = "select * from trnpur_general_header,trnpur_general_trailer 
where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and 
genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and 
genh_type='D'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
*/
function getDCNodetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno     = $_POST['dcno'];
	$dctype   = $_POST['dctype'];

	$sql = "select * from trnpur_deliverychallan_header a,trnpur_deliverychallan_trailer b,massal_customer c ,maspur_item_header d , mas_uom e  where item_uom = uom_code and dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no  and dch_type = dct_type and dct_item_code = item_code and  dch_party = cust_code  and dch_comp_code = '$compcode' and dch_fincode = '$finid' and dch_type = '$dctype' and dch_no = '$dcno' order by dct_sno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitem()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	$wono = $_POST['wono'];
	
	$sql = "select item_name,gent_item_code,gent_podate from trnpur_general_header a,trnpur_general_trailer b  ,massal_customer c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = cust_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono";
	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getitemlist()
    {
        global $conn;
	
	$sql = "select * from mas_item_master order by item_name";
	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
        global $conn;
        $itemcode = $_POST['item'];
	$sql = "select * from mas_item_master a , mas_uom b where item_uom = uom_code and item_code = $itemcode";

//        $sql = "select * from mas_item_master, mas_uom , mas_hsncode  where item_uom =  uom_code  and hsn_sno  = item_hsncode and item_code = $itemcode";


	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getSearchItemlist()
    {
        global $conn;
        $item = $_POST['item'];


        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));

/*
        if ($item == '') 
	$sql = "select * from mas_item_master a , mas_uom b where item_uom = uom_code ";
        else
	$sql = "select * from mas_item_master a , mas_uom b where item_uom = uom_code and item_name like '%$item%'";
*/

        if ($item == '') 
	$sql = "select * from maspur_item_header a , mas_uom b where item_uom = uom_code ";
        else
	$sql = "select * from maspur_item_header a , mas_uom b where item_uom = uom_code and replace(replace(item_name,' ','')  ,'.','') like '%$item%'";

	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
