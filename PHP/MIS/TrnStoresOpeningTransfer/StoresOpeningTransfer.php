<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();


try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


 		
    $compcode  =  $_POST['compcode'];
    $finid     =  $_POST['finid'];
    $nextfinid =  $_POST['nextfinid'];
    $startdate =  $_POST['startdate'];
    $enddate   =  $_POST['enddate'];


$date=date_create("2014-04-01");
$date= date_format($date,"Y/m/d H:i:s");




  mysql_query("BEGIN");



// opening details updation


    $query3  = "call spst_rep_stores_Itemwise_stock ($compcode)";
    $result3 = mysql_query($query3);

     while ($row = mysql_fetch_assoc($result3)) 
     {  
           $itemcode  = (int) $row['item_code'];
           $cloqty    = (float) $row['clo_qty'];
           $clo_val   = (float) $row['clo_val'];
           $clo_rate  = (float) $row['clo_rate'];


if ($clo_val  >0 )
{
           $queryupd =  "update maspur_item_trailer  set item_stock = $cloqty ,item_avg_rate = $clo_rate,item_yr_opqty = $cloqty , item_yr_opval = $clo_val where item_comp_code= $compcode and item_fin_code = $nextfinid  and item_code =  $itemcode";  
//
  //    $resultupd = mysql_query($queryupd);



        $update = $pdo->prepare("update maspur_item_trailer  set item_stock = $cloqty ,item_avg_rate = $clo_rate,item_yr_opqty = $cloqty , item_yr_opval = $clo_val where item_comp_code= $compcode and item_fin_code = $nextfinid  and item_code =  $itemcode");
		    if ($update->execute()) {
			$cnnt=$cnnt+1;
		    }


//echo $queryupd;
//echo "<br>";

}
     }


	if( $cnnt > 0 )
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true"})';
	}
	else
	       {
mysql_query("ROLLBACK");       
		echo '({"success":"false"})';
		     
		    
		} 

?>
