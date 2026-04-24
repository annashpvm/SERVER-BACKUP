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




mysqli_begin_transaction($conn);

    $queryMas   = "select * from maspur_item_header ";
    $resultMas = mysqli_query($conn, $queryMas);

//echo $queryMas;
    while ($row = mysqli_fetch_assoc($resultMas)) {
           $itemcode  = $row['item_code'];
           $queryTrail = "select * from maspur_item_trailer where item_comp_code = $compcode and item_fin_code =   $finid    and item_code =  $itemcode";

//echo $queryTrail;
//echo "<br>";


           $resultTrail = mysqli_query($conn, $queryTrail);
            while ($subrow = mysqli_fetch_assoc($resultTrail)) {


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
           $query2   = mysqli_query($conn,$query2);
           $findrow  = mysqli_fetch_row($query2);



//echo $findrow[0];
//echo "<br>";


           if ($findrow[0]  == 0)
           {
            $query1="insert into maspur_item_trailer values(1, $nextfinid,$itemcode ,  '$cloqty' ,  '$clo_rate', 0, '$cloqty' ,  '$clo_val' , '$purdate','$issdate',  '$clo_val' );";
    //echo $query1;
    //echo "<br>";
            $result1=mysqli_query($conn, $query1);  
            $cnnt =  $cnnt + 1;       

            } 

            else
            {
                $qry = "update maspur_item_trailer  set item_stock = $cloqty ,item_avg_rate = $clo_rate,item_yr_opqty = $cloqty , item_yr_opval = $clo_val ,item_lpur_date = '$purdate' , item_liss_date = '$issdate', item_stockvalue = $clo_val 
                where item_comp_code= $compcode and item_fin_code = $nextfinid  and item_code =  $itemcode";
     //echo $qry;
    //echo "<br>";        

             $update = $pdo->prepare($qry);


		    if ($update->execute()) {
			$cnnt=$cnnt+1;
		    }


            }  

       } 
           $queryTrail = "select * from maspur_item_trailer where item_comp_code = 90 and item_fin_code = $finid   and item_code =  $itemcode";

//echo $queryTrail;
//echo "<br>";

           $resultTrail = mysqli_query($conn, $queryTrail);
            while ($subrow = mysqli_fetch_assoc($resultTrail)) {


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


           $query2   = mysqli_query("select count(*) recfound from maspur_item_trailer where item_comp_code= 90
and item_fin_code = $nextfinid  and item_code =  $itemcode");
           $findrow  = mysqli_fetch_row($query2);
           if ($findrow[0]  == 0)
           {
		$query1="insert into maspur_item_trailer values(90, $nextfinid,$itemcode ,  '$cloqty' ,  '$clo_rate', 0, '$cloqty' ,  '$clo_val' , '$purdate','$issdate');";
		$result1=mysqli_query($conn, $query1);       

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
       mysqli_commit($conn);                      
	   echo '({"success":"true"})';
	}
	else
    {
        mysqli_rollback($conn);
		echo '({"success":"false"})';
    } 
?>
