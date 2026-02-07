<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();




 $savetype    = $_REQUEST['savetype'];
 $itemcode    = $_POST['itemcode'];
 $itemgrpcode  = $_POST['itemgrpcode'];
 $itemname  = trim(strtoupper($_POST['itemname']));





#Begin Transaction
mysqli_begin_transaction($conn);


if ($savetype == "Add")
{
	$query="select ifnull(max(item_code),0)+1 as item_code from mas_wb_item";
	$result=mysqli_query($conn, $query);
	$rec=mysqli_fetch_array($result);
	$itemcode= $rec['item_code'];


        $query= "insert into mas_wb_item values('$itemcode','$itemname','$itemgrpcode')";

	 $result = mysqli_query($conn, $query);

	//echo $query;


}
else
{



	$query  = "update mas_wb_item set item_name = '$itemname' , item_group= '$itemgrpcode'  where  item_code = '$itemcode'";
	 $result = mysqli_query($conn, $query);   

 
//	echo $query;




}   



     if (($result ))
     {
          mysqli_commit($conn); 
          echo '({"success":"true","msg":"' . $query . '"})';
     }
     else
     {
         mysqli_rollback($conn);


         echo '({"success":"false","msg":"' . $query . '"})';

     }
?>
