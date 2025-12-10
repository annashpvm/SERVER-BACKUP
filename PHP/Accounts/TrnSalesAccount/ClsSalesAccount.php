<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

    switch($task){
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "findPartyType":
		getPartyType();
		break;
		case "LoadSalVouNoDetails":
		getSalVouNoDetails();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    



 function getCGSTledgers()
 {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'CGST'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'SGST'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like 'IGST%$gstper%'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSearchPartylist()
    {
        global $conn;


        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        $sql = "select * from massal_customer where cust_type <> 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPartyType()
    {
        global $conn;

        $partydrcr = $_POST['partydrcr'];
        $partycode = $_POST['partycode'];

        $sql = "select cust_state statecode from massal_customer where cust_code = $partycode" ;

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSalVouNoDetails()
    {
        global $conn;

        $compcode = $_POST['compcode'];
        $finid    = $_POST['fincode'];
        $vouno    = $_POST['vouno'];
        $sql = "select * from  acc_direct_sales , massal_customer where cust_code = sal_partycode and  sal_compcode = '$compcode' and sal_finid = '$finid' and sal_vouno = '$vouno'" ;
           
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
