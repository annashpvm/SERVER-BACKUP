 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$drcr = "D";

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}



$qry = "update acc_trail ,massal_customer,acc_ref  set acctrail_adj_value = acctrail_inv_value  where  accref_seqno = acctrail_accref_seqno and  accref_comp_code = 1 and accref_finid <= 23 and  acctrail_led_code=cust_code  and cust_type = 'S' and  acctrail_inv_value  > acctrail_adj_value";

//echo $qry;
//echo "<br>";
$update_qry = $pdo->prepare($qry);


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

            $colA =  date('Y-m-d', strtotime($colA));


            $colB = trim($packData[1]);    // billno


            $colD = floatval($packData[3]);

            $colD_type =$packData[3];
            $colD_type =substr( $colD_type, -2 );

            $colE = floatval($packData[4]);
            $colE_type =$packData[4];
            $colE_type =substr( $colE_type, -2 );


            $colF = intval($packData[5]);


            if ($colB != '' && $colE != '' )
            {

//             $insert_ref = $pdo->prepare("update acc_trail set acctrail_adj_value = acctrail_inv_value - $colD ,acctrail_crdays = $colE where acctrail_inv_no and accref_voudate = '$colA')");

$qry = "update acc_trail, acc_ref  set acctrail_adj_value = acctrail_inv_value - $colE ,acctrail_crdays = $colF where   accref_seqno = acctrail_accref_seqno and  accref_comp_code = 1 and accref_finid <= 23 and acctrail_inv_no = '$colB' and acctrail_inv_date = '$colA' and acctrail_accref_seqno > 0";

//echo $qry;
//echo "<br>";
             $insert_ref = $pdo->prepare($qry);


		    $insert_ref->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert_ref->execute()) {
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

