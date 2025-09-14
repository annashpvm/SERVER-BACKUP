<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


	$finid     = $_POST['fincode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	
        $result=mysql_query("call spacc_rep_json($compcode,'$finid','$startdate','$enddate')");
/*
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
       $res = array($arr);
*/


$temp = array();
while($row = mysql_fetch_assoc($result)) {
    $temp[] = array($row['jsonnew']);
}

$jsondata = stripslashes(json_encode($temp));

//echo $jsondata;

$jsondata1 = str_replace('[["','',$jsondata);
$jsondata2 = str_replace('}"]]','}',$jsondata1);
echo $jsondata2;

//$row = mysql_fetch_assoc($result);
//echo stripslashes(json_encode($row));

//$chachi = json_decode(json_encode($row),JSON_UNESCAPED_SLASHES);
//return str(json_encode($row));


//echo '({"success":"true","json":"'.$jsondata2.'"})';
//echo '({"success":"true","vouno":"'.$vouno.'"})';
    
?>




