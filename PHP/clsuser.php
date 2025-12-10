<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaduser';
	$task = $_POST['task'] ?? 'loaduser';

	mysqli_set_charset($conn, "utf8");

    switch($task){
	case "loaduser":
	getuser();
	break;
	case "loadcompany":
	getcompany();
	break;
	case "loadfinyear":
	getfinyear();
	break;
	case "loadmodule":
	getmodules();
	break;
	case "loadmoduleNew":
	getmodulesNew();
	break;
	case "modurl":
	getmodurl();
	break;

	case "findLoginName":
	getLoginName();
	break;
	case "findSubjectPassword":
	getSubjectPassword();
	break;

	case "find_Invoice_Number":
	check_Invoice_Number();
	break;

	case "find_Invoice_Number_Detail":
	check_Invoice_Number_Detail();
	break;

        default:
        echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getuser()
    {
		global $conn;  
//        $r=mysqli_query("select userid,username,userrole from usersmaster where useractive='Y'");

        //$r=mysqli_query("select usr_code as userid,usr_name as username,usr_type as userrole from mas_users where usr_code  in (3,6,7,13,15,17)");
        //$r=mysqli_query("select usr_code as userid,usr_name as username,usr_type as userrole from mas_users where usr_code  in (6)");
		$sql = "SELECT usr_code AS userid, usr_name AS username, usr_type AS userrole           FROM mas_users 
            WHERE usr_code IN (6)";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getcompany()
    {
		global $conn;  
		$sql = "SELECT company_code AS companycode, company_name AS companyname 
            FROM mas_company 
            WHERE company_code IN (1,90)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getfinyear()
    {
		global $conn;  

		$sql = "SELECT fin_code, fin_year FROM mas_finyear WHERE fin_code >= 22";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getmodules()
    {
		global $conn;

		$sql = "SELECT * FROM modulelist WHERE modactive='Y'";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
	
		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => $nrow, "results" => $arr]);
    }

 function getmodulesNew()
    {
		global $conn;
		$modulelst = $_POST['modulelist'];
	
		$sql = "SELECT * FROM modulelist WHERE modactive='Y' AND modseqno IN $modulelst";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
	
		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => $nrow, "results" => $arr]);
    }

 function getmodurl()
    {
		global $conn;
		$modulename = $_POST['modulename'];
		$user = $_POST['moduser'];
	
		$sql = "SELECT modurl FROM modulelist WHERE modname='$modulename'";
		$r = mysqli_query($conn, $sql);
	
		$nrow = mysqli_num_rows($r);
		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => $nrow, "results" => $arr]);
    }


 function getLoginName()
    {
		global $conn;
		$loginname = $_POST['loginname'];
	
		$sql = "SELECT * FROM userMaster WHERE usr_login = '$loginname'";
		$r = mysqli_query($conn, $sql);   // ✅ missing bracket fixed
	
		$nrow = mysqli_num_rows($r);
		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => $nrow, "results" => $arr]);
    }



 function getSubjectPassword()
    {
		global $conn;  
        
	$dept     = $_POST['dept'];
	$subject  = $_POST['subject'];

    $sql = "SELECT COUNT(*) AS nos, pw_password
            FROM mas_password
            WHERE pw_dept = '$dept' AND pw_subject = '$subject'";
    $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function check_Invoice_Number()
    {
		global $conn;  
        
	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$ledcode  = $_POST['ledcode'];
	$billno   = $_POST['billno'];


    $sql = "SELECT COUNT(*) AS no_of_rec  
            FROM acc_ref, acc_trail 
            WHERE acctrail_led_code = $ledcode 
              AND acctrail_inv_no = '$billno' 
              AND accref_comp_code = $compcode 
              AND accref_finid  = $fincode 
              AND accref_seqno  = acctrail_accref_seqno";

    $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function check_Invoice_Number_Detail()
    {
		global $conn;  
        
	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$ledcode  = $_POST['ledcode'];
	$billno   = $_POST['billno'];


    $sql = "SELECT * 
            FROM acc_ref, acc_trail 
            WHERE acctrail_led_code = $ledcode 
              AND acctrail_inv_no = '$billno' 
              AND accref_comp_code = $compcode 
              AND accref_finid  = $fincode 
              AND accref_seqno  = acctrail_accref_seqno";

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
