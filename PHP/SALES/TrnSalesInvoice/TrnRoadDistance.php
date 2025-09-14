<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$point1 = 626127;
$point2 = 624208;
/*
calc_distance($point1, $point2);

function calc_distance($point1, $point2)
{
    $distance = (3958 * 3.1415926 * sqrt(
            ($point1['lat'] - $point2['lat'])
            * ($point1['lat'] - $point2['lat'])
            + cos($point1['lat'] / 57.29578)
            * cos($point2['lat'] / 57.29578)
            * ($point1['long'] - $point2['long'])
            * ($point1['long'] - $point2['long'])
        ) / 180);

    echo '({"success":"true","distance":"' . $distance . '"})';
  //  return $distance;
}
*/

$distance = getDistance('626127','624208','K');
echo $distance;

    echo '({"success":"true","distance":"' . $distance . '"})';


function getLnt($zip){

echo $zip;

$url = "http://maps.googleapis.com/maps/api/geocode/json?address=
".urlencode($zip)."&sensor=false";
$result_string = file_get_contents($url);
echo $result_string;
$result = json_decode($result_string, true);
$result1[]=$result['results'][0];
$result2[]=$result1[0]['geometry'];
$result3[]=$result2[0]['location'];
return $result3[0];
}


function getDistance($zip1, $zip2, $unit){
	$first_lat = getLnt($zip1);
	$next_lat = getLnt($zip2);
	$lat1 = $first_lat['lat'];
	$lon1 = $first_lat['lng'];
	$lat2 = $next_lat['lat'];
	$lon2 = $next_lat['lng']; 
	$theta=$lon1-$lon2;
	$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +
	cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
	cos(deg2rad($theta));
	$dist = acos($dist);
	$dist = rad2deg($dist);
	$miles = $dist * 60 * 1.1515;
	$unit = strtoupper($unit);

echo $dist;
echo	$dist ;
echo	$miles;
echo	$unit;


	if ($unit == "K"){
	return ($miles * 1.609344)." ".$unit;
	}
	else if ($unit =="N"){
	return ($miles * 0.8684)." ".$unit;
	}
	else{
	return $miles." ".$unit;
	}

}

?>


