<?php
    require($_SERVER["DOCUMENT_ROOT"]."/conn.php");



    $task='loadsupervisor';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupervisor":
		spvrmain();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   
 function spvrmain()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select spvr_code, spvr_name,spvr_type,case when spvr_type='M' then 'MACHINE OPERATOR'
 when spvr_type='S' then 'SHIFT INCHARGE'  when spvr_type='R' then 'REWINDER OPERATOR'end as stype
 from mas_supervisor order by spvr_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 

?>
