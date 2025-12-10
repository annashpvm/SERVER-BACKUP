<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadPackSlipNo":
		getPackSlipNo();
		break;
		case "loadPackSlipNoedit":
                getPackSlipNoedit();
                break;
		case "EditPackSlipNo":
                getEditPackSlipNo();
                break;
		case "loaddano":
		getDANo();
		break;
		case "loadcustomer":
		getcustomer();
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
		case "loadwhslipno":
		getwhslipno();
		break;
		case "findwhslipno":
		findwarehouseslipno();
		break;

		case "loadwhslipdetail":
		getwhslipdetail();
		break;

		case "loadsocno":
		getsocno();
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
  



 function findwarehouseslipno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$slipno = $_POST['slipno'];	
	
        $sql = "select wpckh_no from trnware_packslip_header where  wpckh_comp_code = $compcode and wpckh_fincode = $finid and wpckh_slipno = $slipno");

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
         	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

  
 function getwhslipno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];	
	
        $sql = "select wpckh_no from trnware_packslip_header a, trnware_packslip_trailer b , trnsal_desp_advice c where  c.da_cust = $custcode   and c.da_no = a.wpckh_dano  and c.da_ackno =  a.wpckh_socno  and a.wpckh_no = b.wpckt_no and a.wpckh_comp_code = b.wpckt_comp_code and a.wpckh_fincode   = b.wpckt_fincode and a.wpckh_comp_code = c.da_comp_code  and a.wpckh_fincode = c.da_fincode and a.wpckh_fincode = $finid    and a.wpckh_comp_code = $compcode   and wpckt_selected = 'N' group by wpckh_no order by wpckh_no");
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
         	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getwhslipdetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];	
        $whslipno = $_POST['whslipno'];		
        $sql = "select * from trnware_packslip_header a, trnware_packslip_trailer b , trnsal_desp_advice c , massal_variety d ,trnsal_order_header e , massal_customer f  where e.ordh_agent = f.cust_code and b.wpckt_var = var_code and b.wpckt_var = da_var and   c.da_no = a.wpckh_dano  and c.da_ackno =  a.wpckh_socno   and c.da_ackno =  e.ordh_ackno and a.wpckh_no = b.wpckt_no and a.wpckh_fincode = b.wpckt_fincode  and a.wpckh_comp_code = b.wpckt_comp_code  and a.wpckh_comp_code = e.ordh_comp_code and a.wpckh_fincode = e.ordh_fincode and a.wpckh_comp_code = c.da_comp_code  and a.wpckh_fincode = c.da_fincode  and  a.wpckh_fincode = $finid and a.wpckh_comp_code = $compcode and wpckh_slipstat = 'N' and wpckt_selected = 'N' and wpckh_no = $whslipno order by var_name,wpckt_sr_no");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPackSlipNo()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(pckh_no),0)+1 as packno from trnsal_packslip_header where pckh_fincode= $finid  and pckh_comp_code= $compcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getPackSlipNoedit()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select *  from trnsal_packslip_header where pckh_fincode= $finid  and pckh_comp_code= $compcode and pckh_totwt > 0 order by pckh_no desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEditPackSlipNo()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$slipno  = $_POST['slipno'];
/*
        
        $r = mysql_query("select a.*,b.*,e.*,var_name,c.cust_code,c.cust_ref,c.cust_agent,c.cust_taxtag, f.cust_ref as agentname from trnware_packslip_header a, 
trnware_packslip_trailer b, massal_customer c, massal_invtype d, massal_variety e,vew_sal_agent f , trnsal_order_header g where  g.ordh_party = c.cust_code and g.ordh_agent = f.cust_code and a.wpckh_fincode = ordh_fincode and a.wpckh_comp_code = ordh_comp_code and wpckh_socno = ordh_ackno and a.wpckh_no = $slipno and 
a.wpckh_no = b.wpckt_no and a.wpckh_fincode = b.wpckt_fincode and  g.ordh_party = c.cust_code and g.ordh_type = d.type_code  and b.wpckt_var = e.var_code and a.wpckh_fincode =   $finid  and a.wpckh_comp_code = b.wpckt_comp_code and a.wpckh_comp_code = $compcode order by var_code,wpckt_sr_no");
*/


        $r = mysql_query("select a.*,b.*,e.*,var_name,c.cust_code,c.cust_ref,c.cust_agent,c.cust_taxtag, f.cust_ref as agentname from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c, massal_invtype d, massal_variety e,vew_sal_agent f where  c.cust_agent = f.cust_code and a.pckh_no = $slipno and a.pckh_no = b.pckt_no and a.pckh_fincode = b.pckt_fincode and  a.pckh_party = c.cust_code and a.pckh_invtype = d.type_code  and b.pckt_var = e.var_code and a.pckh_fincode =  $finid and a.pckh_comp_code = b.pckt_comp_code and a.pckh_comp_code = $compcode  order by var_code,pckt_sr_no");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDANo()
    {
        mysqli_set_charset($conn, "utf8");
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];

//        $sql = "select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and //da_comp_code=$compcode and da_invtype=$invtype group by da_no");


        $sql = "select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and da_comp_code=$compcode group by da_no");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  
function getcusttype()
    {
        mysqli_set_charset($conn, "utf8");
	$custcode = $_POST['custcode'];
        $sql = "select cust_type,cust_repr from massal_customer where cust_code = $custcode");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcustomer()
    {
        mysqli_set_charset($conn, "utf8");
	$despdt = $_POST['despdt'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];
        $entrychk = $_POST['entrychk'];
        if($entrychk == "Add")
        {
       // $sql = "select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and 
//b.da_despdt <= '$despdt' and (da_desqty - da_slipqty) > 0 and b.da_invtype = $invtype and b.da_close <> 'Y' and b.da_fincode = $fincode
//and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");
        $sql = "select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and 
b.da_despdt <= '$despdt' and b.da_invtype = $invtype and b.da_close <> 'Y' and b.da_fincode = $fincode
and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");
        }
        else 
        {
        $sql = "select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and   b.da_invtype = $invtype and  b.da_fincode = $fincode and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");

//        $sql = "select cust_code,cust_ref from massal_customer group by cust_code,cust_ref order by cust_ref");
        }


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getitemstockqty()
    {
        mysqli_set_charset($conn, "utf8");
	$slipdt = $_POST['slipdate'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];

//$sql = "select sum(stk_wt)/1000 as stk,stk_units from  trnsal_finish_stock  where stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and stk_rettag = 'T' and stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");

$sql = "select sum(stk_wt)/1000 as stk,stk_units from  trnsal_finish_stock  where stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and  stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getsocno()
    {
        mysqli_set_charset($conn, "utf8");
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
        $sql = "select da_ackno,da_date,cust_type,cust_ref from trnsal_desp_advice a, massal_customer b, massal_variety c where a.da_var = c.var_code And a.da_cust = b.cust_code and a.da_cust = $customer and a.da_no = $dano and a.da_fincode = $fincode and 
a.da_close <> 'Y' and (da_desqty - da_slipqty) > 0 and a.da_comp_code = $compcode group by da_ackno,da_date,cust_type,cust_ref");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsize()
    {
        mysqli_set_charset($conn, "utf8");
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
	$socno = $_POST['socno'];


        $sql = "select var_code,var_name,da_date,ordh_ackno,ordh_ackdate,ordh_ref,ordh_refdt,cust_ref,ordh_type,cust_agent,ordh_rep,cust_type,da_urate 
from trnsal_order_header a, trnsal_desp_advice b,massal_customer c, massal_variety d where b.da_no = $dano
and b.da_cust = c.cust_code and b.da_cust = $customer and a.ordh_ackno = b.da_ackno and a.ordh_fincode <= b.da_fincode and a.ordh_type = c.cust_type and b.da_ackno = $socno and a.ordh_comp_code = b.da_comp_code and b.da_var = d.var_code and a.ordh_fincode = $fincode and a.ordh_comp_code = $compcode group by var_code,var_name,da_date,ordh_ackno,ordh_ackdate,ordh_ref,ordh_refdt,cust_ref,ordh_type,cust_agent,ordh_rep,cust_type,da_urate");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getqtydetails()
    {
        mysqli_set_charset($conn, "utf8");
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
	$socno = $_POST['socno'];
	$sizecode = $_POST['sizecode'];
        $sql = "select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano
and da_ackno = $socno and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getinvtype()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select * from massal_invtype order by type_code");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getTaxCode()
    {
        mysqli_set_charset($conn, "utf8");
	$taxcode = $_POST['taxcode'];
        $sql = "select tax_cgst,tax_sgst,tax_igst from massal_tax where tax_code = '$taxcode'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getloadfromtobox()
    {
        mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];
	$slipdate = $_POST['slipdate'];

/*
/      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt  from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_code and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'  and a.stk_rettag = 'T' and a.stk_comp_code = '$compcode' 
 group by stk_finyear,stk_sr_no,stk_wt  order by stk_finyear,stk_sr_no,stk_wt");
*/
      $sql = "select stk_finyear,stk_sr_no as rollno,stk_wt  from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_code and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' 
 group by stk_finyear,stk_sr_no,stk_wt  order by stk_finyear,stk_sr_no,stk_wt");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getloadgriddetails()
    {
        mysqli_set_charset($conn, "utf8");
	$varitycode = $_POST['varitycode'];
	$stnofrom = $_POST['stnofrom'];
	$stnoto = $_POST['stnoto'];
	$compcode = $_POST['compcode'];
	$unit = $_POST['unit'];


if($stnofrom==0)
{
$r = mysql_query("select stk_finyear,stk_var_code,var_grpcode,var_name,var_unit,stk_sr_no,stk_wt,c.var_code as var_code ,stk_units, case when stk_units = 1  then 'Reels' else 'Bundles' end as unittype  from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_code = b.var_grpcode  and stk_var_code = $varitycode 
and a.stk_sr_no >= '$stnoto' 
and a.stk_sr_no <= '$stnoto'
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
and a.stk_units =$unit 
and a.stk_comp_code =$compcode 
group by stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,var_unit,c.var_code,stk_units order by stk_sr_no");
}
else
{

$sql = "select stk_finyear,stk_var_code,var_grpcode,var_name,var_unit,stk_sr_no,stk_wt,c.var_code as var_code ,stk_units , case when stk_units = 1  then 'Reels' else 'Bundles' end as unittype  from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_code = b.var_grpcode  and stk_var_code ='$varitycode'
and a.stk_sr_no >= '$stnofrom' 
and a.stk_sr_no <= '$stnoto'
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
and a.stk_units ='$unit' 
and a.stk_comp_code ='$compcode' 
group by stk_finyear,stk_var_code,var_name,var_grpcode,stk_sr_no,stk_wt,var_unit,c.var_code,stk_units order by stk_sr_no");
}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }






?>
