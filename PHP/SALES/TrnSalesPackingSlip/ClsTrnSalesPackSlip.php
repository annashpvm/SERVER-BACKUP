<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

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

		case "loadHSNCODE":
		getHSNCODE();
		break;


		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    

 function getPackSlipNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(pckh_no),0)+1 as packno from trnsal_packslip_header where pckh_fincode= $finid  and pckh_comp_code= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getPackSlipNoedit()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select *  from trnsal_packslip_header where pckh_fincode= $finid  and pckh_comp_code= $compcode and pckh_totwt > 0 order by pckh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getEditPackSlipNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$slipno  = $_POST['slipno'];

        $r = mysql_query("select a.*,b.*,e.*,var_name,var_tariffno,c.cust_code,c.cust_ref,c.cust_taxtag from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c, massal_variety e where  a.pckh_no =$slipno and a.pckh_no = b.pckt_no and a.pckh_fincode = b.pckt_fincode and  a.pckh_party = c.cust_code and b.pckt_size = e.var_code and a.pckh_fincode =  $finid  and a.pckh_comp_code = b.pckt_comp_code and a.pckh_comp_code = $compcode order by var_code,pckt_sr_no
");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDANo()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];

//        $r=mysql_query("select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and //da_comp_code=$compcode and da_invtype=$invtype group by da_no");


        $r=mysql_query("select da_no from trnsal_desp_advice where da_cust=$custcode and da_fincode=$fincode and da_desqty-da_slipqty>0 and da_close<>'Y' and da_comp_code=$compcode group by da_no order by da_no desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
  
function getcusttype()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];
        $r=mysql_query("select cust_type,cust_repr from massal_customer where cust_code = $custcode");
        $r=mysql_query("select cust_repr from massal_customer where cust_code = $custcode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcustomer()
    {
        mysql_query("SET NAMES utf8");
	$despdt = $_POST['despdt'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];
        $entrychk = $_POST['entrychk'];
        if($entrychk == "Add")
        {
        $r=mysql_query("select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and 
b.da_despdt <= '$despdt' and (da_desqty - da_slipqty) > 0 and  b.da_close <> 'Y' and b.da_fincode = $fincode
and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");
        }
        else 
        {
        $r=mysql_query("select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and     b.da_fincode = $fincode and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");

//        $r=mysql_query("select cust_code,cust_ref from massal_customer group by cust_code,cust_ref order by cust_ref");
        }


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getitemstockqty()
    {
        mysql_query("SET NAMES utf8");
	$slipdt = $_POST['slipdate'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];
	$sono = $_POST['sono'];


$r=mysql_query("select var_tariffno, sum(stk_wt)/1000 as stk from  trnsal_finish_stock ,massal_variety  where var_code = stk_var_code and  stk_sono = $sono and  stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and  stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getSOno()
    {
        mysql_query("SET NAMES utf8");
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
        $r=mysql_query("select da_ackno,da_date,cust_ref from trnsal_desp_advice a, massal_customer b, massal_variety c where a.da_var = c.var_code And a.da_cust = b.cust_code and a.da_cust = $customer and a.da_no = $dano and a.da_fincode = $fincode and 
a.da_close <> 'Y' and (da_desqty - da_slipqty) > 0 and a.da_comp_code = $compcode group by da_ackno,da_date,cust_ref");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getsize()
    {
        mysql_query("SET NAMES utf8");
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
	$sono = $_POST['sono'];


        $r=mysql_query("select var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate,var_tariffno
from trnsal_order_header a, trnsal_desp_advice b,massal_customer c, massal_variety d where b.da_no = $dano
and b.da_cust = c.cust_code and b.da_cust = $customer and a.ordh_sono = b.da_ackno and a.ordh_fincode <= b.da_fincode and b.da_ackno = $sono and a.ordh_comp_code = b.da_comp_code and b.da_var = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode and ordh_tax = cust_taxtag group by var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getqtydetails()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dano = $_POST['dano'];
	$sono = $_POST['sono'];
	$sizecode = $_POST['sizecode'];
        $r=mysql_query("select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano
and da_ackno = $sono and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getinvtype()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from massal_invtype order by type_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTaxCode()
    {
        mysql_query("SET NAMES utf8");
	$taxcode = $_POST['taxcode'];
        $r=mysql_query("select tax_cgst,tax_sgst,tax_igst from massal_tax where tax_code = '$taxcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getloadfromtobox()
    {
        mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sizecode = $_POST['sizecode'];
	$slipdate = $_POST['slipdate'];
	$sono    = $_POST['sono'];

/*
/      $r=mysql_query("select stk_finyear,stk_sr_no as rollno,stk_wt  from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_code and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'  and a.stk_rettag = 'T' and a.stk_comp_code = '$compcode' 
 group by stk_finyear,stk_sr_no,stk_wt  order by stk_finyear,stk_sr_no,stk_wt");
*/
      $r=mysql_query("select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono   from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' and stk_sono = $sono 
 group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt");


      $r=mysql_query("select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono   from  trnsal_finish_stock a,massal_variety b,  masprd_variety c where stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag = ''  and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' and stk_sono = $sono 
 group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getloadgriddetails()
    {
        mysql_query("SET NAMES utf8");
	$varitycode = $_POST['varitycode'];
	$stnofrom = $_POST['stnofrom'];
	$stnoto = $_POST['stnoto'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];

	$unit = 1 ;


if($stnofrom==0)
{
$r = mysql_query("select stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode as var_code,stk_sono from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_groupcode = b.var_grpcode  and stk_var_code = $varitycode 
and a.stk_sr_no >= '$stnoto' 
and a.stk_sr_no <= '$stnoto'
and a.stk_sono = $sono 
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
and a.stk_comp_code =$compcode 
group by stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode,stk_sono order by stk_sr_no");
}
else
{

$r=mysql_query("select stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode as var_code,stk_sono from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_groupcode = b.var_grpcode  and stk_var_code ='$varitycode'
and a.stk_sr_no >= '$stnofrom' 
and a.stk_sr_no <= '$stnoto'
and a.stk_sono = $sono 
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
and a.stk_comp_code ='$compcode' 
group by stk_finyear,stk_var_code,var_name,var_grpcode,stk_sr_no,stk_wt,c.var_groupcode,stk_sono order by stk_sr_no");
}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




function getHSNCODE()
    {
        mysql_query("SET NAMES utf8");
	$sizecode = $_POST['sizecode'];


        $r=mysql_query("select var_code,var_name,var_tariffno from massal_variety  where var_code = $sizecode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
