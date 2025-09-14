<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$savetype = $_POST['savetype'];
$itemcode = $_POST['itemcode'];
$itemname = strtoupper($_POST['itemname']);
$uom      = $_POST['uom'];
$hsn      = $_POST['hsn'];
$cgst     = $_POST['cgst'];
$sgst     = $_POST['sgst'];
$igst     = $_POST['igst'];
$salesledcodetn =$_POST['salesledcodetn'];
$salesledcodeos =$_POST['salesledcodeos'];

$cgstledcode = $_POST['cgstledcode'];
$sgstledcode = $_POST['sgstledcode'];
$igstledcode = $_POST['igstledcode'];




if ($savetype == "Add")
{

	 $query1 = "select IFNULL(max(salitem_code),0)+1 as itemcode from mas_othersales_item_master";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $itemcode=$rec1['itemcode'];
 
	$qry    = "select count(*) as cnt from mas_othersales_item_master where salitem_name  = '$itemname'";
//echo $qry;
//echo "<br>";


	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt    = $recgrp['cnt']; 


//echo $cnt;

         mysql_query("BEGIN");

         if ($cnt == 0  )
         { 
	 $query3= "insert into mas_othersales_item_master values ('$itemcode',ucase('$itemname'),'$uom','$hsn','$cgst','$sgst','$igst','$salesledcodetn','$salesledcodeos','$cgstledcode','$sgstledcode','$igstledcode')";

	 $result3=mysql_query($query3);
         }
}

else if ($savetype == "Edit")
        {
 $query3= "update mas_othersales_item_master set salitem_name = ucase('$itemname') , salitem_uom = '$uom', salitem_hsn = '$hsn', salitem_cgstper = '$cgst', salitem_sgstper = '$sgst', salitem_igstper = '$igst', salitem_salesledcode_tn = '$salesledcodetn', salitem_salesledcode_os = '$salesledcodeos', salitem_cgstledcode = '$cgstledcode', salitem_sgstledcode = '$sgstledcode', salitem_igstledcode = '$igstledcode' where salitem_code =  '$itemcode'";

//echo $query3;

  $result3=mysql_query($query3); 
        }


if ($savetype === "Add") {
	if ($result3 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","item":"' . $itemname . '"})';
	} 
	else if ($cnt>0) {
	 mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	}
	 else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","item":"' . $itemname . '"})';
	}
}
if ($savetype === "Edit"){
	if ($result3) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","item":"' . $itemname . '"})';
	} 
	 else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","item":"' . $itemname . '"})';
	}
}

?>
