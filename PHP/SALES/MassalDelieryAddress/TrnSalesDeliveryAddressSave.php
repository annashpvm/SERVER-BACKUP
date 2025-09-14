<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$ordhparty= $_POST['ordhparty'];

$ordhdeliveryadd1= strtoupper($_POST['ordhdeliveryadd1']);
$ordhdeliveryadd2= strtoupper($_POST['ordhdeliveryadd2']);
$ordhdeliveryadd3= strtoupper($_POST['ordhdeliveryadd3']);
$ordhdeliverycity= strtoupper($_POST['ordhdeliverycity']);
$ordhdeliverypin=  $_POST['ordhdeliverypin'];
$ordhdeliverygst=  strtoupper($_POST['ordhdeliverygst']);
$statecode=  $_POST['statecode'];
mysql_query("BEGIN");



$query1 = "select count(*) as nos from trnsal_delivery_address where d_custcode = $ordhparty";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$custfound = $rec1['nos'];
//echo $query1;

if ($custfound ==0) {
   $query2 = "insert into trnsal_delivery_address values('$ordhparty','$ordhdeliveryadd1','$ordhdeliveryadd2', '$ordhdeliveryadd3', '$ordhdeliverycity','$ordhdeliverypin','$ordhdeliverygst',$statecode)";
   $result2 = mysql_query($query2); 
echo $query2;
}
else
{
   $query2 = "update trnsal_delivery_address set
delivery_add1 = '$ordhdeliveryadd1' , delivery_add2 = '$ordhdeliveryadd2', delivery_add3 = '$ordhdeliveryadd3', delivery_city = '$ordhdeliverycity' , delivery_pin = '$ordhdeliverypin', delivery_gst = '$ordhdeliverygst' , delivery_state = '$statecode'  where d_custcode =  $ordhparty";
   $result2=mysql_query($query2); 
}

	if ($result2 )  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ordhparty . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $ordhparty . '"})';

	}
   
?>
