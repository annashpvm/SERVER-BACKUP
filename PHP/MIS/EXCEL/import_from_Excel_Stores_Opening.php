 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}





$today = date("Y-m-d H:i:s");  

$i =0;
$skip = 12;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {




        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
             if (++$i > $skip)
             {   

            $colA = $packData[0];  //ITEM NAME
            $colB = floatval($packData[1]);  // stock
            $colC = floatval($packData[2]);  // rate
            $colD = floatval($packData[3]);  // value
            $colE = intval($packData[4]);  // value

            $colA = trim(strtoupper(str_replace("'", "", $colA)));
            $colA = trim(strtoupper(str_replace(" ", "", $colA)));
            $colA = trim(strtoupper(str_replace("-", "", $colA)));

           if ($colA != '')
           {
           $itemcode = $pdo->query("select item_code as itemcode from maspur_item_header where replace(replace(REPLACE(item_name, ' ',''),'-',''),'  ','')  = '$colA'")->fetchColumn();


//echo $itemcode;
//echo "<br>";



            if ($itemcode > 0 ) 
            {
        $qry = "update  maspur_item_trailer set item_group_code =  $colE ,item_stock = '$colB' ,item_avg_rate = '$colC', item_yr_opqty = '$colB',item_yr_opval = '$colD' WHERE item_comp_code = 1 and item_fin_code = 25 and item_code = '$itemcode' ";

//echo $qry;
//echo "<br>";

        $insert = $pdo->prepare("update  maspur_item_trailer set item_stock = '$colB' ,item_avg_rate = '$colC', item_yr_opqty = '$colB',item_yr_opval = '$colD' WHERE item_comp_code = 1 and item_fin_code = 25 and item_code = '$itemcode' ");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }
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
						<center><legend>Excel - Stores Opening - Upload</legend></center>
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

