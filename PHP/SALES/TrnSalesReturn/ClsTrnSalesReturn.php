<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSalesReturnNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from ExtF
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadSalesReturnNo":
		getSalesReturnNo();
		break;
		case "loadSRNolist":
		getSRNolist();
		break;
		case "loadSRNodetail":
		getSRNodetail();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadinvno":
		getinvno();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadsrno":
		getstartno();
		break;
//		case "loadpackslipdet":
//		getpackslipdet();
//		break;
		case "loadpackslipdespatchdetails":
		getpackslipdespatchdetails();
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
    

 function getSalesReturnNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(reth_no),0)+1 as retno from trnsal_salret_header where reth_fincode= $finid and reth_comp_code= $compcode ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSRNolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select reth_no  from trnsal_salret_header where reth_fincode= $finid and reth_comp_code= $compcode group by reth_no  order by reth_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSRNodetail()
    {
      mysql_query("SET NAMES utf8");
      $finid    = $_POST['finid']; 
      $compcode = $_POST['compcode'];
      $srno     = $_POST['srno'];


      $r=mysql_query("select a.*,b.*,d.*,e.*,g.* ,c.cust_ref as partyname from trnsal_salret_header a, trnsal_salret_trailer b, massal_customer c, massal_variety d, trnsal_invoice_header e,  massal_tax g  where  a.reth_no = b.rett_no and a.reth_fincode = b.rett_fincode  and a.reth_cust = c.cust_code and b.rett_var = d.var_code  and a.reth_invno = e.invh_invrefno and e.invh_taxtag = g.tax_code and   a.reth_comp_code = b.rett_comp_code  and  a.reth_fincode >= e.invh_fincode and  a.reth_comp_code = e.invh_comp_code  and a.reth_comp_code = '$compcode'  and a.reth_fincode =   '$finid'  and a.reth_no = '$srno'");  


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
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r="select cust_ref,cust_code from trnsal_invoice_header a,massal_customer b, trnsal_packslip_header c, trnsal_packslip_trailer d where a.invh_party = b.cust_code  and a.invh_fincode = $fincode and a.invh_invrefno = c.pckh_invno And a.invh_date = c.pckh_invdt and c.pckh_no = d.pckt_no and c.pckh_fincode =  d.pckt_fincode and d.pckt_rettag <> 'T' and a.invh_comp_code = d.pckt_comp_code and a.invh_comp_code = $compcode group by cust_code,cust_ref order by cust_ref";

//echo $r;


        $r=mysql_query("select cust_ref,cust_code from trnsal_invoice_header a,massal_customer b, trnsal_packslip_header c, trnsal_packslip_trailer d where a.invh_party = b.cust_code  and a.invh_fincode = $fincode and a.invh_invrefno = c.pckh_invno And a.invh_date = c.pckh_invdt and c.pckh_no = d.pckt_no and c.pckh_fincode =  d.pckt_fincode and d.pckt_rettag <> 'T' and a.invh_comp_code = d.pckt_comp_code and a.invh_comp_code = $compcode group by cust_code,cust_ref order by cust_ref ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getinvno()
	{
	mysql_query("SET NAMES utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
        $r=mysql_query("select invh_invrefno as inv_no,cust_code from trnsal_invoice_header a,trnsal_packslip_header b, trnsal_packslip_trailer c, massal_customer d where a.invh_invrefno = b.pckh_invno And b.pckh_no = c.pckt_no and a.invh_party = b.pckh_party  and a.invh_fincode = b.pckh_fincode and a.invh_fincode = $fincode and c.pckt_rettag <> 'T' and a.invh_comp_code = b.pckh_comp_code and a.invh_comp_code = $compcode and a.invh_party = d.cust_code and a.invh_party = $custcode group by invh_invrefno,cust_code order by invh_invrefno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getsize()
{
mysql_query("SET NAMES utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];


        $r=mysql_query("select var_code,var_name,invh_date,invh_our_ordno,invh_taxtag,invh_insper,invh_totwt,pckh_no,pckh_date,cust_ref, tax_name,tax_sal_led_code,invh_sgst_per,invh_cgst_per,invh_igst_per,tax_cgst_ledcode,invt_hsncode, invh_tcs_per,invh_frt_rate,invh_frt_amt  from trnsal_invoice_header a,trnsal_packslip_header b, trnsal_packslip_trailer c, massal_variety d, massal_customer e, massal_tax g , trnsal_invoice_trailer h where a.invh_seqno = h.invt_seqno and  a.invh_invrefno = '$invno' and  b.pckh_invno = a.invh_invrefno and b.pckh_no = c.pckt_no and a.invh_party = e.cust_code  and  a.invh_fincode =$fincode and  b.pckh_fincode = a.invh_fincode  and c.pckt_fincode = b.pckh_fincode and a.invh_comp_code = $compcode  And b.pckh_comp_code = a.invh_comp_code And b.pckh_comp_code = c.pckt_comp_code  and  a.invh_taxtag = g.tax_code and c.pckt_size = d.var_code and c.pckt_rettag <> 'T' and b.pckh_fincode = a.invh_fincode And b.pckh_fincode = c.pckt_fincode and b.pckh_no = invh_slipno group by var_code,var_name,invh_date,invh_our_ordno,invh_taxtag,invh_insper,invh_totwt ,pckh_no,pckh_date,cust_ref,tax_name,tax_sal_led_code,invh_sgst_per,invh_cgst_per,invh_igst_per,tax_cgst_ledcode,
invt_hsncode, invh_tcs_per,invh_frt_rate,invh_frt_amt");



$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getstartno()
{
mysql_query("SET NAMES utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$size = $_POST['size'];
	$slipno = $_POST['slipno'];

        $r=mysql_query("
select pckt_sr_no as no,pckt_srno_fincode as fincode from trnsal_packslip_trailer where pckt_no = '$slipno' and pckt_fincode = '$fincode'
and pckt_comp_code = '$compcode' and pckt_size = '$size' and pckt_rettag <> 'T' order by pckt_sr_no");
$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

/*
function getpackslipdet()
{
mysql_query("SET NAMES utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$size = $_POST['size'];
	$slipno = $_POST['slipno'];
	$startno = $_POST['startno'];
	$endno = $_POST['endno'];
        $r=mysql_query("
select * from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_variety c where b.pckt_no = $slipno
and b.pckt_size = $size and b.pckt_size = c.var_code  and b.pckt_sr_no >= $startno and b.pckt_sr_no <= $endno
and b.pckt_fincode = $fincode and a.pckh_no = b.pckt_no and b.pckt_comp_code = $compcode and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode");
$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}
*/

function getpackslipdespatchdetails()
{
mysql_query("SET NAMES utf8");
	$size = $_POST['size'];
	$startno = $_POST['nofrom'];
	$endno = $_POST['noto'];
        $unit   = $_POST['unit'];  
	$compcode = $_POST['compcode'];
	$fincode = $_POST['finid'];
	$slipno = $_POST['slipno'];

        $r=mysql_query("select var_name,pckt_size as itemcode,pckt_sr_no,pckt_wt,invt_urate,pckt_srno_fincode,invt_hsncode  from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_variety c , trnsal_invoice_trailer d , trnsal_invoice_header e    
where b.pckt_no = $slipno and b.pckt_size = $size and b.pckt_size = c.var_code  and b.pckt_sr_no >= $startno and b.pckt_sr_no <= $endno and b.pckt_fincode = $fincode and a.pckh_no = b.pckt_no and b.pckt_comp_code = $compcode and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and a.pckh_comp_code = d.invt_compcode and a.pckh_fincode = d.invt_fincode and a.pckh_invno = e.invh_invrefno  and e.invh_seqno =  d.invt_seqno and b.pckt_size = d.invt_var and a.pckh_comp_code = e.invh_comp_code and a.pckh_fincode = e.invh_fincode  order by pckt_sr_no");

$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

?>
