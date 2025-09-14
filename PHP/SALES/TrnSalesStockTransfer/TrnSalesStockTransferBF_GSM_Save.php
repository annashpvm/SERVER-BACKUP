<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet  = json_decode($_POST['griddet'],true);
$savetype = $_POST['savetype'];                 
$rowcnt   = $_POST['cnt'];
$compcode = $_POST['compcode'];
$finid    = $_POST['fincode'];
$entno    = $_POST['entno'];
$entdate  = $_POST['entdate'];

mysql_query("BEGIN");



if ($savetype === "Add") {

   $query1 = "select ifnull(max(tr_entno),0)+1 as entno from trnsal_stock_BF_GSM_transfer where tr_finyear= $finid and tr_compcode= $compcode";
   $result1= mysql_query($query1);
   $rec2   = mysql_fetch_array($result1);
   $entno  = $rec2['entno'];
}



for($i=0;$i<$rowcnt;$i++)
{

	$stksrno      = $griddet[$i]['stksrno'];
	$stkwt        = $griddet[$i]['stkwt'];
	$sono         = $griddet[$i]['sono'];
	$OldSizeCode  = $griddet[$i]['OldSizeCode'];
	$NewSizeCode  = $griddet[$i]['NewSizeCode'];

	$query2= "insert into trnsal_stock_BF_GSM_transfer values('$compcode','$finid', '$entno', '$entdate', '$stksrno' , '$stkwt','$sono', '$OldSizeCode','$NewSizeCode')";
	$result2=mysql_query($query2);    
//echo $query2;
//echo "<br>";

        $query3= "update trnsal_finish_stock set stk_var_code = $NewSizeCode  where stk_comp_code =  $compcode and  stk_sr_no = $stksrno  and stk_var_code = $OldSizeCode and stk_destag = '' ";
	$result3=mysql_query($query3);    
//echo $query3;
//echo "<br>";


   //   $query4  = "update trnsal_order_trailer set  ordt_qty  = ordt_qty  - ($stkwt/1000) , ordt_fin_wt  = ordt_fin_wt  - ($stkwt/1000)  where ordt_comp_code = '$compcode'  and ordt_sono =  $sono and ordt_var_code = $OldSizeCode"; 


        $query4  = "update trnsal_order_trailer 
set  ordt_qty  = CASE 
                  WHEN ordt_qty > ($stkwt / 1000) 
                  THEN ordt_qty - ($stkwt / 1000)
                  ELSE 0
               END, 
ordt_fin_wt  =  CASE 
                     WHEN ordt_fin_wt > ($stkwt / 1000) 
                     THEN ordt_fin_wt - ($stkwt / 1000)
                     ELSE 0
               END

where ordt_comp_code = '$compcode'  and ordt_sono =  $sono and ordt_var_code = $OldSizeCode"; 


//echo $query4;
//echo "<br>";
   $result4 = mysql_query($query4); 


      $query5  = "update trnsal_order_trailer set  ordt_fin_wt  = ordt_fin_wt  + ($stkwt/1000)  where ordt_comp_code = '$compcode'  and ordt_sono =  $sono and ordt_var_code = $NewSizeCode"; 

//echo $query5;
//echo "<br>";
   $result5 = mysql_query($query5); 




}




	if ($result2 && $result3 && $result4 && $result5 ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","entno":"' . $entno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","entno":"' . $entno . '"})';
	}
 
   
?>
