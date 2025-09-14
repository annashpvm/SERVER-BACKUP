<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
   
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
		case "loadwogrnlist":
		getwogrnlist();
		break;		
		case "loadwogrndetail":
		getwogrndetail();
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
/*		case  "loadwono2":
		getwono2();
		break;
*/
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
        $r=mysql_query("select IFNULL(max(wogh_no),0)+1 as wogh_no from trnpur_wogrn_header where wogh_fin_code = $finid and wogh_comp_code=$compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getwogrnlist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select wogh_no from trnpur_wogrn_header where wogh_fin_code = $finid and wogh_comp_code=$compcode order by wogh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getwogrndetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$wogrnno = $_POST['wogrnno'];

 $r=mysql_query("select * from trnpur_wogrn_header, trnpur_wogrn_trailer,mas_item_master, mas_workorder  where  wo_no = wogh_wono and item_code = wogt_itemcode and wogh_comp_code = wogt_comp_code and wogh_fin_code = wogt_fin_code  and wogh_no = wogt_no and wogh_comp_code = $compcode  and wogh_fin_code = $finid  and wogh_no = $wogrnno");

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


/*	$dnote = $_POST['dnote'];



  if ($dnote == "Y")
{
	$r=mysql_query("select genh_no from trnpur_general_header,trnpur_general_trailer where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and genh_type='D' group by genh_no order by genh_no desc");
}
else
{	$r=mysql_query("select woh_no as genh_no from trnpur_workorder_header , trnpur_workorder_trailer where woh_seqno = wot_hdseqno and woh_sup_code = $supcode and woh_comp_code = $compcode and woh_fin_code = $finid  and wot_qty > wot_recd  group by woh_no  order by woh_no desc");
}

*/
	$r=mysql_query("select genh_no from trnpur_general_header,trnpur_general_trailer where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and genh_type='D' group by genh_no order by genh_no desc");

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
	$supcode = $_POST['supcode'];

	if ($dcno > 0) {

	$r=mysql_query("select gent_pono,genh_dept,genh_date,genh_carrier,genh_fincode from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_tag ='W' and genh_no = '$dcno' and gent_issqty > gent_recqty  group by gent_pono,genh_dept,genh_date,genh_carrier,genh_fincode");
}
else
{
$r=mysql_query("select woh_no as gent_pono ,woh_dept as genh_dept , woh_seqno from trnpur_workorder_header , trnpur_workorder_trailer where woh_seqno = wot_hdseqno and woh_sup_code = $supcode and woh_comp_code = $compcode and woh_fin_code = $finid  and wot_qty > wot_recd  group by woh_no,woh_dept  order by woh_no,woh_dept desc");

}



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


/*
function getwono2()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	
	$r=mysql_query("select woh_no from trnpur_workorder_header , trnpur_workorder_trailer where woh_seqno = wot_hdseqno and woh_sup_code = $supcode and woh_comp_code = $compcode and woh_fin_code = $finid  and wot_qty > wot_recd  group by woh_no  order by woh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
*/

function getitem()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
//	$dcno = $_POST['dcno'];
	$wono = $_POST['wono'];
	
//	$r=mysql_query("select item_name,gent_item_code,gent_podate from trnpur_general_header a,trnpur_general_trailer b  ,maspur_supplier_master c ,mas_item_master d where genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no  and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = $compcode and genh_fincode = $finid and genh_type = 'D'  and gent_issqty > gent_recqty   and genh_no = $dcno and gent_pono = $wono");

$r=mysql_query("select item_name,wot_itemcode,woh_date,wo_name,wo_no,dept_name,dept_code,woh_frt_party1,woh_frt_party2,woh_frt_amt1,woh_frt_amt2,
woh_price_terms,woh_pay_terms,woh_credit_days from trnpur_workorder_header , trnpur_workorder_trailer , mas_workorder ,mas_item_master ,mas_dept where  woh_dept = dept_code and  woh_wocode = wo_no and  woh_seqno = wot_hdseqno and woh_comp_code = $compcode and woh_fin_code = $finid  and wot_qty >= wot_recd and  wot_itemcode = item_code and woh_no = $wono");


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
