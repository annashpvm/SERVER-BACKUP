<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "findEntryNo":
		getEntryNo();
		break;
		case "loadEntryNoList":
		getEntryNoList();
		break;
		case "loadEntryNoDetails":
		getEntryNoDetails();
		break;
		case "loadSOcustomer":
		getSOcustomer();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadSOno":
		getSOno();
		break;
		case "loadSOnoTO":
		getSOnoTO();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadfromtobox":
		getloadfromtobox();
		break;
		case "loadgriddetails":
		getloadgriddetails();
		break;
		case "itemcheck_in_so":
		getitemcheck_in_so();
		break;

		case "loadNewSize":
		getNewSize();
		break;
		case "findEntryNo_BF_GSM":
	        getEntryNo_BF_GSM();
		break;

		case "loadEntryNoList_BF_GSM":
		getEntryNoList_BF_GSM();
		break;

		case "loadEntryNoDetails_BF_GSM":
		getEntryNoDetails_BF_GSM();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 function getEntryNo()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(tr_entno),0)+1 as entno from trnsal_stock_transfer where tr_finyear= $finid and tr_compcode= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getEntryNoList()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select tr_entno from trnsal_stock_transfer where tr_finyear= $finid and tr_compcode= $compcode group by tr_entno order by tr_entno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEntryNoDetails()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$entryno  = $_POST['entryno'];

        $sql = "select  tr_entno,tr_date,var_name as varname,var_code as sizecode,tr_srno as stksrno,tr_wt as stkwt,fc.cust_ref as OldPartyName,fc.cust_code as OldPartyCode, tr_so_from as oldsono,tc.cust_ref as NewPartyName,tc.cust_code as NewPartyCode, tr_so_to as newsono from trnsal_stock_transfer a , massal_customer fc, massal_customer tc, massal_variety where tr_party_from = fc.cust_code and tr_party_to =  tc.cust_code and tr_sizecode = var_code  and tr_finyear= $finid  and tr_compcode= $compcode and tr_entno = $entryno";
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
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];

 $sql = "select  cust_code,cust_ref from trnsal_order_header a, trnsal_order_trailer b ,massal_customer c where ordh_party = cust_code and ordh_sono = ordt_sono and  ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordt_qty > ordt_adv_qty and ordt_clo_stat = '' and ordh_comp_code = $compcode and ordh_fincode <= $fincode  group by cust_code,cust_ref order by cust_ref";

 $sql = "select cust_code,cust_ref  from trnsal_order_header a, trnsal_finish_stock b ,massal_customer c  where ordh_party = cust_code and ordh_sono = stk_sono and stk_destag = '' and  ordh_comp_code = stk_comp_code  and  ordh_comp_code = $compcode and ordh_fincode <= $fincode    group by cust_code,cust_ref order by cust_ref";


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

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];

 $sql = "select cust_code,cust_ref  from trnsal_order_header , massal_customer b  where ordh_party = cust_code and ordh_comp_code = $compcode and ordh_fincode <= $fincode    group by cust_code,cust_ref order by cust_ref";



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
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$userid   = $_POST['userid'];


 $sql = "select ordh_sono from trnsal_order_header a, trnsal_order_trailer b  where ordh_party = $customer and ordh_sono = ordt_sono and  ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordt_qty > ordt_adv_qty and ordt_clo_stat = '' and ordh_comp_code = $compcode and ordh_fincode <= $fincode  group by  ordh_sono order by ordh_sono";

 $sql = "select ordh_sono from trnsal_order_header a, trnsal_finish_stock b where ordh_sono = stk_sono and stk_destag = '' and ordh_party = $customer and   ordh_comp_code = stk_comp_code  and  ordh_comp_code = $compcode and ordh_fincode <= $fincode   group by  ordh_sono order by ordh_sono";

        if ($userid == 43)
	  $sql = "select ordh_sono from trnsal_order_header a, trnsal_finish_stock b where ordh_sono = stk_sono and stk_destag = '' and ordh_party = $customer and   ordh_comp_code = stk_comp_code  and  ordh_comp_code = $compcode and ordh_fincode <= $fincode   group by  ordh_sono order by ordh_sono";
        else
	  $sql = "select ordh_sono from trnsal_order_header a, trnsal_finish_stock b where ordh_sono = stk_sono and stk_destag = '' and ordh_party = $customer and   ordh_comp_code = stk_comp_code  and  ordh_comp_code = $compcode and ordh_fincode <= $fincode and ordh_type = 'F'  group by  ordh_sono order by ordh_sono";
     

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSOnoTO()
    {
       global $conn;  
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sonolength = $_POST['sonolength'];
	$userid = $_POST['userid'];

 $sql = "select ordh_sono from trnsal_order_header where ordh_party = $customer and ordh_comp_code = $compcode and ordh_fincode <= $fincode  and (length(ordh_sono) >= $sonolength or ordh_sono = 1001) group by  ordh_sono order by ordh_sono";




        if ($userid == 43)
	 $sql = "select ordh_sono from trnsal_order_header where ordh_party = $customer and ordh_comp_code = $compcode and ordh_fincode <= $fincode  group by  ordh_sono order by ordh_sono";
        else 
	 $sql = "select ordh_sono from trnsal_order_header where ordh_party = $customer and ordh_comp_code = $compcode and ordh_fincode <= $fincode and ordh_type = 'F'  group by  ordh_sono order by ordh_sono";


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
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];


        $sql = "select var_name,var_code from trnsal_finish_stock,massal_variety where stk_var_code = var_code and stk_comp_code = $compcode and stk_sono = '$sono' and stk_destag = '' group by var_name,var_code order by var_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getNewSize()
    {
       global $conn;  
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];


        $sql = "select * from massal_variety, masprd_variety where var_grpcode = var_groupcode and  
var_gsm in (select var_gsm from massal_variety, masprd_variety where var_grpcode = var_groupcode and   var_name = '$sizecode') and var_size2 in (select var_size2 from massal_variety, masprd_variety where var_grpcode = var_groupcode and   var_name = '$sizecode') order by var_name
";
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
	$sono    = $_POST['sono'];

/*
/      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt  from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_code and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'  and a.stk_rettag = 'T' and a.stk_comp_code = '$compcode' 
 group by stk_finyear,stk_sr_no,stk_wt  order by stk_finyear,stk_sr_no,stk_wt");
*/
      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono   from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' and stk_sono = $sono 
 group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt";

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
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
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
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
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

function getitemcheck_in_so()
    {
       global $conn;  
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sono  =  $_POST['sono'];
	$sizecode = $_POST['sizecode'];


        $sql = "select count(*) as nos from trnsal_order_trailer where ordt_comp_code = $compcode and ordt_sono = $sono and ordt_var_code = $sizecode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEntryNo_BF_GSM()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $sql = "select ifnull(max(tr_entno),0)+1 as entno from trnsal_stock_BF_GSM_transfer where tr_finyear= $finid and tr_compcode= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEntryNoList_BF_GSM()
    {
       global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $sql = "select tr_entno from trnsal_stock_BF_GSM_transfer where tr_finyear= $finid and tr_compcode= $compcode group by tr_entno order by tr_entno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEntryNoDetails_BF_GSM()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$entryno  = $_POST['entryno'];

    $sql = "select  a.* , o.var_name as oldsizename, n.var_name as newsizename from trnsal_stock_BF_GSM_transfer a , massal_variety o, massal_variety n  where tr_size_from = o.var_code and tr_size_to = n.var_code  and tr_finyear= $finid and tr_compcode= $compcode and tr_entno = $entryno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
