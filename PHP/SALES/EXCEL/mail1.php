

<?php

//Your authentication key
$authKey = "eNqHwfla5GAiTcOMPtWZmpgY10oXDVrBEFx4U79j2nhCzv6L3bRThucYS1dgCE8A5OfL0rF3tUjH6s79";

//Multiple mobiles numbers separated by comma
$mobileNumber = "9486927561";

//Sender ID,While using route4 sender id should be 6 characters long.
$senderId = "ANNADU";

//Your message to send, Add URL encoding here.
$message = urlencode("Test message - FROM PHP");

//Define route 
$route = "default";
//Prepare you post parameters
$postData = array(
    'authkey' => $authKey,
    'mobiles' => $mobileNumber,
    'message' => $message,
    'sender' => $senderId,
    'route' => $route
);

//API URL
$url="http://api.msg91.com/api/sendhttp.php";

// init the resource
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData
    //,CURLOPT_FOLLOWLOCATION => true
));


//Ignore SSL certificate verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


//get response
$output = curl_exec($ch);

//Print error if any
if(curl_errno($ch))
{
    echo 'error:' . curl_error($ch);
}

curl_close($ch);

echo $output;
?>


