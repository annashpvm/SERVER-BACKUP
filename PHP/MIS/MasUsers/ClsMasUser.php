<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadDepartment';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadDepartmentList":
		getDepartments();
		break;

		case "loadUsersList":
		getUsersList();
		break;

		case "loadUserDetails":
		getUserDetails();
		break;

		case "loadModuleList":
		getModuleList();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getDepartments()
    {
        global $conn;

        $sql = "select department_code,department_name from mas_department order by department_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
   
 function getUsersList()
    {
        global $conn;
        $dept =  $_POST['deptcode'];  
        $sql = "select usr_name, usr_code from   userMaster where usr_dept = $dept order by usr_name " ;
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   
 function getUserDetails()
    {
        global $conn;
        $user =  $_POST['usrcode'];  
        $sql = "select *  from   userMaster where usr_code = $user";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function getModuleList()
    {
        global $conn;

        $sql = "select * ,'NO' rights from modulelist where modactive = 'Y'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
