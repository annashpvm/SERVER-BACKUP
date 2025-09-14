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

    $queryMas   = "select * from maspur_item_header ";
    $resultMas = mysql_query($queryMas);

//echo $queryMas;
    while ($row = mysql_fetch_assoc($resultMas)) {
           $itemcode  = $row['item_code'];
           $queryTrail = "select * from maspur_item_trailer where item_comp_code = $compcode and item_fin_code =   $finid    and item_code =  $itemcode";

//echo $queryTrail;
//echo "<br>";


           $resultTrail = mysql_query($queryTrail);
            while ($subrow = mysql_fetch_assoc($resultTrail)) {


                  if ($subrow['item_lpur_date'] === NULL)
                      $purdate  = $date ;
                  else
                      $purdate  = $subrow['item_lpur_date'];

                  if ($subrow['item_liss_date'] === NULL)
                      $issdate  = $date ;
                  else
                      $issdate  = $subrow['item_liss_date'];





           $cloqty    = (float) $subrow['item_stock'];

           $clo_rate  = (float) $subrow['item_avg_rate'];
           $clo_val   =  $subrow['item_avg_rate'] * $subrow['item_stock'];


           $query2   = "select count(*) recfound from maspur_item_trailer where item_comp_code=  $compcode
and item_fin_code = $nextfinid  and item_code =  $itemcode";

//echo $query2;
//echo "<br>";


           $query2   = mysql_query("select count(*) recfound from maspur_item_trailer where item_comp_code=  $compcode
and item_fin_code = $nextfinid  and item_code =  $itemcode");
           $findrow  = mysql_fetch_row($query2);



           if ($findrow[0]  == 0)
           {
		$query1="insert into maspur_item_trailer values(1, $nextfinid,$itemcode ,  '$cloqty' ,  '$clo_rate', 0, '$cloqty' ,  '$clo_val' , '$purdate','$issdate');";

//echo $query1;
//echo "<br>";


		$result1=mysql_query($query1);  

              $cnnt =  $cnnt + 1;       

            } 

            else
            {
             $update = $pdo->prepare("update maspur_item_trailer  set item_stock = $cloqty ,item_avg_rate = $clo_rate,item_yr_opqty = $cloqty , item_yr_opval = $clo_val ,item_lpur_date = '$purdate' , item_liss_date = '$issdate'
where item_comp_code= $compcode and item_fin_code = $nextfinid  and item_code =  $itemcode");
		    if ($update->execute()) {
			$cnnt=$cnnt+1;
		    }


            }  

       } 
           $queryTrail = "select * from maspur_item_trailer where item_comp_code = 90 and item_fin_code = $finid   and item_code =  $itemcode";

//echo $queryTrail;
//echo "<br>";

           $resultTrail = mysql_query($queryTrail);
            while ($subrow = mysql_fetch_assoc($resultTrail)) {


                  if ($subrow['item_lpur_date'] === NULL)
                      $purdate  = $date ;
                  else
                      $purdate  = $subrow['item_lpur_date'];

                  if ($subrow['item_liss_date'] === NULL)
                      $issdate  = $date ;
                  else
                      $issdate  = $subrow['item_liss_date'];





           $cloqty    = (float) $subrow['item_stock'];

           $clo_rate  = (float) $subrow['item_avg_rate'];
           $clo_val   =  $subrow['item_avg_rate'] * $subrow['item_stock'];


           $query2   = mysql_query("select count(*) recfound from maspur_item_trailer where item_comp_code= 90
and item_fin_code = $nextfinid  and item_code =  $itemcode");
           $findrow  = mysql_fetch_row($query2);
           if ($findrow[0]  == 0)
           {
		$query1="insert into maspur_item_trailer values(90, $nextfinid,$itemcode ,  '$cloqty' ,  '$clo_rate', 0, '$cloqty' ,  '$clo_val' , '$purdate','$issdate');";
		$result1=mysql_query($query1);       

              $cnnt =  $cnnt + 1;       

            } 
            else
            {
             $update = $pdo->prepare("update maspur_item_trailer  set item_stock = $cloqty ,item_avg_rate = $clo_rate,item_yr_opqty = $cloqty , item_yr_opval = $clo_val ,item_lpur_date = '$purdate' , item_liss_date = '$issdate' where item_comp_code=  90 and item_fin_code = $nextfinid  and item_code =  $itemcode");
		    if ($update->execute()) {
			$cnnt=$cnnt+1;
		    }


            }  


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
