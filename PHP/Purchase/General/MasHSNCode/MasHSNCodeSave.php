<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$mattype=strtoupper($_POST['mattype']);
$hcode=$_POST['hcode'];
$hsncode=$_POST['hsncode'];
$igst= (float)$_POST['igst'];
$cgst= (float)$_POST['cgst'];
$sgst= (float)$_POST['sgst'];
$savetype=$_POST['savetype'];


 //echo"$GroupName";

if ($savetype == "Add")
{
	$query = "select ifnull(max(hsn_sno),0)+1 as itemseq  from mas_hsncode";
	$result = mysql_query($query);
        $rec = mysql_fetch_array($result);
	$hcode=$rec['itemseq'];

	$query1="insert into mas_hsncode values($hcode,'$hsncode','$mattype','$igst','$cgst','$sgst')";
	$result1 = mysql_query($query1);

}
else
{

	$query1="update mas_hsncode set  hsn_code = '$hsncode' , hsn_type = '$mattype' , hsn_igst = '$igst' , hsn_cgst = '$cgst', hsn_sgst ='$sgst' where hsn_sno = $hcode";

//echo $query1;

	$result1 = mysql_query($query1);

}

  if ($result1) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $hsncode . '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $hsncode . '"})';
}
  
   
?>
