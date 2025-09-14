 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 22;

$ledcode = 0;
$ledtype = 'G';

$drcr = "D";

$voutype = "BKP";

$ginaccrefseq = 0;

$cashamt = 0;

$multihead = 0;
$accseq = 0;
$byto   = "By";

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
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
            if ($packData[0] != '')      
            { 
              $colA = $packData[0];
            }

            
            $colAO =  $colA;


            $colA =  date('Y-m-d', strtotime($colA));
            $sno = $sno+1;
            $MMON = substr(strtoupper($colAO),3,3).$sno ;
echo($MMON);

            if ($packData[1] != '')      
            { 
              $colB = $packData[1];
            }

            $colB_Actual = $packData[1];

            $colC = $packData[2];

  

            $colC = strtoupper(trim($colC));
            $colC = trim(str_replace("'", "", $colC));
            $colC = trim(str_replace(" ", "", $colC));

            $colF_Actual = $packData[5];

           if ($packData[5] != '')      
            { 
              $colF = $packData[5];
            }

            $colG = (int) $packData[6];

            $slno = $colG;


            $colH = floatval($packData[7]);
            $colI = floatval($packData[8]);

            $totamt = $colH + $colI;


            if ($colI > 0)
               $drcr = "D";
            else
               $drcr = "C";
}
}
}

  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';

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
						<center><legend> Excel Upload - FOR BANK </legend></center>
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
