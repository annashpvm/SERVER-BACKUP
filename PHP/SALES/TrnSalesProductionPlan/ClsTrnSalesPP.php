<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

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
    

 function getPPvariety()
    {
        mysql_query("SET NAMES utf8");
        $varcodes = $_POST['varcodes'];
        $r=mysql_query("select var_groupcode,var_desc from masprd_variety where var_groupcode in $varcodes order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPPsize()
    {
        mysql_query("SET NAMES utf8");
        $sizecodes = $_POST['sizecodes'];
        $r=mysql_query("select msize,var_gsm from ( 
select var_size2 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_groupcode and  a.var_code in $sizecodes and var_size2 > 0
union all
select var_size1 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_code and  a.var_code in $sizecodes  and var_size1 > 0
)a group by msize,var_gsm ");

        $r=mysql_query("select var_size2 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_groupcode and  a.var_code in  $sizecodes");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getVarietydetail()
    {
        mysql_query("SET NAMES utf8");
        $sizecode = $_POST['sizecode'];
        $r=mysql_query("select * from massal_variety a , masprd_variety b  , masprd_type c where a.var_grpcode = b.var_groupcode 
and b.var_typecode = c.vargrp_type_code and var_code =  $sizecode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPPProduction()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mano     = $_POST['mano'];
        $r=mysql_query("select sum(pih_mcprodn) as mcprodn from trn_prodplan_trailer_varietywise where pih_comp_code = $compcode and pih_fincode = $finid and pih_mano =  $mano");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPPNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine = $_POST['machine'];
        $r=mysql_query("select ifnull(max(pp_advno),0)+1 as advno from trn_prodplan_header where pp_comp_code = $compcode and pp_fincode = $finid");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPPNolist()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("select pp_advno from trn_prodplan_header where pp_comp_code = $compcode and pp_fincode = $finid  group by pp_advno order by pp_advno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPPNoheader()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mano     = $_POST['mano'];

$r=mysql_query("select *, c.var_groupcode as varty_code, d.var_code as size_code from trn_prodplan_header a, massal_customer b,masprd_variety c,massal_variety d where a.pp_party = b.cust_code and a.pp_varcode = c.var_groupcode and a.pp_sizecode = d.var_code and pp_comp_code = $compcode and pp_fincode = $finid  and pp_advno = $mano order by pp_slno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPPNotrailer()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $mano     = $_POST['mano'];


$r=mysql_query("select * from trn_prodplan_trailer a, masprd_variety b where a.ppt_varcode = b.var_groupcode and ppt_comp_code =  $compcode  and ppt_fincode = $finid  and ppt_advno = $mano order by ppt_slno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getSONo()
{
 mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['party'];
        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_order_header a, trnsal_order_trailer b 
where a.ordh_party = '$party' and a.ordh_sono = b.ordt_sono  and a.ordh_fincode = b.ordt_fincode  and
a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = '$compcode' and (b.ordt_qty - b.ordt_adv_qty) > 0.01 and b.ordt_clo_stat <> 'T' and a.ordh_can_stat <> 'T' group by ordh_sono,ordh_sodate order by ordh_sono desc");


        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_order_header a, trnsal_order_trailer b 
where a.ordh_party = '$party' and a.ordh_sono = b.ordt_sono  and a.ordh_fincode = b.ordt_fincode  and
a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = '$compcode' and b.ordt_clo_stat <> 'T' and a.ordh_can_stat <> 'T' group by ordh_sono,ordh_sodate order by ordh_sono desc");

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
	$sono = $_POST['sono'];
	$party = $_POST['party'];
        $finid = $_POST['finid'];
        $r=mysql_query("select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$sono' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code  and (b.ordt_qty - b.ordt_adv_qty) > 0 group by var_code,var_name,ordh_sodate,var_size1,var_size2");

        $r=mysql_query("select var_code,var_name,ordh_sodate,var_size1,var_size2 , concat(var_name,' - ',var_size2) as sizedisp from trnsal_order_header a,trnsal_order_trailer b, massal_variety c where a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode  and a.ordh_sono = '$sono' and a.ordh_comp_code = b.ordt_comp_code and a.ordh_comp_code = 
'$compcode' and a.ordh_party = '$party' and b.ordt_var_code = c.var_code   group by var_code,var_name,ordh_sodate,var_size1,var_size2");


$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

?>
