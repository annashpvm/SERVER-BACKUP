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

$i =0;
$skip = 8;

if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {


             if (++$i > $skip)
             {   


            if ($packData[0] != '')      
            { 
              $colA = $packData[0];
            }

            $colA =  date('Y-m-d', strtotime($colA));


            if ($packData[1] != '')      
            { 
              $colB = $packData[1];
            }


            $ledgercode = 0;
            if ($colB == 'BHOMIAJI UNIQUE PACKAGING PVT LTD')
              $ledgercode = 1623;
            else
              if ($colB == 'SRI RAM PACKAGING')
                 $ledgercode = 428;
            else
              if ($colB == 'SRI KRISHNA PRINT AND PACK')
                 $ledgercode = 407;           
              else
              if ($colB == 'SHRI RAGA PACKAGE (RAGAS)')
                 $ledgercode = 2259;           
              else
              if ($colB == 'GREEN PRINTS AND PACKS (NEW)')
                 $ledgercode = 2371;  
              else
              if ($colB == 'STANDARD FIRE WORKS  P LTD')
                 $ledgercode = 456;
            else
              if ($colB == 'SKY PACKS (TNVL)')
                 $ledgercode = 2353;
            else
              if ($colB == 'C.S PACKAGING  INDUSTRIES')
                 $ledgercode = 2380;           
              else
              if ($colB == 'A J PACKAGING')
                 $ledgercode = 2187;           
              else
              if ($colB == 'HOUSE OF CARTONS (INDIA) PVT LTD')
                 $ledgercode = 148;           
              else
              if ($colB == 'GIN CARTON CO')
                 $ledgercode = 117;  
              else
              if ($colB == 'SIVAGURU MATCH INDUSTRIES (A UNIT OF SMI PVT)')
                 $ledgercode = 2372;
              else
              if ($colB == 'ST.MARYS RUBBER PVT LTD')
                 $ledgercode = 2181;  
              else
              if ($colB == 'VIDHYA  SHREE PAPER TUBE')
                 $ledgercode = 521;

              if ($colB == 'SHREE & SHREE PACKAGERS')
                 $ledgercode = 1881;  
              else
              if ($colB == 'PUGLIA PACKAGING INDUSTRIES')
                 $ledgercode = 280;

              else
              if ($colB == 'DEPARTMENTAL PRODUCTION CENTER')
                 $ledgercode = 2558;  
              else
              if ($colB == 'ATHIRE PACKAING')
                 $ledgercode = 2040;
              else
              if ($colB == 'LITTLE FLOWER NOTEBOOK & PREPARING CENTER')
                 $ledgercode = 1629;  
              else
              if ($colB == 'SUN SHINE PACK')
                 $ledgercode = 2741; 
              else
              if ($colB == 'S.J PAPERS AND BOARDS')
                 $ledgercode = 2738; 

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
              $colF = substr($packData[5],0,14);
            }

            $colF_Actual = substr($packData[5],0,14);


            $colG = floatval($packData[6]);
            $colH = floatval($packData[7]);

            $totamt = $colG + $colH;


            if  ($colE  == 'Debit Note(Gst)' || $colE  == 'Debit Note(Gst Sales)')
                $voutype = "DNG";
            else
                $voutype = "DNN";


            if ($colG > 0)
               $drcr = "D";
            else
               $drcr = "C";

//echo   $colG;
//echo "<br>"; 
//echo $colB;
//echo $colC;

        if (($colE == 'Debit Note' && trim($colE_Actual) == 'Debit Note' ) || ($colE == 'Debit Note(Gst)'   && trim($colE_Actual) == 'Debit Note(Gst)')  || ($colE == 'Debit Note(Gst Sales)'   && trim($colE_Actual) == 'Debit Note(Gst Sales)' ))

        {
                $sno = 0;
		$query1       = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
		$result1      = mysql_query($query1);
		$rec1         = mysql_fetch_array($result1);
		$ginaccrefseq = $rec1['con_value'];

// For voucher Number
               if ($colE == 'Debit Note(Gst)')
                   $ginvouno     = "DB/G".substr($colF,3);
               else 
                   $ginvouno     = $colF;


	 $insert_ref = $pdo->prepare("insert into acc_ref values ( $ginaccrefseq,'$ginvouno',$compcode,'$finid','$colA', '$voutype','', '', '', '$colA','')");

  

		    $insert_ref->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert_ref->execute()) {
			$cnnt=$cnnt+1;
		    }
        } 

//echo $packData[6];
//echo "<br>"; 
        $ledcode = 0;
        $ledtype = 'G';
        $ledcode = $pdo->query("select ifnull(max(led_code),0) as  led_code  from acc_ledger_master where REPLACE(led_name, ' ','') =upper('$colB')")->fetchColumn();

        if ($ledcode == 0)   
           $ledcode = $ledgercode ;



       $ledtype = $pdo->query("select led_type  from acc_ledger_master where REPLACE(led_name, ' ','') =upper('$colB')")->fetchColumn();


//echo $ledtype;
//echo "<br>"; 



         $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',$ledcode,'$colG','$colH', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnG', $packData[6]);  //NAME
         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }


         if ($ledtype == 'S' || $ledtype == 'C' )
         {
	 $insert_trail = $pdo->prepare("insert into acc_trail values ( $ginaccrefseq,$sno,'$ginvouno','$colA','$totamt','$totamt','$ledcode','$drcr','0','0' )");

	 $insert_trail->bindParam(':columnA', $packData[0]);  //NAME
	 if ($insert_trail->execute()) {
	    $cnnt=$cnnt+1;
	 }
         }
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
						<center><legend>Excel Upload  - DEBIT NOTE</legend></center>
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

