<?php
	
// input data through array
$array = Array (
	"0" => Array (
		"id" => "7020",
		"name" => "Bobby",
		"Subject" => "Java"
	),
	"1" => Array (
		"id" => "7021",
		"name" => "ojaswi",
		"Subject" => "sql"
	)
);

// encode array to json
$json = json_encode($array);
//display it
echo "$json";
//generate json file
file_put_contents("annadata.json", $json);

//localStorage.setItem("annadata",JSON.stringify($json));

//var annadata1 = JSON.parse(localStorage.getItem("annadata"))[0];

//console.log(annadata1.Post_id);
//console.log(annadata1.Post_title);
//console.log(annadata1.Post_body);
//console.log(annadata1.Post_time);

?>

