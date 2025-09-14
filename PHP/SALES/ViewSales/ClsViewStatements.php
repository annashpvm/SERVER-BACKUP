<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadFinishedDespatched";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadFinishedDespatched":
		getFinishedDespatched();
		break;
		case "loadPartywiseSales":
		getPartywiseSales();
		break;
		case "loadPartyDetails":
		getPartyDetails();
		break;


		case "loadcustomer":
		getcustomer();
		break;
		case "loadPartyMonthDespatched":
                getPartyMonthDespatched();
		break;
		case "loadSONOList":
                getSONOList();
		break;

		case "loadInvListDatewise":
                getInvListDatewise();
		break;
		case "loadInvoiceListDate":
                getInvoiceListDate();
		break;
		case "loadInvoiceItem":
                getInvoiceItem();
		break;

		case "loadShade":
		getShades();
		break;

		case "loadStockList":
		getStockList();
		break;

		case "loadReelNos":
		    getReelNos();
		    break;
		case "loadReturnListDatewise":
		    getReturnListDatewise();
		    break;

		case "loadPartyReturnDetails":
		getPartyReturnDetails();
		break;

		case "loadInvoiceReturnItem":
                getInvoiceReturnItem();
		break;
		case "loadDespatchedQuality":
		getDespatchedQuality();
		break;
		case "loadDespatchedPartywise":
		getDespatchedPartywise();
		break;

		case "loadDespatchedPartyInvwise":
		getDespatchedPartyInvwise();
		break;

		case "loadAllREPOrderList":
		getAllREPOrderList();
		break;
		case "loadREPSONOList":
                getREPSONOList();
		break;


		case "loadSOHistory":
                getSOHistory();
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
    
   

 function getFinishedDespatched()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

        $r=mysql_query("select UPPER(monthname(stk_ent_date)) as rmonth ,sum(stk_wt/1000) as finwt  from trnsal_finish_stock where stk_comp_code = 1 and stk_finyear = 22 and stk_ent_date >= '2022-04-01' and stk_ent_date <= curdate() group by UPPER(monthname(stk_ent_date))");



$r=mysql_query("select rmonth,sum(finwt) as finwt,sum(despwt) as despwt,sum(value1) as value1 from ( select UPPER(monthname(invh_date)) as rmonth,  0 as finwt, sum(invt_wt)/1000 as despwt , sum(invt_value) as value1 from trnsal_invoice_header a , trnsal_invoice_trailer b where a.invh_fincode= b.invt_fincode  and a.invh_comp_code = b.invt_compcode and a.invh_seqno = b.invt_seqno and  a.invh_fincode= $finid    and a.invh_comp_code= $compcode and invh_date >= '$startdate' and invh_date <= '$enddate' group by UPPER(monthname(invh_date)) union all select UPPER(monthname(stk_ent_date)) as rmonth ,sum(stk_wt/1000) as finwt ,0 as despwt, 0 as value1  from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $finid   and stk_ent_date >= '$startdate' and stk_ent_date <= '$enddate' group by UPPER(monthname(stk_ent_date)) ) a group by rmonth");


//$r=mysql_query("select rmonth,sum(mcprodwt) as prodwt ,sum(finwt) as finwt,sum(despwt) as despwt,sum(value1) as value1 from ( select UPPER(monthname(invh_date)) as rmonth, 0 as mcprodwt,  0 as finwt, sum(invt_wt)/1000 as despwt , sum(invt_value) as value1 from trnsal_invoice_header a , trnsal_invoice_trailer b where a.invh_fincode= b.invt_fincode  and a.invh_comp_code = b.invt_compcode and a.invh_seqno = b.invt_seqno and  a.invh_fincode= $finid    and a.invh_comp_code= $compcode and invh_date >= '$startdate' and invh_date <= curdate() group by UPPER(monthname(invh_date)) union all select UPPER(monthname(stk_ent_date)) as rmonth , 0 as mcprodwt,sum(stk_wt/1000) as finwt ,0 as despwt, 0 as value1  from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $finid   and stk_ent_date >= '$startdate' and stk_ent_date <= curdate() group by UPPER(monthname(stk_ent_date))union allelect UPPER(monthname(prdh_date)) as rmonth ,sum(prdh_prodn) as mcprodwt ,0 as finwt ,0 as despwt, 0 as value1 from trn_dayprod_header where prdh_compcode = $compcode and prdh_fincode =  $finid  and prdh_date >= '$startdate' and prdh_date <= curdate() group by UPPER(monthname(prdh_date)) ) a group by rmonth");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPartywiseSales()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate = $_POST['enddate'];

$r=mysql_query("select cust_code,cust_ref ,round(sum(invt_wt)/1000,3) as despwt , sum(invt_value) as value1 from 
trnsal_invoice_header a , trnsal_invoice_trailer b , massal_customer c where  a.invh_party = cust_code 
and a.invh_fincode= b.invt_fincode  and a.invh_comp_code = b.invt_compcode and a.invh_seqno = b.invt_seqno 
and  a.invh_fincode= $finid  and a.invh_comp_code= $compcode and invh_date >= '$startdate' and invh_date <= '$enddate' 
group by cust_code,cust_ref order  by cust_ref");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getPartyDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];        
        $party     = $_POST['party'];

$r=mysql_query("select invh_date,invh_invrefno,round(invh_totwt/1000,3) as invwt,invh_netamt  from trnsal_invoice_header where  invh_party = $party and  invh_fincode= $finid  and invh_comp_code= $compcode and invh_date >= '$startdate' and invh_date <= '$enddate' order  by invh_date,invh_invrefno");
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
        $compcode = $_POST['compcode'];
//       $r = mysql_query("select cust_code,cust_ref from massal_customer");
        $r = mysql_query("select cust_code,cust_ref from massal_customer a, trnsal_invoice_header b  where a.cust_code = b.invh_party  and b.invh_comp_code = 1 and invh_fincode >= 22  group by cust_code,cust_ref order by cust_ref ");
	
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


 function getPartyMonthDespatched()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$custcode = $_POST['custcode'];

/*
$r=mysql_query("select rmonth,sum(finwt) as finwt,sum(despwt) as despwt,sum(value1) as value1 from ( select UPPER(monthname(invh_date)) as rmonth,  0 as finwt, sum(invt_wt)/1000 as despwt , sum(invt_value) as value1 from trnsal_invoice_header a , trnsal_invoice_trailer b where a.invh_fincode= b.invt_fincode  and a.invh_comp_code = b.invt_compcode and a.invh_seqno = b.invt_seqno and  a.invh_fincode= $finid    and a.invh_comp_code= $compcode and invh_date >= '$startdate' and invh_date <= curdate() group by UPPER(monthname(invh_date)) union all select UPPER(monthname(stk_ent_date)) as rmonth ,sum(stk_wt/1000) as finwt ,0 as despwt, 0 as value1  from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $finid   and stk_ent_date >= '$startdate' and stk_ent_date <= curdate() group by UPPER(monthname(stk_ent_date)) ) a group by rmonth");

$r=mysql_query("select UPPER(monthname(invh_date)) as rmonth,  0 as finwt, sum(invt_wt)/1000 as despwt , sum(invt_value) as value1 from trnsal_invoice_header a , trnsal_invoice_trailer b where a.invh_fincode= b.invt_fincode  and a.invh_comp_code = b.invt_compcode and a.invh_seqno = b.invt_seqno and  a.invh_fincode= $finid   and a.invh_comp_code= $compcode  and invh_date >= '$startdate'  and invh_date <=  curdate()  and invh_party = $custcode group by UPPER(monthname(invh_date))");

*/

$r=mysql_query("select UPPER(monthname(invh_date)) as rmonth,  0 as finwt, sum(invh_totwt)/1000 as despwt , sum(invh_netamt) as value1 from trnsal_invoice_header where invh_fincode= $finid   and invh_comp_code= $compcode  and invh_date >= '$startdate'  and invh_date <=  curdate()  and invh_party = $custcode group by UPPER(monthname(invh_date))");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSONOList()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$soopt     = $_POST['soopt'];

        if ($soopt == 1)  
        {    
$r=mysql_query("select DATE_FORMAT(ordh_sodate, '%d-%m-%Y') as  ordh_sodate,cust_code, cust_ref, ordh_sono,var_name ,var_size2 , var_shade,var_inchcm,ordt_qty,ordt_rate,ordt_fin_wt,ordt_inv_wt  from trnsal_order_header , trnsal_order_trailer ,massal_customer , massal_variety where ordt_var_code = var_code and ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode  and ordh_sono = ordt_sono  and ordh_party = cust_code and ordh_comp_code = '$compcode' and ordh_fincode = '$finid' and ordh_sodate >= '$startdate' and ordh_sodate <= '$enddate' order by ordh_sodate desc");
        }     
        else
        {    
$r=mysql_query("select DATE_FORMAT(ordh_sodate, '%d-%m-%Y') as  ordh_sodate,cust_code, cust_ref, ordh_sono,var_name ,var_size2 , var_shade,var_inchcm,ordt_qty,ordt_rate,ordt_fin_wt,ordt_inv_wt  from trnsal_order_header , trnsal_order_trailer ,massal_customer , massal_variety where ordt_var_code = var_code and ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode  and ordh_sono = ordt_sono  and ordh_party = cust_code and ordh_comp_code = '$compcode' and ordh_fincode = '$finid' and ordh_sodate >= '$startdate' and ordh_sodate <= '$enddate' and length(ordh_sono) = 6 order by ordh_sodate desc");
        }     



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getInvListDatewise()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];




$r=mysql_query("select DATE_FORMAT(invh_date, '%d-%m-%Y') as invdate,invh_date, round(sum(invh_totwt)/1000,3) invwt, sum(invh_netamt) as invamt from trnsal_invoice_header where invh_comp_code = '$compcode'  and invh_fincode = '$finid' and  invh_date >= '$startdate' and invh_date <= '$enddate' group by invh_date order by invh_date desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getInvoiceListDate()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repdate = $_POST['repdate'];
	$enddate = $_POST['enddate'];

$r=mysql_query("select cust_ref,invh_invrefno,round(invh_totwt/1000,3) invwt, invh_netamt  from trnsal_invoice_header, massal_customer where invh_party = cust_code and  invh_comp_code = '$compcode'  and invh_fincode = '$finid' and  invh_date = '$repdate' order  by cust_ref , invh_invrefno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getInvoiceItem()
    {
        mysql_query("SET NAMES utf8");

//echo $_SERVER["DOCUMENT_ROOT"];

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno    = $_POST['invno'];
	$enddate = $_POST['enddate'];

$r=mysql_query("select cust_ref,invh_invrefno,round(invh_totwt/1000,3) invwt, invh_netamt  from trnsal_invoice_header, massal_customer where invh_party = cust_code and  invh_comp_code = '$compcode'  and invh_fincode = '$finid' and  invh_date = '$repdate' order  by cust_ref , invh_invrefno");

$r=mysql_query("select var_bf,round(var_gsm,0) var_gsm ,var_size2,round(invt_wt/1000,3) invwt, round(invt_urate,0) invt_urate, concat(var_size2, '-', (case when var_inchcm = 'I' then 'Inch' else 'CM' end),'-',(case when var_shade = 'NS' then 'NAT' when var_shade = 'GY' then 'GYT' when var_shade = 'DP' then 'DP' when var_shade = 'SY' then 'SHYS' when var_shade = 'GB' then 'GB'   when var_shade = 'BB' then 'BB'   else 'OTH' end)) as sizedisp  from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety ,masprd_variety  where  invh_comp_code = invt_compcode and invh_fincode = invt_fincode and invt_var = var_code and var_grpcode = var_groupcode and  invh_comp_code = $compcode and invh_fincode = $finid  and invt_seqno = invh_seqno and  invh_invrefno = '$invno'");


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
        $r=mysql_query("select var_shade from trnsal_finish_stock , massal_variety where stk_comp_code = 1 and stk_destag = '' and stk_var_code = var_code group by var_shade
");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getStockList()
    {
        mysql_query("SET NAMES utf8");
	$shadecode = $_POST['shadecode'];
	$compcode  = $_POST['compcode'];
	$bf        = (int)$_POST['bf'];
	$gsm       = (int)$_POST['gsm'];
	$optbfgsm  = $_POST['optbfgsm'];

        $r=mysql_query("call spsal_rep_shade_stock($compcode,'$shadecode','$bf','$gsm','$optbfgsm')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }


   function getReelNos()
	    {
        mysql_query("SET NAMES utf8");
	$size     = $_POST['size'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("call spsal_rep_reel_stocklist($compcode,$size )");
  
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }





 function getReturnListDatewise()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];




$r=mysql_query("  select DATE_FORMAT( reth_date, '%d-%m-%Y') as retdate, reth_date, round(sum(reth_return_wt)/1000,3) as retweight,sum(reth_amt) as retamount from trnsal_salret_header where  reth_comp_code = '$compcode'  and reth_fincode ='$finid' and reth_date between '$startdate' and  '$enddate' group by reth_date order by reth_date desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyReturnDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
        $repdate = $_POST['repdate'];
    


$r=mysql_query("select cust_ref,reth_invno,round(reth_return_wt/1000,3) as retweight,reth_amt as retamount, 
  DATE_FORMAT( reth_invdate, '%d-%m-%Y') as reth_invdate  from trnsal_salret_header , massal_customer where  reth_cust=cust_code and reth_comp_code='$compcode' and reth_fincode ='$finid' and reth_date = '$repdate'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getInvoiceReturnItem()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno    = $_POST['invno'];
	$enddate = $_POST['repdate'];

$r=mysql_query("select cust_ref,invh_invrefno,round(invh_totwt/1000,3) invwt, invh_netamt  from trnsal_invoice_header, massal_customer where invh_party = cust_code and  invh_comp_code = '$compcode'  and invh_fincode = '$finid' and  invh_date = '$repdate' order  by cust_ref , invh_invrefno");

$r=mysql_query("select var_bf,var_gsm,var_name, round(sum(rett_return_wt)/1000,3) retwt , rett_urate from trnsal_salret_header a, trnsal_salret_trailer b , massal_variety c , masprd_variety d where c.var_grpcode = d.var_groupcode and b.rett_var = c.var_code and  a.reth_no = b.rett_no and a.reth_fincode = b.rett_fincode  
  and a.reth_comp_code = '$compcode'  and a.reth_fincode = '$finid' and reth_invno = '$invno'  and reth_date = '$enddate' group by var_bf,var_gsm,var_name, rett_urate");

//echo $r;

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getDespatchedQuality()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

//echo "Test";
//        $qry = "call spsal_rep_bf_partywisesales($compcode,'$finid','$startdate','$enddate','$allbf','$selectbf')";

//echo $qry;

        $r=mysql_query("call spsal_rep_bfwisesales($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getDespatchedPartywise()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$allbf     = $_POST['allbf'];
	$selectbf  = $_POST['selectbf'];


//       $qry = "call spsal_rep_bf_partywisesales($compcode,'$finid','$startdate','$enddate','$allbf','$selectbf')";
//echo $qry ;


        $r=mysql_query("call spsal_rep_bf_partywisesales($compcode,'$finid','$startdate','$enddate','$allbf','$selectbf')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getDespatchedPartyInvwise()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$allbf     = $_POST['allbf'];
	$selectbf  = $_POST['selectbf'];
	$custcode  = $_POST['custcode'];


//       $qry="call spsal_rep_bf_party_Invwisesales($compcode,'$finid','$startdate','$enddate','$allbf','$selectbf',$custcode)";
//echo $qry;

        $r=mysql_query("call spsal_rep_bf_party_Invwisesales($compcode,'$finid','$startdate','$enddate','$allbf','$selectbf',$custcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getAllREPOrderList()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];



        $r=mysql_query("call spsal_rep_AllREPwiseOrder($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getREPSONOList()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
 	$repcode   = $_POST['rep'];


        $r=mysql_query("call spsal_rep_REPwiseOrder($compcode,'$finid','$startdate','$enddate',$repcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getSOHistory()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
 	$repcode   = $_POST['rep'];


        $r=mysql_query("call spsal_rep_Order_History($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}
?>




