<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$closing   =  (float) $_POST['closing'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$clodate   = $_POST['clodate'];


#Begin Transaction
mysqli_query($conn, "BEGIN");
$reccount = 0;


	$query1 ="select count(*) as nos from acc_closing_stock where clostk_compcode = $compcode  and clostk_fincode = $fincode and clostk_date = '$clodate'";
	$result1 = mysqli_query($conn, $query1);
	$rec=mysqli_fetch_array($result1);
	$reccount= $rec['nos'];

//echo $reccount;
//echo "<br>";


if  ($reccount == 0)
{
 $query = "insert into  acc_closing_stock values ('$compcode','$fincode','$closing','$clodate')";
 $result = mysqli_query($conn, $query);

//echo $query;
//echo "<br>";


}
else
{
  $query = "update acc_closing_stock set clostk_value = '$closing'  where clostk_fincode = '$fincode' and  clostk_compcode = '$compcode' and clostk_date = '$clodate'  ";
 $result = mysqli_query($conn, $query);


//echo $query;
//echo "<br>";

}
      if (($result))
      {
          mysqli_begin_transaction($conn);
          Echo '{success:true,results:1,
             rows:[{"ledger":"1"}]}';
      }
     else
     {
         mysqli_rollback($conn);


           Echo '{success:false,results:1,
             rows:[{"ledger":"1"}]}';
     }
?>
