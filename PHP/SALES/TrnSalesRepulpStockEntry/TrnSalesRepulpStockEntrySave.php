<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();


$griddet     = json_decode($_REQUEST['griddet'],true);
$rowcnt      = $_POST['cnt'];
$compcode    = $_POST['compcode'];     
$fincode     = $_POST['fincode'];    
$entno       = $_POST['entno'];
$entdate     = $_POST['entdate'];

$saveflag =$_REQUEST['saveflag'];


 mysql_query("BEGIN");

if ($saveflag == "Add") {
	 $query1  = "select IFNULL(max(r_entno),0)+1 as entno from trnsal_repulp where  r_compcode ='$compcode' and r_finyear ='$fincode'";
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $entno   = $rec1['entno'];
}
else
{
$query3 = "update trnsal_finish_stock set stk_destag = ''  , stk_deltag = '' ,stk_deldate = null where stk_comp_code =$compcode and stk_finyear <= $fincode  and  stk_sr_no  in (select r_srno from trnsal_repulp where r_compcode = $compcode and r_finyear = $fincode and  r_date = '$entdate' and r_entno = $entno)";
$result3=mysql_query($query3);  

	$query2 = "delete from trnsal_repulp where r_date = '$entdate' and r_finyear = $fincode and r_entno = $entno";
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


	$query2 = "insert into trnsal_repulp values('$compcode', '$fincode', '$entno', '$entdate','$sono','$sizecode', '$reelno','$weight', '$ryear')";
	$result2=mysql_query($query2);  

//echo $query2;    
	       
	$query3 = "update trnsal_finish_stock set stk_destag = 'R' , stk_deltag = 'T' ,  stk_deldate  = '$entdate' where stk_sr_no = '$reelno' and stk_comp_code ='$compcode' and stk_finyear = '$ryear'";
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
