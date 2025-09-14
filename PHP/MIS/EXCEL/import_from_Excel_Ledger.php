 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {




        $ledcount = $pdo->query("select max(led_code)+1 as recount from acc_ledger_master")->fetchColumn();

// echo  $ledcount;
        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $colA = $packData[0];

            $colA = strtoupper(trim($colA));
            $colA = trim(str_replace("'", "", $colA));
            
            $colA_Actual = $colA;  


            $colA = trim(str_replace(" ", "", $colA));

     
    if ($colA != '')
           {
           $count = $pdo->query("select count(*) as nos from acc_ledger_master where REPLACE(led_name, ' ','') = '$colA'")->fetchColumn();

            if ($count == 0) 
            {

//echo  $colA_Actual;
//echo "<br>"; 

      $insert = $pdo->prepare("insert into acc_ledger_master (led_code, led_comp_code, led_name, led_addr1, led_addr2, led_city, led_gst_no, led_pan_no, led_type, led_custcode,led_grp_code) values ( $ledcount,'1','$colA_Actual','','','','','','G',$ledcount,0)");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
       
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
               $ledcount = $ledcount +1;
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

