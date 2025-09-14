 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

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
 
          $colA = $packData[0];
          $colB = (float)$packData[1];
          $colC = (float)$packData[2];

//         $qry = "update acc_current_balance,  acc_ledger_master  set curbal_obdbamt = '$colB',  curbal_obcramt = '$colC' where curbal_led_code = led_code and curbal_comp_code = 1 and curbal_finid = 22 and led_name = '$colA' and curbal_led_code > 0 and curbal_seqno > 0";

        $qry = "update acc_current_balance,  acc_ledger_master  set curbal_obdbamt = :columnB,  curbal_obcramt = :columnC where curbal_led_code = led_code and curbal_comp_code = 1 and curbal_finid = 22 and led_name = upper(:columnA) and curbal_led_code > 0 and curbal_seqno > 0";

         $qry = "update acc_current_balance,  acc_ledger_master  set curbal_obdbamt = :columnB,  curbal_obcramt = :columnC where curbal_led_code = led_code and curbal_comp_code = 1 and curbal_finid = 22 and left(led_name,25) = left(:columnA,25) and curbal_led_code > 0 and curbal_seqno > 0";

        $insert = $pdo->prepare($qry);


echo $colA ;
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            $insert->bindParam(':columnB', $colB );  //NAME
            $insert->bindParam(':columnC', $colC);  //NAME



            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }

        }
//              alert("successfully uploaded");

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

