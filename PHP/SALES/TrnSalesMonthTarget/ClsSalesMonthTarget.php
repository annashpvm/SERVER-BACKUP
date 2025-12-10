<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){

		case "loadMissingCustomer":
		getMissingCustomer();
		break;

		case "loadRepresentative":
		getRepresentative();
		break;

		case "loadCustomerList":
		getCustomerList();
		break;

		case "loadCustomerList2":
		getCustomerList2();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getRepresentative()
    {
       global $conn;  

        $sql = "select * from massal_repr";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getCustomerList()
    {
       global $conn;  

        $Repcode = $_POST['repcode'];
        
//$sql = "select (@count:=@count+1)  as sno,cust_code, cust_ref,cust_cr_days,cust_desp_target from massal_customer, massal_repr where cust_repr = repr_code and repr_code = '$Repcode'");

        $r = mysqli_query($conn,"call sp_sal_repcustomer('$Repcode');");
        
	$nrow = mysqli_query($r);

	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMissingCustomer()
    {
       global $conn;  

        
        $sql = "SELECT *  FROM massal_customer WHERE cust_code NOT IN (SELECT customer_code FROM massal_target )";
        $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);

	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getCustomerList2()
    {
       global $conn;  

        $Repcode = $_POST['repcode'];
        $repmonth = $_POST['repmonth'];
        $repyear = $_POST['repyear'];

   
        $sql = "CALL sp_sal_repcustomer2('$Repcode', '$repmonth', '$repyear')";
        $r = mysqli_query($conn, $sql);
           
	$nrow = mysqli_num_rows($r);

	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
