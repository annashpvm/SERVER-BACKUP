<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");
   
    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		
		case "loadcarrier":
		getcarrier();
		break;
		case "loaddept":
		getdept();
		break;
		case "loadpayterms":
		getpayterms();
		break;
		case "loaddcno":
		getdcno();
		break;
		case  "loadwono":
		getwono();
		break;
		case  "loaditem":
		getitem();
		break;
            	case  "loaditemdetail":
		getitemdetail();
		break;
            	case  "loadwoitemdetail":
		getwoitemdetail();
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
    
   
 
	

function getsupplier(){
    $query = "call sp_pur_sup()";
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
	
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where minh_fin_code=$finid  and minh_comp_code=$compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcarrier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from mas_transport");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getdept()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("call sp_sel_dept()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpayterms()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getdcno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
//	$r=mysql_query("select * from trnpur_general_header,trnpur_general_trailer where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and genh_type='D'");

	$r=mysql_query("select genh_no from trnpur_general_header,trnpur_general_trailer where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and genh_type='D' and genh_tag ='W' group by genh_no order by genh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getwono()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	
	$r=mysql_query("select gent_pono,genh_dept,genh_date,genh_carrier,genh_fincode from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_tag ='W' and genh_no = '$dcno' and gent_issqty > gent_recqty  group by gent_pono,genh_dept,genh_date,genh_carrier,genh_fincode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitem()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	$wono = $_POST['wono'];
	
	$r=mysql_query("select item_name,gent_item_code,gent_podate from trnpur_general_header a,trnpur_general_trailer b  ,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono");
	//$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno     = $_POST['dcno'];
	$wono     = $_POST['wono'];
	$item     = $_POST['item'];
	
	$r=mysql_query("select gent_issqty - gent_recqty as balqty  from trnpur_general_header a,trnpur_general_trailer b  ,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono and gent_item_code = $item");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getwoitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno     = $_POST['dcno'];
	$wono     = $_POST['wono'];
	$item     = $_POST['item'];
	


	$r=mysql_query("select * from trnpur_workorder_header a,  trnpur_workorder_trailer b,maspur_supplier_master c ,mas_item_master d ,mas_workorder e where woh_seqno = wot_hdseqno and woh_sup_code = sup_code and woh_wocode =wo_no and wot_itemcode = item_code and woh_comp_code = $compcode and  woh_fin_code =  $finid  and woh_no = $wono and wot_itemcode = $item");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
