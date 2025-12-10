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
		case "loaddnrecptno":
		getdnrecptno();
		break;
		case "loaddnnolist":
		getdnnolist();
		break;

		case  "loaddnnodetail":
		getdnnodetail();
		break;

		case  "loaddnnodetail2":
		getdnnodetail2();
		break;

		case "loaddnrecptnolist":
		getdnrecptnolist();
		break;
			
		case "loaddnrecptnodetail":
		getdnrecptnodetail();
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

		case  "loaditem":
		getitem();
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
    $query = "select sup_refname,sup_code from trnpur_general_header , maspur_supplier_master where genh_party = sup_code and genh_type = 'D'  group by sup_refname,sup_code";
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
	
 function getdnrecptno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(genh_no),0)+1 as dnrecptno from trnpur_general_header where genh_type  = 'R' and genh_comp_code = $compcode and genh_fincode = $finid");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getdnnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$sql = "select genh_no,genh_fincode from trnpur_general_header,trnpur_general_trailer 
where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and 
genh_comp_code='$compcode'  and genh_fincode= $finid and genh_party='$supcode' and gent_issqty>gent_recqty and 
genh_type='D' group by genh_no,genh_fincode order by genh_no desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getdnrecptnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select genh_no,genh_fincode from trnpur_general_header where genh_type  = 'R' and genh_comp_code = $compcode and genh_fincode = $finid order by genh_no desc");
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

function getdcno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$sql = "select * from trnpur_general_header,trnpur_general_trailer 
where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and 
genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and 
genh_type='D'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getdnnodetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dnno = $_POST['dnno'];
	
	$sql = "select * from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code and gent_issqty > gent_recqty  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_no = '$dnno'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
   }


function getdnnodetail2()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dnno     = $_POST['dnno'];
	//$icode    = $_POST['itemcode'];
           
	
	$sql = "select gent_issqty - gent_recqty as balqty from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_no = '$dnno' ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
   }



function getdnrecptnodetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$recptno = $_POST['recptno'];
	
	$sql = "select * from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code and  genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'R' and genh_no = '$recptno'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
   }

function getitem()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	$wono = $_POST['wono'];
	
	$sql = "select item_name,gent_item_code,gent_podate from trnpur_general_header a,trnpur_general_trailer b  ,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono");
	//$sql = "select * from mas_terms");
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
