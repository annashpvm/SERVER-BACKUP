<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype = $_POST['savetype'];
$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhno  = $_POST['invhno'];
$invhdate = $_POST['invhdate'];
$invhpartyordno = $_POST['invhpartyordno'];
$invhpartyorddt = $_POST['invhpartyorddt'];
$invhparty = $_POST['invhparty'];
$invhcrddays = (int) $_POST['invhcrddays'];
$invhinsper = (float)$_POST['invhinsper'];
$invhfrtrate = (float) $_POST['invhfrtrate'];

$invhtaxtag = (int) $_POST['invhtaxtag'];


$invhsgstper = (float)$_POST['invhsgstper'];
$invhcgstper = (float)$_POST['invhcgstper'];
$invhigstper = (float)$_POST['invhigstper'];

$invhsgstamt = (float)$_POST['invhsgstamt'];
$invhcgstamt = (float)$_POST['invhcgstamt'];
$invhigstamt = (float)$_POST['invhigstamt'];

$invhtcsper  = (float)$_POST['invhtcsper'];
$invhtcsamt  = (float)$_POST['invhtcsamt'];
$frtqty      = (float)$_POST['frtqty'];

$invhfrtamt  = (float)$_POST['invhfrtamt'];

$invhroff = (float) $_POST['invhroff'];
$invhnetamt = (float)$_POST['invhnetamt'];

$invhdelivery_add1 =  trim(strtoupper($_POST['invhdelivery_add1']));
$invhdelivery_add2 =  trim(strtoupper($_POST['invhdelivery_add2']));
$invhdelivery_add3 =  trim(strtoupper($_POST['invhdelivery_add3']));
$invhdelivery_city =  trim(strtoupper($_POST['invhdelivery_city']));
$invhdelivery_pin  = $_POST['invhdelivery_pin'];
$invhstatecode     = (int)$_POST['invhstatecode']; 
$invhdelivery_gst  = trim(strtoupper($_POST['invhdelivery_gst']));





mysql_query("BEGIN");

if ($savetype == "Add") {

    $query1 = "select IFNULL(max(invh_no),0)+1 as invh_no from trnsal_proforma_invoice where invh_fincode = '$invhfincode' and invh_comp_code= '$invhcompcode' ";
    $result1= mysql_query($query1);
    $rec2 = mysql_fetch_array($result1);
    $invhno=$rec2['invh_no'];

}
else
{

    $query3 = "delete  from trnsal_proforma_invoice where invh_fincode = $invhfincode and invh_comp_code= $invhcompcode and invh_no = $invhno";
    $result3= mysql_query($query3);

}


for ($i=0;$i<$rowcnt;$i++)
  {
	$sno = $i + 1;
	$hsncode = $griddet[$i]['hsncode'];
	$varname = $griddet[$i]['varname'];
	$shade   = $griddet[$i]['shade'];
        $varcode = (int) $griddet[$i]['varcode'];
	$weight  = (float) $griddet[$i]['weight'];
	$rate    = (float) $griddet[$i]['rate'];
	$size    = $griddet[$i]['size'];
	$value   = (float) $griddet[$i]['value'];
	$taxvalue= (float) $griddet[$i]['taxval'];


      $query2 = "insert into trnsal_proforma_invoice values('$invhcompcode','$invhfincode','$invhno','$invhdate','$invhpartyordno','$invhpartyorddt', '$invhparty',
'$invhtaxtag' ,'$invhcrddays','$hsncode', '$varcode','$shade','$size', '$weight','$rate','$value', 
'$invhinsper','$invhfrtrate',$frtqty, '$invhfrtamt','$taxvalue','$invhtcsper', '$invhtcsamt','$invhsgstper','$invhcgstper','$invhigstper','$invhsgstamt','$invhcgstamt','$invhigstamt',
$invhroff,$invhnetamt,'$invhdelivery_add1','$invhdelivery_add2','$invhdelivery_add3','$invhdelivery_city', 
'$invhstatecode','$invhdelivery_pin' ,'$invhdelivery_gst')";
    $result2=mysql_query($query2);   

//echo $query2;

    }    






if ($result2 )
//if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhno . '"})';
}
  
   
?>
