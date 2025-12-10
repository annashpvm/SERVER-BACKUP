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

		case "loadSubjectList":
		getSubjectList();
		break;

		case "loadSubjectPassword":
		getSubjectPassword();
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
	
   
 function getSubjectList()
    {
        global $conn;
        $dept =  $_POST['dept'];  
        $sql = "select * from mas_password where pw_dept = '$dept'  order by pw_subject" ;
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   function getSubjectPassword()
    {
        global $conn;
        $dept    =  $_POST['dept'];
        $subject =  $_POST['subject'];
  
        $sql = "select * from mas_password where pw_dept = '$dept' and pw_subject = '$subject' order by pw_subject" ;
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 



?>
