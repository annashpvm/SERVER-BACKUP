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


  	    echo '<script type="text/javascript">
              alert($filename);
            </script>';

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
            $reccount = $reccount +1;

//  	    echo '<script type="text/javascript">
//              alert($packData);
//            </script>';
             


//            $insert = $pdo->prepare("INSERT into masprd_vargrp_color values (:columnA,:columnB,:columnC,:columnD,:columnE)");
/*
         $insert = $pdo->prepare("insert into TEMP_MASCUSTOMER (cust_code, cust_led_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city, cust_state, cust_country, cust_zip, cust_phone, cust_email, cust_web, cust_contact, cust_taxtag, cust_cr_days, cust_cr_limit, cust_repr, cust_panno, cust_gstin, cust_dealer) values ( $reccount, $reccount,:columnMA,:columnMA,:columnMB,:columnMC,:columnMD,:columnME,:columnR,:columnG,:columnH,:columnI,:columnJ,:columnK,:columnL)");
            $insert->bindParam('$reccount', $packData[0]);
            $insert->bindParam('$reccount', $packData[1]);
            $insert->bindParam(':columnA', $packData[2]);
            $insert->bindParam(':columnB', $packData[3]);
            $insert->bindParam(':columnC', $packData[4]);
            $insert->bindParam(':columnD', $packData[5]);
            $insert->bindParam(':columnE', $packData[6]);          
            $insert->bindParam(':columnF', $packData[7]);    
            $insert->bindParam(':columnG', $packData[8]);    
            $insert->bindParam(':columnH', $packData[8]);    
            $insert->bindParam(':columnI', $packData[9]);    
            $insert->bindParam(':columnJ', $packData[10]);    
            $insert->bindParam(':columnK', $packData[11]);    
            $insert->bindParam(':columnL', $packData[12]);    
          
*/

         $insert = $pdo->prepare("insert into massal_customer (cust_code, cust_led_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city,cust_zip,cust_phone,cust_email,cust_panno,cust_gstin) values ( $reccount,$reccount,:columnA,:columnA,:columnB,:columnC,:columnD,:columnE,:columnH,:columnI,:columnJ,:columnL,:columnK)");
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
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }


         $insert = $pdo->prepare("insert into acc_ledger_master (led_code, led_comp_code, led_name, led_addr1, led_addr2, led_city, led_gst_no, led_pan_no, led_type, led_custcode) values ( $reccount,'1',:columnA,:columnB,:columnC,:columnD,:columnL,:columnK ,'C',$reccount)");
//            $insert->bindParam('$reccount', $packData[0]);
//            $insert->bindParam('$reccount', $packData[1]);
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            $insert->bindParam(':columnB', $packData[1]);  //ADD1
            $insert->bindParam(':columnC', $packData[2]);  //ADD2
            $insert->bindParam(':columnD', $packData[3]);  //ADD3
            $insert->bindParam(':columnL', $packData[11]); //GST       
            $insert->bindParam(':columnK', $packData[10]); //PAN       
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

