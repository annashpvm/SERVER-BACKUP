 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}

$reccount = $pdo->query("select max(item_code) as reccount from maspur_item_header")->fetchColumn();

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $colA_Original = $packData[0];
            $colA = $packData[0];
            $colB = $packData[1];

            $colE = intval($packData[4]);  // value

            $colA = trim(strtoupper(str_replace("'", "", $colA)));
            $colA = trim(strtoupper(str_replace(" ", "", $colA)));

            $count = $pdo->query("select count(*) as nos from maspur_item_header where replace(REPLACE(item_name, ' ',''),'  ','') = upper('$colA')")->fetchColumn();


//echo $reccount;
//echo $colA;
//echo "<BR>";


            if ($count == 0) 
            {
            $reccount = $reccount +1;

	// $insertqry = "insert into maspur_item_header (item_code, item_group_code, item_name, item_usage, //item_uom, item_qcchk, item_hsncode) values ( $reccount,14,upper($colA_Original),'','1','N','1')";

//echo $insertqry;
//echo "<BR>";

	 $insert = $pdo->prepare("insert into maspur_item_header (item_code, item_group_code, item_name, item_usage, item_uom, item_qcchk, item_hsncode) values ( $reccount,$colE,upper('$colA_Original'),'','1','N','1')");


		    $insert->bindParam(':columnA', $packData[0]);  //NAME

		    if ($insert->execute()) {
			$cnnt=$cnnt+1;
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

