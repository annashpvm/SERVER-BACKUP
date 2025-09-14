<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


	$finid     = $_POST['fincode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];

	$filename  = $_POST['fname'];


	
        $result=mysql_query("call spacc_rep_json_DOCSUMMARY($compcode,'$finid','$startdate','$enddate')");
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



//$file = $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'."docsummary.json";
$file = $_SERVER["DOCUMENT_ROOT"].$filename;

if (file_put_contents($file,$jsondata2))
{
    $str = file_get_contents($file);
    echo '<pre>' . print_r($str, true) . '</pre>';
}
else
    echo("Failed");

    
?>




