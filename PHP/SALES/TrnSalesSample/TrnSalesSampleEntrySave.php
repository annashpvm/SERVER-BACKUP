<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();


$griddet     = json_decode($_REQUEST['griddet'],true);
$rowcnt      = $_POST['cnt'];
$compcode    = $_POST['compcode'];     
$fincode     = $_POST['fincode'];    
$entno       = $_POST['entno'];
$entdate     = $_POST['entdate'];
$custcode    = $_POST['custcode'];
$reason      = $_POST['reason'];
$truck       = $_POST['truck'];

$saveflag =$_REQUEST['saveflag'];


 mysql_query("BEGIN");

if ($saveflag == "Add") {
	 $query1  = "select IFNULL(max(rs_entno),0)+1 as entno from trnsal_sample where  rs_compcode ='$compcode' and rs_finyear ='$fincode'";
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $entno   = $rec1['entno'];
}
else
{
$query3 = "update trnsal_finish_stock set stk_destag = ''  , stk_deltag = '' ,stk_deldate = null where stk_comp_code =$compcode and stk_finyear <= $fincode  and  stk_srs_no  in (select rs_srno from trnsal_sample where rs_compcode = $compcode and rs_finyear = $fincode and  rs_date = '$entdate' and rs_entno = $entno)";
$result3=mysql_query($query3);  

	$query2 = "delete from trnsal_sample where rs_date = '$entdate' and rs_finyear = $fincode and rs_entno = $entno";
	$result2=mysql_query($query2);



}




$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
	$sno = $i + 1;

	$size     = $griddet[$i]['size'];
	$sizecode = $griddet[$i]['sizecode'];
	$sono     = $griddet[$i]['sono'];
	$reelno   = $griddet[$i]['reelno'];
	$weight   = $griddet[$i]['weight'];
	$ryear    = $griddet[$i]['reelyear'];


	$query2 = "insert into trnsal_sample values('$compcode', '$fincode', '$entno', '$entdate','$custcode','$sono','$sizecode', '$reelno','$weight', '$ryear' , '$reason', '$truck')";
	$result2=mysql_query($query2);  

//echo $query2;    
	       
	$query3 = "update trnsal_finish_stock set stk_destag = 'Z' ,  stk_desdt  = '$entdate' where stk_sr_no = '$reelno' and stk_comp_code ='$compcode' and stk_finyear = '$ryear'";
	$result3=mysql_query($query3);
//echo $query3;     
} 

  
if($result2 && $result3)
{
mysql_query("COMMIT");                        
echo '({"success":"true","msg":"'.$entno.'"})';
}
else
{
echo '({"success":"false","msg":"'.$entno.'"})';
mysql_query("ROLLBACK");            
    
} 
        

       
 
?>
