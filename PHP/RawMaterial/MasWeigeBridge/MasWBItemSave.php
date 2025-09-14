<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();




 $savetype    = $_REQUEST['savetype'];
 $itemcode    = $_POST['itemcode'];
 $itemgrpcode  = $_POST['itemgrpcode'];
 $itemname  = trim(strtoupper($_POST['itemname']));





#Begin Transaction
mysql_query("BEGIN");


if ($savetype == "Add")
{
	$query="select ifnull(max(item_code),0)+1 as item_code from mas_wb_item";
	$result=mysql_query($query);
	$rec=mysql_fetch_array($result);
	$itemcode= $rec['item_code'];


        $query= "insert into mas_wb_item values('$itemcode','$itemname','$itemgrpcode')";

	 $result = mysql_query($query);

	//echo $query;


}
else
{



	$query  = "update mas_wb_item set item_name = '$itemname' , item_group= '$itemgrpcode'  where  item_code = '$itemcode'";
	 $result = mysql_query($query);   

 
//	echo $query;




}   



     if (($result ))
     {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $query . '"})';
     }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $query . '"})';

     }
?>
