<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadDCNo":
		getDCNo();
		break;
		case "loadDCNoEdit":
                getDCNoEdit();
                break;
		case "EditDCNo":
                getEditDCNo();
                break;
		case "loaddano":
		getDANo();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadSOcustomer":
		getSOcustomer();
		break;
		case "findTaxCode":
		getTaxCode();
		break;
		case "loadinvtype":
		getinvtype();
		break;
		case "loadcusttype":
		getcusttype();
		break;

		case "loadSOno":
		getSOno();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadqtydet":
		getqtydetails();
		break;
		case "loadfromtobox":
		getloadfromtobox();
		break;

		case "loadgriddetails":
		getloadgriddetails();
		break;

		case "loaditemstockqty":
		getitemstockqty();
		break;



		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getDCNo()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
    $sql = "select ifnull(max(dc_no),0)+1 as dcno from trn_delivery_challan where dc_fincode= $finid  and dc_comp_code= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getDCNoEdit()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
    $sql = "select dc_seqno,dc_no   from trn_delivery_challan where dc_fincode= $finid  and dc_comp_code= $compcode  group by dc_seqno,dc_no order by dc_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEditDCNo()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dcno  = $_POST['dcno'];

//        $r = mysql_query("select * from trn_delivery_challan a,  massal_customer c, massal_variety e where  a.dc_seqno =$dcno and  a.dc_custcode = c.cust_code and a.dc_size = e.var_code and a.dc_fincode =  $finid  and a.dc_comp_code = $compcode order by var_name,dc_sr_no");

        //$r = mysql_query("select * from  trn_delivery_challan  h, trn_delivery_challan_reellist r , massal_variety c ,  massal_customer d where r.dc_size = c.var_code and h.dc_custcode = d.cust_code and  h.dc_fincode = $finid  and h.dc_comp_code = $compcode   and h.dc_seqno = r.dc_seqno and h.dc_seqno = $dcno ");


        $sql = "select * from  trn_delivery_challan  h, trn_delivery_challan_reellist r ,trn_delivery_challan_sizewise s, massal_variety c ,  massal_customer d where  r.dc_size = c.var_code and h.dc_custcode = d.cust_code and  h.dc_fincode = $finid   and h.dc_comp_code = $compcode and h.dc_seqno = r.dc_seqno and h.dc_seqno = s.dcs_seqno and  r.dc_size = s.dcs_size and h.dc_seqno = $dcno";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDANo()
    {
        global $conn;  
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];

//        $sql = "select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and //da_comp_code=$compcode and da_invtype=$invtype group by da_no");


        $sql = "select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and da_comp_code=$compcode group by da_no order by da_no desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  
function getcusttype()
    {
        global $conn;  
	$custcode = $_POST['custcode'];
        $sql = "select cust_type,cust_repr from massal_customer where cust_code = $custcode";
        $sql = "select cust_repr from massal_customer where cust_code = $custcode";


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
	$despdt = $_POST['despdt'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];
        $entrychk = $_POST['entrychk'];
        $sql = "select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and     b.da_fincode = $fincode and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref";

        $sql = "select cust_code,cust_ref from massal_customer where cust_type = 'C' Order by cust_ref";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSOcustomer()
    {
        global $conn;  
	$despdt = $_POST['despdt'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];
        $entrychk = $_POST['entrychk'];
        // $sql = "select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and     b.da_fincode = $fincode and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref";

        $sql = "select cust_code,cust_ref from massal_customer a,trnsal_order_header b where a.cust_code = b.ordh_party and b.ordh_fincode <= $fincode   and ordh_comp_code = $compcode  group by cust_code,cust_ref order by cust_ref";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getitemstockqty()
    {
        global $conn;  
	$slipdt = $_POST['slipdate'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];
	$sono = $_POST['sono'];


//$sql = "select sum(stk_wt)/1000 as stk,stk_units from  trnsal_finish_stock  where stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and stk_rettag = 'T' and stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");

// $sql = "select sum(stk_wt)/1000 as stk from  trnsal_finish_stock  where stk_sono = $sono and  stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and  stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");


$sql = "select sum(stk_wt)/1000 as stk from  trnsal_finish_stock  where stk_sono = $sono and  stk_var_code = $sizecode and  stk_destag =  '' and  stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSOno()
    {
        global $conn;  
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
//        $sql = "select da_ackno,da_date,cust_ref from trnsal_desp_advice a, massal_customer b, massal_variety c where a.da_var = c.var_code And a.da_cust = b.cust_code and a.da_cust = $customer and a.da_no = $dano and a.da_fincode = $fincode and a.da_close <> 'Y' and (da_desqty - da_slipqty) > 0 and a.da_comp_code = $compcode group by da_ackno,da_date,cust_ref");

        $sql = "select ordh_sono,ordh_sodate from massal_customer a,trnsal_order_header b where a.cust_code = b.ordh_party and 
	b.ordh_fincode <= $fincode  and ordh_comp_code = $compcode and ordh_party =$custcode order by ordh_sono";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsize()
    {
        global $conn;  
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];


//        $sql = "select var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate from trnsal_order_header a, trnsal_desp_advice b,massal_customer c, massal_variety d where b.da_no = $dano and b.da_cust = c.cust_code and b.da_cust = $customer and a.ordh_sono = b.da_ackno and a.ordh_fincode <= b.da_fincode and b.da_ackno = $sono and a.ordh_comp_code = b.da_comp_code and b.da_var = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode group by var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate";

        $sql = "select var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate 
from trnsal_order_header a, trnsal_order_trailer b,massal_customer c, massal_variety d where  a.ordh_party = c.cust_code and a.ordh_party = $customer and a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode and b.ordt_sono = $sono and a.ordh_comp_code = b.ordt_comp_code and b.ordt_var_code = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode group by  var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getqtydetails()
    {
        global $conn;  
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
	$sono = $_POST['sono'];
	$sizecode = $_POST['sizecode'];

//        $sql = "select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano and da_ackno = $sono and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");

  //      $sql = "select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano and da_ackno = $sono and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");


        $sql = "select ordt_rate as  da_urate,0 as wt from trnsal_order_trailer where ordt_sono = $sono
and ordt_fincode <= $fincode and ordt_var_code = $sizecode and  ordt_comp_code = $compcode group by ordt_rate";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getinvtype()
    {
        global $conn;  
	$sql = "select * from massal_invtype order by type_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getTaxCode()
    {
        global $conn;  
	$taxcode = $_POST['taxcode'];
    $sql = "select tax_cgst,tax_sgst,tax_igst from massal_tax where tax_code = '$taxcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getloadfromtobox()
    {
        global $conn;  
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];
//	$slipdate = $_POST['slipdate'];
	$sono    = $_POST['sono'];

/*
/      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt  from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_code and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'  and a.stk_rettag = 'T' and a.stk_comp_code = '$compcode' 
 group by stk_finyear,stk_sr_no,stk_wt  order by stk_finyear,stk_sr_no,stk_wt");

      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono   from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' and stk_sono = $sono 
 and a.stk_destag <> 'D' and a.stk_destag <> 'S' and a.stk_destag <> 'B'    group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt";
*/


      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono   from  trnsal_finish_stock a,massal_variety b,  masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag = ''  and a.stk_comp_code = '$compcode' and stk_sono = $sono group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt";





    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getloadgriddetails()
    {
        global $conn;  
	$varitycode = $_POST['varitycode'];
	$stnofrom = $_POST['stnofrom'];
	$stnoto = $_POST['stnoto'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];

	$unit = 1 ;


if($stnofrom==0)
{
$sql = "select stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode as var_code,stk_sono from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_groupcode = b.var_grpcode  and stk_var_code = $varitycode 
and a.stk_sr_no >= '$stnoto' 
and a.stk_sr_no <= '$stnoto'
and a.stk_sono = $sono 
and a.stk_destag <> 'T' and a.stk_deltag <> 'T' and a.stk_destag <> 'B' and a.stk_destag <> 'S' and a.stk_destag <> 'C'
and a.stk_comp_code =$compcode 
group by stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode,stk_sono order by stk_sr_no";


}
else
{

$sql = "select stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode as var_code,stk_sono from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_groupcode = b.var_grpcode  and stk_var_code ='$varitycode'
and a.stk_sr_no >= '$stnofrom' 
and a.stk_sr_no <= '$stnoto'
and a.stk_sono = $sono 
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'  and a.stk_destag <> 'B' and a.stk_destag <> 'S' and a.stk_destag <> 'C'
and a.stk_comp_code ='$compcode' 
group by stk_finyear,stk_var_code,var_name,var_grpcode,stk_sr_no,stk_wt,c.var_groupcode,stk_sono order by stk_sr_no";



}


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }






?>
