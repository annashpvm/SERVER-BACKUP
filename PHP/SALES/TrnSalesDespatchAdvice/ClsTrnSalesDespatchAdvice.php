<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadvariety';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadDespAdvNo":
		getDespAdvNo();
		break;
		case "loadDespAdvNoList":
		getDespAdvNoList();
		break;
		case "loadDespAdvNoDetails":
		getDespAdvNoDetails();
		break;
		case "loadSONo":
		getSONo();
		break;
		case "loadsizedetails":
                getsizedetails();
		break;
		case "loadstkdet":
		getstockdet();
		break;
		case "loadqtydet":
		getqtydet();
		break;
		case "loadAllCustomerDetails":
		getcustomer();
		break;
		case "loadinvtype":
		getinvtype();
		break;


		case "loadSearchPartylist":
		getSearchPartylist();
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



 function getinvtype()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select type_name ,type_code  from massal_invtype");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    

 function getDespAdvNo()
    {
        mysql_query("SET NAMES utf8");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(da_no),0)+1 as advno from trnsal_desp_advice where da_fincode= '$finid'  and da_comp_code= '$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getDespAdvNoList()
    {
        mysql_query("SET NAMES utf8");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select da_no from trnsal_desp_advice where da_fincode= '$finid'  and da_comp_code= '$compcode' group by da_no order by da_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getDespAdvNoDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $dano     = $_POST['dano'];
/* Modified on 16/06/2021
 $r=mysql_query("select  cust_ref,da_date,da_ackno,da_ackdt,ordt_qty,ordt_qty,ordt_adv_qty,ordt_adv_qty,var_name,da_desqty,da_slipqty,da_despdt,da_urate,da_rem,
cust_code,var_code,da_desqty,da_slipqty,da_close ,var_unit from trnsal_desp_advice a, trnsal_order_trailer b, massal_customer c, massal_variety d, trnsal_order_header e where da_no = $dano and a.da_ackno = b.ordt_sono  and a.da_fincode = b.ordt_fincode  and a.da_var = b.ordt_var_code  and a.da_cust = c.cust_code and a.da_var = d.var_code and a.da_fincode = $finid  and b.ordt_sono = e.ordh_sono and a.da_close <> 'Y' and a.da_desqty > 0 and a.da_comp_code = b.ordt_comp_code and a.da_comp_code = $compcode and e.ordh_comp_code = a.da_comp_code group by cust_ref,da_date,da_ackno,da_ackdt,ordt_qty,ordt_qty,ordt_adv_qty,
ordt_adv_qty,var_name,da_desqty,da_slipqty,da_despdt,da_urate,da_rem,cust_code,var_code,da_desqty,da_slipqty,da_close,var_unit");
*/
 $r=mysql_query("select  cust_ref,da_date,da_ackno,da_ackdt,ordt_qty,ordt_qty,var_name,da_desqty,da_slipqty,da_despdt,da_urate,da_rem,
cust_code,var_code,da_desqty,da_slipqty,da_close ,var_unit from trnsal_desp_advice a, trnsal_order_trailer b, massal_customer c, massal_variety d, trnsal_order_header e where da_no = $dano and a.da_ackno = b.ordt_sono  and a.da_fincode >= b.ordt_fincode  and a.da_var = b.ordt_var_code  and a.da_cust = c.cust_code and a.da_var = d.var_code and a.da_fincode = $finid  and b.ordt_sono = e.ordh_sono and a.da_close <> 'Y' and  a.da_comp_code = b.ordt_comp_code and a.da_comp_code = $compcode and e.ordh_comp_code = a.da_comp_code group by cust_ref,da_date,da_ackno,da_ackdt,ordt_qty,ordt_qty,
var_name,da_desqty,da_slipqty,da_despdt,da_urate,da_rem,cust_code,var_code,da_desqty,da_slipqty,da_close,var_unit");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

/*function getpacklistno()
   {
	$finid = $_POST['finid'];
    $query = "select IFNULL(max(packlistno),0)+1 as packlistno from hometexmdupspacklistheader where packfinid =$finid";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
   }*/


function getSONo()
{
 mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['party'];
        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_order_header a, trnsal_order_trailer b 
where a.ordh_party = '$party' and a.ordh_sono = b.ordt_sono  and a.ordh_fincode = b.ordt_fincode  and
a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = '$compcode'  and ordh_fincode >= 24 and b.ordt_clo_stat <> 'T' and a.ordh_can_stat <> 'T' and length(ordh_sono) = 6  group by ordh_sono,ordh_sodate order by ordh_sono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getsizedetails()
{
	mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$socno = $_POST['socno'];
	$party = $_POST['party'];
        $finid = $_POST['finid'];
        $r=mysql_query("select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$socno' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code  and (b.ordt_qty - b.ordt_inv_wt) > 0 group by var_code,var_name,ordh_sodate,var_size1,var_size2 order by var_name");
        $r=mysql_query("select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2, '- ', (case when var_inchcm = 'I' then 'Inch' else 'CM' end),' - ',(case when var_shade = 'NS' then 'NAT' when var_shade = 'GY' then 'GYT' when var_shade = 'DP' then 'DP' when var_shade = 'SY' then 'SHYS' when var_shade = 'GB' then 'GB'  when var_shade = 'VV' then 'SHVV+'   when var_shade = 'BB' then 'BB'   else 'OTH' end)) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$socno' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code  and  case when b.ordt_fin_wt > b.ordt_qty then (b.ordt_fin_wt - b.ordt_inv_wt) > 0  else  (b.ordt_qty - b.ordt_inv_wt) > 0  end  group by var_code,var_name,ordh_sodate,var_size1,var_size2 order by var_name");
$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getqtydet()
{
	mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['socno'];
	$sizecode = $_POST['sizecode'];
   //     $r=mysql_query("select  ordt_var_code,ordt_qty,ordt_rate from trnsal_order_trailer a where ordt_sono = $sono and a.ordt_comp_code = $compcode and a.ordt_fincode <= $finid and a.ordt_var_code = $sizecode");

        $r=mysql_query("select  * from trnsal_order_trailer a , massal_variety b , masprd_variety p  where var_grpcode = var_groupcode and  ordt_var_code = var_code and  ordt_sono =  $sono  and a.ordt_comp_code = $compcode  and a.ordt_fincode <= $finid and a.ordt_var_code = $sizecode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getstockdet()
{
	mysql_query("SET NAMES utf8");
	$variety = $_POST['variety'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select sum(stk_wt)/1000 as stkwt from trnsal_finish_stock   
where stk_var_code = $variety and stk_destag <> 'T' and stk_deltag <> 'T' and stk_comp_code = '$compcode' ");
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
	$variety = $_POST['variety'];
        $compcode = $_POST['compcode'];
//       $r = mysql_query("select cust_code,cust_ref from massal_customer");
       $r = mysql_query("select cust_code,cust_ref from massal_customer a, trnsal_order_header b, trnsal_order_trailer c where a.cust_code = b.ordh_party and b.ordh_sono = c.ordt_sono  and b.ordh_fincode = c.ordt_fincode and b.ordh_comp_code = c.ordt_comp_code  and c.ordt_clo_stat <> 'Y'   and b.ordh_comp_code = $compcode  group by cust_code,cust_ref order by cust_ref ");
	
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

        $party     = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        $party = trim(str_replace("-", "", $party)); 


        $qry = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where 
cust_type = 'C' and cust_lock = 'N' and  left(cust_ref,2) != 'zz' and  replace(replace(cust_ref,' ','')  ,'.','')  like '%$party%' order by cust_ref";

        $qry = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where 
cust_type != 'Z' and cust_lock = 'N' and  left(cust_ref,2) != 'zz' and replace(replace(replace(cust_ref,' ','')  ,'.',''),'-','')  like '%$party%' order by cust_ref";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
