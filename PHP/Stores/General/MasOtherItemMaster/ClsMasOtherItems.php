<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadscrapitemcode":
		getscrapitemcode();
		break;  

		case "loadscrapitem":
		getscrapitem();
		break;    
		case "loaduom":
		getuom();
		break;
		case "loadhsncode":
		gethsncode();
		break;
		case "loadscrapitemledger":
		getscrapitemledger();
		break;	
		case "loadsalestax":
		getsalestax();
		case "loadSalesledgers":
		getSalesledgers();
		break;
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;	
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  function getscrapitem()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select mas_othersales_item_master.salitem_code, salitem_name, salitem_uom, uom.uom_short_name,salitem_hsn,hsn_type  from mas_othersales_item_master INNER JOIN mas_uom as uom ON salitem_uom = uom_code LEFT OUTER JOIN mas_hsncode ON hsn_code = salitem_hsn");

        $sql = "select a.* ,f.uom_short_name ,b.cust_code as salesledcodetn,b.cust_name as saleslednametn ,c.cust_code as cgstledcode,c.cust_name as cgstledname   ,d.cust_code as sgstledcode,d.cust_name as sgstledname  ,e.cust_code as igstledcode,e.cust_name as igstledname ,g.cust_code as salesledcodeos,g.cust_name as saleslednameos   from mas_othersales_item_master a, massal_customer b , massal_customer c , massal_customer d , massal_customer e ,mas_uom f  , massal_customer g  where a.salitem_salesledcode_tn = b.cust_code and a.salitem_cgstledcode = c.cust_code and a.salitem_sgstledcode = d.cust_code and a.salitem_igstledcode = e.cust_code and a.salitem_uom = f.uom_code and a.salitem_salesledcode_os = g.cust_code  order by salitem_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getscrapitemcode()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select max(salitem_code) +1 as itemcode from mas_othersales_item_master");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getuom()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from mas_uom");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function gethsncode()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from mas_hsncode");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
  function getscrapitemledger()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from massal_customer");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
   
  function getsalescountry()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from mas_country");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

   
  function getsalestax()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from mas_tax");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 


 function getSalesledgers()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select * from massal_customer where cust_type = 'G' and cust_name like '%SALES%' order by cust_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getCGSTledgers()

    {

        mysqli_set_charset($conn, "utf8");
        $sql = "select * from massal_customer where cust_name like 'CGST'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSGSTledgers()

    {

        mysqli_set_charset($conn, "utf8");
        $sql = "select * from massal_customer where cust_name like 'SGST'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIGSTledgers()

    {

        mysqli_set_charset($conn, "utf8");
        $sql = "select * from massal_customer where cust_name like 'IGST%@%'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



?>
