 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


$supcount = $pdo->query("select max(sup_code)+1 as recount from maspur_supplier_master")->fetchColumn();
$ledcount = $pdo->query("select max(led_code)+1 as recount from acc_ledger_master")->fetchColumn();

$today = date("Y-m-d H:i:s");  

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $ifsc = $packData[3];
            $acno = $packData[9];
            $name = $packData[11];
            $branch = $packData[13];
            if ($name != '')
            {   
		    $insert = $pdo->prepare("insert into maspur_supplier_bank (sup_name,sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno) values ('$name','','$branch','$ifsc','$acno')");
		    $insert->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert->execute()) {
			$cnnt=$cnnt+1;
		    }
            }

/*
            $acno = $packData[4];
            $name = $packData[6];
            if ($name != '')
            {   
            $insert = $pdo->prepare("insert into maspur_supplier_bank (sup_name,sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno) values ('$name','','','','$acno')");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }
            } 
*/

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

