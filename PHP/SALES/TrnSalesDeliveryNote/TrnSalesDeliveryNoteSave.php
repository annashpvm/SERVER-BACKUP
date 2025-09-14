<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_POST['griddet'],true);
$savetype = $_POST['savetype'];                 
$rowcnt = $_POST['cnt'];
$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];
$dnno= $_POST['dnno'];
$dndate = $_POST['dndate'];
$ordno = $_POST['ordno'];
$orddate = $_POST['orddate'];
$sono = $_POST['sono'];
$sodt = $_POST['sodt'];

$party = $_POST['party'];

$noofreels= $_POST['noofreels'];
$totwt= $_POST['totwt'];

$vehicle= $_POST['vehicle'];
$truck= $_POST['truck'];

$freight= (float) $_POST['freight'];
$tax= (float) $_POST['tax'];

mysql_query("BEGIN");



if ($savetype === "Add") {

//   $query1 = "select IFNULL(max(dn_no),0)+1 as dnno from trn_delivery_note where dn_fincode = $finid and dn_comp_code='$compcode'";


   $query1 = "select con_value as dnno from control_details where con_fincode= $finid  and con_compcode= $compcode";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $dnno = $rec2['dnno'];



  }


else if ($savetype === "Edit")
  {

  $query5 = "update trnsal_finish_stock,  trn_delivery_note  set stk_slipno = 0, stk_destag = '' where  stk_var_code = dn_size and stk_sr_no =    dn_sr_no and dn_no = stk_slipno and dn_srno_fincode = stk_finyear  and dn_comp_code = stk_comp_code and dn_sono = stk_sono and dn_no = '$dnno' and dn_fincode = '$finid'    and dn_comp_code = '$compcode'" ;

   $result5= mysql_query($query5);


   $query6 = "delete from trn_delivery_note where dn_no = '$dnno' and dn_fincode = '$finid'   and dn_comp_code = '$compcode'";
   $result6= mysql_query($query6);

   $queryControlDelete = "update control_details set con_value = con_value - 1  where con_compcode = $compcode and con_fincode = $finid";
   $resultControlDelete = mysql_query($queryControlDelete);

//echo $queryControlDelete;
//echo "<br>";
 } 


$reccount =0;
for($i=0;$i<$rowcnt;$i++)
{
	$itemname   = $griddet[$i]['varname'];
	$startno    = $griddet[$i]['stksrno'];
	$weight     = $griddet[$i]['stkwt'];
	$itemcode   = $griddet[$i]['varcode'];
	$prdcode    = $griddet[$i]['vargrpcode'];
	$finyear    = $griddet[$i]['stkfinyear'];
	$fincode    = $griddet[$i]['stkfincode'];
	$soentno    = $griddet[$i]['soentno'];
	$soentdate  = $griddet[$i]['soentdate'];
	$pono       = $griddet[$i]['pono'];
	$podate     = $griddet[$i]['podate'];
	$rate       = $griddet[$i]['rate'];

        $reccount = $reccount +1;

	$query2= "insert into trn_delivery_note values ('$compcode','$finid','$dnno','$dndate','$party','$truck','$soentno','$soentdate','$itemcode','$startno','$weight','$fincode','$rate','$freight','$vehicle','$tax','$pono','$podate','N')";
	$result2=mysql_query($query2);   



//echo $query2;
//echo "<br>";


	$query3=  "update trnsal_finish_stock set stk_destag = 'D', stk_slipno = '$dnno' , stk_desdt = '$dndate' where stk_sr_no ='$startno' and stk_finyear = '$fincode' and stk_comp_code = '$compcode' and stk_sono =  '$soentno'";
	$result3=mysql_query($query3);           


//echo $query3;
//echo "<br>";


	$query4= "update trnsal_order_trailer set ordt_inv_wt =  ordt_inv_wt + ($weight/1000)  where ordt_comp_code = $compcode and ordt_fincode <= $finid   and ordt_sono = $sono  and ordt_var_code = $itemcode";
	$result4=mysql_query($query4); 

//echo $query4;
//echo "<br>";     




}


   $queryControlInsert = "update control_details set con_value = con_value + 1  where con_compcode = $compcode and con_fincode = $finid";
   $resultControlInsert= mysql_query($queryControlInsert);

//  echo $queryControlInsert;
//echo "<br>";

if ($savetype === "Add") {


	if ($result2 && $result3  && $result4 && $resultControlInsert) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dnno":"' . $dnno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dnno":"' . $dnno . '"})';
	}
 
 }
else
{

     if ($reccount == 0)
     { 

   $queryControlDelete = "update control_details set con_value = con_value - 1  where con_compcode = $compcode and con_fincode = $finid";
   $resultControlDelete = mysql_query($queryControlDelete);


//echo $queryControlDelete;
//echo "<br>";



	if ( $result5 && $result6 && $resultControlDelete ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dnno":"' . $dnno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dnno":"' . $dnno . '"})';
	}
      }
      else
       { 
	if ($result2 && $result3  && $result4  &&  $result5 && $result6 && $resultControlDelete) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dnno":"' . $dnno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dnno":"' . $dnno . '"})';
	}
      } 
 
 }


  
?>
