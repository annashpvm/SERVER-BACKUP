
<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

$grpcode = $_POST['grpcode'];

echo $task;

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
        switch($task){
		case "loadmillname":
		loadMillList();
		break;
		case "findmillname":
		getmillname();
		break;
		case "loadFinYear":
		loadFinYear();
		break;
		case "loadVariety":
		getVarietyList();
		break;
		case "loadSizeDetails":
		getSizeList();
		break;
		case "loadSizeDetailsOfVariety":
		getSizeListOfVariety();
		break;
		case "loadAllCustomerDetails":
		getAllCustomerList();
		break;
		case "findSizeDetails":
		getSizecodeDetails();
		break;
		case "loadGSTDetails":
		getAllGSTDetails();
		break;
		case "findGSTDetails":
		getGSTDetails();
		break;
		case "loadLedgers":
		getLedgerList();
		break;
	default:
                echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  	
 function loadMillList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select comp_code,comp_name from mas_company");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
    function getmillname()
    {
        mysqli_set_charset($conn, "utf8");
     	$mname = $_POST['millcode'];
        $sql = "select comp_pass from mas_company where comp_code = $mname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function loadFinYear()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select * from mas_finyear order by fin_code");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   
 function getVarietyList()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select var_code,var_desc from masprd_variety");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSizeList()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select var_code,var_name from massal_variety");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getSizeListOfVariety()
    {
        mysqli_set_charset($conn, "utf8");
     	$grpcode = $_POST['grpcode'];
        $sql = "select b.var_code,b.var_name,b.var_grpcode from masprd_variety a,massal_variety b where b.var_grpcode = a.var_code and var_grpcode =$grpcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getAllCustomerList()
    {
        mysqli_set_charset($conn, "utf8");
       $sql = "select cust_code,cust_ref from massal_customer");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAllGSTDetails()
    {
        mysqli_set_charset($conn, "utf8");
       $sql = "select tax_code,tax_name from mas_tax");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getGSTDetails()
    {
        mysqli_set_charset($conn, "utf8");
   	$taxcode = $_POST['taxcode'];
       $sql = "select * from mas_tax where tax_code = $taxcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSizecodeDetails()
    {
        mysqli_set_charset($conn, "utf8");

   	$sizecode = $_POST['sizecode'];
        $sql = "select var_size1,var_size2,var_desc,var_gsm,var_unit,var_sheets,var_reams,var_tariffno from massal_variety a,masprd_variety b where a.var_grpcode = b.var_code and a.var_code = $sizecode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getLedgerList()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select led_code,led_name from mas_ledger");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>



