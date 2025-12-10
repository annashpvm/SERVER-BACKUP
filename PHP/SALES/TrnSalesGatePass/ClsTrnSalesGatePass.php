<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadfindgpNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadfindgpNo":
		getfindgpno();
		break;    
		case "loadvehicleno":
		getvehiclelist();
		break;
		case "loadvehiclenodetail":
		getvehicledetail();
		break;
		case "loadvehiclenodetailsinvoice":
		getvehicledetailsinvoice();
		break;
		case "loadpartydetailsinvoice":
		getpartydetails();
		break;

		case "checkgatepassno":
		CheckGPentry();
		break;

		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  function getfindgpno()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode =  $_POST['compcode'];
        $finid = $_POST['finid'];

        $sql = "select ifnull(max(gp_no),0)+1 as gp_no from  trnsal_gate_pass where gp_fincode  = $finid  and gp_compcode = $compcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getgpnolist()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode =  $_POST['compcode'];
        $finid = $_POST['finid'];

        $sql = "select gp_no from  trnsal_gate_pass where gp_fincode  = $finid  and gp_compcode = $compcode group by gp_no  order by gp_no desc");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getvehiclelist()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $gpdate = $_POST['gpdate'];
	$sql = "select invh_vehi_no from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' group by invh_vehi_no");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
  function getvehicledetail()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $gpdate = $_POST['gpdate'];
        $vechileno = $_POST['vechileno'];
	$sql = "select * from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_vehi_no  = '$vechileno' ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
  function getvehicledetailsinvoice()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $invfrom   = $_POST['invfrom'];
        $invto     = $_POST['invto'];
	$sql = "select * from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_no >= '$invfrom' and invh_no <= '$invto'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



  function getpartydetails()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $invfrom   = $_POST['invfrom'];
        $invto     = $_POST['invto'];
	$sql = "select count(*) as nos from (select invh_party from trnsal_invoice_header where invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_no >= '$invfrom' and invh_no <= '$invto' group by invh_party ) aa");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    

  function CheckGPentry()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $vechileno = $_POST['vechileno'];
        $sql = "select * from trnsal_gate_pass where gp_date  =  '$gpdate' and gp_truck = '$vechileno'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
