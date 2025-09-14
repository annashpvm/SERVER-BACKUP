<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $savetype  = $_REQUEST['saveflag'];
    $entryno   = $_REQUEST['entryno'];
    $entrydate = $_REQUEST['entrydate'];
    $uptodate  = $_REQUEST['uptodate'];
    $custcode  = $_REQUEST['custcode'];


    $today = date("Y-m-d H:i:s");  
    $date1 = date('Y-m-d', strtotime($today. ' - 1 days'));

$data = '';

#Begin Transaction
mysql_query("BEGIN");



if ($savetype == "Add") {
	$query = "select ifnull(max(so_seqno),0)+1 as so_seqno from acc_so_allow";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$so_seqno=$rec['so_seqno'];


$query1="insert into acc_so_allow values  ('$so_seqno','$entrydate','$custcode','$uptodate')"; 

//echo  $query1;

$result1 = mysql_query($query1);
 }     

      if ($result1)
      {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $entryno  . '"})';
      }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $entryno  . '"})';

     }
?>
