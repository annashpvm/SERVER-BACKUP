<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$Dealercode  = $_POST['Dealercode'];
$Dealername  = strtoupper($_POST['Dealername']);
$Dealeradd1  = strtoupper($_POST['Dealeradd1']);
$Dealeradd2  = strtoupper($_POST['Dealeradd2']);
$Dealeradd3  = strtoupper($_POST['Dealeradd3']);
$Dealerpin   = $_POST['Dealerpin'];



if ($savetype === "Add")
{

	$query   = "select ifnull(max(dealer_code),0)+1 as dealercode from mas_dealer";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$Dealercode = $rec['dealercode'];

	$qry = "select count(*) as cnt from mas_dealer where dealer_name = '$Dealername'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_dealer values('$Dealercode','$Dealername','$Dealeradd1','$Dealeradd2','$Dealeradd3','$Dealerpin')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $Dealername . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $Dealername . '"})';
	}
     }
     else
     {

	  $query1="update mas_dealer set dealer_name = '$Dealername', dealer_add1 = '$Dealeradd1' , dealer_add2  = '$Dealeradd2', dealer_add3 = '$Dealeradd3',  dealer_pin   = '$Dealerpin' where dealer_code =$Dealercode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $Dealername . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $Dealername . '"})';
	   }
     } 
   
?>
