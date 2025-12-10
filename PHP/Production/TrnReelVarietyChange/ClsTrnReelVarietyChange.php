<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadVariety';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
    		case "loadVariety":
		getVariety();
		break;
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 
	 function getVariety()
	    {
		mysqli_set_charset($conn, "utf8");
    	$sql = "select var_desc,var_groupcode from  masprd_variety  group by var_desc,var_groupcode order by var_desc");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }





?>
