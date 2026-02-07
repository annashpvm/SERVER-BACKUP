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

mysqli_begin_transaction($conn);


if ($savetype === "Add") {

   $query1 = "select ifnull(max(tr_entno),0)+1 as entno from trnsal_stock_transfer where tr_finyear= $finid and tr_compcode= $compcode";
   $result1= mysqli_query($conn, $query1);
   $rec2   = mysqli_fetch_array($result1);
   $entno  = $rec2['entno'];
}
else if ($savetype === "Edit")
  {
   $query1 = "delete from trnsal_stock_transfer where tr_finyear= $finid and tr_compcode= $compcode and tr_entno = $entno";
   $result1= mysqli_query($conn, $query1);
 } 



for($i=0;$i<$rowcnt;$i++)
{
	$varname       = $griddet[$i]['varname'];
	$sizecode      = $griddet[$i]['sizecode'];
	$stksrno       = $griddet[$i]['stksrno'];
	$stkwt         = $griddet[$i]['stkwt'];
	$OldPartyCode  = $griddet[$i]['OldPartyCode'];
	$oldsono       = $griddet[$i]['oldsono'];
	$NewPartyCode  = $griddet[$i]['NewPartyCode'];
	$newsono       = $griddet[$i]['newsono'];

	$query2= "insert into trnsal_stock_transfer values('$compcode','$finid', '$entno', '$entdate', '$sizecode','$stksrno' , '$stkwt', '$OldPartyCode', '$oldsono', '$NewPartyCode', '$newsono')";
	$result2=mysqli_query($conn, $query2);    


//echo $query2;
//echo "<br>";

        $query3= "update trnsal_finish_stock set stk_sono = $newsono  where stk_comp_code =  $compcode and  stk_sr_no = $stksrno  and stk_sono = $oldsono and stk_destag = ''  and stk_finyear <= '$finid' ";
	$result3=mysqli_query($conn, $query3);    

//echo $query3;
//echo "<br>";

//        $query4  = "update trnsal_order_trailer set ordt_fin_wt  = ordt_fin_wt  - ($stkwt/1000)  where ordt_comp_code = '$compcode'  and ordt_sono =  $oldsono and ordt_var_code = $sizecode"; 

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

where ordt_comp_code = '$compcode'  and ordt_sono =  $oldsono and ordt_var_code = $sizecode"; 

//echo $query4;
//echo "<br>";
   $result4 = mysqli_query($conn, $query4); 

   $query5  = "update trnsal_order_trailer set ordt_fin_wt  = ordt_fin_wt  + ($stkwt/1000)   where ordt_comp_code = '$compcode'  and ordt_sono =  $newsono and ordt_var_code = $sizecode"; 

//echo $query5;
   $result5 = mysqli_query($conn, $query5);    

}




	if ($result1  && $result2 && $result3 ) 
	{ 
	   mysqli_commit($conn); 
	   echo '({"success":"true","entno":"' . $entno . '"})';
	} 
		
	else {
 	   mysqli_rollback($conn);
      echo '({"success":"false","entno":"' . $entno . '"})';
	}

   
?>
