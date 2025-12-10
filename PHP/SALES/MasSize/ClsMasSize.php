<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadVariety';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadVariety":
		getVarietyList();
		break;
		case "findvarietydetails":
		getvarietydetails();
		break;
		case "loadallSizeDetails":
		getallSizeList();
		break;
		case "loadShade":
		getShades();
		break;
		case "findShadecode":
		getShadecode();
		break;
		case "loadSearchSizelist":
		getSearchSizelist();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getVarietyList()
    {
        global $conn;  

        $sql = "select var_groupcode,var_desc from masprd_variety order by var_desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getvarietydetails()
    {
        global $conn;  
     	$grpcode = $_POST['grpcode'];
        $sql = "select * from masprd_variety a, masprd_type b where a.var_typecode = b.vargrp_type_code and a.var_groupcode = $grpcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
		
 function getallSizeList()
    {
        global $conn;  
        $sql = "select a.var_code,var_name,var_desc,var_grpcode,var_bf,var_gsm,var_size1, var_size2 ,var_inchcm,var_shade,
case var_inchcm when 'I' then 'Inch' else 'CMS' end as sizein,case var_shade when 'NS' then 'NAT'  when  'GY' then 'GYT'  when  'DP' then 'DP' when  'SY' then 'SHYS' when  'B' then 'GB' when  'VV' then 'SHVV+' when  'BB' then 'BB' end  as shade ,var_typecode ,vargrp_type_hsncode,var_sheets,var_reams from massal_variety a ,masprd_variety b , masprd_type c where b.var_typecode = c.vargrp_type_code and  a.var_grpcode = b.var_groupcode order by var_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getShades()
    {
        global $conn;  
        $sql = "select  * from massal_shade order by shade_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

    }

 function getShadecode()
    {
        global $conn;  
     	$shadecode = $_POST['shadecode'];
        $sql = "select  * from massal_shade where shade_code =  '$shadecode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchSizelist()
    {
        global $conn;  

        $size  = $_POST['size'];
        $size = trim(str_replace(" ", "", $size)); 

  

        $sql = "select * from massal_variety where var_name like '$size%' order by var_name ";

//echo $qry;
//echo "<br>";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
