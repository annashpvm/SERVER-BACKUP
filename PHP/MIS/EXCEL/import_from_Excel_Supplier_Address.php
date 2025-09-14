 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


$today = date("Y-m-d H:i:s");  

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $colA = $packData[0];
            $colB = $packData[1];
            $colC = $packData[2];    // STATE  
            $colE = $packData[4];    // GST

            $colA = trim(strtoupper(str_replace("'", "", $colA)));
            $colB = trim(strtoupper(str_replace("'", "", $colB)));
            $colC = trim(strtoupper(str_replace("'", "", $colC)));
            $colE = trim(strtoupper(str_replace("'", "", $colE)));


            $colA1 =  substr($colA,0,10);

            $colA_Actual = $colA;  
            $colB_Actual = $colB;  

            $colA = trim(str_replace(" ", "", $colA));
            $colB = trim(str_replace(" ", "", $colB));
            $colC = trim(str_replace(" ", "", $colC));

            $grp =0;
//echo $colA;

           if ($colA != '')
           {
           $supcode    = 0;
           $ledcode    = 0;

           $statecode  = 0;
           $suptype    = 1;  


      $statecode = $pdo->query("select state_code from mas_state where REPLACE(state_name, ' ','') = '$colC'")->fetchColumn();


           if ($statecode == 24)
               $suptype    = 1;  
           else
               $suptype    = 2;  


           $supcode  = $pdo->query("select sup_code from maspur_supplier_master where REPLACE(sup_name, ' ','')   = '$colA'")->fetchColumn();



           $ledcode  = $pdo->query("select sup_led_code from maspur_supplier_master where REPLACE(sup_name, ' ','')   = '$colA'")->fetchColumn();



        $insert = $pdo->prepare("update maspur_supplier_master set sup_gstin = '$colE',sup_state = $statecode , sup_type = '$suptype'  where sup_code = $supcode");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }


        $insert = $pdo->prepare("update acc_ledger_master set led_gst_no = '$colE',led_state = $statecode  where led_code = $ledcode");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }


            }  
        }
        } 


	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';
	}
        else
        {
   	    echo '<script type="text/javascript">
              alert("Data Alreaday Available");
              </script>';
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

