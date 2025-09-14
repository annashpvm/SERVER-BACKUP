<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='verietyname';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadSizeDetails":
		getSizeDetails();
		break;

		case "loadOrderNo":
		getOrderNo();
		break;

		case "loadinsdetail":
		getinsdetail();
		break;

		case "findTaxCode":
		getTaxCode();
		break;

             	case "loadOrderNoList":
		getOrderNoList();
		break;

		case "verietyname":
		getverietyname();
		break;

		case "ratecode":
		getratecode();
		break;

		case "ApprovedVarietydetails":
		getApprvedvarietydetails();
		break;

		case "ApprovedVarietydetails2":
		getApprvedvarietydetails2();
		break;

		case "findRateDetails":
		getRateDetails();
		break;

		case "griddetails":
		getgriddetails();
		break;

		case "loadordernodetails1":
		getorderdetails1();
		break;

		case "loadorderdetailstrailer":
		getorderdetailstrailer();
		break;

		case "loadShade":
		getShades();
		break;
		case "findShadecode":
		getShadecode();
		break;

		case "loadDeliveryAddress":
		getDeliveryAddress();
		break;


		case "CheckOverdue":
		checkoverdue();
		break;


		case "find90daysdue":
		get90daysdue();
		break;

		case "loadSearchPartylist":
		getSearchPartylist();
		break;

		case "findAreaRateCode":
		getAreaRateCode();
		break;

		case "findAreaRateDetails":
		getAreaRateDetails();
		break;
		case "AreaApprovedVarietydetails":
		getAreaApprvedvarietydetails();
		break;

		case "loadGodownStock":
		getGodownStock();
		break;

		case "loadGodownStockReelNowise":
		getGodownStockReelNowise();
		break;


		case "loadVartyGroup":
		getVartyGroup();
		break;


           	case "loadOrderNoList_for_RateRevision":
		getOrderNoList_for_RateRevision();
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
    

 function getOrderNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $ordtype = $_POST['ordtype'];

        if ( $ordtype == "F")
        $r=mysql_query("select ifnull(max(ordh_sono),0)+1 as ordno from trnsal_order_header where length(ordh_sono) = 6 and ordh_type =  '$ordtype' and ordh_fincode = '$finid' and ordh_comp_code='$compcode'");
        else
        $r=mysql_query("select ifnull(max(ordh_sono),0)+1 as ordno from trnsal_order_header where length(ordh_sono) = 7 and ordh_type =  '$ordtype' and ordh_fincode = '$finid' and ordh_comp_code='$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSizeDetails()
    {
        mysql_query("SET NAMES utf8");
	$varty = $_POST['varty'];
	$sizein = $_POST['sizein'];
	$shade  = $_POST['shade'];
	$rb     = $_POST['rb'];

        if ($rb  == "1") 
        {
		if ($sizein  == "A") 
		{ 
		$r=mysql_query("select var_code,var_size2 as size from massal_variety where var_grpcode = '$varty' and var_shade = '$shade' and var_unit = 1 order by var_size2");
		}
		else
		{ 
		$r=mysql_query("select var_code,var_size2 as size from massal_variety where var_grpcode = '$varty' and var_shade = '$shade' and var_inchcm = '$sizein'  and var_unit = 1 order by var_size2");
		}
        }
        else
        {
		if ($sizein  == "A") 
		{ 
		$r=mysql_query("select var_code, concat(var_size1,'X',var_size2) as size from massal_variety where var_grpcode = '$varty' and var_shade = '$shade'  and var_unit = 2 order by var_size1 , var_size2");
		}
		else
		{ 
		$r=mysql_query("select var_code, concat(var_size1,'X',var_size2)  as size from massal_variety where var_grpcode = '$varty' and var_shade = '$shade' and var_inchcm = '$sizein'  and var_unit = 2  order by var_size1,var_size2");
		}
        }


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getinsdetail()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
        $r=mysql_query("select * from massal_default1 where def_comp_code = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getOrderNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $ordtype = $_POST['ordtype'];
  //      $r=mysql_query("select ordh_sono from trnsal_order_header where ordh_type =  '$ordtype' and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
        $r=mysql_query("select  ordh_sono from (select '1' as ord,ordh_sono from trnsal_order_header where length(ordh_sono) = 6 and  ordh_type =  '$ordtype'  and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  union all select '2' as ord,ordh_sono from trnsal_order_header where length(ordh_sono) <> 6 and  ordh_type =  '$ordtype'  and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  ) aa order by ord,ordh_sono desc");


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
        $r=mysql_query("select tax_code,tax_cgst,tax_sgst,tax_igst from massal_tax where tax_code = '$taxcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getverietyname(){
    //$compcode=$_POST['item_code'];
    $compcode='1';
    $query = "call spsal_sal_salvar('1','1','1')";
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
   }

 function getratecode()
    {
        mysql_query("SET NAMES utf8");

	$custcode = $_POST['custcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

//        $r=mysql_query("select rate_code,rate_item_code from massal_rate where rate_comp_code = '$compcode' and rate_fincode = '$finid'  and rate_appstat = 'T'  and rate_close = 'N' and rate_cust = '$custcode' order by rate_code desc");

    //    $r=mysql_query("select rate_code ,rate_fincode from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '23'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' group by rate_code,rate_fincode order by rate_code desc");


        $r=mysql_query("select rate_code ,rate_fincode  from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode') group by rate_code,rate_fincode order by rate_code desc");


$query11 = "select ifnull(max(rate_code),0) rate_code from massal_rate where rate_comp_code = '$compcode' and rate_fincode = $finid  and rate_approved = 'Y'  and  rate_cust = '$custcode'";

$result11 = mysql_query($query11);
$rec1 = mysql_fetch_array($result11);
$rateseqno=$rec1['rate_code'];

if ($rateseqno == 0)
        $r=mysql_query("select rate_code ,rate_fincode  ,rate_price_terms from massal_rate where rate_comp_code = '$compcode' and rate_fincode < $finid and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode < $finid and rate_approved = 'Y'  and  rate_cust = '$custcode') group by rate_code,rate_fincode,rate_price_terms order by rate_code desc");
else
        $r=mysql_query("select rate_code ,rate_fincode  ,rate_price_terms from massal_rate where rate_comp_code = '$compcode' and rate_fincode = $finid and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ($rateseqno) group by rate_code,rate_fincode,rate_price_terms order by rate_code desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getApprvedvarietydetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $apprno   = $_POST['apprno'];
/*

	$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode = $finid and rate_approved = 'Y' and rate_close = 'N' and  rate_code = $apprno order by var_desc");


        if ($apprno   == 0)
	$r=mysql_query("select * from masprd_variety  order by var_desc");
        else
	$r=mysql_query("select * from massal_rate left join masprd_variety on  var_typecode =rate_vartype  where rate_comp_code = $compcode and rate_fincode = $finid and rate_approved = 'Y' and rate_close = 'N' and  rate_code = $apprno order by var_desc");
*/

        if ($apprno   == 0)

	$r=mysql_query("select * from masprd_variety  order by var_desc");

        else


	$r=mysql_query("select * from (
select * from massal_rate left join masprd_variety on  var_typecode =rate_vartype  where rate_vartype !=14 and rate_comp_code = $compcode and rate_fincode = $finid and rate_approved = 'Y' and rate_close = 'N' and  rate_code = $apprno 
union all
select * from massal_rate left join masprd_variety on  var_typecode =rate_vartype  where rate_vartype =14 and rate_comp_code = $compcode and rate_fincode = $finid and rate_approved = 'Y' and rate_close = 'N' and  rate_code = $apprno  and rate_pb_variety = var_groupcode ) a1  order by var_desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getRateDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $apprno   = $_POST['apprno'];
        $varty    = $_POST['varty'];
        $shade    = $_POST['shade'];
        $vargrpcode   = (int) $_POST['vargrpcode'];

/*
        if  ($apprno  == 0)
          	$r=mysql_query("select * from masprd_variety");       
        else
{
        
     if ($vargrpcode == 1)
     { 

       if ($shade  == "GREY-BRD")
		$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode  <= $finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_shade = '$shade' and rate_code = $apprno");
         else


	$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode <=$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade != 'GREY-BRD' and rate_code = $apprno");     



     }  
     else if ($vargrpcode == 14)

     { 

//	$r= "select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode =$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_code = $apprno";



//	$r=mysql_query("select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode =$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_code = $apprno");


//	$r="select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode =$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade = '$shade'  and rate_code = $apprno";
//echo $r;


	$r="select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode <=$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade = '$shade'  and rate_code = $apprno";



	$r=mysql_query("select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode <=$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade = '$shade'  and rate_code = $apprno");

     }   
     else
     {

//	$r= "select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode =$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_code = $apprno and rate_shade = '$shade'";
//echo $r;

	$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode <= $finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_code = $apprno and rate_shade = '$shade'  ");

     }   
}


*/

        if  ($apprno  == 0)
          	$r=mysql_query("select * from masprd_variety");       
        else
{
        
     if ($vargrpcode == 1)
     { 

       if ($shade  == "GREY-BRD")
		$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode  = $finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_shade = '$shade' and rate_code = $apprno");

       else


	$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode =$finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade != 'GREY-BRD' and rate_code = $apprno");     

     }  
     else if ($vargrpcode == 14)

     { 
	$r=mysql_query("select * from masprd_variety ,massal_rate  where  var_groupcode = rate_pb_variety and  var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode = $finid and rate_approved = 'Y' and  var_groupcode =  $varty  and  rate_shade = '$shade'  and rate_code = $apprno");

     }   
     else
     {
	$r=mysql_query("select * from masprd_variety ,massal_rate  where var_typecode =rate_vartype and rate_comp_code = $compcode  and rate_fincode = $finid and rate_approved = 'Y' and  var_groupcode =  $varty  and rate_code = $apprno and rate_shade = '$shade'  ");

     }   
}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAreaRateDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $apprno   = $_POST['apprno'];
        $varty    = $_POST['varty'];
        $shade    = $_POST['shade'];
        $vargrpcode   = (int) $_POST['vargrpcode'];

        if ($vargrpcode == 1)
	$r=mysql_query("select * from masprd_variety ,massal_areawise_rate  where var_typecode =arearate_vartype and arearate_comp_code = $compcode  and arearate_fincode =$finid and arearate_approved = 'Y' and arearate_close = 'N' and 
 var_groupcode =  $varty and arearate_shade = '$shade' and arearate_sno = $apprno");
        else
	$r=mysql_query("select * from masprd_variety ,massal_areawise_rate  where var_typecode =arearate_vartype and arearate_comp_code = $compcode  and arearate_fincode =$finid and arearate_approved = 'Y' and arearate_close = 'N' and 
 var_groupcode =  $varty and arearate_sno = $apprno");

      
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getorderdetails1()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $ordno   = $_POST['ordno'];
/*
        $r=mysql_query("select a.*,b.*,d.*,e.*,f.*,g.*,c.cust_code as agentcode,c.cust_ref as agentname  from trnsal_order_header a ,massal_customer b,vew_sal_agent c, massal_tax d, maspur_supplier_master e ,massal_repr f, massal_invtype g where a.ordh_party = b.cust_code and a.ordh_trans = e.sup_code and a.ordh_rep = f.repr_code and a.ordh_agent = c.cust_code and a.ordh_type =  g.type_code and a.ordh_tax =  d. tax_code and ordh_comp_code = $compcode and ordh_fincode = $finid  and ordh_sono = $ordno");
*/

        $r=mysql_query("select a.*,b.*,d.*,f.* from trnsal_order_header a ,massal_customer b, massal_tax d, massal_repr f  where a.ordh_party = b.cust_code and a.ordh_rep = f.repr_code and  a.ordh_tax =  d. tax_code and ordh_comp_code = $compcode and ordh_fincode = $finid  and ordh_sono = $ordno");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getorderdetailstrailer()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $ordno   = $_POST['ordno'];


          $r=mysql_query("select a.*,b.*,c.var_desc,c.var_typecode,c.var_bf,c.var_gsm from trnsal_order_trailer a,massal_variety b , masprd_variety c
where a.ordt_var_code = b.var_code  and b.var_grpcode = c.var_groupcode  and a.ordt_fincode = $finid and a.ordt_comp_code = $compcode and a.ordt_sono = $ordno");

          $r=mysql_query("select a.*,b.*,c.var_desc,c.var_typecode,c.var_bf,c.var_gsm ,d.shade_shortname from trnsal_order_trailer a,massal_variety b , masprd_variety c,massal_shade d where var_shade = shade_shortcode and a.ordt_var_code = b.var_code  and b.var_grpcode = c.var_groupcode  and a.ordt_fincode = $finid and a.ordt_comp_code = $compcode and a.ordt_sono = $ordno order by ordt_slno");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getgriddetails()
    {
        mysql_query("SET NAMES utf8");

//	$chksizeitem = $_POST['chksizeitem'];

	$sizecode = $_POST['sizecode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $apprno   = $_POST['apprno'];



        $chksizeitem = 0;

        $r1=mysql_query("select rate_item_code from massal_rate  where rate_comp_code =  '$compcode' and rate_fincode = '$finid'  and rate_appstat = 'T'  and rate_close = 'N'   and  rate_code  = '$apprno'");
        $result1 = mysql_query($r1);
        $rec1 = mysql_fetch_array($result1);

        $chksizeitem = $rec1['rate_item_code'];

/*	

	if($chksizeitem ==0)
	{
        $r=mysql_query("select var_name,var_code,var_unit,case when var_unit = 1 then rate_reel_per_mt  else rate_bun_per_mt end as basicrate, rate_code,rate_unit,rate_comm,disc_cash,disc_dealer,disc_reel_rebate,disc_regional,disc_additional,'N' as invupd1,'N' as invupd2,'N' as invupd3,
'N' as invupd4,'N' as invupd5,'N' as qcdev,curdate() as despdate  from massal_rate  , massal_variety  where rate_var_code = var_grpcode and 
rate_comp_code ='$compcode' and rate_fincode = '$finid' and rate_appstat = 'T' and rate_close = 'N'   and  rate_code = '$apprno' and var_code = '$sizecode'");
	}
	else	
	{

       $r=mysql_query("select var_name,var_code,var_unit,case when var_unit = 1 then rate_reel_per_mt  else rate_bun_per_mt end as basicrate, rate_code,rate_unit,rate_comm,disc_cash,disc_dealer,disc_reel_rebate,disc_regional,disc_additional,'N' as invupd1,'N' as invupd2,'N' as invupd3,
'N' as invupd4,'N' as invupd5,'N' as qcdev,curdate() as despdate  from massal_rate  , massal_variety  where rate_item_code = var_code and 
rate_comp_code ='$compcode' and rate_fincode = '$finid' and rate_appstat = 'T' and rate_close = 'N'   and  rate_code = '$apprno' and var_code = '$sizecode'");
	}

*/


	if($chksizeitem > 0)
	{
       $r=mysql_query("select var_name,var_code,var_unit,case when var_unit = 1 then rate_reel_per_mt  else rate_bun_per_mt end as basicrate, rate_code,rate_unit,rate_comm,disc_cash,disc_dealer,disc_reel_rebate,disc_regional,disc_additional,'N' as invupd1,'N' as invupd2,'N' as invupd3,
'N' as invupd4,'N' as invupd5,'N' as qcdev,curdate() as despdate  from massal_rate  , massal_variety  where rate_item_code = var_code and 
rate_comp_code ='$compcode' and rate_fincode = '$finid' and rate_appstat = 'T' and rate_close = 'N'   and  rate_code = '$apprno' and var_code = '$sizecode'");

	}
	else	
	{
        $r=mysql_query("select var_name,var_code,var_unit,case when var_unit = 1 then rate_reel_per_mt  else rate_bun_per_mt end as basicrate, rate_code,rate_unit,rate_comm,disc_cash,disc_dealer,disc_reel_rebate,disc_regional,disc_additional,'N' as invupd1,'N' as invupd2,'N' as invupd3,
'N' as invupd4,'N' as invupd5,'N' as qcdev,curdate() as despdate  from massal_rate  , massal_variety  where rate_var_code = var_grpcode and 
rate_comp_code ='$compcode' and rate_fincode = '$finid' and rate_appstat = 'T' and rate_close = 'N'   and  rate_code = '$apprno' and var_code = '$sizecode'");

	}


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getShades()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select  * from massal_shade order by shade_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getShadecode()
    {
        mysql_query("SET NAMES utf8");
     	$shadecode = $_POST['shadecode'];
        $r=mysql_query("select  * from massal_shade where shade_code =  '$shadecode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDeliveryAddress()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];



        $r=mysql_query("select * from trnsal_delivery_address where d_custcode = '$custcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function checkoverdue()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];



        $r=mysql_query(" select * from overdue_custlist where c_code = '$custcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get90daysdue()
    {
        mysql_query("SET NAMES utf8");
	$ledcode = $_POST['ledcode'];
	$custcode = $_POST['custcode'];
	$sodate    = $_POST['sodate'];



// The below query for > 90 days payment
        $r=mysql_query("select * from (select ifnull(sum(invbalance),0) as invbalance from ( select  acctrail_inv_value-acctrail_adj_value as invbalance, DATEDIFF( CURDATE(), acctrail_inv_date) as noofdays from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and trail.acctrail_led_code =  $ledcode and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'
 where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D') aa where noofdays > 90
) a1 cross join (select count(*) as nos from acc_so_allow where so_custcode = $custcode and so_upto_allowed >= '$sodate' and  so_seqno in (select max(so_seqno) from  acc_so_allow where so_custcode = $custcode )) b1 ");


// The below query  payment Terms + 15 Days
        $r=mysql_query("select * from (
select ifnull(sum(invbalance),0) as invbalance from ( 
 select  acctrail_inv_value-acctrail_adj_value as invbalance,
 DATEDIFF( CURDATE() ,date_add(acctrail_inv_date , interval acctrail_crdays+15 day)) as noofdays 
 from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code =  $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
 ) aa where noofdays > 1
) a1 cross join (select count(*) as nos from acc_so_allow where so_custcode = $custcode and 
so_upto_allowed >= '$sodate' and  so_seqno in (
select max(so_seqno)+0 from  acc_so_allow where so_custcode = $custcode 
 )) b1 ");


// The below query  payment Terms + 15 Days && Allow Maximum Payment Terms
/*
        $r=mysql_query("select ifnull(duedate,0) as duedate,ifnull(avldays,0) as avldays,ifnull(nos,0) as nos from (
  
  select max(duedate) duedate ,datediff(max(duedate),curdate()) as avldays from (
  select  acctrail_inv_date, invbalance, acctrail_crdays, duedate , DATEDIFF( duedate ,acctrail_inv_date ) as noofdays  from (
  
  select  acctrail_inv_date,acctrail_inv_value-acctrail_adj_value as invbalance,acctrail_crdays,
  date_add(acctrail_inv_date , interval acctrail_crdays +15 day) as duedate,
   DATEDIFF( CURDATE() ,date_add(acctrail_inv_date , interval acctrail_crdays+15 day)) as noofdays 
  from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code =  $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
  
  ) a
  
  )a1 
)ab1  
  cross join (select count(*) as nos from acc_so_allow where so_custcode = $custcode  and 
so_upto_allowed >= '$sodate' and  so_seqno in (
select max(so_seqno)+0 from  acc_so_allow where so_custcode = $custcode 
 ))  b1 ");
*/


$r=mysql_query("select max(nos) nos from (
  select  acctrail_inv_date, invbalance, payterms,  date_add(acctrail_inv_date , interval payterms +15 day) as duedate  from (
   select  acctrail_inv_date,acctrail_inv_value-acctrail_adj_value as invbalance ,  (select  max(acctrail_crdays)+max(acctrail_gracedays) as payterms   from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D') as payterms 
  from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
  ) a1 where date_add(acctrail_inv_date , interval payterms +15 day)  < curdate()
) a2    cross join (select count(*) as nos from acc_so_allow where so_custcode = $custcode  and 
so_upto_allowed >= '$sodate' and  so_seqno in (
select max(so_seqno)+0 from  acc_so_allow where so_custcode = $custcode ))  b1 ");

// Modified on 10/04/2024 - for More than 90 days payment control . if 90 days then allow only 5 days Extra 


$r=mysql_query("select max(nos) nos from (
  select  acctrail_inv_date, invbalance, payterms,  date_add(acctrail_inv_date , interval payterms +15 day) as duedate  from (
   select  acctrail_inv_date,acctrail_inv_value-acctrail_adj_value as invbalance ,  (
select case when max(acctrail_crdays)+max(acctrail_gracedays) = 90 then max(acctrail_crdays)+max(acctrail_gracedays)-10 else max(acctrail_crdays)+max(acctrail_gracedays) end as payterms from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D') as payterms 
  from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode  and acctrail_inv_value > acctrail_adj_value join acc_ledger_master mas  on trail.acctrail_led_code = mas.led_code and mas.led_type = 'C'  and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
  ) a1 where date_add(acctrail_inv_date , interval payterms +15 day)  < curdate()
) a2    cross join (select count(*) as nos from acc_so_allow where so_custcode = $custcode  and 
so_upto_allowed >= '$sodate' and  so_seqno in (
select max(so_seqno)+0 from  acc_so_allow where so_custcode = $custcode ))  b1 ");


// Date 19/06/2024 Overdue Exemption Upto Rs.1000/- for SO ALLOW





$r=mysql_query("select max(balance) balance ,max(allowed) allowed   from (
 select case when sum(invbalance)-1000 > 0 then sum(invbalance)-1000  else 0 end as  balance , 0 as allowed from (
  select  acctrail_inv_date, invbalance, payterms,  date_add(acctrail_inv_date , interval payterms +15 day) as duedate  from (
 select  acctrail_inv_date,acctrail_inv_value-acctrail_adj_value as invbalance ,  (
select case when max(acctrail_crdays)+max(acctrail_gracedays) = 90 then max(acctrail_crdays)+max(acctrail_gracedays)-10 else max(acctrail_crdays)+max(acctrail_gracedays) end as payterms from acc_ref ref 
left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode and acctrail_inv_value > acctrail_adj_value join massal_customer mas  on trail.acctrail_led_code = mas.cust_code and accref_vou_type = 'GSI'
   where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
  ) as payterms 
    from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno and
 trail.acctrail_led_code = $ledcode  and acctrail_inv_value > acctrail_adj_value join massal_customer mas  on trail.acctrail_led_code = mas.cust_code and accref_vou_type = 'GSI'
  where accref_comp_code = 1 and accref_voudate <= CURDATE() and acctrail_amtmode = 'D'
    ) a1 where date_add(acctrail_inv_date , interval payterms +15 day)  < curdate()
) a2
union all
(select  0 as balance, count(*) as allowed from acc_so_allow where so_custcode =  $ledcode  and 
so_upto_allowed >= '$sodate' and  so_seqno in (
select max(so_seqno)+0 from  acc_so_allow where so_custcode = $ledcode ))) a3");


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


 function getAreaRateCode()
    {
        mysql_query("SET NAMES utf8");

	$areacode = $_POST['areacode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $r="select arearate_sno rate_code,arearate_fincode rate_fincode from massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode >= '$finid'  and arearate_approved = 'Y'  and arearate_close = 'N' and arearate_area = $areacode and arearate_sno in ( select ifnull(max(arearate_sno),0)+0 from massal_areawise_rate where arearate_comp_code = '$compcode' and  arearate_fincode >= '$finid'  and arearate_approved = 'Y'  and arearate_close = 'N'
and arearate_area = $areacode) group by arearate_sno,arearate_fincode order by arearate_sno desc";


        $r=mysql_query("select arearate_sno rate_code,arearate_fincode rate_fincode from massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode >= '$finid'  and arearate_approved = 'Y'  and arearate_close = 'N' and arearate_area = $areacode and arearate_sno in ( select ifnull(max(arearate_sno),0)+0 from massal_areawise_rate where arearate_comp_code = '$compcode' and  arearate_fincode >= '$finid'  and arearate_approved = 'Y'  and arearate_close = 'N' and arearate_area = $areacode) group by arearate_sno,arearate_fincode order by arearate_sno desc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAreaApprvedvarietydetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $apprno   = $_POST['apprno'];


	$r=mysql_query("select * from masprd_variety ,massal_areawise_rate  where var_typecode = arearate_vartype and arearate_comp_code = $compcode  and arearate_fincode = $finid and arearate_approved = 'Y' and arearate_close = 'N' and  arearate_sno = $apprno order by var_desc");


	$r=mysql_query("select * from masprd_variety  order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getGodownStock()
    {
        mysql_query("SET NAMES utf8");


	$compcode     = $_POST['compcode'];
        $varietycode  = $_POST['varietycode'];
        $size_cm      = $_POST['size_cm'];
        $size_in      = $_POST['size_in'];


	$r=mysql_query("select count(*) as nos ,  Cast(sum(stk_wt)/1000 as decimal(18,3)) as wt from trnsal_finish_stock where stk_comp_code = $compcode and  stk_sono = 1001 and stk_var_code = $itemcode and stk_destag = ''");

	$r=mysql_query("select count(*) as nos , Cast(sum(stk_wt)/1000 as decimal(18,3)) as wt from trnsal_finish_stock where stk_sono = 1001 and stk_comp_code = $compcode  and stk_destag = '' and
 stk_var_code in ( select var_code from massal_variety where var_grpcode =  $varietycode and  ((var_inchcm = 'C' and var_size2 = $size_cm ) or (var_inchcm = 'I' and var_size2 = $size_in )) )");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getGodownStockReelNowise()
    {
        mysql_query("SET NAMES utf8");


	$compcode     = $_POST['compcode'];
        $varietycode  = $_POST['varietycode'];
        $size_cm      = $_POST['size_cm'];
        $size_in      = $_POST['size_in'];


	$r="select var_code,var_name,stk_sr_no, cast(stk_wt as decimal(5,1) ) as  stk_wt from trnsal_finish_stock , massal_variety where var_grpcode = $varietycode and  stk_var_code = var_code and 
stk_sono = 1001 and stk_comp_code = $compcode and stk_destag = '' and var_code in  (  select var_code from massal_variety where var_grpcode = $varietycode and  ((var_inchcm = 'C' and var_size2 = $size_cm ) or (var_inchcm = 'I' and var_size2 = $size_in)))  order by  var_name, stk_sr_no";

//echo $r;


	$r=mysql_query("select var_code,var_name,stk_sr_no, cast(stk_wt/1000 as decimal(6,3) ) as  stk_wt from trnsal_finish_stock , massal_variety where var_grpcode = $varietycode and  stk_var_code = var_code and 
stk_sono = 1001 and stk_comp_code = $compcode and stk_destag = '' and var_code in  (  select var_code from massal_variety where var_grpcode = $varietycode and  ((var_inchcm = 'C' and var_size2 = $size_cm ) or (var_inchcm = 'I' and var_size2 = $size_in)))  order by  var_name, stk_sr_no");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getVartyGroup()
    {
        mysql_query("SET NAMES utf8");

        $varietycode  = $_POST['varty'];


	$r=mysql_query("select * from masprd_variety where var_groupcode = $varietycode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

  function getOrderNoList_for_RateRevision()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $ordtype = $_POST['ordtype'];

        $r=mysql_query("select  ordh_sono from (select '1' as ord,ordh_sono from trnsal_order_header where length(ordh_sono) = 6 and  ordh_type =  '$ordtype'  and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  union all select '2' as ord,ordh_sono from trnsal_order_header where length(ordh_sono) <> 6 and  ordh_type =  '$ordtype'  and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  ) aa order by ord,ordh_sono desc");

        $r=mysql_query("select  ordh_sono from (select '1' as ord,ordh_sono from trnsal_order_header where length(ordh_sono) = 6 and  ordh_type =  '$ordtype'  and ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  union all select '2' as ord,ordh_sono from trnsal_order_header where  ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  ) aa order by ord,ordh_sono desc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
