<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSONo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadSONo":
		getSONo();
		break;
		case "loadReelNo":
		getReelNo();
		break;
		case "loadWeight":
		getWeight();
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
    

function getSONo()
{
 mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select stk_sono from trnsal_finish_stock where stk_comp_code =  1 and stk_destag = 'C' group by stk_sono order by stk_sono asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getReelNo()
{
 mysql_query("SET NAMES utf8");
	$sono = $_POST['sono'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select stk_sr_no from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = 'C' and stk_sono = '$sono' order by stk_sr_no asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getWeight()
{
 mysql_query("SET NAMES utf8");
	$sono = $_POST['sono'];
	$reelno = $_POST['reelno'];
        $r=mysql_query("select stk_wt from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = 'C' and stk_sono = '$sono'  and stk_sr_no = '$reelno' ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



?>
