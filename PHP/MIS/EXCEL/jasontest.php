<?php 
    
// input data  through array
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
file_put_contents("geeks_data.json", $json);
  
?>
