<?php
$senderID = $_POST['senderid'];
$mobile = $_POST['mobile'];
$message = $_POST['message'];
	/*MESSAGE CODE*/
	/* Your authentication key */
	$authKey = "234557688009432n";
	/* Multiple mobiles numbers separated by comma */
	$mobileNumber = $mobile;
	/* Sender ID,While using route4 sender id should be 6 characters long. */
	$senderId = $senderID;
	/* Your message to send, Add URL encoding here. */
	
	$message = urlencode($message);
	/* Define route */
	$route = "route=4";
	/* Prepare you post parameters */
	$postData = array(
		'authkey' => $authKey,
		'mobiles' => $mobileNumber,
		'message' => $message,
		'sender' => $senderId,
		'route' => $route
	);
	/* API URL*/
	$url="https://www.fast2sms.com/dev/bulk";
	/* init the resource */
	$ch = curl_init();
	curl_setopt_array($ch, array(
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => $postData
		/*,CURLOPT_FOLLOWLOCATION => true */
	));
	/* Ignore SSL certificate verification */
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	/* get response */
	$output = curl_exec($ch);
	/* Print error if any */
	if(curl_errno($ch))
	{
		echo 'error:' . curl_error($ch);
	}
	else{
		$array = array(
			"message"    => $output
		);
	}
	curl_close($ch);
	//MESSAGE CODE END
	print json_encode($array);
?>
