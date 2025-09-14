<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet        = json_decode($_POST['griddet'],true);
$rowcnt         = $_POST['cnt'];
$savetype       = $_POST['savetype'];  
$rcompcode      = $_POST['rcompcode'];
$rfincode       = $_POST['rfincode'];
$rentryno       = $_POST['rentryno'];
$proddate       = $_POST['proddate'];
$rshift         = $_POST['rshift'];
$rwdate         = $_POST['rwdate'];
$roperator      = $_POST['roperator'];
$rrollwt        =$_POST['rrollwt'];


if ($savetype === "Edit")
{
        $query1   = "delete from trn_dayprod_rewinder where r_w_date = '$rwdate' and  r_fincode = '$rfincode'  and  r_compcode = '$rcompcode' and r_entryno = '$rentryno'  and r_process = 'N'";
	$result=mysql_query($query1);            

}

$query1   = "insert into  trn_dayprod_rewinder values  ('1','21','2022-01-01','1','2022-01-01','1','A','1','1','1','A', '1','1','1','1','1','1','1','0','1','1','19','$reelno','N','0','0','0','1','2022-01-01','0','1','0','0')";
           	$result=mysql_query($query1); 

/*

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
	$quality   = $griddet[$i]['quality'];
	$qlycode   = $griddet[$i]['qlycode'];
	$bf        = $griddet[$i]['bf'];
	$gsm       = $griddet[$i]['gsm'];
	$rollno    = $griddet[$i]['rollno'];
	$rollwt    = $griddet[$i]['rollwt'];
	$mcshift   = $griddet[$i]['mcshift'];
	$windno    = $griddet[$i]['windno'];
	$set	   = $griddet[$i]['set'];
	$deckle    = $griddet[$i]['deckle'];
	$size      = (double)$griddet[$i]['size'];
	$sizecode  = $griddet[$i]['sizecode'];
	$joints    = $griddet[$i]['joints'];
	$dia       = $griddet[$i]['dia'];
	$reelno    = $griddet[$i]['reelno'];
	$reelwt    = (float)$griddet[$i]['reelwt'];
	$sono      = $griddet[$i]['sono'];
	$customer  = $griddet[$i]['customer'];
	$custcode  = $griddet[$i]['custcode'];
	$process   = $griddet[$i]['process'];
	$seqno     = $griddet[$i]['seqno'];
	if ($qlycode > 0)
	{
           if ($process == 'N')
           { 
           	$query1   = "insert into  trn_dayprod_rewinder values ('$rcompcode','$rfincode','$rdate','$seqno','$rwdate','$rentryno','$rshift',
	'$roperator','$rollno','$qlycode','$mcshift','$rrollwt','$windno','$set','$deckle','$size','$joints','$dia','0','$sono','$custcode','$reelno',
	'$reelwt','$process','0','0','0','$qlycode','$rdate','0','$sizecode','0','0')";

           


       
            }  
	}  



}
*/



if ($savetype == "Add") {
	if ($result)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $rentryno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $rentryno . '"})';

	}
}
else
 {
	if ($result) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $rentryno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $rentryno . '"})';

	}
}

?>
