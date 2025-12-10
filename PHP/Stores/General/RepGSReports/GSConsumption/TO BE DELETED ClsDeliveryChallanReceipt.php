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
		case "loadDCrecptno":
		getDCrecptno();
		break;
		case "loadDCnolist":
		getDCnolist();
		break;

		case  "loadDCnodetail":
		getDCnodetail();
		break;

		case "loadDCrecptnolist":
		getDCrecptnolist();
		break;
			
		case "loadDCrecptnodetail":
		getDCrecptnodetail();
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


		case  "loaditemdet":
		getitemdet();
		break;
		case  "loaditemlist":
		getitemlist();
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
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $query = "select cust_ref,cust_code from trnpur_deliverychallan_header , massal_customer where dch_party = cust_code and dch_type = 'R' and  dch_comp_code = $compcode and dch_fincode = $finid group by cust_ref,cust_code";
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
	
 function getDCrecptno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(dcr_no),0)+1 as dcrecptno from trnpur_deliverychallan_receipt where  dcr_comp_code = $compcode and dcr_fincode = $finid");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getDCnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];


	$sql = "select dch_no,dch_fincode from trnpur_deliverychallan_header,trnpur_deliverychallan_trailer where dch_comp_code = dct_comp_code and dch_fincode=dct_fincode and dch_no=dct_no and dch_comp_code= '$compcode'  and dch_fincode= $finid and dch_party= '$supcode' and dct_issqty>dct_recqty and dch_type='R' group by dch_no,dch_fincode order by dch_no desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getDCrecptnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select dcr_no from trnpur_deliverychallan_receipt where dcr_comp_code = $compcode and dcr_fincode = $finid group by dcr_no  order by dcr_no  desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




function getcarrier()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select * from mas_transport");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getdept()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "call sp_sel_dept()");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpayterms()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select * from mas_terms");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




function getDCnodetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	


	$sql = "select * from trnpur_deliverychallan_header a,trnpur_deliverychallan_trailer b,massal_customer c ,maspur_item_header d , mas_uom e where item_uom = uom_code and dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no   and dch_type = dct_type and dct_item_code = item_code and  dch_party = cust_code and dct_issqty > dct_recqty  and dch_comp_code = '$compcode' and dch_fincode = '$finid' and dch_type = 'R' and dch_no = '$dcno'");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
   }





function getDCrecptnodetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$recptno = $_POST['recptno'];

	$sql = " select * from trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer where 
 dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and  dcr_comp_code = '$compcode' and dcr_dcfincode = '$finid' and dcr_no = $recptno");

	$sql = "select * from  trnpur_deliverychallan_header, trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer ,maspur_item_header  , mas_uom   where  dct_item_code = item_code and item_uom = uom_code and  dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no and 
 dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and dch_type = 'R' and  dcr_comp_code = $compcode and dcr_dcfincode = $finid and dcr_no = $recptno");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
   }

function getitemlist()
    {
        mysqli_set_charset($conn, "utf8");
	
	$sql = "select item_code, item_name from mas_item_master order by item_name");
	//$sql = "select * from mas_terms");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
        mysqli_set_charset($conn, "utf8");
        $itemcode = $_POST['item'];
	$sql = "select * from mas_item_master a , mas_uom b where item_uom = uom_code and item_code = $itemcode");
	//$sql = "select * from mas_terms");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
