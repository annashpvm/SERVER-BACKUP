<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadPPNo":
		getPPNo();
		break;

		case "loadPPProduction":
		getPPProduction();
		break;
		case "loadSONo":
		getSONo();
		break;
		case "loadsizedetails":
                getsizedetails();
		break;
		case "loadPPnolist":
		getPPNolist();
		break;
		case "editPPNoheader":
		getPPNoheader();
		break;
		case "editPPNotrailer":
		getPPNotrailer();
		break;
		case "loadPPvariety":
		getPPvariety();
		break;
		case "loadPPsize":
		getPPsize();
		break;
		case "loadVarietydetail":
		getVarietydetail();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getPPvariety()
    {
       global $conn;  
        $varcodes = $_POST['varcodes'];
        $sql = "select var_groupcode,var_desc from masprd_variety where var_groupcode in $varcodes order by var_desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPPsize()
    {
       global $conn;  
        $sizecodes = $_POST['sizecodes'];
        $sql = "select msize,var_gsm from ( 
select var_size2 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_groupcode and  a.var_code in $sizecodes and var_size2 > 0
union all
select var_size1 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_code and  a.var_code in $sizecodes  and var_size1 > 0
)a group by msize,var_gsm ";

        $sql = "select var_size2 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_groupcode and  a.var_code in  $sizecodes";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getVarietydetail()
    {
       global $conn;  
        $sizecode = $_POST['sizecode'];
        $sql = "select * from massal_variety a , masprd_variety b  , masprd_type c where a.var_grpcode = b.var_groupcode 
and b.var_typecode = c.vargrp_type_code and var_code =  $sizecode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPPProduction()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mano     = $_POST['mano'];
        $sql = "select sum(pih_mcprodn) as mcprodn from trn_prodplan_trailer_varietywise where pih_comp_code = $compcode and pih_fincode = $finid and pih_mano =  $mano";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPPNo()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine = $_POST['machine'];
        $sql = "select ifnull(max(pp_advno),0)+1 as advno from trn_prodplan_header where pp_comp_code = $compcode and pp_fincode = $finid";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPPNolist()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $sql = "select pp_advno from trn_prodplan_header where pp_comp_code = $compcode and pp_fincode = $finid  group by pp_advno order by pp_advno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPPNoheader()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mano     = $_POST['mano'];

$sql = "select *, c.var_groupcode as varty_code, d.var_code as size_code from trn_prodplan_header a, massal_customer b,masprd_variety c,massal_variety d where a.pp_party = b.cust_code and a.pp_varcode = c.var_groupcode and a.pp_sizecode = d.var_code and pp_comp_code = $compcode and pp_fincode = $finid  and pp_advno = $mano order by pp_slno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPPNotrailer()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $mano     = $_POST['mano'];


$sql = "select * from trn_prodplan_trailer a, masprd_variety b where a.ppt_varcode = b.var_groupcode and ppt_comp_code =  $compcode  and ppt_fincode = $finid  and ppt_advno = $mano order by ppt_slno";


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
        $sql = "select ordh_sono,ordh_sodate from trnsal_order_header a, trnsal_order_trailer b 
where a.ordh_party = '$party' and a.ordh_sono = b.ordt_sono  and a.ordh_fincode = b.ordt_fincode  and
a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = '$compcode' and (b.ordt_qty - b.ordt_adv_qty) > 0.01 and b.ordt_clo_stat <> 'T' and a.ordh_can_stat <> 'T' group by ordh_sono,ordh_sodate order by ordh_sono desc";


        $sql = "select ordh_sono,ordh_sodate from trnsal_order_header a, trnsal_order_trailer b 
where a.ordh_party = '$party' and a.ordh_sono = b.ordt_sono  and a.ordh_fincode = b.ordt_fincode  and
a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = '$compcode' and b.ordt_clo_stat <> 'T' and a.ordh_can_stat <> 'T' group by ordh_sono,ordh_sodate order by ordh_sono desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

function getsizedetails()
{
	global $conn;  
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];
	$party = $_POST['party'];
        $finid = $_POST['finid'];
        $sql = "select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$sono' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code  and (b.ordt_qty - b.ordt_adv_qty) > 0 group by var_code,var_name,ordh_sodate,var_size1,var_size2";

        $sql = "select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$sono' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code   group by var_code,var_name,ordh_sodate,var_size1,var_size2";


$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

?>
