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
		case "loaddnrecptno":
		getdnrecptno();
		break;
		case "loaddnnolist":
		getdnnolist();
		break;

		case  "loaddnnodetail":
		getdnnodetail();
		break;

		case  "loaddnnodetail2":
		getdnnodetail2();
		break;

		case "loaddnrecptnolist":
		getdnrecptnolist();
		break;
			
		case "loaddnrecptnodetail":
		getdnrecptnodetail();
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

		case  "loaditem":
		getitem();
		break;
		case  "loaditemdet":
		getitemdet();
		break;
		case  "loaditemlist":
		getitemlist();
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
    $query = "select sup_refname,sup_code from trnpur_general_header , maspur_supplier_master where genh_party = sup_code and genh_type = 'D'  group by sup_refname,sup_code";
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
	
 function getdnrecptno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(genh_no),0)+1 as dnrecptno from trnpur_general_header where genh_type  = 'R' and genh_comp_code = $compcode and genh_fincode = $finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getdnnolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$r=mysql_query("select genh_no,genh_fincode from trnpur_general_header,trnpur_general_trailer 
where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and 
genh_comp_code='$compcode'  and genh_fincode= $finid and genh_party='$supcode' and gent_issqty>gent_recqty and 
genh_type='D' group by genh_no,genh_fincode order by genh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getdnrecptnolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select genh_no,genh_fincode from trnpur_general_header where genh_type  = 'R' and genh_comp_code = $compcode and genh_fincode = $finid order by genh_no desc");
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
	$r=mysql_query("select * from trnpur_general_header,trnpur_general_trailer 
where genh_comp_code = gent_comp_code and genh_fincode=gent_fincode and genh_no=gent_no and 
genh_comp_code='$compcode' and genh_fincode='$finid' and genh_party='$supcode' and gent_issqty>gent_recqty and 
genh_type='D'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getdnnodetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dnno = $_POST['dnno'];
	
	$r=mysql_query("select * from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code and gent_issqty > gent_recqty  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_no = '$dnno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
   }


function getdnnodetail2()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dnno     = $_POST['dnno'];
	//$icode    = $_POST['itemcode'];
           
	
	$r=mysql_query("select gent_issqty - gent_recqty as balqty from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code  and genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'D' and genh_no = '$dnno' ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
   }



function getdnrecptnodetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$recptno = $_POST['recptno'];
	
	$r=mysql_query("select * from trnpur_general_header a,trnpur_general_trailer b,maspur_supplier_master c ,mas_item_master d , mas_uom e where item_uom = uom_code and genh_comp_code = gent_comp_code and genh_fincode = gent_fincode and genh_no = gent_no   and genh_type = gent_type and gent_item_code = item_code and  genh_party = sup_code and  genh_comp_code = '$compcode' and genh_fincode = '$finid' and genh_type = 'R' and genh_no = '$recptno'");
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
function getitemlist()
    {
        mysql_query("SET NAMES utf8");
	
	$r=mysql_query("select item_code, item_name from mas_item_master order by item_name");
	//$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitemdet()
    {
        mysql_query("SET NAMES utf8");
        $itemcode = $_POST['item'];
	$r=mysql_query("select * from mas_item_master a , mas_uom b where item_uom = uom_code and item_code = $itemcode");
	//$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
