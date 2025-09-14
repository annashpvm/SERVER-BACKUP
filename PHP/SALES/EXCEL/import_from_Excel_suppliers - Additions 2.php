 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');
//    $pdo = new PDO('10.0.0.251';'shvpm','root','P@sswOrD');
}catch(PDOException $error){

    echo $error->getmessage();
}


$reccount = 1072;
$ledcount = 1918;



$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {


//  	    echo '<script type="text/javascript">
//              alert($filename);
//            </script>';

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {



            $colA = $packData[0];
         //   $colA = strtouppper($colA);

     
//        $count = $pdo->query("select count(*) as nos from maspur_supplier_master where sup_name = upper('$colA')")->fetchColumn();

  //      echo $count . "\n";


  //     $stmt = $pdo->query("select count(*) as nos from maspur_supplier_master where sup_name = upper('$colA')");

     
//while ($row = $stmt->fetch())
//{
//    echo $row['nos'] . "\n";
//}



 //           if ($row['nos'] == 0) 
  //          {


            $reccount = $reccount +1;
            $ledcount = $ledcount +1;


                $insert = $pdo->prepare("insert into maspur_supplier_master (sup_code, sup_led_code, sup_name, sup_refname, sup_addr1, sup_addr2, sup_addr3, sup_city,sup_zip,sup_phone,sup_email, sup_panno, sup_gstin) values ( $reccount,$Ledcount,UPPER(:columnA), UPPER(:columnA), LEFT(UPPER(:columnB),50),UPPER(:columnC),UPPER(:columnD),UPPER(:columnE),:columnH,:columnI,:columnJ,:columnK,:columnL)");
                $insert->bindParam(':columnA', $packData[0]);  //NAME
                $insert->bindParam(':columnB', $packData[1]);  //ADD1
                $insert->bindParam(':columnC', $packData[2]);  //ADD2
                $insert->bindParam(':columnD', $packData[3]);  //ADD3
                $insert->bindParam(':columnE', $packData[4]);  //ADD4         
                $insert->bindParam(':columnH', $packData[7]);  //PIN        
                $insert->bindParam(':columnI', $packData[8]);  //PHONE      
                $insert->bindParam(':columnJ', $packData[9]);  //EMAIL      
                $insert->bindParam(':columnK', $packData[10]); //PAN       
                $insert->bindParam(':columnL', $packData[11]); //GST       


                if ($insert->execute()) {
		   $cnnt=$cnnt+1;
                }



                $insert = $pdo->prepare("insert into acc_ledger_master (led_code, led_comp_code, led_name, led_addr1, led_addr2, led_city, led_gst_no, led_pan_no, led_type, led_custcode) values ( $Ledcount,'1',UPPER(:columnA),UPPER(:columnB),UPPER(:columnC),UPPER(:columnD),UPPER(:columnL),UPPER(:columnK) ,'S',$reccount)");
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
//}

//        echo $reccount;

  //      }



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

