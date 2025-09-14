 <?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype= $_POST['savetype'];

$dcrcompcode  = $_POST['dcrcompcode'];
$dcrfincode   = $_POST['dcrfincode'];
$dcrno        = $_POST['dcrno'];
$dcrdate      = $_POST['dcrdate'];
$dcrparty     = $_POST['dcrparty'];
$dcrdcno      = $_POST['dcrdcno'];
$dcrdcdate    = $_POST['dcrdcdate'];
$dcrdcfincode = $_POST['dcrdcfincode'];
$dcrtruckno   = $_POST['dcrtruckno'];
$dcrfrttype   = $_POST['dcrfrttype'];
$dcrfrtamt    = (float) $_POST['dcrfrtamt'];
$dcrremarks   = $_POST['dcrremarks'];

$inwardno     = $_POST['inwardno'];
$inwarddt     = $_POST['inwarddt'];

mysql_query("BEGIN");


if ($savetype == "Add")
{
    $query2 = "select IFNULL(max(dcr_no),0)+1 as dcr_no from trnpur_deliverychallan_receipt where dcr_fincode = $dcrfincode and dcr_comp_code=$dcrcompcode";
    $result2= mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $dcrno=$rec2['dcr_no'];

}
else
{


   // $query6  = "update trnpur_deliverychallan_receipt , trnpur_deliverychallan_trailer set dct_recqty = dct_recqty - dcr_recd_qty where  dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code and dcr_spec = dct_spec and dcr_comp_code = $dcrcompcode  and dcr_dcfincode = $dcrfincode and dcr_no =  $dcrdcno";
//    $result6 = mysql_query($query6); 

//echo   $query6;
//echo "<br>";

   $query6   = "delete from trnpur_deliverychallan_receipt where dcr_comp_code = $dcrcompcode  and dcr_dcfincode = $dcrfincode and dcr_no =  $dcrno";
    $result6 = mysql_query($query6); 

//echo   $query7;
//echo "<br>";

}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
	$sno = $i + 1;
	$slno            = (int)$griddet[$i]['slno'];
	$dcritemcode     = (int)$griddet[$i]['itemcode'];
	$dcrrecdqty      = (float)$griddet[$i]['recdqty'];
	$oldqty          = (float)$griddet[$i]['oldqty'];
	$dcrnewitemcode  = (int)$griddet[$i]['newitemcode'];
	$purpose         = $griddet[$i]['purpose'];
	$specification   = $griddet[$i]['specification'];
        $purpose         = substr(trim($purpose),0,99);





	if ( $dcrrecdqty > 0 ) {
	    $query4= "insert into  trnpur_deliverychallan_receipt values('$dcrcompcode','$dcrfincode','$dcrno','$slno', '$dcrdate', '$dcrparty','$dcrdcno',   '$dcrdcdate','$dcrdcfincode','$dcrtruckno','$dcrfrttype', '$dcrfrtamt', '$dcritemcode', '$dcrnewitemcode','$dcrrecdqty','$specification' ,'$purpose','$dcrremarks','$inwardno','$inwarddt')";
	    $result4=mysql_query($query4);  

//echo $query4;
//echo "<br>";


	    $query5= "update trnpur_deliverychallan_trailer set dct_recqty = dct_recqty + '$dcrrecdqty' - '$oldqty'  where dct_comp_code = $dcrcompcode  and  dct_fincode = $dcrdcfincode and  dct_no =  $dcrdcno  and  dct_item_code = $dcritemcode and dct_spec = '$specification'";
	    $result5=mysql_query($query5); 
 
//echo $query5;
//echo "<br>";

	 } 

}


if ($savetype == "Add")
{
	if( $result4 && $result5   )
	{
	    mysql_query("COMMIT");                        
	    echo '({"success":"true","recptno":"'.$dcrno.'"})';
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","recptno":"'.$dcrno.'"})';
	}   
}
else
{
	if( $result6 && $result4 && $result5 )
	{
	    mysql_query("COMMIT");                        
	    echo '({"success":"true","recptno":"'.$dcrno.'"})';
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","recptno":"'.$dcrno.'"})';
	}   
}
		

       
 
?>
