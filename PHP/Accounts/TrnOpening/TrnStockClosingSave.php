<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$closing   =  (float) $_POST['closing'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$clodate   = $_POST['clodate'];


#Begin Transaction
mysql_query("BEGIN");
$reccount = 0;


	$query1 ="select count(*) as nos from acc_closing_stock where clostk_compcode = $compcode  and clostk_fincode = $fincode and clostk_date = '$clodate'";
	$result1 = mysql_query($query1);
	$rec=mysql_fetch_array($result1);
	$reccount= $rec['nos'];

//echo $reccount;
//echo "<br>";


if  ($reccount == 0)
{
 $query = "insert into  acc_closing_stock values ('$compcode','$fincode','$closing','$clodate')";
 $result = mysql_query($query);

//echo $query;
//echo "<br>";


}
else
{
  $query = "update acc_closing_stock set clostk_value = '$closing'  where clostk_fincode = '$fincode' and  clostk_compcode = '$compcode' and clostk_date = '$clodate'  ";
 $result = mysql_query($query);


//echo $query;
//echo "<br>";

}
      if (($result))
      {
          mysql_query("COMMIT");
          Echo '{success:true,results:1,
             rows:[{"ledger":"1"}]}';
      }
     else
     {
         mysql_query("ROLLBACK");
           Echo '{success:false,results:1,
             rows:[{"ledger":"1"}]}';
     }
?>
