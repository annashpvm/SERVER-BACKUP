<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadSalesLedger";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "LoadSalesLedger":
		getLedgerList();
		break;
		case "LoadInvtype":
		getInvtype();
		break;
		case "LoadgstLedger":
		getgstledger();
		break;
		case "LoadTaxList":
		getgstlist();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadSearchGSTLedgerlist":
            getsearchgstlist();
            break;
    
            case "LoadGSTDetails":
            findGSTDetails();
            break;

            case "loadSearchLedgerlist":
                getSearchLedgerlist();
                break;
        
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getLedgerList()
    {
        global $conn; 

        $sql = "select * from acc_ledger_master where led_type = 'G' and led_name like '%SALES%'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getgstledger()
    {
        global $conn; 
        $gsttype = $_POST['gsttype'];
        $gst = $_POST['gst'];

//        $gsttype = '%CGST%LIA%';
//        $gst = '2.5';



     $sql = "select * from massal_customer where cust_type = 'G' and cust_name like '%INPUT%$gsttype%$gst%'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getgstlist()
    {
        global $conn; 
        $sql = "select * from mas_RMFU_purchasetax  order by tax_purname";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getInvtype()
    {
        global $conn; 

        $sql = "select * from massal_invtype where type_code <6";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
		

function getPurGroup()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
    global $conn; 
         $sql = "select * from acc_ledger_master  where led_type = 'G' and  led_grp_code in (74,75,102) and (led_name like '%FUEL%'  or led_name like '%COAL%' or led_name like '%WASTE%')  order by led_name ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




    function getsearchgstlist()
    {
        global $conn; 
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

        $sql = "select * from maspur_gsttax where replace(replace(tax_pur_ledname,' ','')  ,'.','')  like '%$ledname%'  order by tax_pur_ledname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function findGSTDetails()
    {
        global $conn; 
        $ledcode = $_POST['ledcode'];

        $sql = "select * from maspur_gsttax where tax_pur_ledcode = $ledcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   
    function getSearchLedgerlist()
    {
        global $conn; 


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

         $sql = " select cust_code,cust_ref,cust_name from
(select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_name regexp '$ledname' and cust_acc_group not in (46,44,85,72)
union all
select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_name regexp '$ledname' and cust_acc_group in (74,75) order by cust_name ) a where left(cust_name,2) != 'ZZ'  group by cust_code,cust_ref,cust_name order by cust_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 



?>
