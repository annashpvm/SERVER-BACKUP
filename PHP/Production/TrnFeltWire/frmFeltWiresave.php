<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype      = $_POST['savetype'];
$compcode      = $_POST['compcode'];
$entryno       = $_POST['entryno'];
$mounteddate   = $_POST['mounteddate'];
$mountedshift  = $_POST['mountedshift'];
$supervisor    = (int) $_POST['supervisor'];
$shiftincharge = (int) $_POST['shiftincharge'];
$section       = $_POST['section'];
$size          = trim(strtoupper($_POST['size']));
$wireno        = $_POST['wireno'];
$supplier      = $_POST['supplier'];
$lifestatus    = $_POST['lifestatus'];
$reason        = $_POST['reason'];
$removeddate   = $_POST['removeddate'];
$removedshift  = $_POST['removedshift'];
$prodgarantee  = $_POST['prodgarantee'];
$prodyield     = $_POST['prodyield'];
if ($savetype === "Add")
{
	$query   = "select ifnull(max(fw_seqno),0)+1 as fw_seqno from trn_dayprod_feltwire where fw_compcode= $compcode";


	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$entryno = $rec['fw_seqno'];
}
else
{
	$query   = "delete from trn_dayprod_feltwire where fw_compcode= $compcode and fw_seqno = $entryno;";
	$result  = mysql_query($query);


}


	  $query1="insert into trn_dayprod_feltwire values('$compcode','$entryno','$supervisor','$shiftincharge','$supplier',
'$size','$mounteddate','$mountedshift','$section','$wireno','$lifestatus','$removeddate','$removedshift', '$prodgarantee','$prodyield' ,'$reason')";



	  $result1 = mysql_query($query1);

	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $wireno . '"})';
	} 
         else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $wireno . '"})';
	}


   
?>
