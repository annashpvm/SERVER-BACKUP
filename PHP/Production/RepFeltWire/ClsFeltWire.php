<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFeltWireList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


  	case "loadFeltWireList":
             getFeltWireList();
            break;



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
    
   
  function getFeltWireList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $r = mysql_query("select sup.spvr_name supervisor, si.spvr_name shiftincharge, fw_supervisor, fw_shift_incharge, fw_suplier, fw_size, DATE_FORMAT(fw_mounteddate, '%d-%m-%Y')  fw_mounteddate, fw_mountedshift, fw_section, fw_wireno, fw_lifestatus, DATE_FORMAT(fw_removeddate, '%d-%m-%Y')  fw_removeddate, fw_removedshift, fw_prod_garantee, fw_prod_yield, fw_reason  from trn_dayprod_feltwire t , mas_supervisor si, mas_supervisor sup where fw_supervisor =  sup.spvr_code and fw_shift_incharge =  si.spvr_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
