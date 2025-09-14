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



//echo $jsondata2;

$file = $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'."gstr1.json";

if (file_put_contents($file,$jsondata2))
{
    $str = file_get_contents($file);
    echo '<pre>' . print_r($str, true) . '</pre>';
}
else
    echo("Failed");

    




/*

$myfile = fopen("gstjson.json", "w") or die("Unable to open file!");

fwrite($myfile, $jsondata2);

fclose($myfile);

$file = 'gstjson.json';

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    flush();
    readfile($file);
    exit;
}

echo file_get_contents("gstjson.json");

*/

//$response = file_get_contents("10.0.0.151/SHVPM/Accounts/RepGST/ClsJSON.php");

//echo $response;



//$myfile = fopen("gstjson.json"", "r") or die("Unable to open file!");
//echo fread($myfile,filesize("gstjson.json"));
//fclose($myfile);


//$row = mysql_fetch_assoc($result);
//echo stripslashes(json_encode($row));

//$chachi = json_decode(json_encode($row),JSON_UNESCAPED_SLASHES);
//return str(json_encode($row));


//echo '({"success":"true","json":"'.$jsondata2.'"})';
//echo '({"success":"true","vouno":"'.$vouno.'"})';
    
?>




