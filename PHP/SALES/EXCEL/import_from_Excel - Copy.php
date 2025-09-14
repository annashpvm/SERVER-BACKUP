<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');
//    $pdo = new PDO('10.0.0.251';'shvpm','root','P@sswOrD');
}catch(PDOException $error){

    echo $error->getmessage();
}

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {


  	    echo '<script type="text/javascript">
              alert($filename);
            </script>';

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {


  	    echo '<script type="text/javascript">
              alert($packData);
            </script>';


//            $insert = $pdo->prepare("INSERT into masprd_vargrp_color values (:columnA,:columnB,:columnC,:columnD,:columnE)");
         $insert = $pdo->prepare("insert into stock_update (sno, bf, gsm, size, sizetype, rollno, monthr, reelno, weight,shade,location,customer) values (:columnA,:columnB,:columnC,:columnD,:columnE,:columnF,:columnG,:columnH,:columnI,:columnJ,:columnK,:columnL)");
            $insert->bindParam(':columnA', $packData[0]);
            $insert->bindParam(':columnB', $packData[1]);
            $insert->bindParam(':columnC', $packData[2]);
            $insert->bindParam(':columnD', $packData[3]);
            $insert->bindParam(':columnE', $packData[4]);          
            $insert->bindParam(':columnF', $packData[5]);    
            $insert->bindParam(':columnG', $packData[6]);    
            $insert->bindParam(':columnH', $packData[7]);    
            $insert->bindParam(':columnI', $packData[8]);    
            $insert->bindParam(':columnJ', $packData[9]);    
            $insert->bindParam(':columnK', $packData[10]);    
            $insert->bindParam(':columnL', $packData[11]);    
          


            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }
        }


         $insert = $pdo->prepare("update massal_variety,masprd_variety , stock_update  set sizecode = var_code ,reelrefno = concat(rollno,right(concat('0',monthr),2),right(concat('000',reelno),4))   where var_grpcode = var_groupcode and var_shade = shade and var_inchcm = sizetype and var_bf = bf and var_gsm = gsm and var_size2 = size and sno >0");
     $insert->execute();



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

