 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$drcr = "D";

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}



$ginaccrefseq = 0;

$sno = 0;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;


$i =0;
$skip = 8;

        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {


             if (++$i > $skip)
             {   


            if ($packData[0] != '')      
            { 
              $colA = $packData[0];
              $colB = $packData[1];
              $colB = strtoupper(trim($colB));
              $colB = trim(str_replace("'", "", $colB));
              $colB_original = strtoupper(trim($colB));
              $colB = trim(str_replace(" ", "", $colB));
            }


            $colA =  date('Y-m-d', strtotime($colA));

            $colC = $packData[2];   //invno 

//echo substr($packData[4],2,1);
//echo "<br>";

            if (substr($packData[4],2,1) == "/" || substr($packData[4],2,1) == "-")
                $colE = 0;
            else
                $colE = floatval($packData[4]);  // amount



  //          $colE = floatval($packData[4]);  // amount


//            $colE = 0 ;  // amount

//echo "<p> $colC.. $colE <br /></p>\n";


            if (colC  != '' && $colE  > 0 )    
            { 
		$query1   = "select count(*) as recfound from TOBEDELETE_acc_collections where c_date = '$colA' and  c_party = '$colB_original' and c_invno = '$colC' and c_collamt = $colE and c_type ='I'";

//echo $query1;

		$result1  = mysql_query($query1);
		$rec1     = mysql_fetch_array($result1);
		$recfound = $rec1['recfound'];

                if ($recfound == 0)
                {

		  $query1 = "insert into TOBEDELETE_acc_collections (c_date, c_invno, c_collamt,c_party,c_type) values ( '$colA',  '$colC','$colE','$colB_original','I')";


		  $insert = $pdo->prepare($query1);
		  $insert->bindParam(':columnE', $packData[4]);  //NAME
		  if ($insert->execute()) {

				$cnnt=$cnnt+1;
	          }
                }
              } 


           }
    }



	$query1   = "select * from TOBEDELETE_acc_collections where c_upd = 'N' and c_type ='I'";
	$result1  = mysql_query($query1);
	 while($row = mysql_fetch_array($result1)){
	      $invno   =  $row['c_invno'];
	      $collamt =  $row['c_collamt'];
              $insert = $pdo->prepare("update acc_trail set acctrail_adj_value = acctrail_adj_value + $collamt  where acctrail_inv_no = '$invno'");
               $insert->bindParam(':columnA', $packData[0]);  //NAME
	       if ($insert->execute()) {
	          $cnnt=$cnnt+1;
               }
               $update = $pdo->prepare("update TOBEDELETE_acc_collections set c_upd = 'Y' where c_invno = '$invno' and c_type ='I'");
               $update->bindParam(':columnA', $packData[0]);  //NAME
	       if ($update->execute()) {
	          $cnnt=$cnnt+1;
               }
	 }




	$query1   = "update acc_trail  set acctrail_adj_value = acctrail_inv_value where   acctrail_adj_value > acctrail_inv_value  and acctrail_accref_seqno > 0";
	$result1  = mysql_query($query1);

	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';

	}
	else
        {
  	    echo '<script type="text/javascript">
              alert("Data already updated");
              </script>';
	}


    }
}




?>
<html>
    <head>
       	<link rel="stylesheet" type="text/css" href="/DOMAIN/excel/styles1.css" />
    </head>
</html>
<div class="content-wrapper">
    <section class="content container-fluid">
        <div class="container">
		<div class="row">
			<div class="span3 hidden-phone"></div>
			<div class="span6" id="form-login">
				<form class="form-horizontal well"  action="" method="POST" name="upload_excel" enctype="multipart/form-data">
					<fieldset>
						<center><legend>Excel Upload - for Bills Adjustments </legend></center>
						<div class="control-group">
							<div class="controls">
								<label>CSV File Only:</label><input type="file" name="file" id="file" class="input-large">
							</div>
						</div>
						<br>
						<div class="control-group">
							<div class="controls">
							<button type="submit" id="submit" name="Import" class="btn btn-primary button-loading" data-loading-text="Loading...">Upload </button></br>
							</div>
						</div>
					

					</fieldset>
				</form>
			</div>
		</div>
		
    </section>
</div>

