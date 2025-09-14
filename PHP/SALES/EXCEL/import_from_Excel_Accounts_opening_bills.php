 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}
$reccount = 2285;
$vno = 1;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $colA = $packData[0];
            $colB = $packData[1];
            $colC = $packData[2];
            $colD = $packData[3];
            $colE = substr($packData[4],0,1);
            $colF = $packData[5];

//echo $colE;
//echo $colB;
//echo $colC;

             $ledcode = $pdo->query("select ifnull(max(led_code),0) as  led_code  from acc_ledger_master where led_name ='$colA'")->fetchColumn();

//echo $ledcode;

             $count = $pdo->query("select count(*) as nos  from  acc_trail tran  join acc_ledger_master mas on  tran.acctrail_led_code = mas.led_code  where led_name = upper('$colA') and acctrail_inv_no = '$colC'")->fetchColumn();

//echo $count;

            if ($count == 0) 
            {

//echo $vouno;


         if ($colC != '') 
         {   

    
            $vouno = "OPB".$vno; 
     
	 $insert = $pdo->prepare("insert into acc_ref values ( $reccount,'$vouno',1,22,:columnB, 'OPB','', '',  '$colC', :columnB,:columnE,1,1)");
//echo $reccount;
//echo $vouno;

		    $insert->bindParam(':columnB', $packData[1]);  //NAME
          	    $insert->bindParam(':columnC', $packData[2]);  //NAME
          	    $insert->bindParam(':columnE', $packData[4]);  //NAME

		    if ($insert->execute()) {
			$cnnt=$cnnt+1;
		    }


	 $insert = $pdo->prepare("insert into acc_trail values ( $reccount,1,'$colC','$colB','$colD',0,'$ledcode','$colE','$colF' )");


//echo $reccount;

//		    $insert->bindParam(':columnB', $packData[1]);  //NAME
//          	    $insert->bindParam(':columnC', $packData[2]);  //NAME
  //        	    $insert->bindParam(':columnD', $packData[3]);  //NAME
//          	    $insert->bindParam(':columnE', $packData[4]);  //NAME
//          	    $insert->bindParam(':columnF', $packData[5]);  //NAME
		    if ($insert->execute()) {
			$cnnt=$cnnt+1;
                         $reccount = $reccount +1;
                 	$vno=$vno+1;
		    }

              }
            }  
        } 


	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
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
						<center><legend>Excel Upload</legend></center>
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

