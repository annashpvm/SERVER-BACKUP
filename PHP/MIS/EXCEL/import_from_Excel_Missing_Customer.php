 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');
//    $pdo = new PDO('10.0.0.251';'shvpm','root','P@sswOrD');
}catch(PDOException $error){

    echo $error->getmessage();
}
$reccount = 0;
$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {



        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
            $reccount = $reccount +1;



         $insert = $pdo->prepare("insert into massal_customer (cust_code, cust_led_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city,cust_zip,cust_phone,cust_email,cust_panno,cust_gstin) values ( :columnM,:columnM,:columnA,:columnA,:columnB,:columnC,:columnD,:columnE,:columnH,:columnI,:columnJ,:columnL,:columnK)");
//            $insert->bindParam('$reccount', $packData[0]);
//            $insert->bindParam('$reccount', $packData[1]);
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            $insert->bindParam(':columnB', $packData[1]);  //ADD1
            $insert->bindParam(':columnC', $packData[2]);  //ADD2
            $insert->bindParam(':columnD', $packData[3]);  //ADD3
            $insert->bindParam(':columnE', $packData[4]);  //ADD4         
            $insert->bindParam(':columnH', $packData[7]);  //PIN        
            $insert->bindParam(':columnI', $packData[8]);  //PHONE      
            $insert->bindParam(':columnJ', $packData[9]);  //EMAIL      
            $insert->bindParam(':columnL', $packData[11]); //GST       
            $insert->bindParam(':columnK', $packData[10]); //PAN       
            $insert->bindParam(':columnM', $packData[12]); //CUST CODE
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
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

