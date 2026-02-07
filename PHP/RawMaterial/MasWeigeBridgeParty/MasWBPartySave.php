<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype   = $_REQUEST['savetype'];
 $partycode  = $_POST['partycode'];
 $partyname  = trim(strtoupper($_POST['partyname']));
 $partytype  = (int) $_POST['partytype'];




#Begin Transaction
mysqli_begin_transaction($conn);


if ($savetype == "Add")
{
	$query="select ifnull(max(party_code),0)+1 as party_code from mas_wb_party";
	$result=mysqli_query($conn, $query);
	$rec=mysqli_fetch_array($result);
	$partycode= $rec['party_code'];


        $query= "insert into mas_wb_party (party_code, party_name, party_type) values('$partycode','$partyname','$partytype')";

	 $result = mysqli_query($conn, $query);

	//echo $query;


}
else
{



	$query  = "update mas_wb_party set party_name = '$partyname' , party_type = '$partytype' where  party_code = '$partycode'";
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
