
<?php

    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$jsondata  = "";
$jsondata1 = "";
$jsondata2 = "";
$file = "";
ini_set('display_errors', 1);
error_reporting(E_ALL);

	$finid     = $_POST['fincode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	
	$filename  = $_POST['fname'];


$timestamp = strtotime($startdate);
$month = date("M", $timestamp); 
$year  = date("Y", $timestamp);





        $result=mysql_query("call spacc_rep_json_B2CS($compcode,'$finid','$startdate','$enddate')");


$temp = array();
while($row = mysql_fetch_assoc($result)) {
    $temp[] = array($row['jsonnew']);
}

$jsondata = stripslashes(json_encode($temp));



$jsondata1 = str_replace('[["','',$jsondata);
$jsondata2 = str_replace('}"]]','}',$jsondata1);


// $filename = "/SHVPM/Report/"."b2cs_".$month.$year.".json";

//$file = $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'."b2cs.json";
$file = $_SERVER["DOCUMENT_ROOT"].$filename;

//echo $file;

$str = '';
if (file_put_contents($file,$jsondata2))
{
 //   echo '<h3>JSON File Created Successfully:</h3>';
$str = file_get_contents($file);

echo '<pre>' . print_r($str, true) . '</pre>';

}

else
    echo("Failed");


// echo '({"success":"true","filename":"'.$filename.'"})';
   
?>




