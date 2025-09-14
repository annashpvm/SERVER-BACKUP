<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadMANo":
		getMANo();
		break;
		case "loadmanolist":
		getmanolist();
		break;
		case "editmanoheader":
		getmanoheader();
		break;
		case "editmanotrailer":
		getmanotrailer();
		break;
		getmanotrailer();
		case "loadmavariety":
		getmavariety();
		break;
		case "loadmasize":
		getmasize();
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
    
 function getmavariety()
    {
        mysql_query("SET NAMES utf8");
        $varcodes = $_POST['varcodes'];
        $r=mysql_query("select var_code,var_desc from masprd_variety where var_code in $varcodes order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getmasize()
    {
        mysql_query("SET NAMES utf8");
        $sizecodes = $_POST['sizecodes'];
        $r=mysql_query("select msize,var_gsm from ( 
select var_size2 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_code and  a.var_code in $sizecodes and var_size2 > 0
union all
select var_size1 as msize,var_gsm  from massal_variety a ,masprd_variety  b where   a.var_grpcode = b.var_code and  a.var_code in $sizecodes  and var_size1 > 0
)a group by msize,var_gsm ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMANo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine = $_POST['machine'];
        $r=mysql_query("select ifnull(max(ma_advno),0)+1 as advno from trn_ma_header where ma_comp_code = $compcode and ma_fincode = $finid  and ma_machine = $machine");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getmanolist()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine  = $_POST['machine'];
$r=mysql_query("select ma_advno from trn_ma_header where ma_comp_code = $compcode  and ma_fincode = $finid and ma_machine = $machine  and ma_close = 'N' and ma_advno  in (select pih_mano from trn_ma_trailer_varietywise where pih_comp_code = $compcode and pih_fincode= $finid  and pih_machine = $machine  and pih_close = 'N' and pih_mcprodn >0 )   group by  ma_advno  order by  ma_advno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getmanoheader()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine  = $_POST['machine'];
        $mano     = $_POST['mano'];

$r=mysql_query("select *, c.var_code as varty_code, d.var_code as size_code from trn_ma_header a, massal_customer b,masprd_variety c,massal_variety d where a.ma_party = b.cust_code and a.ma_varcode = c.var_code and a.ma_sizecode = d.var_code and ma_comp_code = $compcode and ma_fincode = $finid  and ma_advno = $mano order by ma_slno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getmanotrailer()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $machine  = $_POST['machine'];
        $mano     = $_POST['mano'];


$r=mysql_query("select * from trn_ma_trailer a, masprd_variety b where a.mat_varcode = b.var_code and mat_comp_code =  $compcode  and mat_fincode = $finid  and mat_advno = $mano order by mat_slno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
