 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$voutype = "DNG";

$drcr = "D";

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

            $colA =  date('Y-m-d', strtotime($colA));


            if ($packData[1] != '')      
            { 
              $colB = $packData[1];
            }


            $colB = strtoupper(trim($colB));
            $colB = trim(str_replace("'", "", $colB));
            $colB = trim(str_replace(" ", "", $colB));



           if ($packData[4] != '')      // DEBIT NOTE
            { 
              $colE = $packData[4];
            }

            $colE_Actual = $packData[4];

           if ($packData[5] != '')      // VOUCHER NUMBER   
            { 
              $colF = $packData[5];
            }

            $colF_Actual = $packData[5];


            $colG = floatval($packData[6]);
            $colH = floatval($packData[7]);

            $totamt = $colG + $colH;


            if  ($colE  == 'Debit Note(Gst)')
                $voutype = "DNG";
            else
                $voutype = "DNN";


            if ($colG > 0)
               $drcr = "D";
            else
               $drcr = "C";


        if ($colB == "(CANCELLED)")
        {

	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode'";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];
	$vouno = $voutype . $conval;

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];

//echo $vouno;

               if ($colE == 'Debit Note(Gst)')
                   $ginvouno     = "DB/G".substr($colF,3);
               else 
                   $ginvouno     = $colF;

		#Insert AccDbcrNoteHeader
		    $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$ginvouno','$colA',0,'0','0','0','','','N',0,'0');";
		    $resulta6 = mysql_query($querya6);

//		echo $querya6;


		#Insert AccDbcrNoteTrailer


		$querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$ginvouno','$colA','0' ,'0','0', '0','0','0','0','0','0','0','0',0,0,0,0,0,'0',0,0,0)";

		    $resulta7 = mysql_query($querya7);

//		echo $querya7;

$cnnt =1;
		}


        } 

	$vno=$vno+1;

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
						<center><legend>Excel Upload  - DEBIT NOTE - cancelled</legend></center>
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

