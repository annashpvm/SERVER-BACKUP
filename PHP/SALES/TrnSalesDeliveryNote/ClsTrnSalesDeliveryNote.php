<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadDNNo":
		getDNNo();
		break;
		case "loadDNNoedit":
                getDNNoedit();
                break;
		case "EditDNNo":
                getEditDNNo();
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
    

 function getDNNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(dn_no),0)+1 as dnno from trn_delivery_note where dn_fincode= $finid  and dn_comp_code= $compcode");

        $r=mysql_query("select con_value as dnno from control_details where con_fincode= $finid  and con_compcode= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getDNNoedit()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select dn_no  from trn_delivery_note where dn_fincode= $finid  and dn_comp_code= $compcode  group by dn_no  order by dn_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getEditDNNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$dnno  = $_POST['dnno'];

        $r = mysql_query("select * from trn_delivery_note a,  massal_customer c, massal_variety e where  a.dn_no =$dnno and  a.dn_custcode = c.cust_code and a.dn_size = e.var_code and a.dn_fincode =  $finid  and a.dn_comp_code = $compcode order by var_name,dn_sr_no");

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
        $r=mysql_query("select cust_code,cust_ref from massal_customer a,trnsal_desp_advice b where a.cust_code = b.da_cust and     b.da_fincode = $fincode and b.da_comp_code = $compcode group by cust_code,cust_ref order by cust_ref");

        $r=mysql_query("select cust_code,cust_ref from massal_customer a,trnsal_order_header b where a.cust_code = b.ordh_party and b.ordh_fincode <= $fincode  and length(ordh_sono) != 6 and ordh_comp_code = $compcode  group by cust_code,cust_ref order by cust_ref");


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


//$r=mysql_query("select sum(stk_wt)/1000 as stk,stk_units from  trnsal_finish_stock  where stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and stk_rettag = 'T' and stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");

$r=mysql_query("select sum(stk_wt)/1000 as stk from  trnsal_finish_stock  where stk_sono = $sono and  stk_var_code = $sizecode and  stk_destag <> 'T'  and stk_deltag <> 'T' and  stk_comp_code = $compcode  and stk_ent_date <= '$slipdt'  and stk_finyear <= $fincode");


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
	$custcode = $_POST['custcode'];
        $r=mysql_query("select da_ackno,da_date,cust_ref from trnsal_desp_advice a, massal_customer b, massal_variety c where a.da_var = c.var_code And a.da_cust = b.cust_code and a.da_cust = $customer and a.da_no = $dano and a.da_fincode = $fincode and 
a.da_close <> 'Y' and (da_desqty - da_slipqty) > 0 and a.da_comp_code = $compcode group by da_ackno,da_date,cust_ref");

        $r=mysql_query("select ordh_sono,ordh_sodate from massal_customer a,trnsal_order_header b where a.cust_code = b.ordh_party and 
	b.ordh_fincode <= $fincode  and length(ordh_sono) != 6 and ordh_comp_code = $compcode and ordh_party =$custcode order by ordh_sono");


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
	$sono = $_POST['sono'];


        $r=mysql_query("select var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate 
from trnsal_order_header a, trnsal_desp_advice b,massal_customer c, massal_variety d where b.da_no = $dano
and b.da_cust = c.cust_code and b.da_cust = $customer and a.ordh_sono = b.da_ackno and a.ordh_fincode <= b.da_fincode and b.da_ackno = $sono and a.ordh_comp_code = b.da_comp_code and b.da_var = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode group by var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate");

        $r=mysql_query("select var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate 
from trnsal_order_header a, trnsal_order_trailer b,massal_customer c, massal_variety d where  a.ordh_party = c.cust_code and a.ordh_party = $customer and a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode and b.ordt_sono = $sono and a.ordh_comp_code = b.ordt_comp_code and b.ordt_var_code = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode group by  var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate");

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

//        $r=mysql_query("select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano and da_ackno = $sono and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");

  //      $r=mysql_query("select da_urate,sum(da_desqty-da_slipqty) as wt from trnsal_desp_advice where da_no = $dano and da_ackno = $sono and da_fincode = $fincode and da_var = $sizecode and da_cust = $custcode and da_comp_code = $compcode group by da_urate");


        $r=mysql_query("select ordt_rate as  da_urate,0 as wt from trnsal_order_trailer where ordt_sono = $sono
and ordt_fincode <= $fincode and ordt_var_code = $sizecode and  ordt_comp_code = $compcode group by ordt_rate");

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
//	$slipdate = $_POST['slipdate'];
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
 and a.stk_destag <> 'D'  group by stk_finyear,stk_sr_no,stk_wt ,stk_sono order by stk_finyear,stk_sr_no,stk_wt");

/*
     $r=mysql_query("select stk_finyear,stk_sr_no as rollno,stk_wt ,stk_sono,ordh_sodate   from  trnsal_finish_stock a,massal_variety b, 
 masprd_variety c , trnsal_order_trailer d , trnsal_order_header e  where 
  ordt_comp_code  = stk_comp_code  and ordt_sono = stk_sono  and  ordt_comp_code  = ordh_comp_code and  ordt_fincode  = ordh_fincode 
 and ordt_sono = ordh_sono and stk_var_code = '$sizecode' and a.stk_var_code = b.var_code and  b.var_grpcode = c.var_groupcode and a.stk_destag <> 'T' 
 and a.stk_deltag <> 'T'   and a.stk_comp_code = '$compcode' and stk_sono = $sono 
 group by stk_finyear,stk_sr_no,stk_wt ,stk_sono,ordh_sodate order by stk_finyear,stk_sr_no,stk_wt");
*/

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
and a.stk_destag <> 'T' and a.stk_deltag <> 'T'  and a.stk_destag <> 'D'
and a.stk_comp_code =$compcode 
group by stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode,stk_sono order by stk_sr_no");


echo $a;
echo "<br>";

}
else
{

$r=mysql_query("select stk_finyear,stk_var_code,var_grpcode,var_name,stk_sr_no,stk_wt,c.var_groupcode as var_code,stk_sono from trnsal_finish_stock a, massal_variety b ,masprd_variety c
where a.stk_var_code = b.var_code And c.var_groupcode = b.var_grpcode  and stk_var_code ='$varitycode'
and a.stk_sr_no >= '$stnofrom' 
and a.stk_sr_no <= '$stnoto'
and a.stk_sono = $sono 
and a.stk_destag <> 'T' and a.stk_deltag <> 'T' and a.stk_destag <> 'D'
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




?>
