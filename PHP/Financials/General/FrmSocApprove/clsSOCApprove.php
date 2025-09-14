<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSOCdet';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadSOCdet":
		getSOCdet();
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
            $data= $json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    

 function getSOCdet()
    {

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select a.*,e.*,b.*,c.*,d.cust_ref as agentname,f.*,g.var_desc 
from trnsal_order_header a, massal_customer b,  massal_tax c , vew_sal_agent d ,trnsal_order_trailer e ,massal_variety f ,masprd_variety g 
where a.ordh_ackno = e.ordt_ackno and a.ordh_fincode = e.ordt_fincode 
	and a.ordh_comp_code = e.ordt_comp_code and  a.ordh_party = b.cust_code 
    And a.ordh_tax = c.tax_code And a.ordh_agent = d.cust_code And a.ordh_fincode = '$finid' 
    And a.ordh_comp_code = '$compcode'  and e.ordt_var_code = f.var_code and f.var_grpcode = g.var_code 
    and ordt_approved = 'N'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }       
?>
