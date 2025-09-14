<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadVariety';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
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
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   
 function getVarietyList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select var_groupcode,var_desc from masprd_variety order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getvarietydetails()
    {
        mysql_query("SET NAMES utf8");
     	$grpcode = $_POST['grpcode'];
        $r=mysql_query("select * from masprd_variety a, masprd_type b where a.var_typecode = b.vargrp_type_code and a.var_groupcode = $grpcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
		
 function getallSizeList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select a.var_code,var_name,var_desc,var_grpcode,var_bf,var_gsm,var_size1, var_size2 ,var_inchcm,var_shade,
case var_inchcm when 'I' then 'Inch' else 'CMS' end as sizein,case var_shade when 'NS' then 'NAT'  when  'GY' then 'GYT'  when  'DP' then 'DP' when  'SY' then 'SHYS' when  'B' then 'GB' when  'VV' then 'SHVV+' when  'BB' then 'BB' end  as shade ,var_typecode ,vargrp_type_hsncode,var_sheets,var_reams from massal_variety a ,masprd_variety b , masprd_type c where b.var_typecode = c.vargrp_type_code and  a.var_grpcode = b.var_groupcode order by var_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getShades()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select  * from massal_shade order by shade_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getShadecode()
    {
        mysql_query("SET NAMES utf8");
     	$shadecode = $_POST['shadecode'];
        $r=mysql_query("select  * from massal_shade where shade_code =  '$shadecode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchSizelist()
    {
        mysql_query("SET NAMES utf8");

        $size  = $_POST['size'];
        $size = trim(str_replace(" ", "", $size)); 

  

        $qry = "select * from massal_variety where var_name like '$size%' order by var_name ";

//echo $qry;
//echo "<br>";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
