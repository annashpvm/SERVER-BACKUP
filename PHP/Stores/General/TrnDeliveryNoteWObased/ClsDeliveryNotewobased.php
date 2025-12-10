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
		case "loaddnno":
		getdnno();
		break;
		case "loaddnnolist":
		getdnnolist();
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
		case  "loaddnnodetail":
		getdnnodetail();
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

		case  "loadworkordnolist":
		getworkordnolist();
		break;
		case  "loadworkorderitems":
		getworkordnoitems();
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
	
 function getdnno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(genh_no),0)+1 as dnno from trnpur_general_header where genh_type  = 'D' and genh_comp_code = $compcode and genh_fincode = $finid");
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
//        $sql = "select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where minh_fin_code=27 and minh_comp_code=1");
        $sql = "select genh_no from trnpur_general_header where  genh_tag  = 'W' and  genh_type  = 'D' and genh_comp_code = $compcode and genh_fincode = $finid order by genh_no desc");
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
	
	$sql = "select * from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_no = '$dnno'");
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
	
	$sql = "select * from mas_item_master order by item_name");
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
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$wono     = $_POST['wono'];
        $itemcode = $_POST['item'];

	$sql = "select * from mas_item_master a , mas_uom b where item_uom = uom_code and item_code = $itemcode");

$sql = "select uom_short_name, wot_qty-wot_dcraised as qty from trnpur_workorder_header a,  trnpur_workorder_trailer b,maspur_supplier_master c ,mas_item_master d ,mas_workorder e, mas_uom f  where item_uom = uom_code and woh_seqno = wot_hdseqno and woh_sup_code = sup_code and woh_wocode =wo_no and wot_itemcode = item_code and woh_comp_code = $compcode  and  woh_fin_code = $finid and woh_no = $wono  and wot_itemcode = $itemcode"); 



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getworkordnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['partycode'];
	
	$sql = "select item_name,gent_item_code,gent_podate from trnpur_general_header a,trnpur_general_trailer b  ,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono");

$sql = "select woh_no from trnpur_workorder_header ,trnpur_workorder_trailer  where woh_seqno = wot_hdseqno and woh_comp_code = $compcode and woh_fin_code = $finid and woh_sup_code = $party and wot_qty > wot_dcraised group by woh_no order by woh_no desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getworkordnoitems()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$wono     = $_POST['wono'];

$sql = "select woh_seqno,woh_date,item_name,item_code from trnpur_workorder_header a,  trnpur_workorder_trailer b,maspur_supplier_master c ,mas_item_master d ,mas_workorder e where woh_seqno = wot_hdseqno and woh_sup_code = sup_code and woh_wocode =wo_no and wot_itemcode = item_code and woh_comp_code = $compcode  and  woh_fin_code = $finid and woh_no = $wono group by woh_seqno,woh_date,item_name,item_code order by woh_seqno,woh_date,item_name,item_code"); 

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
