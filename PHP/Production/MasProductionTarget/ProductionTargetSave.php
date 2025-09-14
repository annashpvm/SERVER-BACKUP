<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype   = $_POST['savetype'];
$seqno      = $_POST['seqno'];
$gsm        = (int)$_POST['gsm'];
$deckle     = (int)$_POST['deckle'];
$speed      = (int)$_POST['speed'];
$prdn_hr    = (float)$_POST['prdn_hr'];
$power_ton  = (float)$_POST['power_ton'];
$steam_ton  = (float)$_POST['steam_ton'];
$targetmins = (float)$_POST['targetmins'];

if ($savetype == "Add")
{
	$query   = "select ifnull(max(tseqno),0)+1 as tseqno from masprd_target";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$seqno   = $rec['tseqno'];

	$query   = "select ifnull(max(tseqno),0) as seqno from masprd_target where tgsm = $gsm";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$foundseqno   = $rec['seqno'];
        if ($foundseqno == 0 )
        {
        $query1="insert into masprd_target values ($seqno,$gsm , $deckle, $speed, $prdn_hr,  $power_ton, $steam_ton,$targetmins)";
         $result1 = mysql_query($query1);
        } 
}
else
{
        $query1="update masprd_target set tgsm = $gsm , tdeckle =  $deckle , tspeed = $speed, tprdn_hr = $prdn_hr, tpower_ton =  $power_ton, tsteam_ton = $steam_ton , tprdn_min = $targetmins where tseqno = $seqno ";
         $result1 = mysql_query($query1);
}
	  
	  if ($result1) {
	    echo '({"success":"true","msg":"' . $gsm . '"})';
	  } 
	
	  else {
	    echo '({"success":"false","msg":"' . $gsm . '"})';
	   }
     
   
?>
