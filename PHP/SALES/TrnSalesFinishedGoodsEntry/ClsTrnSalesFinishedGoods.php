<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='findFinishedGoodsEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "findFinishedGoodsEntryNo":
		getFinEntryNo();
		break;
		case "loadGodownDetails":
		getGodownDetails();
		break;
		case "CheckNumber":
		getNumber();
		break;
		case "loadFinishedGoodsEntryNo":
		getAllFinEntryNo();
		break;
		case "loadFinEntNoDetails":
		getFinEntryNoDetails();
		break;
		case "loadSONo":
		getSONo();
		break;
		case "loadRollNos":
        getRollNos();
            break;
        case "loadShift":
                getShift();
                    break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getFinEntryNo()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(stk_ent_no),0)+1 as sentno from trnsal_finish_stock where stk_finyear= $finid and stk_comp_code= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAllFinEntryNo()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select stk_ent_no from trnsal_finish_stock where stk_ent_no <> 100 and stk_finyear= $finid  and stk_comp_code= $compcode group by stk_ent_no order by stk_ent_no desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getFinEntryNoDetails()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $entno = $_POST['entno'];

        $sql = "select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c , mas_rg1_location d  where stk_loca = godown_code
and  b.var_grpcode = c.var_groupcode and stk_comp_code =$compcode  and stk_finyear = $finid  and stk_ent_no = $entno  and stk_var_code = b.var_code and  a.stk_deltag <> 'T' order by stk_sr_no";

        $sql = "select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c ,massal_customer where  stk_party = cust_code and b.var_grpcode = c.var_groupcode and stk_comp_code = $compcode  and stk_finyear = $finid   and stk_ent_no =$entno    and stk_var_code = b.var_code and  a.stk_deltag <> 'T' order by var_name, stk_sr_no";

        $sql = "select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c ,massal_customer d, trnsal_order_header e where  stk_sono = ordh_sono and ordh_party = cust_code and b.var_grpcode = c.var_groupcode and stk_comp_code = $compcode  and stk_finyear = $finid   and stk_ent_no =$entno    and stk_var_code = b.var_code and  a.stk_deltag <> 'T' and ordh_comp_code = stk_comp_code order by var_name, stk_sr_no";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getNumber()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];

        $sql = "select count(*) as nos, stk_ent_no,stk_ent_date from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no";


        $sql = "select count(*) as nos , stk_ent_no , stk_ent_date  from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

/*
 function getNumber()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];
        $sql = "select count(*) as nos from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_units = $rbunit  and stk_sr_no = $no");

        $sql = "select '10' as nos from trnsal_finish_stock where stk_comp_code = '$compcode' and stk_finyear = '$finid' and stk_units = '$rbunit'");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

*/
 function getGodownDetails()
    {
       global $conn;  
        $sql = "select godown_code,godown_name from mas_rg1_location order by godown_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getSONo()
{
global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['party'];
        $sql = "select ordh_sono,ordh_sodate from trnsal_order_header where ordh_party = '$party' and ordh_comp_code =  $compcode  group by ordh_sono,ordh_sodate order by ordh_sono desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getRollNos()
{
global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rdate = $_POST['rdate'];
    $sql = "select stk_rollno from trnsal_finish_stock where  stk_comp_code =  $compcode and stk_finyear = $finid  and stk_ent_date = '$rdate' group by stk_rollno order by stk_rollno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

function getShift()
{
global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rdate = $_POST['rdate'];
    $rollno = $_POST['rollno'];
    $sql = "select * from trnsal_finish_stock where  stk_comp_code =  $compcode and stk_finyear = $finid  and stk_ent_date = '$rdate' and  stk_rollno = $rollno  ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}
?>
