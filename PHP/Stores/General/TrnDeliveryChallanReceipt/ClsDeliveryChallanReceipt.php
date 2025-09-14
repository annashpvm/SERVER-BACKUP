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
		case "loadDCrecptno":
		getDCrecptno();
		break;
		case "loadDCnolist":
		getDCnolist();
		break;

		case  "loadDCnodetail":
		getDCnodetail();
		break;

		case "loadDCrecptnolist":
		getDCrecptnolist();
		break;
			
		case "loadDCrecptnodetail":
		getDCrecptnodetail();
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


		case  "loaditemdet":
		getitemdet();
		break;
		case  "loaditemlist":
		getitemlist();
		break;

		case "loadDCnolist_Pending":
		getDCnolist_Pending();
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
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $query = "select cust_ref,cust_code from trnpur_deliverychallan_header , massal_customer where dch_party = cust_code and dch_type = 'R' and  dch_comp_code = $compcode and dch_fincode = $finid group by cust_ref,cust_code";
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
	
 function getDCrecptno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(dcr_no),0)+1 as dcrecptno from trnpur_deliverychallan_receipt where  dcr_comp_code = $compcode and dcr_fincode = $finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getDCnolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];


	$r=mysql_query("select dch_no,dch_fincode from trnpur_deliverychallan_header,trnpur_deliverychallan_trailer where dch_comp_code = dct_comp_code and dch_fincode=dct_fincode and dch_no=dct_no and dch_comp_code= '$compcode'  and dch_fincode= $finid and dch_party= '$supcode'  and dch_type= dct_type and dct_issqty>dct_recqty and dch_type='R' group by dch_no,dch_fincode order by dch_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getDCrecptnolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select dcr_no from trnpur_deliverychallan_receipt where dcr_comp_code = $compcode and dcr_fincode = $finid group by dcr_no  order by dcr_no  desc");
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




function getDCnodetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$dcno = $_POST['dcno'];
	


	$r=mysql_query("select * from trnpur_deliverychallan_header a,trnpur_deliverychallan_trailer b,massal_customer c ,maspur_item_header d , mas_uom e where item_uom = uom_code and dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no   and dch_type = dct_type and dct_item_code = item_code and  dch_party = cust_code and dct_issqty > dct_recqty  and dch_comp_code = '$compcode' and dch_fincode = '$finid' and dch_type = 'R' and dch_no = '$dcno'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
   }





function getDCrecptnodetail()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$recptno = $_POST['recptno'];

	$r=mysql_query(" select * from trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer where 
 dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and  dcr_comp_code = '$compcode' and dcr_dcfincode = '$finid' and dcr_no = $recptno");

	$r=mysql_query("select * from  trnpur_deliverychallan_header, trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer ,maspur_item_header  , mas_uom   where  dct_item_code = item_code and item_uom = uom_code and  dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no and 
 dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and dch_type = 'R' and  dcr_comp_code = $compcode and dcr_dcfincode = $finid and dcr_no = $recptno");


	$r=mysql_query("select * from  trnpur_deliverychallan_header, trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer ,maspur_item_header  , mas_uom   where  dct_item_code = item_code and item_uom = uom_code and  dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no and 
 dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and dch_type = 'R' and dct_sno = dcr_slno and  dcr_comp_code = $compcode and dcr_fincode = $finid and dcr_no = $recptno");


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


function getDCnolist_Pending()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];




	$r=mysql_query("select dch_no,dch_fincode from trnpur_deliverychallan_header,trnpur_deliverychallan_trailer where dch_comp_code = dct_comp_code and dch_fincode=dct_fincode and dch_no=dct_no and dch_comp_code= '$compcode'  and dch_fincode= $finid and dch_type= dct_type and dct_issqty>dct_recqty and dch_type='R' group by dch_no,dch_fincode order by dch_no asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
