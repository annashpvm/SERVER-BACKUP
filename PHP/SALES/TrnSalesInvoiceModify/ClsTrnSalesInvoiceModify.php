<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvoiceNoList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadInvoiceNoList":
		getInvoiceNolist();
		break;
		case "loadcustomer":
		getcustomer();
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

 function getInvoiceNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];



        $r=mysql_query("select invh_invrefno , invh_seqno from trnsal_invoice_header where invh_fincode= $finid  and invh_comp_code= $compcode  order by invh_invrefno desc");
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
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $invno    = $_POST['invno'];
 
if ($invno === "0")
{
        $r=mysql_query("select cust_code,cust_ref ,cust_phone from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c where a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_invstat <> 'T'and a.pckh_party = c.cust_code and a.pckh_fincode = $fincode and a.pckh_comp_code =$compcode  group by cust_code,cust_ref order by cust_code,cust_ref");
}
else
{
        $r=mysql_query("select cust_code,cust_ref ,cust_phone from trnsal_invoice_header , massal_customer  where invh_party = cust_code and  invh_fincode= '$fincode'  and invh_comp_code= '$compcode' and invh_seqno = $invno ");

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
